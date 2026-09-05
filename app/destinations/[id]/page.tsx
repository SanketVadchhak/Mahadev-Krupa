import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/sections/Navbar';
import Footer from '@/app/components/sections/Footer';
import FloatingButtons from '@/app/components/FloatingButtons';
import QuickBookingPanel from '@/app/components/QuickBookingPanel';
import { destinations, Destination, fleet } from '@/app/components/data/siteData';
import { MapPin, Navigation, Calendar, CheckCircle2, Phone, MessageCircle, Sparkles, Compass, ShieldCheck, Users } from 'lucide-react';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return destinations.map((dest) => ({
        id: dest.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const dest = destinations.find((d) => d.id === id);

    if (!dest) {
        return {
            title: 'Destination Not Found',
        };
    }

    const pageTitle = `${dest.name} Tour Package from Surat | ${dest.tagline}`;
    const pageDescription = `Book comfortable cab & tempo traveller tour packages from Surat to ${dest.name} (${dest.distance}). ${dest.about.slice(0, 140)}... Call +91 97145 55226.`;
    const canonicalUrl = `https://mahadevkrupa.vercel.app/destinations/${dest.id}`;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: [
            `Surat to ${dest.name} cab`,
            `${dest.name} tour package from Surat`,
            `Surat to ${dest.name} taxi service`,
            `tempo traveller Surat to ${dest.name}`,
            'Mahadev Krupa tour packages',
            'Gujarat tourism packages',
        ],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${dest.name} Tour Package from Surat | Mahadev Krupa Tours & Travels`,
            description: pageDescription,
            url: canonicalUrl,
            siteName: 'Mahadev Krupa Tours & Travels',
            images: [
                {
                    url: dest.coverImage || '/assets/brand/og-logo.png',
                    width: 1200,
                    height: 630,
                    alt: `${dest.name} Tour Package Surat`,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${dest.name} Tour from Surat`,
            description: pageDescription,
            images: [dest.coverImage || '/assets/brand/og-logo.png'],
        },
    };
}

