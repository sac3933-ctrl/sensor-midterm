/* ═════════ 제4편 현업 연결: 공장 데이터 흐름 · 예지보전 ═════════ */
Object.assign(TERM,{
 isa95:{ko:'ISA-95 계층',en:'ISA-95 / Automation pyramid',gen:'공장 시스템을 층으로 나눈 그림.',tech:'Level 0 센서·구동기 → 1 PLC·DCS(제어) → 2 SCADA·HMI(감시) → 3 MES·Historian(생산 실행·이력) → 4 ERP(경영). 위로 갈수록 느리고 넓은 데이터.',easy:'센서가 맨 아래, 회사 경영 시스템이 맨 위에 있는 피라미드예요.'},
 ma420:{ko:'4~20 mA 전류 신호',en:'4–20 mA current loop',gen:'공장에서 아날로그 값을 보내는 표준 신호.',tech:'측정 범위 0~100 %를 4~20 mA로. 전류라서 긴 배선·잡음에 강함, 4 mA "살아 있는 0"으로 단선(0 mA) 구분. 고장 신호 약 3.6 mA 이하·21 mA 이상(NAMUR NE43). 2선식 루프 전원.',easy:'전압 대신 전류로 보내서 길게 깔아도 값이 안 변해요. 0이 4 mA라 선이 끊기면 바로 알아요.'},
 hart:{ko:'HART',en:'HART protocol',gen:'4~20 mA 선 위에 디지털 정보를 얹는 방식.',tech:'아날로그 전류에 FSK 디지털 신호를 중첩 → 설정·진단·보조 변수 통신. 기존 배선 그대로 사용.',easy:'같은 전선으로 아날로그 값과 디지털 대화를 동시에 해요.'},
 iolink:{ko:'IO-Link',en:'IO-Link',gen:'센서와 PLC 사이의 디지털 점대점 통신.',tech:'표준 3선 케이블로 측정값·파라미터·진단 송수신. 센서 교체 시 설정 자동 복원.',easy:'센서가 ON/OFF만 보내는 게 아니라 "나 더러워졌어요" 같은 정보도 보내요.'},
 plc:{ko:'PLC',en:'Programmable Logic Controller',gen:'공장 기계를 제어하는 산업용 컴퓨터.',tech:'스캔 사이클: 입력 읽기 → 프로그램(래더 등) 실행 → 출력 쓰기 반복(수 ms). 디지털·아날로그 입출력 카드. 이산 제어(조립·포장)에 주로.',easy:'센서 신호를 읽고 규칙대로 모터·밸브를 켜고 끄는 공장의 두뇌예요.'},
 dcs:{ko:'DCS',en:'Distributed Control System',gen:'큰 공정 플랜트용 분산 제어 시스템.',tech:'화학·발전·정유처럼 연속 공정에서 수천 개 루프(PID)를 여러 제어기에 분산, 통합 운전 화면. PLC와 경계는 점점 흐려짐.',easy:'큰 공장 전체의 온도·압력·유량을 한꺼번에 조절하는 시스템이에요.'},
 scada:{ko:'SCADA·HMI',en:'SCADA / HMI',gen:'설비를 화면으로 감시·조작하는 시스템.',tech:'Supervisory Control And Data Acquisition: 여러 PLC 데이터 수집·표시·알람·원격 조작. HMI는 사람-기계 화면.',easy:'설비 상태가 그림과 숫자로 보이는 관제실 화면이에요.'},
 historian:{ko:'히스토리안',en:'Process historian',gen:'센서 값을 시간 순서대로 오래 저장하는 DB.',tech:'시계열 데이터 고속 저장·압축(데드밴드), 추세 분석·보고·AI 학습 데이터의 원천.',easy:'모든 센서 값의 일기장이에요. 언제 몇 도였는지 다 남아 있어요.'},
 mes:{ko:'MES',en:'Manufacturing Execution System',gen:'생산 현장을 관리하는 시스템.',tech:'작업 지시·실적·품질·추적성(로트)·설비 가동률(OEE). 계획(ERP)과 현장(PLC·SCADA)을 연결.',easy:'오늘 무엇을 몇 개 만들었고 불량은 몇 개인지 관리해요.'},
 opcua:{ko:'OPC UA',en:'OPC Unified Architecture',gen:'제조사가 달라도 데이터를 주고받는 표준.',tech:'플랫폼 독립 산업 통신 표준: 정보 모델·보안(암호화·인증)·클라이언트/서버, Pub/Sub. PLC → MES·클라우드 연결에 사용.',easy:'서로 다른 회사 기계들이 쓰는 "공용어"예요.'},
 mqtt:{ko:'MQTT',en:'MQTT',gen:'가벼운 IoT 메시지 전송 방식.',tech:'브로커를 통한 발행/구독(Publish/Subscribe). 적은 대역폭·불안정 네트워크에 적합, IIoT·클라우드 연계.',easy:'센서가 "온도 게시판"에 글을 올리면, 필요한 시스템이 구독해서 받아 봐요.'},
 oee:{ko:'설비종합효율',en:'OEE (Overall Equipment Effectiveness)',gen:'설비가 얼마나 제대로 일했나.',tech:'OEE = 가용성 × 성능 × 품질. 세계적 수준 약 85 %로 흔히 언급(추정).',easy:'멈추지 않았나 × 빨리 만들었나 × 불량 없었나를 곱한 점수예요.'},
 scan:{ko:'스캔 타임',en:'Scan time',gen:'PLC가 한 바퀴 도는 데 걸리는 시간.',tech:'입력 → 연산 → 출력 1주기. 스캔 타임보다 짧은 펄스는 놓칠 수 있음 → 고속 카운터·인터럽트 입력 사용.',easy:'PLC가 눈을 한 번 깜빡이는 시간. 그보다 짧게 지나간 신호는 못 볼 수 있어요.'},
 pdmT:{ko:'예지보전',en:'Predictive maintenance (PdM)',gen:'고장 나기 전에 징후를 보고 정비하는 것.',tech:'상태 데이터(진동·온도·전류·오일)를 추세 분석해 고장 시점을 예측, 필요한 때만 정비. 사후보전(BM)·예방보전(시간 기반 PM)·상태기반보전(CBM)과 비교.',easy:'병원 정기검진처럼, 아프기 전에 신호를 보고 미리 고쳐요.'},
 pfcurve:{ko:'P-F 곡선',en:'P-F curve',gen:'잠재 고장(P)부터 실제 고장(F)까지의 시간.',tech:'설비 상태가 나빠지기 시작해 감지 가능한 시점 P에서 기능 고장 F까지. 초음파 → 진동 → 오일 → 소음·열 순으로 늦게 감지(일반적 경향). P-F 간격 안에 정비해야 함.',easy:'고장 징후를 일찍 알아챌수록 고칠 시간이 길어져요.'},
 rms:{ko:'실효값 (RMS)',en:'RMS (Root Mean Square)',gen:'흔들림의 "평균적인 세기".',tech:'√(평균(x²)). 진동 에너지에 비례. 사인파면 RMS = peak/√2. 진동 심각도는 주로 속도 RMS(mm/s).',easy:'흔들림을 제곱해서 평균 내고 루트를 씌운, 전체적인 세기예요.'},
 crest:{ko:'크레스트 팩터',en:'Crest factor',gen:'최댓값이 평균 세기보다 얼마나 튀나.',tech:'CF = peak/RMS. 사인파 √2 ≈ 1.41. 베어링 초기 결함(충격성)에서 CF↑, 진행되면 RMS도↑ → CF 다시↓.',easy:'평소보다 "툭툭" 튀는 충격이 있으면 이 값이 커져요.'},
 bpfo:{ko:'베어링 결함 주파수',en:'Bearing fault frequencies (BPFO 등)',gen:'베어링 어느 부분이 상했는지 알려주는 주파수.',tech:'외륜 BPFO = (n/2)·f_r·(1 − (d/D)cosθ), 내륜 BPFI = (n/2)·f_r·(1 + (d/D)cosθ). n 볼 수, d 볼 지름, D 피치 지름, θ 접촉각.',easy:'공이 상처를 지날 때마다 "딱" 소리가 나요. 그 박자로 어디가 상했는지 알아요.'},
 rul:{ko:'잔여 수명',en:'RUL (Remaining Useful Life)',gen:'고장까지 남은 시간.',tech:'상태 지표 추세를 고장 임계값까지 외삽(선형·지수·ML 모델)해 추정. 불확실성 범위와 함께 제시.',easy:'지금 나빠지는 속도로 가면 며칠 뒤에 고장 기준에 닿는지 계산해요.'}
});
Object.assign(UNIT,{
 mmps:{s:'mm/s',r:'밀리미터 퍼 세컨드',mean:'진동 속도 (보통 RMS)'},
 GBday:{s:'GB/day',r:'기가바이트 퍼 데이',mean:'하루 데이터량'}
});
FORM.push(
 {eq:'PV = LRV + (I − 4)/16 × (URV − LRV)',read:'4~20 mA 환산',name:'4~20 mA 스케일링',page:'plant',sec:2,syms:[]},
 {eq:'OEE = 가용성 × 성능 × 품질',read:'설비종합효율',name:'OEE',page:'plant',sec:5,syms:[]},
 {eq:'RMS = peak/√2 (사인파),  CF = peak/RMS',read:'실효값·크레스트 팩터',name:'진동 지표',page:'pdm',sec:3,syms:[]},
 {eq:'v = a/(2πf)',read:'가속도 → 속도 (단일 주파수)',name:'진동 가속도·속도 변환',page:'pdm',sec:3,syms:[]},
 {eq:'BPFO = (n/2)·f_r·(1 − (d/D)cosθ)',read:'외륜 결함 주파수',name:'베어링 결함 주파수',page:'pdm',sec:4,syms:[]},
 {eq:'임계값 = 평균 + 3σ',read:'3시그마',name:'이상 판정 기준',page:'pdm',sec:5,syms:[]}
);

