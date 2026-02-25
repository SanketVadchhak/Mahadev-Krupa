'use client';

import { motion } from 'framer-motion';
import Section from '../ui/Section';
import TiltCard from '../ui/TiltCard';
import { services } from '../data/siteData';

export default function ServicesSection() {
    return (
        <Section id="services" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <motion.span className="inline-block text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 font-heading">
                        What We Offer
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
                        <span className="text-white">Our Premium </span>
                        <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                        From local rides to grand weddings, we deliver luxury on wheels with uncompromising quality.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <TiltCard className="h-full">
                                <div className="group relative h-full p-6 sm:p-8 rounded-2xl glass hover:border-amber-500/30 transition-all duration-500 overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${s.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />
                                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                        <s.icon className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 font-heading">{s.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
                                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
