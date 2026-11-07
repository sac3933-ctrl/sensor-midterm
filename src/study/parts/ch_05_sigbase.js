/* ═════════ 제0편 8장 신호 기초 (변화율·누적·샘플링·노이즈) ═════════ */
Object.assign(TERM,{
 derivative:{ko:'미분 (변화율)',en:'Derivative (rate of change)',gen:'얼마나 빠르게 변하는지.',tech:'dy/dx = 아주 짧은 구간의 Δy/Δx (그래프의 기울기). 속도 = 거리의 미분, 가속도 = 속도의 미분, 유도 전압 e = −N·dΦ/dt, 커패시터 전류 i = C·dV/dt.',easy:'자동차 계기판의 속도가 "지금 거리가 늘어나는 빠르기"예요. 그게 미분이에요.',ex:'온도가 10분 동안 20 °C에서 50 °C로 올랐다면 평균 변화율은 30 ÷ 10 = 3 °C/min이에요.',sum:'미분 = 기울기 = 단위 시간당 변화량'},
 integral:{ko:'적분 (누적)',en:'Integral (accumulation)',gen:'조금씩 쌓인 양의 합.',tech:'∫y dt = 그래프 아래 넓이. 가속도 → 속도 → 거리, 각속도 → 각도(자이로), 전류 → 전하, 유량 → 누적량. 오차도 함께 쌓여 드리프트가 생김.',easy:'통장 잔고는 매일 들어오고 나간 돈을 차곡차곡 더한 것, 그게 적분이에요.',ex:'유량계가 2 L/min을 30분 가리키면 누적량은 2 × 30 = 60 L예요. 그래프의 직사각형 넓이와 같아요.',sum:'적분 = 넓이 = 시간에 따라 쌓인 양'},
 nyquist:{ko:'나이퀴스트 조건',en:'Nyquist criterion',gen:'신호를 디지털로 바꿀 때 최소한 얼마나 자주 찍어야 하나.',tech:'샘플링 주파수 f_s > 2·f_max. 이보다 느리면 높은 주파수가 낮은 주파수로 둔갑(앨리어싱). 실무는 f_s ≈ 2.56·f_max + 아날로그 저역통과 필터(안티앨리어싱).',easy:'바퀴를 너무 드물게 사진 찍으면 앞으로 도는 바퀴가 멈추거나 거꾸로 도는 것처럼 보여요.',ex:'모터 진동을 1 kHz까지 보려면 최소 2 kHz, 실무로는 2.56 kHz 이상으로 샘플링해요.',sum:'f_s > 2·f_max, 실무 2.56배 + 필터'},
 aliasing:{ko:'앨리어싱',en:'Aliasing',gen:'느리게 샘플링해서 가짜 주파수가 보이는 현상.',tech:'f > f_s/2인 성분이 |f − k·f_s| 위치의 낮은 주파수로 접혀 보임. 샘플링 후에는 구분·제거 불가 → 샘플링 전에 필터로 막아야 함.',easy:'영화에서 헬리콥터 날개가 천천히 도는 것처럼 보이는 현상이에요.',ex:'f_s = 100 Hz로 90 Hz 진동을 찍으면 |90 − 100| = 10 Hz짜리 느린 신호로 보여요.',sum:'f_s/2보다 빠른 성분이 낮은 가짜 주파수로 보인다'},
 snr:{ko:'신호 대 잡음비',en:'SNR (Signal-to-Noise Ratio)',gen:'신호가 잡음보다 몇 배 큰가.',tech:'SNR = 신호 크기/잡음 크기, dB로 20·log(V_s/V_n) (전력비면 10·log). 랜덤 잡음은 N번 평균하면 1/√N로 줄어 SNR이 √N배.',easy:'시끄러운 공장에서 말소리가 소음보다 얼마나 큰지예요.',ex:'신호 100 mV, 잡음 1 mV면 SNR = 100배 = 40 dB. 같은 측정을 100번 평균하면 잡음이 0.1 mV로 줄어 60 dB가 돼요.',sum:'SNR(dB) = 20 log(V_s/V_n), N회 평균 → 잡음 1/√N'}
});
FORM.push(
 {eq:'변화율 = Δy/Δx (미분 = 기울기)',read:'와이 변화 나누기 엑스 변화',name:'미분 감각',page:'sigbase',sec:0,syms:[]},
 {eq:'누적량 = Σ(값 × Δt) (적분 = 넓이)',read:'값 곱하기 시간을 더함',name:'적분 감각',page:'sigbase',sec:1,syms:[]},
 {eq:'f_s > 2·f_max,  f_겉보기 = |f − k·f_s|',read:'나이퀴스트와 앨리어싱',name:'샘플링 조건',page:'sigbase',sec:2,syms:[]},
 {eq:'SNR = 20·log(V_s/V_n),  평균 N회 → 잡음 ÷ √N',read:'신호 대 잡음비',name:'SNR과 평균',page:'sigbase',sec:3,syms:[]}
);

