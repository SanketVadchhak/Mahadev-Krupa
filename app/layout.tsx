import type { Metadata } from 'next';
import { Playfair_Display, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://mahadevkrupa.vercel.app'),
    title: {
        default: 'Mahadev Krupa Tours & Travels | Premium Car Rental & Tour Packages in Surat, Gujarat',
        template: '%s | Mahadev Krupa Tours & Travels',
    },
    description:
        'Surat\'s most trusted luxury travel agency. Book premium car rentals, outstation cabs, tempo travellers, Urbania buses, family tour packages, wedding car fleets, and pilgrimage trips across Gujarat, Rajasthan, Goa & beyond. 24/7 service. Call +91 97145 55226.',
    keywords: [
        'car rental Surat',
        'tempo traveller Surat',
        'cab service Surat',
        'outstation taxi Surat',
        'Surat to Goa cab',
        'Surat to Dwarka taxi',
        'Surat to Statue of Unity cab',
        'Surat to Rajasthan tour',
        'wedding car rental Surat',
        'Force Urbania hire Surat',
        'luxury travel Gujarat',
        'Mahadev Krupa Tours and Travels',
        'Gujarat tour packages',
        'Innova Crysta hire Surat',
        'Kia Carens rental Surat',
        'bus rental Surat',
        'pilgrimage tour Gujarat',
        'Kutch tour from Surat',
        'Saputara trip from Surat',
        'airport transfer Surat',
        'group travel Gujarat',
        'family tour packages Surat',
    ],
    authors: [{ name: 'Mahadev Krupa Tours & Travels' }],
    creator: 'Mahadev Krupa Tours & Travels',
    publisher: 'Mahadev Krupa Tours & Travels',
    icons: {
        icon: '/icon',
        shortcut: '/icon',
        apple: '/apple-icon',
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
        title: 'Mahadev Krupa Tours & Travels | Car Rental & Tour Packages in Surat',
        description:
            'Surat\'s leading luxury travel agency. Premium car hire, tempo travellers, Urbania buses, wedding fleets, and pilgrimage tours across Gujarat & India.',
        url: 'https://mahadevkrupa.vercel.app',
        siteName: 'Mahadev Krupa Tours & Travels',
        locale: 'en_IN',
        type: 'website',
        images: [
            {
                url: '/assets/brand/og-logo.png',
                width: 512,
                height: 512,
                alt: 'Mahadev Krupa Tours & Travels — Premium Travel in Gujarat',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mahadev Krupa Tours & Travels | Luxury Travel Surat',
        description:
            'Surat\'s premier luxury travel agency. Premium car hire, tours, wedding fleets and group travel across Gujarat.',
        creator: '@mahadevkrupa',
        images: ['/assets/brand/og-logo.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://mahadevkrupa.vercel.app',
    },
    category: 'travel',
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`${inter.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable}`}
        >
            <head>
                {/* JSON-LD Structured Data — LocalBusiness (Google Knowledge Panel) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'LocalBusiness',
                            '@id': 'https://mahadevkrupa.vercel.app',
                            name: 'Mahadev Krupa Tours & Travels',
                            description: 'Premium car rental, tour packages, tempo traveller, Urbania bus hire, and wedding fleet services in Surat, Gujarat.',
                            url: 'https://mahadevkrupa.vercel.app',
                            telephone: '+919714555226',
                            email: 'mahadevkrupatourstravels@gmail.com',
                            image: 'https://mahadevkrupa.vercel.app/assets/brand/og-logo.png',
                            logo: 'https://mahadevkrupa.vercel.app/assets/brand/og-logo.png',
                            priceRange: '₹₹',
                            currenciesAccepted: 'INR',
                            paymentAccepted: 'Cash, UPI, Bank Transfer',
                            openingHoursSpecification: {
                                '@type': 'OpeningHoursSpecification',
                                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                                opens: '00:00',
                                closes: '23:59',
                            },
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'Mahadev Car World, B/H Punjan Plaza, BRTS Rd, opp. Vanmali Junction',
                                addressLocality: 'Surat',
                                addressRegion: 'Gujarat',
                                postalCode: '395006',
                                addressCountry: 'IN',
                            },
                            geo: {
                                '@type': 'GeoCoordinates',
                                latitude: 21.1702,
                                longitude: 72.8311,
                            },
                            areaServed: [
                                { '@type': 'City', name: 'Surat' },
                                { '@type': 'State', name: 'Gujarat' },
                                { '@type': 'State', name: 'Rajasthan' },
                                { '@type': 'State', name: 'Goa' },
                            ],
                            sameAs: [
                                'https://www.instagram.com/mahadev_krupa_tours_travels/',
                                'http://www.youtube.com/@mahadevkrupatourstravels',
                            ],
                            aggregateRating: {
                                '@type': 'AggregateRating',
                                ratingValue: '4.9',
                                reviewCount: '520',
                                bestRating: '5',
                                worstRating: '1',
                            },
                            hasOfferCatalog: {
                                '@type': 'OfferCatalog',
                                name: 'Travel Services',
                                itemListElement: [
                                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outstation Car Rental' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tempo Traveller Hire' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Force Urbania Bus Hire' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Car Fleet' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gujarat Tour Packages' } },
                                    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pilgrimage Tours' } },
                                ],
                            },
                        }),
                    }}
                />
            </head>
            <body style={{ overflowX: 'clip', maxWidth: '100vw', position: 'relative' }}>
                <div style={{ overflowX: 'clip', width: '100%', position: 'relative' }}>
                    {children}
                </div>
            </body>
        </html>
    );
}
