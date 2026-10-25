/* ═════════ 제3편 1장 가스센서 ═════════ */
Object.assign(TERM,{
 gassensor:{ko:'가스센서',en:'Gas sensor',gen:'특정 가스를 알아채 농도를 전기 신호로 바꾸는 센서.',tech:'기체·액체 속 특정 가스를 감지해 농도에 따라 전기신호로 변환하는 소자. 저항형(반도체식), 접촉연소식, 광학식, 전기화학식, GC 등. 하나의 센서로 모든 가스를 검출할 수는 없다.',easy:'코 대신 냄새(가스)를 맡아 "얼마나 있는지" 숫자로 알려 주는 부품.'},
 reducing:{ko:'환원성 가스',en:'Reducing gas',gen:'산소를 빼앗고 전자를 내주는 가스.',tech:'H₂, CO, CH₄, C₂H₂, C₃H₈, C₄H₁₀ 등. 표면 흡착 산소와 반응해 포획됐던 전자를 반도체로 되돌려 준다.',easy:'전자를 "주는" 가스. 수소·일산화탄소·메탄 같은 연료 가스가 대부분.'},
 oxidizing:{ko:'산화성 가스',en:'Oxidizing gas',gen:'전자를 빼앗는 가스.',tech:'O₂, NO₂, O₃, Cl₂ 등. 전자 수용체(electron acceptor)로 표면에서 전자를 포획한다. CO₂는 불연성·비산화성으로 분류.',easy:'전자를 "뺏는" 가스.'},
 pd:{ko:'팔라듐',en:'Palladium (Pd)',gen:'수소를 잘 빨아들이는 금속.',tech:'수소 흡수능·용해도가 높아 상온에서 수소 감지 가능. 상온 수소 확산계수 3.8 × 10⁻⁸ cm²/s. PdHₓ 형성 시 부피 최대 약 10.9 % 팽창.',easy:'스펀지처럼 수소를 빨아들이는 은색 금속이에요.'},
 pdni:{ko:'팔라듐-니켈 합금',en:'Pd–Ni alloy',gen:'Pd에 니켈을 조금 섞은 것.',tech:'Ni 약 4~8 % 첨가로 격자 팽창·상전이를 억제 → 히스테리시스·기계적 손상 감소, 안정성·신뢰성 향상. 대신 감도는 감소할 수 있음.',easy:'잘 부풀어 금이 가던 Pd에 니켈을 섞어 덜 부풀게 만든 것.'},
 fourwire:{ko:'4선식 측정',en:'4-wire (Kelvin) measurement',gen:'전류선과 전압선을 따로 쓰는 측정.',tech:'정전류원으로 전류선에 I를 흘리고, 입력 임피던스가 매우 큰 전압계로 별도 전압선에서 센서 양단 V를 잰다. 전압선에는 전류가 거의 흐르지 않아 선 저항 전압강하가 없다. Rs = Vs/Is.',easy:'긴 전선 저항 때문에 틀리지 않도록, 전기를 보내는 줄과 재는 줄을 따로 쓰는 방법.'},
 bridge:{ko:'휘트스톤 브리지',en:'Wheatstone bridge',gen:'저항 4개로 아주 작은 저항 변화를 재는 회로.',tech:'두 전압 분배기의 중간점 전위차를 출력으로 하는 회로. 평형 조건 R₁R₃ = R₂R₄. 같은 재료의 기준 저항을 써서 온도에 의한 공통 변화를 상쇄하고 작은 ΔR을 차동 출력으로 바꾼다.',easy:'시소 양쪽에 같은 무게를 올려 두면, 한쪽에 아주 작은 무게만 더해도 기울어지는 것을 보는 회로.'},
 depletion:{ko:'공핍층',en:'Depletion layer',gen:'전자가 빠져 텅 빈 층.',tech:'n형 산화물 표면에 흡착한 산소가 전자를 포획해 생기는 전자 결핍 영역. 두꺼워지면 전위장벽↑, 저항↑.',easy:'전자가 지나가는 길 위에 생긴 "빈 땅". 넓어질수록 지나가기 어려워요.'},
 sensitization:{ko:'감응화 (나노입자)',en:'Electrical / Chemical sensitization',gen:'금속 나노입자로 감도 높이기.',tech:'전기적: 금속 NP와 쇼트키 접합 → 공핍층 형성 → 신호 증폭. 화학적: NP의 촉매 작용 → 활성 산소종↑ → 가스-산소 반응↑ → 감도↑.',easy:'표면에 금속 가루를 뿌려 가스가 더 잘 반응하게 만드는 양념이에요.'},
 microheater:{ko:'마이크로히터',en:'Microheater',gen:'아주 작은 전기 난로.',tech:'센서 표면을 주변보다 높은 일정 온도로 유지하는 MEMS 발열체. 재료 Pt(녹는점 1768 °C, 고온 안정·내산화, 저항 온도의존성 안정). 줄 가열 P = I²R.',easy:'가스센서가 잘 반응하도록 따뜻하게 데워 주는 손톱보다 작은 난로.'},
 joule:{ko:'줄 가열',en:'Joule heating',gen:'전류가 흐르면 열이 나는 현상.',tech:'전자가 격자·불순물과 충돌하며 전기 에너지가 열로 변환. P = I²R = VI. 방열 무시 시 VIt = Cₚ m ΔT.',easy:'전선이나 전기장판이 따뜻해지는 원리예요.'},
 stefan:{ko:'스테판-볼츠만 법칙',en:'Stefan–Boltzmann law',gen:'뜨거울수록 빛(열)을 훨씬 많이 낸다.',tech:'흑체 복사 에너지 P = σT⁴, σ = 5.67 × 10⁻⁸ W/(m²·K⁴). 실제 물체는 P = εσT⁴ (ε 방사율). T는 절대온도(K).',easy:'온도가 2배면 내뿜는 열은 16배(2⁴)예요.'},
 emissivity:{ko:'방사율',en:'Emissivity (ε)',gen:'표면이 열(적외선)을 얼마나 잘 내보내나.',tech:'같은 온도의 흑체 대비 방사 에너지 비. 0.6이면 흑체의 60 %. IR 카메라에 맞게 입력하지 않으면 온도 오차.',easy:'검은 냄비는 잘 내뿜고(높음), 반짝이는 금속은 잘 못 내뿜어요(낮음).'},
 gc:{ko:'가스 크로마토그래피',en:'GC (Gas Chromatography)',gen:'섞인 가스를 하나씩 갈라서 재는 장치.',tech:'운반 가스(N₂·He)가 시료를 컬럼(2~50 m)으로 밀고, 고정상과의 상호작용 차이로 성분별 이동 속도가 달라져 분리. 머무름 시간으로 식별, 피크 면적으로 정량. 검출기 TCD·FID.',easy:'운동장 달리기에서 빠른 아이·느린 아이가 결승선에 따로 들어오듯 가스를 떼어 놓는 장치.'},
 retention:{ko:'머무름 시간',en:'Retention time',gen:'컬럼을 빠져나오는 데 걸린 시간.',tech:'시료 주입부터 검출 피크까지의 시간. 고정상과 강하게 상호작용할수록 길다. 성분 식별에 사용.',easy:'결승선 도착 시간. 시간으로 누구인지 알아봐요.'},
 baseline:{ko:'기준선 드리프트',en:'Baseline drift',gen:'가스가 없을 때 값이 슬금슬금 변함.',tech:'기준 출력이 시간에 따라 점진적으로 변하는 현상. 원인: 온습도·압력, 오염·잔류가스·노화, 불완전 탈착, 전원·회로·ADC offset. 해결: 온습도 보상, 주기 교정, baseline 보정 알고리즘, aging.',easy:'아무것도 안 올린 저울 숫자가 조금씩 변하는 것.'},
 selectivity:{ko:'선택성',en:'Selectivity',gen:'원하는 가스에만 반응하나.',tech:'여러 가스 중 목표 가스에 선택적으로 반응하는 특성. 방해 가스와의 교차감응(cross-sensitivity) 평가. 향상: 감지물질 선택, 동작온도 최적화, 다공성 막·필터, 센서 어레이 + 패턴 인식.',easy:'여러 냄새 속에서 커피 냄새만 골라 맡는 능력.'},
 dga:{ko:'유중가스 분석',en:'DGA (Dissolved Gas Analysis)',gen:'변압기 기름 속 가스 검사.',tech:'변압기 절연유(미네랄오일)에 녹은 수소 등 가스를 분석해 내부 이상(방전·과열)을 진단.',easy:'변압기 기름에 수소가 생기면 속이 아프다는 신호예요.'}
});
Object.assign(UNIT,{
 ugL:{s:'μg/L',r:'마이크로그램 퍼 리터',mean:'1 L 안에 몇 μg. H₂ 1 ppm ≈ 0.0889 μg/L'},
 Lmol:{s:'L/mol',r:'리터 퍼 몰',mean:'기체 1몰의 부피. 22.71 L/mol (0 °C, 1 bar) 또는 22.4 L/mol (0 °C, 1 atm)'},
 gmol:{s:'g/mol',r:'그램 퍼 몰',mean:'몰 질량 M. H₂ 2.02, CO 28.01, NO₂ 46.01'},
 mol:{s:'mol',r:'몰',mean:'개수 묶음. 1 mol = 6.02 × 10²³ 개 (아보가드로 수)'},
 L:{s:'L',r:'리터',mean:'1 L = 10³ cm³ = 10⁻³ m³'},
 cm2s:{s:'cm²/s',r:'제곱센티미터 퍼 세컨드',mean:'확산계수 단위'},
 JkgK:{s:'J/(kg·K)',r:'줄 퍼 킬로그램 켈빈',mean:'비열 Cₚ. Pt 약 133 J/(kg·K)'},
 J:{s:'J',r:'줄',mean:'에너지 단위. 1 J = 1 W × 1 s'}, W:{s:'W',r:'와트',mean:'전력 단위. 1 W = 1 J/s'}, mW:{s:'mW',r:'밀리와트',mean:'1 mW = 10⁻³ W'},
 K:{s:'K',r:'켈빈',mean:'절대온도. K = °C + 273.15'},
 Wm2K4:{s:'W/(m²·K⁴)',r:'와트 퍼 제곱미터 켈빈 4제곱',mean:'σ = 5.67 × 10⁻⁸'},
 ohm2:{s:'Ω',r:'옴',mean:'저항 단위'}, kohm:{s:'kΩ',r:'킬로옴',mean:'1 kΩ = 10³ Ω'},
 cm3:{s:'cm³',r:'세제곱센티미터',mean:'1 cm³ = 10⁻⁶ m³ = 1 mL'}
});
FORM.push(
 {eq:'1 % = 10⁴ ppm',read:'1퍼센트는 만 피피엠',name:'농도 단위',page:'gas',sec:1,syms:[]},
 {eq:'ppm → mol → g → 개',read:'÷ Vm, × M, × N_A',name:'ppm 연쇄 변환',page:'gas',sec:1,syms:[['Vm','22.71 (또는 22.4)','Lmol'],['M','몰 질량','gmol']]},
 {eq:'V_o = V_in[R₃/(R₂+R₃) − R₄/(R₁+R₄)]',read:'왼쪽 가운데점 전압 빼기 오른쪽 가운데점 전압',name:'휘트스톤 브리지 출력',page:'gas',sec:4,syms:[]},
 {eq:'R_s = V_s / I_s',read:'센서 저항은 전압 나누기 전류',name:'4선식',page:'gas',sec:3,syms:[]},
 {eq:'P = I²R = VI',read:'피는 아이 제곱 알',name:'줄 가열',page:'gas',sec:7,syms:[['P','전력','W']]},
 {eq:'VI·t = Cₚ·m·ΔT',read:'전기 에너지 = 온도 올리는 열',name:'히터 온도 상승 (방열 무시)',page:'gas',sec:7,syms:[['Cₚ','비열','JkgK'],['m','질량','kg'],['ΔT','온도 변화','K']]},
 {eq:'P = εσT⁴',read:'피는 엡실론 시그마 티의 4제곱',name:'스테판-볼츠만',page:'gas',sec:7,syms:[['T','절대온도','K'],['σ','5.67 × 10⁻⁸','Wm2K4']]},
 {eq:'피크 면적 ≈ ½ × w_b × h',read:'2분의 1 밑변 곱하기 높이',name:'GC 피크 면적',page:'gas',sec:8,syms:[]}
);

