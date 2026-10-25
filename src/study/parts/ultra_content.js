/* ───────── 초음파·압전: 용어 · 단위 · 공식 ───────── */
Object.assign(TERM,{
 ultrasound:{ko:'초음파',en:'Ultrasound',gen:'사람이 들을 수 없는 높은 소리.',tech:'주파수 20 kHz 이상의 음파. 매질의 탄성으로 전달되는 압력 진동이며 진공에서는 전달되지 않는다.',easy:'박쥐가 내는 소리처럼 너무 높아서 귀로는 못 듣는 소리예요.'},
 longi:{ko:'종파',en:'Longitudinal wave',gen:'진행 방향으로 밀고 당기며 가는 파동.',tech:'입자의 진동 방향이 파동 진행 방향과 같은 파. 기체·액체·고체 모두에서 전파된다. 압축(밀)과 팽창(소)이 반복된다.',easy:'용수철 장난감을 앞뒤로 밀었다 당기면 촘촘한 부분이 앞으로 가는 모습이에요.'},
 trans:{ko:'횡파',en:'Transverse wave',gen:'진행 방향에 직각으로 흔들리며 가는 파동.',tech:'입자의 진동 방향이 진행 방향에 수직인 파. 고체에서만 전파되며 종파보다 느리다(전단파).',easy:'줄넘기 줄 한쪽을 위아래로 흔들면 물결이 앞으로 가는 모습이에요.'},
 bulk:{ko:'체적탄성률',en:'Bulk modulus (B)',gen:'눌렀을 때 부피가 잘 안 줄어드는 정도.',tech:'B = Δp ÷ (ΔV/V). 압력 변화를 부피 변화율로 나눈 값. 단위 Pa. 음속 v = √(B/ρ₀).',easy:'잘 안 눌리는 물질일수록 B가 크고, 소리가 빨리 전달돼요.'},
 poisson:{ko:'포아송 비',en:'Poisson\'s ratio (ν, 뉴)',gen:'당기면 옆으로 얼마나 가늘어지는가.',tech:'잡아당기는 방향이 아닌 횡방향 변형률의 비. 고체 음속 식에 들어간다.',easy:'고무줄을 길게 당기면 가늘어지죠. 그 가늘어지는 정도예요.'},
 decibel:{ko:'데시벨',en:'Decibel (dB)',gen:'소리 크기를 나타내는 단위.',tech:'기준값에 대한 비를 로그로 나타낸 값. 세기: 10 log(I/I₀), 압력·진폭: 20 log(P/P₀).',easy:'10 dB 오를 때마다 세기는 10배. 큰 숫자 범위를 작은 숫자로 줄여 쓰는 방법이에요.'},
 piezo:{ko:'압전 효과',en:'Piezoelectricity',gen:'누르면 전기가 나오고, 전기를 걸면 모양이 변하는 성질.',tech:'비대칭 결정(PZT, BaTiO₃, 수정, PVDF 등)에 응력을 가하면 분극이 생겨 표면 전하가 나타나고(정압전), 전계를 가하면 기계적 변형이 생기는 현상(역압전).',easy:'라이터의 딸깍 불꽃이 압전이에요. 누르면 전기 불꽃이 튀어요.'},
 poling:{ko:'분극 처리 (폴링)',en:'Poling',gen:'압전 성질을 만들어 주는 처리.',tech:'높은 온도에서 강한 전계를 걸어 쌍극자 방향을 정렬하고, 냉각해 그 방향을 고정하는 공정. 처리 전 PZT는 압전성이 없다.',easy:'제멋대로 서 있는 작은 자석들을 한 방향으로 줄 세워 굳히는 과정이에요.'},
 dij:{ko:'압전 계수',en:'Piezoelectric coefficient (d₃₃, d₃₁)',gen:'힘이나 전압에 얼마나 민감하게 반응하는가.',tech:'Pᵢ = dᵢⱼTⱼ (C/N) 또는 Sᵢ = dᵢⱼEⱼ (m/V). 첫 숫자 = 반응 방향, 둘째 = 가한 방향. 3은 두께(분극) 방향. pC/N과 pm/V는 같은 크기.',easy:'d₃₃ = 100 pm/V면 1 V 걸 때 두께가 100 pm(0.1 nm) 변해요.'},
 transducer:{ko:'트랜스듀서',en:'Transducer',gen:'한 에너지를 다른 에너지로 바꾸는 장치.',tech:'초음파에서는 전기 ↔ 기계(음향) 에너지를 변환하는 소자. 압전형, 정전형, 전자기형, 레이저형이 있다.',easy:'스피커(전기→소리)와 마이크(소리→전기)를 합친 것 같은 부품이에요.'},
 unimorph:{ko:'유니모르프',en:'Unimorph',gen:'압전판 + 금속판을 붙인 구조.',tech:'늘고 줄지 않는 금속 다이어프램 한쪽 면에 압전 세라믹 원판을 붙여 굽힘 진동을 만드는 구조. 출력 전압이 크고 강도·온습도 특성이 좋다.',easy:'한쪽만 늘어나는 두 겹 판이라 휘어요. 바이메탈과 비슷해요.'},
 acz:{ko:'음향 임피던스',en:'Acoustic impedance (Z)',gen:'물질이 초음파를 얼마나 "막는가".',tech:'Z = ρ × v (밀도 × 음속). 단위 Rayl = Pa·s/m = kg/(m²·s). 두 매질의 Z가 같을수록 많이 투과하고, 차이가 클수록 많이 반사한다.',easy:'문턱 높이 차이 같은 거예요. 차이가 크면 소리가 걸려 튕겨 나와요.'},
 matching:{ko:'정합층',en:'Matching layer',gen:'센서와 대상 사이에 끼우는 중간층.',tech:'압전체와 대상의 중간 Z를 갖는 층. 두께는 그 재료 속 파장의 λ/4. 반사를 줄여 에너지 전달을 높인다.',easy:'높은 단과 낮은 단 사이에 놓는 중간 계단이에요.'},
 backing:{ko:'백킹재',en:'Backing material',gen:'뒤쪽 흡음재.',tech:'압전체 뒷면에 붙여 뒤로 가는 초음파를 흡수하고 잔류 진동을 줄이는 감쇠재(에폭시 등). 펄스를 짧게 만든다.',easy:'종을 친 뒤 손으로 잡아 울림을 멈추게 하는 역할이에요.'},
 tof:{ko:'비행시간',en:'Time of Flight (ToF)',gen:'보내고 돌아오는 데 걸린 시간.',tech:'송신 후 반사파 수신까지의 시간 t. 왕복이므로 2 × 거리 = c × t.',easy:'산에서 "야호" 하고 메아리가 돌아오는 시간이에요.'},
 blind:{ko:'블라인드 존',en:'Blind zone',gen:'너무 가까워서 못 재는 구간.',tech:'송신 버스트 지속 시간, 송신 후 잔류 진동, 수신 회로 회복 시간 때문에 가까운 물체의 반사파를 구분하지 못하는 거리 범위(보통 수~수십 cm).',easy:'내가 소리치는 동안에는 메아리를 못 들어요.'},
 nearfar:{ko:'근거리장·원거리장',en:'Near field · Far field',gen:'센서 가까운 곳과 먼 곳의 빔 모양.',tech:'근거리장: 평면파, 빔 폭 거의 일정. 원거리장: 구면파, 빔이 발산(퍼짐). 주파수·크기가 클수록 덜 퍼진다.',easy:'손전등 빛이 가까이선 동그라미 크기 그대로, 멀리선 넓게 퍼지는 것과 비슷해요.'},
 sidelobe:{ko:'사이드 로브',en:'Side lobe',gen:'옆으로 새는 원치 않는 빔.',tech:'주 빔 밖으로 방출되는 불필요한 초음파. 두께 진동 중 반경 방향 진동 때문. 완만한 형상, 큰 크기, 높은 주파수, 렌즈로 줄인다.',easy:'스피커 옆에 서도 소리가 조금 들리는 것처럼 옆으로 새는 부분이에요.'},
 qf:{ko:'Q 값',en:'Q (quality) factor',gen:'얼마나 한 주파수로만 울리는가.',tech:'Q = f₀ / BW. 높은 Q: 좁은 대역, 긴 펄스(감쇠 약함). 낮은 Q: 넓은 대역, 짧은 펄스(감쇠 강함, 거리 분해능 좋음).',easy:'맑게 오래 울리는 종(높은 Q)과 "탁" 하고 짧게 끝나는 북(낮은 Q).'},
 tgc:{ko:'시간 이득 보상',en:'TGC (Time Gain Compensation)',gen:'깊은 곳 신호를 더 키워 주기.',tech:'깊이에 따라 감쇠된 에코를 보상하려고 송신 후 시간에 따라 수신 증폭기 이득을 높이는 기법. 영상 밝기를 고르게 한다.',easy:'멀리서 작게 들리는 목소리만 볼륨을 더 올려 주는 거예요.'},
 amode:{ko:'A-모드 · B-모드',en:'A-mode · B-mode',gen:'초음파 영상 표시 방법.',tech:'A-mode: 한 빔을 따라 에코 진폭을 시간(깊이) 축에 표시. B-mode: 진폭을 밝기로 바꿔 여러 스캔 라인을 모아 2D 단면 영상 생성.',easy:'A는 그래프, B는 그 그래프를 밝기 사진으로 바꾼 것이에요.'},
 ndt:{ko:'비파괴 검사',en:'NDT (Non-Destructive Testing)',gen:'부수지 않고 속을 검사.',tech:'수직 탐촉자(종파)는 결함·뒷면 반사 시간으로 위치를 찾고, 사각 탐촉자(전단파)는 비스듬히 보내 용접부 결함을 찾는다.',easy:'수박을 두드려 속을 알아보듯, 초음파로 금속 속 금을 찾아요.'},
 phased:{ko:'위상 배열',en:'Phased array',gen:'여러 소자를 시간차로 울려 빔 방향 조절.',tech:'배열된 소자의 송신 시간 지연·위상을 조절해 빔을 집속(focusing)하거나 방향을 바꾸는(steering) 방식.',easy:'운동장 응원석이 차례로 일어서는 파도타기로 방향을 만드는 것과 같아요.'},
 fp:{ko:'패브리-페로 간섭계',en:'Fabry–Pérot interferometer',gen:'두 거울 사이 간격으로 색(파장)을 고르는 필터.',tech:'두 반사경 사이 공기층 d에서 mλ = 2d·cosθ를 만족하는 파장만 투과. PZT 액추에이터로 d를 바꿔 투과 파장을 이동시킨다.',easy:'거울 간격을 PZT로 nm 단위로 바꾸면 통과하는 빛의 색이 바뀌어요.'},
 sonar:{ko:'소나',en:'SONAR (SOund NAvigation And Ranging)',gen:'물속 초음파 거리 측정.',tech:'수중에서 음파를 보내 반사파의 시간으로 거리·지형·물체를 탐지. 물속 음속 약 1500 m/s.',easy:'배가 물속으로 소리를 보내 물고기 떼나 바닥까지 거리를 재는 거예요.'}
});
Object.assign(UNIT,{
 ms:{s:'ms',r:'밀리세컨드',mean:'1 ms = 10⁻³ s (1000분의 1초)'}, us:{s:'μs',r:'마이크로세컨드',mean:'1 μs = 10⁻⁶ s'},
 dB:{s:'dB',r:'데시벨',mean:'비율의 로그 표현. 세기 10 log, 진폭·압력 20 log'},
 Wm2:{s:'W/m²',r:'와트 퍼 제곱미터',mean:'소리 세기(I)의 단위. 들을 수 있는 최소 I₀ = 10⁻¹² W/m²'},
 Nm2:{s:'N/m²',r:'뉴턴 퍼 제곱미터 (= Pa 파스칼)',mean:'압력 단위. 1 N/m² = 1 Pa = 10⁻⁴ N/cm²'},
 Ncm2:{s:'N/cm²',r:'뉴턴 퍼 제곱센티미터',mean:'1 N/cm² = 10⁴ N/m² (cm² = 10⁻⁴ m²라서)'},
 Pa:{s:'Pa',r:'파스칼',mean:'압력의 SI 단위. 1 Pa = 1 N/m²'},
 rayl:{s:'Rayl',r:'레일',mean:'음향 임피던스 단위. 1 Rayl = 1 Pa·s/m = 1 kg/(m²·s)'},
 Mrayl:{s:'MRayl',r:'메가레일',mean:'1 MRayl = 10⁶ Rayl. 물 1.48, 연조직 1.63, PZT 38'},
 inps:{s:'inch/s',r:'인치 퍼 세컨드',mean:'1 inch/s = 0.0254 m/s. 13,044 inch/s ≈ 331 m/s'},
 pmV:{s:'pm/V',r:'피코미터 퍼 볼트',mean:'압전 계수 d 단위. 1 V당 몇 pm 변형'},
 pCN:{s:'pC/N',r:'피코쿨롬 퍼 뉴턴',mean:'압전 계수 d 단위. 1 N당 몇 pC 전하. pm/V와 같은 크기'},
 pC:{s:'pC',r:'피코쿨롬',mean:'전하 1 pC = 10⁻¹² C'}, nC:{s:'nC',r:'나노쿨롬',mean:'1 nC = 10⁻⁹ C = 1000 pC'},
 pm:{s:'pm',r:'피코미터',mean:'1 pm = 10⁻¹² m (1 nm = 1000 pm)'}, MPa:{s:'MPa',r:'메가파스칼',mean:'1 MPa = 10⁶ Pa'},
 kgm3:{s:'kg/m³',r:'킬로그램 퍼 세제곱미터',mean:'밀도 단위. 물 1000 kg/m³ = 1 g/cm³'},
 degC:{s:'°C',r:'섭씨 도',mean:'온도. 절대온도 K = °C + 273'}
});
FORM.push(
 {eq:'2d = c × t',read:'2 디는 씨 곱하기 티',name:'초음파 거리 (왕복)',page:'ultra',sec:2,syms:[['d','거리','m'],['c','음속','mps'],['t','왕복 시간','s']]},
 {eq:'c(T) = 331.3√(1 + T/273)',read:'씨는 331.3 루트 1 더하기 티 나누기 273',name:'공기 중 음속',page:'ultra',sec:2,syms:[['T','기온','degC'],['c','m/s (슬라이드: 13,044 inch/s)','mps']]},
 {eq:'v = √(B/ρ₀)',read:'브이는 루트 비 나누기 로',name:'매질 속 음속',page:'ultra',sec:1,syms:[['B','체적탄성률','Pa'],['ρ₀','밀도','kgm3']]},
 {eq:'λ = v / f',read:'람다는 브이 나누기 에프',name:'파장',page:'ultra',sec:4,syms:[['λ','파장','m'],['v','음속','mps'],['f','주파수','Hz']]},
 {eq:'압전체 = λ/2 · 정합층 = λ/4',read:'람다 2분의 1, 4분의 1',name:'두께 규칙',page:'ultra',sec:4,syms:[]},
 {eq:'Z = ρ × v',read:'제트는 로 곱하기 브이',name:'음향 임피던스',page:'ultra',sec:5,syms:[['ρ','밀도','kgm3'],['v','음속','mps'],['Z','임피던스','rayl']]},
 {eq:'R = ((Z₂−Z₁)/(Z₂+Z₁))²',read:'반사율은 차 나누기 합의 제곱',name:'반사율 [AI 보충]',page:'ultra',sec:5,syms:[]},
 {eq:'β = 10 log(I / I₀)',read:'베타는 10 로그 아이 나누기 아이 제로',name:'소리 세기 dB',page:'ultra',sec:6,syms:[['I₀','10⁻¹² W/m²','Wm2']]},
 {eq:'Π = 20 log(P / P₀)',read:'20 로그 피 나누기 피 제로',name:'음압 dB',page:'ultra',sec:6,syms:[['P₀','2×10⁻⁵ N/m²','Nm2']]},
 {eq:'Q = f₀ / BW',read:'큐는 에프 제로 나누기 대역폭',name:'Q 값',page:'ultra',sec:4,syms:[]},
 {eq:'Sᵢ = dᵢⱼ Eⱼ · Pᵢ = dᵢⱼ Tⱼ',read:'변형은 디 곱하기 전계, 분극은 디 곱하기 응력',name:'압전 식',page:'piezo',sec:1,syms:[['d','압전 계수','pmV']]}
);

