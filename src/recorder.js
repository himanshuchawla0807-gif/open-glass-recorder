import { advanceSpring, formatTime, recordingError } from './math.js';
import { vertex, fragment } from './shaders.js';

const styles = `
.open-glass{position:relative;width:100%;height:100%;min-height:100px;isolation:isolate;overflow:hidden;background:#101726;font-family:system-ui,sans-serif;color:white}
.open-glass.transparent{background:transparent}
.open-glass canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.og-action{position:absolute;top:50%;left:50%;display:grid;place-items:center;background:transparent;border:0;border-radius:50%;color:#fff;cursor:pointer;transform:translate(-50%,-50%);padding:0;-webkit-tap-highlight-color:transparent;filter:drop-shadow(0 2px 5px #0006)}
.og-action:focus-visible{outline:2px solid #e3eeff;outline-offset:4px}.og-action svg{width:34%;height:34%;pointer-events:none}.og-action:disabled{cursor:wait;opacity:.55}
.og-clock{position:absolute;top:50%;left:50%;font-size:28px;letter-spacing:1px;font-variant-numeric:tabular-nums;transform:translate(-50%,-50%);pointer-events:none;text-shadow:0 2px 10px #0006}
.open-glass.fallback canvas{display:none}
.open-glass.fallback .og-action{background:#31435eaa;backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px #d1e6ff88,inset 0 3px 10px #ffffff44,0 8px 35px #0003}
`;
const mic = '<svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="12" y="4" width="8" height="15" rx="4" stroke="currentColor" stroke-width="2"/><path d="M7 15a9 9 0 0 0 18 0M16 24v4m-5 0h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
const stop = '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="8" y="8" width="16" height="16" rx="4" fill="currentColor"/></svg>';

