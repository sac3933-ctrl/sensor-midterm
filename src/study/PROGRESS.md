# 센서 핵심노트 — 최종본 작업 메모 (컴팩션 대비)

## 빌드
- 원본: study/core.html (앱 코어, `/*@@CHAPTERS@@*/` 자리에 장 파일이 들어감)
- 장 파일: study/parts/ch_*.js (이름순으로 삽입), 기출 이식: parts/ch_00mt.js (생성: mt_build.py)
- 빌드: `python3 study/build.py` → study/index.html (+ 문법 검사)
- 미리보기 발행: Artifact file_path=/home/claude/study/index.html (URL https://claude.ai/artifact/SqMoXtnKYFAiXWLZTGVNWm)
- 최종 배포: GitHub sac3933-ctrl/sensor-midterm (루트 = 새 앱 PWA, /midterm/ = 옛 문제집). /home/claude/pwa/build.py 참고해 PWA 래핑.

## 장 파일 규칙
- PAGES[id]={title,part:'제N편 M장',secs:[{k,h,b,easy,src}]} — b는 md 표기: [[term|글자]] 용어, {{unit}} 단위
- 문제 장: {k:'문제',h:'',b:'__PROBS__'} + PSET[id]=[[gen,base?],...]; TOPICS[id]={name,g:[...]}; BASICG.add('gen') for 유사형
- 기출 장: {k:'기출·숙제',h:'',b:'__MT:t4,t5__'} (옛 문제집 섹션 그대로)
- GEN[name](base) → {kind,title,fig?,q,first[],steps[{h,b}],ans,ansRead,calc:calcBlock(rows,warns),easy,more?}
- 그림: FIG.x() → svgFig(w,h,inner,label,cap); 움직이는 그림: ANIM.x(host) + 본문 <div data-anim="x"></div>
- TERM[k]={ko,en,gen,tech,easy}; UNIT[k]={s,r,mean}; FORM.push({eq,read,name,page,sec,syms}); CARDS.push({id,tag,f,a,r,e})
- 주차 표시 금지(Week 번호 X). 강의자료 원문은 src에 【 】. 강의자료에 없는 내용은 [AI 보충], 불확실은 (추정)
- 0편 2~5, 1편 1~3, 2편 1·3·4·6, 3편 1~4·7~10, 4편 1~2 채울 것

## 진행 상황
- [x] 전 범위 26장 완성 (0편 5 · 1편 3 · 2편 6 · 3편 10 · 4편 2) — 2026-10-25
- [x] 기출 t1~t15 모두 각 장에 배치 (t2 → circuit)
- [x] 회로 기호 사전(ch_01a_sym.js: 사전›기호, 부록 D, 0편 4장·광학·온도·근접에 일부)
- [x] 화면 모드 설정(기본 다크): 헤더 ☾ 버튼 순환 + 홈 「설정」 카드, LS skn-theme, THEME 객체
- [x] SI 접두어 24개 전체(접기) + 단위 연습 time 그룹(ms~fs, kB~PB)·mag에 nT·fT·fc에 GHz·THz
- [x] 연습 중 「📋 단위표」 시트(cheatSheet): 현재 범위 단위 + 접두어 + 규칙, 문제 상태 유지
- [x] 배포: sensor-midterm 루트 = 새 앱(PWA, 캐시 sensor-note-vN), /midterm/ = 옛 문제집
- 재배포: python3 build.py → python3 pwa_build.py → sensor-midterm에서 commit/push
- 테스트: scratchpad tch.js(장·생성기), stf.js(홈·사전·연습·검색) — srv는 8765 포트
