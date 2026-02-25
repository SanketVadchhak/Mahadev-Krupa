'use client';

import Script from 'next/script';

// Types for model-viewer are declared globally in app/model-viewer.d.ts

export default function UrusViewer() {
    return (
        <div className="relative w-full" style={{ height: 'clamp(360px, 60vw, 700px)' }}>

            {/* Load model-viewer from CDN — completely outside webpack, no compile delay */}
            <Script
                type="module"
                src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
                strategy="afterInteractive"
            />

            {/*
        camera-orbit: "theta phi radius"
          theta = horizontal angle | phi = vertical angle | radius = distance (smaller = bigger car)
          Increase exposure to brighten, shadow-intensity for depth
      */}
            <model-viewer
                src="/urus/source/2023_lamborghini_urus_performante.glb"
                alt="2023 Lamborghini Urus Performante"
                auto-rotate=""
                auto-rotate-delay="300"
                rotation-per-second="22deg"
                camera-controls=""
                disable-zoom=""
                camera-orbit="30deg 78deg 3.2m"
                min-camera-orbit="auto 60deg 2.5m"
                max-camera-orbit="auto 100deg 6m"
                min-field-of-view="30deg"
                max-field-of-view="45deg"
                environment-image="neutral"
                shadow-intensity="1"
                shadow-softness="0.9"
                exposure="1.5"
                loading="eager"
                style={{
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    ['--poster-color' as string]: 'transparent',
                }}
            />

            {/* Drag hint */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none opacity-60">
                <span className="text-[10px] text-amber-400 tracking-widest uppercase">
                    ← Drag to rotate · 360° →
                </span>
            </div>

            {/* Ground glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />
        </div>
    );
}
