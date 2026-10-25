/* ═════════ 제2편 3장 전자기 유도·와전류 ═════════ */
Object.assign(TERM,{
 faraday:{ko:'패러데이 법칙',en:"Faraday's law of induction",gen:'자석이 움직이면 코일에 전압이 생긴다.',tech:'코일을 지나는 자속이 변하면 유도 기전력 e = −N·dΦ/dt가 생긴다. 자속이 일정하면 자기장이 있어도 기전력 없음. 변화가 클수록(강한 자석, 빠른 움직임) 커진다.',easy:'자석을 코일 속에 넣었다 뺐다 하면 전기가 생겨요. 빨리 할수록 더 많이.'},
 lenz:{ko:'렌츠 법칙',en:"Lenz's law",gen:'유도 전류는 변화를 방해하는 방향으로 흐른다.',tech:'패러데이 식의 − 부호. 자속이 늘면 줄이는 방향, 줄면 유지하는 방향의 자기장을 만들도록 전류가 흐른다. N극이 다가오면 코일 끝에 N극, 멀어지면 S극.',easy:'코일은 변화를 싫어하는 고집쟁이예요. 다가오면 밀고, 멀어지면 당겨요.'},
 eddy:{ko:'와전류',en:'Eddy current',gen:'금속 속에 소용돌이처럼 도는 전류.',tech:'변하는 자기장이 금속 내부에 유도하는 순환 전류. 원래 자기장 변화를 방해하는 2차 자기장을 만들고, 줄 가열로 손실(유효저항↑)을 만든다.',easy:'금속판에 생기는 작은 전기 소용돌이예요.'},
 inductance:{ko:'인덕턴스',en:'Inductance (L)',gen:'코일이 전류 변화에 저항하는 정도.',tech:'자속/전류 비. 단위 H(헨리) = Wb/A = V·s/A. 감은 수², 단면적, 코어 투자율에 비례.',easy:'코일이 "전류를 갑자기 바꾸지 마"라고 버티는 힘.'},
 lc:{ko:'LC 공진',en:'LC resonance',gen:'코일과 콘덴서가 주고받으며 진동.',tech:'공진 주파수 f = 1/(2π√(LC)). 금속탐지기의 발진기(LC tank)가 고주파 교류를 만든다.',easy:'그네처럼 에너지가 코일과 콘덴서 사이를 왔다 갔다 하는 박자.'},
 skin:{ko:'표피 효과·표피 깊이',en:'Skin effect · Skin depth (δ)',gen:'교류 전류가 금속 겉면에만 흐르는 현상.',tech:'δ = √(ρ/(π f μ)) = 1/√(π f μ σ). μ는 비투자율이 아닌 투자율(H/m, 비자성 금속 μ ≈ μ₀). 주파수↑ → δ↓. 금속탐지의 검출 가능 최소 두께.',easy:'빠르게 흔들리는 자기장일수록 금속 속으로 얕게만 파고들어요.'}
});
Object.assign(UNIT,{
 H:{s:'H',r:'헨리',mean:'인덕턴스 단위. 1 H = 1 Wb/A'}, mH:{s:'mH',r:'밀리헨리',mean:'1 mH = 10⁻³ H'}, uH:{s:'μH',r:'마이크로헨리',mean:'1 μH = 10⁻⁶ H'},
 ohmm:{s:'Ω·m',r:'옴 미터',mean:'비저항 ρ 단위. Al 2.65 × 10⁻⁸, Cu 1.68 × 10⁻⁸'}
});
FORM.push(
 {eq:'e = −N · dΦ/dt',read:'유도 기전력은 마이너스 엔 디 파이 디 티',name:'패러데이·렌츠',page:'induct',sec:0,syms:[['N','감은 수',null],['Φ','자속','Wb']]},
 {eq:'f = 1 / (2π√(LC))',read:'에프는 1 나누기 2파이 루트 엘 씨',name:'LC 공진 주파수',page:'induct',sec:2,syms:[['L','인덕턴스','H'],['C','정전용량','F']]},
 {eq:'δ = √(ρ / (π f μ))',read:'델타는 루트 로 나누기 파이 에프 뮤',name:'표피 깊이',page:'induct',sec:3,syms:[['ρ','비저항','ohmm'],['μ','투자율 (μ₀ = 4π × 10⁻⁷)','Hm'],['f','주파수','Hz']]}
);

