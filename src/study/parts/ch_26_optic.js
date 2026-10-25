/* ═════════ 제2편 6장 광학 ═════════ */
Object.assign(TERM,{
 wavelength:{ko:'파장',en:'Wavelength (λ)',gen:'파동 한 번의 길이.',tech:'c = λf (빛 c = 3 × 10⁸ m/s). 가시광 약 380~780 nm, 자외선 < 380 nm, 적외선 > 780 nm.',easy:'물결 꼭대기에서 다음 꼭대기까지의 거리예요. 빛은 색마다 파장이 달라요.'},
 photon:{ko:'광자',en:'Photon',gen:'빛 에너지의 알갱이.',tech:'E = hf = hc/λ. h = 6.626 × 10⁻³⁴ J·s. eV 단위로 E ≈ 1240/λ[nm]. 파장이 짧을수록 에너지 큼.',easy:'빛은 작은 에너지 알갱이로 와요. 파란빛 알갱이가 빨간빛보다 세요.'},
 bandgap:{ko:'밴드갭',en:'Bandgap (E_g)',gen:'전자가 움직이려면 넘어야 하는 에너지 문턱.',tech:'광자 에너지 > E_g면 전자-정공 쌍 생성 → 전류. 차단 파장 λ_c = 1240/E_g [nm]. Si 1.12 eV → 약 1100 nm, Ge 0.66 eV → 약 1880 nm.',easy:'문턱보다 센 빛 알갱이만 전자를 깨울 수 있어요.'},
 photodiode:{ko:'포토다이오드',en:'Photodiode',gen:'빛을 받으면 전류가 나오는 반도체.',tech:'PN 접합에 빛 → 광전류 I_ph = ℛ·P (ℛ 감응도 A/W). 역바이어스(광도전 모드)는 빠르고 선형, 0 V(광기전 모드)는 저잡음. 트랜스임피던스 증폭기로 V = I·R_f.',easy:'빛이 세면 전류가 비례해서 많이 나와요.'},
 responsivity:{ko:'감응도',en:'Responsivity (ℛ)',gen:'빛 1 W당 나오는 전류.',tech:'ℛ = I_ph/P [A/W] = η·qλ/(hc) ≈ η·λ[nm]/1240. Si는 900 nm 근처 약 0.6 A/W.',easy:'빛 1 와트를 넣으면 몇 암페어가 나오는지예요.'},
 ldr:{ko:'포토레지스터 (CdS)',en:'Photoresistor (LDR)',gen:'빛이 세면 저항이 줄어드는 부품.',tech:'광도전 효과: 빛 → 캐리어 증가 → 저항 감소. 어두울 때 MΩ, 밝을 때 kΩ 이하. 느리고(수십 ms) 비선형, 가로등 자동 점멸 등.',easy:'밝으면 전기가 잘 통하고, 어두우면 안 통해요.'},
 tia:{ko:'트랜스임피던스 증폭기',en:'Transimpedance amplifier (TIA)',gen:'전류를 전압으로 바꾸는 증폭기.',tech:'op-amp 반전 입력에 포토다이오드, 피드백 저항 R_f → V_out = −I_ph·R_f. 다이오드 전압을 0으로 유지해 선형.',easy:'작은 빛 전류를 읽기 쉬운 전압으로 바꿔요.'},
 photoint:{ko:'포토인터럽터·광전센서',en:'Photointerrupter / Photoelectric sensor',gen:'빛이 가려지는지로 물체를 감지.',tech:'투과형(송·수광기 마주 봄), 회귀반사형(반사판), 확산반사형(물체 반사). 엔코더 슬릿 판 → 펄스 수 = 회전각.',easy:'빛이 끊기면 "뭔가 지나갔다"고 알아요.'},
 encoder:{ko:'광학 엔코더',en:'Optical encoder',gen:'회전을 펄스로 세는 센서.',tech:'슬릿 원판 + 포토인터럽터. 분해능 = 360°/PPR. A·B 두 상(90° 차)으로 방향 판별, 4체배 가능.',easy:'바퀴에 구멍 뚫린 판을 달고 빛이 몇 번 통과했는지 세요.'},
 beerlambert:{ko:'비어-람베르트 법칙',en:'Beer–Lambert law',gen:'빛이 물질을 지나며 흡수되어 약해지는 법칙.',tech:'I = I₀·e^(−αcL) (또는 흡광도 A = εcL). 가스 농도 c가 크고 경로 L이 길수록 많이 흡수. NDIR CO₂ 센서(4.26 μm).',easy:'진한 주스일수록, 컵이 두꺼울수록 빛이 덜 통과해요.'},
 lidar:{ko:'라이다',en:'LiDAR',gen:'빛을 쏘아 돌아오는 시간으로 거리 측정.',tech:'광 ToF: d = c·t/2. 1 ns ≈ 15 cm 왕복 분해능. 자율주행·드론·3D 스캔.',easy:'초음파 대신 빛으로 메아리를 듣는 거예요. 빛이 워낙 빨라서 아주 짧은 시간을 재요.'},
 thermalir:{ko:'열형 적외선 센서',en:'Thermal IR detector',gen:'적외선 열로 온도가 올라가는 것을 재는 센서.',tech:'써모파일(열전대 직렬, 비접촉 온도계), 볼로미터(저항 변화, 열화상), 초전형 PIR(온도 "변화"만 감지 → 인체 감지). 파장 무관, 양자형보다 느림.',easy:'빛 알갱이를 세는 대신, 빛이 주는 "열"을 재요.'}
});
Object.assign(UNIT,{
 eV:{s:'eV',r:'일렉트론볼트',mean:'1 eV = 1.602 × 10⁻¹⁹ J'},
 AW:{s:'A/W',r:'암페어 퍼 와트',mean:'광검출기 감응도'},
 uW:{s:'μW',r:'마이크로와트',mean:'10⁻⁶ W'},
 ns:{s:'ns',r:'나노초',mean:'10⁻⁹ s'},
 ppr:{s:'PPR',r:'피피알 (펄스 퍼 레볼루션)',mean:'1회전당 펄스 수'}
});
FORM.push(
 {eq:'c = λf,  E = hc/λ ≈ 1240/λ[nm] eV',read:'광자 에너지',name:'빛의 파장과 에너지',page:'optic',sec:0,syms:[['λ','파장','nm'],['E','광자 에너지','eV']]},
 {eq:'λ_c = 1240/E_g [nm]',read:'차단 파장',name:'밴드갭과 차단 파장',page:'optic',sec:1,syms:[]},
 {eq:'I_ph = ℛ·P,  V = I_ph·R_f',read:'광전류와 TIA',name:'포토다이오드 출력',page:'optic',sec:3,syms:[['ℛ','감응도','AW']]},
 {eq:'I = I₀·e^(−αcL)',read:'비어 람베르트',name:'빛 흡수 (NDIR)',page:'optic',sec:5,syms:[]},
 {eq:'d = c·t/2',read:'광 비행시간',name:'라이다 거리',page:'optic',sec:5,syms:[]}
);

