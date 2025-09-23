import CTASection from "@/components/core/services/CTAsection";
import ServicesGrid from "@/components/core/services/ServicesGrid";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-16 overflow-hidden backdrop-blur-sm bg-white/20 hover:bg-white/30 transition-all duration-500 text-center">

            {/* Multi-color gradient blobs behind the card */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-400/30 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute top-10 right-1/4 w-64 h-64 bg-green-400/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-1000"></div>

            {/* Optional subtle noise overlay */}
            <div className="absolute inset-0 -z-10 bg-white/5 [background-image:repeating-radial-gradient(rgba(0,0,0,0.02) 0 1px,transparent 1px 100%)] pointer-events-none"></div>

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
