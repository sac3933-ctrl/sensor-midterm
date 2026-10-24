# -*- coding: utf-8 -*-
import re
s = open('index.html').read()
# 1) JS generator block
a = s.index('/* ---------- 새 숫자 문제 ---------- */')
b = s.index("out.innerHTML = G[b.dataset.gen](); renderFigs(out);\n});") + len("out.innerHTML = G[b.dataset.gen](); renderFigs(out);\n});")
s = s[:a] + open('gen.js').read() + s[b:]

# 2) static key blocks (python mirror of kb)
KEYW = set(['SHIFT','MODE','AC','=','×10ˣ','(−)','x²','x■','√■','π','Ans','→','cos','tan','ENG','S⇔D','(',')','+','−','×','÷'])
def kb(st):
    out=[]
    for t in st.split(' '):
        if not t: continue
        if re.fullmatch(r'[\d.]+', t): out.append(f'<kbd class="n">{t}</kbd>')
        elif t in KEYW: out.append(f'<kbd>{t}</kbd>')
        else: out.append(f'<kbd class="w">{t}</kbd>')
    return ''.join(out)
def block(rows, note=''):
    r=''.join(f'<div class="krow"><div class="kl">{a}</div><div class="kk">{kb(b)}</div><div class="kd">{c}</div></div>' for a,b,c in rows)
    n=f'<p class="knote">{note}</p>' if note else ''
    return f'<details class="calc-in"><summary>공학용 계산기 입력</summary><div class="kbody">{r}{n}</div></details>'

