/* ───────── 공식 모음 ───────── */
const FORM=[
 {eq:'F = 2mΩv',read:'에프는 2 엠 오메가 브이',name:'코리올리 힘',page:'gyro',sec:4,syms:[['F','힘','N'],['m','질량','kg'],['Ω','각속도','rads'],['v','속도','mps']]},
 {eq:'v = 2πfA',read:'브이는 2 파이 에프 에이',name:'진동의 최대 속도',page:'gyro',sec:5,syms:[['f','진동수','Hz'],['A','진폭','m']]},
 {eq:'θ = Ω × t',read:'세타는 오메가 곱하기 티',name:'회전각',page:'gyro',sec:5,syms:[['θ','회전각','deg'],['Ω','각속도','dps'],['t','시간','s']]},
 {eq:'출력 = SF × Ω',read:'출력은 스케일 팩터 곱하기 오메가',name:'자이로 출력',page:'gyro',sec:7,syms:[['SF','스케일 팩터','mVdps'],['Ω','각속도','dps']]},
 {eq:'C = εA/d',read:'씨는 엡실론 에이 나누기 디',name:'평행판 정전용량',page:'cap',sec:0,syms:[['C','정전용량','F'],['ε','유전율','Fm'],['A','넓이','m2'],['d','간격','m']]},
 {eq:'ε = ε₀ × εᵣ',read:'엡실론은 엡실론 제로 곱하기 엡실론 알',name:'유전율',page:'cap',sec:0,syms:[['ε₀','진공 유전율 8.85×10⁻¹²','Fm'],['εᵣ','비유전율 (단위 없음)',null]]},
 {eq:'1° = π/180 rad',read:'1도는 180분의 파이 라디안',name:'도 ↔ 라디안',page:'unitbasic',sec:3,syms:[]},
 {eq:'cm² = 10⁻⁴ m²',read:'제곱 단위는 지수도 2배',name:'넓이 단위',page:'unitbasic',sec:1,syms:[]}
];
const KEYDICT=[
 [['SHIFT'],'키 위의 노란 글씨 기능을 쓸 때 먼저 누름'],[['×10ˣ'],'10의 거듭제곱 입력. 6 ×10ˣ (−) 9 = 6×10⁻⁹'],[['(−)'],'음수 부호. 지수 앞 마이너스는 반드시 이것'],
 [['−'],'빼기. 지수 부호로 쓰면 틀림'],[['SHIFT','×10ˣ'],'π (파이)'],[['S⇔D'],'분수·π 꼴 ↔ 소수 전환'],[['Ans'],'바로 앞 계산 결과'],
 [['x²'],'제곱'],[['√■'],'제곱근 (루트)'],[['x■'],'거듭제곱 (지수가 큰 수)'],[['(',')'],'괄호. 분모 전체를 나눌 때 필수'],[['MODE','3','2'],'통계 모드 (회귀·최소제곱)']
];

/* ───────── 화면 ───────── */
const V=document.getElementById('view'),TT=document.getElementById('ttl'),BK=document.getElementById('back'),PB=document.getElementById('photoBtn');
let stack=[],cur={v:'home'};
function go(v,arg,push=true){if(push)stack.push(cur);cur={v,arg};render();window.scrollTo(0,0)}
BK.onclick=()=>{cur=stack.pop()||{v:'home'};render();window.scrollTo(0,0)};
document.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{stack=[];go(b.dataset.tab,null,false)});
function render(){
  const tabOf={home:'home',page:'home',dict:'dict',cards:'cards',practice:'practice'};
  document.querySelectorAll('[data-tab]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.tab===tabOf[cur.v])));
  BK.hidden=!stack.length;PB.hidden=cur.v!=='page';
  if(figStop&&cur.v!=='page'){figStop();figStop=null}
  ({home:vHome,page:vPage,dict:vDict,cards:vCards,practice:vPractice})[cur.v](cur.arg);
  wireCommon(V);
}
function wireCommon(root){
  root.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{const g=b.dataset.goto;if(PAGES[g])go('page',{id:g,i:+(b.dataset.i||0)});else if(g==='units')go('practice',{mode:'unit'});else if(g==='calc')go('practice',{mode:'calc',topic:b.dataset.topic});else go(g)});
}

