"use client"

import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, and digital marketing solutions. Our team specializes in creating custom solutions tailored to your business needs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on complexity and scope. A simple website typically takes 2-4 weeks, while more complex applications can take 2-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive support and maintenance packages to ensure your digital solutions continue to perform optimally. This includes regular updates, security monitoring, and technical support.",
  },
  {
    question: "What is your development process?",
    answer:
      "Our development process follows industry best practices including discovery, planning, design, development, testing, and deployment phases. We maintain clear communication throughout and provide regular updates on progress.",
  },
  {
    question: "Can you work with existing systems?",
    answer:
      "We have extensive experience integrating with existing systems and databases. We can enhance your current setup or build new solutions that seamlessly connect with your existing infrastructure.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We work with modern technologies including React, Next.js, Node.js, Python, and various databases. We choose the best technology stack based on your specific requirements and long-term goals.",
  },
]

export function FAQSection() {
  const { elementRef, isVisible } = useScrollAnimation()

  return (
    <section
      ref={elementRef}
      className={`py-24 px-4 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services and process
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/30 rounded-lg px-6 py-2 bg-background/30 backdrop-blur-sm hover:bg-background/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6 text-foreground font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