ANIM.pyramid=host=>{const LV=[['Level 4','ERP','경영·계획','일·월'],['Level 3','MES · Historian','생산 실행·이력','분·시간'],['Level 2','SCADA · HMI','감시·알람','초'],['Level 1','PLC · DCS','제어','ms'],['Level 0','센서 · 구동기','측정·동작','μs~ms']];
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 250" role="img" aria-label="ISA-95 자동화 피라미드"></svg><figcaption>센서 값(점)이 아래에서 위로 올라가며 점점 요약돼요. 아래는 빠르고 많고, 위는 느리고 넓어요. 오른쪽은 대표 시간 단위.</figcaption></figure>`;
  const svg=host.querySelector('svg');
  const L=loop(tp=>{let s='';LV.forEach((l,i)=>{const y=14+i*44,w=120+i*44,x=170-w/2;s+=`<rect x="${x}" y="${y}" width="${w}" height="38" rx="6" style="fill:${i===4?'var(--warn-soft)':'var(--surface2)'};stroke:var(--line)"/><text x="170" y="${y+16}" text-anchor="middle" class="b2">${l[1]}</text><text x="170" y="${y+31}" text-anchor="middle" class="small2">${l[2]}</text><text x="${x-4}" y="${y+24}" text-anchor="end" class="small2">${l[0].replace('Level ','L')}</text><text x="${x+w+4}" y="${y+24}" class="small2">${l[3]}</text>`});
   for(let k=0;k<6;k++){const ph=((tp*0.35+k/6)%1);const y=228-ph*214;const x=170+Math.sin(k*1.7)*(40-ph*30);s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(4-ph*2.2).toFixed(1)}" style="fill:var(--accent);opacity:${(1-ph*0.6).toFixed(2)}"/>`}
   svg.innerHTML=s});return L.stop};

