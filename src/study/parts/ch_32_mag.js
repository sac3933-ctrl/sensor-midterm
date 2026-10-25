/* ═════════ 제3편 2장 자기센서 ═════════ */
Object.assign(TERM,{
 magmoment:{ko:'자기 모멘트',en:'Magnetic moment',gen:'원자 하나가 가진 아주 작은 자석.',tech:'전자의 궤도운동(orbital)과 스핀(spin)에 의한 자기 모멘트. 원자 단위로는 미소 원형 전류 루프로 볼 수 있다. 배열에 따라 자성체 종류가 정해진다.',easy:'원자 하나하나가 아주 작은 나침반 바늘이라고 생각하면 돼요.'},
 magnetization:{ko:'자화',en:'Magnetization (M)',gen:'작은 자석들이 한 방향으로 줄 선 정도.',tech:'자성체 내부 자기 모멘트가 특정 방향으로 정렬된 상태. 외부 자계를 가하면 자구벽이 이동하고 자구가 회전·정렬한다.',easy:'제각각이던 나침반 바늘들이 같은 방향을 보는 정도.'},
 domain:{ko:'자구·자구벽',en:'Magnetic domain · domain wall',gen:'같은 방향을 보는 작은 구역과 그 경계.',tech:'자성체 안에서 자화 방향이 같은 영역(자구)과 그 경계(자구벽). 외부 자계로 벽이 이동하고 자구가 회전한다.',easy:'운동장에 반별로 같은 방향을 보고 선 무리와, 반과 반 사이 경계선.'},
 ferro:{ko:'강자성체',en:'Ferromagnet',gen:'자석에 잘 붙고 자석이 될 수 있는 물질.',tech:'Fe, Ni, Co. 이웃 모멘트가 같은 방향으로 정렬. 페리자성: 페라이트 Fe₃O₄ · 상자성: Al, Pt, Cr, O₂ · 반자성: Cu, Ag, Au, H₂O(외부와 반대로 아주 약하게 자화).',easy:'철·니켈·코발트처럼 자석에 착 붙는 물질.'},
 softhard:{ko:'연자성·경자성',en:'Soft · Hard magnet',gen:'자기장을 치우면 원래대로 vs 그대로.',tech:'연자성체: 자계 제거 시 자화가 쉽게 사라짐(작은 보자력) — 센서·코어. 경자성체(영구자석): 자화가 남음(큰 잔류자화·보자력).',easy:'연자성은 금방 잊는 자석, 경자성은 오래 기억하는 자석.'},
 easyaxis:{ko:'자화 용이축·곤란축',en:'Easy axis · Hard axis',gen:'자화가 잘 되는 방향과 안 되는 방향.',tech:'결정 방향에 따른 자기 이방성. Fe(BCC): <100> 용이축, <111> 곤란축. 자기센서 초기 자화 방향은 보통 용이축.',easy:'나무를 결 따라 쪼개면 쉽고, 결을 거스르면 어려운 것처럼요.'},
 curie:{ko:'큐리 온도',en:'Curie temperature',gen:'자석 성질이 사라지는 온도.',tech:'온도가 오르면 모멘트 배열이 흐트러져 자성을 잃는 온도. Fe 770 °C, Co 1127 °C, Ni 358 °C.',easy:'자석을 아주 뜨겁게 하면 자석 힘이 없어지는 온도예요.'},
 amr:{ko:'이방성 자기저항',en:'AMR (Anisotropic MagnetoResistance)',gen:'자화와 전류의 각도에 따라 저항이 변함.',tech:'강자성체(NiFe)에서 전류와 자화가 평행이면 저항 최대, 수직이면 최소. R(θ) = R_min + ΔR cos²θ. 변화율 수 %. 스핀-궤도 결합(SOC)에 의한 산란 차이.',easy:'전류와 내부 자석 방향이 나란하면 길이 막히고, 엇갈리면 뚫려요.'},
 barber:{ko:'바버 폴 바이어스',en:'Barber-pole biasing',gen:'45° 줄무늬로 전류 방향을 기울이는 방법.',tech:'NiFe 위에 저항이 매우 낮은 Al 단락 바를 약 45°로 배치해 NiFe 내부 유효 전류 방향을 45°로 만든다 → M과 I가 45° → 선형 영역에서 동작.',easy:'이발소 기둥 같은 비스듬한 줄로 전류를 45° 기울여 직선 구간에서 쓰는 요령.'},
 gmr:{ko:'거대 자기저항',en:'GMR (Giant MagnetoResistance)',gen:'얇은 층을 쌓아 저항 변화를 크게 만든 것.',tech:'강자성/비자성(Cu, Cr) 다층막. 두 강자성층 자화가 평행이면 저항 최소, 반평행이면 최대. 스핀 의존 산란. 1988년 약 70 % 변화 관측(노벨상). ΔR/R = (R_ap − R_p)/R_ap.',easy:'같은 방향을 보는 층들 사이로는 전자가 술술, 반대 방향이면 계속 부딪혀요.'},
 spindep:{ko:'스핀 의존 산란',en:'Spin-dependent scattering',gen:'전자의 스핀 방향에 따라 부딪히는 정도가 다름.',tech:'자화와 같은 스핀의 전자는 산란이 작고, 반대 스핀은 크다. 층 두께가 평균자유행정(수십 nm)보다 얇아야(약 10 nm 이하) 효과가 크다.',easy:'같은 편 유니폼(스핀)은 통과, 다른 편은 막혀요.'},
 spinvalve:{ko:'스핀 밸브',en:'Spin valve',gen:'한 층은 고정, 한 층만 돌아가는 GMR.',tech:'반강자성체에 교환결합으로 고정된 고정층(pinned) + 자유층(free, 연자성) + 비자성층. 비대칭 자기저항 특성.',easy:'한쪽 문은 고정, 한쪽 문만 바람(자기장)에 돌아가는 구조.'},
 squid:{ko:'스퀴드',en:'SQUID (Superconducting QUantum Interference Device)',gen:'초전도로 아주아주 약한 자기장을 재는 센서.',tech:'초전도 링 + 조셉슨 접합(DC SQUID 2개, RF SQUID 1개). 바이어스 전류에서 출력 전압이 자속양자 Φ₀ 주기로 진동 → 극미약 자계(뇌 ~fT) 측정. 극저온 냉각 필요.',easy:'뇌에서 나오는 아주 작은 자기장까지 잴 수 있는, 엄청 차갑게 식혀 쓰는 초정밀 센서.'},
 josephson:{ko:'조셉슨 접합',en:'Josephson junction',gen:'초전도체 두 개 사이에 아주 얇은 절연막.',tech:'Nb | AlOₓ(수 nm) | Nb. 쿠퍼 쌍이 절연막을 터널링. 임계전류 I_c까지는 전압 없이 전류가 흐름(DC 조셉슨 효과).',easy:'얇은 벽을 유령처럼 통과하는 전자 짝꿍들.'},
 superc:{ko:'초전도체',en:'Superconductor',gen:'아주 차가울 때 저항이 0이 되는 물질.',tech:'임계온도 T_c 이하에서 저항 0 + 완전 반자성. 저온(Nb, 액체 He) · 고온(YBCO, 액체 N₂ 77 K).',easy:'얼음보다 훨씬 차갑게 식히면 전기가 하나도 안 막히고 흘러요.'}
});
Object.assign(UNIT,{
 Oe:{s:'Oe',r:'에르스텟',mean:'자계 H의 옛 단위. 공기 중 1 Oe ≈ 1 G'},
 Am:{s:'A/m',r:'암페어 퍼 미터',mean:'자계 H의 SI 단위. B = μ₀H, 12 A/m ≈ 0.15 G'},
 Hm:{s:'H/m',r:'헨리 퍼 미터',mean:'투자율 단위. μ₀ = 4π × 10⁻⁷ H/m'},
 fT:{s:'fT',r:'펨토테슬라',mean:'1 fT = 10⁻¹⁵ T. 뇌 자기장 수준'},
 nT:{s:'nT',r:'나노테슬라',mean:'1 nT = 10⁻⁹ T = 10⁻⁵ G'},
 Wb:{s:'Wb',r:'웨버',mean:'자속 단위. 1 T = 1 Wb/m²'}
});
FORM.push(
 {eq:'1 T = 10⁴ G',read:'1 테슬라는 만 가우스',name:'자기장 단위',page:'mag',sec:2,syms:[]},
 {eq:'B = μ₀ H',read:'비는 뮤 제로 에이치',name:'자속밀도-자계',page:'mag',sec:2,syms:[['μ₀','4π × 10⁻⁷','Hm'],['H','자계','Am'],['B','자속밀도','T']]},
 {eq:'R(θ) = R_min + ΔR cos²θ',read:'코사인 제곱 세타',name:'AMR 저항',page:'mag',sec:4,syms:[]},
 {eq:'ΔR/R = (R_ap − R_p)/R_ap',read:'반평행 빼기 평행 나누기 반평행',name:'GMR 비',page:'mag',sec:5,syms:[]},
 {eq:'최대 거리 = λ/2π, λ = c/f',read:'람다 나누기 2파이',name:'자기장 통신 거리',page:'mag',sec:7,syms:[]}
);

