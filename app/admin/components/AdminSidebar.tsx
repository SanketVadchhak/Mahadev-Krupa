'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Inbox,
    Car,
    MapPin,
    Star,
    LogOut,
    ExternalLink,
    Shield,
    Sparkles,
} from 'lucide-react';

const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
    { label: 'Fleet Management', href: '/admin/fleet', icon: Car },
    { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
    { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'logout' }),
            });
            router.push('/admin/login');
            router.refresh();
        } catch (e) {
            console.error('Logout error:', e);
        }
    };

    return (
        <aside className="w-64 bg-slate-950 text-slate-200 border-r border-amber-500/20 flex flex-col justify-between hidden md:flex shrink-0 min-h-screen sticky top-0">
            {/* Header / Brand */}
            <div>
                <div className="p-6 border-b border-amber-500/10 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
                            <Shield className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <div>
                            <span className="font-extrabold text-base tracking-wide text-white block">MAHADEV KRUPA</span>
                            <span className="text-[10px] tracking-widest text-amber-400 font-semibold uppercase flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-amber-400" /> Admin Control
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-1.5">
                    <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-2">Main Navigation</p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 text-amber-400 border border-amber-500/30 shadow-md shadow-amber-500/5'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                                }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-amber-500/10 space-y-2">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition-colors"
                >
                    <span className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-amber-400" /> View Live Website
                    </span>
                </Link>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 transition-all cursor-pointer"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>
        </aside>
    );
}
