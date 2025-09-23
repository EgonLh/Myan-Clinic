
import { AboutSection } from "@/components/core/AboutSection";
import { FAQ } from "@/components/core/FAQSection";
import { Footer } from "@/components/core/Footer";
import HeroSection from "@/components/core/HeroSection";
import { NavigationBar } from "@/components/core/Navigation";
import { ServiceSection  } from "@/components/core/ServiceSection";

export default function Home() {
  return (
    <>
       <HeroSection/>
       <ServiceSection/>
       <AboutSection/>
       <FAQ/>
    </>
  );
}
