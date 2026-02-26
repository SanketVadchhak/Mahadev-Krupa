'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';

export interface Destination {
    id: string;
    name: string;
    tagline: string;
    coverImage: string;
    images: string[];
    about: string;
    highlights: string[];
    bestTime: string;
    distance: string;
}

interface Props {
    destination: Destination;
    onClose: () => void;
}

export default function DestinationModal({ destination, onClose }: Props) {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const total = destination.images.length;

    const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
    const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (total > 1) timerRef.current = setInterval(next, 3500);
    }, [next, total]);

    useEffect(() => {
        resetTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [resetTimer]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') { next(); resetTimer(); }
            if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
        };
        window.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
    }, [onClose, next, prev, resetTimer]);

    // Touch support
    const touchStart = useRef<number | null>(null);
    const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart.current === null) return;
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); resetTimer(); }
        touchStart.current = null;
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }} />

                {/* Panel */}
                <motion.div
                    initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    onClick={e => e.stopPropagation()}
                    className="relative w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col"
                    style={{ background: '#141414', border: '1px solid rgba(212,168,67,0.2)' }}
                >
                    {/* Close button */}
                    <button onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.12)' }}>
                        <X size={16} className="text-white" />
                    </button>

                    {/* Image carousel */}
                    <div className="relative shrink-0 overflow-hidden"
                        style={{ height: 280 }}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        {destination.images.map((src, i) => (
                            <img key={i} src={src} alt={`${destination.name} ${i + 1}`}
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                                style={{ opacity: i === current ? 1 : 0 }} />
                        ))}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.3) 50%, transparent 100%)' }} />

                        {/* Counter */}
                        <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs text-white font-medium"
                            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
                            {current + 1} / {total}
                        </div>

                        {/* Nav arrows */}
                        {total > 1 && (<>
                            <button onClick={() => { prev(); resetTimer(); }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                <ChevronLeft size={16} className="text-white" />
                            </button>
                            <button onClick={() => { next(); resetTimer(); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                <ChevronRight size={16} className="text-white" />
                            </button>
                        </>)}

                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {destination.images.map((_, i) => (
                                <button key={i} onClick={() => { setCurrent(i); resetTimer(); }}
                                    className="rounded-full transition-all duration-300"
                                    style={{ width: i === current ? 20 : 6, height: 6, background: i === current ? '#D4A843' : 'rgba(255,255,255,0.35)' }} />
                            ))}
                        </div>

                        {/* Name overlaid at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                            <h2 className="text-2xl font-bold text-white font-heading">{destination.name}</h2>
                            <p className="text-amber-300/80 text-sm font-medium">{destination.tagline}</p>
                        </div>
                    </div>

                    {/* Scrollable content */}
                    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

                        {/* Meta pills */}
                        <div className="flex flex-wrap gap-2">
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-amber-300"
                                style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)' }}>
                                <MapPin size={11} /> {destination.distance} from Surat
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-amber-300"
                                style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)' }}>
                                <Star size={11} /> Best: {destination.bestTime}
                            </span>
                        </div>

                        {/* About */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">About</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{destination.about}</p>
                        </div>

                        {/* Highlights */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">Key Highlights</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {destination.highlights.map(h => (
                                    <div key={h} className="flex items-start gap-2">
                                        <span className="text-amber-400 mt-0.5 shrink-0">✦</span>
                                        <span className="text-gray-300 text-xs leading-relaxed">{h}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Book CTA */}
                        <a href="#contact"
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-[#111] transition-all duration-200"
                            style={{ background: 'linear-gradient(135deg, #D4A843 0%, #B8902E 100%)', boxShadow: '0 4px 18px rgba(212,168,67,0.3)' }}>
                            Book a Trip Here
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
