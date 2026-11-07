/* ═════════ 제3편 7장 SAW(표면탄성파) 센서 ═════════ */
Object.assign(TERM,{
 saw:{ko:'표면탄성파',en:'SAW (Surface Acoustic Wave)',gen:'고체 표면을 따라서만 흐르는 기계적 파동.',tech:'압전 기판 위 IDT에 교류 전압 → 압전 효과로 기판이 주기적으로 변형 → 표면에서 약 1λ 깊이 안에 에너지가 모인 탄성파가 전파. 속도 3000~5000 m/s(전자기파의 약 10만분의 1), 진폭 약 2 nm. 1885년 Rayleigh가 존재를 발견.',easy:'잔잔한 물 위를 지나가는 물결처럼, 딱딱한 결정 표면 위를 아주 작게 흐르는 떨림이에요.'},
 rayleigh:{ko:'레일리파',en:'Rayleigh wave',gen:'대표적인 표면탄성파.',tech:'표면 입자가 수직·수평 성분을 함께 가진 타원 운동(진행 방향 기준 역회전, 반시계)을 하며 표면을 따라 전파. 깊이에 따라 진폭이 급격히 감소. 지진의 표면파와 같은 종류.',easy:'파도 위 코르크가 동그랗게 도는 것처럼, 표면 알갱이가 타원을 그리며 움직여요.'},
 idt:{ko:'IDT (빗살 전극)',en:'IDT (Interdigital Transducer)',gen:'압전 기판 위에 깍지 낀 손가락 모양으로 만든 금속 전극.',tech:'+, − 전극이 번갈아 맞물린 박막. 교류 전압 → 이웃 손가락 사이 전기장 방향이 교대로 바뀜 → 압전 변형 → SAW 발생(입력). 반대로 SAW가 도착하면 전압이 생김(출력). 손가락 주기 = λ.',easy:'깍지 낀 두 손처럼 생긴 전극이에요. 전기를 소리(떨림)로, 떨림을 다시 전기로 바꿔요.'},
 piezosub:{ko:'압전 기판',en:'Piezoelectric substrate',gen:'SAW를 만들고 전달하는 압전 결정 웨이퍼.',tech:'수정(Quartz), LiNbO₃, LiTaO₃ 등. Czochralski 법으로 성장(4인치 상용, 6인치 양산·연구). 같은 결정이라도 자른 방향(cut)과 진행 방향에 따라 속도·K²·TCD가 다름.',easy:'떨림이 지나가는 무대예요. 어느 방향으로 잘랐느냐에 따라 성질이 달라져요.'},
 k2sw:{ko:'전기기계 결합계수',en:'Electromechanical coupling coefficient (K²)',gen:'전기 에너지가 기계적 떨림으로 얼마나 잘 바뀌나.',tech:'K² = 2(v_f − v_m)/v_f. v_f 자유 표면 속도, v_m 금속을 아주 얇게 덮은 표면 속도. K²가 크면 작은 교류 전압으로 큰 진폭 → 넓은 대역·작은 손실. LiNbO₃ 128°YX 5.5 %, 수정 0.1 %.',easy:'같은 전기를 넣었을 때 얼마나 세게 떨리나를 나타내는 점수예요.'},
 tcd:{ko:'지연 온도계수',en:'TCD (Temperature Coefficient of Delay)',gen:'온도가 1 °C 오를 때 SAW 도착 시간이 얼마나 늘어나나.',tech:'TCD = (1/L)(dL/dT) − (1/v)(dv/dT) [ppm/°C]. 앞항 = 열팽창(길이↑), 뒷항 = 속도의 온도계수(대개 속도↓라 −×− = +). 수정 ST-X ≈ 0 (온도 안정 → 필터·기준), LiNbO₃ 큼(94, 75 ppm/°C → 온도센서).',easy:'더워지면 길도 늘고 떨림도 느려져서 늦게 도착해요. 그 늦어지는 비율이에요.'},
 aperture:{ko:'개구 길이',en:'Aperture (W)',gen:'IDT 손가락이 서로 겹치는 길이.',tech:'보통 30~100 λ. 너무 작으면 회절 손실↑(빔이 퍼짐), 너무 크면 정전용량 C_T↑ → 정확한 임피던스 매칭 필수.',easy:'떨림을 내보내는 입의 폭이에요. 너무 좁으면 퍼지고, 너무 넓으면 전기적으로 다루기 어려워요.'},
 delayline:{ko:'지연선',en:'Delay line',gen:'입력 IDT와 출력 IDT 사이를 SAW가 지나가는 길.',tech:'two-port: 입력 IDT → 전파 경로(감지막) → 출력 IDT. 경로 길이 L, 지연 시간 t = L/v. 경로에서 속도·길이가 바뀌면 시간·위상·주파수가 변함 → 센서.',easy:'떨림이 출발점에서 도착점까지 달려가는 트랙이에요. 트랙 상태가 바뀌면 도착 시간이 달라져요.'},
 sawres:{ko:'SAW 공진기',en:'SAW resonator',gen:'양쪽 반사기 사이에 SAW를 가둬 특정 주파수로 울리게 한 소자.',tech:'IDT 양옆 반사기 격자로 정재파 형성 → 높은 Q의 공진 주파수. one-port 공진기는 온도센서·발진기, two-port는 필터.',easy:'양쪽 벽 사이에서 떨림이 왔다 갔다 하며 한 음만 크게 울리는 구조예요.'},
 reflector:{ko:'반사기',en:'Reflector',gen:'SAW를 되돌려 보내는 금속 줄무늬.',tech:'기하학적 불연속, 전기적 재생, 질량 부하로 반사. 종류: shorted stripes, multi-bar, single bar, groove. 첫 반사기 위치 = n·λ/2 + λ/8 (IDT 기준). 반사기 배치가 곧 태그의 ID 코드.',easy:'산에서 소리치면 메아리가 돌아오듯, 이 줄무늬에서 떨림이 메아리처럼 돌아와요.'},
 sawtag:{ko:'SAW RFID 태그',en:'SAW RFID tag',gen:'배터리·칩 없이 전파 메아리로 ID를 알려주는 태그.',tech:'리더 전파 → 안테나 → IDT가 SAW로 변환 → 반사기 배열에서 반사 → IDT가 다시 전파로 → 리더가 메아리 시간 패턴(코드) 읽음. 440 MHz~2.45 GHz, 64·96비트 EPC 호환. 혹독한 환경(고온·방사선)에 강함.',easy:'건전지 없는 메아리 명찰이에요. 부르면 정해진 박자로 메아리가 돌아와서 누군지 알 수 있어요.'},
 inherentloss:{ko:'고유 손실',en:'IDT inherent (bidirectional) loss',gen:'IDT가 양쪽으로 반씩 떨림을 보내서 생기는 손실.',tech:'양방향 IDT는 한쪽 방향만 필요해도 반대쪽에 절반이 방사 → 10·log₁₀(1/2) = −3 dB. 입력·출력 IDT 둘이면 −6 dB. SPUDT(단방향 IDT)로 줄임.',easy:'한쪽에만 말하고 싶은데 뒤쪽으로도 절반이 새어 나가서 소리가 반으로 줄어요.'},
 splitidt:{ko:'스플릿 전극 IDT',en:'Split-electrode IDT',gen:'손가락을 둘로 쪼갠 IDT.',tech:'일반(양방향) IDT 손가락 폭 λ/4 → 자체 반사(self-reflection: 전극 질량 때문에 속도·진폭·반사 변화) 발생. 스플릿은 폭 λ/8로 반사가 상쇄되어 self-reflection 없음. 대신 더 미세한 패턴 필요.',easy:'손가락을 반으로 나누면 전극 자체에서 생기는 메아리가 서로 지워져요.'},
 massload:{ko:'질량 부하',en:'Mass loading',gen:'표면에 무게가 얹혀 SAW가 느려지는 효과.',tech:'전극 금속이나 감지막에 흡착된 기체·수분의 질량이 SAW 속도를 낮춤 → 주파수·위상 변화. 화학센서의 감지 원리. 알루미늄 전극 두께 h/λ > 1 %면 SAW를 감쇠·변화시킴 → h/λ < 1 %로.',easy:'트램펄린에 물건을 올리면 덜 튀는 것처럼, 표면이 무거워지면 떨림이 느려져요.'},
 mixer:{ko:'믹서',en:'Mixer',gen:'두 주파수를 곱해 합·차 주파수를 만드는 회로.',tech:'f₁, f₂ 입력 → f₁ + f₂, |f₁ − f₂| 등 생성 → 저역통과 필터로 차 주파수만 남김. 수백 MHz 신호를 수 MHz로 낮춰 세기 쉽게.',easy:'두 높은 음을 섞으면 "웅웅" 하는 느린 맥놀이가 들려요. 그 느린 박자만 골라 세요.'}
});
Object.assign(UNIT,{
 ppmC:{s:'ppm/°C',r:'피피엠 퍼 도',mean:'1 °C당 백만분의 몇 변하나 (TCD)'},
 nH:{s:'nH',r:'나노헨리',mean:'10⁻⁹ H'},
 kHzppm:{s:'kHz/ppm',r:'킬로헤르츠 퍼 피피엠',mean:'가스 농도 1 ppm당 주파수 변화 (감도)'}
});
FORM.push(
 {eq:'λ = v_SAW / f₀',read:'람다는 SAW 속도 나누기 중심주파수',name:'SAW 파장',page:'saw',sec:1,syms:[['v_SAW','SAW 속도 (3000~5000)','mps'],['f₀','중심주파수','MHz'],['λ','파장 = IDT 주기','um']]},
 {eq:'v_SAW ~ √(E/ρ)',read:'탄성계수 나누기 밀도의 루트',name:'SAW 속도',page:'saw',sec:2,syms:[]},
 {eq:'K² = 2(v_f − v_m)/v_f',read:'자유 표면과 금속 표면 속도 차',name:'전기기계 결합계수',page:'saw',sec:2,syms:[]},
 {eq:'TCD = (1/L)(dL/dT) − (1/v)(dv/dT)',read:'열팽창 빼기 속도 온도계수',name:'지연 온도계수',page:'saw',sec:2,syms:[['TCD','지연 온도계수','ppmC']]},
 {eq:'G(f₀) = 8·K²·C_s·f₀·N²',read:'방사 컨덕턴스',name:'IDT 방사 컨덕턴스',page:'saw',sec:3,syms:[['N','손가락 쌍 수','nd'],['C_s','한 쌍 정전용량','pF']]},
 {eq:'손실 = 10·log₁₀(1/2) = −3 dB',read:'양방향 IDT 고유 손실',name:'IDT 고유 손실',page:'saw',sec:3,syms:[]},
 {eq:'C_T = N·C_s,  ωL = 1/(ωC_T)',read:'정전용량을 코일로 상쇄',name:'IDT 임피던스 매칭',page:'saw',sec:4,syms:[]},
 {eq:'첫 반사기 = n·λ/2 + λ/8',read:'반사기 위치',name:'반사기 거리',page:'saw',sec:5,syms:[]},
 {eq:'t = 2d / v_SAW',read:'왕복 시간',name:'반사 피크 시간',page:'saw',sec:5,syms:[]},
 {eq:'dt = t₀·TCD·dT',read:'시간 변화 = 기준시간 × TCD × 온도 변화',name:'SAW 온도센서',page:'saw',sec:6,syms:[]},
 {eq:'φ = ω·Δt = 2π f₀ Δt',read:'시간차를 위상으로',name:'SAW 압력센서 위상',page:'saw',sec:6,syms:[]}
);

