import FlavorShowcase from "@/components/FlavorShowcase";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import LocationSection from "@/components/LocationSection";
import Navbar from "@/components/Navbar";
import SectionScroller from "@/components/SectionScroller";
import ScrollRevealText from "@/components/ScrollRevealText";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-cream">
      <SectionScroller />
      <Navbar phase="settled" isFirstVisit={false} />
      <HeroSection />
      <ScrollRevealText />
      <FlavorShowcase />
      <LocationSection />
      <Footer />
    </main>
  );
}
