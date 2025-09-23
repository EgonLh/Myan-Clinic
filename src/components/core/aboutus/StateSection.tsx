"use client"

import { useScrollAnimation } from "@/components/use-scroll-animation"

const stats = [
  { number: "1000+", label: "Appointments Booked", delay: "delay-300" },
  { number: "500+", label: "Patients Served", delay: "delay-500" },
  { number: "3+", label: "Years in Operation", delay: "delay-700" },
  { number: "99%", label: "Patient Satisfaction", delay: "delay-900" },
]

export default function StatsSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className={`py-16 px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center space-y-2 group hover:scale-110 transition-all duration-500 ${stat.delay} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <div className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
