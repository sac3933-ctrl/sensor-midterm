/* ═════════ 제0편 6장 회로 법칙과 시간 응답 (KVL·KCL·RC) ═════════ */
Object.assign(TERM,{
 kcl:{ko:'키르히호프 전류 법칙 (KCL)',en:"Kirchhoff's Current Law",gen:'한 점으로 들어온 전류의 합 = 나간 전류의 합.',tech:'임의의 마디(node)에서 ΣI_in = ΣI_out (전하 보존). 병렬 회로의 전류 분배, op-amp 입력 마디 해석의 근거.',easy:'세 갈래 수도관 이음에서, 들어온 물이 어디로 사라지지 않고 나가는 물과 같아요.',ex:'마디로 3 mA와 2 mA가 들어오고 한쪽으로 4 mA가 나가면, 나머지 한쪽으로 1 mA가 나가야 해요.',sum:'마디에서 들어온 전류 합 = 나간 전류 합'},
 kvl:{ko:'키르히호프 전압 법칙 (KVL)',en:"Kirchhoff's Voltage Law",gen:'닫힌 고리를 한 바퀴 돌면 전압의 합은 0.',tech:'임의의 폐회로에서 Σ(전압 상승) = Σ(전압 강하) (에너지 보존). 전압 분배, 브리지 출력 식의 근거.',easy:'산을 한 바퀴 돌아 제자리에 오면 오른 높이와 내려온 높이가 같아요.',ex:'5 V 전원에 저항 두 개가 직렬이고 첫 저항에서 3 V가 떨어지면, 두 번째 저항에서는 반드시 2 V가 떨어져요.',sum:'폐회로 한 바퀴 전압 상승 합 = 강하 합'},
 node:{ko:'마디',en:'Node',gen:'회로에서 두 개 이상의 소자가 만나는 점.',tech:'같은 도선으로 이어진 점들은 모두 같은 전위(한 마디). KCL을 세우는 단위.',easy:'전선이 갈라지거나 모이는 이음매예요.',ex:'전압 분배기에서 R₁과 R₂가 만나는 점이 V_out을 재는 마디예요.',sum:'소자들이 만나는 같은 전위의 점'},
 rcconst:{ko:'RC 시정수',en:'RC time constant (τ = RC)',gen:'커패시터가 63 %까지 충전되는 데 걸리는 시간.',tech:'τ = R·C [s]. 충전 V(t) = V_s(1 − e^(−t/τ)), 방전 V(t) = V₀·e^(−t/τ). 1τ 63.2 %, 3τ 95 %, 5τ 99.3 %. 저역통과 필터 f_c = 1/(2πτ).',easy:'물통(C)에 가는 호스(R)로 물을 채우면, 처음엔 빨리 차다가 찰수록 천천히 차요.',ex:'10 kΩ과 100 μF면 τ = 1 s예요. 1초 뒤 63 %, 5초 뒤 거의 다 차요.',sum:'τ = RC, 1τ에 63 %, 5τ면 거의 끝'},
 firstorder:{ko:'1차 응답',en:'First-order response',gen:'처음엔 빠르고 갈수록 느려지며 목표에 다가가는 변화.',tech:'y(t) = y_f + (y₀ − y_f)e^(−t/τ). RC 회로, RL 회로(τ = L/R), 온도센서 응답, 탱크 레벨 등 많은 시스템이 같은 모양.',easy:'뜨거운 커피가 식는 모양, 온도계가 올라가는 모양이 모두 같은 곡선이에요.',ex:'시정수 5 s인 온도센서를 끓는 물에 넣으면 5초 뒤 63 %, 25초 뒤 99 %까지 올라가요.',sum:'지수 곡선으로 목표에 다가가는 응답, 기준은 τ'}
});
FORM.push(
 {eq:'ΣI_in = ΣI_out',read:'들어온 전류 합은 나간 전류 합',name:'KCL',page:'kirch',sec:0,syms:[]},
 {eq:'Σ전압 상승 = Σ전압 강하',read:'한 바퀴 돌면 전압 합 0',name:'KVL',page:'kirch',sec:0,syms:[]},
 {eq:'V(t) = V_s(1 − e^(−t/τ)),  τ = RC',read:'충전 곡선',name:'RC 충전',page:'kirch',sec:2,syms:[['τ','시정수','s']]},
 {eq:'V(t) = V₀·e^(−t/τ)',read:'방전 곡선',name:'RC 방전',page:'kirch',sec:2,syms:[]},
 {eq:'t = −τ·ln(1 − x)',read:'x 비율까지 걸리는 시간',name:'목표 비율 도달 시간',page:'kirch',sec:2,syms:[]},
 {eq:'τ = L/R',read:'RL 시정수',name:'RL 시정수',page:'kirch',sec:3,syms:[]}
);

