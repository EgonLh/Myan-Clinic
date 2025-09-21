
import { HeroSection } from "./components/core/Hero-Section";
import { ServicesSection } from "./components/core/Services-Section";
import { AboutSection } from "./components/core/Aboutus";
import { FAQSection } from "./components/core/FAQSection";
import NavigationBar from "./components/core/NavBar";
import { Footer } from "./components/core/Footer";

export default function Home() {
  return (
    <div>
      <NavigationBar/>
      <HeroSection/>
      <ServicesSection/>
      <AboutSection/>
      <FAQSection/>
      <Footer/>
    </div>
  );
}
