const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const html = require('fs').readFileSync('index.html','utf8');
  const p = await b.newPage();
  await p.setContent(`<!doctype html><html><head><meta charset=utf8></head><body>${html}</body></html>`);
  const r = await p.evaluate(()=>{ const out=[]; for (const g of ['1','2','3','4','5','6','8','9','12','15']) { const btn=document.querySelector(`[data-gen="${g}"]`); for(let i=0;i<400;i++){ btn.click(); const t=document.querySelector(`#g${g} .out`).textContent; if(/NaN|undefined|Infinity/.test(t)){out.push(g+': '+t.slice(0,300)); break;} } } return out; });
  console.log(r.join('\n')); await b.close();
})();
