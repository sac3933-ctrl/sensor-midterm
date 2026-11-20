/* 최신 보충 add-on — window.LATEST = { asof, slides:{ "s4":{items:[{h,b}], src:[[url,label]]} } } */
(function(){
  const D = window.LATEST; if (!D || !D.slides) return;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const tag = h => h.replace(/\[(AI 보충|추정|현업)([^\]]*)\]/g, (m,a,b) => `<span class="lat-tag lat-t-${a==="추정"?"g":a==="현업"?"h":"ai"}">${a}${b}</span>`);
  function block(id, d){
    const wrap = document.createElement("div");
    wrap.className = "lat-wrap"; wrap.dataset.lat = id;
    const items = d.items.map(it => `<div class="lat-it"><div class="lat-h">${esc(it.h)}</div><div class="lat-b">${tag(it.b)}</div></div>`).join("");
    const src = (d.src||[]).map(([u,t]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join("");
    wrap.innerHTML = `<div class="lat-grp">최신 보충</div><details class="lat-sec"><summary>🆕 최신 보충 — ${esc(D.asof)} 기준 웹 자료</summary><div class="lat-body">${items}<p class="lat-note">강의 슬라이드 이후 바뀐 내용이에요. 시험에서는 슬라이드 표현을 따르세요.</p>${src?`<div class="lat-src"><b>출처</b><ul>${src}</ul></div>`:""}</div></details>`;
    return wrap;
  }
  function place(){
    for (const id in D.slides){
      const sec = document.getElementById(id); if (!sec) continue;
      if (sec.querySelector(`:scope > .lat-wrap[data-lat="${id}"]`)) continue;
      const b = block(id, D.slides[id]);
      const anchor = sec.querySelector(":scope > .marks");
      anchor ? sec.insertBefore(b, anchor) : sec.appendChild(b);
    }
  }
  function start(){
    place();
    // 노트 스크립트가 슬라이드를 다시 그리면 다시 넣기
    let t; new MutationObserver(() => { clearTimeout(t); t = setTimeout(place, 120); })
      .observe(document.body, {childList:true, subtree:true});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
