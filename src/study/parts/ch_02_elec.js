/* ═════════ 제0편 4장 전기 기초 · 5장 회로 기초 ═════════ */
Object.assign(TERM,{
 charge:{ko:'전하',en:'Electric charge',gen:'전기의 양.',tech:'단위 C(쿨롱). 전자 1개 = −1.602 × 10⁻¹⁹ C. 같은 부호는 밀고 다른 부호는 당김.',easy:'전기를 띤 알갱이(전자)가 얼마나 많이 모였는지예요.'},
 current:{ko:'전류',en:'Current',gen:'전하가 흐르는 빠르기.',tech:'I = Q/t, 단위 A(암페어) = C/s. 관례상 + → − 방향(전자 흐름의 반대).',easy:'1초에 전선의 한 단면을 지나가는 전기의 양이에요.'},
 voltage:{ko:'전압',en:'Voltage',gen:'전기를 밀어 주는 힘(높이 차).',tech:'단위 전하당 에너지 차 V = W/Q, 단위 V(볼트) = J/C. 항상 두 점 사이(기준점, 접지 대비)로 정의.',easy:'물탱크의 높이 차처럼 전기를 흐르게 하는 "압력"이에요.'},
 resistance:{ko:'저항',en:'Resistance',gen:'전류가 흐르기 어려운 정도.',tech:'R = V/I, 단위 Ω(옴). 재료·길이·단면적으로 R = ρL/A. 온도·변형·빛·가스로 변하면 그대로 저항형 센서가 됨.',easy:'좁은 수도관일수록 물이 덜 흐르는 것과 같아요.'},
 ohmlaw:{ko:'옴의 법칙',en:"Ohm's law",gen:'전압 = 전류 × 저항.',tech:'V = IR. 저항이 일정할 때 전류는 전압에 비례.',easy:'세게 밀수록(V) 많이 흐르고, 좁을수록(R) 덜 흘러요.'},
 resistivity:{ko:'저항률 (비저항)',en:'Resistivity',gen:'재료 자체가 전기를 막는 정도.',tech:'ρ [Ω·m]. R = ρL/A. 구리 1.7 × 10⁻⁸, 백금 1.06 × 10⁻⁷ Ω·m. 모양과 무관한 재료 고유값(온도에 따라 변함).',easy:'같은 크기 막대라도 구리는 잘 통하고 고무는 안 통해요. 그 재료 성질이 저항률이에요.'},
 power:{ko:'전력',en:'Power',gen:'1초 동안 쓰는 전기 에너지.',tech:'P = VI = I²R = V²/R, 단위 W(와트) = J/s. 저항에서 열로 바뀜(줄 열).',easy:'전구가 1초에 얼마나 많은 에너지를 쓰는지예요.'},
 acdc:{ko:'직류·교류',en:'DC / AC',gen:'방향이 일정한 전기와 계속 바뀌는 전기.',tech:'AC: v(t) = V_p sin(ωt). 주파수 f [Hz], 주기 T = 1/f, 각주파수 ω = 2πf [rad/s]. 실효값 V_rms = V_p/√2 (사인파).',easy:'건전지는 한 방향(직류), 콘센트는 1초에 60번 방향이 바뀌어요(교류).'},
 capacitor:{ko:'커패시터',en:'Capacitor',gen:'전하를 저장하는 부품.',tech:'Q = CV, 단위 F(패럿). 리액턴스 X_C = 1/(ωC): 주파수가 높을수록 잘 통함. DC는 차단.',easy:'전기를 잠깐 담아 두는 작은 물통이에요.'},
 inductor:{ko:'인덕터 (코일)',en:'Inductor',gen:'전류 변화를 막는 코일.',tech:'V = L·dI/dt, 단위 H(헨리). 리액턴스 X_L = ωL: 주파수가 높을수록 잘 막음. DC는 그냥 통과.',easy:'무거운 바퀴처럼 갑자기 빨라지거나 멈추는 걸 싫어해요.'},
 impedance:{ko:'임피던스',en:'Impedance',gen:'교류에서의 저항.',tech:'Z = R + jX [Ω]. 코일 +jωL, 커패시터 −j/(ωC). 크기 |Z| = √(R² + X²). j는 위상 90° 차이 표시.',easy:'교류에선 코일·콘덴서도 전류를 막는데, 막는 "타이밍"이 달라서 j를 붙여 따로 적어요.'},
 series:{ko:'직렬·병렬',en:'Series / Parallel',gen:'한 줄로 잇기와 나란히 잇기.',tech:'직렬: R = R₁ + R₂ (전류 같음). 병렬: 1/R = 1/R₁ + 1/R₂ (전압 같음), 두 개면 R₁R₂/(R₁+R₂).',easy:'한 줄 길에 장애물 둘(직렬)은 더 막히고, 길이 둘(병렬)이면 덜 막혀요.'},
 divider:{ko:'전압 분배',en:'Voltage divider',gen:'저항 두 개로 전압을 나누기.',tech:'V_out = V_in · R₂/(R₁ + R₂) (R₂ 양단). 저항형 센서를 R₂에 두면 저항 변화 → 전압 변화.',easy:'전압을 저항 크기 비율대로 나눠 가져요. 센서 저항이 바뀌면 나눠 갖는 몫이 바뀌어요.'},
 opamp:{ko:'연산증폭기',en:'Operational amplifier (op-amp)',gen:'작은 신호를 키우는 증폭 칩.',tech:'이상적 가정: 입력 전류 0, 두 입력 전압 같음(가상 단락), 이득 무한대. 반전 −R_f/R_in, 비반전 1 + R_f/R_g, 전압 팔로워 1.',easy:'저항 두 개 비율만큼 신호를 키워 주는 확대경이에요.'},
 instamp:{ko:'계측 증폭기',en:'Instrumentation amplifier',gen:'두 입력의 차이만 정밀하게 키우는 증폭기.',tech:'op-amp 3개 구조. 입력 임피던스 매우 큼, 공통 모드 제거비(CMRR) 큼, 저항 하나(R_G)로 이득 설정. 브리지 출력(mV) 증폭에 표준.',easy:'두 전선에 똑같이 들어온 잡음은 무시하고, 차이만 키워요.'},
 lowpass:{ko:'저역통과 필터',en:'Low-pass filter (RC)',gen:'느린 신호는 통과, 빠른 잡음은 줄이기.',tech:'RC 1차: 차단 주파수 f_c = 1/(2πRC). f_c에서 −3 dB(전압 0.707배), 그 위로 20 dB/decade 감쇠. ADC 앞 안티앨리어싱.',easy:'천천히 변하는 센서 값은 지나가고, 지지직 빠른 잡음은 걸러요.'},
 loading:{ko:'부하 효과',en:'Loading effect',gen:'측정 장치가 신호를 끌어내려 값이 달라지는 것.',tech:'V_측정 = V_s · R_in/(R_in + R_out). 전압 측정은 R_in ≫ R_out(10배 이상, 보통 100배+)이어야 오차가 작음 → 버퍼(전압 팔로워).',easy:'약한 센서 신호에 측정기가 기대면 신호가 눌려요. 측정기는 "가볍게" 붙어야 해요.'},
 zmatch:{ko:'임피던스 매칭',en:'Impedance matching',gen:'전원과 부하의 임피던스를 맞추기.',tech:'최대 전력 전달: R_L = R_S, 복소수면 Z_L = Z_S*(켤레). 허수부는 반대 부호 소자를 직렬로 붙여 상쇄(−jX → 코일, +jX → 커패시터).',easy:'전기를 가장 많이 넘겨주려면 주는 쪽과 받는 쪽의 "크기"를 맞춰야 해요.'}
});
Object.assign(UNIT,{
 Mohm:{s:'MΩ',r:'메가옴',mean:'10⁶ Ω'},
 Vrms:{s:'V_rms',r:'볼트 알엠에스 (실효값)',mean:'사인파면 V_p/√2'}
});
FORM.push(
 {eq:'V = IR',read:'브이는 아이 알',name:'옴의 법칙',page:'elec',sec:2,syms:[['V','전압','V'],['I','전류','A'],['R','저항','ohm']]},
 {eq:'R = ρL/A',read:'알은 로 엘 나누기 에이',name:'저항과 저항률',page:'elec',sec:3,syms:[['ρ','저항률','ohmm'],['L','길이','m'],['A','단면적','m2']]},
 {eq:'P = VI = I²R = V²/R',read:'전력',name:'전력',page:'elec',sec:4,syms:[['P','전력','W']]},
 {eq:'T = 1/f, ω = 2πf, V_rms = V_p/√2',read:'주기·각주파수·실효값',name:'교류 기본',page:'elec',sec:5,syms:[]},
 {eq:'X_L = ωL,  X_C = 1/(ωC)',read:'코일·콘덴서 리액턴스',name:'리액턴스',page:'elec',sec:6,syms:[]},
 {eq:'V_out = V_in·R₂/(R₁+R₂)',read:'전압 분배',name:'전압 분배',page:'circuit',sec:1,syms:[]},
 {eq:'평형: R₁R₃ = R₂R₄',read:'마주 보는 저항 곱이 같다',name:'휘트스톤 브리지 평형',page:'circuit',sec:2,syms:[]},
 {eq:'반전 −R_f/R_in, 비반전 1 + R_f/R_g',read:'op-amp 이득',name:'증폭기 이득',page:'circuit',sec:3,syms:[]},
 {eq:'f_c = 1/(2πRC)',read:'에프 씨는 1 나누기 2파이 알 씨',name:'RC 필터 차단 주파수',page:'circuit',sec:4,syms:[]},
 {eq:'최대 전력: R_L = R_S (Z_L = Z_S*)',read:'임피던스 매칭',name:'최대 전력 전달',page:'circuit',sec:5,syms:[]}
);

