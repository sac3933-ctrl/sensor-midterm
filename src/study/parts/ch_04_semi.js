/* ═════════ 제0편 7장 반도체 기초 (밴드갭·도핑·PN 접합·트랜지스터 스위치) ═════════ */
Object.assign(TERM,{
 carrier:{ko:'캐리어',en:'Charge carrier (electron / hole)',gen:'전기를 실어 나르는 알갱이.',tech:'자유전자(−)와 정공(+, 전자가 빠진 빈자리). 반도체는 둘 다 전류를 만든다. 수가 많은 쪽 = 다수 캐리어.',easy:'버스 좌석에서 사람이 한 칸씩 옮기면 빈자리가 반대 방향으로 이동하는 것처럼, 정공은 "움직이는 빈자리"예요.',ex:'n형 실리콘에서는 전자가 다수 캐리어, p형에서는 정공이 다수 캐리어예요. 홀 센서 전압의 부호가 이 차이로 반대가 돼요.',sum:'전자(−)와 정공(+)이 전류를 나른다'},
 doping:{ko:'도핑',en:'Doping',gen:'반도체에 다른 원소를 아주 조금 넣어 성질을 바꾸는 것.',tech:'4가 실리콘에 5가(인 P, 비소 As) → 남는 전자 → n형. 3가(붕소 B) → 빈자리 정공 → p형. 10⁶~10⁸개 원자 중 하나 정도만 넣어도 전도도가 크게 변함.',easy:'순수 실리콘은 전기가 잘 안 통하는데, 다른 원자를 살짝 섞으면 통하게 돼요.',ex:'실리콘 원자 1억 개에 인 원자 1개만 넣어도 상온 전도도가 수만 배 이상 커질 수 있어요.',sum:'5가 → n형(전자), 3가 → p형(정공)'},
 pnjunc:{ko:'PN 접합',en:'PN junction',gen:'p형과 n형을 붙인 경계.',tech:'경계에서 전자·정공이 재결합해 캐리어 없는 공핍층과 내부 전위(Si 약 0.6~0.7 V) 형성. 순방향(p에 +)이면 전류가 흐르고, 역방향이면 거의 막힘(작은 누설 전류). 다이오드·LED·포토다이오드·태양전지의 기본.',easy:'한쪽으로만 열리는 문이에요. 미는 방향이 맞고 힘(약 0.7 V)이 충분하면 열려요.',ex:'실리콘 다이오드에 0.3 V를 걸면 거의 안 흐르다가, 0.7 V 근처에서 수 mA가 흐르기 시작해요.',sum:'순방향 약 0.7 V 이상이면 통하고 역방향은 막힌다'},
 diode:{ko:'다이오드',en:'Diode',gen:'전류를 한 방향으로만 흘리는 소자.',tech:'PN 접합. 애노드(A, p) → 캐소드(K, n)로 흐름. Si 순방향 전압 약 0.6~0.7 V, 순방향 전압은 온도 1 °C당 약 −2 mV 변화(온도센서로 활용). 역전압이 항복전압을 넘으면 급격히 흐름(제너).',easy:'전기의 일방통행 표지판이에요.',ex:'25 °C에서 0.650 V이던 다이오드 전압이 0.570 V가 됐다면, −80 mV ÷ −2 mV/°C = 40 °C 올라 약 65 °C예요.',sum:'A → K 한 방향, 순방향 약 0.7 V, −2 mV/°C'},
 bjt:{ko:'트랜지스터 (BJT)',en:'Bipolar junction transistor',gen:'작은 전류로 큰 전류를 켜고 끄는 소자.',tech:'NPN: 베이스(B)에 작은 전류 I_B → 컬렉터(C)→이미터(E)로 I_C = β·I_B (β 수십~수백). 스위치로 쓸 때는 포화(V_CE 약 0.2 V)까지 충분히 I_B를 줌. PNP는 극성이 반대. 전압으로 켜는 MOSFET도 같은 역할.',easy:'작은 손잡이(베이스)를 돌리면 큰 수도꼭지(컬렉터 전류)가 열려요.',ex:'β = 100인 NPN에 베이스 전류 0.1 mA를 주면 컬렉터에 최대 10 mA까지 흘릴 수 있어요. 릴레이·LED·PLC 입력을 켜는 데 써요.',sum:'작은 베이스 전류로 큰 C-E 전류를 켠다'},
 ledvf:{ko:'LED 순방향 전압',en:'LED forward voltage (V_F)',gen:'LED가 켜질 때 걸리는 전압.',tech:'색(밴드갭)에 따라 다름: 적색 약 1.8~2.2 V, 녹색 2~3 V, 청·백색 약 2.8~3.4 V(대략값). 전류 제한 저항 R = (V_s − V_F)/I_F 필수.',easy:'LED마다 켜지는 데 필요한 최소 전압이 있고, 나머지 전압은 저항이 맡아야 해요.',ex:'5 V 전원으로 적색 LED(2 V)를 10 mA로 켜려면 R = (5 − 2) ÷ 0.01 = 300 Ω, 표준값 330 Ω을 써요.',sum:'R = (V_s − V_F)/I_F로 전류를 제한한다'}
});
FORM.push(
 {eq:'I_C = β·I_B',read:'컬렉터 전류는 베타 곱하기 베이스 전류',name:'트랜지스터 전류 증폭',page:'semi',sec:3,syms:[]},
 {eq:'R = (V_s − V_F) / I_F',read:'LED 전류 제한 저항',name:'LED 저항',page:'semi',sec:2,syms:[]},
 {eq:'R_B = (V_in − 0.7) / I_B',read:'베이스 저항',name:'트랜지스터 베이스 저항',page:'semi',sec:3,syms:[]},
 {eq:'ΔV_F ≈ −2 mV/°C',read:'다이오드 온도 계수',name:'다이오드 온도 특성',page:'semi',sec:2,syms:[]}
);

