(function(){
"use strict";
const N = window.NOTE, ID = N.id, TOTAL = N.total;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const pad = n => String(n).padStart(2,"0");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = s => String(s||"")
  .replace(/\[AI 보충\]/g,'<span class="tag">AI 보충</span>')
  .replace(/\[추정\]/g,'<span class="tag">추정</span>')
  .replace(/\[현업\]/g,'<span class="tag">현업</span>');
const jumps = arr => (arr||[]).map(n=>`<button class="jump" type="button" data-go="${n}">S${pad(n)}</button>`).join(" ");

/* ---------- local storage helpers ---------- */
const LS = {
  get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k,v); return true; }catch(e){ return false; } }
};
const state = {};
for(let n=1;n<=TOTAL;n++){
  let v=null; try{ v=JSON.parse(LS.get(`${ID}:s${pad(n)}`)||"null"); }catch(e){}
  state[n] = v && typeof v==="object" ? {star:!!v.star,q:!!v.q,memo:String(v.memo||"")} : {star:false,q:false,memo:""};
}

/* ---------- build top cards ---------- */
function mapHTML(){
  const m=N.map, br=(b)=>`<div class="br"><div class="bt">${b.t}</div><div class="bk">${b.k.join(" · ")}</div><div class="bn">${jumps(b.s)}</div></div>`;
  const L=m.branches.slice(0,3).map(br).join(""), R=m.branches.slice(3).map(br).join("");
  const rels=m.rels.map(r=>`<div class="rel"><b>${r.a}</b> <span class="ar">⇢</span> <b>${r.b}</b>: ${fmt(r.txt)} ${jumps(r.s)}</div>`).join("");
  return `<h2>① 전체 지도</h2><div class="mm"><div class="col left">${L}</div><div class="center"><div>${m.center}</div></div><div class="col right">${R}</div></div>
  <div class="rels"><div class="grp">가지끼리 이어지는 관계</div>${rels}</div>`;
}
function guideHTML(){
  const g=N.guide;
  return `<h2>② 학습 가이드</h2><div class="guide">
  <div class="gbox"><h3>공부 방법</h3><ol>${g.how.map(x=>`<li>${fmt(x)}</li>`).join("")}</ol></div>
  <div class="gbox"><h3>순서</h3><ol>${g.order.map(o=>`<li><b>${o.t}</b> — ${o.d} ${jumps([o.r[0]])}~${jumps([o.r[1]])}</li>`).join("")}</ol></div>
  <div class="gbox"><h3>핵심</h3><ul>${g.core.map(c=>`<li>${fmt(c.t)} ${jumps(c.s)}</li>`).join("")}</ul></div>
  <div class="gbox"><h3>점검</h3>${g.check.map((c,i)=>`<details><summary>Q${i+1}. ${c.q} ${jumps(c.s)}</summary><div>${fmt(c.a)}</div></details>`).join("")}</div>
  </div>`;
}

/* ---------- slide sections ---------- */
function tipBox(t){ return t?`<div class="tip">🎙 <b>강사 한마디</b> — ${fmt(t)}</div>`:""; }
function sec(title, inner){ return `<details class="sec"><summary>${title}</summary><div class="body">${inner}</div></details>`; }

