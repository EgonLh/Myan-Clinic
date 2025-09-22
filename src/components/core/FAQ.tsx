"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    id: "item-1",
    question: "What services do you offer?",
    answer:
      "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, and digital marketing solutions. Our team specializes in creating modern, responsive applications using the latest technologies.",
  },
  {
    id: "item-2",
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on complexity and scope. A simple website typically takes 2-4 weeks, while complex web applications can take 8-16 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.",
  },
  {
    id: "item-3",
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes, we offer comprehensive support and maintenance packages. This includes regular updates, security patches, performance optimization, and technical support. We believe in building long-term partnerships with our clients.",
  },
  {
    id: "item-4",
    question: "What technologies do you work with?",
    answer:
      "We work with modern technologies including React, Next.js, TypeScript, Node.js, Python, and various databases. We also specialize in cloud platforms like Vercel, AWS, and Google Cloud for deployment and hosting solutions.",
  },
  {
    id: "item-5",
    question: "How do you handle project communication?",
    answer:
      "We maintain transparent communication through regular updates, scheduled meetings, and project management tools. You'll have direct access to your project team and receive weekly progress reports with demos of completed features.",
  },
  {
    id: "item-6",
    question: "What is your pricing structure?",
    answer:
      "Our pricing is project-based and depends on scope, complexity, and timeline. We provide detailed quotes after understanding your requirements. We also offer flexible payment plans and maintenance packages to suit different budgets.",
  },
]

export function FAQ() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-balance mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our services, process, and how we can help bring your ideas to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50/50 rounded-t-lg data-[state=open]:rounded-b-none">
                  <span className="text-lg font-semibold text-gray-900 text-balance">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <button className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