/* 움직이는 그림 */
ANIM.domain=host=>{let H=0;const D=[];for(let r=0;r<4;r++)for(let c=0;c<6;c++)D.push({a:Math.random()*6.28,x:40+c*48,y:40+r*40});
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 215" role="img" aria-label="자구 정렬"></svg><div class="figctl"><label class="small">외부 자계 H → <input type="range" min="0" max="1" step="0.02" value="0" data-h style="width:150px"></label></div>
   <figcaption>H = 0이면 자구들이 제각각이라 전체 자화 ≈ 0. H를 키우면 <b>자구벽이 이동하고 자구가 회전</b>해 H 방향으로 정렬 → 자화 M이 커져요.</figcaption></figure>`;
  const svg=host.querySelector('svg');
  const L=loop(()=>{let s='',mx=0;D.forEach(d=>{const tgt=0;const da=((tgt-d.a+Math.PI*3)%(Math.PI*2))-Math.PI;const a=d.a+da*H;mx+=Math.cos(a);const dx=16*Math.cos(a),dy=-16*Math.sin(a);
    s+=`<rect x="${d.x-22}" y="${d.y-18}" width="44" height="36" style="fill:var(--surface);stroke:var(--line)"/><line x1="${(d.x-dx).toFixed(1)}" y1="${(d.y-dy).toFixed(1)}" x2="${(d.x+dx).toFixed(1)}" y2="${(d.y+dy).toFixed(1)}" style="stroke:var(--bad);stroke-width:2.6"/><circle cx="${(d.x+dx).toFixed(1)}" cy="${(d.y+dy).toFixed(1)}" r="3.4" style="fill:var(--bad)"/>`});
   s+=`${tx(10,200,`H ${H>0?'→':''}  ·  자화 M ≈ ${(mx/D.length*100).toFixed(0)} %`,'b2')}`;svg.innerHTML=s});
  host.querySelector('[data-h]').oninput=e=>{H=+e.target.value};return L.stop};

ANIM.amrc=host=>{let th=45;const Rmin=100,dR=3;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 220" role="img" aria-label="AMR 저항 곡선"></svg><div class="figctl"><label class="small">M과 I 사이 각 θ <input type="range" min="0" max="180" step="1" value="45" data-t style="width:150px"> <b data-tv>45°</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>θ = 0°(평행) 저항 최대, 90°(수직) 최소. <b>45° 근처가 직선 구간</b>이라 바버 폴로 45°에 맞춰 써요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);const X=t=>40+t/180*280,Y=R=>190-(R-Rmin)/dR*150;
  const draw=()=>{let d='';for(let t=0;t<=180;t+=3)d+=(t?'L':'M')+X(t).toFixed(1)+' '+Y(Rmin+dR*Math.cos(t*Math.PI/180)**2).toFixed(1);const R=Rmin+dR*Math.cos(th*Math.PI/180)**2;
   svg.innerHTML=`<line x1="40" y1="190" x2="324" y2="190" style="stroke:var(--ink)"/><line x1="40" y1="190" x2="40" y2="30" style="stroke:var(--ink)"/>${[0,45,90,135,180].map(t=>`<text x="${X(t)}" y="206" text-anchor="middle" class="small2">${t}°</text>`).join('')}
    <rect x="${X(25)}" y="30" width="${X(65)-X(25)}" height="160" style="fill:var(--accent-soft);opacity:.7"/>${tx(X(45),26,'직선 구간','a small2','middle')}
    <path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:2.4"/><circle cx="${X(th)}" cy="${Y(R)}" r="6" style="fill:var(--bad)"/>${tx(36,Y(Rmin+dR)+4,'R_max','small2','end')}${tx(36,Y(Rmin)+4,'R_min','small2','end')}`;
   q('[data-o]').innerHTML=`R(θ) = R_min + ΔR·cos²θ = ${Rmin} + ${dR} × cos²${th}° = <b>${R.toFixed(3)} Ω</b>`;q('[data-tv]').textContent=th+'°'};
  q('[data-t]').oninput=e=>{th=+e.target.value;draw()};draw();return null};

