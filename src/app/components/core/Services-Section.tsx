"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useScrollAnimation } from "../hooks/use-scroll-animation"

const services = {
  webdev: {
    title: "Web Development",
    description: "Modern, responsive websites built with cutting-edge technologies",
    features: [
      {
        title: "Responsive Design",
        description: "Mobile-first approach ensuring perfect display on all devices",
        icon: "📱",
      },
      {
        title: "Performance Optimization",
        description: "Lightning-fast loading times and smooth user experiences",
        icon: "⚡",
      },
      {
        title: "SEO Ready",
        description: "Built-in search engine optimization for better visibility",
        icon: "🔍",
      },
      {
        title: "Modern Frameworks",
        description: "React, Next.js, and other cutting-edge technologies",
        icon: "⚛️",
      },
    ],
  },
  design: {
    title: "UI/UX Design",
    description: "Beautiful, intuitive designs that convert visitors into customers",
    features: [
      {
        title: "User Research",
        description: "Deep understanding of your target audience and their needs",
        icon: "👥",
      },
      {
        title: "Wireframing",
        description: "Strategic layout planning for optimal user flow",
        icon: "📐",
      },
      {
        title: "Visual Design",
        description: "Stunning interfaces that reflect your brand identity",
        icon: "🎨",
      },
      {
        title: "Prototyping",
        description: "Interactive mockups to test and refine user experience",
        icon: "🔧",
      },
    ],
  },
  consulting: {
    title: "Tech Consulting",
    description: "Strategic guidance to help your business leverage technology effectively",
    features: [
      {
        title: "Technology Audit",
        description: "Comprehensive review of your current tech stack and processes",
        icon: "🔍",
      },
      {
        title: "Strategic Planning",
        description: "Roadmap development for digital transformation initiatives",
        icon: "📊",
      },
      {
        title: "Team Training",
        description: "Upskill your team with modern development practices",
        icon: "🎓",
      },
      {
        title: "Architecture Review",
        description: "Optimize your system architecture for scalability and performance",
        icon: "🏗️",
      },
    ],
  },
}

export function ServicesSection() {
  const [activeService, setActiveService] = useState<keyof typeof services>("webdev")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  const handleServiceChange = (service: keyof typeof services) => {
    if (service === activeService) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveService(service)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <section
      ref={elementRef}
      className={`py-24 px-4 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of services designed to elevate your digital presence
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-col items-center gap-4 mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* First row - 2 buttons */}
          <div className="flex gap-4">
            <Button
              variant={activeService === "webdev" ? "default" : "outline"}
              size="lg"
              onClick={() => handleServiceChange("webdev")}
              className="px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-sm transform"
            >
              Web Development
            </Button>
            <Button
              variant={activeService === "design" ? "default" : "outline"}
              size="lg"
              onClick={() => handleServiceChange("design")}
              className="px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-sm transform"
            >
              UI/UX Design
            </Button>
          </div>

          {/* Second row - 1 button centered */}
          <div>
            <Button
              variant={activeService === "consulting" ? "default" : "outline"}
              size="lg"
              onClick={() => handleServiceChange("consulting")}
              className="px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-sm transform"
            >
              Tech Consulting
            </Button>
          </div>
        </div>

        {/* Service Content */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">{services[activeService].title}</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{services[activeService].description}</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services[activeService].features.map((feature, index) => (
              <Card
                key={`${activeService}-${index}`}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800 hover:scale-[1.02] transform animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce">
                      {feature.icon}
                    </span>
                    <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
