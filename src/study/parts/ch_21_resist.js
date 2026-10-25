/* ═════════ 제2편 1장 저항형 ═════════ */
Object.assign(TERM,{
 resistive:{ko:'저항형 센서',en:'Resistive sensor',gen:'측정량이 저항을 바꾸는 센서.',tech:'물리량 → 저항 R 변화 → 전압 분배·브리지로 전압 변환. 스트레인게이지·RTD·서미스터·포토레지스터·반도체 가스센서·습도센서·포텐셔미터.',easy:'뭔가가 바뀌면 전기가 흐르기 쉬운 정도가 바뀌는 부품이에요.'},
 strain:{ko:'변형률',en:'Strain (ε)',gen:'늘어난 길이 ÷ 원래 길이.',tech:'ε = ΔL/L (단위 없음). 보통 마이크로스트레인 με = 10⁻⁶. 1000 με = 0.1 % 늘어남.',easy:'1 m 막대가 1 mm 늘면 1/1000 = 1000 με예요.'},
 straingauge:{ko:'스트레인 게이지',en:'Strain gauge',gen:'늘어나면 저항이 변하는 얇은 금속 패턴.',tech:'지그재그 금속박을 대상에 붙여 ε → ΔR/R = GF·ε. 금속 GF ≈ 2, 반도체 50~200. 브리지로 측정, 로드셀·압력센서의 핵심.',easy:'붙인 물체가 늘어나면 선이 가늘고 길어져 저항이 커져요.'},
 gf:{ko:'게이지율',en:'Gauge factor (GF)',gen:'변형 대비 저항 변화 비율.',tech:'GF = (ΔR/R)/ε. 금속은 주로 모양 변화(길이↑ 단면↓)로 약 2, 반도체는 압저항 효과로 훨씬 큼.',easy:'같은 만큼 늘렸을 때 저항이 얼마나 민감하게 변하나예요.'},
 piezoresist:{ko:'압저항 효과',en:'Piezoresistive effect',gen:'힘을 받으면 재료 자체의 저항률이 변하는 현상.',tech:'반도체(Si)에서 응력 → 밴드 구조·이동도 변화 → ρ 변화. 모양 변화보다 훨씬 커서 GF 50~200. MEMS 압력·가속도센서에 사용. 온도 의존성 큼(보상 필요).',easy:'실리콘은 눌리면 전기 통하는 성질 자체가 크게 바뀌어요.'},
 pot:{ko:'포텐셔미터',en:'Potentiometer',gen:'손잡이 위치에 따라 저항이 나뉘는 가변저항.',tech:'저항체 위를 와이퍼가 움직여 V_out = V_in·x/L (선형). 위치·각도 센서. 접촉식이라 마모.',easy:'볼륨 손잡이예요. 돌린 만큼 전압이 비례해서 나와요.'},
 selfheat:{ko:'자기발열',en:'Self-heating',gen:'측정 전류 때문에 센서 스스로 데워지는 것.',tech:'P = I²R의 열로 센서 온도가 올라 오차. 측정 전류를 작게(예: RTD 1 mA 이하) 하거나 펄스로 측정.',easy:'온도를 재려고 흘린 전기 때문에 센서가 데워져 틀리게 재는 거예요.'}
});
Object.assign(UNIT,{
 ue:{s:'με',r:'마이크로스트레인',mean:'변형률 10⁻⁶'},
 mVV:{s:'mV/V',r:'밀리볼트 퍼 볼트',mean:'브리지 출력 감도: 공급전압 1 V당 출력 mV'}
});
FORM.push(
 {eq:'ε = ΔL/L,  ΔR/R = GF·ε',read:'저항 변화율은 게이지율 곱하기 변형률',name:'스트레인 게이지',page:'resist',sec:1,syms:[['ε','변형률','ue'],['GF','게이지율','nd']]},
 {eq:'V_o ≈ V_in·GF·ε/4',read:'1/4 브리지 출력',name:'스트레인 게이지 브리지 출력',page:'resist',sec:3,syms:[]},
 {eq:'V_out = V_in·x/L',read:'포텐셔미터',name:'포텐셔미터 위치',page:'resist',sec:4,syms:[]}
);