ANIM.photoeff=host=>{let lam=550;const Eg=1.12;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 200" role="img" aria-label="광전 효과와 밴드갭"></svg><div class="figctl"><label class="small">파장 λ <input type="range" min="300" max="1500" step="10" value="550" data-l style="width:170px"> <b data-lv>550 nm</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>실리콘(E_g = 1.12 eV): 광자 에너지가 문턱보다 크면 전자가 위로 튀어 올라 전류가 돼요. 약 1100 nm보다 긴 적외선은 문턱을 못 넘어요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const col=l=>l<380?'#7a4cc2':l<450?'#5b4bd6':l<495?'#2e7fd6':l<570?'#2fa34a':l<590?'#c9b51e':l<620?'#e08a1e':l<780?'#d33a2c':'#8a3a30';
  const L=loop(tp=>{const E=1240/lam,ok=E>Eg;const ph=(tp*1.2)%1;const x=30+ph*150;let wave='';for(let i=0;i<=60;i++){const xx=x-60+i;wave+=(i?'L':'M')+xx+' '+(60+Math.sin((xx)*2*Math.PI/(lam/25))*8).toFixed(1)}
   const ey=ok&&ph>0.6?150-(ph-0.6)/0.4*80:150;
   svg.innerHTML=`<rect x="190" y="40" width="130" height="40" style="fill:var(--unit-soft,var(--surface2))"/>${tx(255,34,'전도대','small2','middle')}<rect x="190" y="140" width="130" height="40" style="fill:var(--surface2)"/>${tx(255,196,'가전자대','small2','middle')}
    ${ar(330,138,330,84,'i',1.2)}${tx(334,114,'E_g','small2')}${tx(255,114,'1.12 eV','small2','middle')}
    ${ph<0.62?`<path d="${wave}" style="fill:none;stroke:${col(lam)};stroke-width:2.4"/>`:''}${tx(70,100,`광자 E = ${E.toFixed(2)} eV`,'b2','middle')}
    <circle cx="250" cy="${ey}" r="7" style="fill:var(--accent)"/>${tx(262,ey+4,'e⁻','small2')}${ok?'':tx(255,128,'문턱 못 넘음 ✕','bad b2','middle')}`;
   q('[data-o]').innerHTML=`E = 1240/λ = 1240/${lam} = ${E.toFixed(3)} eV ${ok?'&gt;':'&lt;'} 1.12 eV → <b>${ok?'전류 발생':'감지 안 됨'}</b>`});
  q('[data-l]').oninput=e=>{lam=+e.target.value;q('[data-lv]').textContent=lam+' nm'};return L.stop};

