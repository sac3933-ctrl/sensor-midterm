/* ═════════ 제3편 7~10장 온도·압력·유량레벨·근접광 (확장 장) ═════════ */
Object.assign(TERM,{
 rtd:{ko:'측온저항체 (RTD)',en:'RTD (Resistance Temperature Detector)',gen:'온도가 오르면 저항이 비례해서 커지는 금속 센서.',tech:'주로 백금 Pt100(0 °C에서 100 Ω). R(T) ≈ R₀(1 + αT), α = 0.00385 /°C. 선형·정밀·안정, 범위 약 −200~600 °C. 3선·4선식으로 리드선 오차 제거.',easy:'백금선은 1 °C 오를 때마다 저항이 0.385 Ω씩 늘어나요(Pt100).'},
 thermistor:{ko:'서미스터',en:'Thermistor (NTC / PTC)',gen:'온도에 따라 저항이 크게 변하는 반도체 소자.',tech:'NTC: 온도↑ → R 지수적으로↓. R = R₀·exp[B(1/T − 1/T₀)], T는 K. 감도 매우 큼, 비선형, 좁은 범위(약 −50~150 °C). PTC: 특정 온도에서 R 급증 → 과전류 보호.',easy:'조금만 데워져도 저항이 확 줄어요. 민감하지만 곧은 직선은 아니에요.'},
 thermocouple:{ko:'열전대',en:'Thermocouple',gen:'서로 다른 두 금속을 붙이면 온도차로 전압이 생기는 센서.',tech:'제벡 효과: V ≈ S·(T_측정 − T_기준). K형(크로멜-알루멜) 약 41 μV/°C, 범위 약 −200~1250 °C. 냉접점 보상 필요. 넓은 범위·튼튼·자체 전원 불필요, 출력 작고 비선형.',easy:'두 금속 접점의 온도 차이가 아주 작은 전압(μV)을 만들어요.'},
 seebeck:{ko:'제벡 효과',en:'Seebeck effect',gen:'온도차가 전압을 만드는 현상.',tech:'서로 다른 도체의 두 접점 온도가 다르면 열기전력 발생. 계수 S [μV/°C]는 금속 쌍에 따라 다름.',easy:'한쪽은 뜨겁고 한쪽은 차가우면 전자가 몰려 전압이 생겨요.'},
 cjc:{ko:'냉접점 보상',en:'Cold junction compensation (CJC)',gen:'기준 접점 온도를 보정하는 것.',tech:'열전대는 "온도차"만 측정 → 단자부(냉접점) 온도를 따로 재서(서미스터·IC) 그 열기전력을 더해 줌: V(T) = V_측정 + V(T_cj).',easy:'열전대는 차이만 알려줘서, 기준점 온도를 따로 재서 더해 줘야 진짜 온도가 나와요.'},
 timeconst:{ko:'시정수',en:'Time constant (τ)',gen:'변화의 63.2 %까지 가는 데 걸리는 시간.',tech:'1차 응답: T(t) = T_f + (T_i − T_f)e^(−t/τ). 5τ면 99.3 %. 센서 보호관이 두꺼울수록 τ↑.',easy:'뜨거운 물에 온도계를 넣으면 바로 안 올라가죠. 63 % 오르는 데 걸리는 시간이에요.'},
 pressure:{ko:'압력',en:'Pressure',gen:'면을 누르는 힘의 세기.',tech:'P = F/A, 단위 Pa = N/m². 1 bar = 10⁵ Pa, 1 atm = 101.325 kPa, 1 psi ≈ 6.895 kPa.',easy:'같은 힘이라도 좁은 면적에 누르면 압력이 커요(바늘이 아픈 이유).'},
 gaugeabs:{ko:'절대압·게이지압·차압',en:'Absolute / Gauge / Differential pressure',gen:'압력을 어디 기준으로 재나.',tech:'절대압: 진공 기준. 게이지압: 대기압 기준(타이어 압력). 차압: 두 지점 차이(유량·필터 막힘). P_abs = P_gauge + P_atm.',easy:'타이어 게이지가 "0"이어도 안에는 대기압 1기압이 있어요.'},
 diaphragm:{ko:'다이어프램',en:'Diaphragm',gen:'압력을 받으면 휘는 얇은 막.',tech:'압력 → 휨(변형) → 압저항·정전용량·스트레인 게이지로 전기 신호. MEMS 실리콘 다이어프램 + 압저항 4개 풀 브리지가 가장 흔함.',easy:'북 가죽처럼 눌리면 휘는 막이에요. 휜 정도를 전기로 재요.'},
 hydrostatic:{ko:'정수압',en:'Hydrostatic pressure',gen:'액체 깊이에 따른 압력.',tech:'P = ρgh. 물 10 m ≈ 98 kPa ≈ 1 bar. 탱크 바닥 압력으로 레벨 측정.',easy:'물속 깊이 들어갈수록 귀가 아픈 이유예요.'},
 flowrate:{ko:'유량',en:'Flow rate',gen:'1초(1분)에 흐르는 양.',tech:'체적유량 Q = A·v [m³/s, L/min, m³/h], 질량유량 ṁ = ρQ [kg/s]. 1 m³/h = 16.67 L/min.',easy:'관의 단면적 × 흐르는 속도 = 1초에 지나가는 물의 양.'},
 dpflow:{ko:'차압식 유량계',en:'Differential pressure flowmeter',gen:'관을 좁혀 생긴 압력 차로 유량을 재는 방식.',tech:'오리피스·벤투리: 베르누이 원리로 Q = C·A·√(2ΔP/ρ) → Q ∝ √ΔP. 유량 2배면 차압 4배. 구조 간단, 압력 손실.',easy:'호스 끝을 손가락으로 막으면 물이 빨라지고 압력이 떨어지죠. 그 압력 차로 유량을 재요.'},
 magflow:{ko:'전자기 유량계',en:'Electromagnetic flowmeter',gen:'자기장 속을 흐르는 액체가 만드는 전압으로 유량 측정.',tech:'패러데이 법칙 E = B·D·v (D 관 지름). 전도성 액체만 가능(물·폐수·슬러리), 압력 손실 없음, 기름·가스 불가.',easy:'움직이는 도체(물)가 자석 사이를 지나면 전압이 생겨요. 빠를수록 전압이 커요.'},
 vortex:{ko:'와류 유량계',en:'Vortex flowmeter',gen:'막대 뒤에 생기는 소용돌이 수로 유속 측정.',tech:'카르만 와열 주파수 f = St·v/d (St ≈ 0.2, d 막대 폭). 주파수 ∝ 유속 → 압전 센서로 소용돌이 감지.',easy:'물속 막대 뒤로 소용돌이가 번갈아 생기는데, 빠를수록 자주 생겨요.'},
 massflow:{ko:'질량 유량계 (코리올리·열식)',en:'Mass flowmeter',gen:'부피가 아니라 질량을 직접 재는 유량계.',tech:'코리올리식: 진동하는 관에 흐름 → 코리올리 힘으로 관이 비틀림 → 위상차 ∝ 질량유량(밀도도 측정). 열식: 가열체가 흐름에 식는 정도 ∝ 질량유량(가스).',easy:'흐르는 물이 흔들리는 관을 비틀어요. 많이 흐를수록 많이 비틀려요(자이로와 같은 코리올리 힘).'},
 level:{ko:'레벨 센서',en:'Level sensor',gen:'탱크 안 액체·분체 높이를 재는 센서.',tech:'연속: 정수압(h = P/ρg), 초음파·레이더 ToF(h = H − c·t/2), 정전용량, 플로트. 포인트(스위치): 플로트·진동식·전극식.',easy:'탱크에 물이 얼마나 찼는지 재요. 바닥 압력으로도, 위에서 메아리로도 재요.'},
 capprox:{ko:'정전용량형 근접 센서',en:'Capacitive proximity sensor',gen:'금속이 아닌 물체도 감지하는 근접센서.',tech:'감지면 전극과 물체 사이 정전용량 증가 → 발진 시작·변화 감지. 물·플라스틱·분말·액면 감지. 유전율 클수록(물 약 80) 잘 감지, 습기·먼지 영향.',easy:'물체가 다가오면 콘덴서 크기가 바뀌는 걸로 알아요. 플라스틱도 물도 OK.'},
 photoelec:{ko:'광전 센서',en:'Photoelectric sensor',gen:'빛을 쏘아 가려지거나 반사되는지로 물체 감지.',tech:'투과형(가장 멀리·안정), 회귀반사형(반사판, 투명체 주의), 확산반사형(물체 반사, 색·광택 영향), BGS(배경 억제).',easy:'빛이 끊기거나 튕겨 오면 "물체 있음"이에요.'},
 snDist:{ko:'감지 거리',en:'Sensing distance (Sn, Sa)',gen:'근접 센서가 물체를 알아채는 거리.',tech:'정격 감지거리 Sn(표준 철 타겟 기준). 실제 사용은 Sa ≤ 0.81·Sn (온도·전압·개체차 여유). 비철금속은 재질 보정 계수 곱함.',easy:'카탈로그 거리의 약 80 % 안쪽에서 쓰면 확실히 감지돼요.'},
 npnpnp:{ko:'NPN·PNP 출력',en:'NPN (sink) / PNP (source) output',gen:'센서가 신호를 내보내는 방식 두 가지.',tech:'NPN: 감지 시 출력선을 0 V로 끌어내림(싱크). PNP: 감지 시 +V를 내보냄(소스). PLC 입력 공통선(COM)과 맞춰야 함. 3선식: 갈색 +V, 청색 0 V, 흑색 출력.',easy:'신호를 "땅으로 빼주나(NPN)", "전기를 밀어 주나(PNP)"의 차이예요.'}
});
Object.assign(UNIT,{
 degF:{s:'°F',r:'화씨 도',mean:'°F = 1.8·°C + 32'},
 uVC:{s:'μV/°C',r:'마이크로볼트 퍼 도',mean:'열전대 제벡 계수'},
 bar:{s:'bar',r:'바',mean:'10⁵ Pa'},
 atm:{s:'atm',r:'기압 (에이티엠)',mean:'101.325 kPa'},
 psi:{s:'psi',r:'피에스아이 (파운드 퍼 제곱인치)',mean:'≈ 6.895 kPa'},
 mmHg:{s:'mmHg',r:'밀리미터 수은',mean:'≈ 133.3 Pa'},
 Lmin:{s:'L/min',r:'리터 퍼 미닛',mean:'분당 리터'},
 m3h:{s:'m³/h',r:'세제곱미터 퍼 아워',mean:'= 16.67 L/min'},
 kgs:{s:'kg/s',r:'킬로그램 퍼 세컨드',mean:'질량유량'}
});
FORM.push(
 {eq:'T[K] = t[°C] + 273.15,  °F = 1.8·°C + 32',read:'온도 단위',name:'온도 변환',page:'temp',sec:0,syms:[]},
 {eq:'R(T) = R₀(1 + αT), α = 0.00385',read:'Pt100',name:'RTD 저항',page:'temp',sec:1,syms:[]},
 {eq:'R = R₀·exp[B(1/T − 1/T₀)]',read:'B 상수 식 (T는 K)',name:'NTC 서미스터',page:'temp',sec:2,syms:[]},
 {eq:'V ≈ S·(T − T_cj)',read:'제벡 계수 곱하기 온도차',name:'열전대',page:'temp',sec:3,syms:[['S','제벡 계수','uVC']]},
 {eq:'T(t) = T_f + (T_i − T_f)e^(−t/τ)',read:'1차 응답',name:'시정수 응답',page:'temp',sec:5,syms:[]},
 {eq:'P = F/A,  P_abs = P_g + P_atm',read:'압력',name:'압력 정의',page:'press',sec:0,syms:[]},
 {eq:'P = ρgh',read:'로 지 에이치',name:'정수압',page:'press',sec:3,syms:[]},
 {eq:'Q = A·v,  ṁ = ρQ',read:'체적·질량 유량',name:'유량',page:'flow',sec:0,syms:[]},
 {eq:'Q ∝ √ΔP',read:'차압식',name:'차압식 유량',page:'flow',sec:1,syms:[]},
 {eq:'E = B·D·v',read:'전자기 유량계',name:'전자기 유량계',page:'flow',sec:2,syms:[]},
 {eq:'f = St·v/d (St ≈ 0.2)',read:'와류 주파수',name:'와류 유량계',page:'flow',sec:2,syms:[]},
 {eq:'h = H − c·t/2,  h = P/(ρg)',read:'레벨',name:'레벨 측정',page:'flow',sec:4,syms:[]},
 {eq:'Sa ≤ 0.81·Sn × 재질 계수',read:'사용 감지거리',name:'근접 센서 감지 거리',page:'prox',sec:2,syms:[]}
);

