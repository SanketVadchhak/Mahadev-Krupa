import { NextResponse } from 'next/server';
import { supabaseServer } from '@/app/lib/supabaseServer';
import { testimonials as initialTestimonials } from '@/app/components/data/siteData';

export const dynamic = 'force-dynamic';

let mockTestimonials = initialTestimonials.map((t, idx) => ({
    id: `testi-${idx + 1}`,
    name: t.name,
    role: t.role,
    text: t.text,
    rating: t.rating,
    approved: true,
    created_at: new Date().toISOString(),
}));

export async function GET() {
    try {
        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            const { data, error } = await supabaseServer.from('testimonials').select('*').order('created_at', { ascending: false });
            if (!error && data && data.length > 0) {
                return NextResponse.json({ success: true, testimonials: data, source: 'supabase' });
            }
        }
        return NextResponse.json({ success: true, testimonials: mockTestimonials, source: 'local' });
    } catch (err) {
        console.error('Testimonials GET Error:', err);
        return NextResponse.json({ success: true, testimonials: mockTestimonials });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, role, text, rating, approved } = body;

        const newItem = {
            id: `testi-${Date.now()}`,
            name,
            role: role || 'Valued Customer',
            text,
            rating: rating || 5,
            approved: approved !== undefined ? approved : true,
            created_at: new Date().toISOString(),
        };

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('testimonials').insert([newItem]);
        }

        mockTestimonials.unshift(newItem);
        return NextResponse.json({ success: true, item: newItem, message: 'Testimonial added successfully' });
    } catch (err) {
        console.error('Testimonials POST Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to add testimonial' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, approved } = body;

        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('testimonials').update({ approved }).eq('id', id);
        }

        mockTestimonials = mockTestimonials.map((t) => (t.id === id ? { ...t, approved } : t));
        return NextResponse.json({ success: true, message: 'Testimonial approval status updated' });
    } catch (err) {
        console.error('Testimonials PATCH Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to update testimonial status' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

        if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-supabase-project.supabase.co') {
            await supabaseServer.from('testimonials').delete().eq('id', id);
        }

        mockTestimonials = mockTestimonials.filter((t) => t.id !== id);
        return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (err) {
        console.error('Testimonials DELETE Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 });
    }
}
