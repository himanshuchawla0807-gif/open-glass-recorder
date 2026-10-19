import { createRecorder } from '../vendor/reference-recorder/liquid-glass-recorder.js';
document.querySelector('#run').onclick=async()=>{
 const results=[];const check=(name,pass)=>{results.push({name,pass:!!pass});if(!pass)throw Error(name)};
 const original=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);let r,ctx,tone;
 try{
  ctx=new AudioContext();await ctx.resume();tone=ctx.createOscillator();const dst=ctx.createMediaStreamDestination();tone.connect(dst);tone.start();let requests=0;
  navigator.mediaDevices.getUserMedia=async()=>{requests++;return dst.stream};
  r=createRecorder(document.querySelector('#host'),{transparent:true,backdrop:{color:'#19355c'},status:false,keepRecordings:false,params:{width:220,scale:1.2,drift:0,parallax:0}});
  await new Promise(resolve=>setTimeout(resolve,100));check('WebGL renderer available',r.rendererType==='webgl');const width=r.action.getBoundingClientRect().width;
  await r.start();await new Promise(resolve=>setTimeout(resolve,650));check('Synthetic recording starts',r.state==='recording');check('Button size stays fixed',Math.abs(width-r.action.getBoundingClientRect().width)<.2);
  const stop=r.voice.stop.bind(r.voice);r.voice.stop=async()=>{const result=await stop();await new Promise(resolve=>setTimeout(resolve,150));return result};const saving=r.stop();await r.start();check('Restart blocked while saving',requests===1&&r.stopping&&r.action.disabled);const clip=await saving;
  check('Recording creates audio',clip.blob.size>0);check('Tracks released',dst.stream.getTracks().every(t=>t.readyState==='ended'));
  const url=URL.createObjectURL(clip.blob);const audio=document.createElement('audio');audio.src=url;try{await audio.play();await new Promise(resolve=>setTimeout(resolve,100));check('Recorded audio plays',audio.currentTime>0)}finally{audio.pause();audio.removeAttribute('src');audio.load();URL.revokeObjectURL(url)}
  let grant;navigator.mediaDevices.getUserMedia=()=>new Promise(resolve=>grant=resolve);const pending=r.start();await r.stop();let released=false;grant({getTracks:()=>[{stop(){released=true}}]});await pending;check('Canceled permission releases late stream',released&&r.state==='idle');
  navigator.mediaDevices.getUserMedia=async()=>{throw new DOMException('Test denial','NotAllowedError')};await r.start();check('Denied permission restores idle',r.state==='idle'&&!r.action.disabled);
  r.destroy();check('Destroy removes recorder canvas',!document.querySelector('#host canvas'));
 }catch(error){if(!results.some(r=>r.name===error.message))results.push({name:error.message,pass:false})}
 finally{r?.destroy();tone?.stop();await ctx?.close();navigator.mediaDevices.getUserMedia=original;window.referenceTestResults=results;document.querySelector('#results').textContent=results.map(r=>`${r.pass?'PASS':'FAIL'} ${r.name}`).join('\n')}
};