const rbox=(x,y,w,h,lb,val,hot)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" style="fill:${hot?'var(--warn-soft)':'var(--surface)'};stroke:${hot?'var(--warn)':'var(--ink)'};stroke-width:1.6"/>${lb?`<text x="${x+w/2}" y="${y+h/2+4}" text-anchor="middle" class="small2">${lb}</text>`:''}${val?`<text x="${x+w/2}" y="${y+h+14}" text-anchor="middle" class="small2">${val}</text>`:''}`;
const wire=d=>`<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>`;

ANIM.ohm=host=>{let V=5,R=1;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 170" role="img" aria-label="옴의 법칙"></svg><div class="figctl"><label class="small">전압 V <input type="range" min="0" max="10" step="0.5" value="5" data-v style="width:110px"> <b data-vv>5 V</b></label><label class="small">저항 R <input type="range" min="0.5" max="10" step="0.5" value="1" data-r style="width:110px"> <b data-rv>1 kΩ</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>점(전하)이 도는 빠르기 = 전류. 전압을 올리면 빨라지고, 저항을 키우면 느려져요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);const path=[[60,40],[280,40],[280,140],[60,140]];const per=2*(220+100);
  const pt=s=>{s=((s%per)+per)%per;if(s<220)return[60+s,40];s-=220;if(s<100)return[280,40+s];s-=100;if(s<220)return[280-s,140];s-=220;return[60,140-s]};let pos=0,last=0;
  const L=loop(tp=>{const I=V/R;pos+=(tp-last)*I*12;last=tp;let dots='';for(let i=0;i<16;i++){const [x,y]=pt(pos+i*per/16);dots+=`<circle cx="${x}" cy="${y}" r="3.2" style="fill:var(--accent)"/>`}
   svg.innerHTML=`${wire('M60 40 H280 V140 H60 Z')}<rect x="44" y="70" width="32" height="40" rx="4" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/>${tx(60,94,'V','b b2','middle')}${tx(30,94,'+'+V+' V','small2','end')}
    <rect x="${280-14}" y="${90-10-R*2.2}" width="28" height="${20+R*4.4}" rx="3" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:1.6"/>${tx(304,94,'R','b b2')}${dots}`;
   q('[data-o]').innerHTML=`I = V/R = ${V} V ÷ ${R} kΩ = <b>${(I).toFixed(2)} mA</b>`});
  q('[data-v]').oninput=e=>{V=+e.target.value;q('[data-vv]').textContent=V+' V'};q('[data-r]').oninput=e=>{R=+e.target.value;q('[data-rv]').textContent=R+' kΩ'};return L.stop};

