/* ═════════ 제3편 4장 가속도·진동센서 ═════════ */
Object.assign(TERM,{
 accelerometer:{ko:'가속도센서',en:'Accelerometer',gen:'속도가 얼마나 빨리 변하는지 재는 센서.',tech:'가속도를 전기 신호로 변환. F = ma로 proof mass가 변위 → 전극 사이 정전용량 변화 → 전압 ∝ 가속도. 속도·거리·진동 측정에도 사용.',easy:'버스가 출발할 때 몸이 뒤로 쏠리는 것을 재는 센서예요.'},
 gunit:{ko:'g (중력가속도 단위)',en:'g',gen:'지구 중력만큼의 가속도.',tech:'1 g = 9.8 m/s² (해수면 중력). 자동차 충돌 5~80 g, 노트북 3 ft 낙하 100~2000 g, 대포 발사 10,000 g.',easy:'가만히 서 있을 때 느끼는 무게감이 1 g예요.'},
 hooke:{ko:'훅의 법칙',en:"Hooke's law",gen:'스프링은 늘어난 만큼 힘을 낸다.',tech:'F = kx. k 스프링 상수 N/m = kg/s². 가속도센서: ma = kx → x = ma/k.',easy:'고무줄을 2배 늘리면 2배 세게 당겨요.'},
 diffcap:{ko:'차동 용량식',en:'Differential capacitive sensing',gen:'두 콘덴서의 차이로 재는 방법.',tech:'가동전극이 두 고정전극 사이 중앙. 변위 x → C₁ = εA/(d−x)↑, C₂ = εA/(d+x)↓. ΔC ≈ εA(2Δx)/d². 차이를 보면 감도↑, 공통 오차↓.',easy:'가운데 판이 위로 가면 위 간격은 좁아지고 아래는 넓어져요. 그 차이를 재요.'},
 zerog:{ko:'제로 g 출력',en:'Zero-g output',gen:'가속도 0일 때 출력.',tech:'측정축을 중력 방향으로 +1 g 출력, 180° 뒤집어 −1 g 출력을 재서 평균. Zero-g = (V₊₁g + V₋₁g)/2. 감도 = (V₊₁g − V₋₁g)/2.',easy:'똑바로 세웠을 때와 뒤집었을 때 값의 딱 중간이 0 g 값이에요.'},
 noisedens:{ko:'노이즈 밀도',en:'Noise density (g/√Hz)',gen:'대역폭으로 나눈 잡음 크기.',tech:'0 g 출력의 랜덤 흔들림 표준편차 → 감도로 나눠 g RMS → √(대역폭)으로 정규화. 예: 1 mV ÷ 1 V/g ÷ √100 Hz = 0.1 mg/√Hz.',easy:'잡음을 "주파수 1칸당" 크기로 바꿔서 센서끼리 공평하게 비교해요.'},
 bandwidth:{ko:'대역폭',en:'Bandwidth',gen:'따라갈 수 있는 진동 빠르기 범위.',tech:'센서가 응답하는 진동 주파수 범위(가속도계 약 40~1000 Hz). 용량식은 스프링 구조와 내부 공기 감쇠 때문에 수백 Hz. 사람 동작(10~12 Hz)엔 40~60 Hz면 충분.',easy:'센서가 따라갈 수 있는 흔들림 속도의 한계.'},
 fft:{ko:'FFT (주파수 분석)',en:'FFT (Fast Fourier Transform)',gen:'섞인 진동을 주파수별로 나눠 보기.',tech:'시간 신호를 주파수 성분과 진폭으로 분해. 특정 진동 패턴·고장 주파수 식별, 잡음 필터링에 활용.',easy:'합창 소리를 듣고 각 사람 목소리 높이를 따로 알아내는 것과 같아요.'},
 piezoacc:{ko:'압전형 가속도계',en:'Piezoelectric accelerometer',gen:'압전 소자로 만든 가속도센서.',tech:'베이스와 추 사이에 압전 소자. q = d·F = d·m·a, V = q/C. 구조 간단·강해 큰 가속도·충격에 적합. 정적(DC) 가속도는 측정 불가.',easy:'추가 압전판을 누르는 힘으로 전기를 만들어요. 대신 가만히 있는 기울기는 못 재요.'}
});
Object.assign(UNIT,{
 mps2:{s:'m/s²',r:'미터 퍼 세컨드 제곱',mean:'가속도 SI 단위. 1 g = 9.8 m/s²'},
 gU:{s:'g',r:'지 (중력가속도)',mean:'1 g = 9.8 m/s²'},
 Vg:{s:'V/g',r:'볼트 퍼 지',mean:'가속도센서 감도. mV/g도 많이 씀'},
 mgrtHz:{s:'mg/√Hz',r:'밀리지 퍼 루트헤르츠',mean:'노이즈 밀도. 1 mg = 10⁻³ g'}
});
FORM.push(
 {eq:'F = ma = kx → x = ma/k',read:'뉴턴 2법칙과 훅의 법칙',name:'proof mass 변위',page:'accel',sec:1,syms:[['k','스프링 상수','Nm'],['a','가속도','mps2']]},
 {eq:'C₁ = εA/(d−x), C₂ = εA/(d+x)',read:'간격이 줄면 C 증가',name:'차동 정전용량',page:'accel',sec:2,syms:[]},
 {eq:'V_o = V_s(C₁ − C₂)/(C₁ + C₂)',read:'= −V_s + 2V_s·C₁/(C₁+C₂)',name:'가속도센서 출력 (교수님 식과 같은 값)',page:'accel',sec:3,syms:[]},
 {eq:'Zero-g = (V₊₁g + V₋₁g)/2',read:'두 값의 평균',name:'제로 g 출력',page:'accel',sec:5,syms:[]},
 {eq:'노이즈 밀도 = σ ÷ S ÷ √BW',read:'시그마 나누기 감도 나누기 루트 대역폭',name:'노이즈 밀도',page:'accel',sec:5,syms:[['σ','출력 잡음 표준편차','mV'],['S','감도','Vg']]},
 {eq:'q = d·m·a,  V = q/C',read:'압전 가속도계',name:'압전형 가속도계 출력',page:'accel',sec:7,syms:[]}
);