Object.assign(FIG,{
 spectrum(){const X=l=>20+(Math.log10(l)-2)/(Math.log10(20000)-2)*300;const band=(a,b,c,lb)=>`<rect x="${X(a)}" y="40" width="${X(b)-X(a)}" height="26" style="fill:${c}"/>${tx((X(a)+X(b))/2,82,lb,'small2','middle')}`;
  return svgFig(340,150,`${band(100,380,'#9b7fd1','UV')}${band(380,780,'url(#vis)','가시광')}${band(780,20000,'#d9a08a','적외선 IR')}
   <defs><linearGradient id="vis"><stop offset="0" stop-color="#6a4bd6"/><stop offset=".3" stop-color="#2e7fd6"/><stop offset=".55" stop-color="#2fa34a"/><stop offset=".75" stop-color="#e0b81e"/><stop offset="1" stop-color="#d33a2c"/></linearGradient></defs>
   ${[100,380,780,4260,10000].map(l=>`<line x1="${X(l)}" y1="66" x2="${X(l)}" y2="70" style="stroke:var(--ink)"/><text x="${X(l)}" y="104" text-anchor="middle" class="small2">${l>=1000?l/1000+' μm':l+' nm'}</text>`).join('')}
   <line x1="${X(1100)}" y1="40" x2="${X(1100)}" y2="70" style="stroke:var(--ink);stroke-dasharray:2 2"/>${tx(X(1100),122,'Si 한계 1.1 μm','small2','middle')}${tx(X(4260),122,'CO₂ 흡수','small2','middle')}${tx(X(10000),140,'체온 복사','small2','middle')}${tx(20,26,'← 에너지 큼 (파장 짧음)','small2')}${tx(320,26,'파장 김 →','small2','end')}`,'빛의 스펙트럼 (로그 눈금)','파장이 짧을수록 광자 에너지가 커요. 센서마다 볼 수 있는 파장 범위가 달라요.')},
 tiaFig(){return svgFig(340,150,`<path d="M150 50 L202 76 L150 102 Z" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/>${tx(158,68,'−','b2')}${tx(158,94,'+','b2')}
   <path d="M60 68 H150 M110 68 V30 H160 M196 30 H230 V76 M202 76 H260 M150 92 H130 V120 M60 68 V120" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>${rbox(160,22,36,16,'R_f')}
   <path d="M48 84 L72 84 L60 100 Z" style="fill:var(--warn-soft);stroke:var(--warn)"/><line x1="48" y1="100" x2="72" y2="100" style="stroke:var(--warn);stroke-width:2"/>${ar(20,60,44,80,'a',1.6)}${ar(26,50,50,70,'a',1.6)}${tx(14,44,'빛','a small2')}${tx(60,136,'포토다이오드','small2','middle')}${tx(130,134,'GND','small2','middle')}
   ${tx(262,70,'V_out','u b2')}${tx(250,120,'V_out = −I_ph·R_f','u b2','middle')}`,'트랜스임피던스 증폭기 (TIA)','포토다이오드 전류가 R_f로 흘러 전압이 돼요. R_f가 클수록 이득↑, 대신 응답이 느려져요.')}
});