/* ── 그림 ── */
Object.assign(FIG,{
 fourWire(){return svgFig(340,200,`
   <rect x="250" y="70" width="60" height="60" rx="6" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/>${tx(280,104,'센서 Rs','b2','middle')}
   <circle cx="40" cy="60" r="16" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/>${ar(40,70,40,50,'i',1.6)}${tx(40,94,'정전류원','small2','middle')}
   <path d="M56 60 H250 M40 76 V170 H250 V130" style="fill:none;stroke:var(--accent);stroke-width:2.4"/><path d="M250 60 V70" style="stroke:var(--accent);stroke-width:2.4"/>
   ${tx(150,52,'전류선 (긴 선) — I 흐름','a small2','middle')}${ar(130,60,170,60,'a',2)}
   <circle cx="150" cy="115" r="16" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/>${tx(150,120,'V','b2','middle')}
   <path d="M166 108 H236 V84 H250 M166 122 H236 V118 H250" style="fill:none;stroke:var(--unit);stroke-width:2;stroke-dasharray:5 3"/>
   ${tx(150,146,'전압선 — I ≈ 0','u small2','middle')}${tx(150,162,'(전압계 입력 임피던스 매우 큼)','m small2','middle')}
   ${tx(170,192,'Rs = Vs ÷ Is · 선 저항 전압강하 제거','b2','middle')}`,'4선식 측정',
   '<b>전류는 바깥 선(초록)</b>, <b>전압은 안쪽 선(파랑)</b>으로. 전압선에는 전류가 거의 안 흘러서 긴 선의 저항이 있어도 전압이 떨어지지 않아요.')},
 ppmChain(){const st=(x,t1,t2)=>`<rect x="${x}" y="40" width="60" height="44" rx="8" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.4"/>${tx(x+30,60,t1,'b2','middle')}${tx(x+30,76,t2,'small2','middle')}`;
  return svgFig(340,130,`${st(2,'ppm','부피비')}${st(70,'L','가스 부피')}${st(138,'mol','몰')}${st(206,'g','질량')}${st(274,'개','원자·분자')}
   ${[62,130,198,266].map(x=>ar(x,62,x+8,62,'i',1.4)).join('')}
   ${tx(66,104,'× 전체 부피','a small2','middle')}${tx(134,104,'÷ Vm','a small2','middle')}${tx(202,104,'× M','a small2','middle')}${tx(270,104,'× N_A','a small2','middle')}
   ${tx(170,124,'Vm = 22.71 L/mol (강의) · 22.4 L/mol (작년 풀이) — 문제에서 준 값 사용','m small2','middle')}`,'ppm 연쇄 변환')},
 heater(){return svgFig(340,190,`
   <rect x="30" y="128" width="280" height="36" style="fill:var(--surface2);stroke:var(--line)"/>${tx(170,151,'기판 (substrate)','m small2','middle')}
   <path d="M120 120 h18 v-10 h18 v10 h18 v-10 h18 v10 h18 v-10 h18 v10 h18" style="fill:none;stroke:var(--bad);stroke-width:4"/>
   ${tx(14,112,'Pt 히터','b b2')}${tx(14,128,'P = I²R','b small2')}
   ${ar(150,104,134,66,'w',2)}${ar(190,100,190,62,'w',2)}${ar(230,104,246,66,'w',2)}${tx(190,52,'열손실: 전도·대류·복사','small2','middle')}
   ${ar(276,132,276,176,'w',2)}${tx(270,184,'기판으로 전도','small2','end')}
   ${tx(10,22,'발열 = 방열 → 열평형 → 온도 일정','a b2')}`,'마이크로히터 열평형',
   '전압을 걸면 처음엔 데워지다가, <b>발열량 = 열손실</b>이 되는 순간 온도가 멈춰요(열평형). 주변이 차가워지면 열손실↑ → 전류를 늘려 같은 온도를 유지.')}
});