ANIM.rcCurve=host=>{let R=10,C=100,dis=false;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 220" role="img" aria-label="RC 충전 곡선"></svg><div class="figctl"><label class="small">R <input type="range" min="1" max="20" step="1" value="10" data-r style="width:90px"> <b data-rv>10 kΩ</b></label><label class="small">C <input type="range" min="10" max="200" step="10" value="100" data-c style="width:90px"> <b data-cv>100 μF</b></label><button class="ghost" data-d>방전 보기</button></div>
   <div class="tofcalc mono small" data-o></div><figcaption>가로축은 시간(0~5 s), 세로축은 전원 대비 전압(%). 점선이 τ, 2τ … 위치예요. R이나 C를 키우면 곡선이 느려져요(τ = RC).</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const draw=()=>{const tau=R*1e3*C*1e-6;const X=t=>40+t/5*285,Y=v=>190-v*160;let d='';for(let i=0;i<=200;i++){const t=i/200*5;const v=dis?Math.exp(-t/tau):1-Math.exp(-t/tau);d+=(i?'L':'M')+X(t).toFixed(1)+' '+Y(v).toFixed(1)}
   let marks='';for(let k=1;k<=5;k++){const t=k*tau;if(t<=5){const v=dis?Math.exp(-k):1-Math.exp(-k);marks+=`<line x1="${X(t)}" y1="30" x2="${X(t)}" y2="190" style="stroke:var(--line);stroke-dasharray:3 3"/><text x="${X(t)}" y="206" text-anchor="middle" class="small2">${k}τ</text><circle cx="${X(t)}" cy="${Y(v)}" r="3.5" style="fill:var(--warn)"/>${k<=2?`<text x="${X(t)+4}" y="${Y(v)-6}" class="small2">${(v*100).toFixed(1)}%</text>`:''}`}}
   svg.innerHTML=`<line x1="40" y1="190" x2="325" y2="190" style="stroke:var(--ink)"/><line x1="40" y1="30" x2="40" y2="190" style="stroke:var(--ink)"/>${[0,50,100].map(p=>`<text x="34" y="${Y(p/100)+4}" text-anchor="end" class="small2">${p}%</text>`).join('')}${tx(325,220,'시간 (0~5 s) →','small2','end')}${marks}<path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.6"/>`;
   q('[data-o]').innerHTML=`τ = R·C = ${R} kΩ × ${C} μF = ${R}×10³ × ${C}×10⁻⁶ = <b>${tau.toFixed(2)} s</b> · ${dis?'방전: 1τ 뒤 36.8 % 남음':'충전: 1τ 뒤 63.2 %'}`};
  q('[data-r]').oninput=e=>{R=+e.target.value;q('[data-rv]').textContent=R+' kΩ';draw()};q('[data-c]').oninput=e=>{C=+e.target.value;q('[data-cv]').textContent=C+' μF';draw()};
  q('[data-d]').onclick=e=>{dis=!dis;e.target.textContent=dis?'충전 보기':'방전 보기';draw()};draw();return null};

