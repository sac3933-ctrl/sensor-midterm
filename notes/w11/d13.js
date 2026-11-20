/* ===== 학습 가이드 · 전체 지도 (노트 맨 앞) — 날짜·일정 없음 ===== */
(function(){
const B = [
  {id:"b1", t:"① SAW 생성 원리", k:"압전기판 + IDT → 표면파", pos:[450,62],
   one:"IDT에 교류 → 압전기판 변형 → 표면 1λ 안에서 흐르는 기계적 파(Rayleigh파).",
   items:["SAW = 표면 1λ 이내, 3000~5000 m/s, 진폭 ~2 nm","λ = v/f₀","True SAW(Rayleigh) vs Pseudo SAW(Leaky·SSBW·STW)"],
   s:[1,2,3,13,14,15,16]},
  {id:"b2", t:"② 기판 특성", k:"속도 · K² · TCD", pos:[770,165],
   one:"어떤 결정을 어느 방향으로 자르느냐가 속도·효율·온도 민감도를 정한다.",
   items:["v ~ √(E/ρ), 느리면 λ 작아 제작 어려움","K² = 2Δv/v (전기→떨림 효율)","TCD = TCE − TCV · Quartz ≈ 0, LiNbO₃ 큼"],
   s:[17,18,19,20,47]},
  {id:"b5", t:"③ 압력·온도 측정", k:"시간 · 위상 · 주파수 이동", pos:[770,400],
   one:"압력·온도가 길이와 속도를 바꿔 메아리 시간이 밀린다 → 시간·위상·공진주파수로 읽는다.",
   items:["압력: 막 휨, stretched 느림 / compressed 빠름","Δθ = ω·Δt (작은 시간을 큰 위상으로)","t₂₁ = t₀ + t₀·TCD·dT"],
   s:[8,9,10,11,42,43,44,45,46,48,49,50]},
  {id:"b4", t:"④ 반사기 · 무선 판독", k:"메아리 = ID", pos:[450,503],
   one:"반사기가 SAW를 메아리처럼 되돌리고, 그 박자 패턴이 ID가 된다. 배터리 없이 무선으로 읽는다.",
   items:["t = 2d/v (왕복)","첫 반사기 n·λ/2 + λ/8","판독거리 r ∝ ⁴√(…), anti-collision = 다른 주파수"],
   s:[5,6,7,33,34,35,36,37,40,41]},
  {id:"b3", t:"⑤ IDT · 소자 설계", k:"모양 · 손실 · 매칭", pos:[130,400],
   one:"IDT 모양과 치수를 정하고, 손실을 줄이고, 전기를 반사 없이 넣는다.",
   items:["λ/4·λ/8 전극, 양방향 −3 dB, TTI 12 dB","Aperture 30~100λ, G ∝ N², BW ~ f₀/N, h/λ < 1%","매칭: L = 1/(ω²C_T), 스미스 차트 중심"],
   s:[21,22,23,24,25,26,27,28,29,30,31,32]},
  {id:"b6", t:"⑥ 가스센서 · 회로 · 기타 응용", k:"감지막 · 차이 주파수", pos:[130,165],
   one:"감지막에 가스가 붙으면 주파수가 변하고, 기준 채널과의 차이로 간섭을 지운다. 필터·자이로·분무기도 같은 SAW.",
   items:["Δf/f₀ = 질량 + 탄성 + 전도도 항","발진기 → 믹서 → LPF → 비교기 → FPGA → PC","필터(폰당 100개+) · 자이로(코리올리) · atomizer"],
   s:[4,12,38,39,51,52,53,54,55,56,57,58,59,60,61,62]}
];
const C = [
  {a:"b1", b:"b3", t:"λ = v/f₀ → 전극 폭", d:"파장이 정해져야 IDT 전극 폭(λ/4, λ/8)과 반사기 위치가 정해진다. f₀가 틀리면 속도 설정을 의심(46번).", s:[3,18,22,46]},
  {a:"b2", b:"b5", t:"TCD → 온도센서", d:"TCD가 큰 LiNbO₃는 온도에 민감 → 온도센서용, TCD ≈ 0인 Quartz는 필터용.", s:[17,20,47,48]},
  {a:"b4", b:"b5", t:"메아리 시간 → 측정", d:"반사 피크 시간 t = 2d/v가 압력·온도로 밀리는 것을 읽는 것이 측정의 핵심.", s:[5,10,45]},
  {a:"b3", b:"b4", t:"매칭 → 판독거리", d:"매칭으로 소자 손실 D를 줄이면 판독거리 r이 늘어난다(⁴√ 관계라 조금씩).", s:[30,36]},
  {a:"b3", b:"b6", t:"질량 부하", d:"전극이 두꺼우면 생기는 질량 부하(피해야 할 것)를, 가스센서는 감지막으로 일부러 이용한다.", s:[28,51]},
  {a:"b1", b:"b6", t:"Rayleigh 수직 성분", d:"Rayleigh파는 위아래 성분이 있어 액체에 에너지를 줄 수 있다 → atomizer.", s:[14,62]}
];
const GUIDE = {
  how: ["각 슬라이드는 <b>🎙 강사 설명 → 한 줄 → 그림 읽기</b> 순서로 먼저 이해하기.","숫자 예제는 눈으로 보지 말고 <b>종이에 단위까지</b> 따라 쓰기. 막히는 단위는 점선 밑줄 툴팁으로 확인.","가지 하나를 끝내면 <b>백지 복원 과제</b>로 그림·식을 안 보고 다시 그려 보기.","퀴즈에서 틀린 장은 <b>★</b>, 모르는 건 <b>?</b> 표시 → 상단 '★ 표시만'으로 모아서 다시 보기.","외울 것은 이해한 뒤에 마지막에. 식보다 '왜 → 어떻게 → 그래서'를 먼저 말로 설명할 수 있게."],
  order: [
    ["① SAW 생성 원리","3, 14, 15, 16","모든 장의 바탕. 여기부터."],
    ["② 기판 특성","17, 18, 19, 20","속도·K²·TCD 세 숫자의 뜻."],
    ["⑤ IDT·소자 설계","22 → 32","식이 가장 많은 구간. 숫자 예제 위주로."],
    ["④ 반사기·무선 판독","5, 7, 33 → 37, 40","메아리 비유로 한 번에."],
    ["③ 압력·온도 측정","8 → 11, 42 → 50","④의 메아리 시간이 어떻게 밀리는지."],
    ["⑥ 가스센서·회로·응용","12, 51 → 60, 39, 61, 62","회로 6단계 릴레이를 순서대로."]
  ],
  orderNote: "강의는 응용(1~12)을 먼저 보여 주고 원리로 들어가지만, 혼자 공부할 때는 원리 → 설계 → 응용 순서가 더 쉽습니다 [AI 보충]. 1~12번은 맨 처음에 '무엇에 쓰는지' 훑어보는 용도로 보세요.",
  core: [
    ["λ = v/f₀","3, 14, 18"],["K² = 2Δv/v","19"],["TCD = (1/L)(dL/dT) − (1/v)(dv/dT)","20"],
    ["양방향 IDT −3 dB · TTI 12 dB","24, 25"],["Aperture 30~100λ · G ∝ N² · BW ~ f₀/N · h/λ < 1%","26, 27, 28"],
    ["매칭 L = 1/(ω²C) · C_T = N·C_S","30, 31"],["첫 반사기 n·λ/2 + λ/8 · t = 2d/v","35, 45"],
    ["Δθ = ω·Δt · t₂₁ = t₀ + t₀·TCD·dT","10, 43, 48"],["믹서 차 주파수 · 기준 채널로 간섭 제거","12, 51, 54"]
  ],
  coreNote: "교수님 강조 여부는 알 수 없어, 슬라이드 구성상 중요해 보이는 것으로 골랐습니다 [추정].",
  check: [
    ["SAW가 생기는 과정을 IDT·압전기판·교류로 설명할 수 있다","15"],
    ["Quartz와 LiNbO₃를 TCD로 구별하고, 각각 어디에 쓰는지 말할 수 있다","17, 47"],
    ["λ = 10 µm일 때 λ/4·λ/8·두께 상한(1%)을 계산할 수 있다","22, 28"],
    ["Aperture를 좁히면/넓히면 생기는 문제를 하나씩 말할 수 있다","26"],
    ["IDT에 인덕터를 다는 이유와 L을 구하는 식을 쓸 수 있다","30, 31"],
    ["SAW RFID가 배터리 없이 ID를 알려 주는 원리를 메아리로 설명할 수 있다","5"],
    ["압력센서에서 시간 대신 위상으로 보정하는 이유를 숫자로 말할 수 있다","43"],
    ["t₂₁ 식으로 측정 시간에서 온도를 거꾸로 구할 수 있다","48"],
    ["가스센서 회로 6단계를 순서대로 말하고, 믹서의 역할을 설명할 수 있다","52, 54"],
    ["SAW 자이로가 회전을 재는 원리를 코리올리 힘으로 설명할 수 있다","61"]
  ]
};

/* ---------- styles ---------- */
const css = document.createElement("style");
css.textContent = `
#guide{margin:0 0 18px}
#guide details.gcard{background:var(--card);border:1px solid var(--line);border-radius:14px;box-shadow:var(--shadow);margin-bottom:12px}
#guide details.gcard>summary{cursor:pointer;list-style:none;padding:12px 16px;font-weight:800;font-size:16px;display:flex;align-items:center;gap:8px}
#guide details.gcard>summary::-webkit-details-marker{display:none}
#guide details.gcard>summary::before{content:"▸";color:var(--sub)}
#guide details.gcard[open]>summary::before{content:"▾"}
#guide .gb{padding:0 16px 14px}
#guide .mm{border:1px solid var(--line);border-radius:10px;background:var(--soft);overflow-x:auto;overflow-y:hidden}
@media (max-width:640px){#guide .mm svg{min-width:640px}}
#guide .mm svg{display:block;width:100%;height:auto}
#guide .mm text{font-family:inherit;fill:var(--ink)}
#guide .mm .nd rect{fill:var(--card);stroke:var(--acc);stroke-width:1.6;cursor:pointer}
#guide .mm .nd:hover rect,#guide .mm .nd.on rect{fill:var(--acc-soft);stroke-width:2.4}
#guide .mm .ctr{fill:var(--acc);}
#guide .mm .spoke{stroke:var(--line);stroke-width:2}
#guide .mm .lk{stroke:#e8590c;stroke-width:1.8;stroke-dasharray:6 5;fill:none}
#guide .mm .lk.on{stroke-width:3.2;stroke-dasharray:none}
#guide .mm .lkn circle{fill:#e8590c;cursor:pointer}
#guide .mm .lkn text{fill:#fff;font-weight:800}
#guide .mmhint{font-size:13px;color:var(--sub);margin:6px 0 10px}
#guide .gdesc{background:var(--soft);border-radius:10px;padding:10px 12px;min-height:44px;font-size:14.5px;margin-bottom:10px}
#guide .gdesc b.h{color:var(--acc)}
#guide .chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}
#guide .chip{border:1px solid var(--line);background:var(--card);border-radius:999px;padding:1px 9px;font-size:12.5px;cursor:pointer;font-variant-numeric:tabular-nums}
#guide .chip:hover{border-color:var(--acc);color:var(--acc)}
#guide .bgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:8px}
#guide .bc{border:1px solid var(--line);border-radius:10px;padding:9px 11px;font-size:14px}
#guide .bc h4{margin:0 0 4px;font-size:14.5px;color:var(--acc)}
#guide .bc ul{margin:4px 0;padding-left:18px}
#guide .lkl{margin:8px 0 0;padding-left:0;list-style:none}
#guide .lkl li{border-left:3px solid #e8590c;padding:4px 10px;margin:6px 0;font-size:14px;background:var(--soft);border-radius:0 8px 8px 0}
#guide .g4{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:10px}
#guide .gbox{border:1px solid var(--line);border-radius:10px;padding:10px 12px}
#guide .gbox h4{margin:0 0 6px;font-size:15px}
#guide .gbox ol,#guide .gbox ul{margin:0;padding-left:20px;font-size:14.5px}
#guide .gbox li{margin:4px 0}
#guide .otbl{width:100%;border-collapse:collapse;font-size:14px}
#guide .otbl td{border-bottom:1px solid var(--line);padding:5px 6px;vertical-align:top}
#guide .otbl td:first-child{font-weight:700;white-space:nowrap}
#guide .note{font-size:13px;color:var(--sub);margin-top:6px}
#guide .ck label{display:flex;gap:8px;align-items:flex-start;font-size:14.5px;margin:5px 0;cursor:pointer}
#guide .ck input{margin-top:5px}
#guide .ckc{font-weight:700;color:var(--acc);font-size:13px}
@media (max-width:640px){#guide .otbl td:first-child{white-space:normal}}
`;
document.head.appendChild(css);

/* ---------- helpers ---------- */
const byId = Object.fromEntries(B.map(b=>[b.id,b]));
const chips = arr => `<div class="chips">${arr.map(n=>`<button class="chip" data-go="${n}">${n}</button>`).join("")}</div>`;
const chipStr = str => chips(str.split(",").flatMap(t=>{
  const r=t.split("→").map(x=>parseInt(x,10)).filter(x=>x>0);
  if(r.length===2){ const a=[]; for(let n=r[0];n<=r[1];n++) a.push(n); return a; }
  return r;
}));
function jump(n){
  const el=document.getElementById("s"+n); if(!el) return;
  if(el.classList.contains("hide")){ const so=document.getElementById("starOnly"); if(so&&so.classList.contains("on")) so.click(); }
  const bar=document.getElementById("bar"); const h=bar?bar.getBoundingClientRect().height:0;
  window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-h-8,behavior:"smooth"});
}

