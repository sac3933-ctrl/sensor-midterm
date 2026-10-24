# -*- coding: utf-8 -*-
s=open('index.html').read()
css=r'''
/* ===== 앱 모드: 한 화면에 한 문제 ===== */
.appbar{display:none}
body.app nav.toc,body.app .meta,body.app .lead{display:none}
body.app .wrap{padding-block:0 96px}
body.app .view{display:none}
body.app .view.on{display:block}
body.app .appbar{display:flex;position:sticky;top:env(safe-area-inset-top,0px);z-index:20;background:var(--paper);border-bottom:2px solid var(--ink);margin:0 -16px 12px;padding:10px 12px;align-items:center;gap:8px}
.appbar button{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px;padding:6px 12px;font-weight:700;cursor:pointer}
.appbar .ttl{flex:1;min-width:0;font-weight:800;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.appbar .pos{font-family:var(--f-mono);font-size:13px;color:var(--muted)}
body.app section.type{margin-top:0}
body.app section.type .type-head{display:none}
body.app section.type .why{margin:0 0 10px;font-size:13.5px}
body.app section.type > .card, body.app section.type > .gen{display:none;margin-bottom:0}
body.app section.type > .card.cur, body.app section.type > .gen.cur{display:block}
.pager{display:none}
body.app .pager{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--card);border-top:2px solid var(--ink);padding:8px 12px calc(8px + env(safe-area-inset-bottom,0px));gap:8px;align-items:center}
.pager button{flex:1;font:inherit;font-weight:800;font-size:16px;border:0;border-radius:10px;padding:13px 6px;background:var(--ans);color:var(--card);cursor:pointer}
.pager button:disabled{opacity:.3}
.pager .dots{display:flex;gap:5px;justify-content:center;flex:0 0 auto;max-width:44%;flex-wrap:wrap}
.pager .dots i{width:8px;height:8px;border-radius:50%;background:var(--line)}
.pager .dots i.on{background:var(--ink)}
.home-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}
.home-grid button{font:inherit;text-align:left;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:10px;padding:12px;cursor:pointer;display:flex;flex-direction:column;gap:2px;min-width:0}
.home-grid button b{font-size:15px;line-height:1.35}
.home-grid button .no{font-family:var(--f-mono);font-size:12px;font-weight:700;color:var(--ans)}
.home-grid button .sub{font-size:12px;color:var(--muted)}
.home-links{display:flex;flex-direction:column;gap:8px;margin:6px 0 14px}
.home-links button{font:inherit;font-weight:700;text-align:left;border:2px solid var(--ans);background:var(--ans-soft);color:var(--ink);border-radius:10px;padding:12px 14px;cursor:pointer}
.home-links button span{display:block;font-weight:400;font-size:12.5px;color:var(--muted)}
body:not(.app) .home-only{display:none}
body.app .view.info .trig,body.app .view.info .rules,body.app .view.info details.calc-basic{margin-top:0}
@media (min-width:700px){.home-grid{grid-template-columns:repeat(3,1fr)}}
'''
s=s.replace('.end{margin-top:48px', css+'.end{margin-top:48px',1)

