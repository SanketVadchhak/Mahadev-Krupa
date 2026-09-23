-- ========================================================
-- Mahadev Krupa Tours & Travels Database Schema
-- Run this in your Supabase SQL Editor to set up tables
-- ========================================================

-- 1. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    vehicle TEXT,
    pickup_location TEXT,
    dropoff_location TEXT,
    pickup_date TEXT,
    pickup_time TEXT,
    passengers TEXT,
    trip_type TEXT DEFAULT 'One Way',
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'confirmed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast sorting by creation date and status
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);

-- 2. FLEET TABLE
CREATE TABLE IF NOT EXISTS fleet (
    id TEXT PRIMARY KEY, -- Slug e.g., 'toyota-fortuner'
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    seats TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    description TEXT,
    specs JSONB DEFAULT '[]'::jsonb,
    highlights TEXT[] DEFAULT '{}',
    price_per_km NUMERIC,
    available BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS destinations (
    id TEXT PRIMARY KEY, -- Slug e.g., 'statue-of-unity'
    name TEXT NOT NULL,
    tagline TEXT,
    cover_image TEXT NOT NULL,
    images TEXT[] DEFAULT '{}',
    about TEXT,
    highlights TEXT[] DEFAULT '{}',
    best_time TEXT,
    distance TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    text TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    approved BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow public read access to fleet, destinations, testimonials
CREATE POLICY "Public Read Fleet" ON fleet FOR SELECT USING (true);
CREATE POLICY "Public Read Destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON testimonials FOR SELECT USING (approved = true);

-- Allow public to submit inquiries
CREATE POLICY "Public Submit Inquiry" ON inquiries FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies
CREATE POLICY "Admin Full Access Inquiries" ON inquiries FOR ALL USING (true);
CREATE POLICY "Admin Full Access Fleet" ON fleet FOR ALL USING (true);
CREATE POLICY "Admin Full Access Destinations" ON destinations FOR ALL USING (true);
CREATE POLICY "Admin Full Access Testimonials" ON testimonials FOR ALL USING (true);