/* ---------- mind map SVG ---------- */
const W=900,H=565,CX=450,CY=283,NW=236,NH=74;
function curve(p,q){
  const mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2, dx=mx-CX, dy=my-CY, L=Math.hypot(dx,dy)||1;
  const push = L<60 ? 150 : 70;   // 반대편 가지끼리는 크게 휘게
  const nx = L<60 ? -(q[1]-p[1]) : dx, ny = L<60 ? (q[0]-p[0]) : dy, NL=Math.hypot(nx,ny)||1;
  const cx=mx+nx/NL*push, cy=my+ny/NL*push;
  return {d:`M${p[0]} ${p[1]} Q ${cx} ${cy} ${q[0]} ${q[1]}`, lx:(p[0]+2*cx+q[0])/4, ly:(p[1]+2*cy+q[1])/4};
}
function svg(){
  let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Week 11 SAW 개념 지도">`;
  B.forEach(b=>{ s+=`<line class="spoke" x1="${CX}" y1="${CY}" x2="${b.pos[0]}" y2="${b.pos[1]}"/>`; });
  C.forEach((c,i)=>{ const k=curve(byId[c.a].pos,byId[c.b].pos); s+=`<path class="lk" data-l="${i}" d="${k.d}"/>`; });
  s+=`<circle class="ctr" cx="${CX}" cy="${CY}" r="58"/><text x="${CX}" y="${CY-4}" text-anchor="middle" font-size="19" font-weight="800" style="fill:#fff">SAW 센서</text><text x="${CX}" y="${CY+18}" text-anchor="middle" font-size="12.5" style="fill:#fff">표면탄성파</text>`;
  B.forEach((b,i)=>{ const [x,y]=b.pos;
    s+=`<g class="nd" data-b="${i}" tabindex="0"><rect x="${x-NW/2}" y="${y-NH/2}" width="${NW}" height="${NH}" rx="12"/><text x="${x}" y="${y-6}" text-anchor="middle" font-size="16" font-weight="800">${b.t}</text><text x="${x}" y="${y+17}" text-anchor="middle" font-size="13" style="fill:var(--sub)">${b.k}</text></g>`; });
  C.forEach((c,i)=>{ const k=curve(byId[c.a].pos,byId[c.b].pos); s+=`<g class="lkn" data-l="${i}"><circle cx="${k.lx}" cy="${k.ly}" r="13"/><text x="${k.lx}" y="${k.ly+5}" text-anchor="middle" font-size="13">${String.fromCharCode(65+i)}</text></g>`; });
  return s+`</svg>`;
}