/* 목차 */
const TOC=[
 {n:'제0편',h:'기초 도구',d:'모든 계산의 바탕',items:[['unitbasic','단위·접두어·읽는 법'],[null,'숫자 감각 — 지수·유효숫자·어림'],[null,'계산기 기본'],[null,'전기 기초 — 전압·전류·저항'],[null,'회로 기초 — 전압 분배·브리지·op-amp']]},
 {n:'제1편',h:'센서 공통',d:'어떤 센서든 같은 기준으로',items:[[null,'센서와 신호의 흐름'],[null,'센서 특성 — 감도·정확도·정밀도·분해능'],[null,'오차와 보정']]},
 {n:'제2편',h:'감지 원리',d:'원리 몇 개로 센서 여러 개',items:[[null,'저항형'],['cap','정전용량형'],[null,'전자기 유도·와전류'],[null,'홀 효과·자기저항'],[null,'압전'],[null,'광학']]},
 {n:'제3편',h:'센서별',d:'측정 대상마다 한 장씩',items:[[null,'가스센서'],[null,'자기센서'],[null,'속도센서·금속탐지기'],[null,'가속도·진동센서'],['gyro','자이로센서'],[null,'온도센서'],[null,'압력센서'],[null,'유량·레벨센서'],[null,'근접·광센서']]},
 {n:'제4편',h:'현업 연결',d:'센서 데이터의 큰 그림',items:[[null,'PLC → SCADA → MES'],[null,'예지보전']]}
];
const APX=[['A','공식 모음','form'],['B','용어 사전','term'],['C','단위 읽는 법','unit'],['D','계산기 키','key']];
function vHome(){
  TT.textContent='센서 핵심노트';
  const mark=LS.get('last',null);const mp=mark&&PAGES[mark.id];
  V.innerHTML=`<section class="cover">
    <div class="cv-eyebrow">SENSOR ENGINEERING · 학습 바이블</div>
    <h2 class="cv-title">센서 핵심노트</h2>
    <p class="cv-sub">원리에서 계산까지, 내 손에 맞춘 한 권</p>
    <label class="search"><span class="sr">찾기</span><input id="q" type="search" placeholder="용어 · 단위 · 공식 찾기 (예: 코리올리, pF)" autocomplete="off"></label>
    <div id="qres" class="qres" hidden></div>
    ${mp?`<button class="ribbon" data-goto="${mark.id}" data-i="${mark.i}"><span>🔖 책갈피</span><b>${mp.title}</b><span class="muted">· ${mp.secs[mark.i]?mp.secs[mark.i].k:''}</span></button>`:''}
  </section>
  <section class="contents"><div class="ct-h">차례</div>
  ${TOC.map(p=>`<div class="pt"><div class="pt-h"><span class="pt-n">${p.n}</span><span class="pt-t">${p.h}</span></div><div class="pt-d">${p.d}</div>
    <ol class="chs">${p.items.map(([id,nm],k)=>`<li><button class="ch" ${id?`data-goto="${id}"`:'disabled'}><span class="ch-n">${k+1}</span><span class="ch-t">${nm}</span><span class="lead"></span><span class="ch-p">${id?PAGES[id].secs.length+'장':'준비 중'}</span></button></li>`).join('')}</ol></div>`).join('')}
  <div class="pt"><div class="pt-h"><span class="pt-n">부록</span><span class="pt-t">찾아보기</span></div>
    <ol class="chs">${APX.map(([n,t,m])=>`<li><button class="ch" data-dict="${m}"><span class="ch-n">${n}</span><span class="ch-t">${t}</span><span class="lead"></span><span class="ch-p">›</span></button></li>`).join('')}</ol></div>
  </section>
  <p class="colophon">샘플 시안 · 0편 1장, 2편 2장, 3편 5장만 채워져 있어요</p>`;
  V.querySelectorAll('[data-dict]').forEach(b=>b.onclick=()=>go('dict',{seg:b.dataset.dict}));
  const qi=V.querySelector('#q'),qr=V.querySelector('#qres');
  qi.oninput=()=>{const s=qi.value.trim().toLowerCase();if(!s){qr.hidden=true;return}
    const R=[];
    for(const [k,T] of Object.entries(TERM))if((T.ko+T.en).toLowerCase().includes(s))R.push(`<button class="qr" data-t2="${k}"><span class="qk">용어</span>${T.ko}<small>${T.en}</small></button>`);
    for(const [k,U] of Object.entries(UNIT))if((U.s+U.r).toLowerCase().includes(s))R.push(`<button class="qr" data-u2="${k}"><span class="qk u-k">단위</span><span class="mono">${U.s}</span><small>${U.r}</small></button>`);
    FORM.forEach((f,i)=>{if((f.eq+f.name+f.read).toLowerCase().includes(s))R.push(`<button class="qr" data-goto="${f.page}" data-i="${f.sec}"><span class="qk f-k">공식</span><span class="mono">${f.eq}</span><small>${f.name}</small></button>`)});
    for(const [id,P] of Object.entries(PAGES))P.secs.forEach((x,j)=>{if((P.title+x.k+x.h).toLowerCase().includes(s))R.push(`<button class="qr" data-goto="${id}" data-i="${j}"><span class="qk p-k">본문</span>${P.title} · ${x.k}<small>${x.h}</small></button>`)});
    qr.hidden=false;qr.innerHTML=R.length?R.slice(0,14).join(''):'<p class="small muted">찾는 내용이 아직 없어요.</p>';
    qr.querySelectorAll('[data-t2]').forEach(b=>b.onclick=()=>termSheet(b.dataset.t2));
    qr.querySelectorAll('[data-u2]').forEach(b=>b.onclick=()=>unitSheet(b.dataset.u2));
    wireCommon(qr)};
}

