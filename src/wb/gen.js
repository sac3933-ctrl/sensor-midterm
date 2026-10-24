/* ---------- 계산기 키 표시 ---------- */
const KEYW = new Set(['SHIFT', 'MODE', 'AC', '=', '×10ˣ', '(−)', 'x²', 'x■', '√■', 'π', 'Ans', '→', 'cos', 'tan', 'ENG', 'S⇔D', '(', ')', '+', '−', '×', '÷']);
const kb = str => str.split(' ').filter(Boolean).map(t => /^[\d.]+$/.test(t) ? `<kbd class="n">${t}</kbd>` : `<kbd${KEYW.has(t) ? '' : ' class="w"'}>${t}</kbd>`).join('');
const keysBlock = rows => `<details class="calc-in"><summary>공학용 계산기 입력</summary><div class="kbody">${rows.map(r => `<div class="krow"><div class="kl">${r[0]}</div><div class="kk">${kb(r[1])}</div><div class="kd">${r[2]}</div></div>`).join('')}</div></details>`;
/* 숫자 → 계산기 입력 토큰: 2.4e9 → "2.4 ×10ˣ 9", 1e-6 → "1 ×10ˣ (−) 6" */
const fk = n => {
  if (n === 0) return '0';
  const neg = n < 0 ? '(−) ' : ''; n = Math.abs(n);
  const e = Math.floor(Math.log10(n) + 1e-12);
  if (e >= -2 && e < 5) return neg + String(+n.toPrecision(6));
  const m = +(n / 10 ** e).toPrecision(6);
  return neg + `${m} ×10ˣ ${e < 0 ? '(−) ' + (-e) : e}`;
};

/* ---------- 새 숫자 문제 ---------- */
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const r4 = n => +n.toPrecision(4);
const sup = e => String(e).replace('-', '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
const sci = n => { if (n === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(n)) + 1e-12); if (e >= -2 && e < 5) return String(r4(n)); return (n / 10 ** e).toFixed(2) + '×10' + sup(e); };
const disp = n => { if (n === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(n)) + 1e-12); if (e >= -2 && e < 6) return String(+n.toPrecision(6)); return (n / 10 ** e).toFixed(4).replace(/0+$/, '').replace(/\.$/, '') + '×10' + sup(e); };
const card = (q, ans, steps, deepRef, keys) => `<div class="card" style="margin:10px 0 0">${q}<details><summary>정답 보기</summary><div class="ans"><p class="final">${ans}</p><ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol>${deepRef ? `<p class="one">처음이면 위 <a href="#${deepRef}">${deepRef.slice(1)}의 상세 풀이</a>를 먼저 보세요. 순서가 똑같아요.</p>` : ''}</div></details>${keys ? keysBlock(keys) : ''}</div>`;