ANIM.npnSw=host=>{let on=false;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 220" role="img" aria-label="NPN 트랜지스터 스위치"></svg><div class="figctl"><button class="primary" data-t>물체 감지 ON</button></div>
   <div class="tofcalc mono small" data-o></div><figcaption>근접 센서 안의 NPN 트랜지스터예요. 감지하면 베이스에 작은 전류가 흘러 트랜지스터가 켜지고, 출력선(흑)이 0 V 쪽으로 당겨져 PLC 입력에 전류가 흘러요(싱크).</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const draw=()=>{const c=on?'var(--accent)':'var(--line)';
   svg.innerHTML=`<rect x="10" y="20" width="160" height="180" rx="10" style="fill:var(--surface2);stroke:var(--line)"/>${tx(90,38,'근접 센서','b2','middle')}
    <rect x="22" y="70" width="44" height="40" rx="6" style="fill:${on?'var(--warn-soft)':'var(--surface)'};stroke:var(--ink)"/>${tx(44,94,'감지','small2','middle')}
    ${wire('M66 90 H92')}${rbox(84,84,20,12,'')}${tx(94,80,'R_B','small2','middle')}<circle cx="128" cy="110" r="20" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/>
    <path d="M104 90 H118 M118 98 V122 M118 104 L136 92 V60 M118 116 L136 128 V170" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><path d="M136 128 l-9 -1 l5 -6 z" style="fill:var(--ink)"/>
    ${tx(110,140,'B','small2')}${tx(142,70,'C','small2')}${tx(142,160,'E','small2')}
    <path d="M136 60 H230" style="fill:none;stroke:${c};stroke-width:${on?3:1.6}"/><path d="M136 170 V190 H300" style="fill:none;stroke:${c};stroke-width:${on?3:1.6}"/>
    ${tx(176,54,'흑 출력','small2')}${tx(250,184,'청 0 V','small2')}
    <rect x="230" y="40" width="96" height="70" rx="8" style="fill:var(--surface);stroke:var(--ink)"/>${tx(278,58,'PLC 입력','b2','middle')}<circle cx="278" cy="84" r="10" style="fill:${on?'var(--good)':'var(--surface2)'};stroke:var(--ink)"/>${tx(278,124,'COM = +24 V','small2','middle')}
    <path d="M300 110 V143 M300 157 V190" style="fill:none;stroke:${c};stroke-width:${on?3:1.6}"/><path d="M286 143 H314" style="stroke:var(--ink);stroke-width:2.4"/><path d="M293 157 H307" style="stroke:var(--ink);stroke-width:4"/>${tx(318,140,'+','small2')}${tx(318,166,'24 V','small2')}${on?ar(200,60,170,60,'a',2)+ar(260,190,220,190,'a',2):''}`;
   q('[data-o]').innerHTML=on?'감지 → I_B 흐름 → C-E 켜짐(V_CE ≈ 0.2 V) → +24 V → PLC 입력 → 출력선 → 0 V: <b>입력 ON</b>':'감지 없음 → I_B = 0 → C-E 꺼짐 → 전류 경로 없음: <b>입력 OFF</b>';
   q('[data-t]').textContent=on?'물체 감지 OFF':'물체 감지 ON'};
  q('[data-t]').onclick=()=>{on=!on;draw()};draw();return null};