/* ---------- render ---------- */
const CKK="saw-w11-guide-check";
let ck={}; try{ck=JSON.parse(localStorage.getItem(CKK)||"{}")||{};}catch(e){}
const host=document.createElement("div"); host.id="guide";
host.innerHTML = `
<details class="gcard" open><summary>🗺 전체 지도 — 개념 6가지와 서로의 연결</summary><div class="gb">
  <div class="mm">${svg()}</div>
  <div class="mmhint">휴대폰에서는 지도를 옆으로 밀어 볼 수 있어요. 가지(네모)를 누르면 그 개념의 요약과 슬라이드 번호가, 주황 동그라미(A~F)를 누르면 두 가지가 어떻게 이어지는지가 아래에 나옵니다. 번호를 누르면 그 슬라이드로 이동해요.</div>
  <div class="gdesc" id="gdesc">가지나 주황 동그라미를 눌러 보세요.</div>
  <details class="sec"><summary>가지 6개 한눈에 보기</summary><div class="sec-b"><div class="bgrid">${B.map(b=>`<div class="bc"><h4>${b.t}</h4><div>${b.one}</div><ul>${b.items.map(x=>`<li>${x}</li>`).join("")}</ul>${chips(b.s)}</div>`).join("")}</div></div></details>
  <details class="sec"><summary>가지끼리 연결 A~F</summary><div class="sec-b"><ul class="lkl">${C.map((c,i)=>`<li><b>${String.fromCharCode(65+i)}. ${byId[c.a].t} ↔ ${byId[c.b].t}</b> — ${c.t}<br>${c.d}${chips(c.s)}</li>`).join("")}</ul></div></details>
</div></details>
<details class="gcard" open><summary>🧭 학습 가이드 — 공부 방법 · 순서 · 핵심 · 점검</summary><div class="gb"><div class="g4">
  <div class="gbox"><h4>📖 공부 방법</h4><ol>${GUIDE.how.map(x=>`<li>${x}</li>`).join("")}</ol></div>
  <div class="gbox"><h4>🪜 공부 순서 (개념 기준)</h4><table class="otbl">${GUIDE.order.map(r=>`<tr><td>${r[0]}</td><td>${r[2]}${chipStr(r[1])}</td></tr>`).join("")}</table><div class="note">${GUIDE.orderNote.replace("[AI 보충]",'<span class="tag ai">AI 보충</span>')}</div></div>
  <div class="gbox"><h4>🎯 핵심 (식·숫자)</h4><table class="otbl">${GUIDE.core.map(r=>`<tr><td>${r[0]}</td><td>${chipStr(r[1])}</td></tr>`).join("")}</table><div class="note">${GUIDE.coreNote.replace("[추정]",'<span class="tag gs">추정</span>')}</div></div>
  <div class="gbox ck"><h4>✅ 점검 — 말로 설명할 수 있으면 체크 <span class="ckc" id="ckc"></span></h4>${GUIDE.check.map((r,i)=>`<label><input type="checkbox" data-ck="${i}" ${ck[i]?"checked":""}><span>${r[0]}${chipStr(r[1])}</span></label>`).join("")}<div class="note">체크 표시는 이 브라우저에만 저장됩니다.</div></div>
</div></div></details>`;
const intro=document.querySelector("main .intro");
intro.parentNode.insertBefore(host,intro.nextSibling);

