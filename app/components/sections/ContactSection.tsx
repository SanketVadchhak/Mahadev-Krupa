'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, Send } from 'lucide-react';
import Section from '../ui/Section';
import { fleet } from '../data/siteData';

const inputClass =
    'w-full px-4 py-3 rounded-xl bg-dark-surface/50 border border-dark-border text-white placeholder-gray-500 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/20 transition-all duration-300 text-base';

const MAPS_LINK = 'https://maps.app.goo.gl/H3hwoW7uTNTBC4TJA';
const MAPS_EMBED = 'https://maps.google.com/maps?q=Mahadev+Car+World,+BRTS+Rd,+Surat,+Gujarat+395006,+India&output=embed&hl=en&z=16';

const contactInfo = [
    { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: 'Available 24/7', href: 'tel:+919876543210' },
    { icon: Mail, label: 'Email Us', value: 'info@mahadevkrupa.com', sub: 'Quick response guaranteed', href: 'mailto:info@mahadevkrupa.com' },
    { icon: MapPin, label: 'Office', value: 'Mahadev Car World, B/H Punjan Plaza, BRTS Rd, opp. Vanmali Junction, Surat, Gujarat 395006', sub: 'Tap to open in Maps', href: MAPS_LINK },
    { icon: Clock, label: 'Working Hours', value: '24 Hours / 7 Days', sub: 'Always at your service', href: null },
];

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', pickup: '', drop: '', date: '', vehicle: '', message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', phone: '', email: '', pickup: '', drop: '', date: '', vehicle: '', message: '' });
    };

    return (
        <Section id="contact" className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Left — contact info */}
                    <div>
                        <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Get in Touch</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">
                            <span className="text-white">Book Your </span>
                            <span className="gradient-text">Dream Ride</span>
                        </h2>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Fill in the form and our team will get back to you within 30 minutes with a personalized quote. Or reach us directly through the contact details below.
                        </p>

                        <div className="space-y-6">
                            {contactInfo.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0 group-hover:border-amber-400/30 transition-all duration-300">
                                        <item.icon size={20} className="text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-white font-semibold hover:text-amber-400 transition-colors leading-snug block">{item.value}</a>
                                        ) : (
                                            <p className="text-white font-semibold">{item.value}</p>
                                        )}
                                        <p className="text-xs text-gray-500">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Google Maps embed */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-8"
                        >
                            <div className="rounded-2xl overflow-hidden border border-dark-border" style={{ height: '240px' }}>
                                <iframe
                                    src={MAPS_EMBED}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) contrast(0.9)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Mahadev Krupa Office Location"
                                />
                            </div>
                            <a
                                href={MAPS_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl glass hover:border-amber-400/30 text-amber-400 font-semibold text-sm transition-all duration-300"
                            >
                                <MapPin size={16} />
                                Get Directions on Google Maps
                            </a>
                        </motion.div>
                    </div>

                    {/* Right — form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="rounded-2xl glass p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-2xl" />

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-12 relative"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 font-heading">Inquiry Sent!</h3>
                                        <p className="text-gray-400">Our team will contact you within 30 minutes.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="relative space-y-4"
                                    >
                                        <h3 className="text-xl font-bold text-white mb-6 font-heading">Quick Inquiry Form</h3>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Your Name *" required value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                                            <input type="tel" placeholder="Phone Number *" required value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
                                        </div>

                                        <input type="email" placeholder="Email Address" value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputClass} />

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Pickup Location *" required value={formData.pickup}
                                                onChange={e => setFormData({ ...formData, pickup: e.target.value })} className={inputClass} />
                                            <input type="text" placeholder="Drop Location *" required value={formData.drop}
                                                onChange={e => setFormData({ ...formData, drop: e.target.value })} className={inputClass} />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <input type="date" required value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })} className={inputClass} />
                                            <select value={formData.vehicle}
                                                onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                                                className={inputClass}
                                            >
                                                <option value="">Select Vehicle</option>
                                                {fleet.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                            </select>
                                        </div>

                                        <textarea placeholder="Special Requests or Message..." rows={3} value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            className={`${inputClass} resize-none`}
                                        />

                                        <button type="submit"
                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-500 animate-gradient-shift flex items-center justify-center gap-2"
                                        >
                                            <Send size={18} />
                                            Send Inquiry
                                        </button>

                                        <p className="text-xs text-gray-500 text-center">We respect your privacy. No spam, ever.</p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