/* ---- 애니메이션 ---- */
ANIM.sawWave=host=>{let f=1,showP=true;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 220" role="img" aria-label="표면탄성파와 IDT"></svg><div class="figctl"><label class="small">주파수 <input type="range" min="0.6" max="2" step="0.1" value="1" data-f style="width:120px"> <b data-fv>×1.0</b></label><button class="ghost" data-p>입자 운동 끄기</button></div>
   <div class="tofcalc mono small" data-o></div><figcaption>왼쪽 IDT에 교류를 걸면 표면이 물결처럼 흔들리며 오른쪽으로 퍼져요. 표면 근처 입자는 <b>타원</b>을 그리고(레일리파), 깊이 1λ쯤 내려가면 거의 안 움직여요. 진폭은 실제 약 2 nm라 크게 과장했어요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const L=loop(tp=>{const lam=80/f,k=2*Math.PI/lam,w=tp*4.2,y0=78;let surf='M110 '+y0;for(let x=110;x<=330;x+=3){const a=Math.exp(-(x-110)/900);surf+=` L${x} ${(y0-7*a*Math.sin(k*(x-110)-w)).toFixed(1)}`}
   let parts='';if(showP){for(let x=124;x<=320;x+=18)for(let d=0;d<4;d++){const depth=d*lam/4,amp=Math.exp(-depth/(lam*0.45));const ph=k*(x-110)-w;const px=x+5*amp*Math.cos(ph),py=y0+8+depth*0.9-6*amp*Math.sin(ph);parts+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(2.6*amp+0.8).toFixed(1)}" style="fill:var(--accent);opacity:${(0.35+0.65*amp).toFixed(2)}"/>`}}
   const idt=[0,1,2,3,4,5].map(i=>`<rect x="${20+i*14}" y="${i%2?50:62}" width="6" height="${16}" style="fill:${i%2?'var(--warn)':'var(--unit)'}"/>`).join('');
   const s=Math.sin(w);
   svg.innerHTML=`<rect x="10" y="78" width="320" height="120" style="fill:var(--surface2);stroke:var(--line)"/>${tx(20,212,'압전 기판 (LiNbO₃, 수정 …)','small2')}
    <path d="${surf} L330 200 L110 200 Z" style="fill:var(--unit-soft,var(--surface2));opacity:.5"/><path d="${surf}" style="fill:none;stroke:var(--ink);stroke-width:2"/>
    <line x1="18" y1="58" x2="100" y2="58" style="stroke:var(--warn);stroke-width:2"/><line x1="18" y1="78" x2="100" y2="78" style="stroke:var(--unit);stroke-width:2"/>${idt}
    ${tx(56,40,'IDT (빗살 전극)','b2','middle')}${tx(10,22,s>0?'+ − + − …':'− + − + …','mono small2')}${tx(330,22,'→ SAW 진행','a b2','end')}
    ${parts}<line x1="112" y1="${y0+8}" x2="112" y2="${y0+8+lam*0.9}" style="stroke:var(--muted);stroke-dasharray:3 3"/>${tx(116,y0+12+lam*0.9,'≈ 1λ 깊이','small2')}`;
   q('[data-o]').innerHTML=`λ = v/f₀ → 주파수 ×${f.toFixed(1)}이면 파장 ×${(1/f).toFixed(2)} · 예: 4400 m/s ÷ 440 MHz = <b>10 μm</b>`});
  q('[data-f]').oninput=e=>{f=+e.target.value;q('[data-fv]').textContent='×'+f.toFixed(1)};q('[data-p]').onclick=e=>{showP=!showP;e.target.textContent=showP?'입자 운동 끄기':'입자 운동 보기'};return L.stop};

ANIM.sawTag=host=>{let T=25,t0=0;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 250" role="img" aria-label="SAW 태그의 메아리"></svg><div class="figctl"><label class="small">온도 <input type="range" min="-20" max="200" step="5" value="25" data-t style="width:150px"> <b data-tv>25 °C</b></label><button class="ghost" data-go>다시 쏘기</button></div>
   <div class="tofcalc mono small" data-o></div><figcaption>리더 전파 → 안테나 → IDT가 SAW로 바꿈 → 반사기 3개에서 메아리 → 다시 전파로. 아래 그래프의 피크 <b>위치(시간)</b>가 ID 코드이고, 온도가 오르면 피크가 오른쪽(늦게)으로 밀려요(LiNbO₃ 128°YX, TCD 75 ppm/°C 가정, 이동은 과장해서 그림).</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);const R=[150,205,290];const v=3980;
  const L=loop(tp=>{if(!t0)t0=tp;const tt=(tp-t0)%4.2;const k=1+75e-6*(T-25)*60; // 시각화용 과장 ×60
   const pos=tt<1.6?96+tt/1.6*220:null;let pulses='';
   R.forEach((x,i)=>{const ret=1.6*(x-96)/220;if(tt>ret&&tt<ret+1.2){const bx=x-(tt-ret)/1.2*(x-96);pulses+=`<rect x="${bx-3}" y="58" width="6" height="16" rx="2" style="fill:var(--warn);opacity:.85"/>`}});
   const X=t=>40+t*280/2.6;let sig='M40 225';for(let i=0;i<=260;i++){const t=i/100;let y=0;R.forEach((x,j)=>{const tc=2*(x-96)/220*1.2*k;y+=Math.exp(-((t-tc)**2)/0.0016)*(1-j*0.18)});sig+=` L${X(t).toFixed(1)} ${(225-y*44).toFixed(1)}`}
   svg.innerHTML=`<rect x="80" y="50" width="252" height="32" rx="3" style="fill:var(--surface2);stroke:var(--line)"/>${tx(86,96,'압전 기판','small2')}
    ${[0,1,2,3].map(i=>`<rect x="${84+i*5}" y="${i%2?52:60}" width="3" height="20" style="fill:var(--ink)"/>`).join('')}${tx(90,44,'IDT','b2','middle')}
    ${R.map((x,i)=>[0,1,2].map(j=>`<rect x="${x+j*4}" y="52" width="2" height="28" style="fill:var(--accent)"/>`).join('')+tx(x+4,44,'R'+(i+1),'small2','middle')).join('')}
    <path d="M20 66 H80 M20 66 V30 l-8 -8 M20 30 l8 -8" style="fill:none;stroke:var(--ink);stroke-width:1.6"/>${tx(20,16,'안테나','small2','middle')}
    ${pos?`<rect x="${pos-3}" y="58" width="6" height="16" rx="2" style="fill:var(--unit)"/>`:''}${pulses}
    <line x1="40" y1="225" x2="330" y2="225" style="stroke:var(--ink)"/>${tx(40,124,'리더가 받은 메아리 |S₁₁|','b2')}${tx(330,242,'시간 →','small2','end')}<path d="${sig}" style="fill:none;stroke:var(--accent);stroke-width:2"/>`;
   q('[data-o]').innerHTML=`온도 ${T} °C → 각 피크 시간 × (1 + 75×10⁻⁶ × ${T-25}) = ×${(1+75e-6*(T-25)).toFixed(5)} · 무전원·무칩으로 최대 약 1000 °C까지`});
  q('[data-t]').oninput=e=>{T=+e.target.value;q('[data-tv]').textContent=T+' °C'};q('[data-go]').onclick=()=>{t0=0};return L.stop};

