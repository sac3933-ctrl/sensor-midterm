# -*- coding: utf-8 -*-
import re
exec(open('deep_d.py').read()); exec(open('meta.py').read()); exec(open('meta2.py').read()); exec(open('exam_lines.py').read()); exec(open('deep_lsq.py').read())
s=open('index.html').read()
def build(cid):
    m=M[cid]
    f=''.join(f'<div class="frow"><span class="fl">{x[0]}</span><span class="fe">{x[1]}</span>' + (f'<span class="fs">이 문제: {x[2]}</span>' if len(x)>2 and x[2] else '') + '</div>' for x in F2.get(cid, m['F']))
    srcs=''.join(f'<li><b>{a}</b> {b} · {c}</li>' for a,b,c in m['S'])
    flow=''.join(f'<li>{x}</li>' for x in m['L'])
    ans=''.join(f'<li>{x}</li>' for x in m['A'])
    return (f'<div class="dsec"><div class="dh"><span>1</span>이 공식에 숫자만 넣으면 돼요</div><div class="fbox">{f}</div>'
            f'<div class="srcbox"><b>강의자료 위치</b><ul>{srcs}</ul></div></div>'
            f'<div class="dsec"><div class="dh"><span>2</span>풀이 순서 (이 순서대로만)</div><ol class="flow">{flow}</ol></div>'
            f'<div class="dsec"><div class="dh"><span>3</span>차근차근 풀이 (처음 보는 사람용)</div>{D[cid]}</div>'
            f'<div class="dsec"><div class="dh"><span>4</span>답안지에 이렇게 쓰세요 · 시험용 짧은 버전</div>' + ''.join(f'<div class="xline"><b>{a}</b><q>{b}</q></div>' for a,b in X.get(cid, [])) + f'<ul class="final-list">{ans}</ul></div>')
n=0
for cid in M:
    m=re.search(r'<span class="id">'+re.escape(cid)+r'</span>', s)
    a=s.index('<details class="deep">', m.end())
    b=s.index('</div></details>', a)+len('</div></details>')
    s=s[:a]+f'<details class="deep"><summary>풀이 보기 · 공식 → 순서 → 차근차근 → 답안지 문장</summary><div class="dbody">{build(cid)}</div></details>'+s[b:]
    n+=1
css='''
.dsec{margin-top:14px}
.dh{display:flex;align-items:center;gap:8px;font-weight:800;font-size:15px;margin:18px 0 8px}
.dh span{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:var(--ink);color:var(--paper);font-family:var(--f-mono);font-size:12px}
.fbox{border:2px solid var(--ans);border-radius:6px;padding:6px 12px;background:var(--ans-soft)}
.frow{display:grid;grid-template-columns:minmax(110px,auto) 1fr;gap:4px 12px;padding:7px 0;border-bottom:1px dashed var(--line);align-items:baseline}
.frow:last-child{border-bottom:0}
.frow .fl{font-size:13px;font-weight:700;color:var(--muted)}
.frow .fs{grid-column:2;font-family:var(--f-mono);font-size:13px;color:var(--hint)}
@media (max-width:520px){.frow .fs{grid-column:1}}
.frow .fe{font-family:var(--f-mono);font-size:14.5px;font-weight:600;min-width:0;overflow-wrap:anywhere}
@media (max-width:520px){.frow{grid-template-columns:1fr}}
.srcbox{margin-top:10px;font-size:13.5px;border-left:3px solid var(--svg-soft);padding:4px 12px}
.srcbox ul{margin:4px 0 0;padding-left:18px}
.srcbox li{margin:2px 0}
ol.flow{margin:0;padding-left:22px;display:flex;flex-direction:column;gap:4px;counter-reset:none}
ol.flow li::marker{font-weight:700;color:var(--ans)}
div.xline{display:flex;flex-direction:column;gap:2px;margin:0 0 10px;padding:8px 12px;border-left:3px solid var(--ink);background:var(--card);border-radius:0 6px 6px 0}
div.xline b{font-size:12px;color:var(--muted)}
div.xline q{quotes:none;font-weight:600;line-height:1.6}
ul.final-list{margin:0;padding:10px 14px 10px 32px;border:2px solid var(--ink);border-radius:6px;font-weight:600;display:flex;flex-direction:column;gap:4px}
'''
if '.dsec{' not in s: s=s.replace('.end{margin-top:48px', css+'.end{margin-top:48px',1)
open('index.html','w').write(s); print(n)
