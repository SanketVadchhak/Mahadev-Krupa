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
    id: string;
    name: string;
    category: string;
    seats: string;
    coverImage: string;
    images: string[];
    description: string;
    specs: { label: string; value: string }[];
    highlights: string[];
    isInquiry?: boolean;
}

export const fleet: FleetCar[] = [
    {
        id: 'kia-carens',
        name: 'Kia Carens',
        category: 'Premium MPV',
        seats: '6 + 1 Captain',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%201.webp?updatedAt=1772033239299',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%201.webp?updatedAt=1772033239299',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%202.webp?updatedAt=1772033239328',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%203.webp?updatedAt=1772033239088',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%204.webp?updatedAt=1772033239132',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%205.webp?updatedAt=1772033239392',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%206.webp?updatedAt=1772033239334',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%207.webp?updatedAt=1772033239413',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%208.webp?updatedAt=1772033239205',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%209.webp?updatedAt=1772033239171',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%2010.webp?updatedAt=1772033239363',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%2011.webp?updatedAt=1772033239310',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%2012.webp?updatedAt=1772033239080',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%2013.webp?updatedAt=1772033239861',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Kia%20carens/Kia%2014.webp?updatedAt=1772033239253',
        ],
        description: 'The Kia Carens redefines premium family travel with its sophisticated 6-seater layout featuring an exclusive captain seat for the distinguished traveller. Crafted for those who refuse to compromise on comfort or style, the Carens delivers a first-class cabin experience — complete with an audiophile-grade music system, individually tailored UV-protective window shades, multi-zone premium air conditioning, and conveniently placed mobile charging points at every seat position. Whether navigating the city or embarking on a long-distance journey, the Kia Carens ensures every passenger arrives refreshed and relaxed.',
        specs: [
            { label: 'Seating Capacity', value: '6 Passengers + 1 Captain Seat' },
            { label: 'Air Conditioning', value: 'Premium Multi-Zone AC' },
            { label: 'Entertainment', value: 'Premium Music System' },
            { label: 'Charging', value: 'Mobile Charging Points' },
            { label: 'Window Protection', value: 'UV Sun Protector Shades' },
            { label: 'Comfort', value: 'Captain Seat Configuration' },
            { label: 'Luggage', value: 'Generous Boot Space' },
            { label: 'Safety', value: 'Advanced Safety Package' },
        ],
        highlights: ['Captain Seat', 'Premium AC', 'Music System', 'Sun Protectors', 'Charging Points', 'Spacious Boot'],
    },
    {
        id: 'tata-winger',
        name: 'Tata Winger',
        category: 'Executive Minibus',
        seats: '14 + 1 Captain',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%201.webp?updatedAt=1772033239352',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%201.webp?updatedAt=1772033239352',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%202.webp?updatedAt=1772033239172',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%203.webp?updatedAt=1772033239104',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%204.webp?updatedAt=1772033239269',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%205.webp?updatedAt=1772033239390',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%206.webp?updatedAt=1772033239238',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%207.webp?updatedAt=1772033239431',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%208.webp?updatedAt=1772033239340',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%209.webp?updatedAt=1772033239435',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%2010.webp?updatedAt=1772033239190',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%2011.webp?updatedAt=1772033239341',
            'https://ik.imagekit.io/dvk8nd0jx/Cars/Tata%20Winger/WINGER%2012.webp?updatedAt=1772033239070',
        ],
        description: 'The Tata Winger stands as India\'s benchmark executive minibus, purpose-built to accommodate large groups without sacrificing an ounce of comfort. Its 14-passenger cabin — complemented by a dedicated captain seat — features generously cushioned pushback seats with extended leg room, ensuring fatigue-free travel across long distances. The vehicle\'s powerful air conditioning system maintains an optimal cabin temperature regardless of external weather conditions. A spacious interior with a high-roof design eliminates the discomfort of confined spaces, while the reinforced suspension system guarantees a smooth, composed ride on all road surfaces. Ample rear luggage space, a premium music system, and individual mobile charging points complete this comprehensive group travel solution.',
        specs: [
            { label: 'Seating Capacity', value: '14 Passengers + 1 Captain Seat' },
            { label: 'Seat Type', value: 'Pushback Comfortable Seats' },
            { label: 'Leg Space', value: 'Wide Extended Leg Room' },
            { label: 'Air Conditioning', value: 'High-Capacity Strong AC' },
            { label: 'Interior', value: 'Spacious High-Roof Cabin' },
            { label: 'Luggage', value: 'Large Dedicated Luggage Space' },
            { label: 'Suspension', value: 'Heavy-Duty Smooth Suspension' },
            { label: 'Entertainment', value: 'Music System + Charging Points' },
        ],
        highlights: ['14 Seats', 'Captain Seat', 'Pushback Seats', 'Wide Leg Space', 'High Roof', 'Music System'],
    },
    {
        id: 'tempo-traveller-17',
        name: 'Tempo Traveller 17+1',
        category: 'Luxury Coach',
        seats: '17 + 1 Driver',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Cars/tempo%20traveller%2017/9-seater-tempo-traveller.webp?updatedAt=1772033239214',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Cars/tempo%20traveller%2017/9-seater-tempo-traveller.webp?updatedAt=1772033239214',
        ],
        description: 'Our 17+1 Tempo Traveller sets the gold standard for mid-sized group transportation, seamlessly blending luxury with practicality. The plush pushback seats are individually designed to deliver maximum lumbar support, allowing passengers to travel in absolute comfort across extended journeys. A generously wide central aisle ensures effortless movement throughout the cabin. The vehicle\'s powerful air conditioning system — engineered for India\'s demanding climate — maintains a consistently cool and refreshing interior environment. Luxury ambient interior lighting creates an elegant atmosphere, while tasteful window curtains provide privacy on demand. The integrated music system, smartphone charging ports at every seat, and a large rooftop luggage carrier make this the ultimate choice for group pilgrimages, corporate outings, and family vacations.',
        specs: [
            { label: 'Seating Capacity', value: '17 Passengers + 1 Driver' },
            { label: 'Seat Type', value: 'Luxury Pushback Reclining Seats' },
            { label: 'Aisle', value: 'Spacious Walking Aisle' },
            { label: 'Air Conditioning', value: 'Powerful Climate Control AC' },
            { label: 'Ambiance', value: 'Luxury Interior Lighting' },
            { label: 'Privacy', value: 'Window Curtains' },
            { label: 'Entertainment', value: 'Premium Music System' },
            { label: 'Connectivity', value: 'Mobile Charging Ports' },
            { label: 'Luggage', value: 'Large Rooftop Carrier + Boot' },
        ],
        highlights: ['17 Seats', 'Pushback Luxury Seats', 'Powerful AC', 'Ambient Lighting', 'Curtains', 'Charging Points'],
    },
    {
        id: 'tempo-traveller-20',
        name: 'Tempo Traveller 20+1',
        category: 'Luxury Coach',
        seats: '20 + 1 Driver',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Cars/tempo%20traveller%2020/images.webp?updatedAt=1772033239130',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Cars/tempo%20traveller%2020/images.webp?updatedAt=1772033239130',
        ],
        description: 'The 20+1 Tempo Traveller delivers an elevated group travel experience tailored to larger parties seeking both space and luxury. Each of the 20 passenger seats features a reclining pushback mechanism and premium cushioning for sustained comfort during long-haul journeys. A wide central aisle ensures passengers can move freely without inconvenience. The industrial-grade air conditioning system maintains a perfectly temperate cabin environment throughout the trip. Sophisticated interior mood lighting, elegant window curtains, and a high-fidelity music system lend the cabin an unmistakably premium character. Dedicated mobile charging ports at every seat position ensure devices remain powered, while the generous rooftop luggage carrier and rear boot accommodate all travel essentials with ease.',
        specs: [
            { label: 'Seating Capacity', value: '20 Passengers + 1 Driver' },
            { label: 'Seat Type', value: 'Luxury Pushback Reclining Seats' },
            { label: 'Aisle', value: 'Spacious Walking Aisle' },
            { label: 'Air Conditioning', value: 'Powerful Climate Control AC' },
            { label: 'Ambiance', value: 'Luxury Interior Lighting' },
            { label: 'Privacy', value: 'Window Curtains' },
            { label: 'Entertainment', value: 'Premium Music System' },
            { label: 'Connectivity', value: 'Mobile Charging Ports' },
            { label: 'Luggage', value: 'Large Rooftop Carrier + Boot' },
        ],
        highlights: ['20 Seats', 'Pushback Luxury Seats', 'Powerful AC', 'Ambient Lighting', 'Curtains', 'Charging Points'],
    },
    {
        id: 'tempo-traveller-24',
        name: 'Tempo Traveller 24+1',
        category: 'Luxury Coach',
        seats: '24 + 1 Driver',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Cars/tempo%20traveller%2025/Force-Traveller-26-Seater.webp?updatedAt=1772033239316',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Cars/tempo%20traveller%2025/Force-Traveller-26-Seater.webp?updatedAt=1772033239316',
        ],
        description: 'Our flagship 24+1 Tempo Traveller is the definitive solution for large group travel, combining maximum passenger capacity with uncompromising luxury. Twenty-four individually crafted pushback seats provide exceptional personal space and lumbar support for every passenger on the journey. The extra-wide central aisle facilitates easy movement and boarding. A high-capacity air conditioning system — featuring multiple roof-mount vents — ensures uniform cooling throughout the entire cabin. Sumptuously appointed interior lighting, privacy curtains, and a concert-quality music system create an immersive in-transit experience. With mobile charging ports at every seat, a substantial rooftop luggage carrier, and a large rear boot, the 24+1 Traveller is purpose-built for pilgrimages, destination weddings, corporate retreats, and school excursions.',
        specs: [
            { label: 'Seating Capacity', value: '24 Passengers + 1 Driver' },
            { label: 'Seat Type', value: 'Luxury Pushback Reclining Seats' },
            { label: 'Aisle', value: 'Extra-Wide Walking Aisle' },
            { label: 'Air Conditioning', value: 'High-Capacity Roof-Mount AC' },
            { label: 'Ambiance', value: 'Luxury Interior Lighting' },
            { label: 'Privacy', value: 'Window Curtains' },
            { label: 'Entertainment', value: 'Premium Music System' },
            { label: 'Connectivity', value: 'Mobile Charging Ports' },
            { label: 'Luggage', value: 'Large Rooftop Carrier + Boot' },
        ],
        highlights: ['24 Seats', 'Pushback Luxury Seats', 'Powerful AC', 'Ambient Lighting', 'Curtains', 'Charging Points'],
    },
    {
        id: 'urbania-12',
        name: 'Force Urbania 12+1',
        category: 'Premium Van',
        seats: '12 + 1 Captain',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Cars/urbania%2013/small_Urbania_7e09e7a775.webp?updatedAt=1772033239155',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Cars/urbania%2013/small_Urbania_7e09e7a775.webp?updatedAt=1772033239155',
        ],
        description: 'The Force Urbania 12+1 represents a paradigm shift in premium van travel, engineered to deliver business-class comfort within a compact yet capacious footprint. Twelve elegantly appointed pushback recliners surround a spacious, walkable cabin — topped by a commanding high-roof design that eliminates the claustrophobia typically associated with passenger vans. A powerful, whisper-quiet air conditioning system maintains a consistently cool and pleasant interior atmosphere throughout the journey. Luxury ambient lighting, full window curtains, a concert-grade music system, and dedicated mobile charging ports at each seat position ensure that every passenger\'s journey is as productive as it is comfortable. A generously proportioned rear luggage bay caters to both short city runs and extended tours with equal ease.',
        specs: [
            { label: 'Seating Capacity', value: '12 Passengers + 1 Captain Seat' },
            { label: 'Seat Type', value: 'Luxury Pushback Reclining Seats' },
            { label: 'Interior Height', value: 'High-Roof Standing Cabin' },
            { label: 'Air Conditioning', value: 'Powerful Premium AC' },
            { label: 'Ambiance', value: 'Luxury Interior Lighting' },
            { label: 'Privacy', value: 'Window Curtains' },
            { label: 'Entertainment', value: 'Premium Music System' },
            { label: 'Connectivity', value: 'Mobile Charging Ports' },
            { label: 'Luggage', value: 'Large Rear Luggage Space' },
        ],
        highlights: ['12 Seats', 'Captain Seat', 'High Roof', 'Powerful AC', 'Luxury Lighting', 'Charging Points'],
    },
    {
        id: 'urbania-16',
        name: 'Force Urbania 16+1',
        category: 'Premium Van',
        seats: '16 + 1 Captain',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Cars/urbania%2017/home-10.webp?updatedAt=1772033239851',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Cars/urbania%2017/home-10.webp?updatedAt=1772033239851',
        ],
        description: 'The Force Urbania 16+1 elevates the concept of premium group transit to an art form. Designed for those who demand more from their journey, this executive van seats 16 passengers in individually crafted pushback recliners — each accompanied by its own charging port — within a soaring high-roof cabin that enables passengers to stand and move freely. The centrally positioned captain seat commands a premium vantage point, while the robust air conditioning system delivers powerful, uniform cooling to every corner of the cabin. Artfully integrated interior lighting, elegant window curtains, and a sophisticated music system transform every trip into a refined experience. With a large dedicated luggage compartment, the Urbania 16+1 is perfectly suited for airport transfers, corporate groups, and extended family tours.',
        specs: [
            { label: 'Seating Capacity', value: '16 Passengers + 1 Captain Seat' },
            { label: 'Seat Type', value: 'Luxury Pushback Reclining Seats' },
            { label: 'Interior Height', value: 'High-Roof Standing Cabin' },
            { label: 'Air Conditioning', value: 'Powerful Premium AC' },
            { label: 'Ambiance', value: 'Luxury Interior Lighting' },
            { label: 'Privacy', value: 'Window Curtains' },
            { label: 'Entertainment', value: 'Premium Music System' },
            { label: 'Connectivity', value: 'Mobile Charging Ports' },
            { label: 'Luggage', value: 'Large Rear Luggage Space' },
        ],
        highlights: ['16 Seats', 'Captain Seat', 'High Roof', 'Powerful AC', 'Curtains', 'Charging Points'],
    },
    {
        id: 'custom-inquiry',
        name: 'Custom Vehicle Request',
        category: 'Special Order',
        seats: 'Any Configuration',
        coverImage: '',
        images: [],
        description: 'Looking for a specific vehicle not listed in our fleet? Submit a custom inquiry and our team will source the perfect vehicle for your requirements.',
        specs: [],
        highlights: [],
        isInquiry: true,
    },
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
    { name: 'Rajesh Patel', role: 'Business Executive', text: 'Absolutely premium service! The vehicle they provided for my Ahmedabad-Mumbai trip was spotless. The driver was professional and courteous. Will definitely book again.', rating: 5 },
    { name: 'Priya Sharma', role: 'Wedding Planner', text: 'We booked luxury vehicles for a destination wedding in Udaipur. Mahadev Krupa managed everything flawlessly. The decorated cars were a highlight of the baraat!', rating: 5 },
    { name: 'Amit Desai', role: 'Family Traveler', text: 'Our family trip to Gir and Somnath was made memorable thanks to the comfortable Tempo Traveller. GPS tracking gave us peace of mind throughout the journey.', rating: 5 },
    { name: 'Neha Joshi', role: 'Corporate Manager', text: 'We use Mahadev Krupa for all our corporate travel needs. Their fleet is always well-maintained and the booking process is seamless. Highly recommended!', rating: 4 },
    { name: 'Vikram Singh', role: 'Tourist', text: 'The Force Urbania was perfect for our Kutch group adventure. Clean vehicle, fair pricing, and the driver was very professional. A truly premium experience!', rating: 5 },
];