const G = {
  1() {
    let P, o;
    for (;;) {
      const x0 = rnd(1, 5), dx = pick([1, 2]), a = rnd(2, 7), b = rnd(-12, 6);
      P = [0, 1, 2].map(i => { const x = x0 + dx * i; return [x, a * x + b + pick([-2, -1, 0, 1, 2])]; });
      const n = 3, sx = P.reduce((s, p) => s + p[0], 0), sy = P.reduce((s, p) => s + p[1], 0), sxx = P.reduce((s, p) => s + p[0] ** 2, 0), sxy = P.reduce((s, p) => s + p[0] * p[1], 0);
      const d = sxx * n - sx * sx, A = (n * sxy - sx * sy) / d, B = (-sx * sxy + sxx * sy) / d;
      const yb = sy / n, res = P.reduce((s, p) => s + (p[1] - A * p[0] - B) ** 2, 0), tot = P.reduce((s, p) => s + (p[1] - yb) ** 2, 0);
      if (res < 1e-9 || P.some(p => p[1] <= 0)) continue;
      const [xm0, ym0] = P[1], xm = (ym0 - B) / A, err = Math.abs(xm - xm0) / xm0 * 100;
      o = { sx, sy, sxx, sxy, d, A, B, R2: 1 - res / tot, res, tot, xm, err, xm0, ym0 }; break;
    }
    const xs = P.map(p => p[0]).join(' = ') + ' =', ys = P.map(p => p[1]).join(' = ') + ' =';
    return card(figTag('plot', { pts: P }) + `<p>측정데이터 ${P.map(p => `(<b class="v">${p[0]}, ${p[1]}</b>)`).join(', ')}</p><ol class="q"><li>y = ax + b</li><li>감도와 R²</li><li>(${o.xm0}, ${o.ym0}) 점의 오차율·정확도</li></ol>`,
      `y = ${r4(o.A)}x ${o.B < 0 ? '−' : '+'} ${r4(Math.abs(o.B))} · 감도 ${r4(o.A)} · R² = ${o.R2.toFixed(4)} · 오차율 ${o.err.toFixed(2)} %, 정확도 ${(100 - o.err).toFixed(2)} %`,
      [`Σx = ${o.sx}, Σx² = ${o.sxx}, Σy = ${o.sy}, Σxy = ${o.sxy}, det = ${o.d}`,
       `a = (3·${o.sxy} − ${o.sx}·${o.sy})/${o.d} = ${r4(o.A)}`,
       `b = (−${o.sx}·${o.sxy} + ${o.sxx}·${o.sy})/${o.d} = ${r4(o.B)}`,
       `SS_res = ${r4(o.res)}, SS_tot = ${r4(o.tot)} → R² = ${o.R2.toFixed(4)}`,
       `${o.ym0} = ${r4(o.A)}x ${o.B < 0 ? '−' : '+'} ${r4(Math.abs(o.B))} → xₘ = ${r4(o.xm)} → |${r4(o.xm)} − ${o.xm0}|/${o.xm0} × 100 = ${o.err.toFixed(2)} %`], 'c1-A',
      [['a (기울기)', `( 3 × ${o.sxy} − ${o.sx} × ${o.sy} ) ÷ ${o.d} =`, disp(o.A)],
       ['b (절편)', `( (−) ${o.sx} × ${o.sxy} + ${o.sxx} × ${o.sy} ) ÷ ${o.d} =`, disp(o.B)],
       ['R²', `1 − ${r4(o.res)} ÷ ${r4(o.tot)} =`, o.R2.toFixed(5)],
       ['읽은 입력 xₘ', `( ${o.ym0} − ${fk(o.B)} ) ÷ ${r4(o.A)} =`, disp(o.xm)],
       ['오차율 %', `( Ans − ${o.xm0} ) ÷ ${o.xm0} × 100 =`, disp((o.xm - o.xm0) / o.xm0 * 100) + ' (음수면 부호만 떼기)'],
       ['STAT 검산 (ES PLUS)', `MODE 3 2 x열: ${xs} y열: ${ys} AC SHIFT 1 5 1 =`, `A = ${disp(o.B)} (절편)`],
       ['', `SHIFT 1 5 2 =`, `B = ${disp(o.A)} (기울기)`]]);
  },
  2() {
    const f = pick([5e8, 1e9, 2e9, 2.4e9]), R = pick([25, 50, 75, 100]), X = pick([-30, -25, -20, -10, -5, 5, 10, 15, 20, 30]);
    const w = 2 * Math.PI * f, mag = Math.hypot(R, X), ind = X < 0;
    const val = ind ? -X / w : 1 / (w * X);
    const zl = `${R} ${X < 0 ? '−' : '+'} j${Math.abs(X)} Ω`;
    const fs = f >= 1e9 ? `${f / 1e9} GHz` : `${f / 1e6} MHz`;
    return card(figTag('imp', { rs: '50 Ω', f: fs, zl }) + `<p>R_S = <b class="v">50 Ω</b>, f₀ = <b class="v">${fs}</b>, Z_L = <b class="v">${zl}</b></p><ol class="q"><li>|Z_L|</li><li>허수부를 없앨 직렬 소자와 값</li><li>허수부를 없앤 뒤 maximum power transfer인가?</li></ol>`,
      `|Z_L| = ${r4(mag)} Ω · ${ind ? `인덕터 L = ${sci(val)} H` : `커패시터 C = ${sci(val)} F`} · ${R === 50 ? '예 (R_L = R_S)' : `아니요 (R_L = ${R} ≠ 50 Ω)`}`,
      [`|Z_L| = √(${R}² + ${Math.abs(X)}²) = ${r4(mag)} Ω`,
       ind ? `−j${-X} → +j${-X} 필요 → 인덕터: ωL = ${-X} → L = ${-X}/(2π × ${sci(f)}) = ${sci(val)} H` : `+j${X} → −j${X} 필요 → 커패시터: 1/(ωC) = ${X} → C = 1/(2π × ${sci(f)} × ${X}) = ${sci(val)} F`,
       R === 50 ? '실수부 50 Ω = R_S → 매칭 완료' : `실수부 ${R} Ω ≠ R_S 50 Ω → 허수부만 없앤 상태`], 'c2-A',
      [['|Z_L|', `√■ ${R} x² + ${Math.abs(X)} x² =`, disp(mag)],
       [ind ? 'L' : 'C', ind ? `${-X} ÷ ( 2 × π × ${fk(f)} ) =` : `1 ÷ ( 2 × π × ${fk(f)} × ${X} ) =`, disp(val)],
       ['단위 읽기', 'ENG', ind ? '×10⁻⁹ = nH' : '×10⁻¹² = pF']]);
  },
  3() {
    const R = pick([100, 150, 200, 500]), V = pick([1, 2, 3, 5]), s = pick([1, 2, 5]) * 1e-3, c = pick([500, 1000, 2000, 5000]);
    const two = Math.random() < 0.35, dR = s * c, Rh = R + dR;
    const va = Rh / (R + Rh) * V, vb = two ? R / (R + Rh) * V : V / 2, vo = va - vb;
    return card(figTag('bridge', { r: [R, R, R, R].map(String), hot: two ? [0, 2] : [2], vin: V + ' V', pol: 'L+' }) + `<p>Pd 4개 모두 <b class="v">${R} Ω</b>, V_in = <b class="v">${V} V</b>, 감도 <b class="v">${sci(s)} Ω/ppm</b>, 수소 <b class="v">${c} ppm</b>. ${two ? '<b>대각선 두 저항(R₁, R₃)</b>이' : '<b>R₃만</b>'} 노출됨.</p><ol class="q"><li>수소 없을 때 V_out</li><li>수소 인가 시 V_out (mV)</li></ol>`,
      `0 V · ${r4(vo * 1000)} mV`,
      [`ΔR = ${c} × ${sci(s)} = ${r4(dR)} Ω → 노출 저항 ${r4(Rh)} Ω`,
       `V_a (R₃ 아래) = ${r4(Rh)}/(${R} + ${r4(Rh)}) × ${V} = ${r4(va)} V`,
       two ? `V_b (R₁ 위) = ${R}/(${r4(Rh)} + ${R}) × ${V} = ${r4(vb)} V` : `V_b = ${R}/${2 * R} × ${V} = ${r4(vb)} V`,
       `V_out = ${r4(vo)} V = ${r4(vo * 1000)} mV`], 'c3-A',
      [['노출 저항', `${R} + ${c} × ${fk(s)} =`, disp(Rh)],
       ['V_out (한 줄)', two ? `${V} × ${r4(Rh)} ÷ ( ${R} + ${r4(Rh)} ) − ${V} × ${R} ÷ ( ${r4(Rh)} + ${R} ) =` : `${V} × ${r4(Rh)} ÷ ( ${R} + ${r4(Rh)} ) − ${V} ÷ 2 =`, disp(vo)],
       ['mV로', 'Ans × 1000 =', disp(vo * 1000)]]);
  },
  4() {
    const V = pick([1, 2, 3, 5]), Rs = pick([100, 200, 500, 1000]), Rl = pick([5, 10, 20, 25, 50]), I4 = pick([1, 2, 4, 5]);
    const tot = Rs + 2 * Rl, I = V / tot, Vs = I * Rs, Vl = I * Rl, err = 2 * Rl / Rs * 100, V4 = I4 * 1e-3 * Rs;
    return card(figTag('wire', { v: V + ' V', i: I4 + ' mA', rs: Rs + ' Ω', rl: Rl + ' Ω' }) + `<p>2선식 전원 <b class="v">${V} V</b>, 센서 <b class="v">${Rs} Ω</b>, 개별 라인 <b class="v">${Rl} Ω</b>. 4선식은 정전류원 <b class="v">${I4} mA</b>, 전압계 입력저항 ∞</p><ol class="q"><li>2선식: 전류, 센서 전압, 라인 하나 전압</li><li>2선식으로 읽은 저항과 오차 %</li><li>4선식: 센서 전압, 전압선 전류, 읽은 저항</li></ol>`,
      `I = ${r4(I * 1000)} mA, 센서 ${r4(Vs)} V, 라인 ${r4(Vl)} V · ${tot} Ω, 오차 ${r4(err)} % · ${r4(V4)} V, 0 A, ${Rs} Ω`,
      [`전체 = ${Rl} + ${Rs} + ${Rl} = ${tot} Ω → I = ${V}/${tot} = ${r4(I * 1000)} mA`,
       `센서 = I × ${Rs} = ${r4(Vs)} V, 라인 = I × ${Rl} = ${r4(Vl)} V (검산: ${r4(Vs)} + 2 × ${r4(Vl)} = ${V} V)`,
       `2선식 읽음 = ${tot} Ω → (${tot} − ${Rs})/${Rs} × 100 = ${r4(err)} %`,
       `4선식: ${I4} mA × ${Rs} = ${r4(V4)} V, 전압선 전류 0 → 강하 0 → ${Rs} Ω`], 'c4-B',
      [['전류 I', `${V} ÷ ( ${Rl} + ${Rs} + ${Rl} ) =`, disp(I)],
       ['센서 전압', `Ans × ${Rs} =`, disp(Vs)],
       ['라인 전압', `${V} ÷ ${tot} × ${Rl} =`, disp(Vl)],
       ['오차 %', `( ${tot} − ${Rs} ) ÷ ${Rs} × 100 =`, disp(err)],
       ['4선식 전압', `${I4} ×10ˣ (−) 3 × ${Rs} =`, disp(V4)]]);
  },
  5() {
    const g = pick([['He', 4], ['H₂', 2], ['Ar', 40], ['N₂', 28], ['CO', 28]]), ppm = pick([1, 2, 3, 5, 10, 20, 50]), L = pick([1, 2, 5]), s = pick([1, 2, 3, 5]);
    const mol = ppm * 1e-6 * L / 22.4, mass = mol * g[1], n = mol * 6e23, dens = n / (L * 1000), surf = Math.pow(dens, 2 / 3), area = (s / 10) ** 2, N = surf * area;
    return card(figTag('box', { gas: g[0] + ' ' + ppm + ' ppm', vol: L + ' L', s: s + ' mm × ' + s + ' mm' }) + `<p><b class="v">${L} L</b> 용기, ${g[0]} <b class="v">${ppm} ppm</b>. M = <b class="v">${g[1]} g/mol</b>, V_m = 22.4 L/mol, N_A = 6×10²³. 바닥 센서 <b class="v">${s} mm × ${s} mm</b></p><ol class="q"><li>몇 %</li><li>총 질량 (g)</li><li>분자(원자) 수</li><li>센서 표면 개수</li></ol>`,
      `${sci(ppm * 1e-4)} % · ${sci(mass)} g · ${sci(n)} 개 · ${sci(N)} 개`,
      [`${ppm} ppm = ${ppm}×10⁻⁶ × 100 % = ${sci(ppm * 1e-4)} %`,
       `몰 = ${ppm}×10⁻⁶ × ${L} L / 22.4 = ${sci(mol)} mol → × ${g[1]} = ${sci(mass)} g`,
       `개수 = ${sci(mol)} × 6×10²³ = ${sci(n)}`,
       `밀도 = ${sci(n)} / ${L * 1000} cm³ = ${sci(dens)} 개/cm³ → ^(2/3) = ${sci(surf)} 개/cm²`,
       `면적 = ${s / 10} cm × ${s / 10} cm = ${r4(area)} cm² → ${sci(N)} 개`], 'c5-A',
      [['%', `${ppm} ×10ˣ (−) 6 × 100 =`, disp(ppm * 1e-4)],
       ['질량 g', `${ppm} ×10ˣ (−) 6 × ${L} ÷ 22.4 × ${g[1]} =`, disp(mass)],
       ['개수', `Ans ÷ ${g[1]} × 6 ×10ˣ 23 =`, disp(n)],
       ['개/cm³', `Ans ÷ ${L * 1000} =`, disp(dens)],
       ['개/cm²', `Ans x■ 2 ÷ 3 → =`, disp(surf)],
       ['표면 개수', `Ans × ${r4(area)} =`, disp(N)]]);
  },
  6() {
    const n = pick([1e21, 2e21, 5e21, 1e22, 2e22, 5e22]), I = pick([0.5, 1, 2, 5]), B = pick([0.05, 0.1, 0.2, 0.5]), t = pick([0.5, 1, 2, 5]);
    const type = pick(['n', 'p']), Ix = pick([1, -1]), Bz = pick([1, -1]);
    const RH = 1 / (n * 1.6e-19), VH = RH * I * 1e-3 * B / (t * 1e-6);
    const Fy = -Ix * Bz, face = Fy > 0 ? '+y' : '−y', other = Fy > 0 ? '−y' : '+y';
    const plusFace = type === 'n' ? other : face;
    return card(figTag('hall', { I: (Ix > 0 ? '+x' : '−x'), B: (Bz > 0 ? '+z' : '−z') }) + `<p><b>${type}형</b> 홀 소자. ${type === 'n' ? 'n' : 'p'} = <b class="v">${sci(n)} m⁻³</b>, I = <b class="v">${I} mA (${Ix > 0 ? '+x' : '−x'} 방향)</b>, B = <b class="v">${B} T (${Bz > 0 ? '+z' : '−z'} 방향)</b>, t = <b class="v">${t} μm</b>, q = 1.6×10⁻¹⁹ C</p><ol class="q"><li>|V_H|</li><li>캐리어가 쌓이는 면과 (+)인 면</li></ol>`,
      `|V_H| = ${r4(VH * 1000)} mV · ${type === 'n' ? '전자' : '정공'}이 ${face}면에 쌓임 → (+)면 = ${plusFace}`,
      [`R_H = 1/(${sci(n)} × 1.6×10⁻¹⁹) = ${sci(RH)} m³/C`,
       `V_H = R_H × ${I}×10⁻³ × ${B} / ${t}×10⁻⁶ = ${r4(VH * 1000)} mV`,
       `${type === 'n' ? `전자 속도 = 전류 반대 = ${Ix > 0 ? '−x' : '+x'}` : `정공 속도 = 전류 방향 = ${Ix > 0 ? '+x' : '−x'}`}`,
       `F = q(v × B) → ${face} 방향 (n형·p형 모두 같은 쪽으로 휨)`,
       `${type === 'n' ? `전자(−)가 ${face}면 → ${face} (−), ${other} (+)` : `정공(+)이 ${face}면 → ${face} (+), ${other} (−)`}`], 'c6-B',
      [['R_H', `1 ÷ ( ${fk(n)} × 1.6 ×10ˣ (−) 19 ) =`, disp(RH)],
       ['V_H (V)', `Ans × ${fk(I * 1e-3)} × ${B} ÷ ${fk(t * 1e-6)} =`, disp(VH)],
       ['mV로', 'Ans × 1000 =', disp(VH * 1000)]]);
  },
  8() {
    const m = pick([2, 3, 4, 5, 8]) * 1e-8, V = pick([1, 1.5, 2, 3]), R = pick([50, 100, 200]), tm = pick([0.5, 1, 2, 5]), Cp = 133;
    const P = V * V / R, E = P * tm * 1e-3, dT = E / (Cp * m);
    return card(`<p>Pt 마이크로히터 질량 m = <b class="v">${sci(m)} kg</b>, C_p = <b class="v">133 J/kg·K</b>, R = <b class="v">${R} Ω</b>, V = <b class="v">${V} V</b>를 <b class="v">${tm} ms</b> 인가. 방열 무시.</p><ol class="q"><li>발열 전력 P</li><li>넣은 에너지</li><li>온도 상승 ΔT</li></ol>`,
      `P = ${sci(P)} W · ${sci(E)} J · ΔT = ${r4(dT)} K`,
      [`P = V²/R = ${V}²/${R} = ${sci(P)} W`, `에너지 = P × t = ${sci(P)} × ${tm}×10⁻³ = ${sci(E)} J`, `ΔT = 에너지/(C_p m) = ${sci(E)}/(133 × ${sci(m)}) = ${r4(dT)} K`], 'c8-C',
      [['P', `${V} x² ÷ ${R} =`, disp(P)], ['에너지', `Ans × ${fk(tm * 1e-3)} =`, disp(E)], ['ΔT', `Ans ÷ ( 133 × ${fk(m)} ) =`, disp(dT)]]);
  },
  9() {
    const Vs = pick([1, 2, 3, 5]), k = pick([1.5, 2, 3, 4, 0.5, 0.25]);
    const ratio = (k - 1) / (k + 1), vo = ratio * Vs;
    const lab = k >= 1 ? `C₁ = ${k}C₂` : `C₂ = ${1 / k}C₁`;
    return card(figTag('acc', { vs: Vs + ' V', c1: k >= 1 ? 'C₁ = ' + k + 'C₂' : 'C₁', c2: k >= 1 ? 'C₂' : 'C₂ = ' + (1 / k) + 'C₁' }) + `<p>V_s = <b class="v">${Vs} V</b> (1 MHz), <b class="v">${lab}</b>. V_o = −V_s + 2V_s·C₁/(C₁+C₂)</p><ol class="q"><li>V_o</li><li>proof mass는 C₁ 쪽과 C₂ 쪽 중 어디로 움직였나?</li></ol>`,
      `V_o = ${r4(vo)} V · ${k > 1 ? 'C₁ 쪽 (C₁ 간격이 좁아짐)' : 'C₂ 쪽 (C₂ 간격이 좁아짐)'}`,
      [`C₂ = 1로 놓으면 C₁ = ${k}`, `(C₁ − C₂)/(C₁ + C₂) = ${r4(k - 1)}/${r4(k + 1)} = ${r4(ratio)}`, `V_o = ${r4(ratio)} × ${Vs} = ${r4(vo)} V`, `C가 커진 쪽 = 간격이 좁아진 쪽 = 움직인 방향`], 'c9-A',
      [['V_o (정리식)', `( ${k} − 1 ) ÷ ( ${k} + 1 ) × ${Vs} =`, disp(vo)],
       ['V_o (기출식 그대로)', `(−) ${Vs} + 2 × ${Vs} × ${k} ÷ ( ${k} + 1 ) =`, disp(vo)]]);
  },
  10() {
    const kind = pick(['skin', 'rpm', 'noise']);
    if (kind === 'skin') {
      const met = pick([['알루미늄', 2.65e-8], ['구리', 1.69e-8]]), f = pick([1e4, 2e4, 5e4, 1e5, 1.35e5, 5e5]);
      const d = Math.sqrt(met[1] / (Math.PI * f * 4 * Math.PI * 1e-7));
      return card(figTag('coil', { f: sci(f) + ' Hz', m: met[0] }) + `<p>${met[0]} ρ = <b class="v">${sci(met[1])} Ω·m</b>, μ = μ₀ = 4π×10⁻⁷ H/m, 동작 주파수 <b class="v">${f >= 1e3 ? f / 1e3 + ' kHz' : f + ' Hz'}</b>. 검출 가능한 최소 두께 δ는?</p>`,
        `δ = ${r4(d * 1000)} mm`, [`δ = √(ρ/(πfμ))`, `πfμ = π × ${sci(f)} × 4π×10⁻⁷ = ${r4(Math.PI * f * 4 * Math.PI * 1e-7)}`, `δ = √(${sci(met[1])}/${r4(Math.PI * f * 4 * Math.PI * 1e-7)}) = ${sci(d)} m = ${r4(d * 1000)} mm`], 'c10-A',
        [['δ (m)', `√■ ${fk(met[1])} ÷ ( π × ${fk(f)} × 4 × π × 1 ×10ˣ (−) 7 ) =`, disp(d)], ['mm로', 'Ans × 1000 =', disp(d * 1000)]]);
    }
    if (kind === 'rpm') {
      const teeth = pick([10, 24, 36, 48, 60]), rpm = pick([300, 600, 800, 1000, 1200]), R = pick([0.25, 0.3, 0.32, 0.35]);
      const pulses = rpm * teeth, v = 2 * Math.PI * R * rpm / 60 * 3.6;
      return card(figTag('tone', { n: Math.min(teeth, 24) }) + `<p>분당 펄스 <b class="v">${pulses.toLocaleString()}</b>, tooth <b class="v">${teeth}개</b>, 바퀴 반지름 <b class="v">${R} m</b></p><ol class="q"><li>RPM</li><li>펄스 주파수 (Hz)</li><li>차속 (km/h)</li></ol>`,
        `${rpm} rpm · ${r4(pulses / 60)} Hz · ${r4(v)} km/h`,
        [`RPM = ${pulses} ÷ ${teeth} = ${rpm}`, `Hz = ${pulses} ÷ 60 = ${r4(pulses / 60)}`, `v = 2π × ${R} × ${rpm}/60 = ${r4(v / 3.6)} m/s × 3.6 = ${r4(v)} km/h`], 'c10-B',
        [['RPM', `${pulses} ÷ ${teeth} =`, String(rpm)], ['Hz', `${pulses} ÷ 60 =`, disp(pulses / 60)], ['km/h', `2 × π × ${R} × ${rpm} ÷ 60 × 3.6 =`, disp(v)]]);
    }
    const sig = pick([0.5, 1, 2, 5]), S = pick([0.1, 0.2, 0.5, 1]), BW = pick([25, 100, 400, 1600]);
    const up = pick([1.75, 1.8, 1.85, 2.6]), sens = S, down = +(up - 2 * sens).toFixed(3);
    const nd = sig * 1e-3 / S / Math.sqrt(BW);
    return card(`<p>(i) 0 g 출력 노이즈 표준편차 <b class="v">${sig} mV</b>, 감도 <b class="v">${S} V/g</b>, 대역폭 <b class="v">${BW} Hz</b>. 노이즈 밀도는?<br>(ii) +1 g 출력 <b class="v">${up} V</b>, −1 g 출력 <b class="v">${down} V</b>. Zero-g 출력과 감도는?</p>`,
      `(i) ${r4(nd * 1000)} mg/√Hz · (ii) Zero-g ${r4((up + down) / 2)} V, 감도 ${r4((up - down) / 2)} V/g`,
      [`${sig} mV ÷ ${S} V/g = ${r4(sig / S)} mg → ÷ √${BW} = ${r4(nd * 1000)} mg/√Hz`, `Zero-g = (${up} + ${down})/2 = ${r4((up + down) / 2)} V`, `감도 = (${up} − ${down})/2 = ${r4((up - down) / 2)} V/g`], 'c10-C',
      [['노이즈 밀도 (g)', `${fk(sig * 1e-3)} ÷ ${S} ÷ √■ ${BW} =`, disp(nd)], ['Zero-g', `( ${up} + ${fk(down)} ) ÷ 2 =`, disp((up + down) / 2)], ['감도', `( ${up} − ${fk(down)} ) ÷ 2 =`, disp((up - down) / 2)]]);
  }
};
document.addEventListener('click', e => {
  const b = e.target.closest('[data-gen]'); if (!b) return;
  const out = b.closest('.gen').querySelector('.out');
  out.innerHTML = G[b.dataset.gen](); renderFigs(out);
});
