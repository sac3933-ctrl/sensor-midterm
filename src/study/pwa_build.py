# 센서 핵심노트 → GitHub Pages PWA (루트) + 옛 중간고사 문제집(/midterm/)
import re, os, shutil
R='/home/claude/sensor-midterm'
s=open('/home/claude/study/index.html').read()
t_end=s.index('</title>')+len('</title>')
title=s[:t_end]; st_a=s.index('<style>'); st_b=s.index('</style>')+len('</style>')
links=s[t_end:st_a].replace('<meta name="claude:viewport-fit-sides" content="cover">',''); style=s[st_a:st_b]; body=s[st_b:]
head='''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
'''+title+'''
<meta name="description" content="센서 및 응용 · 나만의 학습 바이블 — 용어·단위·공식·계산기·문제·암기 카드">
<meta name="theme-color" content="#1f7a4d">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="센서노트">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
'''
out=head+links.strip()+'\n'+style.replace('<style>','<style>\nhtml{-webkit-text-size-adjust:100%}\n',1)+'\n</head>\n<body>\n'+body+'''
<script>
if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {})); }
</script>
</body>
</html>
'''
open(R+'/index.html','w').write(out)
# service worker 캐시 버전 올리기
sw=open(R+'/sw.js').read()
m=re.search(r"const CACHE = '([a-z-]+)-v(\d+)'",sw)
v=int(m.group(2))+1 if m.group(1)=='sensor-note' else 1
sw=re.sub(r"const CACHE = '[a-z-]+-v\d+'",f"const CACHE = 'sensor-note-v{v}'",sw)
open(R+'/sw.js','w').write(sw)
# 빌드 소스 보존
dst=R+'/src/study'; shutil.rmtree(dst,ignore_errors=True); os.makedirs(dst+'/parts')
for f in ['core.html','build.py','mt_build.py','PROGRESS.md','pwa_build.py']:
    if os.path.exists('/home/claude/study/'+f): shutil.copy('/home/claude/study/'+f,dst)
for f in os.listdir('/home/claude/study/parts'): shutil.copy('/home/claude/study/parts/'+f,dst+'/parts')
print('built index',len(out),'cache v',v)
