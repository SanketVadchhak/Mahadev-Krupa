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

// ─── Destinations ─────────────────────────────────────────────
export interface Destination {
    id: string;
    name: string;
    tagline: string;
    coverImage: string;
    images: string[];
    about: string;
    highlights: string[];
    bestTime: string;
    distance: string;
}

export const destinations: Destination[] = [
    {
        id: 'udaipur',
        name: 'Udaipur',
        tagline: 'The City of Lakes',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/Udaipur/31895c9b08f7689619bf0cb856e0b98d.webp?updatedAt=1772131413527',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Udaipur/31895c9b08f7689619bf0cb856e0b98d.webp?updatedAt=1772131413527',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Udaipur/5795e8e340bcaa3e26ad84930ffb5637.webp?updatedAt=1772131413510',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Udaipur/28495e273d4607d77d29ce9f295bab45.webp?updatedAt=1772131413502',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Udaipur/00b40acaa03fbf8f437741b2bd874f5f.webp?updatedAt=1772131413476',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Udaipur/9c4f2c33ff9079e7abafca99a53668ae.webp?updatedAt=1772131413135',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Udaipur/f22071f6b676c7a498bb02e0cb780d6a.webp?updatedAt=1772131413577',
        ],
        about: 'Udaipur, the "Venice of the East", is Rajasthan\'s crown jewel — a romantic city built around shimmering lakes, palaces of white marble, and havelis draped in bougainvillea. Founded in 1559 by Maharana Udai Singh II, every corner tells a story of Rajput grandeur. The iconic Lake Pichola reflects the majestic City Palace at dusk, creating one of India\'s most photographed skylines.',
        highlights: ['City Palace & Museum', 'Lake Pichola Boat Ride', 'Jag Mandir Island', 'Sajjangarh (Monsoon Palace)', 'Jagdish Temple', 'Saheliyon Ki Bari', 'Fateh Sagar Lake', 'Vintage Car Museum'],
        bestTime: 'Sep – Mar',
        distance: '~410 km',
    },
    {
        id: 'dwarka-somnath',
        name: 'Dwarka × Somnath',
        tagline: 'Sacred Shores of Gujarat',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/7c15cd9492fb92d3c1765c68dc0eca7a.webp?updatedAt=1772131413501',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/download%20(1).webp?updatedAt=1772131414105',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/download.webp?updatedAt=1772131413553',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/7c15cd9492fb92d3c1765c68dc0eca7a.webp?updatedAt=1772131413501',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/aea39e042d95cbc9beb92bc689ca2c72.webp?updatedAt=1772131413516',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/10e2451035b9e2b2aa05bda6a0fb9ccb.webp?updatedAt=1772131413416',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/6e200586e8499509b125daa9749a84ed.webp?updatedAt=1772131413110',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/a557b4f6c159fd3f90350eca7ab75688.webp?updatedAt=1772131412978',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Dwarka&Somnath/b3895df747f099279a3e46fd14f33465.webp?updatedAt=1772131412975',
        ],
        about: 'Dwarka and Somnath are two of Hinduism\'s most sacred pilgrimage sites, both perched on Gujarat\'s Arabian Sea coastline. Dwarka — believed to be Lord Krishna\'s ancient kingdom — is one of the four sacred dhams of India. Somnath, the first of the 12 Jyotirlingas, stands proudly against the sea, rebuilt seven times after centuries of invasions, symbolising eternal resilience and devotion.',
        highlights: ['Dwarkadhish Temple', 'Somnath Jyotirlinga', 'Beyt Dwarka Island', 'Nageshwar Jyotirlinga', 'Rukmini Devi Temple', 'Triveni Sangam Ghat', 'Somnath Light & Sound Show', 'Bhalka Tirth'],
        bestTime: 'Oct – Feb',
        distance: '~350 km',
    },
    {
        id: 'goa',
        name: 'Goa',
        tagline: 'Sun, Sea & Spice',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/Goa/e1ecc2c399521a5271f844af88414a61.webp?updatedAt=1772131413496',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Goa/e1ecc2c399521a5271f844af88414a61.webp?updatedAt=1772131413496',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Goa/e4a9efea5bcb8e5d7b66ab791be134ca.webp?updatedAt=1772131413275',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Goa/8deca647c9fd0a14366176759c9f9492.webp?updatedAt=1772131413263',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Goa/c58e421a7465ff0c08436f69033562bf.webp?updatedAt=1772131413116',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Goa/48d1f18487eaabc49888d4f624d0b9b8.webp?updatedAt=1772131412960',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Goa/e13d402fa0acbcbb849c66d19267ff04.webp?updatedAt=1772131412964',
        ],
        about: 'Goa is India\'s pocket-sized paradise — a dynamic blend of Portuguese colonial heritage and tropical Indian vibrancy. With over 100 km of golden coastline, Goa offers everything from serene sunrise beaches to electrifying beach clubs. Ancient spice plantations, baroque churches, a thriving seafood culture, and a legendary nightlife make it the ultimate all-season escape for families, couples, and groups alike.',
        highlights: ['Baga & Calangute Beach', 'Old Goa Churches (UNESCO)', 'Dudhsagar Waterfall', 'Anjuna Flea Market', 'Spice Plantation Tour', 'Aguada Fort', 'Mandovi River Cruise', 'Casino Nights'],
        bestTime: 'Nov – Feb',
        distance: '~580 km',
    },
    {
        id: 'saputara',
        name: 'Saputara',
        tagline: 'Gujarat\'s Only Hill Station',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/Saputara/8e487f3f78f1747658e1b594b2a4f423.webp?updatedAt=1772131413479',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Saputara/8e487f3f78f1747658e1b594b2a4f423.webp?updatedAt=1772131413479',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Saputara/gettyimages-149880075-612x612.webp?updatedAt=1772131413383',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Saputara/gettyimages-698652878-612x612.webp?updatedAt=1772131412984',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Saputara/62a5609aa08229e052174bc13de4253c.webp?updatedAt=1772131412973',
        ],
        about: 'Nestled in the Sahyadri ranges of the Western Ghats at 1,000 metres above sea level, Saputara is Gujarat\'s only hill station and a refreshing monsoon retreat. Meaning "Abode of Serpents" in Gujarati, this charming town sits inside the Dang district surrounded by dense teak forests, misty valleys, and tribal villages. The cool climate, boating lake, and scenic viewpoints make it a beloved weekend escape from Surat.',
        highlights: ['Saputara Lake Boating', 'Sunset Point', 'Tribal Museum', 'Rose Garden', 'Gira Waterfalls', 'Step Garden', 'Ropeway Ride', 'Dang Tribal Fair (Jan)'],
        bestTime: 'Jun – Sep (Monsoon) / Oct – Feb',
        distance: '~100 km',
    },
    {
        id: 'kutch',
        name: 'Kutch',
        tagline: 'The White Desert Wonder',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/kuchchh/fce74cd533911654db99e11cdefbbc7b.webp?updatedAt=1772131414048',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/kuchchh/fce74cd533911654db99e11cdefbbc7b.webp?updatedAt=1772131414048',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/kuchchh/4b5302841fbdd61efdd1566373f2f2ca.webp?updatedAt=1772131413227',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/kuchchh/497ef7b80fcb01fe9b5a25915071bd2f.webp?updatedAt=1772131413188',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/kuchchh/9984aacd7ebe31e1bc7d09f3b8e16b41.webp?updatedAt=1772131413200',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/kuchchh/12b59be3057bd4dfe00537ed91ab7325.webp?updatedAt=1772131412995',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/kuchchh/d97db57a91162278091d94202c6e20d1.webp?updatedAt=1772131412838',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/kuchchh/7d3bc63d0c39623a39bca6fc2a13f884.webp?updatedAt=1772131413253',
        ],
        about: 'The Rann of Kutch is one of nature\'s most extraordinary canvases — a vast salt marshland that transforms into a shimmering white desert under the full moon. Home to the world\'s largest salt desert and the vibrant Rann Utsav festival, Kutch is also famous for its extraordinary artisan traditions: hand-embroidery, Bandhani tie-dye, Ajrakh block-printing, and Rogan art. An experience that stays with you forever.',
        highlights: ['White Rann of Kutch', 'Rann Utsav Festival', 'Dholavira (UNESCO Site)', 'Kutch Museum', 'Kalo Dungar (Black Hill)', 'Wild Ass Sanctuary', 'Bhuj Heritage Walk', 'Traditional Handicrafts'],
        bestTime: 'Nov – Feb',
        distance: '~330 km',
    },
    {
        id: 'daman',
        name: 'Daman',
        tagline: 'Portugal\'s Little India',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/Daman/92963542f3c55b3be4bbca1445464f40.webp?updatedAt=1772131412997',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Daman/92963542f3c55b3be4bbca1445464f40.webp?updatedAt=1772131412997',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Daman/1a58d008f908470d7ba7bc2ce2653416.webp?updatedAt=1772131413002',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Daman/8519c119d753becdc13c2b4ba737af7e.webp?updatedAt=1772131413009',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Daman/6750a7a4fe6e882e8ed28244c7b4df2f.webp?updatedAt=1772131412841',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Daman/371985162d077c58879224e08717874c.webp?updatedAt=1772131412674',
        ],
        about: 'Daman is a charming union territory on the Arabian Sea coast that seamlessly blends Portuguese colonial heritage with relaxed Indian beach culture. Divided by the Damanganga River into Moti Daman and Nani Daman, it offers well-preserved colonial forts, beautiful churches, and pristine beaches. Famous for its duty-free shopping and lighter-than-usual legal restrictions, it\'s a favourite quick getaway from Surat and South Gujarat.',
        highlights: ['Fort of Moti Daman', 'Jampore Beach', 'Devka Beach', 'Se Cathedral', 'Mirasol Lake Garden', 'Duty-Free Shopping', 'Portuguese Cemetery', 'Damanganga River Walk'],
        bestTime: 'Oct – Mar',
        distance: '~130 km',
    },
    {
        id: 'matheran',
        name: 'Matheran',
        tagline: 'Asia\'s Only Car-Free Hill Station',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/matheran/62d36ad9e79ecabd0a9d6a61b3e4eda4.webp?updatedAt=1772131413645',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/matheran/62d36ad9e79ecabd0a9d6a61b3e4eda4.webp?updatedAt=1772131413645',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/matheran/b38f496d773c9298f2600631f0aaf554.webp?updatedAt=1772131413626',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/matheran/34df52c4b2c318dd406cbb50393e3ce7.webp?updatedAt=1772131413434',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/matheran/38952c982c846e18fb1111813664fdb6.webp?updatedAt=1772131413398',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/matheran/66d9d60cda47db8f9c91e7bfc00e28a0.webp?updatedAt=1772131413242',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/matheran/50d525d54b47337430ead9da6b6947d7.webp?updatedAt=1772131413209',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/matheran/468ba4ec2cb34e9524ef0110876ab00b.webp?updatedAt=1772131412687',
        ],
        about: 'Matheran is unlike any hill station in the world — Asia\'s only completely motorised-vehicle-free hill resort. Perched 800 metres above sea level in the Sahyadri Mountains near Mumbai, this serene eco-sensitive zone is accessible only by foot, horseback, or India\'s oldest toy train. Dense red-earthed forests, dramatic viewpoints, and clean mountain air make it an unparalleled escape from city life.',
        highlights: ['Panorama Point Sunrise', 'Charlotte Lake', 'Historic Toy Train Ride', 'Echo Point', 'Louisa Point', 'Horse Riding Trails', 'One Tree Hill Sunset', 'Neral Base Village'],
        bestTime: 'Oct – May',
        distance: '~320 km',
    },
    {
        id: 'rajasthan',
        name: 'Rajasthan',
        tagline: 'Land of Kings & Colour',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/Rajsthan/38bad205e3da6151bf0b64547cb17302.webp?updatedAt=1772131413155',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Rajsthan/38bad205e3da6151bf0b64547cb17302.webp?updatedAt=1772131413155',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Rajsthan/456808873733c8a46ac08a9e5821cdaf.webp?updatedAt=1772131412728',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Rajsthan/bf685ab810fda21f18c654ff7b83d7e4.webp?updatedAt=1772131412720',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/Rajsthan/5667319be12dbefa6833e82c831d578a.webp?updatedAt=1772131412568',
        ],
        about: 'Rajasthan is India\'s most theatrical state — a vivid tapestry of majestic forts, marble palaces, golden deserts, and cities painted in blue, pink, and gold. From the romantic lakes of Udaipur to the golden sands of Jaisalmer, the walled old city of Jaipur to the blue labyrinth of Jodhpur, every corner is a photographic masterpiece. Mahadev Krupa offers seamless multi-city Rajasthan tour packages from Surat.',
        highlights: ['Jaipur Pink City & Amber Fort', 'Jodhpur Mehrangarh Fort', 'Jaisalmer Desert Safari', 'Pushkar Camel Fair', 'Ranthambore Tiger Reserve', 'Chittorgarh Fort', 'Mount Abu Wildlife', 'Heritage Hotel Stays'],
        bestTime: 'Oct – Mar',
        distance: '~500–900 km',
    },
    {
        id: 'statue-of-unity',
        name: 'Statue of Unity',
        tagline: 'World\'s Tallest Statue',
        coverImage: 'https://ik.imagekit.io/dvk8nd0jx/Destination/statue%20of%20unity/707b86d79271186e81a1a972ce397efd.webp?updatedAt=1772131412637',
        images: [
            'https://ik.imagekit.io/dvk8nd0jx/Destination/statue%20of%20unity/707b86d79271186e81a1a972ce397efd.webp?updatedAt=1772131412637',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/statue%20of%20unity/bda28476c0e8ec9c42434606fcf2f0f6.webp?updatedAt=1772131412482',
            'https://ik.imagekit.io/dvk8nd0jx/Destination/statue%20of%20unity/e6cc5a5724c69cc265dac34bbbd41835.webp?updatedAt=1772131412358',
        ],
        about: 'The Statue of Unity stands as a monumental tribute to Sardar Vallabhbhai Patel — the Iron Man who unified 562 princely states into modern India. At 182 metres, it is the world\'s tallest statue, situated on a river island near Kevadia, Gujarat, dramatically rising from the Narmada river surrounded by the Vindhya and Satpura mountain ranges. The viewing gallery at 153 metres offers breathtaking panoramic views.',
        highlights: ['Viewing Gallery (153m)', 'Valley of Flowers', 'Sardar Sarovar Dam', 'Jungle Safari', 'Kevadia Zoo', 'Cactus Garden', 'Children\'s Nutrition Park', 'Tent City Glamping'],
        bestTime: 'Oct – Mar',
        distance: '~180 km',
    },
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
