/* ═════════ 부록 F 기초 커리큘럼 + 장마다 「이 장에 필요한 기초」 ═════════ */
const CURR=(()=>{
 const U={
  M1:['단위·접두어·지수','unitbasic',0],M2:['로그·dB','numsense',4],M3:['삼각함수·사인파','elec',5],M4:['복소수·페이저','elec',6],M5:['미분·적분 감각','sigbase',0],M6:['평균·표준편차','calib',1],
  A1:['전압·전류·저항·전력','elec',2],A2:['KVL·KCL·전압 분배','kirch',0],A3:['휘트스톤 브리지','circuit',2],A4:['C·L·RC 시정수','kirch',2],A5:['임피던스·LC 공진','elec',6],A6:['op-amp 증폭기','circuit',3],A7:['필터','circuit',4],A8:['매칭·부하','circuit',5],A9:['발진기·믹서','saw',7],
  B1:['전기장·정전용량','cap',0],B2:['자기장·자성체','mag',1],B3:['로렌츠 힘','hall',0],B4:['패러데이·와전류·표피','induct',0],B5:['파동','ultra',1],B6:['빛·광자','optic',0],
  C1:['밴드갭·캐리어','semi',0],C2:['도핑·n형·p형','semi',1],C3:['PN·다이오드','semi',2],C4:['트랜지스터 스위치','semi',3],C5:['압전·분극','piezo',0],C6:['열·재료 물성','temp',1],
  D1:['센서 특성','char',0],D2:['ADC·샘플링·나이퀴스트','sigbase',2],D3:['노이즈·SNR','sigbase',3],D4:['FFT·스펙트럼','accel',8],D5:['보정·회귀','calib',0],D6:['산업 신호·통신','plant',1],D7:['시계열·이상탐지','pdm',5],
  E1:['F=ma·스프링','accel',1],E2:['회전·코리올리','gyro',2],E3:['유체·압력','flow',1],E4:['몰·농도','gas',1]};
 const S=[['M','수학 도구','계산을 위한 최소한의 수학'],['A','회로','센서 출력을 전압으로 만드는 길'],['B','전자기·파동','감지 원리의 물리'],['C','반도체·재료','센서가 만들어지는 재료'],['D','신호·데이터','측정값을 믿을 수 있게'],['E','역학·화학','측정 대상 쪽 지식']];
 /* 장: [calc, concept, 막히는 지점] */
 const N={unitbasic:['M1','','μg → kg 같은 질량 접두어'],numsense:['M1 M2','M5','dB 20 log와 10 log 구분'],calcbasic:['M1 M3 M6','','(−) 키와 괄호'],elec:['A1 A4 A5 M3','M4','X_C = 1/(2πfC) 계산'],circuit:['A2 A3 A6 A7 A8','M4','브리지에서 R 위치, 매칭 허수 부호'],
  signal:['D1 D2','A6 D6'],char:['D1 D3 M6',''],calib:['D5 M6',''],
  resist:['A2 A3 C6','C1'],cap:['B1 A5',''],induct:['B4 A5','B2'],hall:['B3 C2','A6'],piezo:['C5 A4',''],optic:['B6 C1 C3','A6'],
  gas:['A3 C6 E4','C1 C2'],mag:['B2 M1','A3'],speed:['B4 M3','D2'],accel:['B1 A4 E1 M5','D3 D4'],gyro:['E2 M3 M5','D3'],ultra:['B5 M2','C5 A8'],saw:['B5 M2 A8','C5 A9'],temp:['C6 A3 A4','C1'],press:['E3 A3','B1 C1'],flow:['E3 B4','B5'],prox:['B4 D6','B1 C4'],
  plant:['D6 A1','D2'],pdm:['D4 D7 M6','D3 M3']};
 const ST=[
  ['도구','M1 M2 M6 D1',['5 μg을 kg으로 바꾼다 (5×10⁻⁹ kg)','전압이 10배 → 몇 dB인지 말한다 (20 dB)','데이터 5개의 평균과 표준편차를 계산기로 구한다']],
  ['직류 회로','A1 A2 A3',['KVL로 직렬 회로 전류를 구하고 검산한다','브리지 한 팔이 1 % 변할 때 출력을 정확식과 근사식(V·ΔR/4R)으로 구한다']],
  ['교류·증폭','M3 M4 A4 A5 A6 A7 A8',['Z = 50 − j10 Ω 부하에 맞는 매칭 임피던스를 말한다 (50 + j10)','RC 필터의 f_c와 τ를 구한다','비반전 증폭기 출력 전압을 구한다']],
  ['전자기','B1 B2 B3 B4 E1 E2',['홀 전압 크기와 극성을 구한다','알루미늄 표피 깊이를 주파수로 구한다','차동 정전용량 가속도계의 출력 V_o를 구한다']],
  ['반도체·재료','C1 C2 C3 C4 C5 C6 E4',['실리콘 포토다이오드가 1550 nm를 못 보는 이유를 밴드갭으로 설명한다','n형 가스센서가 환원성 가스에서 저항이 줄어드는 이유를 말한다','NPN 센서 출력이 PLC 입력에 전류를 흘리는 경로를 그린다']],
  ['파동','B5 B6 A9 E3',['두 매질의 음향 임피던스로 반사율을 구한다','SAW 파장으로 IDT 전극 폭을 구한다 (λ/4)']],
  ['신호·데이터','M5 D2 D3 D4 D5 D6 D7',['1 kHz 진동을 보려면 샘플링을 얼마로 할지 말한다','4~20 mA의 12 mA를 0~10 bar로 바꾼다 (5 bar)','3σ 기준으로 이상값을 판단한다']]];
 return {U,S,N,ST};
})();
function cChip(k,here){const u=CURR.U[k];if(!u)return '';const same=here===u[1];return `<button class="cchip${same?' here':''}" data-goto="${u[1]}" data-i="${u[2]}"><b>${k}</b> ${u[0]}${same?' · 이 장':''}</button>`}
function cChips(str,here){return (str||'').split(' ').filter(Boolean).map(k=>cChip(k,here)).join('')}
function needBox(id,i){const n=CURR.N[id];if(!n||i!==0)return '';
 return `<details class="needbox"><summary>🧰 이 장에 필요한 기초 <span class="muted small">(눌러서 펼치기)</span></summary>
  <div class="nb-r"><span class="nb-l">계산에 씀</span><div class="cchips">${cChips(n[0],id)}</div></div>
  ${n[1]?`<div class="nb-r"><span class="nb-l">알면 이해가 쉬움</span><div class="cchips">${cChips(n[1],id)}</div></div>`:''}
  ${n[2]?`<p class="small" style="margin:6px 0 0">⚠ 자주 막히는 곳: ${n[2]}</p>`:''}
  <button class="ghost small" data-goto="curri">기초 커리큘럼 전체 ›</button></details>`}