ANIM.gmrx=host=>{let par=false;const E=Array.from({length:10},(_,i)=>({x:Math.random()*300,up:i%2===0,y:0}));
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 210" role="img" aria-label="GMR 스핀 의존 산란"></svg><div class="figctl"><button class="tbtn" data-h aria-pressed="false">외부 자계 H 걸기 → 평행</button></div>
   <div class="tofcalc small" data-o></div></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const L=loop(tp=>{const lay=(y,dir,lb)=>`<rect x="20" y="${y}" width="300" height="34" style="fill:var(--warn-soft);stroke:var(--warn)"/>${[0,1,2,3,4].map(k=>ar(50+k*60-(dir>0?-14:14),y+17,50+k*60+(dir>0?14:-14),y+17,'w',2.4)).join('')}${tx(316,y+12,lb,'small2','end')}`;
   let s=lay(30,1,'강자성 1')+`<rect x="20" y="64" width="300" height="40" style="fill:var(--surface2);stroke:var(--line)"/>${tx(316,88,'비자성 (Cu)','m small2','end')}`+lay(104,par?1:-1,'강자성 2');
   E.forEach((e,i)=>{const blocked=!par||!e.up;e.x+=blocked?1.1:2.4;if(e.x>300)e.x=0;const jig=blocked?6*Math.sin(tp*9+i):0;const y=78+(i%3)*8+jig;
    s+=`<circle cx="${20+e.x}" cy="${y.toFixed(1)}" r="5" style="fill:${e.up?'var(--accent)':'var(--unit)'}"/>${tx(20+e.x,y+4,e.up?'↑':'↓','small2','middle').replace('class="small2"','class="small2" style="fill:#fff"')}`});
   s+=`${tx(10,172,'● ↑ 스핀 업 전자  ● ↓ 스핀 다운 전자','small2')}${tx(10,196,par?'평행: 스핀 업은 거의 산란 없이 통과 → 저항 최소 R_p':'반평행: 두 스핀 모두 어딘가에서 산란 → 저항 최대 R_ap','b2')}`;svg.innerHTML=s});
  const upd=()=>{q('[data-h]').setAttribute('aria-pressed',String(par));q('[data-h]').textContent=par?'H 끄기 → 반평행으로':'외부 자계 H 걸기 → 평행';q('[data-o]').innerHTML=`ΔR/R = (R_ap − R_p)/R_ap · AMR은 수 %, GMR은 수십 % (1988년 약 70 %)<br>층 두께는 평균자유행정보다 얇게 (약 10 nm 이하)`};
  q('[data-h]').onclick=()=>{par=!par;upd()};upd();return L.stop};