STAT_NOTE = '회귀(STAT) 검산: 계산기의 <b>A(또는 a)가 절편, B(또는 b)가 기울기</b>예요. 우리 식 y = ax + b와 이름이 반대라 조심하세요. EX·CW는 MENU(HOME) → 통계 → y=a+bx 선택 후 같은 방식으로 입력하고, OPTN의 회귀 계산 화면에서 a, b, r을 봐요.'
K = {
'1-A': (block([
  ['a (기울기)','( 3 × 632 − 21 × 84 ) ÷ 24 =','5.5'],
  ['b (절편)','( (−) 21 × 632 + 155 × 84 ) ÷ 24 =','−10.5'],
  ['읽은 입력 xₘ','( 30 + 10.5 ) ÷ 5.5 =','7.363636…'],
  ['오차율 %','( Ans − 7 ) ÷ 7 × 100 =','5.1948 (7.36으로 반올림하면 5.14)'],
  ['정확도 %','100 − Ans =','94.805'],
  ['STAT 검산 (ES PLUS)','MODE 3 2 x열: 5 = 7 = 9 = y열: 16 = 30 = 38 = AC','표에 x, y 입력 (커서 →로 y열 이동)'],
  ['','SHIFT 1 5 1 =','A = −10.5 (절편)'],
  ['','SHIFT 1 5 2 =','B = 5.5 (기울기)'],
  ['일반 계산으로 복귀','MODE 1','COMP']], STAT_NOTE)),
'1-B': (block([
  ['a','( 3 × 564 − 18 × 87 ) ÷ 24 =','5.25'],
  ['b','( (−) 18 × 564 + 116 × 87 ) ÷ 24 =','−2.5'],
  ['R²','1 − 1.5 ÷ 222 =','0.993243…'],
  ['xₘ','( 30 + 2.5 ) ÷ 5.25 =','6.190476…'],
  ['오차율 %','( Ans − 6 ) ÷ 6 × 100 =','3.1746'],
  ['정확도 %','100 − Ans =','96.825'],
  ['STAT 검산 (ES PLUS)','MODE 3 2 x열: 4 = 6 = 8 = y열: 18 = 30 = 39 = AC SHIFT 1 5 3 =','r = 0.99661'],
  ['R² = r²','x² =','0.993243 (같으면 정답)']], STAT_NOTE)),
'1-C': (block([
  ['a','( 3 × 182 − 12 × 39 ) ÷ 24 =','3.25'],
  ['b','( (−) 12 × 182 + 56 × 39 ) ÷ 24 =','0'],
  ['R²','1 − 1.5 ÷ 86 =','0.982558…'],
  ['xₘ','12 ÷ 3.25 =','3.692307…'],
  ['오차율 %','( 4 − Ans ) ÷ 4 × 100 =','7.6923']])),
'1-D': (block([
  ['a','( 4 × 59.7 − 10 × 20 ) ÷ 20 =','1.94'],
  ['b','( (−) 10 × 59.7 + 30 × 20 ) ÷ 20 =','0.15'],
  ['xₘ','( 6.2 − 0.15 ) ÷ 1.94 =','3.118556…'],
  ['오차율 %','( Ans − 3 ) ÷ 3 × 100 =','3.9519'],
  ['MDL','3 × 0.05 ÷ 1.94 =','0.077319…'],
  ['STAT 검산 (ES PLUS)','MODE 3 2 x열: 1 = 2 = 3 = 4 = y열: 2.1 = 3.9 = 6.2 = 7.8 = AC SHIFT 1 5 2 =','B = 1.94']], STAT_NOTE)),
'2-A': (block([
  ['|Z_L|','√■ 50 x² + 10 x² =','50.990195…'],
  ['L','10 ÷ ( 2 × π × 1 ×10ˣ 9 ) =','1.5915×10⁻⁹'],
  ['단위 읽기','ENG','1.5915×10⁻⁹ → 1.59 nH']], 'π는 ES PLUS·EX에서 SHIFT ×10ˣ예요. ×10ˣ 앞에는 반드시 숫자(1)를 먼저 넣어요.')),
'2-B': (block([
  ['|Z_L|','√■ 30 x² + 15 x² =','33.541019…'],
  ['C','1 ÷ ( 2 × π × 2 ×10ˣ 9 × 15 ) =','5.3052×10⁻¹² (5.31 pF)']])),
'2-C': (block([
  ['L','25 ÷ ( 2 × π × 5 ×10ˣ 8 ) =','7.9577×10⁻⁹ (7.96 nH)']])),
'6-A': (block([
  ['ΔR','1000 × 1 ×10ˣ (−) 3 =','1'],
  ['V_out','101 ÷ 201 − 0.5 =','2.4876×10⁻³'],
  ['mV로','Ans × 1000 =','2.4876']], '한 줄로 넣으면 중간 반올림이 없어서 2.49 mV가 정확히 나와요.')),
'6-B': (block([
  ['i) V_o','100 ÷ 210 − 110 ÷ 210 =','−0.047619…'],
  ['ii) V_o','105 ÷ 220 − 115 ÷ 220 =','−0.045454…']], 'V₊(오른쪽) − V₋(왼쪽) 순서로 넣어야 부호가 맞아요.')),
'6-C': (block([
  ['V_out','2 × 210 ÷ 410 − 1 =','0.024390…']])),
'6-D': (block([
  ['i) 60 °C','105 ÷ 209 − 0.5 =','2.3923×10⁻³'],
  ['ii) 대각선','101 ÷ 201 − 100 ÷ 201 =','4.9751×10⁻³']])),
'5-B': (block([
  ['전류 I','2 ÷ ( 25 + 500 + 25 ) =','3.6363×10⁻³'],
  ['센서 전압','Ans × 500 =','1.818181…'],
  ['라인 전압','2 ÷ 550 × 25 =','0.090909…'],
  ['2선식 읽음','2 ÷ ( 2 ÷ 550 ) =','550'],
  ['오차 %','( 550 − 500 ) ÷ 500 × 100 =','10'],
  ['4선식 전압','4 ×10ˣ (−) 3 × 500 =','2']])),
'4-A': (block([
  ['%','5 ×10ˣ (−) 6 × 100 =','5×10⁻⁴'],
  ['질량 g','5 ×10ˣ (−) 6 ÷ 22.4 × 4 =','8.9285×10⁻⁷'],
  ['개수','Ans ÷ 4 × 6 ×10ˣ 23 =','1.3392×10¹⁷'],
  ['개/cm³','Ans ÷ 1000 =','1.3392×10¹⁴'],
  ['개/cm²','Ans x■ 2 ÷ 3 → =','2.6176×10⁹'],
  ['표면 개수','Ans × 0.01 =','2.6176×10⁷']], 'x■를 누르면 커서가 지수 칸으로 올라가요. 2 ÷ 3을 넣고 →로 빠져나온 뒤 = 를 눌러요. 분수 키로 2/3을 넣어도 같아요.')),
'4-C': (block([
  ['몰','10 ×10ˣ (−) 6 × 2 ÷ 22.4 =','8.9285×10⁻⁷'],
  ['질량 g','Ans × 40 =','3.5714×10⁻⁵'],
  ['개수','10 ×10ˣ (−) 6 × 2 ÷ 22.4 × 6 ×10ˣ 23 =','5.3571×10¹⁷'],
  ['개/cm³','Ans ÷ 2000 =','2.6785×10¹⁴'],
  ['개/cm²','Ans x■ 2 ÷ 3 → =','4.1552×10⁹'],
  ['표면 개수','Ans × 0.09 =','3.7397×10⁸']])),
'4-D': (block([
  ['질량 g','1 ×10ˣ (−) 6 ÷ 22.71 × 2.02 =','8.8947×10⁻⁸'],
  ['μg로','Ans × 1 ×10ˣ 6 =','0.088947']])),
'10-C': (block([
  ['R_H','1 ÷ ( 1 ×10ˣ 22 × 1.6 ×10ˣ (−) 19 ) =','6.25×10⁻⁴'],
  ['V_H','Ans × 1 ×10ˣ (−) 3 × 0.1 ÷ 1 ×10ˣ (−) 6 =','0.0625']], '÷ 1 ×10ˣ (−) 6 은 계산기가 한 숫자(10⁻⁶)로 묶어서 처리해요. 괄호 없이 넣어도 돼요.')),
'8-C': (block([
  ['질량 kg','0.55 ×10ˣ (−) 3 × 15.95 ×10ˣ (−) 3 × 220 ×10ˣ (−) 9 × 21450 =','4.1397×10⁻⁸'],
  ['ΔT','2 x² ÷ 100 × 1 ×10ˣ (−) 3 ÷ ( 133 × Ans ) =','7.2650']], 'Ans에는 바로 앞에서 구한 질량이 들어 있어요.')),
'14-A': (block([
  ['기출식 그대로','(−) 3 + 2 × 3 × 2 ÷ ( 2 + 1 ) =','1'],
  ['정리식','( 2 − 1 ) ÷ ( 2 + 1 ) × 3 =','1']], 'C₂ = 1로 놓고 C₁ = 2를 넣었어요.')),
'14-B': (block([
  ['i)','( 3 − 1 ) ÷ ( 3 + 1 ) × 2 =','1'],
  ['ii)','( 1 − 2 ) ÷ ( 1 + 2 ) × 3 =','−1']])),
'14-C': (block([
  ['C₁','2 ÷ 1.8 =','1.111111…'],
  ['C₂','2 ÷ 2.2 =','0.909090…'],
  ['V_o','( 2 ÷ 1.8 − 2 ÷ 2.2 ) ÷ ( 2 ÷ 1.8 + 2 ÷ 2.2 ) × 3 =','0.3'],
  ['검산 x/d','0.2 ÷ 2 × 3 =','0.3']])),
'12-A': (block([
  ['δ (m)','√■ 2.65 ×10ˣ (−) 8 ÷ ( π × 135 ×10ˣ 3 × 4 × π × 1 ×10ˣ (−) 7 ) =','2.2298×10⁻⁴'],
  ['mm로','Ans × 1000 =','0.22298'],
  ['20 kHz','√■ 2.65 ×10ˣ (−) 8 ÷ ( π × 20 ×10ˣ 3 × 4 × π × 1 ×10ˣ (−) 7 ) =','5.7933×10⁻⁴']], '√■를 누른 뒤 전체 식을 넣고 바로 = 를 눌러요. 루트 안에 분수식 전체가 들어가야 해요.')),
'12-B': (block([
  ['RPM','10000 ÷ 10 =','1000'],
  ['km/h','2 × π × 0.3 × 1000 ÷ 60 × 3.6 =','113.0973…'],
  ['회/s','6000 ÷ 48 ÷ 60 =','2.083333…']])),
'15-A': (block([
  ['노이즈 밀도 (g)','1 ×10ˣ (−) 3 ÷ 1 ÷ √■ 100 =','1×10⁻⁴ (= 0.1 mg)'],
  ['Zero-g','( 1.85 + 1.45 ) ÷ 2 =','1.65'],
  ['감도','( 1.85 − 1.45 ) ÷ 2 =','0.2']])),
'11-A': (block([
  ['각도 단위 확인','SHIFT MODE 3','화면 위 D 표시 (ES PLUS)'],
  ['R(45°)','100 + 3 × cos 45 ) x² =','101.5'],
  ['GMR 비','( 11.2 − 10 ) ÷ 10 × 100 =','12']], 'cos를 누르면 "cos("가 열려요. 45 다음 )로 닫고 x²를 눌러야 (cos 45)²가 돼요. EX·CW는 SETUP 메뉴에서 각도 단위를 Degree로 맞춰요.')),
}
for cid, html in K.items():
    m = re.search(r'<span class="id">' + re.escape(cid) + r'</span>', s); assert m, cid
    end = s.index('</div></details>', m.end()) + len('</div></details>')
    s = s[:end] + '\n    ' + html + s[end:]

