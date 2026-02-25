'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Section from '../ui/Section';
import { gallery } from '../data/siteData';

export default function GallerySection() {
    return (
        <Section id="gallery" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Destinations</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
                        <span className="text-white">Explore </span>
                        <span className="gradient-text">Our Gallery</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        From the white deserts of Kutch to the sacred shores of Dwarka — discover Gujarat&apos;s most breathtaking destinations.
                    </p>
                </div>

                {/* Masonry grid — defined in globals.css, 1 col mobile, 2 tablet, 3 desktop */}
                <div className="masonry-grid">
                    {gallery.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="masonry-item"
                        >
                            <div className={`group relative ${item.h} rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-dark-border hover:border-amber-400/30 transition-all duration-500`}>
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />
                                <div className="absolute inset-0 grid-pattern opacity-30" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                                    <div className="text-6xl">
                                        {i % 3 === 0 ? '🏔️' : i % 3 === 1 ? '🛕' : '🏖️'}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-white font-bold text-lg font-heading">{item.title}</h3>
                                    <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore this destination →</p>
                                </div>
                                <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ChevronRight size={14} className="text-white" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
