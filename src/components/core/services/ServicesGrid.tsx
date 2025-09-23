"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"

import ServiceCard from "./ServiceCard"

const services = [
  {
    title: "Online Appointment",
    description: "Book appointments with our doctors seamlessly online.",
    features: ["24/7 Booking", "Doctor Availability", "Instant Confirmation"],
    icon: "📅",
  },
  {
    title: "Medical Records Management",
    description: "Secure storage and access of your medical history.",
    features: ["Encrypted Storage", "Role-Based Access", "Easy Retrieval"],
    icon: "🗄️",
  },
  {
    title: "Telemedicine",
    description: "Consult with doctors online without visiting the clinic.",
    features: ["Video Consultation", "Prescription Support", "Remote Monitoring"],
    icon: "💻",
  },
  {
    title: "Lab Reports",
    description: "Get your lab tests done and receive results digitally.",
    features: ["Digital Reports", "Fast Processing", "Doctor Insights"],
    icon: "🧪",
  },
  {
    title: "Pharmacy Services",
    description: "Order medicines online and get home delivery.",
    features: ["Prescription Upload", "Fast Delivery", "Secure Payment"],
    icon: "💊",
  },
  {
    title: "Health Tips & Resources",
    description: "Access health guides, articles, and preventive care tips.",
    features: ["Wellness Articles", "Doctor Advice", "Community Resources"],
    icon: "📖",
  },
]

export default function ServicesGrid() {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation({ threshold: 0.2 })

  return (
    <section
      ref={servicesRef}
      className={`py-16 px-4 transition-all duration-1000 ${
        servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-12 transition-all duration-1000 delay-200 ${
            servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Our Healthcare Services</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-muted-foreground/60 to-transparent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={`delay-${300 + index * 100}`}
              visible={servicesVisible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