ANIM.alias=host=>{let f=10;const fs=100;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 210" role="img" aria-label="샘플링과 앨리어싱"></svg><div class="figctl"><label class="small">주파수 <input type="range" min="2" max="190" step="1" value="10" data-f style="width:170px"> <b data-fv>10 Hz</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>회색 = 실제 신호, 점 = 100 Hz로 찍은 값(10 ms마다), 점선 = 점만 보고 이어 붙인 신호. 50 Hz(f_s/2)를 넘기면 점선이 실제보다 느린 가짜 파형이 돼요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const draw=()=>{const T=0.1,X=t=>30+t/T*300,Y=v=>95-v*60;let d='';for(let i=0;i<=600;i++){const t=i/600*T;d+=(i?'L':'M')+X(t).toFixed(1)+' '+Y(Math.sin(2*Math.PI*f*t)).toFixed(1)}
   const k=Math.round(f/fs);const fa=Math.abs(f-k*fs);const sgn=(f-k*fs)<0?-1:1;let a='';for(let i=0;i<=300;i++){const t=i/300*T;a+=(i?'L':'M')+X(t).toFixed(1)+' '+Y(sgn*Math.sin(2*Math.PI*fa*t)).toFixed(1)}
   let pts='';for(let n=0;n<=10;n++){const t=n/fs;pts+=`<circle cx="${X(t)}" cy="${Y(Math.sin(2*Math.PI*f*t))}" r="4" style="fill:var(--accent)"/>`}
   const ok=f<fs/2;
   svg.innerHTML=`<line x1="30" y1="95" x2="330" y2="95" style="stroke:var(--line)"/><path d="${d}" style="fill:none;stroke:var(--muted);stroke-width:1.2;opacity:.8"/><path d="${a}" style="fill:none;stroke:${ok?'var(--accent)':'var(--bad)'};stroke-width:2;stroke-dasharray:5 3"/>${pts}${tx(330,180,'0.1 s →','small2','end')}
    ${tx(30,192,ok?'f < f_s/2 → 제대로 복원':'f > f_s/2 → 가짜 '+fa+' Hz로 보임','b2')}`;
   q('[data-o]').innerHTML=`f_s = 100 Hz · 신호 ${f} Hz → 겉보기 |${f} − ${k}×100| = <b>${fa} Hz</b>${ok?' (정상)':' (앨리어싱!)'}`;q('[data-fv]').textContent=f+' Hz'};
  q('[data-f]').oninput=e=>{f=+e.target.value;draw()};draw();return null};

