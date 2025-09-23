"use client"

import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/components/use-scroll-animation"

export default function CTASection() {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      ref={ctaRef}
      className={`py-16 px-4 transition-all duration-1000 ${
        ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Ready to Improve Your Health?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Schedule your appointment today or consult online with our expert doctors. Your health is our priority.
          </p>
          <Button size="lg" className="hover:scale-105 transition-transform duration-300 " onClick={() => window.location.href = "/login"}>
            Book an Appointment
          </Button>
        </div>
      </div>
    </section>
  )
}
