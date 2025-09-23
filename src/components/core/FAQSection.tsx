"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqData = [
  {
    id: "item-1",
    question: "What services does Myan Clinic provide?",
    answer:
      "Myan Clinic offers comprehensive healthcare services including online appointment scheduling, access to specialist and generalist doctors, secure medical record management, and teleconsultation services.",
  },
  {
    id: "item-2",
    question: "How can I book an appointment?",
    answer:
      "You can book an appointment easily through the Myan Clinic platform by registering as a patient, selecting a doctor, choosing an available time slot, and confirming your appointment online.",
  },
  {
    id: "item-3",
    question: "Is my medical data secure?",
    answer:
      "Yes, all patient data is stored securely using robust encryption and role-based access controls. The system adheres to legal and ethical guidelines including GDPR and NHS cybersecurity measures.",
  },
  {
    id: "item-4",
    question: "Can I consult with a doctor online?",
    answer:
      "Yes, Myan Clinic supports online consultations with both specialist and generalist doctors. Patients can communicate via secure video calls or messaging within the platform.",
  },
  {
    id: "item-5",
    question: "How do I access my medical records?",
    answer:
      "Once logged in, patients can view, download, and manage their medical records directly from the Myan Clinic portal at any time, ensuring convenience and accessibility.",
  },
  {
    id: "item-6",
    question: "What should I do if I encounter an issue?",
    answer:
      "You can reach our support team via the platform's contact form or helpdesk. We provide timely assistance to resolve technical or account-related issues efficiently.",
  },
  {
    id: "item-7",
    question: "Does Myan Clinic offer emergency services?",
    answer:
      "While the platform facilitates appointments and consultations, in case of medical emergencies, patients are advised to contact emergency services immediately.",
  },
];


export function FAQ() {
  return (
    <section className="py-24 my-24 " id="FAQ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
           
 
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl text-balance mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Find answers to common questions about our services, process, and how we can help bring your ideas to life.
          </p>
        </div>

        <div className="max-w-4xl  mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white  my-4 border-0 hover:border-b  transition-shadow duration-200"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50/50 rounded-t-lg data-[state=open]:rounded-b-none">
                  <span className="text-lg font-semibold text-gray-900 text-balance">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-3 pb-4 text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

         
        </div>
      </div>
    </section>
  )
}