ANIM.accelC=host=>{let a=0;const Vs=3;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 230" role="img" aria-label="차동 용량식 가속도센서"></svg><div class="figctl"><label class="small">가속도 a <input type="range" min="-1" max="1" step="0.02" value="0" data-a style="width:150px"> <b data-av>0</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>가속도가 생기면 스프링에 매달린 proof mass가 움직여(x = ma/k) 한쪽 간격은 좁아지고(C↑) 다른 쪽은 넓어져요(C↓). 그 차이로 가속도를 알아내요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);let x=0,v=0;
  const L=loop(()=>{const target=a*0.6;v+=(target-x)*0.08;v*=0.82;x+=v; // 질량-스프링-감쇠
   const d=1,C1=1/(d-x),C2=1/(d+x),Vo=Vs*(C1-C2)/(C1+C2);const cy=115,gap=46,my=cy-x*gap;
   svg.innerHTML=`<rect x="70" y="${cy-gap-16}" width="200" height="12" style="fill:var(--ink)"/>${tx(276,cy-gap-6,'+V_s 전극','small2')}
    <rect x="70" y="${cy+gap+4}" width="200" height="12" style="fill:var(--ink)"/>${tx(276,cy+gap+14,'−V_s 전극','small2')}
    <rect x="100" y="${my-10}" width="140" height="20" rx="3" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/>${tx(170,my+5,'proof mass (가동전극)','small2','middle')}
    <path d="M100 ${my} l-8 -6 l-8 12 l-8 -12 l-8 12 l-8 -6" style="fill:none;stroke:var(--muted);stroke-width:1.6"/><path d="M240 ${my} l8 -6 l8 12 l8 -12 l8 12 l8 -6" style="fill:none;stroke:var(--muted);stroke-width:1.6"/>
    <rect x="50" y="${cy-30}" width="10" height="60" style="fill:var(--muted)"/><rect x="280" y="${cy-30}" width="10" height="60" style="fill:var(--muted)"/>
    ${tx(26,cy-gap/2+4,'C₁','b2','middle')}${tx(26,cy+gap/2+4,'C₂','b2','middle')}
    ${a!==0?ar(320,cy,320,cy-a*50,'b',2.4):''}${tx(320,cy+(a>0?20:-14),a!==0?'a':'','b b2','middle')}
    <rect x="20" y="200" width="${(C1/(C1+C2)*300).toFixed(1)}" height="10" style="fill:var(--unit)"/><rect x="${(20+C1/(C1+C2)*300).toFixed(1)}" y="200" width="${(C2/(C1+C2)*300).toFixed(1)}" height="10" style="fill:var(--accent)"/>${tx(20,224,'C₁ 비율','u small2')}${tx(320,224,'C₂ 비율','a small2','end')}`;
   q('[data-o]').innerHTML=`x = ${(x).toFixed(3)}d · C₁ = C₀/(1−x/d) = ${C1.toFixed(3)}C₀ · C₂ = ${C2.toFixed(3)}C₀<br>V_o = V_s(C₁−C₂)/(C₁+C₂) = 3 × ${((C1-C2)/(C1+C2)).toFixed(3)} = <b>${Vo.toFixed(3)} V</b> (≈ V_s·x/d)`});
  q('[data-a]').oninput=e=>{a=+e.target.value;q('[data-av]').textContent=a.toFixed(2)};return L.stop};