const desc=host.querySelector("#gdesc");
function selB(i){ const b=B[i];
  host.querySelectorAll(".nd").forEach((g,j)=>g.classList.toggle("on",j===i)); host.querySelectorAll(".lk").forEach(p=>p.classList.remove("on"));
  desc.innerHTML=`<b class="h">${b.t}</b> — ${b.one}<ul style="margin:4px 0;padding-left:18px">${b.items.map(x=>`<li>${x}</li>`).join("")}</ul>${chips(b.s)}`; }
function selL(i){ const c=C[i];
  host.querySelectorAll(".nd").forEach(g=>{const bi=+g.dataset.b; g.classList.toggle("on",B[bi].id===c.a||B[bi].id===c.b);});
  host.querySelectorAll(".lk").forEach((p,j)=>p.classList.toggle("on",j===i));
  desc.innerHTML=`<b class="h">${String.fromCharCode(65+i)}. ${byId[c.a].t} ↔ ${byId[c.b].t}: ${c.t}</b><br>${c.d}${chips(c.s)}`; }
host.addEventListener("click",e=>{
  const ch=e.target.closest(".chip"); if(ch){ jump(+ch.dataset.go); return; }
  const nd=e.target.closest(".nd"); if(nd){ selB(+nd.dataset.b); return; }
  const ln=e.target.closest(".lkn"); if(ln){ selL(+ln.dataset.l); }
});
host.addEventListener("keydown",e=>{ const nd=e.target.closest&&e.target.closest(".nd"); if(nd&&(e.key==="Enter"||e.key===" ")){ e.preventDefault(); selB(+nd.dataset.b);} });
function ckCount(){ const n=host.querySelectorAll("[data-ck]:checked").length; host.querySelector("#ckc").textContent=`${n} / ${GUIDE.check.length}`; }
host.addEventListener("change",e=>{ const c=e.target.closest("[data-ck]"); if(!c) return; ck[c.dataset.ck]=c.checked; try{localStorage.setItem(CKK,JSON.stringify(ck));}catch(err){} ckCount(); });
ckCount();

/* 상단 번호 줄 맨 앞에 '지도' 버튼 */
const nav=document.getElementById("nav");
if(nav){ const b=document.createElement("button"); b.className="n"; b.textContent="지도"; b.title="학습 가이드 · 전체 지도"; b.style.minWidth="44px";
  b.onclick=()=>{ const bar=document.getElementById("bar"); const h=bar?bar.getBoundingClientRect().height:0; window.scrollTo({top:host.getBoundingClientRect().top+window.scrollY-h-8,behavior:"smooth"}); };
  nav.insertBefore(b,nav.firstChild); }
})();
