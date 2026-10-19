import { GlassRecorder } from '../src/recorder.js';
const frame=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
document.querySelector('#run').addEventListener('click',async()=>{
 const button=document.querySelector('#run');button.disabled=true;const results=[];let recorder,context,oscillator;const original=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
 const check=(name,condition)=>{results.push({name,pass:!!condition});if(!condition)throw Error(name)};
 try{
  context=new AudioContext();await context.resume();oscillator=context.createOscillator();const destination=context.createMediaStreamDestination();oscillator.connect(destination);oscillator.start();
  recorder=new GlassRecorder(document.querySelector('#host'),{transparent:true,idleWidth:210,recordingWidth:330,radius:56,maxScale:.9});await frame();
  check('WebGL2 optical renderer compiled',!!recorder.gl);
  const idle=recorder.button.getBoundingClientRect().width;let grant;
  navigator.mediaDevices.getUserMedia=()=>new Promise(resolve=>grant=resolve);const pending=recorder.start();await frame();const requesting=recorder.button.getBoundingClientRect().width;
  grant(destination.stream);await pending;await new Promise(resolve=>setTimeout(resolve,700));const active=recorder.button.getBoundingClientRect().width;
  check('idle, permission and recording diameters match',Math.abs(idle-requesting)<.05&&Math.abs(idle-active)<.05);
  check('button is larger than 80 CSS pixels',idle>80);check('recording expands without a scale reset',recorder.amount>.95);
  const finished=new Promise(resolve=>recorder.addEventListener('recording',event=>resolve(event.detail),{once:true}));recorder.stop();const recorded=await finished;
  check('recording produces audio data',recorded.blob.size>0);check('microphone stream is released',recorder.stream===null&&destination.stream.getTracks().every(track=>track.readyState==='ended'));
  const pixel=new Uint8Array(4);await frame();const gl=recorder.gl;gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);check('outside pixels remain transparent',pixel[3]===0);
  recorder.configure({radius:44,skyTop:'#8844cc',glassTint:'#442266'});await frame();check('public size and color controls apply',recorder.button.getBoundingClientRect().width<idle&&recorder.getConfiguration().skyTop==='#8844cc');
  navigator.mediaDevices.getUserMedia=async()=>{throw new DOMException('Test denial','NotAllowedError')};let error='';recorder.addEventListener('error',event=>error=event.detail.message);await recorder.start();check('denial returns to idle with a useful message',recorder.state==='idle'&&error.includes('blocked'));
  recorder.destroy();check('destroy removes component DOM',!recorder.root.isConnected);
 }catch(error){results.push({name:error.message,pass:false})}finally{
  recorder?.destroy();oscillator?.stop();await context?.close();navigator.mediaDevices.getUserMedia=original;window.browserTestResults=results;document.querySelector('#results').textContent=results.map(r=>`${r.pass?'PASS':'FAIL'} ${r.name}`).join('\n');button.disabled=false;
 }
});
