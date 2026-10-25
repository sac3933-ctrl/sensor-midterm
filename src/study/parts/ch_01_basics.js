/* ═════════ 제0편 2장 숫자 감각 · 3장 공학용 계산기 ═════════ */
const nk=x=>x<0?['(−)',...ks(-x)]:ks(x);
const PFX={'-18':['a','아토'],'-15':['f','펨토'],'-12':['p','피코'],'-9':['n','나노'],'-6':['μ','마이크로'],'-3':['m','밀리'],'0':['',''],'3':['k','킬로'],'6':['M','메가'],'9':['G','기가'],'12':['T','테라'],'15':['P','페타'],'18':['E','엑사']};
const p10=e=>'10'+sup(e);
Object.assign(TERM,{
 exponent:{ko:'지수 (거듭제곱)',en:'Exponent / Power of ten',gen:'같은 수를 몇 번 곱했는지 나타내는 작은 위 숫자.',tech:'10ⁿ: 10을 n번 곱함. 10⁻ⁿ = 1/10ⁿ. 곱셈은 지수 덧셈, 나눗셈은 지수 뺄셈, 거듭제곱은 지수 곱셈.',easy:'10³은 10을 3번 곱한 1000. 10⁻³은 1000으로 나눈 0.001이에요.'},
 scinot:{ko:'과학적 표기법',en:'Scientific notation',gen:'아주 크거나 작은 수를 a × 10ⁿ 꼴로 쓰는 법.',tech:'1 ≤ |a| < 10인 가수 a와 정수 지수 n. 예: 0.00159 = 1.59 × 10⁻³.',easy:'0을 여러 개 쓰는 대신 "0이 몇 칸인지"를 지수로 적어요.'},
 engnot:{ko:'공학 표기법',en:'Engineering notation',gen:'지수를 3의 배수로 맞춘 표기.',tech:'a × 10³ᵏ (1 ≤ |a| < 1000). 지수가 바로 접두어(k, M, m, μ, n, p)에 대응 → 단위 읽기가 쉬움. 계산기 [ENG] 키.',easy:'지수를 3칸씩 맞추면 바로 "밀리·마이크로·나노"로 읽을 수 있어요.'},
 sigfig:{ko:'유효숫자',en:'Significant figures',gen:'믿을 수 있는 자릿수.',tech:'앞쪽 0은 세지 않고, 처음 0이 아닌 숫자부터 셈. 0.00159 → 3자리. 계산 중간엔 반올림하지 말고 마지막에 3자리 정도로.',easy:'맨 앞의 0들은 "자리 표시"일 뿐이라 세지 않아요.'},
 logarithm:{ko:'로그',en:'Logarithm (log₁₀)',gen:'10을 몇 번 곱해야 그 수가 되는가.',tech:'log₁₀ x = n ⇔ 10ⁿ = x. log(ab) = log a + log b. 큰 범위를 압축(dB, pH, 감도 log 그래프). ln은 밑이 e(≈2.718).',easy:'log 1000 = 3. "0이 몇 개야?"를 묻는 계산이에요.'},
 proportion:{ko:'비례·반비례',en:'Proportionality',gen:'한쪽이 커질 때 다른 쪽이 어떻게 변하는지.',tech:'y ∝ x (비례), y ∝ 1/x (반비례), y ∝ x² (제곱 비례), y ∝ √x. 식을 외우기 전 "무엇이 커지면 무엇이 커지나"를 먼저 봄.',easy:'C = εA/d에서 d가 2배면 C는 반으로. 분모에 있으면 반비례예요.'},
 relerr:{ko:'상대오차 (오차율)',en:'Relative error',gen:'오차를 참값에 대한 비율로 나타낸 것.',tech:'(측정값 − 참값)/참값 × 100 %. 절대오차 = 측정값 − 참값.',easy:'100 중 2 틀린 것과 10 중 2 틀린 것은 다르죠. 비율로 봐야 해요.'},
 setup:{ko:'계산기 설정 (SETUP)',en:'SETUP',gen:'계산기의 표시·각도 방식을 정하는 메뉴.',tech:'[SHIFT][MODE]. MthIO(수학 표기)·LineIO, Deg(도)·Rad(라디안), Fix·Sci·Norm(소수 표시). 초기화: [SHIFT][9] → 3:All → [=].',easy:'계산기가 각도를 "도"로 볼지 "라디안"으로 볼지 정하는 곳이에요.'},
 eqnmode:{ko:'방정식 모드 (EQN)',en:'EQN mode',gen:'연립방정식·2차방정식을 푸는 모드.',tech:'[MODE][5] → 1: 2원 연립(anX+bnY=cn), 2: 3원 연립, 3: 2차방정식. 계수를 차례로 넣고 [=].',easy:'미지수가 2개인 식 2개를 넣으면 X, Y를 바로 알려줘요.'}
});
FORM.push(
 {eq:'10ᵃ × 10ᵇ = 10ᵃ⁺ᵇ,  10ᵃ ÷ 10ᵇ = 10ᵃ⁻ᵇ',read:'곱하면 더하기, 나누면 빼기',name:'지수 법칙',page:'numsense',sec:0,syms:[]},
 {eq:'dB = 20 log(V₂/V₁) = 10 log(P₂/P₁)',read:'전압·전류는 20, 전력은 10',name:'데시벨',page:'numsense',sec:4,syms:[]},
 {eq:'오차율 = (측정 − 참)/참 × 100 %',read:'상대오차',name:'오차율',page:'numsense',sec:3,syms:[]}
);

