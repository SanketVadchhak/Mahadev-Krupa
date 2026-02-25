'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';

const links = ['Services', 'Fleet', 'About', 'Gallery', 'Testimonials', 'Contact'];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg shadow-amber-900/20' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <a href="#hero" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center animate-gradient-shift">
                            <span className="text-white font-bold text-lg font-display">M</span>
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-sm font-bold gradient-text font-heading tracking-wide">MAHADEV KRUPA</h1>
                            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Tours & Travels</p>
                        </div>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map(link => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300 font-medium tracking-wide relative group"
                            >
                                {link}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 animate-gradient-shift"
                        >
                            Book Now
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-strong"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {links.map(link => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-gray-300 hover:text-amber-400 transition-colors py-2 font-medium"
                                >
                                    {link}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMenuOpen(false)}
                                className="block text-center px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold"
                            >
                                Book Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
