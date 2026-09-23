import { NextResponse } from 'next/server';
import { supabaseServer } from '@/app/lib/supabaseServer';

export const dynamic = 'force-dynamic';

// Mock in-memory storage fallback for local testing if Supabase table is empty or unconfigured
let mockInquiries = [
    {
        id: 'inq-101',
        name: 'Rajesh Sharma',
        phone: '+91 98250 12345',
        email: 'rajesh.sharma@example.com',
        vehicle: 'Toyota Fortuner',
        pickup_location: 'Surat Railway Station',
        dropoff_location: 'Statue of Unity, Ekta Nagar',
        pickup_date: '2026-09-25',
        pickup_time: '07:00 AM',
        passengers: '6',
        trip_type: 'Round Trip',
        message: 'Need experienced driver for family pilgrimage and sightseeing.',
        status: 'pending',
        notes: 'Requested early morning pick-up.',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
        id: 'inq-102',
        name: 'Priya Patel',
        phone: '+91 97123 45678',
        email: 'priya.patel@gmail.com',
        vehicle: 'Toyota Innova Crysta',
        pickup_location: 'Surat Airport (STV)',
        dropoff_location: 'Vapi Industrial Area',
        pickup_date: '2026-09-22',
        pickup_time: '11:30 AM',
        passengers: '4',
        trip_type: 'One Way',
        message: 'Corporate VIP arrival transfer.',
        status: 'contacted',
        notes: 'Quotation sent over WhatsApp.',
        created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    },
    {
        id: 'inq-103',
        name: 'Amit Shah',
        phone: '+91 99887 76655',
        email: 'amit.shah@outlook.com',
        vehicle: 'Tempo Traveller (17 Seater)',
        pickup_location: 'Adajan, Surat',
        dropoff_location: 'Udaipur, Rajasthan',
        pickup_date: '2026-10-01',
        pickup_time: '05:00 AM',
        passengers: '15',
        trip_type: 'Outstation 3 Days',
        message: 'Group tour package with luggage space.',
        status: 'confirmed',
        notes: 'Advance deposit received.',
        created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    },
    {
        id: 'inq-104',
        name: 'Vikram Mehta',
        phone: '+91 94261 88990',
        email: 'vmehta@techcorp.in',
        vehicle: 'Maruti Suzuki Ertiga',
        pickup_location: 'Gopipura, Surat',
        dropoff_location: 'Somnath Temple',
        pickup_date: '2026-09-28',
        pickup_time: '06:00 AM',
        passengers: '5',
        trip_type: 'Round Trip',
        message: 'Weekend trip with family.',
        status: 'cancelled',
        notes: 'Customer changed travel dates.',
        created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    },
];

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const statusFilter = searchParams.get('status');
        const search = searchParams.get('search');

        // Try Supabase first
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            let query = supabaseServer.from('inquiries').select('*').order('created_at', { ascending: false });

            if (statusFilter && statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            if (search) {
                query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,vehicle.ilike.%${search}%,pickup_location.ilike.%${search}%`);
            }

            const { data, error } = await query;
            if (!error && data && data.length > 0) {
                return NextResponse.json({ success: true, inquiries: data, source: 'supabase' });
            }
        }

        // Fallback to mock data
        let filtered = [...mockInquiries];
        if (statusFilter && statusFilter !== 'all') {
            filtered = filtered.filter((i) => i.status === statusFilter);
        }
        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(
                (i) =>
                    i.name.toLowerCase().includes(q) ||
                    i.phone.toLowerCase().includes(q) ||
                    (i.vehicle && i.vehicle.toLowerCase().includes(q)) ||
                    (i.pickup_location && i.pickup_location.toLowerCase().includes(q))
            );
        }

        return NextResponse.json({ success: true, inquiries: filtered, source: 'local' });
    } catch (err) {
        console.error('Inquiries GET Error:', err);
        return NextResponse.json({ success: false, inquiries: mockInquiries, error: 'Database fetch error' });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, status, notes } = body;

        if (!id) {
            return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
        }

        // Try Supabase update
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            const updateFields: Record<string, unknown> = {};
            if (status) updateFields.status = status;
            if (notes !== undefined) updateFields.notes = notes;

            const { error } = await supabaseServer.from('inquiries').update(updateFields).eq('id', id);

            if (!error) {
                return NextResponse.json({ success: true, message: 'Inquiry updated successfully in Supabase' });
            }
        }

        // Fallback to mock update
        mockInquiries = mockInquiries.map((inq) => {
            if (inq.id === id) {
                return {
                    ...inq,
                    ...(status ? { status } : {}),
                    ...(notes !== undefined ? { notes } : {}),
                };
            }
            return inq;
        });

        return NextResponse.json({ success: true, message: 'Inquiry updated successfully' });
    } catch (err) {
        console.error('Inquiries PATCH Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to update inquiry' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
        }

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('inquiries').delete().eq('id', id);
        }

        mockInquiries = mockInquiries.filter((inq) => inq.id !== id);

        return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
    } catch (err) {
        console.error('Inquiries DELETE Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to delete inquiry' }, { status: 500 });
    }
}
