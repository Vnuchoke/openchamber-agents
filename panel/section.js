"use strict";(()=>{var h="openchamber.sdk";var He="data-oc-scrolling",_t=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${He}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${He}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${He}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${He}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function ft(e){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",s=>{let a=s.target===e?o:s.target;if(!(a instanceof Element))return;a.hasAttribute("data-oc-scrolling")||a.setAttribute("data-oc-scrolling","");let p=n.get(a);p!==void 0&&clearTimeout(p),n.set(a,setTimeout(()=>{n.delete(a),a.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Dr=`(${ft.toString()})(document);`;var Ao=e=>{let o=[],n=0,s=0;return{push:a=>{for(o.push(a),s+=a.length;s-n>e&&o.length>1;){let p=o.shift();s-=p?.length??0,n=0}},pull:a=>{let p=0;for(;p<a.length&&o.length>0;){let x=o[0],I=Math.min(a.length-p,x.length-n);a.set(x.subarray(n,n+I),p),p+=I,n+=I,n>=x.length&&(o.shift(),s-=x.length,n=0)}a.fill(0,p)},clear:()=>{o.length=0,n=0,s=0},get size(){return s-n}}};var Ro=/^[a-z][a-z0-9-]{0,39}$/;var bo=e=>Object(e)===e&&!Array.isArray(e),Tt=(e,o)=>Object.keys(e).every(n=>o.includes(n)),xo=e=>String(e)===e&&e.length>=1&&e.length<=60,Oo=e=>String(e)===e&&e.length>=1&&e.length<=80,ko=e=>{if(!Array.isArray(e)||e.length>4)return!1;let o=new Set;for(let n of e){if(!bo(n)||!Ro.test(n.id)||!xo(n.label)||n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1||o.has(n.id))return!1;if(o.add(n.id),n.kind==="button"){if(!Tt(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Tt(n,["kind","id","label","value","options","disabled"])||!Oo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let s=new Set;for(let a of n.options){if(!bo(a)||!Tt(a,["value","label"])||!Oo(a.value)||!xo(a.label)||s.has(a.value))return!1;s.add(a.value)}if(!s.has(n.value))return!1}return!0};var Xr=1024*1024;var Io=["{id}","{segment}","{segments+}"];var Ln=new Set(Io);var vo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Gn=new Set(vo);var St=e=>"bytes"in e?e.bytes.byteLength:e.content.length,yo=(e,o)=>{if(e.path!==o.path||e.readOnly!==o.readOnly)return!1;if(e.encoding==="text"||o.encoding==="text")return e.encoding==="text"&&o.encoding==="text"&&e.content===o.content;if(e.bytes.byteLength!==o.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==o.bytes[n])return!1;return!0};var wo=/^[A-Za-z0-9_-]{1,80}$/;var Co=["left","right","top","bottom"];var Mo=(e,o=0,n={remaining:16e3})=>{if(--n.remaining<0||o>=32)return!1;if(e===null)return!0;let s=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let a of s)if(!Mo(a,o+1,n))return!1;return!0},ht=e=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every(o=>/^(0|[1-9]\d*)$/.test(o)&&Number(o)<e.length)&&e.every(ht);if(Object(e)===e){let o=Object.getPrototypeOf(e);return(o===null||o===Object.prototype)&&Object.values(e).every(ht)}return String(e)===e||Number.isFinite(e)},gt=e=>{try{return String(e.id)!==e.id||!wo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Co.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Mo(e.data)||!ht(e.data)?!1:JSON.stringify(e.data).length<=16e3}catch{return!1}};var At=2e3;var No=["file","directory","other","missing"],bt=e=>!!(e&&"sessionId"in e),xt=e=>!!(e&&"sent"in e&&!("sessionId"in e));var Lo=/^[0-9a-f]{7,64}$/i,Ot=e=>Lo.test(e),Xe=500,$e=32e3,Po=16e3,Go=128,Do=200,Ho=2e3,Xo=16e3,$o=80,Vo=200,Fo=16e3;var Bo=2e3;var Rt=2e4,Ve=1024,Fe=2e6;var Be=64e3,Ke=8e3,kt=4e3;var It=96e4,$r=60*6e4;var Ko=999,Wo=1e4,Ce=500,zo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],jo=["stopped","starting","ready","failed"],Vr=new Set(zo),qo=e=>Vr.has(e),Jo=e=>e&&qo(e)?e:"HOST_REJECTED",he=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(he):Object(e)===e?Object.values(e).every(he):!1,Yo=e=>he(e)&&JSON.stringify(e).length<=Fo,Uo=e=>e?.trim().slice(0,Vo)??"",ge=e=>{let o=e.id.trim().slice(0,Go),n=e.title.trim().slice(0,Do),s=e.url.trim().slice(0,Ho),a=e.text?.trim().slice(0,Xo),p=e.author?.trim().slice(0,$o),x=e.kind==="pull"?"pull":"issue",I={providerId:e.providerId.trim(),id:o,title:n||o,url:s,kind:x};if(a&&(I.text=a),p&&(I.author=p),x==="pull"){let F=Uo(e.branches?.head),Q=Uo(e.branches?.base);F&&Q&&(I.branches={head:F,base:Q})}return Yo(e.data)&&(I.data=e.data),I},vt=e=>{let o=ge(e);return e.projectId&&(o.projectId=e.projectId),e.navigation&&(o.navigation=e.navigation),e.worktree&&(o.worktree=e.worktree),o},yt=e=>{let o={text:e.text.trim().slice(0,Po)};return e.send&&(o.send=!0),o},wt=e=>e===null||!Number.isFinite(e)?null:Math.min(Ko,Math.max(0,Math.round(e))),Ct=e=>Number.isFinite(e)?Math.min(Wo,Math.max(0,Math.ceil(e))):0;var me=e=>e.length>0&&e.length<=Ve&&!e.includes("\0")&&!e.includes("\\");var We=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>Bo?!1:!e.split("/").some(n=>n==="."||n===".."),Fr=new Set(jo),Mt=e=>!!(e&&"status"in e&&Fr.has(String(e.status))&&!("body"in e)),ze=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Ut=e=>!!(e&&"content"in e&&String(e.content)===e.content),Nt=e=>!!(e&&"written"in e&&e.written===!0),Lt=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),Br=new Set(No),Pt=e=>!!(e&&"kind"in e&&"size"in e&&Br.has(String(e.kind))&&Number.isFinite(e.size)),Gt=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Kr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late","microphone-audio","microphone-ended"]),Wr=e=>Object(e)===e?e:null,mt=e=>String(e)===e&&e.length>0,zr=e=>{if(!mt(e.id))return null;if(e.ok===!0){let o={channel:h,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(o.payload=e.payload),o}return e.ok===!1&&mt(e.error)?{channel:h,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Jo(mt(e.code)?e.code:void 0)}:null},Dt=e=>{let o=Wr(e);return!o||o.channel!==h||o.v!==1?null:o.type==="result"?zr(o):!Kr.has(String(o.type))||Object(o.payload)!==o.payload?null:o};var Qo=e=>"key"in e&&"metaKey"in e&&"ctrlKey"in e,jr=e=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s",d=class extends Error{code;constructor(o,n){super(n),this.name="HostRequestError",this.code=o}},Zo=()=>Promise.reject(new d("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),je=()=>Promise.reject(new d("BAD_PATH",`File path must be 1 to ${Ve} characters without NUL or backslash.`)),qe=e=>{if(e!==void 0){if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new d("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0}},T=e=>(e.value+=1,`oc-${e.value}`),Ft=(e={})=>{let o=e.target??("window"in globalThis?window:null);if(!o)throw new d("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??(t=>t===o.parent),s=e.requestTimeoutMs??Rt,a=new Set,p=new Set,x=new Set,I=new Set,F=new Set,Q=new Set,ae=new Set,ce=new Set,Ie=new Set,ve=new Set,S=new Set,E=new Set,_=[],b=null,U=null,N=new Set,K=new Set,re=null,ne=null,lt=!1,_e=new Map,fe=new Map,Te=new Map,W=!1,f={value:0},u=null,ee=null,ye=!1,we=!1,co=null,$=null,lo=t=>t?{sessionId:t.id,phase:t.busy?"started":"completed"}:null,H=t=>{o.parent.postMessage(t,"*")},po=()=>{W||o.parent===o||E.size===0||u?.features?.lateGenerateResults!==!0||H({channel:h,v:1,type:"generate-late-listen"})},O=(t,r)=>{for(let l of t)try{l(r)}catch(c){console.error(c)}},uo=t=>{if(!(t instanceof MessageEvent)||!n(t.source))return;let r=Dt(t.data);if(!r)return;if(r.type==="workspace"){let c=fe.get(r.payload.subscriptionId);c&&O([c],r.payload.snapshot);return}if(r.type==="shells"){let c=Te.get(r.payload.subscriptionId);c&&O([c],r.payload.snapshot);return}if(r.type==="microphone-audio"){$?.queue.push(r.payload.samples);return}if(r.type==="microphone-ended"){let c=$;if(!c)return;$=null,c.release(),O(c.endedListeners,r.payload.reason);return}if(r.type==="ready"){u=r.payload,ee=lo(r.payload.session),O(a,r.payload),O(p,r.payload.directory),O(x,r.payload.session),ee&&O(I,ee),O(F,r.payload.connection),O(Q,r.payload.settings),O(ae,r.payload.item),r.payload.block&&O(ce,r.payload.block),po();return}if(r.type==="service-event"){O(Ie,r.payload);return}if(r.type==="generate-late"){E.size===0?_.push(r.payload):O(E,r.payload);return}if(r.type==="directory"){u&&(u={...u,directory:r.payload.directory}),O(p,r.payload.directory);return}if(r.type==="session"){u&&(u={...u,session:r.payload.session}),r.payload.session?ee?.sessionId!==r.payload.session.id&&(ee=lo(r.payload.session)):ee=null,O(x,r.payload.session);return}if(r.type==="session-lifecycle"){ee=r.payload,O(I,r.payload);return}if(r.type==="connection"){u&&(u={...u,connection:r.payload.connection}),O(F,r.payload.connection);return}if(r.type==="settings"){u&&(u={...u,settings:r.payload.settings}),O(Q,r.payload.settings);return}if(r.type==="item"){u&&(u={...u,item:r.payload.item}),O(ae,r.payload.item);return}if(r.type==="status-control-event"){O(ve,r.payload);return}if(r.type==="popover-closed"){O(S,r.payload);return}if(r.type==="action"){let c=A=>{W||H({channel:h,v:1,type:"action-result",id:r.id,payload:A})},m=U;if(!m){c({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>m(r.payload)).then(()=>c({ok:!0}),A=>{let R=(A instanceof Error?A.message:String(A)).trim();c({ok:!1,error:(R||"Action failed.").slice(0,Ce)})});return}if(r.type==="file-open"){let c=r.payload;if(ne&&yo(ne,c))return;ne=c,O(N,r.payload);return}if(r.type==="file-saved"){O(K,r.payload.version);return}if(r.type==="file-snapshot"){let c=R=>{W||H({channel:h,v:1,type:"file-snapshot-result",id:r.id,payload:R})},m=R=>c({error:(R.trim()||"Could not read the edited file.").slice(0,Ce)}),A=re;if(!A){m("This extension does not edit files.");return}Promise.resolve().then(()=>A(r.payload.purpose)).then(R=>{if(St(R)>2e7){m(`The file is over ${2e7} ${"bytes"in R?"bytes":"characters"}.`);return}if(R.version.length>256){m(`The snapshot version is over ${256} characters.`);return}c({snapshot:"bytes"in R?{bytes:R.bytes,version:R.version}:{content:R.content,version:R.version}})},R=>m(R instanceof Error?R.message:String(R)));return}if(r.type==="resolve"){let c=A=>{H({channel:h,v:1,type:"resolve-result",id:r.id,payload:A})},m=b;if(!m){c({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>m(r.payload)).then(A=>c({item:A?ge(A):null}),A=>{let R=(A instanceof Error?A.message:String(A)).trim();c({error:(R||"Command failed.").slice(0,Ce)})});return}let l=_e.get(r.id);if(l){if(clearTimeout(l.timer),_e.delete(r.id),r.ok){l.resolve(r.payload);return}l.reject(new d(r.code,r.error))}};o.addEventListener("message",uo),H({channel:h,v:1,type:"hello"});let L=(t,r=s)=>W||o.parent===o?Promise.reject(new d("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((l,c)=>{let m=setTimeout(()=>{_e.delete(t.id),c(new d("HOST_TIMEOUT","Host did not answer in time."))},r);_e.set(t.id,{resolve:l,reject:c,timer:m}),H(t)}),C=t=>L(t).then(()=>{}),v={channel:h,v:1},dt=t=>{!W&&o.parent!==o&&H(t)},Eo=()=>dt({...v,type:"file-save"}),pt=()=>{!W&&o.parent!==o&&H({...v,type:"microphone-close",id:T(f)})},Pr=async()=>{if($)throw new d("HOST_REJECTED","The microphone is already open in this frame.");if(u?.features?.microphone!==!0)throw new d("UNSUPPORTED","This OpenChamber cannot share the microphone with extensions.");let t=globalThis.AudioContext;if(typeof t!="function")throw new d("UNSUPPORTED","This frame has no Web Audio.");let r=new t;if(r.sampleRate<8e3||r.sampleRate>192e3)throw r.close().catch(()=>{}),new d("UNSUPPORTED",`Audio at ${r.sampleRate} Hz is not supported.`);let l=r.state==="suspended"?r.resume().catch(()=>{}):void 0,c=Ao(Math.round(r.sampleRate/4)),m=r.createScriptProcessor(1024,1,1);m.onaudioprocess=B=>c.pull(B.outputBuffer.getChannelData(0));let A=r.createMediaStreamDestination();m.connect(A);let R=new Set,Se={queue:c,endedListeners:R,release:()=>{m.onaudioprocess=null,m.disconnect(),c.clear();for(let B of A.stream.getTracks())B.stop();r.close().catch(()=>{})}};$=Se;try{let B=await L({...v,type:"microphone-open",id:T(f),payload:{sampleRate:r.sampleRate}},12e4);if(!B||!("opened"in B)||B.opened!==!0)throw new d("HOST_REJECTED","Host did not open the microphone.");if(await l,$!==Se)throw new d("DISCONNECTED","The microphone closed while it was opening.")}catch(B){throw $===Se&&($=null),Se.release(),pt(),B}return{stream:A.stream,close:()=>{$===Se&&($=null,Se.release(),pt())},onEnded:B=>(R.add(B),()=>{R.delete(B)})}},_o=t=>{!Qo(t)||!jr(t)||(t.preventDefault(),Eo())},fo=t=>{!Qo(t)||t.key!=="Escape"||u?.surface!=="popover"||!u.popover||(t.preventDefault(),go(u.popover.id,"escape").catch(()=>{}))},Pe=()=>{let t=u?.surface==="popover"?u.popover:void 0;if(!t)return;let r=ye||we;co!==r&&(co=r,mo(t.id,r).catch(()=>{}))},Ge=()=>{u?.surface!=="popover"||ye||(ye=!0,Pe())},To=t=>{u?.surface!=="popover"||t.relatedTarget!==null||!ye||(ye=!1,Pe())},So=()=>{u?.surface!=="popover"||we||(we=!0,Pe())},ho=()=>{u?.surface!=="popover"||!we||(we=!1,Pe())},z=(t,r=1024)=>{if(!t.trim()||t.length>r)throw new d("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},ut=async t=>{t.kind!=="projects"&&z(t.projectId);let r=await L({...v,type:"workspace-read",id:T(f),payload:t});if(!r||!("kind"in r)||!("state"in r)||r.kind!==t.kind)throw new d("HOST_REJECTED","Host did not return workspace data.");return r},Et=async(t,r)=>{t.kind!=="projects"&&z(t.projectId);let l=T(f);fe.set(l,r);try{await C({...v,type:"workspace-subscribe",id:T(f),payload:{subscriptionId:l,query:t}})}catch(c){throw fe.delete(l),W||H({...v,type:"workspace-unsubscribe",id:T(f),payload:{subscriptionId:l}}),c}return()=>{!fe.delete(l)||W||H({...v,type:"workspace-unsubscribe",id:T(f),payload:{subscriptionId:l}})}},Gr=async(t,r)=>{t.kind==="session"&&z(t.sessionId),t.kind==="project"&&z(t.projectId);let l=T(f);Te.set(l,r);try{await C({...v,type:"shells-subscribe",id:T(f),payload:{subscriptionId:l,scope:t}})}catch(c){throw Te.delete(l),W||H({...v,type:"shells-unsubscribe",id:T(f),payload:{subscriptionId:l}}),c}return()=>{!Te.delete(l)||W||H({...v,type:"shells-unsubscribe",id:T(f),payload:{subscriptionId:l}})}},De=async t=>{if("key"in t&&(t.key.length===0||t.key.length>128))throw new d("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!he(t.value))throw new d("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>65536)throw new d("HOST_REJECTED","Storage value exceeds 64 KiB.");if(t.scope==="device"&&u?.features?.deviceStorage!==!0)throw new d("UNSUPPORTED","This host does not support device storage.");let r=await L({...v,type:"storage",id:T(f),payload:t});if(!r||!("storage"in r)||r.op!==t.op)throw new d("HOST_REJECTED","Host did not return storage data.");return r},go=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):C({...v,type:"popover-close",id:T(f),payload:r?{id:t,reason:r}:{id:t}}),mo=(t,r)=>u?.features?.popovers!==!0&&!(u?.surface==="popover"&&u.popover?.id===t)?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):C({...v,type:"popover-anchor",id:T(f),payload:{id:t,active:r}});return o.addEventListener("keydown",fo,!0),o.addEventListener("pointerover",Ge),o.addEventListener("pointermove",Ge),o.addEventListener("pointerout",To),o.addEventListener("focus",So),o.addEventListener("blur",ho),{onAction:t=>(U=t,()=>{U===t&&(U=null)}),listProjects:async()=>{let t=await ut({kind:"projects"});if(t.kind!=="projects")throw new d("HOST_REJECTED","Expected projects.");return t},listWorktrees:async t=>{let r=await ut({kind:"worktrees",projectId:t});if(r.kind!=="worktrees")throw new d("HOST_REJECTED","Expected worktrees.");return r},listSessions:async t=>{let r=await ut({kind:"sessions",projectId:t});if(r.kind!=="sessions")throw new d("HOST_REJECTED","Expected sessions.");return r},onProjects:t=>Et({kind:"projects"},r=>{r.kind==="projects"&&t(r)}),onWorktrees:(t,r)=>Et({kind:"worktrees",projectId:t},l=>{l.kind==="worktrees"&&r(l)}),onSessions:(t,r)=>Et({kind:"sessions",projectId:t},l=>{l.kind==="sessions"&&r(l)}),onRunningShells:(t,r)=>Gr(t,r),readShellOutput:async(t,r)=>{z(t,128);let l=r?.cursor;if(l!==void 0&&(!Number.isInteger(l)||l<0))throw new d("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let c=r?.tailBytes;if(c!==void 0&&(!Number.isInteger(c)||c<1||c>65536))throw new d("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${65536}.`);let A=await L({...v,type:"shell-output",id:T(f),payload:{shellId:t,cursor:l,tailBytes:c}});if(!A||typeof A.output!="string"||!Number.isFinite(A.cursor))throw new d("HOST_REJECTED","Host did not return shell output.");return A},stopShell:async t=>{if(z(t,128),(await L({...v,type:"shell-stop",id:T(f),payload:{shellId:t}}))?.stopped!==!0)throw new d("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async t=>{z(t),await C({...v,type:"open-session",id:T(f),payload:{sessionId:t}})},storage:{get:async(t,r)=>{let l=qe(r),c={op:"get",key:t};l&&(c.scope=l);let m=await De(c);return m.op==="get"&&m.found?m.value:void 0},set:async(t,r,l)=>{let c=qe(l),m={op:"set",key:t,value:r};c&&(m.scope=c),await De(m)},delete:async(t,r)=>{let l=qe(r),c={op:"delete",key:t};l&&(c.scope=l),await De(c)},keys:async t=>{let r=qe(t),l={op:"keys"};r&&(l.scope=r);let c=await De(l);if(c.op!=="keys")throw new d("HOST_REJECTED","Expected storage keys.");return c.keys}},onReady:t=>(a.add(t),u&&t(u),()=>{a.delete(t)}),onDirectory:t=>(p.add(t),u&&t(u.directory),()=>{p.delete(t)}),onSession:t=>(x.add(t),u&&t(u.session),()=>{x.delete(t)}),onSessionLifecycle:t=>(I.add(t),ee&&t(ee),()=>{I.delete(t)}),onConnection:t=>(F.add(t),u&&t(u.connection),()=>{F.delete(t)}),onSettings:t=>(Q.add(t),u&&t(u.settings),()=>{Q.delete(t)}),onItem:t=>(ae.add(t),u&&t(u.item),()=>{ae.delete(t)}),onBlock:t=>(ce.add(t),u?.block&&t(u.block),()=>{ce.delete(t)}),onServiceEvent:t=>(Ie.add(t),()=>{Ie.delete(t)}),onStatusControl:t=>(ve.add(t),()=>{ve.delete(t)}),onPopoverClosed:t=>(S.add(t),()=>{S.delete(t)}),setStatusControls:t=>u?.features?.statusControls!==!0?Promise.reject(new d("UNSUPPORTED","This host does not support status controls.")):ko(t)?C({...v,type:"status-controls",id:T(f),payload:{controls:t}}):Promise.reject(new d("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options.")),openPopover:t=>u?.features?.popovers!==!0?Promise.reject(new d("UNSUPPORTED","This host does not support popovers.")):gt(t)?C({...v,type:"popover-open",id:T(f),payload:t}):Promise.reject(new d("HOST_REJECTED","Popover requests need bounded geometry and JSON data.")),closePopover:go,setPopoverAnchorActive:mo,onResolve:t=>(b=t,()=>{b===t&&(b=null)}),toast:t=>{let r=t.message.trim();return!r||r.length>Xe?Promise.reject(new d("HOST_REJECTED",`Toast message must contain 1 to ${Xe} characters.`)):t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>$e)?Promise.reject(new d("HOST_REJECTED",`Toast copy text must contain 1 to ${$e} characters.`)):C({channel:h,v:1,type:"toast",id:T(f),payload:{...t,message:r}})},openUrl:t=>C({channel:h,v:1,type:"open-url",id:T(f),payload:{url:t}}),openCommit:t=>Ot(t)?C({channel:h,v:1,type:"open-commit",id:T(f),payload:{sha:t}}):Promise.reject(new d("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:t=>C({channel:h,v:1,type:"block-answer",id:T(f),payload:{text:t.trim().slice(0,At)}}),openSurface:t=>C({channel:h,v:1,type:"open-surface",id:T(f),payload:{surfaceId:t}}),writeClipboard:t=>C({channel:h,v:1,type:"clipboard-write",id:T(f),payload:{text:t}}),compose:t=>C({channel:h,v:1,type:"compose",id:T(f),payload:t}),attach:t=>C({channel:h,v:1,type:"attach",id:T(f),payload:ge(t)}),startSession:async t=>{t.projectId!==void 0&&z(t.projectId);let r=t.worktree;r&&r!==!0&&(r.kind==="existing"?z(r.directory):(r.name!==void 0&&z(r.name,200),r.baseBranch!==void 0&&z(r.baseBranch,200)));let l=await L({channel:h,v:1,type:"start-session",id:T(f),payload:vt(t)},e.requestTimeoutMs??18e4);if(!bt(l))throw new d("HOST_REJECTED","Host did not return a session.");return l},prompt:t=>L({channel:h,v:1,type:"prompt",id:T(f),payload:yt(t)}).then(r=>{if(!xt(r))throw new d("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:t=>C({channel:h,v:1,type:"session-link",id:T(f),payload:ge(t)}),close:()=>C({channel:h,v:1,type:"close",id:T(f)}),oauthStart:()=>C({channel:h,v:1,type:"oauth-start",id:T(f)}),oauthDisconnect:()=>C({channel:h,v:1,type:"oauth-disconnect",id:T(f)}),request:t=>(We(t.path)?L({channel:h,v:1,type:"request",id:T(f),payload:t}):Zo()).then(r=>{if(!ze(r))throw new d("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:t=>(We(t.path)?L({channel:h,v:1,type:"service-request",id:T(f),payload:t}):Zo()).then(r=>{if(!ze(r))throw new d("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>L({channel:h,v:1,type:"service-status",id:T(f)}).then(t=>{if(!Mt(t))throw new d("HOST_REJECTED","Host did not return service status.");return t}),readFile:t=>(me(t)?L({channel:h,v:1,type:"file-read",id:T(f),payload:{path:t}}):je()).then(r=>{if(!Ut(r))throw new d("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(t,r)=>me(t)?r.length>Fe?Promise.reject(new d("FILE_TOO_LARGE",`Content is over ${Fe} characters.`)):L({channel:h,v:1,type:"file-write",id:T(f),payload:{path:t,content:r}}).then(l=>{if(!Nt(l))throw new d("HOST_REJECTED","Host did not confirm the write.");return l}):je(),listDir:t=>(me(t)?L({channel:h,v:1,type:"file-list",id:T(f),payload:{path:t}}):je()).then(r=>{if(!Lt(r))throw new d("HOST_REJECTED","Host did not return directory entries.");return r}),stat:t=>(me(t)?L({channel:h,v:1,type:"file-stat",id:T(f),payload:{path:t}}):je()).then(r=>{if(!Pt(r))throw new d("HOST_REJECTED","Host did not return file status.");return r}),generate:t=>{let r=t.prompt.trim(),l=t.system?.trim();if(r.length===0||r.length>Be)return Promise.reject(new d("HOST_REJECTED",`Prompt must be 1 to ${Be} characters.`));if(l!==void 0&&(l.length===0||l.length>Ke))return Promise.reject(new d("HOST_REJECTED",`System prompt must be 1 to ${Ke} characters.`));let c=t.maxOutputTokens===void 0?void 0:Math.min(kt,Math.max(1,Math.floor(t.maxOutputTokens)));if(c!==void 0&&!Number.isFinite(c))return Promise.reject(new d("HOST_REJECTED","maxOutputTokens must be a number."));let m={prompt:r};return l!==void 0&&(m.system=l),c!==void 0&&(m.maxOutputTokens=c),L({channel:h,v:1,type:"generate",id:T(f),payload:m},e.requestTimeoutMs??It).then(A=>{if(!Gt(A))throw new d("HOST_REJECTED","Host did not return generated text.");return A})},onLateGenerateResult:t=>{E.add(t);for(let r of _.splice(0))O([t],r);return po(),()=>{E.delete(t)}},openMicrophone:Pr,setBadge:t=>C({channel:h,v:1,type:"badge",id:T(f),payload:{count:wt(t)}}),setHeight:t=>C({channel:h,v:1,type:"resize",id:T(f),payload:{height:Ct(t)}}),onFileOpen:t=>(N.add(t),lt||(lt=!0,o.addEventListener("keydown",_o,!0)),ne&&t(ne),()=>{N.delete(t)}),onFileSnapshot:t=>(re=t,()=>{re===t&&(re=null)}),onFileSaved:t=>(K.add(t),()=>{K.delete(t)}),reportFileChange:t=>dt({...v,type:"file-change",payload:{dirty:t.dirty,edited:t.edited}}),requestFileSave:Eo,reportFileUnsupported:()=>dt({...v,type:"file-unsupported"}),dispose:()=>{for(let t of fe.keys())H({...v,type:"workspace-unsubscribe",id:T(f),payload:{subscriptionId:t}});fe.clear();for(let t of Te.keys())H({...v,type:"shells-unsubscribe",id:T(f),payload:{subscriptionId:t}});Te.clear(),$&&(pt(),$.release(),$=null),W=!0,b=null,U=null,re=null,N.clear(),K.clear(),lt&&o.removeEventListener("keydown",_o,!0),o.removeEventListener("message",uo),o.removeEventListener("keydown",fo,!0),o.removeEventListener("pointerover",Ge),o.removeEventListener("pointermove",Ge),o.removeEventListener("pointerout",To),o.removeEventListener("focus",So),o.removeEventListener("blur",ho);for(let t of _e.values())clearTimeout(t.timer),t.reject(new d("HOST_UNAVAILABLE","Host client was disposed."));_e.clear(),a.clear(),p.clear(),x.clear(),I.clear(),F.clear(),Q.clear(),ae.clear(),ce.clear(),Ie.clear(),ve.clear(),S.clear(),E.clear(),_.length=0}}};var sr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var es=new Set(sr);var qr=10*6e4;var Jr=10*6e4;var Yr=10*6e4;var Qr=10*6e4;var ir=["none","agent","user"];var os=new Set(ir);var Zr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],en=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ar=(e,o)=>{o.style.colorScheme=e.mode;for(let[n,s]of Zr)o.style.setProperty(n,e.tokens[s]);for(let[n,s,a]of en){let p=e.tokens[a]??"";o.style.setProperty(n,p),o.style.setProperty(s,p)}o.style.setProperty("font-family",e.tokens.font),o.style.setProperty("font-size",e.tokens.fontSize??"0.875rem"),o.style.setProperty("line-height","1.45"),o.style.setProperty("color",e.tokens.foreground)},Bt=(e,o)=>{ar(e.theme,o),o.dataset&&(o.dataset.ocSurface=e.surface,o.dataset.ocTheme=e.theme.mode)};var tn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},k=(e,o)=>`var(--${e}, var(--oc-${tn[e]}, ${o}))`,oe=k("surface-background","transparent"),Ye=k("surface-elevated","transparent"),Ae=k("surface-elevated-foreground","inherit"),V=k("surface-foreground","inherit"),y=k("surface-muted-foreground","gray"),on=k("surface-muted","transparent"),le=k("interactive-border","currentColor"),X=k("interactive-hover","transparent"),de=k("interactive-active","transparent"),Kt=k("interactive-selection","transparent"),Wt=k("interactive-selection-foreground","inherit"),te=k("primary","currentColor"),zt=k("primary-text","inherit"),jt=k("error-text","inherit"),rn=k("font-sans","inherit"),qt=k("font-mono","monospace"),pr=k("radius","9px"),Jt=`calc(${pr} - 2px)`,cr=`calc(${pr} - 4px)`,w=(e,o,n="transparent")=>`color-mix(in srgb, ${e} ${o}%, ${n})`,lr=`background-image: linear-gradient(${X}, ${X});`,Yt=(e,o="0.5px")=>`box-shadow: inset 0 0 0 ${o} ${e}, var(--oc-sdk-field-lift);`,Qt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",dr="box-shadow: var(--oc-sdk-lit);",Zt=`inset 0 0.5px 0 0 ${w(V,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,nn=`
:root {
  --oc-sdk-edge: ${w(V,16)};
  --oc-sdk-field-bg: ${Ye};
  --oc-sdk-raised-bg: ${oe};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${w(V,14)};
  --oc-sdk-field-bg: ${w(oe,50,Ye)};
  --oc-sdk-raised-bg: ${Ye};
  --oc-sdk-field-lift: ${Zt};
  --oc-sdk-raised-lift: ${Zt};
  --oc-sdk-lit: ${Zt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Je=e=>{let o=k(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${o}; --oc-sdk-tone-text: ${k(`${e}-text`,"inherit")}; }`},i=e=>`calc(${e}rem / 14)`,sn=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: ${i(8)}; height: ${i(32)}; padding: 0 ${i(12)}; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: ${i(6)}; height: ${i(28)}; padding: 0 ${i(10)}; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: ${i(4)}; height: ${i(24)}; padding: 0 ${i(8)}; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: ${i(14)}; height: ${i(14)}; }

.oc-sdk-field { display: flex; flex-direction: column; gap: ${i(4)}; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: ${i(32)}; padding: 0 ${i(10)}; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: ${i(8)} ${i(10)}; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: ${i(34)}; padding-right: ${i(34)}; }
.oc-sdk-search-icon { position: absolute; left: ${i(11)}; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: ${i(6)}; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: ${i(24)}; height: ${i(24)}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: ${i(4)}; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: ${i(6)}; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: ${i(28)}; padding: 0 ${i(10)}; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: ${i(2)}; min-width: ${i(160)}; max-width: calc(100vw - ${i(16)}); max-height: min(${i(320)}, calc(100vh - ${i(16)})); overflow: auto; padding: ${i(4)}; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: ${i(2)} ${i(2)} ${i(4)}; }
.oc-sdk-popup-search .oc-sdk-input { height: ${i(28)}; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: ${i(8)}; width: 100%; padding: ${i(6)} ${i(8)}; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: ${i(14)}; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: ${i(8)}; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: ${i(8)}; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: ${i(14)}; height: ${i(14)}; margin-top: ${i(3)}; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: ${i(36)}; height: ${i(20)}; --oc-sdk-thumb-travel: ${i(16)}; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: ${i(2)}; left: ${i(2)}; width: ${i(16)}; height: ${i(16)}; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: ${i(2)}; padding: ${i(2)}; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: ${i(6)}; height: ${i(28)}; padding: 0 ${i(10)}; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: ${i(1)} ${i(6)}; font-size: ${i(11)}; font-weight: 500; line-height: ${i(16)}; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: ${i(8)}; width: 100%; padding: ${i(6)} ${i(8)}; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: ${i(64)}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: ${i(16)} ${i(8)}; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: ${i(4)}; padding: ${i(40)} ${i(16)}; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: ${i(12)}; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: ${i(8)}; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: ${i(16)}; height: ${i(16)}; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: ${i(12)}; height: ${i(12)}; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: ${i(12)}; padding: ${i(8)} ${i(12)}; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: ${i(2)}; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: ${i(8)}; width: 100%; margin: ${i(8)} 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: ${i(4)} 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: ${i(4)}; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: ${i(6)}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: ${i(2)}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: ${i(8)} 0; }

/* Under a finger the controls reach the app's touch sizes: rows and options 44px like its sheets, every other
   control at least 36px. Inputs keep 16px text, below which iOS zooms the page on focus. */
@media (pointer: coarse) {
  .oc-sdk-btn, .oc-sdk-input { height: ${i(40)}; }
  .oc-sdk-btn[data-size="sm"], .oc-sdk-btn[data-size="xs"], .oc-sdk-trigger, .oc-sdk-tab, .oc-sdk-popup-search .oc-sdk-input { height: ${i(36)}; }
  .oc-sdk-input, .oc-sdk-popup-search .oc-sdk-input { font-size: max(16px, 0.875rem); }
  .oc-sdk-search-clear { width: ${i(36)}; height: ${i(36)}; right: 0; }
  .oc-sdk-row, .oc-sdk-option { min-height: ${i(44)}; }
  .oc-sdk-check { min-height: ${i(36)}; padding: ${i(8)} 0; }
}
`,ur=`${nn}
.oc-sdk { color: ${V}; font-family: ${rn}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${lr} }
.oc-sdk-mono { font-family: ${qt}; }
.oc-sdk-muted { color: ${y}; }
${Je("success")}${Je("warning")}${Je("error")}${Je("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${te}; --oc-sdk-tone-text: ${zt}; }

.oc-sdk-btn { border-radius: ${Jt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${cr}; }
.oc-sdk-btn[data-variant="default"] { color: ${zt}; background: ${w(te,10,oe)}; border-color: ${w(te,12)}; ${dr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${w(te,16,oe)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${w(te,22,oe)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${on}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${X}, ${X}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ae}; ${Qt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${X}, ${X}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${de}, ${de}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${X}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${de}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${k("status-error","red")}; color: ${jt}; background: ${w("var(--oc-sdk-tone)",7,oe)}; border-color: ${w("var(--oc-sdk-tone)",12)}; ${dr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${w("var(--oc-sdk-tone)",9,oe)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${w("var(--oc-sdk-tone)",11,oe)}; box-shadow: none; }

.oc-sdk-field-note { color: ${y}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${jt}; }
.oc-sdk-input { border-radius: ${Jt}; background: var(--oc-sdk-field-bg); color: ${Ae}; ${Yt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${y}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${X}, ${X}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Yt(w(V,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Yt(k("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${qt}; }

.oc-sdk-search-icon { color: ${y}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${te}; }
.oc-sdk-search-clear { border-radius: ${cr}; color: ${y}; }
.oc-sdk-search-clear:hover { background: ${X}; color: ${V}; }

.oc-sdk-trigger { border-radius: ${Jt}; background: var(--oc-sdk-raised-bg); color: ${Ae}; ${Qt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${X}, ${X}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${de}, ${de}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${y}; }
.oc-sdk-trigger-chevron { color: ${y}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ae}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ye}; background-clip: padding-box; color: ${Ae}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${X}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Kt}; color: ${Wt}; }
.oc-sdk-option-check { color: ${V}; }
.oc-sdk-option[data-destructive="true"] { color: ${jt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${w(k("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${y}; }
.oc-sdk-popup-empty { color: ${y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${le}; border-radius: 4px; color: ${V}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${w(V,60,le)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${le}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${oe}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${te}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(var(--oc-sdk-thumb-travel, 16px)); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${lr} }
.oc-sdk-check-desc { color: ${y}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${w(V,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${y}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${V}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Wt}; background: ${Kt}; border-color: ${le}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ae}; background: var(--oc-sdk-raised-bg); ${Qt} }
.oc-sdk-tab-count { color: ${y}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${w(V,6)}; color: ${y}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${w("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${X}; }
.oc-sdk-row[aria-selected="true"] { background: ${Kt}; color: ${Wt}; }
.oc-sdk-row-lead { font-family: ${qt}; color: ${y}; }
.oc-sdk-row-sub { color: ${y}; }
.oc-sdk-row-meta { color: ${y}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${y}; }

.oc-sdk-empty-body { color: ${y}; }

.oc-sdk-spinner { color: ${y}; }
.oc-sdk-spinner-ring { border-color: ${le}; border-top-color: ${te}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${w("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${y}; }

.oc-sdk-separator { color: ${y}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${w(le,40)}; }

.oc-sdk-progress-label { color: ${y}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${w(V,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${te}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${k("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${k("success-text","inherit")}; }

.oc-sdk-text a { color: ${zt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${w(le,60)}; }
`,P=`
${_t}
${sn}
${ur}`;var Er="oc-sdk-ui-style";var G=e=>{let o=document.getElementById(Er);if(o instanceof HTMLStyleElement){o.textContent!==e&&(o.textContent=e);return}ft(document);let n=document.createElement("style");n.id=Er,n.textContent=e,document.head.appendChild(n)},D=(e,o)=>{let n=document.createElement(e);return o&&(n.className=o),n},se=e=>{let o=D("button",e);return o.type="button",o},j=(e,o)=>{let n=o??"";e.textContent!==n&&(e.textContent=n)};var an=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},ie=(e,o)=>{G(P);let n=o,s=se("oc-sdk oc-sdk-btn"),a=an(),p=document.createElement("span");s.append(p),e.append(s);let x=()=>{s.dataset.variant=n.variant??"default",s.dataset.size=n.size??"default",s.disabled=!!n.disabled||!!n.loading,s.dataset.loading=n.loading?"true":"false",s.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&a.parentNode!==s?s.prepend(a):!n.loading&&a.parentNode===s&&a.remove(),j(p,n.label)},I=()=>{n.disabled||n.loading||n.onClick()};return s.addEventListener("click",I),x(),{update:F=>{n={...n,...F},x()},dispose:()=>{s.removeEventListener("click",I),s.remove()}}};var be="~/.config/opencode/AGENTS.md",Z="~/.config/openchamber/agents-manager",pe=`${Z}/library.json`,_r=1e5,eo=100;var q=class extends Error{},ot=e=>e.global.exists?e.library.profiles.find(o=>!o.archived&&o.content===e.global.content):void 0,to=(e,o)=>e.exists===o.exists&&e.content===o.content;var oo=e=>{if(!e)return 0;let o=0;for(let s=0;s<e.length;s+=1){let a=e.charCodeAt(s);(a>=19968&&a<=40959||a>=13312&&a<=19903||a>=12288&&a<=12543||a>=44032&&a<=55215||a>=65280&&a<=65519)&&(o+=1)}let n=Math.max(0,e.length-o);return Math.max(1,Math.round(o*1.45+n/4))};var fr=e=>typeof e=="string"&&/^[a-zA-Z0-9-]{1,80}$/.test(e),ro=(e,o)=>{if(!e.trim()||e.trim().length>60)throw new Error("Profile name must contain 1-60 characters.");if(o.length>_r)throw new Error("Rules cannot exceed 100,000 characters.");if(o.includes("\0"))throw new Error("Use plain text rules without null bytes.")},Tn=e=>{try{let o=JSON.parse(e);if(o.version!==1||!Array.isArray(o.profiles)||o.profiles.length>eo)throw new Error;let n=new Set;for(let s of o.profiles){if(!s||!fr(s.id)||n.has(s.id)||typeof s.name!="string"||typeof s.content!="string"||typeof s.archived!="boolean"||!Number.isFinite(s.createdAt)||!Number.isFinite(s.updatedAt))throw new Error;ro(s.name,s.content),n.add(s.id)}return o}catch{throw new Error("Invalid profile library. The existing file was not changed. Repair library.json or restore its backup first.")}},rt=async(e,o)=>{if(await e.read(pe)!==o)throw new q("Another window changed the profile library. Refresh first; your current draft will be kept.")},Tr=(e,o=Date.now,n=()=>crypto.randomUUID())=>{let s=async()=>{let S=await e.read(be);return{exists:S!==null,content:S??""}},a=async(S,E)=>{let _=JSON.stringify(S,null,2);if(_.length>15e5)throw new Error("The profile library has reached its size limit. Export and reduce its contents first.");if(await rt(e,E),await e.write(pe,_),await e.read(pe)!==_)throw new q("The profile library changed again after saving. Refresh; do not overwrite it again.");return _},p=async(S=!1)=>{let[E,_]=await Promise.all([e.read(pe),s()]);if(E!==null)return{raw:E,library:Tn(E),global:_};let b={version:1,profiles:[]};if(S&&_.exists){ro("Existing global rules",_.content);let U=o();b.profiles.push({id:n(),name:"Existing global rules",content:_.content,archived:!1,createdAt:U,updatedAt:U})}return{raw:S?await a(b,null):null,library:b,global:_}},x=async(S,E)=>{ro(E.name,E.content);let _=structuredClone(S.library),b=E.id?_.profiles.find(N=>N.id===E.id):void 0;if(E.id&&!b)throw new q("This profile is no longer in the library. Refresh first.");if(b?.archived)throw new Error("Unarchive this profile before editing.");if(_.profiles.some(N=>N.id!==E.id&&N.name===E.name.trim()))throw new Error("A profile with the same name already exists. Choose a different name.");if(b)Object.assign(b,{name:E.name.trim(),content:E.content,updatedAt:o()});else{if(_.profiles.length>=eo)throw new Error("You can save up to 100 profiles, including archived profiles.");_.profiles.push({id:n(),name:E.name.trim(),content:E.content,createdAt:o(),updatedAt:o(),archived:!1})}let U=await a(_,S.raw);return{library:_,raw:U,global:S.global}},I=async(S,E,_)=>{let b=structuredClone(S.library),U=b.profiles.find(K=>K.id===E);if(!U)throw new q("This profile no longer exists. Refresh first.");let N=await s();if(_&&N.exists&&U.content===N.content)throw new Error("This profile matches the current global file. Activate another profile before archiving it.");return U.archived=_,U.updatedAt=o(),{library:b,raw:await a(b,S.raw),global:N}},F=async(S,E)=>{await rt(e,S.raw);let _=S.library.profiles.find(b=>b.id===E&&!b.archived);if(!_)throw new Error("Select a saved, unarchived profile.");return{name:_.name,content:_.content,before:await s(),source:"profile",profileId:_.id}},Q=async(S,E)=>{if(E.readonly)throw new Error("Read-only diff previews cannot be applied. Save the profile first, then preview activation.");if(E.source==="profile"){await rt(e,S.raw);let N=S.library.profiles.find(K=>K.id===E.profileId&&!K.archived);if(!N||N.content!==E.content)throw new q("The profile changed. Preview it again.")}let _=await s();if(!to(_,E.before))throw new q("The global file changed after preview. Nothing was written. Go back and preview the changes again.");if(_.exists&&_.content===E.content)return{global:_,backup:null};let b=null;if(_.exists){let N=o();b=`${N}-${n()}`;let K={version:1,id:b,createdAt:N,label:`Before ${E.source==="backup"?"restoring":"activating"} "${E.name}"`,content:_.content},re=`${Z}/backups/${b}.json`,ne=JSON.stringify(K,null,2);if(await e.write(re,ne),await e.read(re)!==ne)throw new Error("Backup verification failed. The global file was not changed.")}if(E.source==="profile"&&await rt(e,S.raw),_=await s(),!to(_,E.before))throw new q("The global file changed before writing. Nothing was written. Preview again.");await e.write(be,E.content);let U=await s();if(!U.exists||U.content!==E.content)throw new q("File content after writing does not match the profile. Another editor may have written concurrently. Refresh; the backup from before this change is still available.");return{global:U,backup:b}},ae=async()=>(await e.list(`${Z}/backups`)).filter(S=>/^\d{13}-[a-f0-9-]{36}\.json$/.test(S)).sort().reverse().slice(0,50).map(S=>S.slice(0,-5)),ce=async S=>{if(!/^\d{13}-[a-f0-9-]{36}$/.test(S))throw new Error("Invalid backup ID.");let E=await e.read(`${Z}/backups/${S}.json`);try{let _=JSON.parse(E??"");if(_.version!==1||_.id!==S||!Number.isFinite(_.createdAt)||typeof _.label!="string"||typeof _.content!="string")throw new Error;return _}catch{throw new Error("The backup is missing or invalid. The global file was not changed.")}};return{load:p,readGlobal:s,save:x,archive:I,reviewProfile:F,apply:Q,listBackups:ae,readBackup:ce,reviewBackup:async S=>{let E=await ce(S);return{source:"backup",name:new Date(E.createdAt).toLocaleString("en-US"),content:E.content,before:await s()}},exportProfile:async S=>{if(!fr(S.id))throw new Error("Invalid profile ID.");let E=`${Z}/exports/${S.id}.md`;return await e.write(E,S.content),E}}};var nt=e=>e&&typeof e=="object"&&"code"in e?e.code:void 0,Sn=(e,o)=>e===be?"global rules":e===pe?"profile library":e===`${Z}/backups`&&o==="list"?"backup list":e.startsWith(`${Z}/backups/`)?"backup file":e.startsWith(`${Z}/exports/`)?"export file":o==="list"?"file list":"file",Sr=(e,o=!1)=>{let n=nt(e);if(n==="NOT_GRANTED")return"In Settings \u2192 Extensions, allow AGENTS.md Manager to access its declared rules file and profile directory.";if(n==="DENIED")return"Insufficient file permissions. Check permissions on the rules file or profile directory.";if(n==="HOST_TIMEOUT")return"The host timed out. Refresh to confirm the actual file state before continuing.";if(n==="BAD_PATH")return"The target path is outside the granted scope, or a symbolic link points to another directory.";if(n==="HOST_REJECTED"){let s=e instanceof Error?e.message:"";if(o&&s==="Extension operation failed.")return"The current directory contains characters outside Latin-1, triggering an OpenChamber file API compatibility issue. As a workaround, open AGENTS.md Manager from the right sidebar in a session without a project.";if(!s||s==="Extension operation failed."||s==="File operation failed.")return"The OpenChamber file API failed without a specific reason. Refresh; if it keeps failing, reload the panel."}return e instanceof Error?e.message:"The operation did not complete. Try again."},xe=class extends Error{code;constructor(o,n,s,a){let p=o==="write"?"write":"read";super(`Failed to ${p} ${Sn(n,o)}: ${Sr(s,a)}${o==="write"?" The write result is unconfirmed. Refresh to check the actual state. Do not repeat the write without checking.":""}`,{cause:s}),this.name="FileOperationError",this.code=nt(s)}},hr=e=>{let o=!1,n=s=>{o=/[^\u0000-\u00ff]/.test(s??"")};return e.onReady(s=>n(s.directory)),e.onDirectory(n),{async read(s){let a=o;try{return(await e.readFile(s)).content}catch(p){if(nt(p)==="NOT_FOUND")return null;throw new xe("read",s,p,a)}},async write(s,a){let p=o;try{await e.writeFile(s,a)}catch(x){throw new xe("write",s,x,p)}},async list(s){let a=o;try{return(await e.listDir(s)).entries.filter(p=>p.kind==="file").map(p=>p.name)}catch(p){if(nt(p)==="NOT_FOUND")return[];throw new xe("list",s,p,a)}}}},no=e=>e instanceof xe?e.message:Sr(e);var gr=()=>typeof navigator<"u"&&navigator.language?navigator.language:"en",mr=e=>(e??"").toLowerCase().startsWith("zh")?"zh":"en",hn=(e,o)=>o?e.replace(/\{(\w+)\}/g,(n,s)=>Object.prototype.hasOwnProperty.call(o,s)?String(o[s]):n):e;var Ar=(e,o=gr())=>{let n=o||"en",s=mr(n);return{t:(p,x)=>hn(s==="zh"?p:e[p]??p,x),get language(){return s},get locale(){return n},setLocale(p){let x=p||gr(),I=mr(x);return n=x,I===s?!1:(s=I,!0)}}},so=e=>{document.documentElement.lang=e.language==="zh"?"zh-CN":"en"};var gn={\u89C4\u5219\u65B9\u6848:"AGENTS.md Manager",\u89C4\u5219\u65B9\u6848\u9009\u62E9:"Rule profile",\u672A\u5339\u914D\u5DF2\u4FDD\u5B58\u65B9\u6848:"No matching saved profile",\u5168\u5C40\u89C4\u5219\u4E3A\u7A7A:"Global rules are empty",\u5C1A\u65E0\u5168\u5C40\u89C4\u5219\u6587\u4EF6:"No global rules file","\u6B63\u5728\u8FDE\u63A5 OpenChamber\u2026":"Connecting to OpenChamber\u2026",\u5F53\u524D\u5168\u5C40\u6587\u4EF6:"Current global file","\u5F53\u524D\u8FDE\u63A5\u7684 OpenCode \xB7 \u5168\u5C40":"Connected OpenCode \xB7 Global",\u5904\u7406\u672A\u4FDD\u5B58\u8349\u7A3F:"Unsaved draft actions","\u6709\u672A\u4FDD\u5B58\u7684\u4FEE\u6539\uFF0C\u5982\u4F55\u7EE7\u7EED\uFF1F":"You have unsaved changes. How would you like to continue?",\u89C4\u5219\u65B9\u6848\u7F16\u8F91:"Rule profile editor",\u65B9\u6848\u7BA1\u7406:"Profile management",\u5168\u5C40\u89C4\u5219\u5907\u4EFD:"Global rules backups",\u5907\u4EFD\u5185\u5BB9:"Backup content",\u542F\u7528\u5DEE\u5F02\u9884\u89C8:"Activation changes preview","\u89C4\u5219\u5DEE\u5F02\uFF0C\u5DE6\u4FA7\u4E3A\u539F\u884C\u53F7\uFF0C\u53F3\u4FA7\u4E3A\u65B0\u884C\u53F7":"Rule changes: old line numbers on the left, new line numbers on the right","\u5199\u5165\u524D\u5907\u4EFD\u5F53\u524D\u6587\u4EF6\u3002\u5DF2\u6709\u4F1A\u8BDD\u662F\u5426\u91CD\u65B0\u52A0\u8F7D\u89C4\u5219\u7531 OpenCode \u51B3\u5B9A\uFF0C\u5EFA\u8BAE\u5728\u65B0\u4F1A\u8BDD\u786E\u8BA4\u3002":"The current file is backed up before writing. OpenCode controls whether existing sessions reload rules. Confirm rule loading in a new session.",\u91CD\u65B0\u8BFB\u53D6:"Refresh",\u65B0\u5EFA:"New",\u590D\u5236:"Copy",\u5BFC\u5165:"Import",\u5BFC\u51FA\u6587\u4EF6:"Export file",\u5F52\u6863:"Archive",\u663E\u793A\u5F52\u6863:"Show archived",\u4FDD\u5B58\u65B9\u6848:"Save profile",\u9884\u89C8\u542F\u7528:"Preview activation",\u4FDD\u5B58\u540E\u7EE7\u7EED:"Save and continue",\u653E\u5F03\u4FEE\u6539:"Discard changes",\u7EE7\u7EED\u7F16\u8F91:"Keep editing",\u8FD4\u56DE\u7F16\u8F91:"Back to editor",\u786E\u8BA4\u542F\u7528:"Confirm activation",\u9884\u89C8\u6062\u590D:"Preview restore",\u65B9\u6848:"Profiles",\u5907\u4EFD:"Backups","\u641C\u7D22\u65B9\u6848\u2026":"Search profiles\u2026",\u65B0\u5EFA\u65B9\u6848:"New profile",\u65B9\u6848\u540D\u79F0:"Profile name","\u4F8B\u5982\uFF1A\u65E5\u5E38\u5F00\u53D1":"For example: Daily development","\u89C4\u5219\u5185\u5BB9 \xB7 Markdown":"Rules \xB7 Markdown","# \u5F00\u53D1\u7EA6\u5B9A\n\n\u5728\u8FD9\u91CC\u586B\u5199\u5168\u5C40\u5DE5\u4F5C\u89C4\u5219\u2026":`# Development conventions

Write your global working rules here\u2026`,\u5907\u4EFD\u65F6\u95F4:"Backup time","\u641C\u7D22\u65F6\u95F4\u2026":"Search times\u2026",\u9009\u62E9\u5907\u4EFD:"Select a backup",\u6062\u590D\u5907\u4EFD:"Restore backup",\u542F\u7528\u65B9\u6848:"Activate profile","{action}\uFF1A{name}":"{action}: {name}","\u6B64\u64CD\u4F5C\u5C06\u6E05\u7A7A\u5168\u5C40 AGENTS.md \u7684\u5185\u5BB9\u3002":"This will clear the contents of the global AGENTS.md.","\u6B64\u64CD\u4F5C\u5C06\u66FF\u6362\u5F53\u524D\u8FDE\u63A5\u7684 OpenCode \u5168\u5C40 AGENTS.md\uFF0C\u5F71\u54CD\u5171\u4EAB\u6B64\u6587\u4EF6\u7684\u9879\u76EE\u3002":"This will replace the connected OpenCode global AGENTS.md, affecting projects that share this file.","\u65B0\u589E {added} \u884C \xB7 \u5220\u9664 {removed} \u884C":"Lines added: {added} \xB7 Lines removed: {removed}"," \xB7 \u5927\u6BB5\u53D8\u66F4\u6309\u6574\u5757\u5C55\u793A":" \xB7 Large changes shown as blocks"," \xB7 \u4EC5\u6362\u884C\u683C\u5F0F\u53D8\u5316":" \xB7 Line endings only"," \xB7 \u5C06\u521B\u5EFA\u6587\u4EF6":" \xB7 File will be created"," \xB7 \u5185\u5BB9\u4E00\u81F4\uFF0C\u65E0\u9700\u5199\u5165":" \xB7 Identical content; no write needed","\u7701\u7565 {count} \u884C\u672A\u53D8\u66F4\u5185\u5BB9":"{count} unchanged lines omitted","\u9884\u89C8\u8FBE\u5230 400 \u884C\uFF0C\u540E\u7EED\u5DEE\u5F02\u672A\u5C55\u793A\u3002\u8BF7\u8FD4\u56DE\u7F16\u8F91\u5668\u6216\u5907\u4EFD\u5185\u5BB9\u68C0\u67E5\u5B8C\u6574\u6587\u672C\u3002":"Preview limited to 400 lines. Further changes are not shown. Return to the editor or backup content to check the full text.",\u6587\u4EF6\u5185\u5BB9\u4E3A\u7A7A:"File content is empty","\u6B63\u5728\u8BFB\u53D6\u89C4\u5219\u2026":"Reading rules\u2026",\u89C4\u5219\u5C1A\u672A\u8BFB\u53D6:"Rules not loaded",\u5DF2\u5F52\u6863:"Archived",\u4E0E\u5168\u5C40\u4E00\u81F4:"Matches global file","\u4E0E\u5168\u5C40\u4E00\u81F4 \xB7 ~{tokens} tok":"Matches global file \xB7 ~{tokens} tok","~{tokens} tok":"~{tokens} tok","{count} \u5B57\u7B26 \xB7 {lines} \u884C":"Characters: {count} \xB7 Lines: {lines}","{lines} \u884C \xB7 {count} \u5B57\u7B26 \xB7 ~{tokens} tokens":"{lines} lines \xB7 {count} chars \xB7 ~{tokens} tokens"," \xB7 \u672A\u4FDD\u5B58":" \xB7 Unsaved"," \xB7 \u5DF2\u5F52\u6863\uFF0C\u53EA\u8BFB":" \xB7 Archived, read-only"," \xB7 \u5DF2\u4FDD\u5B58":" \xB7 Saved","\u4FDD\u5B58\u4EC5\u66F4\u65B0\u65B9\u6848\u5E93\uFF1B\u4FDD\u5B58\u540E\u53EF\u9884\u89C8\u542F\u7528\u3002":"Saving only updates the library. Save to preview activation.","\u6062\u590D\u5F52\u6863\u540E\u53EF\u7EE7\u7EED\u7F16\u8F91\u548C\u542F\u7528\u3002":"Unarchive to edit and activate this profile.","\u9009\u4E2D\u65B9\u6848\u4E0D\u4F1A\u6539\u53D8\u5168\u5C40\u89C4\u5219\u3002":"Selecting a profile does not change global rules.","\u586B\u5199\u6216\u5BFC\u5165\u89C4\u5219\uFF0C\u4FDD\u5B58\u4F60\u7684\u7B2C\u4E00\u4E2A\u65B9\u6848\u3002":"Write or import rules to save your first profile.",\u6062\u590D\u5F52\u6863:"Unarchive",\u9690\u85CF\u5F52\u6863:"Hide archived","\u663E\u793A\u6700\u8FD1 {count} \u4EFD\u5907\u4EFD\uFF1B\u6062\u590D\u524D\u4E5F\u4F1A\u5907\u4EFD\u5F53\u524D\u6587\u4EF6\u3002":"Showing the latest {count} backups. The current file is also backed up before restoring.","\u6682\u65E0\u5907\u4EFD\u3002\u9996\u6B21\u66FF\u6362\u5DF2\u6709\u5168\u5C40\u6587\u4EF6\u65F6\u4F1A\u81EA\u52A8\u521B\u5EFA\u3002":"No backups yet. One is created when an existing global file is first replaced.",\u8FD4\u56DE\u5907\u4EFD:"Back to backups",\u786E\u8BA4\u6062\u590D:"Confirm restore","\u65B9\u6848\u5DF2\u4FDD\u5B58\uFF0C\u5168\u5C40\u6587\u4EF6\u672A\u6539\u52A8\u3002":"Profile saved. The global file was not changed.",\u5F53\u524D\u4ECD\u663E\u793A\u4E0A\u6B21\u8BFB\u53D6\u7ED3\u679C:"Still showing the last read result.","\uFF0C\u672A\u4FDD\u5B58\u8349\u7A3F\u5DF2\u4FDD\u7559":" Your unsaved draft has been kept.","\u5DF2\u91CD\u65B0\u8BFB\u53D6\u78C1\u76D8\u72B6\u6001\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002\u4FDD\u5B58\u4F1A\u4EE5\u65B0\u8BFB\u53D6\u7684\u65B9\u6848\u5E93\u4E3A\u57FA\u7840\u3002":"Disk state refreshed. Your draft has been kept. Saving will use the refreshed profile library.","\u5DF2\u8BFB\u53D6\u5168\u5C40\u6587\u4EF6\u4E0E\u65B9\u6848\u5E93\u3002":"Global file and profile library loaded.",\u65B0\u65B9\u6848:"New profile"," \u526F\u672C":" Copy","\u5DF2\u5BFC\u51FA\u5230\u5F53\u524D\u8FDE\u63A5\u670D\u52A1\u5668\uFF1A{path}":"Exported on the connected server: {path}","\u65B9\u6848\u5DF2\u6062\u590D\u3002":"Profile unarchived.","\u65B9\u6848\u5DF2\u5F52\u6863\uFF0C\u53EF\u968F\u65F6\u6062\u590D\u3002":"Profile archived. You can unarchive it at any time.","\u5168\u5C40\u6587\u4EF6\u5DF2\u66F4\u65B0\uFF0C\u539F\u5185\u5BB9\u5DF2\u5907\u4EFD\u3002\u8BF7\u5728\u65B0\u4F1A\u8BDD\u786E\u8BA4\u89C4\u5219\u52A0\u8F7D\u3002":"Global file updated. Original content backed up. Confirm rule loading in a new session.","\u5168\u5C40\u6587\u4EF6\u5DF2\u786E\u8BA4\uFF0C\u8BF7\u5728\u65B0\u4F1A\u8BDD\u68C0\u67E5\u89C4\u5219\u52A0\u8F7D\u3002":"Global file confirmed. Check rule loading in a new session.","\u5168\u5C40\u6587\u4EF6\u5DF2\u66F4\u65B0\uFF0C\u4F46\u5907\u4EFD\u5217\u8868\u8BFB\u53D6\u5931\u8D25\uFF1B\u53EF\u70B9\u51FB\u91CD\u65B0\u8BFB\u53D6\u3002":"Global file updated, but the backup list could not be read. Click Refresh.","\u5BFC\u5165\u6587\u4EF6\u8FC7\u5927\uFF0C\u8BF7\u4F7F\u7528\u4E0D\u8D85\u8FC7 100,000 \u5B57\u7B26\u7684\u89C4\u5219\u6587\u4EF6\u3002":"The import file is too large. Use a rules file with no more than 100,000 characters.",\u5BFC\u5165\u65B9\u6848:"Imported profile","\u5DF2\u5BFC\u5165\u4E3A\u8349\u7A3F\uFF0C\u4FDD\u5B58\u540E\u53EF\u9884\u89C8\u542F\u7528\u3002":"Imported as a draft. Save it to preview activation.","\u6B63\u5728\u8BFB\u53D6\u2026":"Reading\u2026",\u5F53\u524D\u65B9\u6848:"Current profile","\u5168\u5C40 AGENTS.md":"Global AGENTS.md","\u4EC5\u8868\u793A\u5F53\u524D\u8FDE\u63A5\u670D\u52A1\u5668\u7684\u6587\u4EF6\u72B6\u6001\uFF0C\u4E0D\u4EE3\u8868\u5DF2\u6709\u4F1A\u8BDD\u5DF2\u52A0\u8F7D\u89C4\u5219\u3002":"Shows file state on the connected server, not whether existing sessions have loaded the rules.","\u8BFB\u53D6\u4E8E {time}":"Read at {time}","~{tokens} tokens \xB7 \u8BFB\u53D6\u4E8E {time}":"~{tokens} tokens \xB7 Read at {time}",\u672A\u8BFB\u53D6:"Not read",\u5237\u65B0:"Refresh",\u7BA1\u7406:"Manage",\u7BA1\u7406\u89C4\u5219\u65B9\u6848:"Manage rule profiles",\u5DF2\u5339\u914D\u65B9\u6848:"Matched",\u672A\u5339\u914D\u65B9\u6848:"Unmatched",\u5168\u5C40\u4E3A\u7A7A:"Empty",\u5C1A\u65E0\u6587\u4EF6:"Missing",\u8BFB\u53D6\u4E2D:"Loading","\u5F53\u524D\u5168\u5C40 AGENTS.md \u672A\u5339\u914D\u4EFB\u4F55\u5DF2\u4FDD\u5B58\u65B9\u6848\u3002":"The current global AGENTS.md does not match any saved profile.",\u8BFB\u53D6\u5168\u5C40\u4E3A\u8349\u7A3F:"Load global as draft",\u5BF9\u6BD4\u5168\u5C40\u5DEE\u5F02:"Compare with global",\u5BF9\u6BD4\u66F4\u6539:"Compare changes",\u590D\u5236\u5168\u6587:"Copy content",\u590D\u5236\u8DEF\u5F84:"Copy path","\u5DF2\u590D\u5236\u89C4\u5219\u5168\u6587\u3002":"Copied full rule content.","\u5DF2\u590D\u5236\u5168\u5C40\u89C4\u5219\u8DEF\u5F84\u3002":"Copied global rules path.","\u526A\u8D34\u677F\u4E0D\u53EF\u7528\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\u3002":"Clipboard unavailable; copy manually.","\u7AE0\u8282\u901F\u8DF3\u2026":"Jump to section\u2026",\u7AE0\u8282\u5BFC\u822A:"Section navigation","\u7EA6 {tokens} tokens\uFF0C\u5EFA\u8BAE\u5C06\u5168\u5C40\u89C4\u5219\u7CBE\u7B80\u5728 {budget} tokens \u5185\u4EE5\u7559\u51FA\u4F1A\u8BDD\u4E0A\u4E0B\u6587\u7A7A\u95F4\u3002":"About {tokens} tokens; keeping global rules within {budget} tokens leaves more context window for sessions.",\u5BF9\u6BD4\u8349\u7A3F\u4E0E\u5DF2\u4FDD\u5B58\u65B9\u6848:"Compare draft with saved profile",\u5BF9\u6BD4\u8349\u7A3F\u4E0E\u5168\u5C40\u89C4\u5219:"Compare draft with global rules","\u5F53\u524D\u4E3A\u53EA\u8BFB\u5DEE\u5F02\u5BF9\u6BD4\uFF0C\u4E0D\u4F1A\u4FEE\u6539\u5168\u5C40 AGENTS.md\u3002":"Read-only diff inspection; global AGENTS.md will not be changed.","\u5F53\u524D\u5DF2\u5C06\u5168\u5C40 AGENTS.md \u8BFB\u53D6\u4E3A\u65B0\u8349\u7A3F\uFF0C\u4FDD\u5B58\u540E\u53EF\u7EB3\u5165\u65B9\u6848\u5E93\u3002":"Loaded global AGENTS.md as a new draft. Save it to add to your profile library.","\u65B9\u6848\u540D\u79F0\u9700\u8981 1\u201360 \u4E2A\u5B57\u7B26\u3002":"Profile names must be 1\u201360 characters.","\u89C4\u5219\u5185\u5BB9\u4E0D\u80FD\u8D85\u8FC7 100,000 \u4E2A\u5B57\u7B26\u3002":"Rule content cannot exceed 100,000 characters.","\u8BF7\u9009\u62E9\u7EAF\u6587\u672C\u89C4\u5219\uFF0C\u5185\u5BB9\u4E0D\u80FD\u5305\u542B\u7A7A\u5B57\u8282\u3002":"Choose a plain-text rules file; the content cannot contain null bytes.","\u65B9\u6848\u5E93\u683C\u5F0F\u6709\u8BEF\uFF0C\u73B0\u6709\u6587\u4EF6\u672A\u4FEE\u6539\u3002\u8BF7\u5148\u4FEE\u590D library.json \u6216\u6062\u590D\u5176\u5907\u4EFD\u3002":"The profile library is malformed; the existing file was not changed. Repair library.json or restore its backup first.","\u65B9\u6848\u5E93\u5DF2\u88AB\u5176\u4ED6\u7A97\u53E3\u4FEE\u6539\u3002\u8BF7\u5148\u91CD\u65B0\u8BFB\u53D6\uFF0C\u5F53\u524D\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002":"The profile library was changed by another window. Reload first; the current draft will be preserved.","\u65B9\u6848\u5E93\u5DF2\u8FBE\u5230\u5BB9\u91CF\u4E0A\u9650\uFF0C\u8BF7\u5148\u5BFC\u51FA\u5E76\u6574\u7406\u5185\u5BB9\u3002":"The profile library reached its size limit. Export and clean it up first.","\u4FDD\u5B58\u540E\u65B9\u6848\u5E93\u53C8\u53D1\u751F\u4E86\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\uFF1B\u4E0D\u8981\u91CD\u590D\u8986\u76D6\u3002":"The profile library changed again after saving. Reload; do not overwrite again.",\u73B0\u6709\u5168\u5C40\u89C4\u5219:"Existing global rules","\u6B64\u65B9\u6848\u5DF2\u4E0D\u5728\u65B9\u6848\u5E93\u4E2D\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u3002":"This profile is no longer in the library. Reload.","\u8BF7\u5148\u6062\u590D\u5DF2\u5F52\u6863\u65B9\u6848\uFF0C\u518D\u7F16\u8F91\u3002":"Restore the archived profile before editing it.","\u5DF2\u6709\u540C\u540D\u65B9\u6848\uFF0C\u8BF7\u4F7F\u7528\u4E0D\u540C\u540D\u79F0\u3002":"A profile with this name already exists. Use another name.","\u6700\u591A\u4FDD\u5B58 100 \u4E2A\u65B9\u6848\uFF08\u542B\u5F52\u6863\u65B9\u6848\uFF09\u3002":"At most 100 profiles can be saved (including archived ones).","\u6B64\u65B9\u6848\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u3002":"This profile does not exist. Reload.","\u8BE5\u65B9\u6848\u4E0E\u5F53\u524D\u5168\u5C40\u6587\u4EF6\u4E00\u81F4\uFF0C\u8BF7\u5148\u542F\u7528\u5176\u4ED6\u65B9\u6848\u518D\u5F52\u6863\u3002":"This profile matches the current global file. Enable another profile before archiving it.","\u8BF7\u9009\u62E9\u4E00\u4E2A\u672A\u5F52\u6863\u7684\u5DF2\u4FDD\u5B58\u65B9\u6848\u3002":"Choose a saved, non-archived profile.","\u65B9\u6848\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u65B0\u9884\u89C8\u3002":"The profile changed. Preview again.","\u5168\u5C40\u6587\u4EF6\u5728\u9884\u89C8\u540E\u5DF2\u88AB\u4FEE\u6539\uFF0C\u672A\u5199\u5165\u3002\u8BF7\u8FD4\u56DE\u5E76\u91CD\u65B0\u9884\u89C8\u5DEE\u5F02\u3002":"The global file changed after the preview; nothing was written. Go back and preview the diff again.","{action}\u201C{name}\u201D\u524D":'Before {action} "{name}"',"\u5907\u4EFD\u6821\u9A8C\u5931\u8D25\uFF0C\u5168\u5C40\u6587\u4EF6\u672A\u4FEE\u6539\u3002":"Backup verification failed; the global file was not changed.","\u5199\u5165\u524D\u5168\u5C40\u6587\u4EF6\u53D1\u751F\u53D8\u5316\uFF0C\u672A\u5199\u5165\u3002\u8BF7\u91CD\u65B0\u9884\u89C8\u3002":"The global file changed before writing; nothing was written. Preview again.","\u5199\u5165\u540E\u6587\u4EF6\u5185\u5BB9\u4E0E\u65B9\u6848\u4E0D\u4E00\u81F4\uFF0C\u53EF\u80FD\u6709\u5176\u4ED6\u7F16\u8F91\u5668\u540C\u65F6\u5199\u5165\u3002\u8BF7\u91CD\u65B0\u8BFB\u53D6\uFF1B\u5207\u6362\u524D\u7684\u5907\u4EFD\u4ECD\u53EF\u67E5\u770B\u3002":"The file content no longer matches the profile after writing; another editor may have written concurrently. Reload; the pre-switch backup is still available.","\u5907\u4EFD\u7F16\u53F7\u65E0\u6548\u3002":"Invalid backup ID.","\u5907\u4EFD\u7F3A\u5931\u6216\u683C\u5F0F\u6709\u8BEF\uFF0C\u672A\u4FEE\u6539\u5168\u5C40\u6587\u4EF6\u3002":"The backup is missing or malformed; the global file was not changed.","\u65B9\u6848\u7F16\u53F7\u65E0\u6548\u3002":"Invalid profile ID.",\u6062\u590D:"restoring",\u542F\u7528:"enabling",\u5168\u5C40\u89C4\u5219:"Global rules",\u65B9\u6848\u5E93:"Profile library",\u5907\u4EFD\u5217\u8868:"Backup list",\u5907\u4EFD\u6587\u4EF6:"Backup file",\u6587\u4EF6\u5217\u8868:"File list",\u6587\u4EF6:"file","\u8BF7\u5728\u8BBE\u7F6E \u2192 \u6269\u5C55\u4E2D\u5141\u8BB8\u201C\u89C4\u5219\u65B9\u6848\u201D\u8BBF\u95EE\u58F0\u660E\u7684\u89C4\u5219\u6587\u4EF6\u4E0E\u65B9\u6848\u76EE\u5F55\u3002":'Allow "Rule profiles" to access its declared rule file and profile directory in Settings \u2192 Extensions.',"\u6587\u4EF6\u6743\u9650\u4E0D\u8DB3\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u6587\u4EF6\u6216\u65B9\u6848\u76EE\u5F55\u7684\u6743\u9650\u3002":"File permission denied. Check the rule file and profile directory permissions.","\u5BBF\u4E3B\u54CD\u5E94\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u8BFB\u53D6\u6587\u4EF6\u4EE5\u786E\u8BA4\u5B9E\u9645\u72B6\u6001\uFF0C\u518D\u7EE7\u7EED\u64CD\u4F5C\u3002":"The host timed out. Reload the file to confirm the actual state before continuing.","\u76EE\u6807\u8DEF\u5F84\u4E0D\u5728\u6388\u6743\u8303\u56F4\u5185\uFF0C\u6216\u7B26\u53F7\u94FE\u63A5\u6307\u5411\u4E86\u5176\u4ED6\u76EE\u5F55\u3002":"The target path is outside the allowed scope, or a symlink points elsewhere.","\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55\u542B\u4E2D\u6587\u7B49\u5B57\u7B26\uFF0C\u89E6\u53D1\u4E86 OpenChamber \u6587\u4EF6\u63A5\u53E3\u7684\u517C\u5BB9\u95EE\u9898\u3002\u53EF\u6682\u65F6\u5728\u65E0\u9879\u76EE\u4F1A\u8BDD\u4E2D\u4ECE\u53F3\u4FA7\u6253\u5F00\u201C\u89C4\u5219\u65B9\u6848\u201D\u3002":'The working directory contains non-Latin characters, which triggers a compatibility issue in the OpenChamber file API. Open "Rule profiles" from the right sidebar in a session without a project for now.',"OpenChamber \u6587\u4EF6\u63A5\u53E3\u8FD4\u56DE\u5F02\u5E38\uFF0C\u672A\u63D0\u4F9B\u5177\u4F53\u539F\u56E0\u3002\u8BF7\u91CD\u65B0\u8BFB\u53D6\uFF1B\u6301\u7EED\u5931\u8D25\u65F6\u91CD\u65B0\u52A0\u8F7D\u9762\u677F\u3002":"The OpenChamber file API returned an error without details. Reload; if it keeps failing, reload the panel.","\u64CD\u4F5C\u672A\u5B8C\u6210\uFF0C\u8BF7\u91CD\u8BD5\u3002":"The operation did not complete. Try again.","{action}{target}\u5931\u8D25\uFF1A{reason}{suffix}":"{action} {target} failed: {reason}{suffix}",\u5199\u5165:"Write",\u8BFB\u53D6:"Read"," \u5199\u5165\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\uFF0C\u8BF7\u5148\u91CD\u65B0\u8BFB\u53D6\u5B9E\u9645\u72B6\u6001\uFF0C\u52FF\u76F4\u63A5\u91CD\u590D\u5199\u5165\u3002":" The write result is not confirmed. Reload the actual state first; do not repeat the write."},ue=Ar(gn,"en-US"),{t:br}=ue;var J=(e,o="",n)=>{let s=document.createElement(e);return s.className=o,n!==void 0&&(s.textContent=n),s},xr=(e,o=br)=>ot(e)?.name??(e.global.exists?e.global.content?o("\u672A\u5339\u914D\u5DF2\u4FDD\u5B58\u65B9\u6848"):o("\u5168\u5C40\u89C4\u5219\u4E3A\u7A7A"):o("\u5C1A\u65E0\u5168\u5C40\u89C4\u5219\u6587\u4EF6"));var Or=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
:root {
  --ext-bg: var(--surface-background, var(--oc-bg, transparent));
  --ext-space-1: 4px;
  --ext-space-2: 8px;
  --ext-space-3: 12px;
  --ext-space-4: 16px;
  --ext-space-6: 24px;
  --ext-text-small: 11px;
  --ext-text-body: 13px;
  --ext-text-title: 14px;
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
}
* {
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
html, body { margin: 0; height: 100%; background: var(--ext-bg); }
body { overflow: hidden; }
#root { height: 100%; }
[hidden] { display: none !important; }
button, input, textarea, select { font: inherit; }
.ext {
  color: var(--oc-fg);
  font-family: var(--oc-font);
  font-size: var(--ext-text-body);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.ext-container { container-type: inline-size; }
.ext :where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--oc-focus, CanvasText);
  outline-offset: 2px;
}
.ext button:not(:disabled) {
  transition: background-color 140ms ease-out, border-color 140ms ease-out, color 140ms ease-out, opacity 140ms ease-out, scale 120ms ease-out;
}
.ext button:not(:disabled):active { scale: 0.985; }
.ext-actions { display: flex; align-items: center; flex-wrap: wrap; gap: var(--ext-space-2); }
.ext-muted { color: var(--oc-muted); font-size: var(--ext-text-small); }
.ext-notice {
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--oc-radius, 6px);
  border: 1px solid color-mix(in srgb, var(--oc-info) 20%, transparent);
  font-size: 12px;
  line-height: 1.5;
  overflow-wrap: anywhere;
  background: color-mix(in srgb, var(--oc-info) 7%, var(--ext-bg));
  color: var(--oc-info-text);
}
.ext-notice[data-tone="success"] {
  border-color: color-mix(in srgb, var(--oc-success) 22%, transparent);
  background: color-mix(in srgb, var(--oc-success) 7%, var(--ext-bg));
  color: var(--oc-success-text);
}
.ext-notice[data-tone="warning"] {
  border-color: color-mix(in srgb, var(--oc-warning) 24%, transparent);
  background: color-mix(in srgb, var(--oc-warning) 8%, var(--ext-bg));
  color: var(--oc-warning-text);
}
.ext-notice[data-tone="error"] {
  border-color: color-mix(in srgb, var(--oc-error) 22%, transparent);
  background: color-mix(in srgb, var(--oc-error) 7%, var(--ext-bg));
  color: var(--oc-error-text);
}
.ext .oc-sdk-btn[data-size="sm"], .ext .oc-sdk-tab { font-size: 12px; }
.ext .oc-sdk-field-note { font-size: var(--ext-text-small); }
@media (prefers-reduced-motion: reduce) {
  .ext *, .ext *::before, .ext *::after { animation: none !important; transition: none !important; }
  .ext button:not(:disabled):active { scale: none; }
}
`;async function Rr(e,o){try{await e.openSurface(`plugin:${o.id}`)}catch{throw new Error(`Could not open ${o.name}. Reload the interface and try again.`)}}function kr(e=document){let o=e.documentElement;if(o.hasAttribute("data-oc-scrollbar-activity"))return;o.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",s=>{let a=s.target===e?o:s.target;if(!(a instanceof Element))return;a.hasAttribute("data-oc-scrolling")||a.setAttribute("data-oc-scrolling","");let p=n.get(a);p!==void 0&&clearTimeout(p),n.set(a,setTimeout(()=>{n.delete(a),a.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var Ir=`.ag { height: 100%; display: flex; flex-direction: column; min-width: 0; }
.ag-header { flex: none; padding: 12px 16px 10px; border-bottom: 1px solid var(--oc-border); display: grid; gap: 6px; }
.ag-heading { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-width: 0; }
.ag-status-main { display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1; }
.ag-badge-slot { flex: none; display: inline-flex; }
.ag-title { font-size: 13px; font-weight: 600; margin: 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ag-header-actions { flex: none; }
.ag-meta-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-width: 0; }
.ag-path { font: 11px/1.4 var(--oc-mono); color: var(--oc-muted); min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ag-meta-row .oc-sdk-btn { min-height: 24px; padding: 0 6px; font-size: 11px; color: var(--oc-muted); }
.ag-tabs { margin-top: 2px; }
.ag-tabs .oc-sdk-tabs { width: 100%; }
.ag-scroll { flex: 1; min-height: 0; padding: 14px 16px 16px; overflow: auto; }
.ag-message { margin-bottom: 12px; }
.ag-stack { display: grid; gap: 14px; min-width: 0; }
.ag-tools { gap: 6px; }
.ag-editor-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-bottom: -6px; }
.ag-heading-jump { flex: 1 1 160px; min-width: 0; }
.ag-editor-actions { flex: none; margin-left: auto; gap: 4px; }
.ag-footer { flex: none; background: var(--ext-bg); border-top: 1px solid var(--oc-border); padding: 10px 16px 12px; display: grid; gap: 8px; }
.ag-footer .ext-actions { justify-content: flex-end; }
.ag-save-note { margin: 0; }
.ag-section { padding: 4px 0 0; display: grid; gap: 4px; }
.ag-section p { margin: 0; }
.ag-status-row { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 12px; min-width: 0; min-height: 20px; }
.ag-status-label { color: var(--oc-muted); font-size: 12px; }
.ag-status-value-wrap { display: inline-flex; align-items: center; justify-content: flex-end; gap: 6px; min-width: 0; }
.ag-status-dot { width: 6px; height: 6px; border-radius: 999px; flex: none; background: var(--oc-muted); }
.ag-status-dot[data-tone="success"] { background: var(--oc-success); }
.ag-status-dot[data-tone="warning"] { background: var(--oc-warning); }
.ag-status-dot[data-tone="error"] { background: var(--oc-error); }
.ag-status-value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: right; font-size: 12px; font-weight: 500; }
.ag-status-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ag-status-footer .ext-actions { flex: none; gap: 4px; }
.ag-status-footer .oc-sdk-btn { min-height: 26px; padding: 0 6px; font-weight: 400; }
html[data-oc-surface="status"] { --ext-bg: transparent; height: auto; }
html[data-oc-surface="status"] body, html[data-oc-surface="status"] #root { height: auto; overflow: auto; background: transparent; }
@container (max-width: 310px) {
  .ag-header { padding: 10px 12px 8px; }
  .ag-scroll { padding: 12px; }
  .ag-footer { padding: 10px 12px; }
}
@media (max-width: 320px) {
  .ag-header { padding: 10px 12px 8px; }
  .ag-scroll { padding: 12px; }
  .ag-footer { padding: 10px 12px; }
}
`;var vr=`.ag-field .oc-sdk-field-label { font-size: 12px; }
.ag-field .oc-sdk-input { font-size: 13px; min-height: 36px; }
.ag-editor textarea { min-height: 220px; max-height: 58vh; resize: vertical; line-height: 1.65; tab-size: 2; }
.ag-editor .oc-sdk-field-note { font-variant-numeric: tabular-nums; }
.ag .oc-sdk-trigger-value { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ag .oc-sdk-select { min-width: 0; }
.ag .oc-sdk-trigger { width: 100%; min-width: 0; min-height: 36px; }
.ag-heading-jump .oc-sdk-trigger { min-height: 30px; font-size: 12px; }
.ag-editor-actions .oc-sdk-btn { min-height: 28px; padding: 0 8px; font-size: 12px; }
.ag-unmatched {
  border: 1px solid color-mix(in srgb, var(--oc-warning) 36%, var(--oc-border));
  background: color-mix(in srgb, var(--oc-warning) 8%, transparent);
  border-radius: var(--oc-radius);
  padding: 10px 12px;
  display: grid;
  gap: 8px;
}
.ag-unmatched-text { margin: 0; font-size: 12px; color: var(--oc-warning-text, var(--oc-fg)); }
.ag-budget-note { margin: -4px 0 0; }
.ag-details { border-top: 1px solid var(--oc-border); padding-top: 10px; }
.ag-details summary { cursor: pointer; color: var(--oc-muted); font-size: 12px; padding: 4px 0; user-select: none; }
.ag-details .ext-actions { margin-top: 8px; }
.ag-guard {
  border: 1px solid color-mix(in srgb, var(--oc-warning) 48%, var(--oc-border));
  background: color-mix(in srgb, var(--oc-warning) 9%, transparent);
  border-radius: var(--oc-radius);
  padding: 12px;
}
.ag-guard p { margin: 0 0 8px; }
.ag-review-title { font-size: 14px; font-weight: 600; margin: 0; overflow-wrap: anywhere; }
.ag-diff-summary { font-variant-numeric: tabular-nums; margin: -4px 0 0; }
.ag-diff { border: 1px solid var(--oc-border); border-radius: var(--oc-radius); overflow: auto; max-height: 50vh; font: 11px/1.65 var(--oc-mono); background: color-mix(in srgb, var(--oc-hover) 24%, transparent); }
.ag-diff-line { display: grid; grid-template-columns: 32px 32px 18px minmax(0, 1fr); min-width: 0; }
.ag-diff-num { padding: 1px 4px; text-align: right; color: var(--oc-muted); user-select: none; font-variant-numeric: tabular-nums; border-right: 1px solid color-mix(in srgb, var(--oc-border) 55%, transparent); }
.ag-diff-mark { padding: 1px 0; text-align: center; color: var(--oc-muted); user-select: none; }
.ag-diff-line code { font: inherit; white-space: pre-wrap; overflow-wrap: anywhere; padding: 1px 8px 1px 6px; }
.ag-diff-line[data-kind="add"] { background: color-mix(in srgb, var(--oc-success) 11%, transparent); color: var(--oc-success-text); }
.ag-diff-line[data-kind="add"] .ag-diff-mark { color: var(--oc-success-text); font-weight: 600; }
.ag-diff-line[data-kind="remove"] { background: color-mix(in srgb, var(--oc-error) 11%, transparent); color: var(--oc-error-text); }
.ag-diff-line[data-kind="remove"] .ag-diff-mark { color: var(--oc-error-text); font-weight: 600; }
.ag-diff-gap { margin: 0; padding: 5px 12px; color: var(--oc-muted); font: 11px/1.5 var(--oc-font); background: var(--oc-hover); border-block: 1px solid color-mix(in srgb, var(--oc-border) 60%, transparent); }
.ag-preview { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; font: 11px/1.65 var(--oc-mono); max-height: 42vh; overflow: auto; border: 1px solid var(--oc-border); border-radius: var(--oc-radius); padding: 12px; }
.ag-section .ext-notice { margin: 6px 0 2px; }
`;var{t:M}=ue,yr=document.createElement("style");yr.textContent=Or+Ir+vr;document.head.append(yr);kr(document);var Ee=Ft(),xn=Tr(hr(Ee)),at=J("section","ext ag-section"),io=J("span","ag-status-dot"),Oe=J("p","ag-status-value",M("\u6B63\u5728\u8BFB\u53D6\u2026"));Oe.setAttribute("role","status");var wr=J("span","ag-status-label",M("\u5F53\u524D\u65B9\u6848")),Cr=J("span","ag-status-value-wrap");Cr.append(io,Oe);var Mr=J("div","ag-status-row");Mr.append(wr,Cr);var Re=J("p","ext-muted",M("\u5168\u5C40 AGENTS.md")),Y=J("p","ext-notice");Re.title=M("\u4EC5\u8868\u793A\u5F53\u524D\u8FDE\u63A5\u670D\u52A1\u5668\u7684\u6587\u4EF6\u72B6\u6001\uFF0C\u4E0D\u4EE3\u8868\u5DF2\u6709\u4F1A\u8BDD\u5DF2\u52A0\u8F7D\u89C4\u5219\u3002");Y.hidden=!0;Y.setAttribute("role","status");var Ur=J("div","ag-status-footer"),ke=J("div","ext-actions");Ur.append(Re,ke);at.append(Mr,Ur,Y);document.querySelector("#root").append(at);var st=!1,Ne=!1,it=!1,Ue="",Nr=()=>{Y.hidden=!0,Rr(Ee,{id:"agents-manager",name:M("\u89C4\u5219\u65B9\u6848")}).catch(e=>{Y.hidden=!1,Y.dataset.tone="error",Y.textContent=no(e)})},Le=()=>{if(ke.hidden=it,!it)return;let e=[{kind:"button",id:"refresh",label:M("\u5237\u65B0"),disabled:st||!Ne},{kind:"button",id:"manage",label:M("\u7BA1\u7406"),disabled:!Ne}],o=JSON.stringify(e);o!==Ue&&(Ue=o,Ee.setStatusControls(e).catch(()=>{it=!1,Ue="",ke.hidden=!1}))},ct=async()=>{if(!st){st=!0,ao.update({loading:!0}),Le();try{let e=await xn.load(!1);Oe.textContent=xr(e,M),Oe.title=Oe.textContent;let o=!!ot(e);io.dataset.tone=o?"success":e.global.exists&&e.global.content.trim()?"warning":"neutral";let n=new Date().toLocaleTimeString(ue.locale,{hour:"2-digit",minute:"2-digit"}),s=e.global.exists?oo(e.global.content):0;Re.textContent=s>0?M("~{tokens} tokens \xB7 \u8BFB\u53D6\u4E8E {time}",{tokens:s.toLocaleString(ue.locale),time:n}):M("\u8BFB\u53D6\u4E8E {time}",{time:n}),Y.hidden=!0}catch(e){io.dataset.tone="error",Oe.textContent=M("\u672A\u8BFB\u53D6"),Re.textContent=M("\u5168\u5C40 AGENTS.md"),Y.textContent=no(e),Y.dataset.tone="error",Y.hidden=!1}finally{st=!1,ao.update({loading:!1}),Le()}}},ao=ie(ke,{label:M("\u5237\u65B0"),size:"sm",variant:"ghost",onClick:()=>{ct()}}),On=ie(ke,{label:M("\u7BA1\u7406"),size:"sm",variant:"ghost",onClick:Nr}),Lr=ke.lastElementChild;Lr.setAttribute("aria-label",M("\u7BA1\u7406\u89C4\u5219\u65B9\u6848"));Ee.onStatusControl(e=>{e.id==="refresh"?ct():e.id==="manage"&&Nr()});Ee.onDirectory(()=>{Ne&&(Ue="",Le())});new ResizeObserver(()=>{Ee.setHeight(Math.ceil(at.getBoundingClientRect().height)).catch(()=>{})}).observe(at);Ee.onReady(e=>{Bt(e,document.documentElement);let o=ue.setLocale("en-US");so(ue),wr.textContent=M("\u5F53\u524D\u65B9\u6848"),Re.title=M("\u4EC5\u8868\u793A\u5F53\u524D\u8FDE\u63A5\u670D\u52A1\u5668\u7684\u6587\u4EF6\u72B6\u6001\uFF0C\u4E0D\u4EE3\u8868\u5DF2\u6709\u4F1A\u8BDD\u5DF2\u52A0\u8F7D\u89C4\u5219\u3002"),ao.update({label:M("\u5237\u65B0")}),On.update({label:M("\u7BA1\u7406")}),Lr.setAttribute("aria-label",M("\u7BA1\u7406\u89C4\u5219\u65B9\u6848")),it=e.surface==="status"&&e.features?.statusControls===!0,Ne?(Ue="",Le(),o&&(Re.textContent=M("\u5168\u5C40 AGENTS.md"),ct())):(Ne=!0,Le(),ct())});})();
