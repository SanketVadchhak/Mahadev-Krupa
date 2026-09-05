import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/sections/Navbar';
import Footer from '@/app/components/sections/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';
import QuickBookingPanel from '@/app/components/QuickBookingPanel';
import { fleet, FleetCar } from '@/app/components/data/siteData';
import { ChevronLeft, Users, ShieldCheck, CheckCircle2, Phone, MessageCircle, Star, Sparkles, Car, Clock } from 'lucide-react';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return fleet
        .filter((car) => !car.isInquiry)
        .map((car) => ({
            id: car.id,
        }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const vehicle = fleet.find((c) => c.id === id);

    if (!vehicle || vehicle.isInquiry) {
        return {
            title: 'Vehicle Not Found',
        };
    }

    const pageTitle = `${vehicle.name} Hire in Surat | ${vehicle.category} Car Rental`;
    const pageDescription = `Book luxury ${vehicle.name} (${vehicle.seats}) in Surat, Gujarat. ${vehicle.description.slice(0, 150)}... 24/7 service. Call +91 97145 55226.`;
    const canonicalUrl = `https://mahadevkrupa.com/fleet/${vehicle.id}`;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: [
            `${vehicle.name} rental Surat`,
            `${vehicle.name} hire Surat`,
            `${vehicle.category} car hire Surat`,
            `outstation ${vehicle.name} Surat`,
            'Mahadev Krupa car rental',
            'Surat travel agency',
        ],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${vehicle.name} Rental in Surat | Mahadev Krupa Tours & Travels`,
            description: pageDescription,
            url: canonicalUrl,
            siteName: 'Mahadev Krupa Tours & Travels',
            images: [
                {
                    url: vehicle.coverImage || '/assets/brand/og-logo.png',
                    width: 1200,
                    height: 630,
                    alt: `${vehicle.name} Luxury Rental Surat`,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${vehicle.name} Hire in Surat`,
            description: pageDescription,
            images: [vehicle.coverImage || '/assets/brand/og-logo.png'],
        },
    };
}

