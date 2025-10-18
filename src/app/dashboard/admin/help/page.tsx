"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AdminHelpPage() {
  return (
    <div className="p-6 lg:p-12 min-h-screen flex flex-col md:flex-row gap-6 bg-gray-50 text-gray-900 font-mono">
      
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white rounded border border-dashed border-gray-300 p-4 space-y-4">
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
      <ScrollArea className="flex-1 bg-white rounded border border-dashed border-gray-300 p-6 space-y-6">
        
        {/* Overview */}
        <Card id="overview" className="border-dashed border border-gray-200 bg-white rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Overview</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>The Admin Dashboard provides a complete overview of the hospital management system.</p>
            <p>Manage users, appointments, feedback, analytics, and system settings from a single place.</p>
          </CardContent>
        </Card>

        <Separator className="border-dashed border-gray-200" />

        {/* Users */}
        <Card id="users" className="border-dashed border border-gray-200 bg-white rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Users Management</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <Accordion type="single" collapsible>
              <AccordionItem value="view-users">
                <AccordionTrigger className="font-mono text-sm">Viewing Users</AccordionTrigger>
                <AccordionContent className="font-mono text-sm">
                  <p>View all registered users with their roles, status, and ratings.</p>
                  <p>Filters are available for name, role, and minimum rating.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="edit-users">
                <AccordionTrigger className="font-mono text-sm">Editing Users</AccordionTrigger>
                <AccordionContent className="font-mono text-sm">
                  <p>Admins can edit user information, change roles, and reset passwords.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Separator className="border-dashed border-gray-200" />

        {/* Appointments */}
        <Card id="appointments" className="border-dashed border border-gray-200 bg-white rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Appointments Management</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <Accordion type="single" collapsible>
              <AccordionItem value="view-appointments">
                <AccordionTrigger className="font-mono text-sm">Viewing Appointments</AccordionTrigger>
                <AccordionContent className="font-mono text-sm">
                  <p>Appointments can be filtered by patient, doctor, status, and department.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="manage-appointments">
                <AccordionTrigger className="font-mono text-sm">Managing Appointments</AccordionTrigger>
                <AccordionContent className="font-mono text-sm">
                  <p>Admins can mark appointments as done or view notes directly in a modal dialog.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Separator className="border-dashed border-gray-200" />

        {/* Feedback */}
        <Card id="feedback" className="border-dashed border border-gray-200 bg-white rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Feedback & Ratings</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>Feedback from patients can be searched and filtered by rating and role.</p>
            <p>View details in a modal dialog without extra UI distractions.</p>
          </CardContent>
        </Card>

        <Separator className="border-dashed border-gray-200" />

        {/* Analytics */}
        <Card id="analytics" className="border-dashed border border-gray-200 bg-white rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Analytics & Reports</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>View charts for appointments, patient growth, and system usage.</p>
            <p>Supports exporting reports for further analysis.</p>
          </CardContent>
        </Card>

        <Separator className="border-dashed border-gray-200" />

        {/* Settings */}
        <Card id="settings" className="border-dashed border border-gray-200 bg-white rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Settings</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>Configure account settings, roles & permissions, notifications, and system preferences.</p>
            <p>Advanced options include database backup, integrations, and maintenance mode.</p>
          </CardContent>
        </Card>

      </ScrollArea>
    </div>
  )
}
