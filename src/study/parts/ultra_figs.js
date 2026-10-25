/* ───────── 초음파·압전 그림과 움직이는 그림 ───────── */
const cT=T=>331.3*Math.sqrt(1+T/273);           // 음속 m/s (13,044 inch/s × 0.0254)
const MAT={air:['공기',1.2,330],water:['물',1000,1480],fat:['지방',952,1459],soft:['연조직',1060,1540],lung:['폐',400,650],bone:['뼈',1912,4080],pzt:['PZT',null,4000,38]};
const Zof=k=>MAT[k][3]||MAT[k][1]*MAT[k][2]/1e6;   // Mrayl

Object.assign(FIG,{
 freqBand(){return svgFig(340,110,`
   <rect x="10" y="34" width="80" height="26" style="fill:var(--surface);stroke:var(--line)"/><rect x="90" y="34" width="120" height="26" style="fill:var(--accent-soft);stroke:var(--line)"/><rect x="210" y="34" width="120" height="26" style="fill:var(--unit-soft);stroke:var(--unit)"/>
   ${tx(50,52,'초저주파','small2','middle')}${tx(150,52,'가청음','a b2','middle')}${tx(270,52,'초음파','u b2','middle')}
   ${tx(90,26,'20 Hz','small2','middle')}${tx(210,26,'20 kHz','b small2','middle')}
   ${tx(50,78,'지진','m small2','middle')}${tx(150,78,'말·음악','m small2','middle')}${tx(270,78,'박쥐·주차센서·의료','m small2','middle')}
   ${tx(170,102,'사람 귀가 듣는 범위를 넘으면 초음파 (20 kHz 이상)','m small2','middle')}`,'음파 주파수 범위')},

 transducer(){const L=(y,h,c,t1,t2)=>`<rect x="60" y="${y}" width="150" height="${h}" style="fill:${c};stroke:var(--ink);stroke-width:1.4"/>${tx(222,y+h/2+4,t1,'b2')}${t2?tx(222,y+h/2+19,t2,'m small2'):''}`;
  return svgFig(340,250,`
   <path d="M48 14 V196 M222 14" style="fill:none;stroke:var(--muted);stroke-width:3"/><path d="M48 14 H58 M48 196 H58" style="stroke:var(--muted);stroke-width:3"/>${tx(8,30,'하우징','m small2')}
   ${L(18,52,'var(--surface2)','백킹재','뒤로 가는 파동 흡수')}
   <rect x="60" y="70" width="150" height="5" style="fill:var(--ink)"/>
   ${L(75,46,'var(--warn-soft)','압전체 (PZT)','두께 = λ/2 → 공진')}
   <rect x="60" y="121" width="150" height="5" style="fill:var(--ink)"/>${tx(30,126,'전극','m small2','middle')}
   ${L(126,30,'var(--unit-soft)','정합층','두께 = λ/4')}
   ${L(156,16,'var(--accent-soft)','겔','공기층 제거')}
   <rect x="20" y="172" width="230" height="28" style="fill:var(--surface);stroke:var(--line)"/>${tx(135,191,'피부 · 대상','b2','middle')}
   ${ar(135,205,135,240,'u',2.6)}${tx(146,232,'초음파 →','u b2')}`,'초음파 트랜스듀서 층 구조',
   '<b>백킹재 | 전극 | 압전체(λ/2) | 전극 | 정합층(λ/4) | 겔 | 대상</b> 순서. 정합층과 겔이 "임피던스 계단"을 만들어 반사를 줄여요.')},

 unimorph(){const st=(x,up,lb)=>{const c=up?-1:1;return `<path d="M${x} 80 Q${x+60} ${80+c*28} ${x+120} 80" style="fill:none;stroke:var(--muted);stroke-width:7"/><path d="M${x+20} ${80+c*4} Q${x+60} ${80+c*22} ${x+100} ${80+c*4}" style="fill:none;stroke:var(--warn);stroke-width:6"/>${tx(x+60,30,lb,'b2','middle')}${tx(x+60,140,up?'세라믹이 늘어남 → 위로 휨':'세라믹이 줄어듦 → 아래로 휨','m small2','middle')}`};
  return svgFig(340,160,`${st(20,true,'(+) 전압')}${st(200,false,'(−) 전압')}${tx(170,156,'회색 = 금속판 · 주황 = 압전 세라믹','m small2','middle')}`,'유니모르프 굽힘',
   '금속판은 늘거나 줄지 않고 압전 세라믹만 늘고 줄어서 판 전체가 <b>휘어요</b>. 전압 방향을 번갈아 바꾸면 판이 떨려서 음파가 나와요.')},

 beam(){return svgFig(340,170,`
   <rect x="8" y="60" width="26" height="50" rx="4" style="fill:var(--ink)"/>
   <rect x="34" y="62" width="120" height="46" style="fill:var(--unit-soft);stroke:var(--unit)"/>
   <polygon points="154,62 330,22 330,148 154,108" style="fill:var(--unit-soft);stroke:var(--unit);opacity:.75"/>
   <line x1="154" y1="20" x2="154" y2="150" style="stroke:var(--muted);stroke-dasharray:4 3"/>
   ${tx(94,52,'근거리장 (near)','b2','middle')}${tx(94,128,'평면파 · 폭 일정','m small2','middle')}
   ${tx(250,14,'원거리장 (far)','b2','middle')}${tx(250,164,'구면파 · 퍼짐(발산)','m small2','middle')}
   <path d="M34 62 Q60 30 90 46" style="fill:none;stroke:var(--bad);stroke-width:1.6;stroke-dasharray:3 3"/>${tx(60,28,'사이드 로브','b small2','middle')}
   ${ar(170,85,320,85,'u',2)}`,'초음파 빔: 근거리장과 원거리장',
   '센서 가까이에서는 빔 폭이 거의 일정하고(근거리장), 멀어지면 퍼져요(원거리장). <b>주파수↑·크기↑</b>면 덜 퍼져요.')},

 qfactor(){const spec=(x,w,lb,s)=>{let d='';for(let i=0;i<=40;i++){const u=(i-20)/20;const y=110-70*Math.exp(-(u*u)/(2*w*w));d+=(i?'L':'M')+(x+i*3)+' '+y.toFixed(1)}return `<path d="${d}" style="fill:none;stroke:var(--ink);stroke-width:2.2"/>${tx(x+60,22,lb,'b2','middle')}${tx(x+60,132,s,'m small2','middle')}`};
  return svgFig(340,150,`${spec(20,.12,'높은 Q (좁은 대역)','펄스 길다 · 순수한 주파수')}${spec(200,.45,'낮은 Q (넓은 대역)','펄스 짧다 · 거리 분해능↑')}
   ${ar(68,74,92,74,'u',1.6,'2')}${ar(222,74,298,74,'u',1.6,'2')}${tx(170,146,'Q = f₀ / BW','b2','middle')}`,'Q 값: 좁은 대역과 넓은 대역')},

 ndt(o={}){const T=o.T||'T',th=o.th||'θ';return svgFig(340,190,`
   <rect x="10" y="60" width="320" height="80" style="fill:var(--accent-soft);stroke:var(--ink);stroke-width:1.6"/>${tx(318,132,'시료','m small2','end')}
   <g transform="rotate(-25 46 50)"><rect x="24" y="30" width="44" height="26" rx="3" style="fill:var(--ink)"/></g>${tx(30,22,'사각 탐촉자','small2')}
   <polyline points="56,60 136,140 216,60" style="fill:none;stroke:var(--unit);stroke-width:2.6"/>
   ${ar(216,60,240,36,'u',2)}
   <line x1="56" y1="60" x2="56" y2="140" style="stroke:var(--muted);stroke-dasharray:3 3"/>
   <path d="M56 84 A24 24 0 0 0 73 77" style="fill:none;stroke:var(--bad);stroke-width:2"/>${tx(64,100,th,'b b2')}
   ${ar(22,60,22,140,'i',1.4,'2')}${tx(16,104,T,'b2','end')}
   ${tx(86,112,'Leg','u small2')}${ar(56,160,216,160,'i',1.4,'2')}${tx(136,176,'도약거리 = 2T·tanθ','b2','middle')}
   ${tx(250,96,'Leg = T / cosθ','small2')}${tx(250,114,'V경로 = 2T / cosθ','small2')}`,'사각 탐상: V자 경로와 도약거리')}
});

