'use client';

import { Phone, MapPin, Clock, Mail, ChevronRight, Instagram, Youtube } from 'lucide-react';
import { services } from '../data/siteData';

// Pre-computed star positions — no Math.random() during render (prevents hydration mismatch)
const STARS = [
    { w: 1.5, h: 1.5, t: '5%', l: '8%', del: '0s', dur: '2.5s' },
    { w: 2, h: 2, t: '15%', l: '22%', del: '0.8s', dur: '3s' },
    { w: 1, h: 1, t: '8%', l: '35%', del: '1.5s', dur: '2.2s' },
    { w: 1.8, h: 1.8, t: '28%', l: '48%', del: '0.3s', dur: '3.5s' },
    { w: 1.2, h: 1.2, t: '12%', l: '58%', del: '2s', dur: '2.8s' },
    { w: 2, h: 2, t: '3%', l: '70%', del: '1s', dur: '3.2s' },
    { w: 1.5, h: 1.5, t: '22%', l: '78%', del: '0.5s', dur: '2.6s' },
    { w: 1, h: 1, t: '18%', l: '88%', del: '1.8s', dur: '3s' },
    { w: 1.8, h: 1.8, t: '30%', l: '15%', del: '2.5s', dur: '2.4s' },
    { w: 1.3, h: 1.3, t: '10%', l: '95%', del: '0.2s', dur: '3.3s' },
    { w: 2, h: 2, t: '25%', l: '42%', del: '1.2s', dur: '2.9s' },
    { w: 1, h: 1, t: '6%', l: '63%', del: '2.8s', dur: '2.1s' },
];