/* ---- 그림·애니메이션 ---- */
ANIM.tcurves=host=>{let T=25;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 230" role="img" aria-label="온도센서 세 가지 특성"></svg><div class="figctl"><label class="small">온도 <input type="range" min="-40" max="150" step="1" value="25" data-t style="width:170px"> <b data-tv>25 °C</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>같은 온도에서 세 센서가 내는 값. RTD는 곧은 직선, NTC는 급한 곡선(감도 큼·비선형), 열전대는 작은 전압(μV)이에요. [AI 보충: Pt100, NTC 10 kΩ B = 3435, K형 41 μV/°C 근사]</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);const X=t=>40+(t+40)/190*280;
  const rtd=t=>100*(1+0.00385*t),ntc=t=>10*Math.exp(3435*(1/(t+273.15)-1/298.15)),tc=t=>0.041*(t-25);
  const draw=()=>{let a='',b='',c='';for(let t=-40;t<=150;t+=2){a+=(t>-40?'L':'M')+X(t).toFixed(1)+' '+(190-(rtd(t)-80)/80*150).toFixed(1);b+=(t>-40?'L':'M')+X(t).toFixed(1)+' '+(190-Math.min(ntc(t),40)/40*150).toFixed(1);c+=(t>-40?'L':'M')+X(t).toFixed(1)+' '+(120-tc(t)/6*70).toFixed(1)}
   svg.innerHTML=`<line x1="40" y1="190" x2="320" y2="190" style="stroke:var(--ink)"/>${[-40,0,50,100,150].map(t=>`<text x="${X(t)}" y="206" text-anchor="middle" class="small2">${t}</text>`).join('')}${tx(320,222,'온도 (°C) →','small2','end')}
    <path d="${a}" style="fill:none;stroke:var(--accent);stroke-width:2.4"/><path d="${b}" style="fill:none;stroke:var(--warn);stroke-width:2.4"/><path d="${c}" style="fill:none;stroke:var(--unit);stroke-width:2;stroke-dasharray:5 3"/>
    <line x1="${X(T)}" y1="30" x2="${X(T)}" y2="190" style="stroke:var(--muted);stroke-dasharray:2 3"/>${tx(44,22,'RTD','a b2')}${tx(100,22,'NTC','w b2')}${tx(156,22,'열전대(점선)','u b2')}`;
   q('[data-o]').innerHTML=`Pt100: ${rtd(T).toFixed(2)} Ω · NTC: ${ntc(T)>=1?ntc(T).toFixed(2)+' kΩ':(ntc(T)*1000).toFixed(0)+' Ω'} · K형(기준 25 °C): ${(tc(T)*1000).toFixed(0)} μV`;q('[data-tv]').textContent=T+' °C'};
  q('[data-t]').oninput=e=>{T=+e.target.value;draw()};draw();return null};

ANIM.diaph=host=>{let P=0;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 200" role="img" aria-label="MEMS 압력센서 다이어프램"></svg><div class="figctl"><label class="small">압력 <input type="range" min="0" max="100" step="2" value="0" data-p style="width:170px"> <b data-pv>0 kPa</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>압력이 막을 아래로 휘게 하면, 가장자리 압저항(R₁·R₃)은 당겨져 R↑, 가운데(R₂·R₄)는 반대로 R↓ — 네 개가 풀 브리지라 출력이 4배로 커져요. [AI 보충: 배치는 단순화, 감도 가정]</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const draw=()=>{const d=P/100*26;const y=x=>70+d*Math.sin(Math.PI*(x-70)/200);let path='M70 70';for(let x=70;x<=270;x+=5)path+=` L${x} ${y(x).toFixed(1)}`;const k=P/100;
   svg.innerHTML=`<rect x="30" y="64" width="40" height="70" style="fill:var(--muted)"/><rect x="270" y="64" width="40" height="70" style="fill:var(--muted)"/><path d="${path}" style="fill:none;stroke:var(--ink);stroke-width:6"/>
    ${[[90,'R₁','+'],[150,'R₂','−'],[190,'R₄','−'],[250,'R₃','+']].map(([x,l,s])=>`<rect x="${x-10}" y="${y(x)-9}" width="20" height="6" style="fill:${s==='+'?'var(--warn)':'var(--unit)'}"/><text x="${x}" y="${y(x)-14}" text-anchor="middle" class="small2">${l} ${P?s:''}</text>`).join('')}
    ${P?[110,170,230].map(x=>ar(x,18,x,50,'i',1.6)).join(''):''}${tx(170,14,P?'압력 P':'','b2','middle')}${tx(170,150,'공동(진공 = 절대압 / 대기 연결 = 게이지압)','small2','middle')}<rect x="70" y="${74+d}" width="200" height="${60-d}" style="fill:none;stroke:var(--line);stroke-dasharray:3 3"/>${tx(170,186,'실리콘 다이어프램 + 압저항 4개','small2','middle')}`;
   q('[data-o]').innerHTML=`ΔR/R ≈ ±${(k*1).toFixed(2)} % (가정) → 풀 브리지 V_o ≈ V·ΔR/R = 5 V × ${(k*0.01).toFixed(4)} = <b>${(k*50).toFixed(1)} mV</b>`;q('[data-pv]').textContent=P+' kPa'};
  q('[data-p]').oninput=e=>{P=+e.target.value;draw()};draw();return null};

