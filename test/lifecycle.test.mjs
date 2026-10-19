import test from 'node:test';
import assert from 'node:assert/strict';
import { handlePageHide } from '../src/lifecycle.js';
test('cached pages stop capture while preserving existing recording URLs',()=>{
 const calls=[];const recorder={stop:()=>calls.push('stop'),destroy:()=>calls.push('destroy')};const urls=new Set(['blob:test']);handlePageHide({persisted:true},[recorder],urls);assert.deepEqual(calls,['stop']);assert.deepEqual([...urls],['blob:test']);
});
test('permanent unload destroys recorders and revokes all recording URLs',()=>{
 const original=URL.revokeObjectURL;const revoked=[];URL.revokeObjectURL=url=>revoked.push(url);
 try{let destroyed=0;const urls=new Set(['blob:a','blob:b']);handlePageHide({persisted:false},[{destroy(){destroyed++}}],urls);assert.equal(destroyed,1);assert.deepEqual(revoked,['blob:a','blob:b']);assert.equal(urls.size,0)}finally{URL.revokeObjectURL=original}
});
