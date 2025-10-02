"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AdminHelpPage() {
  return (
    <div className="p-6 lg:p-12 min-h-screen flex flex-col md:flex-row gap-6 bg-gray-50 text-gray-900">
      
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white rounded-lg p-4 shadow-sm space-y-4">
        <h2 className="text-lg font-bold mb-2">Admin Dashboard Manual</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="hover:text-blue-600">Overview</a></li>
          <li><a href="#users" className="hover:text-blue-600">Users Management</a></li>
          <li><a href="#appointments" className="hover:text-blue-600">Appointments</a></li>
          <li><a href="#feedback" className="hover:text-blue-600">Feedback & Ratings</a></li>
          <li><a href="#analytics" className="hover:text-blue-600">Analytics & Reports</a></li>
          <li><a href="#settings" className="hover:text-blue-600">Settings</a></li>
        </ul>
      </aside>

      {/* Main content */}
      <ScrollArea className="flex-1 bg-white rounded-lg p-6 shadow-sm space-y-6">
        
        {/* Overview */}
        <Card id="overview">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The Admin Dashboard provides a complete overview of the hospital management system.
              You can manage users, appointments, feedback, analytics, and system settings.
            </p>
          </CardContent>
        </Card>

        <Separator />

        {/* Users */}
        <Card id="users">
          <CardHeader>
            <CardTitle>Users Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="view-users">
                <AccordionTrigger>Viewing Users</AccordionTrigger>
                <AccordionContent>
                  <p>You can view all registered users with their roles, status, and ratings.</p>
                  <p>Filters are available for name, role, and minimum rating.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="edit-users">
                <AccordionTrigger>Editing Users</AccordionTrigger>
                <AccordionContent>
                  <p>Admins can edit user information, change roles, and reset passwords.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Separator />

        {/* Appointments */}
        <Card id="appointments">
          <CardHeader>
            <CardTitle>Appointments Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="view-appointments">
                <AccordionTrigger>Viewing Appointments</AccordionTrigger>
                <AccordionContent>
                  <p>Appointments can be filtered by patient, doctor, status, and department.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="manage-appointments">
                <AccordionTrigger>Managing Appointments</AccordionTrigger>
                <AccordionContent>
                  <p>Admins can mark appointments as Done or delete them. Notes can be viewed in a dialog.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Separator />

        {/* Feedback */}
        <Card id="feedback">
          <CardHeader>
            <CardTitle>Feedback & Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Feedback from patients can be searched and filtered by rating and role. View details in a dialog.</p>
          </CardContent>
        </Card>

        <Separator />

        {/* Analytics */}
        <Card id="analytics">
          <CardHeader>
            <CardTitle>Analytics & Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View live charts for appointments, patient growth, and system usage. Supports export for reporting.</p>
          </CardContent>
        </Card>

        <Separator />

        {/* Settings */}
        <Card id="settings">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Configure account settings, roles & permissions, notifications, and system preferences.
            </p>
            <p>Advanced options include database backup, integrations, and maintenance mode.</p>
          </CardContent>
        </Card>

      </ScrollArea>
    </div>
  )
}
