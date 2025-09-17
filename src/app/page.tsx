
import { HeroSection } from "./components/core/Hero-Section";
import { ServicesSection } from "./components/core/Services-Section";
import { AboutSection } from "./components/core/Aboutus";
import { FAQSection } from "./components/core/FAQSection";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <ServicesSection/>
      <AboutSection/>
      <FAQSection/>
    </div>
  );
}
