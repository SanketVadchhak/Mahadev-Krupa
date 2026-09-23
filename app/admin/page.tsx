'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StatCard from './components/StatCard';
import {
    Inbox,
    Clock,
    Car,
    MapPin,
    ArrowUpRight,
    Plus,
    MessageSquare,
    PhoneCall,
    CheckCircle2,
    Calendar,
    Sparkles,
    Shield,
    RefreshCw,
} from 'lucide-react';
import type { Inquiry } from '@/app/lib/supabaseServer';

export default function AdminDashboardPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [fleetCount, setFleetCount] = useState<number>(0);
    const [destCount, setDestCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [inqRes, fleetRes, destRes] = await Promise.all([
                fetch('/api/admin/inquiries'),
                fetch('/api/admin/fleet'),
                fetch('/api/admin/destinations'),
            ]);

            const inqData = await inqRes.json();
            const fleetData = await fleetRes.json();
            const destData = await destRes.json();

            if (inqData.success) setInquiries(inqData.inquiries || []);
            if (fleetData.success) setFleetCount((fleetData.fleet || []).length);
            if (destData.success) setDestCount((destData.destinations || []).length);
        } catch (e) {
            console.error('Failed to load dashboard data:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const pendingCount = inquiries.filter((i) => i.status === 'pending').length;
    const confirmedCount = inquiries.filter((i) => i.status === 'confirmed').length;

    const statusBadges = {
        pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        contacted: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
        confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header Banner */}
            <div className="relative rounded-3xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-slate-900 border border-amber-500/20 p-6 sm:p-8 overflow-hidden shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
                            <Sparkles className="w-3.5 h-3.5" /> Welcome back, Administrator
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            Mahadev Krupa Tours & Travels
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl">
                            Real-time booking inquiries, vehicle fleet status, and travel package administration.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={fetchData}
                            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-2 transition-all cursor-pointer"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                        </button>
                        <Link
                            href="/admin/inquiries"
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                        >
                            <span>Manage Inquiries</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* KPI Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Inquiries"
                    value={loading ? '...' : inquiries.length}
                    subtext="All customer bookings logged"
                    icon={Inbox}
                    badge={`${confirmedCount} Confirmed`}
                    badgeType="success"
                    colorGradient="from-amber-500/20 to-slate-900"
                />
                <StatCard
                    title="Pending Action"
                    value={loading ? '...' : pendingCount}
                    subtext="Requires callback or response"
                    icon={Clock}
                    badge={pendingCount > 0 ? 'Action Needed' : 'All Clear'}
                    badgeType={pendingCount > 0 ? 'warning' : 'success'}
                    colorGradient="from-yellow-500/20 to-slate-900"
                />
                <StatCard
                    title="Active Fleet"
                    value={loading ? '...' : fleetCount}
                    subtext="Luxury cars & buses listed"
                    icon={Car}
                    badge="100% Ready"
                    badgeType="info"
                    colorGradient="from-amber-600/20 to-slate-900"
                />
                <StatCard
                    title="Destinations"
                    value={loading ? '...' : destCount}
                    subtext="Curated travel packages"
                    icon={MapPin}
                    badge="Featured"
                    badgeType="neutral"
                    colorGradient="from-yellow-600/20 to-slate-900"
                />
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                    href="/admin/inquiries"
                    className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/40 flex items-center gap-4 transition-all duration-200 group"
                >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Inbox className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Review Customer Inquiries</div>
                        <div className="text-xs text-slate-400 mt-0.5">Filter by pending, update notes</div>
                    </div>
                </Link>

                <Link
                    href="/admin/fleet"
                    className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/40 flex items-center gap-4 transition-all duration-200 group"
                >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Manage Fleet Vehicles</div>
                        <div className="text-xs text-slate-400 mt-0.5">Add cars, edit specs, toggle availability</div>
                    </div>
                </Link>

                <Link
                    href="/admin/destinations"
                    className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/20 hover:border-amber-500/40 flex items-center gap-4 transition-all duration-200 group"
                >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">Manage Destinations</div>
                        <div className="text-xs text-slate-400 mt-0.5">Add tour spots, highlights & images</div>
                    </div>
                </Link>
            </div>

            {/* Recent Inquiries Table */}
            <div className="bg-slate-900/90 border border-amber-500/15 rounded-3xl p-6 shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                            <Clock className="w-5 h-5 text-amber-400" /> Recent Inquiries & Booking Requests
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">Latest customer bookings requiring attention</p>
                    </div>

                    <Link
                        href="/admin/inquiries"
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 self-start sm:self-auto"
                    >
                        View All ({inquiries.length}) <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                {loading ? (
                    <div className="py-12 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                        Loading recent inquiries...
                    </div>
                ) : inquiries.length === 0 ? (
                    <div className="py-12 text-center text-slate-500 text-sm">No inquiries logged yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-slate-300">
                            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                                <tr>
                                    <th className="py-3.5 px-4">Customer</th>
                                    <th className="py-3.5 px-4">Vehicle / Trip</th>
                                    <th className="py-3.5 px-4">Pickup Date</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4 text-right">Quick Contact</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {inquiries.slice(0, 5).map((inq) => (
                                    <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="py-4 px-4 font-semibold text-white">
                                            <div>{inq.name}</div>
                                            <div className="text-[11px] text-slate-400 font-normal">{inq.phone}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="font-semibold text-amber-300">{inq.vehicle || 'General Inquiry'}</div>
                                            <div className="text-[11px] text-slate-400">{inq.pickup_location || 'Surat'}</div>
                                        </td>
                                        <td className="py-4 px-4 text-slate-300">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                                <span>{inq.pickup_date || 'ASAP'}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusBadges[inq.status] || statusBadges.pending}`}>
                                                {inq.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <a
                                                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inq.name}, thank you for contacting Mahadev Krupa Tours & Travels regarding your booking for ${inq.vehicle || 'travel'}. How can we assist you today?`)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                                                    title="Send WhatsApp Message"
                                                >
                                                    <MessageSquare className="w-4 h-4" />
                                                </a>
                                                <a
                                                    href={`tel:${inq.phone}`}
                                                    className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
                                                    title="Call Customer"
                                                >
                                                    <PhoneCall className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