function TOC_LIST(){return [['unitbasic','0-1 단위·접두어'],['numsense','0-2 숫자 감각'],['calcbasic','0-3 계산기'],['elec','0-4 전기 기초'],['circuit','0-5 회로 기초'],['signal','1-1 신호의 흐름'],['char','1-2 센서 특성'],['calib','1-3 오차와 보정'],['resist','2-1 저항형'],['cap','2-2 정전용량형'],['induct','2-3 전자기 유도'],['hall','2-4 홀 효과'],['piezo','2-5 압전형'],['optic','2-6 광학'],['gas','3-1 가스'],['mag','3-2 자기'],['speed','3-3 속도·금속탐지'],['accel','3-4 가속도·진동'],['gyro','3-5 자이로'],['ultra','3-6 초음파'],['saw','3-7 SAW'],['temp','3-8 온도'],['press','3-9 압력'],['flow','3-10 유량·레벨'],['prox','3-11 근접·광'],['plant','4-1 공장 데이터'],['pdm','4-2 예지보전']]}
const C_PASS=()=>LS.get('cpass',{});
document.addEventListener('change',e=>{const t=e.target;if(!t.matches||!t.matches('[data-cpass]'))return;const p=C_PASS();if(t.checked)p[t.dataset.cpass]=1;else delete p[t.dataset.cpass];LS.set('cpass',p);
 const st=t.closest('details');if(st){const all=st.querySelectorAll('[data-cpass]'),ok=[...all].filter(x=>x.checked).length;const b=st.querySelector('.cst-n');if(b)b.textContent=`${ok}/${all.length}`;st.classList.toggle('done',ok===all.length)}});