ANIM.faraday=host=>{let auto=true,pos=0;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 210" role="img" aria-label="패러데이 유도"></svg><div class="figctl"><button class="tbtn" data-a aria-pressed="true">자동으로 움직이기</button><label class="small">자석 위치 <input type="range" min="0" max="1" step="0.01" value="0" data-p style="width:120px"></label></div>
   <div class="tofcalc small" data-o></div></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);let prev=0,emf=0;
  const L=loop(tp=>{if(auto){pos=0.5-0.5*Math.cos(tp*1.6);q('[data-p]').value=pos}const v=(pos-prev);prev=pos;emf+= (v*60-emf)*0.3;
    const mx=20+pos*120;const coil=[0,1,2,3,4,5].map(k=>`<ellipse cx="${200+k*14}" cy="80" rx="7" ry="34" style="fill:none;stroke:var(--warn);stroke-width:3"/>`).join('');
    const near=emf>0.05,away=emf<-0.05;
    const ang=Math.max(-1,Math.min(1,emf*1.5))*60*Math.PI/180;
    svg.innerHTML=`<rect x="${mx}" y="64" width="40" height="32" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/><rect x="${mx+40}" y="64" width="40" height="32" style="fill:var(--bad)"/>${tx(mx+20,85,'S','b2','middle')}${tx(mx+60,85,'N','b2','middle').replace('class="b2"','class="b2" style="fill:#fff"')}
     ${coil}${tx(196,40,'코일 끝','small2','middle')}${near?tx(196,128,'N극 생김 → 밀어냄','b b2','middle'):away?tx(196,128,'S극 생김 → 당김','u b2','middle'):tx(196,128,'변화 없음 → 0','m small2','middle')}
     <path d="M200 114 V170 H290 V114" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><circle cx="245" cy="170" r="20" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/>
     <line x1="245" y1="174" x2="${(245+16*Math.sin(ang)).toFixed(1)}" y2="${(174-16*Math.cos(ang)).toFixed(1)}" style="stroke:var(--bad);stroke-width:2.4"/>${tx(245,204,'검류계','small2','middle')}`;
    q('[data-o]').innerHTML=`유도 기전력 e = −N·dΦ/dt ∝ <b>${Math.abs(emf).toFixed(2)}</b> ${near?'(다가옴: 자속 증가 → 막는 방향)':away?'(멀어짐: 자속 감소 → 유지하는 방향)':'(정지: 자속 일정 → 0)'}<br>빠르게 움직일수록 바늘이 크게 움직여요.`});
  q('[data-a]').onclick=e=>{auto=!auto;e.target.setAttribute('aria-pressed',String(auto));e.target.textContent=auto?'자동으로 움직이기':'손으로 움직이기'};q('[data-p]').oninput=e=>{auto=false;q('[data-a]').setAttribute('aria-pressed','false');q('[data-a]').textContent='손으로 움직이기';pos=+e.target.value};return L.stop};

ANIM.skin=host=>{const MET={Al:['알루미늄',2.65e-8],Cu:['구리',1.68e-8],Au:['금',2.44e-8],SS:['스테인리스(비자성)',7.2e-7]};let m='Al',f=135e3;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 170" role="img" aria-label="표피 깊이"></svg><div class="figctl"><label class="small">금속 <select data-m style="width:auto;padding:4px 6px">${Object.entries(MET).map(([k,v])=>`<option value="${k}">${v[0]}</option>`).join('')}</select></label>
   <label class="small">주파수 <input type="range" min="3" max="7" step="0.05" value="${Math.log10(135e3)}" data-f style="width:120px"> <b data-fv></b></label></div><div class="tofcalc mono small" data-o></div>
   <figcaption>주파수를 올리면 자기장이 금속 속으로 <b>얕게</b>만 들어가요. 금속이 표피 깊이보다 얇으면 와전류가 충분히 안 생겨 검출이 어려워요. [AI 보충: Cu·Au·스테인리스 비저항 값]</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const draw=()=>{const rho=MET[m][1],mu=4*Math.PI*1e-7,d=Math.sqrt(rho/(Math.PI*f*mu));const mm=d*1000;const px=Math.min(220,Math.max(3,Math.log10(mm*1000)/Math.log10(5000)*220));
   let g='';for(let i=0;i<24;i++){const x=60+i*10;const a=Math.exp(-(i*10)/Math.max(3,px));g+=`<rect x="${x}" y="40" width="10" height="90" style="fill:var(--unit);opacity:${(a*0.85).toFixed(2)}"/>`}
   svg.innerHTML=`<rect x="60" y="40" width="240" height="90" style="fill:var(--surface2);stroke:var(--ink);stroke-width:1.4"/>${g}${ar(20,85,56,85,'i',2)}${tx(16,74,'교류 자기장','small2')}
    <line x1="${60+Math.min(240,px)}" y1="30" x2="${60+Math.min(240,px)}" y2="140" style="stroke:var(--bad);stroke-width:2;stroke-dasharray:4 3"/>${tx(60+Math.min(232,px),26,'δ','b b2','middle')}${tx(180,158,'금속 속 깊이 → (색이 진할수록 와전류 많음)','small2','middle')}`;
   q('[data-o]').innerHTML=`δ = √(ρ ÷ (π f μ₀)) = √(${sciT(sci(rho))} ÷ (π × ${sciT(sci(f,3))} × 4π×10⁻⁷)) = <b>${mm>=0.1?fx(mm,3)+' mm':fx(mm*1000,3)+' μm'}</b>`;q('[data-fv]').textContent=f>=1e6?fx(f/1e6,3)+' MHz':fx(f/1e3,3)+' kHz'};
  q('[data-m]').onchange=e=>{m=e.target.value;draw()};q('[data-f]').oninput=e=>{f=10**(+e.target.value);draw()};draw();return null};