Object.assign(FIG,{
 kclkvl(){return svgFig(340,200,`${tx(80,16,'KCL — 마디','b2','middle')}<circle cx="80" cy="100" r="6" style="fill:var(--ink)"/>
   ${ar(20,60,74,96,'a',2)}${ar(20,140,74,104,'a',2)}${ar(86,96,140,60,'u',2)}${ar(86,104,140,140,'u',2)}${tx(18,54,'I₁ 3 mA','a small2')}${tx(18,156,'I₂ 2 mA','a small2')}${tx(142,56,'I₃ 4 mA','u small2','end')}${tx(142,160,'I₄ = ?','u small2','end')}${tx(80,184,'3 + 2 = 4 + I₄ → I₄ = 1 mA','small2','middle')}
   ${tx(255,16,'KVL — 고리','b2','middle')}${wire('M200 50 H310 V150 H200 Z')}<rect x="190" y="80" width="20" height="40" rx="3" style="fill:var(--surface);stroke:var(--ink)"/>${tx(200,104,'5V','small2','middle')}
   ${rbox(240,42,40,16,'R₁')}${rbox(302,85,16,30,'')}${tx(330,104,'R₂','small2')}${tx(260,36,'−3 V','w small2','middle')}${tx(300,138,'−2 V','w small2','end')}${tx(255,184,'+5 − 3 − 2 = 0','small2','middle')}`,'KCL과 KVL','왼쪽: 마디로 들어온 전류 = 나간 전류. 오른쪽: 고리를 한 바퀴 돌면 전원에서 오른 전압과 저항에서 내려간 전압이 같아요.')}
});

