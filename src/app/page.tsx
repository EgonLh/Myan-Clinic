


import { AboutUs } from "@/components/core/AboutSection";
import { FAQ } from "@/components/core/FAQ";
import { Footer } from "@/components/core/Footer";
import HeroSection from "@/components/core/HeroSection";
import { NavigationBar } from "@/components/core/NavigationBar";
import { Services } from "@/components/core/ServicesSection";

export default function Home() {
  return (
    <div>
      <NavigationBar/>
       <HeroSection/>
       <Services/>
       <AboutUs/>
      {/*
      
      
       */}
       <FAQ/>       <Footer/>
    </div>
  );
}
