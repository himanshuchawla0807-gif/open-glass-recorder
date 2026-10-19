import { handlePageHide } from '../src/lifecycle.js';
import { GlassRecorder } from '../src/recorder.js';
const recorder=new GlassRecorder(document.querySelector('#recorder'),{transparent:true,radius:56,idleWidth:210,recordingWidth:330,maxScale:.9,skyTop:'#234674',skyBottom:'#070f24',glassTint:'#0c2853'});
const urls=new Set();
function message(text){const item=document.createElement('li');item.textContent=text;document.querySelector('#messages').append(item);return item;}
document.querySelector('form').addEventListener('submit',event=>{event.preventDefault();const input=document.querySelector('textarea');if(input.value.trim()){message(input.value.trim());input.value=''}});
recorder.addEventListener('statechange',e=>document.querySelector('#status').textContent=e.detail.state==='recording'?'Recording. Tap to finish.':'Voice notes stay in this tab.');
recorder.addEventListener('error',e=>document.querySelector('#status').textContent=e.detail.message);
recorder.addEventListener('recording',e=>{if(!e.detail.blob.size)return;const url=URL.createObjectURL(e.detail.blob);urls.add(url);const audio=document.createElement('audio');audio.controls=true;audio.src=url;message('Voice note').append(audio);});
window.inlineRecorder=recorder;
window.addEventListener('pagehide',event=>handlePageHide(event,[recorder],urls));
