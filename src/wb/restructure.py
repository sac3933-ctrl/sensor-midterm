# -*- coding: utf-8 -*-
import re, html as H
exec(open('/home/claude/wb/essays.py').read())
s = open('/home/claude/wb/index.html').read()

# ---------- A. 카드 번호 재매김 ----------
MAP = {'5-A':'4-A','5-B':'4-B','5-C':'4-C','5-D':'4-D','4-A':'5-A','4-B':'5-B','4-C':'5-C',
       '3-A':'6-A','3-B':'6-B','3-C':'6-C','3-D':'6-D','6-A':'10-A','6-B':'10-B','6-C':'10-C',
       '10-D':'11-A','10-A':'12-A','10-B':'12-B','9-A':'14-A','9-B':'14-B','9-C':'14-C','10-C':'15-A'}
s = re.sub(r'\bc(\d{1,2}-[A-D])\b', lambda m: 'c'+MAP.get(m.group(1), m.group(1)), s)
s = re.sub(r'(?<![\w#-])(\d{1,2}-[A-D])(?![\w])', lambda m: MAP.get(m.group(1), m.group(1)), s)

# ---------- B. 기존 섹션 분해 ----------
def take_sections(src):
    out = {}
    for m in re.finditer(r'<section class="type" id="(t\d+)">(.*?)</section>\n', src, re.S):
        body = m.group(2)
        why = re.search(r'<p class="why">(.*?)</p>', body, re.S)
        cards = []
        for cm in re.finditer(r'<div class="card" id="(c[\d]+-[A-D])">', body):
            a = cm.start(); b = body.index('\n  </div>\n', a) + len('\n  </div>\n')
            cards.append((cm.group(1), body[a:b]))
        gen = re.search(r'<div class="gen" id="g\d+">.*?<div class="out"></div>\n  </div>\n', body, re.S)
        out[m.group(1)] = dict(why=why.group(1) if why else '', cards=cards, gen=gen.group(0) if gen else '', span=(m.start(), m.end()))
    return out
old = take_sections(s)
first_start = min(v['span'][0] for v in old.values()); last_end = max(v['span'][1] for v in old.values())
cardmap = {cid: html for v in old.values() for cid, html in v['cards']}

# ---------- C. 서술형 카드 HTML ----------
def essay_card(cid, e):
    kws = ''.join(f'<span class="kw">{k}</span>' for k in e['kws'])
    qs = ''.join(f'<li>{q}</li>' for q, a, ez in e['qa'])
    frows = ''.join(f'<div class="frow"><span class="fl">{a}</span><span class="fe">{b}</span></div>' for a, b in e['keys'])
    srcs = ''.join(f'<li><b>{a}</b> {b} · {c}</li>' for a, b, c in e['src'])
    qa = ''.join(f'<div class="xline"><b>Q{i+1}. {q}</b><q>{a}</q></div><p class="easy">쉬운 말로 → {ez}</p>' for i, (q, a, ez) in enumerate(e['qa']))
    short = ''.join(f'<li><b>{a}</b> · {b}</li>' for a, b in e['keys'])
    return f'''<div class="card" id="c{cid}">
    <div class="card-top"><span class="id">{cid}</span><span class="ttl">{e['title']}</span><span class="tag ess">서술형 · 강의 범위</span></div>
    <div class="first"><div class="fhead"><span class="flabel">먼저 떠올릴 것</span><span class="fsig">문제 신호</span>{kws}</div><p class="fline">→ {e['first']}</p></div>
    <ol class="q">{qs}</ol>
    <details class="deep"><summary>풀이 보기 · 외울 것 → 답안 문장 → 쉬운 설명</summary><div class="dbody">
      <div class="dsec"><div class="dh"><span>1</span>외울 것 (키워드·식)</div><div class="fbox">{frows}</div><div class="srcbox"><b>강의자료 위치</b><ul>{srcs}</ul></div></div>
      <div class="dsec"><div class="dh"><span>2</span>답안지에 이렇게 쓰세요</div><p class="note" style="margin:0 0 8px">【 】 = 강의자료 원문 표현 (그대로 쓰면 안전) · 〔 〕 = 작년 교수님 답안 표현</p>{qa}</div>
    </div></details>
    <details><summary>정답 확인 · 핵심만</summary><div class="ans"><ul class="final-list">{short}</ul></div></details>
  </div>
'''

