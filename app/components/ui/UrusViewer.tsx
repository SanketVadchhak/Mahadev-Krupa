'use client';

import { useEffect } from 'react';

// Types for model-viewer are declared globally in app/model-viewer.d.ts

export default function UrusViewer() {
    // Inject the model-viewer script programmatically — next/script with type="module"
    // is unreliable; useEffect guarantees client-side injection with no SSR issues.
    useEffect(() => {
        if (document.querySelector('#model-viewer-script')) return; // already loaded
        const script = document.createElement('script');
        script.id = 'model-viewer-script';
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
        document.head.appendChild(script);
    }, []);

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {/* @ts-ignore – typed globally in model-viewer.d.ts */}
            <model-viewer
                src="/urus/source/2023_lamborghini_urus_performante.glb"
                alt="2023 Lamborghini Urus Performante"
                auto-rotate=""
                auto-rotate-delay="200"
                rotation-per-second="20deg"
                camera-controls=""
                disable-zoom=""
                camera-orbit="20deg 82deg 2.2m"
                min-camera-orbit="auto 60deg 1.8m"
                max-camera-orbit="auto 95deg 4m"
                min-field-of-view="25deg"
                max-field-of-view="40deg"
                environment-image="neutral"
                shadow-intensity="1.2"
                shadow-softness="0.8"
                exposure="1.6"
                loading="eager"
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    background: 'transparent',
                    ['--poster-color' as string]: 'transparent',
                }}
            />

            {/* Drag hint */}
            <div style={{
                position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                pointerEvents: 'none', opacity: 0.6,
            }}>
                <span style={{ fontSize: 10, color: '#D4961A', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    ← Drag to rotate · 360° →
                </span>
            </div>

            {/* Ground glow */}
            <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '80%', height: 40, background: 'rgba(212,150,26,0.08)',
                borderRadius: 9999, filter: 'blur(20px)', pointerEvents: 'none',
            }} />
        </div>
    );
}
