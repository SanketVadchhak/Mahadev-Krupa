'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Fuel, Gauge, Settings } from 'lucide-react';
import Section from '../ui/Section';
import TiltCard from '../ui/TiltCard';
import { fleet } from '../data/siteData';

export default function FleetSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -400 : 400, behavior: 'smooth' });
        setTimeout(checkScroll, 400);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            checkScroll();
        }
        return () => el?.removeEventListener('scroll', checkScroll);
    }, []);

    return (
        <Section id="fleet" className="py-16 md:py-24 lg:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Our Fleet</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
                            <span className="text-white">Luxury </span>
                            <span className="gradient-text">Vehicle Fleet</span>
                        </h2>
                    </div>
                    <div className="flex gap-3 mt-6 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${canScrollLeft ? 'hover:bg-amber-500/20 text-white' : 'text-gray-600'}`}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${canScrollRight ? 'hover:bg-amber-500/20 text-white' : 'text-gray-600'}`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal scroll track */}
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-4">
                <div className="shrink-0 w-4 lg:w-[calc((100vw-1280px)/2+1rem)]" />
                {fleet.map((car, i) => (
                    <motion.div
                        key={car.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="shrink-0 w-[280px] sm:w-[340px] md:w-[380px]"
                    >
                        <TiltCard className="h-full">
                            <div className="group relative h-full rounded-2xl glass overflow-hidden hover:border-amber-400/30 transition-all duration-500">
                                {/* Car image area */}
                                <div className="relative h-48 bg-gradient-to-br from-dark-surface to-dark-card flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 group-hover:from-amber-500/10 group-hover:to-yellow-500/10 transition-all duration-500" />
                                    <span className="text-8xl group-hover:scale-110 transition-transform duration-500">{car.image}</span>
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs text-amber-400 font-semibold">
                                        {car.type}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-1 font-heading">{car.name}</h3>
                                    <p className="text-2xl font-bold gradient-text mb-4">{car.price}</p>

                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-400"><Users size={14} className="text-amber-400" /> {car.seats} Seats</div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400"><Fuel size={14} className="text-amber-300" /> {car.fuel}</div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400"><Gauge size={14} className="text-yellow-400" /> {car.power}</div>
                                        <div className="flex items-center gap-2 text-sm text-gray-400"><Settings size={14} className="text-amber-500" /> {car.trans}</div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {car.features.map(f => (
                                            <span key={f} className="px-3 py-1 rounded-full bg-dark-surface text-xs text-gray-300 border border-dark-border">{f}</span>
                                        ))}
                                    </div>

                                    <a
                                        href="#contact"
                                        className="w-full block text-center py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-400/20 text-amber-400 font-semibold text-sm hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-300"
                                    >
                                        Book This Vehicle
                                    </a>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                ))}
                <div className="shrink-0 w-4" />
            </div>
        </Section>
    );
}
