/* ═════════ 제2편 4장 홀 효과 (홀 센서) ═════════ */
Object.assign(TERM,{
 hall:{ko:'홀 효과',en:'Hall effect',gen:'전류가 흐르는 판에 자석을 대면 옆으로 전압이 생기는 현상.',tech:'전류 Iₓ가 흐르는 반도체에 수직 자계 B_z를 가하면 로렌츠 힘으로 캐리어가 한쪽 면으로 몰려 양 측면 사이에 홀 전압 V_H가 생긴다. V_H ∝ B.',easy:'물이 흐르는 호스에 옆바람을 불면 물이 한쪽으로 쏠리듯, 전자가 자석 때문에 한쪽으로 쏠려 전압이 생겨요.'},
 lorentz:{ko:'로렌츠 힘',en:'Lorentz force',gen:'자기장 속에서 움직이는 전하가 받는 힘.',tech:'F = q(v × B). 전하의 속도와 자기장 모두에 직각. 전자(−)와 정공(+)은 부호가 반대.',easy:'자석 근처를 지나가는 전자를 옆으로 미는 힘이에요.'},
 carrier:{ko:'캐리어',en:'Carrier (electron · hole)',gen:'전기를 나르는 알갱이.',tech:'n형 반도체의 주 캐리어는 전자(−), p형은 정공(+). 캐리어 농도 n, 이동도 μ.',easy:'전기를 실어 나르는 택배 기사. n형은 전자, p형은 정공.'},
 mobility:{ko:'이동도',en:'Mobility (μ)',gen:'캐리어가 얼마나 잘 달리나.',tech:'단위 전계당 캐리어 속도 v = μE. 단위 m²/(V·s). 클수록 작은 전압으로 큰 전류, 큰 홀 각.',easy:'길이 잘 닦여 있어서 전자가 빨리 달릴 수 있는 정도.'},
 hallangle:{ko:'홀 각',en:'Hall angle (θ_H)',gen:'전류가 자기장 때문에 기운 각도.',tech:'tanθ_H = E_H / Eₓ (= μB [AI 보충]). Eₓ를 작게(높은 이동도 재료), E_H를 크게 하면 V_H가 커진다.',easy:'똑바로 가던 전자가 자석 때문에 비스듬히 가는 각도.'},
 geomf:{ko:'형상계수',en:'Geometry factor (f_H)',gen:'홀 소자 모양에 따른 보정값.',tech:'0~1 값. l/w ≥ 3이면 거의 1 → 길이는 폭의 3배 이상. 실용 소자는 만들기 쉽고 전극 단락이 없는 십자형(cross-shaped).',easy:'짧고 뭉툭하면 전압이 덜 나와서 길쭉하게 또는 십자 모양으로 만들어요.'},
 offset:{ko:'오프셋',en:'Offset',gen:'자석이 없는데도 나오는 전압.',tech:'전극 위치 비대칭, 형상 불균일, 접촉저항·전극 크기 차이로 B = 0에서도 V_H ≠ 0. 온도·전류·증폭기 드리프트로 변하기도 함.',easy:'저울에 아무것도 없는데 0이 아닌 숫자가 뜨는 것.'}
});
Object.assign(UNIT,{
 m3inv:{s:'m⁻³',r:'퍼 세제곱미터',mean:'캐리어 농도 n. 1 m³ 안에 몇 개. 1 cm⁻³ = 10⁶ m⁻³'},
 cm3inv:{s:'cm⁻³',r:'퍼 세제곱센티미터',mean:'1 cm³ 안에 몇 개. × 10⁶ 하면 m⁻³'},
 C:{s:'C',r:'쿨롬',mean:'전하 단위. 전자 하나 q = 1.6 × 10⁻¹⁹ C'},
 m2Vs:{s:'m²/(V·s)',r:'제곱미터 퍼 볼트 세컨드',mean:'이동도 단위. 1 cm²/(V·s) = 10⁻⁴ m²/(V·s)'}
});
FORM.push(
 {eq:'V_H = I·B / (n·q·t)',read:'브이 에이치는 아이 비 나누기 엔 큐 티',name:'홀 전압',page:'hall',sec:1,syms:[['I','전류','A'],['B','자속밀도','T'],['n','캐리어 농도','m3inv'],['q','1.6 × 10⁻¹⁹','C'],['t','두께','m']]},
 {eq:'몰리는 면 = I × B 방향',read:'전류 크로스 자기장',name:'홀 극성 (n형 −, p형 +)',page:'hall',sec:2,syms:[]},
 {eq:'qE_H = qvB',read:'전기력 = 자기력',name:'V_H가 일정한 이유',page:'hall',sec:1,syms:[]}
);

