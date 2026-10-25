/* ═════════ 회로 기호 사전 (사전 탭 「기호」 + 제0편 4장) ═════════ */
const SYMS=(()=>{const st='fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round';
 const P=d=>`<path d="${d}" style="${st}"/>`,F=d=>`<path d="${d}" style="fill:var(--ink);stroke:var(--ink);stroke-width:1.2;stroke-linejoin:round"/>`,T=(x,y,s,sz)=>`<text x="${x}" y="${y}" text-anchor="middle" style="font-size:${sz||11}px;fill:var(--ink);font-weight:700">${s}</text>`;
 const arr=(x1,y1,x2,y2)=>{const a=Math.atan2(y2-y1,x2-x1),h=6;return P(`M${x1} ${y1} L${x2} ${y2}`)+F(`M${x2} ${y2} L${(x2-h*Math.cos(a-0.45)).toFixed(1)} ${(y2-h*Math.sin(a-0.45)).toFixed(1)} L${(x2-h*Math.cos(a+0.45)).toFixed(1)} ${(y2-h*Math.sin(a+0.45)).toFixed(1)} Z`)};
 const box=P('M10 30 H38 M82 30 H110')+`<rect x="38" y="20" width="44" height="20" rx="1" style="${st}"/>`;
 const diode=P('M10 30 H48 M72 30 H110 M72 16 V44')+F('M48 16 L72 30 L48 44 Z');
 const cap=P('M10 30 H54 M66 30 H110 M54 14 V46 M66 14 V46');
 const circ=(inner)=>P('M10 30 H44 M76 30 H110')+`<circle cx="60" cy="30" r="16" style="${st}"/>`+inner;
 const bjt=(npn)=>`<circle cx="62" cy="30" r="22" style="${st}"/>`+P('M10 30 H52 M52 16 V44 M52 22 L74 10 V2 M52 38 L74 50 V58')+(npn?F('M74 50 L64 49 L69 42 Z'):F('M54 37 L63 37 L58 44 Z'));
 return [
  ['전원·기준',[
   ['dc','직류 전원 (전지)','DC source / Battery',P('M10 30 H52 M68 30 H110 M52 14 V46 M68 22 V38')+T(44,14,'+',12),'긴 선이 +, 짧은 선이 −. 센서 공급 전압 V_in·V_s.'],
   ['ac','교류 전원','AC source',circ(P('M50 30 C54 20 58 20 60 30 C62 40 66 40 70 30')),'원 안에 사인파. 와전류·초음파 구동 신호.'],
   ['isrc','전류원','Current source',circ(arr(60,40,60,20)),'원 안 화살표 = 일정한 전류 방향. 4~20 mA 트랜스미터·RTD 측정 전류.'],
   ['gnd','접지 (GND)','Ground',P('M60 6 V28 M42 28 H78 M48 36 H72 M54 44 H66'),'전압의 기준점 0 V. 모든 전압은 여기 대비로 잼.']]],
  ['수동 소자',[
   ['res','저항 (IEC 네모)','Resistor (IEC)',box,'유럽·국제식. 이 앱 그림은 이 네모 기호를 써요.'],
   ['resz','저항 (ANSI 지그재그)','Resistor (ANSI)',P('M10 30 H34 L40 20 L48 40 L56 20 L64 40 L72 20 L80 40 L86 30 H110'),'미국식. 교재·데이터시트에 자주 나와요. 네모와 같은 뜻.'],
   ['pot','가변저항·포텐셔미터','Potentiometer',box+arr(60,6,60,19),'몸통을 가리키는 화살표 = 와이퍼(움직이는 접점). 위치센서.'],
   ['thm','서미스터','Thermistor',box+P('M34 46 L44 46 L76 12')+T(92,52,'t°',11),'꺾인 사선 + t° = 온도로 저항이 변함 (NTC·PTC).'],
   ['ldr','포토레지스터 (CdS)','Photoresistor (LDR)',box+arr(36,4,48,17)+arr(50,2,62,15),'들어오는 화살표 = 빛을 받음 → 저항 감소.'],
   ['cap','커패시터','Capacitor',cap,'평행한 두 판 = 평행판 콘덴서 C = εA/d 그대로. 정전용량 센서·필터.'],
   ['ecap','전해 커패시터 (극성)','Polarized capacitor',P('M10 30 H54 M64 30 H110 M54 14 V46 M70 14 Q62 30 70 46')+T(46,14,'+',12),'+ 표시 쪽을 + 전압에. 거꾸로 꽂으면 고장.'],
   ['vcap','가변 커패시터','Variable capacitor',cap+arr(40,48,82,10),'관통 화살표 = 값이 변함. 정전용량형 센서를 이렇게 그리기도 해요.'],
   ['ind','인덕터 (코일)','Inductor',P('M10 30 H32 C32 16 46 16 46 30 C46 16 60 16 60 30 C60 16 74 16 74 30 C74 16 88 16 88 30 H110'),'둥근 봉우리 = 감은 코일. 와전류·속도센서·LC 공진.'],
   ['xfmr','변압기','Transformer',P('M10 14 H30 C44 14 44 24 30 24 C44 24 44 34 30 34 C44 34 44 44 30 44 H10 M110 14 H90 C76 14 76 24 90 24 C76 24 76 34 90 34 C76 34 76 44 90 44 H110 M56 10 V50 M64 10 V50'),'두 코일 + 가운데 철심 선. 전압을 바꾸거나 신호를 절연.'],
   ['fuse','퓨즈','Fuse',P('M10 30 H110')+`<rect x="40" y="22" width="40" height="16" rx="1" style="${st}"/>`,'과전류면 끊어짐. 네모를 선이 관통 (IEC).']]],
  ['반도체',[
   ['diode','다이오드','Diode',diode+T(32,52,'A',10)+T(86,52,'K',10),'삼각형 방향으로만 전류 통과 (애노드 A → 캐소드 K). 실물은 띠 쪽이 K.'],
   ['zener','제너 다이오드','Zener diode',P('M10 30 H48 M72 30 H110 M66 12 L72 16 V44 L78 48')+F('M48 16 L72 30 L48 44 Z'),'구부러진 막대. 역방향 일정 전압 유지 → 기준 전압·보호.'],
   ['led','LED (발광 다이오드)','Light-emitting diode',diode+arr(66,12,80,0)+arr(76,16,90,4),'나가는 화살표 = 빛을 냄. 광전센서의 송광부.'],
   ['pd','포토다이오드','Photodiode',diode+arr(82,0,68,13)+arr(94,4,80,17),'들어오는 화살표 = 빛을 받아 전류. 보통 역방향으로 연결 (광도전 모드).'],
   ['npn','NPN 트랜지스터','NPN transistor',bjt(true)+T(30,24,'B',10)+T(86,8,'C',10)+T(86,58,'E',10),'이미터 화살표가 밖으로 (Not Pointing iN). 근접센서 NPN 출력.'],
   ['pnp','PNP 트랜지스터','PNP transistor',bjt(false)+T(30,24,'B',10)+T(86,8,'E',10)+T(86,58,'C',10),'이미터 화살표가 안으로 (Pointing iN Proudly). PNP 출력.'],
   ['opamp','연산증폭기 (op-amp)','Operational amplifier',P('M10 20 H38 M10 40 H38 M86 30 H110')+`<path d="M38 8 L86 30 L38 52 Z" style="${st}"/>`+T(46,24,'−',13)+T(46,44,'+',13),'삼각형 = 증폭기. − 반전 입력, + 비반전 입력, 꼭짓점이 출력.']]],
  ['스위치·계측·센서',[
   ['sw','스위치','Switch',P('M10 30 H44 M44 30 L74 16 M76 30 H110')+`<circle cx="44" cy="30" r="2.5" style="${st}"/><circle cx="76" cy="30" r="2.5" style="${st}"/>`,'열린 접점. 리밋 스위치·리드 스위치(자석에 닫힘).'],
   ['vm','전압계','Voltmeter',circ(T(60,35,'V',14)),'두 점 사이에 병렬로 연결. 입력 저항이 아주 커야 함.'],
   ['am','전류계','Ammeter',circ(T(60,35,'A',14)),'회로에 직렬로 끼움. 내부 저항이 아주 작아야 함.'],
   ['tc','열전대','Thermocouple',P('M10 18 H50 L70 40 M10 42 H50 L70 40')+`<circle cx="70" cy="40" r="3" style="fill:var(--ink)"/>`+T(30,14,'+',11)+T(30,56,'−',11),'두 금속(선 두 개)이 한 점에서 만남 = 측정 접점.'],
   ['hallS','홀 소자','Hall element',`<rect x="38" y="16" width="44" height="28" style="${st}"/>`+P('M10 30 H38 M82 30 H110 M60 4 V16 M60 44 V56')+T(60,35,'H',12),'네 단자: 한 쌍은 구동 전류, 다른 한 쌍은 홀 전압 V_H.']]]
 ]})();
const SYMBY={};SYMS.forEach(([g,items])=>items.forEach(it=>SYMBY[it[0]]=it));
function symGrid(only){return SYMS.map(([g,items])=>{const its=only?items.filter(x=>only.includes(x[0])):items;if(!its.length)return '';
  return `<div class="dg"><div class="eyebrow">${g}</div><div class="symgrid">${its.map(([k,ko,en,svg,d])=>`<div class="sym"><svg viewBox="0 0 120 60" role="img" aria-label="${ko} 기호">${svg}</svg><b>${ko}</b><small class="mono">${en}</small><span class="dgen">${d}</span></div>`).join('')}</div></div>`}).join('')}
