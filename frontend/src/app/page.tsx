import HeroBanner from "@/components/sections/hero-banner";
import AboutSection from "@/components/sections/about-section";
import StarsSection from "@/components/sections/stars-section";
import Footer from "@/components/layout/footer";
import NewArrivalSection from "@/components/sections/new-arrival-section";
import SpaceVertical from "@/components/ui/space-vertical";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-col gap-8 pt-10">
        <HeroBanner />
        <NewArrivalSection />
        <AboutSection />
        <StarsSection />
      </main>
    </div>
  );
}