/* 사전 */
function vDict(arg){TT.textContent='사전';const seg=(arg&&arg.seg)||LS.get('dseg','term');LS.set('dseg',seg);
  const segs=[['term','용어'],['unit','단위'],['form','공식'],['key','계산기 키']];
  let body='';
  if(seg==='term'){body=`<div class="dlist">${Object.entries(TERM).sort((a,b)=>a[1].ko.localeCompare(b[1].ko,'ko')).map(([k,T])=>`<button class="drow" data-t2="${k}"><b>${T.ko}</b><small>${T.en}</small><span class="dgen">${T.gen}</span></button>`).join('')}</div>`}
  if(seg==='unit'){const groups=[['길이',['nm','um','mm','cm','m','km','ft','inch']],['넓이·부피',['um2','mm2','cm2','m2','cm3','L','m3']],['질량',['ug','mg','g','kg']],['비율',['dec','pct','ppm','ppb']],['자기장',['uT','mT','G','T']],['각도·각속도',['deg','rad','dps','rads','dph']],['전기',['V','ohm','F','uF','nF','pF','Fm']],['주파수·시간',['s','Hz','kHz','MHz']],['힘·기타',['N','mps','Nm','Vdps','mVdps','nd']]];
    body=groups.map(([g,ks2])=>`<div class="dg"><div class="eyebrow">${g}</div><div class="dlist">${ks2.map(k=>`<button class="drow urow" data-u2="${k}"><span class="mono us">${UNIT[k].s}</span><span><b>${UNIT[k].r}</b><span class="dgen">${UNIT[k].mean}</span></span></button>`).join('')}</div></div>`).join('')}
  if(seg==='form'){body=FORM.map(f=>`<div class="card fcard"><div class="eyebrow">${f.name}</div><div class="eqn">${f.eq}<small>"${f.read}"</small></div>
    ${f.syms.length?`<div class="syms">${f.syms.map(([s,m,uk])=>`<span class="s">${s}</span><span>${m}${uk?' · '+u(uk):''}</span>`).join('')}</div>`:''}
    <button class="ghost" data-goto="${f.page}" data-i="${f.sec}">본문에서 보기 ›</button></div>`).join('')}
  if(seg==='key'){body=`<p class="small muted">fx-570ES PLUS 2nd Edition 기준</p><div class="dlist">${KEYDICT.map(([k,d])=>`<div class="drow keyrow"><span>${k.map(kb).join('')}</span><span>${d}</span></div>`).join('')}</div>`}
  V.innerHTML=`<div class="seg" role="tablist">${segs.map(([k,l])=>`<button role="tab" aria-selected="${k===seg}" data-seg="${k}">${l}</button>`).join('')}</div>${body}`;
  V.querySelectorAll('[data-seg]').forEach(b=>b.onclick=()=>go('dict',{seg:b.dataset.seg},false));
  V.querySelectorAll('[data-t2]').forEach(b=>b.onclick=()=>termSheet(b.dataset.t2));
  V.querySelectorAll('[data-u2]').forEach(b=>b.onclick=()=>unitSheet(b.dataset.u2));
}