ANIM.expSlide=host=>{let e=0;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 120" role="img" aria-label="소수점 이동"></svg><div class="figctl" style="display:flex;gap:8px"><button class="ghost" data-m style="flex:1">◀ ÷10</button><button class="ghost" data-p style="flex:1">×10 ▶</button></div><figcaption>× 10 한 번 = 소수점이 오른쪽으로 한 칸. 지수 = 소수점이 움직인 칸 수예요.</figcaption></figure>`;
  const svg=host.querySelector('svg');const draw=()=>{const v=1.59*10**e;const s=Math.abs(e)>6?casioDec(v):String(+v.toPrecision(3));
   svg.innerHTML=`<text x="170" y="44" text-anchor="middle" class="mono" style="font-size:28px;font-weight:700;fill:var(--ink)">${s}</text><text x="170" y="78" text-anchor="middle" class="mono" style="font-size:18px;fill:var(--accent)">= 1.59 × 10${sup(e)}</text>${tx(170,106,PFX[String(e)]&&e!==0?`공학 표기 접두어 ${PFX[String(e)][0]} (${PFX[String(e)][1]})`:(e===0?'지수 0 → 그대로':'접두어는 지수가 3의 배수일 때'),'small2','middle')}`};
  draw();host.querySelector('[data-m]').onclick=()=>{if(e>-12){e--;draw()}};host.querySelector('[data-p]').onclick=()=>{if(e<9){e++;draw()}};return ()=>{}};

Object.assign(FIG,{
 logScale(){const X=v=>30+v*46;return svgFig(340,120,`<line x1="30" y1="50" x2="320" y2="50" style="stroke:var(--ink);stroke-width:1.6"/>${[0,1,2,3,4,5,6].map(i=>`<line x1="${X(i)}" y1="44" x2="${X(i)}" y2="56" style="stroke:var(--ink)"/><text x="${X(i)}" y="38" text-anchor="middle" class="small2">10${sup(i)}</text><text x="${X(i)}" y="74" text-anchor="middle" class="u small2">${i}</text>`).join('')}
   ${tx(30,96,'위: 실제 값 (1 ~ 1 000 000)','small2')}${tx(30,112,'아래: log 값 (0 ~ 6) — 한 칸 = 10배','u small2')}`,'로그 눈금','같은 간격이 "10배"를 뜻해요. 1 ppm과 1000 ppm을 한 그래프에 그릴 수 있는 이유예요.')},
 calcKeys(){const k=(x,y,w,t,c)=>`<rect x="${x}" y="${y}" width="${w}" height="20" rx="4" style="fill:${c||'var(--surface)'};stroke:var(--line)"/><text x="${x+w/2}" y="${y+14}" text-anchor="middle" class="small2">${t}</text>`;
  return svgFig(340,200,`<rect x="10" y="6" width="320" height="188" rx="12" style="fill:var(--bg2,var(--surface));stroke:var(--ink)"/>
   ${k(22,18,46,'SHIFT','var(--warn-soft)')}${k(74,18,46,'ALPHA')}${k(220,18,46,'MODE')}${k(272,18,46,'ON')}
   ${k(22,48,46,'■/■')}${k(74,48,46,'√■')}${k(126,48,46,'x²')}${k(178,48,46,'x^■')}${k(230,48,40,'log')}${k(276,48,40,'ln')}
   ${k(22,78,46,'(−)')}${k(74,78,46,'°′″')}${k(126,78,46,'sin')}${k(178,78,46,'cos')}${k(230,78,40,'tan')}
   ${k(22,108,46,'RCL')}${k(74,108,46,'ENG','var(--unit-soft,var(--surface))')}${k(126,108,30,'(')}${k(160,108,30,')')}${k(194,108,46,'S⇔D','var(--unit-soft,var(--surface))')}${k(244,108,46,'M+')}
   ${k(22,140,46,'×10ˣ','var(--unit-soft,var(--surface))')}${k(74,140,46,'Ans')}${k(126,140,46,'=')}${k(178,140,46,'DEL')}${k(230,140,46,'AC')}
   ${tx(22,184,'노란 칸: SHIFT(윗글자) · 파란 칸: 이 앱에서 자주 쓰는 키','small2')}`,'fx-570ES PLUS 주요 키 (배치 단순화)','실제 배치를 단순화한 그림이에요. 키 이름으로 찾아보세요. [SHIFT]를 누르고 다음 키를 누르면 그 키 위에 적힌 기능이 나와요.')}
});