# ---------- D. 새 섹션 조립 ----------
CH = {'Ⅰ':'센서의 기초','Ⅱ':'가스센서','Ⅲ':'자기센서','Ⅳ':'속도센서 · 금속탐지기','Ⅴ':'가속도 · 진동센서'}
def sec(tid, ch, no, name, pts, why, cards, gen=''):
    return f'''<section class="type" id="{tid}" data-ch="{ch}">
  <div class="type-head"><span class="no">유형 {no}</span><h2>{name}</h2><span class="pts">{pts}</span></div>
  <p class="why">{why}</p>
{''.join(cards)}{gen}</section>
'''
def cards_of(tid): return [h for _, h in old[tid]['cards']]
ESS = lambda ids: [essay_card(i, E[i]) for i in ids]
new_sections = [
 sec('t1','Ⅰ','1','최소자승법 · 감도 · R² · 정확도','기출 1번 18점 · HW1-1·2', old['t1']['why'], cards_of('t1'), old['t1']['gen']),
 sec('t2','Ⅰ','2','임피던스 매칭','HW1-3', old['t2']['why'], cards_of('t2'), old['t2']['gen']),
 sec('t3','Ⅰ','3','센서 기초 개념 서술형','Week1 전체', '감도·분해능·MDL·선형성·R²·반복성·드리프트·응답시간. 숙제·기출엔 없지만 범위 안이라 서술형으로 나올 수 있어요. 【 】 안 표현을 그대로 쓰세요.', ESS(['3-A','3-B','3-C','3-D'])),
 sec('t4','Ⅱ','4','ppm → 질량 → 원자 수 → 표면 원자 수','기출 2번 25점 · HW2-2', old['t5']['why'], cards_of('t5'), old['t5']['gen']),
 sec('t5','Ⅱ','5','2선식 vs 4선식','HW2-1', old['t4']['why'], cards_of('t4'), old['t4']['gen']),
 sec('t6','Ⅱ','6','Pd 휘트스톤 브리지 수소센서','기출 3번 18점 · HW1-4', old['t3']['why'], cards_of('t3'), old['t3']['gen']),
 sec('t7','Ⅱ','7','반도체 가스센서 · 캐리어와 저항 변화','기출 4번 12점', old['t7']['why'], cards_of('t7')),
 sec('t8','Ⅱ','8','마이크로히터','기출 5번 9점', old['t8']['why'], cards_of('t8'), old['t8']['gen']),
 sec('t9','Ⅱ','9','가스센서 서술형','Week2 전체', 'Pd 수소센서·4-wire·브리지 설계·drift·선택성·반도체식·히터·GC. 작년 기출 4·5번이 여기서 나왔듯 올해도 서술형이 나올 가능성이 높아요.', ESS(['9-A','9-B','9-C','9-D','9-E'])),
 sec('t10','Ⅲ','10','홀 센서 · 극성과 V_H','HW2-3', old['t6']['why'], cards_of('t6'), old['t6']['gen']),
 sec('t11','Ⅲ','11','홀 구동 회로 · AMR · GMR · SQUID','Week3·4', '홀 센서 구동 방식부터 자기저항 센서, SQUID까지. 계산 하나(11-A)와 서술형 세 묶음이에요.', [cardmap['c11-A']] + ESS(['11-B','11-C','11-D'])),
 sec('t12','Ⅳ','12','속도센서 · 금속탐지기 계산','Week5 강의 예제', '강의 예제가 그대로 계산 문제로 나오기 좋은 두 가지: 침투 깊이와 RPM·차속.', [cardmap['c12-A'], cardmap['c12-B']], old['t10']['gen'].replace('id="g10"','id="g12"').replace('data-gen="10"','data-gen="12"').replace('침투 깊이 · 회전수 · 노이즈 밀도 중 하나가 나와요','침투 깊이 · 회전수 중 하나가 나와요')),
 sec('t13','Ⅳ','13','속도센서 · 금속탐지기 서술형','Week5 전체', '유도형 vs 홀 속도센서, 금속탐지기 구성과 진폭 검출, 와전류와 침투 깊이.', ESS(['13-A','13-B','13-C'])),
 sec('t14','Ⅴ','14','정전용량형 가속도센서 V_o','기출 6번 12점', old['t9']['why'], cards_of('t9'), old['t9']['gen']),
 sec('t15','Ⅴ','15','가속도·진동 파라미터 · 서술형','Week6 전체', 'Zero-g·노이즈 밀도 계산 하나(15-A)와 측정 원리·설계조건·파라미터·압전형·진동 분석 서술형.', [cardmap['c15-A']] + ESS(['15-B','15-C','15-D']), old['t10']['gen'].replace('id="g10"','id="g15"').replace('data-gen="10"','data-gen="15"').replace('침투 깊이 · 회전수 · 노이즈 밀도 중 하나가 나와요','노이즈 밀도 · Zero-g 숫자가 바뀌어요')),
]
s = s[:first_start] + ''.join(new_sections) + s[last_end:]