Object.assign(FIG,{
 fieldScale(){const items=[[-15,'뇌 (MEG)','~1 fT'],[-9,'심장 (MCG)','nT 이하'],[-5,'지구 자기장','0.25~0.65 G'],[-2,'냉장고 자석','~10 mT'],[0,'MRI','1~3 T'],[1,'초전도 자석','수십 T']];const X=e=>20+(e+16)/18*300;
  return svgFig(340,190,`<line x1="20" y1="70" x2="320" y2="70" style="stroke:var(--ink);stroke-width:2"/>${[-15,-12,-9,-6,-3,0].map(e=>`<line x1="${X(e)}" y1="64" x2="${X(e)}" y2="76" style="stroke:var(--ink)"/><text x="${X(e)}" y="92" text-anchor="middle" class="small2">10${sup(e)} T</text>`).join('')}
   ${items.map(([e,a,b],i)=>`<circle cx="${X(e)}" cy="70" r="5" style="fill:var(--bad)"/><text x="${X(e)}" y="${i%2?118:44}" text-anchor="middle" class="b2" style="font-size:11.5px">${a}</text><text x="${X(e)}" y="${i%2?132:30}" text-anchor="middle" class="small2" style="font-size:10.5px">${b}</text>`).join('')}
   <rect x="${X(-16)}" y="146" width="${X(-8)-X(-16)}" height="12" style="fill:var(--unit-soft)"/>${tx((X(-16)+X(-8))/2,174,'SQUID (< 1 G)','u small2','middle')}
   <rect x="${X(-8)}" y="146" width="${X(-3)-X(-8)}" height="12" style="fill:var(--accent-soft)"/>${tx((X(-8)+X(-3))/2,174,'AMR·MI (1~10 G)','a small2','middle')}
   <rect x="${X(-3)}" y="146" width="${X(1)-X(-3)}" height="12" style="fill:var(--warn-soft)"/>${tx((X(-3)+X(1))/2,174,'홀·GMR (> 10 G)','small2','middle')}`,'자기장 세기 눈금 (로그)','한 칸이 1000배예요. 뇌 자기장(fT)부터 초전도 자석(수십 T)까지 10¹⁶배 차이. 센서도 세기에 따라 다른 종류를 써요.')},
 squidV(){let d='';for(let i=0;i<=200;i++){const p=i/200*3;d+=(i?'L':'M')+(40+i*1.4).toFixed(1)+' '+(110-40*Math.abs(Math.cos(Math.PI*p))).toFixed(1)}
  return svgFig(340,170,`<line x1="40" y1="140" x2="326" y2="140" style="stroke:var(--ink)"/><line x1="40" y1="140" x2="40" y2="40" style="stroke:var(--ink)"/>${tx(322,156,'외부 자속 Φ →','small2','end')}${tx(46,40,'출력 V','small2')}
   <path d="${d}" style="fill:none;stroke:var(--unit);stroke-width:2.4"/>${[0,1,2,3].map(k=>`<line x1="${40+k*93.3}" y1="140" x2="${40+k*93.3}" y2="146" style="stroke:var(--ink)"/><text x="${40+k*93.3}" y="160" text-anchor="middle" class="small2">${k}Φ₀</text>`).join('')}
   ${ar(40,30,133,30,'b',1.4,'2')}${tx(86,24,'한 주기 = Φ₀','b small2','middle')}`,'DC SQUID 출력 전압','바이어스 전류를 임계전류보다 조금 크게 두면, 출력 전압이 <b>자속양자 Φ₀마다</b> 반복해서 출렁여요. 주기를 세고 국부적인 직선 구간을 써서 아주 작은 자기장을 재요.')},
 solenoid(){return svgFig(340,140,`${[0,1,2,3,4,5,6].map(k=>`<ellipse cx="${90+k*24}" cy="70" rx="10" ry="34" style="fill:none;stroke:var(--warn);stroke-width:3"/>`).join('')}${ar(60,70,280,70,'b',3)}${tx(286,74,'N','b b2')}${tx(52,74,'S','b2','end')}
   ${tx(170,128,'오른손 네 손가락 = 전류 감는 방향 → 엄지 = N극 (자계 방향)','small2','middle')}${tx(170,20,'솔레노이드: 절연 구리선을 여러 번 감은 코일','small2','middle')}`,'오른손 법칙')}
});