function termsHTML(t){
  return tipBox(t.tip)+`<div class="tblwrap tts"><table><tr><th>영문</th><th>한글</th><th>쉬운 뜻</th></tr>${t.rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${fmt(r[2])}</td></tr>`).join("")}</table></div>`;
}
function origHTML(o){
  return tipBox(o.tip)+`<div class="tts">${o.pairs.map(p=>`<div class="pair"><div class="src">${p[0]}</div><div>${fmt(p[1])}</div></div>`).join("")}</div>`;
}
function figHTML(n,f){
  const g=N.figs[n]; if(!g) return "";
  const bx=g.b.map((b,i)=>`<button type="button" class="bx" data-i="${i}" aria-label="영역 ${i+1}" style="left:${b[0]}%;top:${b[1]}%;width:${b[2]}%;height:${b[3]}%"><span>${i+1}</span></button>`).join("");
  const ctl=`<button type="button" data-d="-1" aria-label="이전">‹</button>`+g.b.map((b,i)=>`<button type="button" data-i="${i}">${i+1}</button>`).join("")+`<button type="button" data-d="1" aria-label="다음">›</button>`;
  return tipBox(f.tip)+`<div class="figw" data-n="${n}"><div class="fig"><img src="img/f${pad(n)}.jpg" width="${g.w}" height="${g.h}" alt="Slide ${n} 그림" loading="lazy">${bx}</div>
  <div class="figctl">${ctl}</div><div class="figdesc tts"></div></div>`+(f.redraw?`<details class="sec redraw"><summary>한글로 다시 그린 도표</summary><div class="body tts"><div class="tblwrap">${f.redraw}</div></div></details>`:"");
}
function tableHTML(t){ return tipBox(t.tip)+`<div class="tblwrap tts">${t.html}</div>`+(t.note?`<div class="tts" style="margin-top:6px">${fmt(t.note)}</div>`:""); }
function numHTML(x){
  return tipBox(x.tip)+(x.intro?`<div class="tts">${fmt(x.intro)}</div>`:"")+`<ol class="steps">${x.steps.map(s=>`<li>${fmt(s)}</li>`).join("")}</ol>`+(x.note?`<div class="tts">${fmt(x.note)}</div>`:"");
}
function reviewHTML(r){
  let h=`<div class="tts">`;
  if(r.logic) h+=`<h3>핵심 논리</h3><div>${fmt(r.logic)}</div>`;
  if(r.mem) h+=`<h3>외울 것</h3><ol>${r.mem.map(m=>`<li>${fmt(m)}</li>`).join("")}</ol>`;
  if(r.exam) h+=`<h3>시험 대비 한 줄 답안</h3><div class="oneline">${fmt(r.exam)}</div>`;
  if(r.restore) h+=`<h3>백지 복원 과제</h3><div>${fmt(r.restore)}</div>`;
  return h+`</div>`;
}
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function quizInner(n,q){
  const mc=(q.mcq||[]).map((m,qi)=>{
    const opts=shuffle(m.o.map((t,i)=>({t,ok:i===0})));
    return `<div class="qz mc" data-q="${qi}"><div class="qq">객관식 ${qi+1}. ${m.q}</div>${opts.map(o=>`<button type="button" class="opt" data-ok="${o.ok?1:0}">${o.t}</button>`).join("")}<div class="fb" hidden></div><div class="ex" hidden>${fmt(m.ex)}</div></div>`;
  }).join("");
  const es=(q.essay||[]).map((e,ei)=>`<div class="qz ess"><div class="qq">서술형 ${ei+1}. ${e.q}</div><textarea placeholder="내 답을 먼저 써 보세요"></textarea>
    <button type="button" class="showm">모범 답안 보기</button><div class="model"><div><b>모범 답안</b> ${fmt(e.model)}</div><div style="margin-top:6px"><b>채점 포인트</b>${e.pts.map(p=>`<label><input type="checkbox"> ${fmt(p)}</label>`).join("")}</div></div></div>`).join("");
  const total=(q.mcq||[]).length;
  return (total?`<div class="score" data-total="${total}"><span class="sc">점수 0 / ${total}</span><button type="button" class="retry">다시 풀기</button></div>`:"")+mc+es;
}

function slideHTML(n){
  const s=N.slides[n], title=N.titles[n]||"";
  let h=`<section class="card slide" id="s${n}" data-n="${n}"><div class="shead"><span class="sno">Slide ${pad(n)}</span><span class="stitle">${esc(title)}</span></div>
  <div class="thumbrow"><img class="thumb" src="img/t${pad(n)}.jpg" width="1170" height="827" alt="Slide ${n} 원본" loading="lazy"><div>`;
  if(!s){ h+=`<div class="pending">이 슬라이드 해설은 다음 게시분에 추가돼요. 지금은 원본 썸네일과 메모만 쓸 수 있어요.</div></div></div>`; }
  else{
    h+=`<div class="oneline tts"><b>한 줄</b> ${fmt(s.one)}</div>`;
    h+=`<div class="lec tts"><div class="lh">🎙 강사 설명</div>${s.lec.map(p=>`<p>${fmt(p)}</p>`).join("")}${(s.flags||[]).map(f=>`<div class="flag">⚠ ${fmt(f)}</div>`).join("")}<div class="sum">정리하면, ${fmt(s.sum)}</div></div></div></div>`;
    const S=s.sec||{}; let during="", rev="", qz="";
    if(S.terms) during+=sec("용어",termsHTML(S.terms));
    if(S.orig) during+=sec(S.orig.label||"원문 풀어 읽기",origHTML(S.orig));
    if(S.fig) during+=sec("그림 읽기",figHTML(n,S.fig));
    if(S.table) during+=sec(S.table.label||"표",tableHTML(S.table));
    if(S.num) during+=sec("숫자 예제",numHTML(S.num));
    if(S.review) rev=sec("복습: 핵심 논리 · 외울 것 · 한 줄 답안 · 백지 복원",reviewHTML(S.review));
    if(S.quiz&&((S.quiz.mcq||[]).length||(S.quiz.essay||[]).length)) qz=sec(`퀴즈 (${(S.quiz.mcq||[]).length+(S.quiz.essay||[]).length}문제)`,`<div class="quizbox" data-n="${n}">${quizInner(n,S.quiz)}</div>`);
    if(during) h+=`<div class="grp">강의 중</div>`+during;
    if(rev) h+=`<div class="grp">복습</div>`+rev;
    if(qz) h+=`<div class="grp">퀴즈</div>`+qz;
  }
  h+=`<div class="marks"><button type="button" class="star">★ 시험 강조</button><button type="button" class="ques">? 질문</button><textarea class="memo" placeholder="메모 (자동 저장)"></textarea></div></section>`;
  return h;
}

/* ---------- render ---------- */
const main=$("#main");
let html=`<section class="card" id="top"><div class="muted">${N.sub}</div></section>`;
html+=`<section class="card">${mapHTML()}</section><section class="card">${guideHTML()}</section>`;
for(let n=1;n<=TOTAL;n++) html+=slideHTML(n);
main.innerHTML=html;

const nav=$("#nav");
const GROUPS=N.navGroups||[];
nav.innerHTML=`<button type="button" data-go="top">지도</button>`+Array.from({length:TOTAL},(_,i)=>{const n=i+1, g=GROUPS.find(x=>x.from===n);return (g?`<span class="glab">${g.t}</span>`:"")+`<button type="button" data-go="${n}" class="${N.slides[n]?"":"todo"}">${n}</button>`;}).join("");

/* marks init */
function paintMarks(n){
  const sec=$("#s"+n), st=state[n];
  $(".star",sec).classList.toggle("on",st.star); $(".ques",sec).classList.toggle("on",st.q);
  sec.classList.toggle("starred",st.star);
  const b=$(`#nav [data-go="${n}"]`); if(b) b.classList.toggle("has-star",st.star);
}
for(let n=1;n<=TOTAL;n++){ $(".memo",$("#s"+n)).value=state[n].memo; paintMarks(n); }

