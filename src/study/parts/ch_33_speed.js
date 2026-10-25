/* ═════════ 제3편 3장 속도센서·금속탐지기 ═════════ */
Object.assign(TERM,{
 tonewheel:{ko:'톤 휠 (폴 휠)',en:'Tone wheel · Pole wheel',gen:'톱니가 달린 바퀴.',tech:'바퀴와 함께 도는 톱니 휠. 톱니(tooth) 표면은 강자성 물질. 톱니가 센서 앞을 지날 때마다 자속이 변해 펄스가 생긴다.',easy:'자전거 바퀴살처럼 톱니가 지나갈 때마다 "딱" 신호가 나요.'},
 inductivespeed:{ko:'유도형 속도센서',en:'Inductive (passive) speed sensor',gen:'자석 + 코일로 만든 속도센서.',tech:'영구자석이 자기장을 만들고 톱니 이동에 따른 자속 변화가 코일에 기전력을 유도. 전원 불필요, 아날로그(사인파) 출력. 출력이 속도에 비례해 저속에서 매우 작아짐. 코일 500~1,500 Ω, 에어갭 0.8~1.5 mm.',easy:'자석과 코일만 있어서 전기 없이도 동작하지만, 천천히 돌면 신호가 너무 약해요.'},
 schmitt:{ko:'슈미트 트리거',en:'Schmitt trigger',gen:'흔들리는 신호를 깔끔한 0·1로 바꾸는 회로.',tech:'히스테리시스가 있는 비교기. 올라갈 때 기준과 내려갈 때 기준이 달라 잡음에 강하게 아날로그를 디지털 펄스로 변환.',easy:'문턱을 두 개 두어서 살짝 흔들려도 0과 1이 바뀌지 않게 하는 문지기.'},
 proximity:{ko:'유도형 근접 센서',en:'Inductive proximity sensor',gen:'금속이 가까이 오면 알아채는 센서 (금속탐지기).',tech:'LC 발진 → 코일의 고주파 교류 자기장 → 금속에 와전류 → 2차 자기장 → 코일 임피던스·인덕턴스 변화 → 발진 진폭 변화 검출 → ON/OFF 출력.',easy:'코일이 보이지 않는 자기장 그물을 치고, 금속이 걸리면 그물이 흔들리는 것을 알아채요.'},
 shielded:{ko:'차폐형·비차폐형',en:'Shielded · Unshielded sensor',gen:'옆을 막았나 열었나.',tech:'차폐형: 금속 차폐로 자기장을 앞쪽에 집중 → 검출 영역 좁고 정확, 주변 금속 영향↓. 비차폐형: 옆으로도 퍼져 검출 영역·거리↑.',easy:'손전등에 갓을 씌우면 앞만 밝고(차폐), 벗기면 넓게 비춰요(비차폐).'}
});
Object.assign(UNIT,{rpm:{s:'rpm',r:'알피엠 (분당 회전수)',mean:'1분에 몇 바퀴. rps(초당) × 60'},kmh:{s:'km/h',r:'킬로미터 퍼 아워',mean:'1 m/s = 3.6 km/h'},pulsemin:{s:'pulse/min',r:'펄스 퍼 미닛',mean:'1분 동안의 펄스 수'}});
FORM.push(
 {eq:'rpm = (펄스/min) ÷ 톱니 수',read:'분당 펄스 나누기 톱니',name:'회전수',page:'speed',sec:4,syms:[]},
 {eq:'v = 2πR × (rpm/60), km/h = m/s × 3.6',read:'둘레 곱하기 초당 회전',name:'차속',page:'speed',sec:4,syms:[['R','바퀴 반지름','m']]}
);

