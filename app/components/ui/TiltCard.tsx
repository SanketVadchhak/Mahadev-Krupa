'use client';

import { useRef, useCallback } from 'react';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

// Restored 3D tilt — uses overflow-hidden containment (safe on iOS/Safari)
export default function TiltCard({ children, className = '' }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }, []);

    return (
        <div
            ref={cardRef}
            className={`${className} overflow-hidden`}
            style={{ transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)', transformStyle: 'preserve-3d', willChange: 'transform' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}