export default async function DestinationDetailPage({ params }: Props) {
    const { id } = await params;
    const dest = destinations.find((d) => d.id === id);

    if (!dest) {
        notFound();
    }

    const otherDestinations = destinations.filter((d) => d.id !== dest.id).slice(0, 3);
    const recommendedFleet = fleet.filter((c) => !c.isInquiry).slice(0, 3);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: `Surat to ${dest.name} Tour Package`,
        description: dest.about,
        image: dest.coverImage,
        touristType: 'Family, Pilgrimage, Leisure',
        offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'LocalBusiness',
                name: 'Mahadev Krupa Tours & Travels',
                telephone: '+919714555226',
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
                item: 'https://mahadevkrupa.vercel.app',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Destinations',
                item: 'https://mahadevkrupa.vercel.app/#gallery',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: dest.name,
                item: `https://mahadevkrupa.vercel.app/destinations/${dest.id}`,
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
                    <Link href="/#gallery" className="hover:text-amber-400 transition-colors">Destinations</Link>
                    <span>/</span>
                    <span className="text-amber-400 font-medium">{dest.name}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-dark-border pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-3 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                            <Compass size={14} />
                            {dest.tagline}
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">
                            Surat to <span className="gradient-text font-heading">{dest.name}</span> Cab Package
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs sm:text-sm mt-3">
                            <span className="flex items-center gap-1.5">
                                <Navigation size={15} className="text-amber-400" />
                                Distance from Surat: <strong className="text-white">{dest.distance}</strong>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Calendar size={15} className="text-amber-400" />
                                Best Time: <strong className="text-white">{dest.bestTime}</strong>
                            </span>
                        </div>
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
                            href={`https://wa.me/919714555226?text=Hi%20Mahadev%20Krupa!%20I%20want%20to%20inquire%20about%20the%20${encodeURIComponent(dest.name)}%20tour%20package.`}
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

            {/* Main Content Section */}
            <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* Left: Gallery & About */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Cover Image */}
                        <div className="relative rounded-2xl overflow-hidden glass p-2 border border-amber-400/20 shadow-2xl">
                            <img
                                src={dest.coverImage}
                                alt={`Surat to ${dest.name} Tour Package`}
                                className="w-full h-[320px] sm:h-[420px] object-cover rounded-xl"
                            />
                            <div className="absolute top-4 right-4 bg-dark-bg/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-amber-400 border border-amber-400/30">
                                Customized Outstation Tour
                            </div>
                        </div>

                        {/* Image Gallery */}
                        {dest.images.length > 1 && (
                            <div>
                                <h3 className="text-lg font-bold text-white font-heading mb-4">Destination Photo Gallery</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                    {dest.images.map((imgUrl, idx) => (
                                        <div key={idx} className="relative rounded-xl overflow-hidden glass group border border-dark-border hover:border-amber-400/40 transition-colors h-24">
                                            <img
                                                src={imgUrl}
                                                alt={`${dest.name} photo ${idx + 1}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* About Destination */}
                        <div className="p-6 rounded-2xl glass space-y-4">
                            <h2 className="text-xl font-bold text-white font-heading">About {dest.name} Trip</h2>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                                {dest.about}
                            </p>
                        </div>

                        {/* Top Sightseeing Highlights */}
                        <div>
                            <h3 className="text-lg font-bold text-white font-heading mb-4">Top Sightseeing Places & Attractions</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {dest.highlights.map((highlight, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3.5 rounded-xl glass border border-dark-border text-xs sm:text-sm text-gray-200"
                                    >
                                        <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                        <span>{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: Recommended Fleet & Package Booking */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Package Perks Card */}
                        <div className="p-6 rounded-2xl glass border border-dark-border space-y-4">
                            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
                                <ShieldCheck className="text-amber-400" size={20} />
                                Package Inclusions
                            </h3>
                            <ul className="space-y-3 text-xs sm:text-sm text-gray-300">
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    Pick-up and drop anywhere in Surat city
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    Dedicated vehicle with experienced long-distance driver
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    All fuel, driver allowances & GPS safety tracking
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                                    Flexible itinerary & personalized halt stops
                                </li>
                            </ul>
                        </div>

                        {/* Recommended Vehicles */}
                        <div className="p-6 rounded-2xl glass border border-dark-border">
                            <h3 className="text-lg font-bold text-white font-heading mb-4">Recommended Vehicles for {dest.name}</h3>
                            <div className="space-y-3">
                                {recommendedFleet.map((car) => (
                                    <Link
                                        key={car.id}
                                        href={`/fleet/${car.id}`}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-dark-surface/50 border border-dark-border hover:border-amber-400/40 transition-colors group"
                                    >
                                        <img
                                            src={car.coverImage}
                                            alt={car.name}
                                            className="w-16 h-12 object-cover rounded-lg shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors truncate">
                                                {car.name}
                                            </h4>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <Users size={12} className="text-amber-400" /> {car.seats}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* CTA Box */}
                        <div className="p-6 rounded-2xl glass bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 text-center space-y-3">
                            <h4 className="text-base font-bold text-white font-heading">Need a Custom Itinerary?</h4>
                            <p className="text-xs text-gray-400">
                                Contact us for customized multi-day tour plans, hotels, and group booking discounts.
                            </p>
                            <a
                                href="#contact"
                                className="block w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
                            >
                                Book {dest.name} Tour
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cross-linking: Other Destinations */}
            {otherDestinations.length > 0 && (
                <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-dark-border mt-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase block font-heading">More Destinations</span>
                            <h2 className="text-2xl font-bold font-display text-white">Popular Tour Packages</h2>
                        </div>
                        <Link href="/#gallery" className="text-amber-400 text-sm hover:text-amber-300 font-medium">
                            View All Packages →
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {otherDestinations.map((d) => (
                            <Link
                                key={d.id}
                                href={`/destinations/${d.id}`}
                                className="group p-5 rounded-2xl glass hover:border-amber-400/40 transition-all duration-300 block"
                            >
                                <div className="h-44 rounded-xl overflow-hidden mb-4">
                                    <img
                                        src={d.coverImage}
                                        alt={d.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">{d.tagline}</span>
                                <h3 className="text-lg font-bold text-white font-heading mt-1 group-hover:text-amber-300 transition-colors">
                                    {d.name}
                                </h3>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                                    <Navigation size={14} className="text-amber-400" /> {d.distance} from Surat
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