ANIM.tonewheel=host=>{let sp=0.6,dig=false;const hist=[];let ang=0;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 230" role="img" aria-label="톤 휠 속도센서"></svg>
   <div class="figctl"><label class="small">속도 <input type="range" min="0.1" max="2" step="0.05" value="0.6" data-s style="width:130px"></label><button class="tbtn" data-d aria-pressed="false">홀 센서(디지털)로</button></div>
   <figcaption>톱니가 센서 앞을 지날 때마다 자속이 바뀌어 신호가 나와요. <b>유도형</b>은 빠를수록 신호가 커지고 느리면 아주 작아져요. <b>홀 센서 + 슈미트 트리거</b>는 속도와 상관없이 같은 높이의 펄스라서 저속에도 강해요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);const T=10;
  const L=loop(()=>{const da=0.02*sp;ang+=da;const cx=80,cy=80,R=52;let teeth='';let near=0;
    for(let k=0;k<T;k++){const a=ang+k*2*Math.PI/T;const x=cx+R*Math.cos(a),y=cy+R*Math.sin(a);teeth+=`<rect x="${(x-7).toFixed(1)}" y="${(y-7).toFixed(1)}" width="14" height="14" transform="rotate(${(a*180/Math.PI).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" style="fill:var(--muted)"/>`;
     const d=Math.abs(((a%(2*Math.PI))+2*Math.PI)%(2*Math.PI));near+=Math.exp(-((Math.min(d,2*Math.PI-d))**2)/0.02)}
    // 센서는 오른쪽(각 0) 위치
    const flux=near;hist.push(flux);if(hist.length>140)hist.shift();
    let wave='';for(let i=1;i<hist.length;i++){const dv=(hist[i]-hist[i-1])*sp*14;const yv=dig?(hist[i]>0.45?-1:1)*22:Math.max(-40,Math.min(40,-dv*40));wave+=(i>1?'L':'M')+(180+i*1.05).toFixed(1)+' '+(80+yv).toFixed(1)}
    svg.innerHTML=`<circle cx="${cx}" cy="${cy}" r="${R-6}" style="fill:var(--surface2);stroke:var(--ink);stroke-width:1.4"/>${teeth}${tx(cx,cy+4,'톤 휠','small2','middle')}
     <rect x="${cx+R+10}" y="${cy-12}" width="22" height="24" rx="3" style="fill:${dig?'var(--unit)':'var(--warn)'}"/>${tx(cx+R+21,cy+40,dig?'홀':'코일+자석','small2','middle')}
     <line x1="178" y1="80" x2="330" y2="80" style="stroke:var(--line)"/>${wave?`<path d="${wave}" style="fill:none;stroke:${dig?'var(--unit)':'var(--warn)'};stroke-width:2.2"/>`:''}
     ${tx(254,26,dig?'디지털 펄스 (높이 일정)':'유도 전압 (속도에 비례)','b2','middle')}${tx(254,140,'시간 →','small2','middle')}
     ${tx(10,190,`속도 ×${sp.toFixed(2)} · 톱니 ${T}개`,'b2')}${tx(10,212,dig?'저속에서도 같은 크기 펄스 → 자동차에 널리 사용':'전원 불필요, 하지만 저속에서 출력 현저히 작아짐','small2')}`});
  q('[data-s]').oninput=e=>{sp=+e.target.value};q('[data-d]').onclick=e=>{dig=!dig;e.target.setAttribute('aria-pressed',String(dig));e.target.textContent=dig?'유도형(아날로그)으로':'홀 센서(디지털)로';hist.length=0};return L.stop};