Object.assign(FIG,{
 sawStruct(){const idt=(x,lbl)=>`<rect x="${x}" y="40" width="56" height="10" style="fill:var(--ink)"/><rect x="${x}" y="130" width="56" height="10" style="fill:var(--ink)"/>${[0,1,2,3,4,5].map(i=>`<rect x="${x+3+i*9}" y="${i%2?50:60}" width="4" height="70" style="fill:var(--ink)"/>`).join('')}${tx(x+28,30,lbl,'b2','middle')}`;
  return svgFig(340,190,`<rect x="10" y="20" width="320" height="140" rx="4" style="fill:var(--surface2);stroke:var(--line)"/>${idt(36,'입력 IDT')}${idt(248,'출력 IDT')}
   <rect x="120" y="62" width="100" height="56" rx="4" style="fill:var(--warn-soft);stroke:var(--warn);stroke-dasharray:4 3"/>${tx(170,86,'감지막','b2','middle')}${tx(170,102,'(가스·습도)','small2','middle')}
   ${ar(96,90,118,90,'a',1.8)}${ar(222,90,246,90,'a',1.8)}<rect x="14" y="60" width="16" height="60" style="fill:var(--muted)"/><rect x="310" y="60" width="16" height="60" style="fill:var(--muted)"/>
   ${tx(22,176,'흡음재','small2','middle')}${tx(318,176,'흡음재','small2','middle')}${tx(170,176,'지연선 (two-port delay line) · 길이 L, 지연 t = L/v','small2','middle')}
   <line x1="39" y1="146" x2="57" y2="146" style="stroke:var(--accent);stroke-width:1.5"/>${tx(48,156,'λ','a small2','middle')}<line x1="30" y1="60" x2="30" y2="120" style="stroke:var(--accent);stroke-width:1.5"/>${tx(26,92,'W','a small2','end')}`,'two-port SAW 지연선 (위에서 본 그림)','입력 IDT가 만든 SAW가 감지막을 지나 출력 IDT로 가요. 손가락 주기가 λ, 겹친 길이가 개구 W. 양 끝 흡음재(실리콘 고무)는 가장자리 반사를 막아요.')},
 sawIdtW(){const row=(y,lbl,w,n,col)=>`${tx(10,y-8,lbl,'b2')}${Array.from({length:n},(_,i)=>`<rect x="${20+i*w}" y="${y}" width="${w/2}" height="22" style="fill:${col(i)}"/>`).join('')}`;
  return svgFig(340,150,`${row(28,'양방향 IDT — 손가락 폭 λ/4 (λ = 10 μm → 2.5 μm)',20,15,i=>i%2?'var(--warn)':'var(--unit)')}${row(90,'스플릿 IDT — 손가락 폭 λ/8 (→ 1.25 μm) · 자체 반사 없음',10,30,i=>Math.floor(i/2)%2?'var(--warn)':'var(--unit)')}
   <line x1="20" y1="58" x2="60" y2="58" style="stroke:var(--accent);stroke-width:1.5"/>${tx(40,70,'λ','a small2','middle')}`,'IDT 손가락 폭','색 = 전극 극성(+/−). 양방향은 +,−,+,− 한 개씩, 스플릿은 ++,−−,++ 두 개씩이라 자체 반사가 상쇄돼요.')},
 sawMixer(){const b=(x,y,w,t,s)=>`<rect x="${x}" y="${y}" width="${w}" height="34" rx="6" style="fill:var(--surface);stroke:var(--ink)"/>${tx(x+w/2,y+15,t,'b2','middle')}${s?tx(x+w/2,y+28,s,'small2','middle'):''}`;
  return svgFig(340,190,`${b(8,20,92,'감지 SAW 발진','f₁ = 250 MHz')}${b(8,80,92,'기준 SAW 발진','f₂ = 247.5 MHz')}${b(124,50,60,'믹서','f₁±f₂')}${b(206,50,52,'LPF','f₁−f₂')}${b(270,50,62,'비교기','사인→사각')}
   ${ar(100,37,124,62,'i',1.6)}${ar(100,97,124,75,'i',1.6)}${ar(184,67,206,67,'i',1.6)}${ar(258,67,270,67,'i',1.6)}${b(206,128,126,'FPGA → PC','주파수 세기·표시')}${ar(300,84,290,128,'i',1.6)}
   ${tx(10,150,'차 주파수 2.5 MHz만 남음','u b2')}${tx(10,168,'→ 온도·습도는 두 소자에 똑같이','small2')}${tx(10,184,'영향 → 빼면 사라짐 (보상)','small2')}`,'SAW 가스센서 읽기 회로','감지막이 있는 소자와 없는 소자를 같은 칩에 두고, 두 주파수의 차이만 세요. 수백 MHz를 직접 세는 대신 수 MHz로 낮춰서 정밀하게.')},
 sawPress(){return svgFig(340,170,`<path d="M20 60 H320" style="stroke:var(--line);stroke-dasharray:3 3"/><path d="M20 60 C100 60 120 120 170 120 C220 120 240 60 320 60" style="fill:none;stroke:var(--ink);stroke-width:5"/>
   ${[[60,'늘어난 영역','v 느려짐','w'],[170,'눌린 영역','v 빨라짐','u'],[280,'늘어난 영역','v 느려짐','w']].map(([x,a,b2,c])=>`${tx(x,148,a,'b2','middle')}${tx(x,164,b2,c+' small2','middle')}`).join('')}
   ${[110,170,230].map(x=>ar(x,18,x,52,'i',1.6)).join('')}${tx(170,12,'외부 압력 (예: 300 kPa) → 다이어프램 휨 (최대 약 24 μm)','small2','middle')}`,'SAW 압력센서 — 다이어프램이 휠 때','휨에 따라 SAW 길이와 속도가 바뀌어 반사 피크의 시간이 변해요. 시간 변화가 너무 작아서 위상(φ = ωΔt)으로 바꿔 보정해요.')}
});

