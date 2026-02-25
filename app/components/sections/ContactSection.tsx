'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, Send } from 'lucide-react';
import Section from '../ui/Section';
import { fleet } from '../data/siteData';

const inputClass =
    'w-full px-4 py-3 rounded-xl bg-dark-surface/50 border border-dark-border text-white placeholder-gray-500 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/20 transition-all duration-300 text-base';

const contactInfo = [
    { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: 'Available 24/7' },
    { icon: Mail, label: 'Email Us', value: 'info@mahadevkrupa.com', sub: 'Quick response guaranteed' },
    { icon: MapPin, label: 'Office', value: 'B/H Punjan Plaza, BRTS Rd, opp. Vanmali Junction, Surat, Gujarat 395006', sub: 'Visit us anytime — click map below' },
    { icon: Clock, label: 'Working Hours', value: '24 Hours / 7 Days', sub: 'Always at your service' },
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
                                        <p className="text-white font-semibold">{item.value}</p>
                                        <p className="text-xs text-gray-500">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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

                {/* Google Maps embed */}
                <div className="mt-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shrink-0">
                            <MapPin size={16} className="text-white" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">Mahadev Car World</p>
                            <p className="text-gray-500 text-xs">B/H Punjan Plaza, BRTS Rd, opp. Vanmali Junction, Surat, Gujarat 395006</p>
                        </div>
                        <a
                            href="https://www.google.com/maps/place/Mahadev+Car+World/@21.2046777,72.8876276,16z"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto px-4 py-1.5 rounded-full glass text-amber-400 text-xs font-semibold hover:border-amber-400/40 transition-all duration-300 whitespace-nowrap"
                        >
                            Open in Maps ↗
                        </a>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-dark-border h-64 sm:h-80">
                        <iframe
                            src="https://maps.google.com/maps?q=21.2046777,72.8876276&z=16&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mahadev Car World Location"
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
}
