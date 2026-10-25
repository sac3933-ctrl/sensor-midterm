/* ═════════ 접두어 외우기: 손가락 그림 + 구호 + 빠른 드릴 ═════════ */
const PFXL=[ // [기호, 이름, 지수, 손, 손가락 번호, 실물 예]
 ['E','엑사',18,'R',6,'EB · 슈퍼컴 엑사플롭스'],['P','페타',15,'R',5,'PB · 히스토리안 수년치'],['T','테라',12,'R',4,'TB 하드디스크'],['G','기가',9,'R',3,'GHz · GB'],['M','메가',6,'R',2,'MHz · MB'],['k','킬로',3,'R',1,'kHz · km'],
 ['m','밀리',-3,'L',1,'mm 샤프심 0.5 mm · mT'],['μ','마이크로',-6,'L',2,'μm MEMS 빗살 5 μm · 세균'],['n','나노',-9,'L',3,'nm 빛 파장 550 nm'],['p','피코',-12,'L',4,'pm 원자 100 pm · pF'],['f','펨토',-15,'L',5,'fT 뇌 자기장 · fs 레이저'],['a','아토',-18,'L',6,'as 아토초']
];
const FING=['','엄지','검지','중지','약지','새끼','(손목)'];
Object.assign(FIG,{
 hands(){const hand=(x,dir,arr)=>{const fx=[0,22,46,70,94,118];let s=`<path d="M${x+6} 150 h118 v-40 a59 20 0 0 0 -118 0 z" style="fill:var(--surface2);stroke:var(--line)"/>`;
   arr.forEach((r,i)=>{const h=[42,62,70,64,46][i];const cx=x+fx[i+1];s+=`<rect x="${cx-9}" y="${112-h}" width="18" height="${h+6}" rx="9" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.4"/><text x="${cx}" y="${124-h}" text-anchor="middle" style="font-family:var(--f-mono);font-weight:800;font-size:15px;fill:${dir==='R'?'var(--accent)':'var(--unit)'}">${r[0]}</text><text x="${cx}" y="${138-h}" text-anchor="middle" class="small2">${i+1}</text><text x="${cx}" y="${100}" text-anchor="middle" style="font-size:9px;fill:var(--muted)">10${sup(r[2])}</text>`});
   return s};
  const L=PFXL.filter(r=>r[3]==='L'&&r[4]<=5).sort((a,b)=>a[4]-b[4]),R=PFXL.filter(r=>r[3]==='R'&&r[4]<=5).sort((a,b)=>a[4]-b[4]);
  return svgFig(340,200,`${hand(10,'L',L)}${hand(190,'R',R)}${tx(80,170,'왼손 = 작다 (소문자)','u b2','middle')}${tx(260,170,'오른손 = 크다 (대문자)','a b2','middle')}${tx(170,192,'지수 = 손가락 번호 × 3 · 왼손은 −','b2','middle')}`,'손가락 사다리','"나노는?" → 왼손 3번째(중지) → 3 × 3 = 9 → 10⁻⁹. 글자 순서가 아니라 손가락을 세요. (그림은 손 모양을 단순화)')}
});