Object.assign(GEN,{
 faradayE(){const N=pick([50,100,200,500]),B1=pick([0.01,0.02,0.05,0.1]),A=pick([1,2,4]),dtms=pick([2,5,10,20]);const dPhi=B1*A*1e-4,e=N*dPhi/(dtms*1e-3);
  return {kind:'유사',title:'유도 기전력 크기',q:`감은 수 N = ${N}회, 단면적 ${A} {{cm2}}인 코일을 지나는 자속밀도가 0에서 ${B1} {{T}}로 ${dtms} {{ms}} 동안 고르게 변했다. 유도 기전력의 크기는?`,
   first:['|e| = N·ΔΦ/Δt','Φ = B·A','cm² → m²: × 10⁻⁴'],
   steps:[{h:'단위 먼저',b:`<div class="ln">A = ${A} cm² = ${A} × 10⁻⁴ m² · Δt = ${dtms} ms = ${dtms} × 10⁻³ s</div><div class="rd">⚠ cm²는 10⁻⁴ (지수 2배)</div>`},{h:'자속 변화',b:`<div class="ln">ΔΦ = ΔB × A = ${B1} × ${A}×10⁻⁴ = ${sciT(sci(dPhi))} Wb</div>`},
    {h:'기전력',b:`<div class="ln">|e| = ${N} × ${sciT(sci(dPhi))} ÷ (${dtms}×10⁻³) = ${fx(e,3)} V</div>`},{h:'방향 (렌츠)',b:`<div class="rd">자속이 늘었으니 줄이는 방향의 자기장을 만들도록 전류가 흐름</div>`}],
   ans:`|e| ≈ ${fx(e,3)} V`,ansRead:`${fxR(e)} 볼트`,calc:calcBlock([[[...ks(N),'×',...ks(B1),'×',...K(A,-4),'÷',...K(dtms,-3),'='],casioDec(e)]],[W_NEG]),
   easy:'코일을 많이 감을수록, 자석이 셀수록, 빨리 변할수록 전압이 커져요.'}},
 lcF(){const L=pick([['100 μH',100e-6],['1 mH',1e-3],['470 μH',470e-6],['10 mH',10e-3]]),C=pick([['10 nF',10e-9],['100 nF',100e-9],['1 nF',1e-9],['470 pF',470e-12]]);const f=1/(2*Math.PI*Math.sqrt(L[1]*C[1]));
  return {kind:'유사',title:'LC 발진 주파수',q:`금속탐지기 발진기의 L = ${L[0]}, C = ${C[0]}이다. 공진 주파수는 몇 kHz인가?`,first:['f = 1/(2π√(LC))','μH·mH, nF·pF → H, F'],
   steps:[{h:'단위 먼저',b:`<div class="ln">L = ${sciT(sci(L[1]))} H · C = ${sciT(sci(C[1]))} F</div><div class="rd">μ = 10⁻⁶, m = 10⁻³, n = 10⁻⁹, p = 10⁻¹²</div>`},
    {h:'LC와 루트',b:`<div class="ln">LC = ${sciT(sci(L[1]*C[1]))} → √ = ${sciT(sci(Math.sqrt(L[1]*C[1])))} s</div>`},
    {h:'주파수',b:`<div class="ln">f = 1 ÷ (2π × ${sciT(sci(Math.sqrt(L[1]*C[1])))}) = ${fx(f,4)} Hz = ${fx(f/1e3,4)} kHz</div>`},{h:'검산',b:`<div class="rd">금속탐지기는 보통 수십~수백 kHz ✓</div>`}],
   ans:`f ≈ ${fx(f/1e3,4)} kHz`,ansRead:`${fxR(f/1e3,4)} 킬로헤르츠`,
   calc:calcBlock([[['1','÷','(','2','×','SHIFT','×10ˣ','×','√■',...K(+sci(L[1]).m,sci(L[1]).e),'×',...K(+sci(C[1]).m,sci(C[1]).e),'▶',')','='],casioDec(f),'Hz']],[W_PI,'√ 안에 L×C를 넣고 [▶] · 분모 전체 괄호']),
   easy:'코일이 크거나 콘덴서가 크면 그네가 느리게 흔들려서 주파수가 낮아져요.'}},
 skinD(base){const M=base?['알루미늄',2.65e-8]:pick([['알루미늄',2.65e-8],['구리',1.68e-8]]),f=base?135e3:pick([20e3,50e3,135e3,500e3,1e6]);const d=Math.sqrt(M[1]/(Math.PI*f*4*Math.PI*1e-7));
  return {kind:base?'기본':'유사',title:'검출 가능 최소 두께 (표피 깊이)',q:`${M[0]}(ρ = ${sciT(sci(M[1]))} {{ohmm}}, μ ≈ μ₀ = 4π × 10⁻⁷ {{Hm}})을 ${f>=1e6?fx(f/1e6,3)+' MHz':fx(f/1e3,4)+' kHz'}로 탐지할 때 표피 깊이 δ는?`,
   first:['δ = √(ρ/(π f μ))','μ는 투자율(H/m)','kHz → Hz'],
   steps:[{h:'단위',b:`<div class="ln">f = ${sciT(sci(f))} Hz · μ = 4π × 10⁻⁷ H/m</div><div class="rd">비투자율(단위 없음)이 아니라 투자율 μ = μᵣμ₀</div>`},
    {h:'분모',b:`<div class="ln">π × ${sciT(sci(f))} × 4π×10⁻⁷ = ${sciT(sci(Math.PI*f*4*Math.PI*1e-7,4))}</div>`},
    {h:'루트',b:`<div class="ln">δ = √(${sciT(sci(M[1]))} ÷ ${sciT(sci(Math.PI*f*4*Math.PI*1e-7,4))}) = ${sciT(sci(d))} m</div><div class="ln">= ${d>=1e-4?fx(d*1000,3)+' mm':fx(d*1e6,3)+' μm'}</div>`},
    {h:'해석',b:`<div class="rd">주파수를 낮추면 δ↑(더 깊이), 높이면 δ↓ · 강의 예: Al 135 kHz → 0.223 mm</div>`}],
   ans:`δ ≈ ${d>=1e-4?fx(d*1000,3)+' mm':fx(d*1e6,3)+' μm'}`,ansRead:`${d>=1e-4?fxR(d*1000)+' 밀리미터':fxR(d*1e6)+' 마이크로미터'}`,
   calc:calcBlock([[['√■',...K(+sci(M[1]).m,sci(M[1]).e),'÷','(','SHIFT','×10ˣ','×',...K(+sci(f).m,sci(f).e),'×','4','×','SHIFT','×10ˣ','×','1','×10ˣ','(−)','7',')','▶','='],casioDec(d),'m']],[W_PI,W_NEG,'√ 안 분모 전체를 괄호로']),
   easy:'흔들림이 빠를수록(주파수↑) 금속 겉만 살짝 건드려요. 그래서 얇은 금속은 높은 주파수로 찾아요.'}}
});
PSET.induct=[['faradayE'],['lcF'],['skinD',true],['skinD']];
TOPICS.induct={name:'전자기 유도',g:['faradayE','lcF','skinD']};['faradayE','lcF','skinD'].forEach(g=>BASICG.add(g));

