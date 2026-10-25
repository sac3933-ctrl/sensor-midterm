import glob,subprocess,sys,os
os.chdir('/home/claude/study')
core=open('core.html').read()
parts=''.join(open(f).read()+'\n' for f in sorted(glob.glob('parts/ch_*.js')))
out=core.replace('/*@@CHAPTERS@@*/',parts)
open('index.html','w').write(out)
r=subprocess.run(['node','-e',"const s=require('fs').readFileSync('/home/claude/study/index.html','utf8');const ms=[...s.matchAll(/<script>([\\s\\S]*?)<\\/script>/g)];try{ms.forEach(m=>new Function(m[1]));console.log('syntax ok',s.length)}catch(e){console.log('SYNTAX',e.message);process.exit(1)}"],capture_output=True,text=True)
print(r.stdout.strip(),r.stderr.strip()[:500])
