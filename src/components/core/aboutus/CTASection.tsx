"use client"

import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="border-2 border-dotted border-muted-foreground/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-500 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch and let's discuss how we can help bring your vision to life.
          </p>
          <Button size="lg" className="hover:scale-105 transition-transform duration-300" onClick={() => window.location.href = "mailto:info@myanclinic.com"}>Get In Touch</Button>
        </div>
      </div>
    </section>
  )
}
