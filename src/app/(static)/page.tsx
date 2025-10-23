// ----- Home Page ----- //
// - Review [x]
import { AboutSection } from "@/components/core/AboutSection";
import { FAQ } from "@/components/core/FAQSection";
import HeroSection from "@/components/core/HeroSection";
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
