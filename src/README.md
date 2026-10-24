# 문제집 소스 (빌드 파이프라인)

- `wb/index.html` — 문제집 본문(PWA 래핑 전). 이 파일을 수정한 뒤 `pwa/build.py`로 루트 `index.html`·`sw.js` 생성.
- `wb/*.py` — 카드별 데이터(카드 id 기준: 1-A … 15-D)
  - `deep_d.py` D: 상세 풀이 / `meta.py` M: 공식·출처·흐름·정답 / `meta2.py` F2: 대입 공식
  - `exam_lines.py` X: 답안지 문장 / `deep_lsq.py`: 최소제곱 행렬 풀이 / `calc.py`, `calc2.py`: 계산기 키 순서
  - `essays.py` E: 서술형 17문제 / `rebuild_deep.py`: 위 데이터로 `<details class="deep">` 재생성
  - `restructure.py`: 5챕터(15유형) 재구성 스크립트(이미 적용됨, 다시 실행하지 말 것)
- `wb/gen.js` — 새 문제 생성기(G[1,2,3,4,5,6,8,9,12,15]) 원본
- 테스트: `node g7.js`(생성기 400회 NaN 검사), `node appt.js`(폰 내비게이션). Playwright + /opt/pw-browsers/chromium.
- 배포: `python3 pwa/build.py` → 루트 index.html·sw.js 복사 → push (GitHub Pages: main / root)
