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

// Animated glow divider between sections
function GlowDivider() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="section-glow-divider" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-dark-bg text-white" style={{ overflowX: 'clip' }}>
      <ParticleField />
      <Navbar />
      <HeroSection />
      <GlowDivider />
      <ServicesSection />
      <GlowDivider />
      <FleetSection />
      <GlowDivider />
      <AboutSection />
      <GlowDivider />
      <GallerySection />
      <GlowDivider />
      <TestimonialsSection />
      <GlowDivider />
      <ContactSection />
      <Footer />
      <FloatingButtons />
      <QuickBookingPanel />
    </div>
  );
}
