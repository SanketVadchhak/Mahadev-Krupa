'use client';

import React, { useEffect, useState } from 'react';
import {
    Plus,
    MapPin,
    Calendar,
    Navigation,
    Edit,
    Trash2,
    Sparkles,
    X,
    Eye,
    Star,
} from 'lucide-react';
import type { DestinationItem } from '@/app/lib/supabaseServer';

export default function AdminDestinationsPage() {
    const [destinations, setDestinations] = useState<DestinationItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<DestinationItem | null>(null);

    // Form fields
    const [formName, setFormName] = useState('');
    const [formTagline, setFormTagline] = useState('');
    const [formCoverImage, setFormCoverImage] = useState('');
    const [formDistance, setFormDistance] = useState('');
    const [formBestTime, setFormBestTime] = useState('');
    const [formAbout, setFormAbout] = useState('');
    const [formHighlights, setFormHighlights] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchDestinations = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/destinations');
            const data = await res.json();
            if (data.success) setDestinations(data.destinations || []);
        } catch (e) {
            console.error('Failed to fetch destinations:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDestinations();
    }, []);

    const openAddModal = () => {
        setEditingItem(null);
        setFormName('');
        setFormTagline('');
        setFormCoverImage('');
        setFormDistance('~350 km from Surat');
        setFormBestTime('Oct – Mar');
        setFormAbout('');
        setFormHighlights('Sightseeing, Temple Tour, Local Cuisine');
        setIsModalOpen(true);
    };

    const openEditModal = (item: DestinationItem) => {
        setEditingItem(item);
        setFormName(item.name);
        setFormTagline(item.tagline || '');
        setFormCoverImage(item.cover_image || item.coverImage || '');
        setFormDistance(item.distance || '');
        setFormBestTime(item.best_time || item.bestTime || '');
        setFormAbout(item.about || '');
        setFormHighlights((item.highlights || []).join(', '));
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                id: editingItem?.id,
                name: formName,
                tagline: formTagline,
                cover_image: formCoverImage,
                coverImage: formCoverImage,
                distance: formDistance,
                best_time: formBestTime,
                bestTime: formBestTime,
                about: formAbout,
                highlights: formHighlights.split(',').map((h) => h.trim()).filter(Boolean),
            };

            const method = editingItem ? 'PUT' : 'POST';
            const res = await fetch('/api/admin/destinations', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                fetchDestinations();
            }
        } catch (e) {
            console.error('Failed to save destination:', e);
        } finally {
            setSaving(false);
        }
    };

    const handleToggleFeatured = async (item: DestinationItem) => {
        try {
            const updated = !item.featured;
            const res = await fetch('/api/admin/destinations', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, featured: updated }),
            });
            const data = await res.json();
            if (data.success) {
                setDestinations((prev) => prev.map((d) => (d.id === item.id ? { ...d, featured: updated } : d)));
            }
        } catch (e) {
            console.error('Failed to toggle featured status:', e);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this destination tour package?')) return;
        try {
            const res = await fetch(`/api/admin/destinations?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setDestinations((prev) => prev.filter((d) => d.id !== id));
            }
        } catch (e) {
            console.error('Failed to delete destination:', e);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl">
                <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                        <MapPin className="w-6 h-6 text-amber-400" /> Tour Destinations Management
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Curate tour packages, travel guides, and popular Gujarat tourist spots.</p>
                </div>

                <button
                    onClick={openAddModal}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4 stroke-[3]" /> Add New Destination
                </button>
            </div>

            {/* Destination Grid */}
            {loading ? (
                <div className="py-20 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                    Loading destinations...
                </div>
            ) : destinations.length === 0 ? (
                <div className="py-20 text-center text-slate-500 text-sm">No destinations added yet.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.map((item) => (
                        <div
                            key={item.id}
                            className="bg-slate-900/90 border border-amber-500/15 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                {/* Image Cover */}
                                <div className="relative h-48 bg-slate-950 overflow-hidden">
                                    <img
                                        src={item.cover_image || item.coverImage}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <button
                                            onClick={() => handleToggleFeatured(item)}
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-md flex items-center gap-1 cursor-pointer ${
                                                item.featured !== false
                                                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                                                    : 'bg-slate-900/90 text-slate-400 border-slate-700'
                                            }`}
                                        >
                                            <Star className="w-3 h-3 fill-current" />
                                            {item.featured !== false ? 'Featured' : 'Standard'}
                                        </button>
                                    </div>
                                    {item.distance && (
                                        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-semibold text-amber-400 border border-amber-500/20 flex items-center gap-1">
                                            <Navigation className="w-3 h-3" /> {item.distance}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-3">
                                    <div>
                                        <h3 className="text-lg font-extrabold text-white">{item.name}</h3>
                                        {item.tagline && <p className="text-xs text-amber-400 font-medium mt-0.5">{item.tagline}</p>}
                                    </div>

                                    {item.about && (
                                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.about}</p>
                                    )}

                                    <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                            <span>Best Time: {item.best_time || item.bestTime || 'Oct - Mar'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Actions */}
                            <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
                                <a
                                    href={`/destinations/${item.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-slate-400 hover:text-amber-400 font-semibold flex items-center gap-1"
                                >
                                    <Eye className="w-3.5 h-3.5" /> Preview Page
                                </a>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700 cursor-pointer"
                                    >
                                        <Edit className="w-3.5 h-3.5 text-amber-400" /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 cursor-pointer"
                                        title="Delete Destination"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-amber-400" /> {editingItem ? 'Edit Destination' : 'Add New Destination'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Destination Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. Statue of Unity"
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Tagline</label>
                                <input
                                    type="text"
                                    value={formTagline}
                                    onChange={(e) => setFormTagline(e.target.value)}
                                    placeholder="e.g. World's Tallest Statue & Eco-Tourism Hub"
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Distance</label>
                                    <input
                                        type="text"
                                        value={formDistance}
                                        onChange={(e) => setFormDistance(e.target.value)}
                                        placeholder="e.g. ~240 km from Surat"
                                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Best Time to Visit</label>
                                    <input
                                        type="text"
                                        value={formBestTime}
                                        onChange={(e) => setFormBestTime(e.target.value)}
                                        placeholder="e.g. Oct – Mar"
                                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Cover Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={formCoverImage}
                                    onChange={(e) => setFormCoverImage(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">About Description</label>
                                <textarea
                                    rows={3}
                                    value={formAbout}
                                    onChange={(e) => setFormAbout(e.target.value)}
                                    placeholder="Overview of attractions, itinerary highlights, travel comfort..."
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Highlights (comma separated)</label>
                                <input
                                    type="text"
                                    value={formHighlights}
                                    onChange={(e) => setFormHighlights(e.target.value)}
                                    placeholder="Laser Show, Viewing Gallery, Cactus Garden"
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
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
                                    {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Destination'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
