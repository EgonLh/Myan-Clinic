"use client"

import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      ref={elementRef}
      className={`relative min-h-[50vh]  flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute inset-4 bg-gradient-to-br from-purple-500/20 via-pink-500/20 via-red-500/20 to-yellow-500/20 rounded-3xl backdrop-blur-sm border border-white/10" />

      {/* Content */}
      <div
        className={`relative z-10 text-center max-w-4xl mx-auto px-8 py-12 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="space-y-6">
          <h1 className="text-2xl md:text-7xl lg:text-8xl p-12 font-bold text-foreground leading-tight tracking-tight">
            <span className="block text-balance">Create Amazing</span>
            <span className="block text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-card-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            Build stunning, responsive web applications with modern design principles and interactive elements that
            captivate your users.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rounded-full rounded-2xl"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 bg-transparent hover:rounded-full rounded-2xl"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full opacity-60 animate-pulse" />
      <div
        className="absolute top-40 right-32 w-1 h-1 bg-primary rounded-full opacity-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-accent rounded-full opacity-50 animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-20 right-20 w-1 h-1 bg-primary rounded-full opacity-30 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      />
    </section>
  )
}
