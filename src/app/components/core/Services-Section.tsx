"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import {
  CalendarRange,
  FileText,
  Stethoscope,
  ShieldCheck,
  HeartPulse,
  Pill,
  Syringe,
  Hospital,
  Users,
  PhoneCall,
  Database,
  Microscope,
  SquareArrowOutUpRight,
} from "lucide-react";

//  services we provided
const services = {
  Booking: {
    title: "Appointment & Booking",
    description:
      "Streamlined booking system with reminders and confirmations. Patients can easily schedule visits, avoid long waiting times, and receive instant updates. Doctors benefit from an organized calendar that ensures smooth patient flow and better time management.",
    features: [
      {
        title: "Easy Scheduling",
        description:
          "Book and manage appointments with doctors in real-time, with instant notifications and flexible rescheduling options.",
        icon: <CalendarRange />,
      },
      {
        title: "E-Prescriptions",
        description:
          "Doctors can send prescriptions directly to patients digitally, ensuring quick access to medications and reducing paperwork.",
        icon: <FileText />,
      },
      {
        title: "Specialist Matching",
        description:
          "Patients are matched with the right specialist based on their symptoms, saving time and improving diagnosis accuracy.",
        icon: <Stethoscope />,
      },
      {
        title: "Secure Records",
        description:
          "All booking and patient details are stored in encrypted systems, ensuring confidentiality and compliance with medical standards.",
        icon: <ShieldCheck />,
      },
    ],
  },
  Storage: {
    title: "Medical Records & Care",
    description:
      "Securely manage patient health data and treatment history with advanced encryption. Patients can access their medical journey anytime, while doctors benefit from centralized data that improves decision-making and continuity of care.",
    features: [
      {
        title: "Patient History",
        description:
          "View past diagnoses, prescriptions, allergies, and lab results in one place for comprehensive care.",
        icon: <HeartPulse />,
      },
      {
        title: "Pharmacy Integration",
        description:
          "Prescriptions are linked with local pharmacies for easy access, ensuring patients never miss essential medications.",
        icon: <Pill />,
      },
      {
        title: "Lab Reports",
        description:
          "Digital upload and access to blood tests, X-rays, and scans allow faster review and seamless sharing between doctors and patients.",
        icon: <Microscope />,
      },
      {
        title: "Vaccination Records",
        description:
          "Track immunizations, receive alerts for upcoming due vaccines, and keep families safe with timely reminders.",
        icon: <Syringe />,
      },
    ],
  },
  MedicalCare: {
    title: "Clinic & Patient Support",
    description:
      "Holistic support for patients, doctors, and administrators. From hospital workflows to remote consultations, we provide tools that improve collaboration, enhance patient engagement, and strengthen trust in healthcare delivery.",
    features: [
      {
        title: "Hospital Management",
        description:
          "Manage departments, staff, and patient workflows efficiently, reducing bottlenecks and ensuring quality care.",
        icon: <Hospital />,
      },
      {
        title: "Patient Engagement",
        description:
          "Automated SMS/email reminders and follow-ups keep patients informed, improving satisfaction and treatment compliance.",
        icon: <Users />,
      },
      {
        title: "Telemedicine",
        description:
          "Provide remote consultations via secure video or audio calls, making healthcare accessible anytime, anywhere.",
        icon: <PhoneCall />,
      },
      {
        title: "Analytics & Insights",
        description:
          "Leverage data-driven insights to improve patient care, identify trends, and make informed clinical and administrative decisions.",
        icon: <Database />,
      },
    ],
  },
};

export function ServicesSection() {
  const [activeService, setActiveService] = useState<keyof typeof services>("Booking")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })

  // service handler
  const handleServiceChange = (service: keyof typeof services) => {
    if (service === activeService) return

    setIsTransitioning(true)
    setTimeout(() => {
      setActiveService(service)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <section
      ref={elementRef}
      className={`py-24 px-4 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-600">
            Our Services
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto font-semibold">
            Choose from our comprehensive range of medical services designed to keep you safe, supported, and cared for at every stage of your health journey.
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-col items-center gap-4 mb-16 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* First row - 2 buttons */}
          <div className="flex gap-4 grid grid-cols-2 md:grid-cols-3 justify-center  p-1 ">
            <Button
              variant={activeService === "Booking" ? "default" : "outline"}
              size="lg"
              onClick={() => handleServiceChange("Booking")}
              className="px-8 py-3 m-1 text-lg font-medium border-none shadow-none transition-all duration-300 hover:scale-105 active:scale-95  active:shadow-sm "
            >
              Appointment
            </Button>
            <Button
              variant={activeService === "Storage" ? "default" : "outline"}
              size="lg"
              onClick={() => handleServiceChange("Storage")}
              className="px-8 py-3 m-1 text-lg font-medium transition-all border-none  shadow-none  duration-300 hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-sm "
            >
              Storage
            </Button>
             <Button
              variant={activeService === "MedicalCare" ? "default" : "outline"}
              size="lg"
              onClick={() => handleServiceChange("MedicalCare")}
              className="px-8 py-3 m-1 text-lg font-medium border-none shadow-none transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-sm "
            >
              Medical Care
            </Button>
          </div>

         
        </div>

        {/* Service Content */}
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          } ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="text-center mb-12">
            <h3 className="text-xl font-bold mb-4 text-slate-600">{services[activeService].title}</h3>
            <p className="text-md text-muted-foreground max-w-3xl mx-auto">{services[activeService].description}</p>
          </div>

          {/* Features Grid */}
         <div className="w-full flex justify-center">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6  max-w-[800px]  flex justify-center items-center ">
            {services[activeService].features.map((feature, index) => (
              <Card
                key={`${activeService}-${index}`}
                className="group border-none  shadow-none transition-all duration-300 hover:border hover:bg-muted  p-2 pt-4  hover:scale-[1.02] transform animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="  ">
                  <div className="flex items-center gap-3  ">
                    <span className="text-xl transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce">
                      {feature.icon}
                    </span>
                    <CardTitle className="text-lg font-mono hover:underline duration-300 group-hover:text-green-600  transition-colors">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className=" ">
                  <CardDescription className="text-base text-xs text-justify tracking-wider text-muted-foreground leading-relaxed  hover:text-black">{feature.description}</CardDescription>
                </CardContent>
                <CardFooter className=" m-0 flex justify-end items-end  p-0 ">
                  <Button variant="link" className="text-xs  underline hover:no-underline hover:text-green-600 transition-all duration-300">
                     <SquareArrowOutUpRight className="inline  h-4 w-4 " />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
         </div>
        </div>
      </div>
    </section>
  )
}
