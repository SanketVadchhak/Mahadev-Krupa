'use client';

import React, { useEffect, useState } from 'react';
import {
    Star,
    Plus,
    CheckCircle2,
    XCircle,
    Trash2,
    MessageSquare,
    UserCheck,
    X,
} from 'lucide-react';
import type { TestimonialItem } from '@/app/lib/supabaseServer';

export default function AdminTestimonialsPage() {
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formName, setFormName] = useState('');
    const [formRole, setFormRole] = useState('Tourist / Family Traveler');
    const [formText, setFormText] = useState('');
    const [formRating, setFormRating] = useState(5);
    const [saving, setSaving] = useState(false);

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/testimonials');
            const data = await res.json();
            if (data.success) setTestimonials(data.testimonials || []);
        } catch (e) {
            console.error('Failed to fetch testimonials:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleToggleApproved = async (item: TestimonialItem) => {
        try {
            const updated = !item.approved;
            const res = await fetch('/api/admin/testimonials', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, approved: updated }),
            });
            const data = await res.json();
            if (data.success) {
                setTestimonials((prev) => prev.map((t) => (t.id === item.id ? { ...t, approved: updated } : t)));
            }
        } catch (e) {
            console.error('Failed to toggle approval:', e);
        }
    };

    const handleAddTestimonial = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/admin/testimonials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formName,
                    role: formRole,
                    text: formText,
                    rating: formRating,
                    approved: true,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                setFormName('');
                setFormText('');
                fetchTestimonials();
            }
        } catch (e) {
            console.error('Failed to add testimonial:', e);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setTestimonials((prev) => prev.filter((t) => t.id !== id));
            }
        } catch (e) {
            console.error('Failed to delete testimonial:', e);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl">
                <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                        <Star className="w-6 h-6 text-amber-400" /> Customer Reviews & Testimonials
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Moderate customer reviews and decide which ones display on the homepage.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4 stroke-[3]" /> Add Manual Review
                </button>
            </div>

            {/* Testimonials Grid */}
            {loading ? (
                <div className="py-20 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                    Loading customer testimonials...
                </div>
            ) : testimonials.length === 0 ? (
                <div className="py-20 text-center text-slate-500 text-sm">No reviews found.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="bg-slate-900/90 border border-amber-500/15 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-500/30 transition-all"
                        >
                            <div className="space-y-3">
                                {/* Stars & Status */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {Array.from({ length: item.rating }).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleToggleApproved(item)}
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer ${
                                            item.approved !== false
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                        }`}
                                    >
                                        {item.approved !== false ? 'Approved' : 'Hidden'}
                                    </button>
                                </div>

                                <p className="text-xs text-slate-300 italic leading-relaxed">"{item.text}"</p>
                            </div>

                            {/* Reviewer info */}
                            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                                <div>
                                    <div className="font-extrabold text-sm text-white">{item.name}</div>
                                    {item.role && <div className="text-[11px] text-amber-400">{item.role}</div>}
                                </div>

                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 cursor-pointer"
                                    title="Delete Review"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Review Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                                <Star className="w-5 h-5 text-amber-400" /> Add Customer Review
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddTestimonial} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Customer Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. Ramesh Bhai Patel"
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Role / Location</label>
                                    <input
                                        type="text"
                                        value={formRole}
                                        onChange={(e) => setFormRole(e.target.value)}
                                        placeholder="e.g. Business Traveler, Surat"
                                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Rating Stars</label>
                                    <select
                                        value={formRating}
                                        onChange={(e) => setFormRating(Number(e.target.value))}
                                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                                    >
                                        <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                                        <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                                        <option value={3}>3 Stars ⭐⭐⭐</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Review Text</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formText}
                                    onChange={(e) => setFormText(e.target.value)}
                                    placeholder="Enter review feedback..."
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold hover:from-amber-400 hover:to-yellow-400 transition-all cursor-pointer"
                                >
                                    {saving ? 'Saving...' : 'Add Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
