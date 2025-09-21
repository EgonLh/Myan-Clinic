"use client"

import { Button } from "@/app/components/ui/button"
import { useState, useEffect } from "react"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { CalendarRange, Database, Dock, Package, PackageIcon, Pill, QrCode } from "lucide-react"

export function HeroSection() {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // for tracking mouse movement within the hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const element = elementRef.current
    if (element) {
      element.addEventListener("mousemove", handleMouseMove)
      return () => element.removeEventListener("mousemove", handleMouseMove)
    }
  }, [elementRef])

  return (
    <section
      ref={elementRef}
      className={`relative min-h-[600px] flex rounded-lg border items-center justify-center  overflow-hidden transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
    >
      {/* Background gradient */}
  <div
  className="absolute inset-0"
  style={{
    background: `
      radial-gradient(circle at 10% 30%, rgba(198, 0, 0, 0.4), transparent 20%),
      radial-gradient(circle at 80% 10%, rgba(10, 137, 93, 1), transparent 20%),
      radial-gradient(circle at 50% 80%, rgba(13, 48, 124, 1), transparent 20%)
    `,
    filter: "blur(120px)",
    zIndex: -1,
  }}
/>







      {/* Floating Brand Icons */}
      <div className="md:block absolute hidden inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {/* Top - Icons */}
        <div className="absolute lg:top-1/4 md:top-1/5 lg:left-1/4 left-1/7 top-13 bg-gradient-to-r from-red via-green-300 to-blue-200 p-1 border border-black border   w-16 h-16 rounded-full shadow-lg flex items-center justify-center animate-float">
          <div className="w-full h-full  bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            <CalendarRange className="w-8 h-8" />
          </div>
        </div>
        <div
          className="absolute lg:top-1/4 md:top-1/5 top-13 lg:right-1/4 right-1/7 border-green-600 bg-gradient-to-r from-red via-green-400 to-blue-200 p-1 border w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
            <PackageIcon className="w-8 h-8" />
          </div>
        </div>

        {/* Middle Icons */}
        <div
          className="absolute  bottom-1/5 lg:left-1/5 right-6/7 border-green-500 bg-gradient-to-r from-slate via-red-300 to-blue-200 p-1 border w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float"
          style={{ animationDelay: "2s" }}
        >
          <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
            <QrCode className="w-8 h-8" />
          </div>
        </div>
        <div
          className="absolute bottom-1/5 lg:right-1/5 lg:left-auto left-6/7 w-16 h-16 border-purple-600 bg-gradient-to-r from-indigo via-green-500 to-blue-200 p-1 border rounded-full shadow-lg flex items-center justify-center animate-float"
          style={{ animationDelay: "0.5s" }}
        > 

          <div className="w-full h-full bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
            <Dock className="w-8 h-8" />
          </div>
        </div>

        {/* Bottom icons */}
        <div
          className="absolute top-6/7 right-2/6 w-16 border-slate-600 bg-gradient-to-r from-red via-slate-300 to-blue-200  p-1 border  h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-full h-full bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
            <Database className="w-8 h-8" />
          </div>
        </div>
        <div
          className="absolute top-6/7 right-3/5 w-16 border-teal-600 p-1 border  bg-gradient-to-r from-red via-teal-300 to-blue-200  h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-float "
          style={{ animationDelay: "1.5s" }}
        >
          <div className="w-full h-full bg-teal-600 rounded-full flex items-center  justify-center text-white  font-bold text-xs">
            <Pill className="w-8 h-8" />
          </div>
        </div>

      </div>

        
      {/* Description for website */}
      <div
        className={`relative z-10 text-center  max-w-5xl mx-auto px-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
      >
        <div className="space-y-8  ">
          <h1 className="text-2xl md:text-2xl lg:text-2xl font-bold text-gray-900 leading-tight tracking-tight">
            <span className="block text-balance capitalize text-3xl my-3">Myan Clinic</span>
            <span className="text-green-600">Safe , </span>  <span className="text-green-600">Efficient ,</span>   <span className="text-green-600">Patient-first</span>
            <span className="block text-balance"> Medical Services</span>
          </h1>

          <p className="text-xl text-shadow-xs md:text-2xl font-semibold text-slate-700 text-shadow text-gray-600 max-w-3xl mx-auto leading-relaxed text-balance">
            Book appointments online, access your medical records securely, and connect with doctors—all in one place .
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="text-lg font-mono px-8 py-6 bg-black hover:bg-gray-800 text-white transition-all duration-300 hover:scale-105 rounded-full flex items-center gap-2"
            >

              Explore More

            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 font-mono border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 bg-transparent rounded-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

        {/* Global styles animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