# 3) generator boxes for new types
def genbox(k, txt): return f'''  <div class="gen" id="g{k}">
    <div class="row"><span><b class="k">새 숫자로 한 번 더</b> · {txt}</span><button class="btn" data-gen="{k}">새 문제</button></div>
    <div class="out"></div>
  </div>
'''
adds = {'t2': genbox(2,'주파수·부하 임피던스가 바뀌어요'), 't4': genbox(4,'전원·센서·라인 저항·정전류가 바뀌어요'),
        't6': genbox(6,'n형/p형, 전류·자기장 방향, 크기가 바뀌어요'), 't8': genbox(8,'질량·전압·저항·시간이 바뀌어요'),
        't10': genbox(10,'침투 깊이 · 회전수 · 노이즈 밀도 중 하나가 나와요')}
for tid, html in adds.items():
    a = s.index(f'<section class="type" id="{tid}">'); b = s.index('</section>', a)
    s = s[:b] + html + s[b:]

# 4) basics box after rules
basics = '''<details class="calc-basic">
  <summary>공학용 계산기 기본 키 · 시험 전에 한 번 읽기</summary>
  <div class="kbody">
    <p class="knote" style="margin-top:4px">Casio fx-570 계열(ES PLUS · EX · CW) 기준이에요. 기종마다 메뉴 번호가 조금 다를 수 있어서, 다른 부분은 따로 적었어요.</p>
    <div class="krow"><div class="kl">6 × 10²³</div><div class="kk">''' + kb('6 ×10ˣ 23') + '''</div><div class="kd">×10ˣ 앞에는 항상 숫자</div></div>
    <div class="krow"><div class="kl">10⁻⁶</div><div class="kk">''' + kb('1 ×10ˣ (−) 6') + '''</div><div class="kd">음수 부호는 (−) 키, 빼기 − 키와 다름</div></div>
    <div class="krow"><div class="kl">π</div><div class="kk">''' + kb('SHIFT ×10ˣ') + '''</div><div class="kd">ES PLUS · EX 기준</div></div>
    <div class="krow"><div class="kl">a의 (2/3) 제곱</div><div class="kk">''' + kb('a x■ 2 ÷ 3 →') + '''</div><div class="kd">지수 칸에서 → 로 빠져나오기</div></div>
    <div class="krow"><div class="kl">√(식)</div><div class="kk">''' + kb('√■ 식 =') + '''</div><div class="kd">루트 안에 식 전체가 들어감</div></div>
    <div class="krow"><div class="kl">바로 전 결과</div><div class="kk">''' + kb('Ans') + '''</div><div class="kd">이어서 계산할 때 다시 안 쳐도 됨</div></div>
    <div class="krow"><div class="kl">분수 → 소수</div><div class="kk">''' + kb('S⇔D') + '''</div><div class="kd">결과가 132/24처럼 나올 때</div></div>
    <div class="krow"><div class="kl">n · p 단위 읽기</div><div class="kk">''' + kb('ENG') + '''</div><div class="kd">지수를 3의 배수로: 10⁻⁹ = n, 10⁻¹² = p</div></div>
    <div class="krow"><div class="kl">회귀(STAT) 모드</div><div class="kk">''' + kb('MODE 3 2') + '''</div><div class="kd">ES PLUS: A+BX · EX/CW: MENU(HOME) → 통계 → y=a+bx</div></div>
    <div class="krow"><div class="kl">일반 계산 복귀</div><div class="kk">''' + kb('MODE 1') + '''</div><div class="kd">EX/CW: MENU(HOME) → 계산(Calculate)</div></div>
    <p class="knote">회귀 결과의 <b>A(a)는 절편, B(b)는 기울기</b>예요. 강의의 y = ax + b와 이름이 반대예요. 시험에서는 과정을 써야 하니 행렬로 풀고, 회귀 모드는 답 확인용으로 쓰세요.</p>
  </div>
</details>
'''
s = s.replace('\n<!-- ============ 유형 1 ============ -->', '\n' + basics + '\n<!-- ============ 유형 1 ============ -->', 1)