Object.assign(GEN,{
 kclNode(base){const i1=base?3:pick([1.5,2,3,5,7]),i2=base?2:pick([0.5,1,2.5,4]),i3=base?4:pick([1,2,3,4]);const i4=+(i1+i2-i3).toFixed(3);if(i4<=0)return GEN.kclNode(base);
  return {kind:base?'기본':'유사',title:'KCL — 마디 전류',fig:FIG.kclkvl(),q:`한 마디로 I₁ = ${i1} {{mA}}, I₂ = ${i2} mA가 들어오고 I₃ = ${i3} mA가 나간다. 나머지 가지 I₄는 몇 mA이고 방향은?`,first:['들어온 합 = 나간 합'],
   steps:[{h:'식 세우기',b:`<div class="ln">${i1} + ${i2} = ${i3} + I₄</div>`},{h:'풀기',b:`<div class="ln">I₄ = ${fx(i1+i2,4)} − ${i3} = ${fx(i4,4)} mA (나가는 방향)</div><div class="rd">답이 음수면 처음 가정한 방향의 반대</div>`}],
   ans:`${fx(i4,4)} mA, 나가는 방향`,ansRead:`${fxR(i4,4)} 밀리암페어`,calc:calcBlock([[[...ks(i1),'+',...ks(i2),'−',...ks(i3),'='],String(i4)]],[]),easy:'갈림길에서 전류는 사라지지도 생기지도 않아요. 들어온 만큼 나가요.'}},
 kvlLoop(base){const two=!base&&Math.random()<.5;const V1=base?12:pick([5,9,12,24]),V2=two?pick([3,5]):0,R1=base?2:pick([1,2,4.7]),R2=base?4:pick([1,3,5.3]);const I=(V1-V2)/(R1+R2);const v1=I*R1,v2=I*R2;
  return {kind:base?'기본':'응용',title:two?'KVL — 전원 두 개가 마주 볼 때':'KVL — 직렬 고리',q:two?`${V1} V 전원과 ${V2} V 전원이 서로 반대 방향으로 R₁ = ${R1} {{kohm}}, R₂ = ${R2} kΩ과 한 고리에 있다. 전류와 각 저항의 전압은?`:`${V1} {{V}} 전원에 R₁ = ${R1} {{kohm}}, R₂ = ${R2} kΩ이 직렬이다. 전류와 각 저항의 전압을 KVL로 구하고 검산하라.`,first:['전류 방향 가정','KVL: 상승 합 = 강하 합'],
   steps:[{h:'KVL 식',b:`<div class="ln">${two?`${V1} − ${V2}`:V1} = I·${R1} + I·${R2}</div><div class="rd">${two?'반대로 놓인 전원은 빼기':'전원에서 오르고 저항마다 내려감'}</div>`},{h:'전류',b:`<div class="ln">I = ${fx(V1-V2,4)} ÷ ${fx(R1+R2,4)} kΩ = ${fx(I,4)} mA</div><div class="rd">V ÷ kΩ = mA</div>`},
    {h:'각 전압',b:`<div class="ln">V₁ = ${fx(I,4)} × ${R1} = ${fx(v1,4)} V · V₂ = ${fx(I,4)} × ${R2} = ${fx(v2,4)} V</div>`},{h:'검산 (KVL)',b:`<div class="ln">${fx(v1,4)} + ${fx(v2,4)} = ${fx(v1+v2,4)} V = ${fx(V1-V2,4)} V ✓</div>`}],
   ans:`I = ${fx(I,4)} mA · V₁ = ${fx(v1,4)} V · V₂ = ${fx(v2,4)} V`,ansRead:`${fxR(I,4)} 밀리암페어`,calc:calcBlock([[['(',...ks(V1),'−',...ks(V2),')','÷','(',...ks(R1),'+',...ks(R2),')','='],casioDec(I),'mA']],[]),
   easy:'고리를 한 바퀴 돌면 오른 만큼 내려와요. 그래서 저항 전압들을 더하면 전원 전압이 돼요.'}},
 rcCharge(base){const R=base?10:pick([1,4.7,10,22,47]),C=base?100:pick([1,10,47,100,220]);const tau=R*1e3*C*1e-6;const Vs=base?5:pick([3.3,5,10,12]);const mode=base?'v':pick(['v','t']);
  if(mode==='v'){const n=base?1:pick([0.5,1,2,3]);const t=n*tau;const V=Vs*(1-Math.exp(-n));
   return {kind:base?'기본':'유사',title:'RC 충전 — 시간 뒤 전압',fig:null,q:`R = ${R} {{kohm}}, C = ${C} {{uF}}인 회로에 ${Vs} V를 걸었다(처음 0 V). ${fx(t*1000>=1000?t:t*1000,4)} ${t>=1?'s':'ms'} 뒤 커패시터 전압은?`,first:['τ = RC','V = V_s(1 − e^(−t/τ))'],
    steps:[{h:'τ',b:`<div class="ln">τ = ${R}×10³ × ${C}×10⁻⁶ = ${fx(tau,4)} s</div><div class="rd">kΩ × μF = ms 단위로 바로: ${R} × ${C} = ${fx(R*C,4)} ms</div>`},{h:'t/τ',b:`<div class="ln">${fx(t,4)} ÷ ${fx(tau,4)} = ${n}</div>`},{h:'전압',b:`<div class="ln">${Vs} × (1 − e^(−${n})) = ${Vs} × ${fx(1-Math.exp(-n),4)} = ${fx(V,4)} V</div><div class="rd">1τ면 63.2 %</div>`}],
    ans:`${fx(V,4)} V`,ansRead:`${fxR(V,4)} 볼트`,calc:calcBlock([[[...ks(Vs),'×','(','1','−','SHIFT','ln','(−)',...ks(n),')',')','='],casioDec(V)]],['SHIFT ln = eˣ']),
    easy:'처음엔 빨리, 나중엔 천천히 차요. 시정수 한 번이면 63 %예요.'}}
  const x=pick([0.5,0.9,0.95,0.99]);const t=-tau*Math.log(1-x);
  return {kind:'응용',title:'RC 충전 — 목표까지 걸리는 시간',q:`R = ${R} kΩ, C = ${C} μF 회로가 최종값의 ${x*100} %까지 충전되는 데 걸리는 시간은?`,first:['t = −τ·ln(1 − x)'],
   steps:[{h:'τ',b:`<div class="ln">τ = ${R} × ${C} = ${fx(R*C,4)} ms</div>`},{h:'시간',b:`<div class="ln">t = −${fx(R*C,4)} × ln(1 − ${x}) = ${fx(t*1000,4)} ms (${fx(t/tau,3)}τ)</div><div class="rd">50 % ≈ 0.69τ · 95 % ≈ 3τ · 99 % ≈ 4.6τ</div>`}],
   ans:`${fx(t*1000,4)} ms`,ansRead:`${fxR(t*1000,4)} 밀리초`,calc:calcBlock([[['(−)',...ks(+(R*C).toFixed(3)),'×','ln','(','1','−',...ks(x),')',')','='],casioDec(t*1000),'ms']],['ln 키']),
   easy:'목표 비율을 정하면 ln으로 거꾸로 시간을 구해요.'}},
 rlTau(){const L=pick([1,10,47,100]),R=pick([10,47,100,1000]);const tau=L*1e-3/R;
  return {kind:'유사',title:'RL 시정수',q:`L = ${L} {{mH}} 코일과 R = ${R} {{ohm}}의 시정수는? 전류가 거의 다 오르는(5τ) 시간은?`,first:['τ = L/R'],
   steps:[{h:'τ',b:`<div class="ln">${L}×10⁻³ ÷ ${R} = ${sciT(sci(tau,4))} s = ${fx(tau*1e6,4)} μs</div>`},{h:'5τ',b:`<div class="ln">${fx(5*tau*1e6,4)} μs</div><div class="rd">RC는 τ = RC, RL은 τ = L/R — 곡선 모양은 같아요</div>`}],
   ans:`τ = ${fx(tau*1e6,4)} μs · 5τ = ${fx(5*tau*1e6,4)} μs`,ansRead:`${fxR(tau*1e6,4)} 마이크로초`,calc:calcBlock([[[...K(L,-3),'÷',...ks(R),'='],casioDec(tau)],[['ENG'],`${fx(tau*1e6,4)}×10⁻⁶`]],[W_NEG]),easy:'코일은 전류가 갑자기 바뀌는 걸 싫어해서, 전류가 천천히 올라가요.'}}
});
PSET.kirch=[['kclNode',true],['kclNode'],['kvlLoop',true],['kvlLoop'],['rcCharge',true],['rcCharge'],['rcCharge'],['rlTau'],['dividerG']];
TOPICS.kirch={name:'회로 법칙·RC',g:['kclNode','kvlLoop','rcCharge','rlTau']};['kclNode','kvlLoop','rcCharge'].forEach(g=>BASICG.add(g));