js=r'''
<script>
(() => {
  const wrap = document.querySelector('.wrap');
  if (!wrap) return;
  const secs = [...document.querySelectorAll('section.type')];
  const NAMES = secs.map(sec => ({ id: sec.id, no: sec.querySelector('.type-head .no').textContent.replace('유형 ', ''), name: sec.querySelector('.type-head h2').textContent, pts: (sec.querySelector('.type-head .pts') || {}).textContent || '', n: sec.querySelectorAll(':scope > .card').length, gen: !!sec.querySelector(':scope > .gen') }));
  document.body.classList.add('app');

  /* 정보 화면 3개: 첫 생각 표 / 풀기 전 원칙 / 계산기 기본 키 */
  const mk = (id, el) => { const v = document.createElement('div'); v.className = 'view info'; v.id = id; if (el) v.appendChild(el); return v; };
  const vTrig = mk('v-trig', document.querySelector('.trig'));
  const vRules = mk('v-rules', document.querySelector('.rules'));
  const kb = document.querySelector('details.calc-basic'); if (kb) kb.open = true;
  const vKeys = mk('v-keys', kb);

  /* 홈 */
  const home = document.createElement('div'); home.className = 'view'; home.id = 'v-home';
  home.innerHTML = `<div class="home-links">
      <button data-go="trig">시험지 보자마자 · 첫 생각 표<span>유형 신호 → 바로 떠올릴 것 10줄</span></button>
      <button data-go="rules">풀기 전 원칙 3가지<span>정확도는 입력 기준 · ppm 순서 · 브리지 중점</span></button>
      <button data-go="keys">fx-570ES PLUS 기본 키<span>지수 · π · (2/3)제곱 · S⇔D · 회귀 모드</span></button>
    </div>
    <div class="home-grid">${NAMES.map(t => `<button data-go="${t.id}"><span class="no">유형 ${t.no}</span><b>${t.name}</b><span class="sub">${t.n}문제${t.gen ? ' + 새 문제' : ''}${t.pts ? ' · ' + t.pts : ''}</span></button>`).join('')}</div>`;
  const h1 = wrap.querySelector('h1');
  h1.after(home);
  home.prepend(h1);
  const end = wrap.querySelector('.end'); if (end) home.appendChild(end);
  [vTrig, vRules, vKeys].forEach(v => wrap.insertBefore(v, secs[0]));
  secs.forEach(sec => sec.classList.add('view'));

  /* 상단바 + 하단 넘김 */
  const bar = document.createElement('div'); bar.className = 'appbar';
  bar.innerHTML = '<button data-go="home" aria-label="목록으로">← 목록</button><span class="ttl"></span><span class="pos"></span>';
  wrap.prepend(bar);
  const pager = document.createElement('div'); pager.className = 'pager';
  pager.innerHTML = '<button data-nav="-1">‹ 이전</button><div class="dots"></div><button data-nav="1">다음 ›</button>';
  document.body.appendChild(pager);

  const pages = sec => [...sec.querySelectorAll(':scope > .card, :scope > .gen')];
  let cur = { view: 'home', i: 0 };
  const save = () => { try { localStorage.setItem('sm-pos', JSON.stringify(cur)); } catch (e) {} };

  function show(view, i = 0, push = true) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('on'));
    const sec = document.getElementById(view);
    const titles = { home: '센서 및 응용 문제집', trig: '첫 생각 표', rules: '풀기 전 원칙', keys: '계산기 기본 키' };
    let el = view === 'home' ? home : view === 'trig' ? vTrig : view === 'rules' ? vRules : view === 'keys' ? vKeys : sec;
    if (!el) { el = home; view = 'home'; }
    el.classList.add('on');
    bar.querySelector('button').style.visibility = view === 'home' ? 'hidden' : 'visible';
    if (el.tagName === 'SECTION') {
      const ps = pages(el); i = Math.max(0, Math.min(i, ps.length - 1));
      ps.forEach((p, k) => p.classList.toggle('cur', k === i));
      const t = NAMES.find(n => n.id === view);
      const p = ps[i];
      const label = p.classList.contains('gen') ? '새 문제' : (p.querySelector('.card-top .id') || {}).textContent;
      bar.querySelector('.ttl').textContent = `${t.no}. ${t.name}`;
      bar.querySelector('.pos').textContent = `${label} · ${i + 1}/${ps.length}`;
      pager.style.display = '';
      pager.querySelector('[data-nav="-1"]').disabled = i === 0;
      pager.querySelector('[data-nav="1"]').disabled = i === ps.length - 1;
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
  function fromHash(h, push) {
    h = (h || '').replace('#', '');
    let m;
    if (!h) return false;
    if ((m = h.match(/^(t\d+)(?:-(\d+))?$/))) { show(m[1], m[2] ? +m[2] - 1 : 0, push); return true; }
    if ((m = h.match(/^c(\d+-[A-D])$/))) {
      const card = document.getElementById(h); if (!card) return false;
      const sec = card.closest('section.type'); show(sec.id, pages(sec).indexOf(card), push); return true;
    }
    if (['home', 'trig', 'rules', 'keys'].includes(h)) { show(h, 0, push); return true; }
    return false;
  }

  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go) { e.preventDefault(); show(go.dataset.go, 0); return; }
    const nav = e.target.closest('[data-nav]');
    if (nav) { const sec = document.getElementById(cur.view); if (sec) show(cur.view, cur.i + +nav.dataset.nav); return; }
    const a = e.target.closest('a[href^="#"]');
    if (a) { const ok = fromHash(a.getAttribute('href'), true); if (ok) e.preventDefault(); }
  });
  window.addEventListener('popstate', ev => { if (!fromHash(location.hash, false)) show('home', 0, false); });

  /* 좌우로 밀어서 넘기기 (그림·표·코드 가로 스크롤 영역은 제외) */
  let sx = null, sy = null, ok = false;
  document.addEventListener('touchstart', e => { const t = e.touches[0]; sx = t.clientX; sy = t.clientY; ok = !e.target.closest('.fig, .tw, .eqn, .given, input, textarea, .krow .kk'); }, { passive: true });
  document.addEventListener('touchend', e => {
    if (sx === null || !ok) return; const t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; sx = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8 && document.getElementById(cur.view)) show(cur.view, cur.i + (dx < 0 ? 1 : -1));
  }, { passive: true });

  if (!fromHash(location.hash, false)) {
    let saved = null; try { saved = JSON.parse(localStorage.getItem('sm-pos') || 'null'); } catch (e) {}
    show(saved && saved.view ? saved.view : 'home', saved ? saved.i : 0, false);
  }
})();
</script>
'''
# insert after the last </script> of the main page script
i=s.rindex('</script>')+len('</script>')
s=s[:i]+js+s[i:]
open('index.html','w').write(s)
print('ok')