/* ---------- figures ---------- */
function figSelect(w,i){
  const n=+w.dataset.n, f=N.slides[n].sec.fig, k=f.desc.length;
  i=(i+k)%k; w.dataset.i=i;
  $$(".bx",w).forEach(b=>b.classList.toggle("sel",+b.dataset.i===i));
  $$(".figctl [data-i]",w).forEach(b=>b.classList.toggle("sel",+b.dataset.i===i));
  const d=$(".figdesc",w); d.innerHTML=`<b>${i+1}</b> ${fmt(f.desc[i])}`; applyTT(d, n, true);
}
$$(".figw").forEach(w=>{ w.dataset.i=0; });

/* ---------- tooltips ---------- */
const GL=N.gloss;
const parts=GL.map((g,gi)=>g.m.map(p=>({p,gi}))).flat().sort((a,b)=>b.p.length-a.p.length);
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const isAscii=s=>/^[A-Za-z0-9]/.test(s), endAscii=s=>/[A-Za-z0-9]$/.test(s);
const re=new RegExp(parts.map(x=>{
  let r=reEsc(x.p);
  if(isAscii(x.p)) r="(?<![A-Za-z0-9])"+r; else if(/^[가-힣]/.test(x.p)) r="(?<![가-힣])"+r;
  if(endAscii(x.p)) r=r+"(?![A-Za-z0-9])";
  return "("+r+")";
}).join("|"),"g");
const seen={};
function applyTT(root, n, fresh){
  if(!seen[n]) seen[n]=new Set();
  const used=seen[n];
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(t){
    const p=t.parentElement; if(!p||!t.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
    if(p.closest(".eq,button,.qz,.fig,.tt,textarea,summary,.jump,.tag")) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT; }});
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(t=>{
    const s=t.nodeValue; re.lastIndex=0; let m, last=0, frag=null;
    while((m=re.exec(s))){
      const idx=m.slice(1).findIndex(x=>x!==undefined); const gi=parts[idx].gi;
      if(used.has(gi)) continue;
      used.add(gi); frag=frag||document.createDocumentFragment();
      frag.appendChild(document.createTextNode(s.slice(last,m.index)));
      const sp=document.createElement("span"); sp.className="tt"; sp.tabIndex=0; sp.dataset.g=gi; sp.textContent=m[0]; frag.appendChild(sp);
      last=m.index+m[0].length;
    }
    if(frag){ frag.appendChild(document.createTextNode(s.slice(last))); t.parentNode.replaceChild(frag,t); }
  });
}
for(let n=1;n<=TOTAL;n++){ const sec=$("#s"+n); if(N.slides[n]) $$(".tts",sec).forEach(el=>applyTT(el,n)); }
$$(".figw").forEach(w=>figSelect(w,0));

