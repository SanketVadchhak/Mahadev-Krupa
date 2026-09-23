import { NextResponse } from 'next/server';
import { supabaseServer } from '@/app/lib/supabaseServer';
import { destinations as initialDestinations } from '@/app/components/data/siteData';

export const dynamic = 'force-dynamic';

let mockDestinations = initialDestinations.map((dest, idx) => ({
    ...dest,
    cover_image: dest.coverImage,
    featured: true,
    sort_order: idx,
}));

export async function GET() {
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            const { data, error } = await supabaseServer.from('destinations').select('*').order('sort_order', { ascending: true });
            if (!error && data && data.length > 0) {
                return NextResponse.json({ success: true, destinations: data, source: 'supabase' });
            }
        }
        return NextResponse.json({ success: true, destinations: mockDestinations, source: 'local' });
    } catch (err) {
        console.error('Destinations GET Error:', err);
        return NextResponse.json({ success: true, destinations: mockDestinations });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, tagline, cover_image, coverImage, about, highlights, best_time, bestTime, distance, featured } = body;

        const newDest = {
            id: id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            name,
            tagline: tagline || '',
            cover_image: cover_image || coverImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
            coverImage: cover_image || coverImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
            images: body.images || [cover_image || coverImage],
            about: about || '',
            highlights: highlights || [],
            best_time: best_time || bestTime || 'Oct - Mar',
            bestTime: best_time || bestTime || 'Oct - Mar',
            distance: distance || '~300 km',
            featured: featured !== undefined ? featured : true,
            sort_order: mockDestinations.length,
            created_at: new Date().toISOString(),
        };

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('destinations').upsert([newDest]);
        }

        mockDestinations.push(newDest);
        return NextResponse.json({ success: true, item: newDest, message: 'Destination added successfully' });
    } catch (err) {
        console.error('Destinations POST Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to save destination' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('destinations').update(updates).eq('id', id);
        }

        mockDestinations = mockDestinations.map((item) => (item.id === id ? { ...item, ...updates } : item));
        return NextResponse.json({ success: true, message: 'Destination updated successfully' });
    } catch (err) {
        console.error('Destinations PUT Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to update destination' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('destinations').delete().eq('id', id);
        }

        mockDestinations = mockDestinations.filter((item) => item.id !== id);
        return NextResponse.json({ success: true, message: 'Destination deleted successfully' });
    } catch (err) {
        console.error('Destinations DELETE Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to delete destination' }, { status: 500 });
    }
}