let PD=null;
function pfxQ(){const st=LS.get('pstat',{});const pool=PFXL.filter(r=>Math.abs(r[2])<=15);
  const w=pool.map(r=>1+((st[r[0]]&&st[r[0]].ng)||0)*3/(((st[r[0]]&&st[r[0]].ok)||0)+1));let x=Math.random()*w.reduce((a,b)=>a+b,0);let r=pool[0];for(let i=0;i<pool.length;i++){x-=w[i];if(x<=0){r=pool[i];break}}
  const kind=pick(['s2e','e2s','n2s','s2n','fing','read','rel']);const others=n=>{const o=new Set();while(o.size<n){const q=pick(pool);if(q!==r)o.add(q)}return [...o]};
  const E=e=>'10'+sup(e);
  let q,ans,opts,tip;
  if(kind==='s2e'){q=`<b class="mono">${r[0]}</b> (${r[1]})는 10의 몇 승?`;ans=E(r[2]);opts=[ans,...others(3).map(o=>E(o[2]))];tip=`${r[3]==='L'?'왼손':'오른손'} ${r[4]}번째(${FING[r[4]]}) → ${r[4]} × 3 = ${Math.abs(r[2])}${r[3]==='L'?' → −':''}`}
  else if(kind==='e2s'){q=`<b class="mono">${E(r[2])}</b>은 어떤 접두어?`;ans=`${r[0]} ${r[1]}`;opts=[ans,...others(3).map(o=>`${o[0]} ${o[1]}`)];tip=`${Math.abs(r[2])} ÷ 3 = ${r[4]} → ${r[2]<0?'왼손':'오른손'} ${FING[r[4]]}`}
  else if(kind==='n2s'){q=`<b>${r[1]}</b>의 기호는?`;ans=r[0];opts=[ans,...others(3).map(o=>o[0])];if(r[0]==='m'||r[0]==='M')opts=[ans,r[0]==='m'?'M':'m',...others(2).map(o=>o[0])];tip=r[3]==='L'?'작은 쪽은 소문자':'큰 쪽은 대문자 (k만 예외)'}
  else if(kind==='s2n'){q=`<b class="mono">${r[0]}</b>를 읽으면?`;ans=r[1];opts=[ans,...others(3).map(o=>o[1])];if(r[0]==='m')opts=[ans,'메가',...others(2).map(o=>o[1])];if(r[0]==='M')opts=[ans,'밀리',...others(2).map(o=>o[1])];tip=`${r[0]} = ${r[1]} = ${E(r[2])}`}
  else if(kind==='fing'){q=`${r[3]==='L'?'왼손(작다)':'오른손(크다)'} <b>${r[4]}번째</b> 손가락은?`;ans=`${r[0]} ${r[1]} ${E(r[2])}`;opts=[ans,...others(3).map(o=>`${o[0]} ${o[1]} ${E(o[2])}`)];tip=`${r[4]} × 3 = ${Math.abs(r[2])}`}
  else if(kind==='read'){const U=pick([['T','테슬라'],['Hz','헤르츠'],['m','미터'],['g','그램'],['F','패럿'],['s','초'],['V','볼트'],['A','암페어']]);q=`<b class="mono">${r[0]}${U[0]}</b>를 읽으면?`;ans=`${r[1]}${U[1]}`;opts=[ans,...others(3).map(o=>`${o[1]}${U[1]}`)];if(r[0]==='m')opts[1]='메가'+U[1];if(r[0]==='M')opts[1]='밀리'+U[1];tip=`${r[0]} = ${r[1]}`}
  else{const U=pick([['m','미터'],['g','그램'],['Hz','헤르츠'],['F','패럿'],['s','초']]);q=`1 <b class="mono">${r[0]}${U[0]}</b> = ? ${U[0]}`;ans=`${E(r[2])} ${U[0]}`;opts=[ans,`${E(-r[2])} ${U[0]}`,...others(2).map(o=>`${E(o[2])} ${U[0]}`)];tip=`${r[1]} = ${E(r[2])} · 작은 단위면 10의 마이너스`}
  return {sym:r[0],q,ans,opts:opts.sort(()=>Math.random()-.5),tip,ex:r[5]}}
