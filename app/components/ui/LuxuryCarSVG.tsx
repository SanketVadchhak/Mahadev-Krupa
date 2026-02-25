'use client';

export default function LuxuryCarSVG() {
    return (
        <div className="relative w-full max-w-2xl mx-auto animate-float">
            <svg viewBox="0 0 800 350" className="w-full car-body" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2a2a2a" />
                        <stop offset="50%" stopColor="#1e1e1e" />
                        <stop offset="100%" stopColor="#141414" />
                    </linearGradient>
                    <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4A843" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#B8902E" stopOpacity="0.15" />
                    </linearGradient>
                    <linearGradient id="chromeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#c0c0c0" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#c0c0c0" />
                    </linearGradient>
                    <linearGradient id="headlightGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#D4A843" />
                        <stop offset="100%" stopColor="#F0D080" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glowStrong">
                        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#D4A843" />
                        <stop offset="60%" stopColor="#333" />
                        <stop offset="100%" stopColor="#1a1a1a" />
                    </radialGradient>
                </defs>

                {/* Shadow */}
                <ellipse cx="400" cy="290" rx="320" ry="20" fill="rgba(0,0,0,0.4)" filter="url(#glowStrong)" />

                {/* Car Body */}
                <path d="M120,230 Q100,230 90,220 L80,210 Q75,200 80,195 L140,190 L660,190 L720,195 Q725,200 720,210 L710,220 Q700,230 680,230 Z"
                    fill="url(#bodyGrad)" stroke="#2e2e2e" strokeWidth="1" />
                <path d="M130,190 L140,160 Q145,150 155,145 L280,120 Q300,115 320,115 L480,115 Q500,115 520,120 L645,145 Q655,150 660,160 L670,190 Z"
                    fill="url(#bodyGrad)" stroke="#2e2e2e" strokeWidth="1" />
                <path d="M260,120 Q270,85 300,75 L500,75 Q530,85 540,120 Z"
                    fill="#141414" stroke="#2e2e2e" strokeWidth="1" />

                {/* Windows */}
                <path d="M275,118 Q282,92 305,82 L395,82 L395,118 Z"
                    fill="url(#windowGrad)" stroke="#D4A843" strokeWidth="0.5" opacity="0.8" />
                <path d="M405,82 L495,82 Q518,92 525,118 L405,118 Z"
                    fill="url(#windowGrad)" stroke="#D4A843" strokeWidth="0.5" opacity="0.8" />
                <line x1="400" y1="80" x2="400" y2="120" stroke="#c0c0c0" strokeWidth="2" />

                {/* Chrome */}
                <path d="M140,190 L660,190" stroke="url(#chromeGrad)" strokeWidth="2" opacity="0.6" />
                <path d="M260,120 L540,120" stroke="url(#chromeGrad)" strokeWidth="1.5" opacity="0.4" />
                <path d="M155,145 L280,120" stroke="#2e2e2e" strokeWidth="0.5" opacity="0.5" />
                <path d="M645,145 L520,120" stroke="#2e2e2e" strokeWidth="0.5" opacity="0.5" />

                {/* Headlights */}
                <path d="M85,205 L130,195 L130,215 Z" fill="url(#headlightGrad)" filter="url(#glow)" opacity="0.9" />
                <rect x="82" y="200" width="50" height="3" rx="1" fill="#D4A843" filter="url(#glow)" opacity="0.8" />
                <path d="M85,212 L135,208" stroke="#D4A843" strokeWidth="2" filter="url(#glow)" strokeLinecap="round" />

                {/* Tail Lights */}
                <path d="M715,205 L670,195 L670,215 Z" fill="#B8902E" filter="url(#glow)" opacity="0.9" />
                <rect x="668" y="200" width="50" height="3" rx="1" fill="#B8902E" filter="url(#glow)" opacity="0.8" />
                <path d="M715,212 L665,208" stroke="#B8902E" strokeWidth="2" filter="url(#glow)" strokeLinecap="round" />

                {/* Grille */}
                <rect x="90" y="195" width="45" height="25" rx="3" fill="none" stroke="#2e2e2e" strokeWidth="1" />
                {[0, 1, 2, 3, 4].map(i => (
                    <line key={`g${i}`} x1="95" y1={199 + i * 4} x2="130" y2={199 + i * 4} stroke="#222222" strokeWidth="1" />
                ))}

                {/* Wheels */}
                <circle cx="210" cy="235" r="40" fill="#111" stroke="#333" strokeWidth="2" />
                <circle cx="210" cy="235" r="32" fill="url(#rimGrad)" />
                <circle cx="210" cy="235" r="28" fill="none" stroke="#555" strokeWidth="1" />
                {[0, 1, 2, 3, 4].map(i => (
                    <line key={`s1${i}`} x1="210" y1="235"
                        x2={210 + 25 * Math.cos(i * 72 * Math.PI / 180)}
                        y2={235 + 25 * Math.sin(i * 72 * Math.PI / 180)}
                        stroke="#888" strokeWidth="2" />
                ))}
                <circle cx="210" cy="235" r="8" fill="#D4A843" filter="url(#glow)" opacity="0.6" />
                <circle cx="210" cy="235" r="4" fill="#333" />

                <circle cx="590" cy="235" r="40" fill="#111" stroke="#333" strokeWidth="2" />
                <circle cx="590" cy="235" r="32" fill="url(#rimGrad)" />
                <circle cx="590" cy="235" r="28" fill="none" stroke="#555" strokeWidth="1" />
                {[0, 1, 2, 3, 4].map(i => (
                    <line key={`s2${i}`} x1="590" y1="235"
                        x2={590 + 25 * Math.cos(i * 72 * Math.PI / 180)}
                        y2={235 + 25 * Math.sin(i * 72 * Math.PI / 180)}
                        stroke="#888" strokeWidth="2" />
                ))}
                <circle cx="590" cy="235" r="8" fill="#D4A843" filter="url(#glow)" opacity="0.6" />
                <circle cx="590" cy="235" r="4" fill="#333" />

                {/* Wheel Arches */}
                <path d="M160,230 Q170,185 210,180 Q250,185 260,230" fill="none" stroke="#2e2e2e" strokeWidth="2" />
                <path d="M540,230 Q550,185 590,180 Q630,185 640,230" fill="none" stroke="#2e2e2e" strokeWidth="2" />

                {/* Details */}
                <rect x="350" y="155" width="30" height="4" rx="2" fill="#555" opacity="0.6" />
                <path d="M265,125 L250,135 L250,145 L268,140 Z" fill="#141414" stroke="#2e2e2e" strokeWidth="1" />
                <path d="M140,175 L660,175" stroke="url(#headlightGrad)" strokeWidth="1" opacity="0.4" />

                {/* Ground Glow */}
                <ellipse cx="210" cy="280" rx="50" ry="8" fill="#D4A843" opacity="0.15" filter="url(#glowStrong)" />
                <ellipse cx="590" cy="280" rx="50" ry="8" fill="#D4A843" opacity="0.15" filter="url(#glowStrong)" />
                <ellipse cx="100" cy="280" rx="40" ry="6" fill="#F0D080" opacity="0.1" filter="url(#glowStrong)" />
                <ellipse cx="700" cy="280" rx="40" ry="6" fill="#B8902E" opacity="0.1" filter="url(#glowStrong)" />
            </svg>
        </div>
    );
}