Object.assign(FIG,{
 bands(){const col=(x,lbl,gap,note)=>{const top=40,h=150;const cb=gap===0?100:100-gap*18,vb=gap===0?110:100+gap*0;return `<rect x="${x}" y="${top}" width="80" height="${cb-top}" style="fill:var(--unit-soft,var(--surface2))"/><rect x="${x}" y="${gap===0?cb-14:100}" width="80" height="${top+h-(gap===0?cb-14:100)}" style="fill:var(--warn-soft)"/>${gap>0?`<line x1="${x+40}" y1="${cb}" x2="${x+40}" y2="100" style="stroke:var(--ink)"/><text x="${x+44}" y="${(cb+100)/2+4}" class="small2">${note}</text>`:`<text x="${x+40}" y="${cb-20}" text-anchor="middle" class="small2">${note}</text>`}<text x="${x+40}" y="${top+h+16}" text-anchor="middle" class="b2">${lbl}</text>`};
  return svgFig(340,215,`${col(20,'도체',0,'겹침')}${col(130,'반도체',1.2,'≈1 eV')}${col(240,'절연체',3.2,'> 5 eV')}${tx(16,30,'위: 전도대 (전자가 움직이는 층) · 아래: 가전자대','small2')}`,'밴드갭 비교','틈(밴드갭)이 없으면 도체, 조금 있으면 반도체(Si 1.12 eV), 크면 절연체. 반도체는 열·빛 에너지로 전자가 틈을 넘어 전기가 통해요 — 그래서 온도·빛 센서가 돼요.')},
 diodeIV(){const X=v=>170+v*110,Y=i=>150-i*4.5;let d='M20 '+Y(-0.3);for(let k=0;k<=100;k++){const v=-1.2+k*0.02;const i=v<0?-0.3:Math.min(28,0.002*(Math.exp(v/0.06)-1));d+=` L${X(v).toFixed(1)} ${Y(i).toFixed(1)}`}
  return svgFig(340,190,`<line x1="20" y1="150" x2="330" y2="150" style="stroke:var(--ink)"/><line x1="170" y1="20" x2="170" y2="175" style="stroke:var(--ink)"/>${tx(330,168,'전압 V →','small2','end')}${tx(176,28,'전류 I','small2')}
   <path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.6"/><line x1="${X(0.65)}" y1="150" x2="${X(0.65)}" y2="40" style="stroke:var(--warn);stroke-dasharray:3 3"/>${tx(X(0.65)+4,48,'≈ 0.7 V부터 흐름','w small2')}
   ${tx(60,140,'역방향: 거의 0 (누설)','small2','middle')}${tx(250,170,'순방향','small2','middle')}${tx(80,170,'역방향','small2','middle')}`,'다이오드 전압–전류 곡선','순방향(오른쪽)은 약 0.7 V를 넘으면 전류가 급하게 늘고, 역방향(왼쪽)은 아주 작은 누설만 흘러요. 포토다이오드는 역방향에 빛을 받아 이 누설이 빛만큼 커지는 원리예요.')}
});