/* ───────── 문제 생성기 ───────── */
const W_LOG='log 키 = 10을 밑으로 하는 로그 · 10ˣ = [SHIFT] 다음 [log]';
const W_DEG='각도 문제 전에 각도 단위를 도(Deg)로: [SHIFT] [MODE] [3] → 화면 위에 D 표시';
Object.assign(GEN,{
 tof(base){const T=base?20:pick([0,10,15,20,25,30,35]),tms=base?5.8:pick([1.2,2,2.9,3.5,5,6.4,8,11.7]);const c=cT(T),t=tms/1000,d=c*t/2;
  return {kind:base?'기본':'유사',title:'반사 시간으로 거리 구하기',fig:FIG.pTof({t:`t = ${tms} ms`,T:`기온 ${T} °C`,d:'d = ?'}),
   q:`주차 센서가 초음파를 보낸 뒤 ${tms} {{ms}} 만에 반사파를 받았다. 기온은 ${T} {{degC}}이다. 물체까지 거리는 몇 {{m}}(몇 {{cm}})인가?`,
   first:['ms → s','c = 331.3√(1+T/273)','왕복이라 ÷ 2'],
   steps:[{h:'단위 먼저 맞추기',b:`<div class="ln">t = ${tms} ms = ${tms} × 10⁻³ s = ${t} s</div><div class="rd">밀리 = 1000분의 1</div>`},
    {h:'기온으로 음속 구하기',b:`<div class="ln">c = 331.3 × √(1 + ${T}/273)</div><div class="ln">= 331.3 × √${(1+T/273).toFixed(4)} = ${c.toFixed(1)} m/s</div><div class="rd">슬라이드 식 13,044 inch/s × 0.0254 = 331.3 m/s (0 °C 음속)</div>`},
    {h:'왕복 생각하기',b:`<div class="ln">2 × d = c × t → d = c × t ÷ 2</div><div class="rd">소리는 갔다가 돌아오니까 시간의 절반만 "가는 길"</div>`},
    {h:'계산',b:`<div class="ln">d = ${c.toFixed(1)} × ${t} ÷ 2 = ${fx(d,3)} m</div><div class="ln">= ${fx(d*100,3)} cm</div>`},
    {h:'검산',b:`<div class="rd">간이식 t × 340 ÷ 2 = ${fx(t*340/2,3)} m → 비슷하면 ✓ (기온 차이만큼 조금 다름)</div>`}],
   ans:`d ≈ ${fx(d,3)} m = ${fx(d*100,3)} cm`,ansRead:`${fxR(d)} 미터`,
   calc:calcBlock([[['3','3','1','.','3','×','√■','1','+',...ks(T),'÷','2','7','3','▶'],`331.3×√(1+${T}÷273)`,'√ 안을 다 넣고 [▶]로 빠져나오기'],[['='],c.toFixed(7).replace(/0+$/,''),'음속 c'],[['×',...ks(tms),'×10ˣ','(−)','3','÷','2','='],casioDec(d),'거리 m']],[W_NEG,'[√■]를 누르면 루트 안으로 들어가요. 다 쓰면 [▶]']),
   easy:'메아리 원리예요. 소리가 갔다 오는 데 걸린 시간에 소리 빠르기를 곱하면 왕복 거리, 그 절반이 진짜 거리예요.'}},
 tofInch(){const T=pick([0,10,20,30]),tms=pick([2,3,4.5,6]);const ci=13044*Math.sqrt(1+T/273),cm=ci*0.0254,t=tms/1000,din=ci*t/2,dm=din*0.0254;
  return {kind:'응용',title:'inch/s 식으로 계산하기',fig:FIG.pTof({t:`t = ${tms} ms`,T:`기온 ${T} °C`,d:'d = ? inch, ? m'}),
   q:`슬라이드 식 c(T) = 13,044 √(1 + T/273) {{inps}}를 쓰자. 기온 ${T} {{degC}}에서 반사파가 ${tms} {{ms}} 뒤에 왔다. (1) 음속을 inch/s와 m/s로, (2) 거리를 inch와 m로 구하라.`,
   first:['1 inch = 0.0254 m','ms → s','d = c·t ÷ 2'],
   steps:[{h:'inch/s 음속',b:`<div class="ln">c = 13,044 × √(1 + ${T}/273) = ${fx(ci,5)} inch/s</div>`},
    {h:'inch/s → m/s',b:`<div class="ln">${fx(ci,5)} × 0.0254 = ${fx(cm,4)} m/s</div><div class="rd">1 inch = 2.54 cm = 0.0254 m · 큰 숫자가 작은 숫자로 (inch가 m보다 작은 단위)</div>`},
    {h:'시간 단위',b:`<div class="ln">${tms} ms = ${t} s</div>`},
    {h:'거리',b:`<div class="ln">d = ${fx(ci,5)} × ${t} ÷ 2 = ${fx(din,3)} inch</div><div class="ln">= ${fx(din,3)} × 0.0254 = ${fx(dm,3)} m</div>`},
    {h:'검산',b:`<div class="ln">m/s로 바로: ${fx(cm,4)} × ${t} ÷ 2 = ${fx(cm*t/2,3)} m ✓</div>`}],
   ans:`c ≈ ${fx(ci,5)} inch/s = ${fx(cm,4)} m/s · d ≈ ${fx(din,3)} inch = ${fx(dm,3)} m`,ansRead:`${fxR(dm)} 미터`,
   calc:calcBlock([[['1','3','0','4','4','×','√■','1','+',...ks(T),'÷','2','7','3','▶','='],casioDec(ci),'inch/s'],[['×','0','.','0','2','5','4','='],casioDec(cm),'m/s'],[['×',...ks(tms),'×10ˣ','(−)','3','÷','2','='],casioDec(dm),'거리 m']],['inch → m는 × 0.0254, m → inch는 ÷ 0.0254']),
   easy:'미국식 단위(inch)로 된 식이라도 마지막에 0.0254만 곱하면 미터가 돼요.'}},
 lambda(base){const f=base?1:pick([1,2,2.5,3.5,5,7.5,10]),v=4000,vm=pick([2500,3000]),lam=v/(f*1e6),lm=vm/(f*1e6);
  return {kind:base?'기본':'유사',title:'파장과 두께 정하기',fig:FIG.pLayer(f),
   q:`PZT 속 음속 ${v} {{mps}}, 공진 주파수 ${f} {{MHz}}인 트랜스듀서를 만든다. (1) PZT 속 파장 λ, (2) PZT 두께(λ/2), (3) 음속 ${vm} m/s인 정합층의 두께(λ/4)는?`,
   first:['MHz → Hz','λ = v / f','PZT λ/2 · 정합층 λ/4'],
   steps:[{h:'단위 먼저',b:`<div class="ln">f = ${f} MHz = ${f} × 10⁶ Hz</div>`},
    {h:'PZT 속 파장',b:`<div class="ln">λ = ${v} ÷ (${f} × 10⁶) = ${sciT(sci(lam))} m</div><div class="ln">= ${fx(lam*1000,3)} mm</div><div class="rd">m → mm: × 1000</div>`},
    {h:'PZT 두께 = λ/2',b:`<div class="ln">${fx(lam*1000,3)} ÷ 2 = ${fx(lam*500,3)} mm${lam*500<1?` = ${fx(lam*5e5,3)} μm`:''}</div>`},
    {h:'정합층 두께 = λ/4 (그 재료의 음속으로)',b:`<div class="ln">λₘ = ${vm} ÷ (${f} × 10⁶) = ${fx(lm*1000,3)} mm</div><div class="ln">÷ 4 = ${fx(lm*250,3)} mm = ${fx(lm*2.5e5,3)} μm</div>`},
    {h:'검산',b:`<div class="rd">주파수가 높을수록 파장이 짧아져 두께도 얇아짐 ✓ (1 MHz → 2 mm, 5 MHz → 0.4 mm)</div>`}],
   ans:`λ = ${fx(lam*1000,3)} mm · PZT ${fx(lam*500,3)} mm · 정합층 ${fx(lm*250,3)} mm`,ansRead:`람다 ${fxR(lam*1000)} 밀리미터`,
   calc:calcBlock([[[...ks(v),'÷',...K(f,6),'='],casioDec(lam),'λ (m)'],[['×','1','0','0','0','='],casioDec(lam*1000),'mm'],[['÷','2','='],casioDec(lam*500),'PZT 두께 mm']],['분수로 나오면 [S⇔D]',W_NEG]),
   easy:'파장은 "물결 한 개의 길이"예요. 압전판 두께를 물결 반 개로 맞추면 앞뒤로 튕긴 물결이 딱 맞아 크게 울려요(공진).'}},
 dB(){const mode=pick(['I','beta','P']);
  if(mode==='I'){const m=pick([1,2,3,5]),e=pick([-9,-8,-6,-5,-4,-2]);const I=m*10**e,b=10*Math.log10(I/1e-12);
   return {kind:'응용',title:'소리 세기 → 데시벨',q:`어떤 소리의 세기가 ${N(m,e)} {{Wm2}}이다. 소리 세기 레벨 β는 몇 {{dB}}인가? (I₀ = 10⁻¹² W/m²)`,first:['β = 10 log(I/I₀)','지수 빼기'],
    steps:[{h:'공식',b:`<div class="ln">β = 10 × log(I ÷ I₀)</div><div class="rd">"베타는 10 로그 아이 나누기 아이 제로"</div>`},
     {h:'비율 먼저',b:`<div class="ln">I ÷ I₀ = ${N(m,e)} ÷ 10⁻¹² = ${N(m,e+12)}</div><div class="rd">나눗셈은 지수 빼기: ${e} − (−12) = ${e+12}</div>`},
     {h:'로그',b:`<div class="ln">log(${N(m,e+12)}) = log ${m} + ${e+12} = ${(Math.log10(m)).toFixed(3)} + ${e+12} = ${(Math.log10(m)+e+12).toFixed(3)}</div><div class="rd">log(10ⁿ) = n · log 1 = 0, log 2 ≈ 0.301, log 3 ≈ 0.477, log 5 ≈ 0.699</div>`},
     {h:'× 10',b:`<div class="ln">β = 10 × ${(Math.log10(m)+e+12).toFixed(3)} = ${b.toFixed(1)} dB</div>`},
     {h:'검산',b:`<div class="rd">표: 10⁻⁴ W/m² ≈ 80 dB(도로 소음), 1 W/m² = 120 dB(통증) — 지수 하나당 10 dB ✓</div>`}],
    ans:`β ≈ ${b.toFixed(1)} dB`,ansRead:`${b.toFixed(1)} 데시벨`,
    calc:calcBlock([[['1','0','×','log',...K(m,e),'÷','1','×10ˣ','(−)','1','2',')'],`10×log(${NS(m,e)}÷1×10⁻¹²)`,'log를 누르면 괄호가 열려요'],[['='],casioDec(b)]],[W_LOG,W_NEG]),
    easy:'세기가 10배 될 때마다 10 dB씩 올라가요. 그래서 10⁻¹²부터 지수를 세면 dB가 나와요.'}}
  if(mode==='beta'){const b=pick([30,45,60,65,85,95,110]);const I=1e-12*10**(b/10);const s=sci(I,3);
   return {kind:'응용',title:'데시벨 → 소리 세기',q:`소리 세기 레벨이 ${b} {{dB}}이다. 소리 세기 I는 몇 {{Wm2}}인가?`,first:['β = 10 log(I/I₀)','I = I₀ × 10^(β/10)'],
    steps:[{h:'식 뒤집기',b:`<div class="ln">β ÷ 10 = log(I/I₀)</div><div class="ln">I ÷ I₀ = 10^(β/10)</div><div class="rd">log를 없애려면 10의 거듭제곱으로</div>`},
     {h:'지수 계산',b:`<div class="ln">${b} ÷ 10 = ${b/10}</div>`},
     {h:'곱하기',b:`<div class="ln">I = 10⁻¹² × 10^${b/10} = ${sciT(s)} W/m²</div><div class="rd">지수 더하기: −12 + ${b/10} = ${(-12+b/10).toFixed(1)}</div>`},
     {h:'검산',b:`<div class="rd">${b} dB는 0 dB(10⁻¹²)보다 ${b/10}자리 위 ✓</div>`}],
    ans:`I ≈ ${sciT(s)} W/m²`,ansRead:`${sciR(s)} 와트 퍼 제곱미터`,
    calc:calcBlock([[['1','×10ˣ','(−)','1','2','×','SHIFT','log',...ks(b),'÷','1','0',')','='],casioDec(I),'10ˣ = SHIFT + log']],[W_LOG,W_NEG]),
    easy:'85 dB면 8.5칸 위. 한 칸 = 10배라서 10⁻¹²에서 10^8.5배 커진 세기예요.'}}
  const useCm=Math.random()<.5;const Pm=pick([0.02,0.2,0.63,2,6.3,20]);const Pi=20*Math.log10(Pm/2e-5);const Pc=Pm*1e-4;
  return {kind:'응용',title:'음압 → 데시벨',q:`음압이 ${useCm?sciT(sci(Pc))+' {{Ncm2}}':Pm+' {{Nm2}}'}이다. 음압 레벨 Π는 몇 {{dB}}인가? (P₀ = 2 × 10⁻⁵ N/m²)`,first:useCm?['N/cm² → N/m²: × 10⁴','Π = 20 log(P/P₀)']:['Π = 20 log(P/P₀)','압력은 20 log'],
   steps:[...(useCm?[{h:'단위 먼저 맞추기',b:`<div class="ln">1 cm² = 10⁻⁴ m² → 1 N/cm² = 10⁴ N/m²</div><div class="ln">${sciT(sci(Pc))} × 10⁴ = ${Pm} N/m²</div><div class="rd">⚠ 넓이 분모가 작아지면 압력 숫자는 커져요</div>`}]:[]),
    {h:'비율',b:`<div class="ln">P ÷ P₀ = ${Pm} ÷ (2 × 10⁻⁵) = ${fx(Pm/2e-5,3)}</div>`},
    {h:'20 log',b:`<div class="ln">Π = 20 × log(${fx(Pm/2e-5,3)}) = ${Pi.toFixed(1)} dB</div><div class="rd">압력·진폭은 세기의 제곱근이라 10이 아니라 20</div>`},
    {h:'검산',b:`<div class="rd">사람이 듣는 범위 0~130 dB 안 ✓</div>`}],
   ans:`Π ≈ ${Pi.toFixed(1)} dB`,ansRead:`${Pi.toFixed(1)} 데시벨`,
   calc:calcBlock([[['2','0','×','log',...ks(Pm),'÷','2','×10ˣ','(−)','5',')','='],casioDec(Pi)]],[W_LOG,'세기는 10 log, 압력·진폭은 20 log']),
   easy:'압력은 세기와 달리 20을 곱해요. 압력이 10배면 20 dB 올라가요.'}},
 amp(){const toDb=Math.random()<.5;
  if(toDb){const r=pick([0.5,0.25,0.1,0.05,0.01]);const db=20*Math.log10(r);
   return {kind:'응용',title:'진폭 비 → dB (감쇠)',q:`초음파가 조직을 지나며 진폭이 처음의 ${r}배(A/A₀ = ${r})가 되었다. 몇 {{dB}} 감쇠인가?`,first:['dB = 20 log(A/A₀)','1보다 작으면 음수'],
    steps:[{h:'공식',b:`<div class="ln">진폭 비(dB) = 20 × log(A ÷ A₀)</div>`},{h:'계산',b:`<div class="ln">20 × log(${r}) = 20 × (${Math.log10(r).toFixed(3)}) = ${db.toFixed(1)} dB</div>`},{h:'의미',b:`<div class="rd">음수 = 줄어듦 → ${Math.abs(db).toFixed(1)} dB 감쇠. 진폭이 반이면 약 −6 dB, 10분의 1이면 −20 dB</div>`}],
    ans:`${db.toFixed(1)} dB (${Math.abs(db).toFixed(1)} dB 감쇠)`,ansRead:`마이너스 ${Math.abs(db).toFixed(1)} 데시벨`,
    calc:calcBlock([[['2','0','×','log',...ks(r),')','='],casioDec(db)]],[W_LOG]),easy:'진폭이 반으로 줄 때마다 약 6 dB씩 깎여요.'}}
  const db=pick([-6,-12,-20,-30,-40]);const r=10**(db/20);
  return {kind:'응용',title:'dB → 진폭 비',q:`초음파가 ${Math.abs(db)} {{dB}} 감쇠했다(${db} dB). 진폭은 처음의 몇 배인가?`,first:['A/A₀ = 10^(dB/20)'],
   steps:[{h:'식 뒤집기',b:`<div class="ln">${db} = 20 log(A/A₀) → log(A/A₀) = ${db/20}</div>`},{h:'10의 거듭제곱',b:`<div class="ln">A/A₀ = 10^(${db/20}) = ${fx(r,3)}</div>`},{h:'검산',b:`<div class="rd">−20 dB = 10분의 1, −40 dB = 100분의 1 ✓</div>`}],
   ans:`A/A₀ ≈ ${fx(r,3)}`,ansRead:`처음의 ${fxR(r)}배`,
   calc:calcBlock([[['SHIFT','log','(−)',...ks(Math.abs(db)),'÷','2','0',')','='],casioDec(r),'10ˣ = SHIFT + log']],[W_LOG,W_NEG]),easy:'−20 dB면 10분의 1, −40 dB면 100분의 1이에요.'}},
 refl(){const pairs=[['soft','air'],['fat','soft'],['bone','soft'],['soft','water'],['water','air'],['bone','fat'],['lung','soft']];const [a,b]=pick(pairs);
  const A=MAT[a],B=MAT[b],Z1=A[1]*A[2],Z2=B[1]*B[2],R=((Z2-Z1)/(Z2+Z1))**2;
  return {kind:'응용',title:'경계에서 얼마나 반사될까',fig:FIG.pRefl(A[0],B[0]),
   q:`${A[0]}(밀도 ${A[1]} {{kgm3}}, 음속 ${A[2]} {{mps}})에서 ${B[0]}(밀도 ${B[1]} kg/m³, 음속 ${B[2]} m/s)으로 초음파가 수직으로 들어간다. 두 [[acz|음향 임피던스]]와 반사율 R을 구하라.`,
   first:['Z = ρ × v','R = ((Z₂−Z₁)/(Z₂+Z₁))²','Rayl → MRayl: ÷ 10⁶'],
   steps:[{h:'Z₁',b:`<div class="ln">Z₁ = ${A[1]} × ${A[2]} = ${fx(Z1,4)} Rayl = ${fx(Z1/1e6,3)} MRayl</div><div class="rd">kg/m³ × m/s = kg/(m²·s) = Rayl</div>`},
    {h:'Z₂',b:`<div class="ln">Z₂ = ${B[1]} × ${B[2]} = ${fx(Z2,4)} Rayl = ${fx(Z2/1e6,3)} MRayl</div>`},
    {h:'반사율 [AI 보충 식]',b:`<div class="ln">R = ((${fx(Z2/1e6,3)} − ${fx(Z1/1e6,3)}) ÷ (${fx(Z2/1e6,3)} + ${fx(Z1/1e6,3)}))²</div><div class="ln">= ${(R*100).toFixed(R<0.01?2:1)} %</div><div class="rd">MRayl끼리 나누면 단위가 지워져 그대로 써도 돼요</div>`},
    {h:'투과',b:`<div class="ln">T = 1 − R = ${((1-R)*100).toFixed(1)} %</div>`},
    {h:'검산',b:`<div class="rd">Z 차이가 ${Math.abs(Z2-Z1)/Math.max(Z1,Z2)>0.5?'크니까 반사가 커야 함 ✓':'작으니까 반사가 작아야 함 ✓'}</div>`}],
   ans:`Z₁ ≈ ${fx(Z1/1e6,3)} MRayl, Z₂ ≈ ${fx(Z2/1e6,3)} MRayl, R ≈ ${(R*100).toFixed(R<0.01?2:1)} %`,ansRead:`반사율 ${(R*100).toFixed(1)} 퍼센트`,
   calc:calcBlock([[['(','(',...ks(Z2/1e6===Math.round(Z2/1e6)?Z2/1e6:+(Z2/1e6).toFixed(4)),'−',...ks(+(Z1/1e6).toFixed(4)),')','÷','(',...ks(+(Z2/1e6).toFixed(4)),'+',...ks(+(Z1/1e6).toFixed(4)),')',')','x²','='],casioDec(R),'× 100 하면 %']],['분자·분모를 각각 괄호로, 전체를 또 괄호로 묶고 [x²]']),
   easy:'두 물질의 "단단함×무게감"(Z)이 비슷하면 술술 통과, 많이 다르면 벽에 부딪힌 공처럼 튕겨요.'}},
 q(){const f0=pick([2,3.5,5,7.5,10]),bw=pick([0.5,1,2,3,5]).valueOf();const Q=f0/bw;
  return {kind:'응용',title:'Q 값과 대역폭',fig:FIG.qfactor(),q:`중심 주파수 ${f0} {{MHz}}, 대역폭 ${bw} MHz인 트랜스듀서의 [[qf|Q 값]]은? 펄스는 긴 편인가 짧은 편인가?`,first:['Q = f₀ / BW','같은 단위면 단위 변환 불필요'],
   steps:[{h:'공식',b:`<div class="ln">Q = f₀ ÷ BW</div><div class="rd">둘 다 MHz라 그대로 나누면 단위가 지워져요</div>`},{h:'계산',b:`<div class="ln">Q = ${f0} ÷ ${bw} = ${fx(Q,3)}</div>`},{h:'해석',b:`<div>${Q>=4?'Q가 커서 좁은 대역 → 펄스가 길고 순수한 주파수 (감쇠 약함)':'Q가 작아 넓은 대역 → 펄스가 짧음 → 거리 분해능 좋음 (백킹재로 강하게 감쇠)'}</div>`}],
   ans:`Q ≈ ${fx(Q,3)} · ${Q>=4?'긴 펄스':'짧은 펄스'}`,ansRead:`큐 ${fxR(Q)}`,calc:calcBlock([[[...ks(f0),'÷',...ks(bw),'='],casioDec(Q)]],[]),easy:'Q가 크면 종처럼 길게 울리고, 작으면 북처럼 짧게 끝나요.'}},
 ndt(){const T=pick([10,12,15,20,25]),th=pick([45,60,70]);const r=th*Math.PI/180,leg=T/Math.cos(r),skip=2*T*Math.tan(r);
  return {kind:'응용',title:'사각 탐상 경로 계산',fig:FIG.ndt({T:`T = ${T} mm`,th:`θ = ${th}°`}),
   q:`두께 T = ${T} {{mm}}인 강판을 굴절각 θ = ${th}°인 사각 탐촉자로 검사한다. 한 번 내려가는 경로(Leg)와 도약거리(2T·tanθ)는 몇 mm인가?`,
   first:['Leg = T / cosθ','도약거리 = 2T·tanθ','계산기 Deg 모드'],
   steps:[{h:'그림 읽기',b:`<div>빔은 θ만큼 기울어 바닥까지 갔다가(Leg) 다시 위로 올라와요(V자). 위 표면에 다시 닿는 곳까지의 가로 거리가 도약거리.</div>`},
    {h:'Leg',b:`<div class="ln">Leg = ${T} ÷ cos ${th}° = ${T} ÷ ${Math.cos(r).toFixed(4)} = ${fx(leg,4)} mm</div>`},
    {h:'도약거리',b:`<div class="ln">2 × ${T} × tan ${th}° = ${2*T} × ${Math.tan(r).toFixed(4)} = ${fx(skip,4)} mm</div>`},
    {h:'V경로',b:`<div class="ln">2T / cosθ = 2 × ${fx(leg,4)} = ${fx(2*leg,4)} mm</div>`},
    {h:'검산',b:`<div class="rd">각도가 클수록(더 눕힐수록) 경로가 길어짐 ✓ · 단위는 처음부터 mm라 변환 불필요</div>`}],
   ans:`Leg ≈ ${fx(leg,4)} mm · 도약거리 ≈ ${fx(skip,4)} mm`,ansRead:`레그 ${fxR(leg,4)} 밀리미터`,
   calc:calcBlock([[['SHIFT','MODE','3'],'D (Deg)','각도 단위 = 도'],[[...ks(T),'÷','cos',...ks(th),')','='],casioDec(leg),'Leg'],[['2','×',...ks(T),'×','tan',...ks(th),')','='],casioDec(skip),'도약거리']],[W_DEG]),
   easy:'당구공을 쿠션에 비스듬히 치면 V자로 튕기죠. 그 경로 길이를 삼각형으로 구하는 거예요.'}},
 blind(){const f=pick([40,48,58]),Nc=pick([8,10,12,16]);const c=343,tau=Nc/(f*1e3),dmin=c*tau/2;
  return {kind:'응용',title:'버스트 길이로 보는 블라인드 존',q:`${f} {{kHz}} 초음파를 ${Nc}주기 버스트로 보낸다(공기 음속 343 m/s). (1) 버스트 지속 시간은 몇 {{ms}}? (2) 버스트만 고려할 때 못 재는 최소 거리는 몇 {{cm}}?`,
   first:['한 주기 = 1/f','왕복이라 ÷ 2'],
   steps:[{h:'한 주기 시간',b:`<div class="ln">1 ÷ (${f} × 10³) = ${fx(1/(f*1e3)*1e6,3)} μs</div>`},{h:'버스트 시간',b:`<div class="ln">τ = ${Nc} × ${fx(1/(f*1e3)*1e6,3)} μs = ${fx(tau*1e3,3)} ms</div>`},
    {h:'최소 거리 [AI 보충]',b:`<div class="ln">d = c × τ ÷ 2 = 343 × ${fx(tau,3)} ÷ 2 = ${fx(dmin,3)} m = ${fx(dmin*100,3)} cm</div><div class="rd">보내는 동안 돌아온 반사파는 구분 못 함. 실제로는 잔류 진동·회로 회복 시간 때문에 더 길어요(6~80 cm)</div>`}],
   ans:`τ ≈ ${fx(tau*1e3,3)} ms · 최소 ≈ ${fx(dmin*100,3)} cm`,ansRead:`${fxR(dmin*100)} 센티미터`,
   calc:calcBlock([[[...ks(Nc),'÷',...K(f,3),'='],casioDec(tau),'τ (s)'],[['×','3','4','3','÷','2','='],casioDec(dmin),'m']],['분수로 나오면 [S⇔D]']),easy:'내가 말하는 동안엔 메아리를 못 들어요. 말하는 시간만큼 가까운 곳은 못 재요.'}},
 piezoDisp(base){const d=base?100:pick([60,100,130,3.9,5.9]),V=base?100:pick([10,50,100,200]);const dpm=d*V;const mat=d===3.9?'AlN':d===5.9?'ZnO':'PZT';
  return {kind:base?'기본':'유사',title:'전압을 걸면 얼마나 변할까',fig:FIG.pPiezo(`d₃₃ = ${d} pm/V`,`V = ${V} V`,'Δt = ?'),
   q:`${mat} 박막(d₃₃ = ${d} {{pmV}})의 두께 방향으로 ${V} {{V}}를 걸었다. 두께 변화 Δt는 몇 {{nm}}인가?`,
   first:['S = d·E, E = V/t','→ Δt = d₃₃ × V','pm → nm: ÷ 1000'],
   steps:[{h:'식 정리',b:`<div class="ln">S = d₃₃ × E,  E = V ÷ t,  Δt = S × t</div><div class="ln">→ Δt = d₃₃ × V</div><div class="rd">두께 t가 지워져요 [AI 보충 정리]</div>`},
    {h:'계산',b:`<div class="ln">Δt = ${d} pm/V × ${V} V = ${fx(dpm,4)} pm</div><div class="rd">V끼리 지워지고 pm만 남아요</div>`},
    {h:'단위 바꾸기',b:`<div class="ln">${fx(dpm,4)} pm = ${fx(dpm/1000,4)} nm</div><div class="rd">1 nm = 1000 pm</div>`},
    {h:'검산',b:`<div class="rd">원자 몇 개 크기(0.1~1 nm) ~ 수십 nm 수준 → 압전 변형은 아주 작다 ✓ (그래서 정밀 위치 조절에 씀)</div>`}],
   ans:`Δt ≈ ${fx(dpm/1000,4)} nm (= ${fx(dpm,4)} pm)`,ansRead:`${fxR(dpm/1000,4)} 나노미터`,
   calc:calcBlock([[[...ks(d),'×',...ks(V),'='],String(+dpm.toFixed(4)),'pm'],[['÷','1','0','0','0','='],casioDec(dpm/1000),'nm']],[]),
   easy:'100 V를 걸어도 머리카락 굵기의 수천분의 1만 움직여요. 대신 아주 정확하게 움직여서 광필터 간격 조절 같은 데 써요.'}},
 piezoQ(){const d=pick([100,200,300]),F=pick([1,2,5,10]),C=pick([0.5,1,2]);const Q=d*F,V=Q/(C*1000);
  return {kind:'응용',title:'누르면 전압이 얼마나 나올까',fig:FIG.pPiezo(`d₃₃ = ${d} pC/N`,`F = ${F} N`,'V = ?'),
   q:`d₃₃ = ${d} {{pCN}}인 압전 소자를 ${F} {{N}}의 힘으로 눌렀다. 소자의 정전용량이 ${C} {{nF}}일 때 (1) 생긴 전하 Q, (2) 전압 V는?`,
   first:['Q = d₃₃ × F','V = Q / C','pC ↔ nC 맞추기'],
   steps:[{h:'전하',b:`<div class="ln">Q = ${d} pC/N × ${F} N = ${Q} pC</div>`},{h:'단위 맞추기',b:`<div class="ln">${Q} pC = ${fx(Q/1000,3)} nC</div><div class="rd">C가 nF라서 전하도 nC로 맞추면 편해요</div>`},
    {h:'전압',b:`<div class="ln">V = Q ÷ C = ${fx(Q/1000,3)} nC ÷ ${C} nF = ${fx(V,3)} V</div><div class="rd">n끼리 지워져요 [AI 보충: 축전기 V = Q/C]</div>`},
    {h:'검산',b:`<div class="rd">힘이 2배면 전압도 2배 (비례) ✓</div>`}],
   ans:`Q = ${Q} pC (${fx(Q/1000,3)} nC) · V ≈ ${fx(V,3)} V`,ansRead:`${fxR(V)} 볼트`,
   calc:calcBlock([[[...ks(d),'×',...ks(F),'='],String(Q),'pC'],[['÷','1','0','0','0','÷',...ks(C),'='],casioDec(V),'V']],[]),
   easy:'라이터 딸깍처럼 누르는 힘이 전하를 만들고, 그 전하가 작은 그릇(C)에 담기면 전압이 돼요.'}}
});
Object.assign(FIG,{
 pTof(o){return svgFig(340,130,`<rect x="10" y="30" width="22" height="56" rx="4" style="fill:var(--ink)"/>${tx(21,102,'센서','small2','middle')}
   <rect x="290" y="16" width="14" height="86" style="fill:var(--muted)"/>${tx(297,118,'물체','small2','middle')}
   ${ar(36,48,284,48,'a',2.2)}${ar(284,70,36,70,'u',2.2)}${tx(160,40,'보내기','a small2','middle')}${tx(160,88,'반사파','u small2','middle')}
   ${tx(160,112,`${o.t} · ${o.T}`,'b2','middle')}${tx(160,128,o.d,'b b2','middle')}`,'초음파 거리 문제 그림')},
 pLayer(f){return svgFig(340,130,`<rect x="60" y="20" width="110" height="80" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/>${tx(115,64,'PZT','b2','middle')}
   <rect x="170" y="20" width="44" height="80" style="fill:var(--unit-soft);stroke:var(--unit);stroke-width:2"/>${tx(192,64,'정합','u small2','middle')}
   ${ar(60,112,170,112,'i',1.4,'2')}${tx(115,126,'λ/2 = ?','b small2','middle')}${ar(170,112,214,112,'i',1.4,'2')}${tx(192,126,'λ/4','b small2','middle')}
   ${ar(220,60,300,60,'u',2.2)}${tx(300,50,`f = ${f} MHz`,'b2','end')}`,'두께 문제 그림')},
 pRefl(a,b){return svgFig(340,130,`<rect x="10" y="20" width="160" height="90" style="fill:var(--accent-soft)"/><rect x="170" y="20" width="160" height="90" style="fill:var(--unit-soft)"/>
   <line x1="170" y1="14" x2="170" y2="116" style="stroke:var(--ink);stroke-width:2"/>${tx(90,40,a,'b2','middle')}${tx(250,40,b,'b2','middle')}
   ${ar(40,70,166,70,'i',2.4)}${ar(166,84,60,98,'b',2.2)}${ar(174,70,300,70,'a',2.2)}${tx(100,112,'반사 R','b small2','middle')}${tx(250,62,'투과 1−R','a small2','middle')}`,'반사 문제 그림')},
 pPiezo(a,b,c){return svgFig(340,120,`<rect x="110" y="30" width="120" height="8" style="fill:var(--ink)"/><rect x="110" y="38" width="120" height="44" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/><rect x="110" y="82" width="120" height="8" style="fill:var(--ink)"/>
   ${tx(170,65,'압전체','b2','middle')}${tx(10,40,a,'b2')}${tx(10,62,b,'b2')}${tx(330,62,c,'b b2','end')}${ar(170,6,170,28,'b',2.4)}${ar(170,114,170,92,'b',2.4)}`,'압전 문제 그림')}
});
PSET.ultra=[['tof',true],['tof'],['tofInch'],['lambda',true],['dB'],['amp'],['refl'],['q'],['ndt'],['blind']];
PSET.piezo=[['piezoDisp',true],['piezoDisp'],['piezoQ']];
TOPICS.ultra={name:'초음파',g:['tof','tofInch','lambda','dB','amp','refl','q','ndt','blind']};
TOPICS.piezo={name:'압전',g:['piezoDisp','piezoQ']};
const BASICG=new Set(['coriolis','cap','tof','lambda','piezoDisp']);

