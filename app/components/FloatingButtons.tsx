'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function FloatingButtons() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 flex flex-col gap-2 sm:gap-3">
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-amber-500/20 transition-all duration-300 group"
                    >
                        <ArrowUp size={18} className="text-amber-400 group-hover:text-white transition-colors" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Plain <a> tags — no framer-motion whileHover to prevent iOS touch jitter */}
            <a
                href="tel:+919714555226"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 active:scale-95"
            >
                <Phone size={20} className="text-white" />
            </a>

            <a
                href="https://wa.me/919714555226"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-600 to-yellow-700 flex items-center justify-center shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40 transition-all duration-300 active:scale-95"
            >
                <MessageCircle size={20} className="text-white" />
            </a>
        </div>
    );
}
