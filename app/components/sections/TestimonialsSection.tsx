'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import Section from '../ui/Section';
import { testimonials } from '../data/siteData';

export default function TestimonialsSection() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section id="testimonials" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Testimonials</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
                        <span className="text-white">What Our </span>
                        <span className="gradient-text">Clients Say</span>
                    </h2>
                </div>

                {/* Featured testimonial */}
                <div className="max-w-4xl mx-auto mb-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-2xl glass p-6 md:p-10 lg:p-12 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-4 left-4 text-6xl text-amber-400/10 font-display">&ldquo;</div>
                            <div className="absolute bottom-4 right-4 text-6xl text-amber-400/10 font-display">&rdquo;</div>

                            <div className="flex justify-center mb-6 gap-1">
                                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                                    <Star key={i} size={20} fill="#f59e0b" className="text-amber-500" />
                                ))}
                                {Array.from({ length: 5 - testimonials[active].rating }).map((_, i) => (
                                    <Star key={`e${i}`} size={20} className="text-gray-600" />
                                ))}
                            </div>

                            <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mb-6 md:mb-8 max-w-2xl mx-auto italic">
                                &ldquo;{testimonials[active].text}&rdquo;
                            </p>

                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white font-display">
                                {testimonials[active].name.charAt(0)}
                            </div>
                            <p className="text-white font-bold text-lg font-heading">{testimonials[active].name}</p>
                            <p className="text-gray-500 text-sm">{testimonials[active].role}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dot navigation */}
                <div className="flex justify-center gap-3">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-2 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-gradient-to-r from-amber-400 to-yellow-500' : 'w-2 bg-gray-600 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>

                {/* Small preview cards */}
                <div className="grid md:grid-cols-3 gap-4 mt-12 max-w-5xl mx-auto">
                    {testimonials.slice(0, 3).map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`p-6 rounded-xl glass hover:border-amber-400/30 transition-all duration-300 cursor-pointer ${i === active ? 'border-amber-400/30' : ''}`}
                            onClick={() => setActive(i)}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-yellow-500/30 flex items-center justify-center text-sm font-bold text-white">
                                    {t.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-sm">{t.name}</p>
                                    <p className="text-gray-500 text-xs">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm line-clamp-3">&ldquo;{t.text}&rdquo;</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