Object.assign(GEN,{
 ledR(base){const Vs=base?5:pick([3.3,5,12,24]),c=base?['적색',2]:pick([['적색',2],['녹색',2.2],['청색',3.2],['백색',3.1]]),I=base?10:pick([5,10,15,20]);if(Vs<=c[1])return GEN.ledR(base);const R=(Vs-c[1])/(I*1e-3);const P=(Vs-c[1])*I*1e-3;
  return {kind:base?'기본':'유사',title:'LED 전류 제한 저항',q:`${Vs} V 전원으로 ${c[0]} LED(V_F ≈ ${c[1]} V)를 ${I} {{mA}}로 켜려면 저항은 몇 Ω이고, 저항이 소비하는 전력은?`,first:['R = (V_s − V_F)/I','P = V·I'],
   steps:[{h:'저항에 걸리는 전압',b:`<div class="ln">${Vs} − ${c[1]} = ${fx(Vs-c[1],4)} V (KVL)</div>`},{h:'저항',b:`<div class="ln">${fx(Vs-c[1],4)} ÷ ${I}×10⁻³ = ${fx(R,4)} Ω</div><div class="rd">표준값은 바로 위 값을 골라 전류를 조금 줄임</div>`},{h:'전력',b:`<div class="ln">${fx(Vs-c[1],4)} × ${I}×10⁻³ = ${fx(P*1000,4)} mW</div><div class="rd">${P>0.25?'1/4 W 저항으로는 부족 → 1/2 W 이상':'1/4 W 저항이면 충분'}</div>`}],
   ans:`${fx(R,4)} Ω · ${fx(P*1000,4)} mW`,ansRead:`${fxR(R,4)} 옴`,calc:calcBlock([[['(',...ks(Vs),'−',...ks(c[1]),')','÷',...K(I,-3),'='],casioDec(R)]],[W_NEG]),easy:'LED가 쓰고 남은 전압을 저항이 받아서 전류를 정해요.'}},
 baseR(base){const Vin=base?5:pick([3.3,5,24]),Ic=base?50:pick([10,20,50,100]),beta=base?100:pick([50,100,200]);const Ib=Ic/beta,Ibs=Ib*5;const Rb=(Vin-0.7)/(Ibs*1e-3);
  return {kind:base?'기본':'응용',title:'트랜지스터 스위치 베이스 저항',q:`β = ${beta}인 NPN으로 ${Ic} mA 부하를 ${Vin} V 신호로 켜려 한다. 확실히 포화시키려고 베이스 전류를 필요값의 5배로 줄 때 베이스 저항 R_B는?`,first:['I_B = I_C/β','포화 여유 × 5','R_B = (V_in − 0.7)/I_B'],
   steps:[{h:'필요 I_B',b:`<div class="ln">${Ic} ÷ ${beta} = ${fx(Ib,4)} mA</div>`},{h:'여유',b:`<div class="ln">× 5 = ${fx(Ibs,4)} mA</div><div class="rd">β는 소자마다 편차가 커서 넉넉히</div>`},{h:'R_B',b:`<div class="ln">(${Vin} − 0.7) ÷ ${fx(Ibs,4)}×10⁻³ = ${fx(Rb,4)} Ω ≈ ${KO(Rb)}</div><div class="rd">베이스-이미터도 PN 접합이라 약 0.7 V를 빼요</div>`}],
   ans:`R_B ≈ ${KO(Rb)}`,ansRead:KO(Rb).replace('kΩ','킬로옴').replace(' Ω',' 옴'),calc:calcBlock([[['(',...ks(Vin),'−','0','.','7',')','÷',...K(+Ibs.toFixed(4),-3),'='],casioDec(Rb)]],[W_NEG]),easy:'작은 손잡이 전류를 넉넉히 줘야 큰 수도꼭지가 끝까지 열려요.'}},
 diodeT(base){const V25=base?0.65:pick([0.6,0.62,0.65,0.7]),k=-2,dT=base?40:pick([-20,15,30,60,80]);const V=V25+k*1e-3*dT;const back=!base&&Math.random()<.5;
  return {kind:base?'기본':'응용',title:back?'다이오드 전압 → 온도':'다이오드 온도센서',q:back?`25 °C에서 ${V25} V인 실리콘 다이오드(−2 mV/°C)의 순방향 전압이 ${fx(V,4)} V가 됐다. 온도는?`:`25 °C에서 순방향 전압 ${V25} V인 다이오드가 ${25+dT} °C가 되면 전압은? (−2 mV/°C)`,first:['ΔV = −2 mV × ΔT'],
   steps:back?[{h:'ΔV',b:`<div class="ln">${fx(V,4)} − ${V25} = ${fx((V-V25)*1000,4)} mV</div>`},{h:'ΔT',b:`<div class="ln">${fx((V-V25)*1000,4)} ÷ (−2) = ${dT} °C → ${25+dT} °C</div><div class="rd">온도↑ → 순방향 전압↓</div>`}]:[{h:'ΔT',b:`<div class="ln">${25+dT} − 25 = ${dT} °C</div>`},{h:'ΔV',b:`<div class="ln">−2 mV × ${dT} = ${fx(-2*dT,4)} mV → ${fx(V,4)} V</div><div class="rd">IC 온도센서(예: 10 mV/°C 출력)의 안쪽 원리</div>`}],
   ans:back?`${25+dT} °C`:`${fx(V,4)} V`,ansRead:back?`${25+dT}도`:`${fxR(V,4)} 볼트`,calc:calcBlock([[back?['(',...ks(+V.toFixed(4)),'−',...ks(V25),')','÷','(−)','0','.','0','0','2','+','2','5','=']:[...ks(V25),'+','(−)','0','.','0','0','2','×',...nk(dT),'='],back?String(25+dT):casioDec(V)]],[]),easy:'다이오드는 뜨거울수록 더 쉽게 켜져서, 켜지는 전압이 조금씩 낮아져요.'}},
 carrierType(){const C=pick([['인(P), 5가','n형','전자','−'],['붕소(B), 3가','p형','정공','+'],['비소(As), 5가','n형','전자','−'],['갈륨(Ga), 3가','p형','정공','+']]);
  return {kind:'유사',title:'도핑 종류와 다수 캐리어',q:`실리콘(4가)에 ${C[0]} 원소를 도핑했다. 무슨 형이고 다수 캐리어는? 이 재료로 홀 센서를 만들면 캐리어가 쌓이는 면의 전위 부호는?`,first:['5가 → 남는 전자 → n형','3가 → 빈자리 → p형'],
   steps:[{h:'형',b:`<div class="ln">${C[0]} → ${C[1]}</div><div class="rd">실리콘은 이웃과 전자 4개로 결합 → ${C[1]==='n형'?'5번째 전자가 남음':'1개가 모자라 빈자리(정공)'}</div>`},{h:'다수 캐리어',b:`<div class="ln">${C[2]} (${C[3]})</div>`},{h:'홀 센서',b:`<div class="ln">캐리어가 쌓이는 면 = ${C[3]}</div><div class="rd">그래서 n형·p형 홀 전압 부호가 반대</div>`}],
   ans:`${C[1]} · 다수 캐리어 ${C[2]} · 쌓이는 면 ${C[3]}`,ansRead:C[1],calc:'<p class="small muted">계산 없음 — 원자가(5가/3가)만 보면 돼요.</p>',easy:'전자가 하나 남으면 n형, 하나 모자라면 p형이에요.'}}
});
PSET.semi=[['carrierType'],['carrierType'],['ledR',true],['ledR'],['diodeT',true],['diodeT'],['baseR',true],['baseR'],['cutoff']];
TOPICS.semi={name:'반도체 기초',g:['carrierType','ledR','diodeT','baseR']};['carrierType','ledR','diodeT','baseR'].forEach(g=>BASICG.add(g));