const tip=$("#tip"); let tipFor=null;
function showTip(el){
  const g=GL[+el.dataset.g];
  tip.innerHTML=`<div class="tn">${g.n}</div>${g.r?`<div class="tr">읽는 법: ${g.r}</div>`:""}<div>${g.d}</div>${g.x?`<div class="tx">${g.x}</div>`:""}`;
  tip.style.display="block"; tipFor=el;
  const r=el.getBoundingClientRect(), tw=tip.offsetWidth, th=tip.offsetHeight, vw=document.documentElement.clientWidth, vh=window.innerHeight;
  let left=Math.min(Math.max(8,r.left), vw-tw-8); let top=r.bottom+6;
  if(top+th>vh-8) top=Math.max(8,r.top-th-6);
  tip.style.left=left+"px"; tip.style.top=top+"px";
}
function hideTip(){ tip.style.display="none"; tipFor=null; }
document.addEventListener("pointerover",e=>{ const t=e.target.closest&&e.target.closest(".tt"); if(t&&e.pointerType==="mouse") showTip(t); });
document.addEventListener("pointerout",e=>{ const t=e.target.closest&&e.target.closest(".tt"); if(t&&e.pointerType==="mouse"&&!(e.relatedTarget&&t.contains(e.relatedTarget))) hideTip(); });
let lastPD=0; document.addEventListener("pointerdown",()=>{ lastPD=Date.now(); },true);
document.addEventListener("focusin",e=>{ if(Date.now()-lastPD<600) return; if(e.target.classList&&e.target.classList.contains("tt")) showTip(e.target); });
window.addEventListener("scroll",()=>{ if(tipFor&&matchMedia("(hover:hover)").matches) hideTip(); },{passive:true});

