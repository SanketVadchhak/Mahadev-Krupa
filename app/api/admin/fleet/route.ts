import { NextResponse } from 'next/server';
import { supabaseServer } from '@/app/lib/supabaseServer';
import { fleet as initialFleet } from '@/app/components/data/siteData';

export const dynamic = 'force-dynamic';

let mockFleet = initialFleet.map((car, idx) => ({
    ...car,
    cover_image: car.coverImage,
    available: true,
    sort_order: idx,
}));

export async function GET() {
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            const { data, error } = await supabaseServer.from('fleet').select('*').order('sort_order', { ascending: true });
            if (!error && data && data.length > 0) {
                return NextResponse.json({ success: true, fleet: data, source: 'supabase' });
            }
        }
        return NextResponse.json({ success: true, fleet: mockFleet, source: 'local' });
    } catch (err) {
        console.error('Fleet GET Error:', err);
        return NextResponse.json({ success: true, fleet: mockFleet });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, category, seats, cover_image, coverImage, description, specs, highlights, available } = body;

        const newCar = {
            id: id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name,
            category: category || 'Luxury Vehicle',
            seats: seats || '5 Seats',
            cover_image: cover_image || coverImage || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
            coverImage: cover_image || coverImage || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
            images: body.images || [cover_image || coverImage],
            description: description || '',
            specs: specs || [],
            highlights: highlights || [],
            available: available !== undefined ? available : true,
            sort_order: mockFleet.length,
            created_at: new Date().toISOString(),
        };

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('fleet').upsert([newCar]);
        }

        mockFleet.push(newCar);
        return NextResponse.json({ success: true, item: newCar, message: 'Vehicle added successfully' });
    } catch (err) {
        console.error('Fleet POST Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to save vehicle' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('fleet').update(updates).eq('id', id);
        }

        mockFleet = mockFleet.map((item) => (item.id === id ? { ...item, ...updates } : item));
        return NextResponse.json({ success: true, message: 'Vehicle updated successfully' });
    } catch (err) {
        console.error('Fleet PUT Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to update vehicle' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('fleet').delete().eq('id', id);
        }

        mockFleet = mockFleet.filter((item) => item.id !== id);
        return NextResponse.json({ success: true, message: 'Vehicle deleted successfully' });
    } catch (err) {
        console.error('Fleet DELETE Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to delete vehicle' }, { status: 500 });
    }
}