ANIM.metaldet=host=>{let d=1;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 230" role="img" aria-label="금속탐지 와전류"></svg><div class="figctl"><label class="small">금속까지 거리 <input type="range" min="0.15" max="1" step="0.01" value="1" data-d style="width:140px"></label></div>
   <figcaption>코일이 고주파 교류 자기장을 내요. 금속이 가까이 오면 <b>와전류</b>(빨간 고리)가 생기고 반대 자기장 + 줄 가열로 에너지를 빼앗아 <b>발진 진폭이 줄어들어요</b>. 진폭 변화를 보고 금속을 알아채요.</figcaption></figure>`;
  const svg=host.querySelector('svg');
  const L=loop(tp=>{const mx=110+d*170;const amp=1-0.75*Math.exp(-(d-0.15)*3.2);const ed=1-amp;
    let field='';for(let k=1;k<=4;k++){const r=18*k+6*Math.sin(tp*6);field+=`<path d="M70 ${110-r} A${r*1.2} ${r} 0 0 1 70 ${110+r}" style="fill:none;stroke:var(--unit);stroke-width:1.6;opacity:${(0.8-k*0.15)*amp+0.1}"/>`}
    let eddy='';if(ed>0.08){for(let k=1;k<=3;k++)eddy+=`<ellipse cx="${mx+12}" cy="110" rx="${6*k}" ry="${14*k}" style="fill:none;stroke:var(--bad);stroke-width:1.8;opacity:${Math.min(1,ed*1.4)}"/>`}
    let osc='';for(let i=0;i<=120;i++){const x=200+i;const y=200-22*amp*Math.sin(i/120*12*Math.PI+tp*8);osc+=(i?'L':'M')+x+' '+y.toFixed(1)}
    svg.innerHTML=`${[0,1,2,3,4,5].map(k=>`<ellipse cx="${40+k*6}" cy="110" rx="5" ry="30" style="fill:none;stroke:var(--warn);stroke-width:2.6"/>`).join('')}${tx(46,64,'코일','small2','middle')}${field}
     <rect x="${mx}" y="60" width="24" height="100" style="fill:var(--muted)"/>${tx(mx+12,54,'금속','small2','middle')}${eddy}
     <line x1="196" y1="200" x2="324" y2="200" style="stroke:var(--line)"/><path d="${osc}" style="fill:none;stroke:var(--ink);stroke-width:2"/>${tx(260,170,`발진 진폭 ${(amp*100).toFixed(0)} %`,'b2','middle')}`});
  host.querySelector('[data-d]').oninput=e=>{d=+e.target.value};return L.stop};

Object.assign(FIG,{
 detBlock(){const bx=(x,y,w,t1,t2,c)=>`<rect x="${x}" y="${y}" width="${w}" height="44" rx="7" style="fill:${c};stroke:var(--ink);stroke-width:1.4"/>${tx(x+w/2,y+20,t1,'b2','middle')}${tx(x+w/2,y+36,t2,'small2','middle')}`;
  return svgFig(340,170,`${bx(6,20,100,'LC 발진기','고주파 교류','var(--surface)')}${ar(106,42,120,42)}${bx(122,20,96,'센서 코일','교류 자기장','var(--warn-soft)')}${ar(218,42,232,42)}${bx(234,20,100,'금속 타깃','와전류·2차 자기장','var(--surface2)')}
   ${ar(284,64,284,96,'b',1.6)}${bx(234,98,100,'코일 Z 변화','R_eff↑ L_eff 변화','var(--bad-soft)')}${ar(234,120,220,120)}${bx(122,98,96,'진폭 검출·복조','진폭 변화','var(--surface)')}${ar(122,120,108,120)}${bx(6,98,100,'출력 회로','ON/OFF·DC','var(--accent-soft)')}`,'금속탐지기 구성',
   '발진기 → 코일 → (금속이 오면 와전류) → 코일 임피던스 변화 → 진폭 검출 → 출력. 일반 금속은 주파수 변화보다 <b>저항(진폭) 변화가 커서</b> 진폭을 보는 게 더 효과적이에요.')}
});

Object.assign(GEN,{
 rpmSpeed(base){const P=base?10000:pick([6000,9000,12000,15000,24000]),T=base?10:pick([10,20,24,48]),R=base?0.3:pick([0.25,0.3,0.32,0.35]);const rpm=P/T,rps=rpm/60,v=2*Math.PI*R*rps,kmh=v*3.6;
  return {kind:base?'기본':'유사',title:'펄스로 회전수와 차속',fig:FIG.pTooth(T),q:`톤 휠 톱니 ${T}개, 센서 출력이 분당 ${P.toLocaleString()} 펄스, 바퀴 반지름 ${R} {{m}}이다. (1) {{rpm}} (2) 차속 {{kmh}}는?`,
   first:['rpm = 펄스/min ÷ 톱니','÷ 60 → 회/s','× 2πR → m/s','× 3.6 → km/h'],
   steps:[{h:'회전수',b:`<div class="ln">${P.toLocaleString()} ÷ ${T} = ${fx(rpm,5)} rpm</div><div class="rd">한 바퀴에 톱니 수만큼 펄스</div>`},{h:'초당 회전',b:`<div class="ln">${fx(rpm,5)} ÷ 60 = ${fx(rps,4)} 회/s</div>`},
    {h:'둘레 × 회전',b:`<div class="ln">v = 2π × ${R} × ${fx(rps,4)} = ${fx(v,4)} m/s</div>`},{h:'km/h',b:`<div class="ln">${fx(v,4)} × 3.6 = ${fx(kmh,4)} km/h</div><div class="rd">1 m/s = 3600 m/h = 3.6 km/h</div>`}],
   ans:`${fx(rpm,5)} rpm · ${fx(kmh,4)} km/h`,ansRead:`시속 ${fxR(kmh,4)} 킬로미터`,
   calc:calcBlock([[[...ks(P),'÷',...ks(T),'='],String(rpm),'rpm'],[['×','2','×','SHIFT','×10ˣ','×',...ks(R),'÷','6','0','×','3','.','6','='],casioDec(kmh),'km/h (π 꼴이면 S⇔D)']],[W_PI,W_SD]),
   easy:'톱니가 10개면 펄스 10번에 바퀴가 한 바퀴. 한 바퀴에 바퀴 둘레(2πR)만큼 굴러가요.'}},
 pulseHz(){const kmh=pick([30,50,60,90,120]),R=pick([0.3,0.32]),T=pick([24,48,60]);const v=kmh/3.6,rps=v/(2*Math.PI*R),f=rps*T;
  return {kind:'응용',title:'차속에서 펄스 주파수 거꾸로',q:`바퀴 반지름 ${R} m, 톤 휠 톱니 ${T}개인 차가 ${kmh} km/h로 달린다. 홀 센서 펄스 주파수는 몇 Hz인가?`,first:['km/h ÷ 3.6 → m/s','÷ 2πR → 회/s','× 톱니 → Hz'],
   steps:[{h:'m/s로',b:`<div class="ln">${kmh} ÷ 3.6 = ${fx(v,4)} m/s</div>`},{h:'초당 회전',b:`<div class="ln">${fx(v,4)} ÷ (2π × ${R}) = ${fx(rps,4)} 회/s</div>`},{h:'펄스 주파수',b:`<div class="ln">${fx(rps,4)} × ${T} = ${fx(f,4)} Hz</div><div class="rd">Duty가 일정하지 않아도 주기·주파수로 속도 계산 가능</div>`}],
   ans:`${fx(f,4)} Hz`,ansRead:`${fxR(f,4)} 헤르츠`,calc:calcBlock([[[...ks(kmh),'÷','3','.','6','÷','(','2','×','SHIFT','×10ˣ','×',...ks(R),')','×',...ks(T),'='],casioDec(f)]],[W_PI,W_SD]),
   easy:'앞의 문제를 거꾸로 푸는 거예요. km/h → m/s → 바퀴가 1초에 몇 번 → 톱니 수를 곱하면 1초에 펄스 몇 번.'}}
});
Object.assign(FIG,{pTooth(T){let s='';for(let k=0;k<T;k++){const a=k*2*Math.PI/T;s+=`<rect x="${(80+44*Math.cos(a)-4).toFixed(1)}" y="${(70+44*Math.sin(a)-4).toFixed(1)}" width="8" height="8" style="fill:var(--muted)"/>`}
  return svgFig(340,140,`<circle cx="80" cy="70" r="40" style="fill:var(--surface2);stroke:var(--ink)"/>${s}${tx(80,74,`톱니 ${T}`,'small2','middle')}<rect x="132" y="62" width="18" height="16" rx="3" style="fill:var(--unit)"/>
   ${[0,1,2,3,4,5].map(k=>`<rect x="${180+k*24}" y="${k%2?80:50}" width="12" height="30" style="fill:var(--unit);opacity:.85"/>`).join('')}<line x1="176" y1="110" x2="330" y2="110" style="stroke:var(--ink)"/>${tx(250,130,'펄스 → 개수 세기','small2','middle')}`,'펄스 문제 그림')}});
PSET.speed=[['rpmSpeed',true],['rpmSpeed'],['pulseHz'],['skinD',true],['lcF']];
TOPICS.speed={name:'속도·금속탐지',g:['rpmSpeed','pulseHz','skinD','lcF']};BASICG.add('rpmSpeed');

PAGES.speed={title:'속도센서·금속탐지기',part:'제3편 3장',secs:[
 {k:'개요',h:'속도센서의 두 종류',b:`<p>자동차에는 센서가 200개 이상 — 바퀴 속도센서는 ABS·ESC의 핵심이에요.</p>
   <div class="tblwrap"><table><tr><th></th><th>아날로그 — [[inductivespeed|유도형]]</th><th>디지털 — 홀 센서</th></tr><tr><td>구성</td><td>영구자석 + 코일</td><td>홀 소자 + [[schmitt|슈미트 트리거]]</td></tr><tr><td>출력</td><td>사인파, 크기 ∝ 속도</td><td>일정한 높이의 펄스</td></tr><tr><td>장점</td><td>전원 불필요</td><td>저속에서도 정확</td></tr><tr><td>단점</td><td>저속에서 출력 매우 작음</td><td>전원 필요</td></tr></table></div>`,
  easy:'옛날식은 자석과 코일로 전기 없이 재고, 요즘은 홀 센서로 느릴 때도 정확하게 재요.'},
 {k:'유도형',h:'유도형 속도센서 — 움직여 보기',b:`<div data-anim="tonewheel"></div>
   <ul class="clean"><li>[[tonewheel|톤 휠]]은 바퀴와 같이 회전, 톱니 표면은 강자성 물질</li><li>영구자석이 있어야 톱니가 지날 때 자속 변화가 큼 → 코일에 기전력 ([[faraday|패러데이]])</li><li>RPM↑ → 톱니가 빨리 지남 → 자속 변화율↑ → V_out↑</li><li>코일 저항 500~1,500 Ω · 에어갭 0.8~1.5 mm · 외부 영향 차단용 차폐선</li></ul>
   <button class="ghost" data-goto="induct">↗ 전자기 유도 원리 (제2편 3장)</button>`,
  easy:'톱니가 자석 앞을 지날 때마다 코일 속 자기장이 바뀌어 전기가 "찌릿" 나와요. 빨리 돌수록 더 크게.',
  src:'【유도된 전압은 magnetic field 변화율, 세기에 비례한다】 【저속회전에서는 출력이 현저히 작아지는 단점】'},
 {k:'고장 진단',h:'아날로그 속도센서 문제와 진단',b:`<div class="tblwrap"><table><tr><th>문제</th><th>증상</th><th>진단·해결</th></tr><tr><td>코일 단락</td><td>출력 매우 낮음·없음</td><td>코일 저항 측정 → 교체</td></tr><tr><td>자석 약화</td><td>저속 신호 불량</td><td>파형을 정상품과 비교 → 교체</td></tr><tr><td>에어갭 금속 가루</td><td>신호 끊김·잡음</td><td>육안 점검·청소, 에어갭 조정</td></tr><tr><td>톱니 파손</td><td>특정 위치 신호 누락</td><td>톱니 점검, 파형 확인 → 수리</td></tr></table></div>`,
  easy:'신호가 이상하면 코일 저항, 자석 세기, 틈새의 쇳가루, 톱니 상태를 차례로 봐요.'},
 {k:'디지털',h:'홀 센서 + 슈미트 트리거',b:`<ul class="clean"><li>홀 전압을 [[schmitt|슈미트 트리거]](히스테리시스 있는 비교기)로 0·1 펄스로 변환</li><li>출력이 자기장 <b>변화율과 무관</b> → 저속에서도 같은 크기</li><li>그래서 자동차 속도센서에 홀 센서가 널리 쓰임</li></ul>
   <button class="ghost" data-goto="hall">↗ 홀 효과 (제2편 4장)</button>`,
  easy:'홀 센서는 "자석이 있다/없다"만 보니까 아주 천천히 돌아도 똑같이 셀 수 있어요.',
  src:'【Output signal is not effected by the rate of change of the magnetic field】 【자동차의 속도 센서에는 Hall 센서가 널리 사용된다】'},
 {k:'속도 계산',h:'펄스 → rpm → km/h',b:`<div class="eqn">rpm = (펄스/min) ÷ 톱니 수<small>v = 2πR × rpm/60 [m/s] · km/h = m/s × 3.6</small></div>
   <div class="rel">강의 예: 10,000 펄스/min, 톱니 10개 → 1,000 rpm · R = 0.3 m → 2π × 0.3 × 1000/60 = 31.4 m/s = <b>113.1 km/h</b></div>
   <p class="small">Duty cycle이 일정하지 않아도 주기(펄스 주파수)만 재면 속도 계산 가능</p>`,
  easy:'펄스를 톱니 수로 나누면 바퀴가 몇 바퀴 돌았는지, 거기에 바퀴 둘레를 곱하면 간 거리예요.',
  src:'【RPM = 10,000 / 10 = 1,000 rpm】 【2πR × revolution/s = [km/s]】'},
 {k:'금속탐지 구성',h:'금속탐지기 = 유도형 근접 센서',b:`${FIG.detBlock()}
   <div class="eqn">f = 1 / (2π√(LC))<small>LC 발진기 공진 주파수</small></div>`,
  easy:'발진기가 만든 교류로 코일이 자기장 그물을 치고, 금속이 걸리면 그물 흔들림(진폭)이 바뀌어요.',
  src:'【LC Tank Oscillator → 고주파 AC 전압/발진 신호 생성 … Output Circuit → ON/OFF 또는 DC 출력】'},
 {k:'와전류',h:'금속이 오면 무슨 일이 — 움직여 보기',b:`<div data-anim="metaldet"></div>
   <ul class="clean"><li>[[eddy|와전류]] → 줄 가열 → 유효저항 R_eff↑ · 2차 자기장 → L_eff 변화</li><li>Z = R_eff + jωL_eff 변화 → 코일 전류 진폭·위상·발진 주파수 변화</li><li>철·알루미늄·황동·스테인리스: 주파수보다 저항 변화가 큼 → <b>진폭 검출이 효과적</b></li><li>같은 자속을 유지하려면 더 큰 전류가 필요</li></ul>`,
  easy:'금속 속 소용돌이 전류가 에너지를 빼앗아서 코일의 흔들림이 약해져요.',
  src:'【발진 전압의 진폭을 검출하는 것이 발진 주파수 검출보다 훨씬 유효한 방법이다】'},
 {k:'설계 요소',h:'주파수·코어·차폐·금속 종류',b:`<div class="f4"><div><div class="h">주파수</div>낮음: 큰 타깃·먼 거리 · 높음: 작은 타깃·미세 변화 · 보통 수십~수백 kHz</div>
    <div><div class="h">코어</div>자기 코어(NiFe, CoNiFe): 자속 집중·감도↑, 고주파 손실 · 공심 코일: 손실·포화 없음, 고주파·소형 검출</div>
    <div><div class="h">[[shielded|차폐형 vs 비차폐형]]</div>차폐: 앞쪽 집중, 정확한 위치 · 비차폐: 넓고 긴 검출 거리 · 자기 코어 + 차폐 → 긴 리딩 거리</div>
    <div><div class="h">금속 종류</div>전기전도도↑ → 감도↑ · 자성 금속은 와전류는 작아도 감도 좋고 거리 김 · 플라스틱·종이는 검출 불가</div>
    <div><div class="h">환경</div>흙·먼지·연기·기름에 강함 (자기장이 투자율 ≈ 1인 물질은 그대로 통과)</div></div>`,
  easy:'큰 금속을 멀리서 찾을 땐 낮은 주파수, 작은 금속을 정밀하게 찾을 땐 높은 주파수.'},
 {k:'최소 두께',h:'검출 가능 최소 두께 = 표피 깊이',b:`<div class="eqn">δ = √( ρ / (π f μ) )<small>μ = 투자율 H/m (비투자율 아님) · 비자성 금속 μ ≈ 4π × 10⁻⁷</small></div>
   <div class="rel">강의 예 II: 알루미늄 ρ = 2.65 × 10⁻⁸ Ω·m, 135 kHz → δ ≈ <b>0.223 mm</b></div>
   <button class="ghost" data-goto="induct" data-i="3">↗ 표피 깊이 직접 바꿔 보기</button>`,
  easy:'금속이 표피 깊이보다 얇으면 와전류가 잘 안 생겨서 못 찾아요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'기출·숙제',h:'',b:'__MT:t12,t13__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>유도형: 자석+코일, 전원 불필요, V ∝ 속도 → 저속 약함 · 홀+슈미트: 변화율 무관 → 저속 OK</li><li>rpm = 펄스/min ÷ 톱니 · km/h = 2πR·rpm/60 × 3.6</li><li>금속탐지: LC 발진 → 와전류 → R_eff↑·L_eff 변화 → 진폭 검출 · δ = √(ρ/(πfμ))</li></ol>
   <div class="eyebrow">스스로 점검</div>
   <details class="qa"><summary>유도형 센서에 영구자석이 꼭 필요한 이유는?</summary><div>자석이 자기장을 만들어야 톱니가 지날 때 코일 자속이 크게 변해 기전력이 생김.</div></details>
   <details class="qa"><summary>금속탐지에서 주파수를 낮추면?</summary><div>표피 깊이↑, 큰 타깃·먼 거리 유리. 작은 타깃 감지는 불리.</div></details>
   <details class="qa"><summary>왜 주파수보다 진폭을 검출하나?</summary><div>일반 금속은 와전류에 의한 저항 성분 변화가 주파수 변화보다 크기 때문.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'sp1',tag:'속도',f:'유도형 vs 홀 속도센서',a:'유도형: 자석+코일, 전원 X, 저속 약함 · 홀: 슈미트 트리거, 저속 OK',r:'',e:''},
 {id:'sp2',tag:'속도',f:'rpm 계산',a:'분당 펄스 ÷ 톱니 수',r:'10,000 ÷ 10 = 1,000 rpm',e:''},
 {id:'sp3',tag:'속도',f:'rpm → km/h',a:'2πR × rpm/60 × 3.6',r:'R = 0.3, 1000 rpm → 113.1 km/h',e:''},
 {id:'sp4',tag:'속도',f:'유도형 센서 코일 저항·에어갭',a:'500~1,500 Ω · 0.8~1.5 mm',r:'',e:''},
 {id:'sp5',tag:'속도',f:'금속탐지기 구성 순서',a:'LC 발진 → 코일 → 와전류 → Z 변화 → 진폭 검출 → 출력',r:'',e:''},
 {id:'sp6',tag:'속도',f:'차폐형과 비차폐형 차이',a:'차폐: 앞 집중·정확 · 비차폐: 넓고 먼 검출',r:'',e:''},
 {id:'sp7',tag:'속도',f:'Al 135 kHz 표피 깊이',a:'약 0.223 mm',r:'δ = √(ρ/(πfμ))',e:''}
);
