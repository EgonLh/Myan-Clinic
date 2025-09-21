"use client"

import { Maximize } from "lucide-react";
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"

const faqs = [
  {
    question: "How can I book an appointment at Myan Clinic?",
    answer:
      "Booking an appointment at Myan Clinic is simple and convenient. You can schedule your visit directly through our online booking system, which allows you to choose your preferred doctor, date, and time. After booking, you will receive an email or SMS confirmation along with a reminder before your appointment. If you prefer, you can also call our reception team, who will guide you through the scheduling process and answer any questions you may have. Our goal is to make the booking process fast, flexible, and stress-free.",
  },
  {
    question: "What should I bring for my first consultation?",
    answer:
      "For your first consultation at Myan Clinic, please bring your valid ID, any previous medical records, test results, or prescriptions. If you have health insurance, bring your insurance card for verification. It’s also helpful to write down your current symptoms, medical history, and any medications you are taking. This information helps our doctors provide an accurate diagnosis and personalized treatment plan. Our staff is always ready to assist if you are unsure about what to bring.",
  },
  {
    question: "How does Myan Clinic protect my personal and medical information?",
    answer:
      "Patient confidentiality is a top priority at Myan Clinic. We use secure digital systems to store medical records, ensuring that your data is encrypted and accessible only to authorized medical staff. All online communications, such as appointment bookings and prescription deliveries, are protected using advanced security protocols. Additionally, our staff strictly adheres to privacy policies to maintain the confidentiality of your medical information. You can trust that your health data is safe and handled responsibly.",
  },
  {
    question: "Can I consult with a doctor online?",
    answer:
      "Yes! Myan Clinic offers online consultations for your convenience. Using our secure telemedicine platform, you can connect with certified doctors from the comfort of your home. Online consultations are ideal for follow-ups, discussing test results, or addressing minor health concerns. You can schedule your online appointment just like an in-person visit and receive electronic prescriptions if needed. Our online system ensures privacy, high-quality video interactions, and seamless communication between you and your doctor.",
  },
  {
    question: "What payment methods does Myan Clinic accept?",
    answer:
      "We accept multiple payment methods to make your visit as convenient as possible. This includes cash, credit/debit cards, and bank transfers. For online consultations, payments can be made securely through our digital platform using major cards or e-wallets. If you have health insurance, our team can assist with claims and direct billing whenever applicable. We aim to provide flexible and transparent payment options so that you can focus on your health without any financial stress.",
  },
  {
    question: "What should I do in case of a medical emergency?",
    answer:
      "In a medical emergency, your first priority should always be to seek immediate care. Please call your local emergency services (ambulance) if urgent attention is required. For emergencies at Myan Clinic, our reception team is trained to quickly assess the situation and provide immediate assistance. While our clinic provides a range of urgent care services, life-threatening conditions may require transfer to a nearby hospital. We recommend having your emergency contacts and medical information ready to ensure prompt and effective care.",
  },
];



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
          <h2 className="text-xl md:text-4xl font-bold text-foreground mb-4 text-green-600">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-mono tracking-wide">
            Find answers to common questions about our services and process
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm   rounded-2xl p-8 py-2">
          <Accordion type="single" collapsible className="w-full space-y-1">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className=" px-4 py-1 bg-background/30  hover:bg-background/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left underline hover:no-underline py-6 tracking-widest text-foreground font-medium">
                <div> <Maximize className="inline h-4 y-4 mr-1"/>{faq.question}</div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-justify tracking-wider leading-relaxed pb-6">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