PAGES.curri={title:'기초 커리큘럼 — 센서로 배우는 전자공학',part:'부록 F',secs:[
 {k:'지도',h:'센서에 필요한 전자공학 기초 38개',b:`<p class="small muted">[AI 보충] 범위는 전자공학 전체가 아니라 「센서·계측·공장 데이터에 필요한 만큼」이에요. 칩을 누르면 그 기초가 설명된 쪽으로 바로 가요.</p>
   ${CURR.S.map(([c,n,d])=>`<div class="cstrand"><div class="h">${c} · ${n} <span class="small muted">— ${d}</span></div><div class="cchips">${Object.keys(CURR.U).filter(k=>k[0]===c).map(k=>cChip(k)).join('')}</div></div>`).join('')}
   <div class="rel">공부 순서 = 센서 장을 읽다가 막히면 → 그 장 첫 쪽의 「🧰 이 장에 필요한 기초」 → 칩 하나만 보고 돌아오기</div>`,
  easy:'센서 공부에 필요한 전자공학 기초를 38조각으로 잘라 둔 지도예요. 처음부터 다 공부하는 게 아니라, 막힐 때 필요한 조각만 찾아 쓰면 돼요.',
  ex:'가속도센서 장에서 「차동 용량 → 전압」이 막히면, 그 장의 필요한 기초 상자에서 B1(정전용량)과 A4(RC) 칩을 눌러 보고 돌아오면 돼요.',sum:'막히면 그 장의 기초 칩 하나만 보고 돌아온다'},
 {k:'장별',h:'장마다 필요한 기초',b:`<div class="tblwrap fit"><table class="ctab"><tr><th>장</th><th>계산에 씀 · <span class="muted">알면 좋음</span></th></tr>
   ${TOC_LIST().map(([id,nm])=>{const n=CURR.N[id];return `<tr><td><button class="linkb" data-goto="${id}">${nm}</button></td><td><div class="cchips">${cChips(n[0])}</div>${n[1]?`<div class="cchips soft">${cChips(n[1])}</div>`:''}</td></tr>`}).join('')}</table></div>`,
  easy:'왼쪽 장을 공부하려면 오른쪽 기초가 필요해요. 진한 칩은 계산에 바로 쓰이고, 연한 칩은 알면 이해가 쉬워지는 것이에요.',
  ex:'자이로(3-5)는 E2 회전·코리올리, M3 사인파, M5 미분 감각이 계산에 쓰이고, D3 노이즈를 알면 바이어스·드리프트가 쉽게 이해돼요.',sum:'진한 칩 = 계산 필수, 연한 칩 = 이해 도움'},
 {k:'7단계',h:'7단계와 통과 기준',get b(){return `<p class="small muted">단계별로 「이걸 혼자 풀 수 있으면 통과」 기준이에요. 체크는 이 폰에만 저장돼요. 날짜·진도표는 일부러 넣지 않았어요.</p>
   ${CURR.ST.map(([n,u,crit],si)=>{const p=C_PASS();const ok=crit.filter((_,ci)=>p[si+'-'+ci]).length;return `<details class="cstage${ok===crit.length?' done':''}"><summary><span class="cst-i">${si+1}</span> ${n} <span class="cst-n small muted">${ok}/${crit.length}</span></summary>
    <div class="cchips">${cChips(u)}</div><ul class="cpass">${crit.map((c,ci)=>`<li><label><input type="checkbox" data-cpass="${si}-${ci}" ${p[si+'-'+ci]?'checked':''}> ${c}</label></li>`).join('')}</ul></details>`}).join('')}`},
  easy:'7개 계단이에요. 각 계단의 체크 항목을 혼자 풀 수 있으면 다음 계단으로 가요. 막히면 위에 있는 칩을 눌러 해당 쪽을 다시 봐요.',
  ex:'2단계 체크 「브리지 한 팔이 1 % 변할 때 출력」: 5 V 브리지면 근사식 5 × 0.01 ÷ 4 = 12.5 mV, 정확식은 약 12.4 mV. 이걸 혼자 하면 통과예요.',sum:'통과 기준을 혼자 풀 수 있으면 다음 단계'}
]};