ANIM.strainG=host=>{let e=0;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 190" role="img" aria-label="스트레인 게이지"></svg><div class="figctl"><label class="small">당기기 ε <input type="range" min="-1000" max="2000" step="50" value="0" data-e style="width:160px"> <b data-ev>0 με</b></label></div>
   <div class="tofcalc mono small" data-o></div><figcaption>당기면(+) 금속선이 길고 가늘어져 R↑, 누르면(−) 짧고 굵어져 R↓. 실제 변화는 아주 작아 그림은 과장했어요.</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const draw=()=>{const k=e/2000*0.18;const W=220*(1+k),H=60*(1-k*0.4),x0=170-W/2;let g='';const n=7;for(let i=0;i<n;i++){const y=70+i*(H/(n-1))-H/2+30;g+=(i?'L':'M')+(x0+10)+' '+y+' L'+(x0+W-10)+' '+y}
   const R=120*(1+2*e*1e-6);
   svg.innerHTML=`<rect x="${x0-20}" y="40" width="${W+40}" height="${H+20}" rx="4" style="fill:var(--surface2);stroke:var(--line)"/><path d="${g}" style="fill:none;stroke:var(--warn);stroke-width:${2.4*(1-k*0.6)}"/>
    ${e!==0?ar(x0-24,80,x0-60*(e>0?1:-0.3)-24,80,'b',2)+ar(x0+W+24,80,x0+W+24+60*(e>0?1:-0.3),80,'b',2):''}${tx(170,150,e>0?'인장 → 길이↑ 단면↓ → R↑':e<0?'압축 → 길이↓ 단면↑ → R↓':'변형 없음','b2','middle')}${tx(170,176,'게이지 R₀ = 120 Ω, GF = 2','small2','middle')}`;
   q('[data-o]').innerHTML=`ΔR/R = GF·ε = 2 × ${e}×10⁻⁶ = ${(2*e*1e-6*100).toFixed(3)} % → R = <b>${R.toFixed(3)} Ω</b>`;q('[data-ev]').textContent=e+' με'};
  q('[data-e]').oninput=ev=>{e=+ev.target.value;draw()};draw();return null};

Object.assign(FIG,{
 resKinds(){const r=[['스트레인 게이지','변형'],['RTD·서미스터','온도'],['포토레지스터','빛'],['반도체 가스','가스'],['습도센서','습도'],['포텐셔미터','위치']];
  return svgFig(340,170,r.map((x,i)=>{const cx=i%2?250:90,cy=24+Math.floor(i/2)*50;return `<rect x="${cx-78}" y="${cy-14}" width="156" height="36" rx="8" style="fill:var(--surface);stroke:var(--line)"/>${tx(cx,cy+2,x[0],'b2','middle')}${tx(cx,cy+17,x[1]+' → R 변화','small2','middle')}`}).join(''),'저항형 센서 가족','측정량은 달라도 결과는 모두 "저항 변화". 그래서 읽는 회로(분배·브리지)는 같아요.')},
 loadcell(){return svgFig(340,160,`<rect x="20" y="40" width="40" height="80" style="fill:var(--muted)"/><rect x="60" y="66" width="220" height="28" style="fill:var(--surface2);stroke:var(--ink)"/>${ar(270,30,270,62,'b',2.4)}${tx(276,40,'F','b b2')}
   <rect x="110" y="58" width="40" height="8" style="fill:var(--warn)"/>${tx(130,52,'R₁ 인장(위)','small2','middle')}<rect x="110" y="94" width="40" height="8" style="fill:var(--unit)"/>${tx(130,118,'R₂ 압축(아래)','small2','middle')}
   ${tx(190,146,'위 +ε · 아래 −ε → 하프 브리지 (출력 2배)','small2','middle')}`,'외팔보 로드셀','보의 윗면과 아랫면에 게이지를 붙이면 반대 부호로 변해 브리지 출력이 커지고, 온도 영향은 같이 변해서 상쇄돼요. [AI 보충]')}
});

