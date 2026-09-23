'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, Bell, User, LogOut, Menu, Sparkles } from 'lucide-react';

interface AdminHeaderProps {
    title: string;
    description?: string;
    onToggleMobileSidebar?: () => void;
}

export default function AdminHeader({ title, description, onToggleMobileSidebar }: AdminHeaderProps) {
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
        <header className="bg-slate-950/80 backdrop-blur-md border-b border-amber-500/10 px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleMobileSidebar}
                    className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 md:hidden cursor-pointer"
                    aria-label="Toggle Menu"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div>
                    <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                        {title}
                    </h1>
                    {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
                </div>
            </div>

            {/* Right Action Icons & Admin Profile */}
            <div className="flex items-center gap-3">
                {/* Status Indicator */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    System Live
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button className="p-2 text-slate-400 hover:text-amber-400 rounded-xl bg-slate-900 border border-slate-800 transition-colors relative cursor-pointer">
                        <Bell className="w-4 h-4" />
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-slate-950 animate-ping"></span>
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-slate-950"></span>
                    </button>
                </div>

                {/* Admin User Badge */}
                <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                        <User className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div className="hidden lg:block text-left">
                        <div className="text-xs font-bold text-white leading-none">Administrator</div>
                        <div className="text-[10px] text-amber-400 font-medium">Mahadev Krupa</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