/* ───────── 움직이는 그림 (페이지에 들어가면 시작, 나가면 멈춤) ───────── */
const ANIM={};
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function animShell(host,svgInner,ctl,cap,w=340,h=200){host.innerHTML=`<figure class="figs"><svg viewBox="0 0 ${w} ${h}" role="img">${svgInner}</svg>${ctl?`<div class="figctl">${ctl}</div>`:''}${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;return host.querySelector('svg')}
function loop(fn){let run=!RM(),raf,t0=performance.now(),tp=0;const f=now=>{if(run)tp+=(now-t0)/1000;t0=now;fn(tp);raf=requestAnimationFrame(f)};raf=requestAnimationFrame(f);
  return {stop:()=>cancelAnimationFrame(raf),toggle:()=>{run=!run;return run},get run(){return run}}}

ANIM.wave=host=>{const N=18;const dots=r=>Array.from({length:N},(_,i)=>`<circle data-r="${r}" data-i="${i}" r="5" style="fill:${i===6?'var(--bad)':'var(--accent)'}"/>`).join('');
  const svg=animShell(host,`${tx(10,20,'종파 — 진행 방향으로 밀고 당김','b2')}${dots(0)}${tx(10,104,'횡파 — 진행 방향에 직각으로 흔들림','b2')}${dots(1)}${ar(240,182,320,182,'m',1.8)}${tx(236,186,'진행 방향','m small2','end')}`.replace(/#M([abuimw])/g,'#gm$1'),
   `<button class="tbtn" data-pp>일시정지</button>`,'빨간 점 하나만 따라가 보세요. <b>입자는 제자리에서 흔들리기만</b> 하고, 흔들림의 모양(파동)만 앞으로 가요. 횡파는 고체에서만 생기고 종파보다 느려요.',340,195);
  svg.insertAdjacentHTML('afterbegin',`<defs><marker id="gmm" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--muted)"/></marker></defs>`);
  const c0=[...svg.querySelectorAll('[data-r="0"]')],c1=[...svg.querySelectorAll('[data-r="1"]')];
  const L=loop(t=>{for(let i=0;i<N;i++){const x0=22+i*17.5,ph=2*Math.PI*(x0/120)-2*Math.PI*0.7*t;c0[i].setAttribute('cx',(x0+7*Math.sin(ph)).toFixed(1));c0[i].setAttribute('cy',56);c1[i].setAttribute('cx',x0);c1[i].setAttribute('cy',(140+16*Math.sin(ph)).toFixed(1))}});
  const pb=host.querySelector('[data-pp]');pb.onclick=()=>{pb.textContent=L.toggle()?'일시정지':'재생'};if(!L.run)pb.textContent='재생';return L.stop};