/* 움직이는 그림: 홀 효과 */
ANIM.hallfx=host=>{let type='n',Bdir=1,Bmag=1,acc=0;const N=26;const P=Array.from({length:N},(_,i)=>({x:Math.random(),y:0.15+Math.random()*0.7}));
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 235" role="img" aria-label="홀 효과"></svg>
   <div class="figctl"><button class="tbtn" data-ty="n" aria-pressed="true">n형 (전자)</button><button class="tbtn" data-ty="p" aria-pressed="false">p형 (정공)</button>
    <button class="tbtn" data-bd aria-pressed="false">B: +z (⊙)</button><label class="small">B 크기 <input type="range" min="0" max="2" step="0.1" value="1" data-bm style="width:90px"></label></div>
   <div class="tofcalc small" data-o></div></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);
  const L=loop(tp=>{const target=Bmag;acc+= (target-acc)*0.02;const side=-Bdir; // I(+x) × B(+z) = −y → 화면 아래(+y 화면) 쪽이 −y? 화면 위 = +y
    // 화면 좌표: 위 = +y. I×B 방향 = (Bdir>0 ? −y : +y) → 몰리는 면: Bdir>0 아래쪽, Bdir<0 위쪽
    const pileTop=Bdir<0;let s=`<rect x="40" y="50" width="260" height="120" style="fill:var(--surface2);stroke:var(--ink);stroke-width:1.8"/>
     ${tx(14,114,'+x →','small2')}${ar(14,124,36,124,'i',1.6)}${tx(170,40,'전류 I (+x 방향)','b2','middle')}`;
    for(let i=0;i<5;i++)for(let j=0;j<3;j++){const cx=70+i*50,cy=74+j*38;s+=Bdir>0?`<circle cx="${cx}" cy="${cy}" r="5" style="fill:none;stroke:var(--muted)"/><circle cx="${cx}" cy="${cy}" r="1.6" style="fill:var(--muted)"/>`:`<path d="M${cx-4} ${cy-4}L${cx+4} ${cy+4}M${cx+4} ${cy-4}L${cx-4} ${cy+4}" style="stroke:var(--muted);stroke-width:1.4"/>`}
    const nPile=Math.round(acc*7);const sign=type==='n'?'−':'+';const opp=type==='n'?'+':'−';
    for(let k=0;k<nPile;k++){const x=56+k*34;s+=`<text x="${x}" y="${pileTop?66:166}" class="b2" text-anchor="middle" style="fill:${type==='n'?'var(--unit)':'var(--bad)'}">${sign}</text><text x="${x}" y="${pileTop?166:66}" class="b2" text-anchor="middle" style="fill:var(--muted)">${opp}</text>`}
    P.forEach(p=>{const vx=(type==='n'?-1:1)*0.004;p.x+=vx;if(p.x<0)p.x=1;if(p.x>1)p.x=0;const drift=(acc>0.05?1:0)*(0.012*acc)*(pileTop?-1:1)*Math.max(0,1-acc*0.55);p.y=Math.min(0.88,Math.max(0.12,p.y+drift*0.2+(0.5-p.y)*0.004*acc));
      const X=40+p.x*260,Y=50+p.y*120;s+=type==='n'?`<circle cx="${X.toFixed(1)}" cy="${Y.toFixed(1)}" r="3.6" style="fill:var(--unit)"/>`:`<text x="${X.toFixed(1)}" y="${(Y+4).toFixed(1)}" class="b2" text-anchor="middle" style="fill:var(--bad)">+</text>`});
    const VH=acc*(type==='n'?1:-1)*(Bdir>0?1:-1);
    s+=`<line x1="320" y1="50" x2="320" y2="170" style="stroke:var(--ink)"/><circle cx="320" cy="110" r="14" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.4"/>${tx(320,114,'V','b2','middle')}${tx(336,46,'+y면','small2','end')}${tx(336,186,'−y면','small2','end')}
     ${tx(170,200,`B = ${Bdir>0?'+z (종이 밖 ⊙)':'−z (종이 안 ⊗)'} · ${Bmag.toFixed(1)} 단위`,'small2','middle')}${tx(170,222,`V_H 크기 ∝ ${(Math.abs(VH)).toFixed(2)} (B에 비례)`,'b2','middle')}`;
    svg.innerHTML=s});
  const upd=()=>{const face=Bdir>0?'−y':'+y';q('[data-o]').innerHTML=`I(+x) × B(${Bdir>0?'+z':'−z'}) = <b>${face} 방향</b> → 캐리어가 ${face}면으로 몰림<br>${type==='n'?'n형: 전자(−)가 쌓여 '+face+'면이 (−), 반대면 (+)':'p형: 정공(+)이 쌓여 '+face+'면이 (+), 반대면 (−)'}<br>몰리는 면은 n·p 같고 <b>부호만 반대</b> → 극성으로 반도체 종류를 알 수 있어요. 쌓인 전하의 전기력 qE_H가 자기력 qvB와 같아지면 더 안 쌓여서 V_H가 일정해요.`;
   host.querySelectorAll('[data-ty]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.ty===type)));q('[data-bd]').textContent=Bdir>0?'B: +z (⊙)':'B: −z (⊗)';acc=0};
  host.querySelectorAll('[data-ty]').forEach(b=>b.onclick=()=>{type=b.dataset.ty;upd()});q('[data-bd]').onclick=()=>{Bdir=-Bdir;upd()};q('[data-bm]').oninput=e=>{Bmag=+e.target.value};upd();return L.stop};

Object.assign(FIG,{
 hallGeo(){return svgFig(340,160,`
   <rect x="20" y="50" width="140" height="44" style="fill:var(--surface2);stroke:var(--ink);stroke-width:1.6"/>${ar(20,72,160,72,'i',1.2,'2')}${tx(90,66,'l (길이)','small2','middle')}${ar(170,50,170,94,'i',1.2,'2')}${tx(176,76,'w','small2')}${tx(90,116,'직사각형: l/w ≥ 3 → f_H ≈ 1','small2','middle')}
   <path d="M250 30 h30 v34 h34 v30 h-34 v34 h-30 v-34 h-34 v-30 h34z" style="fill:var(--accent-soft);stroke:var(--ink);stroke-width:1.6"/>${tx(265,148,'십자형: 만들기 쉽고 f_H ≈ 1','a small2','middle')}
   ${[[265,30],[265,128],[216,79],[314,79]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" style="fill:var(--ink)"/>`).join('')}`,'홀 소자 형상')}
});

Object.assign(GEN,{
 hallV(base){const n=base?1e22:pick([1e21,5e21,1e22,2e22]),ImA=base?1:pick([0.5,1,2,5]),useG=!base&&Math.random()<.5,BT=base?0.1:pick([0.05,0.1,0.2,0.5]),tum=base?1:pick([0.5,1,2,5]);const VH=ImA*1e-3*BT/(n*1.6e-19*tum*1e-6);const ns=sci(n);
  return {kind:base?'기본':'유사',title:'홀 전압 크기',
   q:`n형 반도체: n = ${sciT(ns)} {{m3inv}}, I = ${ImA} {{mA}}, B = ${useG?(BT*1e4)+' {{G}}':BT+' {{T}}'}, 두께 t = ${tum} {{um}}. |V_H| = IB/(nqt)는 몇 V인가? (q = 1.6 × 10⁻¹⁹ C)`,
   first:['V_H = IB/(nqt)','mA → A, μm → m'+(useG?', G → T':'')],
   steps:[{h:'단위 먼저 (전부 SI)',b:`<div class="ln">I = ${ImA} mA = ${ImA} × 10⁻³ A · t = ${tum} μm = ${tum} × 10⁻⁶ m</div>${useG?`<div class="ln">B = ${BT*1e4} G × 10⁻⁴ = ${BT} T</div><div class="rd">1 T = 10⁴ G</div>`:''}`},
    {h:'분모',b:`<div class="ln">n q t = ${sciT(ns)} × 1.6 × 10⁻¹⁹ × ${tum} × 10⁻⁶ = ${sciT(sci(n*1.6e-19*tum*1e-6))}</div>`},
    {h:'분자',b:`<div class="ln">I B = ${ImA} × 10⁻³ × ${BT} = ${sciT(sci(ImA*1e-3*BT))}</div>`},
    {h:'나누기',b:`<div class="ln">V_H = ${sciT(sci(ImA*1e-3*BT))} ÷ ${sciT(sci(n*1.6e-19*tum*1e-6))} = ${fx(VH,3)} V</div>`},
    {h:'무엇이 바뀌면',b:`<div class="rd">B·I 2배 → V_H 2배 · t 절반 → 2배 · n 2배 → 절반 (그래서 얇고, n 작고, μ 큰 재료가 유리)</div>`}],
   ans:`|V_H| ≈ ${fx(VH,3)} V`,ansRead:`${fxR(VH)} 볼트`,
   calc:calcBlock([[[...K(ImA,-3),'×',...ks(BT),'÷','(',...K(+ns.m,ns.e),'×','1','.','6','×10ˣ','(−)','1','9','×',...K(tum,-6),')','='],casioDec(VH)]],[W_NEG,'분모 전체를 괄호로']),
   easy:'전자가 적을수록(n↓) 한 개 한 개가 더 세게 쏠려서 전압이 커져요. 얇을수록도 커요.'}},
 hallN(){const VHmV=pick([5,12,30,62.5,100]),ImA=pick([1,2,5]),BT=pick([0.1,0.2,0.5]),tum=pick([1,2,10]);const n=ImA*1e-3*BT/(VHmV*1e-3*1.6e-19*tum*1e-6);
  return {kind:'응용',title:'V_H로 캐리어 농도 구하기',q:`홀 측정에서 I = ${ImA} {{mA}}, B = ${BT} {{T}}, t = ${tum} {{um}}일 때 |V_H| = ${VHmV} {{mV}}였다. 캐리어 농도 n은 몇 m⁻³이고 몇 cm⁻³인가?`,
   first:['n = IB/(V_H q t)','m⁻³ → cm⁻³: × 10⁻⁶'],
   steps:[{h:'식 뒤집기',b:`<div class="ln">V_H = IB/(nqt) → n = IB/(V_H q t)</div>`},{h:'단위',b:`<div class="ln">V_H = ${VHmV} mV = ${VHmV} × 10⁻³ V · t = ${tum} × 10⁻⁶ m · I = ${ImA} × 10⁻³ A</div>`},
    {h:'계산',b:`<div class="ln">n = (${ImA}×10⁻³ × ${BT}) ÷ (${VHmV}×10⁻³ × 1.6×10⁻¹⁹ × ${tum}×10⁻⁶) = ${sciT(sci(n))} m⁻³</div>`},
    {h:'cm⁻³로',b:`<div class="ln">1 m³ = 10⁶ cm³ → 1 m⁻³ = 10⁻⁶ cm⁻³</div><div class="ln">${sciT(sci(n))} × 10⁻⁶ = ${sciT(sci(n*1e-6))} cm⁻³</div><div class="rd">⚠ "퍼 부피"는 부피 단위가 커지면 숫자도 커짐 — 방향 헷갈리기 쉬움</div>`}],
   ans:`n ≈ ${sciT(sci(n))} m⁻³ = ${sciT(sci(n*1e-6))} cm⁻³`,ansRead:`${sciR(sci(n))} 퍼 세제곱미터`,
   calc:calcBlock([[['(',...K(ImA,-3),'×',...ks(BT),')','÷','(',...K(VHmV,-3),'×','1','.','6','×10ˣ','(−)','1','9','×',...K(tum,-6),')','='],casioDec(n),'m⁻³']],[W_NEG]),
   easy:'홀 전압을 재면 "전기 나르는 알갱이가 1 m³에 몇 개 있는지"를 거꾸로 알 수 있어요.'}},
 hallPol(){const I=pick(['+x','−x']),B=pick(['+z','−z']),ty=pick(['n','p']);const ix=I==='+x'?1:-1,bz=B==='+z'?1:-1;const fy=-ix*bz;const face=fy>0?'+y':'−y',other=fy>0?'−y':'+y';const fsign=ty==='n'?'(−)':'(+)';
  return {kind:'응용',title:'홀 전압 극성 판단',fig:FIG.hallGeoQ(I,B),q:`${ty}형 반도체에 전류 I가 ${I} 방향, 자기장 B가 ${B} 방향이다. 캐리어는 어느 면에 쌓이고, ${face}면과 ${other}면 중 어느 쪽이 (+)인가?`,
   first:['몰리는 면 = I × B 방향','n형 그 면 (−), p형 그 면 (+)'],
   steps:[{h:'벡터 곱',b:`<div class="ln">x̂ × ẑ = −ŷ  (ẑ × x̂ = +ŷ)</div><div class="ln">I(${I}) × B(${B}) = ${face}</div><div class="rd">부호가 하나 바뀌면 방향도 반대</div>`},
    {h:'쌓이는 캐리어',b:`<div>${ty==='n'?'전자(−)':'정공(+)'}가 ${face}면으로 → ${face}면 ${fsign}</div><div class="rd">전자는 전류 반대로 움직이지만 전하도 반대라서 결국 같은 면으로 몰림</div>`},
    {h:'정리',b:`<div>${ty==='n'?`${other}면이 (+), ${face}면이 (−)`:`${face}면이 (+), ${other}면이 (−)`}</div>`}],
   ans:`${face}면에 ${ty==='n'?'전자':'정공'} → ${ty==='n'?other:face}면이 (+)`,ansRead:`${face}면에 쌓임`,calc:'<p class="small muted">계산기 없이 방향만 판단하는 문제예요.</p>',
   easy:'전류 방향에서 자기장 방향으로 손가락을 감아 엄지가 가리키는 쪽(I × B)에 알갱이가 몰려요. 전자면 그쪽이 −, 정공이면 +.'}}
});
Object.assign(FIG,{hallGeoQ(I,B){const ix=I==='+x'?1:-1,bz=B==='+z'?1:-1;return svgFig(340,150,`<rect x="60" y="40" width="200" height="70" style="fill:var(--surface2);stroke:var(--ink);stroke-width:1.6"/>
   ${ar(ix>0?80:240,75,ix>0?240:80,75,'a',2.6)}${tx(160,66,`I (${I})`,'a b2','middle')}
   ${bz>0?`<circle cx="292" cy="75" r="12" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><circle cx="292" cy="75" r="3" style="fill:var(--ink)"/>`:`<circle cx="292" cy="75" r="12" style="fill:none;stroke:var(--ink);stroke-width:1.8"/><path d="M285 68L299 82M299 68L285 82" style="stroke:var(--ink);stroke-width:1.8"/>`}${tx(292,104,`B (${B})`,'b2','middle')}
   ${tx(160,32,'+y면','small2','middle')}${tx(160,128,'−y면','small2','middle')}${ar(20,120,20,96,'i',1.4)}${tx(26,100,'+y','small2')}${ar(20,120,44,120,'i',1.4)}${tx(46,124,'+x','small2')}`,'홀 극성 문제 그림')}});

PSET.hall=[['hallV',true],['hallV'],['hallN'],['hallPol'],['hallPol']];
TOPICS.hall={name:'홀 센서',g:['hallV','hallN','hallPol']};BASICG.add('hallV');

PAGES.hall={title:'홀 효과·홀 센서',part:'제2편 4장',secs:[
 {k:'원리',h:'홀 효과 — 움직여 보기',b:`<div data-anim="hallfx"></div>
   <div class="flow"><div>전류 Iₓ가 흐르는 반도체 (GaAs, InSb)</div><div>수직 자계 B_z</div><div>[[lorentz|로렌츠 힘]]으로 [[carrier|캐리어]]가 한쪽 면으로</div><div>양 측면에 전하 축적 → 홀 전압 V_H</div><div>V_H ∝ B → 자기장 측정</div></div>`,
  easy:'자석이 전자를 옆으로 밀어서 한쪽에 쌓이게 해요. 쌓인 만큼 전압이 생기고, 자석이 셀수록 더 많이 쌓여요.',
  src:'【전류 Iₓ가 흐르고 있는 충분히 긴 n-type 반도체 시료에 수직으로 자계 +Bz를 가하면 … side A, B 사이에는 전압 VH가 발생한다】 【전압 VH는 외부 자기장의 세기에 비례한다】'},
 {k:'V_H 식',h:'홀 전압 식과 일정한 이유',b:`<div class="eqn">V_H = I·B / (n·q·t)<small>"브이 에이치는 아이 비 나누기 엔 큐 티" · E_H = V_H / w</small></div>
   <div class="f4"><div><div class="h">기호·단위</div><div class="syms"><span class="s">I</span><span>전류 {{A}}</span><span class="s">B</span><span>자속밀도 {{T}} = V·s/m²</span><span class="s">n</span><span>캐리어 농도 {{m3inv}}</span><span class="s">q</span><span>1.6 × 10⁻¹⁹ {{C}}</span><span class="s">t</span><span>두께 {{m}}</span></div></div>
    <div><div class="h">왜 일정해지나</div>쌓인 전하가 만든 전기력 qE_H가 자기력 qvB와 같아지면(qE_H = qvB) 더 이상 안 쌓임 → V_H 일정</div>
    <div><div class="h">V_H로 알 수 있는 것</div>극성 → n형/p형 판단 · 크기 → 캐리어 농도 n · 이동도 μ</div>
    <div><div class="h">큰 V_H를 얻으려면</div>높은 이동도, 낮은 n, 얇은 t</div></div>`,
  easy:'전자가 적고(n↓), 판이 얇을수록(t↓) 같은 자석에도 전압이 크게 나와요.',
  src:'【작은 Bz에서 큰 VH를 얻기 위해 → High mobility, Low carrier concentration n, thin thickness t가 유리】'},
 {k:'극성',h:'어느 면이 (+)인가',b:`<div class="key"><b>몰리는 면 = I × B 방향</b> (n형·p형 같음) → n형이면 그 면 (−), p형이면 그 면 (+)</div>
   <div class="rel mono">x̂ × ẑ = −ŷ · ẑ × x̂ = +ŷ · x̂ × (−ẑ) = +ŷ</div>
   <p>전자는 전류와 반대로 움직이지만 전하도 반대라서, 로렌츠 힘 방향은 정공과 같아져 <b>같은 면</b>으로 몰려요. 부호만 달라요.</p>
   <p class="small">강의: 전자는 오른손 법칙 그대로, 정공은 왼손(속도 기준)을 쓰면 맞아요 — 결과는 위 규칙과 같아요.</p>`,
  easy:'몰리는 곳은 같고, 몰리는 알갱이의 부호만 달라요. 그래서 전압의 +/− 방향으로 n형인지 p형인지 알 수 있어요.',
  src:'【Electron의 경우 오른손 법칙 그대로 사용, Hole의 경우 왼손을 사용하면 맞음】 【VH의 극성을 측정하면 majority carrier가 전자인지 정공인지 판단】'},
 {k:'설계',h:'홀 각·재료·형상',b:`<div class="f4"><div><div class="h">[[hallangle|홀 각]]</div>tanθ_H = E_H/Eₓ → Eₓ 작게, E_H 크게. 전류를 너무 키우면 자체 자기장(self-induced field) 오차 → 적절한 Iₓ</div>
    <div><div class="h">재료</div>InSb: 밴드갭 매우 작지만 [[mobility|이동도]] 매우 큼 → 고감도 · GaAs: 온도 안정성 좋음 · 원하는 것: 높은 이동도 + 큰 밴드갭</div>
    <div><div class="h">[[geomf|형상계수]]</div>l/w ≥ 3이면 f_H ≈ 1 · 실제 소자는 십자형</div></div>${FIG.hallGeo()}`,
  easy:'전자가 잘 달리는 재료(InSb)는 예민하고, GaAs는 온도에 강해요. 모양은 길쭉하거나 십자형.',
  src:'【InSb: Energy bandgap very small but high mobility → high sensitivity, GaAs: high temperature stability】 【홀 소자의 길이는 폭보다 3배 이상 커야 한다】'},
 {k:'구동 회로',h:'정전류 vs 정전압 구동',b:`<div class="tblwrap"><table><tr><th></th><th>정전류 구동</th><th>정전압 구동</th></tr><tr><td>장점</td><td>직선성 우수, 저항·온도 영향↓, V_H 안정</td><td>회로 간단, 비용↓</td></tr><tr><td>단점</td><td>회로 복잡·비용↑, 전류 잡음이 V_H에</td><td>저항이 변하면 전류 변화 → V_H 변화, 온도 의존성 큼(이동도), 전원 오차</td></tr><tr><td>맞는 재료</td><td>GaAs</td><td>InSb (특정 온도 범위에서 온도 의존성 완만)</td></tr></table></div>
   <p class="small">정전압에서는 I = V/R, R = L/(qnμA)라서 V_H가 이동도 μ에 따라 변해요.</p>`,
  easy:'전류를 일정하게 주면 정확하지만 회로가 비싸고, 전압을 일정하게 주면 싸지만 온도에 흔들려요.',
  src:'【정전류 구동: 직선성 우수 … 회로가 복잡하다】 【정전압 구동: 회로가 간단하고 비용이 낮음 … VH의 온도 의존성이 크다】'},
 {k:'오차',h:'정확도 오차와 오프셋',b:`<ul class="clean"><li>배선·리드선이 만드는 유도 자기장</li><li>온도·줄 가열에 의한 특성 변화</li><li>자기장 방향·각도</li><li>자기저항 효과 (특히 정전압 구동)</li><li>전원·측정 회로 잡음</li><li>접촉저항·전극 형상</li></ul>
   <div class="key">[[offset|오프셋]] 원인: 전극 위치 비대칭, 형상 불균일, 접촉저항·전극 크기 차이 · 온도·전류·위치·증폭기 드리프트로 변해서 완전 보정이 어려움</div>`,
  easy:'자석이 없는데도 전극이 조금 비뚤어져 있으면 전압이 조금 나와요. 이게 오프셋이에요.'},
 {k:'응용',h:'어디에 쓰나',b:`<div class="appchips"><span>🚗 바퀴 속도 (ABS·ESC)</span><span>⚙️ 모터 회전·위치</span><span>🔋 배터리 전류</span><span>📱 나침반·폴더블 각도</span><span>🤖 로봇 관절</span></div>
   <p>폴더블폰: 힌지 근처 자석 + 자기센서 → 접으면 자기장이 바뀌어 V_H로 접힘 각도 계산. 시장은 자동차가 가장 크고, TMR 센서가 고감도·저전력으로 성장 중.</p>
   <button class="ghost" data-goto="speed">↗ 홀 센서로 바퀴 속도 재기 (제3편 3장)</button>`},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'기출·숙제',h:'',b:'__MT:t10__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>V_H = IB/(nqt) · 일정한 이유 qE_H = qvB</li><li>몰리는 면 = I × B 방향, n형 (−) · p형 (+)</li><li>큰 V_H: 높은 μ, 낮은 n, 얇은 t · InSb 감도 / GaAs 온도 안정</li></ol>
   <div class="eyebrow">스스로 점검</div>
   <details class="qa"><summary>B를 −z로 바꾸면 n형 극성은?</summary><div>I × B 방향이 반대가 되어 전자가 반대 면에 쌓임 → 극성 반대.</div></details>
   <details class="qa"><summary>정전압 구동이 온도에 약한 이유는?</summary><div>이동도가 온도에 따라 변해 저항·전류가 바뀌고 V_H ∝ I라서.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'hl1',tag:'홀',f:'홀 전압 식',a:'V_H = IB/(nqt)',r:'E_H = V_H/w',e:''},
 {id:'hl2',tag:'홀',f:'V_H가 일정하게 유지되는 이유',a:'qE_H = qvB (전기력 = 자기력)',r:'',e:''},
 {id:'hl3',tag:'홀',f:'홀 극성 규칙',a:'몰리는 면 = I × B · n형 그 면 (−), p형 그 면 (+)',r:'x̂ × ẑ = −ŷ',e:''},
 {id:'hl4',tag:'홀',f:'큰 V_H를 얻는 조건',a:'높은 이동도, 낮은 캐리어 농도, 얇은 두께',r:'',e:''},
 {id:'hl5',tag:'홀',f:'InSb vs GaAs',a:'InSb: 이동도↑ 고감도 · GaAs: 온도 안정',r:'',e:''},
 {id:'hl6',tag:'홀',f:'형상계수가 1이 되는 조건',a:'l/w ≥ 3 · 실제는 십자형',r:'',e:''},
 {id:'hl7',tag:'홀',f:'정전류 vs 정전압 구동',a:'정전류: 직선성·안정, 비쌈 · 정전압: 간단·쌈, 온도 의존성 큼',r:'',e:''}
);
