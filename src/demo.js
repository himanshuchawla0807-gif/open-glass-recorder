import { GlassRecorder } from './recorder.js';
import { formatTime } from './math.js';
const scenes = [
  { name: 'BLUE NEBULA', url: 'assets/blue-nebula.jpg' },
  { name: 'COSMIC CLIFFS', url: 'assets/cosmic-cliffs.jpg' },
  { name: 'EUROPA', url: 'assets/europa.jpg' }
];
const status = document.querySelector('#status'); const sceneButton = document.querySelector('#scene');
const recorder = new GlassRecorder(document.querySelector('#recorder'), { backdrop: scenes[0].url });
window.recorder = recorder;
let scene = 0; let count = 0; const recordings = new Map();
recorder.addEventListener('statechange', ({detail:{state}}) => {
  sceneButton.disabled = state !== 'idle';
  status.textContent = {idle:'Touch the glass. Say something.',requesting:'Waiting for microphone permission…',recording:'Listening. Tap again to finish.',stopping:'Saving your voice note…'}[state];
});
recorder.addEventListener('error', ({ detail }) => { status.textContent = detail.message; });
recorder.addEventListener('recording', ({ detail: { blob, duration, mimeType } }) => {
  if (!blob.size) { status.textContent = 'No audio was captured. Try another recording.'; return; }
  const url = URL.createObjectURL(blob); recordings.set(++count, url);
  const item = document.createElement('div'); item.className = 'clip';
  const title = document.createElement('span'); title.textContent = `VOICE NOTE ${String(count).padStart(2,'0')} · ${formatTime(duration)}`;
  const download = document.createElement('a'); download.href = url; download.textContent = 'Download ↓'; download.download = `voice-note-${count}.${mimeType.includes('mp4') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm'}`;
  const audio = document.createElement('audio'); audio.controls = true; audio.src = url; audio.setAttribute('aria-label', `Play voice note ${count}`);
  item.append(title, download, audio); document.querySelector('#clips').prepend(item); document.querySelector('#recordings').hidden = false;
  status.textContent = 'Saved in this tab. Play it back or download it.';
});
sceneButton.addEventListener('click', async () => {
  if (recorder.state !== 'idle') return;
  const nextScene = (scene + 1) % scenes.length; sceneButton.disabled = true;
  if (await recorder.setBackdrop(scenes[nextScene].url)) {
    scene = nextScene; document.querySelector('#scene-name').textContent = `${String(scene+1).padStart(2,'0')} / ${scenes[scene].name}`;
  }
  sceneButton.disabled = recorder.state !== 'idle';
});
function clearRecordings() { for(const url of recordings.values()) URL.revokeObjectURL(url); recordings.clear(); document.querySelector('#clips').replaceChildren(); document.querySelector('#recordings').hidden = true; }
document.querySelector('#clear').addEventListener('click', clearRecordings);
window.addEventListener('pagehide', event => { if (event.persisted) recorder.stop(); else recorder.destroy(); clearRecordings(); });
