'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Users, Star } from 'lucide-react';
import type { FleetCar } from './data/siteData';

interface VehicleModalProps {
    car: FleetCar;
    onClose: () => void;
}

export default function VehicleModal({ car, onClose }: VehicleModalProps) {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const touchStartX = useRef<number | null>(null);
    const total = car.images.length;

    const next = useCallback(() => {
        setCurrent(c => (c + 1) % total);
    }, [total]);

    const prev = useCallback(() => {
        setCurrent(c => (c - 1 + total) % total);
    }, [total]);

    // Auto-slide
    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (total > 1) {
            timerRef.current = setInterval(next, 3500);
        }
    }, [next, total]);

    useEffect(() => {
        resetTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [resetTimer]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleKey);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 40) {
            delta < 0 ? next() : prev();
            resetTimer();
        }
        touchStartX.current = null;
    };

    const handleNav = (fn: () => void) => {
        fn();
        resetTimer();
    };

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 lg:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={onClose}
                style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
            >
                {/* Modal panel */}
                <motion.div
                    key="panel"
                    className="relative w-full h-full md:h-auto md:max-h-[92vh] md:max-w-4xl md:rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: '#141414', border: '1px solid rgba(212,168,67,0.2)' }}
                    initial={{ opacity: 0, scale: 0.93, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.93, y: 24 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* ── Close button ── */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-amber-500/20"
                        style={{ background: 'rgba(20,20,20,0.85)', border: '1px solid rgba(212,168,67,0.25)' }}
                        aria-label="Close"
                    >
                        <X size={17} className="text-gray-300" />
                    </button>

                    {/* ── IMAGE CAROUSEL ── */}
                    {total > 0 && (
                        <div
                            className="relative w-full flex-shrink-0 overflow-hidden select-none"
                            style={{ height: 'clamp(220px, 42vw, 380px)' }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* Images */}
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.img
                                    key={current}
                                    src={car.images[current]}
                                    alt={`${car.name} — image ${current + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                                    draggable={false}
                                />
                            </AnimatePresence>

                            {/* Dark gradient overlay at bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                                style={{ background: 'linear-gradient(to top, #141414 0%, transparent 100%)' }} />

                            {/* Prev / Next arrows */}
                            {total > 1 && (
                                <>
                                    <button
                                        onClick={() => handleNav(prev)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-amber-500/30 z-10"
                                        style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(212,168,67,0.2)' }}
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft size={18} className="text-white" />
                                    </button>
                                    <button
                                        onClick={() => handleNav(next)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-amber-500/30 z-10"
                                        style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(212,168,67,0.2)' }}
                                        aria-label="Next"
                                    >
                                        <ChevronRight size={18} className="text-white" />
                                    </button>
                                </>
                            )}

                            {/* Dot indicators */}
                            {total > 1 && (
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                    {car.images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setCurrent(i); resetTimer(); }}
                                            className="rounded-full transition-all duration-300"
                                            style={{
                                                width: i === current ? 22 : 7,
                                                height: 7,
                                                background: i === current ? '#D4A843' : 'rgba(255,255,255,0.35)',
                                            }}
                                            aria-label={`Go to image ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Image counter */}
                            {total > 1 && (
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs text-gray-300 font-medium z-10"
                                    style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    {current + 1} / {total}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── SCROLLABLE DETAILS PANEL ── */}
                    <div className="flex-1 overflow-y-auto px-5 md:px-8 pt-5 pb-8" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(212,168,67,0.3) transparent' }}>

                        {/* Header */}
                        <div className="flex flex-wrap items-start gap-3 mb-4">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-2xl md:text-3xl font-bold text-white font-display leading-tight">{car.name}</h2>
                                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                                        style={{ background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.3)', color: '#D4A843' }}>
                                        {car.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-400">
                                        <Users size={13} className="text-amber-400" />
                                        {car.seats}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">{car.description}</p>

                        {/* Highlights */}
                        {car.highlights.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-xs font-semibold text-amber-400 tracking-widest uppercase mb-3">Key Highlights</h3>
                                <div className="flex flex-wrap gap-2">
                                    {car.highlights.map(h => (
                                        <span key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-200"
                                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            <Star size={10} className="text-amber-400 fill-amber-400" />
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Specs grid */}
                        {car.specs.length > 0 && (
                            <div>
                                <h3 className="text-xs font-semibold text-amber-400 tracking-widest uppercase mb-3">Vehicle Specifications</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {car.specs.map(s => (
                                        <div key={s.label} className="flex items-start gap-3 p-3 rounded-xl"
                                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: '#D4A843' }} />
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                                                <p className="text-sm text-gray-200 font-semibold mt-0.5">{s.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                            <a
                                href="#contact"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(212,168,67,0.15) 0%, rgba(184,144,46,0.15) 100%)',
                                    border: '1px solid rgba(212,168,67,0.35)',
                                    color: '#D4A843',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,168,67,0.25) 0%, rgba(184,144,46,0.25) 100%)')}
                                onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,168,67,0.15) 0%, rgba(184,144,46,0.15) 100%)')}
                            >
                                Book This Vehicle
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