/* ───────── 본문 ───────── */
PAGES.ultra={title:'초음파센서',part:'제3편 6장',secs:[
 {k:'정의',h:'초음파센서란?',b:`<p class="big">사람이 못 듣는 <b>20 kHz 이상의 소리</b>를 보내고, 돌아오는 소리로 거리·물체·내부를 알아내는 센서</p>
   ${FIG.freqBand()}
   <div class="rel">소리 = 매질(기체·액체·고체)의 압력 진동 → <b>진공에서는 전달 안 됨</b></div>
   <p>[[ultrasound]] · 핵심 부품은 전기 ↔ 진동을 바꾸는 [[transducer]]예요(대부분 [[piezo|압전]]).</p>`,
  easy:'산에서 "야호" 하면 메아리가 돌아오죠. 초음파센서는 아주 높은 소리로 "야호"를 하고 메아리 시간으로 거리를 재요.',
  src:'【Sound waves with frequencies above 20 kHz are called ultrasound】 【Sound can travel through any kind of matter, but not through a vacuum】'},
 {k:'음파의 성질',h:'종파·횡파와 음속',b:`<div data-anim="wave"></div>
   <div class="tblwrap"><table><tr><th>매질 (20 °C)</th><th>음속 m/s</th></tr><tr><td>공기</td><td>343 (0 °C: 331)</td></tr><tr><td>물</td><td>약 1440~1480</td></tr><tr><td>유리</td><td>약 4500</td></tr><tr><td>강철</td><td>약 5000</td></tr><tr><td>PZT</td><td>약 4000</td></tr></table></div>
   <div class="key">기체 &lt; 액체 &lt; 고체 순으로 빨라요. 온도가 1 K 오르면 약 0.17 % 빨라져요.</div>
   <div class="eqn">v = √(B / ρ₀)<small>"브이는 루트 비 나누기 로" · [[bulk|B 체적탄성률]], ρ₀ 밀도</small></div>
   <p class="small">고체에서는 [[poisson|포아송 비]] ν까지 들어가요: v = √( B(1−ν) ÷ (ρ₀(1+ν)(1−2ν)) )</p>`,
  easy:'잘 안 눌리는 단단한 물질일수록(B↑) 소리가 빨라요. 무거우면(ρ↑) 느려져요.',
  src:'【Longitudinal waves propagate in all kind of materials】 【Transverse waves only propagate in solid】 【Sonic wave speed changes by 0.17%/°K】'},
 {k:'거리 측정',h:'메아리 시간(ToF)으로 거리 재기',b:`<div data-anim="tof"></div>
   <div class="eqn">2 × 거리 = c(T) × t<small>"2 디는 씨 곱하기 티" · 왕복이라 2배</small></div>
   <div class="f4"><div><div class="h">음속은 기온에 따라 변함</div><div class="ln">c(T) = 13,044 √(1 + T/273) inch/s</div><div class="ln">= 331.3 √(1 + T/273) m/s</div><div class="rd">13,044 inch/s × 0.0254 = 331.3 m/s · 간이식: 거리 ≈ t × 340 ÷ 2</div></div>
    <div><div class="h">시간 t 뽑는 법</div>① 임계값 검출 (정해 둔 크기 넘으면 도착) ② 포락선(envelope) 검출</div>
    <div><div class="h">버스트</div>한 번에 8~16 주기를 묶어 보내요.</div></div>`,
  easy:'소리가 갔다 오는 시간의 절반 × 소리 빠르기 = 거리. 날이 더우면 소리가 빨라져서 같은 거리도 시간이 짧아져요.',
  src:'【2·거리 = c(T)·t】 【c(T) = 13,044 √(1 + T/273) [inch/s]】 【검출거리 ≈ t × 340 / 2】'},
 {k:'구조',h:'트랜스듀서 구조',b:`${FIG.transducer()}
   <ul class="clean"><li>[[piezo|압전체]] PZT: d₃₃가 커서 많이 씀. 두께 = λ/2 → 공진</li><li>[[matching|정합층]] λ/4 + 겔: 공기층 없애고 반사 줄이기</li><li>[[backing|백킹재]]: 뒤로 가는 파동 흡수, 펄스를 짧게</li><li>하우징·보호막: 물·먼지·돌 튐 보호 (재질·두께도 음향 특성에 영향)</li></ul>
   ${FIG.unimorph()}<button class="ghost" data-goto="piezo">↗ 압전 원리 보기 (제2편 5장)</button>`,
  easy:'압전판이 "스피커 겸 마이크", 앞에 붙인 정합층과 겔은 "소리가 잘 넘어가게 하는 다리", 뒤의 백킹재는 "울림 멈춤 장치"예요.',
  src:'【It consists of a piezoelectric material, electrodes, acoustic matching layer, backing material, and housing case】 【Thickness of the material is equal to ½ wavelength】 【The matching layer thickness is equal to ¼ the wavelength】'},
 {k:'파장·주파수',h:'λ = v / f 와 주파수의 효과',b:`<div class="eqn">λ = v / f<small>"람다는 브이 나누기 에프"</small></div>
   <div class="f4"><div><div class="h">숫자 예 (PZT 음속 4000 m/s)</div><div class="ln">1 MHz → λ = 4000 ÷ 10⁶ = 4 × 10⁻³ m = 4 mm → PZT 2 mm</div><div class="ln">5 MHz → λ = 8 × 10⁻⁴ m = 0.80 mm → PZT 0.4 mm</div></div>
    <div><div class="h">주파수를 높이면</div><ul class="clean"><li>감도↑ · 분해능↑ · 빔 퍼짐↓ (직진성↑)</li><li>하지만 <b>감쇠↑ · 탐지 깊이↓</b></li></ul></div></div>
   ${FIG.beam()}${FIG.qfactor()}
   <p>[[qf|Q 값]] = f₀ / BW. [[sidelobe|사이드 로브]]는 완만한 형상, 큰 크기, 높은 주파수, 렌즈로 줄여요.</p>`,
  easy:'높은 소리(고주파)는 레이저처럼 곧게 가고 자세히 보이지만, 멀리 못 가요. 낮은 소리는 멀리 가지만 흐릿해요.',
  src:'【λ = c/f = 4000 m/sec ÷ 5×10⁶/sec = 8×10⁻⁴ meters = 0.80 mm】 【Q = center frequency / bandwidth】'},
 {k:'임피던스',h:'음향 임피던스와 반사',b:`<div class="eqn">Z = ρ × v<small>"제트는 로 곱하기 브이" · 단위 Rayl = Pa·s/m</small></div>
   <div data-anim="refl"></div>
   <div class="tblwrap"><table><tr><th>재료</th><th>밀도 kg/m³</th><th>음속 m/s</th><th>Z MRayl</th></tr>
   <tr><td>공기</td><td>1.2</td><td>330</td><td>0.0004*</td></tr><tr><td>물</td><td>1000</td><td>1480</td><td>1.48</td></tr><tr><td>지방</td><td>952</td><td>1459</td><td>1.38</td></tr><tr><td>연조직</td><td>1060</td><td>1540</td><td>1.63</td></tr><tr><td>뼈</td><td>1912</td><td>4080</td><td>7.8</td></tr><tr><td>PZT</td><td>—</td><td>4000</td><td>38</td></tr></table></div>
   <p class="small muted">* 1.2 × 330 = 396 Rayl ≈ 0.0004 MRayl. 강의자료 표의 0.004는 자릿수 표기 차이로 보여요(추정). 어느 값이든 연조직/공기 반사 99.9 %는 같아요.</p>
   <div class="key">Z가 같을수록 많이 투과, 다를수록 많이 반사. 반사율 R = ((Z₂−Z₁)/(Z₂+Z₁))² [AI 보충]</div>`,
  easy:'Z는 "소리가 넘어가기 어려운 정도"예요. 높이가 다른 계단을 오르면 걸려 넘어지듯, Z 차이가 크면 소리가 튕겨 나와요.',
  src:'【Acoustic impedance Z = material density × wave velocity】 【The transmission becomes maximum when the acoustic impedances of the two media are equal】 【Soft tissue / air 99.9 %】'},
 {k:'dB·감쇠',h:'데시벨과 감쇠',b:`<div class="f4"><div><div class="h">소리 세기</div><div class="ln">β = 10 log(I / I₀) [dB],  I₀ = 10⁻¹² W/m²</div><div class="rd">세기 10배 → +10 dB · 사람이 듣는 범위 0~130 dB</div></div>
    <div><div class="h">음압</div><div class="ln">Π = 20 log(P / P₀) [dB],  P₀ = 2 × 10⁻⁵ N/m² = 2 × 10⁻⁹ N/cm²</div><div class="rd">⚠ N/m² → N/cm²: 분모 cm²가 10⁻⁴ m²라서 숫자에 10⁻⁴</div></div>
    <div><div class="h">감쇠</div><div class="ln">I ∝ 1/r²,  A = A₀·e^(−αx),  진폭비(dB) = 20 log(A/A₀)</div><div class="rd">흡수·반사·산란·굴절 때문에 줄어듦</div></div></div>`,
  easy:'dB는 "10배를 한 칸"으로 세는 눈금이에요. 세기는 10 log, 압력·진폭은 20 log를 써요.',
  src:'【β = 10 log₁₀(I/I₀)】 【Π = 20 log₁₀(P/P₀), P₀ = 2×10⁻⁵ N/m² = 2×10⁻⁹ N/cm²】 【Amplitude ratio (dB) = 20 log₁₀(A/A₀)】'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'한계',h:'블라인드 존과 환경 간섭',b:`<div class="f4"><div><div class="h">[[blind|블라인드 존]] (보통 6~80 cm)</div><ol class="clean"><li>송신 버스트가 이어지는 시간</li><li>송신 후 남는 잔류 진동</li><li>큰 송신 신호 뒤 수신 회로 회복 시간</li></ol></div>
    <div><div class="h">환경 간섭</div><ul class="clean"><li>온도 → 음속 변화 (0.17 %/K) → 보정 필요</li><li>습도↑ → 음속 최대 2 %↑ → 실제보다 가깝게 측정</li><li>바람 50~100 km/h 불안정, 100 km/h 이상 반사파 없음</li><li>스펀지 같은 흡음 물체는 검출 불가 · 먼지는 범위 25~33 % 감소 · 진공 불가</li></ul></div></div>`,
  easy:'너무 가까우면 못 재고(블라인드 존), 덥거나 습하거나 바람이 불면 소리 빠르기가 바뀌어 오차가 생겨요.',
  src:'【Blind zone 6-80 cm】 【스폰지와 같은 흡음물체는 검출이 불가능하다】'},
 {k:'응용',h:'어디에 쓰나',b:`<div class="appchips"><span>🚗 주차 센서</span><span>🏥 의료 영상</span><span>🔩 비파괴 검사</span><span>🚢 소나</span><span>🌈 광필터</span></div>
   <div class="f4"><div><div class="h">의료 영상</div>체내 음속을 1540 m/s로 가정해 반사 시간 → 깊이. [[amode|A-mode]]·B-mode, [[tgc|TGC]]로 깊은 곳 보상.</div></div>
   <div data-anim="amode"></div>
   <div class="f4"><div><div class="h">[[ndt|비파괴 검사]]</div>수직 탐촉자: 종파, 결함·뒷면 반사 시간 · 사각 탐촉자: 전단파(횡파), 용접부</div></div>
   ${FIG.ndt()}
   <div class="f4"><div><div class="h">빔 집속·조향</div>[[phased|위상 배열]]로 소자마다 시간 지연 → 원하는 곳에 집속·방향 전환</div>
    <div><div class="h">[[fp|패브리-페로 광필터]]</div>PZT로 거울 간격 d를 바꿔 mλ = 2d·cosθ인 파장(예: 850 nm)만 통과</div>
    <div><div class="h">[[sonar|소나]]</div>배에서 물속으로 음파 → 바닥·물고기·잠수함 탐지</div></div>
   <p class="small"><b>[현업]</b> 탱크 레벨 측정, 배관 두께·용접부 검사, 로봇·AGV 근접 감지에 써요.</p>`,
  easy:'주차할 때 "삐삐삐" 소리, 병원 초음파 사진, 다리·배관 속 금 찾기가 모두 같은 메아리 원리예요.',
  src:'【자동차 후면 감지 센서는 하나의 트랜스듀서가 송신과 수신을 모두 담당】 【일반적으로 속도는 1540 m/s로 assume】'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li><b>정의</b>: 20 kHz 이상 음파, 진공 불가. 거리 = c·t ÷ 2</li><li><b>두께</b>: λ = v/f, 압전체 λ/2, 정합층 λ/4</li><li><b>임피던스</b>: Z = ρv. 같으면 투과, 다르면 반사 → 겔·정합층</li></ol>
   <div class="eyebrow">백지 복원 순서</div><ol class="clean small"><li>센서 → 물체로 가는 화살표, 돌아오는 화살표, t 표시</li><li>2d = c(T)·t, c(T) 식</li><li>층 구조: 백킹 | PZT(λ/2) | 정합층(λ/4) | 겔 | 대상</li><li>주파수↑ 장점 3개 + 단점(감쇠↑ 깊이↓)</li></ol>
   <div class="eyebrow">스스로 점검</div>
   <details class="qa"><summary>왜 시간에 c를 곱하고 2로 나누나?</summary><div>t는 갔다 온 왕복 시간이라서. 편도 거리 = c·t/2.</div></details>
   <details class="qa"><summary>의료 초음파에 겔을 바르는 이유는?</summary><div>피부와 센서 사이 공기층은 Z 차이가 커서 99.9 % 반사. 겔이 공기를 없애 투과시킴.</div></details>
   <details class="qa"><summary>주파수를 높이면 무엇이 좋아지고 무엇이 나빠지나?</summary><div>감도·분해능↑, 빔 퍼짐↓ / 감쇠↑, 탐지 깊이↓.</div></details>
   <details class="qa"><summary>블라인드 존이 생기는 이유 3가지는?</summary><div>송신 버스트 지속 시간, 잔류 진동, 수신 회로 회복 시간.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
PAGES.piezo={title:'압전형',part:'제2편 5장',secs:[
 {k:'정의',h:'압전 효과란?',b:`<p class="big">누르면 <b>전압</b>이 생기고(정압전), 전압을 걸면 <b>모양이 변하는</b>(역압전) 성질</p>
   <div data-anim="piezo"></div>
   <p>비대칭 결정에서만 생겨요: PZT, BaTiO₃(티탄산바륨), 수정(Quartz), PVDF, AlN, ZnO.</p>
   <div class="key">센서(받기) = 정압전 · 액추에이터·송신(내기) = 역압전. 초음파 트랜스듀서는 하나로 둘 다.</div>`,
  easy:'라이터를 딸깍 누르면 불꽃이 튀죠(정압전). 반대로 전기를 주면 판이 떨려서 "삐" 소리가 나요(역압전, 전자 부저).',
  src:'【결정에 힘(압력)을 가하면 내부에서 전기 분극(polarization)이 발생하여 결정 표면에 전하가 나타난다】 【역으로 전계를 가하면 결정이 기계적 변형을 일으킨다】'},
 {k:'압전 계수',h:'d₃₃ · d₃₁ 읽기',b:`<div class="f4"><div><div class="h">정압전 (힘 → 분극)</div><div class="ln">Pᵢ = dᵢⱼ × Tⱼ</div><div class="rd">T 응력(힘), P 분극 · d 단위 C/N (보통 pC/N)</div></div>
    <div><div class="h">역압전 (전계 → 변형)</div><div class="ln">Sᵢ = dᵢⱼ × Eⱼ</div><div class="rd">E 전계, S 변형률 · d 단위 m/V (보통 pm/V)</div></div>
    <div><div class="h">아래 첨자 읽는 법</div>d₃₃: 3방향(두께)으로 걸고 3방향으로 반응 · d₃₁: 3방향으로 걸고 1방향(옆)으로 반응. 3 = 분극 방향.</div></div>
   <div class="tblwrap"><table><tr><th>재료</th><th>d (pm/V)</th><th>음속 m/s</th><th>저항률 Ω·cm</th></tr><tr><td>PZT</td><td>d₃₃ 60~130, d₃₁ −120~−170</td><td>3,900</td><td>10⁹</td></tr><tr><td>LiNbO₃</td><td>d₃₁ −7.4</td><td>3,980</td><td>2 × 10¹⁰</td></tr><tr><td>AlN</td><td>d₃₃ 3.9</td><td>10,127</td><td>10¹¹</td></tr><tr><td>ZnO</td><td>d₃₃ 5.9</td><td>5,700</td><td>10⁷</td></tr></table></div>
   <p class="small">[AI 보충] pC/N과 pm/V는 같은 크기의 단위예요 (C/N = m/V).</p>`,
  easy:'d₃₃ = 100 pm/V면 1 V마다 두께가 100 pm(0.1 nm) 변해요. PZT가 다른 재료보다 수십 배 민감해요.',
  src:'【Pᵢ = dᵢⱼ Tⱼ, dᵢⱼ [Coulombs/Newton]】 【Sᵢ = dᵢⱼ Eⱼ, dᵢⱼ unit: Meters/Volt】'},
 {k:'만들기·주의',h:'분극 처리와 DC·AC',b:`<div class="f4"><div><div class="h">[[poling|분극 처리]] 순서</div><ol class="clean"><li>합성</li><li>가열(어닐링)</li><li>높은 온도에서 전압 걸어 쌍극자 정렬</li><li>냉각해 방향 고정</li><li>모양대로 자르기</li></ol><div class="rd">처리 전 PZT는 압전성이 없음</div></div>
    <div><div class="h">DC를 계속 걸면</div>저항이 매우 커서 전류는 거의 안 흐르지만, 이온·산소 공공이 이동해 균열·박리, 절연 파괴·누설 전류 증가 가능</div>
    <div><div class="h">AC를 걸면</div>수축·팽창이 반복되어 진동 → 초음파 발생. 너무 크면 균열·박리</div>
    <div><div class="h">박막 PZT (MEMS)</div>1 MHz면 λ/2 = 2 mm → 스퍼터링으로는 너무 두꺼움. 고주파일수록 얇아도 됨</div></div>`,
  easy:'구워서 전기로 줄 세우고 식혀서 굳혀야 압전이 생겨요. 직류를 오래 걸면 상하고, 교류를 걸면 떨려요.',
  src:'【For PZT in its natural state, no piezoelectric properties are exhibited】 【λ/2 = 2mm (too thick, 불가능 by rf sputtering)】'},
 {k:'문제',h:'',b:'__PROBS__'}
]};
CARDS.push(
 {id:'us1',tag:'초음파',f:'초음파의 주파수 기준은?',a:'20 kHz 이상',r:'20 킬로헤르츠',e:'사람 귀 한계를 넘는 소리'},
 {id:'us2',tag:'초음파',f:'초음파 거리 측정 식은?',a:'2 × 거리 = c(T) × t',r:'왕복이라 2배',e:'메아리 시간의 절반 × 음속'},
 {id:'us3',tag:'초음파',f:'공기 중 음속의 기온 식은?',a:'c = 331.3√(1+T/273) m/s',r:'슬라이드: 13,044√(1+T/273) inch/s',e:'1 inch = 0.0254 m'},
 {id:'us4',tag:'초음파',f:'종파와 횡파의 차이는?',a:'종파: 진행 방향으로 진동, 모든 매질 · 횡파: 직각 진동, 고체만, 더 느림',r:'',e:''},
 {id:'us5',tag:'초음파',f:'압전체 두께와 정합층 두께 규칙은?',a:'압전체 = λ/2, 정합층 = λ/4',r:'λ = v/f',e:''},
 {id:'us6',tag:'초음파',f:'음향 임피던스 식과 단위는?',a:'Z = ρ × v · Rayl (Pa·s/m)',r:'제트는 로 곱하기 브이',e:'같으면 투과, 다르면 반사'},
 {id:'us7',tag:'초음파',f:'의료 초음파에 겔을 쓰는 이유는?',a:'공기층 제거 (연조직/공기 99.9 % 반사)',r:'',e:''},
 {id:'us8',tag:'초음파',f:'주파수를 높이면?',a:'감도·분해능↑, 빔 퍼짐↓ / 감쇠↑, 깊이↓',r:'',e:''},
 {id:'us9',tag:'초음파',f:'블라인드 존이 생기는 이유 3가지',a:'송신 버스트 시간, 잔류 진동, 수신 회로 회복 시간',r:'보통 6~80 cm',e:''},
 {id:'us10',tag:'초음파',f:'세기 dB와 음압 dB 식은?',a:'β = 10 log(I/I₀), Π = 20 log(P/P₀)',r:'I₀ = 10⁻¹² W/m², P₀ = 2×10⁻⁵ N/m²',e:'압력은 20'},
 {id:'us11',tag:'초음파',f:'Q 값 식과 낮은 Q의 특징은?',a:'Q = f₀/BW · 넓은 대역, 짧은 펄스',r:'',e:''},
 {id:'us12',tag:'초음파',f:'TGC란?',a:'시간(깊이)에 따라 수신 이득을 높여 깊은 곳 약한 에코 보상',r:'Time Gain Compensation',e:''},
 {id:'pz1',tag:'압전',f:'정압전과 역압전은?',a:'정: 힘 → 전하(전압) · 역: 전압 → 변형',r:'센서 / 액추에이터',e:''},
 {id:'pz2',tag:'압전',f:'d₃₃의 두 가지 단위는?',a:'pC/N (힘→전하), pm/V (전압→변형)',r:'같은 크기',e:''},
 {id:'pz3',tag:'압전',f:'분극 처리(poling)란?',a:'고온에서 전계를 걸어 쌍극자를 정렬하고 냉각해 고정',r:'처리 전 PZT는 압전성 없음',e:''}
);
