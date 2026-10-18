import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GlassRecorder } from '../src/recorder.js';
class ElementStub extends EventTarget {
 constructor(){super();this.style={};this.children=[];this.attributes={};const c=new Set();this.classList={add:v=>c.add(v),remove:v=>c.delete(v),contains:v=>c.has(v)}}
 append(...nodes){this.children.push(...nodes)} setAttribute(k,v){this.attributes[k]=v}
 getBoundingClientRect(){return {width:440,height:220,left:0,top:0}} getContext(){return null} remove(){this.removed=true}
}
let tracksStopped,contextsClosed,denyContext;
const stream=()=>({getTracks:()=>[{stop(){tracksStopped++}}]});
class AudioStub {
 async resume(){if(denyContext)throw Error('Audio initialization failed')} async close(){this.closed=true;contextsClosed++}
 createMediaStreamSource(){return {connect(){},disconnect(){}}} createAnalyser(){return {frequencyBinCount:256}}
}
class CaptureStub extends EventTarget {
 state='inactive';mimeType='audio/webm';start(){this.state='recording'}
 stop(){this.state='inactive';queueMicrotask(()=>{const e=new Event('dataavailable');Object.defineProperty(e,'data',{value:new Blob(['audio'])});this.dispatchEvent(e);this.dispatchEvent(new Event('stop'));})}
}
beforeEach(()=>{
 tracksStopped=0;contextsClosed=0;denyContext=false;
 Object.assign(globalThis,{Element:ElementStub,document:{getElementById:()=>null,createElement:()=>new ElementStub(),head:new ElementStub()},window:{MediaRecorder:CaptureStub},MediaRecorder:CaptureStub,AudioContext:AudioStub,isSecureContext:true,ResizeObserver:class{observe(){}disconnect(){}},requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{},matchMedia:()=>({matches:false}),devicePixelRatio:1});
 Object.defineProperty(globalThis,'navigator',{configurable:true,value:{mediaDevices:{getUserMedia:async()=>stream()}}});
 globalThis.Image=class{width=200;height=100;async decode(){}};
});
test('denial resets UI and permits retry',async()=>{const r=new GlassRecorder(new ElementStub());let error;r.addEventListener('error',e=>error=e.detail.message);navigator.mediaDevices.getUserMedia=async()=>{throw {name:'NotAllowedError'}};await r.start();assert.equal(r.state,'idle');assert.match(error,/blocked/);assert.equal(r.button.disabled,false);navigator.mediaDevices.getUserMedia=async()=>stream();await r.start();assert.equal(r.state,'recording');r.destroy()});
test('destroy during pending permission stops late stream without recording',async()=>{let resolve;navigator.mediaDevices.getUserMedia=()=>new Promise(r=>resolve=r);const r=new GlassRecorder(new ElementStub());let count=0;r.addEventListener('recording',()=>count++);const pending=r.start();r.destroy();resolve(stream());await pending;assert.equal(tracksStopped,1);assert.equal(count,0);assert.equal(r.root.removed,true)});
test('stop cancels pending permission without destroying the component',async()=>{let resolve;navigator.mediaDevices.getUserMedia=()=>new Promise(r=>resolve=r);const r=new GlassRecorder(new ElementStub());const pending=r.start();r.stop();assert.equal(r.state,'idle');resolve(stream());await pending;assert.equal(tracksStopped,1);assert.notEqual(r.root.removed,true);r.destroy()});
test('failed audio initialization releases resources',async()=>{denyContext=true;const r=new GlassRecorder(new ElementStub());await r.start();assert.equal(r.stream,null);assert.equal(r.context,null);assert.equal(r.state,'idle');assert.ok(tracksStopped>=1);assert.equal(contextsClosed,1);r.destroy()});
test('duplicate start ignored; stop emits usable audio after releasing mic',async()=>{let calls=0;navigator.mediaDevices.getUserMedia=async()=>{calls++;return stream()};const r=new GlassRecorder(new ElementStub());await r.start();await r.start();assert.equal(calls,1);const finished=new Promise(resolve=>r.addEventListener('recording',e=>resolve(e.detail),{once:true}));r.stop();const d=await finished;assert.ok(d.blob.size>0);assert.equal(d.mimeType,'audio/webm');assert.equal(r.stream,null);assert.equal(r.context,null);assert.equal(r.state,'idle');r.destroy();r.destroy()});
test('empty backdrop clears image and failed decode reports false',async()=>{const r=new GlassRecorder(new ElementStub());assert.equal(await r.setBackdrop('image.jpg'),true);assert.match(r.root.style.backgroundImage,/image.jpg/);await r.setBackdrop('');assert.equal(r.root.style.backgroundImage,'');assert.deepEqual(r.imageSize,[1,1]);globalThis.Image=class{async decode(){throw Error('bad')}};assert.equal(await r.setBackdrop('missing.jpg'),false);r.destroy()});
test('out of order image decodes keep the newest wallpaper',async()=>{const pending=new Map();globalThis.Image=class{width=200;height=100;decode(){return new Promise(r=>pending.set(this.src,r))}};const r=new GlassRecorder(new ElementStub());const first=r.setBackdrop('first.jpg');const second=r.setBackdrop('second.jpg');pending.get('second.jpg')();await second;pending.get('first.jpg')();await first;assert.match(r.root.style.backgroundImage,/second.jpg/);r.destroy()});

test('late permission rejection from a canceled request cannot stop a new recording',async()=>{
 let reject;navigator.mediaDevices.getUserMedia=()=>new Promise((resolve,r)=>reject=r);
 const r=new GlassRecorder(new ElementStub());const first=r.start();r.stop();navigator.mediaDevices.getUserMedia=async()=>stream();await r.start();const currentStream=r.stream,currentContext=r.context;
 reject(Error('old request rejected'));await first;assert.equal(r.state,'recording');assert.equal(r.stream,currentStream);assert.equal(r.context,currentContext);assert.notEqual(currentContext.closed,true);r.destroy();
});
test('late resume from canceled audio context cannot close the new session',async()=>{
 let resumeFirst;let calls=0;
 globalThis.AudioContext=class extends AudioStub{resume(){return ++calls===1?new Promise(r=>resumeFirst=r):Promise.resolve()}};
 const r=new GlassRecorder(new ElementStub());const first=r.start();await Promise.resolve();assert.equal(typeof resumeFirst,'function');r.stop();await r.start();const context=r.context,currentStream=r.stream;
 resumeFirst();await first;assert.equal(r.state,'recording');assert.equal(r.context,context);assert.equal(r.stream,currentStream);assert.notEqual(context.closed,true);r.destroy();
});