PAGES.induct={title:'전자기 유도·와전류',part:'제2편 3장',secs:[
 {k:'패러데이',h:'자속이 변하면 전압이 생긴다',b:`<div data-anim="faraday"></div>
   <div class="eqn">e = −N · dΦ / dt<small>N 감은 수, Φ 자속 · − 부호 = [[lenz|렌츠 법칙]]</small></div>
   <ul class="clean"><li>N극이 다가옴 → 자속↑ → 코일 끝에 <b>N극</b> → 밀어냄 (그 끝에서 보면 전류 반시계)</li><li>N극이 멀어짐 → 자속↓ → 코일 끝에 <b>S극</b> → 당김 (시계 방향)</li><li>자속이 일정하면 자기장이 있어도 기전력 0 · 강한 자석·빠른 움직임 → 큰 기전력</li></ul>`,
  easy:'자석을 넣었다 뺐다 할 때만 전기가 생겨요. 가만히 두면 아무리 센 자석이어도 0이에요.',
  src:'【자속의 변화가 클수록 유도 기전력이 커진다】 【자속이 일정하게 유지되면 유도 기전력이 발생하지 않는다】 【− 부호의 의미 → 유도 전류는 자속의 변화를 방해하는 방향으로 흐른다】'},
 {k:'와전류',h:'와전류 — 금속 속 소용돌이',b:`<p>[[eddy]]: 변하는 자기장이 금속 안에 만드는 순환 전류. 원래 자기장 변화를 <b>방해</b>하는 2차 자기장을 만들어요.</p>
   <ul class="clean"><li>N극이 금속에 다가오면 금속 표면에 N극이 생기는 방향으로, 멀어지면 S극이 생기는 방향으로 흐름</li><li>와전류의 줄 가열 → 코일에서 본 유효저항 R_eff↑</li><li>2차 자기장 → 유효 자속·인덕턴스 L_eff 변화 → 임피던스 Z = R_eff + jωL_eff 변화</li></ul>`,
  easy:'금속판도 자석이 움직이면 그 안에 작은 전기 소용돌이가 생겨 자석을 밀어내요.'},
 {k:'LC 공진',h:'교류 자기장 만들기 — LC 발진',b:`<div class="eqn">f = 1 / (2π√(LC))<small>"에프는 1 나누기 2파이 루트 엘 씨" · [[lc|LC tank]]</small></div>
   <ul class="clean"><li>코일에 교류 전류 → N·S가 번갈아 바뀌는 교류 자기장</li><li>자기장 세기 요인: 인가 전압, 감은 수 N, 코일 지름·모양, 코어 투자율 μ, 주파수 f</li><li>[[inductance|인덕턴스]] 단위 H = Wb/A</li></ul>`,
  easy:'코일과 콘덴서가 에너지를 주고받으며 일정한 박자로 흔들려요. 그 박자가 공진 주파수예요.'},
 {k:'표피 깊이',h:'표피 효과 — 얼마나 깊이 들어가나',b:`<div data-anim="skin"></div>
   <div class="eqn">δ = √( ρ / (π f μ) ) = 1/√(π f μ σ)<small>[[skin|표피 깊이]] · μ는 투자율(H/m), 비자성 금속 μ ≈ μ₀ = 4π × 10⁻⁷</small></div>
   <p>강의 예: 알루미늄, 135 kHz → δ ≈ 0.223 mm. 금속이 이보다 얇으면 검출이 어려워요(초박막).</p>`,
  easy:'빠르게 흔들리는 자기장은 금속 겉만 살짝 건드려요. 깊이 보려면 주파수를 낮춰요.',
  src:'【와전류가 발생하는 검출물체의 최소 두께, 즉 침투 깊이 (it comes from skin depth eq.)】 【permeability of material (H/m), not relative permeability】'},
 {k:'문제',h:'',b:'__PROBS__'}
]};
CARDS.push(
 {id:'in1',tag:'유도',f:'패러데이 법칙',a:'e = −N dΦ/dt',r:'− = 렌츠: 변화를 방해',e:''},
 {id:'in2',tag:'유도',f:'N극이 코일에 다가올 때 코일 끝 극성',a:'N극 (밀어냄)',r:'멀어지면 S극 (당김)',e:''},
 {id:'in3',tag:'유도',f:'LC 공진 주파수',a:'f = 1/(2π√(LC))',r:'',e:''},
 {id:'in4',tag:'유도',f:'표피 깊이 식',a:'δ = √(ρ/(π f μ))',r:'f↑ → δ↓ · μ는 H/m',e:''},
 {id:'in5',tag:'유도',f:'와전류가 코일 임피던스에 주는 영향',a:'줄 가열 → R_eff↑, 2차 자기장 → L_eff 변화 → Z 변화',r:'',e:''}
);