Object.assign(GEN,{
 expRule(base){const m1=pick([2,3,4,5,6]),m2=pick([1.5,2,2.5,4]),m3=pick([2,4,5,8]);const a=base?3:pick([-9,-6,-3,2,3,6]),b=base?-6:pick([-12,-6,-3,-2,4]),c=base?-3:pick([-9,-6,-2,3]);
  const M=m1*m2/m3,E=a+b-c;const v=M*10**E;const S=sci(v,4);
  return {kind:base?'기본':'유사',title:'지수 계산 (곱하면 더하고, 나누면 뺀다)',q:`(${m1} × 10${sup(a)}) × (${m2} × 10${sup(b)}) ÷ (${m3} × 10${sup(c)}) = ?`,first:['앞 숫자끼리','지수끼리: 곱 → +, 나눗셈 → −'],
   steps:[{h:'앞 숫자',b:`<div class="ln">${m1} × ${m2} ÷ ${m3} = ${fx(M,4)}</div>`},{h:'지수',b:`<div class="ln">(${a}) + (${b}) − (${c}) = ${E}</div><div class="rd">나누는 쪽 지수는 빼기: − (${c})${c<0?' = + '+(-c):''}</div>`},
    {h:'합치기',b:`<div class="ln">${fx(M,4)} × 10${sup(E)}${M>=10||M<1?` = ${sciT(S)}`:''}</div><div class="rd">앞 숫자가 1~10 사이가 되도록 정리 (과학적 표기)</div>`}],
   ans:sciT(S),ansRead:sciR(S),calc:calcBlock([[[...K(m1,a),'×',...K(m2,b),'÷',...K(m3,c),'='],casioDec(v)]],[W_NEG,'곱셈·나눗셈은 왼쪽부터 순서대로 계산돼서 괄호 없어도 OK']),
   easy:'숫자는 숫자끼리, 0의 개수(지수)는 지수끼리 따로 계산해요.'}},
 engN(base){const U=pick([['H','헨리'],['F','패럿'],['m','미터'],['A','암페어'],['Hz','헤르츠'],['Ω','옴'],['T','테슬라'],['s','초'],['B','바이트']]);let e=base?-9:pick([-16,-14,-13,-11,-10,-8,-7,-5,-4,-2,1,2,4,5,7,10,11,13,14]),m=pick([1.59,4.7,2.2,3.3,6.8]);const v=m*10**e;const e3=Math.floor(e/3)*3;const mm=+(m*10**(e-e3)).toPrecision(3);const P=PFX[String(e3)];
  return {kind:base?'기본':'유사',title:'과학적 표기 → 접두어',q:`${m} × 10${sup(e)} ${U[0]}를 접두어(k, m, μ, n…)를 써서 나타내면?`,first:['지수를 3의 배수로 맞춘다','접두어 사다리'],
   steps:[{h:'3의 배수 찾기',b:`<div class="ln">${e} 이하의 가장 가까운 3의 배수 = ${e3}</div>`},{h:'앞 숫자 조정',b:`<div class="ln">${m} × 10${sup(e)} = ${m} × 10${sup(e-e3)} × 10${sup(e3)} = ${mm} × 10${sup(e3)}</div><div class="rd">지수를 ${e-e3}만큼 줄였으니 앞 숫자는 10${sup(e-e3)}배</div>`},
    {h:'접두어로',b:`<div class="ln">10${sup(e3)} = ${P[0]||'(접두어 없음)'} ${P[1]?'('+P[1]+')':''}</div><div class="ln">→ ${mm} ${P[0]}${U[0]}</div>`}],
   ans:`${mm} ${P[0]}${U[0]}`,ansRead:`${mm} ${P[1]}${U[1]}`,calc:calcBlock([[[...K(m,e),'=','ENG'],`${mm}×10${sup(e3)}`,'[ENG]를 누를 때마다 지수가 3씩 바뀜']],[]),
   easy:'0.0000000047 F를 "4.7 나노패럿"으로 읽는 연습이에요. 지수를 3칸 단위로 맞추면 이름이 붙어요.'}},
 sigFig(){const v=pick([50.990195,0.00159154,1.5915e-9,123456,0.0453592,9.80665,299792458,0.000738]);const n=pick([2,3,4]);const r=+v.toPrecision(n);
  const lead=Math.abs(v)<1?-Math.floor(Math.log10(Math.abs(v)))-1:0;
  return {kind:'유사',title:'유효숫자로 반올림',q:`${v<1e-3||v>1e7?casioDec(v):v}를 유효숫자 ${n}자리로 나타내면?`,first:['앞의 0은 세지 않는다','처음 0이 아닌 숫자부터 센다'],
   steps:[{h:'시작 위치',b:`<div class="ln">처음으로 0이 아닌 숫자: ${String(sci(v,10).m)[0]}</div>${lead?`<div class="rd">소수점 뒤 0 ${lead}개는 자리 표시라 세지 않음</div>`:''}`},
    {h:`${n}자리까지 + 다음 자리 반올림`,b:`<div class="ln">${sciT(sci(v,10))} → ${sciT(sci(v,n))}</div>`},{h:'결과',b:`<div class="ln">${v<1e-3||v>1e6?sciT(sci(r,n)):r}</div>`}],
   ans:v<1e-3||v>1e6?sciT(sci(r,n)):String(r),ansRead:fxR(r,n),calc:calcBlock([[['SHIFT','MODE','7',String(n)],'Sci 모드: 유효숫자 고정','되돌리기: SHIFT MODE 8 (Norm) 1']],[]),
   easy:'0.00159에서 앞의 0.00은 자리만 잡는 거라, 진짜 숫자는 1·5·9 세 개예요.'}},
 pctErr(base){const T=base?100:pick([25,50,80,120,200,500]);const d=base?2.5:pick([-4,-2.5,-1.2,0.8,1.5,3]);const M=+(T*(1+d/100)).toFixed(3);const e=(M-T)/T*100;
  return {kind:base?'기본':'유사',title:'오차율 (상대오차)',q:`참값이 ${T}인 양을 센서가 ${M}로 측정했다. 절대오차와 오차율(%)은?`,first:['절대오차 = 측정 − 참','오차율 = 절대오차 ÷ 참 × 100'],
   steps:[{h:'절대오차',b:`<div class="ln">${M} − ${T} = ${fx(M-T,4)}</div>`},{h:'오차율',b:`<div class="ln">${fx(M-T,4)} ÷ ${T} × 100 = ${fx(e,3)} %</div><div class="rd">${e>0?'+ → 크게 측정':'− → 작게 측정'} · 정확도 문제에선 크기(절댓값)만 쓰기도 함</div>`}],
   ans:`절대오차 ${fx(M-T,4)} · 오차율 ${fx(e,3)} %`,ansRead:`${fxR(e,3)} 퍼센트`,calc:calcBlock([[['(',...ks(M),'−',...ks(T),')','÷',...ks(T),'×','1','0','0','='],casioDec(e)]],[]),easy:'틀린 양을 정답 크기로 나눠서 "몇 %나 틀렸나"를 봐요.'}},
 dbGen(base){const mode=base?'v2db':pick(['v2db','p2db','db2v','db2p']);const r=pick([2,10,100,0.5,0.1,1000,0.01]);const dB=pick([6,20,40,-20,3,-6,60]);
  if(mode==='v2db'||mode==='p2db'){const k=mode==='v2db'?20:10;const v=k*Math.log10(r);
   return {kind:base?'기본':'유사',title:'비율 → dB',q:`${mode==='v2db'?'전압':'전력'} 비율이 ${r}배일 때 몇 {{dB}}인가?`,first:[`${mode==='v2db'?'전압·전류는 20 log':'전력은 10 log'}`,'log 10 = 1, log 2 ≈ 0.301'],
    steps:[{h:'공식',b:`<div class="ln">dB = ${k} × log(${r})</div><div class="rd">${mode==='v2db'?'전력은 전압의 제곱(P = V²/R)이라 2 × 10 = 20':'전력 비율은 10 log'}</div>`},{h:'log',b:`<div class="ln">log(${r}) = ${fx(Math.log10(r),4)}</div>`},{h:'곱하기',b:`<div class="ln">${k} × ${fx(Math.log10(r),4)} = ${fx(v,4)} dB</div>`}],
    ans:`${fx(v,4)} dB`,ansRead:`${fxR(v,4)} 데시벨`,calc:calcBlock([[[...ks(k),'log',...ks(r),')','='],casioDec(v)]],['[log]를 누르면 "log(" 괄호가 같이 열려요']),easy:'dB는 "10배를 몇 번 했나"를 세는 단위예요. 전압 10배 = 20 dB.'}}
  const k=mode==='db2v'?20:10;const v=10**(dB/k);
  return {kind:'응용',title:'dB → 비율',q:`${dB} dB는 ${mode==='db2v'?'전압':'전력'} 비율로 몇 배인가?`,first:[`비율 = 10^(dB/${k})`],
   steps:[{h:'거꾸로 풀기',b:`<div class="ln">${dB} = ${k} log(비율) → log(비율) = ${dB}/${k} = ${fx(dB/k,4)}</div>`},{h:'10의 거듭제곱',b:`<div class="ln">비율 = 10^(${fx(dB/k,4)}) = ${fx(v,4)}배</div><div class="rd">${dB<0?'− dB → 1보다 작음 (감쇠)':'+ dB → 증폭'}</div>`}],
   ans:`${fx(v,4)}배`,ansRead:`${fxR(v,4)}배`,calc:calcBlock([[['SHIFT','log',...nk(dB),'÷',...ks(k),'='],casioDec(v),'SHIFT log = 10ˣ']],[]),easy:'dB를 20(전압) 또는 10(전력)으로 나눈 만큼 10을 거듭제곱해요.'}},
 propSense(){const C=pick([
   ['C = εA/d','간격 d','2배','C','½배','d는 분모 → 반비례'],['P = V²/R','전압 V','3배','P','9배','V가 제곱 → 3² = 9'],['f = 1/(2π√(LC))','인덕턴스 L','4배','f','½배','√ 안 분모 → 1/√4 = 1/2'],
   ['δ = √(2ρ/(ωμ))','주파수 f(ω)','4배','표피 깊이 δ','½배','√ 안 분모 → 1/√4'],['F = q·v·B','자기장 B','2배','힘 F','2배','비례'],['x = ma/k','스프링 상수 k','2배','변위 x','½배','분모 → 반비례'],
   ['R = ρL/A','지름 D (A = πD²/4)','2배','저항 R','¼배','A ∝ D² → R ∝ 1/D²'],['P = εσT⁴A','절대온도 T','2배','복사 전력 P','16배','T⁴ → 2⁴ = 16']]);
  return {kind:'유사',title:'무엇이 커지면 어떻게 되나',q:`${C[0]}에서 ${C[1]}가 ${C[2]}가 되면 ${C[3]}는?`,first:['분자면 비례, 분모면 반비례','제곱·루트는 배수에도 제곱·루트'],
   steps:[{h:'위치 보기',b:`<div class="ln">${C[5]}</div>`},{h:'결과',b:`<div class="ln">${C[3]} → ${C[4]}</div>`}],ans:`${C[4]}`,ansRead:C[4],calc:'<p class="small muted">계산기 필요 없음 — 식의 모양만 봐요.</p>',
   easy:'식에서 위(분자)에 있으면 같이 커지고, 아래(분모)에 있으면 반대로 작아져요.'}},
 pythag(){const R=pick([30,40,50,60,100]),X=pick([10,15,20,30,40]);const Z=Math.hypot(R,X);
  return {kind:'유사',title:'제곱과 루트 — 크기 구하기',q:`Z = ${R} + j${X} {{ohm}}의 크기 |Z|는?`,first:['|Z| = √(R² + X²) (피타고라스)'],
   steps:[{h:'제곱',b:`<div class="ln">${R}² = ${R*R}, ${X}² = ${X*X}</div>`},{h:'더하고 루트',b:`<div class="ln">√(${R*R} + ${X*X}) = √${R*R+X*X} = ${fx(Z,4)} Ω</div>`}],
   ans:`${fx(Z,4)} Ω`,ansRead:`${fxR(Z,4)} 옴`,calc:calcBlock([[['√■',...ks(R),'x²','+',...ks(X),'x²','='],Number.isInteger(Z)?String(Z):'√ 꼴 → S⇔D'],[['S⇔D'],casioDec(Z)]],[W_SD]),easy:'가로 R, 세로 X인 직각삼각형의 빗변 길이예요.'}},
 calcSci(){const X=pick([10,20,15]),f=pick([1,2,5]),fe=pick([6,9]);const v=X/(2*Math.PI*f*10**fe);const S=sci(v,4);const e3=Math.floor(S.e/3)*3;
  return {kind:'유사',title:'계산기로 π와 지수가 섞인 식',q:`L = ${X} ÷ (2π × ${f} × 10${sup(fe)})을 계산하고 접두어로 나타내라.`,first:['분모는 괄호로 묶기','π = SHIFT ×10ˣ'],
   steps:[{h:'분모',b:`<div class="ln">2π × ${f} × 10${sup(fe)} = ${sciT(sci(2*Math.PI*f*10**fe,4))}</div>`},{h:'나누기',b:`<div class="ln">${X} ÷ ${sciT(sci(2*Math.PI*f*10**fe,4))} = ${sciT(S)}</div>`},{h:'ENG',b:`<div class="ln">= ${fx(v/10**e3,4)} × 10${sup(e3)} → ${fx(v/10**e3,4)} ${PFX[String(e3)][0]}H</div>`}],
   ans:`${fx(v/10**e3,4)} ${PFX[String(e3)][0]}H`,ansRead:`${fxR(v/10**e3,4)} ${PFX[String(e3)][1]}헨리`,
   calc:calcBlock([[[...ks(X),'÷','(','2','SHIFT','×10ˣ',...K(f,fe),')','='],casioDec(v)],[['ENG'],`${fx(v/10**e3,4)}×10${sup(e3)}`]],[W_PI,'괄호를 안 치면 ÷2 다음 ×π가 곱해져 버려요','분수 결과가 나오면 S⇔D']),
   easy:'분모 전체를 괄호로 감싸는 게 핵심이에요. 안 그러면 계산기가 앞에서부터 나누고 곱해요.'}},
 calcEqn(){const x=pick([-3,-2,1,2,3,4]),y=pick([-2,-1,1,2,5]);const a1=pick([1,2,3]),b1=pick([1,-1,2]),a2=pick([1,-1,4]),b2=pick([3,-2,1]);if(a1*b2-a2*b1===0)return GEN.calcEqn();const c1=a1*x+b1*y,c2=a2*x+b2*y;
  const tm=(a,v,first)=>(a<0?(first?'−':' − '):first?'':' + ')+(Math.abs(a)===1?'':Math.abs(a))+v;
  return {kind:'유사',title:'연립방정식 — EQN 모드',q:`${tm(a1,'x',1)}${tm(b1,'y')} = ${c1},  ${tm(a2,'x',1)}${tm(b2,'y')} = ${c2}`,first:['MODE 5 1','a₁ b₁ c₁ a₂ b₂ c₂ 순서'],
   steps:[{h:'계수 표',b:`<div class="ln">a₁ = ${a1}, b₁ = ${b1}, c₁ = ${c1}</div><div class="ln">a₂ = ${a2}, b₂ = ${b2}, c₂ = ${c2}</div><div class="rd">x 앞 숫자 = a, y 앞 숫자 = b, 등호 오른쪽 = c (없는 항은 0)</div>`},
    {h:'손으로 검산 (소거법)',b:`<div class="ln">x = (c₁b₂ − c₂b₁)/(a₁b₂ − a₂b₁) = (${c1*b2} − ${c2*b1})/(${a1*b2} − ${a2*b1}) = ${x}</div><div class="ln">y = (a₁c₂ − a₂c₁)/(a₁b₂ − a₂b₁) = ${y}</div>`}],
   ans:`x = ${x}, y = ${y}`,ansRead:`x는 ${x}, y는 ${y}`,calc:calcBlock([[['MODE','5','1'],'anX+bnY=cn 표'],[[...nk(a1),'=',...nk(b1),'=',...nk(c1),'=',...nk(a2),'=',...nk(b2),'=',...nk(c2),'='],'계수 입력 완료'],[['='],`X = ${x}`],[['='],`Y = ${y}`],[['MODE','1'],'COMP로 복귀']],[W_NEG.replace('지수 앞 ','음수 계수 ')]),
   easy:'계수만 순서대로 넣으면 계산기가 풀어줘요. 순서(a→b→c)를 틀리지 않는 게 전부예요.'}},
 calcRad(){const d=pick([30,45,60,90,120,15]);const r=d*Math.PI/180;
  return {kind:'유사',title:'도 → 라디안, 그리고 sin',q:`${d}°는 몇 {{rad}}인가? sin ${d}°의 값은?`,first:['rad = 도 × π/180','계산기 각도 모드 확인 (D/R)'],
   steps:[{h:'변환',b:`<div class="ln">${d} × π/180 = ${piForm(d,180)} = ${fx(r,4)} rad</div>`},{h:'sin',b:`<div class="ln">sin ${d}° = ${fx(Math.sin(r),4)}</div><div class="rd">화면 위 D(Deg)일 때 도로 계산 · R(Rad)이면 라디안</div>`}],
   ans:`${fx(r,4)} rad · sin = ${fx(Math.sin(r),4)}`,ansRead:`${fxR(r,4)} 라디안`,calc:calcBlock([[[...ks(d),'×','SHIFT','×10ˣ','÷','1','8','0','='],piForm(d,180)],[['S⇔D'],casioDec(r)],[['SHIFT','MODE','3'],'Deg 모드'],[['sin',...ks(d),')','='],casioDec(+Math.sin(r).toPrecision(10))]],[W_PI]),
   easy:'반 바퀴(180°)가 π 라디안이에요. 도에 π/180을 곱하면 돼요.'}}
});
PSET.numsense=[['expRule',true],['expRule'],['engN',true],['engN'],['sigFig'],['pctErr',true],['dbGen',true],['dbGen'],['propSense'],['propSense'],['pythag']];
PSET.calcbasic=[['calcSci'],['calcSci'],['calcEqn'],['calcRad'],['dbGen']];
TOPICS.numsense={name:'숫자 감각',g:['expRule','engN','sigFig','pctErr','dbGen','propSense','pythag']};
TOPICS.calcbasic={name:'계산기',g:['calcSci','calcEqn','calcRad']};
['expRule','engN','sigFig','pctErr','dbGen','propSense','pythag','calcSci','calcEqn','calcRad'].forEach(g=>BASICG.add(g));

