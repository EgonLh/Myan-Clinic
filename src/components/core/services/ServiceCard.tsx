"use client"

import { Card } from "@/components/ui/card"

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  features: string[]
  delay?: string
  visible: boolean
}

export default function ServiceCard({ icon, title, description, features, delay = "delay-300", visible }: ServiceCardProps) {
  return (
    <div
      className={`transition-all duration-1000 ${delay} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Card className="border-2 border-dotted border-muted-foreground/30 p-8 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:scale-105 transition-all duration-500 h-full group">
        <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 text-center">{icon}</div>
        <h3 className="text-xl font-semibold text-foreground mb-4 text-center group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <div className="w-12 h-px bg-muted-foreground/40 mx-auto mb-4"></div>
        <p className="text-muted-foreground mb-6 leading-relaxed text-center text-sm">{description}</p>
        <div className="space-y-3">
          {features.map((feature) => (
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
  )
}
