'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Section from '../ui/Section';
import { destinations, Destination } from '../data/siteData';
import DestinationModal from '../DestinationModal';

// Varying heights like the original masonry — cycles through the list
const heights = ['h-64', 'h-80', 'h-72', 'h-56', 'h-96', 'h-64', 'h-64', 'h-80', 'h-72'];

export default function GallerySection() {
    const [selected, setSelected] = useState<Destination | null>(null);

    return (
        <Section id="gallery" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">
                        Destinations
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
                        <span className="text-white">Explore </span>
                        <span className="gradient-text">Our Gallery</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                        From the white deserts of Kutch to the sacred shores of Dwarka — discover Gujarat&apos;s most breathtaking destinations.
                    </p>
                </div>

                {/* Masonry grid — same layout as before */}
                <div className="masonry-grid">
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
                                {/* Real cover photo */}
                                <img
                                    src={dest.coverImage}
                                    alt={dest.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />

                                {/* Bottom label */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <h3 className="text-white font-bold text-lg font-heading">{dest.name}</h3>
                                    <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {dest.tagline} →
                                    </p>
                                </div>

                                {/* Arrow badge */}
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
