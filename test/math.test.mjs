import test from 'node:test';
import assert from 'node:assert/strict';
import { formatTime, advanceSpring, recordingError } from '../src/math.js';
test('timer handles minutes, negative values and invalid numbers',()=>{assert.equal(formatTime(65.9),'01:05');assert.equal(formatTime(-1),'00:00');assert.equal(formatTime(Infinity),'00:00');assert.equal(formatTime(NaN),'00:00');});
test('spring settles at its target without large-frame instability',()=>{let p=0,v=0;for(let i=0;i<240;i++)[p,v]=advanceSpring(p,v,1,1/60);assert.ok(Math.abs(p-1)<.001);assert.ok(Math.abs(v)<.001);assert.deepEqual(advanceSpring(0,0,1,10),advanceSpring(0,0,1,1/30));});
test('spring holds still when no time has elapsed',()=>{assert.deepEqual(advanceSpring(.5,0,1,0),[.5,0]);});
test('microphone errors provide permission and missing-device recovery',()=>{assert.match(recordingError({name:'NotAllowedError'}),/blocked/);assert.match(recordingError({name:'SecurityError'}),/blocked/);assert.match(recordingError({name:'NotFoundError'}),/microphone/);assert.match(recordingError({name:'NotReadableError'}),/microphone/);assert.match(recordingError(),/unavailable/);assert.equal(recordingError({message:'test'}),'test');});
