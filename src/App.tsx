import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone, MapPin, Clock, Shield, Car, Users, Heart, Navigation,
  ChevronRight, ChevronLeft, Star, Send, Menu, X,
  Fuel, Gauge, Settings, Calendar, Mail, MessageCircle,
  Instagram, Facebook, Twitter, Youtube, ArrowUp
} from 'lucide-react';

// ─── Custom Cursor ────────────────────────────────────────
function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX - 10, y: e.clientY - 10 });
      setDotPos({ x: e.clientX - 3, y: e.clientY - 3 });
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, input, textarea, select, [data-hover]')) setHovering(true);
    };
    const out = () => setHovering(false);
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;
  return (
    <>
      <div className={`custom-cursor ${hovering ? 'cursor-hover' : ''}`} style={{ left: pos.x, top: pos.y }} />
      <div className="custom-cursor-dot" style={{ left: dotPos.x, top: dotPos.y }} />
    </>
  );
}

// ─── Particle Background ────────────────────────────────
function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 6,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            '--duration': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ─── Section Wrapper with scroll animation ───────────────
function Section({ children, className = '', id = '' }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ─── 3D Luxury Car SVG ──────────────────────────────────
function LuxuryCarSVG() {
  return (
    <div className="relative w-full max-w-2xl mx-auto animate-float">
      <svg viewBox="0 0 800 350" className="w-full car-body" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="50%" stopColor="#1e1e1e" />
            <stop offset="100%" stopColor="#141414" />
          </linearGradient>
          <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4A843" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#B8902E" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="chromeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c0c0c0" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#c0c0c0" />
          </linearGradient>
          <linearGradient id="headlightGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4A843" />
            <stop offset="100%" stopColor="#F0D080" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glowStrong">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4A843" />
            <stop offset="60%" stopColor="#333" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="400" cy="290" rx="320" ry="20" fill="rgba(0,0,0,0.4)" filter="url(#glowStrong)" />

        {/* Car Body - Lower */}
        <path d="M120,230 Q100,230 90,220 L80,210 Q75,200 80,195 L140,190 L660,190 L720,195 Q725,200 720,210 L710,220 Q700,230 680,230 Z"
          fill="url(#bodyGrad)" stroke="#2e2e2e" strokeWidth="1" />

        {/* Car Body - Side Panel */}
        <path d="M130,190 L140,160 Q145,150 155,145 L280,120 Q300,115 320,115 L480,115 Q500,115 520,120 L645,145 Q655,150 660,160 L670,190 Z"
          fill="url(#bodyGrad)" stroke="#2e2e2e" strokeWidth="1" />

        {/* Roof */}
        <path d="M260,120 Q270,85 300,75 L500,75 Q530,85 540,120 Z"
          fill="#141414" stroke="#2e2e2e" strokeWidth="1" />

        {/* Windows */}
        <path d="M275,118 Q282,92 305,82 L395,82 L395,118 Z"
          fill="url(#windowGrad)" stroke="#D4A843" strokeWidth="0.5" opacity="0.8" />
        <path d="M405,82 L495,82 Q518,92 525,118 L405,118 Z"
          fill="url(#windowGrad)" stroke="#D4A843" strokeWidth="0.5" opacity="0.8" />

        {/* Window Divider */}
        <line x1="400" y1="80" x2="400" y2="120" stroke="#c0c0c0" strokeWidth="2" />

        {/* Chrome Trim */}
        <path d="M140,190 L660,190" stroke="url(#chromeGrad)" strokeWidth="2" opacity="0.6" />
        <path d="M260,120 L540,120" stroke="url(#chromeGrad)" strokeWidth="1.5" opacity="0.4" />

        {/* Hood Lines */}
        <path d="M155,145 L280,120" stroke="#2e2e2e" strokeWidth="0.5" opacity="0.5" />
        <path d="M645,145 L520,120" stroke="#2e2e2e" strokeWidth="0.5" opacity="0.5" />

        {/* Headlights */}
        <path d="M85,205 L130,195 L130,215 Z" fill="url(#headlightGrad)" filter="url(#glow)" opacity="0.9" />
        <rect x="82" y="200" width="50" height="3" rx="1" fill="#D4A843" filter="url(#glow)" opacity="0.8" />

        {/* DRL Strip */}
        <path d="M85,212 L135,208" stroke="#D4A843" strokeWidth="2" filter="url(#glow)" strokeLinecap="round" />

        {/* Tail Lights */}
        <path d="M715,205 L670,195 L670,215 Z" fill="#B8902E" filter="url(#glow)" opacity="0.9" />
        <rect x="668" y="200" width="50" height="3" rx="1" fill="#B8902E" filter="url(#glow)" opacity="0.8" />
        <path d="M715,212 L665,208" stroke="#B8902E" strokeWidth="2" filter="url(#glow)" strokeLinecap="round" />

        {/* Front Grille */}
        <rect x="90" y="195" width="45" height="25" rx="3" fill="none" stroke="#2e2e2e" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`g${i}`} x1="95" y1={199 + i * 4} x2="130" y2={199 + i * 4} stroke="#222222" strokeWidth="1" />
        ))}

        {/* Front Wheel */}
        <circle cx="210" cy="235" r="40" fill="#111" stroke="#333" strokeWidth="2" />
        <circle cx="210" cy="235" r="32" fill="url(#rimGrad)" />
        <circle cx="210" cy="235" r="28" fill="none" stroke="#555" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`s1${i}`} x1="210" y1="235" x2={210 + 25 * Math.cos(i * 72 * Math.PI / 180)} y2={235 + 25 * Math.sin(i * 72 * Math.PI / 180)}
            stroke="#888" strokeWidth="2" />
        ))}
        <circle cx="210" cy="235" r="8" fill="#D4A843" filter="url(#glow)" opacity="0.6" />
        <circle cx="210" cy="235" r="4" fill="#333" />

        {/* Rear Wheel */}
        <circle cx="590" cy="235" r="40" fill="#111" stroke="#333" strokeWidth="2" />
        <circle cx="590" cy="235" r="32" fill="url(#rimGrad)" />
        <circle cx="590" cy="235" r="28" fill="none" stroke="#555" strokeWidth="1" />
        {[0, 1, 2, 3, 4].map(i => (
          <line key={`s2${i}`} x1="590" y1="235" x2={590 + 25 * Math.cos(i * 72 * Math.PI / 180)} y2={235 + 25 * Math.sin(i * 72 * Math.PI / 180)}
            stroke="#888" strokeWidth="2" />
        ))}
        <circle cx="590" cy="235" r="8" fill="#D4A843" filter="url(#glow)" opacity="0.6" />
        <circle cx="590" cy="235" r="4" fill="#333" />

        {/* Wheel Arches */}
        <path d="M160,230 Q170,185 210,180 Q250,185 260,230" fill="none" stroke="#2e2e2e" strokeWidth="2" />
        <path d="M540,230 Q550,185 590,180 Q630,185 640,230" fill="none" stroke="#2e2e2e" strokeWidth="2" />

        {/* Door Handle */}
        <rect x="350" y="155" width="30" height="4" rx="2" fill="#555" opacity="0.6" />

        {/* Side Mirror */}
        <path d="M265,125 L250,135 L250,145 L268,140 Z" fill="#141414" stroke="#2e2e2e" strokeWidth="1" />

        {/* Accent Line */}
        <path d="M140,175 L660,175" stroke="url(#headlightGrad)" strokeWidth="1" opacity="0.4" />

        {/* Ground Reflection Glow */}
        <ellipse cx="210" cy="280" rx="50" ry="8" fill="#D4A843" opacity="0.15" filter="url(#glowStrong)" />
        <ellipse cx="590" cy="280" rx="50" ry="8" fill="#D4A843" opacity="0.15" filter="url(#glowStrong)" />
        <ellipse cx="100" cy="280" rx="40" ry="6" fill="#F0D080" opacity="0.1" filter="url(#glowStrong)" />
        <ellipse cx="700" cy="280" rx="40" ry="6" fill="#B8902E" opacity="0.1" filter="url(#glowStrong)" />
      </svg>
    </div>
  );
}

