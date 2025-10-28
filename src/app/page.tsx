import { Leaf } from "@/components/leaf";
import { Hero } from "@/features/home/components/HeroSection";

import { VisualTextSection } from "@/features/home/components/VisualTextSection";
import { Footer } from "@/features/home/components/Footer";
import { ServiceOverview } from "@/features/home/components/ServiceOverview";

export default function Home() {
  return (
    <>
      <Leaf />
      <img
        src="/skye.jpg"
        alt="noise"
        className="w-full h-full fixed top-0 left-0 z-[-1] opacity-90 md:hidden"
      />

      <img
        src="/skyemd.jpg"
        alt="noise"
        className="w-full h-full fixed top-0 left-0 z-[-1] opacity-90 hidden md:block"
      />

      <Hero />
      <ServiceOverview />
      <VisualTextSection />
      <Footer />
    </>
  );
}
