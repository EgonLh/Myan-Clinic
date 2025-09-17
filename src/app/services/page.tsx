"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useScrollAnimation } from "../components/hooks/use-scroll-animation"

export default function ServicesPage() {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.2 })
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.2 })
  const { elementRef: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.2 })

  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: ["Responsive Design", "Performance Optimization", "SEO Ready", "Modern Frameworks"],
      icon: "💻",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that enhance user experience",
      features: ["User Research", "Wireframing", "Visual Design", "Prototyping"],
      icon: "🎨",
    },
    {
      title: "Tech Consulting",
      description: "Strategic guidance to help your business leverage technology",
      features: ["Technology Audit", "Strategic Planning", "Team Training", "Architecture Review"],
      icon: "🚀",
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      features: ["iOS Development", "Android Development", "React Native", "App Store Optimization"],
      icon: "📱",
    },
    {
      title: "E-commerce Solutions",
      description: "Complete online store solutions with payment integration",
      features: ["Custom Shopping Cart", "Payment Gateway", "Inventory Management", "Analytics Dashboard"],
      icon: "🛒",
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies and implementation",
      features: ["SEO Optimization", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
      icon: "📈",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`py-20 px-4 transition-all duration-1000 ${
          heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-16 relative backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500">
            <div className="text-center space-y-8">
              <div
                className={`space-y-4 transition-all duration-1000 delay-200 ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">Our Services</h1>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto"></div>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Comprehensive digital solutions to help your business thrive in the modern world
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section
        ref={servicesRef}
        className={`py-16 px-4 transition-all duration-1000 ${
          servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-200 ${
              servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">What We Offer</h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`transition-all duration-1000 delay-${300 + index * 100} ${
                  servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Card className="border-2 border-dotted border-muted-foreground/30 p-8 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-500 h-full group">
                  {/* Icon */}
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 text-center">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground mb-4 text-center group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-px bg-muted-foreground/40 mx-auto mb-4"></div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed text-center text-sm">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={feature}
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-all duration-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary/60 mr-3 group-hover:bg-primary transition-colors duration-300"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={ctaRef}
        className={`py-16 px-4 transition-all duration-1000 ${
          ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how we can help bring your vision to life with our comprehensive services and expertise.
            </p>
            <Button size="lg" className="hover:scale-105 transition-transform duration-300">
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
