import CTASection from "@/components/core/services/CTAsection";
import ServicesGrid from "@/components/core/services/ServicesGrid";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-16 relative backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Our Services</h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto mb-4"></div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare services designed to make medical care accessible and convenient for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* Call to Action */}
      <CTASection />
    </div>
  )
}