ANIM.pipe=host=>{let v=1;const D=0.05;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 170" role="img" aria-label="관 속 흐름과 유량"></svg><div class="figctl"><label class="small">유속 v <input type="range" min="0.2" max="3" step="0.1" value="1" data-v style="width:160px"> <b data-vv>1 m/s</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>관 지름 50 mm. 같은 관이면 유량은 유속에 비례하고, 오리피스 차압은 유속의 제곱에 비례해요(그래서 유량 = √차압).</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);const P=Array.from({length:30},()=>[Math.random()*300,Math.random()]);let last=0;
  const L=loop(tp=>{const dt=tp-last;last=tp;P.forEach(p=>{const mid=Math.abs(p[1]-0.5)<0.5;p[0]+=dt*v*60*(1-(2*p[1]-1)**2*0.6);if(p[0]>300)p[0]=0});
   const A=Math.PI*D*D/4,Q=A*v;const dp=0.5*1000*v*v*2.5/1000; // 오리피스 가정 계수
   svg.innerHTML=`<rect x="20" y="30" width="300" height="70" style="fill:var(--unit-soft,var(--surface2));stroke:var(--ink);stroke-width:1.6"/><rect x="168" y="30" width="6" height="22" style="fill:var(--ink)"/><rect x="168" y="78" width="6" height="22" style="fill:var(--ink)"/>${tx(171,24,'오리피스','small2','middle')}
    ${P.map(p=>`<circle cx="${20+p[0]}" cy="${36+p[1]*58}" r="2.4" style="fill:var(--accent)"/>`).join('')}${tx(100,122,'P₁ (높음)','small2','middle')}${tx(240,122,'P₂ (낮음)','small2','middle')}
    <rect x="70" y="${150-Math.min(dp,20)*2}" width="16" height="${Math.min(dp,20)*2}" style="fill:var(--warn)"/>${tx(92,150,'ΔP '+dp.toFixed(2)+' kPa (가정)','small2')}`;
   q('[data-o]').innerHTML=`Q = A·v = π(0.05)²/4 × ${v.toFixed(1)} = ${(Q*1000).toFixed(2)} L/s = <b>${(Q*3600).toFixed(2)} m³/h</b>`});
  q('[data-v]').oninput=e=>{v=+e.target.value;q('[data-vv]').textContent=v.toFixed(1)+' m/s'};return L.stop};

Object.assign(FIG,{
 tcFig(){return svgFig(340,150,`<path d="M40 50 L150 50 M40 90 L150 90" style="stroke:var(--warn);stroke-width:3"/><path d="M150 50 L200 70 L150 90" style="fill:none;stroke:var(--unit);stroke-width:3"/>
   <circle cx="200" cy="70" r="6" style="fill:var(--bad)"/>${tx(208,66,'측정 접점 (뜨거움) T','b2')}${tx(40,40,'금속 A','small2')}${tx(40,108,'금속 B','small2')}
   <rect x="20" y="40" width="20" height="60" style="fill:var(--surface2);stroke:var(--ink)"/>${tx(14,126,'냉접점 T_cj (단자부)','small2')}${tx(14,142,'→ 온도를 따로 재서 보상','small2')}${tx(250,120,'V ≈ S·(T − T_cj)','u b2','middle')}`,'열전대 구조','두 금속의 한쪽 끝을 붙인 게 측정 접점, 계측기에 연결되는 쪽이 냉접점이에요.')},
 proxKinds(){const r=[['유도형','금속만','와전류'],['정전용량형','모든 물체','정전용량'],['자기형','자석','리드·홀'],['광전형','대부분','빛 차단·반사'],['초음파형','대부분','ToF']];
  return svgFig(340,190,`<text x="20" y="18" class="small2">종류</text><text x="140" y="18" class="small2">감지 대상</text><text x="240" y="18" class="small2">원리</text>${r.map((x,i)=>`<rect x="14" y="${26+i*32}" width="312" height="26" rx="6" style="fill:${i%2?'var(--surface)':'var(--surface2)'}"/><text x="22" y="${43+i*32}" class="b2">${x[0]}</text><text x="140" y="${43+i*32}" class="small2">${x[1]}</text><text x="240" y="${43+i*32}" class="small2">${x[2]}</text>`).join('')}`,'근접 센서 고르는 표','감지할 물체가 무엇인지가 첫 번째 기준이에요.')},
 npnFig(){return svgFig(340,170,`${tx(85,16,'NPN (싱크)','b2','middle')}${tx(255,16,'PNP (소스)','b2','middle')}
   <rect x="30" y="30" width="110" height="80" rx="8" style="fill:var(--surface);stroke:var(--ink)"/>${tx(85,74,'센서','small2','middle')}<line x1="140" y1="44" x2="160" y2="44" style="stroke:#8a5a2b;stroke-width:3"/><line x1="140" y1="70" x2="160" y2="70" style="stroke:var(--ink);stroke-width:3"/><line x1="140" y1="96" x2="160" y2="96" style="stroke:#2e6fd6;stroke-width:3"/>
   ${tx(164,48,'갈 +V','small2')}${tx(164,74,'흑 출력','small2')}${tx(164,100,'청 0V','small2')}${tx(85,130,'감지 → 출력을 0 V로 당김','small2','middle')}
   <rect x="200" y="30" width="110" height="80" rx="8" style="fill:var(--surface);stroke:var(--ink)"/>${tx(255,74,'센서','small2','middle')}${tx(255,130,'감지 → 출력에 +V 공급','small2','middle')}
   ${tx(170,158,'PLC 입력 공통선(COM)과 짝을 맞춰야 동작','small2','middle')}`,'근접 센서 출력 (3선식)','선 색: 갈색 +V, 청색 0 V, 흑색 출력. NPN은 신호를 빼내고(싱크) PNP는 밀어 줘요(소스).')}
});

