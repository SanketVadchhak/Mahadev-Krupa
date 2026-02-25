'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import LuxuryCarSVG from '../ui/LuxuryCarSVG';

// Dynamically import the 3D viewer — three.js is browser-only (no SSR)
const UrusViewer = dynamic(() => import('../ui/UrusViewer'), {
    ssr: false,
    loading: () => <LuxuryCarSVG />,  // show SVG while GLB loads
});

export default function HeroSection() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background glow orbs — capped small on mobile to prevent overflow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-48 h-48 sm:w-96 sm:h-96 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-96 sm:h-96 bg-yellow-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-[600px] sm:h-[600px] bg-amber-400/3 rounded-full blur-3xl" />
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            {/* Rotating rings — hidden on mobile so they can't bleed outside 375px */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10">
                    <div className="w-full h-full rounded-full border border-amber-500/30 animate-spin-slow" />
                    <div className="absolute inset-8 rounded-full border border-yellow-400/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
                    <div className="absolute inset-16 rounded-full border border-amber-300/20 animate-spin-slow" style={{ animationDuration: '25s' }} />
                </div>
            </div>

            <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
                {/* Left text — constrained to ~half width on desktop so car shines through */}
                <div className="lg:max-w-[48%]">

                    {/* Left — text content */}
                    <motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-sm">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                <span className="text-gray-300">Gujarat&apos;s Premier Travel Partner</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 font-display"
                        >
                            <span className="text-white">Journey in</span>
                            <br />
                            <span className="gradient-text">Vibrant Luxury</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-base sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-lg font-heading"
                        >
                            The Name of Trusted Travel — Experience Gujarat and beyond in unmatched comfort and style.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-wrap gap-4"
                        >
                            <a
                                href="#contact"
                                className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-semibold text-base sm:text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-500 animate-gradient-shift flex items-center gap-2"
                            >
                                Book Your Ride
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </a>
                            <a
                                href="#fleet"
                                className="px-6 py-3 sm:px-8 sm:py-4 rounded-full neon-border text-white font-semibold text-base sm:text-lg hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-500"
                            >
                                Explore Fleet
                            </a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex items-center flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-12"
                        >
                            {[
                                { num: '500+', label: 'Happy Clients' },
                                { num: '50+', label: 'Luxury Cars' },
                                { num: '10+', label: 'Years Trust' },
                            ].map(stat => (
                                <div key={stat.label}>
                                    <p className="text-2xl font-bold gradient-text font-heading">{stat.num}</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>{/* ← close left-col div */}
            </motion.div>{/* ← close max-w wrapper */}

            {/* ── Urus — absolutely positioned, right half, full hero height ── */}
            {/* Hidden on mobile (shows below on small screens), visible lg+ */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[55%] pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <UrusViewer />
                </motion.div>
                {/* Gradient mask so left text stays readable */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-bg to-transparent pointer-events-none" />
            </div>

            {/* ── Mobile: car below the text ── */}
            <div className="lg:hidden w-full mt-4" style={{ height: '55vw', minHeight: 260, maxHeight: 420 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <UrusViewer />
                </motion.div>
            </div>
        </section>
    );
}

