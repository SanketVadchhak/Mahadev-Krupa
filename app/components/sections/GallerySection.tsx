'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Section from '../ui/Section';
import { destinations, Destination } from '../data/siteData';
import DestinationModal from '../DestinationModal';

// Varying heights like the original masonry for desktop
const heights = ['h-64', 'h-80', 'h-72', 'h-56', 'h-96', 'h-64', 'h-64', 'h-80', 'h-72'];

export default function GallerySection() {
    const [selected, setSelected] = useState<Destination | null>(null);
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
        scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
        setTimeout(checkScroll, 350);
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
        <Section id="gallery" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-16">
                    <div>
                        <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-3 block font-heading">
                            Destinations
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
                            <span className="text-white">Explore </span>
                            <span className="gradient-text">Our Gallery</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl text-base md:text-lg mt-2">
                            From the white deserts of Kutch to the sacred shores of Dwarka — discover Gujarat&apos;s most breathtaking destinations.
                        </p>
                    </div>

                    {/* Mobile slider navigation arrows */}
                    <div className="flex items-center gap-3 mt-6 md:hidden">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 ${canScrollLeft ? 'hover:bg-amber-500/20 text-amber-400 border-amber-400/30' : 'text-gray-600 border-white/5 opacity-50'}`}
                            aria-label="Previous destination"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 ${canScrollRight ? 'hover:bg-amber-500/20 text-amber-400 border-amber-400/30' : 'text-gray-600 border-white/5 opacity-50'}`}
                            aria-label="Next destination"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Mobile Touch Slider (Visible on < md) */}
                <div
                    ref={scrollRef}
                    className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4"
                >
                    {destinations.map((dest) => (
                        <div key={dest.id} className="snap-center shrink-0 w-[280px] sm:w-[320px]">
                            <button
                                onClick={() => setSelected(dest)}
                                className="group relative w-full h-[360px] rounded-2xl overflow-hidden border border-dark-border hover:border-amber-400/40 transition-all duration-300 focus:outline-none text-left block"
                            >
                                <img
                                    src={dest.coverImage}
                                    alt={`${dest.name} Tour Package from Surat`}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />

                                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold text-amber-400 glass border border-amber-400/30">
                                    {dest.distance}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase block mb-1">
                                        {dest.tagline}
                                    </span>
                                    <h3 className="text-white font-bold text-xl font-heading flex items-center justify-between">
                                        {dest.name}
                                        <ChevronRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
                                    </h3>
                                    <p className="text-gray-300 text-xs mt-2 line-clamp-2 leading-relaxed">
                                        {dest.about}
                                    </p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Desktop Masonry grid (Visible on md and above) */}
                <div className="hidden md:block masonry-grid">
                    {destinations.map((dest, i) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="masonry-item"
                        >
                            <button
                                onClick={() => setSelected(dest)}
                                className={`group relative w-full ${heights[i]} rounded-2xl overflow-hidden border border-dark-border hover:border-amber-400/30 transition-all duration-500 focus:outline-none`}
                            >
                                <img
                                    src={dest.coverImage}
                                    alt={`${dest.name} Tour Package from Surat`}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-white font-bold text-lg font-heading">{dest.name}</h3>
                                    <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {dest.tagline} →
                                    </p>
                                </div>
                                <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ChevronRight size={14} className="text-white" />
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <DestinationModal
                        destination={selected}
                        onClose={() => setSelected(null)}
                    />
                )}
            </AnimatePresence>
        </Section>
    );
}