/* ── 움직이는 그림 ── */
ANIM.pdH=host=>{let ni=false,cnt=0,mols=[];
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 230" role="img" aria-label="Pd 수소 흡수"></svg>
   <div class="figctl"><button class="tbtn" data-ni aria-pressed="false">Pd–Ni 합금으로</button><button class="tbtn" data-rs>처음부터</button></div>
   <figcaption>H₂가 표면에 붙음 → <b>H 원자 2개로 해리</b> → Pd 격자 틈으로 확산 → PdHₓ → 격자가 늘어나고 <b>저항이 변해요</b>. Pd–Ni는 덜 늘어나서 금이 덜 가지만 변화(감도)도 작아요.</figcaption></figure>`;
  const svg=host.querySelector('svg');const q=s=>host.querySelector(s);
  const sites=[];for(let r=0;r<4;r++)for(let c=0;c<6;c++)sites.push([c,r]);
  const filled=new Set();
  const L=loop(tp=>{if(Math.random()<0.04&&mols.length<3&&filled.size<20)mols.push({x:60+Math.random()*220,y:0,ph:0});
    const exp=1+(ni?0.025:0.07)*filled.size/20;const gx=46*exp,gy=30*exp,ox=170-2.5*gx,oy=90;
    let mh='';mols=mols.filter(m=>{m.y+=1.2;if(m.y<70){mh+=`<circle cx="${m.x-5}" cy="${m.y}" r="5" style="fill:var(--unit)"/><circle cx="${m.x+5}" cy="${m.y}" r="5" style="fill:var(--unit)"/>`;return true}
      m.ph+=1;const sp=Math.min(14,m.ph);mh+=`<circle cx="${m.x-5-sp}" cy="76" r="4" style="fill:var(--unit)"/><circle cx="${m.x+5+sp}" cy="76" r="4" style="fill:var(--unit)"/>`;
      if(m.ph>30){for(let k=0;k<2;k++){const free=sites.map((s,i)=>i).filter(i=>!filled.has(i));if(free.length)filled.add(free[Math.floor(Math.random()*free.length)])}return false}return true});
    let lat='';for(let r=0;r<4;r++)for(let c=0;c<6;c++){const x=ox+c*gx,y=oy+r*gy;const isNi=ni&&((r*6+c)%7===3);lat+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" style="fill:${isNi?'var(--accent)':'var(--muted)'}"/>`}
    let hs='';filled.forEach(i=>{const [c,r]=sites[i];hs+=`<circle cx="${(ox+(c+.5)*gx).toFixed(1)}" cy="${(oy+(r+.5)*gy).toFixed(1)}" r="3.5" style="fill:var(--unit)"/>`});
    const R=100+filled.size*(ni?0.6:1.5);
    svg.innerHTML=`<line x1="20" y1="82" x2="320" y2="82" style="stroke:var(--line);stroke-dasharray:4 3"/>${tx(318,78,'표면','m small2','end')}${mh}${lat}${hs}
     ${tx(10,214,`흡수된 H: ${filled.size}개 · 격자 팽창 ${((exp-1)*100).toFixed(1)} % · 저항 ${R.toFixed(1)} Ω`,'b2')}${tx(10,18,ni?'Pd–Ni (초록 = Ni)':'순수 Pd','b2')}`;
    if(filled.size>=20&&!mols.length&&Math.random()<0.01)filled.clear()});
  q('[data-ni]').onclick=e=>{ni=!ni;e.target.setAttribute('aria-pressed',String(ni));e.target.textContent=ni?'순수 Pd로':'Pd–Ni 합금으로';filled.clear();mols=[]};
  q('[data-rs]').onclick=()=>{filled.clear();mols=[]};return L.stop};

ANIM.bridge=host=>{let h=0,dT=0,comp=true;const Vin=5,R0=100,al=0.0038;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 210" role="img" aria-label="휘트스톤 브리지"></svg>
   <div class="figctl"><label class="small">수소 ΔR <input type="range" min="0" max="5" step="0.1" value="0" data-h style="width:100px"> <b data-hv>0 %</b></label>
   <label class="small">주변 온도 변화 <input type="range" min="-20" max="40" step="1" value="0" data-t style="width:100px"> <b data-tv>0 °C</b></label>
   <button class="tbtn" data-c aria-pressed="true">기준 저항 R₄ 같은 재료 ✓</button></div>
   <div class="tofcalc mono small" data-o></div>
   <figcaption>온도만 바꿔 보세요. R₄가 센서와 <b>같은 재료</b>면 R₁·R₄가 같이 변해서 V_o가 거의 0을 유지해요(온도 보상). 수소로 R₁만 변하면 V_o가 생겨요. [AI 보충: Pd 온도계수 약 0.0038/K로 가정]</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const rz=(x1,y1,x2,y2,lb,val,hot)=>{const mx=(x1+x2)/2,my=(y1+y2)/2;return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${hot?'var(--bad)':'var(--ink)'};stroke-width:2"/><rect x="${mx-9}" y="${my-18}" width="18" height="36" rx="3" style="fill:${hot?'var(--bad-soft)':'var(--surface)'};stroke:${hot?'var(--bad)':'var(--ink)'};stroke-width:1.6"/><text x="${mx+(x1<170?-14:14)}" y="${my-4}" text-anchor="${x1<170?'end':'start'}" class="b2">${lb}</text><text x="${mx+(x1<170?-14:14)}" y="${my+12}" text-anchor="${x1<170?'end':'start'}" class="small2">${val}</text>`};
  const draw=()=>{const k=1+al*dT,R1=R0*k*(1+h/100),R4=comp?R0*k:R0,R2=R0,R3=R0;const vl=Vin*R3/(R2+R3),vr=Vin*R4/(R1+R4),Vo=vl-vr;
   svg.innerHTML=`${tx(170,14,`V_in = ${Vin} V`,'b2','middle')}<line x1="110" y1="22" x2="230" y2="22" style="stroke:var(--ink);stroke-width:2"/>
    ${rz(110,22,110,112,'R₂',R2.toFixed(1)+' Ω')}${rz(110,112,110,196,'R₃',R3.toFixed(1)+' Ω')}${rz(230,22,230,112,'R₁ 센서',R1.toFixed(2)+' Ω',true)}${rz(230,112,230,196,'R₄ 기준',R4.toFixed(2)+' Ω',comp)}
    <line x1="110" y1="196" x2="230" y2="196" style="stroke:var(--ink);stroke-width:2"/>${tx(170,208,'GND','small2','middle')}
    <circle cx="110" cy="112" r="4" style="fill:var(--ink)"/><circle cx="230" cy="112" r="4" style="fill:var(--ink)"/>
    <line x1="114" y1="112" x2="226" y2="112" style="stroke:var(--unit);stroke-width:1.6;stroke-dasharray:4 3"/>${tx(170,106,`V_o = ${(Vo*1000).toFixed(2)} mV`,'u b2','middle')}`;
   q('[data-o]').innerHTML=`V_o = V_in[R₃/(R₂+R₃) − R₄/(R₁+R₄)]<br>= ${Vin} × [${(R3/(R2+R3)).toFixed(4)} − ${(R4/(R1+R4)).toFixed(4)}] = <b>${(Vo*1000).toFixed(2)} mV</b>`;
   q('[data-hv]').textContent=h.toFixed(1)+' %';q('[data-tv]').textContent=(dT>0?'+':'')+dT+' °C'};
  q('[data-h]').oninput=e=>{h=+e.target.value;draw()};q('[data-t]').oninput=e=>{dT=+e.target.value;draw()};
  q('[data-c]').onclick=e=>{comp=!comp;e.target.setAttribute('aria-pressed',String(comp));e.target.textContent=comp?'기준 저항 R₄ 같은 재료 ✓':'기준 저항 R₄ 일반 저항';draw()};draw();return null};

ANIM.semi=host=>{let type='n',gas='none';
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 220" role="img" aria-label="반도체 가스센서 공핍층"></svg>
   <div class="figctl"><span class="small">반도체</span><button class="tbtn" data-ty="n" aria-pressed="true">n형</button><button class="tbtn" data-ty="p" aria-pressed="false">p형</button>
    <span class="small">가스</span><button class="tbtn" data-g="none" aria-pressed="true">공기</button><button class="tbtn" data-g="red" aria-pressed="false">환원성 H₂</button><button class="tbtn" data-g="ox" aria-pressed="false">산화성 NO₂</button></div>
   <div class="tofcalc small" data-o></div></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const dots=Array.from({length:42},()=>[Math.random(),Math.random(),Math.random()*6.28]);
  const L=loop(tp=>{const n=type==='n';let layer=n?(gas==='none'?36:gas==='red'?16:58):(gas==='none'?36:gas==='red'?16:58); // n: 공핍층 두께 / p: 정공 축적층 두께
    const top=60;let s=`<rect x="20" y="${top}" width="300" height="140" style="fill:var(--surface2);stroke:var(--ink);stroke-width:1.6"/>`;
    s+=n?`<rect x="20" y="${top}" width="300" height="${layer}" style="fill:var(--bad-soft)"/>${tx(316,top+layer/2+4,'공핍층 (전자 없음)','b small2','end')}`:`<rect x="20" y="${top}" width="300" height="${layer}" style="fill:var(--unit-soft)"/>${tx(316,top+layer/2+4,'정공 축적층 (길)','u small2','end')}`;
    const nO=gas==='ox'?9:gas==='red'?3:6;for(let i=0;i<nO;i++){const x=34+i*(270/nO);s+=`<circle cx="${x}" cy="${top-8}" r="6" style="fill:var(--bad)"/>${tx(x,top-4,'O⁻','small2','middle').replace('class="small2"','class="small2" style="fill:#fff"')}`}
    if(gas!=='none'){for(let i=0;i<4;i++){const x=40+((tp*30+i*80)%280),y=14+6*Math.sin(tp*3+i);s+=`<text x="${x}" y="${y+12}" class="b2" text-anchor="middle" style="fill:${gas==='red'?'var(--accent)':'var(--warn)'}">${gas==='red'?'H₂':'NO₂'}</text>`}}
    dots.forEach(([dx,dy,ph],i)=>{const yMin=n?top+layer+6:top+6,yMax=n?top+134:top+(gas==='red'?layer+20:layer+40);const y=yMin+dy*(Math.max(8,yMax-yMin));const x=26+dx*288+3*Math.sin(tp*2+ph);if(!n&&i>(gas==='red'?14:gas==='ox'?40:26))return;if(n&&i>(gas==='red'?40:gas==='ox'?18:28))return;
      s+=n?`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" style="fill:var(--unit)"/>`:`<text x="${x.toFixed(1)}" y="${(y+4).toFixed(1)}" class="b2" text-anchor="middle" style="fill:var(--bad)">+</text>`});
    s+=tx(24,214,n?'● = 전자 (n형의 주 캐리어)':'+ = 정공 (p형의 주 캐리어)','small2');
    svg.innerHTML=s});
  const upd=()=>{const n=type==='n';const tbl={n:{none:['기준 저항 R₀','공기 중 산소가 전자를 포획 → 공핍층 형성'],red:['저항 ↓','H₂가 흡착 산소와 반응(H₂O 생성) → 포획됐던 전자가 돌아옴 → 전자↑ → 공핍층↓ → 장벽↓'],ox:['저항 ↑','NO₂가 전자를 더 포획 → 전자↓ → 공핍층↑ → 장벽↑']},
    p:{none:['기준 저항 R₀','산소 흡착 → 정공 축적층 형성 (길)'],red:['저항 ↑','전자가 들어와 정공과 재결합 → 정공↓ → 전도도↓'],ox:['저항 ↓','전자를 더 빼앗음 → 정공↑ → 전도도↑']}};
   const [r,t]=tbl[type][gas];q('[data-o]').innerHTML=`<b>${n?'n형':'p형'} + ${gas==='none'?'공기':gas==='red'?'환원성':'산화성'} → ${r}</b><br>${t}`;
   host.querySelectorAll('[data-ty]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ty===type)));host.querySelectorAll('[data-g]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.g===gas)))};
  host.querySelectorAll('[data-ty]').forEach(b=>b.onclick=()=>{type=b.dataset.ty;upd()});host.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{gas=b.dataset.g;upd()});upd();return L.stop};

