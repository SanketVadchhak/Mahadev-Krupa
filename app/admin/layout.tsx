'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import Link from 'next/link';
import { LayoutDashboard, Inbox, Car, MapPin, Star, LogOut, ExternalLink, X } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/admin/login';
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    if (isLoginPage) {
        return <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">{children}</div>;
    }

    const getPageTitle = () => {
        if (pathname === '/admin') return 'Dashboard Overview';
        if (pathname.startsWith('/admin/inquiries')) return 'Customer Inquiries & Bookings';
        if (pathname.startsWith('/admin/fleet')) return 'Fleet Vehicles Management';
        if (pathname.startsWith('/admin/destinations')) return 'Tour Destinations Management';
        if (pathname.startsWith('/admin/testimonials')) return 'Customer Reviews & Testimonials';
        return 'Admin Portal';
    };

    const getPageDescription = () => {
        if (pathname === '/admin') return 'Live performance metrics, recent customer bookings, and agency operations';
        if (pathname.startsWith('/admin/inquiries')) return 'Manage inquiries, update statuses, add notes, and trigger instant WhatsApp responses';
        if (pathname.startsWith('/admin/fleet')) return 'Add, edit, or toggle availability of luxury vehicles in your fleet';
        if (pathname.startsWith('/admin/destinations')) return 'Curate travel packages, tour guides, and popular tourist spots';
        if (pathname.startsWith('/admin/testimonials')) return 'Moderate customer feedback and feature top reviews on the website';
        return 'Mahadev Krupa Tours & Travels Management Control';
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <AdminSidebar />

            {/* Mobile Drawer Overlay */}
            {mobileSidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
                    <div className="relative w-72 bg-slate-950 border-r border-amber-500/20 p-6 flex flex-col justify-between z-10">
                        <div>
                            <div className="flex items-center justify-between pb-6 border-b border-amber-500/10">
                                <span className="font-extrabold text-lg text-white">MAHADEV KRUPA</span>
                                <button onClick={() => setMobileSidebarOpen(false)} className="text-slate-400 hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="mt-6 space-y-2">
                                <Link
                                    href="/admin"
                                    onClick={() => setMobileSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                                        pathname === '/admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'
                                    }`}
                                >
                                    <LayoutDashboard className="w-5 h-5" /> Dashboard
                                </Link>
                                <Link
                                    href="/admin/inquiries"
                                    onClick={() => setMobileSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                                        pathname.startsWith('/admin/inquiries') ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'
                                    }`}
                                >
                                    <Inbox className="w-5 h-5" /> Inquiries
                                </Link>
                                <Link
                                    href="/admin/fleet"
                                    onClick={() => setMobileSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                                        pathname.startsWith('/admin/fleet') ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'
                                    }`}
                                >
                                    <Car className="w-5 h-5" /> Fleet
                                </Link>
                                <Link
                                    href="/admin/destinations"
                                    onClick={() => setMobileSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                                        pathname.startsWith('/admin/destinations') ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'
                                    }`}
                                >
                                    <MapPin className="w-5 h-5" /> Destinations
                                </Link>
                                <Link
                                    href="/admin/testimonials"
                                    onClick={() => setMobileSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                                        pathname.startsWith('/admin/testimonials') ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'
                                    }`}
                                >
                                    <Star className="w-5 h-5" /> Testimonials
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <AdminHeader
                    title={getPageTitle()}
                    description={getPageDescription()}
                    onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
                />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
            </div>
        </div>
    );
}
