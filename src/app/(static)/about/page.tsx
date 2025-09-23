import CTASection from "@/components/core/aboutus/CTASection";
import HeroSection from "@/components/core/aboutus/HeroSection";
import StatsSection from "@/components/core/aboutus/StateSection";
import StorySection from "@/components/core/aboutus/StorySection";
import ValuesSection from "@/components/core/aboutus/ValueSection";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <StatsSection />
      <CTASection />
    </div>
  )
}
