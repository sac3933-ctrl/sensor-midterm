import re,json
src=open('/home/claude/wb/index.html').read()
# 1) CSS
css=re.search(r'<style>(.*?)</style>',src,re.S).group(1)
css=re.sub(r'/\*.*?\*/','',css,flags=re.S)
def parse(block):
    out=[];i=0;n=len(block)
    while i<n:
        j=block.find('{',i)
        if j<0:break
        sel=block[i:j].strip()
        # find matching brace
        d=0;k=j
        while k<n:
            if block[k]=='{':d+=1
            elif block[k]=='}':
                d-=1
                if d==0:break
            k+=1
        body=block[j+1:k]
        if sel.startswith('@media'):
            inner=parse(body)
            if inner: out.append(sel+'{'+inner+'}')
        elif sel.startswith('@'):
            out.append(sel+'{'+body+'}')
        else:
            sels=[x.strip() for x in sel.split(',')]
            keep=[]
            for x in sels:
                if re.match(r'^(:root|html|body|\*)',x): continue
                keep.append('.mt '+x)
            if keep: out.append(','.join(keep)+'{'+body+'}')
        i=k+1
    return ''.join(out)
pcss=parse(css)
tok='.mt{--paper:var(--bg);--card:var(--surface);--ans:var(--accent);--ans-soft:var(--accent-soft);--hint:var(--warn);--hint-soft:var(--warn-soft);--mark:var(--bad);--mark-soft:var(--bad-soft);--chip:var(--surface2);--svg:var(--ink);--svg-soft:var(--muted);--hot:var(--bad)}'
extra='.mt .card{display:block;gap:0;padding:16px;border-radius:12px}.mt .first{display:block}.mt-h{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;border-bottom:1.5px solid var(--ink);padding-bottom:4px;margin:6px 0 10px}.mt-h b{font-family:var(--f-serif);font-weight:900;font-size:18px}.mt-h span{font-size:12px;color:var(--muted)}'
# 2) sections
secs={}
for m in re.finditer(r'<section class="type" id="(t\d+)"[^>]*>(.*?)\n</section>',src,re.S):
    tid,body=m.group(1),m.group(2)
    h=re.search(r'<div class="type-head"><span class="no">[^<]*</span><h2>(.*?)</h2>(?:<span class="pts">(.*?)</span>)?</div>',body)
    title,pts=h.group(1),(h.group(2) or '')
    body=body.replace(h.group(0),'')
    secs[tid]={'title':title,'pts':pts,'html':body}
assert len(secs)==15,len(secs)
def noweek(s):
    s=re.sub(r'Week\s?\d+\s*(Ch\.\s?\d+\s*)?','',s)
    s=re.sub(r'\bW\d+\s+(?=강의|수업|슬라이드)','',s)
    return s
for v in secs.values():
    v['pts']=noweek(v['pts']).strip(' ·'); v['html']=noweek(v['html'])
# 3) old script (figures + generators); expose renderer
scripts=re.findall(r'<script>(.*?)</script>',src,re.S)
s1=scripts[0]
assert 'renderFigs(document);' in s1
s1=s1.replace('renderFigs(document);','window.__mtRender=renderFigs;')
s1=noweek(s1)
js='/* ───────── 중간고사 기출·숙제 이식 (옛 문제집) ───────── */\n'
js+='const MTH='+json.dumps(secs,ensure_ascii=False)+';\n'
js+='try{document.head.insertAdjacentHTML("beforeend","<style>"+'+json.dumps(tok+pcss+extra,ensure_ascii=False)+'+"</style>")}catch(e){}\n'
js+=s1+'\n'
js+='''function mtHTML(ids){return ids.map(t=>{const m=MTH[t];return m?`<div class="mt"><div class="mt-h"><b>${m.title}</b><span>${m.pts}</span></div>${m.html}</div>`:''}).join('')}\n'''
open('/home/claude/study/parts/ch_00mt.js','w').write(js)
print('ok',{k:v['title'] for k,v in secs.items()}, len(js))
