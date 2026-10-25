/* ───────── 계산 문제 생성기 (기본·유사·응용) ───────── */
const N=(m,e)=>e===0?String(m):`${m} × 10${sup(e)}`;          // 표시
const NS=(m,e)=>e===0?String(m):`${m}×10${sup(e)}`;            // 계산기 화면
const K=(m,e)=>[...String(m).split(''),...(e?['×10ˣ',...(e<0?['(−)']:[]),...String(Math.abs(e)).split('')]:[])];
const ks=x=>String(x).split('');
const fx=(x,s=3)=>{const c=sci(x,s);const d=decT(x,s);return (c.e>=-3&&c.e<=4&&d)?d:sciT(c)};
const fxR=(x,s=3)=>{const c=sci(x,s);const d=decT(x,s);return (c.e>=-3&&c.e<=4&&d)?d:sciR(c)};
function piForm(p,q){const g=g10(p,q);p/=g;q/=g;return `${p===1?'':p}π${q===1?'':'/'+q} (π가 든 식)`}
function fracScreen(p,q){const g=g10(p,q);p/=g;q/=g;if(q===1)return {s:String(p)};if(digits(p)+digits(q)<=10)return {s:`${p}/${q} (분수)`,sd:casioDec(p/q)};return {s:casioDec(p/q)}}
const SDROW=(v,lb)=>[['S⇔D'],casioDec(v),lb||'소수로 바꾸기'];
const W_NEG='지수 앞 마이너스는 [−](빼기)가 아니라 [(−)]';
const W_PI='π는 [SHIFT] 누른 뒤 [×10ˣ]';
const W_SD='분수나 π가 든 식으로 나오면 [S⇔D]를 눌러 소수로';

