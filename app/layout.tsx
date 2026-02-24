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
    title: 'Mahadev Krupa Tours & Travels | Premium Luxury Travel in Gujarat',
    description:
        "Gujarat's most trusted luxury travel agency. Book premium city rides, outstation tours, family packages, wedding car fleets, and self-drive vehicles in Ahmedabad and across Gujarat.",
    keywords: [
        'luxury travel Gujarat',
        'Ahmedabad cab service',
        'outstation tours Gujarat',
        'wedding car rental Ahmedabad',
        'self drive cars Gujarat',
        'Mahadev Krupa Tours',
        'premium taxi Gujarat',
        'Innova Crysta hire Ahmedabad',
        'airport transfer Ahmedabad',
        'Gujarat sightseeing tour',
    ],
    authors: [{ name: 'Mahadev Krupa Tours & Travels' }],
    creator: 'Mahadev Krupa Tours & Travels',
    publisher: 'Mahadev Krupa Tours & Travels',
    openGraph: {
        title: 'Mahadev Krupa Tours & Travels | Premium Luxury Travel in Gujarat',
        description:
            "Gujarat's most trusted luxury travel agency. Premium city rides, outstation tours, wedding fleets and self-drive cars.",
        url: 'https://mahadevkrupa.com',
        siteName: 'Mahadev Krupa Tours & Travels',
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mahadev Krupa Tours & Travels | Luxury Travel Gujarat',
        description:
            "Gujarat's premier luxury travel agency. Book premium rides, tours, wedding cars and self-drive vehicles.",
        creator: '@mahadevkrupa',
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
        canonical: 'https://mahadevkrupa.com',
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
            <body>{children}</body>
        </html>
    );
}