ANIM.divider=host=>{let Rs=1000;const Vin=5,R1=1000;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 210" role="img" aria-label="전압 분배와 저항형 센서"></svg><div class="figctl"><label class="small">센서 저항 R₂ <input type="range" min="0" max="2" step="0.02" value="0" data-r style="width:160px"> <b data-rv>1 kΩ</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>센서(R₂) 저항이 커지면 전압을 더 많이 나눠 가져 V_out이 올라가요. 저항 변화가 전압 변화로 바뀌는 가장 단순한 신호 변환이에요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const draw=()=>{const Vo=Vin*Rs/(R1+Rs);svg.innerHTML=`${tx(80,16,'V_in = 5 V','b2','middle')}${wire('M80 22 V40 M80 90 V110 M80 160 V190')}${rbox(64,40,32,50,'R₁')}${tx(100,60,'1 kΩ 고정','small2')}${rbox(64,110,32,50,'R₂',null,true)}${tx(100,140,'센서 '+(Rs>=1000?(Rs/1000).toFixed(2)+' kΩ':Rs.toFixed(0)+' Ω'),'small2')}
    ${tx(80,204,'GND','small2','middle')}<circle cx="80" cy="100" r="4" style="fill:var(--ink)"/>${ar(84,100,160,100,'u',1.8)}${tx(166,104,'V_out','u b2')}
    <rect x="240" y="${190-Vo/5*170}" width="40" height="${Vo/5*170}" style="fill:var(--unit)"/><rect x="240" y="20" width="40" height="170" style="fill:none;stroke:var(--line)"/>${tx(260,14,'5 V','small2','middle')}${tx(286,194-Vo/5*170,Vo.toFixed(2)+' V','u b2')}`;
   q('[data-o]').innerHTML=`V_out = V_in·R₂/(R₁+R₂) = 5 × ${Rs.toFixed(0)}/(1000 + ${Rs.toFixed(0)}) = <b>${Vo.toFixed(3)} V</b>`};
  q('[data-r]').oninput=e=>{Rs=+(100*10**(+e.target.value)).toFixed(1);q('[data-rv]').textContent=Rs>=1000?(Rs/1000).toFixed(2)+' kΩ':Rs.toFixed(0)+' Ω';draw()};Rs=100;q('[data-rv]').textContent='100 Ω';draw();return null};

Object.assign(FIG,{
 serPar(){return svgFig(340,150,`${tx(80,16,'직렬','b2','middle')}${wire('M10 50 H30 M74 50 H96 M140 50 H160')}${rbox(30,40,44,20,'R₁')}${rbox(96,40,44,20,'R₂')}${tx(85,88,'R = R₁ + R₂','mono b2','middle')}${tx(85,106,'전류 같음 · 전압 나눔','small2','middle')}
   ${tx(255,16,'병렬','b2','middle')}${wire('M190 60 H210 V36 H230 M274 36 H296 V60 H316 M210 60 V84 H230 M274 84 H296 V60')}${rbox(230,26,44,20,'R₁')}${rbox(230,74,44,20,'R₂')}${tx(255,120,'1/R = 1/R₁ + 1/R₂','mono b2','middle')}${tx(255,138,'전압 같음 · 전류 나눔','small2','middle')}`,'직렬과 병렬','직렬은 합이 커지고, 병렬은 가장 작은 저항보다도 작아져요.')},
 wheat(){return svgFig(340,210,`${tx(170,14,'V_in','b2','middle')}${wire('M110 22 H230 M110 22 V40 M110 92 V120 M110 172 V196 M230 22 V40 M230 92 V120 M230 172 V196 M110 196 H230')}
   ${rbox(96,40,28,52,'R₂')}${rbox(96,120,28,52,'R₃')}${rbox(216,40,28,52,'R₁',null,true)}${rbox(216,120,28,52,'R₄')}${tx(252,70,'센서','small2')}${tx(170,208,'GND','small2','middle')}
   <circle cx="110" cy="106" r="4" style="fill:var(--ink)"/><circle cx="230" cy="106" r="4" style="fill:var(--ink)"/><line x1="114" y1="106" x2="226" y2="106" style="stroke:var(--unit);stroke-width:1.6;stroke-dasharray:4 3"/>${tx(170,100,'V_o','u b2','middle')}
   ${tx(90,128,'왼쪽 중점','small2','end')}${tx(90,144,'V_in·R₃/(R₂+R₃)','small2','end')}${tx(252,128,'오른쪽 중점','small2')}${tx(252,144,'V_in·R₄/(R₁+R₄)','small2')}`,'휘트스톤 브리지 (이 앱의 R 위치)','이 앱은 가스센서 장과 같은 배치를 써요: 센서 R₁은 오른쪽 위, R₄는 그 아래, 왼쪽은 R₂(위)·R₃(아래). V_o = 왼쪽 중점 − 오른쪽 중점.')},
 opamps(){const tri=(x,y)=>`<path d="M${x} ${y-26} L${x+52} ${y} L${x} ${y+26} Z" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/>${tx(x+8,y-8,'−','b2')}${tx(x+8,y+16,'+','b2')}`;
  return svgFig(340,230,`${tx(10,14,'반전 증폭기','b2')}${tri(110,60)}${wire('M20 52 H40 M76 52 H110 M92 52 V22 H124 M160 22 H180 V60 M162 60 H200 M110 68 H96 V90')}${rbox(40,44,36,16,'R_in')}${rbox(124,14,36,16,'R_f')}${tx(96,104,'GND','small2','middle')}${tx(14,56,'V_in','small2','end')}${tx(204,64,'V_out','u small2')}${tx(250,48,'G = −R_f/R_in','mono b2')}${tx(250,66,'부호 반전','small2')}
   ${tx(10,134,'비반전 증폭기','b2')}${tri(110,180)}${wire('M40 188 H110 M162 180 H200 M180 180 V214 H150 M114 214 H96 V172 H110 M96 214 V222')}${rbox(114,206,36,16,'R_f')}${rbox(60,212,30,14,'R_g')}${tx(34,192,'V_in','small2','end')}${tx(204,184,'V_out','u small2')}${tx(250,168,'G = 1 + R_f/R_g','mono b2')}${tx(250,186,'입력 임피던스 큼','small2')}`,'op-amp 기본 두 가지 (그림 단순화)','반전: 입력이 − 단자로, 출력 부호가 뒤집힘. 비반전: 입력이 + 단자로, 센서를 거의 끌어내리지 않음. R_f = 0, R_g = ∞면 전압 팔로워(이득 1, 버퍼).')},
 rcLow(){const X=f=>30+Math.log10(f)*70,Y=db=>40-db*3.2;let d='';for(let i=0;i<=80;i++){const lf=-1+i*0.05,f=10**lf;const g=1/Math.sqrt(1+f*f);d+=(i?'L':'M')+X(f*10).toFixed(1)+' '+Y(20*Math.log10(g)).toFixed(1)}
  return svgFig(340,190,`${wire('M10 30 H40 M84 30 H130 M110 30 V48 M110 62 V80')}${rbox(40,22,44,16,'R')}<line x1="100" y1="48" x2="120" y2="48" style="stroke:var(--ink);stroke-width:3"/><line x1="100" y1="62" x2="120" y2="62" style="stroke:var(--ink);stroke-width:3"/>${tx(126,60,'C','b2')}${tx(134,34,'V_out','u small2')}${tx(8,26,'V_in','small2')}
   <line x1="30" y1="${Y(0)+70}" x2="330" y2="${Y(0)+70}" style="stroke:var(--line)"/><g transform="translate(0,70)"><path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.2"/><line x1="${X(10)}" y1="${Y(3)}" x2="${X(10)}" y2="${Y(-30)}" style="stroke:var(--warn);stroke-dasharray:3 3"/>${tx(X(10)+4,Y(-25),'f_c = 1/(2πRC) · −3 dB','small2')}${tx(330,Y(-28),'주파수 (log) →','small2','end')}${tx(32,Y(0)-6,'통과','small2')}${tx(290,Y(-18),'감쇠','small2','middle')}</g>`,'RC 저역통과 필터','f_c보다 느린 신호는 거의 그대로, 빠른 신호(잡음)는 10배마다 20 dB씩 줄어요.')}
});