/* ---------- clicks ---------- */
const bar=$("#bar");
function setBarH(){ document.documentElement.style.setProperty("--barH",bar.offsetHeight+"px"); }
setBarH(); window.addEventListener("resize",setBarH); if(window.ResizeObserver) new ResizeObserver(setBarH).observe(bar);
function go(t){
  const el=t==="top"?$("#top"):$("#s"+t); if(!el) return;
  if(el.offsetParent===null){ document.body.classList.remove("only-star"); $("#bStar").classList.remove("on"); }
  el.scrollIntoView({behavior:"smooth",block:"start"});
}
document.addEventListener("click",e=>{
  const t=e.target;
  const tt=t.closest(".tt");
  if(tt){ if(tipFor===tt) hideTip(); else showTip(tt); e.preventDefault(); return; }
  if(!t.closest("#tip")) hideTip();
  const g=t.closest("[data-go]"); if(g){ go(g.dataset.go); return; }
  if(t.classList.contains("thumb")){ const lb=$("#lb"); $("img",lb).src=t.src; lb.classList.add("show"); return; }
  if(t.closest("#lb")){ $("#lb").classList.remove("show"); return; }
  const fw=t.closest(".figw");
  if(fw){ const b=t.closest("[data-i]"); if(b){ figSelect(fw,+b.dataset.i); return; } const d=t.closest("[data-d]"); if(d){ figSelect(fw,+fw.dataset.i+ +d.dataset.d); return; } }
  if(t.classList.contains("opt")){
    const box=t.closest(".mc"); if(box.dataset.done) return; box.dataset.done=1;
    const ok=t.dataset.ok==="1";
    $$(".opt",box).forEach(o=>{ o.disabled=true; if(o.dataset.ok==="1") o.classList.add("right"); });
    if(!ok) t.classList.add("wrong");
    const fb=$(".fb",box); fb.hidden=false; fb.innerHTML=(ok?'<span class="r">정답!</span> ':'<span class="w">오답</span> — 초록색 보기가 정답이에요. ')+$(".ex",box).innerHTML;
    const qb=t.closest(".quizbox"), sc=$(".score",qb); const right=$$(".opt.right",qb).filter(o=>!o.parentElement.querySelector(".opt.wrong")).length;
    const done=$$(".mc[data-done]",qb).length; $(".sc",sc).textContent=`점수 ${right} / ${sc.dataset.total} (푼 문제 ${done})`;
    return;
  }
  if(t.classList.contains("retry")){ const qb=t.closest(".quizbox"), n=+qb.dataset.n; qb.innerHTML=quizInner(n,N.slides[n].sec.quiz); return; }
  if(t.classList.contains("showm")){ const m=t.nextElementSibling; m.classList.toggle("show"); t.textContent=m.classList.contains("show")?"모범 답안 숨기기":"모범 답안 보기"; return; }
  const sec=t.closest(".slide");
  if(sec&&(t.classList.contains("star")||t.classList.contains("ques"))){
    const n=+sec.dataset.n, k=t.classList.contains("star")?"star":"q"; state[n][k]=!state[n][k]; paintMarks(n); save(n,0); return;
  }
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){ hideTip(); $("#lb").classList.remove("show"); return; }
  const a=document.activeElement; if(a&&(a.tagName==="TEXTAREA"||a.tagName==="INPUT"||a.isContentEditable)) return;
  if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
    e.preventDefault(); const vis=$$(".slide").filter(s=>s.offsetParent!==null).map(s=>+s.dataset.n);
    let i=vis.indexOf(cur); if(i<0) i=e.key==="ArrowRight"?-1:0;
    const nx=vis[i+(e.key==="ArrowRight"?1:-1)]; if(nx) go(nx); else if(e.key==="ArrowLeft") go("top");
  }
});
$("#main").addEventListener("input",e=>{ if(e.target.classList.contains("memo")){ const n=+e.target.closest(".slide").dataset.n; state[n].memo=e.target.value; save(n,900); } });

