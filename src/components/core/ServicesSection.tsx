"use client"

import { useState } from "react"

const servicesData = {
  "Web Development": [
    {
      title: "Frontend Development",
      description: "Modern React, Next.js, and TypeScript applications with responsive design.",
      icon: "🌐",
    },
    {
      title: "Backend Development",
      description: "Scalable APIs, databases, and server-side solutions.",
      icon: "⚙️",
    },
    {
      title: "Full-Stack Solutions",
      description: "Complete web applications from concept to deployment.",
      icon: "🚀",
    },
    {
      title: "E-commerce Platforms",
      description: "Custom online stores with payment integration and inventory management.",
      icon: "🛒",
    },
  ],
  "Mobile Apps": [
    {
      title: "iOS Development",
      description: "Native iOS applications with Swift and modern UI frameworks.",
      icon: "📱",
    },
    {
      title: "Android Development",
      description: "Native Android apps with Kotlin and Material Design.",
      icon: "🤖",
    },
    {
      title: "Cross-Platform Apps",
      description: "React Native and Flutter applications for both platforms.",
      icon: "📲",
    },
    {
      title: "App Store Optimization",
      description: "Improve app visibility and downloads in app stores.",
      icon: "📈",
    },
  ],
  Design: [
    {
      title: "UI/UX Design",
      description: "User-centered design with modern interfaces and seamless experiences.",
      icon: "🎨",
    },
    {
      title: "Brand Identity",
      description: "Logo design, brand guidelines, and visual identity systems.",
      icon: "✨",
    },
    {
      title: "Prototyping",
      description: "Interactive prototypes and wireframes for better user testing.",
      icon: "🔧",
    },
    {
      title: "Design Systems",
      description: "Scalable design systems and component libraries.",
      icon: "📐",
    },
  ],
}

export function Services() {
  const [activeFilter, setActiveFilter] = useState<keyof typeof servicesData>("Web Development")

  const filterOptions = Object.keys(servicesData) as Array<keyof typeof servicesData>

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-balance">Our Services</h2>
          <p className="mt-6 text-xl leading-8 text-gray-600 text-pretty">
            Discover our comprehensive range of services designed to bring your ideas to life
          </p>
        </div>

        {/* Filter Bars */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-gray-900 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData[activeFilter].map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