const GEN={
/* 자이로 ① 코리올리 힘 */
coriolis(base){
  const m=base?{m:1,e:-8}:pick([{m:1,e:-8},{m:2,e:-8},{m:5,e:-9},{m:3,e:-8}]);
  const f=base?8:pick([4,5,8,10,12,15]), A=base?800:pick([400,500,800,1000,1500]), W=base?1:pick([1,2,5,10,30,100]);
  const As=sci(A*1e-9), v=2*Math.PI*f*1e3*A*1e-9, Wr=W*Math.PI/180, mv=m.m*10**m.e, F=2*mv*Wr*v;
  const s2=sci(2*mv), s3=sci(2*mv*Wr), vs=sci(v), Fs=sci(F), Wrs=sci(Wr,4);
  const front=+(2*m.m*Wrs.m*vs.m).toPrecision(2), ex=m.e+Wrs.e+vs.e;
  const vp=2*f*A, vq=1e6;
  return {kind:base?'기본':'유사',title:'코리올리 힘 구하기',
   q:`MEMS 자이로의 [[proofmass|질량]] m = ${N(m.m,m.e)} {{kg}}이 구동 주파수 ${f} {{kHz}}, 진폭 ${A} {{nm}}로 진동한다. ${W} {{dps}} 회전이 들어올 때 (1) 최대 속도 v, (2) [[coriolis|코리올리 힘]] F의 크기를 구하라.`,
   first:['단위 먼저: kHz·nm·°/s','v = 2πfA','F = 2mΩv'],
   steps:[
    {h:'단위 먼저 맞추기 (SI로)',b:`<div class="ln">f = ${f} kHz = ${f} × 10³ Hz = ${f*1000} Hz</div><div class="rd">"${f} 킬로헤르츠 = ${f} 곱하기 10의 3승 헤르츠"</div>
     <div class="ln">A = ${A} nm = ${A} × 10⁻⁹ m = ${sciT(As)} m</div><div class="rd">앞 숫자 ${A} = ${sciT(sci(A))}, 지수 더하기 → ${mn(As.e)}</div>
     <div class="ln">Ω = ${W} °/s × π/180 = ${fx(Wr,4)} rad/s</div><div class="rd">⚠ 공식에는 °/s가 아니라 rad/s</div>
     <div class="ln">m = ${N(m.m,m.e)} kg (이미 SI)</div>`},
    {h:'공식 고르기',b:`<div class="ln">v = 2π f A</div><div class="rd">"2 파이 에프 에이" · 사인 진동에서 가장 빠른 순간의 속도 [AI 보충]</div><div class="ln">F = 2 m Ω v</div><div class="rd">"2 엠 오메가 브이" · Ω ⟂ v일 때 크기</div>`},
    {h:'(1) 속도 v',b:`<div class="ln">v = 2 × π × ${f*1000} × ${sciT(As)}</div><div class="ln">= ${fx(v)} m/s${vs.e<-1?` = ${sciT(vs)} m/s`:''}</div>`},
    {h:'(2) 힘 F — 두 개씩 곱하기',b:`<div class="ln">2 × ${N(m.m,m.e)} = ${sciT(s2)}</div><div class="ln">× ${fx(Wr,4)} = ${sciT(s3)}</div><div class="ln">× ${fx(v)} = ${sciT(Fs)} N</div>`},
    {h:'검산 — 지수만 대충',b:`<div class="ln">지수: 10${sup(m.e)} × 10${sup(Wrs.e)} × 10${sup(vs.e)} = 10${sup(ex)}</div><div class="ln">앞 숫자: 2 × ${m.m} × ${Wrs.m} × ${vs.m} ≈ ${front}</div><div class="ln">≈ ${front} × 10${sup(ex)} = ${sciT(sci(front*10**ex,2))} ✓</div>`}],
   ans:`v ≈ ${fx(v)} m/s · F ≈ ${sciT(Fs)} N`,ansRead:`${fxR(v)} 미터 퍼 세컨드 / ${sciR(Fs)} 뉴턴`,
   calc:calcBlock([[['2','×','SHIFT','×10ˣ'],'2×π','π = SHIFT → ×10ˣ'],[['×',...K(f,3)],`2×π×${NS(f,3)}`],[['×',...K(A,-9)],`…×${NS(A,-9)}`],[['='],piForm(vp,vq)],SDROW(v,'(1) v'),
     [['2','×',...K(m.m,m.e)],`2×${NS(m.m,m.e)}`,'이어서 (2)'],[['×',...ks(W),'×','SHIFT','×10ˣ','÷','1','8','0'],`…×${W}×π÷180`,'°/s → rad/s'],[['×','Ans','='],casioDec(F),'(2) F · π 꼴이면 S⇔D']],[W_NEG,W_PI,W_SD,'[Ans] = 바로 앞 결과(v)']),
   easy:`${sciT(Fs)} N은 모래알 하나 무게(약 10⁻⁵ N)보다 훨씬 작아요. 이렇게 작은 힘을 재야 해서 진공 포장과 공진을 써요.`,
   more:base?'[AI 보충] 이 힘으로 스프링(120 {{Nm}})을 그냥 밀면 F ÷ k ≈ 1.2 × 10⁻¹³ m밖에 안 움직여요. 진공 속에서 [[modematch|모드 매칭]]으로 [[resonance|공진]]시키면 수만 배 커져 수 nm 수준이 돼요(추정).':''}},

/* 자이로 ② 코리올리 역산: F → Ω */
coriolisInv(){
  const m=pick([{m:1,e:-8},{m:2,e:-8},{m:5,e:-9}]), v=pick([0.02,0.03,0.04,0.05]), W=pick([2,5,10,20,50]);
  const mv=m.m*10**m.e, Fs=sci(2*mv*W*Math.PI/180*v,3), F=+Fs.m*10**Fs.e;
  const den=2*mv*v, Wr=F/den, Wd=Wr*180/Math.PI;
  return {kind:'응용',title:'힘에서 회전 속도 거꾸로 구하기',
   q:`질량 ${N(m.m,m.e)} {{kg}}이 ${v} {{mps}}로 진동하는 MEMS 자이로에서 [[coriolis|코리올리 힘]] ${sciT(Fs)} {{N}}이 측정됐다. 회전 각속도는 몇 {{dps}}인가?`,
   first:['F = 2mΩv → Ω = F ÷ (2mv)','rad/s → °/s: × 180/π'],
   steps:[
    {h:'식 뒤집기',b:`<div class="ln">F = 2 m Ω v</div><div class="ln">Ω = F ÷ (2 m v)</div><div class="rd">양쪽을 2mv로 나누기. 구하려는 Ω만 혼자 남기기</div>`},
    {h:'분모 먼저',b:`<div class="ln">2 × ${N(m.m,m.e)} × ${v} = ${sciT(sci(den))}</div>`},
    {h:'나누기',b:`<div class="ln">Ω = ${sciT(Fs)} ÷ ${sciT(sci(den))}</div><div class="ln">= ${fx(Wr,4)} rad/s</div><div class="rd">나눗셈은 지수 빼기</div>`},
    {h:'°/s로 바꾸기',b:`<div class="ln">${fx(Wr,4)} × 180 ÷ π = ${fx(Wd,3)} °/s</div><div class="rd">1 rad ≈ 57.3° → rad/s 값에 약 57을 곱하는 것</div>`},
    {h:'검산',b:`<div class="ln">2 × ${N(m.m,m.e)} × ${fx(Wr,4)} × ${v} ≈ ${sciT(sci(den*Wr))} N ✓</div>`}],
   ans:`Ω ≈ ${fx(Wd,3)} °/s (≈ ${fx(Wr,3)} rad/s)`,ansRead:`${fxR(Wd)} 도 퍼 세컨드`,
   calc:calcBlock([[[...K(Fs.m,Fs.e)],NS(Fs.m,Fs.e)],[['÷','(','2','×',...K(m.m,m.e),'×',...ks(v),')'],`…÷(2×${NS(m.m,m.e)}×${v})`,'분모 전체를 괄호로'],[['='],casioDec(Wr),'rad/s'],[['×','1','8','0','÷','SHIFT','×10ˣ','='],casioDec(Wd),'°/s']],['분모를 괄호로 묶지 않으면 2로만 나눈 뒤 나머지를 곱해 버려요',W_NEG,W_PI]),
   easy:'곱하기로 만든 식은 나누기로 거꾸로 풀 수 있어요. "힘이 이만큼이면, 얼마나 돌았길래?"를 구하는 거예요.'}},

/* 자이로 ③ 회전각 = 각속도 × 시간 */
angle(){
  const W=pick([5,10,12,15,20,30,45,90]), t=pick([2,3,4,6,8,10]), th=W*t, thr=th*Math.PI/180;
  return {kind:'응용',title:'회전한 각도 구하기',
   q:`차량이 커브를 도는 동안 자이로가 평균 ${W} {{dps}}를 ${t} {{s}} 동안 출력했다. 차량이 회전한 각도는 몇 {{deg}}이며, 몇 {{rad}}인가?`,
   first:['θ = Ω × t','° → rad: × π/180'],
   steps:[
    {h:'단위 확인',b:`<div class="ln">°/s × s = °</div><div class="rd">"초당 도"에 "초"를 곱하면 초가 지워지고 "도"만 남아요</div>`},
    {h:'공식',b:`<div class="ln">θ = Ω × t</div><div class="rd">"세타는 오메가 곱하기 티" · 일정한 속도로 돌 때</div>`},
    {h:'계산',b:`<div class="ln">θ = ${W} × ${t} = ${th}°</div>`},
    {h:'rad로 바꾸기',b:`<div class="ln">${th} × π/180 = ${fx(thr,4)} rad</div>`},
    {h:'검산',b:`<div class="ln">${th}° ÷ 360° = ${+(th/360).toFixed(3)} 바퀴</div><div class="rd">${th<=90?'90° 이하 = 직각 이하로 꺾음, 커브로 그럴듯함 ✓':th<=180?'U턴 이하 ✓':'한 바퀴 가까이 — 회전 교차로라면 가능 ✓'}</div>`}],
   ans:`θ = ${th}° ≈ ${fx(thr,3)} rad`,ansRead:`${th}도, ${fxR(thr)} 라디안`,
   calc:calcBlock([[[...ks(W),'×',...ks(t),'='],String(th),'도(°)'],[['×','SHIFT','×10ˣ','÷','1','8','0','='],piForm(th,180)],SDROW(thr,'rad')],[W_PI,W_SD]),
   easy:`시계 초침은 1초에 6°씩 돌아요. 10초면 60°. 자이로도 똑같이 "1초에 몇 도 × 몇 초"예요.`}},

/* 자이로 ④ 스케일 팩터 */
sf(){
  const SF=pick([2,5,8,10,20,25]), W=pick([10,20,25,40,50,100,150]), mV=SF*W, V=mV/1000, inv=Math.random()<.5;
  const base={kind:'응용',title:inv?'출력 전압에서 회전 속도 구하기':'스케일 팩터로 출력 전압 구하기',first:inv?['V → mV 먼저','Ω = 출력 ÷ SF']:['출력 = SF × Ω','mV → V: ÷ 1000']};
  if(!inv)return {...base,
   q:`[[scalefactor|스케일 팩터]]가 ${SF} {{mVdps}}인 자이로가 ${W} {{dps}}로 회전 중이다. 출력 전압 변화는 몇 {{V}}인가?`,
   steps:[{h:'단위 읽기',b:`<div>${SF} mV/(°/s) = "1 °/s 돌 때마다 ${SF} mV(밀리볼트)씩 변한다"</div>`},
    {h:'공식',b:`<div class="ln">출력 = SF × Ω</div><div class="rd">단위: mV/(°/s) × °/s = mV ✓</div>`},
    {h:'계산',b:`<div class="ln">${SF} × ${W} = ${mV} mV</div>`},
    {h:'mV → V',b:`<div class="ln">${mV} mV = ${mV} × 10⁻³ V = ${fx(V)} V</div><div class="rd">밀리 = 1000분의 1 → 1000으로 나누기</div>`},
    {h:'검산',b:`<div class="ln">${fx(V)} V × 1000 ÷ ${SF} = ${W} °/s ✓</div>`}],
   ans:`${mV} mV = ${fx(V)} V`,ansRead:`${mV} 밀리볼트 = ${fxR(V)} 볼트`,
   calc:calcBlock([[[...ks(SF),'×',...ks(W),'='],String(mV),'mV'],[['÷','1','0','0','0','='],fracScreen(mV,1000).s,'V'],...(fracScreen(mV,1000).sd?[SDROW(V)]:[])],[W_SD]),
   easy:`1 °/s마다 ${SF} mV씩 오르는 계단이에요. ${W}칸 올라가면 ${mV} mV.`};
  return {...base,
   q:`[[scalefactor|스케일 팩터]]가 ${SF} {{mVdps}}인 자이로의 출력이 ${fx(V)} {{V}} 변했다. 회전 속도는 몇 {{dps}}인가?`,
   steps:[{h:'단위 먼저 맞추기',b:`<div class="ln">${fx(V)} V = ${fx(V)} × 1000 mV = ${mV} mV</div><div class="rd">⚠ SF가 mV 단위라서 출력도 mV로 맞춰야 해요</div>`},
    {h:'공식 뒤집기',b:`<div class="ln">출력 = SF × Ω → Ω = 출력 ÷ SF</div>`},
    {h:'계산',b:`<div class="ln">Ω = ${mV} ÷ ${SF} = ${W} °/s</div><div class="rd">단위: mV ÷ mV/(°/s) = °/s ✓</div>`},
    {h:'검산',b:`<div class="ln">${SF} × ${W} = ${mV} mV = ${fx(V)} V ✓</div>`}],
   ans:`Ω = ${W} °/s`,ansRead:`${W} 도 퍼 세컨드`,
   calc:calcBlock([[[...ks(V),'×','1','0','0','0','='],String(mV),'mV로'],[['÷',...ks(SF),'='],String(W),'°/s']],['V를 mV로 안 바꾸고 나누면 1000배 작은 답이 나와요']),
   easy:'단위를 안 맞추면 1000배 틀려요. 이 문제의 함정은 V와 mV예요.'}},

/* 자이로 ⑤ 바이어스 누적 오차 */
bias(){
  const BS=pick([3,5,10,20,36,60]), tm=pick([6,10,15,30,45,90]), err=BS*tm/60, hr=tm/60;
  const fs=fracScreen(BS*tm,60);
  return {kind:'응용',title:'바이어스로 쌓이는 각도 오차',
   q:`[[bias|바이어스 안정도]]가 ${BS} {{dph}}인 자이로를 보정 없이 ${tm}분 동안 썼다. 바이어스가 그대로 쌓인다고 할 때 각도 오차는 최대 몇 °인가?`,
   first:['분 → 시간: ÷ 60','오차각 = 바이어스 × 시간'],
   steps:[{h:'단위 먼저 맞추기',b:`<div class="ln">${tm}분 = ${tm} ÷ 60 시간 = ${fx(hr,3)} hr</div><div class="rd">바이어스가 °/hr(시간당 도)라서 시간도 hr로</div>`},
    {h:'공식',b:`<div class="ln">오차각 = 바이어스 × 시간</div><div class="rd">θ = Ω × t와 같은 모양 · 가만히 있어도 "돌고 있다"고 착각한 양</div>`},
    {h:'계산',b:`<div class="ln">${BS} × ${fx(hr,3)} = ${fx(err,3)}°</div>`},
    {h:'참고: °/s로 보면',b:`<div class="ln">${BS} °/hr ÷ 3600 = ${fx(BS/3600,3)} °/s</div><div class="rd">아주 작아 보여도 시간이 지나면 쌓여요</div>`},
    {h:'검산',b:`<div class="ln">${tm}분은 1시간의 ${fx(hr,3)}배 → ${BS}°의 ${fx(hr,3)}배 = ${fx(err,3)}° ✓</div>`}],
   ans:`약 ${fx(err,3)}°`,ansRead:`${fxR(err)} 도`,
   calc:calcBlock([[[...ks(BS),'×',...ks(tm),'÷','6','0','='],fs.s],...(fs.sd?[SDROW(err)]:[])],[W_SD]),
   easy:'시계가 하루에 1분씩 빨라지면, 한 달 뒤엔 30분이 틀려요. 자이로 영점도 조금씩 틀린 게 계속 쌓여요. 그래서 GPS·자기센서로 가끔 바로잡아요.'}},

/* 정전용량 ① 평행판 C */
cap(base){
  const er=base?1:pick([1,1,3.9]), A=base?1:pick([0.25,0.5,1,2,4]), d=base?5:pick([1,2,2.5,4,5,10]);
  const Am=sci(A*1e-6), dm=sci(d*1e-6), top=8.85e-12*er*A*1e-6, C=top/(d*1e-6), pF=C*1e12;
  const medium=er===1?'공기 (εᵣ ≈ 1)':'산화막 SiO₂ (εᵣ ≈ 3.9)';
  return {kind:base?'기본':'유사',title:'평행판 정전용량 구하기',
   q:`평행판 전극: 면적 A = ${A} {{mm2}}, 간격 d = ${d} {{um}}, 판 사이는 ${medium}. ε₀ = 8.85 × 10⁻¹² {{Fm}}일 때 정전용량 C는 몇 {{pF}}인가?`,
   first:['mm² → m²: 지수 ×2','μm → m','C = ε₀εᵣA/d'],
   steps:[{h:'단위 먼저 맞추기',b:`<div class="ln">A = ${A} mm² = ${A} × (10⁻³)² m² = ${sciT(Am)} m²</div><div class="rd">⚠ 제곱 단위는 지수도 2배: −3 × 2 = −6</div><div class="ln">d = ${d} μm = ${sciT(dm)} m</div>`},
    {h:'공식',b:`<div class="ln">C = ε₀ × εᵣ × A ÷ d</div><div class="rd">"씨는 엡실론 제로 엡실론 알 에이 나누기 디"</div>`},
    {h:'분자(위) 계산',b:`<div class="ln">8.85 × 10⁻¹² × ${er} × ${sciT(Am)} = ${sciT(sci(top))}</div><div class="rd">곱셈은 지수 더하기</div>`},
    {h:'나누기',b:`<div class="ln">${sciT(sci(top))} ÷ ${sciT(dm)} = ${sciT(sci(C))} F</div><div class="rd">나눗셈은 지수 빼기</div>`},
    {h:'pF로 바꾸기',b:`<div class="ln">1 pF = 10⁻¹² F → ${sciT(sci(C))} F = ${fx(pF)} pF</div>`},
    {h:'검산 — 지름길',b:`<div class="ln">A(10⁻⁶)와 d(10⁻⁶)의 지수가 서로 지워짐</div><div class="ln">→ C ≈ 8.85 × ${er} × ${A} ÷ ${d} = ${fx(pF)} pF ✓</div><div class="rd">mm²·μm 조합이면 pF가 바로 나와요 [AI 보충]</div>`}],
   ans:`C ≈ ${sciT(sci(C))} F = ${fx(pF)} pF`,ansRead:`${fxR(pF)} 피코패럿`,
   calc:calcBlock([[['8','.','8','5','×10ˣ','(−)','1','2'],'8.85×10⁻¹²'],...(er!==1?[[['×','3','.','9'],'…×3.9']]:[]),[['×',...K(A,-6)],`…×${NS(A,-6)}`],[['÷',...K(d,-6)],`…÷${NS(d,-6)}`],[['='],casioDec(C),'F']],['[×10ˣ]로 넣은 수는 한 덩어리라 괄호 없이 나눠도 돼요',W_NEG]),
   easy:`판이 넓을수록, 가까울수록, 사이 물질이 전기를 잘 받아들일수록(εᵣ) 그릇이 커져요. ${er!==1?'산화막은 공기보다 3.9배 잘 받아들여요.':''}`}},

/* 정전용량 ② 간격 변화 (가속도계·자이로 감지) */
capGap(){
  const C0=pick([1.5,2,2.5,3,4]), d0=pick([2,4,5]), dd=pick([0.1,0.2,0.25,0.5]).valueOf();
  const d1=+(d0-dd).toFixed(2), C1=C0*d0/d1, dC=C1-C0, pct=dC/C0*100;
  return {kind:'응용',title:'간격이 줄면 C는 얼마나 늘까',
   q:`MEMS 가속도계의 감지 전극이 처음에 C₀ = ${C0} {{pF}}, 간격 ${d0} {{um}}이다. 가속도 때문에 간격이 ${dd} μm 줄었다. 새 정전용량 C와 변화량 ΔC는?`,
   first:['C ∝ 1/d','C = C₀ × d₀ ÷ d','비율 계산은 단위 변환 불필요'],
   steps:[{h:'무엇이 그대로인가',b:`<div>ε와 A는 그대로, d만 변함 → <b>C는 d에 반비례</b></div><div class="ln">C × d = 일정 → C = C₀ × d₀ ÷ d</div>`},
    {h:'새 간격',b:`<div class="ln">d = ${d0} − ${dd} = ${d1} μm</div>`},
    {h:'새 C',b:`<div class="ln">C = ${C0} × ${d0} ÷ ${d1} = ${fx(C1,4)} pF</div><div class="rd">μm ÷ μm → 단위가 지워져서 m로 바꿀 필요 없어요</div>`},
    {h:'변화량',b:`<div class="ln">ΔC = ${fx(C1,4)} − ${C0} = ${fx(dC,3)} pF</div><div class="ln">변화율 = ${fx(dC,3)} ÷ ${C0} × 100 = ${fx(pct,3)} %</div>`},
    {h:'검산',b:`<div class="rd">간격이 줄었으니 C는 커져야 함 → ${fx(C1,4)} > ${C0} ✓</div>`}],
   ans:`C ≈ ${fx(C1,4)} pF · ΔC ≈ ${fx(dC,3)} pF (+${fx(pct,3)} %)`,ansRead:`${fxR(C1,4)} 피코패럿, 변화량 ${fxR(dC)} 피코패럿`,
   calc:calcBlock([[[...ks(C0),'×',...ks(d0),'÷','(',...ks(d0),'−',...ks(dd),')'],`${C0}×${d0}÷(${d0}−${dd})`,'새 간격을 괄호로'],[['='],casioDec(C1),'분수로 나오면 S⇔D'],[['Ans','−',...ks(C0),'='],casioDec(dC),'ΔC']],['여기 [−]는 빼기 키가 맞아요 (지수 부호가 아님)','괄호를 빼면 d₀를 나눈 뒤 dd를 빼 버려요']),
   easy:'두 판이 조금만 가까워져도 그릇이 커져요. 간격이 10% 줄면 C는 약 11% 늘어요(반비례라 딱 10%는 아님).'}},

/* 정전용량 ③ 유전율 변화 (습도센서) */
capEps(){
  const e0=pick([3,3.5,4]), de=pick([0.3,0.5,0.6,1]), e1=+(e0+de).toFixed(1), C0=pick([50,100,120,200]), C1=C0*e1/e0, pct=(e1/e0-1)*100;
  return {kind:'응용',title:'습기를 먹으면 C는 얼마나 늘까',
   q:`습도센서: 폴리머 막(εᵣ = ${e0})을 사이에 둔 전극의 정전용량이 ${C0} {{pF}}이다. 습기를 흡수해 εᵣ가 ${e1}로 커졌다. 새 정전용량은?`,
   first:['C ∝ ε','C = C₀ × εᵣ₁ ÷ εᵣ₀'],
   steps:[{h:'무엇이 그대로인가',b:`<div>A와 d는 그대로, ε만 변함 → <b>C는 ε에 비례</b></div>`},
    {h:'공식',b:`<div class="ln">C = C₀ × εᵣ₁ ÷ εᵣ₀</div><div class="rd">εᵣ는 단위가 없는 숫자(비유전율)</div>`},
    {h:'계산',b:`<div class="ln">C = ${C0} × ${e1} ÷ ${e0} = ${fx(C1,4)} pF</div>`},
    {h:'변화율',b:`<div class="ln">${e1} ÷ ${e0} = ${fx(e1/e0,4)} → +${fx(pct,3)} %</div>`},
    {h:'검산',b:`<div class="rd">ε가 커졌으니 C도 커져야 함 ✓ · 물의 εᵣ ≈ 80이라 조금만 흡수해도 C가 변해요</div>`}],
   ans:`C ≈ ${fx(C1,4)} pF (+${fx(pct,3)} %)`,ansRead:`${fxR(C1,4)} 피코패럿`,
   calc:calcBlock([[[...ks(C0),'×',...ks(e1),'÷',...ks(e0),'='],fracScreen(Math.round(C0*e1*10),Math.round(e0*10)).s],...(fracScreen(Math.round(C0*e1*10),Math.round(e0*10)).sd?[SDROW(C1)]:[])],[W_SD]),
   easy:'물은 전기를 아주 잘 받아들이는 물질이에요(εᵣ ≈ 80). 막이 습기를 머금으면 그릇이 커져서 C가 늘고, 그걸로 습도를 알아내요.'}}
};
/* 페이지별 문제 묶음: [생성기, 기본으로 시작?] */
const PSET={gyro:[['coriolis',true],['coriolis'],['coriolisInv'],['angle'],['sf'],['bias']],cap:[['cap',true],['cap'],['capGap'],['capEps']]};
const TOPICS={gyro:{name:'자이로',g:['coriolis','coriolisInv','angle','sf','bias']},cap:{name:'정전용량',g:['cap','capGap','capEps']}};
