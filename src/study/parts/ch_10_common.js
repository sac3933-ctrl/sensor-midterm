/* ═════════ 제1편 센서 공통: signal · char · calib ═════════ */
Object.assign(TERM,{
 sensor:{ko:'센서',en:'Sensor',gen:'바깥 변화를 알아채서 전기 신호로 바꾸는 부품.',tech:'외부 자극(stimulus: 양·특성·상태)을 받아 전기 신호로 변환하는 소자. 넓게는 트랜스듀서의 한 종류.',easy:'사람의 눈·귀·코 역할을 기계에게 해 주는 부품이에요.'},
 stimulus:{ko:'자극',en:'Stimulus',gen:'센서가 재려는 바깥 변화.',tech:'검출·측정하고자 하는 양(quantity), 특성(property), 상태(condition). 측정 대상(measurand)이라고도 한다.',easy:'온도, 가스 농도, 회전처럼 "알고 싶은 것"이에요.'},
 adc:{ko:'아날로그-디지털 변환기',en:'ADC (Analog-to-Digital Converter)',gen:'전압을 숫자로 바꾸는 장치.',tech:'연속 전압을 n비트 디지털 코드로 양자화. 한 칸(LSB) = 기준전압 ÷ 2ⁿ. [AI 보충]',easy:'자로 길이를 재서 "몇 칸"이라고 숫자로 적는 일이에요.'},
 static:{ko:'정특성',en:'Static characteristics',gen:'천천히 변할 때의 성능.',tech:'입력이 일정하거나 천천히 변할 때의 특성: 교정, 감도, 선형성, 정확도, 히스테리시스 등.',easy:'가만히 있는 값을 얼마나 잘 재나.'},
 dynamic:{ko:'동특성',en:'Dynamic characteristics',gen:'빠르게 변할 때의 성능.',tech:'입력이 시간에 따라 변할 때의 응답: 응답시간, 주파수 특성, 장기 안정성.',easy:'갑자기 바뀐 값을 얼마나 빨리 따라가나.'},
 sensitivity:{ko:'감도',en:'Sensitivity',gen:'입력이 조금 변할 때 출력이 얼마나 변하나.',tech:'입력 미소 변화에 대한 출력 미소 변화의 비 S = Δy/Δx. 교정 곡선의 기울기 a.',easy:'저울 눈금이 1 g에 얼마나 많이 움직이는지예요.'},
 drift:{ko:'감도 변동 (드리프트)',en:'Sensitivity drift',gen:'시간이 지나며 감도가 변함.',tech:'교정 곡선 기울기가 시간·환경에 따라 변하는 현상. 원인: 감지물질 상변화, 피독(poison gas), 산화, 부식, 노화, 회로 열화, 열팽창·패키지 응력. 해결: 정기 재교정.',easy:'오래 쓴 저울이 조금씩 틀어지는 것. 그래서 가끔 다시 맞춰요.'},
 resolution:{ko:'분해능',en:'Resolution',gen:'알아챌 수 있는 가장 작은 변화.',tech:'검출 가능한 최소 입력 증분. 분해능 = Noise ÷ Sensitivity. 단위는 입력량 단위.',easy:'자의 가장 작은 눈금 간격 같은 거예요.'},
 mdl:{ko:'측정하한치',en:'MDL (Minimum Detection Limit)',gen:'잴 수 있는 가장 작은 값.',tech:'배경 잡음과 구별해 검출 가능한 최소 입력. 입력이 없을 때 출력 잡음 표준편차 σ의 3배에 해당하는 입력: MDL = 3σ ÷ S.',easy:'시끄러운 방에서 들릴 수 있는 가장 작은 목소리.'},
 linearity:{ko:'선형성',en:'Linearity',gen:'얼마나 곧은 직선인가.',tech:'특성 곡선이 이상적 기준직선에서 벗어난 정도. 최대 출력(또는 입력) 편차 ÷ 정격(full scale) × 100 [%FS].',easy:'자로 그은 선과 실제 선이 얼마나 다른지 %로 나타낸 것.'},
 r2:{ko:'결정계수',en:'R² (Coefficient of determination)',gen:'직선이 데이터를 얼마나 잘 설명하나.',tech:'R² = 1 − Σ(y−ŷ)² ÷ Σ(y−ȳ)². 1에 가까울수록 회귀직선과 데이터 일치. 단위 없음. 0.999 이상이면 매우 우수.',easy:'점들이 직선 위에 얼마나 잘 올라앉아 있는지 0~1 점수.'},
 repeat:{ko:'반복성·재현성',en:'Repeatability · Reproducibility',gen:'다시 재도 같은 값이 나오나.',tech:'반복성: 같은 조건·방법으로 단기간 연속 측정 시 일치 정도. 재현성: 장기간, 다른 사람·실험실에서 측정해도 일치하는 정도.',easy:'같은 사람이 바로 다시 재면 반복성, 다른 날 다른 사람이 재면 재현성.'},
 accuracy:{ko:'정확도',en:'Accuracy',gen:'참값에 얼마나 가까운가.',tech:'측정값 xₘ이 참값 xₜ에 가까운 정도. 오차율 = |xₘ − xₜ| ÷ xₜ × 100, 정확도 = 100 − 오차율 [%].',easy:'과녁 한가운데에 얼마나 가깝게 맞혔나.'},
 precision:{ko:'정밀도',en:'Precision',gen:'여러 번 재도 값이 모이나.',tech:'반복 측정값끼리 흩어짐이 작은 정도. 정확도와 다르다(모여 있지만 참값에서 벗어날 수 있음). [AI 보충]',easy:'화살이 한곳에 모이면 정밀, 그곳이 과녁 중앙이면 정확.'},
 response:{ko:'응답시간·회복시간',en:'Response time · Recovery time',gen:'얼마나 빨리 반응하고 돌아오나.',tech:'응답시간: 포화값의 90 %에 도달하는 시간(t₉₀). 회복시간: 자극 제거 후 원래 값으로 돌아오는 시간(보통 90 % 회복).',easy:'불을 켜면 방이 밝아지기까지 걸리는 시간이에요.'},
 hysteresis:{ko:'히스테리시스',en:'Hysteresis',gen:'올라갈 때와 내려갈 때 값이 다름.',tech:'같은 입력이라도 증가할 때와 감소할 때의 출력이 다른 현상. 최대 차이를 %FS로 표시. [AI 보충]',easy:'계단을 오를 때와 내려올 때 같은 칸이어도 다르게 느끼는 것처럼요.'},
 calibration:{ko:'교정',en:'Calibration',gen:'센서 값을 참값에 맞추는 일.',tech:'알려진 입력을 넣어 입력-출력 관계(교정 곡선)를 세우는 과정. 보통 최소자승법으로 y = ax + b를 구한다.',easy:'새 저울에 1 kg 추를 올려 눈금을 맞추는 일이에요.'},
 lsq:{ko:'최소자승법',en:'Least squares method',gen:'점들에 가장 잘 맞는 직선 찾기.',tech:'각 점의 오차 eᵢ = yᵢ − (axᵢ + b)의 제곱합이 최소가 되는 a, b를 구한다. 행렬식: p = (XᵀX)⁻¹Xᵀy.',easy:'점들 사이로 자를 놓되, 모든 점과의 거리(제곱)가 가장 작아지게 놓는 방법.'},
 fs:{ko:'풀 스케일',en:'FS (Full Scale)',gen:'센서가 잴 수 있는 최대 범위.',tech:'정격 입력(또는 출력) 범위. 선형성·정확도를 %FS로 표시할 때의 기준.',easy:'자의 전체 길이예요.'},
 snr:{ko:'신호 대 잡음비',en:'SNR (Signal-to-Noise Ratio)',gen:'신호가 잡음보다 얼마나 큰가.',tech:'신호 크기 ÷ 잡음 크기. 분해능·MDL 계산의 바탕.',easy:'시끄러운 곳에서 내 목소리가 얼마나 또렷한가.'}
});
Object.assign(UNIT,{
 FSu:{s:'%FS',r:'퍼센트 풀스케일',mean:'전체 측정 범위(Full Scale)에 대한 백분율'},
 ppb:{s:'ppb',r:'피피비 (십억분율)',mean:'10억분의 1 = 10⁻⁹. 가스센서 MDL 예: 1 ppb'},
 mVppm:{s:'mV/ppm',r:'밀리볼트 퍼 피피엠',mean:'감도 단위 예. 1 ppm 변할 때 출력이 몇 mV 변하나'},
 mV:{s:'mV',r:'밀리볼트',mean:'1 mV = 10⁻³ V'}, uV:{s:'μV',r:'마이크로볼트',mean:'1 μV = 10⁻⁶ V'}, mA:{s:'mA',r:'밀리암페어',mean:'1 mA = 10⁻³ A'}, uA:{s:'μA',r:'마이크로암페어',mean:'1 μA = 10⁻⁶ A'}, A:{s:'A',r:'암페어',mean:'전류의 단위'}, kPa:{s:'kPa',r:'킬로파스칼',mean:'1 kPa = 10³ Pa'},
 bit:{s:'bit',r:'비트',mean:'ADC 해상도. n비트 → 2ⁿ 칸'}
});

