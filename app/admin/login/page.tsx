'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Lock, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get('from') || '/admin';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', username, password }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                router.push(redirectPath);
                router.refresh();
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fillDemoCredentials = () => {
        setUsername('admin');
        setPassword('mahadevkrupa123');
        setError('');
    };

    return (
        <div className="bg-slate-900/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80">
            <h2 className="text-lg font-bold text-white mb-2">Sign In to Dashboard</h2>
            <p className="text-xs text-slate-400 mb-6">Enter your administrative credentials to manage inquiries, fleet, and site content.</p>

            {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-sm hover:from-amber-400 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        <>
                            <span>Access Admin Panel</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            {/* Quick Demo Helper */}
            <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
                <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Quick Fill Credentials
                </button>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md z-10">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-xl shadow-amber-500/20 mb-4">
                        <Shield className="w-9 h-9 stroke-[2.5]" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">MAHADEV KRUPA</h1>
                    <p className="text-xs text-amber-400 font-semibold tracking-widest uppercase mt-1 flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Luxury Travel Admin Portal
                    </p>
                </div>

                <Suspense fallback={<div className="p-8 bg-slate-900 rounded-3xl text-center text-slate-500 text-sm">Loading login portal...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
}
