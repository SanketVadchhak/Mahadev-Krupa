'use client';

import ParticleField from './ui/ParticleField';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import FleetSection from './sections/FleetSection';
import AboutSection from './sections/AboutSection';
import GallerySection from './sections/GallerySection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import FloatingButtons from './FloatingButtons';
import QuickBookingPanel from './QuickBookingPanel';

// Thin gradient section divider
function Divider({ color = 'amber-500/20' }) {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className={`h-px bg-gradient-to-r from-transparent via-${color} to-transparent`} />
    </div>
  );
}

export default function HomePage() {
  return (
    /* pb-24 gives clearance so the fixed QuickBookingPanel doesn't overlap footer content */
    <div className="relative min-h-screen bg-dark-bg text-white pb-24" style={{ overflowX: 'clip' }}>
      <ParticleField />
      <Navbar />
      <HeroSection />
      <Divider color="amber-500/20" />
      <ServicesSection />
      <Divider color="yellow-400/20" />
      <FleetSection />
      <Divider color="amber-400/20" />
      <AboutSection />
      <Divider color="amber-500/20" />
      <GallerySection />
      <Divider color="yellow-400/20" />
      <TestimonialsSection />
      <Divider color="amber-400/20" />
      <ContactSection />
      <Footer />
      <FloatingButtons />
      <QuickBookingPanel />
    </div>
  );
}
