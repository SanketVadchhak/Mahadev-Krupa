'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import LuxuryCarSVG from '../ui/LuxuryCarSVG';

export default function HeroSection() {

    return (
        <section id="hero" className="relative min-h-screen flex items-start sm:items-center overflow-hidden">
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

            <motion.div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 w-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

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
                            <span className="gradient-text-shimmer">Vibrant Luxury</span>
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

                    {/* Right — Car SVG */}
                    <motion.div className="mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                        >
                            <LuxuryCarSVG />
                            <div className="text-center mt-4">
                                <p className="text-xs text-gray-500 tracking-widest uppercase">Premium Fleet at Your Service</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <p className="text-xs text-gray-500 tracking-widest uppercase">Scroll Down</p>
                <div className="w-6 h-10 rounded-full border-2 border-amber-400/30 flex items-start justify-center p-1">
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-3 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500"
                    />
                </div>
            </motion.div>
        </section>
    );
}