PAGES.numsense={title:'숫자 감각 — 지수·로그·유효숫자',part:'제0편 2장',secs:[
 {k:'지수',h:'10의 거듭제곱 — 소수점 옮기기',b:`<p class="small muted">[AI 보충] 강의 밖 기초 · 센서 계산의 절반은 지수 계산이에요.</p>
   <div data-anim="expSlide"></div>
   <div class="rules"><div class="rule"><i>1</i><div><b>곱하면 지수 더하기</b><div class="rd">10³ × 10⁻⁶ = 10⁻³</div></div></div>
    <div class="rule"><i>2</i><div><b>나누면 지수 빼기</b><div class="rd">10⁻³ ÷ 10⁻⁹ = 10⁶ (−3 − (−9) = 6)</div></div></div>
    <div class="rule"><i>3</i><div><b>거듭제곱하면 지수 곱하기</b><div class="rd">(10⁻³)² = 10⁻⁶ → 1 mm² = 10⁻⁶ m²</div></div></div>
    <div class="rule"><i>4</i><div><b>10⁰ = 1, 10⁻ⁿ = 1/10ⁿ</b><div class="rd">음수 지수 = 그만큼 나눈 것</div></div></div></div>`,
  easy:'숫자 부분과 지수 부분을 따로 계산해요. 지수는 더하고 빼기만 하면 돼요.'},
 {k:'표기법',h:'과학적 표기 vs 공학 표기',b:`<div class="f4"><div><div class="h">[[scinot|과학적 표기]]</div><div class="ln">0.00000159 = 1.59 × 10⁻⁶</div><div class="rd">앞 숫자 1~10</div></div>
   <div><div class="h">[[engnot|공학 표기]]</div><div class="ln">0.0000159 = 15.9 × 10⁻⁶ = 15.9 μ</div><div class="rd">지수를 3의 배수로 → 바로 접두어</div></div></div>
   <div class="rel mono">10⁻¹⁵ f · 10⁻¹² p · 10⁻⁹ n · 10⁻⁶ μ · 10⁻³ m · 10³ k · 10⁶ M · 10⁹ G · 10¹² T · 10¹⁵ P</div>
   <div class="warnbox">답을 쓸 땐 공학 표기 + 접두어가 읽기 쉬워요: 1.59 × 10⁻⁹ H → <b>1.59 nH</b>. 계산기 [ENG] 키 한 번.</div>
   <button class="ghost" data-goto="unitbasic">↗ 접두어 사다리 (제0편 1장)</button>`,
  easy:'4.7 × 10⁻⁹ F를 "4.7 나노패럿"으로 부르는 게 공학 표기예요.'},
 {k:'유효숫자',h:'유효숫자와 반올림',b:`<div class="tblwrap fit"><table><tr><th>수</th><th>유효숫자</th><th>이유</th></tr>
   <tr><td class="mono">0.00159</td><td>3</td><td class="small">앞의 0은 자리 표시</td></tr><tr><td class="mono">50.0</td><td>3</td><td class="small">소수점 뒤 끝 0은 셈 (측정했다는 뜻)</td></tr><tr><td class="mono">1.59 × 10⁻⁹</td><td>3</td><td class="small">가수만 셈</td></tr><tr><td class="mono">1200</td><td>2~4</td><td class="small">애매 → 1.2 × 10³처럼 쓰면 분명</td></tr></table></div>
   <ul class="clean"><li>[[sigfig|유효숫자]]: 계산 <b>중간엔 반올림하지 말고</b> 마지막에 3자리 정도로</li><li>중간에 반올림하면 오차가 쌓여 답이 달라져요 (기출에서 자주 감점)</li></ul>`,
  easy:'계산기에 나온 긴 숫자는 끝까지 들고 가다가 마지막에만 잘라요.'},
 {k:'비율·오차',h:'퍼센트·오차율',b:`<div class="eqn">오차율 = (측정 − 참)/참 × 100 %<small>[[relerr|상대오차]]</small></div>
   <div class="rel mono">% = 10⁻² · ppm = 10⁻⁶ · ppb = 10⁻⁹<br>%FS (풀스케일 대비) = 오차 ÷ 측정 범위 × 100</div>
   <p class="small">예: 범위 0~100 ℃ 센서의 오차 ±0.5 ℃ = ±0.5 %FS</p><button class="ghost" data-goto="char">↗ 정확도·선형성 (제1편 2장)</button>`,
  easy:'몇 개 틀렸는지보다 "전체 중 몇 %"가 중요해요.'},
 {k:'로그·dB',h:'로그와 데시벨',b:`${FIG.logScale()}
   <div class="f4"><div><div class="h">[[logarithm|로그]]</div><div class="ln">log 1000 = 3,  log 0.01 = −2</div><div class="ln">log 2 ≈ 0.301,  log(ab) = log a + log b</div></div>
    <div><div class="h">[[decibel|데시벨]]</div><div class="ln">전압·전류: 20 log(V₂/V₁)</div><div class="ln">전력: 10 log(P₂/P₁)</div><div class="rd">전압 2배 ≈ 6 dB · 10배 = 20 dB · 전력 2배 ≈ 3 dB</div></div></div>
   <p class="small">ln은 밑이 e ≈ 2.718인 자연로그 — 감쇠·충방전(e⁻ᵗ/τ)에 나와요.</p>`,
  easy:'로그는 "0이 몇 개냐"를 묻는 계산. 그래서 아주 큰 범위를 짧게 줄일 수 있어요.'},
 {k:'비례 감각',h:'식 보는 눈 — 무엇이 커지면?',b:`<div class="tblwrap fit"><table><tr><th>모양</th><th>x가 2배면 y는</th><th>예</th></tr>
   <tr><td class="mono">y ∝ x</td><td>2배</td><td class="small">V = IR (I 2배 → V 2배)</td></tr><tr><td class="mono">y ∝ 1/x</td><td>½배</td><td class="small">C = εA/d (d 2배 → C 반)</td></tr>
   <tr><td class="mono">y ∝ x²</td><td>4배</td><td class="small">P = V²/R</td></tr><tr><td class="mono">y ∝ √x</td><td>약 1.41배</td><td class="small">노이즈 ∝ √대역폭</td></tr><tr><td class="mono">y ∝ 1/√x</td><td>약 0.71배</td><td class="small">표피 깊이 δ ∝ 1/√f</td></tr></table></div>
   <p class="small">[[proportion|비례·반비례]]는 서술형 "무엇이 커지면?" 질문의 열쇠예요.</p>`,
  easy:'식에서 위에 있으면 같이 크고, 아래에 있으면 반대로 작아져요. 제곱이 붙으면 효과가 더 세요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>곱 → 지수 더하기 · 나눗셈 → 빼기 · 제곱 단위 → 지수 2배</li><li>공학 표기 = 지수 3의 배수 → 접두어 (ENG 키)</li><li>dB: 전압 20 log, 전력 10 log · 중간에 반올림 금지</li></ol>
   <details class="qa"><summary>10⁻³ ÷ 10⁻⁹는?</summary><div>10⁶ (−3 − (−9) = 6)</div></details>
   <details class="qa"><summary>0.00470의 유효숫자는 몇 자리?</summary><div>3자리 (4, 7, 끝의 0)</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};

PAGES.calcbasic={title:'공학용 계산기 기본',part:'제0편 3장',secs:[
 {k:'처음 설정',h:'fx-570ES PLUS 처음 설정',b:`<p class="small muted">[AI 보충] fx-570ES PLUS 2nd Edition 기준 · 메뉴 번호는 기종마다 조금 다를 수 있어요.</p>${FIG.calcKeys()}
   <ul class="clean"><li>전부 초기화 <div class="ln">SHIFT 9 → 3 (All) → = → AC</div></li><li>일반 계산 모드 <div class="ln">MODE 1 (COMP)</div></li><li>수학 표기 (분수·루트 그대로) <div class="ln">SHIFT MODE 1 (MthIO)</div></li><li>각도 = 도 <div class="ln">SHIFT MODE 3 (Deg) → 화면 위 D</div></li><li>각도 = 라디안 <div class="ln">SHIFT MODE 4 (Rad) → 화면 위 R</div></li></ul>`,
  easy:'시험 전에 한 번 초기화하고, 화면 위에 D가 떠 있는지 확인하세요.'},
 {k:'숫자 입력',h:'지수·음수·π 넣기',b:`<div class="f4"><div><div class="h">×10ˣ (지수)</div><div class="ln">4.7 ×10ˣ (−) 9</div><div class="rd">= 4.7 × 10⁻⁹ · 앞에 숫자 먼저!</div></div>
   <div><div class="h">(−) (음수 부호)</div><div class="ln">지수 앞 마이너스는 [(−)]</div><div class="rd">[−](빼기)를 누르면 Syntax ERROR</div></div>
   <div><div class="h">π</div><div class="ln">SHIFT ×10ˣ</div></div><div><div class="h">10⁹ 그 자체</div><div class="ln">1 ×10ˣ 9</div><div class="rd">"×10ˣ 9"만 누르면 안 됨</div></div></div>`,
  easy:'나노(10⁻⁹)를 넣을 땐 ×10ˣ 다음에 (−) 9. 빼기 키가 아니에요.'},
 {k:'분수·ENG',h:'S⇔D와 ENG — 결과 보기 바꾸기',b:`<div class="f4"><div><div class="h">S⇔D</div>√26, 3/7, π/6 같은 분수·루트 모양 ↔ 소수<div class="rd">수학 표기 모드에서 결과가 분수로 나오면 한 번 누르기</div></div>
   <div><div class="h">ENG</div>지수를 3의 배수로 → 접두어 읽기<div class="rd">0.00159 → ENG → 1.59×10⁻³ (= 1.59 m…)<br>SHIFT ENG는 반대 방향</div></div></div>
   <div class="warnbox">결과 1.5915×10⁻⁹ → 단위가 H면 <b>1.59 nH</b>로 써요.</div>`,
  easy:'분수로 나오면 S⇔D, 지수가 이상하면 ENG.'},
 {k:'함수 키',h:'√, x², log, 괄호',b:`<ul class="clean"><li><b>√■</b> — |Z|, 노이즈 √BW<div class="ln">√■ 50 x² + 10 x² =</div></li><li><b>x² · x^■</b> — 제곱, T⁴<div class="ln">300 x^■ 4 =</div></li><li><b>log · SHIFT log(10ˣ)</b> — dB<div class="ln">20 log 100 ) =</div></li><li><b>ln · SHIFT ln(eˣ)</b> — 감쇠<div class="ln">SHIFT ln (−) 1 =</div></li><li><b>■/■</b> — 분수 틀 (↓로 분모 이동)</li></ul>
   <div class="warnbox">분모가 여러 항이면 반드시 <b>괄호</b> 또는 분수 틀 ■/■. 10 ÷ 2π × 10⁹ ≠ 10 ÷ (2π × 10⁹)</div>`,
  easy:'루트·log 키를 누르면 괄호가 자동으로 열려요. 닫는 괄호를 잊지 마세요.'},
 {k:'메모리',h:'Ans와 변수 저장',b:`<ul class="clean"><li><b>Ans</b>: 바로 앞 결과. 이어서 ÷, × 를 누르면 자동으로 Ans가 붙음</li><li>저장: 값 계산 후 <span class="mono">SHIFT RCL (STO) → (−)</span> = 변수 A에 저장</li><li>꺼내기: <span class="mono">ALPHA (−)</span> = A · <span class="mono">RCL (−)</span> = A 값 보기</li></ul>
   <p class="small">예: ω = 2π × 10⁹를 A에 저장 → L = 10 ÷ A, C = 1 ÷ (A × 10)</p>`,
  easy:'긴 숫자는 다시 치지 말고 저장했다 꺼내 써요. 오타가 줄어요.'},
 {k:'STAT·EQN',h:'통계(STAT)와 방정식(EQN)',b:`<div class="f4"><div><div class="h">STAT — 최소제곱 직선</div><div class="ln">MODE 3 2 (A+BX) → x, y 입력</div><div class="ln">AC → SHIFT 1 → 5 (Reg) → A, B, r</div><div class="rd">⚠ 카시오 A = 절편, B = 기울기(감도)</div></div>
   <div><div class="h">[[eqnmode|EQN]] — 연립방정식</div><div class="ln">MODE 5 1 → a₁ b₁ c₁ a₂ b₂ c₂</div><div class="rd">= 누를 때마다 X, Y</div></div></div>
   <button class="ghost" data-goto="calib" data-i="3">↗ STAT 실전 (제1편 3장)</button>`,
  easy:'STAT은 점 여러 개로 직선 찾기, EQN은 식 2개로 미지수 2개 찾기예요.'},
 {k:'실수 모음',h:'자주 하는 실수',b:`<ol class="clean"><li>지수 앞 [−] → Syntax ERROR → [(−)]</li><li>분모 괄호 빠뜨림 → 값이 수천만 배 틀림</li><li>각도 모드 R인데 도로 sin 계산</li><li>STAT의 A, B를 기울기·절편 거꾸로</li><li>중간 결과를 반올림해서 다시 입력 → Ans·변수 쓰기</li></ol>
   <button class="ghost" data-goto="dict:key">↗ 부록 D 계산기 키</button>`,
  easy:'틀렸을 때 이 다섯 개부터 의심해 보세요.'},
 {k:'문제',h:'',b:'__PROBS__'}
]};
CARDS.push(
 {id:'n1',tag:'숫자',f:'10ᵃ × 10ᵇ, 10ᵃ ÷ 10ᵇ',a:'10ᵃ⁺ᵇ, 10ᵃ⁻ᵇ',r:'곱 → 더하기, 나눗셈 → 빼기',e:''},
 {id:'n2',tag:'숫자',f:'공학 표기법이란?',a:'지수를 3의 배수로 → 접두어로 바로 읽기',r:'계산기 ENG',e:'1.59×10⁻⁹ H = 1.59 nH'},
 {id:'n3',tag:'숫자',f:'0.00159의 유효숫자 자리 수',a:'3자리',r:'앞의 0은 세지 않음',e:''},
 {id:'n4',tag:'숫자',f:'전압 10배는 몇 dB? 전력 10배는?',a:'20 dB · 10 dB',r:'20 log, 10 log',e:''},
 {id:'n5',tag:'숫자',f:'y ∝ 1/√x에서 x가 4배면?',a:'y는 ½배',r:'표피 깊이 δ ∝ 1/√f',e:''},
 {id:'k1',tag:'계산기',f:'지수 앞 마이너스 키는?',a:'(−)',r:'빼기 [−]가 아님',e:''},
 {id:'k2',tag:'계산기',f:'π 입력',a:'SHIFT ×10ˣ',r:'',e:''},
 {id:'k3',tag:'계산기',f:'결과가 분수·루트로 나올 때',a:'S⇔D',r:'',e:''},
 {id:'k4',tag:'계산기',f:'STAT A+BX에서 A와 B는?',a:'A = 절편, B = 기울기',r:'감도 = B',e:''},
 {id:'k5',tag:'계산기',f:'연립방정식 모드',a:'MODE 5 1 → a₁ b₁ c₁ a₂ b₂ c₂',r:'EQN',e:''}
);