ANIM.tof=host=>{const id='tof'+(++FIGN);
  const svg=animShell(host,`
   <defs><marker id="${id}u" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:var(--ink)"/></marker></defs>
   <rect x="6" y="56" width="26" height="66" rx="4" style="fill:var(--ink)"/>${tx(19,138,'센서','small2','middle')}
   <rect data-wall x="300" y="30" width="16" height="118" style="fill:var(--muted)"/>
   <g data-go></g><g data-back></g>
   <line data-dl x1="32" y1="160" x2="300" y2="160" style="stroke:var(--ink);stroke-width:1.4" marker-end="url(#${id}u)" marker-start="url(#${id}u)"/>
   <text data-dt x="166" y="176" class="b2" text-anchor="middle"></text>
   <text data-tm x="330" y="22" class="b2" text-anchor="end"></text>`,
   `<label class="small">거리 <input type="range" min="0.5" max="3" step="0.1" value="1.5" data-d style="vertical-align:middle;width:110px"></label>
    <label class="small">기온 <select data-T style="width:auto;padding:4px 6px"><option>0</option><option selected>20</option><option>35</option></select> °C</label>`,'',340,185);
  const fig=host.querySelector('figure');fig.insertAdjacentHTML('beforeend','<div class="tofcalc mono small" data-calc></div>');
  const q=s=>host.querySelector(s);let d=1.5,T=20,ph=0;
  const calc=()=>{const c=cT(T),t=2*d/c;q('[data-calc]').innerHTML=`c = 331.3 × √(1 + ${T}/273) = <b>${c.toFixed(1)} m/s</b><br>왕복 t = 2d ÷ c = 2 × ${d.toFixed(1)} ÷ ${c.toFixed(1)} = <b>${(t*1000).toFixed(2)} ms</b><br>거리 d = c × t ÷ 2 = <b>${d.toFixed(2)} m</b>`;return t};
  let tr=calc();
  q('[data-d]').oninput=e=>{d=+e.target.value;tr=calc();ph=0};q('[data-T]').onchange=e=>{T=+e.target.value;tr=calc();ph=0};
  const arcs=(x,dir)=>[0,1,2].map(k=>`<path d="M${x-dir*k*6} 66 Q${x+dir*14-dir*k*6} 89 ${x-dir*k*6} 112" style="fill:none;stroke:${dir>0?'var(--accent)':'var(--unit)'};stroke-width:2.4;opacity:${1-k*.3}"/>`).join('');
  const L=loop(tp=>{const wx=32+d/3*268;q('[data-wall]').setAttribute('x',wx);q('[data-dl]').setAttribute('x2',wx);q('[data-dt]').setAttribute('x',(32+wx)/2);q('[data-dt]').textContent=`d = ${d.toFixed(1)} m`;
    const per=3.2,u=(tp%per)/per*1.15;ph=u;
    if(u<=.5){q('[data-go]').innerHTML=arcs(34+(wx-40)*(u/.5),1);q('[data-back]').innerHTML=''}
    else if(u<=1){q('[data-go]').innerHTML='';q('[data-back]').innerHTML=arcs(wx-6-(wx-40)*((u-.5)/.5),-1)}
    else{q('[data-go]').innerHTML='';q('[data-back]').innerHTML=''}
    q('[data-tm]').textContent=`경과 t = ${(Math.min(u,1)*tr*1000).toFixed(2)} ms ${u>=1?'✓ 반사파 도착':''}`});
  return L.stop};

