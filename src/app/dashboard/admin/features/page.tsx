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
    image: "https://i.pinimg.com/736x/b3/d2/5b/b3d25ba3fc965fc79cc1a378b4a33eff.jpg",
    details: "Allows admin to create, edit, and cancel appointments. Includes notifications and reminders for patients and doctors.",
  },
  {
    id: 2,
    title: "Patient Records",
    description: "Store and manage patient medical history and reports.",
    image: "https://i.pinimg.com/736x/33/ce/cf/33cecf7be7418e30ddc22a0e7e1e1985.jpg",
    details: "View, search, and update patient medical records securely. Supports exporting as PDF, CSV, or JSON.",
  },
  {
    id: 3,
    title: "Doctor Management",
    description: "Manage doctor profiles, roles, and permissions.",
    image: "https://i.pinimg.com/1200x/d6/83/c8/d683c89dbd27434259fccdd381dccb27.jpg",
    details: "Assign roles and permissions, update doctor profiles, track performance, and handle schedules.",
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "Visualize hospital performance and patient statistics.",
    image: "https://i.pinimg.com/1200x/f8/5e/15/f85e155b50c7f776a6f6cd57e489fa2c.jpg",
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
              </DialogHeader>
              <div className="mt-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-64 object-cover rounded-md"
                />
                <p className="mt-4 text-sm text-muted-foreground">{feature.details}</p>
              </div>
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
