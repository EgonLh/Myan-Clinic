"use client"
import { SquareArrowOutUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="border-2 border-dotted border-muted-foreground/30 rounded-lg p-8 md:p-12">
        
          <div className="text-center space-y-6">
            <div className="space-y-2 hover:underline underline-offset-4 transition-all duration-300 hover:tracking-widest" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-mono text-green-600 hover:text-green-800 transition-all duration-300">About MyanClinic</h2>
            </div>

            <p className="text-muted-foreground text-md leading-relaxed max-w-2xl mx-auto text-justify indent-12 tracking-wider">
              Founded in 2020, Myan Clinic is a modern healthcare platform in Myanmar that makes medical services simple, secure, and accessible. We provide easy online appointment booking, safe medical record management, and trusted consultations with qualified doctors. Our mission is to bring convenient, reliable, and patient-focused healthcare to everyone, powered by innovation and care.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-foreground">100+</div>
                <div className="text-sm text-muted-foreground">Patient</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-foreground">2+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