ANIM.fftdemo=host=>{let A1=1,A2=0.5,f1=3,f2=11;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 240" role="img" aria-label="시간 영역과 주파수 영역"></svg><div class="figctl"><label class="small">f₁ 진폭 <input type="range" min="0" max="1" step="0.05" value="1" data-1 style="width:90px"></label><label class="small">f₂ 진폭 <input type="range" min="0" max="1" step="0.05" value="0.5" data-2 style="width:90px"></label><label class="small">f₂ <input type="range" min="5" max="20" step="1" value="11" data-f style="width:80px"></label></div>
   <figcaption>위: 센서가 본 진동(<b>시간 영역</b>) — 섞여 있어서 알아보기 어려워요. 아래: FFT로 나눈 <b>주파수 영역</b> — 어떤 주파수가 얼마나 센지 막대로 바로 보여요. 고장 나면 특정 주파수 막대가 커져요(예지보전).</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const L=loop(tp=>{let d='';for(let i=0;i<=280;i++){const t=i/280;const y=A1*Math.sin(2*Math.PI*f1*t+tp)+A2*Math.sin(2*Math.PI*f2*t+tp*2.3);d+=(i?'L':'M')+(40+i)+' '+(62-y*26).toFixed(1)}
   const X=f=>40+f/24*280;let bars='';[[f1,A1],[f2,A2]].forEach(([f,A])=>{bars+=`<rect x="${X(f)-6}" y="${200-A*70}" width="12" height="${A*70}" style="fill:var(--accent)"/>`});
   svg.innerHTML=`${tx(8,18,'시간 영역','b2')}<line x1="40" y1="62" x2="322" y2="62" style="stroke:var(--line)"/><path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>${tx(322,108,'시간 →','small2','end')}
    ${tx(8,124,'주파수 영역 (FFT)','b2')}<line x1="40" y1="200" x2="322" y2="200" style="stroke:var(--ink)"/>${bars}${[0,5,10,15,20].map(f=>`<text x="${X(f)}" y="216" text-anchor="middle" class="small2">${f}</text>`).join('')}${tx(322,234,'주파수 (Hz) →','small2','end')}${tx(X(f1),194-A1*70,'f₁','a small2','middle')}${tx(X(f2),194-A2*70,'f₂','a small2','middle')}`});
  q('[data-1]').oninput=e=>{A1=+e.target.value};q('[data-2]').oninput=e=>{A2=+e.target.value};q('[data-f]').oninput=e=>{f2=+e.target.value};return L.stop};

Object.assign(FIG,{
 springMass(){return svgFig(340,170,`<rect x="20" y="20" width="12" height="130" style="fill:var(--muted)"/>${tx(26,166,'틀(고정)','small2','middle')}
   <path d="M32 60 l12 -8 l12 16 l12 -16 l12 16 l12 -16 l12 8" style="fill:none;stroke:var(--ink);stroke-width:2"/>${tx(80,44,'스프링 k','small2','middle')}
   <rect x="32" y="100" width="40" height="22" rx="3" style="fill:var(--surface);stroke:var(--ink)"/><line x1="72" y1="111" x2="116" y2="111" style="stroke:var(--ink);stroke-width:2"/>${tx(52,140,'댐퍼 c','small2','middle')}
   <rect x="116" y="44" width="70" height="84" rx="6" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/>${tx(151,90,'m','b b2','middle')}
   <line x1="104" y1="60" x2="116" y2="60" style="stroke:var(--ink);stroke-width:2"/>${ar(196,86,250,86,'b',2.4)}${tx(222,78,'x','b b2','middle')}
   ${tx(214,120,'ma = kx → x = ma/k','b2')}${tx(214,140,'ω₀ = 2πf₀ = √(k/m) [AI 보충]','small2')}`,'질량-스프링-댐퍼 모델','가속도가 들어오면 질량이 x만큼 밀려요. 스프링이 단단할수록(k↑), 질량이 가벼울수록(m↓) 덜 밀려서 큰 가속도까지 잴 수 있어요. 댐퍼(감쇠)는 진동을 가라앉혀요.')},
 accCircuit(){return svgFig(340,170,`<circle cx="40" cy="40" r="14" style="fill:var(--surface);stroke:var(--ink)"/>${tx(40,44,'+V_s','small2','middle')}<circle cx="40" cy="130" r="14" style="fill:var(--surface);stroke:var(--ink)"/>${tx(40,134,'−V_s','small2','middle')}
   <path d="M54 40 H130 M54 130 H130" style="stroke:var(--ink);stroke-width:1.6"/>
   <line x1="130" y1="28" x2="130" y2="52" style="stroke:var(--ink);stroke-width:3"/><line x1="142" y1="28" x2="142" y2="52" style="stroke:var(--ink);stroke-width:3"/>${tx(136,20,'C₁','b2','middle')}
   <line x1="130" y1="118" x2="130" y2="142" style="stroke:var(--ink);stroke-width:3"/><line x1="142" y1="118" x2="142" y2="142" style="stroke:var(--ink);stroke-width:3"/>${tx(136,160,'C₂','b2','middle')}
   <path d="M142 40 H180 V130 H142" style="fill:none;stroke:var(--ink);stroke-width:1.6"/><circle cx="180" cy="85" r="4" style="fill:var(--ink)"/>${tx(188,80,'가동전극','small2')}
   ${ar(184,85,260,85,'u',2)}${tx(300,90,'V_o','u b2','middle')}${tx(232,118,'1 MHz, 작은 V_s','small2','middle')}`,'C → V 변환 회로','두 콘덴서가 직렬로 ±V_s 사이에 있고, 가운데(가동전극) 전압이 출력이에요. 직렬 C의 전압 분배로 V_o = V_s(C₁−C₂)/(C₁+C₂).')}
});

