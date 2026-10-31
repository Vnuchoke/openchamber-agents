"use strict";(()=>{var u="openchamber.sdk";var pe="data-oc-scrolling",Pe=`
:root {
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 40%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 65%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [${pe}] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [${pe}] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [${pe}]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [${pe}] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function He(e){let r=e.documentElement;if(r.hasAttribute("data-oc-scrollbar-activity"))return;r.setAttribute("data-oc-scrollbar-activity","");let i=new WeakMap;e.addEventListener("scroll",s=>{let f=s.target===e?r:s.target;if(!(f instanceof Element))return;f.hasAttribute("data-oc-scrolling")||f.setAttribute("data-oc-scrolling","");let g=i.get(f);g!==void 0&&clearTimeout(g),i.set(f,setTimeout(()=>{i.delete(f),f.removeAttribute("data-oc-scrolling")},1e3))},{capture:!0,passive:!0})}var co=`(${He.toString()})(document);`;var gt=["file","directory","other","missing"],$e=e=>!!(e&&"sessionId"in e),Fe=e=>!!(e&&"sent"in e&&!("sessionId"in e));var xt=/^[0-9a-f]{7,64}$/i,Be=e=>xt.test(e),ue=500,fe=32e3,Et=16e3,bt=128,St=200,_t=2e3,Tt=16e3,kt=80,At=200,wt=16e3;var yt=2e3;var Xe=2e4,me=1024,he=2e6;var ge=64e3,xe=8e3,ze=4e3;var je=9e4;var vt=999,Rt=1e4,Ee=500,Ot=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ct=["stopped","starting","ready","failed"],lo=new Set(Ot),It=e=>lo.has(e),Ut=e=>e&&It(e)?e:"HOST_REJECTED",te=e=>e===void 0?!1:e===null||e===!0||e===!1||String(e)===e?!0:Number(e)===e?Number.isFinite(e):Array.isArray(e)?e.every(te):Object(e)===e?Object.values(e).every(te):!1,Mt=e=>te(e)&&JSON.stringify(e).length<=wt,ht=e=>e?.trim().slice(0,At)??"",oe=e=>{let r=e.id.trim().slice(0,bt),i=e.title.trim().slice(0,St),s=e.url.trim().slice(0,_t),f=e.text?.trim().slice(0,Tt),g=e.author?.trim().slice(0,kt),O=e.kind==="pull"?"pull":"issue",w={providerId:e.providerId.trim(),id:r,title:i||r,url:s,kind:O};if(f&&(w.text=f),g&&(w.author=g),O==="pull"){let L=ht(e.branches?.head),$=ht(e.branches?.base);L&&$&&(w.branches={head:L,base:$})}return Mt(e.data)&&(w.data=e.data),w},Ve=e=>{let r=oe(e);return e.projectId&&(r.projectId=e.projectId),e.navigation&&(r.navigation=e.navigation),e.worktree&&(r.worktree=e.worktree),r},Ke=e=>{let r={text:e.text.trim().slice(0,Et)};return e.send&&(r.send=!0),r},We=e=>e===null||!Number.isFinite(e)?null:Math.min(vt,Math.max(0,Math.round(e))),Je=e=>Number.isFinite(e)?Math.min(Rt,Math.max(0,Math.ceil(e))):0;var re=e=>e.length>0&&e.length<=me&&!e.includes("\0")&&!e.includes("\\");var be=e=>!e.startsWith("/")||e.includes("\0")||e.includes("\\")||e.includes("://")||e.length>yt?!1:!e.split("/").some(i=>i==="."||i===".."),po=new Set(Ct),Ye=e=>!!(e&&"status"in e&&po.has(String(e.status))&&!("body"in e)),Se=e=>!!(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),qe=e=>!!(e&&"content"in e&&String(e.content)===e.content),Qe=e=>!!(e&&"written"in e&&e.written===!0),Ze=e=>!!(e&&"entries"in e&&Array.isArray(e.entries)),uo=new Set(gt),et=e=>!!(e&&"kind"in e&&"size"in e&&uo.has(String(e.kind))&&Number.isFinite(e.size)),tt=e=>!!(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),fo=new Set(["workspace","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action"]),mo=e=>Object(e)===e?e:null,De=e=>String(e)===e&&e.length>0,ho=e=>{if(!De(e.id))return null;if(e.ok===!0){let r={channel:u,v:1,type:"result",id:e.id,ok:!0};return Object(e.payload)===e.payload&&(r.payload=e.payload),r}return e.ok===!1&&De(e.error)?{channel:u,v:1,type:"result",id:e.id,ok:!1,error:e.error,code:Ut(De(e.code)?e.code:void 0)}:null},ot=e=>{let r=mo(e);return!r||r.channel!==u||r.v!==1?null:r.type==="result"?ho(r):!fo.has(String(r.type))||Object(r.payload)!==r.payload?null:r};var l=class extends Error{code;constructor(r,i){super(i),this.name="HostRequestError",this.code=r}},Lt=()=>Promise.reject(new l("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),_e=()=>Promise.reject(new l("BAD_PATH",`File path must be 1 to ${me} characters without NUL or backslash.`)),h=e=>(e.value+=1,`oc-${e.value}`),rt=(e={})=>{let r=e.target??("window"in globalThis?window:null);if(!r)throw new l("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let i=e.acceptSource??(t=>t===r.parent),s=e.requestTimeoutMs??Xe,f=new Set,g=new Set,O=new Set,w=new Set,L=new Set,$=new Set,K=new Set,z=null,ee=null,W=new Map,d=new Map,c=!1,n={value:0},a=null,E=null,T=t=>t?{sessionId:t.id,phase:t.busy?"started":"completed"}:null,I=t=>{r.parent.postMessage(t,"*")},k=(t,o)=>{for(let p of t)try{p(o)}catch(b){console.error(b)}},ae=t=>{if(!(t instanceof MessageEvent)||!i(t.source))return;let o=ot(t.data);if(!o)return;if(o.type==="workspace"){let b=d.get(o.payload.subscriptionId);b&&k([b],o.payload.snapshot);return}if(o.type==="ready"){a=o.payload,E=T(o.payload.session),k(f,o.payload),k(g,o.payload.directory),k(O,o.payload.session),E&&k(w,E),k(L,o.payload.connection),k($,o.payload.settings),k(K,o.payload.item);return}if(o.type==="directory"){a&&(a={...a,directory:o.payload.directory}),k(g,o.payload.directory);return}if(o.type==="session"){a&&(a={...a,session:o.payload.session}),o.payload.session?E?.sessionId!==o.payload.session.id&&(E=T(o.payload.session)):E=null,k(O,o.payload.session);return}if(o.type==="session-lifecycle"){E=o.payload,k(w,o.payload);return}if(o.type==="connection"){a&&(a={...a,connection:o.payload.connection}),k(L,o.payload.connection);return}if(o.type==="settings"){a&&(a={...a,settings:o.payload.settings}),k($,o.payload.settings);return}if(o.type==="item"){a&&(a={...a,item:o.payload.item}),k(K,o.payload.item);return}if(o.type==="action"){let b=A=>{c||I({channel:u,v:1,type:"action-result",id:o.id,payload:A})},G=ee;if(!G){b({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>G(o.payload)).then(()=>b({ok:!0}),A=>{let Ge=(A instanceof Error?A.message:String(A)).trim();b({ok:!1,error:(Ge||"Action failed.").slice(0,Ee)})});return}if(o.type==="resolve"){let b=A=>{I({channel:u,v:1,type:"resolve-result",id:o.id,payload:A})},G=z;if(!G){b({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>G(o.payload)).then(A=>b({item:A?oe(A):null}),A=>{let Ge=(A instanceof Error?A.message:String(A)).trim();b({error:(Ge||"Command failed.").slice(0,Ee)})});return}let p=W.get(o.id);if(p){if(clearTimeout(p.timer),W.delete(o.id),o.ok){p.resolve(o.payload);return}p.reject(new l(o.code,o.error))}};r.addEventListener("message",ae),I({channel:u,v:1,type:"hello"});let U=(t,o=s)=>c||r.parent===r?Promise.reject(new l("HOST_UNAVAILABLE","No host frame. This page is not in an iframe.")):new Promise((p,b)=>{let G=setTimeout(()=>{W.delete(t.id),b(new l("HOST_TIMEOUT","Host did not answer in time."))},o);W.set(t.id,{resolve:p,reject:b,timer:G}),I(t)}),C=t=>U(t).then(()=>{}),J={channel:u,v:1},Y=(t,o=1024)=>{if(!t.trim()||t.length>o)throw new l("HOST_REJECTED",`Identity must contain 1 to ${o} characters.`)},Le=async t=>{t.kind!=="projects"&&Y(t.projectId);let o=await U({...J,type:"workspace-read",id:h(n),payload:t});if(!o||!("kind"in o)||!("state"in o)||o.kind!==t.kind)throw new l("HOST_REJECTED","Host did not return workspace data.");return o},Ne=async(t,o)=>{t.kind!=="projects"&&Y(t.projectId);let p=h(n);d.set(p,o);try{await C({...J,type:"workspace-subscribe",id:h(n),payload:{subscriptionId:p,query:t}})}catch(b){throw d.delete(p),c||I({...J,type:"workspace-unsubscribe",id:h(n),payload:{subscriptionId:p}}),b}return()=>{!d.delete(p)||c||I({...J,type:"workspace-unsubscribe",id:h(n),payload:{subscriptionId:p}})}},le=async t=>{if("key"in t&&(t.key.length===0||t.key.length>128))throw new l("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(t.op==="set"&&!te(t.value))throw new l("HOST_REJECTED","Storage values must be JSON.");if(t.op==="set"&&new TextEncoder().encode(JSON.stringify(t.value)).length>65536)throw new l("HOST_REJECTED","Storage value exceeds 64 KiB.");let o=await U({...J,type:"storage",id:h(n),payload:t});if(!o||!("storage"in o)||o.op!==t.op)throw new l("HOST_REJECTED","Host did not return storage data.");return o};return{onAction:t=>(ee=t,()=>{ee===t&&(ee=null)}),listProjects:async()=>{let t=await Le({kind:"projects"});if(t.kind!=="projects")throw new l("HOST_REJECTED","Expected projects.");return t},listWorktrees:async t=>{let o=await Le({kind:"worktrees",projectId:t});if(o.kind!=="worktrees")throw new l("HOST_REJECTED","Expected worktrees.");return o},listSessions:async t=>{let o=await Le({kind:"sessions",projectId:t});if(o.kind!=="sessions")throw new l("HOST_REJECTED","Expected sessions.");return o},onProjects:t=>Ne({kind:"projects"},o=>{o.kind==="projects"&&t(o)}),onWorktrees:(t,o)=>Ne({kind:"worktrees",projectId:t},p=>{p.kind==="worktrees"&&o(p)}),onSessions:(t,o)=>Ne({kind:"sessions",projectId:t},p=>{p.kind==="sessions"&&o(p)}),openSession:async t=>{Y(t),await C({...J,type:"open-session",id:h(n),payload:{sessionId:t}})},storage:{get:async t=>{let o=await le({op:"get",key:t});return o.op==="get"&&o.found?o.value:void 0},set:async(t,o)=>{await le({op:"set",key:t,value:o})},delete:async t=>{await le({op:"delete",key:t})},keys:async()=>{let t=await le({op:"keys"});if(t.op!=="keys")throw new l("HOST_REJECTED","Expected storage keys.");return t.keys}},onReady:t=>(f.add(t),a&&t(a),()=>{f.delete(t)}),onDirectory:t=>(g.add(t),a&&t(a.directory),()=>{g.delete(t)}),onSession:t=>(O.add(t),a&&t(a.session),()=>{O.delete(t)}),onSessionLifecycle:t=>(w.add(t),E&&t(E),()=>{w.delete(t)}),onConnection:t=>(L.add(t),a&&t(a.connection),()=>{L.delete(t)}),onSettings:t=>($.add(t),a&&t(a.settings),()=>{$.delete(t)}),onItem:t=>(K.add(t),a&&t(a.item),()=>{K.delete(t)}),onResolve:t=>(z=t,()=>{z===t&&(z=null)}),toast:t=>{let o=t.message.trim();return!o||o.length>ue?Promise.reject(new l("HOST_REJECTED",`Toast message must contain 1 to ${ue} characters.`)):t.copy&&t.copy!==!0&&(!t.copy.text.length||t.copy.text.length>fe)?Promise.reject(new l("HOST_REJECTED",`Toast copy text must contain 1 to ${fe} characters.`)):C({channel:u,v:1,type:"toast",id:h(n),payload:{...t,message:o}})},openUrl:t=>C({channel:u,v:1,type:"open-url",id:h(n),payload:{url:t}}),openCommit:t=>Be(t)?C({channel:u,v:1,type:"open-commit",id:h(n),payload:{sha:t}}):Promise.reject(new l("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),openSurface:t=>C({channel:u,v:1,type:"open-surface",id:h(n),payload:{surfaceId:t}}),writeClipboard:t=>C({channel:u,v:1,type:"clipboard-write",id:h(n),payload:{text:t}}),compose:t=>C({channel:u,v:1,type:"compose",id:h(n),payload:t}),attach:t=>C({channel:u,v:1,type:"attach",id:h(n),payload:oe(t)}),startSession:async t=>{t.projectId!==void 0&&Y(t.projectId);let o=t.worktree;o&&o!==!0&&(o.kind==="existing"?Y(o.directory):(o.name!==void 0&&Y(o.name,200),o.baseBranch!==void 0&&Y(o.baseBranch,200)));let p=await U({channel:u,v:1,type:"start-session",id:h(n),payload:Ve(t)},e.requestTimeoutMs??18e4);if(!$e(p))throw new l("HOST_REJECTED","Host did not return a session.");return p},prompt:t=>U({channel:u,v:1,type:"prompt",id:h(n),payload:Ke(t)}).then(o=>{if(!Fe(o))throw new l("HOST_REJECTED","Host did not return a prompt result.");return o}),sessionLink:t=>C({channel:u,v:1,type:"session-link",id:h(n),payload:oe(t)}),close:()=>C({channel:u,v:1,type:"close",id:h(n)}),oauthStart:()=>C({channel:u,v:1,type:"oauth-start",id:h(n)}),oauthDisconnect:()=>C({channel:u,v:1,type:"oauth-disconnect",id:h(n)}),request:t=>(be(t.path)?U({channel:u,v:1,type:"request",id:h(n),payload:t}):Lt()).then(o=>{if(!Se(o))throw new l("HOST_REJECTED","Host request result was empty.");return o}),serviceRequest:t=>(be(t.path)?U({channel:u,v:1,type:"service-request",id:h(n),payload:t}):Lt()).then(o=>{if(!Se(o))throw new l("HOST_REJECTED","Host service request result was empty.");return o}),serviceStatus:()=>U({channel:u,v:1,type:"service-status",id:h(n)}).then(t=>{if(!Ye(t))throw new l("HOST_REJECTED","Host did not return service status.");return t}),readFile:t=>(re(t)?U({channel:u,v:1,type:"file-read",id:h(n),payload:{path:t}}):_e()).then(o=>{if(!qe(o))throw new l("HOST_REJECTED","Host did not return file content.");return o}),writeFile:(t,o)=>re(t)?o.length>he?Promise.reject(new l("FILE_TOO_LARGE",`Content is over ${he} characters.`)):U({channel:u,v:1,type:"file-write",id:h(n),payload:{path:t,content:o}}).then(p=>{if(!Qe(p))throw new l("HOST_REJECTED","Host did not confirm the write.");return p}):_e(),listDir:t=>(re(t)?U({channel:u,v:1,type:"file-list",id:h(n),payload:{path:t}}):_e()).then(o=>{if(!Ze(o))throw new l("HOST_REJECTED","Host did not return directory entries.");return o}),stat:t=>(re(t)?U({channel:u,v:1,type:"file-stat",id:h(n),payload:{path:t}}):_e()).then(o=>{if(!et(o))throw new l("HOST_REJECTED","Host did not return file status.");return o}),generate:t=>{let o=t.prompt.trim(),p=t.system?.trim();if(o.length===0||o.length>ge)return Promise.reject(new l("HOST_REJECTED",`Prompt must be 1 to ${ge} characters.`));if(p!==void 0&&(p.length===0||p.length>xe))return Promise.reject(new l("HOST_REJECTED",`System prompt must be 1 to ${xe} characters.`));let b=t.maxOutputTokens===void 0?void 0:Math.min(ze,Math.max(1,Math.floor(t.maxOutputTokens)));if(b!==void 0&&!Number.isFinite(b))return Promise.reject(new l("HOST_REJECTED","maxOutputTokens must be a number."));let G={prompt:o};return p!==void 0&&(G.system=p),b!==void 0&&(G.maxOutputTokens=b),U({channel:u,v:1,type:"generate",id:h(n),payload:G},e.requestTimeoutMs??je).then(A=>{if(!tt(A))throw new l("HOST_REJECTED","Host did not return generated text.");return A})},setBadge:t=>C({channel:u,v:1,type:"badge",id:h(n),payload:{count:We(t)}}),setHeight:t=>C({channel:u,v:1,type:"resize",id:h(n),payload:{height:Je(t)}}),dispose:()=>{for(let t of d.keys())I({...J,type:"workspace-unsubscribe",id:h(n),payload:{subscriptionId:t}});d.clear(),c=!0,z=null,ee=null,r.removeEventListener("message",ae);for(let t of W.values())clearTimeout(t.timer),t.reject(new l("HOST_UNAVAILABLE","Host client was disposed."));W.clear(),f.clear(),g.clear(),O.clear(),w.clear(),L.clear(),$.clear(),K.clear()}}};var Pt=["browser.open","browser.snapshot","browser.click","browser.type","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize"];var jo=new Set(Pt);var Ht=["none","agent","user"];var Ko=new Set(Ht);var go=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Dt=(e,r)=>{r.style.colorScheme=e.mode;for(let[i,s]of go)r.style.setProperty(i,e.tokens[s]);r.style.setProperty("font-family",e.tokens.font),r.style.setProperty("font-size","0.875rem"),r.style.setProperty("line-height","1.45"),r.style.setProperty("color",e.tokens.foreground)},nt=(e,r)=>{Dt(e.theme,r),r.dataset&&(r.dataset.ocSurface=e.surface,r.dataset.ocTheme=e.theme.mode)};var $t="oc-sdk-ui-style";var y=e=>{let r=document.getElementById($t);if(r instanceof HTMLStyleElement){r.textContent!==e&&(r.textContent=e);return}He(document);let i=document.createElement("style");i.id=$t,i.textContent=e,document.head.appendChild(i)},v=(e,r)=>{let i=document.createElement(e);return r&&(i.className=r),i},j=e=>{let r=v("button",e);return r.type="button",r},P=(e,r)=>{let i=r??"";e.textContent!==i&&(e.textContent=i)};var xo={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},x=(e,r)=>`var(--${e}, var(--oc-${xo[e]}, ${r}))`,q=x("surface-background","transparent"),Te=x("surface-elevated","transparent"),ce=x("surface-elevated-foreground","inherit"),de=x("surface-foreground","inherit"),S=x("surface-muted-foreground","gray"),Eo=x("surface-muted","transparent"),N=x("interactive-border","currentColor"),M=x("interactive-hover","transparent"),Q=x("interactive-active","transparent"),st=x("interactive-selection","transparent"),it=x("interactive-selection-foreground","inherit"),Xt=x("interactive-focus-ring","currentColor"),H=x("primary","currentColor"),at=x("primary-text","inherit"),ct=x("error-text","inherit"),bo=x("font-sans","inherit"),dt=x("font-mono","monospace"),Ft=x("radius","9px"),_=(e,r,i="transparent")=>`color-mix(in srgb, ${e} ${r}%, ${i})`,Bt=`box-shadow: 0 0 0 2px ${Xt};`,ke=e=>{let r=x(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${r}; --oc-sdk-tone-text: ${x(`${e}-text`,"inherit")}; }`},R=`
${Pe}
.oc-sdk { box-sizing: border-box; color: ${de}; font-family: ${bo}; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }
.oc-sdk :focus-visible { outline: none; ${Bt} }
.oc-sdk-mono { font-family: ${dt}; }
.oc-sdk-muted { color: ${S}; }
${ke("success")}${ke("warning")}${ke("error")}${ke("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${H}; --oc-sdk-tone-text: ${at}; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 36px; padding: 0 14px; border: 1px solid transparent; border-radius: ${Ft}; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="sm"] { height: 32px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { height: 24px; padding: 0 8px; font-size: 0.75rem; border-radius: 6px; }
.oc-sdk-btn[data-variant="default"] { color: ${at}; background: ${_(H,10,q)}; border-color: ${_(H,12)}; }
.oc-sdk-btn[data-variant="default"]:hover { background: ${_(H,16,q)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${_(H,22,q)}; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Eo}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-btn[data-variant="outline"] { background: ${Te}; color: ${ce}; border-color: ${N}; }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${M}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Q}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${x("status-error","red")}; color: ${ct}; background: ${_("var(--oc-sdk-tone)",7,q)}; border-color: ${_("var(--oc-sdk-tone)",12)}; }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${_("var(--oc-sdk-tone)",9,q)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${_("var(--oc-sdk-tone)",11,q)}; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; color: ${S}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${ct}; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 36px; padding: 0 12px; border: 0; border-radius: ${Ft}; background: ${Te}; color: ${ce}; font-size: 0.875rem; line-height: 1.45; appearance: none; box-shadow: inset 0 0 0 1px ${_(N,60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
textarea.oc-sdk-input { height: auto; padding: 8px 12px; resize: vertical; }
.oc-sdk-input::placeholder { color: ${S}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${Xt}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input { box-shadow: inset 0 0 0 1px ${x("status-error","red")}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { box-shadow: inset 0 0 0 2px ${x("status-error","red")}; }
.oc-sdk-input[data-mono="true"] { font-family: ${dt}; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: ${S}; pointer-events: none; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${H}; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; color: ${S}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }
.oc-sdk-search-clear:hover { background: ${M}; color: ${de}; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; width: 100%; min-width: 0; height: 32px; padding: 0 8px 0 10px; border: 1px solid ${N}; border-radius: 6px; background: ${Te}; color: ${ce}; font-size: 0.8125rem; text-align: left; transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${M}, ${M}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Q}, ${Q}); }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-value[data-empty="true"] { color: ${S}; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; color: ${S}; }
.oc-sdk-popup { --surface-foreground: ${ce}; position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid ${_(N,60)}; border-radius: 12px; background: ${Te}; color: ${ce}; box-shadow: 0 8px 24px ${_(de,12)}; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 32px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border-radius: 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option[data-active="true"] { background: ${M}; }
.oc-sdk-option[aria-selected="true"] { background: ${st}; color: ${it}; }
.oc-sdk-option[data-destructive="true"] { color: ${ct}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${_(x("status-error","red"),10)}; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; color: ${S}; }
.oc-sdk-option-check { flex: 0 0 auto; width: 12px; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; color: ${S}; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid ${N}; border-radius: 4px; color: ${H}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${_(H,65,N)}; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; border-radius: 9999px; background: ${N}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 9999px; background: ${q}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${H}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Bt} }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; color: ${S}; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; border-radius: 10px; max-width: 100%; overflow: auto; }
.oc-sdk-tabs[data-track="true"] { background: ${_(de,4)}; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; border-radius: 8px; font-size: 0.8125rem; font-weight: 500; color: ${S}; white-space: nowrap; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${de}; }
.oc-sdk-tab[aria-selected="true"] { color: ${it}; background: ${st}; border-color: ${N}; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; color: ${S}; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; border-radius: 9999px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; background: ${M}; color: ${S}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${_("var(--oc-sdk-tone)",15)}; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border-radius: 6px; text-align: left; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${M}; }
.oc-sdk-row[aria-selected="true"] { background: ${st}; color: ${it}; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: ${dt}; font-size: 0.75rem; color: ${S}; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; color: ${S}; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; color: ${S}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; color: ${S}; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; color: ${S}; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: ${S}; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid ${N}; border-top-color: ${H}; border-radius: 9999px; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid ${_("var(--oc-sdk-tone)",40)}; border-radius: 8px; background: ${_("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { font-size: 0.8125rem; color: ${S}; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; color: ${S}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; background: ${_(N,40)}; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; color: ${S}; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; border-radius: 9999px; background: ${N}; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; border-radius: 9999px; background: var(--oc-sdk-tone, ${H}); transform-origin: left; transition: transform 200ms ease-out; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text a { color: ${at}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; border-radius: 8px; border: 1px solid ${_(N,60)}; }
`;var So=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},V=(e,r)=>{y(R);let i=r,s=j("oc-sdk oc-sdk-btn"),f=So(),g=document.createElement("span");s.append(g),e.append(s);let O=()=>{s.dataset.variant=i.variant??"default",s.dataset.size=i.size??"default",s.disabled=!!i.disabled||!!i.loading,s.dataset.loading=i.loading?"true":"false",s.setAttribute("aria-busy",i.loading?"true":"false"),i.loading&&f.parentNode!==s?s.prepend(f):!i.loading&&f.parentNode===s&&f.remove(),P(g,i.label)},w=()=>{i.disabled||i.loading||i.onClick()};return s.addEventListener("click",w),O(),{update:L=>{i={...i,...L},O()},dispose:()=>{s.removeEventListener("click",w),s.remove()}}};var ne="~/.config/opencode/AGENTS.md",F="~/.config/openchamber/agents-manager",Z=`${F}/library.json`,jt=1e5,lt=100,D=class extends Error{},Vt=e=>e.global.exists?e.library.profiles.find(r=>!r.archived&&r.content===e.global.content):void 0,pt=(e,r)=>e.exists===r.exists&&e.content===r.content;var Kt=e=>typeof e=="string"&&/^[a-zA-Z0-9-]{1,80}$/.test(e),ut=(e,r)=>{if(!e.trim()||e.trim().length>60)throw new Error("Profile name must contain 1-60 characters.");if(r.length>jt)throw new Error("Rules cannot exceed 100,000 characters.");if(r.includes("\0"))throw new Error("Use plain text rules without null bytes.")},Ro=e=>{try{let r=JSON.parse(e);if(r.version!==1||!Array.isArray(r.profiles)||r.profiles.length>lt)throw new Error;let i=new Set;for(let s of r.profiles){if(!s||!Kt(s.id)||i.has(s.id)||typeof s.name!="string"||typeof s.content!="string"||typeof s.archived!="boolean"||!Number.isFinite(s.createdAt)||!Number.isFinite(s.updatedAt))throw new Error;ut(s.name,s.content),i.add(s.id)}return r}catch{throw new Error("Invalid profile library. The existing file was not changed. Repair library.json or restore its backup first.")}},Re=async(e,r)=>{if(await e.read(Z)!==r)throw new D("Another window changed the profile library. Refresh first; your current draft will be kept.")},Wt=(e,r=Date.now,i=()=>crypto.randomUUID())=>{let s=async()=>{let d=await e.read(ne);return{exists:d!==null,content:d??""}},f=async(d,c)=>{let n=JSON.stringify(d,null,2);if(n.length>15e5)throw new Error("The profile library has reached its size limit. Export and reduce its contents first.");if(await Re(e,c),await e.write(Z,n),await e.read(Z)!==n)throw new D("The profile library changed again after saving. Refresh; do not overwrite it again.");return n},g=async(d=!1)=>{let[c,n]=await Promise.all([e.read(Z),s()]);if(c!==null)return{raw:c,library:Ro(c),global:n};let a={version:1,profiles:[]};if(d&&n.exists){ut("Existing global rules",n.content);let E=r();a.profiles.push({id:i(),name:"Existing global rules",content:n.content,archived:!1,createdAt:E,updatedAt:E})}return{raw:d?await f(a,null):null,library:a,global:n}},O=async(d,c)=>{ut(c.name,c.content);let n=structuredClone(d.library),a=c.id?n.profiles.find(T=>T.id===c.id):void 0;if(c.id&&!a)throw new D("This profile is no longer in the library. Refresh first.");if(a?.archived)throw new Error("Unarchive this profile before editing.");if(n.profiles.some(T=>T.id!==c.id&&T.name===c.name.trim()))throw new Error("A profile with the same name already exists. Choose a different name.");if(a)Object.assign(a,{name:c.name.trim(),content:c.content,updatedAt:r()});else{if(n.profiles.length>=lt)throw new Error("You can save up to 100 profiles, including archived profiles.");n.profiles.push({id:i(),name:c.name.trim(),content:c.content,createdAt:r(),updatedAt:r(),archived:!1})}let E=await f(n,d.raw);return{library:n,raw:E,global:d.global}},w=async(d,c,n)=>{let a=structuredClone(d.library),E=a.profiles.find(I=>I.id===c);if(!E)throw new D("This profile no longer exists. Refresh first.");let T=await s();if(n&&T.exists&&E.content===T.content)throw new Error("This profile matches the current global file. Activate another profile before archiving it.");return E.archived=n,E.updatedAt=r(),{library:a,raw:await f(a,d.raw),global:T}},L=async(d,c)=>{await Re(e,d.raw);let n=d.library.profiles.find(a=>a.id===c&&!a.archived);if(!n)throw new Error("Select a saved, unarchived profile.");return{name:n.name,content:n.content,before:await s(),source:"profile",profileId:n.id}},$=async(d,c)=>{if(c.source==="profile"){await Re(e,d.raw);let T=d.library.profiles.find(I=>I.id===c.profileId&&!I.archived);if(!T||T.content!==c.content)throw new D("The profile changed. Preview it again.")}let n=await s();if(!pt(n,c.before))throw new D("The global file changed after preview. Nothing was written. Go back and preview the changes again.");if(n.exists&&n.content===c.content)return{global:n,backup:null};let a=null;if(n.exists){let T=r();a=`${T}-${i()}`;let I={version:1,id:a,createdAt:T,label:`Before ${c.source==="backup"?"restoring":"activating"} "${c.name}"`,content:n.content},k=`${F}/backups/${a}.json`,ae=JSON.stringify(I,null,2);if(await e.write(k,ae),await e.read(k)!==ae)throw new Error("Backup verification failed. The global file was not changed.")}if(c.source==="profile"&&await Re(e,d.raw),n=await s(),!pt(n,c.before))throw new D("The global file changed before writing. Nothing was written. Preview again.");await e.write(ne,c.content);let E=await s();if(!E.exists||E.content!==c.content)throw new D("File content after writing does not match the profile. Another editor may have written concurrently. Refresh; the backup from before this change is still available.");return{global:E,backup:a}},K=async()=>(await e.list(`${F}/backups`)).filter(d=>/^\d{13}-[a-f0-9-]{36}\.json$/.test(d)).sort().reverse().slice(0,50).map(d=>d.slice(0,-5)),z=async d=>{if(!/^\d{13}-[a-f0-9-]{36}$/.test(d))throw new Error("Invalid backup ID.");let c=await e.read(`${F}/backups/${d}.json`);try{let n=JSON.parse(c??"");if(n.version!==1||n.id!==d||!Number.isFinite(n.createdAt)||typeof n.label!="string"||typeof n.content!="string")throw new Error;return n}catch{throw new Error("The backup is missing or invalid. The global file was not changed.")}};return{load:g,readGlobal:s,save:O,archive:w,reviewProfile:L,apply:$,listBackups:K,readBackup:z,reviewBackup:async d=>{let c=await z(d);return{source:"backup",name:new Date(c.createdAt).toLocaleString("en-US"),content:c.content,before:await s()}},exportProfile:async d=>{if(!Kt(d.id))throw new Error("Invalid profile ID.");let c=`${F}/exports/${d.id}.md`;return await e.write(c,d.content),c}}};var Oe=e=>e&&typeof e=="object"&&"code"in e?e.code:void 0,Oo=(e,r)=>e===ne?"global rules":e===Z?"profile library":e===`${F}/backups`&&r==="list"?"backup list":e.startsWith(`${F}/backups/`)?"backup file":e.startsWith(`${F}/exports/`)?"export file":r==="list"?"file list":"file",Jt=(e,r=!1)=>{let i=Oe(e);if(i==="NOT_GRANTED")return"In Settings \u2192 Extensions, allow AGENTS.md Manager to access its declared rules file and profile directory.";if(i==="DENIED")return"Insufficient file permissions. Check permissions on the rules file or profile directory.";if(i==="HOST_TIMEOUT")return"The host timed out. Refresh to confirm the actual file state before continuing.";if(i==="BAD_PATH")return"The target path is outside the granted scope, or a symbolic link points to another directory.";if(i==="HOST_REJECTED"){let s=e instanceof Error?e.message:"";if(r&&s==="Extension operation failed.")return"The current directory contains characters outside Latin-1, triggering an OpenChamber file API compatibility issue. As a workaround, open AGENTS.md Manager from the right sidebar in a session without a project.";if(!s||s==="Extension operation failed."||s==="File operation failed.")return"The OpenChamber file API failed without a specific reason. Refresh; if it keeps failing, reload the panel."}return e instanceof Error?e.message:"The operation did not complete. Try again."},se=class extends Error{code;constructor(r,i,s,f){let g=r==="write"?"write":"read";super(`Failed to ${g} ${Oo(i,r)}: ${Jt(s,f)}${r==="write"?" The write result is unconfirmed. Refresh to check the actual state. Do not repeat the write without checking.":""}`,{cause:s}),this.name="FileOperationError",this.code=Oe(s)}},Yt=e=>{let r=!1,i=s=>{r=/[^\u0000-\u00ff]/.test(s??"")};return e.onReady(s=>i(s.directory)),e.onDirectory(i),{async read(s){let f=r;try{return(await e.readFile(s)).content}catch(g){if(Oe(g)==="NOT_FOUND")return null;throw new se("read",s,g,f)}},async write(s,f){let g=r;try{await e.writeFile(s,f)}catch(O){throw new se("write",s,O,g)}},async list(s){let f=r;try{return(await e.listDir(s)).entries.filter(g=>g.kind==="file").map(g=>g.name)}catch(g){if(Oe(g)==="NOT_FOUND")return[];throw new se("list",s,g,f)}}}},ft=e=>e instanceof se?e.message:Jt(e);var X=(e,r="",i)=>{let s=document.createElement(e);return s.className=r,i!==void 0&&(s.textContent=i),s},qt=e=>Vt(e)?.name??(e.global.exists?e.global.content?"No matching saved profile":"Global rules are empty":"No global rules file");var Qt=`/* Shared foundation for OpenChamber extensions. Colors and fonts belong to the host. */
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
}
* { box-sizing: border-box; }
html, body { margin: 0; height: 100%; background: var(--ext-bg); }
body { overflow: hidden; }
#root { height: 100%; }
[hidden] { display: none !important; }
button, input, textarea, select { font: inherit; }
.ext { color: var(--oc-fg); font-family: var(--oc-font); font-size: var(--ext-text-body); line-height: 1.5; }
.ext button:focus-visible, .ext [tabindex]:focus-visible { outline: 2px solid var(--oc-focus); outline-offset: 2px; }
.ext-actions { display: flex; align-items: center; flex-wrap: wrap; gap: var(--ext-space-2); }
.ext-muted { color: var(--oc-muted); font-size: var(--ext-text-small); }
.ext-notice { margin: 0; padding: 10px 12px; border-radius: var(--oc-radius, 6px); font-size: 12px; overflow-wrap: anywhere; background: color-mix(in srgb, var(--oc-info) 7%, var(--ext-bg)); color: var(--oc-info-text); }
.ext-notice[data-tone="success"] { background: color-mix(in srgb, var(--oc-success) 7%, var(--ext-bg)); color: var(--oc-success-text); }
.ext-notice[data-tone="warning"] { background: color-mix(in srgb, var(--oc-warning) 8%, var(--ext-bg)); color: var(--oc-warning-text); }
.ext-notice[data-tone="error"] { background: color-mix(in srgb, var(--oc-error) 7%, var(--ext-bg)); color: var(--oc-error-text); }
.ext .oc-sdk-btn[data-size="sm"], .ext .oc-sdk-tab { font-size: 12px; }
.ext .oc-sdk-field-note { font-size: var(--ext-text-small); }
@media (prefers-reduced-motion: reduce) {
  .ext *, .ext *::before, .ext *::after { animation: none !important; transition: none !important; }
}
`;var Zt=`.ag { height: 100%; display: flex; flex-direction: column; min-width: 0; }
.ag-header { flex: none; padding: 12px 16px 8px; border-bottom: 1px solid var(--oc-border); }
.ag-heading { display: flex; align-items: start; justify-content: space-between; gap: 12px; }
.ag-heading > div:first-child { min-width: 0; }
.ag-title { font-size: 14px; font-weight: 600; margin: 0; overflow-wrap: anywhere; }
.ag-scope { margin: 3px 0 10px; }
.ag-tabs { margin-top: 8px; }
.ag-tabs .oc-sdk-tabs { width: 100%; }
.ag-scroll { flex: 1; min-height: 0; padding: 16px; overflow: auto; scrollbar-gutter: stable; }
.ag-message { margin-bottom: 12px; }
.ag-stack { display: grid; gap: 16px; min-width: 0; }
.ag-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.ag-footer { position: sticky; bottom: -16px; background: var(--ext-bg); border-top: 1px solid var(--oc-border); padding: 12px 0; margin-top: 4px; }
.ag-footer .ext-actions { justify-content: flex-end; }
.ag-footer p { margin: 0 0 8px; }
.ag-path { margin: 12px 0 0; overflow-wrap: anywhere; }
.ag-section { padding: 4px 0 0; }
.ag-section p { margin: 0; }
.ag-status-row { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: baseline; gap: 12px; min-width: 0; min-height: 20px; }
.ag-status-label { color: var(--oc-muted); font-size: 12px; }
.ag-status-value { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: right; font-size: 12px; font-weight: 500; }
.ag-status-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ag-status-footer .ext-actions { flex: none; gap: 4px; }
.ag-status-footer .oc-sdk-btn { min-height: 28px; padding: 0 6px; font-weight: 400; }
html[data-oc-surface="status"] { --ext-bg: color-mix(in srgb, var(--surface-muted, transparent) 40%, var(--surface-background, transparent)); height: auto; }
html[data-oc-surface="status"] body, html[data-oc-surface="status"] #root { height: auto; overflow: auto; }
@media (max-width: 320px) { .ag-header { padding-left: 12px; padding-right: 12px; } .ag-scroll { padding: 12px; } .ag-footer { bottom: -12px; } }
`;var eo=`.ag-field .oc-sdk-field-label { font-size: 12px; }
.ag-field .oc-sdk-input { font-size: 13px; min-height: 36px; }
.ag-editor textarea { min-height: 220px; max-height: 60vh; resize: vertical; line-height: 1.65; tab-size: 2; }
.ag-editor .oc-sdk-field-note { font-variant-numeric: tabular-nums; }
.ag .oc-sdk-trigger-value { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ag .oc-sdk-select { min-width: 0; }
.ag .oc-sdk-trigger { width: 100%; min-width: 0; min-height: 36px; }
.ag-details { border-top: 1px solid var(--oc-border); padding-top: 12px; }
.ag-details summary { cursor: pointer; color: var(--oc-muted); font-size: 12px; padding: 4px 0; }
.ag-details .ext-actions { margin-top: 8px; }
.ag-guard { border: 1px solid var(--oc-warning); border-radius: var(--oc-radius); padding: 12px; }
.ag-guard p { margin: 0 0 8px; }
.ag-review-title { font-size: 14px; margin: 0; overflow-wrap: anywhere; }
.ag-diff { border: 1px solid var(--oc-border); border-radius: var(--oc-radius); overflow: auto; max-height: 48vh; font: 11px/1.65 var(--oc-mono); }
.ag-diff-line { display: grid; grid-template-columns: 30px 30px 16px minmax(0, 1fr); min-width: 0; }
.ag-diff-line span { padding: 1px 3px; text-align: right; color: var(--oc-muted); user-select: none; }
.ag-diff-line code { font: inherit; white-space: pre-wrap; overflow-wrap: anywhere; padding: 1px 8px 1px 0; }
.ag-diff-line[data-kind="add"] { background: color-mix(in srgb, var(--oc-success) 10%, transparent); color: var(--oc-success-text); }
.ag-diff-line[data-kind="remove"] { background: color-mix(in srgb, var(--oc-error) 10%, transparent); color: var(--oc-error-text); }
.ag-diff-gap { margin: 0; padding: 5px 12px; color: var(--oc-muted); font: 11px/1.5 var(--oc-font); background: var(--oc-hover); }
.ag-preview { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; font: 11px/1.65 var(--oc-mono); max-height: 40vh; overflow: auto; border: 1px solid var(--oc-border); border-radius: var(--oc-radius); padding: 12px; }
.ag-section .ext-notice { margin: 8px 0 4px; }
`;async function to(e,r){try{await e.openSurface(`plugin:${r.id}`)}catch{throw new Error(`Could not open ${r.name}. Reload the interface and try again.`)}}var no=document.createElement("style");no.textContent=Qt+Zt+eo;document.head.append(no);var Ue=rt(),Mo=Wt(Yt(Ue)),Ce=X("section","ext ag-section"),ie=X("p","ag-status-value","Reading\u2026");ie.setAttribute("role","status");var so=X("div","ag-status-row");so.append(X("span","ag-status-label","Current profile"),ie);var Ie=X("p","ext-muted","Global AGENTS.md"),B=X("p","ext-notice");Ie.title="Shows file state on the connected server, not whether existing sessions have loaded the rules.";B.hidden=!0;B.setAttribute("role","status");var io=X("div","ag-status-footer"),Me=X("div","ext-actions");io.append(Ie,Me);Ce.append(so,io,B);document.querySelector("#root").append(Ce);var mt=!1,oo=!1,ao=async()=>{if(!mt){mt=!0,ro.update({loading:!0});try{ie.textContent=qt(await Mo.load(!1)),ie.title=ie.textContent,Ie.textContent=`Read at ${new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"})}`,B.hidden=!0}catch(e){ie.textContent="Not read",Ie.textContent="Global AGENTS.md",B.textContent=ft(e),B.dataset.tone="error",B.hidden=!1}finally{mt=!1,ro.update({loading:!1})}}},ro=V(Me,{label:"Refresh",size:"sm",variant:"ghost",onClick:()=>{ao()}});V(Me,{label:"Manage",size:"sm",variant:"ghost",onClick:()=>{to(Ue,{id:"agents-manager",name:"AGENTS.md Manager"}).catch(e=>{B.hidden=!1,B.dataset.tone="error",B.textContent=ft(e)})}});Me.lastElementChild.setAttribute("aria-label","Manage rule profiles");new ResizeObserver(()=>{Ue.setHeight(Math.ceil(Ce.getBoundingClientRect().height)).catch(()=>{})}).observe(Ce);Ue.onReady(e=>{nt(e,document.documentElement),oo||(oo=!0,ao())});})();
