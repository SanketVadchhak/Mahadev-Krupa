import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Privacy Policy | Mahadev Krupa Tours & Travels',
    description: 'Privacy Policy for Mahadev Krupa Tours & Travels — how we collect, use, and protect your personal information.',
    alternates: {
        canonical: 'https://mahadevkrupa.com/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
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
                name: 'Privacy Policy',
                item: 'https://mahadevkrupa.com/privacy-policy',
            },
        ],
    };

    return (
        <main className="min-h-screen bg-dark-bg text-gray-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {/* Header */}
            <div className="pt-28 pb-12 px-4" style={{ background: 'linear-gradient(170deg, #111 0%, #1a1a1a 100%)' }}>
                <div className="max-w-3xl mx-auto">
                    <Link href="/" className="text-amber-400 text-sm hover:text-amber-300 transition-colors mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-heading">Privacy Policy</h1>
                    <p className="text-gray-500 text-sm mt-3">Last updated: February 26, 2026</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">1. Information We Collect</h2>
                    <p className="leading-relaxed mb-3">
                        When you use our website or services, we may collect the following personal information:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                        <li>Your name, phone number, and email address when you fill out a booking or inquiry form.</li>
                        <li>Travel details such as pickup location, drop location, travel date, passenger count, and vehicle preference.</li>
                        <li>Any additional message or special requirements you share with us.</li>
                        <li>Technical information such as your browser type, IP address, and device information collected automatically when you visit our website.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">2. How We Use Your Information</h2>
                    <p className="leading-relaxed mb-3">We use your personal information for the following purposes:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                        <li>To process your booking requests and inquiries.</li>
                        <li>To contact you regarding your travel arrangements, confirmations, and updates.</li>
                        <li>To improve our services and website experience based on your feedback and usage patterns.</li>
                        <li>To send you relevant offers, promotions, or service updates (only if you have opted in).</li>
                        <li>To comply with legal requirements and resolve disputes.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">3. Data Storage & Security</h2>
                    <p className="leading-relaxed">
                        Your data is stored securely using industry-standard encryption and access controls. We use Supabase as our database provider, which employs enterprise-grade security measures including SSL encryption, row-level security, and regular security audits. We do not sell, rent, or share your personal information with third parties except as required to fulfill your booking or as mandated by law.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">4. Third-Party Services</h2>
                    <p className="leading-relaxed mb-3">Our website may use the following third-party services:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                        <li><strong className="text-white">WhatsApp Business</strong> — When you submit a booking inquiry, your details may be shared via WhatsApp for faster communication.</li>
                        <li><strong className="text-white">ImageKit</strong> — Used to serve optimized vehicle images on our website.</li>
                        <li><strong className="text-white">Google Maps</strong> — Embedded on our contact page for directions to our office.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">5. Cookies</h2>
                    <p className="leading-relaxed">
                        Our website may use essential cookies to ensure proper functionality. We do not use tracking cookies or third-party advertising cookies. Your browser settings allow you to control or disable cookies at any time.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">6. Your Rights</h2>
                    <p className="leading-relaxed mb-3">You have the right to:</p>
                    <ul className="list-disc list-inside space-y-1.5 text-gray-400">
                        <li>Request access to the personal data we hold about you.</li>
                        <li>Request correction or deletion of your personal data.</li>
                        <li>Withdraw consent for data processing at any time.</li>
                        <li>Lodge a complaint with a relevant data protection authority.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">7. Contact Us</h2>
                    <p className="leading-relaxed">
                        If you have any questions or concerns about this Privacy Policy, please contact us at:
                    </p>
                    <div className="mt-3 p-4 rounded-xl" style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.15)' }}>
                        <p className="text-white font-semibold">Mahadev Krupa Tours & Travels</p>
                        <p className="text-gray-400 text-sm mt-1">Mahadev Car World, B/H Punjan Plaza, BRTS Rd, opp. Vanmali Junction, Surat, Gujarat 395006</p>
                        <p className="text-amber-400 text-sm mt-1">Phone: +91 97145 55226</p>
                        <p className="text-amber-400 text-sm">Email: mahadevkrupatourstravels@gmail.com</p>
                    </div>
                </section>
            </div>
        </main>
    );
}