Object.assign(GEN,{
 strainR(base){const GF=base?2:pick([2,2.1,2.05]),R=base?120:pick([120,350,1000]),ue=base?500:pick([200,500,1000,1500,-400]);const dR=R*GF*ue*1e-6;
  return {kind:base?'기본':'유사',title:'변형률 → 저항 변화',q:`R₀ = ${R} {{ohm}}, GF = ${GF}인 스트레인 게이지에 ${ue} {{ue}}의 변형이 생겼다. ΔR과 변한 저항은?`,first:['με → × 10⁻⁶','ΔR = R·GF·ε'],
   steps:[{h:'단위',b:`<div class="ln">ε = ${ue} με = ${ue} × 10⁻⁶</div>`},{h:'저항 변화율',b:`<div class="ln">ΔR/R = ${GF} × ${ue}×10⁻⁶ = ${sciT(sci(GF*ue*1e-6))} (${fx(GF*ue*1e-4,4)} %)</div>`},{h:'ΔR',b:`<div class="ln">ΔR = ${R} × ${sciT(sci(GF*ue*1e-6))} = ${fx(dR,4)} Ω → R = ${fx(R+dR,6)} Ω</div><div class="rd">0.1 % 수준의 아주 작은 변화 → 브리지·증폭 필요</div>`}],
   ans:`ΔR = ${fx(dR,4)} Ω (R = ${fx(R+dR,6)} Ω)`,ansRead:`${fxR(dR,4)} 옴`,calc:calcBlock([[[...ks(R),'×',...ks(GF),'×',...K(Math.abs(ue),-6),'='],casioDec(Math.abs(dR)),ue<0?'부호 − (압축)':'']],[W_NEG]),
   easy:'1000 με에 GF 2면 저항이 0.2 % 변해요. 아주 작아서 그대로는 잘 안 보여요.'}},
 strainV(base){const V=base?5:pick([2.5,5,10]),GF=2,ue=base?1000:pick([100,250,500,1000,2000]);const cfg=base?1:pick([1,2,4]);const Vo=V*GF*ue*1e-6/4*cfg;
  return {kind:base?'기본':'응용',title:'스트레인 브리지 출력',fig:cfg===2?FIG.loadcell():FIG.wheat(),q:`V_in = ${V} V, GF = 2, 변형 ${ue} με. 게이지 ${cfg}개를 쓴 ${cfg===1?'1/4':cfg===2?'하프':'풀'} 브리지의 출력은 대략 몇 mV인가?`,first:['1/4: V·GF·ε/4','하프: ×2 · 풀: ×4 (게이지 수에 비례)'],
   steps:[{h:'1/4 브리지 기본',b:`<div class="ln">V·GF·ε/4 = ${V} × 2 × ${ue}×10⁻⁶ ÷ 4 = ${fx(V*GF*ue*1e-6/4*1e3,4)} mV</div>`},{h:'게이지 수',b:`<div class="ln">× ${cfg} = ${fx(Vo*1e3,4)} mV</div><div class="rd">하프·풀 브리지: 인장(+ε)·압축(−ε) 게이지를 서로 더해지는 자리에 배치 · 온도 영향 상쇄</div>`},{h:'감도로',b:`<div class="ln">${fx(Vo*1e3/V,4)} mV/V (공급 1 V당)</div>`}],
   ans:`약 ${fx(Vo*1e3,4)} mV`,ansRead:`${fxR(Vo*1e3,4)} 밀리볼트`,calc:calcBlock([[[...ks(V),'×','2','×',...K(ue,-6),'÷','4','×',...ks(cfg),'='],casioDec(Vo)]],[W_NEG]),
   easy:'게이지를 많이 붙여 서로 돕게 하면 출력이 2배, 4배로 커져요.'}},
 gfCalc(){const R=pick([120,350]),ue=pick([500,1000]),dR=+(R*pick([2,2.1,1.9,120])*ue*1e-6).toFixed(4);const GF=dR/R/(ue*1e-6);
  return {kind:'응용',title:'게이지율 구하기',q:`R₀ = ${R} Ω 게이지에 ${ue} με를 줬더니 ΔR = ${dR} Ω이었다. GF는? 금속형인가 반도체형인가?`,first:['GF = (ΔR/R)/ε'],
   steps:[{h:'ΔR/R',b:`<div class="ln">${dR} ÷ ${R} = ${sciT(sci(dR/R,4))}</div>`},{h:'÷ ε',b:`<div class="ln">${sciT(sci(dR/R,4))} ÷ ${ue}×10⁻⁶ = ${fx(GF,4)}</div><div class="rd">${GF>20?'GF 수십~수백 → 반도체(압저항)':'GF ≈ 2 → 금속박'}</div>`}],
   ans:`GF ≈ ${fx(GF,3)} (${GF>20?'반도체형':'금속형'})`,ansRead:`${fxR(GF,3)}`,calc:calcBlock([[[...ks(dR),'÷',...ks(R),'÷',...K(ue,-6),'='],casioDec(GF)]],[W_NEG]),easy:'같은 변형에 저항이 훨씬 크게 변하면 반도체 게이지예요.'}},
 potPos(base){const V=base?5:pick([3.3,5,10]),L=base?100:pick([50,100,300]),x=base?30:pick([12,25,40,75,200].filter(v=>v<L));const Vo=V*x/L;const back=!base&&Math.random()<.5;
  return {kind:base?'기본':'유사',title:'포텐셔미터 위치',q:back?`길이 ${L} mm 선형 포텐셔미터(V_in = ${V} V)의 출력이 ${fx(Vo,4)} V이다. 와이퍼 위치는?`:`길이 ${L} {{mm}} 선형 포텐셔미터에 ${V} V를 걸었다. 와이퍼가 ${x} mm에 있으면 출력은?`,first:['V_out = V_in·x/L'],
   steps:[{h:back?'거꾸로':'비례',b:back?`<div class="ln">x = L·V_out/V_in = ${L} × ${fx(Vo,4)} ÷ ${V} = ${fx(x,4)} mm</div>`:`<div class="ln">${V} × ${x}/${L} = ${fx(Vo,4)} V</div>`},{h:'주의',b:`<div class="rd">측정기 입력 저항이 작으면 부하 효과로 비선형 [AI 보충]</div>`}],
   ans:back?`${fx(x,4)} mm`:`${fx(Vo,4)} V`,ansRead:back?`${fxR(x,4)} 밀리미터`:`${fxR(Vo,4)} 볼트`,calc:calcBlock([[back?[...ks(L),'×',...ks(+Vo.toFixed(4)),'÷',...ks(V),'=']:[...ks(V),'×',...ks(x),'÷',...ks(L),'='],casioDec(back?x:Vo)]],[]),easy:'전체 길이 중 몇 %에 있나 = 전체 전압 중 몇 %가 나오나.'}},
 selfHeat(){const I=pick([0.5,1,2,5]),R=pick([100,1000]),th=pick([2,5,10]);const P=(I*1e-3)**2*R,dT=P*1e3/th;
  return {kind:'응용',title:'자기발열 오차',q:`${R} Ω 온도센서에 ${I} mA를 흘린다. 열 방산 상수가 ${th} mW/°C이면 자기발열로 생기는 온도 오차는?`,first:['P = I²R','ΔT = P ÷ 방산 상수'],
   steps:[{h:'전력',b:`<div class="ln">(${I}×10⁻³)² × ${R} = ${sciT(sci(P))} W = ${fx(P*1e3,4)} mW</div>`},{h:'온도 상승',b:`<div class="ln">${fx(P*1e3,4)} mW ÷ ${th} mW/°C = ${fx(dT,4)} °C</div><div class="rd">전류를 반으로 → 오차는 ¼ (I²)</div>`}],
   ans:`${fx(dT,4)} °C`,ansRead:`${fxR(dT,4)} 도`,calc:calcBlock([[['(',...K(I,-3),')','x²','×',...ks(R),'='],casioDec(P)],[['Ans','×',...K(1,3),'÷',...ks(th),'='],casioDec(dT)]],[W_NEG]),easy:'재려고 흘린 전기가 센서를 데워요. 전류가 작을수록 오차가 확 줄어요.'}}
});
PSET.resist=[['strainR',true],['strainR'],['strainV',true],['strainV'],['gfCalc'],['potPos',true],['potPos'],['selfHeat'],['dividerG'],['bridgeQ']];
TOPICS.resist={name:'저항형',g:['strainR','strainV','gfCalc','potPos','selfHeat']};['strainR','strainV','potPos'].forEach(g=>BASICG.add(g));

