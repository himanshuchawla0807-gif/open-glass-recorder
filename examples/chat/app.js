import { createRecorder } from '../../vendor/reference-recorder/liquid-glass-recorder.js';

const $ = selector => document.querySelector(selector);
const storageKey = 'still-conversations-v1';
let saved = [];try { saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (!Array.isArray(saved)) saved = []; } catch {}
// Audio stays in memory. Persist text only, never stale Blob URLs.
let chats = saved.filter(c => c && typeof c.id === 'string' && Array.isArray(c.messages)).map(c => ({...c,messages:c.messages.filter(m=>typeof m.text==='string' && ['user','assistant'].includes(m.role))}));
let currentId = chats[0]?.id; let busy = false; let replyTimer; const audioUrls = new Set();
function persist() { try { localStorage.setItem(storageKey, JSON.stringify(chats.map(c=>({...c,messages:c.messages.filter(m=>!m.audio)})))); } catch { $('#status').textContent = 'Browser storage unavailable · This conversation stays in this tab'; } }
function current() { return chats.find(c=>c.id===currentId); }
function newChat() {
 clearTimeout(replyTimer); busy=false; $('#send').disabled=false;
 const c={id:crypto.randomUUID(),title:'New conversation',messages:[]};chats.unshift(c);currentId=c.id;persist();render();$('#message').focus();$('#sidebar').classList.remove('open');
}
function render() {
 const c=current();$('#page-title').textContent=c.title;$('#chat-count').textContent=chats.length;
 $('#history').replaceChildren(...chats.map(chat=>{const b=document.createElement('button');b.className='history-row'+(chat.id===currentId?' current':'');b.textContent=chat.title;b.onclick=()=>{currentId=chat.id;render();$('#sidebar').classList.remove('open');};return b;}));
 $('#welcome').hidden=c.messages.length>0;$('#messages').replaceChildren();
 for(const m of c.messages) {
  const row=document.createElement('div');row.className=`message ${m.role}`;
  const icon=document.createElement('span');icon.className='message-icon';icon.textContent=m.role==='assistant'?'✳':'H';
  const bubble=document.createElement('div');bubble.className='bubble';bubble.textContent=m.text;
  if(m.audio){const audio=document.createElement('audio');audio.controls=true;audio.src=m.audio;audio.setAttribute('aria-label','Play your voice message');bubble.append(audio);}
  row.append(icon,bubble);$('#messages').append(row);
 }
 $('#conversation').scrollTop=$('#conversation').scrollHeight;
}
function answer(text) {
 const t=text.toLowerCase();
 if(/plan|day|schedule|priorit/.test(t))return 'Let’s make the day feel a little lighter.\n\n1. Pick one thing that would make today feel worthwhile.\n2. Give it a protected 25-minute block.\n3. Choose one small admin task, then leave some breathing room.\n\nWhat’s the one thing you’d most like to finish?';
 if(/creative|fresh|starting point|inspir/.test(t))return 'Try this starting point: what would your idea look like if it had to be explained with one object, one sentence, and one surprising detail?\n\nMake three deliberately different versions. Keep the part that makes you curious.\n\nWhat are you making?';
 if(/idea|untangle|mess/.test(t))return 'We can start with the rough version. It doesn’t need to sound polished.\n\nTell me three things:\n• What are you trying to make or change?\n• Who is it for?\n• Which part feels stuck?\n\nOne sentence for each is plenty.';
 return 'Here’s a useful way to sit with that thought: separate what you know, what you’re assuming, and what you want to happen next.\n\nThen choose the smallest next step that would teach you something. What would that step be?';
}
function send(text) {
 text=text.trim();if(!text||busy)return;
 const c=current();if(c.title==='New conversation')c.title=text.slice(0,32)+(text.length>32?'…':'');c.messages.push({role:'user',text});$('#message').value='';busy=true;$('#send').disabled=true;persist();render();
 const typing=document.createElement('span');typing.className='typing';typing.textContent='Still is putting a thought together…';$('#messages').append(typing);$('#conversation').scrollTop=$('#conversation').scrollHeight;
 replyTimer=setTimeout(()=>{c.messages.push({role:'assistant',text:answer(text)});busy=false;$('#send').disabled=false;persist();render();},650);
}
$('#message-form').addEventListener('submit',e=>{e.preventDefault();send($('#message').value);});
$('#message').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send(e.target.value);}});
$('#new-chat').onclick=newChat;$('#conversations').onclick=()=>$('#sidebar').classList.toggle('open');$('#menu').onclick=()=>$('#sidebar').classList.toggle('open');
for(const b of document.querySelectorAll('[data-prompt]'))b.onclick=()=>send(b.dataset.prompt);
document.addEventListener('keydown',e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();newChat();}if(e.key==='Escape')$('#sidebar').classList.remove('open');});
if(!currentId)newChat();else render();
let recordingChat;
const recorder=createRecorder($('#recorder'),{
 transparent:true,backdrop:{image:'./assets/navy-gradient.svg'},status:false,keepRecordings:false,
 params:{width:220,scale:1.25,positionY:.5,drift:0,parallax:0,exposure:1,vignette:0,shadow:0,caustic:0},
 onStart(){recordingChat=current();$('#voice-label').textContent='Tap to finish';$('#status').textContent='Recording · Your microphone is active';},
 onError({reason}){$('#voice-label').textContent='Tap to try again';$('#status').textContent=reason==='denied'?'Microphone blocked. Allow access in your browser to record.':reason==='no-device'?'No microphone found. You can still type a message.':'Microphone unavailable. You can still type a message.';},
 onStop({blob,duration}){
  $('#voice-label').textContent='Tap to talk';$('#status').textContent='Demo replies · Voice recordings stay in this tab';
  if(!blob||!blob.size)return;
  const url=URL.createObjectURL(blob);audioUrls.add(url);const c=recordingChat||current();if(c.title==='New conversation')c.title='A thought, out loud';
  c.messages.push({role:'user',text:`Voice message · ${Math.max(1,Math.round(duration))}s`,audio:url});
  c.messages.push({role:'assistant',text:'Your voice note is here. You can play it back above.\n\nThis local demo captures audio; it doesn’t transcribe it. Add a few words below if you’d like to explore the thought with a demo reply.'});persist();render();
 }
});
const adaptRecorder=()=>recorder.setParams({width:220,scale:1.25});
window.addEventListener('resize',adaptRecorder);
window.stillRecorder=recorder;
window.addEventListener('pagehide',event=>{if(event.persisted){recorder.stop();return;}window.removeEventListener('resize',adaptRecorder);recorder.destroy();for(const url of audioUrls)URL.revokeObjectURL(url);});
