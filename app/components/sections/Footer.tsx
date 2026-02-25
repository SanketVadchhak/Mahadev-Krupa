'use client';

import { Phone, MapPin, Clock, Mail, ChevronRight, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { services } from '../data/siteData';

export default function Footer() {
    return (
        <footer className="relative pt-16 md:pt-24 pb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg to-dark-card" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/10 to-transparent" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center animate-gradient-shift">
                                <span className="text-white font-bold text-xl font-display">M</span>
                            </div>
                            <div>
                                <h3 className="font-bold gradient-text font-heading">MAHADEV KRUPA</h3>
                                <p className="text-xs text-gray-500 tracking-widest uppercase">Tours & Travels</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Gujarat&apos;s premier luxury travel agency. Premium vehicles &amp; professional service.
                        </p>
                        <div className="flex gap-3">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:bg-amber-500/20 hover:text-amber-400 transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-heading">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Services', 'Fleet', 'About Us', 'Gallery', 'Testimonials', 'Contact'].map(link => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-heading">Our Services</h4>
                        <ul className="space-y-3">
                            {services.map(s => (
                                <li key={s.title}>
                                    <a href="#services" className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-heading">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3"><MapPin size={16} className="text-amber-400 mt-0.5 shrink-0" /><span className="text-gray-400 text-sm">B/H Punjan Plaza, BRTS Rd,<br />opp. Vanmali Junction, Surat, Gujarat 395006</span></li>
                            <li className="flex items-center gap-3"><Phone size={16} className="text-amber-400 shrink-0" /><span className="text-gray-400 text-sm">+91 98765 43210</span></li>
                            <li className="flex items-center gap-3"><Mail size={16} className="text-amber-400 shrink-0" /><span className="text-gray-400 text-sm">info@mahadevkrupa.com</span></li>
                            <li className="flex items-center gap-3"><Clock size={16} className="text-amber-400 shrink-0" /><span className="text-gray-400 text-sm">24/7 Service Available</span></li>
                        </ul>
                    </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Mahadev Krupa Tours & Travels. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
