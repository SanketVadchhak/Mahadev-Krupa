'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft, ChevronRight,
    Users, Wind, Music, Smartphone, ShieldCheck, Luggage,
    Armchair, Star, Send
} from 'lucide-react';
import Section from '../ui/Section';
import { fleet } from '../data/siteData';
import type { FleetCar } from '../data/siteData';
import VehicleModal from '../VehicleModal';
import { bookingStore } from '../data/bookingStore';
import { supabase } from '@/app/lib/supabase';

// ─── Icon map for highlight tags ─────────────────────────────
const HIGHLIGHT_ICONS: Record<string, React.ElementType> = {
    'Captain Seat': Armchair,
    'Premium AC': Wind,
    'Powerful AC': Wind,
    'High-Capacity AC': Wind,
    'Music System': Music,
    'Charging Points': Smartphone,
    'Sun Protectors': ShieldCheck,
    'Safety': ShieldCheck,
    'Pushback Luxury Seats': Armchair,
    'Pushback Seats': Armchair,
    'Wide Leg Space': Users,
    'High Roof': Star,
    'Ambient Lighting': Star,
    'Curtains': Star,
    'Large Luggage': Luggage,
};

function getIcon(highlight: string): React.ElementType {
    // Try exact match first
    if (HIGHLIGHT_ICONS[highlight]) return HIGHLIGHT_ICONS[highlight];
    // Partial keyword match
    const lower = highlight.toLowerCase();
    if (lower.includes('ac') || lower.includes('wind') || lower.includes('cool')) return Wind;
    if (lower.includes('seat') || lower.includes('captain') || lower.includes('pushback')) return Armchair;
    if (lower.includes('music') || lower.includes('audio') || lower.includes('entertain')) return Music;
    if (lower.includes('charg') || lower.includes('mobile') || lower.includes('usb')) return Smartphone;
    if (lower.includes('safe') || lower.includes('sun') || lower.includes('uv')) return ShieldCheck;
    if (lower.includes('luggage') || lower.includes('boot') || lower.includes('space')) return Luggage;
    if (lower.includes('roof') || lower.includes('light') || lower.includes('curtain') || lower.includes('luxury')) return Star;
    if (lower.includes('seat') || lower.includes('passenger')) return Users;
    return Star;
}

// ─── Inquiry Card ─────────────────────────────────────────────
function InquiryCard() {
    const [form, setForm] = useState({ name: '', phone: '', vehicle: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Save to Supabase
        const { error } = await supabase.from('inquiries').insert({
            name: form.name,
            phone: form.phone,
            vehicle: form.vehicle || null,
            message: form.message || null,
            source: 'fleet_inquiry',
        });
        if (error) console.error('Supabase insert error:', error);

        // Also send via WhatsApp
        const text = encodeURIComponent(
            `Hi! I'm ${form.name} and I found Mahadev Krupa Tours & Travels online. I'm looking for a vehicle for an upcoming trip` +
            (form.vehicle ? ` — specifically interested in the ${form.vehicle}` : '') +
            (form.message ? `. ${form.message}` : '') +
            `. Best way to reach me is ${form.phone}. Could you let me know what's available and the pricing? Thanks a lot! 🙏`
        );
        window.open(`https://wa.me/919714555226?text=${text}`, '_blank');
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    const inputStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(212,168,67,0.2)',
        borderRadius: '10px',
        color: '#F0F0F0',
        padding: '10px 14px',
        fontSize: '13px',
        width: '100%',
        outline: 'none',
        transition: 'border-color 0.2s',
    };

    return (
        <div className="h-full rounded-2xl overflow-hidden flex flex-col"
            style={{
                background: 'rgba(20,20,20,0.7)',
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient(rgba(20,20,20,0.7), rgba(20,20,20,0.7)), linear-gradient(135deg, #D4A843, rgba(212,168,67,0.3))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
                backdropFilter: 'blur(8px)',
            }}>
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #D4A843, #B8902E)' }} />
            <div className="flex flex-col flex-1 p-6">
                <div className="mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                        style={{ background: 'rgba(212,168,67,0.12)', border: '1px solid rgba(212,168,67,0.25)' }}>
                        <span className="text-xl">🔍</span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-heading leading-snug">Can&apos;t find your vehicle?</h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Tell us what you&apos;re looking for and we&apos;ll source the perfect vehicle for your journey.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1">
                    <input required placeholder="Your Name *" value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.6)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.2)')} />
                    <input required placeholder="Phone Number *" type="tel" inputMode="numeric" value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value.replace(/\D/g, '') }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.6)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.2)')} />
                    <input placeholder="Vehicle Preference (e.g. 12-seater luxury van)" value={form.vehicle}
                        onChange={e => setForm(p => ({ ...p, vehicle: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.6)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.2)')} />
                    <textarea rows={3} placeholder="Additional requirements or message…" value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        style={{ ...inputStyle, resize: 'none' }}
                        onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.6)')}
                        onBlur={e => (e.currentTarget.style.borderColor = 'rgba(212,168,67,0.2)')} />
                    <button type="submit"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold mt-auto transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #D4A843 0%, #B8902E 100%)', color: '#111', boxShadow: '0 4px 20px rgba(212,168,67,0.3)' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                        <Send size={14} />
                        {sent ? 'Request Sent! ✓' : 'Send Inquiry via WhatsApp'}
                    </button>
                </form>
            </div>
        </div>
    );
}