/* ---- 문제 생성기 ---- */
Object.assign(GEN,{
 tConv(base){const mode=base?'CK':pick(['CK','KC','CF','FC']);const c=pick([-40,-20,0,25,37,100,200]);const k=c+273.15,f=1.8*c+32;
  const D={CK:[`${c} {{degC}}는 몇 {{K}}인가?`,`${c} + 273.15 = ${fx(k,5)} K`,`${fx(k,5)} K`],KC:[`${fx(k,5)} K는 몇 °C인가?`,`${fx(k,5)} − 273.15 = ${c} °C`,`${c} °C`],CF:[`${c} °C는 몇 {{degF}}인가?`,`1.8 × ${c} + 32 = ${fx(f,4)} °F`,`${fx(f,4)} °F`],FC:[`${fx(f,4)} °F는 몇 °C인가?`,`(${fx(f,4)} − 32) ÷ 1.8 = ${c} °C`,`${c} °C`]}[mode];
  return {kind:base?'기본':'유사',title:'온도 단위 변환',q:D[0],first:['K = °C + 273.15','°F = 1.8·°C + 32'],steps:[{h:'변환',b:`<div class="ln">${D[1]}</div><div class="rd">온도 "차이" 1 K = 1 °C (−40 °C = −40 °F)</div>`}],ans:D[2],ansRead:D[2].replace('°C','도').replace('°F','화씨 도').replace(' K',' 켈빈'),
   calc:calcBlock([[mode==='CK'?[...nk(c),'+','2','7','3','.','1','5','=']:mode==='KC'?[...ks(k),'−','2','7','3','.','1','5','=']:mode==='CF'?['1','.','8','×',...nk(c),'+','3','2','=']:['(',...nk(+f.toFixed(4)),'−','3','2',')','÷','1','.','8','='],mode==='CK'?String(+k.toFixed(2)):mode==='KC'||mode==='FC'?String(c):String(+f.toFixed(4))]],[]),
   easy:'켈빈은 섭씨에 273을 더하면 돼요. 공식(T⁴, 1/T)에는 꼭 켈빈을 넣어요.'}},
 rtdR(base){const R0=base?100:pick([100,1000]);const back=!base&&Math.random()<.5;const T=base?50:pick([-20,0,25,80,150,300]);const R=R0*(1+0.00385*T);
  return {kind:base?'기본':'유사',title:back?'RTD 저항 → 온도':'RTD 온도 → 저항',q:back?`Pt${R0}의 저항이 ${fx(R,6)} Ω이다. 온도는?`:`Pt${R0} (α = 0.00385 /°C)의 ${T} °C에서 저항은?`,first:['R = R₀(1 + αT)','Pt100: 1 °C당 약 0.385 Ω'],
   steps:back?[{h:'식 정리',b:`<div class="ln">T = (R/R₀ − 1)/α</div>`},{h:'계산',b:`<div class="ln">(${fx(R,6)} ÷ ${R0} − 1) ÷ 0.00385 = ${fx(T,4)} °C</div>`}]:[{h:'대입',b:`<div class="ln">${R0} × (1 + 0.00385 × ${T}) = ${fx(R,6)} Ω</div><div class="rd">정밀 계산은 Callendar–Van Dusen 식(2차항 포함) [AI 보충]</div>`}],
   ans:back?`${fx(T,4)} °C`:`${fx(R,6)} Ω`,ansRead:back?`${fxR(T,4)} 도`:`${fxR(R,6)} 옴`,
   calc:calcBlock([[back?['(',...ks(+R.toFixed(4)),'÷',...ks(R0),'−','1',')','÷','0','.','0','0','3','8','5','=']:[...ks(R0),'×','(','1','+','0','.','0','0','3','8','5','×',...nk(T),')','='],casioDec(back?T:R)]],[]),easy:'Pt100은 0 °C에서 100 Ω, 1 °C마다 0.385 Ω씩 늘어요.'}},
 ntcR(base){const R0=10,B=base?3435:pick([3435,3950]);const T=base?50:pick([0,10,40,60,85]);const TK=T+273.15;const R=R0*Math.exp(B*(1/TK-1/298.15));
  return {kind:base?'기본':'응용',title:'NTC 서미스터 저항',q:`25 °C에서 10 kΩ, B = ${B} K인 NTC 서미스터의 ${T} °C 저항은?`,first:['R = R₀·exp[B(1/T − 1/T₀)]','T는 반드시 K'],
   steps:[{h:'K로',b:`<div class="ln">T = ${T} + 273.15 = ${fx(TK,5)} K, T₀ = 298.15 K</div>`},{h:'지수',b:`<div class="ln">B(1/T − 1/T₀) = ${B} × (1/${fx(TK,5)} − 1/298.15) = ${fx(B*(1/TK-1/298.15),4)}</div>`},{h:'저항',b:`<div class="ln">10 × e^(${fx(B*(1/TK-1/298.15),4)}) = ${fx(R,4)} kΩ</div><div class="rd">${T>25?'더 뜨거움 → R↓ (NTC)':'더 차가움 → R↑'}</div>`}],
   ans:`${fx(R,4)} kΩ`,ansRead:`${fxR(R,4)} 킬로옴`,calc:calcBlock([[['1','0','×','SHIFT','ln','(',...ks(B),'×','(','1','÷',...ks(TK),'−','1','÷','2','9','8','.','1','5',')',')','='],casioDec(R)]],['SHIFT ln = eˣ','괄호 개수 확인']),
   easy:'NTC는 데워지면 저항이 확 줄어요. 지수 함수라 곧은 선이 아니에요.'}},
 tcV(base){const S=base?41:pick([41,52]);const typ=S===41?'K':'J';const Tcj=base?25:pick([20,25,30]);const back=!base&&Math.random()<.5;const T=base?425:pick([150,300,500,800]);const V=S*(T-Tcj);
  return {kind:base?'기본':'응용',title:back?'열전대 전압 → 온도 (냉접점 보상)':'열전대 출력 전압',fig:FIG.tcFig(),q:back?`${typ}형 열전대(약 ${S} μV/°C)의 측정 전압이 ${fx(V/1000,4)} mV, 냉접점 온도가 ${Tcj} °C이다. 측정 온도는?`:`${typ}형 열전대(약 ${S} {{uVC}})로 ${T} °C를 잰다. 냉접점이 ${Tcj} °C일 때 출력은 몇 mV인가?`,first:['V ≈ S·(T − T_cj)','μV → mV: ÷ 1000'],
   steps:back?[{h:'온도차',b:`<div class="ln">ΔT = ${fx(V,5)} μV ÷ ${S} = ${fx(T-Tcj,4)} °C</div>`},{h:'냉접점 더하기',b:`<div class="ln">T = ${fx(T-Tcj,4)} + ${Tcj} = ${T} °C</div><div class="rd">보상 안 하면 ${Tcj} °C만큼 낮게 읽음</div>`}]:[{h:'온도차',b:`<div class="ln">${T} − ${Tcj} = ${T-Tcj} °C</div>`},{h:'전압',b:`<div class="ln">${S} μV × ${T-Tcj} = ${fx(V,5)} μV = ${fx(V/1000,4)} mV</div><div class="rd">실제는 비선형 → 표준 열기전력표 사용 [AI 보충]</div>`}],
   ans:back?`${T} °C`:`${fx(V/1000,4)} mV`,ansRead:back?`${T}도`:`${fxR(V/1000,4)} 밀리볼트`,calc:calcBlock([[back?[...ks(+(V/1000).toFixed(4)),'×','1','0','0','0','÷',...ks(S),'+',...ks(Tcj),'=']:[...ks(S),'×','(',...ks(T),'−',...ks(Tcj),')','÷','1','0','0','0','='],back?String(T):casioDec(V/1000)]],[]),
   easy:'열전대는 "차이"만 알려줘요. 기준점 온도를 더해야 진짜 온도예요.'}},
 tauResp(){const tau=pick([2,5,10]),Ti=pick([20,25]),Tf=pick([80,100]),t=pick([1,2,3,5]);const n=t;const val=Tf+(Ti-Tf)*Math.exp(-n);
  return {kind:'응용',title:'시정수와 응답',q:`시정수 τ = ${tau} s인 온도센서를 ${Ti} °C에서 ${Tf} °C 물에 넣었다. ${n*tau} s 뒤 읽는 값은?`,first:['T = T_f + (T_i − T_f)e^(−t/τ)','t = τ면 63.2 %'],
   steps:[{h:'t/τ',b:`<div class="ln">${n*tau}/${tau} = ${n}</div>`},{h:'계산',b:`<div class="ln">${Tf} + (${Ti} − ${Tf}) × e^(−${n}) = ${fx(val,4)} °C</div><div class="rd">진행률 ${fx((1-Math.exp(-n))*100,3)} % · 5τ면 99.3 %</div>`}],
   ans:`${fx(val,4)} °C`,ansRead:`${fxR(val,4)} 도`,calc:calcBlock([[[...ks(Tf),'+','(',...ks(Ti),'−',...ks(Tf),')','×','SHIFT','ln','(−)',...ks(n),')','='],casioDec(val)]],['SHIFT ln = eˣ']),easy:'센서도 데워지는 데 시간이 걸려요. τ 한 번에 63 %, 다섯 번이면 거의 다.'}},
 pConv(base){const U=[['kPa',1e3,'킬로파스칼'],['bar',1e5,'바'],['atm',101325,'기압'],['psi',6894.76,'피에스아이'],['mmHg',133.322,'밀리미터 수은'],['MPa',1e6,'메가파스칼']];let a=base?U[3]:pick(U),b=base?U[0]:pick(U.filter(x=>x!==a));const v=base?30:pick([1,2.5,10,30,100,150]);const r=v*a[1]/b[1];
  return {kind:base?'기본':'유사',title:'압력 단위 변환',q:`${v} ${a[0]}는 몇 ${b[0]}인가?`,first:['먼저 Pa로','1 bar = 10⁵ Pa, 1 atm = 101 325 Pa, 1 psi ≈ 6895 Pa'],
   steps:[{h:'Pa로',b:`<div class="ln">${v} × ${fx(a[1],6)} = ${fx(v*a[1],6)} Pa</div>`},{h:`${b[0]}로`,b:`<div class="ln">${fx(v*a[1],6)} ÷ ${fx(b[1],6)} = ${fx(r,4)} ${b[0]}</div>`}],
   ans:`${fx(r,4)} ${b[0]}`,ansRead:`${fxR(r,4)} ${b[2]}`,calc:calcBlock([[[...ks(v),'×',...ks(a[1]),'÷',...ks(b[1]),'='],casioDec(r)]],[]),easy:'모든 압력 단위를 일단 파스칼로 바꾸고, 다시 원하는 단위로 나눠요.'}},
 absGauge(){const g=pick([200,350,500,-30]);const a=g+101.3;
  return {kind:'유사',title:'게이지압 ↔ 절대압',q:`게이지압 ${g} kPa는 절대압으로 몇 kPa인가? (대기압 101.3 kPa)`,first:['P_abs = P_g + P_atm'],
   steps:[{h:'더하기',b:`<div class="ln">${g} + 101.3 = ${fx(a,5)} kPa(abs)</div><div class="rd">${g<0?'음의 게이지압 = 진공(부압)':'타이어·배관 압력은 보통 게이지압'}</div>`}],ans:`${fx(a,5)} kPa`,ansRead:`${fxR(a,5)} 킬로파스칼`,calc:'<p class="small muted">더하기만 하면 돼요.</p>',easy:'게이지압은 "대기압보다 얼마 더"예요. 대기압을 더하면 진짜(절대) 압력.'}},
 headP(base){const rho=base?1000:pick([1000,1030,800,13600]);const nm={1000:'물',1030:'바닷물',800:'기름',13600:'수은'}[rho];const h=base?10:pick([0.5,2,5,10,25]);const P=rho*9.81*h;const back=!base&&Math.random()<.5;
  return {kind:base?'기본':'유사',title:back?'바닥 압력 → 레벨':'정수압',q:back?`${nm}(ρ = ${rho} kg/m³) 탱크 바닥 압력계가 ${fx(P/1000,4)} kPa(게이지)를 가리킨다. 액위는?`:`${nm}(ρ = ${rho} {{kgm3}}) ${h} m 깊이의 정수압은 몇 kPa인가?`,first:['P = ρgh (g = 9.81)'],
   steps:back?[{h:'식 정리',b:`<div class="ln">h = P/(ρg) = ${fx(P,5)} ÷ (${rho} × 9.81) = ${h} m</div><div class="rd">kPa → Pa: × 1000 먼저</div>`}]:[{h:'대입',b:`<div class="ln">${rho} × 9.81 × ${h} = ${fx(P,5)} Pa = ${fx(P/1000,4)} kPa</div><div class="rd">물 10 m ≈ 98 kPa ≈ 1 bar</div>`}],
   ans:back?`${h} m`:`${fx(P/1000,4)} kPa`,ansRead:back?`${h} 미터`:`${fxR(P/1000,4)} 킬로파스칼`,calc:calcBlock([[back?[...ks(+(P/1000).toFixed(4)),'×','1','0','0','0','÷','(',...ks(rho),'×','9','.','8','1',')','=']:[...ks(rho),'×','9','.','8','1','×',...ks(h),'÷','1','0','0','0','='],back?String(h):casioDec(P/1000)]],[]),
   easy:'깊을수록, 액체가 무거울수록 바닥 압력이 커요. 거꾸로 압력으로 깊이를 알 수 있어요.'}},
 pSens(base){const S=base?2:pick([1.5,2,3]),V=base?10:pick([5,10]),FS=base?1000:pick([100,500,1000]),P=base?250:pick([0.1,0.25,0.5,0.8]).valueOf();const p=base?250:+(P*FS).toFixed(1);const out=S*V*p/FS;
  return {kind:base?'기본':'응용',title:'압력센서 출력 (mV/V)',q:`감도 ${S} {{mVV}} (풀스케일 ${FS} kPa)인 압력센서에 ${V} V를 공급했다. ${p} kPa에서 출력은?`,first:['풀스케일 출력 = 감도 × 공급전압','선형 비례'],
   steps:[{h:'풀스케일 출력',b:`<div class="ln">${S} mV/V × ${V} V = ${S*V} mV (${FS} kPa에서)</div>`},{h:'비례',b:`<div class="ln">${S*V} × ${p}/${FS} = ${fx(out,4)} mV</div>`}],
   ans:`${fx(out,4)} mV`,ansRead:`${fxR(out,4)} 밀리볼트`,calc:calcBlock([[[...ks(S),'×',...ks(V),'×',...ks(p),'÷',...ks(FS),'='],casioDec(out)]],[]),easy:'"1 V 넣으면 최대 2 mV"라는 뜻. 10 V면 20 mV, 압력이 ¼이면 ¼.'}},
 qAv(base){const D=base?50:pick([25,50,80,100]),v=base?2:pick([0.5,1,1.5,2,3]);const A=Math.PI*(D/1000)**2/4,Q=A*v;
  return {kind:base?'기본':'유사',title:'유량 Q = A·v',fig:null,q:`안지름 ${D} mm 관에 물이 ${v} m/s로 흐른다. 유량을 m³/h와 L/min으로?`,first:['mm → m','A = πD²/4','m³/s × 3600 = m³/h, × 60000 = L/min'],
   steps:[{h:'단면적',b:`<div class="ln">A = π × (${D/1000})² ÷ 4 = ${sciT(sci(A,4))} m²</div>`},{h:'유량',b:`<div class="ln">Q = ${sciT(sci(A,4))} × ${v} = ${sciT(sci(Q,4))} m³/s</div>`},{h:'단위',b:`<div class="ln">× 3600 = ${fx(Q*3600,4)} m³/h</div><div class="ln">× 60 000 = ${fx(Q*6e4,4)} L/min</div><div class="rd">1 m³ = 1000 L, 1 h = 60 min</div>`}],
   ans:`${fx(Q*3600,4)} m³/h = ${fx(Q*6e4,4)} L/min`,ansRead:`${fxR(Q*6e4,4)} 리터 퍼 미닛`,calc:calcBlock([[['SHIFT','×10ˣ','×','(',...K(D,-3),')','x²','÷','4','×',...ks(v),'×','3','6','0','0','='],casioDec(Q*3600),'m³/h'],[['Ans','÷','6','0','×','1','0','0','0','='],casioDec(Q*6e4),'L/min']],[W_PI,W_NEG]),
   easy:'관 구멍 넓이 × 물 속도 = 1초에 지나가는 물의 양.'}},
 dpFlow(base){const Q1=base?100:pick([50,100,200]),dP1=base?25:pick([10,25,40]);const k=base?4:pick([0.25,2,4,9]);const dP2=dP1*k,Q2=Q1*Math.sqrt(k);
  return {kind:base?'기본':'응용',title:'차압식 유량 — √ 관계',q:`오리피스 유량계에서 차압 ${dP1} kPa일 때 유량 ${Q1} m³/h였다. 차압이 ${fx(dP2,4)} kPa가 되면 유량은?`,first:['Q ∝ √ΔP'],
   steps:[{h:'비율',b:`<div class="ln">ΔP 비 = ${fx(dP2,4)}/${dP1} = ${k}</div>`},{h:'√',b:`<div class="ln">Q₂ = ${Q1} × √${k} = ${fx(Q2,4)} m³/h</div><div class="rd">차압이 ${k}배여도 유량은 ${fx(Math.sqrt(k),3)}배 → 저유량에서 정밀도 낮음</div>`}],
   ans:`${fx(Q2,4)} m³/h`,ansRead:`${fxR(Q2,4)} 세제곱미터 퍼 아워`,calc:calcBlock([[[...ks(Q1),'×','√■',...ks(fx(dP2,4)),'÷',...ks(dP1),'='],casioDec(Q2)]],[]),easy:'압력 차이가 4배면 유량은 2배예요(루트).'}},
 magE(base){const B=base?0.01:pick([0.005,0.01,0.02]),D=base?100:pick([50,100,200]),v=base?2:pick([0.5,1,3]);const E=B*D/1000*v;
  return {kind:base?'기본':'유사',title:'전자기 유량계 전압',q:`자속밀도 ${B} T, 관 지름 ${D} mm, 유속 ${v} m/s일 때 전극 전압은?`,first:['E = B·D·v','mm → m'],
   steps:[{h:'대입',b:`<div class="ln">${B} × ${D/1000} × ${v} = ${sciT(sci(E))} V = ${fx(E*1e3,4)} mV</div><div class="rd">물이 "움직이는 도선" 역할 — 패러데이 법칙</div>`}],
   ans:`${fx(E*1e3,4)} mV`,ansRead:`${fxR(E*1e3,4)} 밀리볼트`,calc:calcBlock([[[...ks(B),'×',...K(D,-3),'×',...ks(v),'='],casioDec(E)]],[W_NEG]),easy:'자석 사이로 물이 빨리 흐를수록 전압이 커져요.'}},
 vortexF(){const v=pick([1,2,5]),d=pick([10,20,30]);const f=0.2*v/(d/1000);
  return {kind:'유사',title:'와류 주파수',q:`폭 ${d} mm 와류 발생체, 유속 ${v} m/s, St = 0.2일 때 와류 주파수는?`,first:['f = St·v/d'],
   steps:[{h:'대입',b:`<div class="ln">0.2 × ${v} ÷ ${d/1000} = ${fx(f,4)} Hz</div><div class="rd">주파수 ∝ 유속 → 디지털로 세기 쉬움</div>`}],ans:`${fx(f,4)} Hz`,ansRead:`${fxR(f,4)} 헤르츠`,calc:calcBlock([[['0','.','2','×',...ks(v),'÷',...K(d,-3),'='],casioDec(f)]],[W_NEG]),easy:'빠를수록 소용돌이가 자주 생겨요.'}},
 levelToF(base){const H=base?5:pick([3,5,8,10]),c=343;const h=base?2:pick([0.5,1.5,2.5,4].filter(x=>x<H));const t=2*(H-h)/c;
  return {kind:base?'기본':'유사',title:'초음파 레벨계',q:`탱크 바닥에서 ${H} m 높이에 달린 초음파 센서의 에코 시간이 ${fx(t*1e3,4)} ms이다. 액위(바닥 기준)는? (음속 343 m/s)`,first:['거리 = c·t/2','레벨 = H − 거리'],
   steps:[{h:'센서~액면',b:`<div class="ln">343 × ${fx(t*1e3,4)}×10⁻³ ÷ 2 = ${fx(H-h,4)} m</div>`},{h:'레벨',b:`<div class="ln">${H} − ${fx(H-h,4)} = ${fx(h,4)} m</div><div class="rd">온도로 음속이 변해 보정 필요 · 거품·증기에 약함 → 레이더</div>`}],
   ans:`${fx(h,4)} m`,ansRead:`${fxR(h,4)} 미터`,calc:calcBlock([[[...ks(H),'−','3','4','3','×',...K(+(t*1e3).toFixed(4),-3),'÷','2','='],casioDec(h)]],[W_NEG]),easy:'위에서 소리를 쏴서 액면까지 거리를 재고, 탱크 높이에서 빼요.'}},
 snEff(base){const Sn=base?8:pick([2,4,5,8,15]);const M=base?['철(Fe)',1]:pick([['철(Fe)',1],['스테인리스',0.7],['황동',0.5],['알루미늄',0.4],['구리',0.3]]);const Sa=0.81*Sn*M[1];
  return {kind:base?'기본':'유사',title:'근접 센서 사용 감지거리',fig:FIG.proxKinds(),q:`정격 감지거리 Sn = ${Sn} mm 유도형 근접 센서로 ${M[0]} 물체를 감지한다(재질 계수 ${M[1]}). 확실히 감지되는 설치 거리는 몇 mm 이내?`,first:['Sa ≤ 0.81·Sn','× 재질 보정 계수'],
   steps:[{h:'사용 감지거리',b:`<div class="ln">0.81 × ${Sn} = ${fx(0.81*Sn,4)} mm (철 기준)</div><div class="rd">온도·전압·제품 편차 여유</div>`},{h:'재질',b:`<div class="ln">× ${M[1]} = ${fx(Sa,4)} mm</div><div class="rd">재질 계수는 제품마다 다른 대략값 (추정) — 비철금속은 와전류 손실이 달라 감지거리↓</div>`}],
   ans:`${fx(Sa,4)} mm 이내`,ansRead:`${fxR(Sa,4)} 밀리미터`,calc:calcBlock([[['0','.','8','1','×',...ks(Sn),'×',...ks(M[1]),'='],casioDec(Sa)]],[]),easy:'카탈로그 거리의 약 80 %, 그리고 알루미늄·구리면 더 가깝게 붙여야 해요.'}},
 respF(base){const z=base?20:pick([12,24,36,60]),rpm=base?1500:pick([600,1200,3000,6000]);const spec=pick([500,1000,2000]);const f=z*rpm/60;
  return {kind:base?'기본':'응용',title:'응답 주파수 확인',q:`이 ${z}개 기어를 근접 센서로 센다. ${rpm} rpm에서 펄스 주파수는? 응답 주파수 ${spec} Hz 센서로 가능한가?`,first:['f = 이 수 × rpm/60'],
   steps:[{h:'초당 회전',b:`<div class="ln">${rpm} ÷ 60 = ${fx(rpm/60,4)} rev/s</div>`},{h:'펄스',b:`<div class="ln">× ${z} = ${fx(f,4)} Hz</div>`},{h:'판정',b:`<div class="ln">${fx(f,4)} ${f<spec?'<':'>'} ${spec} Hz → ${f<spec?'가능':'불가 (펄스 누락)'}</div>`}],
   ans:`${fx(f,4)} Hz · ${f<spec?'가능':'불가'}`,ansRead:`${fxR(f,4)} 헤르츠`,calc:calcBlock([[[...ks(z),'×',...ks(rpm),'÷','6','0','='],casioDec(f)]],[]),easy:'1초에 지나가는 이빨 수가 센서가 셀 수 있는 속도보다 작아야 해요.'}}
});
PSET.temp=[['tConv',true],['tConv'],['rtdR',true],['rtdR'],['ntcR',true],['ntcR'],['tcV',true],['tcV'],['tauResp'],['selfHeat'],['stefanB']];
PSET.press=[['pConv',true],['pConv'],['pConv'],['absGauge'],['headP',true],['headP'],['pSens',true],['pSens'],['strainV']];
PSET.flow=[['qAv',true],['qAv'],['dpFlow',true],['dpFlow'],['magE',true],['vortexF'],['headP'],['levelToF',true],['levelToF']];
PSET.prox=[['snEff',true],['snEff'],['respF',true],['respF'],['encRes'],['lidarD']];
TOPICS.temp={name:'온도',g:['tConv','rtdR','ntcR','tcV','tauResp']};TOPICS.press={name:'압력',g:['pConv','absGauge','headP','pSens']};TOPICS.flow={name:'유량·레벨',g:['qAv','dpFlow','magE','vortexF','levelToF']};TOPICS.prox={name:'근접·광전',g:['snEff','respF']};
['tConv','rtdR','tcV','pConv','headP','pSens','qAv','dpFlow','magE','levelToF','snEff','respF'].forEach(g=>BASICG.add(g));

