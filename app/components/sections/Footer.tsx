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
        <div className="absolute bottom-16 md:bottom-0 left-0 right-0 overflow-hidden pointer-events-none" style={{ height: 120 }}>
            {/* Stars */}
            {STARS.map((s, i) => (
                <div key={i} className="absolute rounded-full animate-pulse"
                    style={{ width: s.w, height: s.h, background: 'rgba(212, 168, 67, 0.4)', top: s.t, left: s.l, animationDelay: s.del, animationDuration: s.dur }}
                />
            ))}

            {/* Far mountains — slow scroll */}
            <svg className="absolute bottom-6 left-0" style={{ width: '200%', height: 60, animation: 'scroll-landscape 40s linear infinite' }} viewBox="0 0 2400 60" preserveAspectRatio="none">
                <path d="M0,55 L60,30 L90,40 L140,18 L190,38 L230,25 L280,42 L350,12 L420,35 L460,20 L520,38 L580,28 L640,40 L700,15 L760,32 L820,42 L900,10 L960,30 L1020,38 L1080,22 L1140,40 L1200,55 L1260,30 L1290,40 L1340,18 L1390,38 L1430,25 L1480,42 L1550,12 L1620,35 L1660,20 L1720,38 L1780,28 L1840,40 L1900,15 L1960,32 L2020,42 L2100,10 L2160,30 L2220,38 L2280,22 L2340,40 L2400,55"
                    fill="none" stroke="rgba(212, 168, 67, 0.08)" strokeWidth="1" />
                <path d="M0,55 L60,30 L90,40 L140,18 L190,38 L230,25 L280,42 L350,12 L420,35 L460,20 L520,38 L580,28 L640,40 L700,15 L760,32 L820,42 L900,10 L960,30 L1020,38 L1080,22 L1140,40 L1200,55 L1260,30 L1290,40 L1340,18 L1390,38 L1430,25 L1480,42 L1550,12 L1620,35 L1660,20 L1720,38 L1780,28 L1840,40 L1900,15 L1960,32 L2020,42 L2100,10 L2160,30 L2220,38 L2280,22 L2340,40 L2400,55 L2400,60 L0,60 Z"
                    fill="rgba(212, 168, 67, 0.03)" />
            </svg>

            {/* Near silhouettes — temples, trees, Statue of Unity — medium scroll */}
            <svg className="absolute bottom-4 left-0" style={{ width: '200%', height: 50, animation: 'scroll-landscape 25s linear infinite' }} viewBox="0 0 2400 50" preserveAspectRatio="none">
                <g opacity="0.12" fill="#D4A843"><rect x="80" y="25" width="16" height="25" /><polygon points="72,25 96,25 88,8" /><rect x="86" y="12" width="4" height="6" /></g>
                <g opacity="0.06" fill="#D4A843"><rect x="200" y="35" width="3" height="15" /><ellipse cx="201" cy="30" rx="10" ry="12" /></g>
                <g opacity="0.1" fill="#D4A843"><rect x="380" y="10" width="6" height="40" /><rect x="374" y="8" width="18" height="4" rx="1" /><circle cx="383" cy="5" r="3" /></g>
                <g opacity="0.1" fill="#D4A843"><rect x="560" y="22" width="20" height="28" /><polygon points="550,22 600,22 580,5" /><rect x="568" y="10" width="4" height="8" /></g>
                <g opacity="0.07" fill="#D4A843"><rect x="720" y="30" width="3" height="20" /><ellipse cx="721" cy="26" rx="12" ry="8" /></g>
                <g opacity="0.09" fill="#D4A843"><rect x="900" y="20" width="8" height="30" /><rect x="930" y="20" width="8" height="30" /><path d="M900,20 Q919,8 938,20" fill="rgba(212,168,67,0.09)" /></g>
                <g opacity="0.08" fill="#D4A843"><rect x="1100" y="30" width="12" height="20" /><polygon points="1094,30 1118,30 1106,18" /></g>
                {/* Repeat 1 */}
                <g opacity="0.12" fill="#D4A843"><rect x="1280" y="25" width="16" height="25" /><polygon points="1272,25 1296,25 1288,8" /></g>
                <g opacity="0.06" fill="#D4A843"><rect x="1400" y="35" width="3" height="15" /><ellipse cx="1401" cy="30" rx="10" ry="12" /></g>
                <g opacity="0.1" fill="#D4A843"><rect x="1580" y="10" width="6" height="40" /><rect x="1574" y="8" width="18" height="4" rx="1" /><circle cx="1583" cy="5" r="3" /></g>
                <g opacity="0.1" fill="#D4A843"><rect x="1760" y="22" width="20" height="28" /><polygon points="1750,22 1800,22 1780,5" /></g>
                <g opacity="0.07" fill="#D4A843"><rect x="1920" y="30" width="3" height="20" /><ellipse cx="1921" cy="26" rx="12" ry="8" /></g>
                <g opacity="0.09" fill="#D4A843"><rect x="2100" y="20" width="8" height="30" /><rect x="2130" y="20" width="8" height="30" /></g>
                <g opacity="0.08" fill="#D4A843"><rect x="2300" y="30" width="12" height="20" /><polygon points="2294,30 2318,30 2306,18" /></g>
            </svg>

            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0" style={{ height: 8, background: 'linear-gradient(90deg, rgba(212,168,67,0.15), rgba(212,168,67,0.25), rgba(212,168,67,0.15))' }}>
                <div className="absolute top-1/2 -translate-y-1/2 left-0" style={{ width: '200%', height: 1, backgroundImage: 'repeating-linear-gradient(90deg, rgba(212,168,67,0.5) 0px, rgba(212,168,67,0.5) 20px, transparent 20px, transparent 40px)', animation: 'scroll-road 2s linear infinite' }} />
            </div>

            {/* SUV — only wheel spokes spin, car body stays still */}
            <svg className="absolute bottom-2 left-[6%] sm:left-[12%]" style={{ width: 44, height: 22, transform: 'scaleX(-1)' }} viewBox="0 0 44 22" fill="none">
                <path d="M4,14 L4,10 Q4,8 6,8 L14,8 L18,4 Q19,3 21,3 L32,3 Q34,3 35,4 L38,8 L40,8 Q42,8 42,10 L42,14" fill="rgba(212,168,67,0.25)" />
                <path d="M18,5 L15,8 L22,8 L22,5 Z" fill="rgba(212,168,67,0.12)" />
                <path d="M23,5 L23,8 L34,8 L32,5 Z" fill="rgba(212,168,67,0.12)" />
                <rect x="3" y="14" width="40" height="3" rx="1.5" fill="rgba(212,168,67,0.18)" />
                {/* Front wheel */}
                <circle cx="12" cy="17" r="4" fill="rgba(30,30,30,1)" stroke="rgba(212,168,67,0.35)" strokeWidth="1.2" />
                <circle cx="12" cy="17" r="1.5" fill="rgba(212,168,67,0.25)" />
                <g><line x1="12" y1="14.5" x2="12" y2="19.5" stroke="rgba(212,168,67,0.12)" strokeWidth="0.4"><animateTransform attributeName="transform" type="rotate" from="0 12 17" to="360 12 17" dur="0.5s" repeatCount="indefinite" /></line></g>
                {/* Rear wheel */}
                <circle cx="34" cy="17" r="4" fill="rgba(30,30,30,1)" stroke="rgba(212,168,67,0.35)" strokeWidth="1.2" />
                <circle cx="34" cy="17" r="1.5" fill="rgba(212,168,67,0.25)" />
                <g><line x1="34" y1="14.5" x2="34" y2="19.5" stroke="rgba(212,168,67,0.12)" strokeWidth="0.4"><animateTransform attributeName="transform" type="rotate" from="0 34 17" to="360 34 17" dur="0.5s" repeatCount="indefinite" /></line></g>
                {/* Headlight */}
                <circle cx="42" cy="11" r="2" fill="rgba(212,168,67,0.3)"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="1.5s" repeatCount="indefinite" /></circle>
            </svg>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="relative pt-16 md:pt-24 pb-40 md:pb-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg to-dark-card" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/10 to-transparent" />

            {/* Animated road scene */}
            <RoadScene />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Mahadev Krupa Tours & Travels. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
                        <a href="/terms-of-service" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