/* ---------- tool buttons ---------- */
$("#bStar").addEventListener("click",e=>{ const on=document.body.classList.toggle("only-star"); e.currentTarget.classList.toggle("on",on); });
$("#bAll").addEventListener("click",e=>{ const b=e.currentTarget, open=b.textContent==="전체 펼치기"; $$("details.sec").forEach(d=>d.open=open); b.textContent=open?"전체 접기":"전체 펼치기"; b.classList.toggle("on",open); });
const easyKey=`${ID}:easy`;
function setEasy(on){ document.body.classList.toggle("no-easy",!on); $("#bEasy").classList.toggle("on",on); LS.set(easyKey,on?"1":"0"); }
setEasy(LS.get(easyKey)!=="0");
$("#bEasy").addEventListener("click",()=>setEasy(document.body.classList.contains("no-easy")));

/* ---------- current slide tracking ---------- */
let cur=0;
function track(){
  const y=bar.offsetHeight+24; let c="top";
  for(const s of $$(".slide")){ if(s.offsetParent===null) continue; if(s.getBoundingClientRect().top<=y) c=+s.dataset.n; else break; }
  if(c!==cur){ cur=c; $$("#nav button").forEach(b=>b.classList.toggle("cur",b.dataset.go==String(c))); const b=$(`#nav [data-go="${c}"]`); if(b){ const l=b.offsetLeft-nav.clientWidth/2+b.offsetWidth/2; nav.scrollTo({left:l,behavior:"smooth"}); } }
}
window.addEventListener("scroll",()=>requestAnimationFrame(track),{passive:true}); track();

/* ---------- saving: account db (private path) with browser fallback ---------- */
const saveEl=$("#save"); let col=null; const timers={}, chains={};
function status(t,warn){ saveEl.textContent=t; saveEl.classList.toggle("warn",!!warn); saveEl.title=warn?"계정에 연결되지 않아 이 브라우저에만 저장하고 있어요":"본인만 보는 개인 경로에 저장돼요"; }
function docId(n){ return `${ID}-s${pad(n)}`; }
function save(n,delay){
  const v=state[n]; LS.set(`${ID}:s${pad(n)}`,JSON.stringify(v));
  clearTimeout(timers[n]);
  timers[n]=setTimeout(()=>{
    if(!col){ status("저장: 브라우저",true); return; }
    const body={star:v.star,q:v.q,memo:v.memo,t:Date.now()};
    status("저장 중…");
    chains[n]=(chains[n]||Promise.resolve()).then(()=>col.doc(docId(n)).set(body)).then(()=>status("저장: 계정(db) ✓")).catch(()=>status("저장: 브라우저 (계정 실패)",true));
  },delay||0);
}
function waitClaude(ms){ return new Promise(res=>{ const t0=Date.now(); (function p(){ if(window.claude&&window.claude.use) return res(window.claude); if(Date.now()-t0>ms) return res(null); setTimeout(p,150); })(); }); }
function timeout(p,ms){ return Promise.race([p,new Promise((_,r)=>setTimeout(()=>r(new Error("timeout")),ms))]); }
(async()=>{
  try{
    const c=await waitClaude(4000); if(!c) throw 0;
    const [user,db]=await timeout(Promise.all([c.use("user"),c.use("db")]),11000);
    if(!user||!db) throw 0;
    const uid=await user.id(); if(!uid) throw 0;
    const cref=db.collection("data/users/"+uid);
    const snap=await timeout(cref.get(),10000);
    const remote={}; snap.docs.forEach(d=>{ if(d.exists&&d.id.indexOf(ID+"-s")===0) remote[+d.id.slice(ID.length+2)]=d.data(); });
    col=cref;
    const push=[];
    for(let n=1;n<=TOTAL;n++){
      const r=remote[n];
      if(r){ state[n]={star:!!r.star,q:!!r.q,memo:String(r.memo||"")}; LS.set(`${ID}:s${pad(n)}`,JSON.stringify(state[n])); $(".memo",$("#s"+n)).value=state[n].memo; paintMarks(n); }
      else if(state[n].star||state[n].q||state[n].memo) push.push(n);
    }
    for(const n of push){ await col.doc(docId(n)).set({...state[n],t:Date.now()}); }
    status("저장: 계정(db) ✓");
  }catch(e){ col=null; status("저장: 브라우저",true); }
})();
})();
