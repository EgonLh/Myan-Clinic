"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useScrollAnimation } from "../components/hooks/use-scroll-animation"

export default function AboutPage() {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.2 })
  const { elementRef: storyRef, isVisible: storyVisible } = useScrollAnimation({ threshold: 0.2 })
  const { elementRef: valuesRef, isVisible: valuesVisible } = useScrollAnimation({ threshold: 0.2 })
  const { elementRef: teamRef, isVisible: teamVisible } = useScrollAnimation({ threshold: 0.2 })
  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.2 })

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
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">About Us</h1>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto"></div>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Crafting digital experiences that inspire, engage, and transform businesses through innovative design
                  and technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section
        ref={storyRef}
        className={`py-16 px-4 transition-all duration-1000 ${
          storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                storyVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="border-2 border-dotted border-muted-foreground/30 rounded-xl p-8 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500">
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded with a vision to bridge the gap between creativity and technology, we've been at the
                    forefront of digital innovation for over five years.
                  </p>
                  <p>
                    What started as a small team of passionate designers and developers has grown into a full-service
                    digital agency, helping businesses of all sizes achieve their online goals.
                  </p>
                  <p>
                    Our journey is defined by continuous learning, pushing boundaries, and delivering exceptional
                    results that exceed expectations.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`transition-all duration-1000 delay-500 ${
                storyVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <div className="border-2 border-dotted border-muted-foreground/30 rounded-xl p-8 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-foreground">2019</div>
                  <div className="text-muted-foreground">Year Founded</div>
                  <div className="w-16 h-px bg-muted-foreground/40 mx-auto"></div>
                  <div className="text-sm text-muted-foreground">The beginning of our journey</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className={`py-16 px-4 transition-all duration-1000 ${
          valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-200 ${
              valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Our Values</h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Constantly exploring new technologies and creative solutions to stay ahead of the curve.",
                delay: "delay-300",
              },
              {
                title: "Quality",
                description:
                  "Delivering exceptional work that meets the highest standards of design and functionality.",
                delay: "delay-500",
              },
              {
                title: "Collaboration",
                description: "Working closely with our clients to understand their vision and bring it to life.",
                delay: "delay-700",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${value.delay} ${
                  valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Card className="border-2 border-dotted border-muted-foreground/30 p-8 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-500 h-full">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                    <div className="w-12 h-px bg-muted-foreground/40 mx-auto"></div>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={teamRef}
        className={`py-16 px-4 transition-all duration-1000 ${
          teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center mb-12 transition-all duration-1000 delay-200 ${
              teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Meet Our Team</h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Johnson", role: "Creative Director", delay: "delay-300" },
              { name: "Sarah Chen", role: "Lead Developer", delay: "delay-500" },
              { name: "Mike Rodriguez", role: "UX Designer", delay: "delay-700" },
              { name: "Emma Wilson", role: "Project Manager", delay: "delay-900" },
            ].map((member, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 ${member.delay} ${
                  teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <Card className="border-2 border-dotted border-muted-foreground/30 p-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-500 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/40 mx-auto mb-4 flex items-center justify-center">
                    <div className="text-2xl font-bold text-foreground">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className={`py-16 px-4 transition-all duration-1000 ${
          statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "150+", label: "Projects Completed", delay: "delay-300" },
                { number: "50+", label: "Happy Clients", delay: "delay-500" },
                { number: "5+", label: "Years Experience", delay: "delay-700" },
                { number: "100%", label: "Client Satisfaction", delay: "delay-900" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`text-center space-y-2 group hover:scale-110 transition-all duration-500 ${stat.delay} ${
                    statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Ready to Work Together?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch and let's discuss how we can help bring your vision
              to life.
            </p>
            <Button size="lg" className="hover:scale-105 transition-transform duration-300">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
