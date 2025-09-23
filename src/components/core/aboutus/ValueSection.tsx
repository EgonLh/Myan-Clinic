"use client"

import { Card } from "@/components/ui/card"
import { useScrollAnimation } from "@/components/use-scroll-animation"

const values = [
  { title: "Innovation", description: "Leveraging technology to improve healthcare access and efficiency.", delay: "delay-300" },
  { title: "Security", description: "Protecting patient data with robust encryption and role-based access.", delay: "delay-500" },
  { title: "Care", description: "Ensuring patient-centric solutions and quality healthcare experiences.", delay: "delay-700" },
]

export default function ValuesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className={`py-16 px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Our Values</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className={`transition-all duration-1000 ${value.delay} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
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
  )
}
