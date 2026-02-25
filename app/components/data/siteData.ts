import { MapPin, Navigation, Users, Heart, Car, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// ─── Services ───────────────────────────────────────────────
export interface Service {
    icon: LucideIcon;
    title: string;
    desc: string;
    color: string;
}

export const services: Service[] = [
    { icon: MapPin, title: 'Local Trips', desc: 'Premium city rides with expert local drivers who know every corner of Gujarat.', color: 'from-amber-500 to-yellow-600' },
    { icon: Navigation, title: 'Outstation Tours', desc: 'Long-distance luxury travel to any destination across India with comfort.', color: 'from-yellow-600 to-amber-700' },
    { icon: Users, title: 'Family Tours', desc: 'Spacious vehicles & curated family packages for unforgettable memories.', color: 'from-amber-600 to-yellow-500' },
    { icon: Heart, title: 'Wedding & Functions', desc: 'Decorated luxury fleet for your special occasions with red carpet service.', color: 'from-yellow-500 to-amber-500' },
    { icon: Car, title: 'Self Drive', desc: 'Choose your dream car and hit the road on your own terms, fully insured.', color: 'from-amber-400 to-yellow-600' },
    { icon: Shield, title: 'Safe & Secure', desc: 'All vehicles GPS tracked in real-time. Your safety is our top priority.', color: 'from-yellow-600 to-amber-600' },
];

// ─── Fleet ──────────────────────────────────────────────────
export interface FleetCar {
    name: string;
    type: string;
    seats: number;
    fuel: string;
    image: string;
    power: string;
    trans: string;
    price: string;
    features: string[];
}

export const fleet: FleetCar[] = [
    { name: 'Toyota Innova Crysta', type: 'Premium MPV', seats: 7, fuel: 'Diesel', image: '🚐', power: '150 HP', trans: 'Automatic', price: '₹18/km', features: ['AC', 'GPS', 'Music System'] },
    { name: 'Toyota Fortuner', type: 'Luxury SUV', seats: 7, fuel: 'Diesel', image: '🚙', power: '204 HP', trans: 'Automatic', price: '₹25/km', features: ['4WD', 'Leather', 'Sunroof'] },
    { name: 'Mercedes E-Class', type: 'Executive Sedan', seats: 4, fuel: 'Petrol', image: '🏎️', power: '258 HP', trans: 'Automatic', price: '₹45/km', features: ['Premium', 'Chauffeur', 'WiFi'] },
    { name: 'BMW 5 Series', type: 'Business Sedan', seats: 4, fuel: 'Petrol', image: '🚗', power: '252 HP', trans: 'Automatic', price: '₹42/km', features: ['Luxury', 'AC Seats', 'iDrive'] },
    { name: 'Kia Carnival', type: 'Premium Van', seats: 9, fuel: 'Diesel', image: '🚌', power: '200 HP', trans: 'Automatic', price: '₹22/km', features: ['Spacious', 'VIP Seats', 'AC'] },
    { name: 'Audi A6', type: 'Prestige Sedan', seats: 4, fuel: 'Petrol', image: '✨', power: '245 HP', trans: 'Automatic', price: '₹48/km', features: ['Quattro', 'Bang & Olufsen', 'LED'] },
];

// ─── Gallery ─────────────────────────────────────────────────
export interface GalleryItem {
    title: string;
    h: string;
    gradient: string;
}

export const gallery: GalleryItem[] = [
    { title: 'Rann of Kutch', h: 'h-64', gradient: 'from-amber-900/60 to-yellow-700/40' },
    { title: 'Gir Forest Safari', h: 'h-80', gradient: 'from-yellow-900/60 to-amber-700/40' },
    { title: 'Somnath Temple', h: 'h-72', gradient: 'from-stone-800/60 to-amber-900/40' },
    { title: 'Dwarka', h: 'h-56', gradient: 'from-amber-800/60 to-yellow-600/40' },
    { title: 'Statue of Unity', h: 'h-96', gradient: 'from-neutral-800/60 to-stone-700/40' },
    { title: 'Saputara Hills', h: 'h-64', gradient: 'from-yellow-900/60 to-amber-800/40' },
    { title: 'Ahmedabad Heritage', h: 'h-80', gradient: 'from-amber-900/60 to-stone-800/40' },
    { title: 'Royal Wedding Fleet', h: 'h-72', gradient: 'from-yellow-800/60 to-amber-600/40' },
    { title: 'Mandvi Beach', h: 'h-60', gradient: 'from-stone-900/60 to-amber-700/40' },
];

// ─── Testimonials ─────────────────────────────────────────────
export interface Testimonial {
    name: string;
    role: string;
    text: string;
    rating: number;
}

export const testimonials: Testimonial[] = [
    { name: 'Rajesh Patel', role: 'Business Executive', text: 'Absolutely premium service! The Mercedes they provided for my Ahmedabad-Mumbai trip was spotless. The driver was professional and courteous. Will definitely book again.', rating: 5 },
    { name: 'Priya Sharma', role: 'Wedding Planner', text: 'We booked 15 luxury cars for a destination wedding in Udaipur. Mahadev Krupa managed everything flawlessly. The decorated cars were a highlight of the baraat!', rating: 5 },
    { name: 'Amit Desai', role: 'Family Traveler', text: 'Our family trip to Gir and Somnath was made memorable thanks to the comfortable Innova Crysta. GPS tracking gave us peace of mind throughout the journey.', rating: 5 },
    { name: 'Neha Joshi', role: 'Corporate Manager', text: 'We use Mahadev Krupa for all our corporate travel needs. Their fleet is always well-maintained and the booking process is seamless. Highly recommended!', rating: 4 },
    { name: 'Vikram Singh', role: 'Tourist', text: 'Self-drive option was fantastic! Picked up a Fortuner for our Kutch adventure. Clean car, fair pricing, and the GPS tracking feature was very reassuring.', rating: 5 },
];