/* ── 그림 ── */
Object.assign(FIG,{
 system(){const bx=(x,w,t1,t2,c)=>`<rect x="${x}" y="60" width="${w}" height="52" rx="8" style="fill:${c};stroke:var(--ink);stroke-width:1.5"/>${tx(x+w/2,82,t1,'b2','middle')}${tx(x+w/2,100,t2,'small2','middle')}`;
  return svgFig(340,190,`${tx(30,40,'자극','b2','middle')}${tx(30,56,'온도·가스…','m small2','middle')}${ar(30,62,30,80,'i',1.6)}
   ${bx(4,60,'센서','감지부','var(--warn-soft)')}${ar(64,86,80,86)}${bx(82,78,'신호 처리','증폭·필터','var(--surface)')}${ar(160,86,176,86)}${bx(178,56,'ADC','숫자로','var(--unit-soft)')}${ar(234,86,250,86)}${bx(252,82,'제어·통신','PLC·MCU','var(--accent-soft)')}
   ${ar(34,150,34,116,'b',1.6,'d')}${tx(34,166,'외부 간섭: 온도·습도·진동·빛·전자기파','b small2')}
   ${ar(121,150,121,116,'m',1.6,'d')}${tx(140,182,'구동 전압·전원','m small2','middle')}`,'센서 시스템 구조',
   '자극 → <b>센서</b>(물리 변화 → 전기 변화) → <b>신호 처리</b> → <b>ADC</b> → <b>제어·통신</b>. 바깥 간섭과 구동 전압도 함께 들어와요.')},
 calplot(){return svgFig(340,210,`
   ${ar(40,180,320,180,'i',1.5)}${ar(40,180,40,16,'i',1.5)}${tx(316,198,'입력 x','small2','end')}${tx(46,18,'출력 y','small2')}
   <line x1="40" y1="166" x2="300" y2="40" style="stroke:var(--accent);stroke-width:2.4"/>
   ${[[80,140],[130,124],[180,96],[230,78],[280,52]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" style="fill:var(--ink)"/>`).join('')}
   <path d="M180 101 H230 V77" style="fill:none;stroke:var(--bad);stroke-width:2;stroke-dasharray:4 3"/>${tx(205,118,'Δx','b b2','middle')}${tx(238,94,'Δy','b b2')}
   ${tx(150,40,'y = ax + b','a b2')}${tx(150,58,'기울기 a = 감도 S = Δy/Δx','a small2')}
   ${tx(44,176,'b','m small2')}`,'교정 곡선과 감도')},
 respCurve(){let d='M40 170';for(let i=0;i<=120;i++){const t=i/120*7;const y=t<0.5?0:(t<4?1-Math.exp(-(t-0.5)/0.6):Math.exp(-(t-4)/0.9)*(1-Math.exp(-3.5/0.6)));d+=` L${40+i*2.3} ${(170-130*y).toFixed(1)}`}
  const x90=40+(0.5+0.6*Math.log(10))/7*276;
  return svgFig(340,215,`${ar(40,170,326,170,'i',1.5)}${ar(40,170,40,20,'i',1.5)}${tx(322,188,'시간','small2','end')}${tx(46,20,'출력','small2')}
   <path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>
   <line x1="40" y1="40" x2="326" y2="40" style="stroke:var(--muted);stroke-dasharray:3 3"/>${tx(322,36,'포화값 100 %','m small2','end')}
   <line x1="40" y1="53" x2="${x90}" y2="53" style="stroke:var(--bad);stroke-dasharray:3 3"/>${tx(44,66,'90 %','b small2')}
   <line x1="${x90}" y1="53" x2="${x90}" y2="170" style="stroke:var(--bad);stroke-dasharray:3 3"/>
   ${ar(60,196,x90,196,'b',1.6,'2')}${tx((60+x90)/2,210,'응답시간 t₉₀','b small2','middle')}
   ${tx(60,186,'가스 ON','small2','middle')}${tx(198,186,'가스 OFF','small2','middle')}${tx(262,120,'회복','u small2')}`,'응답시간과 회복시간',
   '가스를 넣은 순간부터 <b>포화값의 90 %</b>에 닿는 시간이 응답시간이에요. 가스를 빼면 원래로 돌아오는 시간이 회복시간.')},
 accPrec(){const tgt=(cx,lb,pts)=>`<circle cx="${cx}" cy="80" r="44" style="fill:var(--surface);stroke:var(--line);stroke-width:2"/><circle cx="${cx}" cy="80" r="28" style="fill:none;stroke:var(--line);stroke-width:2"/><circle cx="${cx}" cy="80" r="10" style="fill:var(--bad);opacity:.25"/>${pts.map(([x,y])=>`<circle cx="${cx+x}" cy="${80+y}" r="3.5" style="fill:var(--ink)"/>`).join('')}${tx(cx,144,lb,'small2','middle')}`;
  return svgFig(340,155,`${tgt(58,'정확 ○ 정밀 ○',[[2,1],[-3,2],[1,-3],[3,3],[-1,-1]])}${tgt(170,'정확 ✕ 정밀 ○',[[24,-20],[28,-16],[22,-14],[26,-22],[30,-18]])}${tgt(282,'정확 ✕ 정밀 ✕',[[30,-20],[-25,10],[5,30],[-20,-28],[18,22]])}`,'정확도와 정밀도 [AI 보충]',
   '정확도 = 과녁 중심(참값)에 가까운가 · 정밀도 = 화살끼리 모여 있는가 [AI 보충]')}
});

/* ── 움직이는 그림: 최소자승 직접 맞춰 보기 ── */
ANIM.lsq=host=>{const P=[[1,4],[2,6],[3,7]];let a=1,b=3;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 220" role="img" aria-label="최소자승 직선 맞추기"></svg>
   <div class="figctl"><label class="small">기울기 a <input type="range" min="0" max="3" step="0.05" value="1" data-a style="width:110px"></label><label class="small">절편 b <input type="range" min="0" max="6" step="0.05" value="3" data-b style="width:110px"></label><button class="tbtn" data-best>최적 직선</button></div>
   <div class="tofcalc mono small" data-o></div>
   <figcaption>슬라이더로 직선을 움직여 보세요. 빨간 선(오차)의 <b>제곱의 합</b>이 가장 작아지는 a, b가 최소자승 답이에요 (a = 1.5, b ≈ 2.667).</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const X=x=>40+x*80,Y=y=>200-y*22;
  const draw=()=>{let sse=0;const segs=P.map(([x,y])=>{const yf=a*x+b;sse+=(y-yf)**2;return `<line x1="${X(x)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(yf)}" style="stroke:var(--bad);stroke-width:2.4"/>`}).join('');
   svg.innerHTML=`<line x1="40" y1="200" x2="330" y2="200" style="stroke:var(--ink)"/><line x1="40" y1="200" x2="40" y2="10" style="stroke:var(--ink)"/>
    ${[1,2,3].map(x=>`<text x="${X(x)}" y="214" text-anchor="middle" class="small2">${x}</text>`).join('')}${[2,4,6,8].map(y=>`<text x="34" y="${Y(y)+4}" text-anchor="end" class="small2">${y}</text>`).join('')}
    <line x1="${X(0)}" y1="${Y(b)}" x2="${X(3.6)}" y2="${Y(a*3.6+b)}" style="stroke:var(--accent);stroke-width:2.4"/>${segs}
    ${P.map(([x,y])=>`<circle cx="${X(x)}" cy="${Y(y)}" r="6" style="fill:var(--ink)"/>`).join('')}`;
   q('[data-o]').innerHTML=`y = ${a.toFixed(2)}x + ${b.toFixed(2)}<br>오차 제곱합 Σe² = <b>${sse.toFixed(3)}</b>${sse<0.1675?' ✓ 최소':''}`};
  q('[data-a]').oninput=e=>{a=+e.target.value;draw()};q('[data-b]').oninput=e=>{b=+e.target.value;draw()};
  q('[data-best]').onclick=()=>{a=1.5;b=8/3;q('[data-a]').value=a;q('[data-b]').value=b;draw()};draw();return null};

/* ── 문제 생성기 ── */
const W_STAT='통계 모드: [MODE] [3](STAT) [2](A+BX) → x, y 입력 → [AC] → [SHIFT] [1](STAT) [5](Reg)';
Object.assign(GEN,{
 sensAvg(base){let x1,x2,k;if(base){k=2;x1=2;x2=4}else{k=pick([1,2,3,0.5]);x1=pick([1,2,3]);x2=x1+pick([1,2,3])}const y1=k*x1*x1,y2=k*x2*x2,Sa=(y2-y1)/(x2-x1),xi=x2;
  return {kind:base?'기본':'유사',title:'평균 감도와 순간 감도',
   q:`비선형 센서의 출력이 Y = ${k}X² 이다. (1) X = ${x1} ~ ${x2} 구간의 평균 감도, (2) X = ${xi}에서의 순간 감도를 구하라.`,
   first:['평균 = ΔY/ΔX','순간 = 접선 기울기 dY/dX = 2kX'],
   steps:[{h:'두 점의 Y',b:`<div class="ln">X = ${x1} → Y = ${k} × ${x1}² = ${y1}</div><div class="ln">X = ${x2} → Y = ${k} × ${x2}² = ${y2}</div>`},
    {h:'평균 감도',b:`<div class="ln">S = (${y2} − ${y1}) ÷ (${x2} − ${x1}) = ${fx(Sa,4)}</div><div class="rd">두 점을 이은 직선의 기울기</div>`},
    {h:'순간 감도',b:`<div class="ln">dY/dX = 2 × ${k} × X = ${2*k}X</div><div class="ln">X = ${xi} → ${fx(2*k*xi,4)}</div><div class="rd">X²을 미분하면 2X (그 점에서 접선의 기울기)</div>`},
    {h:'검산',b:`<div class="rd">곡선이 위로 휘니까 오른쪽 끝의 순간 감도(${fx(2*k*xi,4)})가 평균(${fx(Sa,4)})보다 큼 ✓</div>`}],
   ans:`평균 ${fx(Sa,4)} · 순간 ${fx(2*k*xi,4)}`,ansRead:`평균 감도 ${fxR(Sa,4)}`,
   calc:calcBlock([[['(',...ks(y2),'−',...ks(y1),')','÷','(',...ks(x2),'−',...ks(x1),')','='],casioDec(Sa),'평균 감도']],['분자·분모를 각각 괄호로']),
   easy:'곡선은 곳마다 기울기가 달라요. 두 점 사이를 자로 이으면 평균, 한 점에 자를 딱 대면 순간 기울기예요.'}},
 resol(){const S=pick([0.5,1.2,2,5,8]),noise=pick([0.1,0.2,0.5,1,2]),unitOut=pick(['mV','μA']),inU=pick(['ppm','°C','kPa']);const R=noise/S,M=3*noise/S;
  return {kind:'응용',title:'분해능과 측정하한치',
   q:`감도가 ${S} ${unitOut}/${inU}인 센서의 출력 잡음(표준편차)이 ${noise} ${unitOut}이다. (1) 분해능 (2) [[mdl|측정하한치 MDL]]은?`,
   first:['분해능 = Noise ÷ S','MDL = 3σ ÷ S','답의 단위 = 입력 단위'],
   steps:[{h:'단위부터 보기',b:`<div class="ln">${unitOut} ÷ (${unitOut}/${inU}) = ${inU}</div><div class="rd">출력 단위끼리 지워지고 입력 단위(${inU})가 남아요</div>`},
    {h:'분해능',b:`<div class="ln">${noise} ÷ ${S} = ${fx(R,3)} ${inU}</div>`},
    {h:'MDL',b:`<div class="ln">3 × ${noise} ÷ ${S} = ${fx(M,3)} ${inU}</div><div class="rd">잡음의 3배는 넘어야 "진짜 신호"로 인정</div>`},
    {h:'검산',b:`<div class="rd">MDL = 분해능 × 3 ✓ · 감도가 클수록, 잡음이 작을수록 더 작은 값까지 잼</div>`}],
   ans:`분해능 ${fx(R,3)} ${inU} · MDL ${fx(M,3)} ${inU}`,ansRead:`${fxR(M)} ${inU}`,
   calc:calcBlock([[[...ks(noise),'÷',...ks(S),'='],casioDec(R),'분해능'],[['×','3','='],casioDec(M),'MDL']],['분수로 나오면 [S⇔D]']),
   easy:'잡음이 0.5만큼 늘 흔들리면, 그보다 작은 변화는 잡음에 묻혀 안 보여요. 확실히 보려면 잡음의 3배는 돼야 해요.'}},
 accur(base){const xt=base?10:pick([5,10,20,50,100]),dev=base?0.5:pick([0.2,0.4,0.5,1,1.5,2])*(Math.random()<.5?1:-1)*xt/10;const xm=+(xt+dev).toFixed(2),er=Math.abs(xm-xt)/xt*100;
  return {kind:base?'기본':'유사',title:'오차율과 정확도',
   q:`${xt} ppm 가스를 넣었는데 센서가 ${xm} ppm을 표시했다(교정 곡선 = 참값). 오차율과 정확도는?`,
   first:['오차율 = |xₘ − xₜ| ÷ xₜ × 100','정확도 = 100 − 오차율'],
   steps:[{h:'참값과 측정값 구분',b:`<div class="ln">xₜ(참값) = ${xt} ppm · xₘ(측정값) = ${xm} ppm</div>`},
    {h:'차이',b:`<div class="ln">|${xm} − ${xt}| = ${fx(Math.abs(xm-xt),3)} ppm</div>`},
    {h:'오차율',b:`<div class="ln">${fx(Math.abs(xm-xt),3)} ÷ ${xt} × 100 = ${fx(er,3)} %</div><div class="rd">⚠ 나누는 값은 참값 xₜ</div>`},
    {h:'정확도',b:`<div class="ln">100 − ${fx(er,3)} = ${fx(100-er,4)} %</div>`}],
   ans:`오차율 ${fx(er,3)} % · 정확도 ${fx(100-er,4)} %`,ansRead:`정확도 ${fxR(100-er,4)} 퍼센트`,
   calc:calcBlock([[['Abs','(',...ks(xm),'−',...ks(xt),')','÷',...ks(xt),'×','1','0','0','='],casioDec(er),'Abs = [SHIFT] [hyp] 또는 그냥 큰 값에서 작은 값 빼기']],['절댓값 키가 헷갈리면 큰 수 − 작은 수로 계산']),
   easy:'10을 재야 하는데 10.5가 나오면 0.5만큼(5 %) 틀린 거예요. 100점에서 5점 깎여 95점.'}},
 linear(){const FS=pick([100,200,500,1000]),dev=pick([0.5,1,1.2,2,3,4]);const L=dev/FS*100;const u=pick(['mV','kPa','ppm']);
  return {kind:'응용',title:'선형성 %FS',q:`정격 출력(풀 스케일)이 ${FS} ${u}인 센서에서 기준직선과의 최대 출력 편차가 ${dev} ${u}였다. 선형성은 몇 {{FSu}}인가?`,
   first:['선형성 = 최대 편차 ÷ 정격 × 100'],
   steps:[{h:'공식',b:`<div class="ln">선형성 = 최대 출력 편차 ÷ 정격 출력 × 100 [%FS]</div>`},{h:'계산',b:`<div class="ln">${dev} ÷ ${FS} × 100 = ${fx(L,3)} %FS</div><div class="rd">같은 단위(${u})끼리 나눠서 단위가 지워져요</div>`},{h:'해석',b:`<div class="rd">작을수록 직선에 가까움. R²(단위 없음)과 달리 %FS로 표시</div>`}],
   ans:`${fx(L,3)} %FS`,ansRead:`${fxR(L)} 퍼센트 풀스케일`,calc:calcBlock([[[...ks(dev),'÷',...ks(FS),'×','1','0','0','='],casioDec(L)]],[]),
   easy:'100 cm 자에서 1 cm 휘어 있으면 1 %FS예요.'}},
 t90(){const tau=pick([2,3,5,8,12,20]);const t=tau*Math.log(10);
  return {kind:'응용',title:'시정수로 응답시간 구하기 [AI 보충]',q:`센서 응답이 y = 1 − e^(−t/τ) 모양이고 시정수 τ = ${tau} {{s}}이다. 응답시간 t₉₀(90 % 도달)은?`,
   first:['0.9 = 1 − e^(−t/τ)','t₉₀ = τ × ln 10 ≈ 2.303τ'],
   steps:[{h:'90 % 조건',b:`<div class="ln">0.9 = 1 − e^(−t/τ) → e^(−t/τ) = 0.1</div>`},{h:'ln 씌우기',b:`<div class="ln">−t/τ = ln 0.1 = −2.303 → t = 2.303 τ</div><div class="rd">ln(자연로그)은 e의 지수를 꺼내는 도구</div>`},
    {h:'계산',b:`<div class="ln">t₉₀ = 2.303 × ${tau} = ${fx(t,4)} s</div>`},{h:'검산',b:`<div class="rd">τ에서는 63 %, 2.3τ에서 90 % ✓</div>`}],
   ans:`t₉₀ ≈ ${fx(t,4)} s`,ansRead:`${fxR(t,4)} 초`,calc:calcBlock([[[...ks(tau),'×','ln','1','0',')','='],casioDec(t),'ln 키 사용']],['[ln]은 자연로그, [log]는 상용로그(밑 10) — 다른 키']),
   easy:'시정수 τ 하나만 알면 90 %까지 걸리는 시간은 τ의 약 2.3배예요.'}},
 adc(){const n=pick([8,10,12,16]),Vr=pick([3.3,5]),Vin=+(Vr*pick([0.13,0.25,0.4,0.62,0.87])).toFixed(2);const L=Vr/2**n,code=Math.floor(Vin/L);
  return {kind:'응용',title:'ADC 한 칸 크기 [AI 보충]',q:`기준전압 ${Vr} {{V}}, ${n}{{bit}} ADC가 있다. (1) 한 칸(LSB)은 몇 {{mV}}? (2) 입력 ${Vin} V는 몇 번째 칸(코드)으로 읽히나?`,
   first:['칸 수 = 2ⁿ','LSB = Vref ÷ 2ⁿ','V → mV: × 1000'],
   steps:[{h:'칸 수',b:`<div class="ln">2^${n} = ${2**n}</div>`},{h:'한 칸 크기',b:`<div class="ln">${Vr} ÷ ${2**n} = ${sciT(sci(L,3))} V = ${fx(L*1000,4)} mV</div>`},
    {h:'코드',b:`<div class="ln">${Vin} ÷ ${sciT(sci(L,3))} = ${fx(Vin/L,5)} → 소수 버림 → ${code}</div>`},{h:'검산',b:`<div class="rd">비트가 1 늘면 칸이 절반 → 더 세밀 ✓</div>`}],
   ans:`LSB ≈ ${fx(L*1000,4)} mV · 코드 ${code}`,ansRead:`${fxR(L*1000,4)} 밀리볼트`,
   calc:calcBlock([[[...ks(Vr),'÷','2','x■',...ks(n),'▶','='],casioDec(L),'V'],[['×','1','0','0','0','='],casioDec(L*1000),'mV']],['[x■]로 지수를 넣고 [▶]로 나오기']),
   easy:`${Vr} V 자를 ${2**n}칸으로 나눈 것 중 한 칸의 크기예요.`}},
 lsq(base){let P;if(base)P=[[1,4],[2,6],[3,7]];else{for(;;){const x0=pick([1,2,3]),dx=pick([1,2]),a=pick([1,1.5,2,2.5,3]),b=pick([0,1,2,3,5]);P=[0,1,2].map(i=>{const x=x0+dx*i;return [x,+(a*x+b+pick([-1,-0.5,0,0.5,1])).toFixed(1)]});const xs=P.map(p=>p[0]);if(new Set(P.map(p=>p[1])).size===3)break}}
  const N=P.length,sx=P.reduce((s,p)=>s+p[0],0),sy=+P.reduce((s,p)=>s+p[1],0).toFixed(4),sxx=P.reduce((s,p)=>s+p[0]**2,0),sxy=+P.reduce((s,p)=>s+p[0]*p[1],0).toFixed(4);
  const det=N*sxx-sx*sx,a=(N*sxy-sx*sy)/det,b=(sxx*sy-sx*sxy)/det,yb=sy/N,res=P.reduce((s,p)=>s+(p[1]-a*p[0]-b)**2,0),tot=P.reduce((s,p)=>s+(p[1]-yb)**2,0),R2=1-res/tot;
  const mx=r=>`<span class="mx2">${r.map(row=>`<span>${row.join('&nbsp;&nbsp;')}</span>`).join('')}</span>`;
  return {kind:base?'기본':'유사',title:'최소자승법 — 행렬로 a, b 구하기',fig:FIG.pLsq(P),
   q:`센서 측정값 ${P.map(p=>`(${p[0]}, ${p[1]})`).join(', ')}에 대해 [[lsq|최소자승법]]으로 y = ax + b를 구하고 R²를 구하라.`,
   first:['Xp = y','p = (XᵀX)⁻¹Xᵀy','XᵀX = [[Σx², Σx],[Σx, N]]'],
   steps:[{h:'행렬로 쓰기',b:`<div class="ln">X = ${mx(P.map(p=>[p[0],1]))}  p = ${mx([['a'],['b']])}  y = ${mx(P.map(p=>[p[1]]))}</div>`},
    {h:'합 구하기',b:`<div class="ln">Σx = ${sx}, Σy = ${sy}, Σx² = ${sxx}, Σxy = ${sxy}, N = ${N}</div>`},
    {h:'XᵀX 와 Xᵀy',b:`<div class="ln">XᵀX = ${mx([[sxx,sx],[sx,N]])}  Xᵀy = ${mx([[sxy],[sy]])}</div>`},
    {h:'역행렬',b:`<div class="ln">det = ${sxx}×${N} − ${sx}×${sx} = ${det}</div><div class="ln">(XᵀX)⁻¹ = (1/${det}) × ${mx([[N,-sx],[-sx,sxx]])}</div><div class="rd">2×2 역행렬: 대각선 자리 바꾸고, 나머지 부호 바꾸고, det로 나누기</div>`},
    {h:'p 계산',b:`<div class="ln">a = (${N}×${sxy} − ${sx}×${sy}) ÷ ${det} = ${fx(a,4)}</div><div class="ln">b = (${sxx}×${sy} − ${sx}×${sxy}) ÷ ${det} = ${fx(b,4)}</div>`},
    {h:'R²',b:`<div class="ln">ȳ = ${fx(yb,4)} · Σ(y−ŷ)² = ${fx(res,4)} · Σ(y−ȳ)² = ${fx(tot,4)}</div><div class="ln">R² = 1 − ${fx(res,4)} ÷ ${fx(tot,4)} = ${R2.toFixed(4)}</div>`}],
   ans:`y = ${fx(a,4)}x ${b<0?'−':'+'} ${fx(Math.abs(b),4)} · 감도 ${fx(a,4)} · R² = ${R2.toFixed(4)}`,ansRead:`기울기 ${fxR(a,4)}`,
   calc:calcBlock([[['MODE','3','2'],'STAT A+BX','통계 모드'],[[...P.flatMap(p=>[...ks(p[0]),'='])],'x 열 입력'],[['▶','▲','▲'],'y 열 맨 위로','커서 이동'],[[...P.flatMap(p=>[...ks(p[1]),'='])],'y 열 입력'],[['AC','SHIFT','1','5','1','='],casioDec(b),'A = 절편 b !'],[['AC','SHIFT','1','5','2','='],casioDec(a),'B = 기울기 a !'],[['AC','SHIFT','1','5','3','x²','='],R2.toFixed(9).replace(/0+$/,''),'r² = R²']],[W_STAT,'⚠ 카시오의 A+BX에서 A는 절편, B는 기울기 — 강의의 a, b와 이름이 반대!']),
   easy:'세 점 사이로 자를 놓되, 점마다 자까지의 세로 거리를 제곱해서 더한 값이 가장 작게 놓는 거예요.'}}
});
Object.assign(FIG,{pLsq(P){const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]);const x1=Math.min(...xs)-1,x2=Math.max(...xs)+1,y1=0,y2=Math.max(...ys)+2;const X=x=>40+(x-x1)/(x2-x1)*280,Y=y=>140-(y-y1)/(y2-y1)*120;
  return svgFig(340,160,`<line x1="40" y1="140" x2="326" y2="140" style="stroke:var(--ink)"/><line x1="40" y1="140" x2="40" y2="12" style="stroke:var(--ink)"/>${P.map(([x,y])=>`<circle cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="5" style="fill:var(--ink)"/><text x="${X(x).toFixed(1)}" y="${(Y(y)-9).toFixed(1)}" text-anchor="middle" class="small2">(${x}, ${y})</text>`).join('')}${tx(320,156,'x','small2','end')}${tx(46,14,'y','small2')}`,'측정점 그림')}});

PSET.char=[['sensAvg',true],['sensAvg'],['resol'],['accur',true],['accur'],['linear'],['t90']];
PSET.calib=[['lsq',true],['lsq'],['lsq']];
PSET.signal=[['adc']];
TOPICS.char={name:'센서 특성',g:['sensAvg','resol','accur','linear','t90']};
TOPICS.calib={name:'최소자승',g:['lsq']};
['sensAvg','accur','lsq'].forEach(g=>BASICG.add(g));

/* ── 본문 ── */
PAGES.signal={title:'센서와 신호의 흐름',part:'제1편 1장',secs:[
 {k:'정의',h:'센서란?',b:`<p class="big">바깥의 <b>자극</b>을 받아 <b>전기 신호</b>로 바꾸는 소자</p>
   <div class="rel">[[stimulus|자극]] = 재고 싶은 양·특성·상태 (온도, 가스 농도, 회전, 거리…) · 센서는 [[transducer]]의 한 종류</div>
   <p>사람의 오감은 자극의 세기·양·성분을 정확히 구분하지 못해요. 센서는 그것을 <b>숫자로</b> 알려 줘요.</p>`,
  easy:'센서는 기계의 감각 기관이에요. "덥다"가 아니라 "25.3 °C"처럼 숫자로 말해 줘요.',
  src:'【센서: 외부 자극(stimulus)을 받아 이를 전기 신호로 변환하는 소자 (센서는 transducer이다)】'},
 {k:'시스템 구조',h:'센서 시스템의 흐름',b:`${FIG.system()}
   <div class="flow"><div>물리량 (온도·가스·회전…)</div><div>센서: 물리 변화 → 전기 변화</div><div>신호 처리: 증폭·필터</div><div>[[adc|ADC]]: 전압 → 숫자</div><div>제어기 (PLC·MCU) → 네트워크 → 데이터베이스·AI</div></div>
   <p class="small"><b>[현업]</b> 공장에서는 이 숫자가 PLC → SCADA → MES·Historian으로 올라가 품질·설비 관리에 쓰여요.</p>`,
  easy:'센서가 느끼고 → 회로가 키우고 다듬고 → ADC가 숫자로 적고 → 컴퓨터가 판단해요.'},
 {k:'출력 종류',h:'센서는 무엇을 바꾸나',b:`<div class="tblwrap"><table><tr><th>전기적 변화</th><th>센서 예</th></tr>
   <tr><td>저항</td><td>반도체 가스센서, 서미스터, 스트레인 게이지</td></tr><tr><td>전압</td><td>홀 센서, 열전대</td></tr><tr><td>전류</td><td>전기화학 가스센서, 포토다이오드</td></tr>
   <tr><td>정전용량</td><td>MEMS 가속도·자이로, 습도</td></tr><tr><td>주파수</td><td>RLG, 공진형 센서</td></tr><tr><td>전하</td><td>압전 센서</td></tr><tr><td>디지털</td><td>I²C·SPI 출력 스마트 센서</td></tr></table></div>
   <div class="key">어느 센서든 "물리량 → 물리 변화 → <b>전기적 변화</b>" 세 칸으로 정리하면 이해가 쉬워요.</div>`,
  easy:'센서마다 바뀌는 전기 성질이 달라요. 저항이 바뀌는 것, 전압이 생기는 것, 전하가 생기는 것…'},
 {k:'센서 시장',h:'왜 센서가 중요한가',b:`<ul class="clean"><li><b>Physical AI</b>: 상황 인식 → 판단 → 행동. 센서가 입력을 제공</li><li><b>Trillion sensor</b>: 센서 수요 1조(10¹²) 개 시대 · 스마트폰 수십 개, 자동차 수백 개</li><li>가장 큰 시장: CMOS 이미지센서 (Sony 약 50 %, 삼성 약 15 %)</li><li>진입 장벽: 감도·선택성·신뢰성·내환경성을 동시에 만족해야 함</li></ul>`,
  easy:'자율주행차, 로봇, 스마트폰이 모두 센서로 세상을 봐요. 그래서 센서가 엄청 많이 필요해요.',
  src:'【센서 수요가 1조(10¹²) 개 규모로 확대되는 시대】 【감도, 선택성, 신뢰성, 내환경성 등 다양한 성능을 동시에 만족해야】'},
 {k:'특성 개요',h:'정특성 vs 동특성',b:`<div class="tblwrap"><table><tr><th>[[static]]</th><th>[[dynamic]]</th></tr><tr><td>입력이 일정하거나 천천히 변할 때</td><td>입력이 시간에 따라 변할 때</td></tr>
   <tr><td>교정, 감도, 선형성, 정확도, 히스테리시스, 분해능, MDL</td><td>응답시간, 주파수 특성, 장기 안정성</td></tr></table></div>
   <button class="ghost" data-goto="char">↗ 센서 특성 자세히 (제1편 2장)</button>`},
 {k:'문제',h:'',b:'__PROBS__'}
]};
PAGES.char={title:'센서 특성',part:'제1편 2장',secs:[
 {k:'감도',h:'감도 — 기울기',b:`${FIG.calplot()}
   <div class="eqn">S = Δy / Δx<small>"에스는 델타 와이 나누기 델타 엑스" · 교정 곡선의 기울기 a</small></div>
   <div class="f4"><div><div class="h">비선형일 때 3가지</div><ul class="clean"><li><b>순간 감도</b>: 그 점의 접선 기울기 dY/dX. Y = 2X² → X=1: 4, X=2: 8, X=3: 12</li><li><b>평균 감도</b>: 구간 평균. (2, 8)~(4, 32) → (32−8)/(4−2) = 12</li><li><b>선형화 감도</b>: 전체를 직선으로 근사한 기울기</li></ul></div></div>`,
  easy:'감도는 "얼마나 예민한가"예요. 입력이 1 변할 때 출력이 많이 변할수록 감도가 커요.',
  src:'【입력신호의 미소 변화에 대한 출력신호의 미소 변화의 비율】 【Calibration plot에서 기울기(S)는 감도이다】'},
 {k:'드리프트',h:'감도 변동 (드리프트)',b:`<p>[[drift]]: 시간·환경에 따라 교정 곡선의 <b>기울기가 변하는</b> 현상 → 신뢰성 저하</p>
   <div class="f4"><div><div class="h">원인</div><ul class="clean"><li>감지 물질: 상변화, 피독(poison gas) 흡착, 산화, 부식, 노화</li><li>회로: 증폭기·ADC·기준전압의 장기 열화</li><li>패키지: 열팽창, 응력</li></ul></div><div><div class="h">해결</div>정기적인 <b>재교정(re-calibration)</b>으로 현재 감도를 다시 재고 교정 곡선을 갱신</div></div>`,
  easy:'오래 쓴 체중계가 조금씩 틀어지듯, 센서도 늙어요. 그래서 가끔 다시 맞춰 줘야 해요.',
  src:'【Sensitivity Drift는 정기적인 Re-calibration을 통해 센서의 현재 감도 특성을 재평가】'},
 {k:'분해능·MDL',h:'분해능과 측정하한치',b:`<div class="f4"><div><div class="h">[[resolution]]</div><div class="ln">분해능 = Noise ÷ Sensitivity</div><div class="rd">단위 = 입력 단위 · 예: 0.01 °C까지 구분하면 분해능 0.01 °C</div></div>
    <div><div class="h">[[mdl]]</div><div class="ln">MDL = 3σ ÷ S</div><div class="rd">입력이 없을 때 출력 잡음 표준편차 σ의 3배 · 예: 가스센서 1 ppb</div></div></div>
   <div class="key">둘 다 <b>잡음 ÷ 감도</b> 모양이고, 답의 단위는 <b>입력 단위</b>예요.</div>`,
  easy:'잡음이 늘 조금씩 흔들리면 그보다 작은 변화는 묻혀서 안 보여요. 확실히 "있다"고 하려면 잡음의 3배는 넘어야 해요.',
  src:'【분해능 = Noise/Sensitivity → 분해능의 단위는 input(입력량)의 단위를 갖는다】 【노이즈 크기의 약 3배 정도에 해당하는 출력값을 detection limit으로 정의】'},
 {k:'선형성·R²',h:'선형성 %FS vs 결정계수 R²',b:`<div class="tblwrap"><table><tr><th></th><th>[[linearity|선형성]]</th><th>[[r2|R²]]</th></tr><tr><td>기준</td><td>이상적 기준직선(참값 관계)</td><td>데이터로 구한 회귀직선</td></tr><tr><td>계산</td><td>최대 편차 ÷ 정격 × 100</td><td>1 − Σ(y−ŷ)² ÷ Σ(y−ȳ)²</td></tr><tr><td>단위</td><td>%FS</td><td>없음 (0~1)</td></tr><tr><td>좋은 값</td><td>작을수록</td><td>1에 가까울수록 (0.999↑ 매우 우수)</td></tr></table></div>`,
  easy:'선형성은 "정답 직선에서 얼마나 벗어났나", R²는 "점들이 내가 그은 직선에 얼마나 잘 붙어 있나"예요.',
  src:'【선형성 = 최대출력편차 / 정격출력 × 100 %】 【R² → 회귀직선이 Y의 변동을 얼마나 잘 설명하는지를 나타내는 값】'},
 {k:'정확도',h:'정확도·정밀도·반복성',b:`<div class="eqn">오차율 = |xₘ − xₜ| ÷ xₜ × 100<small>정확도 [%] = 100 − 오차율</small></div>
   <div class="rel">예: 10 ppm을 10.5 ppm으로 표시 → 오차율 0.5/10 × 100 = 5 % → 정확도 95 %</div>
   ${FIG.accPrec()}
   <p>[[repeat|반복성]]: 같은 조건 단기간 반복 (예: 평균 ±3 % 이내) · 재현성: 장기간·다른 사람·다른 실험실 (예: ±3.7 %)</p>
   <p class="small">참값은 상업용 최고 센서나 GC(가스 크로마토그래피)로 얻은 신뢰할 수 있는 기준값을 써요.</p>`,
  easy:'정확도는 과녁 한가운데에 맞힌 정도, 정밀도는 화살끼리 모인 정도예요.',
  src:'【정확도 [%] = 100 – 오차율】 【10ppm 가스농도 인가 시 센서가 10.5ppm … 정확도: 95%】'},
 {k:'응답시간',h:'응답시간·회복시간·주파수 특성',b:`${FIG.respCurve()}
   <ul class="clean"><li>[[response|응답시간]] = 포화값의 <b>90 %</b>에 도달하는 시간</li><li>주파수 특성: 구동 주파수에 따라 출력이 달라짐 → 절대 변화량이 아니라 <b>초기값 대비 % 변화</b>로 비교 (A/cm², C/cm²로 쓰는 것도 같은 이유)</li><li>[[hysteresis|히스테리시스]]: 올라갈 때와 내려갈 때 출력이 다름 [AI 보충]</li></ul>`,
  easy:'불을 켜도 방이 바로 환해지지 않듯, 센서도 반응하는 데 시간이 걸려요. 90 %까지 온 시간을 응답시간이라고 해요.',
  src:'【Saturation 값의 90%에 도달하는 시간을 응답시간(response time)으로 정의】 【초기값에 대한 상대적인 변화량(%)으로 비교해야 한다】'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'기출·숙제',h:'',b:'__MT:t3__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>감도 = Δy/Δx (교정 곡선 기울기)</li><li>분해능 = Noise/S, MDL = 3σ/S (단위 = 입력 단위)</li><li>정확도 = 100 − |xₘ−xₜ|/xₜ×100 · 응답시간 = 90 % 도달 시간</li></ol>
   <div class="eyebrow">스스로 점검</div>
   <details class="qa"><summary>선형성과 R²의 차이는?</summary><div>선형성은 이상적 기준직선 대비 최대 편차(%FS), R²는 회귀직선이 데이터 변동을 설명하는 정도(단위 없음).</div></details>
   <details class="qa"><summary>감도가 2배가 되면 MDL은?</summary><div>MDL = 3σ/S라서 절반으로 작아져요(더 작은 값까지 잼).</div></details>
   <details class="qa"><summary>드리프트를 없애는 방법은?</summary><div>정기적인 재교정으로 교정 곡선을 갱신.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
PAGES.calib={title:'오차와 보정 — 최소자승',part:'제1편 3장',secs:[
 {k:'교정',h:'교정과 교정 곡선',b:`<p>[[calibration]]: 알고 있는 입력을 넣어 입력-출력 관계를 세우는 일. 그 결과가 <b>교정 곡선</b> y = ax + b.</p>
   <div class="key">점을 여러 개 잡아 오차가 가장 작은 직선(best-fit)을 [[lsq|최소자승법]]으로 구해요. 기울기 a가 감도.</div>`,
  easy:'새 저울에 1 kg, 2 kg, 3 kg 추를 올려 보고 눈금이 어떻게 나오는지 직선으로 정리하는 거예요.',
  src:'【일반적으로 최소자승법(least squares method)을 이용하여 오차가 가장 적은 일직선(best fit straight line)을 구한다】'},
 {k:'원리',h:'최소자승 — 직접 맞춰 보기',b:`<div data-anim="lsq"></div>
   <div class="eqn">Σ eᵢ² = Σ (yᵢ − (axᵢ + b))² → 최소<small>오차의 제곱을 모두 더한 값이 가장 작은 a, b</small></div>`,
  easy:'오차를 그냥 더하면 +와 −가 지워져서 제곱해서 더해요.'},
 {k:'행렬 풀이',h:'행렬방정식으로 a, b 구하기',b:`<div class="f4"><div><div class="h">① 식을 행렬로</div><div class="ln">axᵢ + b = yᵢ (식 N개, 미지수 2개)</div><div class="ln">X·p = y,  X = [xᵢ 1],  p = [a; b]</div></div>
    <div><div class="h">② 양쪽에 Xᵀ 곱하기</div><div class="ln">XᵀX·p = Xᵀy</div><div class="ln">XᵀX = [[Σx², Σx],[Σx, N]],  Xᵀy = [[Σxy],[Σy]]</div></div>
    <div><div class="h">③ 역행렬</div><div class="ln">p = (XᵀX)⁻¹Xᵀy,  det = NΣx² − (Σx)²</div><div class="ln">a = (NΣxy − ΣxΣy)/det,  b = (Σx²Σy − ΣxΣxy)/det</div></div>
    <div><div class="h">예: (1,4), (2,6), (3,7)</div><div class="ln">Σx=6, Σy=17, Σx²=14, Σxy=37, N=3, det=6</div><div class="ln">a = (111 − 102)/6 = 1.5,  b = (238 − 222)/6 = 2.667</div></div></div>`,
  easy:'식이 3개인데 모르는 게 2개라 딱 맞는 답이 없어요. 그래서 "가장 덜 틀리는" 답을 행렬 공식으로 구해요.',
  src:'【Xp = y → XᵀXp = Xᵀy → p = (XᵀX)⁻¹Xᵀy】 【((xi, yi) = (1,4), (2,6), (3,7))】'},
 {k:'계산기',h:'계산기 통계 모드로 바로 구하기',b:`${calcBlock([[['MODE','3','2'],'STAT · A+BX','통계 모드, 직선'],[['1','=','2','=','3','='],'x 열'],[['▶','▲','▲'],'y 열 맨 위'],[['4','=','6','=','7','='],'y 열'],[['AC','SHIFT','1','5','1','='],'2.666666667','A = 절편 b'],[['AC','SHIFT','1','5','2','='],'1.5','B = 기울기 a'],[['AC','SHIFT','1','5','3','='],'0.9819805061','r (상관계수) → x²하면 R²']],[W_STAT,'⚠ 카시오 A+BX의 A = 절편, B = 기울기 (강의 y = ax + b와 글자가 반대)','시험에서는 행렬 풀이 과정을 쓰고, 계산기로 답만 확인'])}`,
  easy:'계산기에 점만 넣으면 기울기와 절편을 바로 알려줘요. 다만 이름(A, B)이 반대라 조심!'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'기출·숙제',h:'',b:'__MT:t1__'}
]};
CARDS.push(
 {id:'c1s1',tag:'센서 공통',f:'센서의 정의는?',a:'외부 자극을 받아 전기 신호로 변환하는 소자 (transducer)',r:'자극 = 양·특성·상태',e:''},
 {id:'c1s2',tag:'센서 공통',f:'정특성 항목 5가지',a:'교정, 감도, 선형성, 정확도, 히스테리시스',r:'+ 분해능, MDL',e:''},
 {id:'c1s3',tag:'센서 공통',f:'동특성 항목 3가지',a:'응답시간, 주파수 특성, 장기 안정성',r:'',e:''},
 {id:'c1s4',tag:'센서 공통',f:'분해능과 MDL 식',a:'분해능 = Noise/S · MDL = 3σ/S',r:'단위 = 입력 단위',e:''},
 {id:'c1s5',tag:'센서 공통',f:'정확도 식',a:'100 − |xₘ − xₜ|/xₜ × 100 [%]',r:'나누는 값은 참값',e:'10 → 10.5면 95 %'},
 {id:'c1s6',tag:'센서 공통',f:'응답시간의 정의',a:'포화값의 90 %에 도달하는 시간',r:'t₉₀',e:''},
 {id:'c1s7',tag:'센서 공통',f:'선형성 vs R²',a:'선형성: 기준직선 최대편차 %FS · R²: 회귀직선 설명력, 단위 없음',r:'',e:''},
 {id:'c1s8',tag:'센서 공통',f:'최소자승 행렬 공식',a:'p = (XᵀX)⁻¹Xᵀy',r:'XᵀX = [[Σx², Σx],[Σx, N]]',e:''},
 {id:'c1s9',tag:'센서 공통',f:'감도 드리프트 원인과 해결',a:'피독·산화·부식·노화·회로 열화·응력 → 정기 재교정',r:'',e:''},
 {id:'c1s10',tag:'계산기',f:'카시오 STAT A+BX에서 A와 B는?',a:'A = 절편(b), B = 기울기(a)',r:'SHIFT 1 5 1 / 2',e:'강의 식과 글자가 반대'}
);