/* 본문 페이지 */
let figStop=null;
function probSlot(g,base){const p=GEN[g](base);return `<div class="slot" data-g="${g}">${probHTML(p,true)}</div>`}
function wireSlots(root){root.querySelectorAll('.slot').forEach(sl=>{const b=sl.querySelector('[data-regen]');if(b)b.onclick=()=>{sl.innerHTML=probHTML(GEN[sl.dataset.g](false),true);wireProb(sl);wireSlots2(sl)}});}
function wireSlots2(sl){const b=sl.querySelector('[data-regen]');if(b)b.onclick=()=>{sl.innerHTML=probHTML(GEN[sl.dataset.g](false),true);wireProb(sl);wireSlots2(sl)}}
function vPage(arg){const P=PAGES[arg.id];const i=Math.min(arg.i||0,P.secs.length-1);const s=P.secs[i];TT.textContent=P.title;
  LS.set('last',{id:arg.id,i});const seen=new Set(LS.get('seen-'+arg.id,[]));seen.add(i);LS.set('seen-'+arg.id,[...seen]);
  const isProb=s.b==='__PROBS__';
  const head=`<div class="eyebrow">${P.part} · ${i+1}/${P.secs.length} · ${s.k}</div>`;
  V.innerHTML=`<div class="steps">${P.secs.map((x,j)=>`<button class="stp${seen.has(j)?' seen':''}" data-j="${j}" aria-current="${j===i}">${x.k}</button>`).join('')}</div>
  ${isProb?`${head}<p class="small muted">기본 문제로 감을 잡고, 유사 문제는 <b>↻ 새 숫자</b>로 계속 바꿔 풀어요. 응용은 같은 원리를 다른 상황에 써 보는 문제예요.</p>${PSET[arg.id].map(([g,b])=>probSlot(g,!!b)).join('')}
     <button class="ghost" data-goto="calc" data-topic="${arg.id}">연습 탭에서 계속 풀기 ›</button>`:
  `<section class="card sec">${head}<h2>${s.h}</h2>${md(s.b)}
   ${(s.easy||s.src)?`<div class="btnrow">${s.easy?'<button class="tbtn" data-tg="easy">쉽게</button>':''}${s.src?'<button class="tbtn" data-tg="src">원문</button>':''}</div>`:''}
   ${s.easy?`<div class="panel easy" data-tp="easy" hidden><span class="lb">쉽게 보기 · 중학생 눈높이</span><div>${md(s.easy)}</div></div>`:''}
   ${s.src?`<div class="panel src" data-tp="src" hidden><span class="lb">강의자료 원문 · 【 】</span><div class="small">${md(s.src)}</div></div>`:''}
  </section>`}
  <div class="pager"><button class="pbtn" data-nav="-1" ${i===0?'disabled':''}>‹ 이전</button><button class="pbtn next" data-nav="1">${i===P.secs.length-1?'차례로':'다음 ›'}</button></div>`;
  V.querySelectorAll('[data-j]').forEach(b=>b.onclick=()=>go('page',{id:arg.id,i:+b.dataset.j},false));
  V.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{const n=i+ +b.dataset.nav;if(n>=P.secs.length){stack=[];go('home',null,false)}else go('page',{id:arg.id,i:n},false)});
  const cb=V.querySelector('.stp[aria-current="true"]');if(cb)cb.scrollIntoView({inline:'center',block:'nearest'});
  wireToggles(V);wireProb(V);V.querySelectorAll('.slot').forEach(wireSlots2);
  if(figStop){figStop();figStop=null}
  const fig=V.querySelector('#gyroFig');if(fig)figStop=gyroFigure(fig);
}

