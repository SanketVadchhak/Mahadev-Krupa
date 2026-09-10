'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Car, ShieldCheck, Compass, Star, PhoneCall } from 'lucide-react';

const navItems = [
    { label: 'Services', href: '#services', icon: Sparkles },
    { label: 'Fleet', href: '#fleet', icon: Car },
    { label: 'About', href: '#about', icon: ShieldCheck },
    { label: 'Gallery', href: '#gallery', icon: Compass },
    { label: 'Testimonials', href: '#testimonials', icon: Star },
    { label: 'Contact', href: '#contact', icon: PhoneCall },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when tapping outside of navbar
    useEffect(() => {
        if (!menuOpen) return;
        const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('touchstart', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('touchstart', handleOutsideClick);
        };
    }, [menuOpen]);

    return (
        <>
            {/* Backdrop overlay to dismiss dropdown when tapping outside */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 z-40 md:hidden bg-black/40 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            <motion.nav
                ref={navRef}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled || menuOpen
                        ? 'bg-[#121212]/95 backdrop-blur-xl border-b border-amber-400/20 shadow-xl shadow-black/60'
                        : 'bg-gradient-to-b from-dark-bg/95 via-dark-bg/50 to-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo */}
                        <a href="#hero" className="flex items-center gap-2 group">
                            <img
                                src="/assets/brand/logo.png"
                                alt="Mahadev Krupa Tours & Travels"
                                className="h-[64px] sm:h-[76px] md:h-[84px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </a>

                        {/* Desktop links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map(item => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300 font-medium tracking-wide relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300" />
                                </a>
                            ))}
                            <a
                                href="#contact"
                                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 animate-gradient-shift"
                            >
                                Book Now
                            </a>
                        </div>

                        {/* Mobile Hamburger (3 lines icon) */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden text-white p-2.5 rounded-xl glass-strong border border-amber-400/30 active:scale-95 transition-all duration-200"
                            aria-label="Toggle Navigation"
                        >
                            {menuOpen ? <X size={22} className="text-amber-400" /> : <Menu size={22} className="text-amber-400" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Compact Dropdown — Top Only, 2-Column One-Line Glass Buttons */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="md:hidden overflow-hidden border-t border-amber-400/15 bg-[#121212]/95 backdrop-blur-2xl shadow-2xl"
                        >
                            <div className="px-4 py-4 max-w-lg mx-auto space-y-2.5">
                                {/* 2 Column 1-Line Glassmorphism Buttons Grid */}
                                <div className="grid grid-cols-2 gap-2.5">
                                    {navItems.map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.a
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2, delay: idx * 0.02 }}
                                                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-400/40 text-gray-200 hover:text-white active:scale-95 transition-all duration-200 group"
                                            >
                                                <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-200 shrink-0">
                                                    <Icon size={14} />
                                                </div>
                                                <span className="font-heading font-semibold text-xs sm:text-sm tracking-wide truncate">
                                                    {item.label}
                                                </span>
                                            </motion.a>
                                        );
                                    })}
                                </div>

                                {/* Book Now Button (Full Width Col-Span-2) */}
                                <motion.a
                                    href="#contact"
                                    onClick={() => setMenuOpen(false)}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: 0.15 }}
                                    className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold tracking-widest uppercase text-xs shadow-lg shadow-amber-500/25 text-center active:scale-95 transition-all duration-200"
                                >
                                    Book Now
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}
