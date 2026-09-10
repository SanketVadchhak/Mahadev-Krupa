'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className = '', id = '' }: SectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.section
            id={id}
            ref={ref}
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className={`relative ${className}`}
        >
            {children}
        </motion.section>
    );
}
