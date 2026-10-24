const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const html = require('fs').readFileSync('index.html','utf8');
  const p = await b.newPage({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true });
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.setContent(`<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1"></head><body>${html}</body></html>`);
  await p.screenshot({path:'a1.png'});
  await p.click('[data-go="t5"]'); await p.screenshot({path:'a2.png'});
  await p.click('[data-nav="1"]'); await p.click('[data-nav="1"]');
  console.log(await p.$eval('.appbar .pos',e=>e.textContent));
  // go to last (gen)
  for(let i=0;i<6;i++) { const d=await p.$eval('[data-nav="1"]',e=>e.disabled); if(!d) await p.click('[data-nav="1"]'); }
  console.log(await p.$eval('.appbar .pos',e=>e.textContent));
  await p.click('[data-gen="5"]'); await p.screenshot({path:'a3.png'});
  await p.click('.out a[href^="#c"]').catch(()=>{}); 
  await p.click('details >> nth=0').catch(()=>{});
  // open answer then the deep link
  await p.evaluate(()=>{const d=document.querySelector('.view.on .gen.cur details'); if(d) d.open=true;});
  await p.click('.view.on .gen.cur .out a').catch(e=>console.log('nolink'));
  console.log('after link', await p.$eval('.appbar .pos',e=>e.textContent));
  await p.click('[data-go="home"]'); await p.click('[data-go="trig"]'); await p.screenshot({path:'a4.png'});
  console.log('w',await p.evaluate(()=>document.documentElement.scrollWidth),'errs',errs);
  await b.close();
})();