// ─── Animated Road Scene ────────────────────────────────────────
function RoadScene() {
    return (
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none h-[120px] z-20">
            {/* Stars */}
            {STARS.map((s, i) => (
                <div key={i} className="absolute rounded-full animate-pulse"
                    style={{ width: s.w, height: s.h, background: 'rgba(212, 168, 67, 0.6)', top: s.t, left: s.l, animationDelay: s.del, animationDuration: s.dur }}
                />
            ))}

            {/* Distant Mountain Skyline */}
            <svg className="absolute bottom-5 left-0 w-[200%] h-[50px] animate-scroll-landscape-slow" viewBox="0 0 2400 50" preserveAspectRatio="none">
                <path d="M0,45 L60,25 L90,35 L140,15 L190,32 L230,20 L280,38 L350,10 L420,30 L460,18 L520,32 L580,24 L640,35 L700,12 L760,28 L820,38 L900,8 L960,26 L1020,34 L1080,18 L1140,35 L1200,45 L1260,25 L1290,35 L1340,15 L1390,32 L1430,20 L1480,38 L1550,10 L1620,30 L1660,18 L1720,32 L1780,24 L1840,35 L1900,12 L1960,28 L2020,38 L2100,8 L2160,26 L2220,34 L2280,18 L2340,35 L2400,45 L2400,50 L0,50 Z"
                    fill="rgba(212, 168, 67, 0.12)" stroke="rgba(212, 168, 67, 0.3)" strokeWidth="1" />
            </svg>

            {/* Gujarat Landmarks & Organic Tree Silhouettes */}
            <svg className="absolute bottom-4 left-0 w-[200%] h-[40px] animate-scroll-landscape" viewBox="0 0 2400 40" preserveAspectRatio="none">
                {/* Tree 1 - Organic Banyan / Deciduous Tree */}
                <g opacity="0.35" fill="#D4A843">
                    <rect x="86" y="22" width="5" height="18" rx="1" />
                    <circle cx="88.5" cy="16" r="11" />
                    <circle cx="79" cy="19" r="8" />
                    <circle cx="98" cy="19" r="8" />
                    <circle cx="88.5" cy="9" r="8" />
                </g>

                {/* Tree 2 - Soft Round Canopy Tree */}
                <g opacity="0.3" fill="#D4A843">
                    <rect x="200" y="22" width="4" height="18" rx="1" />
                    <circle cx="202" cy="14" r="10" />
                    <circle cx="194" cy="17" r="7" />
                    <circle cx="210" cy="17" r="7" />
                </g>

                {/* Monument Tower */}
                <g opacity="0.25" fill="#D4A843"><rect x="380" y="5" width="6" height="35" /><rect x="374" y="3" width="18" height="4" rx="1" /></g>

                {/* Tree 3 - Multi-dome Canopy Tree */}
                <g opacity="0.3" fill="#D4A843">
                    <rect x="578" y="22" width="4" height="18" rx="1" />
                    <ellipse cx="580" cy="16" rx="13" ry="10" />
                    <ellipse cx="580" cy="10" rx="9" ry="8" />
                    <circle cx="572" cy="18" r="6" />
                    <circle cx="588" cy="18" r="6" />
                </g>

                {/* Shrub Tree */}
                <g opacity="0.2" fill="#D4A843"><rect x="720" y="20" width="3" height="20" /><ellipse cx="721" cy="16" rx="12" ry="8" /></g>
                <g opacity="0.2" fill="#D4A843"><rect x="900" y="12" width="8" height="28" /><rect x="930" y="12" width="8" height="28" /></g>

                {/* Repeat pattern for seamless 200% width looping */}
                <g opacity="0.35" fill="#D4A843">
                    <rect x="1286" y="22" width="5" height="18" rx="1" />
                    <circle cx="1288.5" cy="16" r="11" />
                    <circle cx="1279" cy="19" r="8" />
                    <circle cx="1298" cy="19" r="8" />
                    <circle cx="1288.5" cy="9" r="8" />
                </g>
                <g opacity="0.3" fill="#D4A843">
                    <rect x="1400" y="22" width="4" height="18" rx="1" />
                    <circle cx="1402" cy="14" r="10" />
                    <circle cx="1394" cy="17" r="7" />
                    <circle cx="1410" cy="17" r="7" />
                </g>
                <g opacity="0.25" fill="#D4A843"><rect x="1580" y="5" width="6" height="35" /><rect x="1574" y="3" width="18" height="4" rx="1" /></g>
                <g opacity="0.3" fill="#D4A843">
                    <rect x="1778" y="22" width="4" height="18" rx="1" />
                    <ellipse cx="1780" cy="16" rx="13" ry="10" />
                    <ellipse cx="1780" cy="10" rx="9" ry="8" />
                    <circle cx="1772" cy="18" r="6" />
                    <circle cx="1788" cy="18" r="6" />
                </g>
                <g opacity="0.2" fill="#D4A843"><rect x="1920" y="20" width="3" height="20" /><ellipse cx="1921" cy="16" rx="12" ry="8" /></g>
                <g opacity="0.2" fill="#D4A843"><rect x="2100" y="12" width="8" height="28" /><rect x="2130" y="12" width="8" height="28" /></g>
            </svg>

            {/* Asphalt Highway (Clean Dark Road) */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#1a1a1a] border-t border-amber-500/30 shadow-inner" />

            {/* Midway Flipped SUV */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none z-30 animate-car-bounce">
                <div className="relative w-14 h-7">
                    {/* Ground Contact Shadow under vehicle body */}
                    <div className="absolute -bottom-0.5 left-1 w-12 h-1.5 bg-black/90 blur-[1px] rounded-full z-0" />

                    {/* SUV Body SVG (flipped horizontally) */}
                    <svg viewBox="0 0 44 22" fill="none" className="relative w-full h-full scale-x-[-1] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] z-10">
                        <path d="M4,14 L4,10 Q4,8 6,8 L14,8 L18,4 Q19,3 21,3 L32,3 Q34,3 35,4 L38,8 L40,8 Q42,8 42,10 L42,14 Z" fill="#D4A843" />
                        <path d="M18,5 L15,8 L22,8 L22,5 Z" fill="#121212" opacity="0.85" />
                        <path d="M23,5 L23,8 L34,8 L32,5 Z" fill="#121212" opacity="0.85" />
                        <rect x="3" y="14" width="40" height="2" rx="1" fill="#FFF" opacity="0.6" />

                        {/* Front wheel with spinning spoke */}
                        <circle cx="34" cy="16" r="3.5" fill="#111" stroke="#D4A843" strokeWidth="1.2" />
                        <circle cx="34" cy="16" r="1.2" fill="#D4A843" />
                        <g><line x1="34" y1="13.5" x2="34" y2="18.5" stroke="#D4A843" strokeWidth="0.6"><animateTransform attributeName="transform" type="rotate" from="0 34 16" to="360 34 16" dur="0.4s" repeatCount="indefinite" /></line></g>

                        {/* Rear wheel with spinning spoke */}
                        <circle cx="12" cy="16" r="3.5" fill="#111" stroke="#D4A843" strokeWidth="1.2" />
                        <circle cx="12" cy="16" r="1.2" fill="#D4A843" />
                        <g><line x1="12" y1="13.5" x2="12" y2="18.5" stroke="#D4A843" strokeWidth="0.6"><animateTransform attributeName="transform" type="rotate" from="0 12 16" to="360 12 16" dur="0.4s" repeatCount="indefinite" /></line></g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="relative pt-16 md:pt-24 pb-28 md:pb-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg to-dark-card" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/10 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <img
                                src="/assets/brand/logo.png"
                                alt="Mahadev Krupa Tours & Travels"
                                className="h-[114px] w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Gujarat&apos;s premier luxury travel agency. Premium vehicles &amp; professional service.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Instagram, href: 'https://www.instagram.com/mahadev_krupa_tours_travels/' },
                                { Icon: Youtube, href: 'http://www.youtube.com/@mahadevkrupatourstravels' },
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:bg-amber-500/20 hover:text-amber-400 transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-heading">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: 'Services', href: '#services' },
                                { label: 'Fleet', href: '#fleet' },
                                { label: 'About Us', href: '#about' },
                                { label: 'Gallery', href: '#gallery' },
                                { label: 'Testimonials', href: '#testimonials' },
                                { label: 'Contact', href: '#contact' },
                            ].map(link => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-heading">Our Services</h4>
                        <ul className="space-y-3">
                            {services.map(s => (
                                <li key={s.title}>
                                    <a href="#services" className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group">
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-heading">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-amber-400 mt-0.5 shrink-0" />
                                <a href="https://maps.app.goo.gl/H3hwoW7uTNTBC4TJA" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-amber-400 transition-colors">
                                    Mahadev Car World, B/H Punjan Plaza,<br />
                                    BRTS Rd, opp. Vanmali Junction,<br />
                                    Surat, Gujarat 395006
                                </a>
                            </li>
                            <li className="flex items-center gap-3"><Phone size={16} className="text-amber-400 shrink-0" /><a href="tel:+919714555226" className="text-gray-400 text-sm hover:text-amber-400 transition-colors">+91 97145 55226</a></li>
                            <li className="flex items-center gap-3"><Mail size={16} className="text-amber-400 shrink-0" /><a href="mailto:mahadevkrupatourstravels@gmail.com" className="text-gray-400 text-sm hover:text-amber-400 transition-colors">mahadevkrupatourstravels@gmail.com</a></li>
                            <li className="flex items-center gap-3"><Clock size={16} className="text-amber-400 shrink-0" /><span className="text-gray-400 text-sm">24/7 Service Available</span></li>
                        </ul>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8" />

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-12">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Mahadev Krupa Tours & Travels. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
                        <a href="/terms-of-service" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Animated road scene with high z-index layered above background overlay */}
            <RoadScene />
        </footer>
    );
}
