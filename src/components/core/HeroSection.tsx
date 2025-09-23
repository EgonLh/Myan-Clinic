"use client"

import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from "next/link"
export default function Home() {
  return (
    <div className="">
      <section className="relative overflow-hidden bg-white">
        {/* Gradient background with colored spots */}
        <div className="absolute border rounded-lg inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-32 w-96 h-96 bg-red-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        {/* Hero content */}
        <div className=" rounded-md relative z-10 text-center px-6 py-24 sm:py-32 max-w-4xl mx-auto">
          {/* New Badge */}
          <Link href={"/login"} className="hover:py-4 transtion-all duration-300 inline-flex font-mono text-xs items-center bg-black text-white  px-4 py-2 rounded-full mb-8">
            <span className="bg-white text-black font-mono text-xs px-2 py-1 rounded-full mr-3">Explore</span>
            One Stop for Your Health
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            A Smarter Way To
            <br />
            Manage Your <span className="text-teal-500">Health</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto text-pretty">
            Since 2020, Myan Clinic has been committed to modernizing healthcare with technology. Our mission is to reduce paperwork, eliminate delays, and give patients the care they need—faster, safer, and smarter
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-black font-mono text-white hover:bg-gray-800 rounded-full px-8 py-3" onClick={() => window.location.href = '/login'}>
              <Star className="w-4 h-4 " />
              Take A Book
            </Button>
            <Button
              variant="outline"
              className="rounded-full font-mono px-8 py-3 shadow bg-transparent"
              onClick={() => window.location.href = '/about'}
            >
              <svg
                className="w-4 h-4"
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
              Explore
            </Button>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-md font-semibold tracking-wide mb-10 text-muted-foreground">
            Comply With International Healthcare Standards
          </h2>
          <div className="flex flex-wrap justify-center gap-10 text-lg font-medium opacity-80">
            <Link
              href="https://gdpr-info.eu/"
              className="hover:underline transition-all duration-300 hover:text-blue-800"
            >
              GDPR
            </Link>

            <Link
              href="https://www.gov.uk/data-protection"
              className="hover:underline transition-all duration-300 hover:text-blue-800"
            >
              Data Protection Act
            </Link>

            <Link
              href="https://digital.nhs.uk/cyber-and-data-security"
              className="hover:underline transition-all duration-300 hover:text-blue-800"
            >
              NHS
            </Link>

            <Link
              href="https://www.wma.net/what-we-do/medical-ethics/"
              className="hover:underline transition-all duration-300 hover:text-blue-800"
            >
              Medical Ethics
            </Link>

            <Link
              href="https://www.bcs.org/membership/become-a-member/bcs-code-of-conduct/"
              className="hover:underline transition-all duration-300 hover:text-blue-800"
            >
              BCS Code
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
