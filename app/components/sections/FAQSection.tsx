'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle } from 'lucide-react';
import Section from '../ui/Section';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: 'How do I book a car rental or cab with Mahadev Krupa in Surat?',
        answer: 'Booking is simple! You can book directly by calling us at +91 97145 55226, sending a WhatsApp message, or filling out our quick booking form on the website. We confirm bookings instantly with flexible payment options including UPI, bank transfer, and cash.',
    },
    {
        question: 'What vehicles are available in your Surat fleet?',
        answer: 'Our luxury fleet includes 6+1 Kia Carens, 7+1 Toyota Innova Crysta, Ertiga, Tata Winger executive minibus (14+1), Force Urbania luxury buses (12+1 and 16+1), and luxury Tempo Travellers (17+1, 20+1, 24+1) equipped with pushback seats and high-capacity AC.',
    },
    {
        question: 'Do you offer outstation cab packages from Surat to Statue of Unity, Dwarka, Goa, or Rajasthan?',
        answer: 'Yes! We specialize in customized outstation tour packages from Surat to popular destinations including Statue of Unity (Kevadia), Dwarka & Somnath, Saputara, Kutch White Desert, Goa, Rajasthan (Udaipur, Jaipur, Jaisalmer), Daman, and Matheran.',
    },
    {
        question: 'Are driver allowances, fuel, and taxes included in the booking price?',
        answer: 'We provide 100% transparent pricing. Our quotes explicitly detail all charges — including driver allowance, fuel, and vehicle charges — with zero hidden fees or unexpected surcharges.',
    },
    {
        question: 'Can I hire Force Urbania or Tempo Traveller for weddings and family events in Surat?',
        answer: 'Absolutely. We provide decorated luxury car fleets for groom entries/baraat as well as high-capacity Force Urbania and Tempo Travellers for guest transportation across Gujarat and outstation wedding destinations.',
    },
    {
        question: 'Are all your vehicles GPS-tracked for family safety?',
        answer: 'Yes, 100% of our fleet is equipped with real-time GPS tracking systems. Furthermore, all our drivers are background-verified and locally experienced route experts to ensure your family enjoys safe and worry-free travel.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <Section id="faq" className="py-16 md:py-24 lg:py-32">
            {/* JSON-LD Schema for Google FAQ Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3 text-xs text-amber-400 font-semibold uppercase tracking-wider font-heading">
                        <HelpCircle size={14} />
                        Got Questions?
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
                        <span className="text-white">Frequently Asked </span>
                        <span className="gradient-text">Questions</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                        Everything you need to know about our luxury car rentals, outstation packages, and booking policies in Surat.
                    </p>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className="rounded-2xl glass border border-dark-border overflow-hidden transition-all duration-300 hover:border-amber-400/30"
                            >
                                <button
                                    onClick={() => toggle(i)}
                                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                                >
                                    <h3 className="text-base sm:text-lg font-semibold text-white font-heading leading-snug">
                                        {faq.question}
                                    </h3>
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                            isOpen ? 'rotate-180 bg-amber-500/20 text-amber-400' : 'bg-dark-surface text-gray-400'
                                        }`}
                                    >
                                        <ChevronDown size={18} />
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-amber-400/10">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>

                {/* Additional Assistance Box */}
                <div className="mt-12 p-6 rounded-2xl glass bg-gradient-to-r from-amber-500/10 via-transparent to-yellow-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div>
                        <h4 className="text-white font-bold text-base font-heading">Have more questions?</h4>
                        <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                            Our travel team is available 24/7 to help you plan your itinerary.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <a
                            href="tel:+919714555226"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 text-white font-semibold text-xs sm:text-sm hover:bg-amber-600 transition-colors"
                        >
                            <PhoneCall size={14} />
                            Call Us
                        </a>
                        <a
                            href="https://wa.me/919714555226?text=Hi%20Mahadev%20Krupa!%20I%20have%20a%20question%20about%20your%20services."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full neon-border text-white font-semibold text-xs sm:text-sm hover:shadow-lg transition-all"
                        >
                            <MessageCircle size={14} />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </Section>
    );
}