/* 연습: 단위 변환 / 계산 문제 */
function segPractice(mode){return `<div class="seg" role="tablist"><button role="tab" aria-selected="${mode==='unit'}" data-pm="unit">단위 변환</button><button role="tab" aria-selected="${mode==='calc'}" data-pm="calc">계산 문제</button></div>`}
function wirePM(){V.querySelectorAll('[data-pm]').forEach(b=>b.onclick=()=>go('practice',{mode:b.dataset.pm},false))}
function vPractice(arg){const mode=(arg&&arg.mode)||LS.get('pmode','unit');LS.set('pmode',mode);TT.textContent='연습';
  if(mode==='unit')vUnits();else vCalc(arg&&arg.topic)}
let CS=null;
function vCalc(topic){
  const tp=topic||LS.get('ctopic','gyro');LS.set('ctopic',tp);
  const kindSel=LS.get('ckind','all');
  if(!CS||CS.tp!==tp||CS.kind!==kindSel){CS={tp,kind:kindSel,n:0,p:null}}
  if(!CS.p){let gs=TOPICS[tp].g;const kindOf=g=>['coriolis','cap'].includes(g)?'유사':'응용';if(kindSel!=='all')gs=gs.filter(g=>kindOf(g)===kindSel);CS.g=pick(gs);CS.p=GEN[CS.g](false)}
  V.innerHTML=`${segPractice('calc')}
  <section class="card"><div class="eyebrow">주제</div><div class="cats">${Object.entries(TOPICS).map(([k,t])=>`<button class="cat" data-tp="${k}" aria-pressed="${k===tp}">${t.name}</button>`).join('')}</div>
   <div class="eyebrow">종류</div><div class="cats">${[['all','전부'],['유사','유사'],['응용','응용']].map(([k,l])=>`<button class="cat" data-kd="${k}" aria-pressed="${k===kindSel}">${l}</button>`).join('')}</div></section>
  <div class="slot" data-g="${CS.g}">${probHTML(CS.p,false)}</div>
  <button class="primary" id="nextC">다음 문제 ›</button><p class="small muted" style="text-align:center">이번에 푼 문제 ${CS.n}개</p>`;
  wirePM();wireProb(V);
  V.querySelectorAll('[data-tp]').forEach(b=>b.onclick=()=>{CS=null;LS.set('ctopic',b.dataset.tp);vCalc(b.dataset.tp);wireCommon(V)});
  V.querySelectorAll('[data-kd]').forEach(b=>b.onclick=()=>{LS.set('ckind',b.dataset.kd);CS=null;vCalc(tp);wireCommon(V)});
  V.querySelector('#nextC').onclick=()=>{CS.n++;CS.p=null;vCalc(tp);wireCommon(V);window.scrollTo(0,0)};
}