Object.assign(GEN,{
 photonE(base){const lam=base?550:pick([254,405,650,850,940,1310,1550]);const E=1240/lam;const J=E*1.602e-19;
  return {kind:base?'기본':'유사',title:'파장 → 광자 에너지',q:`파장 ${lam} {{nm}} 빛의 광자 에너지는 몇 {{eV}}이고 몇 J인가? 주파수는?`,first:['E[eV] ≈ 1240/λ[nm]','f = c/λ'],
   steps:[{h:'eV',b:`<div class="ln">1240 ÷ ${lam} = ${fx(E,4)} eV</div><div class="rd">1240 = hc/q를 nm·eV로 맞춘 값</div>`},{h:'J',b:`<div class="ln">${fx(E,4)} × 1.602×10⁻¹⁹ = ${sciT(sci(J))} J</div>`},{h:'주파수',b:`<div class="ln">f = 3×10⁸ ÷ ${lam}×10⁻⁹ = ${sciT(sci(3e8/(lam*1e-9)))} Hz</div><div class="rd">nm → m: × 10⁻⁹</div>`}],
   ans:`${fx(E,4)} eV (${sciT(sci(J))} J)`,ansRead:`${fxR(E,4)} 일렉트론볼트`,calc:calcBlock([[['1','2','4','0','÷',...ks(lam),'='],casioDec(E)],[[...K(3,8),'÷',...K(lam,-9),'='],casioDec(3e8/(lam*1e-9))]],[W_NEG]),
   easy:'파장이 짧을수록(파란색·자외선) 빛 알갱이 하나의 힘이 세요.'}},
 cutoff(base){const M=base?['Si',1.12]:pick([['Si',1.12],['Ge',0.66],['GaAs',1.42],['InGaAs',0.75]]);const lc=1240/M[1];const test=pick([650,940,1310,1550]);
  return {kind:base?'기본':'유사',title:'밴드갭 → 감지 가능한 파장',q:`${M[0]} (E_g = ${M[1]} eV) 광검출기가 감지할 수 있는 최대 파장은? ${test} nm 빛은 감지되는가?`,first:['λ_c = 1240/E_g','λ < λ_c면 감지'],
   steps:[{h:'차단 파장',b:`<div class="ln">1240 ÷ ${M[1]} = ${fx(lc,4)} nm</div>`},{h:'판정',b:`<div class="ln">${test} nm ${test<lc?'<':'>'} ${fx(lc,4)} nm → ${test<lc?'감지 O':'감지 X (에너지 부족)'}</div><div class="rd">광통신 1550 nm는 Si로 못 봐서 InGaAs 사용 [AI 보충]</div>`}],
   ans:`λ_c ≈ ${fx(lc,4)} nm · ${test} nm ${test<lc?'감지 O':'감지 X'}`,ansRead:`${fxR(lc,4)} 나노미터`,calc:calcBlock([[['1','2','4','0','÷',...ks(M[1]),'='],casioDec(lc)]],[]),easy:'문턱(밴드갭)이 낮을수록 더 긴 파장(적외선)까지 볼 수 있어요.'}},
 photoI(base){const R=base?0.5:pick([0.4,0.5,0.6]),P=base?10:pick([1,5,10,50,100]),Rf=base?100e3:pick([10e3,100e3,1e6]);const I=R*P*1e-6,V=I*Rf;
  return {kind:base?'기본':'응용',title:'포토다이오드 → TIA 출력',fig:FIG.tiaFig(),q:`감응도 ${R} {{AW}}인 포토다이오드에 ${P} {{uW}} 빛이 들어온다. 광전류와, R_f = ${KO(Rf)} TIA의 출력 전압 크기는?`,first:['I = ℛ·P','V = I·R_f'],
   steps:[{h:'광전류',b:`<div class="ln">${R} A/W × ${P}×10⁻⁶ W = ${sciT(sci(I))} A = ${fx(I*1e6,4)} μA</div>`},{h:'전압',b:`<div class="ln">${sciT(sci(I))} × ${Rf} = ${fx(V,4)} V</div><div class="rd">부호는 −(반전) · 너무 크면 op-amp 포화</div>`}],
   ans:`I = ${fx(I*1e6,4)} μA · |V| = ${fx(V,4)} V`,ansRead:`${fxR(V,4)} 볼트`,calc:calcBlock([[[...ks(R),'×',...K(P,-6),'×',...ks(Rf),'='],casioDec(V)]],[W_NEG]),easy:'빛이 2배면 전류도 2배. 큰 저항으로 전류를 전압으로 바꿔요.'}},
 encRes(base){const ppr=base?1000:pick([100,360,500,1024,2048]);const x4=!base&&Math.random()<.5;const n=pick([250,1500,4096]);const res=360/(ppr*(x4?4:1));const ang=n*res;
  return {kind:base?'기본':'유사',title:'엔코더 분해능과 각도',q:`${ppr} {{ppr}} 광학 엔코더${x4?'를 4체배로 읽을 때':''}의 분해능은 몇 도인가? 펄스 ${n}개를 셌다면 회전각은?`,first:['분해능 = 360°/(PPR × 체배)','각도 = 펄스 수 × 분해능'],
   steps:[{h:'분해능',b:`<div class="ln">360 ÷ (${ppr}${x4?' × 4':''}) = ${fx(res,4)}°</div><div class="rd">${x4?'A·B 상의 상승·하강 모서리 4개를 모두 셈':'A상만 셀 때'}</div>`},{h:'회전각',b:`<div class="ln">${n} × ${fx(res,4)} = ${fx(ang,5)}°${ang>=360?` = ${fx(ang/360,4)}바퀴`:''}</div>`}],
   ans:`${fx(res,4)}° · ${fx(ang,5)}°`,ansRead:`${fxR(res,4)}도`,calc:calcBlock([[['3','6','0','÷',...ks(ppr*(x4?4:1)),'×',...ks(n),'='],casioDec(ang)]],[]),easy:'원판에 구멍이 1000개면 구멍 하나 = 0.36°예요.'}},
 lidarD(base){const t=base?100:pick([20,66.7,200,500,1000]);const d=3e8*t*1e-9/2;
  return {kind:base?'기본':'유사',title:'라이다 거리',q:`라이다 펄스가 ${t} {{ns}} 만에 돌아왔다. 거리는?`,first:['d = c·t/2','ns → × 10⁻⁹'],
   steps:[{h:'왕복 거리',b:`<div class="ln">3×10⁸ × ${t}×10⁻⁹ = ${fx(2*d,4)} m</div>`},{h:'÷ 2',b:`<div class="ln">${fx(d,4)} m</div><div class="rd">1 ns ≈ 15 cm(편도) → 시간 측정이 매우 정밀해야</div>`}],
   ans:`${fx(d,4)} m`,ansRead:`${fxR(d,4)} 미터`,calc:calcBlock([[[...K(3,8),'×',...K(t,-9),'÷','2','='],casioDec(d)]],[W_NEG]),easy:'초음파와 같은 원리인데, 빛이 백만 배 빨라서 나노초를 재요.'}},
 beerL(){const a=pick([0.1,0.2,0.5]),c=pick([1,2,4]),L=pick([2,5,10]);const T=Math.exp(-a*c*L);
  return {kind:'응용',title:'비어-람베르트 투과율',q:`흡수 계수 α = ${a} (단위 농도·cm당), 농도 c = ${c}, 경로 L = ${L} cm일 때 투과율 I/I₀는?`,first:['I/I₀ = e^(−αcL)','eˣ = SHIFT ln'],
   steps:[{h:'지수',b:`<div class="ln">αcL = ${a} × ${c} × ${L} = ${fx(a*c*L,4)}</div>`},{h:'투과율',b:`<div class="ln">e^(−${fx(a*c*L,4)}) = ${fx(T,4)} (${fx(T*100,3)} %)</div><div class="rd">농도 2배 → 지수 2배 → 투과율은 제곱으로 줄어듦 (비선형)</div>`}],
   ans:`${fx(T,4)} (${fx(T*100,3)} %)`,ansRead:`${fxR(T*100,3)} 퍼센트`,calc:calcBlock([[['SHIFT','ln','(−)',...ks(a),'×',...ks(c),'×',...ks(L),')','='],casioDec(T)]],['SHIFT ln = eˣ']),easy:'가스가 진할수록, 빛이 지나는 길이 길수록 빛이 더 많이 먹혀요.'}}
});
PSET.optic=[['photonE',true],['photonE'],['cutoff',true],['cutoff'],['photoI',true],['photoI'],['encRes',true],['encRes'],['lidarD',true],['beerL']];
TOPICS.optic={name:'광학',g:['photonE','cutoff','photoI','encRes','lidarD','beerL']};['photonE','cutoff','photoI','encRes','lidarD'].forEach(g=>BASICG.add(g));

