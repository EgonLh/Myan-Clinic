"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"
import {  ChevronsRight } from "lucide-react"

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  features: string[]
  delay?: string
  visible: boolean
}

export default function ServiceCard({
  icon,
  title,
  description,
  features,
  delay = "delay-300",
  visible,
}: ServiceCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(icon) // using `icon` as placeholder if needed
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Card
      className={`w-full gap-2 border shadow-none max-w-md mx-auto overflow-hidden py-3 hover:bg-slate-100/[0.1] bg-white  transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${delay}`}
    >
      {/* Gradient Header */}
      <div className="h-32 mx-3 rounded-lg relative overflow-hidden  flex items-center justify-center">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 via-pink-400 to-orange-300"></div>

        {/* Soft blurred shapes for depth */}
        <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-pink-200/30 blur-2xl"></div>
        <div className="absolute top-4 right-12 w-24 h-24 rounded-full bg-blue-200/20 blur-2xl"></div>

        {/* Optional border overlay */}
        <div className="absolute inset-0 border border-white/20 rounded-xl"></div>

        {/* Center Icon Container */}
        <div className="relative z-10 w-16 h-16 bg-white/30 backdrop-blur-md rounded-lg flex items-center justify-center shadow-lg">
          {/* Replace this with your icon component */}
          <span className="text-white text-2xl">{icon}</span>
        </div>
      </div>

      <div className="px-4 ">
        {/* Title */}
        <h2 className="text-lg font-semibold font-mono text-slate-500 ">{title}</h2>

        {/* Description */}
        <p className="text-muted-foreground text-justify pt-2 font-mono mb-3 text-sm">{description}</p>

        {/* Features */}
        <div className="space-y-1">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-gray-400 my-1 flex items-center hover:text-black transition-all duration-300 ">
                <ChevronsRight className="h-4 w-4 mr-2" />
                <p className="ms-1 font-mono text-xs"> {feature} </p>
              </span>
            </div>
          ))}
        </div>


      </div>
    </Card>
  )
}