PAGES.resist={title:'저항형 센서',part:'제2편 1장',secs:[
 {k:'정의',h:'저항형 센서 — 가장 흔한 원리',b:`<p class="small muted">[AI 보충] 강의 밖 정리. 가스센서·홀 센서 장의 저항 변화와 이어져요.</p>${FIG.resKinds()}
   <div class="flow"><div>측정량</div><div>저항 R 변화 (R = ρL/A의 ρ, L, A 중 무엇이 변하나)</div><div>전압 분배·브리지</div><div>증폭 → ADC</div></div>`,
  easy:'온도·힘·빛·가스가 바뀌면 전기 통하기가 바뀌는 부품을 써요. 읽는 방법은 다 같아요.'},
 {k:'스트레인',h:'스트레인 게이지 — 당기면 저항↑',b:`<div data-anim="strainG"></div>
   <div class="eqn">ε = ΔL/L,  ΔR/R = GF·ε<small>[[strain|변형률]] {{ue}} · [[gf|게이지율]] 금속 ≈ 2</small></div><p>[[straingauge|스트레인 게이지]]: 로드셀(무게), 압력, 토크, 구조물 건전성 감시.</p>`,
  easy:'고무줄처럼 늘이면 길고 가늘어져 저항이 커져요.'},
 {k:'압저항',h:'압저항 효과 — 반도체는 훨씬 민감',b:`<div class="f4"><div><div class="h">금속 게이지</div>모양 변화(L↑, A↓)가 주원인 · GF ≈ 2 · 온도 안정</div><div><div class="h">[[piezoresist|반도체 압저항]]</div>저항률 ρ 자체가 변함 · GF 50~200 · 온도 영향 큼 → 보상 필요</div></div>
   <p>MEMS 압력센서: 실리콘 다이어프램 위 압저항 4개 = 풀 브리지.</p><button class="ghost" data-goto="press">↗ 압력센서 (제3편 8장)</button>`,
  easy:'실리콘은 눌리면 "전기 통하는 성질" 자체가 바뀌어서, 금속보다 수십 배 민감해요.'},
 {k:'브리지',h:'작은 ΔR을 읽는 법',b:`${FIG.loadcell()}<div class="rel mono">1/4 브리지 V_o ≈ V·GF·ε/4 · 하프 ×2 · 풀 ×4</div>
   <p class="small">로드셀 사양 "2 mV/V" = 공급 1 V당 최대 하중에서 2 mV. 10 V 공급이면 20 mV → 계측 증폭기로 증폭.</p><button class="ghost" data-goto="circuit" data-i="2">↗ 휘트스톤 브리지 (제0편 5장)</button>`,
  easy:'변화가 0.1 %밖에 안 되니, 브리지로 차이만 뽑아서 키워요.'},
 {k:'포텐셔미터',h:'포텐셔미터 — 위치를 전압으로',b:`<div class="eqn">V_out = V_in·x/L<small>[[pot|포텐셔미터]] · 직선형·회전형</small></div><ul class="clean"><li>간단·저렴·선형</li><li>접촉식 → 마모·잡음 · 비접촉은 홀·자기 엔코더</li></ul>`,
  easy:'볼륨 손잡이를 돌린 만큼 전압이 나와요.'},
 {k:'주의점',h:'측정할 때 주의점',b:`<ul class="clean"><li>[[selfheat|자기발열]]: I²R 열 → 전류 작게</li><li>리드선 저항: 2선식 오차 → 3선·4선식</li><li>온도 영향: 같은 재료 기준 저항·하프 브리지로 상쇄</li></ul><button class="ghost" data-goto="gas" data-i="3">↗ 2선식·4선식</button>`,
  easy:'전선도 저항이 있고, 전류는 센서를 데우고, 온도는 저항을 바꿔요. 이 셋을 막아야 정확해요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>ΔR/R = GF·ε (금속 GF ≈ 2, 반도체 50~200)</li><li>1/4 브리지 V_o ≈ V·GF·ε/4 · 하프·풀은 2·4배 + 온도 상쇄</li><li>오차 3종: 자기발열 · 리드선 · 온도</li></ol>
   <details class="qa"><summary>반도체 게이지가 더 민감한 이유는?</summary><div>압저항 효과로 저항률 자체가 크게 변하기 때문(금속은 주로 모양 변화).</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'r1',tag:'저항형',f:'스트레인 게이지 식',a:'ΔR/R = GF·ε',r:'금속 GF ≈ 2',e:''},
 {id:'r2',tag:'저항형',f:'1000 με는 몇 %?',a:'0.1 %',r:'10⁻³',e:''},
 {id:'r3',tag:'저항형',f:'압저항 효과란?',a:'응력으로 반도체 저항률 자체가 변함 (GF 50~200)',r:'',e:''},
 {id:'r4',tag:'저항형',f:'1/4 브리지 출력 근사',a:'V·GF·ε/4',r:'하프 ×2, 풀 ×4',e:''},
 {id:'r5',tag:'저항형',f:'저항형 센서 오차 3가지',a:'자기발열 · 리드선 저항 · 온도',r:'',e:''}
);