# ---------- E. 생성기 10 → 12 / 15 ----------
a = s.index("  10() {\n    const kind = pick(['skin', 'rpm', 'noise']);")
b = s.index("\n  }\n};", a) + len("\n  }")
body = s[a:b]
g12 = body.replace("  10() {\n    const kind = pick(['skin', 'rpm', 'noise']);", "  12() {\n    const kind = pick(['skin', 'rpm']);")
g15 = body.replace("  10() {\n    const kind = pick(['skin', 'rpm', 'noise']);", "  15() {\n    const kind = 'noise';")
s = s[:a] + g12 + ',\n' + g15 + s[b:]

# ---------- F. TOC · 첫 생각 표 · 끝 안내 ----------
TRIG = [
 ('Ⅰ','t1','1','점 3개 · y = ax + b · 정확도','X=[x,1], y → p = (XᵀX)⁻¹Xᵀy (행렬로 쓰기) → 감도 = a → 정확도는 x로'),
 ('Ⅰ','t2','2','Z_L = R ± jX · maximum power','−j → L (ωL) · +j → C (1/ωC) · R_L = R_S'),
 ('Ⅰ','t3','3','감도·분해능·MDL·선형성·R² 서술','S = Δy/Δx · 분해능 = Noise/S · MDL = 3σ/S · 선형성 %FS vs R² 무단위'),
 ('Ⅱ','t4','4','ppm · 용기 · 표면 개수','÷22.4 → ×M → ×N_A → ÷cm³ → ^(2/3) → ×cm²'),
 ('Ⅱ','t5','5','2 wire · 4 wire · R_in = ∞','2선 직렬 V/(R + 2r) · 4선 전압선 I = 0'),
 ('Ⅱ','t6','6','Pd 4개 · 노출 · V_out','V_o = V_in[R₃/(R₂+R₃) − R₄/(R₁+R₄)] · 닿은 R = R + ppm × 감도'),
 ('Ⅱ','t7','7','n/p형 + 산화/환원 가스','산화 = 전자 뺏음 · 다수 캐리어↑ = 저항↓'),
 ('Ⅱ','t8','8','마이크로히터 · 일정 온도','Joule · 발열 = 방열 · VIt = C_p m ΔT'),
 ('Ⅱ','t9','9','가스센서 서술 (Pd·4-wire·drift·선택성)','Pd 흡착→해리→확산→PdHₓ · 4선 전압선 I=0 · drift 4원인 · 선택성 4가지'),
 ('Ⅲ','t10','10','B 방향 · n/p · V_H 극성','캐리어는 I × B 면으로 · n형 그 면 (−), p형 (+) · 일정 = qE_H = qvB'),
 ('Ⅲ','t11','11','AMR · GMR · SQUID · 구동 회로','cos²θ·45° 직선 · 평행 = 저항 최소 · Φ₀ 주기 · 정전류 안정/정전압 간단'),
 ('Ⅳ','t12','12','δ · RPM','√(ρ/πfμ₀) · 펄스 ÷ tooth · m/s × 3.6'),
 ('Ⅳ','t13','13','유도형/홀 · 금속탐지 서술','V = −nΔΦ/Δt · 저속 출력↓ · 진폭 검출(저항 변화 > 주파수 변화) · 두께 > δ'),
 ('Ⅴ','t14','14','C₁, C₂ · ±V_s · 1 MHz','(C₁ − C₂)/(C₁ + C₂)·V_s · 고주파/저전압 이유'),
 ('Ⅴ','t15','15','Zero-g · noise · 압전 · 진동','(+1g + −1g)/2 · σ/S/√BW · q = d·m·a, 정적 불가'),
]
rows = ''; last = None
for ch, tid, no, sig, think in TRIG:
    if ch != last: rows += f'<tr class="chrow"><td colspan="3">{ch} {CH[ch]}</td></tr>'; last = ch
    rows += f'<tr><td><a href="#{tid}">{no}</a></td><td>{sig}</td><td class="mono">{think}</td></tr>'