// ─── 3D Tilt Card ────────────────────────────────────────
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(20px)`,
      transition: 'transform 0.1s ease',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
      transition: 'transform 0.5s ease',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`${className}`}
      data-hover
    >
      {children}
    </div>
  );
}

// ─── Services Data ───────────────────────────────────────
const services = [
  { icon: MapPin, title: 'Local Trips', desc: 'Premium city rides with expert local drivers who know every corner of Gujarat.', color: 'from-amber-500 to-yellow-600' },
  { icon: Navigation, title: 'Outstation Tours', desc: 'Long-distance luxury travel to any destination across India with comfort.', color: 'from-yellow-600 to-amber-700' },
  { icon: Users, title: 'Family Tours', desc: 'Spacious vehicles & curated family packages for unforgettable memories.', color: 'from-amber-600 to-yellow-500' },
  { icon: Heart, title: 'Wedding & Functions', desc: 'Decorated luxury fleet for your special occasions with red carpet service.', color: 'from-yellow-500 to-amber-500' },
  { icon: Car, title: 'Self Drive', desc: 'Choose your dream car and hit the road on your own terms, fully insured.', color: 'from-amber-400 to-yellow-600' },
  { icon: Shield, title: 'Safe & Secure', desc: 'All vehicles GPS tracked in real-time. Your safety is our top priority.', color: 'from-yellow-600 to-amber-600' },
];

// ─── Fleet Data ──────────────────────────────────────────
const fleet = [
  { name: 'Toyota Innova Crysta', type: 'Premium MPV', seats: 7, fuel: 'Diesel', image: '🚐', power: '150 HP', trans: 'Automatic', price: '₹18/km', features: ['AC', 'GPS', 'Music System'] },
  { name: 'Toyota Fortuner', type: 'Luxury SUV', seats: 7, fuel: 'Diesel', image: '🚙', power: '204 HP', trans: 'Automatic', price: '₹25/km', features: ['4WD', 'Leather', 'Sunroof'] },
  { name: 'Mercedes E-Class', type: 'Executive Sedan', seats: 4, fuel: 'Petrol', image: '🏎️', power: '258 HP', trans: 'Automatic', price: '₹45/km', features: ['Premium', 'Chauffeur', 'WiFi'] },
  { name: 'BMW 5 Series', type: 'Business Sedan', seats: 4, fuel: 'Petrol', image: '🚗', power: '252 HP', trans: 'Automatic', price: '₹42/km', features: ['Luxury', 'AC Seats', 'iDrive'] },
  { name: 'Kia Carnival', type: 'Premium Van', seats: 9, fuel: 'Diesel', image: '🚌', power: '200 HP', trans: 'Automatic', price: '₹22/km', features: ['Spacious', 'VIP Seats', 'AC'] },
  { name: 'Audi A6', type: 'Prestige Sedan', seats: 4, fuel: 'Petrol', image: '✨', power: '245 HP', trans: 'Automatic', price: '₹48/km', features: ['Quattro', 'Bang & Olufsen', 'LED'] },
];

// ─── Gallery Data ────────────────────────────────────────
const gallery = [
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

// ─── Testimonials Data ───────────────────────────────────
const testimonials = [
  { name: 'Rajesh Patel', role: 'Business Executive', text: 'Absolutely premium service! The Mercedes they provided for my Ahmedabad-Mumbai trip was spotless. The driver was professional and courteous. Will definitely book again.', rating: 5 },
  { name: 'Priya Sharma', role: 'Wedding Planner', text: 'We booked 15 luxury cars for a destination wedding in Udaipur. Mahadev Krupa managed everything flawlessly. The decorated cars were a highlight of the baraat!', rating: 5 },
  { name: 'Amit Desai', role: 'Family Traveler', text: 'Our family trip to Gir and Somnath was made memorable thanks to the comfortable Innova Crysta. GPS tracking gave us peace of mind throughout the journey.', rating: 5 },
  { name: 'Neha Joshi', role: 'Corporate Manager', text: 'We use Mahadev Krupa for all our corporate travel needs. Their fleet is always well-maintained and the booking process is seamless. Highly recommended!', rating: 4 },
  { name: 'Vikram Singh', role: 'Tourist', text: 'Self-drive option was fantastic! Picked up a Fortuner for our Kutch adventure. Clean car, fair pricing, and the GPS tracking feature was very reassuring.', rating: 5 },
];

// ─── Navbar ──────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Services', 'Fleet', 'About', 'Gallery', 'Testimonials', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg shadow-amber-900/20' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-3" data-hover>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center animate-gradient-shift">
              <span className="text-white font-bold text-lg font-display">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold gradient-text font-heading tracking-wide">MAHADEV KRUPA</h1>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">Tours & Travels</p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-gray-300 hover:text-amber-400 transition-colors duration-300 font-medium tracking-wide relative group"
                data-hover
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 animate-gradient-shift"
              data-hover
            >
              Book Now
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2" data-hover>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                  className="block text-gray-300 hover:text-amber-400 transition-colors py-2 font-medium" data-hover>
                  {link}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}
                className="block text-center px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold" data-hover>
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero Section ────────────────────────────────────────
function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/3 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10">
        <div className="w-full h-full rounded-full border border-amber-500/30 animate-spin-slow" />
        <div className="absolute inset-8 rounded-full border border-yellow-400/20 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <div className="absolute inset-16 rounded-full border border-amber-300/20 animate-spin-slow" style={{ animationDuration: '25s' }} />
      </div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div style={{ y: y2 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-gray-300">Gujarat&apos;s Premier Travel Partner</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-display"
            >
              <span className="text-white">Journey in</span>
              <br />
              <span className="gradient-text">Vibrant Luxury</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-400 mb-8 max-w-lg font-heading"
            >
              The Name of Trusted Travel — Experience Gujarat and beyond in unmatched comfort and style.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-500 animate-gradient-shift flex items-center gap-2"
                data-hover
              >
                Book Your Ride
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a
                href="#fleet"
                className="px-8 py-4 rounded-full neon-border text-white font-semibold text-lg hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-500"
                data-hover
              >
                Explore Fleet
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center gap-8 mt-12"
            >
              {[
                { num: '500+', label: 'Happy Clients' },
                { num: '50+', label: 'Luxury Cars' },
                { num: '10+', label: 'Years Trust' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold gradient-text font-heading">{stat.num}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Car */}
          <motion.div style={{ y: y1 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
              <LuxuryCarSVG />
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500 tracking-widest uppercase">Premium Fleet at Your Service</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-xs text-gray-500 tracking-widest uppercase">Scroll Down</p>
        <div className="w-6 h-10 rounded-full border-2 border-amber-400/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 rounded-full bg-gradient-to-b from-amber-400 to-yellow-500"
          />
        </div>
      </motion.div>
    </section>
  );
}

// ─── Services Section ────────────────────────────────────
function ServicesSection() {
  return (
    <Section id="services" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span className="inline-block text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 font-heading">
            What We Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-white">Our Premium </span>
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From local rides to grand weddings, we deliver luxury on wheels with uncompromising quality.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard className="h-full">
                <div className="group relative h-full p-8 rounded-2xl glass hover:border-amber-500/30 transition-all duration-500 overflow-hidden">
                  {/* Background glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${s.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <s.icon className="text-white" size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 font-heading">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Fleet Section ───────────────────────────────────────
function FleetSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = dir === 'left' ? -400 : 400;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <Section id="fleet" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Our Fleet</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display">
              <span className="text-white">Luxury </span>
              <span className="gradient-text">Vehicle Fleet</span>
            </h2>
          </div>
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${canScrollLeft ? 'hover:bg-amber-500/20 text-white' : 'text-gray-600'}`}
              data-hover
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full glass flex items-center justify-center transition-all duration-300 ${canScrollRight ? 'hover:bg-amber-500/20 text-white' : 'text-gray-600'}`}
              data-hover
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Fleet */}
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-4">
        <div className="shrink-0 w-4 lg:w-[calc((100vw-1280px)/2+1rem)]" />
        {fleet.map((car, i) => (
          <motion.div
            key={car.name}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="shrink-0 w-[340px] sm:w-[380px]"
          >
            <TiltCard className="h-full">
              <div className="group relative h-full rounded-2xl glass overflow-hidden hover:border-amber-400/30 transition-all duration-500">
                {/* Car Image Area */}
                <div className="relative h-48 bg-gradient-to-br from-dark-surface to-dark-card flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 group-hover:from-amber-500/10 group-hover:to-yellow-500/10 transition-all duration-500" />
                  <span className="text-8xl group-hover:scale-110 transition-transform duration-500">{car.image}</span>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs text-amber-400 font-semibold">
                    {car.type}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 font-heading">{car.name}</h3>
                  <p className="text-2xl font-bold gradient-text mb-4">{car.price}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users size={14} className="text-amber-400" /> {car.seats} Seats
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Fuel size={14} className="text-amber-300" /> {car.fuel}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Gauge size={14} className="text-yellow-400" /> {car.power}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Settings size={14} className="text-amber-500" /> {car.trans}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {car.features.map(f => (
                      <span key={f} className="px-3 py-1 rounded-full bg-dark-surface text-xs text-gray-300 border border-dark-border">
                        {f}
                      </span>
                    ))}
                  </div>

                  <a href="#contact"
                    className="w-full block text-center py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-400/20 text-amber-400 font-semibold text-sm hover:from-amber-500/20 hover:to-yellow-500/20 transition-all duration-300"
                    data-hover
                  >
                    Book This Vehicle
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
        <div className="shrink-0 w-4" />
      </div>
    </Section>
  );
}

// ─── About Section ───────────────────────────────────────
function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <div ref={ref} className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Decorative circles */}
              <div className="absolute -top-8 -left-8 w-64 h-64 rounded-full border border-amber-400/10 animate-spin-slow" />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border border-yellow-400/10 animate-spin-slow" style={{ animationDirection: 'reverse' }} />

              <div className="relative rounded-2xl glass p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { num: '10+', label: 'Years of Excellence', icon: Calendar },
                      { num: '50+', label: 'Premium Vehicles', icon: Car },
                      { num: '500+', label: 'Satisfied Clients', icon: Users },
                      { num: '24/7', label: 'Service Available', icon: Clock },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="p-4 rounded-xl bg-dark-surface/50 border border-dark-border text-center group hover:border-amber-400/30 transition-all duration-300"
                      >
                        <item.icon className="mx-auto mb-2 text-amber-400 group-hover:text-yellow-300 transition-colors" size={20} />
                        <p className="text-2xl font-bold gradient-text font-heading">{item.num}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-6" />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shrink-0">
                      <Shield className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">100% GPS Tracked Fleet</p>
                      <p className="text-gray-500 text-xs">Real-time tracking for every journey</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Our Legacy</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              <span className="text-white">A Decade of </span>
              <span className="gradient-text">Trusted Travel</span>
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                <strong className="text-white">Mahadev Krupa Tours & Travels</strong> has been Gujarat&apos;s most trusted name in luxury ground transportation for over a decade. Founded with a vision to redefine travel comfort, we have grown from a small fleet to a premier travel agency serving thousands of satisfied clients.
              </p>
              <p>
                Our commitment goes beyond just providing vehicles. We deliver <span className="text-amber-400">experiences</span> — from the moment you book to the moment you reach your destination. Every vehicle in our fleet is meticulously maintained, every driver professionally trained, and every journey GPS-tracked for your complete peace of mind.
              </p>
              <p>
                Whether it&apos;s a corporate event, a dream wedding, a family vacation, or a simple airport transfer, we bring the same level of <span className="text-yellow-400">dedication and luxury</span> to every ride.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300" data-hover>
                Start Your Journey
              </a>
              <a href="#fleet" className="px-6 py-3 rounded-full neon-border text-white font-semibold hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300" data-hover>
                View Our Fleet
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Gallery Section ─────────────────────────────────────
function GallerySection() {
  return (
    <Section id="gallery" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Destinations</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-white">Explore </span>
            <span className="gradient-text">Our Gallery</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From the white deserts of Kutch to the sacred shores of Dwarka — discover Gujarat&apos;s most breathtaking destinations.
          </p>
        </div>

        <div className="masonry-grid">
          {gallery.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="masonry-item"
            >
              <div className={`group relative ${item.h} rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-dark-border hover:border-amber-400/30 transition-all duration-500`} data-hover>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-transparent to-transparent" />
                {/* Animated pattern overlay */}
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                  <div className="text-6xl">
                    {i % 3 === 0 ? '🏔️' : i % 3 === 1 ? '🛕' : '🏖️'}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg font-heading">{item.title}</h3>
                  <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore this destination →</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight size={14} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Testimonials Section ────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="testimonials" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-white">What Our </span>
            <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl glass p-8 md:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-4 left-4 text-6xl text-amber-400/10 font-display">&ldquo;</div>
              <div className="absolute bottom-4 right-4 text-6xl text-amber-400/10 font-display">&rdquo;</div>

              <div className="flex justify-center mb-6 gap-1">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} size={20} fill="#f59e0b" className="text-amber-500" />
                ))}
                {Array.from({ length: 5 - testimonials[active].rating }).map((_, i) => (
                  <Star key={`e${i}`} size={20} className="text-gray-600" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto italic">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white font-display">
                {testimonials[active].name.charAt(0)}
              </div>
              <p className="text-white font-bold text-lg font-heading">{testimonials[active].name}</p>
              <p className="text-gray-500 text-sm">{testimonials[active].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-gradient-to-r from-amber-400 to-yellow-500' : 'w-2 bg-gray-600 hover:bg-gray-400'
                }`}
              data-hover
            />
          ))}
        </div>

        {/* Small Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-12 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-6 rounded-xl glass hover:border-amber-400/30 transition-all duration-300 ${i === active ? 'border-amber-400/30' : ''}`}
              data-hover
              onClick={() => setActive(i)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/30 to-yellow-500/30 flex items-center justify-center text-sm font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm line-clamp-3">&ldquo;{t.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact Form Section ────────────────────────────────
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', pickup: '', drop: '', date: '', vehicle: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', phone: '', email: '', pickup: '', drop: '', date: '', vehicle: '', message: '' });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-dark-surface/50 border border-dark-border text-white placeholder-gray-500 focus:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400/20 transition-all duration-300 text-sm";

  return (
    <Section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Info */}
          <div>
            <span className="text-sm font-semibold text-amber-400 tracking-widest uppercase mb-4 block font-heading">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              <span className="text-white">Book Your </span>
              <span className="gradient-text">Dream Ride</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Fill in the form and our team will get back to you within 30 minutes with a personalized quote. Or reach us directly through the contact details below.
            </p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: 'Available 24/7' },
                { icon: Mail, label: 'Email Us', value: 'info@mahadevkrupa.com', sub: 'Quick response guaranteed' },
                { icon: MapPin, label: 'Office', value: 'Ahmedabad, Gujarat, India', sub: 'Visit us anytime' },
                { icon: Clock, label: 'Working Hours', value: '24 Hours / 7 Days', sub: 'Always at your service' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl glass flex items-center justify-center shrink-0 group-hover:border-amber-400/30 transition-all duration-300">
                    <item.icon size={20} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl glass p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-full blur-2xl" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 relative"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">Inquiry Sent!</h3>
                    <p className="text-gray-400">Our team will contact you within 30 minutes.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="relative space-y-4"
                  >
                    <h3 className="text-xl font-bold text-white mb-6 font-heading">Quick Inquiry Form</h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Your Name *" required value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
                      <input type="tel" placeholder="Phone Number *" required value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
                    </div>

                    <input type="email" placeholder="Email Address" value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputClass} />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" placeholder="Pickup Location *" required value={formData.pickup}
                        onChange={e => setFormData({ ...formData, pickup: e.target.value })} className={inputClass} />
                      <input type="text" placeholder="Drop Location *" required value={formData.drop}
                        onChange={e => setFormData({ ...formData, drop: e.target.value })} className={inputClass} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="date" required value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })} className={inputClass} />
                      <select value={formData.vehicle}
                        onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                        className={inputClass}
                      >
                        <option value="">Select Vehicle</option>
                        {fleet.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>

                    <textarea placeholder="Special Requests or Message..." rows={3} value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                    />

                    <button type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-500 animate-gradient-shift flex items-center justify-center gap-2"
                      data-hover
                    >
                      <Send size={18} />
                      Send Inquiry
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      We respect your privacy. No spam, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── Floating Action Buttons ─────────────────────────────
function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-amber-500/20 transition-all duration-300 group"
            data-hover
          >
            <ArrowUp size={18} className="text-amber-400 group-hover:text-white transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="tel:+919876543210"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300"
        data-hover
      >
        <Phone size={22} className="text-white" />
      </motion.a>

      <motion.a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-yellow-700 flex items-center justify-center shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/40 transition-all duration-300"
        data-hover
      >
        <MessageCircle size={22} className="text-white" />
      </motion.a>
    </div>
  );
}