ANIM.gc=host=>{const C=[{n:'A',v:1.0,c:'var(--accent)'},{n:'B',v:0.62,c:'var(--unit)'},{n:'C',v:0.4,c:'var(--bad)'}];let t0=0;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 230" role="img" aria-label="가스 크로마토그래피 분리"></svg><div class="figctl"><button class="tbtn" data-re>다시 주입</button></div>
   <figcaption>섞인 가스를 한 번에 넣어도, 고정상에 <b>잘 붙는 가스일수록 느리게</b> 가요. 그래서 검출기에 <b>따로따로</b> 도착하고(머무름 시간), 피크 면적으로 양을 재요.</figcaption></figure>`;
  const svg=host.querySelector('svg');let base=null;
  const L=loop(tp=>{if(base===null)base=tp;const t=tp-base;const L0=40,L1=300,len=L1-L0;
    let s=`${tx(10,22,'운반 가스 →','small2')}<rect x="${L0}" y="40" width="${len}" height="26" rx="13" style="fill:var(--surface2);stroke:var(--ink);stroke-width:1.6"/>${tx(170,84,'컬럼 (안쪽 벽 = 고정상)','m small2','middle')}
     <rect x="${L1+4}" y="34" width="30" height="38" rx="4" style="fill:var(--ink)"/>${tx(L1+19,26,'검출기','small2','middle')}${tx(L0-6,58,'주입','small2','end')}`;
    const plotY=200,plotH=80;let path='';
    C.forEach(c=>{const pos=L0+c.v*t*45;const w=6+t*3*(1-c.v*.4);if(pos<L1)s+=`<ellipse cx="${pos.toFixed(1)}" cy="53" rx="${w.toFixed(1)}" ry="9" style="fill:${c.c};opacity:.75"/>${tx(pos,57,c.n,'small2','middle').replace('class="small2"','class="small2" style="fill:#fff"')}`});
    s+=`<line x1="30" y1="${plotY}" x2="326" y2="${plotY}" style="stroke:var(--ink)"/><line x1="30" y1="${plotY}" x2="30" y2="${plotY-plotH-6}" style="stroke:var(--ink)"/>${tx(324,214,'시간 → (머무름 시간)','small2','end')}${tx(34,plotY-plotH-8,'신호','small2')}`;
    const tmax=t;for(let i=0;i<=120;i++){const tt=i/120*14;if(tt>tmax)break;let y=0;C.forEach(c=>{const ta=len/(c.v*45),sg=0.25+ta*0.06;y+=Math.exp(-((tt-ta)**2)/(2*sg*sg))*(0.9/(sg*2.2))});path+=(path?'L':'M')+(30+i/120*294).toFixed(1)+' '+(plotY-Math.min(plotH,y*plotH*0.55)).toFixed(1)}
    if(path)s+=`<path d="${path}" style="fill:none;stroke:var(--ink);stroke-width:2"/>`;
    C.forEach(c=>{const ta=len/(c.v*45);if(t>ta+0.6)s+=tx(30+ta/14*294,plotY-plotH*0.55*(0.9/((0.25+ta*0.06)*2.2))-6,c.n,'b2','middle')});
    svg.innerHTML=s;if(t>16)base=tp});
  host.querySelector('[data-re]').onclick=()=>{base=null};return L.stop};

/* ── 문제 생성기 ── */
const GASM={H2:['수소 H₂',2.02],CO:['일산화탄소 CO',28.01],NO2:['이산화질소 NO₂',46.01],CH4:['메탄 CH₄',16.04]};
const NA=6.022e23;
Object.assign(GEN,{
 ppmPct(){const mode=pick(['p2m','m2p','m2b']);
  if(mode==='p2m'){const p=pick([0.05,0.4,1,2.5,4,75]);const v=p*1e4;return {kind:'유사',title:'% → ppm',q:`수소 농도 ${p} {{pct}}는 몇 {{ppm}}인가?`,first:['1 % = 10⁻²','1 ppm = 10⁻⁶','1 % = 10⁴ ppm'],
   steps:[{h:'두 단위를 소수로',b:`<div class="ln">1 % = 10⁻² · 1 ppm = 10⁻⁶</div>`},{h:'지수 빼기',b:`<div class="ln">(−2) − (−6) = 4 → 1 % = 10⁴ ppm</div>`},{h:'계산',b:`<div class="ln">${p} × 10⁴ = ${fx(v,4)} ppm</div>`},{h:'검산',b:`<div class="rd">ppm이 더 작은 단위라 숫자가 커져야 함 ✓ · 수소 폭발 범위 4~75 %</div>`}],
   ans:`${fx(v,4)} ppm`,ansRead:`${fxR(v,4)} 피피엠`,calc:calcBlock([[[...ks(p),'×','1','×10ˣ','4','='],casioDec(v)]],[]),easy:'1 %는 100개 중 1개, 1 ppm은 100만 개 중 1개. 그래서 1 %는 1만 ppm이에요.'}}
  if(mode==='m2p'){const v=pick([50,400,1000,5000,25000]);const p=v/1e4;return {kind:'유사',title:'ppm → %',q:`실내 CO₂ ${v} {{ppm}}은 몇 {{pct}}인가?`,first:['÷ 10⁴'],
   steps:[{h:'관계',b:`<div class="ln">1 % = 10⁴ ppm → 1 ppm = 10⁻⁴ %</div>`},{h:'계산',b:`<div class="ln">${v} × 10⁻⁴ = ${fx(p,4)} %</div>`},{h:'참고',b:`<div class="rd">실내공기질 CO₂ 기준: 8시간 평균 1,000 ppm(= 0.1 %) 이하</div>`}],
   ans:`${fx(p,4)} %`,ansRead:`${fxR(p,4)} 퍼센트`,calc:calcBlock([[[...ks(v),'×','1','×10ˣ','(−)','4','='],casioDec(p)]],[W_NEG]),easy:'ppm을 %로 바꿀 땐 1만으로 나눠요.'}}
  const v=pick([0.5,2,30,150]);const b=v*1000;return {kind:'유사',title:'ppm → ppb',q:`어떤 가스가 ${v} {{ppm}}이다. 몇 {{ppb}}인가?`,first:['1 ppm = 1000 ppb'],
   steps:[{h:'관계',b:`<div class="ln">ppm 10⁻⁶, ppb 10⁻⁹ → (−6) − (−9) = 3 → × 10³</div>`},{h:'계산',b:`<div class="ln">${v} × 1000 = ${fx(b,4)} ppb</div>`}],ans:`${fx(b,4)} ppb`,ansRead:`${fxR(b,4)} 피피비`,calc:calcBlock([[[...ks(v),'×','1','0','0','0','='],casioDec(b)]],[]),easy:'ppb는 ppm보다 1000배 작은 단위라 숫자는 1000배 커져요.'}},
 ppmMass(base){const g=base?'H2':pick(Object.keys(GASM));const [nm,M]=GASM[g];const p=base?1:pick([1,5,10,50,100]);const V=base?1:pick([1,2,10]);const Vm=base?22.71:pick([22.71,22.4]);
  const Vg=p*1e-6*V,n=Vg/Vm,m=n*M,N=n*NA;
  return {kind:base?'기본':'유사',title:'ppm → 질량 → 분자 수',fig:FIG.ppmChain(),
   q:`${V} {{L}} 공기 속에 ${nm}가 ${p} {{ppm}} 있다. (몰 부피 ${Vm} {{Lmol}}, M = ${M} {{gmol}}, N_A = 6.022 × 10²³) (1) 질량은 몇 {{ug}}? (2) 분자는 몇 개?`,
   first:['ppm × 전체 부피 = 가스 부피','÷ Vm → mol','× M → g','× N_A → 개'],
   steps:[{h:'가스 부피',b:`<div class="ln">${p} × 10⁻⁶ × ${V} L = ${sciT(sci(Vg))} L</div><div class="rd">ppm은 부피비 → 소수로 바꿔 곱하기</div>`},
    {h:'몰',b:`<div class="ln">${sciT(sci(Vg))} ÷ ${Vm} = ${sciT(sci(n))} mol</div>`},
    {h:'질량',b:`<div class="ln">${sciT(sci(n))} × ${M} = ${sciT(sci(m))} g</div><div class="ln">= ${fx(m*1e6,3)} μg</div><div class="rd">g → μg: × 10⁶</div>`},
    {h:'분자 수',b:`<div class="ln">${sciT(sci(n))} × 6.022 × 10²³ = ${sciT(sci(N))} 개</div>`},
    {h:'검산',b:`<div class="rd">H₂ 1 ppm · 1 L · 22.71 → 0.0889 μg (강의 예제)${g==='H2'&&p===1&&V===1&&Vm===22.71?' ✓':''}</div>`}],
   ans:`${fx(m*1e6,3)} μg · ${sciT(sci(N))} 개`,ansRead:`${fxR(m*1e6)} 마이크로그램`,
   calc:calcBlock([[[...ks(p),'×10ˣ','(−)','6','×',...ks(V),'÷',...ks(Vm),'×',...ks(M),'='],casioDec(m),'g'],[['×','1','×10ˣ','6','='],casioDec(m*1e6),'μg'],[[...ks(p),'×10ˣ','(−)','6','×',...ks(V),'÷',...ks(Vm),'×','6','.','0','2','2','×10ˣ','2','3','='],casioDec(N),'분자 수 (몰에 N_A 곱하기)']],[W_NEG,'Vm 값은 문제에서 준 것 사용 (22.71 또는 22.4)']),
   easy:'100만 칸 중 몇 칸이 그 가스인지 → 그 부피가 몇 "묶음(몰)"인지 → 한 묶음의 무게를 곱하면 질량, 한 묶음의 개수를 곱하면 개수.'}},
 bridgeV(base){const Vin=base?5:pick([3.3,5,10]),R=base?100:pick([100,350,1000]),d=base?2:pick([0.5,1,2,3,5]);const R1=R*(1+d/100);const vl=Vin*R/(2*R),vr=Vin*R/(R1+R),Vo=vl-vr;
  return {kind:base?'기본':'유사',title:'브리지 출력 전압',fig:FIG.bridgeP?FIG.bridgeP(R,d):'',
   q:`휘트스톤 브리지의 네 저항이 모두 ${R} {{ohm2}}이고 V_in = ${Vin} {{V}}이다. 수소 때문에 센서 R₁만 ${d} % 커졌다. V_o = V_in[R₃/(R₂+R₃) − R₄/(R₁+R₄)]는 몇 {{mV}}인가?`,
   first:['R₁ = R(1 + Δ%)','왼쪽 − 오른쪽 가운데점','V → mV'],
   steps:[{h:'바뀐 R₁',b:`<div class="ln">R₁ = ${R} × (1 + ${d/100}) = ${fx(R1,5)} Ω</div>`},
    {h:'왼쪽 가운데점',b:`<div class="ln">${Vin} × ${R}/(${R}+${R}) = ${fx(vl,4)} V</div>`},
    {h:'오른쪽 가운데점',b:`<div class="ln">${Vin} × ${R}/(${fx(R1,5)}+${R}) = ${fx(vr,6)} V</div>`},
    {h:'빼기',b:`<div class="ln">V_o = ${fx(vl,4)} − ${fx(vr,6)} = ${sciT(sci(Vo,4))} V = ${fx(Vo*1000,4)} mV</div>`},
    {h:'검산 (근사식)',b:`<div class="ln">작은 변화면 V_o ≈ V_in × (ΔR/R) ÷ 4 = ${Vin} × ${d/100} ÷ 4 = ${fx(Vin*d/100/4*1000,4)} mV ≈ ✓</div><div class="rd">[AI 보충] 근사식은 ΔR이 작을 때만</div>`}],
   ans:`V_o ≈ ${fx(Vo*1000,4)} mV`,ansRead:`${fxR(Vo*1000,4)} 밀리볼트`,
   calc:calcBlock([[[...ks(Vin),'×','(',...ks(R),'÷','(',...ks(R),'+',...ks(R),')','−',...ks(R),'÷','(',...ks(R),'×','1','.',...String(d/100).split('.')[1].split(''),'+',...ks(R),')',')','='],casioDec(Vo),'V'],[['×','1','0','0','0','='],casioDec(Vo*1000),'mV']],['괄호를 정확히: 각 분수의 분모를 괄호로 묶기']),
   easy:'시소가 평형일 때 한쪽만 아주 조금 무거워지면 기울어지죠. 그 기울어진 만큼이 V_o예요.'}},
 fourW(){const Rs=pick([50,100,250,500]),r=pick([2,5,10,20]),I=pick([1,2,5]);const V=Rs*I/1000,R2=Rs+2*r,err=2*r/Rs*100;
  return {kind:'응용',title:'2선식 오차 vs 4선식',fig:FIG.fourWire(),
   q:`센서 저항 ${Rs} {{ohm2}}을 정전류 ${I} {{mA}}로 잰다. 리드선 한 가닥의 저항은 ${r} Ω이다. (1) 4선식으로 잰 전압과 저항, (2) 2선식으로 쟀을 때의 저항과 오차율은?`,
   first:['4선식: Rs = Vs/Is','2선식: 선 2가닥 저항이 더해짐','mA → A'],
   steps:[{h:'단위 먼저',b:`<div class="ln">I = ${I} mA = ${I/1000} A</div>`},{h:'4선식',b:`<div class="ln">V = I × Rs = ${I/1000} × ${Rs} = ${fx(V,4)} V → R = V/I = ${Rs} Ω</div><div class="rd">전압선엔 전류가 거의 안 흘러 선 저항 영향 없음</div>`},
    {h:'2선식',b:`<div class="ln">R_측정 = Rs + 2r = ${Rs} + 2×${r} = ${R2} Ω</div>`},{h:'오차율',b:`<div class="ln">(${R2} − ${Rs}) ÷ ${Rs} × 100 = ${fx(err,3)} %</div>`}],
   ans:`4선식 ${Rs} Ω (V = ${fx(V,4)} V) · 2선식 ${R2} Ω, 오차 ${fx(err,3)} %`,ansRead:`오차 ${fxR(err)} 퍼센트`,calc:calcBlock([[['2','×',...ks(r),'÷',...ks(Rs),'×','1','0','0','='],casioDec(err),'오차율']],[]),
   easy:'긴 전선도 작은 저항이에요. 2선식은 그 전선 저항까지 센서 값에 더해 버려요.'}},
 pdAtoms(base){const a=0.389,Lmm=base?1:pick([0.5,1,2]),tnm=base?100:pick([20,50,100,200]);const a_cm=a*1e-7,den=4/a_cm**3,vol=(Lmm*0.1)**2*(tnm*1e-7),N=den*vol;
  return {kind:base?'기본':'유사',title:'Pd 박막 속 원자 수',
   q:`Pd는 FCC 구조(단위 격자 안 원자 4개), 격자상수 0.389 {{nm}}이다. ${Lmm} mm × ${Lmm} mm, 두께 ${tnm} nm인 Pd 박막 속 Pd 원자는 몇 개인가?`,
   first:['원자 밀도 = 4 ÷ a³','nm → cm: × 10⁻⁷','mm → cm: × 0.1'],
   steps:[{h:'격자상수를 cm로',b:`<div class="ln">a = 0.389 nm = 0.389 × 10⁻⁷ cm = ${sciT(sci(a_cm))} cm</div><div class="rd">1 nm = 10⁻⁹ m = 10⁻⁷ cm</div>`},
    {h:'원자 밀도',b:`<div class="ln">4 ÷ (${sciT(sci(a_cm))})³ = 4 ÷ ${sciT(sci(a_cm**3))} = ${sciT(sci(den))} 개/cm³</div><div class="rd">강의 값 6.78 × 10²² atoms/cm³ ✓</div>`},
    {h:'박막 부피 (cm³)',b:`<div class="ln">${Lmm} mm = ${Lmm/10} cm · ${tnm} nm = ${sciT(sci(tnm*1e-7))} cm</div><div class="ln">V = ${Lmm/10} × ${Lmm/10} × ${sciT(sci(tnm*1e-7))} = ${sciT(sci(vol))} cm³</div>`},
    {h:'원자 수',b:`<div class="ln">${sciT(sci(den))} × ${sciT(sci(vol))} = ${sciT(sci(N))} 개</div>`}],
   ans:`약 ${sciT(sci(N))} 개`,ansRead:`${sciR(sci(N))} 개`,
   calc:calcBlock([[['4','÷','(','0','.','3','8','9','×10ˣ','(−)','7',')','x³','='],casioDec(den),'개/cm³'],[['×',...ks(Lmm/10),'x²','×',...K(tnm,-7),'='],casioDec(N),'개']],['격자상수를 cm로 바꾼 뒤 세제곱(괄호 필수)',W_NEG]),
   easy:'작은 상자(단위 격자) 하나에 원자 4개. 박막 전체 부피 안에 상자가 몇 개 들어가는지 세면 원자 수가 나와요.'}},
 joule(){const V=pick([0.5,1,2,3]),ImA=pick([5,10,20,50]),tms=pick([1,2,5,10]),mug=pick([1,2,5,10]),Cp=133;const P=V*ImA/1000,E=P*tms/1000,m=mug*1e-9,dT=E/(Cp*m);
  return {kind:'응용',title:'마이크로히터 온도 상승 (방열 무시)',fig:FIG.heater(),
   q:`Pt 히터(질량 ${mug} {{ug}}, 비열 133 {{JkgK}})에 ${V} {{V}}, ${ImA} {{mA}}를 ${tms} {{ms}} 동안 걸었다. 열손실이 없다면 온도는 몇 K 오르나?`,
   first:['VI·t = Cₚ·m·ΔT','mA → A, ms → s, μg → kg'],
   steps:[{h:'단위 먼저 (전부 SI로)',b:`<div class="ln">I = ${ImA} mA = ${ImA/1000} A · t = ${tms} ms = ${tms/1000} s</div><div class="ln">m = ${mug} μg = ${mug} × 10⁻⁹ kg</div><div class="rd">⚠ μg → kg: 10⁻⁶ g × 10⁻³ = 10⁻⁹ kg</div>`},
    {h:'전력·에너지',b:`<div class="ln">P = ${V} × ${ImA/1000} = ${fx(P,3)} W</div><div class="ln">E = P × t = ${sciT(sci(E))} J</div>`},
    {h:'온도 상승',b:`<div class="ln">ΔT = E ÷ (Cₚ × m) = ${sciT(sci(E))} ÷ (133 × ${mug}×10⁻⁹) = ${fx(dT,3)} K</div>`},
    {h:'해석',b:`<div class="rd">질량이 아주 작아 적은 전력으로 빠르게 가열 → MEMS 히터의 장점. 실제로는 열손실 때문에 덜 오르고 열평형에서 멈춤</div>`}],
   ans:`ΔT ≈ ${fx(dT,3)} K`,ansRead:`${fxR(dT)} 켈빈`,
   calc:calcBlock([[[...ks(V),'×',...K(ImA,-3),'×',...K(tms,-3),'÷','(','1','3','3','×',...K(mug,-9),')','='],casioDec(dT),'K']],[W_NEG,'분모를 괄호로']),
   easy:'전기로 준 에너지가 모두 히터를 데우는 데 쓰인다고 보면, 가벼운 히터일수록 훨씬 뜨거워져요.'}},
 stefanB(){const TC=pick([27,100,200,300,400]),eps=pick([0.6,0.8,0.95,1]);const TK=TC+273.15,P=eps*5.67e-8*TK**4;
  return {kind:'응용',title:'IR 카메라 — 복사 에너지',q:`표면 온도 ${TC} {{degC}}, 방사율 ε = ${eps}인 물체가 내는 복사 에너지 P = εσT⁴는 몇 W/m²인가? (σ = 5.67 × 10⁻⁸ {{Wm2K4}})`,
   first:['°C → K: + 273.15','T⁴ (4제곱)'],
   steps:[{h:'절대온도로',b:`<div class="ln">T = ${TC} + 273.15 = ${fx(TK,5)} K</div><div class="rd">⚠ °C 그대로 넣으면 완전히 틀려요</div>`},{h:'4제곱',b:`<div class="ln">T⁴ = ${sciT(sci(TK**4,4))}</div>`},{h:'곱하기',b:`<div class="ln">P = ${eps} × 5.67 × 10⁻⁸ × ${sciT(sci(TK**4,4))} = ${fx(P,4)} W/m²</div>`},{h:'해석',b:`<div class="rd">ε가 실제와 다르게 설정되면 같은 P에서 T를 잘못 계산 → 온도 오차</div>`}],
   ans:`P ≈ ${fx(P,4)} W/m²`,ansRead:`${fxR(P,4)} 와트 퍼 제곱미터`,calc:calcBlock([[[...ks(eps),'×','5','.','6','7','×10ˣ','(−)','8','×','(',...ks(TC),'+','2','7','3','.','1','5',')','x■','4','='],casioDec(P)]],['[x■] 다음 4 · 괄호로 T를 먼저 묶기',W_NEG]),
   easy:'온도가 조금만 올라도 4제곱이라 내뿜는 열은 확 늘어요. IR 카메라는 그 열의 양으로 온도를 거꾸로 계산해요.'}},
 gcArea(){const w=pick([4,6,8,10]),h=pick([0.5,1.2,2,3.5]);const A=0.5*w*h;
  return {kind:'응용',title:'GC 피크 면적',q:`GC 검출기 피크를 삼각형으로 근사했다. 밑변 w_b = ${w} {{s}}, 높이 h = ${h} {{uA}}이다. 피크 면적(전하량)은 몇 μC인가?`,first:['면적 ≈ ½ w_b h','A × s = C'],
   steps:[{h:'공식',b:`<div class="ln">면적 = ½ × w_b × h</div><div class="rd">가우스 곡선을 삼각형으로 근사 · 높이는 접선이 만나는 꼭짓점까지</div>`},{h:'계산',b:`<div class="ln">½ × ${w} × ${h} = ${fx(A,4)} μA·s = ${fx(A,4)} μC</div><div class="rd">전류(C/s) × 시간(s) = 전하(C)</div>`},{h:'의미',b:`<div class="rd">면적이 클수록 그 성분이 많음 → 정량 분석</div>`}],
   ans:`${fx(A,4)} μC`,ansRead:`${fxR(A,4)} 마이크로쿨롬`,calc:calcBlock([[['0','.','5','×',...ks(w),'×',...ks(h),'='],casioDec(A)]],[]),easy:'산 모양 피크를 세모로 보고 넓이를 구하면 그 가스가 얼마나 있었는지 알 수 있어요.'}},
 mdlGas(){const S=pick([0.0019,0.005,0.012]),sg=pick([0.002,0.005,0.01]);const M=3*sg/S;
  return {kind:'응용',title:'교정 직선에서 MDL',q:`수소센서 교정 직선이 ΔV_out = ${S}x + 0.7442 (x: ppm, ΔV: mV)이다. 가스가 없을 때 출력 표준편차가 ${sg} mV면 MDL은 몇 ppm인가?`,first:['감도 = 기울기','MDL = 3σ/S'],
   steps:[{h:'감도',b:`<div class="ln">S = ${S} mV/ppm (기울기)</div>`},{h:'MDL',b:`<div class="ln">3 × ${sg} ÷ ${S} = ${fx(M,3)} ppm</div>`},{h:'검산',b:`<div class="rd">단위: mV ÷ (mV/ppm) = ppm ✓</div>`}],
   ans:`MDL ≈ ${fx(M,3)} ppm`,ansRead:`${fxR(M)} 피피엠`,calc:calcBlock([[['3','×',...ks(sg),'÷',...ks(S),'='],casioDec(M)]],['분수로 나오면 [S⇔D]']),easy:'잡음의 3배를 감도로 나누면 "확실히 있다"고 말할 수 있는 최소 농도가 나와요.'}}
});
Object.assign(FIG,{bridgeP(R,d){return svgFig(340,170,`<line x1="110" y1="20" x2="230" y2="20" style="stroke:var(--ink);stroke-width:2"/>${tx(170,14,'V_in','b2','middle')}
   ${[[110,20,110,90,'R₂'],[110,90,110,160,'R₃'],[230,20,230,90,'R₁ (센서)'],[230,90,230,160,'R₄']].map(([x1,y1,x2,y2,l])=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:var(--ink);stroke-width:2"/><rect x="${x1-8}" y="${(y1+y2)/2-15}" width="16" height="30" rx="3" style="fill:${l.includes('센서')?'var(--bad-soft)':'var(--surface)'};stroke:var(--ink);stroke-width:1.5"/>${tx(x1+(x1<170?-14:14),(y1+y2)/2+4,l,'b2',x1<170?'end':'start')}`).join('')}
   <line x1="110" y1="160" x2="230" y2="160" style="stroke:var(--ink);stroke-width:2"/><line x1="114" y1="90" x2="226" y2="90" style="stroke:var(--unit);stroke-dasharray:4 3"/>${tx(170,84,'V_o','u b2','middle')}${tx(170,174,`모두 ${R} Ω · R₁만 +${d} %`,'small2','middle')}`,'브리지 문제 그림')}});

PSET.gas=[['ppmPct'],['ppmMass',true],['ppmMass'],['bridgeV',true],['bridgeV'],['fourW'],['pdAtoms',true],['joule'],['stefanB'],['gcArea'],['mdlGas']];
TOPICS.gas={name:'가스',g:['ppmPct','ppmMass','bridgeV','fourW','pdAtoms','joule','stefanB','gcArea','mdlGas']};
['ppmPct','ppmMass','bridgeV','pdAtoms'].forEach(g=>BASICG.add(g));

/* ── 본문 ── */
PAGES.gas={title:'가스센서',part:'제3편 1장',secs:[
 {k:'정의·종류',h:'가스센서란?',b:`<p class="big">특정 가스를 감지해 <b>농도</b>를 전기 신호로 바꾸는 센서</p>
   <div class="tblwrap"><table><tr><th>종류</th><th>원리</th></tr><tr><td><b>저항형</b> (반도체식, Pd 수소)</td><td>가스 흡착 → 저항 변화</td></tr><tr><td>접촉연소식</td><td>가연성 가스 연소열 → 저항 변화</td></tr><tr><td>광학식</td><td>가스의 빛(적외선) 흡수</td></tr><tr><td>전기화학식</td><td>전극 반응 → 전류</td></tr><tr><td>[[gc|GC]]</td><td>성분을 분리해 각각 검출</td></tr></table></div>
   <div class="f4"><div><div class="h">가스 분류</div>[[reducing|환원성]]: H₂, CO, CH₄, C₃H₈ · [[oxidizing|산화성]]: O₂, NO₂, O₃, Cl₂ · 불활성: He, Ar · CO₂는 불연성·비산화성</div>
    <div><div class="h">응용</div>환경 감시, 가스 누출, 화재, 음주 측정, 배기가스, 변압기 [[dga|DGA]]</div></div>`,
  easy:'가스센서는 기계의 코예요. 가스마다 성질이 달라서 하나의 센서로 모든 가스를 잴 수는 없어요.',
  src:'【가스센서는 기체 또는 액체 중에 포함된 특정의 가스를 감지하여 그 농도에 따라 전기신호로 변환하는 소자】 【하나의 센서로 모든 가스를 검출하는 것은 불가능】'},
 {k:'농도 단위',h:'ppm·ppb·% 와 연쇄 변환',b:`<div class="rel mono">1 % = 10⁻² · 1 ppm = 10⁻⁶ · 1 ppb = 10⁻⁹<br>1 % = 10⁴ ppm → 4 % = 40,000 ppm</div>
   ${FIG.ppmChain()}
   <div class="f4"><div><div class="h">강의 예: H₂ 1 ppm은 1 L 안에 몇 g?</div><div class="ln">1 ppm × 1 L = 10⁻⁶ L → ÷ 22.71 L/mol = 4.40 × 10⁻⁸ mol</div><div class="ln">× 2.02 g/mol = 8.89 × 10⁻⁸ g = <b>0.0889 μg</b></div></div>
    <div><div class="h">기준</div>실내공기질 CO₂: 8시간 평균 1,000 ppm 이하 · 수소 폭발 범위 4~75 %</div></div>`,
  easy:'ppm은 "100만 개 중 몇 개". 부피 비율이라서 전체 부피를 곱하면 가스만의 부피가 나오고, 거기서 몰·질량·개수로 차례로 바꿔요.',
  src:'【1 ppm = 0.0889 μg/litter】 【4104 ppm → 40,000 ppm】 【Vm = 22.71 litter/mol】'},
 {k:'수소센서',h:'Pd 저항형 수소센서',b:`<div data-anim="pdH"></div>
   <div class="flow"><div>H₂ 표면 흡착</div><div>H₂ → H + H 해리</div><div>H가 Pd 내부로 확산·흡수 → PdHₓ</div><div>전자구조·전도도 변화</div><div>전기 저항 변화</div></div>
   <div class="f4"><div><div class="h">왜 [[pd|Pd]]인가</div>수소 흡수능·용해도 큼, 상온 감지 · 확산계수 3.8 × 10⁻⁸ {{cm2s}}</div>
    <div><div class="h">문제와 해결</div>흡수 시 부피 최대 10.9 % 팽창 → 비선형·히스테리시스·균열·박리 → <b>[[pdni|Pd–Ni (Ni 4~8 %)]]</b>로 팽창·상전이 억제 (감도는 줄 수 있음)</div>
    <div><div class="h">수소의 특징</div>원자 반지름 약 0.053 nm로 매우 작아 거의 모든 재료를 투과 → 비감지 영역은 Al₂O₃ 보호막으로 막음</div></div>`,
  easy:'팔라듐은 수소를 스펀지처럼 빨아들여요. 빨아들이면 저항이 변해서 수소를 알아채요. 너무 부풀면 금이 가서 니켈을 섞어요.',
  src:'【H₂ 표면 흡착 → H₂ 해리 → 원자상 H의 Pd 내부 확산·흡수 → PdHₓ 형성 → 전자구조 및 전기전도도 변화 → 전기저항 변화】 【부피가 최대 약 10.9%까지 팽창】 【Ni 약 4~8%】'},
 {k:'2·4선식',h:'왜 4선식으로 재나',b:`${FIG.fourWire()}
   <ul class="clean"><li>긴 선의 저항(온도에 따라서도 변함) 때문에 생기는 전압강하를 없애려고</li><li>정전류원으로 I 공급, 별도 전압선으로 센서 양단 V 측정 → <b>Rs = Vs/Is</b></li><li>[[fourwire|전압계 입력 임피던스]]가 매우 커서 전압선 전류 ≈ 0 → 선 저항 영향 없음</li></ul>
   <p class="small">3선식(참고): 브리지 양쪽에 같은 리드선 저항이 들어가게 해서 서로 상쇄</p>`,
  easy:'멀리 있는 센서를 잴 때 전선 자체의 저항이 끼어들어요. 전기를 보내는 줄과 재는 줄을 나누면 전선 저항이 빠져요.',
  src:'【전류 공급선과 전압 측정선을 분리하여, 전압 측정선의 저항에 의한 전압강하 영향을 최소화】'},
 {k:'브리지',h:'휘트스톤 브리지 — 직접 바꿔 보기',b:`<div data-anim="bridge"></div>
   <div class="eqn">V_o = V_in [ R₃/(R₂+R₃) − R₄/(R₁+R₄) ]<small>왼쪽 가운데점 − 오른쪽 가운데점 · 평형: R₁R₃ = R₂R₄</small></div>
   <ul class="clean"><li>온도에 의한 <b>공통</b> 저항 변화를 보상 (센서·기준 저항을 같은 재료로)</li><li>작은 ΔR을 차동 출력으로 → 높은 감도</li><li>R₀가 다른 센서끼리는 절대 V가 아니라 <b>ΔR/R₀ × 100 %</b>로 비교</li></ul>`,
  easy:'시소 원리예요. 양쪽이 똑같이 무거워지면(온도) 안 기울고, 한쪽만 무거워지면(수소) 기울어요.',
  src:'【환경 변화(특히 temperature)에 의한 공통 저항 변화를 보상】 【Normalized response (ΔR/R0×100%)를 사용】'},
 {k:'성능 요인',h:'감도·온도·습도·드리프트·선택성',b:`<div class="f4">
   <div><div class="h">감도와 원자 수</div>Pd 원자 밀도 = 4 ÷ (0.389 nm)³ = 6.78 × 10²² 개/cm³ · 같은 H가 들어와도 Pd 원자가 적으면(얇으면) 원자당 변화↑ → 신호↑ · 표면적/부피비↑ → 감도·속도↑ (대신 양산·균일성·잡음·안정성 문제)</div>
   <div><div class="h">구동 온도</div>온도↑ → 해리·흡착·확산↑ 이지만 탈착↑ → <b>최적 온도</b> 존재 → [[microheater]]로 주변보다 높게 일정 유지</div>
   <div><div class="h">습도</div>H₂O/OH가 활성 자리 차지 → 감도↓, baseline 드리프트↑</div>
   <div><div class="h">[[baseline|기준선 드리프트]]</div>원인: 온습도·압력, 오염·잔류가스·노화, 불완전 탈착, 회로 · 해결: 온습도 보상, 주기 교정, baseline 보정(다항식·WLS·LOESS·wavelet·미분), aging</div>
   <div><div class="h">[[selectivity|선택성]]</div>교차감응 평가(O₂, N₂, CO, CO₂, CH₄, NH₃, H₂O) · 향상: 물질 선택, 온도 최적화, 다공성 막·필터, 센서 어레이 + 패턴 인식</div></div>`,
  easy:'감도를 높이려면 얇고 넓게, 온도는 딱 알맞게, 습기는 피하고, 다른 가스에는 덜 반응하게 만들어야 해요.',
  src:'【Pd: 6.78×10²² Pd atoms/cm³】 【adsorption/infiltration과 desorption 사이의 trade-off → Optimal operating temperature가 필요】'},
 {k:'반도체식',h:'산화물 반도체 가스센서 — n형·p형',b:`<div data-anim="semi"></div>
   <div class="tblwrap"><table><tr><th></th><th>환원성 (H₂, CO)</th><th>산화성 (NO₂, O₃)</th></tr><tr><td><b>n형</b> (SnO₂, ZnO, WO₃)</td><td>전자↑ 공핍층↓ → <b>R↓</b></td><td>전자↓ 공핍층↑ → <b>R↑</b></td></tr><tr><td><b>p형</b></td><td>정공 재결합 → <b>R↑</b></td><td>정공↑ → <b>R↓</b></td></tr></table></div>
   <ul class="clean"><li>동작 온도 200~400 °C: 산소 흡착 활성화, 반응·흡탈착 속도↑ → 마이크로히터·온도센서 집적</li><li>[[sensitization|금속 나노입자]]: 쇼트키 접합(전기적) + 촉매(화학적) 감응화</li><li>나노구조(0D·1D·2D, 그래핀·MoS₂): 표면적↑ 감도·속도↑</li></ul>`,
  easy:'공기 중 산소가 전자를 붙잡아 "빈 땅(공핍층)"을 만들어요. 수소가 오면 산소를 떼어 가며 전자를 돌려줘서 길이 넓어지고 저항이 내려가요.',
  src:'【환원성 가스 … 반도체 내부 전자 농도 증가 → depletion layer 감소 → 전기저항 감소】 【NO₂: 산화성 가스 → electron acceptor … 센서 저항 증가】 【p-type 반도체센서는 n-type과 저항 변화 방향이 반대】'},
 {k:'마이크로히터',h:'마이크로히터와 IR 온도 측정',b:`${FIG.heater()}
   <div class="f4"><div><div class="h">재료 Pt</div>녹는점 1768 °C(금 1064 °C), 고온 안정·내산화, 저항-온도 관계 안정 → 온도 측정에도 사용</div>
    <div><div class="h">[[joule|줄 가열]]</div><div class="ln">P = I²R = VI</div><div class="ln">방열 무시: VI·t = Cₚ·m·ΔT</div><div class="rd">작은 질량 → 작은 열용량 → 적은 전력으로 빠르게 가열</div></div>
    <div><div class="h">온도 유지</div>주변이 차가워지면 열손실↑ → <b>전류↑</b>, 따뜻해지면 전류↓ · 히터는 항상 주변보다 높게</div>
    <div><div class="h">IR 카메라 ([[stefan|스테판-볼츠만]])</div><div class="ln">P = εσT⁴,  σ = 5.67 × 10⁻⁸ W/(m²·K⁴)</div><div class="rd">정확도 요인: [[emissivity|방사율]], 반사 복사, 대기(H₂O·CO₂), 파장 대역, 픽셀 면적</div></div></div>`,
  easy:'아주 작은 전기 난로예요. 처음엔 데워지다가 내보내는 열과 받는 열이 같아지면 온도가 딱 멈춰요.',
  src:'【P = I²R = VI】 【VI·t = Cp·m·ΔT】 【P = σT⁴, σ = 5.670400 × 10⁻⁸】 【방사율 0.6이란 흑체 방사 에너지의 60%】'},
 {k:'GC',h:'가스 크로마토그래피',b:`<div data-anim="gc"></div>
   <div class="f4"><div><div class="h">구성</div>운반 가스(N₂·He) → 시료 주입(마이크로 시린지) → 컬럼(2~50 m, ~250 °C 이하, 안쪽 벽 고정상) → 검출기(TCD 열전도도, FID 불꽃 이온화)</div>
    <div><div class="h">원리</div>성분마다 고정상과의 물리적 상호작용(흡착·탈착 평형)이 달라 속도가 다름 → 분리 → [[retention|머무름 시간]]으로 식별, 피크 면적(≈ ½ w_b h)으로 정량</div>
    <div><div class="h">유량 최적화</div>너무 빠름: 상호작용 부족 → 분리능↓ · 너무 느림: 종방향 확산 → 피크 넓어짐 · 최적점에서 분리 효율 최대</div>
    <div><div class="h">장점</div>휘발성 물질, sub-ppm 감도, 높은 분리능, 다성분 동시 분석, 자동화·재현성 · 센서의 참값(reference) 측정에도 사용</div></div>`,
  easy:'섞여 있는 가스를 긴 관에 통과시키면 관 벽에 잘 달라붙는 가스는 늦게 나와요. 나오는 시간으로 누군지, 피크 크기로 얼마나 있는지 알아요.',
  src:'【Gases that interact strongly with the stationary phase move more slowly through the column】 【Area = 1/2 wb·h】'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'기출·숙제',h:'',b:'__MT:t4,t5,t6,t7,t8,t9__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li><b>Pd 수소센서</b>: 흡착 → 해리 → 확산 → PdHₓ → 저항 변화 · 팽창 10.9 % → Pd–Ni(4~8 %)</li><li><b>반도체식</b>: n형 + 환원성 = R↓, n형 + 산화성 = R↑ (p형은 반대) · 200~400 °C</li><li><b>측정</b>: 4선식 Rs = Vs/Is · 브리지 V_o = V_in[R₃/(R₂+R₃) − R₄/(R₁+R₄)] · 1 % = 10⁴ ppm</li></ol>
   <div class="eyebrow">스스로 점검</div>
   <details class="qa"><summary>왜 수소센서에 마이크로히터가 필요한가?</summary><div>흡착·확산과 탈착의 trade-off로 최적 온도가 있고, 주변 온도와 무관하게 일정하게 유지해야 재현성 있는 응답을 얻기 때문.</div></details>
   <details class="qa"><summary>브리지에서 기준 저항을 센서와 같은 재료로 만드는 이유는?</summary><div>온도로 둘 다 같은 비율로 변하면 비가 유지돼 V_o의 온도 의존성이 최소가 됨(온도 보상).</div></details>
   <details class="qa"><summary>GC에서 유량이 너무 빠르면?</summary><div>고정상과 상호작용할 시간이 부족해 분리능이 떨어짐.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'gs1',tag:'가스',f:'가스센서 종류 5가지',a:'저항형(반도체식), 접촉연소식, 광학식, 전기화학식, GC',r:'',e:''},
 {id:'gs2',tag:'가스',f:'Pd 수소 감지 순서',a:'흡착 → 해리 → 확산·흡수 → PdHₓ → 전도도 변화 → 저항 변화',r:'',e:''},
 {id:'gs3',tag:'가스',f:'Pd 부피 팽창과 해결책',a:'최대 10.9 % → Pd–Ni 합금(Ni 4~8 %)',r:'대신 감도 감소 가능',e:''},
 {id:'gs4',tag:'가스',f:'n형 + 환원성 가스 → 저항은?',a:'감소 (전자↑ 공핍층↓)',r:'산화성이면 증가 · p형은 반대',e:''},
 {id:'gs5',tag:'가스',f:'반도체식 가스센서 동작 온도',a:'200~400 °C',r:'마이크로히터 필요',e:''},
 {id:'gs6',tag:'가스',f:'4선식의 목적',a:'리드선 저항에 의한 전압강하 제거 (Rs = Vs/Is)',r:'전압선 전류 ≈ 0',e:''},
 {id:'gs7',tag:'가스',f:'브리지 출력 식 (교수님 식)',a:'V_o = V_in[R₃/(R₂+R₃) − R₄/(R₁+R₄)]',r:'평형 R₁R₃ = R₂R₄',e:''},
 {id:'gs8',tag:'가스',f:'1 %는 몇 ppm?',a:'10,000 ppm (10⁴)',r:'',e:''},
 {id:'gs9',tag:'가스',f:'마이크로히터 재료와 이유',a:'Pt — 녹는점 1768 °C, 고온 안정·내산화, 저항-온도 관계 안정',r:'',e:''},
 {id:'gs10',tag:'가스',f:'줄 가열과 온도 상승 식',a:'P = I²R = VI · VIt = Cₚ m ΔT',r:'',e:''},
 {id:'gs11',tag:'가스',f:'스테판-볼츠만 법칙',a:'P = εσT⁴ (T는 K)',r:'σ = 5.67 × 10⁻⁸',e:''},
 {id:'gs12',tag:'가스',f:'GC 분리 원리',a:'고정상과의 상호작용 차이 → 이동 속도 차 → 머무름 시간',r:'면적 ≈ ½ w_b h',e:''},
 {id:'gs13',tag:'가스',f:'선택성 향상 방법 4가지',a:'물질 선택, 온도 최적화, 다공성 막·필터, 센서 어레이 + 패턴 인식',r:'',e:''}
);
