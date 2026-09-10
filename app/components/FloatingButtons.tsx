'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingButtons() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-8 right-4 sm:bottom-10 sm:right-6 z-[9999] flex flex-col gap-3 pointer-events-auto">
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full glass flex items-center justify-center hover:bg-amber-500/20 transition-all duration-300 shadow-xl group border-none"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={20} className="text-amber-400 group-hover:text-white transition-colors" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Direct Call Button — Round & Borderless */}
            <a
                href="tel:+919714555226"
                aria-label="Call Mahadev Krupa"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/40 hover:scale-105 transition-all duration-300 active:scale-95 border-none"
            >
                <Phone size={22} className="text-white drop-shadow-md" />
            </a>

            {/* Direct WhatsApp Button — Round & Borderless */}
            <a
                href="https://wa.me/919714555226?text=Hi!%20I'd%20like%20to%20inquire%20about%20vehicle%20rentals."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-600 via-yellow-600 to-amber-700 flex items-center justify-center shadow-2xl shadow-amber-600/40 hover:scale-105 transition-all duration-300 active:scale-95 border-none"
            >
                <MessageCircle size={22} className="text-white drop-shadow-md" />
            </a>
        </div>
    );
}
