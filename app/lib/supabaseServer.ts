import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

/**
 * Server-side Supabase client for secure administrative API operations
 */
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        persistSession: false,
    },
});

export type Inquiry = {
    id: string;
    name: string;
    phone: string;
    email?: string;
    vehicle?: string;
    pickup_location?: string;
    dropoff_location?: string;
    pickup_date?: string;
    pickup_time?: string;
    passengers?: string;
    trip_type?: string;
    message?: string;
    status: 'pending' | 'contacted' | 'confirmed' | 'cancelled';
    notes?: string;
    created_at: string;
};

export type FleetItem = {
    id: string;
    name: string;
    category: string;
    seats: string;
    cover_image: string;
    coverImage?: string;
    images?: string[];
    description?: string;
    specs?: { label: string; value: string }[];
    highlights?: string[];
    price_per_km?: number;
    available?: boolean;
    sort_order?: number;
    created_at?: string;
};

export type DestinationItem = {
    id: string;
    name: string;
    tagline?: string;
    cover_image: string;
    coverImage?: string;
    images?: string[];
    about?: string;
    highlights?: string[];
    best_time?: string;
    bestTime?: string;
    distance?: string;
    featured?: boolean;
    sort_order?: number;
    created_at?: string;
};

export type TestimonialItem = {
    id: string;
    name: string;
    role?: string;
    text: string;
    rating: number;
    approved?: boolean;
    created_at?: string;
};
