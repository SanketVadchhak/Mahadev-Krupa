'use client';

import React, { useEffect, useState } from 'react';
import {
    Search,
    Filter,
    MessageSquare,
    PhoneCall,
    Mail,
    Trash2,
    Calendar,
    MapPin,
    Users,
    Download,
    CheckCircle2,
    Clock,
    XCircle,
    UserCheck,
    Edit3,
    Save,
    X,
    ChevronDown,
} from 'lucide-react';
import type { Inquiry } from '@/app/lib/supabaseServer';

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [editNotes, setEditNotes] = useState('');
    const [savingNotes, setSavingNotes] = useState(false);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/inquiries?status=${statusFilter}&search=${encodeURIComponent(searchQuery)}`);
            const data = await res.json();
            if (data.success) {
                setInquiries(data.inquiries || []);
            }
        } catch (e) {
            console.error('Failed to fetch inquiries:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [statusFilter, searchQuery]);

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch('/api/admin/inquiries', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item)));
                if (selectedInquiry?.id === id) {
                    setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus as any } : null));
                }
            }
        } catch (e) {
            console.error('Failed to update status:', e);
        }
    };

    const handleSaveNotes = async () => {
        if (!selectedInquiry) return;
        setSavingNotes(true);
        try {
            const res = await fetch('/api/admin/inquiries', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedInquiry.id, notes: editNotes }),
            });
            const data = await res.json();
            if (data.success) {
                setInquiries((prev) => prev.map((item) => (item.id === selectedInquiry.id ? { ...item, notes: editNotes } : item)));
                setSelectedInquiry((prev) => (prev ? { ...prev, notes: editNotes } : null));
            }
        } catch (e) {
            console.error('Failed to save notes:', e);
        } finally {
            setSavingNotes(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setInquiries((prev) => prev.filter((item) => item.id !== id));
                if (selectedInquiry?.id === id) setSelectedInquiry(null);
            }
        } catch (e) {
            console.error('Failed to delete inquiry:', e);
        }
    };

    const exportToCSV = () => {
        if (inquiries.length === 0) return;
        const headers = ['ID', 'Name', 'Phone', 'Email', 'Vehicle', 'Pickup Location', 'Dropoff Location', 'Date', 'Time', 'Passengers', 'Trip Type', 'Status', 'Message', 'Notes', 'Created At'];
        const rows = inquiries.map((i) => [
            i.id,
            `"${i.name || ''}"`,
            `"${i.phone || ''}"`,
            `"${i.email || ''}"`,
            `"${i.vehicle || ''}"`,
            `"${i.pickup_location || ''}"`,
            `"${i.dropoff_location || ''}"`,
            `"${i.pickup_date || ''}"`,
            `"${i.pickup_time || ''}"`,
            `"${i.passengers || ''}"`,
            `"${i.trip_type || ''}"`,
            `"${i.status || ''}"`,
            `"${(i.message || '').replace(/"/g, '""')}"`,
            `"${(i.notes || '').replace(/"/g, '""')}"`,
            `"${i.created_at || ''}"`,
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `mahadev_krupa_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const statusBadges = {
        pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        contacted: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
        confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Control Bar: Filters, Search, Export */}
            <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by customer name, phone, vehicle..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>

                {/* Status Tabs & Export */}
                <div className="flex flex-wrap items-center gap-2">
                    {['all', 'pending', 'contacted', 'confirmed', 'cancelled'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setStatusFilter(tab)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                statusFilter === tab
                                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}

                    <button
                        onClick={exportToCSV}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer ml-auto md:ml-2"
                    >
                        <Download className="w-3.5 h-3.5 text-amber-400" /> Export CSV
                    </button>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inquiry Table (Spans 2 cols on desktop) */}
                <div className="lg:col-span-2 bg-slate-900/90 border border-amber-500/15 rounded-3xl p-6 shadow-2xl">
                    <h3 className="text-base font-extrabold text-white mb-4">Inquiry Records ({inquiries.length})</h3>

                    {loading ? (
                        <div className="py-16 text-center text-slate-500 text-sm flex items-center justify-center gap-2">
                            <span className="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
                            Loading inquiry records...
                        </div>
                    ) : inquiries.length === 0 ? (
                        <div className="py-16 text-center text-slate-500 text-sm">No inquiries match the selected criteria.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs text-slate-300">
                                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                                    <tr>
                                        <th className="py-3 px-3">Customer</th>
                                        <th className="py-3 px-3">Vehicle</th>
                                        <th className="py-3 px-3">Date</th>
                                        <th className="py-3 px-3">Status</th>
                                        <th className="py-3 px-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {inquiries.map((inq) => {
                                        const isSelected = selectedInquiry?.id === inq.id;
                                        return (
                                            <tr
                                                key={inq.id}
                                                onClick={() => {
                                                    setSelectedInquiry(inq);
                                                    setEditNotes(inq.notes || '');
                                                }}
                                                className={`cursor-pointer transition-colors ${
                                                    isSelected ? 'bg-amber-500/15 border-l-4 border-amber-400' : 'hover:bg-slate-800/40'
                                                }`}
                                            >
                                                <td className="py-3.5 px-3">
                                                    <div className="font-bold text-white">{inq.name}</div>
                                                    <div className="text-[11px] text-slate-400">{inq.phone}</div>
                                                </td>
                                                <td className="py-3.5 px-3 font-semibold text-amber-300">
                                                    {inq.vehicle || 'General Inquiry'}
                                                </td>
                                                <td className="py-3.5 px-3 text-slate-300">
                                                    {inq.pickup_date || 'ASAP'}
                                                </td>
                                                <td className="py-3.5 px-3">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusBadges[inq.status] || statusBadges.pending}`}>
                                                        {inq.status}
                                                    </span>
                                                </td>
                                                <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <a
                                                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${inq.name}, thank you for contacting Mahadev Krupa Tours & Travels regarding your booking for ${inq.vehicle || 'travel'}. How can we assist you today?`)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                                                            title="WhatsApp"
                                                        >
                                                            <MessageSquare className="w-3.5 h-3.5" />
                                                        </a>
                                                        <button
                                                            onClick={() => handleDelete(inq.id)}
                                                            className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Detail Inspector Drawer Panel */}
                <div className="bg-slate-900/90 border border-amber-500/20 rounded-3xl p-6 shadow-2xl h-fit sticky top-24">
                    {selectedInquiry ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                                <div>
                                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Inquiry Details</span>
                                    <h3 className="text-xl font-extrabold text-white mt-0.5">{selectedInquiry.name}</h3>
                                </div>
                                <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Contact Links */}
                            <div className="grid grid-cols-2 gap-2">
                                <a
                                    href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedInquiry.name}, regarding your trip booking for ${selectedInquiry.vehicle || 'travel'} with Mahadev Krupa...`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-500/25 transition-colors"
                                >
                                    <MessageSquare className="w-4 h-4" /> WhatsApp
                                </a>
                                <a
                                    href={`tel:${selectedInquiry.phone}`}
                                    className="py-2.5 px-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-amber-500/25 transition-colors"
                                >
                                    <PhoneCall className="w-4 h-4" /> Call Now
                                </a>
                            </div>

                            {/* Status Change Selector */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Update Status</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['pending', 'contacted', 'confirmed', 'cancelled'].map((st) => (
                                        <button
                                            key={st}
                                            onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                                            className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                                                selectedInquiry.status === st
                                                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold'
                                                    : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                                            }`}
                                        >
                                            {st}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Trip Info Grid */}
                            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="text-slate-500">Requested Vehicle:</span>
                                    <span className="font-bold text-amber-400">{selectedInquiry.vehicle || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="text-slate-500">Pickup Location:</span>
                                    <span className="font-semibold text-white">{selectedInquiry.pickup_location || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="text-slate-500">Dropoff Location:</span>
                                    <span className="font-semibold text-white">{selectedInquiry.dropoff_location || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="text-slate-500">Pickup Date & Time:</span>
                                    <span className="font-semibold text-white">
                                        {selectedInquiry.pickup_date || 'N/A'} {selectedInquiry.pickup_time ? `@ ${selectedInquiry.pickup_time}` : ''}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="text-slate-500">Passengers:</span>
                                    <span className="font-semibold text-white">{selectedInquiry.passengers || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between text-slate-300">
                                    <span className="text-slate-500">Trip Type:</span>
                                    <span className="font-semibold text-white">{selectedInquiry.trip_type || 'One Way'}</span>
                                </div>
                            </div>

                            {/* Special Message */}
                            {selectedInquiry.message && (
                                <div>
                                    <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Customer Message</span>
                                    <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 italic">
                                        "{selectedInquiry.message}"
                                    </p>
                                </div>
                            )}

                            {/* Internal Notes Editor */}
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Internal Admin Notes</span>
                                    <button
                                        onClick={handleSaveNotes}
                                        disabled={savingNotes}
                                        className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                        <Save className="w-3.5 h-3.5" /> {savingNotes ? 'Saving...' : 'Save Notes'}
                                    </button>
                                </div>
                                <textarea
                                    rows={3}
                                    value={editNotes}
                                    onChange={(e) => setEditNotes(e.target.value)}
                                    placeholder="Add internal notes about quote sent, driver assignment, advance payment..."
                                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="py-20 text-center text-slate-500 text-xs">
                            Select an inquiry from the left table to inspect details, change status, or add internal notes.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
