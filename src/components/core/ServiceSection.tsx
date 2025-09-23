"use client"

import { useState } from "react"

import { Activity, Heart, FileText, Calendar, Users, Stethoscope, Pill } from "lucide-react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const servicesData = {
  "Patient Services": [
    {
      title: "Online Appointments",
      description: "Schedule, reschedule, or cancel appointments with doctors seamlessly through our online platform, saving time and avoiding queues.",
      icon: Calendar,
    },
    {
      title: "Medical Records",
      description: "Securely store and access your medical history, lab results, and prescriptions anytime, ensuring continuity of care.",
      icon: FileText,
    },
    {
      title: "Consultation Services",
      description: "Book online consultations with generalist and specialist doctors from the comfort of your home, receiving expert medical advice.",
      icon: Stethoscope,
    },
    {
      title: "Patient Monitoring",
      description: "Track your health parameters, receive reminders for medications, and monitor your wellness goals directly through the platform.",
      icon: Activity,
    },
  ],
  "Healthcare Provider Services": [
    {
      title: "Doctor Management",
      description: "Manage schedules, appointments, and patient assignments efficiently to ensure smooth clinic operations and optimal patient care.",
      icon: Users,
    },
    {
      title: "Medical Record Updates",
      description: "Update and maintain comprehensive medical records with secure access control, reducing errors and improving patient safety.",
      icon: FileText,
    },
    {
      title: "Specialist Referrals",
      description: "Easily refer patients to appropriate specialists within the system to ensure they receive the best possible care.",
      icon: Stethoscope,
    },
    {
      title: "Health Analytics",
      description: "Access insights and analytics on patient health trends, appointment efficiency, and clinic performance to make data-driven decisions.",
      icon: Heart,
    },
  ],
  "Administrative Services": [
    {
      title: "Secure Data Management",
      description: "Ensure all sensitive patient and operational data is stored securely with role-based access and encryption protocols.",
      icon: FileText,
    },
    {
      title: "Appointment Oversight",
      description: "Monitor, manage, and optimize the clinic’s appointment schedules to reduce waiting times and improve patient experience.",
      icon: Calendar,
    },
    {
      title: "Compliance & Reporting",
      description: "Generate reports, track legal compliance, and maintain standards according to healthcare regulations and data protection laws.",
      icon: Pill,
    },
    {
      title: "Workflow Optimization",
      description: "Streamline administrative tasks, automate reminders, and coordinate staff assignments for operational efficiency.",
      icon: Activity,
    },
  ],
};


export function ServiceSection() {
  const [activeFilter, setActiveFilter] = useState<keyof typeof servicesData>("Patient Services")

  const filterOptions = Object.keys(servicesData) as Array<keyof typeof servicesData>

  return (
    <section className="py-24 my-16 border-dashed rounded-lg border-2 relative overflow-hidden">
      {/* Animated Rainbow Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Blob 1 */}
        <div className="absolute top-10 left-16 w-64 h-64 rounded-full blur-3xl animate-blob
      bg-gradient-to-r from-teal-400 via-green-400 to-blue-400
      animate-gradient-x group-hover:scale-110 group-hover:translate-x-2 group-hover:translate-y-1 transition-transform duration-500">
        </div>

        {/* Blob 2 */}
        <div className="absolute top-36 right-20 w-96 h-96 rounded-full blur-3xl animate-blob animation-delay-2500
      bg-gradient-to-r from-purple-400 via-pink-400 to-red-400
      animate-gradient-x group-hover:scale-105 group-hover:-translate-x-2 group-hover:-translate-y-1 transition-transform duration-500">
        </div>

        {/* Blob 3 */}
        <div className="absolute bottom-28 left-1/4 w-80 h-80 rounded-full blur-3xl animate-blob animation-delay-4500
      bg-gradient-to-r from-orange-400 via-yellow-400 to-pink-400
      animate-gradient-x group-hover:scale-110 group-hover:translate-x-1 group-hover:-translate-y-2 transition-transform duration-500">
        </div>

        {/* Blob 4 */}
        <div className="absolute bottom-16 right-1/3 w-56 h-56 rounded-full blur-3xl animate-blob animation-delay-3500
      bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
      animate-gradient-x group-hover:scale-105 group-hover:-translate-x-1 group-hover:translate-y-2 transition-transform duration-500">
        </div>
      </div>


      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className=" text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-balance">Our Services</h3>
          <p className="mt-6 text-xl leading-8 text-gray-600 text-pretty">
            Discover our comprehensive range of services designed to bring your ideas to life <br/>
            <Link href={"/services"} className="text-rose-600 text-xs hover:underline hover:text-rose-800 font-semibold">Learn More &rarr;</Link>
          </p>
        </div>

        {/* Filter Bars */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2 py-2 rounded-lg border text-sm font-semibold transition-all duration-200 ${activeFilter === filter
                ? "bg-gray-900 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData[activeFilter].map((service, index) => {
            const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, once: true })
            return (
              <div
                key={service.title}
                ref={ref}
                className={`bg-white hover:bg-gray-100/[0.6] rounded-lg p-6 transition-all duration-700 border
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
            `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="hover:tracking-wide items-center mb-3">
                  <service.icon
                    className="transition-all mb-2 text-rose-600 hover:my-2 me-1 duration-300 hover:scale-125 hover:text-green-400 hover:drop-shadow-[0_0_8px_rgb(59,140,100)]"
                  />
                  <div className="text-md font-mono font-semibold text-gray-900 transition-all duration-300 hover:underline">
                    {service.title}
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 hover:text-gray-900 transition-all duration-300 indent-8 tracking-wide text-justify text-sm font-san leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>

  )
}