PAGES.optic={title:'광학 센서',part:'제2편 6장',secs:[
 {k:'빛 기초',h:'빛 — 파장과 에너지',b:`<p class="small muted">[AI 보충] 강의 밖 정리.</p>${FIG.spectrum()}
   <div class="eqn">c = λf,  E = hc/λ ≈ 1240/λ[nm] eV<small>[[wavelength|파장]] {{nm}} · [[photon|광자]] 에너지 {{eV}}</small></div>`,
  easy:'빛은 파장이 짧을수록 알갱이 하나의 에너지가 커요. 자외선이 피부를 태우는 이유예요.'},
 {k:'광전 효과',h:'빛이 전자를 깨운다 — 밴드갭',b:`<div data-anim="photoeff"></div><div class="eqn">λ_c = 1240/E_g [nm]<small>[[bandgap|밴드갭]] · Si 1.12 eV → 약 1100 nm</small></div>`,
  easy:'문턱보다 센 빛 알갱이만 전자를 튀어 오르게 해서 전류를 만들어요.'},
 {k:'종류',h:'광센서 종류',b:`<div class="tblwrap fit"><table><tr><th>종류</th><th>원리 → 출력</th><th>특징</th></tr>
   <tr><td>[[ldr|포토레지스터]]</td><td class="small">빛 → 저항↓</td><td class="small">싸다, 느리다</td></tr><tr><td>[[photodiode|포토다이오드]]</td><td class="small">빛 → 전류</td><td class="small">빠르고 선형</td></tr>
   <tr><td>포토트랜지스터</td><td class="small">빛 → 증폭된 전류</td><td class="small">감도↑ 속도↓</td></tr><tr><td>CCD·CMOS</td><td class="small">픽셀 배열 → 영상</td><td class="small">카메라·비전 검사</td></tr><tr><td>[[thermalir|열형 IR]]</td><td class="small">열 → 전압·저항</td><td class="small">비접촉 온도·PIR</td></tr></table></div>${symGrid(['ldr','led','pd'])}`,
  easy:'빛을 저항·전류·영상·열 중 무엇으로 바꾸느냐로 나눠요.'},
 {k:'포토다이오드',h:'포토다이오드와 TIA',b:`${FIG.tiaFig()}<div class="eqn">I_ph = ℛ·P,  |V_out| = I_ph·R_f<small>[[responsivity|감응도]] {{AW}} · [[tia|TIA]]</small></div>
   <ul class="clean"><li>광도전 모드(역바이어스): 빠름·선형, 암전류↑</li><li>광기전 모드(0 V): 잡음↓, 느림</li></ul>`,
  easy:'빛 세기에 비례하는 아주 작은 전류를 큰 저항으로 전압으로 바꿔요.'},
 {k:'광전센서',h:'포토인터럽터·엔코더',b:`<ul class="clean"><li>[[photoint|광전센서]]: 투과형 · 회귀반사형 · 확산반사형</li><li>[[encoder|광학 엔코더]]: 슬릿 원판, 분해능 360°/PPR, A·B 상으로 방향</li></ul>
   <p class="small"><b>[현업]</b> 컨베이어 물품 카운트, 모터 위치 피드백(서보), 로봇 관절 각도.</p><button class="ghost" data-goto="prox">↗ 근접·광전센서 (제3편 10장)</button>`,
  easy:'빛이 가려지는 횟수를 세면 물건 개수나 바퀴 회전을 알 수 있어요.'},
 {k:'응용',h:'빛으로 재는 것들',b:`<div class="f4"><div><div class="h">[[lidar|라이다]]</div><div class="ln">d = c·t/2</div><div class="rd">1 ns ≈ 15 cm</div></div><div><div class="h">NDIR 가스센서</div><div class="ln">I = I₀·e^(−αcL)</div><div class="rd">[[beerlambert|비어-람베르트]] · CO₂ 4.26 μm</div></div>
    <div><div class="h">광섬유 센서</div>빛의 세기·파장·위상 변화로 온도·변형 측정, 전자기 잡음에 강함</div><div><div class="h">비접촉 온도계</div>물체 적외선 복사 → 써모파일 (슈테판-볼츠만)</div></div>
   <button class="ghost" data-goto="gyro">↗ 광섬유 자이로 FOG</button>`,
  easy:'빛은 빠르고 전기 잡음을 안 타서, 거리·가스·온도를 멀리서 재기 좋아요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>E ≈ 1240/λ[nm] eV · λ_c = 1240/E_g (Si ≈ 1100 nm)</li><li>I_ph = ℛ·P → TIA V = I·R_f</li><li>라이다 d = c·t/2 · NDIR I = I₀e^(−αcL) · 엔코더 360°/PPR</li></ol>
   <details class="qa"><summary>실리콘 포토다이오드로 1550 nm가 안 보이는 이유는?</summary><div>광자 에너지(0.8 eV)가 Si 밴드갭(1.12 eV)보다 작아 전자를 들뜨게 못 함.</div></details>
   <details class="qa"><summary>PIR 센서가 가만히 있는 사람을 못 잡는 이유는?</summary><div>초전 효과는 온도 "변화"에만 반응하기 때문.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'o1',tag:'광학',f:'광자 에너지 빠른 식',a:'E[eV] ≈ 1240/λ[nm]',r:'',e:''},
 {id:'o2',tag:'광학',f:'Si 밴드갭과 차단 파장',a:'1.12 eV · 약 1100 nm',r:'λ_c = 1240/E_g',e:''},
 {id:'o3',tag:'광학',f:'포토다이오드 출력',a:'I_ph = ℛ·P (A/W) → TIA V = I·R_f',r:'',e:''},
 {id:'o4',tag:'광학',f:'엔코더 분해능',a:'360°/PPR (4체배면 ÷ 4 더)',r:'',e:''},
 {id:'o5',tag:'광학',f:'NDIR 가스센서 원리',a:'비어-람베르트 I = I₀e^(−αcL)',r:'CO₂ 4.26 μm 흡수',e:''},
 {id:'o6',tag:'광학',f:'PIR 센서 원리',a:'초전 효과 — 온도 변화만 감지',r:'',e:''}
);
