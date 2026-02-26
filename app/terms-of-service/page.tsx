import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service | Mahadev Krupa Tours & Travels',
    description: 'Terms of Service for Mahadev Krupa Tours & Travels — booking terms, cancellations, liability, and usage conditions.',
};

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-dark-bg text-gray-300">
            {/* Header */}
            <div className="pt-28 pb-12 px-4" style={{ background: 'linear-gradient(170deg, #111 0%, #1a1a1a 100%)' }}>
                <div className="max-w-3xl mx-auto">
                    <Link href="/" className="text-amber-400 text-sm hover:text-amber-300 transition-colors mb-4 inline-block">
                        ← Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-heading">Terms of Service</h1>
                    <p className="text-gray-500 text-sm mt-3">Last updated: February 26, 2026</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">1. Acceptance of Terms</h2>
                    <p className="leading-relaxed">
                        By accessing and using the Mahadev Krupa Tours & Travels website or booking our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">2. Services</h2>
                    <p className="leading-relaxed">
                        Mahadev Krupa Tours & Travels provides vehicle rental and tour services across Gujarat and beyond. Our fleet includes premium cars, minibuses, tempo travellers, and luxury coaches. All bookings are subject to vehicle availability and confirmation from our team.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">3. Booking & Confirmation</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>All booking requests made through our website, phone, or WhatsApp are considered inquiries until confirmed by our team.</li>
                        <li>A booking is confirmed only after you receive written or verbal confirmation from Mahadev Krupa Tours & Travels along with the agreed pricing.</li>
                        <li>Prices quoted are subject to change based on travel distance, vehicle type, duration, and seasonal demand.</li>
                        <li>An advance payment may be required to confirm certain bookings, the details of which will be communicated at the time of confirmation.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">4. Cancellation & Refund Policy</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>Cancellations made more than 48 hours before the scheduled trip are eligible for a full refund of any advance payment.</li>
                        <li>Cancellations made within 24–48 hours may be subject to a cancellation fee of up to 25% of the booking amount.</li>
                        <li>Cancellations made less than 24 hours before departure or no-shows are non-refundable.</li>
                        <li>Mahadev Krupa Tours & Travels reserves the right to cancel or reschedule a trip due to unforeseen circumstances such as severe weather, road closures, or vehicle breakdowns. In such cases, a full refund or alternative arrangement will be provided.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">5. Passenger Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>Passengers must provide accurate personal and travel information at the time of booking.</li>
                        <li>Passengers are responsible for their personal belongings during the trip. Mahadev Krupa Tours & Travels is not liable for loss, theft, or damage to personal property.</li>
                        <li>Smoking, consumption of alcohol, and any illegal activities inside the vehicle are strictly prohibited.</li>
                        <li>Any damage caused to the vehicle by passengers will be charged to the customer.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">6. Limitation of Liability</h2>
                    <p className="leading-relaxed">
                        Mahadev Krupa Tours & Travels shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by the customer for the specific booking in question. We take every reasonable precaution to ensure passenger safety, but travel inherently involves risks that are beyond our control.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">7. Website Usage</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                        <li>The content on this website is provided for informational purposes only and is subject to change without notice.</li>
                        <li>Vehicle images shown on the website are representative and the actual vehicle provided may differ slightly in appearance.</li>
                        <li>You agree not to misuse our website, attempt to access unauthorized areas, or use automated tools to scrape content.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">8. Intellectual Property</h2>
                    <p className="leading-relaxed">
                        All content on this website, including text, images, logos, and design, is the property of Mahadev Krupa Tours & Travels and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without our prior written permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">9. Governing Law</h2>
                    <p className="leading-relaxed">
                        These Terms of Service shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Surat, Gujarat.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">10. Changes to Terms</h2>
                    <p className="leading-relaxed">
                        We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of our website or services after any modifications constitutes acceptance of the updated terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-white font-heading mb-3">11. Contact Us</h2>
                    <p className="leading-relaxed">
                        For any questions regarding these Terms of Service, please reach out to us:
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