/* 문제 */
Object.assign(GEN,{
 magUnit(){const mode=pick(['T2G','G2T','Am2G']);
  if(mode==='T2G'){const v=pick([0.05,0.1,0.25,1.5,3]);return {kind:'유사',title:'테슬라 → 가우스',q:`MRI 자석이 ${v} {{T}}이다. 몇 {{G}}인가?`,first:['1 T = 10⁴ G'],steps:[{h:'관계',b:`<div class="ln">1 T = 10⁴ G (공기 중 1 G ≈ 1 Oe)</div>`},{h:'계산',b:`<div class="ln">${v} × 10⁴ = ${fx(v*1e4,4)} G</div>`},{h:'감 잡기',b:`<div class="rd">지구 자기장 0.25~0.65 G의 약 ${fx(v*1e4/0.5,3)}배</div>`}],ans:`${fx(v*1e4,4)} G`,ansRead:`${fxR(v*1e4,4)} 가우스`,calc:calcBlock([[[...ks(v),'×','1','×10ˣ','4','='],casioDec(v*1e4)]],[]),easy:'테슬라는 큰 단위, 가우스는 작은 단위. 1 T = 1만 G.'}}
  if(mode==='G2T'){const v=pick([0.5,0.25,0.65,10,250]);const T=v*1e-4;return {kind:'유사',title:'가우스 → 테슬라',q:`자기장 ${v} {{G}}는 몇 {{T}}이고 몇 μT인가?`,first:['1 G = 10⁻⁴ T','T → μT: × 10⁶'],steps:[{h:'관계',b:`<div class="ln">1 G = 10⁻⁴ T</div>`},{h:'계산',b:`<div class="ln">${v} × 10⁻⁴ = ${sciT(sci(T))} T</div><div class="ln">= ${fx(T*1e6,4)} μT</div>`},{h:'검산',b:`<div class="rd">지구 자기장 0.5 G = 50 μT ✓ 기준</div>`}],ans:`${sciT(sci(T))} T = ${fx(T*1e6,4)} μT`,ansRead:`${fxR(T*1e6,4)} 마이크로테슬라`,calc:calcBlock([[[...ks(v),'×','1','×10ˣ','(−)','4','='],casioDec(T)]],[W_NEG]),easy:'가우스에서 테슬라로는 1만으로 나눠요.'}}
  const H=pick([5,12,80,1000]);const B=4*Math.PI*1e-7*H;return {kind:'응용',title:'A/m → 가우스 (인체 기준)',q:`자계 H = ${H} {{Am}}일 때 공기 중 자속밀도 B는 몇 {{G}}인가? (B = μ₀H, μ₀ = 4π × 10⁻⁷ {{Hm}})`,first:['B = μ₀H (T)','T → G: × 10⁴'],
   steps:[{h:'B 계산',b:`<div class="ln">B = 4π × 10⁻⁷ × ${H} = ${sciT(sci(B))} T</div>`},{h:'가우스로',b:`<div class="ln">${sciT(sci(B))} × 10⁴ = ${fx(B*1e4,3)} G</div>`},{h:'참고',b:`<div class="rd">강의: 150 kHz 미만 인체보호기준 직업인 12 A/m(≈ 0.15 G), 일반인 5 A/m(≈ 0.06 G)</div>`}],
   ans:`${fx(B*1e4,3)} G`,ansRead:`${fxR(B*1e4)} 가우스`,calc:calcBlock([[['4','×','SHIFT','×10ˣ','×','1','×10ˣ','(−)','7','×',...ks(H),'×','1','×10ˣ','4','='],casioDec(B*1e4),'π 꼴이면 S⇔D']],[W_PI,W_NEG]),easy:'H(A/m)에 μ₀를 곱하면 테슬라, 거기에 1만을 곱하면 가우스.'}},
 amrR(){const Rmin=pick([100,500,1000]),pct=pick([2,2.5,3,4]),th=pick([0,30,45,60,90]);const dR=Rmin*pct/100,R=Rmin+dR*Math.cos(th*Math.PI/180)**2;
  return {kind:'응용',title:'AMR 저항 계산',q:`AMR 소자: R_min = ${Rmin} {{ohm2}}, ΔR/R_min = ${pct} %. 자화 M과 전류 I 사이 각이 ${th}°일 때 저항은?`,first:['R = R_min + ΔR cos²θ','ΔR = R_min × %'],
   steps:[{h:'ΔR',b:`<div class="ln">ΔR = ${Rmin} × ${pct/100} = ${fx(dR,4)} Ω</div>`},{h:'cos²θ',b:`<div class="ln">cos ${th}° = ${Math.cos(th*Math.PI/180).toFixed(4)} → 제곱 ${(Math.cos(th*Math.PI/180)**2).toFixed(4)}</div>`},{h:'R',b:`<div class="ln">R = ${Rmin} + ${fx(dR,4)} × ${(Math.cos(th*Math.PI/180)**2).toFixed(4)} = ${fx(R,6)} Ω</div>`},{h:'해석',b:`<div class="rd">0°(평행) 최대, 90°(수직) 최소, 45°는 중간 → 직선 구간</div>`}],
   ans:`R ≈ ${fx(R,6)} Ω`,ansRead:`${fxR(R,6)} 옴`,calc:calcBlock([[['SHIFT','MODE','3'],'Deg'],[[...ks(Rmin),'+',...ks(dR),'×','(','cos',...ks(th),')',')','x²','='],casioDec(R)]],[W_DEG,'cos 값을 괄호로 묶고 제곱']),easy:'전류와 자석 방향이 나란하면 저항이 제일 크고, 직각이면 제일 작아요.'}},
 gmrRatio(){const Rp=pick([10,20,50,100]),k=pick([1.1,1.3,1.5,1.7,2]);const Rap=+(Rp*k).toFixed(1),r=(Rap-Rp)/Rap*100;
  return {kind:'응용',title:'GMR 자기저항 비',q:`GMR 소자의 평행 상태 저항 R_p = ${Rp} {{ohm2}}, 반평행 상태 R_ap = ${Rap} Ω이다. ΔR/R = (R_ap − R_p)/R_ap는 몇 %인가?`,first:['ΔR/R = (R_ap − R_p)/R_ap','기준은 R_ap(초기 저항)'],
   steps:[{h:'차이',b:`<div class="ln">${Rap} − ${Rp} = ${fx(Rap-Rp,4)} Ω</div>`},{h:'비율',b:`<div class="ln">${fx(Rap-Rp,4)} ÷ ${Rap} × 100 = ${fx(r,3)} %</div><div class="rd">강의 정의는 반평행(초기) 저항으로 나눔</div>`},{h:'비교',b:`<div class="rd">AMR 수 %에 비해 크다 → "거대" 자기저항</div>`}],
   ans:`${fx(r,3)} %`,ansRead:`${fxR(r)} 퍼센트`,calc:calcBlock([[['(',...ks(Rap),'−',...ks(Rp),')','÷',...ks(Rap),'×','1','0','0','='],casioDec(r)]],[]),easy:'반대 방향(높은 저항)에서 같은 방향(낮은 저항)으로 바뀔 때 몇 % 떨어지는지예요.'}},
 magRange(){const f=pick([13.56e6,125e3,135e3,1e6]);const lam=3e8/f,d=lam/(2*Math.PI);
  return {kind:'응용',title:'자기장 통신 최대 거리',q:`자기장 안테나의 근거리장 통신 한계를 λ/2π로 본다. 주파수 ${f>=1e6?fx(f/1e6,4)+' {{MHz}}':fx(f/1e3,4)+' {{kHz}}'}일 때 최대 거리는 몇 m인가? (c = 3 × 10⁸ m/s)`,first:['λ = c/f','d = λ/2π','kHz·MHz → Hz'],
   steps:[{h:'Hz로',b:`<div class="ln">f = ${sciT(sci(f))} Hz</div>`},{h:'파장',b:`<div class="ln">λ = 3 × 10⁸ ÷ ${sciT(sci(f))} = ${fx(lam,4)} m</div>`},{h:'÷ 2π',b:`<div class="ln">${fx(lam,4)} ÷ (2 × 3.1416) = ${fx(d,4)} m</div><div class="rd">강의 예: 135 kHz → 약 350 m</div>`}],
   ans:`약 ${fx(d,4)} m`,ansRead:`${fxR(d,4)} 미터`,calc:calcBlock([[['3','×10ˣ','8','÷',...K(+sci(f).m,sci(f).e),'÷','(','2','×','SHIFT','×10ˣ',')','='],casioDec(d)]],[W_PI,'분모 2π를 괄호로']),easy:'주파수가 낮을수록 파장이 길어서 더 멀리까지 자기장으로 통신할 수 있어요.'}}
});
PSET.mag=[['magUnit'],['magUnit'],['amrR'],['gmrRatio'],['magRange']];
TOPICS.mag={name:'자기센서',g:['magUnit','amrR','gmrRatio','magRange']};BASICG.add('magUnit');