PAGES.semi={title:'반도체 기초 — 도핑·다이오드·트랜지스터',part:'제0편 7장',secs:[
 {k:'밴드갭',h:'도체·반도체·절연체',b:`<p class="small muted">[AI 보충] 강의 밖 기초 · 가스·홀·광학·온도 센서가 왜 반도체로 만들어지는지의 출발점이에요.</p>${FIG.bands()}
   <ul class="clean"><li>[[bandgap|밴드갭]]이 적당히 작아서 열·빛·가스 같은 바깥 자극으로 전도도가 크게 바뀜 → 센서 재료</li><li>온도↑ → 넘어가는 전자↑ → 저항↓ (NTC 서미스터의 이유)</li><li>전기를 나르는 건 [[carrier|캐리어]]: 전자와 정공</li></ul><button class="ghost" data-goto="optic" data-i="1">↗ 빛으로 넘기기 (광전 효과)</button>`,
  easy:'반도체는 평소엔 문이 반쯤 닫혀 있다가, 열이나 빛을 받으면 문이 열려 전기가 통해요.',
  ex:'실리콘 밴드갭 1.12 eV는 빛으로 치면 약 1100 nm(근적외선) 광자 에너지예요. 그보다 짧은 파장의 빛은 전자를 넘길 수 있어요.',sum:'밴드갭이 적당해서 바깥 자극으로 전도도가 바뀐다'},
 {k:'도핑',h:'n형과 p형',b:`<div class="f4"><div><div class="h">n형</div>4가 Si + 5가(인 P, 비소 As) → 남는 전자 → 다수 캐리어 = 전자(−)</div><div><div class="h">p형</div>4가 Si + 3가(붕소 B) → 빈자리 = 정공 → 다수 캐리어 = 정공(+)</div></div>
   <div class="tblwrap fit"><table><tr><th>센서</th><th>n형·p형이 왜 중요한가</th></tr><tr><td>홀 센서</td><td class="small">캐리어 부호가 반대 → 홀 전압 극성 반대</td></tr><tr><td>가스센서</td><td class="small">SnO₂(n형): 환원성 가스 → 저항↓ · p형은 반대</td></tr><tr><td>압저항</td><td class="small">도핑 종류·방향으로 감도 부호와 크기가 달라짐</td></tr><tr><td>포토다이오드</td><td class="small">p와 n을 붙인 접합에서 광전류</td></tr></table></div>`,
  easy:'전자가 하나 남게 섞으면 n형, 하나 모자라게 섞으면 p형이에요.',
  ex:'n형 SnO₂ 가스센서에 CO(환원성)가 닿으면 표면 산소가 떨어져 나가며 전자가 돌아와 저항이 줄어요. 같은 가스에 p형 센서는 저항이 늘어요.',sum:'5가 → n형(전자), 3가 → p형(정공) — 센서 반응 방향을 정한다'},
 {k:'PN 접합',h:'PN 접합·다이오드·LED·포토다이오드',b:`${FIG.diodeIV()}${symGrid(['diode','led','pd'])}
   <div class="f4"><div><div class="h">[[diode|다이오드]]</div>A → K 한 방향 · Si 약 0.7 V · 순방향 전압 약 −2 mV/°C (온도센서)</div><div><div class="h">LED</div>순방향에 빛 · [[ledvf|V_F]] 적 2 V, 청·백 3 V 대 · R = (V_s − V_F)/I</div><div><div class="h">포토다이오드</div>역방향 연결 · 빛 → 광전류 → TIA로 전압</div></div>`,
  easy:'[[pnjunc|PN 접합]]은 한쪽으로만 열리는 문이에요. 문을 밀면 LED는 빛을 내고, 문을 반대로 잠가 둔 채 빛을 비추면 포토다이오드는 전류를 내요.',
  ex:'광전센서는 LED(송광)와 포토다이오드(수광)가 짝이에요. 5 V로 적외선 LED(1.2 V)를 20 mA로 켜면 R = 3.8 ÷ 0.02 = 190 Ω이에요.',sum:'순방향은 통함·빛 발생, 역방향은 막힘·빛 감지'},
 {k:'트랜지스터',h:'트랜지스터 스위치 — 센서 출력의 정체',b:`<div data-anim="npnSw"></div>${symGrid(['npn','pnp'])}
   <div class="eqn">I_C = β·I_B,  R_B = (V_in − 0.7)/I_B<small>[[bjt|BJT]] · 스위치로 쓸 때는 포화(V_CE ≈ 0.2 V)까지 · MOSFET은 전압으로 켬</small></div>
   <p>근접·광전 센서의 NPN(싱크)·PNP(소스) 출력이 바로 이 트랜지스터예요. PLC 입력 공통선과 짝을 맞춰야 전류 경로가 생겨요.</p><button class="ghost" data-goto="prox" data-i="4">↗ NPN·PNP 배선 (근접센서)</button>`,
  easy:'작은 손잡이(베이스 전류)를 돌리면 큰 수도꼭지(컬렉터 전류)가 열려요. 센서는 이 손잡이를 감지 신호로 돌려요.',
  ex:'NPN 센서 + PLC 입력(공통선 +24 V): 감지하면 트랜지스터가 켜져 +24 V → PLC 입력 → 센서 출력 → 0 V로 약 6 mA가 흘러 입력이 ON이 돼요.',sum:'작은 I_B로 큰 I_C를 켠다 — NPN은 싱크, PNP는 소스'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>밴드갭 작음 → 열·빛으로 전도도 변화 · 온도↑ 반도체 저항↓</li><li>5가 → n형(전자), 3가 → p형(정공) · PN 순방향 약 0.7 V, −2 mV/°C</li><li>LED R = (V_s − V_F)/I · I_C = β·I_B · NPN 싱크, PNP 소스</li></ol>
   <details class="qa"><summary>포토다이오드를 역방향으로 연결하는 이유는?</summary><div>역방향이면 평소 전류가 거의 0이라, 빛으로 생긴 광전류만 깨끗하게 보이고 응답도 빨라짐.</div></details>
   <details class="qa"><summary>NPN 센서를 PNP용 PLC 입력에 꽂으면?</summary><div>전류 경로가 생기지 않아 감지해도 입력이 안 들어옴(공통선 극성이 안 맞음).</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'sm1',tag:'반도체',f:'n형과 p형 도핑',a:'5가(P, As) → n형·전자 / 3가(B) → p형·정공',r:'',e:''},
 {id:'sm2',tag:'반도체',f:'실리콘 다이오드 순방향 전압과 온도 계수',a:'약 0.7 V, 약 −2 mV/°C',r:'IC 온도센서 원리',e:''},
 {id:'sm3',tag:'반도체',f:'LED 전류 제한 저항',a:'R = (V_s − V_F)/I_F',r:'적 2 V, 청·백 3 V 대',e:''},
 {id:'sm4',tag:'반도체',f:'트랜지스터 전류 관계',a:'I_C = β·I_B',r:'스위치는 포화까지 넉넉히',e:''},
 {id:'sm5',tag:'반도체',f:'온도가 오르면 반도체 저항은?',a:'줄어든다 (캐리어 증가, NTC)',r:'',e:''}
);