Object.assign(FIG,{
 slopeArea(){const X=t=>40+t*26,Y=v=>120-v*9;const pts=[[0,0],[2,2],[4,5],[6,9],[8,10],[10,10]];let d='';pts.forEach((p,i)=>d+=(i?'L':'M')+X(p[0])+' '+Y(p[1]));
  return svgFig(340,190,`${tx(40,16,'왼쪽: 기울기(미분) · 오른쪽: 넓이(적분)','b2')}<line x1="40" y1="120" x2="310" y2="120" style="stroke:var(--ink)"/><line x1="40" y1="25" x2="40" y2="120" style="stroke:var(--ink)"/>
   <path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.4"/><line x1="${X(2)}" y1="${Y(2)}" x2="${X(4)}" y2="${Y(2)}" style="stroke:var(--warn);stroke-width:1.6"/><line x1="${X(4)}" y1="${Y(2)}" x2="${X(4)}" y2="${Y(5)}" style="stroke:var(--warn);stroke-width:1.6"/>${tx(X(3),Y(2)+14,'Δt','w small2','middle')}${tx(X(4)+4,Y(3.5),'Δy','w small2')}
   ${[0,1,2,3,4].map(i=>`<rect x="${X(i*2)}" y="${Y(pts[i+1][1])}" width="${26*2}" height="${120-Y(pts[i+1][1])}" style="fill:var(--unit-soft,var(--surface2));opacity:.35"/>`).join('')}
   ${tx(310,138,'시간 →','small2','end')}${tx(40,160,'기울기 Δy/Δt = 지금 얼마나 빨리 변하나','small2')}${tx(40,178,'막대 넓이의 합 = 지금까지 쌓인 양','small2')}`,'변화율과 누적','같은 그래프에서 기울기를 보면 미분, 아래 넓이를 보면 적분이에요. 속도 그래프의 넓이 = 이동 거리, 거리 그래프의 기울기 = 속도.')}
});

