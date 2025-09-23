"use client"

import { useScrollAnimation } from "@/components/use-scroll-animation"

export default function HeroSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className={`py-20 px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-16 relative backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500">
          <div className="text-center space-y-8">
            <div className={`space-y-4 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">About Myan Clinic</h1>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto"></div>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Myan Clinic is an innovative healthcare provider in Myanmar, offering seamless online appointments and secure medical record management to enhance patient care and accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