PAGES.kirch={title:'회로 법칙과 시간 응답',part:'제0편 6장',secs:[
 {k:'KCL·KVL',h:'회로를 푸는 두 법칙',b:`<p class="small muted">[AI 보충] 강의 밖 기초 · 전압 분배·브리지·op-amp 식이 모두 이 두 법칙에서 나와요.</p>${FIG.kclkvl()}
   <div class="f4"><div><div class="h">[[kcl|KCL]] — 전류</div><div class="ln">ΣI_in = ΣI_out</div><div class="rd">[[node|마디]]에서 전하가 쌓이지 않음 (전하 보존)</div></div><div><div class="h">[[kvl|KVL]] — 전압</div><div class="ln">Σ상승 = Σ강하</div><div class="rd">고리 한 바퀴 (에너지 보존)</div></div></div>`,
  easy:'전류는 갈림길에서 사라지지 않고, 전압은 한 바퀴 돌면 제자리예요. 이 두 문장으로 웬만한 센서 회로를 풀 수 있어요.',
  ex:'전압 분배기: KVL로 V_in = I·R₁ + I·R₂ → I = V_in/(R₁+R₂) → V_out = I·R₂ = V_in·R₂/(R₁+R₂). 외우던 식이 두 줄로 나와요.',sum:'KCL은 전하 보존, KVL은 에너지 보존'},
 {k:'풀이 순서',h:'법칙으로 회로 풀기 — 4단계',b:`<ol class="clean"><li>전류 방향을 아무렇게나 정한다 (화살표)</li><li>저항마다 전압 = I·R (전류가 들어가는 쪽이 +)</li><li>고리마다 KVL, 마디마다 KCL 식</li><li>연립해서 푼다 → 음수면 실제 방향은 반대</li></ol>
   <div class="rel">휘트스톤 브리지 = 전압 분배기 두 개 → 왼쪽 중점 − 오른쪽 중점 = V_o</div><button class="ghost" data-goto="circuit" data-i="2">↗ 브리지 (제0편 5장)</button>`,
  easy:'방향을 틀리게 정해도 괜찮아요. 답이 마이너스로 나와서 알려 줘요.',
  ex:'12 V와 5 V 전원이 마주 보고 2 kΩ + 5 kΩ이 직렬이면, 12 − 5 = I × 7 kΩ → I = 1 mA. 2 kΩ에 2 V, 5 kΩ에 5 V가 걸려요.',sum:'방향 가정 → IR → KVL·KCL → 연립'},
 {k:'RC 충·방전',h:'RC 회로 — 시간이 걸리는 이유',b:`<div data-anim="rcCurve"></div><div class="eqn">V(t) = V_s(1 − e^(−t/τ)),  τ = RC<small>[[rcconst|시정수]] · 방전 V₀e^(−t/τ) · kΩ × μF = ms</small></div>
   <div class="tblwrap fit"><table><tr><th>시간</th><th>충전</th><th>방전</th></tr><tr><td>1τ</td><td class="mono">63.2 %</td><td class="mono">36.8 %</td></tr><tr><td>2τ</td><td class="mono">86.5 %</td><td class="mono">13.5 %</td></tr><tr><td>3τ</td><td class="mono">95.0 %</td><td class="mono">5.0 %</td></tr><tr><td>5τ</td><td class="mono">99.3 %</td><td class="mono">0.7 %</td></tr></table></div>
   <p class="small">센서에서: RC 필터 f_c = 1/(2πτ) · 버튼·리밋 스위치 떨림 제거(디바운스) · 정전용량 센서를 충전 시간으로 읽기</p>`,
  easy:'물통에 물을 채울 때 처음엔 빨리, 찰수록 천천히 차요. 그 속도를 정하는 게 τ예요.',
  ex:'1 kΩ과 1 μF면 τ = 1 ms → f_c = 1/(2π × 0.001) ≈ 159 Hz. 이 RC 필터는 약 160 Hz보다 빠른 잡음을 줄여요.',sum:'τ = RC, 1τ 63 %, 5τ 끝 — 필터 f_c와 같은 τ'},
 {k:'1차 응답',h:'RL과 1차 응답 — 같은 모양 곡선',b:`<div class="eqn">y(t) = y_f + (y₀ − y_f)·e^(−t/τ)<small>[[firstorder|1차 응답]] · RL은 τ = L/R</small></div>
   <ul class="clean"><li>RC 전압, RL 전류, 온도센서 응답, 탱크 레벨, 모터 속도 — 모두 같은 곡선</li><li>그래서 센서 사양의 응답시간(t₆₃, t₉₀)도 이 모양으로 읽어요 (t₉₀ ≈ 2.3τ)</li></ul><button class="ghost" data-goto="temp" data-i="5">↗ 온도센서 시정수</button> <button class="ghost" data-goto="char" data-i="5">↗ 응답시간 t₉₀</button>`,
  easy:'커피가 식는 모양, 온도계가 오르는 모양, 콘덴서가 차는 모양이 다 같은 곡선이에요.',
  ex:'t₉₀ = −τ·ln(0.1) ≈ 2.3τ. 시정수 4 s 센서면 90 %까지 약 9.2초 걸려요.',sum:'1차 시스템은 모두 같은 지수 곡선, 기준은 τ'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>KCL: 들어온 전류 = 나간 전류 · KVL: 한 바퀴 상승 = 강하</li><li>τ = RC (kΩ × μF = ms), τ = L/R · 1τ 63 %, 3τ 95 %, 5τ 99 %</li><li>t = −τ·ln(1 − x) · f_c = 1/(2πτ)</li></ol>
   <details class="qa"><summary>전류 방향을 반대로 가정하면?</summary><div>계산은 그대로 하고, 답이 음수로 나오면 실제 방향이 반대라는 뜻.</div></details>
   <details class="qa"><summary>R을 2배로 하면 충전은?</summary><div>τ가 2배 → 같은 비율까지 2배 오래 걸림. f_c는 절반.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'kc1',tag:'회로 법칙',f:'KCL과 KVL',a:'마디: 들어온 전류 = 나간 전류 · 고리: 전압 상승 = 강하',r:'전하 보존 · 에너지 보존',e:''},
 {id:'kc2',tag:'회로 법칙',f:'RC 시정수와 63 %',a:'τ = RC, 1τ에 63.2 %, 5τ에 99.3 %',r:'kΩ × μF = ms',e:''},
 {id:'kc3',tag:'회로 법칙',f:'x 비율까지 걸리는 시간',a:'t = −τ·ln(1 − x)',r:'50 % ≈ 0.69τ, 90 % ≈ 2.3τ',e:''},
 {id:'kc4',tag:'회로 법칙',f:'RL 시정수',a:'τ = L/R',r:'',e:''}
);
