'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Car, Users, Clock, Shield, CheckCircle2, Phone, MessageCircle, MapPin } from 'lucide-react';
import Section from '../ui/Section';

const whyChooseUs = [
    { title: 'No Hidden Charges', desc: 'Transparent pricing — what we quote is what you pay. No tolls, no fuel surcharges, no surprises.' },
    { title: 'Professional Drivers', desc: 'Verified, experienced drivers who know every route across Gujarat, Rajasthan, Goa, and beyond.' },
    { title: 'Well-Maintained Fleet', desc: 'Every vehicle is deep-cleaned and mechanically inspected before each trip. Your comfort is guaranteed.' },
    { title: 'GPS-Tracked Journeys', desc: 'Real-time tracking on every ride so your family always knows you\u0027re safe on the road.' },
    { title: 'Flexible Cancellations', desc: 'Plans changed? Cancel up to 48 hours before departure for a full refund — no questions asked.' },
    { title: 'Custom Packages Available', desc: 'Don\u0027t see what you need? Call us and we\u0027ll tailor a trip specifically for your group.' },
];

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <Section id="about" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Top: Stats + Story */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

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
                        <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">About Us</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
                            <span className="text-white">A Decade of </span>
                            <span className="gradient-text">Trusted Travel</span>
                        </h2>
                        <div className="space-y-4 text-gray-400 leading-relaxed">
                            <p>
                                <strong className="text-white">Mahadev Krupa Tours & Travels</strong> has been Surat&apos;s most trusted name in luxury ground transportation for over a decade. What started as a small family-run fleet has grown into a premier travel agency with 50+ premium vehicles — from comfortable sedans to full-size luxury coaches — serving over 500 happy families across Gujarat and India.
                            </p>
                            <p>
                                We don&apos;t just provide vehicles — we deliver <span className="text-amber-400">peace of mind</span>. Every vehicle is deep-cleaned before your trip, every driver is locally experienced and professionally trained, and every journey is GPS-tracked so your family always knows you&apos;re safe.
                            </p>
                            <p>
                                Whether you&apos;re planning a <span className="text-yellow-400">family pilgrimage to Dwarka</span>, a weekend getaway to Goa, a grand wedding fleet, or a corporate retreat — we handle everything so you can simply enjoy the journey.
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

                {/* Bottom: Why Choose Us + CTA */}
                <div>
                    <div className="text-center mb-12">
                        <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Why Families Trust Us</span>
                        <h3 className="text-2xl md:text-3xl font-bold font-display">
                            <span className="text-white">The Mahadev Krupa </span>
                            <span className="gradient-text">Promise</span>
                        </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                        {whyChooseUs.map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.07 }}
                                className="p-5 rounded-2xl glass hover:border-amber-400/30 transition-all duration-300 group"
                            >
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 size={18} className="text-amber-400 mt-0.5 shrink-0 group-hover:text-yellow-300 transition-colors" />
                                    <div>
                                        <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact CTA Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative rounded-2xl overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.08) 0%, rgba(212,168,67,0.03) 100%)', border: '1px solid rgba(212,168,67,0.2)' }}
                    >
                        <div className="absolute inset-0 grid-pattern opacity-20" />
                        <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-xl md:text-2xl font-bold text-white font-heading mb-2">
                                    Ready to Plan Your Trip?
                                </h3>
                                <p className="text-gray-400 text-sm max-w-lg">
                                    Talk to our travel experts — we&apos;ll help you pick the right vehicle, plan your route, and give you the best all-inclusive price. No commitment required.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                <a
                                    href="tel:+919714555226"
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 text-sm"
                                >
                                    <Phone size={16} />
                                    Call Now
                                </a>
                                <a
                                    href="https://wa.me/919714555226?text=Hi%20Mahadev%20Krupa!%20I%20would%20like%20to%20know%20more%20about%20your%20travel%20services."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-full neon-border text-white font-semibold hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300 text-sm"
                                >
                                    <MessageCircle size={16} />
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>

                        {/* Address line */}
                        <div className="relative border-t border-amber-400/10 px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                            <MapPin size={13} className="text-amber-400 shrink-0" />
                            <a
                                href="https://maps.app.goo.gl/H3hwoW7uTNTBC4TJA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 text-xs hover:text-amber-400 transition-colors"
                            >
                                Mahadev Car World, B/H Punjan Plaza, BRTS Rd, opp. Vanmali Junction, Surat, Gujarat 395006
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