const KO=x=>x>=1e6?fx(x/1e6,4)+' MΩ':x>=1e3?fx(x/1e3,4)+' kΩ':fx(x,4)+' Ω';
Object.assign(GEN,{
 ohmLaw(base){const mode=base?'I':pick(['I','V','R']);const V=base?5:pick([1.5,3.3,5,9,12]),R=base?2.2e3:pick([100,470,1e3,2.2e3,10e3,47e3]);const I=V/R;
  const Q={I:`${V} {{V}}를 ${KO(R)} 저항에 걸면 전류는 몇 {{mA}}인가?`,V:`${KO(R)} 저항에 ${fx(I*1e3,4)} {{mA}}가 흐른다. 양단 전압은?`,R:`${V} V를 걸었더니 ${fx(I*1e3,4)} mA가 흘렀다. 저항은?`}[mode];
  const St={I:[`I = V/R = ${V} ÷ ${R}`,`= ${sciT(sci(I,4))} A = ${fx(I*1e3,4)} mA`],V:[`V = IR = ${fx(I*1e3,4)}×10⁻³ × ${R}`,`= ${fx(V,4)} V`],R:[`R = V/I = ${V} ÷ (${fx(I*1e3,4)} × 10⁻³)`,`= ${fx(R,4)} Ω = ${KO(R)}`]}[mode];
  const A={I:`${fx(I*1e3,4)} mA`,V:`${fx(V,4)} V`,R:KO(R)}[mode];
  return {kind:base?'기본':'유사',title:'옴의 법칙',q:Q,first:['V = IR','kΩ → × 10³, mA → × 10⁻³'],
   steps:[{h:'단위를 기본 단위로',b:`<div class="ln">${KO(R)} = ${R} Ω${mode!=='I'?` · ${fx(I*1e3,4)} mA = ${fx(I*1e3,4)} × 10⁻³ A`:''}</div><div class="rd">V, A, Ω 기본 단위끼리 계산 → 마지막에 접두어</div>`},{h:'계산',b:St.map(x=>`<div class="ln">${x}</div>`).join('')},{h:'꿀팁',b:`<div class="rd">V ÷ kΩ = mA 로 바로 나와요 (10⁰ ÷ 10³ = 10⁻³)</div>`}],
   ans:A,ansRead:A.replace('mA','밀리암페어').replace('kΩ','킬로옴').replace('MΩ','메가옴').replace(' V',' 볼트').replace(' Ω',' 옴'),
   calc:calcBlock([[mode==='I'?[...ks(V),'÷',...ks(R),'=']:mode==='V'?[...K(+(I*1e3).toPrecision(4),-3),'×',...ks(R),'=']:[...ks(V),'÷',...K(+(I*1e3).toPrecision(4),-3),'='],casioDec(mode==='I'?I:mode==='V'?V:R)],[['ENG'],'접두어 읽기']],[W_NEG]),
   easy:'세게 밀수록(V) 많이 흐르고, 좁을수록(R) 덜 흘러요. 셋 중 둘을 알면 나머지 하나가 나와요.'}},
 powerP(base){const V=base?5:pick([3.3,5,12]),R=base?100:pick([10,50,100,220,1000]);const I=V/R,P=V*V/R;
  return {kind:base?'기본':'유사',title:'전력과 열',q:`${R} {{ohm}} 히터에 ${V} {{V}}를 걸었다. 전류, 전력, 1분 동안 나는 열(J)은?`,first:['P = V²/R','열 = P × t'],
   steps:[{h:'전류',b:`<div class="ln">I = ${V}/${R} = ${fx(I,4)} A</div>`},{h:'전력',b:`<div class="ln">P = V²/R = ${V}² ÷ ${R} = ${fx(P,4)} W</div><div class="rd">검산 P = VI = ${V} × ${fx(I,4)} = ${fx(V*I,4)} W ✓</div>`},{h:'열',b:`<div class="ln">Q = P × t = ${fx(P,4)} × 60 s = ${fx(P*60,4)} J</div>`}],
   ans:`I ${fx(I,4)} A · P ${fx(P,4)} W · ${fx(P*60,4)} J`,ansRead:`${fxR(P,4)} 와트`,calc:calcBlock([[[...ks(V),'x²','÷',...ks(R),'='],casioDec(P)],[['Ans','×','6','0','='],casioDec(P*60),'J']],[]),
   easy:'와트는 1초에 쓰는 에너지. 60초면 60을 곱해요. 이게 마이크로히터가 뜨거워지는 원리예요.'}},
 resWire(base){const M=base?['백금(Pt)',1.06e-7]:pick([['백금(Pt)',1.06e-7],['구리(Cu)',1.7e-8],['니크롬',1.1e-6]]);const L=base?10:pick([5,10,20,50]),D=base?20:pick([10,20,25,50]);const A=Math.PI*(D*1e-6)**2/4,R=M[1]*L*1e-3/A;
  return {kind:base?'기본':'응용',title:'선의 저항 (R = ρL/A)',q:`${M[0]} (ρ = ${sciT(sci(M[1]))} {{ohmm}}) 선, 길이 ${L} {{mm}}, 지름 ${D} {{um}}의 저항은?`,first:['mm → m: × 10⁻³','μm → m: × 10⁻⁶','A = πD²/4'],
   steps:[{h:'단위',b:`<div class="ln">L = ${L} mm = ${L} × 10⁻³ m</div><div class="ln">D = ${D} μm = ${D} × 10⁻⁶ m</div>`},{h:'단면적',b:`<div class="ln">A = π × (${D}×10⁻⁶)² ÷ 4 = ${sciT(sci(A,4))} m²</div><div class="rd">반지름이면 πr², 지름이면 πD²/4</div>`},
    {h:'저항',b:`<div class="ln">R = ${sciT(sci(M[1]))} × ${L}×10⁻³ ÷ ${sciT(sci(A,4))} = ${fx(R,4)} Ω</div>`}],
   ans:KO(R),ansRead:KO(R).replace('kΩ','킬로옴').replace(' Ω',' 옴'),calc:calcBlock([[['SHIFT','×10ˣ','×','(',...K(D,-6),')','x²','÷','4','='],casioDec(A),'A 저장: SHIFT RCL (−)'],[[...K(+sci(M[1]).m,sci(M[1]).e),'×',...K(L,-3),'÷','ALPHA','(−)','='],casioDec(R)]],[W_NEG,W_PI]),
   easy:'길면 저항이 크고, 굵으면 작아요. 지름이 반이면 단면적은 ¼이라 저항은 4배!'}},
 qCharge(){const I=pick([1,2,5,10]),t=pick([1,10,60]);const Q=I*1e-3*t,n=Q/1.602e-19;
  return {kind:'유사',title:'전하와 전자 수',q:`${I} {{mA}}가 ${t} {{s}} 동안 흐르면 지나간 전하(C)와 전자 수는?`,first:['Q = I × t','전자 1개 1.602 × 10⁻¹⁹ C'],
   steps:[{h:'전하',b:`<div class="ln">Q = ${I}×10⁻³ × ${t} = ${sciT(sci(Q))} C</div>`},{h:'전자 수',b:`<div class="ln">${sciT(sci(Q))} ÷ 1.602×10⁻¹⁹ = ${sciT(sci(n))} 개</div>`}],
   ans:`${sciT(sci(Q))} C · ${sciT(sci(n))}개`,ansRead:sciR(sci(n))+'개',calc:calcBlock([[[...K(I,-3),'×',...ks(t),'÷',...K(1.602,-19),'='],casioDec(n)]],[W_NEG]),easy:'1 mA만 흘러도 1초에 전자가 6조 개 넘게 지나가요.'}},
 acBasic(base){const f=base?60:pick([50,60,1000,1e6,135e3]);const Vp=base?10:pick([1,5,10,311]);const T=1/f,w=2*Math.PI*f;
  return {kind:base?'기본':'유사',title:'교류 기본값',q:`주파수 ${fx(f)} {{Hz}}, 최댓값 ${Vp} V인 사인파의 주기, 각주파수, 실효값은?`,first:['T = 1/f','ω = 2πf','V_rms = V_p/√2'],
   steps:[{h:'주기',b:`<div class="ln">T = 1/${fx(f)} = ${sciT(sci(T,4))} s${T<1e-2?` = ${fx(T*1e3>=1?T*1e3:T*1e6,4)} ${T*1e3>=1?'ms':'μs'}`:''}</div>`},{h:'각주파수',b:`<div class="ln">ω = 2π × ${fx(f)} = ${fx(w,4)} rad/s</div>`},{h:'실효값',b:`<div class="ln">${Vp} ÷ √2 = ${fx(Vp/Math.SQRT2,4)} V</div><div class="rd">콘센트 220 V는 실효값 → 최댓값 약 311 V</div>`}],
   ans:`T ${sciT(sci(T,4))} s · ω ${fx(w,4)} rad/s · ${fx(Vp/Math.SQRT2,4)} V_rms`,ansRead:`${fxR(Vp/Math.SQRT2,4)} 볼트 실효값`,calc:calcBlock([[['1','÷',...ks(f),'='],casioDec(T)],[['2','SHIFT','×10ˣ','×',...ks(f),'='],'π 꼴 → S⇔D'],[[...ks(Vp),'÷','√■','2','='],casioDec(Vp/Math.SQRT2)]],[W_PI,W_SD]),
   easy:'주파수는 1초에 몇 번 흔들리나, 주기는 한 번 흔들리는 데 걸리는 시간이에요.'}},
 reactance(base){const isL=base?false:Math.random()<.5;const f=base?1e3:pick([1e3,10e3,100e3,1e6]);const C=pick([[1e-9,'1 nF'],[10e-9,'10 nF'],[100e-9,'100 nF'],[1e-6,'1 μF']]),L=pick([[1e-3,'1 mH'],[10e-6,'10 μH'],[100e-6,'100 μH']]);const w=2*Math.PI*f;const X=isL?w*L[0]:1/(w*C[0]);
  return {kind:base?'기본':'유사',title:isL?'코일의 리액턴스':'커패시터의 리액턴스',q:`${isL?L[1]:C[1]} ${isL?'코일':'커패시터'}의 ${fx(f)} {{Hz}}에서 리액턴스는?`,first:[isL?'X_L = ωL = 2πfL':'X_C = 1/(ωC) = 1/(2πfC)'],
   steps:[{h:'ω',b:`<div class="ln">ω = 2π × ${fx(f)} = ${fx(w,4)} rad/s</div>`},{h:'리액턴스',b:`<div class="ln">${isL?`${fx(w,4)} × ${sciT(sci(L[0]))}`:`1 ÷ (${fx(w,4)} × ${sciT(sci(C[0]))})`} = ${KO(X)}</div><div class="rd">${isL?'주파수↑ → X_L↑ (코일은 고주파를 막음)':'주파수↑ → X_C↓ (콘덴서는 고주파를 통과)'}</div>`}],
   ans:KO(X),ansRead:KO(X).replace('kΩ','킬로옴').replace(' Ω',' 옴'),calc:calcBlock([[isL?['2','SHIFT','×10ˣ','×',...ks(f),'×',...K(+sci(L[0]).m,sci(L[0]).e),'=']:['1','÷','(','2','SHIFT','×10ˣ','×',...ks(f),'×',...K(+sci(C[0]).m,sci(C[0]).e),')','='],'π 꼴 → S⇔D'],[['S⇔D'],casioDec(X)]],[W_PI,W_NEG,W_SD]),
   easy:isL?'코일은 빨리 바뀌는 전류를 싫어해서, 주파수가 높을수록 더 막아요.':'콘덴서는 빨리 바뀌는 전기는 잘 통과시켜서, 주파수가 높을수록 덜 막아요.'}},
 serParG(base){const a=base?1e3:pick([100,220,470,1e3,2.2e3]),b=base?1e3:pick([330,1e3,4.7e3,10e3]);const s=a+b,p=a*b/(a+b);
  return {kind:base?'기본':'유사',title:'직렬·병렬 합성',q:`${KO(a)}과 ${KO(b)}을 직렬로, 병렬로 연결했을 때 합성 저항은?`,first:['직렬: 더하기','병렬 두 개: 곱 ÷ 합'],
   steps:[{h:'직렬',b:`<div class="ln">${a} + ${b} = ${KO(s)}</div>`},{h:'병렬',b:`<div class="ln">${a} × ${b} ÷ (${a} + ${b}) = ${KO(p)}</div><div class="rd">병렬 결과는 항상 작은 쪽(${KO(Math.min(a,b))})보다 작아야 정상${a===b?' · 같은 값 두 개면 절반':''}</div>`}],
   ans:`직렬 ${KO(s)} · 병렬 ${KO(p)}`,ansRead:`병렬 ${KO(p).replace('kΩ','킬로옴').replace(' Ω',' 옴')}`,calc:calcBlock([[[...ks(a),'×',...ks(b),'÷','(',...ks(a),'+',...ks(b),')','='],casioDec(p)]],[]),easy:'직렬은 길이 하나라 더 막히고, 병렬은 길이 둘이라 덜 막혀요.'}},
 dividerG(base){const Vin=base?5:pick([3.3,5,10]),R1=base?10e3:pick([1e3,4.7e3,10e3]),R0=base?10e3:pick([1e3,10e3]),k=base?0.8:pick([0.5,0.8,1.2,1.5,2]);const R2a=R0,R2b=R0*k;const va=Vin*R2a/(R1+R2a),vb=Vin*R2b/(R1+R2b);
  return {kind:base?'기본':'응용',title:'전압 분배로 센서 읽기',fig:FIG.serPar(),q:`V_in = ${Vin} V, 고정 저항 R₁ = ${KO(R1)}, 아래쪽 센서 R₂가 ${KO(R2a)}에서 ${KO(R2b)}로 변했다. V_out(R₂ 양단)의 변화는?`,first:['V_out = V_in·R₂/(R₁+R₂)'],
   steps:[{h:'변하기 전',b:`<div class="ln">${Vin} × ${R2a} ÷ (${R1} + ${R2a}) = ${fx(va,4)} V</div>`},{h:'변한 뒤',b:`<div class="ln">${Vin} × ${fx(R2b,4)} ÷ (${R1} + ${fx(R2b,4)}) = ${fx(vb,4)} V</div>`},{h:'변화',b:`<div class="ln">ΔV = ${fx(vb-va,4)} V</div><div class="rd">R₂${k>1?'↑ → V_out↑':'↓ → V_out↓'} · 비선형(분모에도 R₂) → 큰 변화면 브리지·선형화 필요</div>`}],
   ans:`${fx(va,4)} V → ${fx(vb,4)} V (ΔV = ${fx(vb-va,4)} V)`,ansRead:`${fxR(vb-va,4)} 볼트 변화`,calc:calcBlock([[[...ks(Vin),'×',...ks(R2b),'÷','(',...ks(R1),'+',...ks(R2b),')','='],casioDec(vb)]],[]),
   easy:'전압을 저항 크기 비율로 나눠요. 센서 몫(R₂)이 커지면 센서 쪽 전압도 커져요.'}},
 wheatBal(base){const R2=base?100:pick([100,220,1e3]),R3=base?150:pick([150,330,470,1.5e3]),R4=base?120:pick([100,120,200,680]);const R1=R2*R4/R3;
  return {kind:base?'기본':'유사',title:'브리지 평형으로 미지 저항',fig:FIG.wheat(),q:`브리지가 평형(V_o = 0)이다. R₂ = ${KO(R2)}, R₃ = ${KO(R3)}, R₄ = ${KO(R4)}일 때 센서 R₁은?`,first:['평형: R₁R₃ = R₂R₄ (마주 보는 곱)'],
   steps:[{h:'평형 조건',b:`<div class="ln">V_o = 0 → R₃/(R₂+R₃) = R₄/(R₁+R₄) → R₁R₃ = R₂R₄</div><div class="rd">그림에서 대각선(마주 보는) 저항끼리 곱</div>`},{h:'R₁',b:`<div class="ln">R₁ = R₂R₄/R₃ = ${R2} × ${R4} ÷ ${R3} = ${KO(R1)}</div>`},{h:'검산',b:`<div class="ln">${fx(R3/(R2+R3),4)} = ${fx(R4/(R1+R4),4)} ✓</div>`}],
   ans:KO(R1),ansRead:KO(R1).replace('kΩ','킬로옴').replace(' Ω',' 옴'),calc:calcBlock([[[...ks(R2),'×',...ks(R4),'÷',...ks(R3),'='],casioDec(R1)]],[]),easy:'저울이 수평이면 양쪽 비율이 같다는 뜻. 그 조건으로 모르는 저항을 찾아요.'}},
 bridgeQ(){const Vin=pick([3.3,5,10]),R=pick([120,350,1000]),d=pick([0.1,0.5,1,2]);const dR=R*d/100,R1=R+dR;const Vo=Vin*R/(2*R)-Vin*R/(R1+R);const ap=-Vin*dR/(4*R);
  return {kind:'응용',title:'1/4 브리지 근사식',fig:FIG.wheat(),q:`네 저항이 모두 ${KO(R)}인 브리지에서 센서 R₁만 ${d} % 증가했다(V_in = ${Vin} V). 정확한 V_o와 근사식 V_in·ΔR/(4R) 값을 비교하라.`,first:['V_o = V_in[R₃/(R₂+R₃) − R₄/(R₁+R₄)]','ΔR ≪ R이면 |V_o| ≈ V_in·ΔR/(4R)'],
   steps:[{h:'ΔR',b:`<div class="ln">ΔR = ${R} × ${d}/100 = ${fx(dR,4)} Ω → R₁ = ${fx(R1,5)} Ω</div>`},{h:'정확한 값',b:`<div class="ln">${Vin} × [0.5 − ${R}/(${fx(R1,5)} + ${R})] = ${fx(Vo*1e3,4)} mV</div>`},{h:'근사',b:`<div class="ln">${Vin} × ${fx(dR,4)} ÷ (4 × ${R}) = ${fx(-ap*1e3,4)} mV (부호 −)</div><div class="rd">차이 ${fx(Math.abs((Vo-ap)/Vo)*100,3)} % — 변화가 작을수록 근사가 정확 [AI 보충]</div>`}],
   ans:`정확 ${fx(Vo*1e3,4)} mV · 근사 ${fx(ap*1e3,4)} mV`,ansRead:`${fxR(Vo*1e3,4)} 밀리볼트`,calc:calcBlock([[[...ks(Vin),'×','(','0','.','5','−',...ks(R),'÷','(',...ks(+R1.toFixed(4)),'+',...ks(R),')',')','='],casioDec(Vo)]],[]),
   easy:'저항 4개가 같을 때 하나만 조금 바뀌면, 출력은 "바뀐 비율 ÷ 4 × 전압"이에요.'}},
 ampGain(base){const inv=base?true:Math.random()<.5;const Rin=pick([1e3,2.2e3,10e3]),Rf=pick([10e3,47e3,100e3,220e3]);const vin=pick([5,10,20,50]);const G=inv?-Rf/Rin:1+Rf/Rin;const vo=G*vin;
  return {kind:base?'기본':'유사',title:inv?'반전 증폭기':'비반전 증폭기',fig:FIG.opamps(),q:`${inv?`R_in = ${KO(Rin)}, R_f = ${KO(Rf)}인 반전 증폭기`:`R_g = ${KO(Rin)}, R_f = ${KO(Rf)}인 비반전 증폭기`}에 ${vin} mV를 넣으면 출력은?`,first:[inv?'G = −R_f/R_in':'G = 1 + R_f/R_g'],
   steps:[{h:'이득',b:`<div class="ln">G = ${inv?`−${Rf}/${Rin}`:`1 + ${Rf}/${Rin}`} = ${fx(G,4)}</div><div class="rd">${inv?'− = 위상(부호) 반전':'항상 1 이상, 부호 그대로'}</div>`},{h:'출력',b:`<div class="ln">${vin} mV × ${fx(G,4)} = ${fx(vo,4)} mV${Math.abs(vo)>=1000?` = ${fx(vo/1000,4)} V`:''}</div><div class="rd">실제 출력은 전원 전압을 넘을 수 없음(포화)</div>`},{h:'dB로',b:`<div class="ln">20 log|G| = ${fx(20*Math.log10(Math.abs(G)),4)} dB</div>`}],
   ans:`${fx(vo,4)} mV (G = ${fx(G,4)})`,ansRead:`${fxR(vo,4)} 밀리볼트`,calc:calcBlock([[inv?['(−)',...ks(Rf),'÷',...ks(Rin),'×',...ks(vin),'=']:['(','1','+',...ks(Rf),'÷',...ks(Rin),')','×',...ks(vin),'='],casioDec(vo)]],[]),
   easy:'저항 두 개의 비율만큼 신호가 커져요. 반전 증폭기는 거꾸로 뒤집어서 키워요.'}},
 rcFc(base){const R=base?1e3:pick([1e3,4.7e3,10e3,100e3]),C=base?[100e-9,'100 nF']:pick([[10e-9,'10 nF'],[100e-9,'100 nF'],[1e-6,'1 μF'],[1e-9,'1 nF']]);const fc=1/(2*Math.PI*R*C[0]);
  return {kind:base?'기본':'유사',title:'RC 필터 차단 주파수',fig:FIG.rcLow(),q:`R = ${KO(R)}, C = ${C[1]}인 RC 저역통과 필터의 차단 주파수는?`,first:['f_c = 1/(2πRC)','nF → × 10⁻⁹'],
   steps:[{h:'RC (시정수 τ)',b:`<div class="ln">τ = RC = ${R} × ${sciT(sci(C[0]))} = ${sciT(sci(R*C[0]))} s</div>`},{h:'f_c',b:`<div class="ln">1 ÷ (2π × ${sciT(sci(R*C[0]))}) = ${fx(fc,4)} Hz</div><div class="rd">이 주파수에서 출력 = 0.707배(−3 dB)</div>`}],
   ans:`${fx(fc,4)} Hz`,ansRead:`${fxR(fc,4)} 헤르츠`,calc:calcBlock([[['1','÷','(','2','SHIFT','×10ˣ','×',...ks(R),'×',...K(+sci(C[0]).m,sci(C[0]).e),')','='],'π 꼴 → S⇔D'],[['S⇔D'],casioDec(fc)]],[W_PI,W_NEG,W_SD]),
   easy:'R과 C가 클수록 천천히 반응해서, 더 낮은 주파수부터 걸러요.'}},
 loadErr(){const Ro=pick([1e3,10e3,100e3]),Ri=pick([10e3,100e3,1e6,10e6]),Vs=pick([1,2.5,5]);const Vm=Vs*Ri/(Ri+Ro),e=(Vm-Vs)/Vs*100;
  return {kind:'응용',title:'부하 효과 (측정기가 신호를 누른다)',q:`출력 저항 ${KO(Ro)}, 개방 전압 ${Vs} V인 센서를 입력 저항 ${KO(Ri)}인 측정기로 읽으면 몇 V로 보이고 오차는 몇 %인가?`,first:['V_측정 = V_s·R_in/(R_in + R_out)','R_in ≫ R_out이어야 정확'],
   steps:[{h:'분배',b:`<div class="ln">${Vs} × ${Ri} ÷ (${Ri} + ${Ro}) = ${fx(Vm,4)} V</div><div class="rd">센서 내부 저항과 측정기 입력 저항이 전압 분배를 만듦</div>`},{h:'오차',b:`<div class="ln">(${fx(Vm,4)} − ${Vs}) ÷ ${Vs} × 100 = ${fx(e,3)} %</div><div class="rd">${Math.abs(e)>1?'오차 큼 → 버퍼(전압 팔로워)로 R_in을 키워야':'R_in이 충분히 커서 오차 작음'}</div>`}],
   ans:`${fx(Vm,4)} V (오차 ${fx(e,3)} %)`,ansRead:`${fxR(Vm,4)} 볼트`,calc:calcBlock([[[...ks(Vs),'×',...ks(Ri),'÷','(',...ks(Ri),'+',...ks(Ro),')','='],casioDec(Vm)]],[]),
   easy:'측정기가 신호에 기대면 신호가 눌려요. 측정기 입력 저항이 클수록 가볍게 붙어요.'}},
 zMatch(base){const R=base?50:pick([30,50,75]),X=base?-10:pick([-20,-15,-10,10,15,20]),f=base?1:pick([0.5,1,2,2.4]);const w=2*Math.PI*f*1e9;const Zm=Math.hypot(R,X);const isL=X<0;const L=Math.abs(X)/w,C=1/(w*Math.abs(X));
  return {kind:base?'기본':'유사',title:'임피던스 매칭 — 허수부 지우기',q:`R_S = ${R} Ω, f₀ = ${f} GHz, Z_L = ${R} ${X<0?'−':'+'} j${Math.abs(X)} Ω이다. |Z_L|과 허수부를 없애는 직렬 소자·값은?`,first:['|Z| = √(R² + X²)',isL?'−jX → 코일(+jωL)로 지움':'+jX → 커패시터(−j/ωC)로 지움'],
   steps:[{h:'크기',b:`<div class="ln">√(${R}² + ${Math.abs(X)}²) = ${fx(Zm,4)} Ω</div>`},{h:'소자 고르기',b:`<div class="ln">허수부 ${X<0?'−':'+'}j${Math.abs(X)} → 반대 부호 ${X<0?'+':'−'}j${Math.abs(X)} 필요 → <b>${isL?'인덕터 L':'커패시터 C'}</b> 직렬</div><div class="rd">"마이너스니까 커패시터"는 반대! 지금 있는 것과 반대를 붙여요</div>`},
    {h:'값',b:isL?`<div class="ln">ωL = ${Math.abs(X)} → L = ${Math.abs(X)} ÷ (2π × ${f}×10⁹) = ${sciT(sci(L,4))} H = ${fx(L*1e9,4)} nH</div>`:`<div class="ln">1/(ωC) = ${X} → C = 1 ÷ (2π × ${f}×10⁹ × ${X}) = ${sciT(sci(C,4))} F = ${fx(C*1e12,4)} pF</div>`},{h:'결과',b:`<div class="ln">Z = ${R} Ω = R_S → 최대 전력 전달</div>`}],
   ans:`|Z_L| = ${fx(Zm,4)} Ω · ${isL?`L = ${fx(L*1e9,4)} nH`:`C = ${fx(C*1e12,4)} pF`} 직렬`,ansRead:isL?`${fxR(L*1e9,4)} 나노헨리`:`${fxR(C*1e12,4)} 피코패럿`,
   calc:calcBlock([[['√■',...ks(R),'x²','+',...ks(Math.abs(X)),'x²','='],'√ 꼴 → S⇔D'],[isL?[...ks(Math.abs(X)),'÷','(','2','SHIFT','×10ˣ','×',...K(f,9),')','=']:['1','÷','(','2','SHIFT','×10ˣ','×',...K(f,9),'×',...ks(X),')','='],casioDec(isL?L:C)],[['ENG'],isL?`${fx(L*1e9,4)}×10⁻⁹`:`${fx(C*1e12,4)}×10⁻¹²`]],[W_PI,W_SD]),
   easy:'허수부는 반대 부호끼리 더하면 0이 돼요. 그래서 반대 성질 부품을 붙여요.'}}
});
PSET.elec=[['ohmLaw',true],['ohmLaw'],['ohmLaw'],['powerP',true],['resWire',true],['resWire'],['qCharge'],['acBasic',true],['reactance',true],['reactance']];
PSET.circuit=[['serParG',true],['dividerG',true],['dividerG'],['wheatBal',true],['wheatBal'],['bridgeQ'],['ampGain',true],['ampGain'],['rcFc',true],['loadErr'],['zMatch',true],['zMatch']];
TOPICS.elec={name:'전기 기초',g:['ohmLaw','powerP','resWire','qCharge','acBasic','reactance']};
TOPICS.circuit={name:'회로 기초',g:['serParG','dividerG','wheatBal','bridgeQ','ampGain','rcFc','loadErr','zMatch']};
['ohmLaw','powerP','acBasic','reactance','serParG','dividerG','wheatBal','ampGain','rcFc'].forEach(g=>BASICG.add(g));