// ─── Footer ──────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* 33% depth gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg to-dark-card" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-amber-900/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600 flex items-center justify-center animate-gradient-shift">
                <span className="text-white font-bold text-xl font-display">M</span>
              </div>
              <div>
                <h3 className="font-bold gradient-text font-heading">MAHADEV KRUPA</h3>
                <p className="text-xs text-gray-500 tracking-widest uppercase">Tours & Travels</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Gujarat&apos;s premier luxury travel agency. Experience the finest in ground transportation with our fleet of premium vehicles and professional service.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, color: 'hover:bg-amber-500/20 hover:text-amber-400' },
                { icon: Instagram, color: 'hover:bg-amber-500/20 hover:text-amber-400' },
                { icon: Twitter, color: 'hover:bg-amber-500/20 hover:text-amber-400' },
                { icon: Youtube, color: 'hover:bg-amber-500/20 hover:text-amber-400' },
              ].map((s, i) => (
                <a key={i} href="#" className={`w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 ${s.color} transition-all duration-300`} data-hover>
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Quick Links</h4>
            <ul className="space-y-3">
              {['Services', 'Fleet', 'About Us', 'Gallery', 'Testimonials', 'Contact'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group" data-hover>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link}
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
                  <a href="#services" className="text-gray-400 hover:text-amber-400 transition-colors text-sm flex items-center gap-2 group" data-hover>
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
                <span className="text-gray-400 text-sm">123 Travel Plaza, CG Road,<br />Ahmedabad, Gujarat 380009</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span className="text-gray-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span className="text-gray-400 text-sm">info@mahadevkrupa.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-amber-400 shrink-0" />
                <span className="text-gray-400 text-sm">24/7 Service Available</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mahadev Krupa Tours & Travels. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors" data-hover>Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors" data-hover>Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors" data-hover>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ────────────────────────────────────────────
export function App() {
  return (
    <div className="relative min-h-screen bg-dark-bg text-white noise-overlay">
      <CustomCursor />
      <ParticleField />
      <Navbar />
      <HeroSection />

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      <ServicesSection />

      <div className="max-w-7xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      </div>

      <FleetSection />

      <div className="max-w-7xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      <AboutSection />

      <div className="max-w-7xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      <GallerySection />

      <div className="max-w-7xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
      </div>

      <TestimonialsSection />

      <div className="max-w-7xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