/** Dependency-free recorder. Emits statechange, recording, error and backdropchange. */
export class GlassRecorder extends EventTarget {
  constructor(host, { backdrop = '', transparent = false, reducedMotion } = {}) {
    super();
    if (!(host instanceof Element)) throw new TypeError('GlassRecorder needs a host element.');
    if (!document.getElementById('open-glass-styles')) {
      const style = document.createElement('style'); style.id = 'open-glass-styles'; style.textContent = styles; document.head.append(style);
    }
    this.root = document.createElement('div'); this.root.className = `open-glass${transparent ? ' transparent' : ''}`;
    this.canvas = document.createElement('canvas'); this.canvas.setAttribute('aria-hidden', 'true');
    this.button = document.createElement('button'); this.button.type = 'button'; this.button.className = 'og-action'; this.button.innerHTML = mic;
    this.button.setAttribute('aria-label', 'Start recording'); this.button.setAttribute('aria-pressed', 'false');
    this.clock = document.createElement('span'); this.clock.className = 'og-clock'; this.clock.setAttribute('role', 'timer'); this.clock.textContent = '00:00';
    this.root.append(this.canvas, this.clock, this.button); host.append(this.root);
    this.state = 'idle'; this.destroyed = false; this.token = 0; this.amount = 0; this.velocity = 0; this.level = 0; this.bandLevels = new Float32Array(4); this.pointer = [1e5, 1e5]; this.imageSize = [1, 1]; this.transparent = transparent; this.reducedMotion = reducedMotion ?? matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.events = new AbortController(); const signal = this.events.signal;
    this.button.addEventListener('click', () => this.toggle(), { signal });
    this.root.addEventListener('pointermove', event => { const box = this.root.getBoundingClientRect(); this.pointer = [event.clientX - box.left - box.width / 2, box.height / 2 - event.clientY + box.top]; }, { signal });
    this.root.addEventListener('pointerleave', () => { this.pointer = [1e5, 1e5]; }, { signal });
    this.canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); this.gl = null; this.root.classList.add('fallback'); }, { signal });
    this.canvas.addEventListener('webglcontextrestored', () => { if (!this.destroyed) { this.setupGL(); this.setBackdrop(this.backdrop); } }, { signal });
    this.setupGL(); this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(this.root); this.resize();
    this.setBackdrop(backdrop); this.lastFrame = performance.now(); this.frame = this.frame.bind(this); this.raf = requestAnimationFrame(this.frame);
  }
  emit(name, detail) { this.dispatchEvent(new CustomEvent(name, { detail })); }
  setState(state) {
    this.state = state; this.button.disabled = ['requesting', 'stopping'].includes(state);
    this.button.setAttribute('aria-label', state === 'recording' ? 'Stop recording' : state === 'requesting' ? 'Waiting for microphone' : 'Start recording');
    this.button.setAttribute('aria-pressed', String(state === 'recording')); this.button.innerHTML = state === 'recording' ? stop : mic;
    this.emit('statechange', { state });
  }
  setupGL() {
    try {
      const gl = this.canvas.getContext('webgl2', { alpha: this.transparent, premultipliedAlpha: false, antialias: false, preserveDrawingBuffer: true });
      if (!gl) throw new Error('WebGL2 is unavailable');
      const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { const message = gl.getShaderInfoLog(shader); gl.deleteShader(shader); throw new Error(message); } return shader; };
      this.program = gl.createProgram(); const shaders = [compile(gl.VERTEX_SHADER, vertex), compile(gl.FRAGMENT_SHADER, fragment)];
      for (const shader of shaders) gl.attachShader(this.program, shader); gl.linkProgram(this.program);
      for (const shader of shaders) gl.deleteShader(shader);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(this.program));
      gl.useProgram(this.program); this.buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(this.program, 'position'); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      this.texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, this.texture); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([37,51,76,255]));
      this.uniforms = Object.fromEntries(['resolution','imageSize','center','pointer','radius','extension','time','volume','recording','transparent','bands[0]'].map(name => [name, gl.getUniformLocation(this.program, name)])); this.gl = gl; this.root.classList.remove('fallback');
    } catch (error) { this.gl = null; this.root.classList.add('fallback'); this.emit('rendererfallback', { message: error.message }); }
  }
  resize() {
    const box = this.root.getBoundingClientRect(); this.width = Math.max(1, box.width); this.height = Math.max(1, box.height); this.dpr = Math.min(devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.width * this.dpr); this.canvas.height = Math.round(this.height * this.dpr); this.scale = Math.min(1.25, Math.max(.45, Math.min(this.width / 440, this.height / 220)));
  }
  async setBackdrop(url) {
    if (this.destroyed) return false;
    const token = this.imageToken = (this.imageToken || 0) + 1;
    if (!url) {
      this.backdrop = '';
      this.root.style.backgroundImage = ''; this.imageSize = [1,1];
      if (this.gl) { const gl = this.gl; gl.bindTexture(gl.TEXTURE_2D, this.texture); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([37,51,76,255])); }
      this.emit('backdropchange', { url }); return true;
    }
    try {
      const image = new Image(); image.crossOrigin = 'anonymous'; image.src = url; await image.decode();
      if (this.destroyed || token !== this.imageToken) return;
      this.backdrop = url;
      this.root.style.backgroundImage = this.transparent ? '' : `url(${JSON.stringify(url)})`; this.root.style.backgroundSize = 'cover'; this.root.style.backgroundPosition = 'center';
      const gl = this.gl;
      if (gl) {
        const maxSize = Math.min(2048, gl.getParameter(gl.MAX_TEXTURE_SIZE)); const factor = Math.min(1, maxSize / Math.max(image.width, image.height));
        const buffer = document.createElement('canvas'); buffer.width = Math.max(1, Math.round(image.width * factor)); buffer.height = Math.max(1, Math.round(image.height * factor)); buffer.getContext('2d').drawImage(image, 0, 0, buffer.width, buffer.height);
        gl.bindTexture(gl.TEXTURE_2D, this.texture); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, buffer); this.imageSize = [buffer.width, buffer.height];
      }
      this.emit('backdropchange', { url }); return true;
    } catch (error) { if (!this.destroyed && token === this.imageToken) this.emit('error', { message: 'The wallpaper could not be loaded.', cause: error }); return false; }
  }
  async toggle() { return this.state === 'recording' ? this.stop() : this.start(); }
  async start() {
    if (this.destroyed || this.state !== 'idle') return;
    this.setState('requesting'); const token = ++this.token; let stream, context;
    try {
      if (!isSecureContext || !navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) throw new Error('Recording needs HTTPS or localhost and a browser with MediaRecorder.');
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      if (this.destroyed || token !== this.token) { stream.getTracks().forEach(track => track.stop()); return; }
      this.stream = stream; context = new AudioContext(); this.context = context; await context.resume();
      if (this.destroyed || token !== this.token) { stream.getTracks().forEach(track => track.stop()); context.close().catch(() => {}); return; }
      this.source = this.context.createMediaStreamSource(stream); this.analyser = this.context.createAnalyser(); this.analyser.fftSize = 512; this.source.connect(this.analyser); this.samples = new Uint8Array(this.analyser.frequencyBinCount);
      this.capture = new MediaRecorder(stream); this.chunks = []; this.capture.addEventListener('dataavailable', event => { if (event.data.size) this.chunks.push(event.data); });
      this.capture.addEventListener('error', event => { this.emit('error', { message: recordingError(event.error) }); this.stop(); });
      this.capture.addEventListener('stop', () => {
        const duration = Math.max(0, (performance.now() - this.startedAt) / 1000); const mimeType = this.capture.mimeType || 'audio/webm'; const blob = new Blob(this.chunks, { type: mimeType });
        this.releaseAudio(); if (!this.destroyed) { this.setState('idle'); this.emit('recording', { blob, duration, mimeType }); }
      }, { once: true });
      this.startedAt = performance.now(); this.capture.start(200); this.setState('recording');
    } catch (error) {
      stream?.getTracks().forEach(track => track.stop());
      if (this.destroyed || token !== this.token) { context?.close().catch(() => {}); return; }
      this.releaseAudio(); this.setState('idle'); this.emit('error', { message: recordingError(error), cause: error });
    }
  }
  stop() {
    if (this.state === 'requesting') { this.token++; this.releaseAudio(); this.setState('idle'); return; }
    if (this.state !== 'recording') return;
    this.setState('stopping'); if (this.capture?.state !== 'inactive') { this.capture.stop(); this.releaseAudio(); } else { this.releaseAudio(); this.setState('idle'); }
  }
  releaseAudio() {
    this.stream?.getTracks().forEach(track => track.stop()); this.stream = null; this.source?.disconnect(); this.source = null; this.analyser = null; this.context?.close().catch(() => {}); this.context = null;
  }
  frame(now) {
    if (this.destroyed) return; this.raf = requestAnimationFrame(this.frame);
    const dt = Math.min((now - this.lastFrame) / 1000, .04); this.lastFrame = now; if (document.hidden) return;
    const active = this.state === 'recording' ? 1 : 0;
    if (this.reducedMotion) { this.amount = active; this.velocity = 0; } else [this.amount, this.velocity] = advanceSpring(this.amount, this.velocity, active, dt);
    this.level = 0; this.bandLevels.fill(0);
    if (this.analyser) { this.analyser.getByteFrequencyData(this.samples); const size = this.samples.length; for (let i=0;i<size;i++) { const band = Math.min(3, Math.floor(i / size * 4)); this.bandLevels[band] += this.samples[i] / (255 * size / 4); } this.level = this.bandLevels.reduce((a,b)=>a+b,0) / 4; }
    const r = 56 * this.scale, extension = 94 * this.scale * this.amount;
    this.button.style.width = this.button.style.height = `${r * 2}px`; this.button.style.left = `${this.width / 2 + extension}px`; this.clock.style.left = `${this.width / 2 - extension * .42}px`; this.clock.style.opacity = Math.max(0, this.amount * 2 - 1); this.clock.style.fontSize = `${24 * this.scale}px`;
    this.clock.textContent = formatTime(active ? (now - this.startedAt) / 1000 : 0);
    const gl = this.gl; if (!gl) return; const u = this.uniforms;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height); gl.useProgram(this.program); gl.uniform2f(u.resolution, this.canvas.width, this.canvas.height); gl.uniform2f(u.imageSize, ...this.imageSize); gl.uniform2f(u.center, this.canvas.width / 2, this.canvas.height / 2);
    gl.uniform2f(u.pointer, ...this.pointer.map(v => this.reducedMotion ? 1e5 : v * this.dpr)); gl.uniform1f(u.radius, r * this.dpr); gl.uniform1f(u.extension, extension * this.dpr); gl.uniform1f(u.time, this.reducedMotion ? 0 : now / 1000); gl.uniform1f(u.volume, this.level); gl.uniform1f(u.recording, active); gl.uniform1f(u.transparent, this.transparent ? 1 : 0); gl.uniform1fv(u['bands[0]'], this.bandLevels); gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  destroy() {
    if (this.destroyed) return; this.destroyed = true; this.token++; this.imageToken++; cancelAnimationFrame(this.raf); this.events.abort(); this.resizeObserver.disconnect();
    if (this.capture?.state === 'recording') this.capture.stop(); this.releaseAudio();
    if (this.gl) { this.gl.deleteBuffer(this.buffer); this.gl.deleteTexture(this.texture); this.gl.deleteProgram(this.program); } this.root.remove();
  }
}
