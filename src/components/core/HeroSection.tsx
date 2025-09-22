"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-white">
        {/* Gradient background with colored spots */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-32 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 py-24 sm:py-32 max-w-4xl mx-auto">
          {/* New Badge */}
          <div className="inline-flex items-center bg-black text-white text-sm px-4 py-2 rounded-full mb-8">
            <span className="bg-white text-black text-xs px-2 py-1 rounded-full mr-3">New</span>
            Make your notes great again.
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            A notes app that
            <br />
            works like an <span className="text-teal-500">Organizer</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
            Great notes deserve a system that does it all, from making todo lists for an organized life. 
            Getting your startup to market faster than other founders.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3">
              <Star className="w-4 h-4 mr-2" />
              Get an Invite
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-3 bg-transparent"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Book a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-12 opacity-60">
            <div className="text-lg font-medium">Start</div>
            <div className="text-lg font-bold border-b-2 border-black pb-1">Ship</div>
            <div className="text-2xl font-bold">N</div>
            <div className="text-lg font-bold">Iterate</div>
            <div className="text-lg font-medium">Increase Runway</div>
          </div>
        </div>
      </section>
    </div>
  )
}
