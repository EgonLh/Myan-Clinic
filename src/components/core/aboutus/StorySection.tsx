"use client"

import { Card } from "@/components/ui/card"
import { useScrollAnimation } from "@/components/use-scroll-animation"

export default function StorySection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} className={`py-16 px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="border-2 border-dotted border-muted-foreground/30 rounded-xl p-8 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Founded in 2020, Myan Clinic has transformed traditional healthcare in Myanmar by adopting digital solutions to streamline appointments, reduce paperwork, and secure patient records.</p>
                <p>From a small team of healthcare and IT professionals, we’ve grown into a trusted platform connecting patients and doctors with efficiency and reliability.</p>
                <p>Our journey is guided by innovation, patient-centric solutions, and adherence to ethical and legal healthcare standards.</p>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="border-2 border-dotted border-muted-foreground/30 rounded-xl p-8 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-foreground">2020</div>
                <div className="text-muted-foreground">Year Founded</div>
                <div className="w-16 h-px bg-muted-foreground/40 mx-auto"></div>
                <div className="text-sm text-muted-foreground">The beginning of our digital healthcare journey</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