Object.assign(GEN,{
 gUnit(){const g=pick([0.5,2,5,16,80,2000]);const ms=g*9.8;return {kind:'유사',title:'g ↔ m/s²',q:`가속도 ${g} {{gU}}는 몇 {{mps2}}인가?`,first:['1 g = 9.8 m/s²'],
  steps:[{h:'관계',b:`<div class="ln">1 g = 9.8 m/s²</div>`},{h:'계산',b:`<div class="ln">${g} × 9.8 = ${fx(ms,4)} m/s²</div>`},{h:'감 잡기',b:`<div class="rd">자동차 충돌 5~80 g · 노트북 낙하 100~2000 g</div>`}],ans:`${fx(ms,4)} m/s²`,ansRead:`${fxR(ms,4)} 미터 퍼 세컨드 제곱`,calc:calcBlock([[[...ks(g),'×','9','.','8','='],casioDec(ms)]],[]),easy:'1 g는 지구가 당기는 가속도. g 숫자에 9.8을 곱하면 m/s².'}},
 proofX(){const mug=pick([1,2,5,10]),k=pick([0.5,1,2,5]),g=pick([1,2,10,50]);const m=mug*1e-9,a=g*9.8,x=m*a/k;
  return {kind:'응용',title:'proof mass가 얼마나 움직이나',fig:FIG.springMass(),q:`proof mass ${mug} {{ug}}, 스프링 상수 k = ${k} {{Nm}}인 가속도센서에 ${g} g가 걸렸다. 변위 x는 몇 nm인가?`,first:['x = ma/k','μg → kg: × 10⁻⁹','g → m/s²: × 9.8'],
   steps:[{h:'단위 먼저 (SI)',b:`<div class="ln">m = ${mug} μg = ${mug} × 10⁻⁹ kg</div><div class="ln">a = ${g} × 9.8 = ${fx(a,4)} m/s²</div><div class="rd">⚠ μg = 10⁻⁶ g = 10⁻⁹ kg</div>`},
    {h:'힘',b:`<div class="ln">F = ma = ${sciT(sci(m))} × ${fx(a,4)} = ${sciT(sci(m*a))} N</div>`},{h:'변위',b:`<div class="ln">x = F/k = ${sciT(sci(m*a))} ÷ ${k} = ${sciT(sci(x))} m = ${fx(x*1e9,3)} nm</div>`},
    {h:'해석',b:`<div class="rd">아주 작게 움직여요 → 그래서 간격(μm) 대비 작은 변화를 정전용량으로 읽음. 큰 가속도를 재려면 k↑ m↓</div>`}],
   ans:`x ≈ ${fx(x*1e9,3)} nm`,ansRead:`${fxR(x*1e9)} 나노미터`,calc:calcBlock([[[...K(mug,-9),'×',...ks(g),'×','9','.','8','÷',...ks(k),'='],casioDec(x),'m'],[['×','1','×10ˣ','9','='],casioDec(x*1e9),'nm']],[W_NEG]),
   easy:'가벼운 추가 단단한 스프링에 매달려 있으면 세게 흔들어도 조금만 움직여요.'}},
 accelVo(base){let r1,r2,Vs;if(base){Vs=3;r1=2;r2=1}else{Vs=pick([2,3,5]);[r1,r2]=pick([[3,1],[1,2],[1,3],[3,2],[4,1]])}const Vo=Vs*(r1-r2)/(r1+r2);
  return {kind:base?'기본':'유사',title:'C 비율로 출력 전압',fig:FIG.accCircuit(),q:`차동 용량식 가속도센서에 ±${Vs} V(1 MHz)를 걸었다. C₁ : C₂ = ${r1} : ${r2}일 때 V_o는?`,first:['V_o = V_s(C₁−C₂)/(C₁+C₂)','작은 쪽을 1로'],
   steps:[{h:'공식',b:`<div class="ln">V_o = V_s × (C₁ − C₂)/(C₁ + C₂)</div><div class="rd">교수님 식 V_o = −V_s + 2V_s·C₁/(C₁+C₂)와 같은 값</div>`},{h:'대입',b:`<div class="ln">${Vs} × (${r1} − ${r2}) ÷ (${r1} + ${r2}) = ${fx(Vo,4)} V</div>`},
    {h:'교수님 식 검산',b:`<div class="ln">−${Vs} + 2×${Vs}×${r1}/(${r1+r2}) = ${fx(-Vs+2*Vs*r1/(r1+r2),4)} V ✓</div>`},{h:'부호 의미',b:`<div class="rd">${Vo>0?'+ → C₁ 쪽으로 움직임':Vo<0?'− → C₂ 쪽으로 움직임':'0 → 가속도 없음'}</div>`}],
   ans:`V_o = ${fx(Vo,4)} V`,ansRead:`${fxR(Vo,4)} 볼트`,calc:calcBlock([[[...ks(Vs),'×','(',...ks(r1),'−',...ks(r2),')','÷','(',...ks(r1),'+',...ks(r2),')','='],fracScreen(Math.round(Vs*(r1-r2)*1000),Math.round((r1+r2)*1000)).s]],[W_SD]),
   easy:'두 콘덴서 크기 차이가 클수록, 질량이 많이 움직인 거예요.'}},
 accelDisp(){const d=pick([1,2,3]),x=pick([0.1,0.2,0.3]),C0=pick([0.5,1,2]),Vs=pick([2,3]);const C1=C0*d/(d-x),C2=C0*d/(d+x),Vo=Vs*(C1-C2)/(C1+C2);
  return {kind:'응용',title:'변위로 C₁·C₂·V_o',q:`정지 시 C₀ = ${C0} {{pF}}, 간격 d = ${d} {{um}}, 변위 x = ${x} μm, V_s = ${Vs} V. C₁, C₂, V_o는?`,first:['C₁ = C₀d/(d−x)','C₂ = C₀d/(d+x)','검산 V_o = V_s·x/d'],
   steps:[{h:'C₁',b:`<div class="ln">${C0} × ${d} ÷ (${d} − ${x}) = ${fx(C1,4)} pF</div><div class="rd">μm끼리 나눠서 단위 변환 불필요</div>`},{h:'C₂',b:`<div class="ln">${C0} × ${d} ÷ (${d} + ${x}) = ${fx(C2,4)} pF</div>`},
    {h:'V_o',b:`<div class="ln">${Vs} × (${fx(C1,4)} − ${fx(C2,4)}) ÷ (${fx(C1,4)} + ${fx(C2,4)}) = ${fx(Vo,4)} V</div>`},{h:'검산 [AI 보충]',b:`<div class="ln">V_s × x/d = ${Vs} × ${x}/${d} = ${fx(Vs*x/d,4)} V ✓</div>`}],
   ans:`C₁ ≈ ${fx(C1,4)} pF, C₂ ≈ ${fx(C2,4)} pF, V_o = ${fx(Vo,4)} V`,ansRead:`${fxR(Vo,4)} 볼트`,calc:calcBlock([[[...ks(Vs),'×',...ks(x),'÷',...ks(d),'='],casioDec(Vs*x/d),'지름길 검산']],[]),
   easy:'간격이 좁아진 쪽은 C가 커지고 넓어진 쪽은 작아져요. 출력은 결국 "얼마나 움직였나(x/d)"에 비례해요.'}},
 noiseDen(base){const sg=base?1:pick([0.5,1,2,3]),S=base?1:pick([0.2,0.5,1,2]),BW=base?100:pick([25,50,100,400]);const nd=sg*1e-3/S/Math.sqrt(BW);
  return {kind:base?'기본':'유사',title:'노이즈 밀도',q:`0 g 출력 잡음 표준편차 ${sg} {{mV}}, 감도 ${S} {{Vg}}, 대역폭 ${BW} {{Hz}}일 때 노이즈 밀도는 몇 {{mgrtHz}}인가?`,first:['σ ÷ S → g','÷ √BW'],
   steps:[{h:'단위 맞추기',b:`<div class="ln">σ = ${sg} mV = ${sg} × 10⁻³ V</div>`},{h:'g로',b:`<div class="ln">${sg}×10⁻³ V ÷ ${S} V/g = ${sciT(sci(sg*1e-3/S))} g = ${fx(sg/S,3)} mg</div>`},{h:'√BW로',b:`<div class="ln">${fx(sg/S,3)} mg ÷ √${BW} = ${fx(sg/S,3)} ÷ ${fx(Math.sqrt(BW),4)} = ${fx(nd*1e3,3)} mg/√Hz</div>`}],
   ans:`${fx(nd*1e3,3)} mg/√Hz`,ansRead:`${fxR(nd*1e3)} 밀리지 퍼 루트헤르츠`,calc:calcBlock([[[...ks(sg),'÷',...ks(S),'÷','√■',...ks(BW),'='],casioDec(nd*1e3),'mg/√Hz (mV ÷ V/g = mg)']],['mV를 V/g로 나누면 바로 mg']),easy:'잡음을 g로 바꾼 뒤, 대역폭의 루트로 나눠 "1 Hz당" 크기로 만들어요.'}},
 zeroG(base){const up=base?1.85:+(pick([1.6,1.75,1.9,2.6]).toFixed(2)),S=base?0.2:pick([0.1,0.2,0.3,0.4]);const z=+(up-S).toFixed(3),dn=+(z-S).toFixed(3);
  return {kind:base?'기본':'유사',title:'Zero-g 출력과 감도',q:`+1 g 방향 출력 ${up} V, 180° 뒤집은 −1 g 출력 ${dn} V이다. Zero-g 출력과 감도는?`,first:['Zero-g = (V₊ + V₋)/2','감도 = (V₊ − V₋)/2'],
   steps:[{h:'Zero-g',b:`<div class="ln">(${up} + ${dn}) ÷ 2 = ${fx(z,4)} V</div>`},{h:'감도',b:`<div class="ln">(${up} − ${dn}) ÷ 2 = ${fx(S,4)} V/g</div><div class="rd">+1 g와 −1 g 차이는 2 g라서 ÷ 2</div>`}],
   ans:`Zero-g ${fx(z,4)} V · 감도 ${fx(S,4)} V/g`,ansRead:`${fxR(z,4)} 볼트`,calc:calcBlock([[['(',...ks(up),'+',...ks(dn),')','÷','2','='],String(z)]],[]),easy:'똑바로 세운 값과 뒤집은 값의 중간이 0 g, 차이의 절반이 1 g당 변화(감도)예요.'}},
 integ(){const a=[pick([0,1,2]),pick([2,3,4]),pick([3,4,5]),pick([2,4,6])],dt=pick([0.1,0.2,0.5]);let v=0;const V=[0];for(let i=1;i<a.length;i++){v+=(a[i-1]+a[i])/2*dt;V.push(+v.toFixed(4))}let s=0;const D=[0];for(let i=1;i<V.length;i++){s+=(V[i-1]+V[i])/2*dt;D.push(+s.toFixed(5))}
  return {kind:'응용',title:'가속도 → 속도 → 거리 (평균값 적분)',q:`가속도센서가 ${dt} s 간격으로 ${a.map(x=>x+' m/s²').join(', ')}을 측정했다(처음 속도 0). 마지막 시점의 속도와 이동 거리는?`,first:['구간 평균 a × Δt = 속도 증가','구간 평균 v × Δt = 거리 증가'],
   steps:[{h:'속도 (구간마다 평균 a × Δt)',b:a.slice(1).map((x,i)=>`<div class="ln">(${a[i]} + ${x})/2 × ${dt} = ${fx((a[i]+x)/2*dt,4)} → v = ${V[i+1]}</div>`).join('')},
    {h:'거리 (구간마다 평균 v × Δt)',b:V.slice(1).map((x,i)=>`<div class="ln">(${V[i]} + ${x})/2 × ${dt} = ${fx((V[i]+x)/2*dt,4)} → s = ${D[i+1]}</div>`).join('')},
    {h:'정확도',b:`<div class="rd">시간 간격을 짧게 할수록 정확 · 오차가 계속 쌓이는 문제 있음(적분 드리프트)</div>`}],
   ans:`v ≈ ${V[V.length-1]} m/s · 거리 ≈ ${D[D.length-1]} m`,ansRead:`${V[V.length-1]} 미터 퍼 세컨드`,calc:'<p class="small muted">구간마다 (앞값+뒷값)÷2×Δt를 계산해 더해 가요.</p>',
   easy:'가속도 막대들의 넓이를 차곡차곡 더하면 속도, 속도 막대 넓이를 더하면 거리예요.'}},
 piezoAccV(){const d=pick([100,200,300]),mg=pick([5,10,20]),g=pick([1,5,10]),C=pick([0.5,1]);const m=mg*1e-3,F=m*g*9.8,q=d*F,V=q/(C*1000);
  return {kind:'응용',title:'압전형 가속도계 출력',q:`d = ${d} {{pCN}}인 압전 소자 위에 ${mg} g의 추가 있다. ${g} g 가속도가 걸리고 소자 정전용량이 ${C} {{nF}}일 때 출력 전압은?`,first:['F = ma','q = d·F','V = q/C'],
   steps:[{h:'힘',b:`<div class="ln">m = ${mg} g = ${m} kg · a = ${g} × 9.8 = ${fx(g*9.8,4)} m/s²</div><div class="ln">F = ${fx(F,4)} N</div>`},{h:'전하',b:`<div class="ln">q = ${d} pC/N × ${fx(F,4)} N = ${fx(q,4)} pC</div>`},{h:'전압',b:`<div class="ln">V = ${fx(q,4)} pC ÷ ${C*1000} pF = ${fx(V,4)} V</div><div class="rd">nF → pF: × 1000 (p끼리 지워짐)</div>`}],
   ans:`V ≈ ${fx(V,4)} V`,ansRead:`${fxR(V,4)} 볼트`,calc:calcBlock([[[...ks(d),'×',...ks(m),'×',...ks(g),'×','9','.','8','÷',...ks(C*1000),'='],casioDec(V)]],[]),easy:'추가 무거울수록, 가속도가 클수록 압전판을 세게 눌러 전압이 커져요. 가만히 있으면 전하가 새어 나가 정적 가속도는 못 재요.'}}
});
PSET.accel=[['gUnit'],['proofX'],['accelVo',true],['accelVo'],['accelDisp'],['noiseDen',true],['zeroG',true],['integ'],['piezoAccV']];
TOPICS.accel={name:'가속도·진동',g:['gUnit','proofX','accelVo','accelDisp','noiseDen','zeroG','integ','piezoAccV']};['gUnit','accelVo','noiseDen','zeroG'].forEach(g=>BASICG.add(g));

