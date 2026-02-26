'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Zap, Send, CalendarDays, Users, Car, Phone } from 'lucide-react';
import { fleet } from './data/siteData';
import { supabase } from '@/app/lib/supabase';

interface BookingState {
    date: string;
    passengers: number;
    vehicle: string;
    phone: string;
}

const today = () => new Date().toISOString().split('T')[0];

const fieldClass =
    'w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white text-sm focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/20 hover:border-amber-400/20 transition-all duration-300';

export default function QuickBookingPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [booking, setBooking] = useState<BookingState>({
        date: today(),
        passengers: 2,
        vehicle: '',
        phone: '',
    });

    const selectedVehicle = fleet.find(f => f.name === booking.vehicle);

    const summaryText = [
        selectedVehicle ? selectedVehicle.name.toUpperCase() : 'SELECT VEHICLE',
        `${booking.passengers} Passengers`,
        booking.date,
    ].join(' · ');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Save to Supabase
        const { error } = await supabase.from('inquiries').insert({
            phone: booking.phone,
            name: booking.phone,
            vehicle: booking.vehicle || null,
            date: booking.date,
            message: `Quick Booking — ${booking.passengers} passengers`,
            source: 'quick_booking',
        });
        if (error) console.error('Supabase quick-booking error:', error);

        // Open WhatsApp with pre-filled message
        const waText = encodeURIComponent(
            `Hi! I'd like to book a vehicle through Mahadev Krupa Tours & Travels` +
            (booking.vehicle ? ` — I'm interested in the ${booking.vehicle}` : ', open to vehicle suggestions') +
            ` for ${booking.passengers} passenger${booking.passengers > 1 ? 's' : ''}` +
            ` on ${booking.date}. My number is ${booking.phone}. Can you please check availability and share the pricing? Thanks! 😊`
        );
        window.open(`https://wa.me/919714555226?text=${waText}`, '_blank');

        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setIsOpen(false);
        }, 3000);
    };

    const adjustPassengers = (delta: number) =>
        setBooking(b => ({ ...b, passengers: Math.max(1, Math.min(50, b.passengers + delta)) }));

    const handlePassengerKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') { e.preventDefault(); adjustPassengers(1); }
        if (e.key === 'ArrowDown') { e.preventDefault(); adjustPassengers(-1); }
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center px-0 sm:px-4 sm:pb-5 pointer-events-none">
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="pointer-events-auto w-full sm:max-w-3xl lg:max-w-4xl"
                style={{ willChange: 'auto' }}
            >
                <div className="relative bg-[#111]/95 sm:bg-white/8 backdrop-blur-xl border-t border-x border-amber-400/25 sm:rounded-2xl overflow-hidden shadow-xl shadow-black/50">
                    {/* Amber top glow line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

                    {/* ── Collapsed header ── */}
                    <button
                        onClick={() => setIsOpen(o => !o)}
                        className="w-full flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 group"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shrink-0">
                                <Zap size={15} className="text-white" fill="white" />
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-white font-bold text-sm sm:text-base font-heading leading-none">
                                    Quick Booking
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-500 tracking-widest uppercase mt-0.5 truncate">
                                    {summaryText}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-4">
                            <span className="hidden sm:block text-[10px] tracking-widest text-gray-400 uppercase font-medium">
                                {isOpen ? 'Tap to Close' : 'Tap to Open'}
                            </span>
                            <div className="w-8 h-8 rounded-full glass flex items-center justify-center group-hover:border-amber-400/30 transition-all duration-300">
                                {isOpen
                                    ? <ChevronDown size={16} className="text-amber-400" />
                                    : <ChevronUp size={16} className="text-amber-400" />}
                            </div>
                        </div>
                    </button>

                    {/* ── Expanded form ── */}
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                key="form"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                                style={{ overflow: 'hidden' }}
                            >
                                <div className="px-5 sm:px-8 pb-6 sm:pb-8">
                                    <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mb-5" />

                                    <AnimatePresence mode="wait">
                                        {submitted ? (
                                            <motion.div
                                                key="success"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-center py-6"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                                                    <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <p className="text-white font-bold font-heading">Request Sent!</p>
                                                <p className="text-gray-400 text-sm mt-1">We'll call you back within 30 minutes.</p>
                                            </motion.div>
                                        ) : (
                                            <motion.form
                                                key="form-inner"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                onSubmit={handleSubmit}
                                            >
                                                {/* Row 1: Date · Passengers · Vehicle */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">

                                                    {/* Date */}
                                                    <div className="space-y-1.5">
                                                        <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 tracking-widest uppercase">
                                                            <CalendarDays size={11} className="text-amber-400" /> Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            required
                                                            value={booking.date}
                                                            min={today()}
                                                            onChange={e => setBooking(b => ({ ...b, date: e.target.value }))}
                                                            className={fieldClass}
                                                        />
                                                    </div>

                                                    {/* Passengers — keyboard + buttons */}
                                                    <div className="space-y-1.5">
                                                        <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 tracking-widest uppercase">
                                                            <Users size={11} className="text-amber-400" /> Passengers
                                                        </label>
                                                        <div className="flex items-center rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-amber-400/20 transition-all duration-300">
                                                            <button
                                                                type="button"
                                                                onClick={() => adjustPassengers(-1)}
                                                                className="px-4 py-3 text-amber-400 hover:bg-amber-500/10 transition-colors text-lg font-bold leading-none"
                                                            >−</button>
                                                            <input
                                                                type="number"
                                                                min={1}
                                                                max={50}
                                                                value={booking.passengers}
                                                                onChange={e => {
                                                                    const v = parseInt(e.target.value);
                                                                    if (!isNaN(v)) setBooking(b => ({ ...b, passengers: Math.max(1, Math.min(50, v)) }));
                                                                }}
                                                                onKeyDown={handlePassengerKey}
                                                                className="flex-1 bg-transparent text-center text-white font-semibold text-sm focus:outline-none py-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => adjustPassengers(1)}
                                                                className="px-4 py-3 text-amber-400 hover:bg-amber-500/10 transition-colors text-lg font-bold leading-none"
                                                            >+</button>
                                                        </div>
                                                    </div>

                                                    {/* Vehicle */}
                                                    <div className="space-y-1.5">
                                                        <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 tracking-widest uppercase">
                                                            <Car size={11} className="text-amber-400" /> Vehicle
                                                        </label>
                                                        <select
                                                            value={booking.vehicle}
                                                            onChange={e => setBooking(b => ({ ...b, vehicle: e.target.value }))}
                                                            className={`${fieldClass} appearance-none`}
                                                        >
                                                            <option value="">Any Vehicle</option>
                                                            {fleet.filter(c => !c.isInquiry).map(c => (
                                                                <option key={c.name} value={c.name}>{c.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Row 2: Phone number — full width */}
                                                <div className="space-y-1.5 mb-4">
                                                    <label className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 tracking-widest uppercase">
                                                        <Phone size={11} className="text-amber-400" /> Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        inputMode="numeric"
                                                        required
                                                        placeholder="Your mobile number *"
                                                        value={booking.phone}
                                                        onChange={e => setBooking(b => ({ ...b, phone: e.target.value.replace(/\D/g, '') }))}
                                                        className={`${fieldClass} placeholder-gray-400`}
                                                    />
                                                </div>

                                                {/* Submit */}
                                                <button
                                                    type="submit"
                                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold tracking-widest uppercase text-sm hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <Send size={15} />
                                                    Request Quote
                                                </button>

                                                <p className="text-center text-[10px] text-gray-600 mt-3 uppercase tracking-wider">
                                                    Free quote · No commitment · Reply within 30 min
                                                </p>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
