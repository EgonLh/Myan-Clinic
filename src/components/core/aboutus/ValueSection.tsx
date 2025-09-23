"use client"

import { Card } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { SquareDashedBottom, SquareDashedMousePointer } from "lucide-react"

const values = [
  { title: "Innovation", description: "Leveraging technology to improve healthcare access and efficiency.", delay: "delay-300" },
  { title: "Security", description: "Protecting patient data with robust encryption and role-based access.", delay: "delay-500" },
  { title: "Care", description: "Ensuring patient-centric solutions and quality healthcare experiences.", delay: "delay-700" },
]

export default function ValuesSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className={`py-16 px-4 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section heading */}
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-lg font-sans md:text-2xl font-bold text-foreground mb-4">Our Values</h2>
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${value.delay} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Card className="relative shadow-none border border-gray-200 rounded-lg p-6  hover:scale-105 transition-all duration-300 h-full flex flex-col items-center justify-start bg-white">
                <div className="text-start ">
                  <div className=" pb-2 flex items-center ">
                    <SquareDashedMousePointer className="mr-3"/><h3 className="text-xl font-semibold  text-foreground my-1">{value.title}</h3>
                  </div>
                  <div className="text-muted-foreground text-sm bg-slate-300/[0.1] border min-h-24 rounded font-mono text-slate-900 leading-relaxed  p-3 text-justify">{value.description}</div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