PAGES.mag={title:'자기센서',part:'제3편 2장',secs:[
 {k:'자성의 근원',h:'자기장은 어디서 오나',b:`<p>원자 속 전자의 <b>궤도 운동</b>과 <b>스핀</b>이 만드는 [[magmoment]] — 원자 하나 = 아주 작은 원형 전류 고리</p>
   <ul class="clean"><li>자계가 없으면 스핀 방향이 무작위 → 순자화 ≈ 0</li><li>자계를 걸면 스핀 모멘트가 자기장 축으로 세차운동 → 순자화 발생</li></ul>${FIG.solenoid()}`,
  easy:'모든 원자 안에 아주 작은 자석이 있어요. 평소엔 제멋대로라 상쇄되고, 자석을 대면 줄을 서요.',
  src:'【전자의 궤도운동에 의한 orbital magnetic moment, 전자의 spin 운동에 의한 spin magnetic moment】'},
 {k:'자화·자성체',h:'자화와 자성체의 종류',b:`<div data-anim="domain"></div>
   <div class="tblwrap"><table><tr><th>종류</th><th>예</th><th>특징</th></tr><tr><td>[[ferro|강자성]]</td><td>Fe, Ni, Co</td><td>강하게 자화</td></tr><tr><td>페리자성</td><td>페라이트 Fe₃O₄</td><td>반대 방향 모멘트 크기 차이</td></tr><tr><td>상자성</td><td>Al, Pt, Cr, O₂</td><td>약하게 같은 방향</td></tr><tr><td>반자성</td><td>Cu, Ag, Au, H₂O</td><td>아주 약하게 반대 방향</td></tr></table></div>
   <div class="f4"><div><div class="h">[[softhard|연자성 vs 경자성]]</div>자계를 치우면 자화가 사라지나(연) 남나(경, 영구자석)</div><div><div class="h">[[easyaxis|용이축·곤란축]]</div>Fe(BCC): &lt;100&gt; 용이축, &lt;111&gt; 곤란축 · 센서 초기 자화는 용이축으로</div><div><div class="h">[[curie|큐리 온도]]</div>Fe 770 °C · Co 1127 °C · Ni 358 °C 넘으면 자성 상실</div></div>`,
  easy:'철·니켈·코발트는 자석에 잘 붙고, 구리·금은 아주 살짝 밀어내요. 너무 뜨거워지면 자석 성질이 사라져요.',
  src:'【강자성체: 니켈(Ni), 철(Fe), 코발트(Co) … 반자성체: Cu, Ag, Au, H2O】 【Fe (770 ℃), Co (1127 ℃), Ni (358 ℃)】'},
 {k:'단위',h:'자기장 단위 — T, G, Oe, A/m',b:`<div class="rel mono">1 T = 10⁴ G · 공기 중 1 G ≈ 1 Oe<br>B = μ₀H,  μ₀ = 4π × 10⁻⁷ H/m<br>1 T = 1 V·s/m² = 1 Wb/m²</div>
   <div class="syms"><span class="s">B</span><span>자속밀도 {{T}} 테슬라, {{G}} 가우스</span><span class="s">H</span><span>자계 세기 {{Am}}, {{Oe}}</span></div>
   ${FIG.fieldScale()}
   <p class="small">지구 표면 0.25~0.65 G · 인체보호기준(150 kHz 미만): 직업인 12 A/m(≈ 0.15 G), 일반인 5 A/m(≈ 0.06 G) · 일반 환경에서 1 T 이상은 어렵고 초전도 자석이 필요</p>`,
  easy:'테슬라는 큰 단위, 가우스는 1만분의 1 크기. 지구 자기장은 약 0.5 G예요.',
  src:'【1Tesla = 10⁴ Oe = 10⁴ Gauss】 【지구표면에서 magnetic field 크기는 0.25~0.65 Gauss】'},
 {k:'센서 분류',h:'세기에 따른 자기센서',b:`<div class="tblwrap"><table><tr><th>구분</th><th>범위</th><th>센서</th></tr><tr><td>약자계</td><td>1 G 이하</td><td>[[squid|SQUID]]</td></tr><tr><td>중자계</td><td>1~10 G</td><td>MI, [[amr|AMR]]</td></tr><tr><td>강자계</td><td>10 G 이상</td><td>MR, [[hall|홀]], [[gmr|GMR]]</td></tr></table></div>
   <button class="ghost" data-goto="hall">↗ 홀 센서 자세히 (제2편 4장)</button>`,
  easy:'아주 약한 자기장은 SQUID, 중간은 AMR, 센 것은 홀·GMR로 재요.'},
 {k:'AMR',h:'AMR — 각도에 따라 변하는 저항',b:`<div data-anim="amrc"></div>
   <div class="eqn">R(θ) = R_min + ΔR·cos²θ<small>= R_max − ΔR·sin²θ = R_max + (ΔR/2)cos2θ · θ = M과 I 사이 각</small></div>
   <ul class="clean"><li>NiFe(퍼말로이) 박막, 자기장 속 증착·열처리로 자화 방향 형성</li><li>평행: 전도전자 운동량 완화↑ → 저항↑ · 수직: 저항↓ (스핀-궤도 결합)</li><li>[[barber|바버 폴]]: Al 단락 바 45° → 유효 전류 45° → 선형</li><li>4개로 브리지: R₁·R₃ 감소, R₂·R₄ 증가 → 드리프트↓ 감도↑</li><li>장점: 단순·박막·소형·방향 검출 / 한계: 잡음, 온도, 주변 자기장 영향</li></ul>`,
  easy:'전류와 내부 자석 방향이 나란하면 저항이 크고, 직각이면 작아요. 45°가 가장 직선적으로 변해서 거기에 맞춰 써요.',
  src:'【전류(I)의 방향과 자화(M)의 방향이 서로 평행일 때 저항이 최대로 되고, 서로 수직한 경우 최소】 【θ=45°를 전후로 하여 직선영역】'},
 {k:'GMR',h:'GMR — 층을 쌓아 거대하게',b:`<div data-anim="gmrx"></div>
   <div class="f4"><div><div class="h">원리 · [[spindep|스핀 의존 산란]]</div>평행 → 산란 최소 → R 최소 · 반평행 → 산란 최대 → R 최대</div>
    <div><div class="h">다층막</div>Fe/Cr: 반강자성 결합으로 반평행 → H를 걸면 평행 → R 크게 감소 · NiFe/Cu: RKKY 간접 교환결합 · 자계 부호와 무관, 약한 자계에서 감도 낮음</div>
    <div><div class="h">[[spinvalve|스핀 밸브]]</div>반강자성체(FeMn)가 고정층을 잡고, 자유층(연자성)만 회전 → 비대칭 특성</div>
    <div><div class="h">두께</div>NiFe 약 20 nm까지 GMR↑(그 이상은 전류 분류) · Cu 약 15 nm 최적(얇으면 핀홀로 강결합) · 30층 고감도 · 1.8 GHz까지 응답</div></div>`,
  easy:'층마다 문이 있다고 생각해요. 문들이 같은 방향이면 전자가 술술, 반대 방향이면 계속 막혀요. 자석으로 문 방향을 맞추면 저항이 확 떨어져요.',
  src:'【1988년 … 약 70[%]의 자기저항 변화가 일어나는 것이 관측(노벨상수상)】 【두 자성체 박막의 자기 모멘트가 평행이면 … 저항도 최소, 반평행이면 … 최대】'},
 {k:'SQUID',h:'SQUID — 초전도로 재는 극미약 자기장',b:`<div class="f4"><div><div class="h">[[superc|초전도체]]</div>T_c 이하에서 저항 0 + 완전 반자성 · Nb(액체 He) · YBCO(액체 N₂, 77 K) · Hg-1223 약 −122 °C</div>
    <div><div class="h">[[josephson|조셉슨 접합]]</div>Nb | AlOₓ(수 nm) | Nb · 쿠퍼 쌍이 터널링 · 임계전류 I_c까지 전압 없이 흐름(DC 조셉슨 효과)</div>
    <div><div class="h">종류</div>RF SQUID: 접합 1개, 20~30 MHz RF 구동 · DC SQUID: 접합 2개, 직류 구동, 더 고감도</div></div>
   ${FIG.squidV()}
   <p>응용: 뇌자도 MEG(~fT), 심자도 MCG, 지질 탐사, 자성·초전도 연구, TES 판독, 비파괴 검사 · 2025 노벨 물리학상(John Clarke, 조셉슨 접합 초전도 회로)</p>`,
  easy:'엄청 차갑게 식혀 저항이 0인 고리를 만들고, 자기장이 들어오면 전압이 규칙적으로 출렁이는 것을 세서 아주 작은 자기장을 재요.',
  src:'【DC SQUID는 RF SQUID에 비해 … 자속 분해능이 높고 고감도】 【SQUID의 출력전압은 자속양자 𝜙ₒ를 주기로 하여 … 주기적으로 진동】'},
 {k:'응용',h:'어디에 쓰나',b:`<div class="appchips"><span>전류 측정</span><span>회전·속도</span><span>위치</span><span>📱 나침반·폴더블</span><span>🚗 ABS·모터</span><span>🏠 세탁기·냉장고 문</span><span>🤖 로봇 관절</span><span>🔒 출입 감지</span></div>
   <div class="f4"><div><div class="h">지중 자기장 무선 통신 (참고)</div>자기장은 흙·물·돌·비자성 금속을 손실 없이 통과(상대투자율 ≈ 1) → 땅속 센서 통신 · 최대 거리 ≈ λ/2π (135 kHz → 약 350 m) · 공심 코일(손실 없음, 고주파 유리) vs 자기 코어(집중·소형, 포화·손실)</div></div>`,
  easy:'스마트폰 나침반, 자동차 바퀴 속도, 폴더블폰 접힘 각도까지 자기센서가 쓰여요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'기출·숙제',h:'',b:'__MT:t11__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>1 T = 10⁴ G · B = μ₀H · 지구 0.25~0.65 G</li><li>AMR: I ∥ M 최대, ⊥ 최소, R = R_min + ΔR cos²θ, 45° 바버 폴</li><li>GMR: 평행 R 최소 / 반평행 최대, 스핀 의존 산란 · SQUID: 조셉슨 접합, Φ₀ 주기</li></ol>
   <div class="eyebrow">스스로 점검</div>
   <details class="qa"><summary>AMR을 45°로 바이어스하는 이유는?</summary><div>cos²θ 곡선에서 45° 근처가 직선 구간이라 자기장에 선형으로 반응.</div></details>
   <details class="qa"><summary>GMR 층을 10 nm 이하로 얇게 하는 이유는?</summary><div>평균자유행정(수십 nm)보다 얇아야 계면 스핀 의존 산란의 비중이 커짐.</div></details>
   <details class="qa"><summary>DC SQUID와 RF SQUID의 차이는?</summary><div>DC: 접합 2개·직류, 고감도 / RF: 접합 1개·20~30 MHz RF.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'mg1',tag:'자기',f:'1 T는 몇 G?',a:'10⁴ G',r:'공기 중 1 G ≈ 1 Oe',e:''},
 {id:'mg2',tag:'자기',f:'지구 자기장 크기',a:'0.25~0.65 G',r:'약 25~65 μT',e:''},
 {id:'mg3',tag:'자기',f:'자기센서 세기별 분류',a:'약자계 <1 G SQUID · 중자계 1~10 G AMR·MI · 강자계 >10 G 홀·GMR',r:'',e:''},
 {id:'mg4',tag:'자기',f:'AMR 저항 최대·최소 조건',a:'I ∥ M 최대, I ⊥ M 최소',r:'R = R_min + ΔR cos²θ',e:''},
 {id:'mg5',tag:'자기',f:'바버 폴의 역할',a:'Al 단락 바로 유효 전류를 45° → 선형 동작',r:'',e:''},
 {id:'mg6',tag:'자기',f:'GMR 원리',a:'스핀 의존 산란: 평행 R 최소, 반평행 R 최대',r:'ΔR/R = (R_ap − R_p)/R_ap',e:''},
 {id:'mg7',tag:'자기',f:'큐리 온도 (Fe, Co, Ni)',a:'770 °C, 1127 °C, 358 °C',r:'',e:''},
 {id:'mg8',tag:'자기',f:'DC SQUID 구조와 출력',a:'초전도 링 + 조셉슨 접합 2개 · 전압이 Φ₀ 주기로 진동',r:'',e:''},
 {id:'mg9',tag:'자기',f:'강자성·상자성·반자성 예',a:'강: Fe Ni Co · 상: Al Pt Cr O₂ · 반: Cu Ag Au H₂O',r:'페리: Fe₃O₄',e:''}
);