PAGES.accel={title:'가속도·진동센서',part:'제3편 4장',secs:[
 {k:'정의',h:'가속도센서란?',b:`<p class="big">가속의 정도를 전기 신호로 바꾸는 센서 — 속도·거리·진동 측정에도 사용</p>
   <div class="flow"><div>가속도 a</div><div>proof mass에 힘 F = ma</div><div>스프링이 늘어 변위 x</div><div>전극 간격 변화 → 정전용량 변화</div><div>전압 ∝ 가속도</div></div>
   <div class="rel">단위 [[gunit|g]]: 1 g = 9.8 m/s² · 자동차 충돌 5~80 g · 노트북 낙하(3 ft) 100~2000 g · 대포 10,000 g</div>
   <div class="appchips"><span>🚗 충돌 감지·에어백</span><span>📱 화면 회전</span><span>📷 손떨림 보정</span><span>🏭 진동 감지</span><span>🧭 항법·유도</span></div>`,
  easy:'버스가 출발하면 몸이 뒤로 쏠리죠. 센서 안의 작은 추도 쏠리고, 쏠린 거리를 전기로 재요.',
  src:'【가속도센서가 가속도 a를 경험하면, 질량체(proof mass)에 힘이 작용한다 … 이 전압은 측정된 가속도에 비례한다】 【1g = 9.8 m/s²】'},
 {k:'이론',h:'질량-스프링-댐퍼',b:`${FIG.springMass()}
   <div class="f4"><div><div class="h">[[hooke|훅의 법칙]]</div><div class="ln">F = kx, k 단위 N/m = kg/s²</div><div class="ln">ma = kx → x = ma/k</div></div><div><div class="h">감쇠(damping)</div>진동 에너지를 소산 → 진동이 줄고 새 평형 위치에서 안정</div></div>`,
  easy:'추가 무거울수록, 스프링이 약할수록 많이 밀려요.'},
 {k:'차동 용량',h:'차동 용량식 — 움직여 보기',b:`<div data-anim="accelC"></div>
   <div class="eqn">C₁ = εA/(d−x),  C₂ = εA/(d+x)<small>x = 0이면 C₁ = C₂ = C₀ = εA/d</small></div>
   <div class="rel mono">Δx ≪ d이면 ΔC = C₁ − C₂ ≈ εA(2Δx)/d²</div>
   <p>[[diffcap|차동 용량식]]: 대부분의 MEMS 가속도센서 방식. 간격 변화(gap) 또는 겹친 면적 변화(area)로 읽어요.</p>
   <button class="ghost" data-goto="cap">↗ 정전용량 원리 (제2편 2장)</button>`,
  easy:'가운데 판이 위로 가면 위 콘덴서는 커지고 아래는 작아져요. 둘의 차이를 재면 작은 움직임도 잘 보여요.',
  src:'【관성질량이 위로 x만큼 변위하면 … 정전용량 C₁은 증가하고, C₂는 감소한다】 【ΔC = εA(2Δx)/d²】'},
 {k:'C → V',h:'정전용량을 전압으로',b:`${FIG.accCircuit()}
   <div class="eqn">V_o = V_s (C₁ − C₂)/(C₁ + C₂)<small>= −V_s + 2V_s·C₁/(C₁+C₂) (교수님 식) · 직렬 C 전압 분배 V_C2 = C_eq·2V_s/C₂</small></div>
   <div class="f4"><div><div class="h">왜 작은 V_s?</div>큰 전압은 큰 정전기력을 만들어 proof mass 위치를 흔들어 놓음</div><div><div class="h">왜 높은 주파수(1 MHz)?</div>dV_s/dt가 매우 커져 proof mass 속도 dx/dt의 영향을 무시할 수 있음</div></div>`,
  easy:'측정 전압이 너무 크면 그 전기 힘이 추를 끌어당겨 버려요. 그래서 작게, 대신 아주 빠르게 바꿔요.',
  src:'【High Vs generates a large electrostatic force which disturbs the position of the proof mass → need to apply a small Vs】'},
 {k:'설계',h:'설계 조건',b:`<ul class="clean"><li>기판: 기생 정전용량 작고 열팽창 계수 낮게</li><li>proof mass: 0.1 g 이하로 가볍게 · 큰 가속도용은 <b>단단한 빔(k↑), 가벼운 m</b></li><li>전극 간격 > 최대 진동 진폭</li><li>좌굴·응력 없게(두꺼운 질량이 응력↓) · 수직 평탄도</li><li>진공 패키징: 공기 감쇠·습도 영향 제거 · DRIE 공정의 scallop 주의</li></ul>`,
  easy:'추가 너무 무거우면 큰 가속도에 부딪히니까, 크게 재려면 가볍고 단단하게 만들어요.'},
 {k:'파라미터',h:'주요 파라미터',b:`<div class="f4"><div><div class="h">감도·범위·선형성</div>감도 [V/g, mV/g] · 측정 범위 [g] 밖이면 왜곡 · 선형성 [%]</div>
    <div><div class="h">[[zerog|Zero-g 출력]]</div><div class="ln">Zero-g = (V₊₁g + V₋₁g)/2,  감도 = (V₊₁g − V₋₁g)/2</div><div class="rd">무중력이 아니라 지구 중력 ±1 g로 측정 · 오프셋·온도·응력으로 벗어남</div></div>
    <div><div class="h">[[noisedens|노이즈 밀도]] (g/√Hz)</div><div class="ln">σ ÷ 감도 ÷ √BW</div><div class="rd">예: 1 mV ÷ 1 V/g ÷ √100 = 0.1 mg/√Hz</div></div>
    <div><div class="h">[[bandwidth|대역폭]]</div>약 40~1000 Hz · 용량식은 스프링·내부 공기 감쇠로 수백 Hz · 사람 동작(10~12 Hz)엔 40~60 Hz면 충분</div>
    <div><div class="h">기타</div>온도 드리프트, 공진 주파수, 충격·진동 내성</div></div>`,
  easy:'세웠다 뒤집었다 해서 0 g 값과 감도를 알아내요. 잡음은 대역폭 루트로 나눠 비교해요.',
  src:'【Zero-g Output = [Output(@+1g) + Output(@−1g)] / 2】 【감도 = 1 V/g, 출력 노이즈 표준편차 = 1 mV, Bandwidth = 100 Hz → 0.1 mg/√Hz】'},
 {k:'3축·적분',h:'3축 가속도계와 속도·거리 구하기',b:`<ul class="clean"><li>3개를 서로 직각으로 → 방향 판단 → [[dof|3 DOF]](앞뒤·위아래·좌우)</li><li>속도: 두 시점의 a를 평균 × 시간차 → 누적 · 거리: 두 시점의 v를 평균 × 시간차 → 누적</li><li>시간 간격을 짧게 할수록 정확</li></ul>`,
  easy:'가속도를 시간만큼 쌓으면 속도, 속도를 쌓으면 거리예요.',
  src:'【Time 1 and Time 2를 결정하고 a의 값을 평균한다 → 평균한 a 값에 시간을 곱하여 속도를 얻는다】'},
 {k:'압전형',h:'압전형 가속도계',b:`<div class="eqn">q = d·F = d·m·a,  V = q/C<small>[[piezoacc|압전형]] · 압전 종효과</small></div>
   <ul class="clean"><li>베이스와 추 사이에 압전 소자 · 구조 간단, 기계적 강도 큼 → 큰 가속도·충격 계측</li><li><b>정적 가속도(DC, 기울기)는 측정 불가</b></li></ul><button class="ghost" data-goto="piezo">↗ 압전 원리 (제2편 5장)</button>`,
  easy:'추가 압전판을 누르는 힘으로 전기를 내요. 계속 같은 힘이면 전하가 새어서 못 재요.'},
 {k:'진동센서',h:'진동센서와 주파수 분석',b:`<div data-anim="fftdemo"></div>
   <ul class="clean"><li>진동 = 평형 위치에 대한 기계적 떨림 · 단위 g · 가속도센서로 측정</li><li>진동센서 = <b>고주파 가속도센서</b>: 대역폭·주파수↑, 잡음↓로 최적화</li><li>측정 범위는 proof mass 최대 진폭이 결정 · 큰 진동용은 가벼운 질량</li><li>시간 영역: 크기·지속 시간·과도 현상 · 주파수 영역([[fft|FFT]]): 성분별 진폭, 잡음 필터링</li></ul>
   <p class="small"><b>[현업]</b> 모터·펌프 베어링 진동의 특정 주파수 증가로 고장을 미리 알아채요(예지보전).</p>`,
  easy:'흔들림을 그대로 보면 복잡하지만, 주파수별로 나누면 "어느 부품이 떨고 있는지"가 보여요.',
  src:'【진동센서는 고주파 가속도 센서라 볼 수 있으며 … bandwidth와 frequency를 높이고 noise를 최소화하는 구조로 최적화】'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'기출·숙제',h:'',b:'__MT:t14,t15__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>F = ma = kx → 변위 → C₁ = εA/(d−x)↑, C₂ = εA/(d+x)↓ → 전압 ∝ a</li><li>V_o = V_s(C₁−C₂)/(C₁+C₂) · 작은 V_s(정전기력↓), 1 MHz(속도 무관)</li><li>Zero-g = (V₊+V₋)/2 · 노이즈 밀도 = σ/S/√BW · 압전형은 정적 가속도 X</li></ol>
   <div class="eyebrow">스스로 점검</div>
   <details class="qa"><summary>큰 가속도를 재려면 k와 m을 어떻게?</summary><div>k↑(단단한 빔), m↓(가벼운 질량) → 변위가 작아 간격을 넘지 않음.</div></details>
   <details class="qa"><summary>진공 패키징이 필요한 이유는?</summary><div>공기 감쇠와 습도 영향이 성능을 크게 제한하기 때문.</div></details>
   <details class="qa"><summary>진동센서와 가속도센서의 차이는?</summary><div>구조·원리는 같고, 진동센서는 고주파·넓은 대역·저잡음으로 최적화.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'ac1',tag:'가속도',f:'가속도센서 측정 흐름',a:'a → F = ma → 변위 x → C 변화 → 전압',r:'',e:''},
 {id:'ac2',tag:'가속도',f:'1 g는?',a:'9.8 m/s²',r:'충돌 5~80 g',e:''},
 {id:'ac3',tag:'가속도',f:'차동 용량식 C₁, C₂',a:'C₁ = εA/(d−x), C₂ = εA/(d+x)',r:'ΔC ≈ εA·2Δx/d²',e:''},
 {id:'ac4',tag:'가속도',f:'가속도센서 출력 전압',a:'V_o = V_s(C₁−C₂)/(C₁+C₂)',r:'= −V_s + 2V_s C₁/(C₁+C₂)',e:''},
 {id:'ac5',tag:'가속도',f:'작은 V_s, 1 MHz를 쓰는 이유',a:'작은 V_s: 정전기력이 질량을 흔들지 않게 · 고주파: 질량 속도 영향 무시',r:'',e:''},
 {id:'ac6',tag:'가속도',f:'Zero-g 출력과 감도',a:'(V₊₁g + V₋₁g)/2 · (V₊₁g − V₋₁g)/2',r:'',e:''},
 {id:'ac7',tag:'가속도',f:'노이즈 밀도 식',a:'σ ÷ 감도 ÷ √BW',r:'1 mV, 1 V/g, 100 Hz → 0.1 mg/√Hz',e:''},
 {id:'ac8',tag:'가속도',f:'압전형 가속도계의 단점',a:'정적(DC) 가속도 측정 불가',r:'q = d·m·a',e:''},
 {id:'ac9',tag:'가속도',f:'진동센서 = ?',a:'고주파 가속도센서 (대역폭↑ 잡음↓ 최적화)',r:'FFT로 주파수 분석',e:''}
);