ANIM.vtrend=host=>{let day=60;const base=1.2,sd=0.12;const data=Array.from({length:121},(_,d)=>{const deg=d<55?0:0.0009*(d-55)**2;return +(base+deg+Math.sin(d*1.3)*sd*0.9+Math.cos(d*2.9)*sd*0.5).toFixed(3)});const thr=+(base+3*sd).toFixed(2),alarm=4.5;
  host.innerHTML=`<figure class="figs"><svg viewBox="0 0 340 220" role="img" aria-label="진동 추세와 이상 탐지"></svg><div class="figctl"><label class="small">운전 일수 <input type="range" min="10" max="120" step="1" value="60" data-d style="width:170px"> <b data-dv>60일</b></label></div>
   <div class="tofcalc small" data-o></div><figcaption>평소 진동(기준선)의 평균 + 3σ를 넘으면 "이상 징후"(P), 정해 둔 위험 수준(예: 4.5 mm/s)에 닿기 전에 정비 계획을 세워요. [AI 보충: 가상 데이터]</figcaption></figure>`;
  const svg=host.querySelector('svg'),q=s=>host.querySelector(s);const X=d=>30+d*2.4,Y=v=>190-v/6*170;
  const draw=()=>{let p='';for(let d=0;d<=day;d++)p+=(d?'L':'M')+X(d).toFixed(1)+' '+Y(data[d]).toFixed(1);const first=data.findIndex((v,d)=>d>20&&v>thr);
   const k=day>=first&&first>0?(data[day]-data[Math.max(first,day-10)])/(day-Math.max(first,day-10)||1):0;const rul=k>0?(alarm-data[day])/k:null;
   svg.innerHTML=`<line x1="30" y1="190" x2="322" y2="190" style="stroke:var(--ink)"/><line x1="30" y1="20" x2="30" y2="190" style="stroke:var(--ink)"/>${[0,2,4,6].map(v=>`<text x="26" y="${Y(v)+4}" text-anchor="end" class="small2">${v}</text>`).join('')}${tx(34,16,'진동 속도 RMS (mm/s)','small2')}${tx(322,206,'운전 일수 →','small2','end')}
    <line x1="30" y1="${Y(thr)}" x2="322" y2="${Y(thr)}" style="stroke:var(--warn);stroke-dasharray:4 3"/>${tx(320,Y(thr)-4,'평균+3σ '+thr,'w small2','end')}<line x1="30" y1="${Y(alarm)}" x2="322" y2="${Y(alarm)}" style="stroke:var(--bad);stroke-dasharray:4 3"/>${tx(320,Y(alarm)-4,'위험 '+alarm,'b small2','end')}
    <path d="${p}" style="fill:none;stroke:var(--accent);stroke-width:2"/>${first>0&&day>=first?`<circle cx="${X(first)}" cy="${Y(data[first])}" r="5" style="fill:none;stroke:var(--warn);stroke-width:2"/>${tx(X(first),Y(data[first])+18,'P (징후)','w small2','middle')}`:''}`;
   q('[data-o]').innerHTML=day<first||first<0?`현재 ${data[day]} mm/s — 정상 범위`:`현재 ${data[day]} mm/s — <b>이상 징후</b> (${first}일째부터)${rul&&data[day]<alarm?` · 최근 추세로 위험 수준까지 약 <b>${rul.toFixed(0)}일</b> (선형 외삽)`:data[day]>=alarm?' · <b>위험 수준 도달 — 즉시 점검</b>':''}`;q('[data-dv]').textContent=day+'일'};
  q('[data-d]').oninput=e=>{day=+e.target.value;draw()};draw();return null};

Object.assign(FIG,{
 loop420(){return svgFig(340,170,`<rect x="20" y="40" width="80" height="60" rx="8" style="fill:var(--surface);stroke:var(--ink)"/>${tx(60,66,'트랜스미터','small2','middle')}${tx(60,82,'(센서)','small2','middle')}
   <rect x="240" y="40" width="80" height="60" rx="8" style="fill:var(--surface);stroke:var(--ink)"/>${tx(280,62,'PLC AI','small2','middle')}${tx(280,78,'250 Ω','small2','middle')}${tx(280,92,'→ 1~5 V','small2','middle')}
   <rect x="140" y="112" width="60" height="34" rx="6" style="fill:var(--warn-soft);stroke:var(--warn)"/>${tx(170,134,'24 V DC','small2','middle')}
   <path d="M100 56 H240 M100 84 H130 V129 H140 M200 129 H220 V84 H240" style="fill:none;stroke:var(--ink);stroke-width:1.8"/>${ar(150,56,200,56,'a',2)}${tx(170,48,'루프 전류 4~20 mA','a small2','middle')}
   ${tx(170,164,'0 % = 4 mA · 100 % = 20 mA · 0 mA = 단선','b2','middle')}`,'4~20 mA 2선식 루프','같은 전류가 루프 전체를 돌아서, 선이 길어도 값이 같아요. PLC는 250 Ω 저항에 걸린 1~5 V를 읽어요.')},
 pfFig(){let d='M30 40';for(let x=30;x<=310;x+=5){const t=(x-30)/280;d+=` L${x} ${(40+Math.pow(t,3)*130).toFixed(1)}`}const pt=(t,lb,c)=>{const x=30+t*280,y=40+Math.pow(t,3)*130;return `<circle cx="${x}" cy="${y}" r="5" style="fill:${c}"/><text x="${x+(t>0.8?-6:6)}" y="${y-8}" text-anchor="${t>0.8?'end':'start'}" class="small2">${lb}</text>`};
  return svgFig(340,200,`<line x1="30" y1="180" x2="320" y2="180" style="stroke:var(--ink)"/><line x1="30" y1="30" x2="30" y2="180" style="stroke:var(--ink)"/>${tx(34,24,'설비 상태 (좋음 ↑)','small2')}${tx(320,196,'시간 →','small2','end')}
   <path d="${d}" style="fill:none;stroke:var(--accent);stroke-width:2.4"/>${pt(0.25,'P: 잠재 고장 시작','var(--warn)')}${pt(0.45,'초음파·AE','var(--unit)')}${pt(0.6,'진동','var(--unit)')}${pt(0.72,'오일 분석','var(--unit)')}${pt(0.84,'소음·열','var(--unit)')}${pt(0.98,'F: 기능 고장','var(--bad)')}`,'P-F 곡선','일찍 감지하는 기술일수록 정비할 시간(P-F 간격)이 길어요. 감지 순서는 일반적 경향이에요 [AI 보충].')},
 fftFault(){const X=f=>30+f*24,b=(f,h,lb,c)=>`<rect x="${X(f)-5}" y="${170-h}" width="10" height="${h}" style="fill:${c}"/><text x="${X(f)}" y="${164-h}" text-anchor="middle" class="small2">${lb}</text>`;
  return svgFig(340,200,`<line x1="30" y1="170" x2="322" y2="170" style="stroke:var(--ink)"/>${[1,2,3,4,5,6,7,8,9,10,11].map(i=>`<text x="${X(i)}" y="186" text-anchor="middle" class="small2">${i}×</text>`).join('')}
   ${b(1,90,'불균형','var(--accent)')}${b(2,60,'정렬불량','var(--warn)')}${b(3,24,'','var(--warn)')}${b(4.6,40,'BPFO','var(--bad)')}${b(9.2,22,'2×BPFO','var(--bad)')}${tx(322,198,'회전 주파수의 배수 →','small2','end')}`,'FFT로 원인 찾기 (예시)','1× 큼 → 불균형, 2× 큼 → 정렬불량(축 어긋남), 회전수의 정수배가 아닌 피크(BPFO 등) → 베어링 결함. 기어는 이 수 × 회전 주파수(GMF). [AI 보충: 일반 진단 규칙]')}
});