a = s.index('<div class="trig">'); b = s.index('</div>\n', s.index('<p class="note">', a)) + len('</div>\n')
s = s[:a] + f'<div class="trig"><h2>시험지를 보면 이것부터 · 유형 신호 → 첫 생각</h2><div class="tw"><table class="t trigt"><tr><th>유형</th><th>문제에 이런 말이 보이면</th><th>바로 떠올릴 것</th></tr>{rows}</table></div><p class="note">매일 이 표만 가리고 "신호 → 첫 생각"을 소리 내어 말해 보세요. 각 문제 맨 위 초록 상자에도 같은 내용이 있어요.</p></div>\n' + s[b:]
a = s.index('<nav class="toc"'); b = s.index('</nav>', a) + 6
s = s[:a] + '<nav class="toc" aria-label="유형 바로가기">' + ''.join(f'<a href="#{tid}">{no} {sig.split(" ·")[0]}</a>' for _, tid, no, sig, _ in TRIG) + '</nav>' + s[b:]

# ---------- G. CSS ----------
css = '''
.tag.ess{background:var(--chip);color:var(--ink);border:1px solid var(--ink)}
p.easy{margin:-4px 0 14px;padding:0 12px;font-size:14px;color:var(--muted)}
table.trigt tr.chrow td{background:var(--ink);color:var(--paper);font-weight:800;text-align:left;padding:5px 10px}
@media (max-width:640px){table.trigt tr.chrow{border:0;background:var(--ink);padding:5px 10px}table.trigt tr.chrow td{background:none;padding:0}}
.home-ch{font-weight:800;font-size:15px;margin:18px 0 8px;padding-bottom:4px;border-bottom:2px solid var(--ink)}
.home-ch small{font-weight:400;color:var(--muted);margin-left:6px}
'''
s = s.replace('.end{margin-top:48px', css + '.end{margin-top:48px', 1)