const AIX='<p class="small muted">[AI 보충] 강의 밖 확장 장 — 산업 현장 표준 지식 중심.</p>';
PAGES.temp={title:'온도센서',part:'제3편 7장',secs:[
 {k:'단위',h:'온도와 단위',b:`${AIX}<div class="rel mono">T[K] = t[°C] + 273.15 · °F = 1.8·°C + 32</div><div class="warnbox">T⁴, 1/T가 들어간 식(슈테판-볼츠만, 서미스터)에는 반드시 <b>K</b></div>
   <div class="flow"><div>온도</div><div>저항(RTD·서미스터) / 전압(열전대) / 복사(IR)</div><div>브리지·증폭</div><div>ADC → PLC</div></div>`,
  easy:'켈빈은 절대영도(−273 °C)를 0으로 잡은 온도예요.'},
 {k:'RTD',h:'측온저항체 RTD (Pt100)',b:`<div data-anim="tcurves"></div><div class="eqn">R(T) ≈ R₀(1 + αT), α = 0.00385/°C<small>[[rtd|RTD]] · Pt100 = 0 °C에서 100 Ω</small></div>
   <ul class="clean"><li>정밀·안정·거의 선형 → 공정 온도 표준</li><li>3선·4선식으로 리드선 오차 제거, 측정 전류 작게(자기발열)</li></ul>`,
  easy:'백금선 저항은 온도에 거의 정비례해서 늘어요.'},
 {k:'서미스터',h:'서미스터 NTC·PTC',b:`<div class="eqn">R = R₀·exp[B(1/T − 1/T₀)]<small>[[thermistor|NTC]] · B ≈ 3000~4500 K · T는 K</small></div>
   <ul class="clean"><li>감도 매우 큼 (1 °C당 약 −4 %) · 비선형 · 좁은 범위</li><li>가전·배터리 온도, 열전대 냉접점 측정</li><li>PTC: 일정 온도에서 R 급증 → 과전류 차단</li></ul>`,
  easy:'조금만 따뜻해져도 저항이 확 줄어요. 정밀하게 쓰려면 곡선을 보정해야 해요.'},
 {k:'열전대',h:'열전대 — 온도차가 전압으로',b:`${FIG.tcFig()}<div class="eqn">V ≈ S·(T − T_cj)<small>[[seebeck|제벡 효과]] · [[thermocouple|K형]] ≈ 41 {{uVC}}</small></div>
   <ul class="clean"><li>[[cjc|냉접점 보상]] 필수 · 보상도선 사용</li><li>넓은 범위(K형 약 −200~1250 °C)·튼튼·빠름 / 출력 μV 수준·잡음 주의</li></ul>`,
  easy:'두 금속의 온도차가 아주 작은 전압을 만들어요. 기준점 온도를 따로 재서 더해요.'},
 {k:'비교',h:'무엇을 고를까',b:`<div class="tblwrap fit"><table><tr><th></th><th>RTD</th><th>서미스터</th><th>열전대</th></tr><tr><td>범위</td><td class="small">−200~600 °C</td><td class="small">−50~150 °C</td><td class="small">−200~1250 °C+</td></tr><tr><td>정확도</td><td class="small">높음</td><td class="small">좁은 범위서 높음</td><td class="small">보통</td></tr><tr><td>선형성</td><td class="small">좋음</td><td class="small">나쁨</td><td class="small">보통</td></tr><tr><td>출력</td><td class="small">저항</td><td class="small">저항(큰 변화)</td><td class="small">μV 전압</td></tr></table></div>
   <p class="small">비접촉: 적외선 온도계(방사율 설정) · IC 센서(예: 10 mV/°C 선형 출력). 범위는 대략값 [AI 보충].</p><button class="ghost" data-goto="gas" data-i="7">↗ 슈테판-볼츠만·방사율</button>`,
  easy:'정밀하면 RTD, 싸고 민감하면 서미스터, 아주 뜨거우면 열전대.'},
 {k:'응답',h:'응답시간과 시정수',b:`<div class="eqn">T(t) = T_f + (T_i − T_f)e^(−t/τ)<small>[[timeconst|시정수]] τ · 1τ 63.2 % · 5τ 99.3 %</small></div><p class="small">보호관(써모웰)이 두껍고 유속이 느릴수록 τ↑. [현업] 반응기 온도 제어 지연의 원인.</p><button class="ghost" data-goto="char" data-i="5">↗ 응답시간 t₉₀</button>`,
  easy:'센서도 데워지는 데 시간이 걸려서, 바로 정확한 값을 내지 못해요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>K = °C + 273.15 · Pt100: R = 100(1 + 0.00385T)</li><li>NTC: 온도↑ R↓ 지수, T는 K · 열전대 V ≈ S·ΔT + 냉접점 보상</li><li>RTD 정밀 · 서미스터 민감 · 열전대 고온</li></ol>
   <details class="qa"><summary>열전대에 냉접점 보상이 필요한 이유는?</summary><div>열전대는 측정점과 기준점의 온도 "차이"에 비례하는 전압만 내기 때문.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};

PAGES.press={title:'압력센서',part:'제3편 8장',secs:[
 {k:'단위',h:'압력과 단위',b:`${AIX}<div class="eqn">P = F/A<small>[[pressure|압력]] {{Pa}} = N/m²</small></div>
   <div class="rel mono">1 kPa = 10³ Pa · 1 bar = 100 kPa · 1 atm = 101.325 kPa<br>1 psi ≈ 6.895 kPa · 1 mmHg ≈ 133.3 Pa · 1 MPa = 10 bar</div>`,
  easy:'1 bar는 대략 1기압. 타이어 30 psi ≈ 207 kPa ≈ 2 bar예요.'},
 {k:'기준',h:'절대압·게이지압·차압',b:`<div class="f4"><div><div class="h">절대압 (abs)</div>진공 기준 · 기압계·진공 공정</div><div><div class="h">게이지압 (g)</div>대기압 기준 · 배관·타이어</div><div><div class="h">차압 (d)</div>두 점 차이 · 유량·필터 막힘·레벨</div></div><div class="rel mono">P_abs = P_g + P_atm</div><p class="small">[[gaugeabs|압력 기준]]을 헷갈리면 약 100 kPa씩 틀려요.</p>`,
  easy:'타이어 게이지 0은 "대기압과 같다"는 뜻이지 진공이 아니에요.'},
 {k:'감지 원리',h:'다이어프램 + 압저항',b:`<div data-anim="diaph"></div>
   <div class="tblwrap fit"><table><tr><th>방식</th><th>원리</th><th>특징</th></tr><tr><td>압저항 (MEMS)</td><td class="small">[[diaphragm|다이어프램]] 휨 → ρ 변화</td><td class="small">소형·저가·온도 보상 필요</td></tr><tr><td>정전용량</td><td class="small">휨 → 간격 d 변화 → C</td><td class="small">고감도·저전력</td></tr><tr><td>압전</td><td class="small">힘 → 전하</td><td class="small">동압·폭발만 (정압 X)</td></tr><tr><td>스트레인 게이지</td><td class="small">금속 다이어프램 + 게이지</td><td class="small">고압·튼튼</td></tr></table></div>
   <button class="ghost" data-goto="resist" data-i="2">↗ 압저항 효과</button>`,
  easy:'얇은 막이 압력에 휘고, 그 휨을 저항·정전용량으로 읽어요.'},
 {k:'정수압',h:'정수압 — 깊이와 압력',b:`<div class="eqn">P = ρgh<small>[[hydrostatic|정수압]] · 물 10 m ≈ 98 kPa ≈ 1 bar</small></div><p>탱크 바닥 압력 → 액위 측정(레벨). 밀도가 바뀌면 오차.</p><button class="ghost" data-goto="flow" data-i="4">↗ 레벨 측정</button>`,
  easy:'물 10 m 아래는 대기압 하나가 더 얹힌 것과 같아요.'},
 {k:'사양',h:'사양 읽기',b:`<ul class="clean"><li>감도 mV/V (공급 1 V당 풀스케일 출력)</li><li>측정 범위·과압 한계·파열압</li><li>오차 %FS · 온도 드리프트 · 응답 주파수</li><li>출력: mV(브리지) · 0~10 V · 4~20 mA(현장 표준)</li></ul><button class="ghost" data-goto="plant" data-i="2">↗ 4~20 mA</button>`,
  easy:'"2 mV/V"면 10 V 넣었을 때 최대 압력에서 20 mV가 나와요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>1 bar = 100 kPa, 1 atm = 101.325 kPa, 1 psi ≈ 6.9 kPa</li><li>P_abs = P_g + P_atm · P = ρgh</li><li>MEMS: 다이어프램 + 압저항 풀 브리지 · 압전형은 정압 불가</li></ol><button class="primary" data-goto="cards">카드로 외우기</button>`}
]};

PAGES.flow={title:'유량·레벨센서',part:'제3편 9장',secs:[
 {k:'유량',h:'유량이란',b:`${AIX}<div data-anim="pipe"></div><div class="eqn">Q = A·v,  ṁ = ρQ<small>[[flowrate|유량]] {{m3h}} · {{Lmin}} · 질량유량 {{kgs}}</small></div><div class="rel mono">1 m³/h = 16.67 L/min · 1 m³ = 1000 L</div>`,
  easy:'관 단면적 × 속도 = 1초에 지나가는 부피.'},
 {k:'차압식',h:'차압식 — 가장 오래된 방식',b:`<div class="eqn">Q ∝ √ΔP<small>[[dpflow|오리피스·벤투리]] · 베르누이</small></div><ul class="clean"><li>유량 2배 → 차압 4배 → 저유량 정밀도↓ (측정 범위비 약 3~4:1)</li><li>구조 간단·표준화, 압력 손실</li></ul>`,
  easy:'좁은 곳에서 빨라지면 압력이 떨어져요. 그 차이의 루트가 유량이에요.'},
 {k:'여러 방식',h:'유량계 종류',b:`<div class="f4"><div><div class="h">[[magflow|전자기]]</div><div class="ln">E = B·D·v</div><div class="rd">전도성 액체만 · 손실 없음</div></div><div><div class="h">초음파</div>상류·하류 전파 시간차 · 외부 부착형</div>
    <div><div class="h">[[vortex|와류]]</div><div class="ln">f = St·v/d</div><div class="rd">증기·가스·액체</div></div><div><div class="h">[[massflow|질량 (코리올리·열식)]]</div>질량 직접 측정 · 코리올리식 고정밀</div><div><div class="h">터빈</div>회전수 ∝ 유속 · 깨끗한 유체</div></div>
   <button class="ghost" data-goto="induct">↗ 패러데이 법칙</button> <button class="ghost" data-goto="gyro" data-i="2">↗ 코리올리 힘</button>`,
  easy:'전기·소리·소용돌이·비틀림·바퀴 — 흐름을 재는 방법이 이렇게 많아요.'},
 {k:'고르기',h:'유량계 고르는 기준',b:`<ul class="clean"><li>유체: 액체/가스/증기, 전도성, 이물질</li><li>체적이 필요한가 질량이 필요한가 (거래·배합 → 질량)</li><li>관경·압력 손실·직관부 길이·비용</li></ul><p class="small"><b>[현업]</b> 정수장 = 전자기, 증기 = 와류·차압, 정밀 배합 = 코리올리.</p>`,
  easy:'무엇이 흐르는지, 얼마나 정확해야 하는지로 골라요.'},
 {k:'레벨',h:'레벨 측정',b:`<div class="rel mono">h = P/(ρg) · h = H − c·t/2</div><div class="f4"><div><div class="h">정수압식</div>바닥 압력 → 밀도 알아야 함</div><div><div class="h">초음파·레이더</div>위에서 ToF · 레이더는 증기·거품에 강함</div><div><div class="h">정전용량식</div>전극과 탱크 사이 유전체 높이</div><div><div class="h">플로트·스위치</div>상·하한 경보 (포인트)</div></div>
   <p>[[level|레벨 센서]]: 연속 측정과 포인트(스위치) 측정을 구분.</p><button class="ghost" data-goto="ultra" data-i="2">↗ 초음파 거리 측정</button>`,
  easy:'바닥에서 압력으로, 위에서 메아리로, 옆에서 콘덴서로 높이를 재요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>Q = A·v · 1 m³/h = 16.67 L/min</li><li>차압 Q ∝ √ΔP · 전자기 E = BDv(전도성만) · 와류 f = St·v/d</li><li>레벨 h = P/(ρg), h = H − ct/2</li></ol><button class="primary" data-goto="cards">카드로 외우기</button>`}
]};

PAGES.prox={title:'근접·광전센서',part:'제3편 10장',secs:[
 {k:'종류',h:'근접 센서 — 닿지 않고 감지',b:`${AIX}${FIG.proxKinds()}<p>공장 자동화에서 가장 많이 쓰는 ON/OFF 센서. 물체 유무·위치·개수·회전 감지.</p>`,
  easy:'손대지 않고 "물건이 왔다"를 알려주는 스위치예요.'},
 {k:'유도·정전용량',h:'유도형 vs 정전용량형',b:`<div class="f4"><div><div class="h">[[proximity|유도형]]</div>고주파 자기장 → 금속 와전류 → 발진 감쇠 · 금속만 · 튼튼</div><div><div class="h">[[capprox|정전용량형]]</div>물체 접근 → C 증가 · 플라스틱·물·분말 · 감도 조정</div></div>
   <p class="small">[[shielded|차폐형]]은 거리 짧지만 매립 가능, 비차폐형은 거리 김.</p><button class="ghost" data-goto="speed" data-i="6">↗ 와전류 감지 애니메이션</button>`,
  easy:'금속만 볼 거면 유도형, 금속 아닌 것도 볼 거면 정전용량형.'},
 {k:'감지 거리',h:'감지 거리와 히스테리시스',b:`<div class="eqn">Sa ≤ 0.81·Sn × 재질 계수<small>[[snDist|감지 거리]] · 표준 타겟 = 철</small></div>
   <ul class="clean"><li>재질 계수(대략): 철 1 · 스테인리스 0.6~1 · 황동 0.5 · 알루미늄 0.4 · 구리 0.3 (추정, 제품마다 다름)</li><li>[[hysteresis|히스테리시스]]: 켜지는 거리와 꺼지는 거리 차 → 경계에서 깜빡임(채터링) 방지</li><li>응답 주파수: 초당 감지 가능 횟수</li></ul>`,
  easy:'카탈로그 거리의 80 % 안에서, 금속 종류에 따라 더 가깝게.'},
 {k:'광전',h:'광전 센서',b:`<div class="f4"><div><div class="h">투과형</div>송·수광기 마주 봄 · 가장 멀리 · 불투명체</div><div><div class="h">회귀반사형</div>반사판 · 한쪽만 배선 · 투명체 주의</div><div><div class="h">확산반사형</div>물체 반사 · 색·광택 영향 · BGS로 배경 무시</div></div><p>[[photoelec|광전 센서]]: 수 m~수십 m 감지.</p><button class="ghost" data-goto="optic" data-i="4">↗ 광학 원리</button>`,
  easy:'빛이 가려지거나 튕겨 오는 걸로 물건을 알아요.'},
 {k:'배선',h:'출력과 배선',b:`${FIG.npnFig()}<ul class="clean"><li>[[npnpnp|NPN·PNP]] · NO(평상시 열림)·NC(평상시 닫힘)</li><li>2선식(부하 직렬), 3선식(+V·0V·출력), IO-Link(디지털 통신+진단)</li></ul><p class="small"><b>[현업]</b> 유럽 설비는 PNP, 아시아 설비는 NPN이 많았음 — PLC 입력 카드와 꼭 맞추기 (추정·지역차).</p>`,
  easy:'센서 출력 방식과 PLC 입력 방식이 짝이 맞아야 신호가 들어가요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>유도형 = 금속(와전류) · 정전용량형 = 모든 물체 · 광전형 = 빛</li><li>Sa ≤ 0.81·Sn × 재질 계수 · 히스테리시스로 채터링 방지</li><li>NPN 싱크 / PNP 소스 · 갈 +V, 청 0V, 흑 출력</li></ol><button class="primary" data-goto="cards">카드로 외우기</button>`}
]};

CARDS.push(
 {id:'t1',tag:'온도',f:'Pt100 저항 식',a:'R = 100(1 + 0.00385T) Ω',r:'1 °C당 0.385 Ω',e:''},
 {id:'t2',tag:'온도',f:'NTC 서미스터 식',a:'R = R₀·exp[B(1/T − 1/T₀)], T는 K',r:'온도↑ R↓',e:''},
 {id:'t3',tag:'온도',f:'열전대 원리와 필수 보상',a:'제벡 효과 · 냉접점 보상',r:'K형 약 41 μV/°C',e:''},
 {id:'t4',tag:'온도',f:'RTD·서미스터·열전대 한 줄 비교',a:'RTD 정밀·선형 / 서미스터 민감·비선형 / 열전대 고온·넓은 범위',r:'',e:''},
 {id:'t5',tag:'온도',f:'시정수 τ의 의미',a:'최종 변화의 63.2 %에 도달하는 시간',r:'5τ → 99.3 %',e:''},
 {id:'p1',tag:'압력',f:'1 bar, 1 atm, 1 psi',a:'100 kPa · 101.325 kPa · 6.895 kPa',r:'',e:''},
 {id:'p2',tag:'압력',f:'절대압과 게이지압 관계',a:'P_abs = P_g + P_atm',r:'',e:''},
 {id:'p3',tag:'압력',f:'정수압 식',a:'P = ρgh (물 10 m ≈ 1 bar)',r:'',e:''},
 {id:'p4',tag:'압력',f:'MEMS 압력센서 구조',a:'실리콘 다이어프램 + 압저항 4개 풀 브리지',r:'',e:''},
 {id:'f1',tag:'유량',f:'유량 Q와 단위 환산',a:'Q = A·v · 1 m³/h = 16.67 L/min',r:'',e:''},
 {id:'f2',tag:'유량',f:'차압식 유량계 관계',a:'Q ∝ √ΔP',r:'유량 2배 → 차압 4배',e:''},
 {id:'f3',tag:'유량',f:'전자기 유량계 식과 한계',a:'E = B·D·v · 전도성 액체만',r:'',e:''},
 {id:'f4',tag:'유량',f:'코리올리 유량계가 재는 것',a:'질량유량 (+ 밀도)',r:'관의 비틀림 위상차',e:''},
 {id:'x1',tag:'근접',f:'유도형 vs 정전용량형 근접 센서',a:'유도형 금속만(와전류) · 정전용량형 모든 물체',r:'',e:''},
 {id:'x2',tag:'근접',f:'사용 감지거리 Sa',a:'≤ 0.81·Sn × 재질 계수',r:'',e:''},
 {id:'x3',tag:'근접',f:'NPN과 PNP 출력',a:'NPN 싱크(0 V로 당김) · PNP 소스(+V 공급)',r:'',e:''}
);