Object.assign(GEN,{
 maPV(base){const lo=base?0:pick([0,-50,0,0]),hi=base?10:pick([10,200,100,16]);const unit=base?'bar':pick(['bar','°C','m³/h','kPa']);const I=base?12:pick([4,6.4,8,12,15.2,20]);const back=!base&&Math.random()<.4;const PV=lo+(I-4)/16*(hi-lo);
  return {kind:base?'기본':'유사',title:back?'물리량 → 전류':'4~20 mA → 물리량',fig:FIG.loop420(),q:back?`범위 ${lo}~${hi} ${unit} 트랜스미터가 ${fx(PV,4)} ${unit}를 측정 중이다. 루프 전류는?`:`범위 ${lo}~${hi} ${unit}로 설정된 트랜스미터의 전류가 ${I} mA이다. 측정값은?`,first:['4 mA = 0 %, 20 mA = 100 %','폭은 16 mA'],
   steps:back?[{h:'%',b:`<div class="ln">(${fx(PV,4)} − ${lo}) ÷ (${hi} − ${lo}) = ${fx((PV-lo)/(hi-lo)*100,4)} %</div>`},{h:'전류',b:`<div class="ln">4 + 16 × ${fx((PV-lo)/(hi-lo),4)} = ${fx(I,4)} mA</div>`}]:[{h:'% 구하기',b:`<div class="ln">(${I} − 4) ÷ 16 = ${fx((I-4)/16,4)} → ${fx((I-4)/16*100,4)} %</div><div class="rd">4를 먼저 빼는 게 핵심 (살아 있는 0)</div>`},{h:'물리량',b:`<div class="ln">${lo} + ${fx((I-4)/16,4)} × (${hi} − ${lo}) = ${fx(PV,4)} ${unit}</div>`}],
   ans:back?`${fx(I,4)} mA`:`${fx(PV,4)} ${unit}`,ansRead:back?`${fxR(I,4)} 밀리암페어`:`${fxR(PV,4)}`,calc:calcBlock([[back?['4','+','1','6','×','(',...nk(+PV.toFixed(4)),'−',...nk(lo),')','÷','(',...nk(hi),'−',...nk(lo),')','=']:[...nk(lo),'+','(',...ks(I),'−','4',')','÷','1','6','×','(',...nk(hi),'−',...nk(lo),')','='],casioDec(back?I:PV)]],[]),
   easy:'4~20 mA는 16칸짜리 자예요. 4를 빼고 16으로 나누면 몇 %인지 나와요.'}},
 maFault(){const I=pick([0,2.5,3.5,3.8,4,12,20,20.5,21.5,23]);const v=I<3.6?'고장 (단선·센서 이상) — 3.6 mA 이하':I>21?'고장 (단락·센서 이상) — 21 mA 이상':I<4?'범위 아래 포화 (측정값 0 % 미만)':I>20?'범위 위 포화 (100 % 초과)':'정상 범위';
  return {kind:'응용',title:'전류 값으로 고장 판단',q:`4~20 mA 루프 전류가 ${I} mA로 읽힌다. 상태는?`,first:['NAMUR NE43: < 3.6 mA, > 21 mA = 고장','3.8~20.5 mA = 측정 범위(포화 포함)'],
   steps:[{h:'구간 판정',b:`<div class="ln">${I} mA → ${v}</div><div class="rd">0 mA면 단선 · 4 mA "살아 있는 0" 덕분에 0 %와 단선을 구분</div>`}],ans:v,ansRead:v,calc:'<p class="small muted">계산 없이 구간만 판정해요.</p>',easy:'정상 신호는 4~20 사이. 0이면 선이 끊긴 거예요.'}},
 adcCnt(base){const bits=base?12:pick([12,14,16]),cnt=base?2048:pick([500,1000,2048,3000]);const full=2**bits-1;const c=Math.min(cnt*(2**(bits-12)),full);const I=4+16*c/full;
  return {kind:base?'기본':'응용',title:'ADC 값 → 전류',q:`${bits}비트 AI 카드(0~${full}가 4~20 mA)에 ${c}가 읽혔다. 전류와 % 값은?`,first:['% = 카운트 ÷ 최대 카운트','I = 4 + 16 × %'],
   steps:[{h:'%',b:`<div class="ln">${c} ÷ ${full} = ${fx(c/full*100,4)} %</div>`},{h:'전류',b:`<div class="ln">4 + 16 × ${fx(c/full,4)} = ${fx(I,4)} mA</div><div class="rd">카드마다 최대 카운트 정의가 다름 → 매뉴얼 확인 [AI 보충]</div>`}],
   ans:`${fx(I,4)} mA (${fx(c/full*100,4)} %)`,ansRead:`${fxR(I,4)} 밀리암페어`,calc:calcBlock([[['4','+','1','6','×',...ks(c),'÷',...ks(full),'='],casioDec(I)]],[]),easy:'ADC 숫자를 최대값으로 나누면 몇 %인지 나와요.'}},
 dataVol(base){const N=base?500:pick([200,500,2000,10000]),hz=base?1:pick([0.1,1,10]),B=base?16:pick([8,16,32]);const day=N*hz*B*86400;
  return {kind:base?'기본':'응용',title:'하루 데이터량',q:`센서 태그 ${N}개를 ${hz} Hz로 저장한다. 한 샘플(시간+값+품질)이 ${B} 바이트면 하루 데이터량은?`,first:['태그 × 초당 샘플 × 바이트 × 86 400초'],
   steps:[{h:'초당',b:`<div class="ln">${N} × ${hz} × ${B} = ${fx(N*hz*B,6)} B/s</div>`},{h:'하루',b:`<div class="ln">× 86 400 = ${sciT(sci(day,4))} B ≈ ${fx(day/1e9,4)} GB/day</div><div class="rd">1 GB = 10⁹ B (십진) · 히스토리안은 데드밴드 압축으로 줄임</div>`}],
   ans:`약 ${fx(day/1e9,4)} GB/day`,ansRead:`${fxR(day/1e9,4)} 기가바이트`,calc:calcBlock([[[...ks(N),'×',...ks(hz),'×',...ks(B),'×','8','6','4','0','0','÷',...K(1,9),'='],casioDec(day/1e9)]],[]),easy:'하루는 86 400초. 작은 데이터도 곱하면 금방 커져요.'}},
 oeeG(base){const A=base?90:pick([80,85,90,95]),P=base?95:pick([85,90,95]),Q=base?98:pick([95,98,99.5]);const o=A*P*Q/1e4;
  return {kind:base?'기본':'유사',title:'OEE 계산',q:`가용성 ${A} %, 성능 ${P} %, 품질 ${Q} %일 때 OEE는?`,first:['OEE = A × P × Q (소수로 곱하기)'],
   steps:[{h:'곱하기',b:`<div class="ln">${A/100} × ${P/100} × ${Q/100} = ${fx(o/100,4)} → ${fx(o,4)} %</div><div class="rd">셋 다 90 %대여도 곱하면 확 낮아짐</div>`}],ans:`${fx(o,4)} %`,ansRead:`${fxR(o,4)} 퍼센트`,calc:calcBlock([[[...ks(A/100),'×',...ks(P/100),'×',...ks(Q/100),'='],casioDec(o/100)]],[]),easy:'세 점수를 곱해요. 하나만 낮아도 전체가 떨어져요.'}},
 scanMiss(){const scan=pick([5,10,20,50]),pw=pick([2,8,15,30,100]);const ok=pw>scan;
  return {kind:'응용',title:'스캔 타임과 짧은 펄스',q:`PLC 스캔 타임이 ${scan} ms이다. 폭 ${pw} ms짜리 센서 펄스를 일반 입력으로 항상 잡을 수 있나?`,first:['펄스 폭 > 스캔 타임(+입력 필터)이어야 안전'],
   steps:[{h:'비교',b:`<div class="ln">${pw} ms ${ok?'>':'≤'} ${scan} ms → ${ok?'대체로 가능 (입력 필터 지연도 확인)':'놓칠 수 있음 → 고속 카운터·인터럽트 입력'}</div>`}],ans:ok?'대체로 가능':'놓칠 수 있음',ansRead:ok?'가능':'불가',calc:'<p class="small muted">비교만 하면 돼요.</p>',easy:'PLC가 눈 깜빡이는 시간보다 짧게 지나가면 못 봐요.'}},
 vibRms(base){const pk=base?10:pick([2,5,10,14.1]);const sig=base?'sin':pick(['sin','imp']);const rms=sig==='sin'?pk/Math.SQRT2:pk/4;const cf=pk/rms;
  return {kind:base?'기본':'유사',title:'RMS와 크레스트 팩터',q:sig==='sin'?`진동 속도가 최댓값 ${pk} {{mmps}}인 사인파다. RMS와 크레스트 팩터는?`:`충격성 진동의 peak가 ${pk} mm/s, RMS가 ${fx(rms,4)} mm/s다. 크레스트 팩터는? 무엇을 의심하나?`,first:['사인파 RMS = peak/√2','CF = peak/RMS'],
   steps:[{h:'RMS',b:`<div class="ln">${sig==='sin'?`${pk} ÷ √2 = ${fx(rms,4)} mm/s`:`RMS = ${fx(rms,4)} mm/s (주어짐)`}</div>`},{h:'CF',b:`<div class="ln">${pk} ÷ ${fx(rms,4)} = ${fx(cf,4)}</div><div class="rd">${cf>3?'CF 큼(충격성) → 베어링 초기 결함·간극 의심':'사인파 ≈ 1.41 (정상적인 매끈한 진동)'}</div>`}],
   ans:`RMS ${fx(rms,4)} mm/s · CF ${fx(cf,4)}`,ansRead:`크레스트 팩터 ${fxR(cf,4)}`,calc:calcBlock([[[...ks(pk),'÷','√■','2','='],'√ 꼴 → S⇔D'],[['S⇔D'],casioDec(pk/Math.SQRT2)]],[W_SD]),easy:'평소 세기(RMS)에 비해 순간 최대값이 너무 크면 "툭툭 치는" 고장 신호예요.'}},
 accVel(base){const g=base?1:pick([0.2,0.5,1,2]),f=base?100:pick([25,50,100,200,1000]);const a=g*9.81,v=a/(2*Math.PI*f)*1000;
  return {kind:base?'기본':'응용',title:'가속도 → 진동 속도',q:`${f} Hz 단일 진동의 가속도 진폭이 ${g} g이다. 속도 진폭은 몇 {{mmps}}인가?`,first:['g → m/s²: × 9.81','v = a/(2πf)','m/s → mm/s: × 1000'],
   steps:[{h:'SI',b:`<div class="ln">a = ${g} × 9.81 = ${fx(a,4)} m/s²</div>`},{h:'적분 (÷ ω)',b:`<div class="ln">v = ${fx(a,4)} ÷ (2π × ${f}) = ${fx(v/1000,4)} m/s = ${fx(v,4)} mm/s</div><div class="rd">같은 가속도라도 고주파일수록 속도는 작음 → 저·중주파 결함은 속도, 고주파(베어링)는 가속도로 봄</div>`}],
   ans:`${fx(v,4)} mm/s`,ansRead:`${fxR(v,4)} 밀리미터 퍼 세컨드`,calc:calcBlock([[[...ks(g),'×','9','.','8','1','÷','(','2','SHIFT','×10ˣ','×',...ks(f),')','×','1','0','0','0','='],'π 꼴 → S⇔D'],[['S⇔D'],casioDec(v)]],[W_PI,W_SD]),easy:'가속도를 2πf로 나누면 속도. 빠르게 떨수록 같은 가속도에서 속도는 작아요.'}},
 faultF(base){const rpm=base?1800:pick([900,1200,1500,1800,3600]);const z=base?20:pick([17,23,31]);const fr=rpm/60;
  return {kind:base?'기본':'유사',title:'회전 주파수와 기어 맞물림',fig:FIG.fftFault(),q:`${rpm} rpm 축(이 수 ${z}개 기어)의 1×, 2× 주파수와 기어 맞물림 주파수(GMF)는?`,first:['1× = rpm/60','GMF = 이 수 × 1×'],
   steps:[{h:'1×',b:`<div class="ln">${rpm} ÷ 60 = ${fx(fr,4)} Hz (불균형)</div>`},{h:'2×',b:`<div class="ln">${fx(2*fr,4)} Hz (정렬불량)</div>`},{h:'GMF',b:`<div class="ln">${z} × ${fx(fr,4)} = ${fx(z*fr,4)} Hz</div>`}],
   ans:`1× ${fx(fr,4)} Hz · 2× ${fx(2*fr,4)} Hz · GMF ${fx(z*fr,4)} Hz`,ansRead:`${fxR(fr,4)} 헤르츠`,calc:calcBlock([[[...ks(rpm),'÷','6','0','×',...ks(z),'='],casioDec(z*fr)]],[]),easy:'1분에 몇 바퀴를 1초로 바꾸면 기본 박자(1×)예요. 기어는 이빨 수만큼 더 자주 부딪혀요.'}},
 bpfoG(base){const n=base?9:pick([8,9,12]),d=base?8:pick([7.9,8,10]),D=base?40:pick([38.5,40,52]),rpm=base?1800:pick([1200,1800,3000]);const th=0;const fr=rpm/60;const o=n/2*fr*(1-d/D*Math.cos(th)),i=n/2*fr*(1+d/D*Math.cos(th));
  return {kind:base?'기본':'응용',title:'베어링 결함 주파수',q:`볼 ${n}개, 볼 지름 ${d} mm, 피치 지름 ${D} mm, 접촉각 0°인 베어링이 ${rpm} rpm으로 돈다. BPFO와 BPFI는?`,first:['f_r = rpm/60','BPFO = (n/2)f_r(1 − d/D)','BPFI = (n/2)f_r(1 + d/D)'],
   steps:[{h:'회전 주파수',b:`<div class="ln">${rpm}/60 = ${fx(fr,4)} Hz · d/D = ${fx(d/D,4)}</div>`},{h:'외륜',b:`<div class="ln">${n}/2 × ${fx(fr,4)} × (1 − ${fx(d/D,4)}) = ${fx(o,4)} Hz</div>`},{h:'내륜',b:`<div class="ln">${n}/2 × ${fx(fr,4)} × (1 + ${fx(d/D,4)}) = ${fx(i,4)} Hz</div><div class="rd">회전수의 정수배가 아님 → FFT에서 구분 · 검산 BPFO + BPFI = n·f_r = ${fx(n*fr,4)}</div>`}],
   ans:`BPFO ${fx(o,4)} Hz · BPFI ${fx(i,4)} Hz`,ansRead:`${fxR(o,4)} 헤르츠`,calc:calcBlock([[[...ks(n),'÷','2','×',...ks(rpm),'÷','6','0','×','(','1','−',...ks(d),'÷',...ks(D),')','='],casioDec(o)]],[]),easy:'공이 외륜의 상처를 1초에 몇 번 밟는지 계산해요.'}},
 sigma3(base){const xs=base?[2.0,2.2,1.9,2.1,2.3,1.8,2.0,2.1]:Array.from({length:8},()=>+(pick([1.5,2,3])+Math.random()*0.5-0.25).toFixed(2));const m=xs.reduce((a,b)=>a+b,0)/xs.length;const s=Math.sqrt(xs.reduce((a,b)=>a+(b-m)**2,0)/(xs.length-1));const th=m+3*s;const now=+(th+pick([-0.5,0.3,0.8])*s*2).toFixed(2);
  return {kind:base?'기본':'응용',title:'3σ 이상 판정',q:`정상 운전 때 진동 RMS(mm/s): ${xs.join(', ')}. 평균 + 3σ 임계값은? 오늘 ${now} mm/s는 이상인가?`,first:['평균 → 표준편차(σ, n−1)','임계 = 평균 + 3σ'],
   steps:[{h:'평균',b:`<div class="ln">합 ${fx(xs.reduce((a,b)=>a+b,0),5)} ÷ ${xs.length} = ${fx(m,4)}</div>`},{h:'표준편차',b:`<div class="ln">σ = ${fx(s,4)} (표본, n−1)</div>`},{h:'임계값',b:`<div class="ln">${fx(m,4)} + 3 × ${fx(s,4)} = ${fx(th,4)} mm/s</div>`},{h:'판정',b:`<div class="ln">${now} ${now>th?'>':'≤'} ${fx(th,4)} → ${now>th?'이상 징후':'정상'}</div><div class="rd">정규분포면 정상 데이터가 3σ를 넘을 확률 약 0.13 %</div>`}],
   ans:`임계 ${fx(th,4)} · ${now>th?'이상':'정상'}`,ansRead:`${fxR(th,4)}`,calc:calcBlock([[['MODE','3','1'],'STAT 1-VAR'],[[...xs.slice(0,2).flatMap(x=>[...ks(x),'=']),'…'],'x 열에 차례로 입력'],[['AC','SHIFT','1','4','2'],`x̄ = ${fx(m,6)}`],[['AC','SHIFT','1','4','4'],`sx = ${fx(s,6)}`]],['메뉴 번호는 기종에 따라 다를 수 있음 (Var 메뉴의 x̄, sx)']),
   easy:'평소 흔들림의 평균에 "흔들림 폭(σ)"의 3배를 더한 선을 넘으면 이상하다고 봐요.'}},
 rulLin(base){const d1=base?30:pick([20,30,40]),v1=base?2.0:pick([1.8,2.0,2.4]),d2=d1+(base?20:pick([10,20,30])),v2=+(v1+(base?0.8:pick([0.4,0.8,1.2]))).toFixed(1),lim=4.5;const k=(v2-v1)/(d2-d1);const rul=(lim-v2)/k;
  return {kind:base?'기본':'응용',title:'선형 외삽으로 잔여 수명',q:`진동이 ${d1}일째 ${v1} mm/s, ${d2}일째 ${v2} mm/s였다. 이 추세면 위험 수준 ${lim} mm/s까지 며칠 남았나?`,first:['기울기 = Δ값 ÷ Δ일','남은 일 = (한계 − 현재) ÷ 기울기'],
   steps:[{h:'기울기',b:`<div class="ln">(${v2} − ${v1}) ÷ (${d2} − ${d1}) = ${fx(k,4)} mm/s/일</div>`},{h:'RUL',b:`<div class="ln">(${lim} − ${v2}) ÷ ${fx(k,4)} = ${fx(rul,4)}일</div><div class="rd">실제 열화는 대개 가속(지수형) → 선형은 낙관적 추정 · 범위로 보고 [AI 보충]</div>`}],
   ans:`약 ${fx(rul,3)}일`,ansRead:`${fxR(rul,3)}일`,calc:calcBlock([[['(',...ks(lim),'−',...ks(v2),')','÷','(','(',...ks(v2),'−',...ks(v1),')','÷','(',...ks(d2),'−',...ks(d1),')',')','='],casioDec(rul)]],[]),easy:'지금까지 나빠진 속도로 계속 가면 언제 한계선에 닿는지 계산해요.'}},
 nyqFs(base){const fmax=base?1000:pick([500,1000,5000,10000]),N=base?2048:pick([1024,2048,4096]);const fs=2.56*fmax,df=fs/N;
  return {kind:base?'기본':'유사',title:'샘플링 주파수와 FFT 분해능',q:`최대 ${fmax} Hz까지 보고 싶다. 실무 기준 샘플링 주파수와, ${N}점 FFT의 주파수 분해능은?`,first:['나이퀴스트: f_s > 2f_max (실무 2.56배)','Δf = f_s/N'],
   steps:[{h:'f_s',b:`<div class="ln">2.56 × ${fmax} = ${fx(fs,5)} Hz</div><div class="rd">이론 최소 2배 · 안티앨리어싱 필터 여유로 2.56배</div>`},{h:'Δf',b:`<div class="ln">${fx(fs,5)} ÷ ${N} = ${fx(df,4)} Hz</div><div class="rd">측정 시간 = N/f_s = ${fx(N/fs,4)} s · 분해능을 높이려면 더 오래 측정</div>`}],
   ans:`f_s ${fx(fs,5)} Hz · Δf ${fx(df,4)} Hz`,ansRead:`${fxR(df,4)} 헤르츠`,calc:calcBlock([[['2','.','5','6','×',...ks(fmax),'÷',...ks(N),'='],casioDec(df)]],[]),easy:'보고 싶은 가장 빠른 떨림보다 2배 넘게 자주 찍어야 해요. 오래 찍을수록 주파수를 더 촘촘히 구분해요.'}}
});
PSET.plant=[['maPV',true],['maPV'],['maPV'],['maFault'],['adcCnt',true],['dataVol',true],['dataVol'],['oeeG',true],['scanMiss']];
PSET.pdm=[['vibRms',true],['vibRms'],['accVel',true],['accVel'],['faultF',true],['bpfoG',true],['bpfoG'],['sigma3',true],['rulLin',true],['rulLin'],['nyqFs',true]];
TOPICS.plant={name:'공장 데이터',g:['maPV','maFault','adcCnt','dataVol','oeeG','scanMiss']};TOPICS.pdm={name:'예지보전',g:['vibRms','accVel','faultF','bpfoG','sigma3','rulLin','nyqFs']};
['maPV','dataVol','oeeG','vibRms','accVel','faultF','nyqFs'].forEach(g=>BASICG.add(g));