/* ---- 문제 생성기 ---- */
Object.assign(GEN,{
 sawLam(base){const v=base?4400:pick([3158,3488,3980,4220,4400]),f=base?440:pick([80,100,200,315,433,440,900]);const lam=v/(f*1e6);const um=lam*1e6;
  return {kind:base?'기본':'유사',title:'SAW 파장과 IDT 손가락 폭',fig:FIG.sawIdtW(),q:`SAW 속도 ${v} {{mps}}인 기판에 중심주파수 ${f} {{MHz}} IDT를 만든다. 파장 λ, 양방향 IDT 손가락 폭(λ/4), 스플릿 IDT 손가락 폭(λ/8), 알루미늄 전극 최대 두께(λ의 1 %)는?`,first:['λ = v/f₀','MHz → × 10⁶','m → μm: × 10⁶'],
   steps:[{h:'단위 맞추기',b:`<div class="ln">f₀ = ${f} MHz = ${f} × 10⁶ Hz</div>`},{h:'파장',b:`<div class="ln">λ = ${v} ÷ (${f} × 10⁶) = ${sciT(sci(lam,4))} m = ${fx(um,4)} μm</div><div class="rd">m → μm: × 10⁶ (지수 −6 → 0)</div>`},
    {h:'손가락 폭',b:`<div class="ln">λ/4 = ${fx(um/4,4)} μm · λ/8 = ${fx(um/8,4)} μm</div><div class="rd">주파수가 높을수록 패턴이 미세해져 만들기 어려움 (GHz대는 서브마이크론)</div>`},
    {h:'전극 두께',b:`<div class="ln">h < 0.01 × λ = ${fx(um*10,4)} nm</div><div class="rd">1 % 넘으면 질량 부하로 SAW 감쇠·속도 변화</div>`}],
   ans:`λ = ${fx(um,4)} μm · λ/4 = ${fx(um/4,4)} μm · λ/8 = ${fx(um/8,4)} μm · h < ${fx(um*10,4)} nm`,ansRead:`${fxR(um,4)} 마이크로미터`,
   calc:calcBlock([[[...ks(v),'÷',...K(f,6),'='],casioDec(lam),'m'],[['Ans','×',...K(1,6),'='],casioDec(um),'μm'],[['Ans','÷','4','='],casioDec(um/4),'λ/4']],[W_NEG]),
   easy:'속도를 주파수로 나누면 한 번 떨리는 동안 가는 거리(파장)예요. 그게 빗살 전극 한 칸의 크기가 돼요.'}},
 sawF0(){const v=pick([3158,3488,3980,4220]),w=pick([0.5,1,1.25,2,2.5]);const split=Math.random()<.4;const lam=w*(split?8:4);const f=v/(lam*1e-6);
  return {kind:'응용',title:'손가락 폭으로 중심주파수 역산',q:`SAW 속도 ${v} m/s 기판에 ${split?'스플릿(λ/8)':'양방향(λ/4)'} IDT를 손가락 폭 ${w} {{um}}로 만들었다. 중심주파수는?`,first:[split?'λ = 8 × 손가락 폭':'λ = 4 × 손가락 폭','f₀ = v/λ'],
   steps:[{h:'λ',b:`<div class="ln">λ = ${split?8:4} × ${w} = ${lam} μm = ${lam} × 10⁻⁶ m</div>`},{h:'f₀',b:`<div class="ln">${v} ÷ (${lam} × 10⁻⁶) = ${sciT(sci(f,4))} Hz = ${fx(f/1e6,4)} MHz</div>`}],
   ans:`${fx(f/1e6,4)} MHz`,ansRead:`${fxR(f/1e6,4)} 메가헤르츠`,calc:calcBlock([[[...ks(v),'÷',...K(lam,-6),'='],casioDec(f)],[['ENG'],`${fx(f/1e6,4)}×10⁶`]],[W_NEG]),easy:'전극 칸이 작을수록 빨리 떨려요(주파수가 높아져요).'}},
 sawK2(base){const vf=base?3980:pick([3158,3488,3980,4750]),dK=base?5.5:pick([0.1,0.88,4.1,5.5,6.6]);const vm=+(vf*(1-dK/200)).toFixed(1);const K2=2*(vf-vm)/vf;
  return {kind:base?'기본':'유사',title:'전기기계 결합계수 K²',q:`자유 표면 SAW 속도 v_f = ${vf} m/s, 아주 얇은 금속으로 덮은 표면 속도 v_m = ${vm} m/s이다. K²(%)는?`,first:['K² = 2(v_f − v_m)/v_f'],
   steps:[{h:'속도 차',b:`<div class="ln">${vf} − ${vm} = ${fx(vf-vm,4)} m/s</div><div class="rd">금속이 표면 전기장을 단락시켜 속도가 조금 느려짐</div>`},{h:'K²',b:`<div class="ln">2 × ${fx(vf-vm,4)} ÷ ${vf} = ${fx(K2,4)} = ${fx(K2*100,3)} %</div><div class="rd">${K2*100>3?'K² 큼 → 작은 전압으로 큰 진폭, 넓은 대역 (LiNbO₃ 계열)':'K² 작음 → 효율 낮지만 온도 안정 기판일 수 있음 (수정)'}</div>`}],
   ans:`K² ≈ ${fx(K2*100,3)} %`,ansRead:`${fxR(K2*100,3)} 퍼센트`,calc:calcBlock([[['2','×','(',...ks(vf),'−',...ks(vm),')','÷',...ks(vf),'×','1','0','0','='],casioDec(K2*100)]],[]),easy:'금속을 덮었을 때 속도가 많이 느려질수록, 전기와 떨림이 단단히 연결된 재료예요.'}},
 sawTCD(base){const S=base?['LiNbO₃ 128°YX',75]:pick([['LiNbO₃ YZ',94],['LiNbO₃ 128°YX',75],['LiNbO₃ 41°YX',69],['LiTaO₃ 36°YX',30],['Quartz ST-X',0]]);const t0=base?1000:pick([500,800,1000,1500,2000]);const dT=base?100:pick([20,50,100,150,-30]);const dt=t0*S[1]*1e-6*dT;const back=!base&&S[1]>0&&Math.random()<.4;
  return {kind:base?'기본':'응용',title:back?'시간 변화 → 온도 변화':'SAW 온도센서 시간 변화',q:back?`${S[0]} (TCD ${S[1]} {{ppmC}}) 온도센서의 기준 지연 시간 t₀ = ${t0} {{ns}}이다. 반사 피크가 ${fx(dt,4)} ns 늦어졌다면 온도는 몇 °C 변했나?`:`${S[0]} 기판(TCD ${S[1]} {{ppmC}})으로 만든 SAW 온도센서의 기준 온도 지연 시간 t₀ = ${t0} {{ns}}이다. 온도가 ${dT} °C 변하면 지연 시간 변화 dt와 새 지연 시간은?`,first:['dt = t₀·TCD·dT','ppm → × 10⁻⁶'],
   steps:back?[{h:'식 정리',b:`<div class="ln">dT = dt ÷ (t₀ × TCD)</div>`},{h:'계산',b:`<div class="ln">${fx(dt,4)} ÷ (${t0} × ${S[1]} × 10⁻⁶) = ${dT} °C</div><div class="rd">ppm/°C → × 10⁻⁶ 꼭!</div>`}]:
    [{h:'단위',b:`<div class="ln">TCD = ${S[1]} ppm/°C = ${S[1]} × 10⁻⁶ /°C</div>`},{h:'dt',b:`<div class="ln">${t0} × ${S[1]}×10⁻⁶ × ${dT} = ${fx(dt,4)} ns</div>`},{h:'새 지연 시간',b:`<div class="ln">t = ${t0} + ${fx(dt,4)} = ${fx(t0+dt,6)} ns</div><div class="rd">${S[1]===0?'수정 ST-X는 TCD ≈ 0 → 온도에 둔감 (필터·기준용)':'TCD가 클수록 온도센서 감도↑'}</div>`}],
   ans:back?`${dT} °C`:`dt = ${fx(dt,4)} ns · t = ${fx(t0+dt,6)} ns`,ansRead:back?`${dT}도`:`${fxR(dt,4)} 나노초`,calc:calcBlock([[back?[...ks(+dt.toFixed(4)),'÷','(',...ks(t0),'×',...K(S[1],-6),')','=']:[...ks(t0),'×',...K(S[1],-6),'×',...nk(dT),'='],casioDec(back?dT:dt)]],[W_NEG]),
   easy:'더워지면 길이 늘고 떨림이 느려져서 메아리가 늦게 와요. 늦어진 시간으로 온도를 알아내요.'}},
 sawEcho(base){const v=base?3980:pick([3158,3488,3980]),d=base?[2,3.5,5]:[pick([1,1.5,2]),pick([3,3.5,4]),pick([5,6,7])];const ts=d.map(x=>2*x*1e-3/v*1e6);
  return {kind:base?'기본':'유사',title:'반사기 메아리 시간',fig:null,q:`SAW 속도 ${v} m/s 기판에서 IDT로부터 ${d.join(', ')} {{mm}} 떨어진 반사기 3개의 메아리 도착 시간(μs)은?`,first:['t = 2d/v (왕복)','mm → m'],
   steps:[{h:'왕복',b:`<div class="rd">IDT → 반사기 → IDT로 돌아오니 거리 2배</div>`},{h:'계산',b:d.map((x,i)=>`<div class="ln">t${i+1} = 2 × ${x}×10⁻³ ÷ ${v} = ${fx(ts[i],4)} μs</div>`).join('')},{h:'의미',b:`<div class="rd">μs 단위로 늦게 오니 주변 물체의 전파 메아리(수십 ns)와 시간으로 구분 → 무선 태그·센서가 가능</div>`}],
   ans:ts.map(t=>fx(t,4)+' μs').join(', '),ansRead:`${fxR(ts[0],4)} 마이크로초`,calc:calcBlock([[['2','×',...K(d[0],-3),'÷',...ks(v),'='],casioDec(ts[0]*1e-6)],[['ENG'],`${fx(ts[0],4)}×10⁻⁶`]],[W_NEG]),easy:'떨림이 갔다가 돌아오는 시간이에요. 멀리 있는 반사기일수록 늦게 와요.'}},
 sawPhase(base){const f=base?440:pick([200,433,440,915]),dtp=base?0.5:pick([0.1,0.2,0.5,1,2]);const ph=2*Math.PI*f*1e6*dtp*1e-9;const deg=ph*180/Math.PI;
  return {kind:base?'기본':'유사',title:'시간차 → 위상 (압력센서)',fig:FIG.sawPress(),q:`중심주파수 ${f} MHz SAW 압력센서에서 압력 때문에 피크가 ${dtp} {{ns}} 이동했다. 위상 변화는 몇 rad, 몇 도인가?`,first:['φ = ω·Δt = 2πf₀Δt','rad → 도: × 180/π'],
   steps:[{h:'ω',b:`<div class="ln">ω = 2π × ${f}×10⁶ = ${sciT(sci(2*Math.PI*f*1e6,4))} rad/s</div>`},{h:'위상',b:`<div class="ln">φ = ${sciT(sci(2*Math.PI*f*1e6,4))} × ${dtp}×10⁻⁹ = ${fx(ph,4)} rad</div>`},{h:'도',b:`<div class="ln">${fx(ph,4)} × 180/π = ${fx(deg,4)}°</div><div class="rd">ns 수준 시간 변화는 재기 어렵지만 위상으로 바꾸면 수백 도 → 정밀 보정</div>`}],
   ans:`${fx(ph,4)} rad = ${fx(deg,4)}°`,ansRead:`${fxR(deg,4)}도`,calc:calcBlock([[['2','SHIFT','×10ˣ','×',...K(f,6),'×',...K(dtp,-9),'='],casioDec(ph),'rad'],[['Ans','×','1','8','0','÷','SHIFT','×10ˣ','='],casioDec(deg),'도']],[W_PI,W_NEG]),
   easy:'아주 짧은 시간 차이도, 빠르게 떨리는 파동에서는 큰 "박자 어긋남(위상)"으로 보여요.'}},
 sawLoss(){const P=pick([1,10,100]),n=pick([1,2]);const dB=-3.0103*n,Po=P*0.5**n;
  return {kind:'유사',title:'IDT 고유 손실 (양방향)',q:`양방향 IDT ${n===1?'하나':'두 개(입력·출력)'}를 지나면 ${P} mW 입력에서 얼마가 남고, 몇 dB 손실인가?`,first:['IDT 하나에서 반은 반대쪽으로','10 log(1/2) ≈ −3 dB'],
   steps:[{h:'남는 전력',b:`<div class="ln">${P} × (1/2)${n>1?'²':''} = ${fx(Po,4)} mW</div><div class="rd">한쪽만 필요한데 양쪽으로 반씩 방사</div>`},{h:'dB',b:`<div class="ln">10 log(${fx(Po/P,4)}) = ${fx(dB,3)} dB</div><div class="rd">개선: SPUDT(단방향 IDT)</div>`}],
   ans:`${fx(Po,4)} mW · ${fx(dB,3)} dB`,ansRead:`${fxR(dB,3)} 데시벨`,calc:calcBlock([[['1','0','log','0','.',n>1?'2':'5',n>1?'5':'',')','='].filter(Boolean),casioDec(dB)]],[]),easy:'말을 한쪽에만 하고 싶은데 뒤로도 절반이 새요. 반 = −3 dB.'}},
 sawMatch(base){const CT=base?5:pick([2,3,5,8,10]),f=base?440:pick([200,315,433,440,915]);const w=2*Math.PI*f*1e6;const L=1/(w*w*CT*1e-12);
  return {kind:base?'기본':'응용',title:'IDT 정전용량 상쇄용 인덕터',q:`IDT 총 정전용량 C_T = ${CT} {{pF}}, 중심주파수 ${f} MHz이다. C_T를 상쇄하는 직렬(또는 병렬) 인덕터 L은 몇 {{nH}}인가?`,first:['ωL = 1/(ωC_T)','L = 1/(ω²C_T)'],
   steps:[{h:'ω',b:`<div class="ln">ω = 2π × ${f}×10⁶ = ${sciT(sci(w,4))} rad/s</div>`},{h:'L',b:`<div class="ln">L = 1 ÷ (${sciT(sci(w,4))}² × ${CT}×10⁻¹²) = ${sciT(sci(L,4))} H = ${fx(L*1e9,4)} nH</div><div class="rd">허수 성분 0 → 스미스 차트 중심(50 Ω) 근처로</div>`},{h:'왜 필요?',b:`<div class="rd">개구 W가 크거나 손가락 쌍 N이 많으면 C_T = N·C_s가 커져 −j 성분↑ → 코일(+j)로 지움</div>`}],
   ans:`${fx(L*1e9,4)} nH`,ansRead:`${fxR(L*1e9,4)} 나노헨리`,calc:calcBlock([[['1','÷','(','(','2','SHIFT','×10ˣ','×',...K(f,6),')','x²','×',...K(CT,-12),')','='],casioDec(L)],[['ENG'],`${fx(L*1e9,4)}×10⁻⁹`]],[W_PI,W_NEG]),
   easy:'콘덴서(−j)를 코일(+j)로 상쇄하면 전기가 반사 없이 잘 들어가요. 회로 기초의 임피던스 매칭과 같은 원리예요.'}},
 sawCond(){const K2=pick([0.055,0.041,0.066]),Cs=pick([0.2,0.5,1]),f=pick([200,440]),N=pick([10,20,30]);const G=8*K2*Cs*1e-12*f*1e6*N*N;
  return {kind:'응용',title:'IDT 방사 컨덕턴스와 저항',q:`K² = ${(K2*100).toFixed(1)} %, 손가락 한 쌍 정전용량 C_s = ${Cs} pF, f₀ = ${f} MHz, 손가락 쌍 N = ${N}일 때 방사 컨덕턴스 G(f₀)와 방사 저항 R ≈ 1/G는?`,first:['G = 8·K²·C_s·f₀·N²','% → 소수'],
   steps:[{h:'단위',b:`<div class="ln">K² = ${K2} · C_s = ${Cs}×10⁻¹² F · f₀ = ${f}×10⁶ Hz</div>`},{h:'G',b:`<div class="ln">8 × ${K2} × ${Cs}×10⁻¹² × ${f}×10⁶ × ${N}² = ${fx(G*1e3,4)} mS</div>`},{h:'R',b:`<div class="ln">1/G = ${fx(1/G,4)} Ω</div><div class="rd">N 2배 → G 4배(방사 세짐) · 대신 대역폭은 좁아짐 (≈ 1/N)</div>`}],
   ans:`G ≈ ${fx(G*1e3,4)} mS · R ≈ ${fx(1/G,4)} Ω`,ansRead:`${fxR(1/G,4)} 옴`,calc:calcBlock([[['8','×',...ks(K2),'×',...K(Cs,-12),'×',...K(f,6),'×',...ks(N),'x²','='],casioDec(G)],[['1','÷','Ans','='],casioDec(1/G)]],[W_NEG]),easy:'손가락 쌍이 많을수록 떨림을 세게 내보내요(N²). 대신 받아들이는 주파수 폭은 좁아져요.'}},
 sawMix(base){const f1=base?250:pick([200,250,300]),d=base?2.5:pick([1.2,2.5,3.1]),sens=base?0.063:pick([0.05,0.063,0.08]),df=pick([0.63,1.26,3.15,6.3]);const f2=f1-d;const ppm=df/sens;
  return {kind:base?'기본':'응용',title:'두 SAW 주파수 차이로 가스 농도',fig:FIG.sawMixer(),q:`감지 SAW ${f1} MHz, 기준 SAW ${f2} MHz를 믹서·LPF에 넣었다. 남는 주파수는? 가스 노출 후 차 주파수가 ${df} kHz 더 변했다면 감도 ${sens} {{kHzppm}}에서 농도는?`,first:['LPF 뒤에는 |f₁ − f₂|만','농도 = Δf ÷ 감도'],
   steps:[{h:'차 주파수',b:`<div class="ln">${f1} − ${f2} = ${fx(d,4)} MHz</div><div class="rd">합(${fx(f1+f2,5)} MHz)은 LPF가 제거</div>`},{h:'농도',b:`<div class="ln">${df} kHz ÷ ${sens} kHz/ppm = ${fx(ppm,4)} ppm</div><div class="rd">온도·습도 영향은 두 소자에 똑같이 → 차이에서 상쇄</div>`}],
   ans:`${fx(d,4)} MHz · ${fx(ppm,4)} ppm`,ansRead:`${fxR(ppm,4)} 피피엠`,calc:calcBlock([[[...ks(df),'÷',...ks(sens),'='],casioDec(ppm)]],[]),easy:'두 소리의 높이 차이만 들어요. 둘 다 똑같이 변하는 온도 영향은 빼면 사라져요.'}},
 sawRefl(){const v=pick([3158,3980,4400]),f=pick([440,915,2450]),n=pick([2,5,10,20]);const lam=v/(f*1e6)*1e6;const d=n*lam/2+lam/8;
  return {kind:'유사',title:'첫 반사기 위치',q:`SAW 속도 ${v} m/s, f₀ = ${f} MHz인 태그에서 첫 반사기를 n = ${n} 위치(n·λ/2 + λ/8)에 둘 때 IDT로부터 거리는 몇 μm인가?`,first:['λ = v/f₀','거리 = n·λ/2 + λ/8'],
   steps:[{h:'λ',b:`<div class="ln">${v} ÷ ${f}×10⁶ = ${fx(lam,4)} μm</div>`},{h:'거리',b:`<div class="ln">${n} × ${fx(lam,4)}/2 + ${fx(lam,4)}/8 = ${fx(d,5)} μm</div><div class="rd">λ/8 차이로 반사파 위상을 맞춤 · 중심주파수가 어긋나면 이 거리부터 확인</div>`}],
   ans:`${fx(d,5)} μm`,ansRead:`${fxR(d,5)} 마이크로미터`,calc:calcBlock([[[...ks(n),'×',...ks(+lam.toFixed(5)),'÷','2','+',...ks(+lam.toFixed(5)),'÷','8','='],casioDec(d)]],[]),easy:'반 파장 단위로 떨어뜨리고 8분의 1 파장을 더해 메아리가 깔끔하게 돌아오게 해요.'}}
});
PSET.saw=[['sawLam',true],['sawLam'],['sawF0'],['sawK2',true],['sawTCD',true],['sawTCD'],['sawEcho',true],['sawPhase',true],['sawLoss'],['sawMatch',true],['sawCond'],['sawMix',true],['sawRefl']];
TOPICS.saw={name:'SAW',g:['sawLam','sawF0','sawK2','sawTCD','sawEcho','sawPhase','sawLoss','sawMatch','sawCond','sawMix','sawRefl']};
['sawLam','sawK2','sawTCD','sawEcho','sawPhase','sawLoss','sawMatch','sawMix'].forEach(g=>BASICG.add(g));