ANIM.piezo=host=>{let mode=0;
  const svg=animShell(host,`
   <rect data-top x="100" y="60" width="140" height="8" style="fill:var(--ink)"/><rect data-blk x="100" y="68" width="140" height="64" style="fill:var(--warn-soft);stroke:var(--warn);stroke-width:2"/><rect data-bot x="100" y="132" width="140" height="8" style="fill:var(--ink)"/>
   <text data-pt x="170" y="56" class="b b2" text-anchor="middle"></text><text data-pb x="170" y="156" class="u b2" text-anchor="middle"></text>
   <g data-force></g>
   <g data-meter><circle cx="292" cy="100" r="28" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/><line data-needle x1="292" y1="108" x2="292" y2="80" style="stroke:var(--bad);stroke-width:2.4"/>${tx(292,122,'V','b2','middle')}</g>
   <g data-src><circle cx="44" cy="100" r="20" style="fill:var(--surface);stroke:var(--ink);stroke-width:1.6"/><path d="M32 100 Q38 88 44 100 T56 100" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>${tx(44,136,'교류 전압','small2','middle')}</g>
   <g data-snd></g>
   <text data-lb x="170" y="190" class="b2" text-anchor="middle"></text>`,
   `<button class="tbtn" data-m="0" aria-pressed="true">① 누르기 → 전압 (정압전)</button><button class="tbtn" data-m="1" aria-pressed="false">② 전압 → 떨림 (역압전)</button>`,
   '<b>정압전</b>: 누르면 결정 속 분극이 바뀌어 표면에 전하(전압)가 생겨요 — 센서(수신). <b>역압전</b>: 전압을 걸면 결정이 늘고 줄어요 — 교류면 떨려서 초음파를 내요(송신). 하나의 소자로 둘 다 할 수 있어요.',340,200);
  const q=s=>host.querySelector(s);
  host.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{mode=+b.dataset.m;host.querySelectorAll('[data-m]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))});
  const L=loop(tp=>{const s=Math.sin(2*Math.PI*0.8*tp);
    if(mode===0){const sq=Math.max(0,s)*10;q('[data-src]').style.display='none';q('[data-meter]').style.display='';q('[data-snd]').innerHTML='';
      q('[data-top]').setAttribute('y',60+sq);q('[data-blk]').setAttribute('y',68+sq);q('[data-blk]').setAttribute('height',64-sq*2);q('[data-bot]').setAttribute('y',132-sq);
      q('[data-force]').innerHTML=`<line x1="170" y1="${14+sq}" x2="170" y2="${50+sq}" style="stroke:var(--bad);stroke-width:4"/><path d="M162 ${44+sq} L170 ${56+sq} L178 ${44+sq}z" style="fill:var(--bad)"/><line x1="170" y1="${186-sq}" x2="170" y2="${150-sq}" style="stroke:var(--bad);stroke-width:4"/><path d="M162 ${156-sq} L170 ${144-sq} L178 ${156-sq}z" style="fill:var(--bad)"/>`;
      q('[data-pt]').textContent=sq>2?'+ + + +':'';q('[data-pb]').textContent=sq>2?'− − − −':'';q('[data-pt]').setAttribute('y',38);q('[data-pb]').setAttribute('y',172);
      const a=sq/10*60*Math.PI/180;q('[data-needle]').setAttribute('x2',(292+28*Math.sin(a)).toFixed(1));q('[data-needle]').setAttribute('y2',(108-28*Math.cos(a)).toFixed(1));
      q('[data-lb]').textContent='';}
    else{const dh=s*8;q('[data-src]').style.display='';q('[data-meter]').style.display='none';q('[data-force]').innerHTML='';
      q('[data-top]').setAttribute('y',60-dh);q('[data-blk]').setAttribute('y',68-dh);q('[data-blk]').setAttribute('height',64+dh*2);q('[data-bot]').setAttribute('y',132+dh);
      q('[data-pt]').textContent=s>0?'+':'−';q('[data-pb]').textContent=s>0?'−':'+';q('[data-pt]').setAttribute('y',52-dh);q('[data-pb]').setAttribute('y',160+dh);
      q('[data-snd]').innerHTML=[0,1,2].map(k=>{const r=((tp*40+k*16)%48);return `<path d="M${252+r} ${80-r/3} Q${262+r} 100 ${252+r} ${120+r/3}" style="fill:none;stroke:var(--unit);stroke-width:2;opacity:${1-r/48}"/>`}).join('');
      q('[data-lb]').textContent=s>0?'늘어남':'줄어듦';}
  });return L.stop};

ANIM.refl=host=>{const opts=Object.entries(MAT).map(([k,m])=>`<option value="${k}">${m[0]}</option>`).join('');
  host.innerHTML=`<figure class="figs"><div class="figctl"><label class="small">재료 1 <select data-a style="width:auto;padding:4px 6px">${opts}</select></label><label class="small">재료 2 <select data-b style="width:auto;padding:4px 6px">${opts}</select></label></div>
   <div class="rbar"><div class="rlab"><span>반사</span><b data-rv></b></div><div class="rtrack"><i data-rb style="background:var(--bad)"></i></div>
   <div class="rlab"><span>투과</span><b data-tv></b></div><div class="rtrack"><i data-tb style="background:var(--accent)"></i></div></div>
   <div class="tofcalc mono small" data-rc></div>
   <figcaption>Z 차이가 클수록 많이 튕겨 나와요. <b>연조직 ↔ 공기</b>는 99.9 % 반사 → 그래서 겔을 발라 공기층을 없애요.</figcaption></figure>`;
  const q=s=>host.querySelector(s);q('[data-a]').value='soft';q('[data-b]').value='air';
  const upd=()=>{const a=q('[data-a]').value,b=q('[data-b]').value,Z1=Zof(a),Z2=Zof(b),R=((Z2-Z1)/(Z2+Z1))**2;
    q('[data-rb]').style.width=(R*100)+'%';q('[data-tb]').style.width=((1-R)*100)+'%';q('[data-rv]').textContent=(R*100).toFixed(R<0.01?2:1)+' %';q('[data-tv]').textContent=((1-R)*100).toFixed(1)+' %';
    q('[data-rc]').innerHTML=`Z₁(${MAT[a][0]}) = ${fx(Z1,3)} Mrayl · Z₂(${MAT[b][0]}) = ${fx(Z2,3)} Mrayl<br>R = ((Z₂ − Z₁) ÷ (Z₂ + Z₁))² = <b>${(R*100).toFixed(2)} %</b>`};
  q('[data-a]').onchange=upd;q('[data-b]').onchange=upd;upd();return null};

ANIM.amode=host=>{const D=[60,110,215,255],A0=[1,.85,.32,.24],G=[1,1.15,2.9,3.9];let tgc=false;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 210" role="img"></svg><div class="figctl"><button class="tbtn" data-tgc aria-pressed="false">TGC 켜기</button></div>
   <figcaption><b>A-mode</b>: 한 줄을 따라 에코 크기(진폭)를 시간(깊이) 축에 그려요. <b>B-mode</b>: 진폭을 점의 밝기로 바꿔 여러 줄을 모으면 2D 영상이 돼요. 깊을수록 약해지는 에코를 <b>TGC</b>가 시간에 따라 증폭해 고르게 만들어요.</figcaption></figure>`;
  const svg=host.querySelector('svg');
  const draw=()=>{const A=A0.map((a,i)=>Math.min(1,a*(tgc?G[i]:1)));
    svg.innerHTML=`${tx(8,16,'A-mode (진폭)','b2')}<line x1="20" y1="100" x2="330" y2="100" style="stroke:var(--ink);stroke-width:1.4"/>
     ${D.map((x,i)=>`<path d="M${x-10} 100 Q${x-5} ${100-70*A[i]} ${x} 100 Q${x+5} ${100+40*A[i]} ${x+10} 100" style="fill:none;stroke:var(--bad);stroke-width:2.2"/>`).join('')}
     ${tgc?`<path d="M20 96 C120 94 200 60 330 30" style="fill:none;stroke:var(--accent);stroke-width:1.8;stroke-dasharray:4 3"/>${tx(326,26,'이득(gain)','a small2','end')}`:''}
     ${tx(8,140,'B-mode (밝기)','b2')}<rect x="20" y="150" width="310" height="34" rx="4" style="fill:#111"/>
     ${D.map((x,i)=>`<circle cx="${x}" cy="167" r="10" style="fill:rgb(255,255,255);opacity:${(0.15+0.85*A[i]).toFixed(2)}"/>`).join('')}
     ${tx(325,202,'시간 = 깊이 →','m small2','end')}`};
  draw();const b=host.querySelector('[data-tgc]');b.onclick=()=>{tgc=!tgc;b.setAttribute('aria-pressed',String(tgc));b.textContent=tgc?'TGC 끄기':'TGC 켜기';draw()};return null};

function initAnims(root){return [...root.querySelectorAll('[data-anim]')].map(el=>ANIM[el.dataset.anim]&&ANIM[el.dataset.anim](el)).filter(f=>typeof f==='function')}
