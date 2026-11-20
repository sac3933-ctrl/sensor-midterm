/* 공용 사이드바·검색 — 기존 노트의 상단 바를 왼쪽 사이드바로 옮기고 한·영 검색을 더한다.
   기존 버튼(★ 표시만·전체 펼치기·쉬운 설명)은 그대로 눌러서 쓰므로 저장 경로·키는 바뀌지 않는다. */
(function(){
"use strict";
if (window.__sbLoaded) return; window.__sbLoaded = true;
const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const esc = s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const norm = t=>String(t).toLowerCase(), nos = t=>t.replace(/\s+/g,"");
const isWide = ()=>window.matchMedia("(min-width:1024px)").matches;
const LS = k=>{ try{ return localStorage.getItem(k); }catch(e){ return null; } };
const LSset = (k,v)=>{ try{ localStorage.setItem(k,v); }catch(e){} };

let HDR=null, ITEMS=[], BTN={}, STATUS=null, cur=-1;

function findHeader(){
  const cands = $$("header.top, div.top, #bar, header, .topbar");
  for (const e of cands){ const p = getComputedStyle(e).position; if ((p==="fixed"||p==="sticky") && e.querySelectorAll("button").length >= 3) return e; }
  return null;
}
function slideSecs(){ return $$("[id]").filter(e=>/^s\d+$/.test(e.id)); }
function cleanTitle(t){
  return String(t).replace(/\s+/g," ").replace(/^\s*(Slide|슬라이드)\s*\d+\s*[·:.\-—]?\s*/i,"")
    .replace(/★\s*시험 강조|\?\s*질문|사진·사례 장|가벼운 장|핵심 장/g,"").trim().slice(0,70);
}
function titleOf(sec){
  if (!sec) return "";
  const el = sec.querySelector(".ttl, .title, .stitle, h2, h3") || sec.querySelector(".hd, .shead, .sh, header");
  let t = el ? el.textContent : sec.textContent.slice(0,80);
  return cleanTitle(t);
}
function btnText(b){ return (b.textContent||"").replace(/\s+/g," ").trim(); }

function collect(){
  // 1) 노트 순서(번호 칩 + 파트 라벨)
  const seq = [];
  const w = document.createTreeWalker(HDR, NodeFilter.SHOW_ELEMENT);
  while (w.nextNode()){
    const e = w.currentNode, t = btnText(e);
    if (e.tagName==="BUTTON" && (/^(\d+|A\d+)$/.test(t) || t==="지도")) seq.push({kind:"chip", el:e, t, id:e.dataset.n||e.dataset.s||e.dataset.go||t, deck:((e.title||"").match(/^([①-⑳])/)||[])[1]||""});
    else if (/(^| )(plab|partsep|glab|sep|part|grp-label)( |$)/.test(e.className||"") && e.tagName!=="BUTTON" && t) seq.push({kind:"part", t});
  }
  ITEMS = seq.map(x=>{
    if (x.kind==="part") return x;
    let target = null, title = "";
    if (x.t==="지도"){ target = document.getElementById("s0") || $(".guide, #map, .map, #guide"); title = "전체 지도 · 학습 가이드"; }
    else { target = document.getElementById("s"+x.id) || document.getElementById("s"+x.t); title = titleOf(target);
      if (!title){ const m = (x.el.title||"").match(/^Slide\s*\d+\s*[:：]\s*(.+)$/); if (m) title = cleanTitle(m[1]); } }
    return {kind:"slide", n:x.t, deck:x.deck, chip:x.el, target, title};
  });
  // 2) 기존 버튼과 저장 표시
  for (const b of $$("button", HDR)){
    const t = btnText(b);
    if (/표시만/.test(t)) BTN.star = b; else if (/전체\s*(펼치기|접기)/.test(t)) BTN.all = b; else if (/쉬운 설명/.test(t)) BTN.easy = b;
  }
  STATUS = $("#st, #status, #save, .st, .status", HDR) || $$("span", HDR).find(s=>/^저장|계정/.test(btnText(s))) || null;
}

function build(){
  const [main, sub] = document.title.split(" — ");
  const side = document.createElement("aside"); side.id="sbSide"; side.setAttribute("aria-label","노트 메뉴");
  side.innerHTML = `<div class="sb-head"><button id="sbCol" class="sb-ic" title="메뉴 접기 ( [ )" aria-label="메뉴 접기">⟨</button><div class="sb-title">${esc(main||document.title)}<small>${esc(sub||"")}</small></div></div>
  <a class="sb-hub" href="../" title="통합 목차·전체 검색">📚 통합 노트 · 전체 검색 · 과제·시험</a>
  <div class="sb-search"><input id="sbQ" type="search" placeholder="검색 — 한글·영어 ( / )" autocomplete="off" aria-label="노트 검색"><div class="sb-qf">${[["all","전체"],["body","본문"],["term","용어"],["book","교재"],["latest","최신"],["quiz","퀴즈"],["memo","내 메모"]].map(([k,l])=>`<button class="sb-qc${k==="all"?" on":""}" data-cat="${k}">${l}</button>`).join("")}</div></div>
  <div id="sbRes" hidden></div>
  <div class="sb-tools">${BTN.star?`<button class="sb-tb" data-px="star">★ 표시만</button>`:""}${BTN.all?`<button class="sb-tb" data-px="all">전체 펼치기</button>`:""}${BTN.easy?`<button class="sb-tb" data-px="easy">🎙 쉬운 설명</button>`:""}${STATUS?`<span class="sb-st" id="sbSt"></span>`:""}</div>
  <nav id="sbNav"></nav>`;
  const rail = document.createElement("div"); rail.id="sbRail";
  rail.innerHTML = `<button id="sbOpen" class="sb-ic" title="메뉴 펼치기 ( [ )" aria-label="메뉴 펼치기">⟩</button><button id="sbRlQ" class="sb-ic" title="검색 ( / )" aria-label="검색">🔍</button>${BTN.star?`<button class="sb-ic" data-px="star" title="★ 표시만" aria-label="★ 표시만">★</button>`:""}${BTN.easy?`<button class="sb-ic" data-px="easy" title="쉬운 설명" aria-label="쉬운 설명">🎙</button>`:""}<div class="sb-sep"></div><button id="sbPrev" class="sb-ic" title="이전" aria-label="이전">▲</button><div id="sbRlCur">지도</div><button id="sbNext" class="sb-ic" title="다음" aria-label="다음">▼</button>`;
  const top = document.createElement("div"); top.id="sbTop";
  top.innerHTML = `<button id="sbMenu" class="sb-ic" aria-label="메뉴 열기">☰</button><div id="sbTopCur">지도</div><button id="sbTopQ" class="sb-ic" aria-label="검색">🔍</button>`;
  const scrim = document.createElement("div"); scrim.id="sbScrim";
  document.body.append(side, rail, top, scrim);
  $("#sbNav").innerHTML = ITEMS.map((x,i)=> x.kind==="part" ? `<div class="sb-part">${esc(x.t)}</div>`
    : `<button class="sb-nv" data-i="${i}"><span class="sb-nn">${x.n==="지도"?"🗺":(x.deck||"")+String(x.n).padStart(2,"0")}</span><span class="sb-nt">${esc(x.n==="지도"?x.title:(x.title||"Slide "+x.n))}</span><span class="sb-mk"></span></button>`).join("");
  HDR.classList.add("sb-hidehdr"); document.body.classList.add("sb-on"); document.documentElement.classList.add("sb-html");
  if (LS("sensorNote:sbCol")==="1") document.body.classList.add("sb-col");
  syncMarks(); syncButtons(); syncStatus(); updCur();
}

/* ---------- 상태 동기화 ---------- */
const hasCls = (el, re)=>re.test(" "+(el.className||"")+" ");
function syncMarks(){
  ITEMS.forEach((x,i)=>{ if (x.kind!=="slide") return; const b = $(`#sbNav .sb-nv[data-i="${i}"]`); if (!b) return;
    b.classList.toggle("st", hasCls(x.chip, / (s|st|star|starred|has-star|stared) /));
    b.classList.toggle("qm", hasCls(x.chip, / (qq|q|hasq|has-q|ques) /));
    b.classList.toggle("dim", hasCls(x.chip, / (dim|off|hide|hid) /)); });
}
function isOn(b){ return b && (b.getAttribute("aria-pressed")==="true" || hasCls(b, / (on|active|sel|pressed) /)); }
function syncButtons(){
  for (const k of ["star","all","easy"]){ const o = BTN[k]; if (!o) continue;
    $$(`[data-px="${k}"]`).forEach(b=>{ b.classList.toggle("on", isOn(o)); if (k==="all" && b.classList.contains("sb-tb")) b.textContent = /접기/.test(btnText(o)) ? "전체 접기" : "전체 펼치기"; }); }
}
function syncStatus(){ const s = $("#sbSt"); if (s && STATUS){ s.textContent = btnText(STATUS); s.title = btnText(STATUS); } }

/* ---------- 이동 ---------- */
const topH = ()=>{ const t=$("#sbTop"); return t && getComputedStyle(t).display!=="none" ? t.offsetHeight : 0; };
function pin(el, off){
  const fix = (smooth)=>{ const r = el.getBoundingClientRect(), want = topH() + off;
    if (Math.abs(r.top - want) > 30) window.scrollTo({top:Math.max(0, r.top + window.scrollY - want), behavior: smooth ? "smooth" : "auto"}); };
  const far = Math.abs(el.getBoundingClientRect().top) > window.innerHeight*3;
  fix(!far); [450, 1000, 1800].forEach(t=>setTimeout(()=>fix(false), t));
}
function goEl(el, extra){ if (!el) return; const y = el.getBoundingClientRect().top + window.scrollY - topH() - (extra==null?10:extra); window.scrollTo({top:Math.max(0,y), behavior:"smooth"}); }
function goItem(i){ const x = ITEMS[i]; if (!x) return; closeDrawer();
  if (x.target && x.target.offsetParent!==null) pin(x.target, 10); else x.chip.click(); }
function slideIdx(){ return ITEMS.map((x,i)=>x.kind==="slide"?i:-1).filter(i=>i>=0 && ITEMS[i].target && ITEMS[i].target.offsetParent!==null); }
function step(d){ const L = slideIdx(); if (!L.length) return; let k = L.indexOf(cur); k = k<0 ? (d>0?0:0) : Math.max(0, Math.min(L.length-1, k+d)); goItem(L[k]); }
function updCur(){
  const lim = topH() + 40; let c = -1;
  for (const i of slideIdx()){ if (ITEMS[i].target.getBoundingClientRect().top <= lim) c = i; }
  if (c<0){ const L = slideIdx(); c = L.length ? L[0] : -1; }
  const changed = c!==cur; cur = c;
  $$("#sbNav .sb-nv").forEach(b=>b.classList.toggle("cur", +b.dataset.i===cur));
  const x = ITEMS[cur];
  $("#sbTopCur").textContent = x ? (x.n==="지도" ? "지도" : `${x.deck||""}Slide ${String(x.n).padStart(2,"0")} · ${x.title}`) : "";
  $("#sbRlCur").textContent = x ? (x.deck||"")+x.n : "";
  if (changed){ const b = $(`#sbNav .sb-nv[data-i="${cur}"]`), nav = $("#sbNav");
    if (b && (b.offsetTop < nav.scrollTop || b.offsetTop + b.offsetHeight > nav.scrollTop + nav.clientHeight)) nav.scrollTop = b.offsetTop - nav.clientHeight/2; }
}
function setCol(on){ document.body.classList.toggle("sb-col", on); LSset("sensorNote:sbCol", on?"1":"0"); setTimeout(updCur, 60); }
function openDrawer(){ document.body.classList.add("sb-drawer"); }
function closeDrawer(){ document.body.classList.remove("sb-drawer"); }
function openSearch(){ if (isWide()) setCol(false); else openDrawer(); setTimeout(()=>{ const q=$("#sbQ"); q.focus(); q.select(); }, 60); }

/* ---------- 검색 ---------- */
let IDX=[], PAIRS=[], idxAt=0, cat="all", hits=[], sel=-1;
const W8 = {title:100, term:60, memo:50, body:30, book:25, latest:25, quiz:15};
function txt(el){ const c = el.cloneNode(true); c.querySelectorAll("script,style,button,textarea,input").forEach(x=>x.remove()); return c.textContent.replace(/\s+/g," ").trim(); }
function catOf(label){ return /용어|툴팁|기호|단위/.test(label) ? "term" : /교재/.test(label) ? "book" : /최신/.test(label) ? "latest" : /퀴즈|문제|객관식|서술형/.test(label) ? "quiz" : "body"; }
function add(o){ if (!o.text) return; o.L = norm(o.text); o.NS = nos(o.L); IDX.push(o); }
function buildIndex(){
  IDX = []; const seen = new Set();
  ITEMS.forEach((x,i)=>{
    if (x.kind!=="slide" || !x.target || seen.has(x.target)) return; seen.add(x.target);
    const sec = x.target;
    add({i, cat:"title", label:"제목", el:sec, text:x.title});
    const tops = $$("details", sec).filter(d=>!d.parentElement.closest("details") || !sec.contains(d.parentElement.closest("details")));
    for (const d of tops){ const s = $("summary", d); const lab = s ? btnText(s).slice(0,40) : "펼침 칸";
      const c = d.cloneNode(true); const cs = $("summary", c); if (cs) cs.remove();
      add({i, cat:catOf(lab), label:lab.replace(/^[▸▶▾▼\s]+/,""), el:d, text:txt(c)}); }
    const rest = sec.cloneNode(true); rest.querySelectorAll("details").forEach(d=>d.remove());
    add({i, cat:"body", label:"본문", el:sec, text:txt(rest)});
    $$("textarea", sec).forEach(ta=>{ if (ta.value && ta.value.trim()) add({i, cat:"memo", label:"내 메모", el:ta, text:ta.value}); });
  });
  // 한·영 짝: "한글(English)" / "English(한글)"
  const all = IDX.map(e=>e.text).join(" \n ");
  const P = new Map();
  const r1 = /(?<![가-힣])([가-힣]{2,10})\s*\(\s*([A-Za-z][A-Za-z\-]*(?: [A-Za-z][A-Za-z\-]*){0,2})\s*[,;:)]/g, r2 = /(?<![A-Za-z])([A-Za-z][A-Za-z\-]*(?: [A-Za-z][A-Za-z\-]*){0,2})\s*\(\s*([가-힣]{2,10})\s*[,;:)]/g;
  let m; while ((m = r1.exec(all)) && P.size < 4000){ const ko = norm(m[1].trim()), en = norm(m[2].trim()); if (ko.length>=2 && en.length>=2) P.set(ko+"|"+en, [ko,en]); }
  while ((m = r2.exec(all)) && P.size < 6000){ const en = norm(m[1].trim()), ko = norm(m[2].trim()); if (ko.length>=2 && en.length>=2) P.set(ko+"|"+en, [ko,en]); }
  PAIRS = [...P.values()]; idxAt = Date.now();
}
function expand(q){ const out=[q]; if (q.length<2) return out;
  for (const p of PAIRS){ if (p.some(f=>f===q || (q.length>=3 && f.includes(q) && f.length <= q.length+12))) for (const f of p) if (!out.includes(f) && out.length<5) out.push(f); }
  return out; }
function snip(text, i, len){ if (i<0) return esc(text.slice(0,90))+(text.length>90?"…":"");
  const a=Math.max(0,i-34), b=Math.min(text.length,i+len+50);
  return (a>0?"…":"")+esc(text.slice(a,i))+"<mark>"+esc(text.slice(i,i+len))+"</mark>"+esc(text.slice(i+len,b))+(b<text.length?"…":""); }
function run(){
  const raw = $("#sbQ").value.trim(), box = $("#sbRes"); clearMarks();
  if (!raw){ box.hidden = true; box.innerHTML=""; hits=[]; return; }
  if (Date.now()-idxAt > 4000) buildIndex();
  const q = norm(raw), terms = expand(q); hits = [];
  for (const e of IDX){
    if (cat!=="all" && !(cat===e.cat || (cat==="body" && e.cat==="title"))) continue;
    let best=null, cnt=0;
    for (const t of terms){ const k = e.L.indexOf(t); if (k>=0){ cnt += e.L.split(t).length-1; if (!best) best={k,t}; } else if (e.NS.includes(nos(t))){ cnt++; if (!best) best={k:-1,t}; } }
    if (best) hits.push({e, t:best.t, k:best.k, score:(W8[e.cat]||20)+Math.min(cnt,5)*3+(best.t===q?5:0)});
  }
  const total = hits.length;
  hits.sort((a,b)=>b.score-a.score || a.e.i-b.e.i); hits = hits.slice(0,60); sel = hits.length?0:-1;
  const also = terms.slice(1);
  box.innerHTML = `<div class="sb-meta">${total ? (total>60 ? total+"곳 중 상위 60" : total+"곳") : "결과 없음"}${also.length?` · 함께 찾음: ${also.map(esc).join(", ")}`:""}</div>`
    + hits.map((h,j)=>{ const x = ITEMS[h.e.i]; const tag = x.n==="지도" ? "지도" : x.n;
      return `<button class="sb-hit${j===sel?" sel":""}" data-hit="${j}"><span class="sb-hn">${esc((x.deck||"")+tag)}</span><span class="sb-hb"><span class="sb-hl">${esc(h.e.label)}${h.e.cat!=="title"&&x.title?` · ${esc(x.title)}`:""}</span><span class="sb-hs">${snip(h.e.text,h.k,h.t.length)}</span></span></button>`; }).join("");
  box.hidden = false;
}
function clearMarks(){ $$("mark.sb-mark").forEach(m=>{ const p=m.parentNode; p.replaceChild(document.createTextNode(m.textContent), m); p.normalize(); }); }
function markIn(el, t){
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {acceptNode(n){ return n.parentElement.closest("script,style,textarea,svg,button") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }});
  while (w.nextNode()){ const n = w.currentNode, k = norm(n.nodeValue).indexOf(t); if (k<0) continue;
    try{ const r = document.createRange(); r.setStart(n,k); r.setEnd(n,k+t.length); const m = document.createElement("mark"); m.className="sb-mark"; r.surroundContents(m); return m; }catch(e){ return null; } }
  return null;
}
function openHit(j){
  const h = hits[j]; if (!h) return; const el = h.e.el; closeDrawer(); clearMarks();
  for (let d = el.closest && el.closest("details"); d; d = d.parentElement && d.parentElement.closest("details")) d.open = true;
  if (el.tagName==="DETAILS") el.open = true;
  if (h.e.cat==="memo"){ goEl(el, 120); return; }
  setTimeout(()=>{ const m = markIn(el, h.t), tg = m||el, off = m ? Math.round(window.innerHeight*0.3) : 10;
    pin(tg, off); }, 30);
}
function selHit(d){ if (!hits.length) return; sel = (sel+d+hits.length)%hits.length;
  $$("#sbRes .sb-hit").forEach((b,j)=>b.classList.toggle("sel", j===sel)); const b=$(`#sbRes .sb-hit[data-hit="${sel}"]`); if (b) b.scrollIntoView({block:"nearest"}); }

/* ---------- 이벤트 ---------- */
function wire(){
  document.addEventListener("click", e=>{
    const t = e.target; if (!t.closest) return;
    const nv = t.closest("#sbNav .sb-nv"); if (nv){ goItem(+nv.dataset.i); return; }
    const px = t.closest("[data-px]"); if (px && t.closest("#sbSide,#sbRail")){ const o = BTN[px.dataset.px]; if (o){ o.click(); setTimeout(()=>{ syncButtons(); syncMarks(); updCur(); }, 40); } return; }
    const hb = t.closest(".sb-hit"); if (hb){ openHit(+hb.dataset.hit); return; }
    const qc = t.closest(".sb-qc"); if (qc){ cat = qc.dataset.cat; $$(".sb-qc").forEach(b=>b.classList.toggle("on", b===qc)); run(); return; }
    if (t.closest("#sbCol")){ if (isWide()) setCol(true); else closeDrawer(); return; }
    if (t.closest("#sbOpen")){ setCol(false); return; }
    if (t.closest("#sbRlQ,#sbTopQ")){ openSearch(); return; }
    if (t.closest("#sbMenu")){ openDrawer(); return; }
    if (t.closest("#sbScrim")){ closeDrawer(); return; }
    if (t.closest("#sbPrev")){ step(-1); return; } if (t.closest("#sbNext")){ step(1); return; }
  }, true);
  let qT=0; $("#sbQ").addEventListener("input", ()=>{ clearTimeout(qT); qT=setTimeout(run,140); });
  $("#sbQ").addEventListener("focus", ()=>{ if (Date.now()-idxAt > 4000) buildIndex(); });
  window.addEventListener("keydown", e=>{
    const a = document.activeElement;
    if (a && a.id==="sbQ"){
      if (e.key==="ArrowDown"){ e.preventDefault(); e.stopPropagation(); selHit(1); }
      else if (e.key==="ArrowUp"){ e.preventDefault(); e.stopPropagation(); selHit(-1); }
      else if (e.key==="Enter"){ e.preventDefault(); e.stopPropagation(); if (sel>=0) openHit(sel); }
      else if (e.key==="Escape"){ e.stopPropagation(); const had=a.value; a.value=""; run(); a.blur(); if (!had) closeDrawer(); }
      return; }
    if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="k"){ e.preventDefault(); e.stopPropagation(); openSearch(); return; }
    if (a && (a.tagName==="TEXTAREA"||a.tagName==="INPUT"||a.isContentEditable)) return;
    if (e.key==="/"){ e.preventDefault(); e.stopPropagation(); openSearch(); return; }
    if (e.key==="["){ if (isWide()) setCol(!document.body.classList.contains("sb-col")); return; }
    if (e.key==="Escape"){ closeDrawer(); clearMarks(); }
  }, true);
  let raf=0; window.addEventListener("scroll", ()=>{ if (!raf) raf = requestAnimationFrame(()=>{ raf=0; updCur(); }); }, {passive:true});
  window.addEventListener("resize", ()=>{ if (isWide()) closeDrawer(); updCur(); });
  new MutationObserver(()=>{ syncMarks(); syncButtons(); syncStatus(); }).observe(HDR, {subtree:true, attributes:true, attributeFilter:["class","aria-pressed"], childList:true, characterData:true});
}

/* ---------- 시작: 노트가 다 그려질 때까지 기다림 ---------- */
let tries = 0;
(function wait(){
  HDR = findHeader();
  const ok = HDR && slideSecs().length >= 2 && $$("button", HDR).some(b=>/^\d+$/.test(btnText(b)));
  if (!ok){ if (++tries < 75) return setTimeout(wait, 200); return; }
  collect(); build(); wire();
  setTimeout(()=>{ ITEMS.forEach(x=>{ if (x.kind==="slide" && !x.title && x.target) x.title = titleOf(x.target); }); }, 1500);
})();
})();