export default async function VehicleDetailPage({ params }: Props) {
    const { id } = await params;
    const vehicle = fleet.find((c) => c.id === id);

    if (!vehicle || vehicle.isInquiry) {
        notFound();
    }

    const otherVehicles = fleet.filter((c) => c.id !== vehicle.id && !c.isInquiry).slice(0, 3);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AutoRental',
        name: `Mahadev Krupa ${vehicle.name} Rental`,
        image: vehicle.coverImage,
        description: vehicle.description,
        telephone: '+919714555226',
        url: `https://mahadevkrupa.com/fleet/${vehicle.id}`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Mahadev Car World, B/H Punjan Plaza, BRTS Rd, opp. Vanmali Junction',
            addressLocality: 'Surat',
            addressRegion: 'Gujarat',
            postalCode: '395006',
            addressCountry: 'IN',
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'LocalBusiness',
                name: 'Mahadev Krupa Tours & Travels',
            },
        },
    };

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://mahadevkrupa.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Fleet',
                item: 'https://mahadevkrupa.com/#fleet',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: vehicle.name,
                item: `https://mahadevkrupa.com/fleet/${vehicle.id}`,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-dark-bg text-white relative">
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <Navbar />

            {/* Top Breadcrumb Header */}
            <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/#fleet" className="hover:text-amber-400 transition-colors">Fleet</Link>
                    <span>/</span>
                    <span className="text-amber-400 font-medium">{vehicle.name}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                            <Car size={14} />
                            {vehicle.category}
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">
                            {vehicle.name} <span className="gradient-text font-heading">Rental</span>
                        </h1>
                        <p className="text-gray-400 text-sm sm:text-base mt-2 flex items-center gap-2">
                            <Users size={16} className="text-amber-400" />
                            Seating Capacity: <span className="text-white font-medium">{vehicle.seats}</span>
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <a
                            href="tel:+919714555226"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                        >
                            <Phone size={16} />
                            Call +91 97145 55226
                        </a>
                        <a
                            href={`https://wa.me/919714555226?text=Hi%20Mahadev%20Krupa!%20I%20want%20to%20book%20the%20${encodeURIComponent(vehicle.name)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-full neon-border text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300"
                        >
                            <MessageCircle size={16} />
                            WhatsApp Inquiry
                        </a>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* Left: Gallery & Spec Overview */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Main Cover Image */}
                        <div className="relative rounded-2xl overflow-hidden glass p-2 border border-amber-400/20 shadow-2xl">
                            <img
                                src={vehicle.coverImage}
                                alt={`${vehicle.name} Luxury Car Hire Surat`}
                                className="w-full h-[320px] sm:h-[420px] object-cover rounded-xl"
                            />
                            <div className="absolute top-4 right-4 bg-dark-bg/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/30 flex items-center gap-1.5">
                                <Sparkles size={12} />
                                Deep-Cleaned & Sanitized
                            </div>
                        </div>

                        {/* Image Gallery Grid */}
                        {vehicle.images.length > 1 && (
                            <div>
                                <h3 className="text-lg font-bold text-white font-heading mb-4">Vehicle Photo Gallery</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {vehicle.images.map((imgUrl, idx) => (
                                        <div key={idx} className="relative rounded-xl overflow-hidden glass group border border-dark-border hover:border-amber-400/40 transition-colors h-24">
                                            <img
                                                src={imgUrl}
                                                alt={`${vehicle.name} photo ${idx + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Vehicle Description */}
                        <div className="p-6 rounded-2xl glass space-y-4">
                            <h2 className="text-xl font-bold text-white font-heading">About {vehicle.name}</h2>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                {vehicle.description}
                            </p>
                        </div>

                        {/* Highlights Badges */}
                        <div>
                            <h3 className="text-lg font-bold text-white font-heading mb-4">Key Features & Highlights</h3>
                            <div className="flex flex-wrap gap-2.5">
                                {vehicle.highlights.map((highlight, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-medium"
                                    >
                                        <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                        {highlight}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Technical Specifications & Direct Booking Sidebar */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Specifications Table */}
                        <div className="p-6 rounded-2xl glass border border-dark-border">
                            <h3 className="text-xl font-bold text-white font-heading mb-6 flex items-center gap-2">
                                <ShieldCheck className="text-amber-400" size={20} />
                                Specifications & Amenities
                            </h3>
                            <div className="divide-y divide-dark-border">
                                {vehicle.specs.map((spec, i) => (
                                    <div key={i} className="py-3 flex justify-between items-center text-sm">
                                        <span className="text-gray-400 font-medium">{spec.label}</span>
                                        <span className="text-white font-semibold text-right">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Booking Trust Card */}
                        <div className="p-6 rounded-2xl glass bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 text-center space-y-4">
                            <h3 className="text-lg font-bold text-white font-heading">Why Book {vehicle.name} With Us?</h3>
                            <ul className="text-left space-y-2.5 text-xs sm:text-sm text-gray-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    Transparent Pricing — No hidden fees or unexpected charges
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    100% Real-time GPS-tracked safety for all journeys
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    Professional, verified & route-expert driver
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    24/7 Dispatch and customer assistance line
                                </li>
                            </ul>
                            <a
                                href="#contact"
                                className="block w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                            >
                                Request Instant Quote
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-linking: Other Vehicles */}
            {otherVehicles.length > 0 && (
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-dark-border mt-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase block font-heading">Explore Fleet</span>
                            <h2 className="text-2xl font-bold font-display text-white">Other Available Vehicles</h2>
                        </div>
                        <Link href="/#fleet" className="text-amber-400 text-sm hover:text-amber-300 font-medium">
                            View Full Fleet →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {otherVehicles.map((car) => (
                            <Link
                                key={car.id}
                                href={`/fleet/${car.id}`}
                                className="group p-5 rounded-2xl glass hover:border-amber-400/40 transition-all duration-300 block"
                            >
                                <div className="h-44 rounded-xl overflow-hidden mb-4">
                                    <img
                                        src={car.coverImage}
                                        alt={car.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">{car.category}</span>
                                <h3 className="text-lg font-bold text-white font-heading mt-1 group-hover:text-amber-300 transition-colors">
                                    {car.name}
                                </h3>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                                    <Users size={14} className="text-amber-400" /> {car.seats}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <Footer />
            <FloatingButtons />
            <QuickBookingPanel />
        </main>
    );
}
