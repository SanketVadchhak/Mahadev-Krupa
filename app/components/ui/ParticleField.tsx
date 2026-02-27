'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Star {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseOpacity: number;
    opacity: number;
    pulse: number;
    pulseSpeed: number;
}

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const starsRef = useRef<Star[]>([]);
    const rafRef = useRef<number>(0);
    const pageHeightRef = useRef(5000);

    const init = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;

        // Measure full document height to spread particles across the entire page
        pageHeightRef.current = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            5000
        );

        const isMobile = w < 768;
        const count = isMobile ? 80 : 150;

        // Grid-based distribution: divide the page into cells, place one particle per cell
        // This ensures particles are evenly distributed, not clumping randomly
        const cols = isMobile ? 4 : 8;
        const rows = Math.ceil(count / cols);
        const cellW = w / cols;
        const cellH = pageHeightRef.current / rows;
        const xPad = isMobile ? 0.15 : 0.08; // % padding from edges within each cell

        starsRef.current = Array.from({ length: count }, (_, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            return {
                x: cellW * col + cellW * (xPad + Math.random() * (1 - 2 * xPad)),
                y: cellH * row + cellH * Math.random(),
                vx: (Math.random() - 0.5) * 0.2,
                vy: -Math.random() * 0.15 - 0.05,
                size: Math.random() * 1.5 + 0.8,
                baseOpacity: Math.random() * 0.5 + 0.2,
                opacity: 0,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.008,
            };
        });
    }, []);

    useEffect(() => {
        // Small delay to let the page render first so we get accurate scrollHeight
        const timeout = setTimeout(() => init(), 200);

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            pageHeightRef.current = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                5000
            );
        };

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleTouchMove = (e: TouchEvent) => {
            mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouse);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);

        const INTERACT_RADIUS = 120;
        const CONNECT_RADIUS = 100;
        const GOLD = { r: 212, g: 168, b: 67 };

        function draw() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scrollY = window.scrollY;
            const viewTop = scrollY;
            const viewBottom = scrollY + canvas.height;
            const mouse = mouseRef.current;
            const pageH = pageHeightRef.current;

            const visibleStars: { x: number; y: number; opacity: number }[] = [];

            for (const star of starsRef.current) {
                // Only render if in viewport (with buffer)
                if (star.y < viewTop - 80 || star.y > viewBottom + 80) continue;

                const screenY = star.y - scrollY;

                // Pulse twinkle
                star.pulse += star.pulseSpeed;
                const pulseFactor = 0.5 + 0.5 * Math.sin(star.pulse);
                star.opacity = star.baseOpacity * pulseFactor;

                // Drift movement
                star.x += star.vx;
                star.y += star.vy;

                // Wrap: if drifted off top, put back at bottom
                if (star.y < 0) star.y = pageH;
                if (star.y > pageH) star.y = 0;

                // Wrap x within screen
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;

                // Mouse interaction
                const dx = star.x - mouse.x;
                const dy = screenY - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                let finalOpacity = star.opacity;
                let finalSize = star.size;

                if (dist < INTERACT_RADIUS) {
                    const proximity = 1 - dist / INTERACT_RADIUS;
                    finalOpacity = Math.min(1, star.opacity + proximity * 0.5);
                    finalSize = star.size + proximity * 2;

                    // Gentle push
                    const angle = Math.atan2(dy, dx);
                    star.x += Math.cos(angle) * proximity * 0.5;
                }

                // Small glow halo
                const gradient = ctx.createRadialGradient(star.x, screenY, 0, star.x, screenY, finalSize * 3);
                gradient.addColorStop(0, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${finalOpacity * 0.6})`);
                gradient.addColorStop(0.5, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${finalOpacity * 0.15})`);
                gradient.addColorStop(1, `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, 0)`);

                ctx.beginPath();
                ctx.arc(star.x, screenY, finalSize * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Crisp dot core
                ctx.beginPath();
                ctx.arc(star.x, screenY, finalSize * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 240, 200, ${finalOpacity * 0.9})`;
                ctx.fill();

                visibleStars.push({ x: star.x, y: screenY, opacity: finalOpacity });
            }

            // Connection lines near mouse
            if (mouse.x > 0 && mouse.y > 0) {
                for (let i = 0; i < visibleStars.length; i++) {
                    const a = visibleStars[i];
                    const dxM = a.x - mouse.x;
                    const dyM = a.y - mouse.y;
                    if (Math.abs(dxM) > INTERACT_RADIUS * 1.3 || Math.abs(dyM) > INTERACT_RADIUS * 1.3) continue;

                    for (let j = i + 1; j < visibleStars.length; j++) {
                        const b = visibleStars[j];
                        const dxB = b.x - mouse.x;
                        const dyB = b.y - mouse.y;
                        if (Math.abs(dxB) > INTERACT_RADIUS * 1.3 || Math.abs(dyB) > INTERACT_RADIUS * 1.3) continue;

                        const dxAB = a.x - b.x;
                        const dyAB = a.y - b.y;
                        const distAB = Math.sqrt(dxAB * dxAB + dyAB * dyAB);

                        if (distAB < CONNECT_RADIUS) {
                            const lineOpacity = (1 - distAB / CONNECT_RADIUS) * 0.2;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.strokeStyle = `rgba(${GOLD.r}, ${GOLD.g}, ${GOLD.b}, ${lineOpacity})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }

            rafRef.current = requestAnimationFrame(draw);
        }

        rafRef.current = requestAnimationFrame(draw);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouse);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [init]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
