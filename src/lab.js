import { GlassRecorder } from './recorder.js';
export const presets = [
 {name:'Midnight wide',options:{idleWidth:210,recordingWidth:340,radius:56,skyTop:'#254a7e',skyBottom:'#060e23',glassTint:'#102d5b'}},
 {name:'Arctic compact',options:{idleWidth:145,recordingWidth:290,radius:50,skyTop:'#4a7493',skyBottom:'#132639',glassTint:'#254863'}},
 {name:'Violet capsule',options:{idleWidth:250,recordingWidth:360,radius:58,skyTop:'#473566',skyBottom:'#150e2a',glassTint:'#30204a'}}
];
const urls=new Set();
export const variants=presets.map((preset,index)=>{
 const card=document.createElement('article');card.className='variant';
 const head=document.createElement('div');head.className='variant-head';const title=document.createElement('h2');title.textContent=preset.name;const number=document.createElement('small');number.textContent=`0${index+1}`;head.append(title,number);
 const host=document.createElement('div');host.className='preview';const status=document.createElement('p');status.className='variant-status';status.setAttribute('role','status');status.textContent='Tap to record a voice note.';card.append(head,host,status);document.querySelector('#variants').append(card);
 const recorder=new GlassRecorder(host,preset.options);
 recorder.addEventListener('statechange',e=>{status.textContent={idle:'Ready to record.',requesting:'Waiting for microphone permission…',recording:'Recording. Tap to finish.',stopping:'Finishing…'}[e.detail.state]});
 recorder.addEventListener('error',e=>status.textContent=e.detail.message);
 let audioUrl;
 recorder.addEventListener('recording',e=>{if(!e.detail.blob.size)return;card.querySelector('audio')?.remove();if(audioUrl){URL.revokeObjectURL(audioUrl);urls.delete(audioUrl)}audioUrl=URL.createObjectURL(e.detail.blob);urls.add(audioUrl);const audio=document.createElement('audio');audio.controls=true;audio.src=audioUrl;audio.setAttribute('aria-label',`Play ${preset.name} recording`);card.append(audio);status.textContent='Voice note captured locally.';});
 return {card,host,status,recorder};
});
window.glassLab=variants;
window.addEventListener('pagehide',event=>{for(const {recorder}of variants){if(event.persisted)recorder.stop();else recorder.destroy()}for(const url of urls)URL.revokeObjectURL(url);urls.clear();});