css = '''
details.calc-in{border-color:var(--hint)}
details.calc-in summary{color:var(--hint)}
details.calc-basic{background:var(--card);border:1px solid var(--hint);border-radius:5px;margin:10px 0 0}
details.calc-basic summary{color:var(--hint)}
.kbody{padding:6px 14px 12px;border-top:1px solid var(--line);background:var(--card)}
.krow{display:grid;grid-template-columns:minmax(84px,auto) 1fr;gap:4px 12px;padding:8px 0;border-bottom:1px dashed var(--line);align-items:center}
.krow:last-of-type{border-bottom:0}
.krow .kl{font-size:13px;font-weight:700;color:var(--muted)}
.krow .kk{display:flex;flex-wrap:wrap;gap:4px;min-width:0}
.krow .kd{grid-column:2;font-family:var(--f-mono);font-size:13px;color:var(--ans)}
.krow .kd::before{content:"→ 화면: ";color:var(--muted);font-family:var(--f-body);font-size:12px}
kbd{font-family:var(--f-mono);font-size:12.5px;min-width:24px;text-align:center;padding:2px 7px;border-radius:5px;border:1px solid var(--svg-soft);border-bottom-width:3px;background:var(--paper);background-image:none;color:var(--ink);line-height:1.5;white-space:nowrap}
kbd.n{border-color:var(--line);border-bottom-width:1px;background:none;padding:2px 2px;min-width:0}
kbd.w{border-style:dashed;border-bottom-width:1px;font-family:var(--f-body);font-size:12px;color:var(--muted);background:none}
.knote{font-size:13px;color:var(--muted);margin:10px 0 0}
@media (max-width:520px){.krow{grid-template-columns:1fr}.krow .kd{grid-column:1}}
'''
s = s.replace('.end{margin-top:48px', css + '.end{margin-top:48px', 1)
open('index.html','w').write(s)
print('ok')