PAGES.elec={title:'전기 기초 — 전압·전류·저항',part:'제0편 4장',secs:[
 {k:'전하·전류',h:'전하와 전류',b:`<p class="small muted">[AI 보충] 강의 밖 기초 · 모든 센서는 결국 전기 신호로 끝나요.</p>
   <div class="syms"><span class="s">Q</span><span>[[charge|전하]] {{C}} — 전자 1개 = 1.602 × 10⁻¹⁹ C</span><span class="s">I</span><span>[[current|전류]] {{A}} = C/s — I = Q/t</span></div>
   <div class="rel mono">1 mA = 10⁻³ A,  1 μA = 10⁻⁶ A</div>`,
  easy:'전류는 1초 동안 전선 한 단면을 지나가는 전기의 양이에요. 물로 치면 "1초에 흐르는 물의 양".'},
 {k:'전압',h:'전압 — 밀어 주는 힘',b:`<div class="eqn">V = W/Q<small>[[voltage|전압]] {{V}} = J/C · 항상 두 점 사이 (보통 접지 GND 기준)</small></div>
   <div class="f4"><div><div class="h">물 비유</div>전압 = 물높이 차, 전류 = 흐르는 양, 저항 = 관의 좁음</div><div><div class="h">⚠ 비유의 한계</div>실제로는 물이 아닌 전기장이 전하를 밀고, 전자는 아주 느리게 움직이지만 신호는 거의 빛의 속도로 전달</div></div>`,
  easy:'높은 곳의 물이 아래로 흐르듯, 전압 차가 있어야 전류가 흘러요.'},
 {k:'옴의 법칙',h:'옴의 법칙 V = IR',b:`<div data-anim="ohm"></div>
   <div class="eqn">V = IR<small>[[ohmlaw|옴의 법칙]] · [[resistance|저항]] {{ohm}} · V ÷ kΩ = mA</small></div>`,
  easy:'세게 밀수록(V↑) 많이 흐르고(I↑), 좁을수록(R↑) 덜 흘러요(I↓).'},
 {k:'저항률',h:'저항은 재료 × 모양',b:`<div class="eqn">R = ρL/A<small>[[resistivity|저항률]] ρ {{ohmm}} · 길이 L↑ → R↑ · 단면적 A↑ → R↓</small></div>
   <div class="tblwrap fit"><table><tr><th>재료</th><th>ρ (Ω·m)</th><th>센서에서</th></tr><tr><td>구리</td><td class="mono">1.7×10⁻⁸</td><td class="small">배선</td></tr><tr><td>백금</td><td class="mono">1.06×10⁻⁷</td><td class="small">RTD·마이크로히터</td></tr><tr><td>니크롬</td><td class="mono">1.1×10⁻⁶</td><td class="small">히터선</td></tr><tr><td>반도체</td><td class="mono">10⁻⁵~10³</td><td class="small">가스·광·스트레인</td></tr></table></div>
   <p class="small">값은 대략적 상온값 [AI 보충]. 온도·빛·가스·변형으로 R이 변하면 그게 저항형 센서예요.</p><button class="ghost" data-goto="resist">↗ 저항형 센서 (제2편 1장)</button>`,
  easy:'긴 빨대는 빨기 힘들고(길이↑), 굵은 빨대는 쉬워요(면적↑). 재료가 막는 정도가 ρ예요.'},
 {k:'전력',h:'전력과 줄 열',b:`<div class="eqn">P = VI = I²R = V²/R<small>[[power|전력]] {{W}} = J/s · 열량 = P × t {{J}}</small></div>
   <p>저항에 전류가 흐르면 전기 에너지가 열로 바뀌어요(줄 열). 마이크로히터·자기발열 오차의 원인.</p><button class="ghost" data-goto="gas" data-i="7">↗ 마이크로히터</button>`,
  easy:'전구가 뜨거워지는 이유예요. 전류가 2배면 열은 4배(I²R).'},
 {k:'교류',h:'직류와 교류',b:`<div class="f4"><div><div class="h">[[acdc|DC]]</div>크기·방향 일정 (건전지, 센서 전원)</div><div><div class="h">AC</div>v(t) = V_p sin(ωt)</div></div>
   <div class="rel mono">T = 1/f · ω = 2πf {{rads}} · V_rms = V_p/√2 · V_pp = 2V_p</div>
   <p class="small">센서 신호 대부분은 "변하는" 신호라 주파수로도 봐요 (진동 FFT, 와전류 135 kHz, 가속도 C→V 1 MHz).</p>`,
  easy:'교류는 1초에 f번 방향이 바뀌어요. 주기 T는 한 번 바뀌는 데 걸리는 시간이에요.'},
 {k:'C·L·Z',h:'커패시터·코일·임피던스',b:`<div class="f4"><div><div class="h">[[capacitor|커패시터]] C {{F}}</div><div class="ln">Q = CV,  X_C = 1/(ωC)</div><div class="rd">DC 차단 · 고주파 통과</div></div>
   <div><div class="h">[[inductor|코일]] L {{H}}</div><div class="ln">V = L·dI/dt,  X_L = ωL</div><div class="rd">DC 통과 · 고주파 차단</div></div></div>
   <div class="eqn">Z = R + jX,  |Z| = √(R² + X²)<small>[[impedance|임피던스]] · 코일 +j, 커패시터 −j</small></div>`,
  easy:'콘덴서와 코일은 주파수에 따라 막는 정도가 달라요. 서로 반대 성질이라 부호도 반대예요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>V = IR · P = VI = I²R = V²/R</li><li>R = ρL/A — 길면↑, 굵으면↓</li><li>ω = 2πf · X_L = ωL · X_C = 1/(ωC) · |Z| = √(R²+X²)</li></ol>
   <details class="qa"><summary>주파수가 올라가면 콘덴서와 코일은?</summary><div>콘덴서 X_C↓ (잘 통과), 코일 X_L↑ (잘 막음).</div></details>
   <details class="qa"><summary>선의 지름이 절반이면 저항은?</summary><div>A가 ¼ → R은 4배.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};

PAGES.circuit={title:'회로 기초 — 전압 분배·브리지·증폭기',part:'제0편 5장',secs:[
 {k:'직렬·병렬',h:'직렬과 병렬',b:`<p class="small muted">[AI 보충] 센서 신호 처리(Signal Conditioning)의 기본 회로들이에요.</p>${FIG.serPar()}<p>[[series|직렬·병렬]]: 병렬 두 개는 <b>곱 ÷ 합</b>. 같은 값 두 개면 절반.</p>`,
  easy:'직렬은 장애물이 줄줄이, 병렬은 길이 여러 갈래예요.'},
 {k:'전압 분배',h:'전압 분배 — 저항 변화를 전압으로',b:`<div data-anim="divider"></div><div class="eqn">V_out = V_in · R₂/(R₁ + R₂)<small>[[divider|전압 분배]] · R₂ = 센서</small></div>
   <div class="flow"><div>물리량 (온도·가스·빛)</div><div>센서 저항 R₂ 변화</div><div>V_out 변화</div><div>증폭 → ADC</div></div>
   <p class="small">⚠ R₂가 분모에도 있어 출력이 비선형. 작은 변화를 정밀하게 보려면 브리지.</p>`,
  easy:'전압을 두 저항이 크기 비율대로 나눠 가져요. 센서 몫이 바뀌면 전압이 바뀌어요.'},
 {k:'브리지',h:'휘트스톤 브리지',b:`${FIG.wheat()}
   <div class="eqn">V_o = V_in[R₃/(R₂+R₃) − R₄/(R₁+R₄)]<small>평형(V_o = 0): R₁R₃ = R₂R₄ · 1/4 브리지 근사 |V_o| ≈ V_in·ΔR/(4R)</small></div>
   <ul class="clean"><li>두 전압 분배기의 <b>차이</b>만 봄 → 0 근처에서 작은 변화를 크게 증폭 가능</li><li>기준 저항을 센서와 같은 재료로 → 온도 보상</li></ul>
   <button class="ghost" data-goto="gas" data-i="4">↗ 수소센서 브리지 애니메이션</button>`,
  easy:'양팔 저울과 같아요. 평소엔 수평(0 V), 센서가 조금만 바뀌어도 기울어요.',src:'【휘트스톤 브리지 — 가스센서 장의 식과 같은 배치】'},
 {k:'증폭기',h:'op-amp 증폭기',b:`${FIG.opamps()}
   <div class="f4"><div><div class="h">[[opamp|이상적 op-amp]]</div>입력 전류 0 · 두 입력 전압 같음 · 이득 무한대</div><div><div class="h">전압 팔로워 (버퍼)</div>이득 1, 입력 저항 매우 큼 → [[loading|부하 효과]] 방지</div>
    <div><div class="h">[[instamp|계측 증폭기]]</div>브리지 mV 출력의 차이만 증폭 · 공통 잡음 제거(CMRR)</div></div>`,
  easy:'센서 신호는 mV로 아주 작아요. 저항 두 개 비율만큼 키워서 ADC가 읽을 수 있게 해요.'},
 {k:'필터',h:'RC 저역통과 필터',b:`${FIG.rcLow()}<div class="eqn">f_c = 1/(2πRC)<small>[[lowpass|저역통과]] · τ = RC · f_c에서 0.707배(−3 dB)</small></div>
   <p class="small">ADC 앞에서 샘플링 주파수의 절반보다 빠른 성분을 줄여요(안티앨리어싱). [현업] 공장 4–20 mA 신호선의 잡음 제거에도.</p>`,
  easy:'느린 센서 값은 통과, 빠른 잡음은 걸러요.'},
 {k:'매칭·부하',h:'임피던스 매칭과 부하 효과',b:`<div class="f4"><div><div class="h">전력을 최대로 (RF·초음파)</div><div class="ln">R_L = R_S,  Z_L = Z_S*</div><div class="rd">허수부: −jX → 코일, +jX → 커패시터 직렬</div></div>
   <div><div class="h">전압을 정확히 (대부분 센서)</div><div class="ln">R_in ≫ R_out</div><div class="rd">측정기가 신호를 누르지 않게 → 버퍼</div></div></div>
   <p>[[zmatch|임피던스 매칭]]은 목적에 따라 다른 조건! "에너지 전달"이면 같게, "전압 읽기"면 입력 저항을 아주 크게.</p>`,
  easy:'공을 던져 주는 사람과 받는 사람이 손 크기가 맞아야 힘이 다 전달돼요(매칭). 반대로 온도계로 물 온도를 잴 땐 온도계가 물을 식히면 안 되죠(부하 효과).'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'기출·숙제',h:'',b:'__MT:t2__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>V_out = V_in·R₂/(R₁+R₂) · 병렬 = 곱 ÷ 합</li><li>브리지 평형 R₁R₃ = R₂R₄ · 근사 V_in·ΔR/(4R)</li><li>반전 −R_f/R_in · 비반전 1 + R_f/R_g · f_c = 1/(2πRC) · 최대 전력 R_L = R_S</li></ol>
   <details class="qa"><summary>브리지가 전압 분배기보다 좋은 점은?</summary><div>평형점(0 V) 근처 작은 변화를 크게 증폭할 수 있고, 같은 재료 기준 저항으로 온도 보상 가능.</div></details>
   <details class="qa"><summary>Z_L = 50 − j10에서 허수부를 지우려면?</summary><div>+j10이 필요 → 인덕터 직렬, ωL = 10.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'e1',tag:'전기',f:'옴의 법칙과 전력 식',a:'V = IR · P = VI = I²R = V²/R',r:'',e:''},
 {id:'e2',tag:'전기',f:'R = ρL/A에서 지름이 2배면?',a:'A 4배 → R ¼배',r:'',e:''},
 {id:'e3',tag:'전기',f:'X_L, X_C 식과 주파수↑일 때',a:'X_L = ωL ↑ · X_C = 1/(ωC) ↓',r:'',e:''},
 {id:'e4',tag:'전기',f:'사인파 실효값',a:'V_rms = V_p/√2',r:'220 V 실효 → 최댓값 311 V',e:''},
 {id:'e5',tag:'회로',f:'전압 분배 식',a:'V_out = V_in·R₂/(R₁+R₂)',r:'R₂ 양단',e:''},
 {id:'e6',tag:'회로',f:'휘트스톤 브리지 평형 조건',a:'R₁R₃ = R₂R₄',r:'마주 보는 곱이 같음',e:''},
 {id:'e7',tag:'회로',f:'반전·비반전 증폭기 이득',a:'−R_f/R_in · 1 + R_f/R_g',r:'',e:''},
 {id:'e8',tag:'회로',f:'RC 저역통과 차단 주파수',a:'f_c = 1/(2πRC), −3 dB',r:'',e:''},
 {id:'e9',tag:'회로',f:'최대 전력 전달 조건',a:'R_L = R_S (복소수면 Z_L = Z_S*)',r:'−jX는 코일로, +jX는 커패시터로 상쇄',e:''},
 {id:'e10',tag:'회로',f:'부하 효과를 줄이려면',a:'측정기 입력 저항 ≫ 센서 출력 저항 (버퍼)',r:'',e:''}
);