PAGES.saw={title:'SAW(표면탄성파) 센서',part:'제3편 7장',secs:[
 {k:'정의',h:'SAW란? — 표면만 흐르는 떨림',b:`<div data-anim="sawWave"></div>
   <div class="flow"><div>교류 전압</div><div>IDT 손가락 사이 전기장 방향이 번갈아 바뀜</div><div>압전 기판 부피 변화</div><div>[[saw|SAW]] 생성·전파</div></div>
   <div class="rel mono">λ = v_SAW / f₀ · v_SAW 3000~5000 m/s · 표면에서 약 1λ 깊이 · 진폭 약 2 nm</div>
   <p>[[rayleigh|레일리파]]: 입자가 수직+수평 타원 운동. SAW는 전기 신호가 아니라 <b>기계적(물리적) 파동</b>이에요.</p>
   <div class="tblwrap fit"><table><tr><th>연도</th><th>사건</th></tr><tr><td>1885</td><td class="small">Lord Rayleigh — SAW 존재 발견</td></tr><tr><td>1965</td><td class="small">White·Voltmer — 압전 기판 위 박막 IDT로 SAW 발생</td></tr><tr><td>1970</td><td class="small">SAW 공진기·발진기</td></tr><tr><td>1997</td><td class="small">SAW 자이로 (Kurosawa)</td></tr></table></div>`,
  easy:'결정판 위의 빗살 전극에 전기를 흔들어 주면, 결정 표면에 아주 작은 물결이 생겨 퍼져 나가요.',
  src:'【압전기판위에 metal IDT 제작 → time-varying ac voltage 인가 → SAW 생성 및 전파】 【표면으로부터 1λ 이내에서 흐르는 파】 【SAW velocity: 3000~5000 m/s】'},
 {k:'구조',h:'IDT와 지연선 · 공진기',b:`${FIG.sawStruct()}
   <div class="f4"><div><div class="h">[[idt|IDT]]</div>+, − 손가락이 번갈아 맞물림 · 주기 = λ · 입력은 전기→SAW, 출력은 SAW→전기</div>
    <div><div class="h">[[delayline|지연선]] (two-port)</div>입력 IDT → 경로(감지막) → 출력 IDT · 화학센서</div>
    <div><div class="h">[[sawres|공진기]] (one-port)</div>IDT 양옆 반사기로 정재파 · 온도센서·발진기</div>
    <div><div class="h">반사형 지연선</div>IDT 하나 + 반사기 배열 · RFID 태그·무선 센서</div></div>
   <div class="rel mono">예: 4400 m/s ÷ 440 MHz = 10 μm → 손가락 폭 λ/4 = 2.5 μm</div>`,
  easy:'빗살 전극이 스피커이자 마이크예요. 그 사이 트랙이 무엇에 닿느냐가 센서의 원리예요.',
  src:'【Apply AC to IDT → IDT 사이에서 alternatively E field 방향 형성 → 압전기판의 volume 변화 → SAW 생성 및 전파】 【일반적으로 표면으로부터 ~2 nm 진폭】'},
 {k:'기판·파형',h:'SAW 종류와 압전 기판 고르기',b:`<ul class="clean"><li><b>True SAW</b>: 레일리파 (타원 변위)</li><li><b>Pseudo SAW</b>: Leaky SAW, SSBW(표면 스치는 체적파), STW(표면 횡파) — 표면 바로 밑에서 흐름</li><li>같은 [[piezosub|기판]]이라도 <b>자른 방향(cut)·진행 방향</b>에 따라 파 종류·속도가 다름</li></ul>
   <div class="tblwrap fit"><table><tr><th>기판 · 방향</th><th>v</th><th>K²%</th><th>TCD</th></tr><tr><td>Quartz ST/X<br><span class="small muted">RW</span></td><td class="mono">3158</td><td class="mono">0.1</td><td class="mono">0</td></tr><tr><td>Quartz 37°Y/90°X<br><span class="small muted">SH</span></td><td class="mono">5094</td><td class="mono">0.1</td><td class="mono">0</td></tr><tr><td>LiNbO₃ Y/Z<br><span class="small muted">RW</span></td><td class="mono">3488</td><td class="mono">4.1</td><td class="mono">94</td></tr><tr><td>LiNbO₃ 41°Y/X<br><span class="small muted">leaky SH</span></td><td class="mono">4750</td><td class="mono">15.8</td><td class="mono">69</td></tr><tr><td>LiNbO₃ 128°Y/X<br><span class="small muted">RW</span></td><td class="mono">3980</td><td class="mono">5.5</td><td class="mono">75</td></tr><tr><td>LiTaO₃ 36°Y/X<br><span class="small muted">leaky SH</span></td><td class="mono">4220</td><td class="mono">6.6</td><td class="mono">30</td></tr><tr><td>LiTaO₃ X/112°Y<br><span class="small muted">RW</span></td><td class="mono">3301</td><td class="mono">0.88</td><td class="mono">18</td></tr></table></div><p class="small muted">v: m/s · TCD: ppm/°C · RW = 레일리파, SH = 수평 전단파</p>
   <div class="f4"><div><div class="h">속도</div><div class="ln">v ~ √(E/ρ)</div><div class="rd">느리면 λ 작아 IDT 패턴 어려움 · 빠르면 쉬움</div></div>
    <div><div class="h">[[k2sw|K²]]</div><div class="ln">K² = 2(v_f − v_m)/v_f</div><div class="rd">크면 작은 전압으로 큰 진폭</div></div>
    <div><div class="h">[[tcd|TCD]] (ppm/°C)</div><div class="ln">(1/L)dL/dT − (1/v)dv/dT</div><div class="rd">수정 ≈ 0 → 필터·기준 · LiNbO₃ 큼 → 온도센서</div></div></div>`,
  easy:'떨림이 빨리 가는 재료, 전기를 떨림으로 잘 바꾸는 재료, 온도에 둔감하거나 민감한 재료 — 목적에 맞게 골라요.',
  src:'【Quartz : TCD ~ 0】 【LiNbO3 : TCD is positive】 【K2 = 2Δv/vo】'},
 {k:'IDT 설계',h:'IDT 설계 요소',b:`${FIG.sawIdtW()}
   <ul class="clean"><li><b>모양</b>: 양방향, [[splitidt|스플릿]](자체 반사 없음), SPUDT(단방향), chirped·slanted(넓은 대역)</li>
    <li><b>중심주파수</b>: 80 MHz, 440 MHz, 900 MHz, 2.4 GHz 등</li><li><b>[[aperture|개구 W]]</b>: 30~100λ · 작으면 회절 손실, 크면 C_T↑ → 매칭 필수</li>
    <li><b>손가락 쌍 N</b>: G(f₀) = 8·K²·C_s·f₀·N² · N↑ → 방사↑, 대역폭↓ · 더미 손가락으로 균일한 SAW·회절↓</li>
    <li><b>금속 두께 h</b> (Al): h/λ &lt; 1 % → 자체 반사 억제 · &gt; 1 % → [[massload|질량 부하]]로 SAW 감쇠 (λ = 10 μm면 100 nm 이하)</li>
    <li><b>[[inherentloss|고유 손실]]</b>: 양쪽으로 반씩 → 10 log(1/2) = −3 dB · 삼중 전이 간섭(TTI)</li></ul>`,
  easy:'빗살의 모양·개수·길이·두께가 떨림의 세기와 주파수 폭을 정해요.',
  src:'【Inherent loss (dB) = 10·log10(1/2) = −3dB】 【Aperture length: 30~100λ】 【SAW 방사 conductance G(fo)=8·K2·Cs·fo·N2】'},
 {k:'손실·매칭',h:'에너지 손실과 임피던스 매칭',b:`<div class="f4"><div><div class="h">손실 원인</div>표면 결함·거칠기 산란 · 체적파(더 빠름)로 새기 · 공기 부하 · 고주파 EM 직결(IDT 사이 정전용량) · 가장자리 반사 → 실리콘 고무 흡음재</div>
    <div><div class="h">매칭</div><div class="ln">C_T = N·C_s, C_s = C₀·W</div><div class="ln">코일로 상쇄: 1/(jωL) ↔ jωC_T</div><div class="rd">f₀에서 스미스 차트 중심 통과 (허수 ≈ 0, 실수 50 Ω) · R_S = R_L</div></div></div>
   <button class="ghost" data-goto="circuit" data-i="5">↗ 임피던스 매칭 (제0편 5장)</button>`,
  easy:'빗살 전극은 큰 콘덴서처럼 보여서, 코일을 달아 그 성질을 지워야 전기가 반사 없이 들어가요.',
  src:'【인덕터를 달아서 CT 성분을 제거한다 (1/jwL = jwC)】 【임피던스 매칭시 fo에서 smith chart의 중심을 통과함】'},
 {k:'반사·무선',h:'반사기와 무선 읽기 — SAW RFID',b:`<div data-anim="sawTag"></div>
   <ul class="clean"><li>[[reflector|반사]] 원인: 기하 불연속 · 전기적 재생 · 질량 부하 / 종류: shorted stripes, multi-bar, single bar, groove</li>
    <li>첫 반사기 = n·λ/2 + λ/8 · 메아리 시간 t = 2d/v</li><li>읽기 거리 1.2~20 m (레이더 방정식: 리더 전력·안테나 이득·삽입손실 20~50 dB 영향, 주파수·거리↑ → 손실↑)</li></ul>
   <div class="f4"><div><div class="h">[[sawtag|SAW RFID]] 장점</div>배터리 없음 · 혹독한 환경 · 440 MHz~2.45 GHz · 64·96비트 EPC 호환</div><div><div class="h">문제와 해결</div>스퓨리어스·감쇠 → 다중 트랙 · 충돌 방지 → 센서마다 다른 중심주파수</div></div>`,
  easy:'부르면 정해진 박자로 메아리가 돌아오는 명찰이에요. 박자 = ID, 박자가 밀린 정도 = 온도·압력.',
  src:'【Batteryless】 【Anti-collision → 센서별 다른 중심주파수 선택】 【The first reflector is positioned in n·λ/2 + λ/8 from IDT】'},
 {k:'압력·온도',h:'SAW 압력센서·온도센서',b:`${FIG.sawPress()}
   <div class="f4"><div><div class="h">압력</div>다이어프램 휨 → 늘어난 영역 v↓, 눌린 영역 v↑ → 피크 시간차 변화 → <b>φ = ω·Δt</b>로 위상 변환해 보정</div>
    <div><div class="h">온도</div><div class="ln">t₁ = 2d/v · dt = t₀·TCD·dT</div><div class="rd">온도↑ → 전파 길이↑, 속도↓ → 피크 시간차↑ · t–T 또는 φ–T로 보정 · IDT 간격 변화로 주파수 보정도 가능</div></div></div>
   <ul class="clean"><li>무전원·무칩·무선 → 사람이 못 가는 고온·고압·고진공·회전체 (최대 약 1000 °C, 0.1 °C 분해능)</li><li>TCD 큰 기판(LiNbO₃) 사용 · [현업] TPMS(타이어 공기압), 회전 설비·변압기 온도</li><li>중심주파수가 어긋나면 → 기판 속도 설정 오류 → 재설계 · 반사기 거리 nλ/2 + λ/8 확인</li></ul>`,
  easy:'눌리거나 더워지면 메아리가 조금 늦게 와요. 그 늦어짐을 시간이나 박자 어긋남(위상)으로 재요.',
  src:'【시간변화분이 너무 작아서 phase 변화값으로 전환하여 calibration 한다】 【t21 = to(ref) + to(ref)·TCD·dT】'},
 {k:'화학센서',h:'SAW 가스·습도 센서',b:`${FIG.sawMixer()}
   <ul class="clean"><li>특정 물질에 민감한 감지막 → 흡착 질량·전도도 변화 → SAW 속도 변화 → 출력 주파수 변화</li><li>감지·기준 두 소자의 주파수 차 → 온도·습도 간섭 제거</li>
    <li>예: Cu 도핑 SnO₂ 벌집 구조 수소센서, two-port 지연선(넓은 감지 면적), 약 200 MHz (주파수↑ → 감도↑), 0.063 kHz/ppm, 선형성 0.96</li>
    <li>회로: 발진기 → 믹서 → LPF → 비교기(사인 → 사각) → FPGA → PC</li></ul><button class="ghost" data-goto="gas">↗ 반도체식 가스센서</button>`,
  easy:'감지막에 가스가 붙으면 표면이 무거워져 떨림이 느려지고, 그만큼 소리 높이(주파수)가 내려가요.',
  src:'【두 센서의 중심주파수 차이를 뺌으로써 센서 정보를 얻는다】 【두 인풋주파수 차이인 2.5MHz 확인】'},
 {k:'기타 응용',h:'필터·자이로·무화기',b:`<div class="f4"><div><div class="h">SAW 필터</div>IDT에 맞는 주파수만 통과 · 휴대폰 1대에 100개 이상</div>
    <div><div class="h">SAW 자이로</div>정재파의 배(antinode)에 금속 m이 속도 v로 진동 → 회전 시 코리올리 힘으로 새 SAW 생성 → 크기 ∝ 각속도</div>
    <div><div class="h">약물 무화기(atomizer)</div>레일리파가 액체에 에너지 → 흔들고 국부 가열 → 증발 · 저점도만 가능</div>
    <div><div class="h">그 밖</div>바이오 세포 혼합·분리, 미세먼지(PM) 센서</div></div>
   <button class="ghost" data-goto="gyro" data-i="2">↗ 코리올리 힘 (자이로)</button>`,
  easy:'같은 떨림으로 전파를 거르고, 회전을 재고, 약을 안개로 만들기도 해요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>IDT + 압전 기판 → SAW(레일리파), 표면 1λ, 3000~5000 m/s · λ = v/f₀ (4400/440M = 10 μm)</li>
   <li>K² = 2Δv/v (변환 효율) · TCD = (1/L)dL/dT − (1/v)dv/dT (수정 ≈ 0, LiNbO₃ 큼) · 양방향 IDT −3 dB</li>
   <li>무선 센서: 반사 피크 시간 t = 2d/v, 온도 dt = t₀·TCD·dT, 압력 φ = ωΔt, 가스 = 두 주파수 차</li></ol>
   <div class="eyebrow">스스로 점검</div>
   <details class="qa"><summary>SAW 태그가 배터리 없이 동작하는 이유는?</summary><div>리더가 보낸 전파 에너지를 IDT가 SAW로 바꾸고, 반사된 SAW가 다시 전파로 돌아가는 수동(passive) 과정이라 칩·전원이 필요 없음.</div></details>
   <details class="qa"><summary>온도센서에는 왜 수정이 아니라 LiNbO₃를 쓰나?</summary><div>수정 ST-X는 TCD ≈ 0이라 온도가 바뀌어도 지연 시간이 거의 안 변함. LiNbO₃는 TCD가 커서 온도 감도가 큼.</div></details>
   <details class="qa"><summary>가스센서에서 기준 소자를 함께 쓰는 이유는?</summary><div>온도·습도는 두 소자에 똑같이 영향 → 주파수 차이를 보면 상쇄되고 가스 효과만 남음.</div></details>
   <details class="qa"><summary>손가락 쌍 N을 늘리면?</summary><div>방사 컨덕턴스 ∝ N² → 세게 방사, 대신 대역폭이 좁아짐.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'sw1',tag:'SAW',f:'SAW 생성 흐름',a:'IDT에 교류 → 손가락 사이 전기장 교대 → 압전 기판 변형 → 표면파 전파',r:'',e:''},
 {id:'sw2',tag:'SAW',f:'SAW 속도·깊이·진폭',a:'3000~5000 m/s · 표면 1λ 이내 · 약 2 nm',r:'λ = v/f₀',e:'4400 m/s ÷ 440 MHz = 10 μm'},
 {id:'sw3',tag:'SAW',f:'레일리파의 입자 운동',a:'수직+수평 타원 운동 (반시계)',r:'',e:''},
 {id:'sw4',tag:'SAW',f:'K² 식과 의미',a:'K² = 2(v_f − v_m)/v_f · 전기→기계 변환 효율',r:'',e:'크면 작은 전압으로 큰 진폭'},
 {id:'sw5',tag:'SAW',f:'TCD 식과 대표 기판',a:'(1/L)dL/dT − (1/v)dv/dT · 수정 ≈ 0, LiNbO₃ 양수(큼)',r:'ppm/°C',e:''},
 {id:'sw6',tag:'SAW',f:'양방향 IDT 고유 손실',a:'10 log(1/2) = −3 dB',r:'양쪽으로 반씩 방사',e:''},
 {id:'sw7',tag:'SAW',f:'IDT 손가락 폭 (양방향·스플릿)',a:'λ/4 · λ/8 (스플릿은 자체 반사 없음)',r:'',e:''},
 {id:'sw8',tag:'SAW',f:'개구 길이 W 범위와 문제',a:'30~100λ · 작으면 회절 손실, 크면 C_T↑ → 매칭',r:'',e:''},
 {id:'sw9',tag:'SAW',f:'첫 반사기 위치',a:'n·λ/2 + λ/8',r:'',e:''},
 {id:'sw10',tag:'SAW',f:'SAW 온도센서 시간 변화',a:'dt = t₀·TCD·dT',r:'',e:''},
 {id:'sw11',tag:'SAW',f:'SAW 압력센서에서 위상으로 바꾸는 이유',a:'시간 변화가 너무 작아서 φ = ωΔt로 변환해 보정',r:'',e:''},
 {id:'sw12',tag:'SAW',f:'SAW 가스센서 읽기 회로',a:'두 발진기 → 믹서 → LPF(차 주파수) → 비교기 → FPGA',r:'온도·습도 상쇄',e:''},
 {id:'sw13',tag:'SAW',f:'SAW RFID 장점과 충돌 방지',a:'무전원·혹독한 환경 · 센서마다 다른 중심주파수',r:'440 MHz~2.45 GHz, 64·96비트 EPC',e:''}
);