Object.assign(GEN,{
 slopeG(base){const C=base?['온도','°C','min',20,50,10]:pick([['온도','°C','min',20,50,10],['탱크 레벨','m','h',1.2,3.6,4],['압력','kPa','s',100,160,30],['진동 RMS','mm/s','일',1.8,3.0,20]]);const r=(C[4]-C[3])/C[5];
  return {kind:base?'기본':'유사',title:'변화율 (미분 감각)',fig:FIG.slopeArea(),q:`${C[0]}가 ${C[5]} ${C[2]} 동안 ${C[3]} ${C[1]}에서 ${C[4]} ${C[1]}로 변했다. 평균 변화율은?`,first:['변화율 = Δ값 ÷ Δ시간','단위 = 값 단위/시간 단위'],
   steps:[{h:'Δ',b:`<div class="ln">Δ값 = ${C[4]} − ${C[3]} = ${fx(C[4]-C[3],4)} ${C[1]}</div>`},{h:'나누기',b:`<div class="ln">${fx(C[4]-C[3],4)} ÷ ${C[5]} = ${fx(r,4)} ${C[1]}/${C[2]}</div><div class="rd">[현업] 이 변화율이 기준보다 크면 경보 — 값보다 "변하는 속도"가 먼저 이상을 알려 줌</div>`}],
   ans:`${fx(r,4)} ${C[1]}/${C[2]}`,ansRead:`${fxR(r,4)}`,calc:calcBlock([[['(',...ks(C[4]),'−',...ks(C[3]),')','÷',...ks(C[5]),'='],casioDec(r)]],[]),easy:'얼마나 변했는지를 걸린 시간으로 나누면 "빠르기"가 나와요.'}},
 areaG(base){const C=base?['유량','L/min','min',2,30,'L']:pick([['유량','L/min','min',2,30,'L'],['전류','mA','s',5,60,'mC'],['각속도','°/s','s',15,8,'°'],['가속도','m/s²','s',2,3,'m/s']]);const A=C[3]*C[4];
  return {kind:base?'기본':'유사',title:'누적량 (적분 감각)',fig:FIG.slopeArea(),q:`${C[0]}가 ${C[3]} ${C[1]}로 ${C[4]} ${C[2]} 동안 일정했다. 쌓인 양은?`,first:['일정하면 값 × 시간 = 직사각형 넓이'],
   steps:[{h:'넓이',b:`<div class="ln">${C[3]} × ${C[4]} = ${fx(A,4)} ${C[5]}</div><div class="rd">값이 변하면 짧은 구간으로 나눠 더함 (사다리꼴)</div>`},{h:'센서에서',b:`<div class="rd">${C[0]==='각속도'?'자이로: 각속도 적분 = 회전각 · 바이어스 오차도 같이 쌓임':C[0]==='가속도'?'가속도 적분 = 속도, 한 번 더 = 거리':C[0]==='전류'?'mA × s = mC (전하)':'유량 적분 = 누적 사용량 (MES 실적)'}</div>`}],
   ans:`${fx(A,4)} ${C[5]}`,ansRead:`${fxR(A,4)}`,calc:calcBlock([[[...ks(C[3]),'×',...ks(C[4]),'='],casioDec(A)]],[]),easy:'일정한 빠르기로 시간만큼 쌓으면 곱하기예요.'}},
 aliasG(base){const fs=base?100:pick([100,200,500,1000]),f=base?90:Math.round(pick([0.3,0.7,0.9,1.1,1.3,1.8])*fs);const k=Math.round(f/fs);const fa=Math.abs(f-k*fs);const ok=f<fs/2;
  return {kind:base?'기본':'유사',title:'앨리어싱 — 겉보기 주파수',q:`${f} {{Hz}} 진동을 f_s = ${fs} Hz로 샘플링하면 몇 Hz로 보이는가? 제대로 보려면 최소 몇 Hz로 샘플링해야 하나?`,first:['f_s/2보다 크면 접힘','f_겉 = |f − k·f_s|'],
   steps:[{h:'조건 확인',b:`<div class="ln">f_s/2 = ${fs/2} Hz → ${f} ${ok?'<':'>'} ${fs/2}</div>`},{h:'겉보기',b:ok?`<div class="ln">${f} Hz 그대로</div>`:`<div class="ln">가장 가까운 f_s 배수 = ${k*fs} → |${f} − ${k*fs}| = ${fa} Hz</div><div class="rd">한 번 섞이면 데이터로는 구분 불가</div>`},{h:'필요한 f_s',b:`<div class="ln">> 2 × ${f} = ${2*f} Hz (실무 2.56배 ≈ ${fx(2.56*f,4)} Hz) + 안티앨리어싱 필터</div>`}],
   ans:`${ok?f:fa} Hz로 보임 · f_s > ${2*f} Hz`,ansRead:`${ok?f:fa} 헤르츠`,calc:'<p class="small muted">빼기와 절댓값만 — 가장 가까운 f_s 배수를 찾는 게 핵심이에요.</p>',easy:'너무 드물게 찍으면 빠른 떨림이 느린 떨림으로 둔갑해요.'}},
 snrG(base){const Vs=base?100:pick([10,50,100,500]),Vn=base?1:pick([0.5,1,2,5]);const snr=20*Math.log10(Vs/Vn);const N=pick([4,16,100]);const snr2=snr+10*Math.log10(N);
  return {kind:base?'기본':'응용',title:'SNR과 평균 효과',q:`신호 ${Vs} {{mV}}, 랜덤 잡음 ${Vn} mV(RMS)이다. SNR은 몇 dB이고, 같은 측정을 ${N}번 평균하면?`,first:['SNR = 20 log(V_s/V_n)','N회 평균 → 잡음 ÷ √N'],
   steps:[{h:'SNR',b:`<div class="ln">20 log(${Vs}/${Vn}) = 20 log(${fx(Vs/Vn,4)}) = ${fx(snr,4)} dB</div>`},{h:'평균',b:`<div class="ln">잡음 ${Vn} ÷ √${N} = ${fx(Vn/Math.sqrt(N),4)} mV</div><div class="ln">SNR = ${fx(snr2,4)} dB (+${fx(10*Math.log10(N),3)} dB)</div><div class="rd">랜덤 잡음만 줄어듦 · 60 Hz 험 같은 규칙적 간섭은 평균으로 안 줄어 → 필터·차폐</div>`}],
   ans:`${fx(snr,4)} dB → 평균 후 ${fx(snr2,4)} dB`,ansRead:`${fxR(snr,4)} 데시벨`,calc:calcBlock([[['2','0','log',...ks(Vs),'÷',...ks(Vn),')','='],casioDec(snr)]],[]),easy:'잡음은 들쭉날쭉해서 여러 번 평균하면 서로 지워져요. 4번이면 잡음 절반.'}},
 avgN(){const k=pick([2,3,5,10]);const N=k*k;
  return {kind:'유사',title:'잡음을 줄이려면 몇 번 평균?',q:`랜덤 잡음을 1/${k}로 줄이려면 몇 번 평균해야 하는가? 샘플링이 1 kHz면 출력 갱신은 몇 Hz가 되나?`,first:['잡음 ∝ 1/√N → N = k²'],
   steps:[{h:'N',b:`<div class="ln">√N = ${k} → N = ${N}</div>`},{h:'대가',b:`<div class="ln">1000 ÷ ${N} = ${fx(1000/N,4)} Hz</div><div class="rd">평균은 저역통과 필터와 같음 → 잡음↓ 대신 응답이 느려짐</div>`}],
   ans:`${N}번 · ${fx(1000/N,4)} Hz`,ansRead:`${N}번`,calc:'<p class="small muted">제곱 한 번이면 돼요.</p>',easy:'잡음을 절반으로 하려면 4번, 10분의 1이면 100번 평균해야 해요.'}}
});
PSET.sigbase=[['slopeG',true],['slopeG'],['areaG',true],['areaG'],['aliasG',true],['aliasG'],['nyqFs'],['snrG',true],['avgN']];
TOPICS.sigbase={name:'신호 기초',g:['slopeG','areaG','aliasG','snrG','avgN']};['slopeG','areaG','aliasG','snrG'].forEach(g=>BASICG.add(g));

