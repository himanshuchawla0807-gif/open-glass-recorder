import test from 'node:test';
import assert from 'node:assert/strict';
import { formatTime, advanceSpring, recordingError } from '../src/math.js';
test('timer handles minutes, negative values and invalid numbers',()=>{assert.equal(formatTime(65.9),'01:05');assert.equal(formatTime(-1),'00:00');assert.equal(formatTime(Infinity),'00:00');assert.equal(formatTime(NaN),'00:00');});
test('spring settles at its target without large-frame instability',()=>{let p=0,v=0;for(let i=0;i<240;i++)[p,v]=advanceSpring(p,v,1,1/60);assert.ok(Math.abs(p-1)<.001);assert.ok(Math.abs(v)<.001);assert.deepEqual(advanceSpring(0,0,1,10),advanceSpring(0,0,1,1/30));});
test('spring holds still when no time has elapsed',()=>{assert.deepEqual(advanceSpring(.5,0,1,0),[.5,0]);});
test('microphone errors provide permission and missing-device recovery',()=>{assert.match(recordingError({name:'NotAllowedError'}),/blocked/);assert.match(recordingError({name:'SecurityError'}),/blocked/);assert.match(recordingError({name:'NotFoundError'}),/microphone/);assert.match(recordingError({name:'NotReadableError'}),/microphone/);assert.match(recordingError(),/unavailable/);assert.equal(recordingError({message:'test'}),'test');});

test('button diameter is identical before, during and after the recording transition', async()=>{
 const {fitGeometry}=await import('../src/math.js');const options={radius:56,idleWidth:210,recordingWidth:330,maxScale:.9};
 const states=[0,.1,.5,1,0].map(p=>fitGeometry(300,126,options,p));
 assert.ok(states.every(s=>s.buttonDiameter===states[0].buttonDiameter));assert.ok(states[3].bodyWidth>states[0].bodyWidth);assert.ok(states[0].bodyWidth>120);
});
test('largest state fits a small host and spring overshoot cannot shrink or exceed it', async()=>{
 const {fitGeometry}=await import('../src/math.js');const idle=fitGeometry(260,120,{},0),active=fitGeometry(260,120,{},1);
 assert.ok(active.bodyWidth<=236);assert.ok(active.buttonDiameter<=96);assert.deepEqual(fitGeometry(260,120,{},-1),idle);assert.deepEqual(fitGeometry(260,120,{},2),active);
});
