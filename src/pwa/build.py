s=open('../wb/index.html').read()
t_end=s.index('</title>')+len('</title>')
title=s[:t_end]; st_a=s.index('<style>'); st_b=s.index('</style>')+len('</style>')
links=s[t_end:st_a]; style=s[st_a:st_b]; body=s[st_b:]
head='''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
'''+title+'''
<meta name="description" content="센서 및 응용 중간고사 대비 · 작년 기출·HW1·HW2 유형별 문제집">
<meta name="theme-color" content="#1f7a4d">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="센서 문제집">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
'''
out=head+links.strip()+'\n'+style.replace('<style>','<style>\nhtml{-webkit-text-size-adjust:100%}\nbody{margin:0;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}\n',1)+'\n</head>\n<body>\n'+body+'''
<script>
if ('serviceWorker' in navigator) { window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {})); }
</script>
</body>
</html>
'''
open('./index.html','w').write(out)
import re
sw=open('./sw.js').read()
v=int(re.search(r'sensor-midterm-v(\d+)',sw).group(1))+1
open('./sw.js','w').write(re.sub(r'sensor-midterm-v\d+',f'sensor-midterm-v{v}',sw))
print('cache v',v)