PAGES.sigbase={title:'신호 기초 — 변화율·누적·샘플링·잡음',part:'제0편 8장',secs:[
 {k:'변화율',h:'미분 = 얼마나 빨리 변하나',b:`<p class="small muted">[AI 보충] 강의 밖 기초 · 수식 계산보다 "기울기와 넓이" 감각이 목표예요.</p>${FIG.slopeArea()}
   <div class="tblwrap fit"><table><tr><th>센서에서</th><th>무엇의 변화율</th></tr><tr><td>패러데이 유도</td><td class="small">e = −N·dΦ/dt (자속이 빨리 변할수록 큰 전압)</td></tr><tr><td>커패시터 전류</td><td class="small">i = C·dV/dt</td></tr><tr><td>가속도</td><td class="small">속도의 변화율</td></tr><tr><td>[현업] 경보</td><td class="small">온도 상승률 °C/min</td></tr></table></div>`,
  easy:'[[derivative|미분]]은 그래프의 기울기예요. 가파르면 빨리 변하는 중이에요.',
  ex:'속도센서 코일 옆으로 톤휠 이빨이 빨리 지나갈수록 자속이 빨리 변해 출력 전압이 커져요. 그래서 저속에서는 신호가 약해요.',sum:'미분 = 기울기 = 단위 시간당 변화'},
 {k:'누적',h:'적분 = 지금까지 쌓인 양',b:`<div class="f4"><div><div class="h">가속도 → 속도 → 거리</div>두 번 쌓기 · 작은 오차도 쌓여 커짐</div><div><div class="h">각속도 → 각도</div>자이로 바이어스 1 °/s를 1분 쌓으면 60° 틀림</div><div><div class="h">전류 → 전하</div>mA × s = mC</div><div><div class="h">유량 → 누적량</div>MES 사용량·생산 실적</div></div>
   <button class="ghost" data-goto="accel" data-i="6">↗ 평균값 적분 (가속도)</button>`,
  easy:'[[integral|적분]]은 그래프 아래 넓이예요. 매일 저금한 돈을 더하면 잔고가 되는 것과 같아요.',
  ex:'자이로 바이어스가 0.01 °/s만 있어도 1시간(3600 s) 적분하면 36°가 틀어져요. 그래서 자이로는 다른 센서로 주기적으로 보정해요.',sum:'적분 = 넓이 = 쌓인 양, 오차도 함께 쌓인다'},
 {k:'샘플링',h:'샘플링과 앨리어싱',b:`<div data-anim="alias"></div><div class="eqn">f_s > 2·f_max<small>[[nyquist|나이퀴스트]] · 실무 2.56배 · [[aliasing|앨리어싱]] f_겉 = |f − k·f_s|</small></div>
   <ul class="clean"><li>샘플링 <b>전에</b> 아날로그 저역통과 필터로 f_s/2 이상을 막아야 함 (뒤에서는 못 고침)</li><li>[현업] 히스토리안 저장 주기 1 s면 0.5 Hz보다 빠른 변화는 기록에서 사라짐</li></ul><button class="ghost" data-goto="signal">↗ ADC·분해능 (제1편 1장)</button>`,
  easy:'바퀴를 너무 드물게 찍으면 거꾸로 도는 것처럼 보여요. 신호도 너무 드물게 찍으면 가짜 느린 신호가 돼요.',
  ex:'펌프 베어링 결함 주파수가 180 Hz인데 PLC가 100 Hz로 진동을 읽으면 |180 − 200| = 20 Hz로 보여 엉뚱한 원인으로 오진할 수 있어요.',sum:'f_s > 2·f_max, 샘플링 전에 필터'},
 {k:'잡음·SNR',h:'잡음과 SNR — 평균의 힘과 한계',b:`<div class="eqn">SNR = 20·log(V_s/V_n)<small>[[snr|SNR]] · N회 평균 → 랜덤 잡음 ÷ √N (+10 log N dB)</small></div>
   <div class="tblwrap fit"><table><tr><th>잡음</th><th>줄이는 법</th></tr><tr><td>랜덤(열잡음)</td><td class="small">평균·대역폭 줄이기</td></tr><tr><td>60 Hz 험</td><td class="small">차폐·꼬임선·차동 입력·노치 필터</td></tr><tr><td>드리프트(느린 변화)</td><td class="small">기준 센서로 보상·주기 보정</td></tr><tr><td>스파이크</td><td class="small">중앙값 필터</td></tr></table></div>
   <button class="ghost" data-goto="accel" data-i="5">↗ 노이즈 밀도 (가속도)</button>`,
  easy:'신호가 잡음보다 몇 배 큰지가 SNR이에요. 들쭉날쭉한 잡음은 여러 번 평균하면 지워지지만, 규칙적인 간섭은 안 지워져요.',
  ex:'신호 50 mV, 잡음 2 mV면 SNR = 20 log 25 ≈ 28 dB. 16번 평균하면 잡음 0.5 mV, SNR ≈ 40 dB로 올라가요.',sum:'SNR(dB) = 20 log(V_s/V_n), 평균은 랜덤 잡음만 √N배 줄인다'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>미분 = 기울기(변화율), 적분 = 넓이(누적) — 오차도 쌓인다</li><li>f_s > 2·f_max (실무 2.56배), 샘플링 전에 필터 · f_겉 = |f − k·f_s|</li><li>SNR = 20 log(V_s/V_n) · N회 평균 → 잡음 1/√N</li></ol>
   <details class="qa"><summary>앨리어싱을 데이터 처리로 나중에 없앨 수 있나?</summary><div>없음. 샘플링 순간 진짜 주파수 정보가 사라지므로, 샘플링 전에 아날로그 필터로 막아야 함.</div></details>
   <details class="qa"><summary>평균을 많이 할수록 무조건 좋은가?</summary><div>랜덤 잡음은 줄지만 응답이 느려지고(저역통과), 규칙적 간섭·드리프트는 안 줄어듦.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'sg1',tag:'신호',f:'미분과 적분을 그래프로',a:'미분 = 기울기(변화율), 적분 = 아래 넓이(누적)',r:'',e:''},
 {id:'sg2',tag:'신호',f:'나이퀴스트 조건',a:'f_s > 2·f_max (실무 2.56배) + 안티앨리어싱 필터',r:'',e:''},
 {id:'sg3',tag:'신호',f:'f_s = 100 Hz로 90 Hz를 찍으면?',a:'10 Hz로 보인다 (|90 − 100|)',r:'앨리어싱',e:''},
 {id:'sg4',tag:'신호',f:'SNR 식과 평균 효과',a:'20 log(V_s/V_n) · N회 평균 → 잡음 1/√N',r:'',e:''}
);