# ---------- H. 앱 스크립트 교체 ----------
a = s.rindex('<script>'); b = s.rindex('</script>') + len('</script>')
app = r'''<script>
(() => {
  const wrap = document.querySelector('.wrap');
  if (!wrap) return;
  const secs = [...document.querySelectorAll('section.type')];
  const NAMES = secs.map(sec => ({ id: sec.id, ch: sec.dataset.ch, no: sec.querySelector('.type-head .no').textContent.replace('유형 ', ''), name: sec.querySelector('.type-head h2').textContent, pts: (sec.querySelector('.type-head .pts') || {}).textContent || '', n: sec.querySelectorAll(':scope > .card').length, gen: !!sec.querySelector(':scope > .gen') }));
  const CH = { 'Ⅰ': '센서의 기초', 'Ⅱ': '가스센서', 'Ⅲ': '자기센서', 'Ⅳ': '속도센서 · 금속탐지기', 'Ⅴ': '가속도 · 진동센서' };
  document.body.classList.add('app');

  const mk = (id, el) => { const v = document.createElement('div'); v.className = 'view info'; v.id = id; if (el) v.appendChild(el); return v; };
  const vTrig = mk('v-trig', document.querySelector('.trig'));
  const vRules = mk('v-rules', document.querySelector('.rules'));
  const kb = document.querySelector('details.calc-basic'); if (kb) kb.open = true;
  const vKeys = mk('v-keys', kb);

  const home = document.createElement('div'); home.className = 'view'; home.id = 'v-home';
  let grid = '';
  for (const ch of Object.keys(CH)) {
    const list = NAMES.filter(t => t.ch === ch);
    if (!list.length) continue;
    grid += `<div class="home-ch">${ch} ${CH[ch]}<small>${list.reduce((a, t) => a + t.n, 0)}문제</small></div><div class="home-grid">` +
      list.map(t => `<button data-go="${t.id}"><span class="no">유형 ${t.no}</span><b>${t.name}</b><span class="sub">${t.n}문제${t.gen ? ' + 새 문제' : ''}${t.pts ? ' · ' + t.pts : ''}</span></button>`).join('') + '</div>';
  }
  home.innerHTML = `<div class="home-links">
      <button data-go="trig">시험지 보자마자 · 첫 생각 표<span>유형 신호 → 바로 떠올릴 것 15줄</span></button>
      <button data-go="rules">풀기 전 원칙 3가지<span>정확도는 입력 기준 · ppm 순서 · 브리지 공식</span></button>
      <button data-go="keys">fx-570ES PLUS 기본 키<span>지수 · π · (2/3)제곱 · S⇔D · 회귀 모드</span></button>
    </div>${grid}`;
  const h1 = wrap.querySelector('h1');
  h1.after(home); home.prepend(h1);
  const end = wrap.querySelector('.end'); if (end) home.appendChild(end);
  [vTrig, vRules, vKeys].forEach(v => wrap.insertBefore(v, secs[0]));
  secs.forEach(sec => sec.classList.add('view'));

  const bar = document.createElement('div'); bar.className = 'appbar';
  bar.innerHTML = '<button data-go="home" aria-label="목록으로">← 목록</button><span class="ttl"></span><span class="pos"></span>';
  wrap.prepend(bar);
  const pager = document.createElement('div'); pager.className = 'pager';
  pager.innerHTML = '<button data-nav="-1">‹ 이전</button><div class="dots"></div><button data-nav="1">다음 ›</button>';
  document.body.appendChild(pager);

  const pages = sec => [...sec.querySelectorAll(':scope > .card, :scope > .gen')];
  let cur = { view: 'home', i: 0 };
  const save = () => { try { localStorage.setItem('sm-pos', JSON.stringify(cur)); } catch (e) {} };
  const sib = (view, dir) => { const k = NAMES.findIndex(t => t.id === view); const t = NAMES[k + dir]; return t && t.ch === NAMES[k].ch ? t.id : null; };

  function show(view, i = 0, push = true) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('on'));
    const sec = document.getElementById(view);
    const titles = { home: '센서 및 응용 문제집', trig: '첫 생각 표', rules: '풀기 전 원칙', keys: '계산기 기본 키' };
    let el = view === 'home' ? home : view === 'trig' ? vTrig : view === 'rules' ? vRules : view === 'keys' ? vKeys : sec;
    if (!el) { el = home; view = 'home'; }
    el.classList.add('on');
    bar.style.display = view === 'home' ? 'none' : '';
    if (el.tagName === 'SECTION') {
      const ps = pages(el); i = Math.max(0, Math.min(i, ps.length - 1));
      ps.forEach((p, k) => p.classList.toggle('cur', k === i));
      const t = NAMES.find(n => n.id === view);
      const p = ps[i];
      const label = p.classList.contains('gen') ? '새 문제' : (p.querySelector('.card-top .id') || {}).textContent;
      bar.querySelector('.ttl').textContent = `${t.ch} ${t.no}. ${t.name}`;
      bar.querySelector('.pos').textContent = `${label} · ${i + 1}/${ps.length}`;
      pager.style.display = '';
      const prev = pager.querySelector('[data-nav="-1"]'), next = pager.querySelector('[data-nav="1"]');
      prev.disabled = i === 0 && !sib(view, -1);
      prev.textContent = i === 0 && sib(view, -1) ? '‹ 이전 유형' : '‹ 이전';
      next.disabled = i === ps.length - 1 && !sib(view, 1);
      next.textContent = i === ps.length - 1 ? (sib(view, 1) ? '다음 유형 ›' : '다음 ›') : '다음 ›';
      pager.querySelector('.dots').innerHTML = ps.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
    } else {
      bar.querySelector('.ttl').textContent = titles[view];
      bar.querySelector('.pos').textContent = '';
      pager.style.display = 'none';
    }
    cur = { view, i }; save();
    const hash = el.tagName === 'SECTION' ? `#${view}-${i + 1}` : `#${view}`;
    if (push) history.pushState(cur, '', hash); else history.replaceState(cur, '', hash);
    window.scrollTo(0, 0);
  }
  function step(dir) {
    const sec = document.getElementById(cur.view); if (!sec) return;
    const n = pages(sec).length, j = cur.i + dir;
    if (j >= 0 && j < n) return show(cur.view, j);
    const nx = sib(cur.view, dir); if (!nx) return;
    show(nx, dir > 0 ? 0 : pages(document.getElementById(nx)).length - 1);
  }
  function fromHash(h, push) {
    h = (h || '').replace('#', ''); let m;
    if (!h) return false;
    if ((m = h.match(/^(t\d+)(?:-(\d+))?$/))) { show(m[1], m[2] ? +m[2] - 1 : 0, push); return true; }
    if ((m = h.match(/^c(\d+-[A-E])$/))) { const card = document.getElementById(h); if (!card) return false; const sec = card.closest('section.type'); show(sec.id, pages(sec).indexOf(card), push); return true; }
    if (['home', 'trig', 'rules', 'keys'].includes(h)) { show(h, 0, push); return true; }
    return false;
  }
  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); show(go.dataset.go, 0); return; }
    const nav = e.target.closest('[data-nav]');
    if (nav) { step(+nav.dataset.nav); return; }
    const a = e.target.closest('a[href^="#"]');
    if (a) { const ok = fromHash(a.getAttribute('href'), true); if (ok) e.preventDefault(); }
  });
  window.addEventListener('popstate', () => { if (!fromHash(location.hash, false)) show('home', 0, false); });
  let sx = null, sy = null, ok = false;
  document.addEventListener('touchstart', e => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; ok = !e.target.closest('.fig, .tw, .eqn, .given, input, textarea, .krow .kk, .mx'); }, { passive: true });
  document.addEventListener('touchend', e => {
    if (sx === null || !ok) return; const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8 && document.getElementById(cur.view)) step(dx < 0 ? 1 : -1);
  }, { passive: true });
  if (!fromHash(location.hash, false)) {
    let saved = null; try { saved = JSON.parse(localStorage.getItem('sm-pos') || 'null'); } catch (e) {}
    show(saved && saved.view && document.getElementById(saved.view) ? saved.view : 'home', saved ? saved.i : 0, false);
  }
})();
</script>'''
s = s[:a] + app + s[b:]
s = s.replace('<p class="lead">작년 중간고사와 HW1·HW2를 원본 그대로 다시 풀고, 같은 구조로 숫자·조건만 바꾼 유사 문제로 한 번 더 풀어 보는 문제집이에요. 계산기를 옆에 두고 시험처럼 푸세요.</p>',
              '<p class="lead">시험 범위 5개 센서별로 작년 중간고사·HW1·HW2 원본, 유사·새 숫자 문제, 강의 범위 서술형을 묶은 문제집이에요. 계산기를 옆에 두고 시험처럼 푸세요.</p>')
open('/home/claude/wb/index.html', 'w').write(s)
print('sections', len(re.findall(r'<section class="type"', s)), 'cards', len(re.findall(r'<div class="card" id="c', s)))