PAGES.plant={title:'공장 데이터 흐름 — PLC·SCADA·MES',part:'제4편 1장',secs:[
 {k:'큰 그림',h:'센서에서 경영까지',b:`<p class="small muted">[AI 보충] 강의 밖 현업 연결 장.</p><div data-anim="pyramid"></div><p>[[isa95|ISA-95 계층]]: 센서 하나의 값이 제어 → 감시 → 이력 → 생산관리 → 경영으로 올라가요.</p>`,
  easy:'센서는 공장의 눈·귀, PLC는 반사신경, SCADA는 관제실, MES는 공장장, ERP는 본사예요.'},
 {k:'신호 종류',h:'센서 → 제어기 신호',b:`<div class="tblwrap fit"><table><tr><th>신호</th><th>쓰임</th><th>특징</th></tr><tr><td>디지털 24 V</td><td class="small">근접·리밋 스위치</td><td class="small">ON/OFF</td></tr><tr><td>[[ma420|4~20 mA]]</td><td class="small">압력·온도·유량 트랜스미터</td><td class="small">잡음·거리 강함, 단선 감지</td></tr><tr><td>0~10 V</td><td class="small">짧은 거리 아날로그</td><td class="small">전압 강하·잡음 약함</td></tr><tr><td>[[hart|HART]]·[[iolink|IO-Link]]</td><td class="small">진단·설정</td><td class="small">디지털 정보 추가</td></tr><tr><td>필드버스·이더넷</td><td class="small">PROFINET 등</td><td class="small">다수 기기·고속</td></tr></table></div>`,
  easy:'켜짐/꺼짐은 디지털로, 연속 값은 4~20 mA로, 자세한 정보는 디지털 통신으로 보내요.'},
 {k:'4~20 mA',h:'4~20 mA 읽기',b:`${FIG.loop420()}<div class="eqn">PV = LRV + (I − 4)/16 × (URV − LRV)<small>LRV 범위 하한 · URV 상한 · 12 mA = 50 %</small></div>
   <ul class="clean"><li>&lt; 3.6 mA, &gt; 21 mA = 고장 신호 (NAMUR NE43)</li><li>센서 → 트랜스미터(신호 변환·증폭) → 4~20 mA → PLC AI 카드(ADC)</li></ul><button class="ghost" data-goto="signal">↗ 센서 신호 흐름 (제1편 1장)</button>`,
  easy:'4를 빼고 16으로 나누면 몇 %인지 나와요.'},
 {k:'PLC·DCS',h:'제어 — PLC와 DCS',b:`<div class="flow"><div>입력 읽기 (센서)</div><div>프로그램 실행 (래더·PID)</div><div>출력 쓰기 (모터·밸브)</div><div>반복 = [[scan|스캔]] 수 ms</div></div>
   <div class="f4"><div><div class="h">[[plc|PLC]]</div>이산 제어 · 조립·포장·이송</div><div><div class="h">[[dcs|DCS]]</div>연속 공정 · 화학·발전 · 수천 개 PID 루프</div></div>`,
  easy:'PLC는 "센서가 켜지면 모터 멈춰" 같은 규칙을 아주 빠르게 반복해요.'},
 {k:'SCADA·이력',h:'감시와 기록',b:`<ul class="clean"><li>[[scada|SCADA·HMI]]: 공정 화면·알람·원격 조작</li><li>[[historian|히스토리안]]: 모든 태그의 시계열 저장 (데드밴드 압축) → 추세·보고·AI 학습</li><li>알람 관리: 너무 많은 알람은 놓침의 원인 → 우선순위·억제</li></ul>`,
  easy:'관제실 화면에서 보고, 일기장(히스토리안)에 모두 적어 둬요.'},
 {k:'MES·통신',h:'MES와 통신 표준',b:`<div class="f4"><div><div class="h">[[mes|MES]]</div>작업 지시·실적·품질·로트 추적·[[oee|OEE]]</div><div><div class="h">ERP</div>주문·자재·원가·계획</div></div>
   <div class="rel mono">OEE = 가용성 × 성능 × 품질</div><div class="f4"><div><div class="h">Modbus</div>단순·오래된 표준 (RTU/TCP)</div><div><div class="h">[[opcua|OPC UA]]</div>벤더 중립·보안·정보 모델</div><div><div class="h">[[mqtt|MQTT]]</div>IoT 발행/구독·클라우드</div></div>`,
  easy:'기계마다 말이 달라서, OPC UA 같은 공용어로 데이터를 위로 올려요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>L0 센서 → L1 PLC·DCS → L2 SCADA → L3 MES·Historian → L4 ERP</li><li>4~20 mA: PV = LRV + (I−4)/16 × 범위 · 4 mA 살아 있는 0 · &lt;3.6/&gt;21 고장</li><li>OEE = A × P × Q · OPC UA 공용어 · MQTT 발행/구독</li></ol>
   <details class="qa"><summary>0~20 mA 대신 4~20 mA를 쓰는 이유는?</summary><div>0 %(4 mA)와 단선(0 mA)을 구분할 수 있고, 4 mA로 2선식 트랜스미터에 전원도 공급 가능.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};

PAGES.pdm={title:'예지보전',part:'제4편 2장',secs:[
 {k:'보전 전략',h:'보전 전략 4가지',b:`<p class="small muted">[AI 보충] 강의 밖 현업 연결 장 — 가속도·진동센서 장과 이어져요.</p>
   <div class="tblwrap fit"><table><tr><th>전략</th><th>언제 고치나</th><th>장단점</th></tr><tr><td>사후 (BM)</td><td class="small">고장 난 뒤</td><td class="small">간단 / 돌발 정지</td></tr><tr><td>예방 (PM)</td><td class="small">정해진 주기마다</td><td class="small">계획적 / 멀쩡한 부품도 교체</td></tr><tr><td>상태기반 (CBM)</td><td class="small">상태가 기준을 넘으면</td><td class="small">필요할 때만</td></tr><tr><td>[[pdmT|예지 (PdM)]]</td><td class="small">고장 시점을 예측해 미리</td><td class="small">최적 / 데이터·분석 필요</td></tr></table></div>`,
  easy:'아프고 나서 병원(사후), 정기검진(예방), 증상 보고 치료(상태기반), 검사 수치로 미리 예측(예지).'},
 {k:'P-F 곡선',h:'P-F 곡선 — 일찍 알아챌수록 유리',b:`${FIG.pfFig()}<p>[[pfcurve|P-F 간격]] 안에 감지·계획·정비를 끝내야 해요. 측정 주기는 P-F 간격보다 충분히 짧게(흔히 절반 이하로 언급, 추정).</p>`,
  easy:'고장 징후를 일찍 보면 고칠 시간이 넉넉해요.'},
 {k:'무엇을 재나',h:'상태 감시 센서',b:`<div class="f4"><div><div class="h">진동</div>가속도계 · 회전기계의 기본 · 불균형·정렬·베어링·기어</div><div><div class="h">온도</div>RTD·IR 카메라 · 베어링 과열·전기 접속부</div><div><div class="h">전류 (MCSA)</div>모터 전류 스펙트럼 · 회전자·부하 이상</div><div><div class="h">초음파·AE</div>윤활 부족·누설 · 가장 이른 징후</div><div><div class="h">오일</div>입자·수분·점도 · 마모 진행</div></div>
   <button class="ghost" data-goto="accel" data-i="8">↗ 진동센서·FFT</button>`,
  easy:'흔들림, 열, 전기, 소리, 기름 — 기계의 건강 신호를 여러 감각으로 봐요.'},
 {k:'진동 지표',h:'진동을 숫자로 — RMS·피크·CF',b:`<div class="rel mono">RMS = peak/√2 (사인파) · CF = peak/RMS · v = a/(2πf)</div>
   <ul class="clean"><li>[[rms|RMS]]: 전체 에너지 → 심각도 판정 (속도 mm/s RMS)</li><li>[[crest|크레스트 팩터]]: 충격성 → 베어링 초기 결함</li><li>ISO 10816/20816 계열: 기계 종류별 속도 RMS 등급 (예: 2.8 · 4.5 · 7.1 mm/s 같은 경계, 기계 등급마다 다름 — 추정)</li><li>저·중주파(불균형·정렬)는 속도, 고주파(베어링·기어)는 가속도로</li></ul>`,
  easy:'흔들림 전체 세기(RMS)와 순간 튀는 정도(CF)를 같이 봐요.'},
 {k:'원인 찾기',h:'FFT로 원인 찾기',b:`${FIG.fftFault()}<div class="rel mono">1× = rpm/60 · GMF = 이 수 × 1× · BPFO = (n/2)f_r(1 − (d/D)cosθ)</div><p>[[bpfo|베어링 결함 주파수]]는 회전수의 정수배가 아니라 구분돼요.</p>`,
  easy:'떨림을 박자별로 나누면, 어느 박자가 커졌는지로 고장 부위를 짐작해요.'},
 {k:'판단',h:'데이터 → 판단 — 기준선·임계·RUL',b:`<div data-anim="vtrend"></div>
   <div class="flow"><div>수집 (f_s ≥ 2.56 f_max)</div><div>특징 추출 (RMS·CF·대역 에너지)</div><div>기준선 · 평균 + 3σ</div><div>추세 → [[rul|RUL]]</div><div>작업 지시 (CMMS)</div></div>
   <p class="small">AI 이상탐지: 정상 데이터만으로 학습해 "평소와 다름"을 찾는 방식이 많이 쓰여요(라벨된 고장 데이터가 적기 때문, 추정).</p>`,
  easy:'평소 모습을 먼저 배워 두고, 거기서 벗어나면 경고해요.'},
 {k:'문제',h:'',b:'__PROBS__'},
 {k:'외울 것',h:'이것만은 외우기',b:`<ol class="clean"><li>BM → PM → CBM → PdM · P-F 간격 안에 정비</li><li>RMS = peak/√2 · CF = peak/RMS · v = a/(2πf)</li><li>1× 불균형 · 2× 정렬불량 · BPFO 베어링 · 평균 + 3σ · f_s = 2.56 f_max</li></ol>
   <details class="qa"><summary>크레스트 팩터가 올랐다가 다시 내려가는 이유는?</summary><div>초기 결함은 충격성이라 peak만 올라 CF↑, 손상이 퍼지면 RMS도 커져 CF가 다시↓. 그래서 RMS·CF를 함께 봄.</div></details>
   <button class="primary" data-goto="cards">카드로 외우기</button>`}
]};
CARDS.push(
 {id:'s1',tag:'현업',f:'ISA-95 계층 0~4',a:'센서 → PLC·DCS → SCADA → MES·Historian → ERP',r:'',e:''},
 {id:'s2',tag:'현업',f:'4~20 mA 환산식',a:'PV = LRV + (I − 4)/16 × (URV − LRV)',r:'12 mA = 50 %',e:''},
 {id:'s3',tag:'현업',f:'4 mA를 0으로 쓰는 이유',a:'단선(0 mA)과 0 % 구분 + 루프 전원',r:'<3.6, >21 mA 고장',e:''},
 {id:'s4',tag:'현업',f:'OEE 식',a:'가용성 × 성능 × 품질',r:'',e:''},
 {id:'s5',tag:'현업',f:'OPC UA와 MQTT',a:'OPC UA 벤더 중립 산업 표준 · MQTT 경량 발행/구독',r:'',e:''},
 {id:'s6',tag:'예지보전',f:'보전 전략 4단계',a:'사후 BM · 예방 PM · 상태기반 CBM · 예지 PdM',r:'',e:''},
 {id:'s7',tag:'예지보전',f:'크레스트 팩터',a:'peak/RMS · 사인파 1.41 · 충격성 결함에서↑',r:'',e:''},
 {id:'s8',tag:'예지보전',f:'1×, 2× 진동이 크면',a:'1× 불균형 · 2× 정렬불량',r:'',e:''},
 {id:'s9',tag:'예지보전',f:'실무 샘플링 주파수와 FFT 분해능',a:'f_s = 2.56 f_max · Δf = f_s/N',r:'',e:''},
 {id:'s10',tag:'예지보전',f:'이상 판정 3σ',a:'평균 + 3σ 초과 → 이상 징후',r:'정상이 넘을 확률 약 0.13 %',e:''}
);
