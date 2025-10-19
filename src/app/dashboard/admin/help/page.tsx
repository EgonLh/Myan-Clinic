"use client"
// ----- Docuementations For Admin ----- //
//  - Review [x]
import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// -------------------- Admin Help Page --------------------
export default function AdminHelpPage() {
  return (
    <div className="min-h-screen rounded flex flex-col md:flex-row bg-gray-50 text-gray-900  font-mono">

      {/* -------------------- Sidebar / Navigation -------------------- */}
      <aside className="w-full md:w-1/4 bg-white    border-r-1 border-dashed border-gray-300 p-4 space-y-4">
        <h2 className="text-lg font-bold mb-2 underline">Manual</h2>
        <ul className="space-y-2 text-sm">
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#overview" className="hover:text-blue-600">Overview</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#users" className="hover:text-blue-600">Users Management</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#appointments" className="hover:text-blue-600">Appointments</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#analytics" className="hover:text-blue-600">Analytics & Reports</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#doctors" className="hover:text-blue-600">Doctors Management</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#patients" className="hover:text-blue-600">Patients Management</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#patient-history" className="hover:text-blue-600">Patient History</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#storages" className="hover:text-blue-600">Storage & Documents</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#settings" className="hover:text-blue-600">Settings</a></li>
          <li className="hover:my-4 transitions-all duration-300 hover:underline my-3 "><a href="#help" className="hover:text-blue-600">Help & Support</a></li>
        </ul>
      </aside>

      {/* -------------------- Main Content Area -------------------- */}
      <ScrollArea className="flex-1 bg-white rounded space-y-6 p-4">

        {/* ----- Overview Section ----- */}
        <Card id="overview" className="bg-white border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Overview</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>The Admin Dashboard provides a complete overview of the hospital management system.</p>
            <p>Manage users, appointments, doctors, patients, analytics, and system settings from a single place.</p>
          </CardContent>
        </Card>

        <Separator className="border-dashed border-gray-200" />

        {/* ----- Users Management ----- */}
        <Card id="users" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Users Management</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <Accordion type="single" collapsible>
              <AccordionItem value="view-users">
                <AccordionTrigger className="font-mono text-sm">Viewing Users</AccordionTrigger>
                <AccordionContent className="font-mono text-sm">
                  <p>View all registered users with their roles, status, and ratings.</p>
                  <p>Filters are available for name, role, and rating.</p>
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

        {/* ----- Appointments Management ----- */}
        <Card id="appointments" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Appointments Management</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <Accordion type="single" collapsible>
              <AccordionItem value="view-appointments">
                <AccordionTrigger className="font-mono text-sm">Viewing Appointments</AccordionTrigger>
                <AccordionContent className="font-mono text-sm">
                  <p>Appointments can be filtered by patient, doctor, status, department, and date.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="manage-appointments">
                <AccordionTrigger className="font-mono text-sm">Managing Appointments</AccordionTrigger>
                <AccordionContent className="font-mono text-sm">
                  <p>Admins can mark appointments as completed or view notes directly in a modal dialog.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Separator className="border-dashed border-gray-200" />

        {/* ----- Analytics & Reports ----- */}
        <Card id="analytics" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Analytics & Reports</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>View charts for appointments, patient growth, and system usage.</p>
            <p>Supports exporting reports for further analysis.</p>
          </CardContent>
        </Card>

        <Separator className="border-dashed border-gray-200" />

        {/* ----- Doctors Management ----- */}
        <Card id="doctors" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Doctors Management</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>Add, edit, and manage doctors and their associated departments.</p>
          </CardContent>
        </Card>

        {/* ----- Patients Management ----- */}
        <Card id="patients" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Patients Management</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>View, edit, and track patient information, history, and reports.</p>
          </CardContent>
        </Card>

        {/* ----- Patient History ----- */}
        <Card id="patient-history" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Patient History</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>Access complete medical and appointment history for each patient.</p>
          </CardContent>
        </Card>

        {/* ----- Storage / Documents ----- */}
        <Card id="storages" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Storage & Documents</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>Upload, manage, and organize digital files like patient records and reports.</p>
          </CardContent>
        </Card>

        {/* ----- Settings ----- */}
        <Card id="settings" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Settings</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>Configure account settings, roles & permissions, notifications, and system preferences.</p>
          </CardContent>
        </Card>

        {/* ----- Help & Support ----- */}
        <Card id="help" className="border-none rounded-none shadow-none">
          <CardHeader>
            <CardTitle className="font-mono text-sm">Help & Support</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm leading-relaxed">
            <p>Access documentation, tutorials, and troubleshooting resources.</p>
            <p>Get quick answers to common administrative questions and contact support.</p>
          </CardContent>
        </Card>

      </ScrollArea>
    </div>
  )
}
