'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Car, Users, Clock, Shield } from 'lucide-react';
import Section from '../ui/Section';

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <Section id="about" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left — stats card */}
                    <div ref={ref} className="relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Decorative circles */}
                            <div className="absolute -top-8 -left-8 w-64 h-64 rounded-full border border-amber-400/10 animate-spin-slow" />
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border border-yellow-400/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

                            <div className="relative rounded-2xl glass p-8 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
                                <div className="relative">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {[
                                            { num: '10+', label: 'Years of Excellence', icon: Calendar },
                                            { num: '50+', label: 'Premium Vehicles', icon: Car },
                                            { num: '500+', label: 'Satisfied Clients', icon: Users },
                                            { num: '24/7', label: 'Service Available', icon: Clock },
                                        ].map((item, i) => (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: 0.2 + i * 0.1 }}
                                                className="p-4 rounded-xl bg-dark-surface/50 border border-dark-border text-center group hover:border-amber-400/30 transition-all duration-300"
                                            >
                                                <item.icon className="mx-auto mb-2 text-amber-400 group-hover:text-yellow-300 transition-colors" size={20} />
                                                <p className="text-2xl font-bold gradient-text font-heading">{item.num}</p>
                                                <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-6" />

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shrink-0">
                                            <Shield className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold text-sm">100% GPS Tracked Fleet</p>
                                            <p className="text-gray-500 text-xs">Real-time tracking for every journey</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — content */}
                    <div>
                        <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Our Legacy</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
                            <span className="text-white">A Decade of </span>
                            <span className="gradient-text">Trusted Travel</span>
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                <strong className="text-white">Mahadev Krupa Tours & Travels</strong> has been Gujarat&apos;s most trusted name in luxury ground transportation for over a decade. Founded with a vision to redefine travel comfort, we have grown from a small fleet to a premier travel agency serving thousands of satisfied clients.
                            </p>
                            <p>
                                Our commitment goes beyond just providing vehicles. We deliver <span className="text-amber-400">experiences</span> — from the moment you book to the moment you reach your destination. Every vehicle in our fleet is meticulously maintained, every driver professionally trained, and every journey GPS-tracked for your complete peace of mind.
                            </p>
                            <p>
                                Whether it&apos;s a corporate event, a dream wedding, a family vacation, or a simple airport transfer, we bring the same level of <span className="text-yellow-400">dedication and luxury</span> to every ride.
                            </p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a href="#contact" className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300">
                                Start Your Journey
                            </a>
                            <a href="#fleet" className="px-6 py-3 rounded-full neon-border text-white font-semibold hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300">
                                View Our Fleet
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
