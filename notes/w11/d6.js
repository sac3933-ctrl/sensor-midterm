/* ===== 보강: Week13 방에서 나눈 SAW 설명 반영 (IDT 단면 5단계, Δθ = ω·Δt 그림) ===== */
(function(){
const IDT_SVG = "<svg viewBox='0 0 640 250' role='img' aria-label='IDT 단면: 전기장과 표면 변형'>"
 + "<defs><marker id='e6' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto'><path d='M0 0 L10 5 L0 10z' fill='var(--acc)'/></marker></defs>"
 // substrate
 + "<rect class='bxs' x='40' y='110' width='560' height='90' rx='4'/>"
 + "<text x='320' y='190' text-anchor='middle' font-size='12'>압전 기판 (옆에서 자른 단면)</text>"
 // surface wave (exaggerated)
 + "<path d='M40 110 C 80 96, 120 96, 160 110 S 240 124, 280 110 S 360 96, 400 110 S 480 124, 520 110 S 580 100, 600 110' stroke='var(--q)' stroke-width='2.2' fill='none'/>"
 + "<text x='600' y='64' text-anchor='end' font-size='11' style='fill:var(--q)'>빨간 곡선 = 표면 출렁임 (크게 과장, 실제 약 2 nm)</text>"
 // fingers
 + [100,220,340,460,580].map((x,i)=>{const p=i%2===0; return "<rect x='"+(x-14)+"' y='86' width='28' height='12' rx='2' style='fill:"+(p?"#d6455d":"#3b6fd8")+"'/><text x='"+x+"' y='80' text-anchor='middle' font-size='15' font-weight='700' style='fill:"+(p?"#d6455d":"#3b6fd8")+"'>"+(p?"+":"−")+"</text>";}).join("")
 // field arcs between fingers, alternating arrow direction
 + [[100,220,1],[220,340,-1],[340,460,1],[460,580,-1]].map(a=>{const [x1,x2,d]=a, m=(x1+x2)/2; const s=d>0?("M"+(x1+10)+" 112 Q "+m+" 165 "+(x2-10)+" 112"):("M"+(x2-10)+" 112 Q "+m+" 165 "+(x1+10)+" 112"); return "<path d='"+s+"' stroke='var(--acc)' stroke-dasharray='5 4' fill='none' stroke-width='1.6' marker-end='url(#e6)'/>";}).join("")
 + "<text x='160' y='160' text-anchor='middle' font-size='11'>전기장 →</text><text x='280' y='160' text-anchor='middle' font-size='11'>← 전기장</text>"
 // period label
 + "<path d='M100 40 L340 40' class='ln' stroke-width='1.2'/><path d='M100 34 L100 46 M340 34 L340 46' class='ln'/>"
 + "<text x='220' y='34' text-anchor='middle' font-size='12'>한 주기 = λ (+에서 다음 +까지)</text>"
 + "<text x='470' y='40' text-anchor='middle' font-size='12'>교류라서 +, −가 계속 뒤바뀜</text>"
 + "<path d='M40 225 L600 225' stroke='var(--acc)' stroke-width='1.6' marker-end='url(#e6)'/><text x='320' y='243' text-anchor='middle' font-size='12'>SAW가 표면을 따라 퍼져 나감 (반대쪽으로도 같은 양)</text>"
 + "</svg>";

const IDT_STEPS = "<ol style='margin-top:8px'>"
 + "<li><b>교류 인가</b> — IDT의 두 빗에 교류 전압을 건다. +, −가 1초에 f번 뒤바뀐다.</li>"
 + "<li><b>전기장이 번갈아 생김</b> — 이웃한 손가락 사이마다 기판 속으로 전기장(점선)이 생기고, 그 방향이 칸마다 반대다.</li>"
 + "<li><b>기판 변형</b> — 압전 기판은 전기장 방향에 따라 그 자리에서 늘거나 줄어든다(역압전 효과).</li>"
 + "<li><b>표면 출렁임</b> — 늘고 줄어드는 자리가 λ마다 반복되니 표면이 물결 모양이 되고, 이 물결(SAW)이 양옆으로 퍼진다.</li>"
 + "<li><b>받는 쪽에서 다시 전압</b> — 물결이 출력 IDT에 도착하면 기판 변형이 전압을 만든다(정압전 효과). 그래서 IDT는 '스피커'이자 '마이크'다.</li>"
 + "</ol><p style='font-size:13.5px'>핵심: 손가락 간격(λ)과 교류 주파수가 맞을 때(f₀ = v/λ) 칸마다 생긴 변형이 같은 박자로 더해져 SAW가 가장 크게 생긴다 [AI 보충].</p>";

function phaseSVG(){
  const W=600, x0=40, per=200, A=34;
  const wave=(y0,shift,cls)=>{let d="";for(let i=0;i<=W-x0-20;i+=4){const x=x0+i;const y=y0-A*Math.sin(2*Math.PI*(i-shift)/per);d+=(i?" L":"M")+x.toFixed(1)+" "+y.toFixed(1);}return "<path d='"+d+"' "+cls+" fill='none' stroke-width='2'/>";};
  const sh=44; // 0.5ns of 2.273ns period → 79.2° → 44 px of 200 px
  return "<svg viewBox='0 0 640 250' role='img' aria-label='위상차 그림'>"
   + "<defs><marker id='p6' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M0 0 L10 5 L0 10z' fill='var(--q)'/></marker></defs>"
   + "<text x='10' y='70' font-size='12'>기준</text>" + wave(70,0,"stroke='var(--acc)'")
   + "<text x='10' y='170' font-size='12'>늦게</text><text x='10' y='184' font-size='12'>도착</text>" + wave(170,sh,"stroke='var(--q)'")
   + "<path d='M"+(x0+per/4)+" 30 L"+(x0+per/4)+" 220' class='ln' stroke-dasharray='3 3'/>"
   + "<path d='M"+(x0+per/4+sh)+" 120 L"+(x0+per/4+sh)+" 220' class='ln' stroke-dasharray='3 3'/>"
   + "<path d='M"+(x0+per/4+2)+" 128 L"+(x0+per/4+sh-2)+" 128' stroke='var(--q)' stroke-width='1.6' marker-start='url(#p6)' marker-end='url(#p6)'/>"
   + "<text x='"+(x0+per/4+sh/2)+"' y='122' text-anchor='middle' font-size='12' style='fill:var(--q)'>Δt</text>"
   + "<path d='M"+(x0+per/4)+" 18 L"+(x0+per/4+per)+" 18' class='ln'/><path d='M"+(x0+per/4)+" 12 L"+(x0+per/4)+" 24 M"+(x0+per/4+per)+" 12 L"+(x0+per/4+per)+" 24' class='ln'/>"
   + "<text x='"+(x0+per/4+per/2)+"' y='13' text-anchor='middle' font-size='12'>한 주기 T = 360° (= 2π rad)</text>"
   + "<text x='320' y='242' text-anchor='middle' font-size='12.5'>Δθ = 360° × Δt/T = 2π·Δt/T = 2πf·Δt = ω·Δt</text>"
   + "</svg>";
}
const PHASE_TXT = "<p><b>왜 Δθ = ω·Δt 인가</b> [AI 보충]</p><ul>"
 + "<li>사인파 한 주기 T 동안 위상은 360°(= 2π rad) 돈다.</li>"
 + "<li>Δt만큼 늦게 도착하면, 그건 한 주기 중 Δt/T만큼 밀린 것 → Δθ = 2π × Δt/T.</li>"
 + "<li>1/T = f 이므로 Δθ = 2πf·Δt. 여기서 <b>ω = 2πf</b>(각주파수: 1초에 위상이 몇 rad 도는가) → <b>Δθ = ω·Δt</b>.</li></ul>"
 + "<div class='calc'>[직접 만든 예] f₀ = 440 MHz, Δt = 0.5 ns<div class='eq'>T = 1/440 MHz = 2.273 ns\nΔθ = 2π × 0.5/2.273 = 2π × 440×10⁶ × 0.5×10⁻⁹ = 1.38 rad\n   = 1.38 × 180/π ≈ 79°</div>그림의 아래 파형이 바로 이만큼(한 주기의 약 22%) 밀린 모습이다.</div>"
 + "<p style='font-size:13.5px'>주의: ① ω·Δt의 결과는 <b>라디안</b>. 도(°)가 필요하면 ×180/π. ② ω에는 2π가 들어 있으니, λ = v/f 같은 식에는 ω가 아니라 <b>f</b>를 넣는다.</p>";

S[15].extraTitle = "IDT 단면으로 보는 5단계 (그림)";
S[15].extra = "<div class='ko'><div class='kd'>" + IDT_SVG + "</div></div>" + IDT_STEPS;
S[10].extraTitle = "위상 Δθ = ω·Δt 그림으로 이해하기";
S[10].extra = "<div class='ko'><div class='kd'>" + phaseSVG() + "</div></div>" + PHASE_TXT;
S[43].extraTitle = "위상 Δθ = ω·Δt 그림으로 이해하기";
S[43].extra = S[10].extra + "<p style='font-size:13.5px'>43번에서는 이 Δt가 압력 때문에 생긴다. 시간으론 ns 수준이라 작지만 위상으로 바꾸면 수십~수백 도로 크게 보인다.</p>";
})();
