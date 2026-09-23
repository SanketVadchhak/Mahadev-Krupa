'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subtext?: string;
    icon: LucideIcon;
    badge?: string;
    badgeType?: 'success' | 'warning' | 'info' | 'neutral';
    colorGradient?: string;
}

export default function StatCard({
    title,
    value,
    subtext,
    icon: Icon,
    badge,
    badgeType = 'info',
    colorGradient = 'from-amber-500/20 to-yellow-500/5',
}: StatCardProps) {
    const badgeColors = {
        success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        info: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
        neutral: 'bg-slate-800 text-slate-300 border-slate-700',
    };

    return (
        <div className={`p-5 rounded-2xl bg-gradient-to-br ${colorGradient} bg-slate-900/90 border border-amber-500/15 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-amber-500/30 hover:scale-[1.01]`}>
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
                <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{value}</div>
                {badge && (
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeColors[badgeType]}`}>
                        {badge}
                    </span>
                )}
            </div>

            {subtext && <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">{subtext}</p>}
        </div>
    );
}
