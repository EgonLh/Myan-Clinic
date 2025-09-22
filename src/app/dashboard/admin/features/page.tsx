"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog"

// Sample features data
const features = [
  {
    id: 1,
    title: "Appointment Booking",
    description: "Manage all doctor appointments and patient schedules easily.",
    image: "/images/booking.jpg",
    details: "Allows admin to create, edit, and cancel appointments. Includes notifications and reminders for patients and doctors.",
  },
  {
    id: 2,
    title: "Patient Records",
    description: "Store and manage patient medical history and reports.",
    image: "/images/patient_records.jpg",
    details: "View, search, and update patient medical records securely. Supports exporting as PDF, CSV, or JSON.",
  },
  {
    id: 3,
    title: "Doctor Management",
    description: "Manage doctor profiles, roles, and permissions.",
    image: "/images/doctor_management.jpg",
    details: "Assign roles and permissions, update doctor profiles, track performance, and handle schedules.",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "Visualize hospital performance and patient statistics.",
    image: "/images/analytics.jpg",
    details: "Interactive charts, patient trends, appointment statistics, and KPI tracking for admins.",
  },
]

export default function FeatureManagementPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Feature Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Dialog key={feature.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <div className="h-40 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent>
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>{feature.title}</DialogTitle>
                <DialogDescription>{feature.details}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  )
}