function vPfx(){TT.textContent='연습';const N=10;
  if(!PD||PD.done>=N&&PD.closed){PD={done:0,ok:0,p:null,log:[],t0:Date.now(),closed:false}}
  if(PD.done>=N){const sec=Math.round((Date.now()-PD.t0)/1000);const hist=LS.get('phist',[]);if(!PD.saved){hist.unshift({d:today(),ok:PD.ok,sec});LS.set('phist',hist.slice(0,10));PD.saved=true}
    const st=LS.get('pstat',{});const weak=PFXL.filter(r=>st[r[0]]&&st[r[0]].ng>0).sort((a,b)=>(b[2]&&st[b[0]].ng/(st[b[0]].ok+1))-(st[a[0]].ng/(st[a[0]].ok+1))).slice(0,3);
    V.innerHTML=segPractice('pfx')+`<section class="card"><div class="eyebrow">접두어 드릴 ${N}문제 끝</div><h2 style="font-size:24px;margin:4px 0">${PD.ok} / ${N} · ${sec}초</h2>
     ${weak.length?`<p class="small">자주 틀리는 것: ${weak.map(r=>`<b class="mono">${r[0]}</b> ${r[1]} ${'10'+sup(r[2])}`).join(' · ')} — 다음 라운드에 더 자주 나와요.</p>`:'<p class="small">전부 잘 알고 있어요. 속도를 줄여 보세요.</p>'}
     <div class="eyebrow">최근 기록</div><div class="dots" style="flex-wrap:wrap">${hist.slice(0,10).map(h=>`<span class="chip" title="${h.d}">${h.ok}/${N} · ${h.sec}s</span>`).join(' ')}</div>
     <div class="btnrow" style="margin-top:12px"><button class="primary" id="again" style="flex:1">10문제 더 ›</button><button class="ghost" data-goto="unitbasic" data-i="1">손가락 그림 보기</button></div></section>`;wirePM();
    V.querySelector('#again').onclick=()=>{PD=null;vPfx();wireCommon(V)};return}
  if(!PD.p)PD.p=pfxQ();const p=PD.p;
  V.innerHTML=segPractice('pfx')+`<section class="card"><div style="display:flex;justify-content:space-between;align-items:center"><span class="chip">접두어 드릴</span><span class="score"><span class="dots">${Array.from({length:N},(_,i)=>`<i class="${PD.log[i]?(PD.log[i].ok?'ok':'ng'):(i===PD.done?'now':'')}"></i>`).join('')}</span> ${PD.done+1} / ${N}</span></div>
   <div class="uq" style="font-size:22px">${p.q}</div>
   <div class="opts">${p.opts.map((o,i)=>`<button class="opt mono" data-o="${i}">${esc(o)}</button>`).join('')}</div><div id="after" hidden></div></section>
   <p class="small muted" style="text-align:center">맞으면 바로 다음으로 넘어가요 · 틀리면 손가락 힌트가 나와요</p>`;wirePM();
  V.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{if(PD.picked!=null)return;PD.picked=+b.dataset.o;const ok=p.opts[PD.picked]===p.ans;
    V.querySelectorAll('[data-o]').forEach((x,i)=>{x.disabled=true;if(p.opts[i]===p.ans)x.classList.add('ok');else if(i===PD.picked)x.classList.add('ng')});
    const st=LS.get('pstat',{});st[p.sym]=st[p.sym]||{ok:0,ng:0};st[p.sym][ok?'ok':'ng']++;LS.set('pstat',st);markStudy();
    PD.done++;if(ok)PD.ok++;PD.log.push({ok});PD.picked=null;
    if(ok){setTimeout(()=>{PD.p=null;vPfx();wireCommon(V)},550)}
    else{const af=V.querySelector('#after');af.hidden=false;af.innerHTML=`<p class="verdict ng">정답: ${esc(p.ans)}</p><div class="rel">💡 ${p.tip}<br><span class="small muted">실물: ${p.ex}</span></div><button class="primary" id="nextQ">다음 ›</button>`;af.querySelector('#nextQ').onclick=()=>{PD.p=null;vPfx();wireCommon(V)}}});
}

/* 0편 1장에 「외우는 법」 소단원 삽입 (접두어 바로 뒤) */
PAGES.unitbasic.secs.splice(1,0,{k:'외우는 법',h:'접두어 — 손가락으로 외우기',b:`${FIG.hands()}
  <div class="f4"><div><div class="h">① 손가락 × 3</div>칸 수를 세지 말고 손가락을 세요. 왼손 중지 = 3번째 → 3 × 3 = 9 → n = 10⁻⁹</div>
   <div><div class="h">② 6글자 구호</div><div class="ln">킬·메·기·테·페·엑 (k M G T P E)</div><div class="ln">밀·마·나·피·펨·아 (m μ n p f a)</div><div class="rd">위쪽은 kB → MB → GB → TB 용량 순서 그대로</div></div>
   <div><div class="h">③ 대문자 = 크다, 소문자 = 작다</div>예외는 k 하나(대문자 K는 켈빈). 그래서 mT 밀리테슬라, MHz 메가헤르츠. μ는 m에 꼬리 → 밀리 바로 다음 칸</div>
   <div><div class="h">④ 동전 법 (부호)</div>작은 단위로 바꾸면 개수가 늘어요. 1만 원 → 100원짜리 100개. 1 m → 1000 mm</div></div>
  <div class="tblwrap fit"><table><tr><th>칸</th><th>실물</th></tr>${PFXL.filter(r=>r[3]==='L'&&r[4]<=5).map(r=>`<tr><td class="mono">${r[0]} ${r[1]}</td><td class="small">${r[5]}</td></tr>`).join('')}</table></div>
  <p class="small">외우는 건 결국 반복이에요. 아래 드릴을 하루 한 번, 10문제씩. 틀린 접두어가 더 자주 나오고 기록이 남아요.</p>
  <button class="primary" data-goto="pfx">⚡ 접두어 드릴 10문제</button>`,
  easy:'손가락을 하나씩 접으면서 "밀·마·나·피·펨" 하고 세어 보세요. 세 번째 손가락이면 10의 9승, 왼손이니까 마이너스예요.'});
CARDS.push({id:'u14',tag:'단위',f:'접두어 구호 두 줄',a:'킬·메·기·테·페·엑 / 밀·마·나·피·펨·아',r:'손가락 번호 × 3 = 지수',e:'왼손은 −, 오른손은 +'},
 {id:'u15',tag:'단위',f:'m과 M의 차이',a:'m 밀리 10⁻³ (소문자=작다) · M 메가 10⁶ (대문자=크다)',r:'',e:'k만 예외로 소문자'});
