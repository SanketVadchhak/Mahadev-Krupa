'use client';

import { useState, useEffect } from 'react';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export default function ParticleField() {
    const [particles, setParticles] = useState<Particle[]>([]);

    // Generate particles client-side only — Math.random() during SSR causes
    // hydration mismatches because the server and client produce different values.
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const count = isMobile ? 12 : 35;
        setParticles(
            Array.from({ length: count }, (_, i) => ({
                id: i,
                x: Math.random() * 95, // capped at 95% to prevent horizontal overflow
                y: Math.random() * 100,
                size: Math.random() * 2 + 1,
                duration: Math.random() * 10 + 6,
                delay: Math.random() * 5,
                opacity: Math.random() * 0.3 + 0.05,
            }))
        );
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                        '--duration': `${p.duration}s`,
                        '--delay': `${p.delay}s`,
                    } as React.CSSProperties}
                />
            ))}
        </div>
    );
}
