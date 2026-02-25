'use client';

export default function LuxuryCarSVG() {
    const frontWheelCx = 730;
    const frontWheelCy = 338;
    const rearWheelCx = 218;
    const rearWheelCy = 338;
    const R = 64; // tyre radius
    const rimR = 47;

    const spokeCount = 5;
    const spokes = Array.from({ length: spokeCount }, (_, i) => {
        const angle = ((i * 360) / spokeCount - 90) * (Math.PI / 180);
        return {
            x1a: Math.cos(angle) * 10,
            y1a: Math.sin(angle) * 10,
            x2a: Math.cos(angle) * (rimR - 6),
            y2a: Math.sin(angle) * (rimR - 6),
        };
    });

    return (
        <div className="relative w-full max-w-2xl mx-auto animate-float">
            <svg viewBox="0 0 960 410" className="w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* Silver car body */}
                    <linearGradient id="kcBody" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f2f2f2" />
                        <stop offset="35%" stopColor="#e4e4e4" />
                        <stop offset="75%" stopColor="#d0d0d0" />
                        <stop offset="100%" stopColor="#bebebe" />
                    </linearGradient>
                    {/* Roof slightly darker */}
                    <linearGradient id="kcRoof" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#dcdcdc" />
                        <stop offset="100%" stopColor="#cacaca" />
                    </linearGradient>
                    {/* Glass — green tint */}
                    <linearGradient id="kcGlass" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9ed0c0" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#72b8a5" stopOpacity="0.75" />
                    </linearGradient>
                    {/* Black cladding */}
                    <linearGradient id="kcClad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2e2e2e" />
                        <stop offset="100%" stopColor="#111" />
                    </linearGradient>
                    {/* Tyre */}
                    <radialGradient id="kcTyre" cx="50%" cy="50%" r="50%">
                        <stop offset="75%" stopColor="#1a1a1a" />
                        <stop offset="100%" stopColor="#333" />
                    </radialGradient>
                    {/* Rim */}
                    <radialGradient id="kcRim" cx="35%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#b8b8b8" />
                        <stop offset="50%" stopColor="#888" />
                        <stop offset="100%" stopColor="#3a3a3a" />
                    </radialGradient>
                    {/* Ground shadow */}
                    <radialGradient id="kcShadow" cx="50%" cy="30%" r="50%">
                        <stop offset="0%" stopColor="rgba(0,0,0,0.28)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                    {/* Hood shine */}
                    <linearGradient id="kcHoodShine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f8f8f8" />
                        <stop offset="60%" stopColor="#ddd" />
                        <stop offset="100%" stopColor="#ccc" />
                    </linearGradient>
                </defs>

                {/* ── Ground shadow ── */}
                <ellipse cx="485" cy="404" rx="415" ry="14" fill="url(#kcShadow)" />

                {/* ═══════════════════════════════════════════
            MAIN BODY SILHOUETTE
            Front on RIGHT, Rear on LEFT
            ═══════════════════════════════════════════ */}
                <path
                    d="
            M 858,330
            Q 880,328 892,310
            L 895,280
            Q 892,258 882,248
            L 848,232
            L 805,220
            Q 788,216 775,216
            L 758,216
            Q 746,220 738,228
            L 715,120
            Q 708,105 694,102
            L 278,102
            Q 264,103 257,114
            L 228,198
            L 210,245
            L 196,278
            L 185,305
            L 180,328
            L 858,330
            Z
          "
                    fill="url(#kcBody)"
                    stroke="#bbb"
                    strokeWidth="1"
                />

                {/* ── Hood (slightly lighter highlight) ── */}
                <path
                    d="M 758,216 L 805,220 L 848,232 L 882,248 L 888,260 L 855,258 L 818,246 L 775,238 L 750,236 L 738,228 Z"
                    fill="url(#kcHoodShine)"
                    stroke="#ccc"
                    strokeWidth="0.5"
                />

                {/* ── A-pillar region / roof ── */}
                <path
                    d="M 694,102 L 680,102 L 278,102 L 265,108 L 242,185 L 228,198 L 738,198 Q 746,196 750,186 L 758,150 L 738,118 Q 728,108 718,104 Z"
                    fill="url(#kcRoof)"
                />

                {/* ═══ WINDOWS ═══ */}
                {/* Windshield */}
                <path
                    d="M 715,120 L 738,122 L 758,152 L 758,212 L 740,212 L 714,206 L 694,158 Z"
                    fill="url(#kcGlass)"
                    stroke="#888"
                    strokeWidth="0.8"
                />
                {/* Front door window */}
                <path
                    d="M 694,110 L 555,106 L 555,204 L 640,208 L 714,206 L 694,158 Z"
                    fill="url(#kcGlass)"
                    stroke="#888"
                    strokeWidth="0.8"
                />
                {/* Middle row window */}
                <path
                    d="M 555,106 L 408,104 L 408,202 L 555,204 Z"
                    fill="url(#kcGlass)"
                    stroke="#888"
                    strokeWidth="0.8"
                />
                {/* Rear quarter window */}
                <path
                    d="M 408,104 L 304,108 L 290,174 L 290,198 L 408,202 Z"
                    fill="url(#kcGlass)"
                    stroke="#888"
                    strokeWidth="0.8"
                />
                {/* D-pillar / small rear window */}
                <path
                    d="M 290,118 L 278,132 L 265,175 L 265,195 L 290,198 L 290,118 Z"
                    fill="url(#kcGlass)"
                    stroke="#888"
                    strokeWidth="0.8"
                    opacity="0.8"
                />

                {/* ═══ PILLARS (black) ═══ */}
                {/* A-pillar */}
                <line x1="715" y1="120" x2="738" y2="210" stroke="#222" strokeWidth="7" strokeLinecap="round" />
                {/* B-pillar */}
                <line x1="555" y1="106" x2="555" y2="210" stroke="#222" strokeWidth="7" />
                {/* C-pillar */}
                <line x1="408" y1="104" x2="408" y2="205" stroke="#222" strokeWidth="7" />
                {/* D-pillar */}
                <line x1="290" y1="120" x2="265" y2="195" stroke="#222" strokeWidth="7" strokeLinecap="round" />

                {/* Window top frame line */}
                <path d="M 694,102 L 278,102 L 258,118" stroke="#555" strokeWidth="3" fill="none" />

                {/* ═══ ROOF RAILS ═══ */}
                <rect x="280" y="94" width="410" height="8" rx="4" fill="#444" />

                {/* ═══ CHARACTER LINE / body crease ═══ */}
                <path d="M 880,285 Q 600,278 195,270 L 182,275" stroke="#c0c0c0" strokeWidth="2" fill="none" opacity="0.7" />

                {/* ═══ BLACK LOWER CLADDING ═══ */}
                <path
                    d="M 858,300 L 180,295 L 180,330 L 858,330 Z"
                    fill="url(#kcClad)"
                />
                {/* Front bumper lower black */}
                <path
                    d="M 858,300 Q 878,298 892,310 L 895,330 L 858,330 Z"
                    fill="#222"
                />
                {/* Rear bumper lower black */}
                <path
                    d="M 180,295 Q 165,300 155,318 L 155,330 L 180,330 Z"
                    fill="#222"
                />

                {/* ═══ WHEEL ARCHES (black) ═══ */}
                {/* Rear arch */}
                <path
                    d={`M ${rearWheelCx - R - 20},330 Q ${rearWheelCx - R - 15},${rearWheelCy - R - 25} ${rearWheelCx},${rearWheelCy - R - 28} Q ${rearWheelCx + R + 15},${rearWheelCy - R - 25} ${rearWheelCx + R + 20},330 Z`}
                    fill="#1c1c1c"
                />
                {/* Front arch */}
                <path
                    d={`M ${frontWheelCx - R - 20},330 Q ${frontWheelCx - R - 15},${frontWheelCy - R - 25} ${frontWheelCx},${frontWheelCy - R - 28} Q ${frontWheelCx + R + 15},${frontWheelCy - R - 25} ${frontWheelCx + R + 20},330 Z`}
                    fill="#1c1c1c"
                />

                {/* ═══ FRONT LIGHTS ═══ */}
                {/* Main headlight housing */}
                <path
                    d="M 862,248 L 895,255 L 895,285 L 872,282 L 855,270 L 852,252 Z"
                    fill="#e8e8cc"
                    stroke="#bbb"
                    strokeWidth="0.5"
                    opacity="0.95"
                />
                {/* LED DRL — amber/white slash */}
                <polyline
                    points="895,258 882,250 862,248 855,250"
                    stroke="#F0D080"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                />
                {/* Lower LED strip */}
                <line x1="895" y1="282" x2="860" y2="280" stroke="#D4A843" strokeWidth="2" strokeLinecap="round" />
                {/* Fog light */}
                <rect x="860" y="310" width="22" height="12" rx="3" fill="#e8e8cc" opacity="0.7" />

                {/* ═══ TAIL LIGHTS ═══ */}
                {/* Upper tail light */}
                <path d="M 185,215 L 196,213 L 200,268 L 185,268 Z" fill="#cc1a22" opacity="0.9" />
                {/* Lower tail light / reflector */}
                <path d="M 185,268 L 200,268 L 196,305 L 185,308 Z" fill="#991520" opacity="0.75" />
                {/* Inner light bar */}
                <line x1="191" y1="228" x2="191" y2="295" stroke="#ff3333" strokeWidth="1.5" opacity="0.5" />

                {/* ═══ DOOR HANDLES ═══ */}
                <rect x="640" y="242" width="30" height="8" rx="4" fill="#999" opacity="0.75" />
                <rect x="470" y="242" width="30" height="8" rx="4" fill="#999" opacity="0.75" />
                <rect x="330" y="248" width="24" height="7" rx="3" fill="#999" opacity="0.6" />

                {/* ═══ SIDE MIRROR ═══ */}
                <path d="M 758,196 L 738,180 L 730,172 L 727,188 L 742,198 Z" fill="#d5d5d5" stroke="#aaa" strokeWidth="1" />
                {/* Mirror housing (darker bottom edge) */}
                <path d="M 738,180 L 730,172 L 727,188" stroke="#bbb" strokeWidth="1" fill="none" />

                {/* Badge (subtle Kia K on front) */}
                <text x="878" y="224" fontSize="10" fill="#888" fontWeight="bold" textAnchor="middle">KIA</text>

                {/* ═══════════ REAR WHEEL ═══════════ */}
                {/* Tyre */}
                <circle cx={rearWheelCx} cy={rearWheelCy} r={R} fill="url(#kcTyre)" />
                <circle cx={rearWheelCx} cy={rearWheelCy} r={R} fill="none" stroke="#444" strokeWidth="2" />
                {/* Rim */}
                <circle cx={rearWheelCx} cy={rearWheelCy} r={rimR} fill="url(#kcRim)" />
                {/* Rim barrel */}
                <circle cx={rearWheelCx} cy={rearWheelCy} r={rimR} fill="none" stroke="#666" strokeWidth="1.5" />
                {/* 5 spokes */}
                {spokes.map((s, i) => (
                    <line
                        key={`rs${i}`}
                        x1={rearWheelCx + s.x1a} y1={rearWheelCy + s.y1a}
                        x2={rearWheelCx + s.x2a} y2={rearWheelCy + s.y2a}
                        stroke="#aaa" strokeWidth="9" strokeLinecap="round"
                    />
                ))}
                {/* Spoke shadow between them */}
                {spokes.map((s, i) => (
                    <line
                        key={`rss${i}`}
                        x1={rearWheelCx + s.x1a} y1={rearWheelCy + s.y1a}
                        x2={rearWheelCx + s.x2a} y2={rearWheelCy + s.y2a}
                        stroke="#888" strokeWidth="5" strokeLinecap="round"
                    />
                ))}
                {/* Center cap */}
                <circle cx={rearWheelCx} cy={rearWheelCy} r={13} fill="#777" />
                <circle cx={rearWheelCx} cy={rearWheelCy} r={7} fill="#444" />

                {/* ═══════════ FRONT WHEEL ═══════════ */}
                {/* Tyre */}
                <circle cx={frontWheelCx} cy={frontWheelCy} r={R} fill="url(#kcTyre)" />
                <circle cx={frontWheelCx} cy={frontWheelCy} r={R} fill="none" stroke="#444" strokeWidth="2" />
                {/* Rim */}
                <circle cx={frontWheelCx} cy={frontWheelCy} r={rimR} fill="url(#kcRim)" />
                <circle cx={frontWheelCx} cy={frontWheelCy} r={rimR} fill="none" stroke="#666" strokeWidth="1.5" />
                {/* 5 spokes */}
                {spokes.map((s, i) => (
                    <line
                        key={`fs${i}`}
                        x1={frontWheelCx + s.x1a} y1={frontWheelCy + s.y1a}
                        x2={frontWheelCx + s.x2a} y2={frontWheelCy + s.y2a}
                        stroke="#aaa" strokeWidth="9" strokeLinecap="round"
                    />
                ))}
                {spokes.map((s, i) => (
                    <line
                        key={`fss${i}`}
                        x1={frontWheelCx + s.x1a} y1={frontWheelCy + s.y1a}
                        x2={frontWheelCx + s.x2a} y2={frontWheelCy + s.y2a}
                        stroke="#888" strokeWidth="5" strokeLinecap="round"
                    />
                ))}
                <circle cx={frontWheelCx} cy={frontWheelCy} r={13} fill="#777" />
                <circle cx={frontWheelCx} cy={frontWheelCy} r={7} fill="#444" />

                {/* ═══ GOLDEN ACCENT TRIM ═══ */}
                <path d="M 855,298 L 183,293" stroke="#D4A843" strokeWidth="1.5" opacity="0.4" fill="none" />
            </svg>
        </div>
    );
}