// ─── Vehicle Card ─────────────────────────────────────────────
function VehicleCard({ car, onViewDetails, index }: { car: FleetCar; onViewDetails: () => void; index: number }) {
    const topHighlights = car.highlights.slice(0, 6);

    const handleBook = () => {
        bookingStore.selectVehicle(car.name);
        setTimeout(() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="shrink-0 w-[280px] sm:w-[320px] md:w-[355px]"
        >
            <div
                className="group relative flex flex-col rounded-2xl overflow-hidden"
                style={{
                    background: 'linear-gradient(170deg, #1d1d1d 0%, #161616 100%)',
                    border: '1px solid rgba(212,168,67,0.18)',
                    boxShadow: '0 6px 32px rgba(0,0,0,0.5)',
                    transition: 'border-color 0.35s, transform 0.35s, box-shadow 0.35s',
                }}
                onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(212,168,67,0.5)';
                    el.style.transform = 'translateY(-5px)';
                    el.style.boxShadow = '0 24px 64px rgba(212,168,67,0.14), 0 6px 32px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = 'rgba(212,168,67,0.18)';
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = '0 6px 32px rgba(0,0,0,0.5)';
                }}
            >
                {/* Gold accent top bar */}
                <div className="h-[3px] w-full shrink-0"
                    style={{ background: 'linear-gradient(90deg, transparent, #D4A843 40%, #B8902E 70%, transparent)' }} />

                {/* ── Image with overlaid name / category ── */}
                <div className="relative shrink-0 overflow-hidden" style={{ height: 210 }}>
                    {/* placeholder bg */}
                    <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, #1a1a1a, #222)' }} />

                    <img
                        src={car.coverImage}
                        alt={car.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                        style={{ transition: 'transform 0.7s ease' }}
                    />

                    {/* Strong bottom fade so text is readable */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(18,18,18,0.95) 0%, rgba(18,18,18,0.5) 38%, transparent 65%)' }} />

                    {/* Category pill — top left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide"
                        style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(212,168,67,0.4)', color: '#D4A843', backdropFilter: 'blur(6px)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                        {car.category}
                    </div>

                    {/* Name + seats overlaid at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                        <h3 className="text-[17px] font-bold text-white font-heading leading-tight drop-shadow-lg">{car.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Users size={11} className="text-amber-400" />
                            <span className="text-xs text-amber-300/80 font-medium">{car.seats} Seats</span>
                        </div>
                    </div>
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-col flex-1 px-4 pt-4 pb-4">

                    {/* ── 6-point feature list ── */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
                        {topHighlights.map(h => {
                            const Icon = getIcon(h);
                            return (
                                <div key={h} className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                                        style={{ background: 'rgba(212,168,67,0.1)' }}>
                                        <Icon size={12} className="text-amber-400" />
                                    </div>
                                    <span className="text-[11.5px] text-gray-300 leading-tight">{h}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="mb-4" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,168,67,0.2) 50%, transparent)' }} />

                    {/* ── Vertical action buttons ── */}
                    <div className="flex flex-col gap-2.5 mt-auto">
                        {/* Book Now — primary gold */}
                        <button
                            onClick={handleBook}
                            className="w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
                            style={{
                                background: 'linear-gradient(135deg, #D4A843 0%, #C49A35 50%, #B8902E 100%)',
                                color: '#111',
                                boxShadow: '0 4px 18px rgba(212,168,67,0.3)',
                                letterSpacing: '0.03em',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.boxShadow = '0 6px 26px rgba(212,168,67,0.5)';
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.boxShadow = '0 4px 18px rgba(212,168,67,0.3)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            Book Now
                        </button>

                        {/* View Details — ghost */}
                        <button
                            onClick={onViewDetails}
                            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(212,168,67,0.22)',
                                color: '#D4A843',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(212,168,67,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(212,168,67,0.45)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.borderColor = 'rgba(212,168,67,0.22)';
                            }}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
// ─── Fleet Section ─────────────────────────────────────────────
export default function FleetSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [selectedCar, setSelectedCar] = useState<FleetCar | null>(null);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (dir: 'left' | 'right') => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
        setTimeout(checkScroll, 400);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            checkScroll();
        }
        return () => el?.removeEventListener('scroll', checkScroll);
    }, []);

    const vehicles = fleet.filter(c => !c.isInquiry);
    const inquiryCard = fleet.find(c => c.isInquiry);

    return (
        <>
            <Section id="fleet" className="py-16 md:py-24 lg:py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                        <div>
                            <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Our Fleet</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display">
                                <span className="text-white">Luxury </span>
                                <span className="gradient-text">Vehicle Fleet</span>
                            </h2>
                            <p className="text-gray-400 mt-3 max-w-lg text-sm md:text-base">
                                From intimate family getaways to large group expeditions — discover our hand-curated collection of premium vehicles.
                            </p>
                        </div>
                        <div className="flex gap-3 mt-6 md:mt-0">
                            <button onClick={() => scroll('left')} disabled={!canScrollLeft}
                                className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${canScrollLeft ? 'hover:bg-amber-500/20 text-white' : 'text-gray-600'}`}>
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => scroll('right')} disabled={!canScrollRight}
                                className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${canScrollRight ? 'hover:bg-amber-500/20 text-white' : 'text-gray-600'}`}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal scroll track */}
                <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-6">
                    <div className="shrink-0 w-4 lg:w-[calc((100vw-1280px)/2+1rem)]" />

                    {vehicles.map((car, i) => (
                        <VehicleCard
                            key={car.id}
                            car={car}
                            index={i}
                            onViewDetails={() => setSelectedCar(car)}
                        />
                    ))}

                    {inquiryCard && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: vehicles.length * 0.08 }}
                            className="shrink-0 w-[280px] sm:w-[330px] md:w-[370px]"
                        >
                            <InquiryCard />
                        </motion.div>
                    )}

                    <div className="shrink-0 w-4" />
                </div>
            </Section>

            {/* Modal */}
            <AnimatePresence>
                {selectedCar && (
                    <VehicleModal
                        key={selectedCar.id}
                        car={selectedCar}
                        onClose={() => setSelectedCar(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
