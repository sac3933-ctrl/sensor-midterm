/* ───────── 그림 (SVG) ───────── */
let FIGN=0;
const COL={a:'var(--accent)',b:'var(--bad)',u:'var(--unit)',i:'var(--ink)',m:'var(--muted)',w:'var(--warn)'};
function svgFig(w,h,inner,label,cap){const id='fg'+(++FIGN);
  const defs=`<defs>${Object.entries(COL).map(([k,c])=>`<marker id="${id}${k}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:${c}"/></marker>`).join('')}</defs>`;
  return `<figure class="figs"><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${defs}${inner.replace(/#M([abuimw])/g,(_,k)=>'#'+id+k)}</svg>${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`}
const ar=(x1,y1,x2,y2,c='i',w=2.5,o='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" style="stroke:${COL[c]};stroke-width:${w}${o.includes('d')?';stroke-dasharray:5 4':''}" marker-end="url(#M${c})"${o.includes('2')?` marker-start="url(#M${c})"`:''}/>`;
const tx=(x,y,s,cls='',an='start')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${an}">${s}</text>`;
const pth=(d,c='i',w=2,o='')=>`<path d="${d}" style="fill:none;stroke:${COL[c]};stroke-width:${w}${o.includes('d')?';stroke-dasharray:5 4':''}"${o.includes('>')?` marker-end="url(#M${c})"`:''}/>`;
const omegaDot=(x,y,r=10)=>`<circle cx="${x}" cy="${y}" r="${r}" style="fill:var(--surface);stroke:var(--ink);stroke-width:2"/><circle cx="${x}" cy="${y}" r="3" style="fill:var(--ink)"/>`;
const plate=(x,y,w,dx,dy,fill='var(--surface2)')=>`<polygon points="${x},${y+dy} ${x+w},${y+dy} ${x+w+dx},${y} ${x+dx},${y}" style="fill:${fill};stroke:var(--ink);stroke-width:2"/>`;

const FIG={
 sixDOF(){return svgFig(340,240,`
   <polygon points="132,150 196,150 214,124 150,124" style="fill:var(--surface2);stroke:var(--line);stroke-width:2"/>
   ${ar(173,137,173,42)}${tx(181,50,'z · 위아래','b2')}
   ${ar(173,137,300,137)}${tx(300,158,'x · 앞뒤','b2','end')}
   ${ar(173,137,86,196)}${tx(52,220,'y · 좌우','b2')}
   ${pth('M145 64 A28 9 0 0 0 201 64','u',2.2,'>')}${tx(207,70,'요 yaw','u b2')}
   ${pth('M272 113 A8 24 0 0 1 272 161','u',2.2,'>')}${tx(240,106,'롤 roll','u b2')}
   <g transform="rotate(-55 112 174)">${pth('M112 150 A9 24 0 0 1 112 198','u',2.2,'>')}</g>${tx(24,160,'피치 pitch','u b2')}
   ${tx(170,236,'직선 3축(가속도계) + 회전 3축(자이로) = 6 DOF','m','middle')}`,'6자유도: x·y·z 직선 이동과 roll·pitch·yaw 회전')},

 coriolis(){return svgFig(340,215,`
   ${tx(85,18,'회전판 위에서 굴린 공','b2','middle')}${tx(262,18,'세 방향은 서로 직각','b2','middle')}
   <circle cx="85" cy="110" r="68" style="fill:var(--surface2);stroke:var(--line);stroke-width:2"/>
   ${pth('M58 37 A78 78 0 0 0 17 71','i',2.2,'>')}${tx(8,34,'Ω 회전','b2')}
   ${ar(85,110,150,110,'m',1.6,'d')}${tx(118,102,'똑바로','m small2','middle')}
   ${pth('M85 110 Q122 113 143 141','a',2.6,'>')}<circle cx="85" cy="110" r="5" style="fill:var(--ink)"/>
   ${tx(85,200,'실제로는 옆으로 휘어 보임','a small2','middle')}
   <path d="M262 135 V123 H250" style="fill:none;stroke:var(--muted);stroke-width:1.5"/>
   ${ar(250,135,322,135,'a',3)}${tx(318,156,'v 속도','a b2','end')}
   ${ar(250,135,250,58,'b',3)}${tx(258,64,'F 힘','b b2')}
   ${omegaDot(250,135,11)}${tx(250,172,'Ω 회전축','b2','middle')}${tx(250,188,'(종이 밖으로 ⊙)','m small2','middle')}`,
   '코리올리 힘: 회전판 위 공이 휘는 모습과 Ω·v·F의 직각 관계',
   '판이 도는 동안 공은 똑바로 가지만, 판 위에서 보면 옆으로 휘어요. F는 Ω와 v <b>둘 다에 직각</b>. (위·아래 부호는 교재마다 반대로 쓰기도 해요 — 핵심은 직각)')},

 fog(){return svgFig(340,225,`
   ${pth('M77 38 A86 86 0 0 1 163 38','i',2.2,'>')}${tx(120,16,'Ω (시계 방향 회전)','b2','middle')}
   <circle cx="120" cy="115" r="70" style="fill:none;stroke:var(--line);stroke-width:9"/>
   <circle cx="120" cy="115" r="70" style="fill:none;stroke:var(--surface);stroke-width:1.5;stroke-dasharray:2 3"/>
   ${pth('M110 172 A58 58 0 1 1 149 165','a',2.6,'>')}
   ${pth('M128 160 A46 46 0 1 0 97 155','u',2.6,'>')}
   <rect x="108" y="180" width="24" height="14" rx="3" style="fill:var(--ink)"/>${tx(120,214,'A 출발·도착점','small2','middle')}
   ${tx(206,62,'시계 방향 빛','a b2')}${tx(206,78,'→ 더 긴 길, 늦게 도착','a small2')}
   ${tx(206,104,'반시계 방향 빛','u b2')}${tx(206,120,'→ 먼저 도착','u small2')}
   ${tx(206,152,'위상차 Δφ ∝ Ω','b2')}${tx(206,168,'→ 간섭 빛 세기로 읽음','m small2')}${tx(206,184,'코일 길수록·넓을수록','m small2')}${tx(206,198,'더 민감','m small2')}`,
   'FOG 사냑 효과: 광섬유 고리에서 반대로 도는 두 빛',
   '회전하는 동안 출발점 A가 움직여서, 회전 방향으로 간 빛이 조금 더 먼 길을 가요. 이 차이(위상차)로 회전을 재요 — <b>사냑 효과</b>')},

 rlg(){return svgFig(340,160,`
   <polygon points="40,135 120,25 200,135" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>
   <polygon points="58,126 120,42 182,126" style="fill:none;stroke:var(--unit);stroke-width:2.4;stroke-dasharray:6 4"/>
   ${[[40,135,-30],[120,25,90],[200,135,30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" style="fill:var(--ink)"/>`).join('')}
   ${tx(120,154,'세 모서리 = 거울','m small2','middle')}
   ${tx(214,52,'두 레이저 빛의','b2')}${tx(214,70,'주파수 차 Δf','b2')}${tx(214,96,'= 맥놀이(beat)','u b2')}${tx(214,114,'주파수','u b2')}${tx(214,138,'Δf ∝ Ω','a b2')}`,
   'RLG: 삼각형 레이저 고리에서 두 빛의 주파수 차',
   'RLG도 사냑 효과예요. FOG는 <b>위상차</b>, RLG는 <b>주파수차(맥놀이)</b>로 읽어요.')},

 twoMass(){return svgFig(340,190,`
   ${[[40,'←','b','↑'],[200,'→','b','↓']].map(([x],k)=>`<rect x="${x}" y="70" width="100" height="56" rx="6" style="fill:var(--surface);stroke:var(--ink);stroke-width:2"/>${tx(x+50,103,k?'질량 2':'질량 1','b2','middle')}`).join('')}
   ${ar(90,140,50,140,'a',2.6)}${ar(250,140,290,140,'a',2.6)}${tx(70,158,'v','a b2','middle')}${tx(270,158,'v','a b2','middle')}
   ${ar(152,98,152,62,'b',2.8)}${ar(188,98,188,134,'b',2.8)}${tx(160,62,'F','b b2')}${tx(196,140,'F','b b2')}
   ${ar(90,20,90,62,'m',2,'d')}${ar(250,20,250,62,'m',2,'d')}${tx(170,30,'외부 충격 · 둘 다 같은 방향','m small2','middle')}
   ${tx(170,182,'출력 = 질량1 − 질량2 → 충격은 지워지고, 회전 신호는 2배','small2','middle')}`,
   '2-질량 구조: 반대로 진동하는 두 질량',
   '두 질량을 <b>반대로</b> 흔들면 코리올리 힘도 반대가 돼요. 차이를 빼면 회전 신호는 커지고, 둘 다 같은 방향으로 받는 충격은 지워져요.')},

 plate(o={}){const A=o.A||'A 넓이',d=o.d||'d 간격',e=o.e||'ε (사이 물질)';return svgFig(340,210,`
   ${plate(70,128,170,40,30)}
   <polygon points="70,128 240,128 240,88 70,88" style="fill:var(--unit-soft);stroke:none"/>
   <polygon points="240,128 280,98 280,58 240,88" style="fill:var(--unit-soft);stroke:none;opacity:.7"/>
   ${plate(70,58,170,40,30)}
   ${tx(175,80,'+ + + + +','b b2','middle')}${tx(175,152,'− − − − −','u b2','middle')}
   ${tx(155,114,e,'u b2','middle')}
   ${ar(300,88,300,128,'i',2,'2')}${tx(306,113,d,'b2')}
   ${tx(175,48,A,'b2','middle')}
   ${tx(170,196,'C = εA / d · 넓을수록·가까울수록·ε 클수록 C↑','m small2','middle')}`,
   '평행판 정전용량: 넓이 A, 간격 d, 사이 물질 ε')},

 threeWays(){const pn=(x,t,b1,b2,inner)=>`${tx(x+55,18,t,'b2','middle')}${inner}${tx(x+55,150,b1,'a b2','middle')}${tx(x+55,168,b2,'m small2','middle')}`;
  return svgFig(340,180,`
   ${pn(2,'① 간격 d','d↓ → C↑','가속도·자이로·압력',`<rect x="22" y="44" width="70" height="7" style="fill:var(--ink)"/><rect x="22" y="44" width="70" height="7" transform="translate(0,22)" style="fill:none;stroke:var(--muted);stroke-dasharray:3 3"/><rect x="22" y="104" width="70" height="7" style="fill:var(--ink)"/>${ar(57,30,57,62,'b',2)}`)}
   ${pn(115,'② 겹친 넓이 A','A↑ → C↑','콤 드라이브·각도',`<rect x="126" y="56" width="70" height="7" style="fill:var(--ink)"/><rect x="146" y="98" width="70" height="7" style="fill:var(--ink)"/><rect x="146" y="63" width="50" height="35" style="fill:var(--unit-soft)"/>${ar(196,82,222,82,'b',2)}`)}
   ${pn(228,'③ 사이 물질 ε','ε↑ → C↑','습도·레벨·터치',`<rect x="248" y="56" width="70" height="7" style="fill:var(--ink)"/><rect x="248" y="98" width="70" height="7" style="fill:var(--ink)"/><rect x="252" y="66" width="62" height="29" rx="3" style="fill:var(--warn-soft);stroke:var(--warn)"/>${[[264,80],[283,74],[300,84]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" style="fill:var(--unit)"/>`).join('')}`)}`,
   'C를 바꾸는 3가지: 간격, 겹친 넓이, 사이 물질')},

 zoom(){const rows=[['1 m','책상 폭 ≈ 1 m'],['1 mm','샤프심 굵기 0.5 mm'],['1 μm','머리카락 굵기 ≈ 70 μm'],['1 nm','자이로 감지 변위 수 nm']];
  return svgFig(340,262,rows.map(([l,ex],k)=>{const y=28+k*66;
   return `${tx(20,y-6,l,'b2')}${tx(320,y-6,ex,'m small2','end')}<rect x="20" y="${y}" width="300" height="12" rx="2" style="fill:var(--unit-soft);stroke:var(--unit);stroke-width:1.2"/>
   ${Array.from({length:9},(_,j)=>`<line x1="${20+30*(j+1)}" y1="${y}" x2="${20+30*(j+1)}" y2="${y+12}" style="stroke:var(--unit);stroke-width:1"/>`).join('')}
   ${k<3?`<rect x="20" y="${y}" width="3" height="12" style="fill:var(--bad)"/><polygon points="20,${y+12} 23,${y+12} 320,${y+60} 20,${y+60}" style="fill:var(--bad);opacity:.08"/><line x1="23" y1="${y+12}" x2="320" y2="${y+60}" style="stroke:var(--bad);stroke-width:1;stroke-dasharray:3 3"/>${tx(230,y+36,'1000배 확대 (10³)','b small2','middle')}`:''}`}).join(''),
   '길이 확대: 1 m → 1 mm → 1 μm → 1 nm, 한 칸마다 1000배',
   '빨간 조각 하나를 1000배 키우면 아래 막대가 돼요. <b>m → mm → μm → nm</b>는 한 칸 내려갈 때마다 1000분의 1.')},

 area(){return svgFig(340,200,`
   <rect x="20" y="30" width="150" height="150" style="fill:var(--surface);stroke:var(--ink);stroke-width:2"/>
   ${Array.from({length:9},(_,j)=>`<line x1="${20+15*(j+1)}" y1="30" x2="${20+15*(j+1)}" y2="180" style="stroke:var(--line);stroke-width:1"/><line x1="20" y1="${30+15*(j+1)}" x2="170" y2="${30+15*(j+1)}" style="stroke:var(--line);stroke-width:1"/>`).join('')}
   <rect x="20" y="30" width="15" height="15" style="fill:var(--bad);opacity:.35"/>
   ${tx(95,22,'1 m','b2','middle')}${tx(8,110,'1 m','b2','middle')}
   ${tx(186,52,'1 m = 100 cm 이니까','small2')}${tx(186,78,'가로 100칸 × 세로 100칸','b2')}${tx(186,100,'= 10 000칸 = 10⁴','b2')}
   ${tx(186,134,'1 cm² = 10⁻⁴ m²','b b2')}${tx(186,152,'지수 −2가 두 번 → −4','m small2')}${tx(186,178,'(그림 한 칸 = 10 cm × 10 cm)','m small2')}`,
   '1 m² 안에 1 cm² 칸이 1만 개',
   '넓이는 가로·세로 둘 다 작아지니까 지수가 두 번 들어가요.')},

 /* ── 문제 그림 (숫자가 바뀌면 같이 바뀜) ── */
 pCoriolis(o){return svgFig(340,170,`
   <rect x="110" y="62" width="90" height="56" rx="6" style="fill:var(--surface);stroke:var(--ink);stroke-width:2"/>${tx(155,95,o.m,'b2','middle')}
   ${ar(200,90,290,90,'a',3)}${tx(290,80,o.v,'a b2','end')}${o.v2?tx(290,112,o.v2,'m small2','end'):''}
   ${ar(155,62,155,14,'b',3)}${tx(163,24,o.F,'b b2')}
   ${omegaDot(60,90,12)}${tx(60,128,o.W,'b2','middle')}${tx(60,145,'회전축 ⊙','m small2','middle')}
   ${tx(170,164,'Ω · v · F 서로 직각','m small2','middle')}`,'코리올리 문제 그림')},
 pAngle(W,t,th){const R=46,cx=120,cy=118;const a=Math.min(th,359.9)*Math.PI/180;const x2=cx+R*Math.sin(a),y2=cy-R*Math.cos(a);const L=th>180?1:0;
  return svgFig(340,190,`
   ${ar(cx,cy,cx,cy-80,'m',2,'d')}${tx(cx,cy-86,'처음 방향','m small2','middle')}
   ${ar(cx,cy,cx+82*Math.sin(a),cy-82*Math.cos(a),'a',2.6)}
   <path d="M${cx} ${cy-R} A${R} ${R} 0 ${L} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" style="fill:none;stroke:var(--bad);stroke-width:2.4"/>
   <rect x="${cx-9}" y="${cy-14}" width="18" height="28" rx="5" style="fill:var(--ink)"/>
   ${tx(cx+R*Math.sin(a/2)*1.35,cy-R*Math.cos(a/2)*1.35+5,'θ = ?','b b2','middle')}
   ${tx(230,70,`Ω = ${W} °/s`,'b2')}${tx(230,94,`t = ${t} s`,'b2')}${tx(230,124,'위에서 본 차량','m small2')}`,'회전각 문제 그림')},
 pSF(o){const box=(x,w,t1,t2,c)=>`<rect x="${x}" y="50" width="${w}" height="60" rx="8" style="fill:${c};stroke:var(--ink);stroke-width:1.6"/>${tx(x+w/2,76,t1,'b2','middle')}${tx(x+w/2,96,t2,'small2','middle')}`;
  return svgFig(340,150,`${box(6,92,'회전',o.in,'var(--surface)')}${ar(98,80,120,80)}${box(122,96,'자이로',o.sf,'var(--surface2)')}${ar(218,80,240,80)}${box(242,92,'출력',o.out,'var(--surface)')}
   ${tx(170,138,'출력 = SF × Ω','m small2','middle')}`,'스케일 팩터 문제 그림')},
 pBias(BS,tm){return svgFig(340,180,`
   ${ar(40,150,320,150,'i',1.6)}${ar(40,150,40,20,'i',1.6)}${tx(316,170,'시간 (분)','small2','end')}${tx(46,22,'각도 오차 (°)','small2')}
   <line x1="40" y1="150" x2="290" y2="50" style="stroke:var(--bad);stroke-width:2.6"/><circle cx="290" cy="50" r="5" style="fill:var(--bad)"/>
   ${tx(290,40,'?','b b2','middle')}<line x1="290" y1="150" x2="290" y2="56" style="stroke:var(--muted);stroke-dasharray:3 3"/>${tx(290,168,`${tm}분`,'b2','middle')}
   ${tx(120,92,`기울기 = ${BS} °/hr`,'b small2','middle')}`,'바이어스 누적 문제 그림')},
 pCapGap(C0,d0,dd){const p=(x,gap,lb1,lb2)=>`<rect x="${x}" y="40" width="110" height="8" style="fill:var(--ink)"/><rect x="${x}" y="${48+gap}" width="110" height="8" style="fill:var(--ink)"/>${ar(x+122,48,x+122,48+gap,'i',1.6,'2')}${tx(x+55,30,lb1,'b2','middle')}${tx(x+55,78+gap,lb2,'small2','middle')}`;
  return svgFig(340,150,`${p(10,50,'전',`d₀ = ${d0} μm · C₀ = ${C0} pF`)}${ar(150,70,182,70,'a',2.6)}${p(196,34,'후',`d = ${d0} − ${dd} μm · C = ?`)}`,'간격 변화 문제 그림')},
 pCapEps(C0,e0,e1){return svgFig(340,150,`
   <rect x="40" y="30" width="170" height="9" style="fill:var(--ink)"/><rect x="40" y="101" width="170" height="9" style="fill:var(--ink)"/>
   <rect x="44" y="45" width="162" height="50" rx="4" style="fill:var(--warn-soft);stroke:var(--warn)"/>${tx(125,76,'폴리머 막','b2','middle')}
   ${[[66,58],[100,84],[152,60],[186,82]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" style="fill:var(--unit)"/>`).join('')}
   ${tx(226,54,`εᵣ: ${e0} → ${e1}`,'b2')}${tx(226,78,`C₀ = ${C0} pF`,'b2')}${tx(226,102,'C = ?','b b2')}${tx(125,134,'● 흡수된 물 분자','u small2','middle')}`,'유전율 변화 문제 그림')}
};
