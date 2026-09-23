'use client';

import React, { useEffect, useState } from 'react';
import {
    Plus,
    Car,
    Users,
    CheckCircle2,
    XCircle,
    Edit,
    Trash2,
    Image as ImageIcon,
    Sparkles,
    X,
    Eye,
} from 'lucide-react';
import type { FleetItem } from '@/app/lib/supabaseServer';

export default function AdminFleetPage() {
    const [fleet, setFleet] = useState<FleetItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FleetItem | null>(null);

    // Form fields
    const [formName, setFormName] = useState('');
    const [formCategory, setFormCategory] = useState('');
    const [formSeats, setFormSeats] = useState('');
    const [formImage, setFormImage] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formHighlights, setFormHighlights] = useState('');
    const [saving, setSaving] = useState(false);

    const fetchFleet = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/fleet');
            const data = await res.json();
            if (data.success) setFleet(data.fleet || []);
        } catch (e) {
            console.error('Failed to fetch fleet:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFleet();
    }, []);

    const openAddModal = () => {
        setEditingItem(null);
        setFormName('');
        setFormCategory('Luxury SUV / MPV');
        setFormSeats('6 + 1 Driver');
        setFormImage('');
        setFormDescription('');
        setFormHighlights('Captain Seats, Dual AC, Premium Sound');
        setIsModalOpen(true);
    };

    const openEditModal = (item: FleetItem) => {
        setEditingItem(item);
        setFormName(item.name);
        setFormCategory(item.category);
        setFormSeats(item.seats);
        setFormImage(item.cover_image || item.coverImage || '');
        setFormDescription(item.description || '');
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
                category: formCategory,
                seats: formSeats,
                cover_image: formImage,
                coverImage: formImage,
                description: formDescription,
                highlights: formHighlights.split(',').map((h) => h.trim()).filter(Boolean),
            };

            const method = editingItem ? 'PUT' : 'POST';
            const res = await fetch('/api/admin/fleet', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.success) {
                setIsModalOpen(false);
                fetchFleet();
            }
        } catch (e) {
            console.error('Failed to save vehicle:', e);
        } finally {
            setSaving(false);
        }
    };

    const handleToggleAvailable = async (item: FleetItem) => {
        try {
            const updated = !item.available;
            const res = await fetch('/api/admin/fleet', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: item.id, available: updated }),
            });
            const data = await res.json();
            if (data.success) {
                setFleet((prev) => prev.map((f) => (f.id === item.id ? { ...f, available: updated } : f)));
            }
        } catch (e) {
            console.error('Failed to toggle availability:', e);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to remove this vehicle from the fleet?')) return;
        try {
            const res = await fetch(`/api/admin/fleet?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setFleet((prev) => prev.filter((f) => f.id !== id));
            }
        } catch (e) {
            console.error('Failed to delete vehicle:', e);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-xl">
                <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                        <Car className="w-6 h-6 text-amber-400" /> Fleet Management
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Manage vehicles displayed on the public fleet showcase & booking dropdowns.</p>
                </div>

                <button
                    onClick={openAddModal}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4 stroke-[3]" /> Add New Vehicle
                </button>
            </div>

            {/* Fleet Cards Grid */}
            {loading ? (
                <div className="py-20 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                    Loading fleet vehicles...
                </div>
            ) : fleet.length === 0 ? (
                <div className="py-20 text-center text-slate-500 text-sm">No vehicles listed. Click "Add New Vehicle" to add one.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fleet.map((item) => (
                        <div
                            key={item.id}
                            className="bg-slate-900/90 border border-amber-500/15 rounded-3xl overflow-hidden shadow-xl hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                {/* Vehicle Cover Image */}
                                <div className="relative h-48 bg-slate-950 overflow-hidden">
                                    <img
                                        src={item.cover_image || item.coverImage}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <button
                                            onClick={() => handleToggleAvailable(item)}
                                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-md cursor-pointer ${
                                                item.available !== false
                                                    ? 'bg-emerald-500/90 text-slate-950 border-emerald-400'
                                                    : 'bg-red-500/90 text-white border-red-400'
                                            }`}
                                        >
                                            {item.available !== false ? 'Available' : 'Booked / Unavailable'}
                                        </button>
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-[11px] font-semibold text-amber-400 border border-amber-500/20">
                                        {item.category}
                                    </div>
                                </div>

                                {/* Vehicle Content */}
                                <div className="p-5 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-extrabold text-white">{item.name}</h3>
                                        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5 text-amber-400" /> {item.seats}
                                        </span>
                                    </div>

                                    {item.description && (
                                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                                    )}

                                    {item.highlights && item.highlights.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {item.highlights.map((h, i) => (
                                                <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-950 text-[10px] font-semibold text-slate-300 border border-slate-800">
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-2">
                                <a
                                    href={`/fleet/${item.id}`}
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
                                        title="Delete Vehicle"
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
                                <Car className="w-5 h-5 text-amber-400" /> {editingItem ? 'Edit Vehicle' : 'Add New Vehicle'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4 text-xs">
                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Vehicle Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder="e.g. Toyota Innova Hycross"
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Category</label>
                                    <input
                                        type="text"
                                        required
                                        value={formCategory}
                                        onChange={(e) => setFormCategory(e.target.value)}
                                        placeholder="e.g. Premium SUV"
                                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Seating Capacity</label>
                                    <input
                                        type="text"
                                        required
                                        value={formSeats}
                                        onChange={(e) => setFormSeats(e.target.value)}
                                        placeholder="e.g. 6 + 1 Driver"
                                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Cover Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={formImage}
                                    onChange={(e) => setFormImage(e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    placeholder="Enter vehicle description, comfort highlights, and features..."
                                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1">Highlights (comma separated)</label>
                                <input
                                    type="text"
                                    value={formHighlights}
                                    onChange={(e) => setFormHighlights(e.target.value)}
                                    placeholder="Captain Seats, Dual AC, JBL Sound"
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
                                    {saving ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Vehicle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
