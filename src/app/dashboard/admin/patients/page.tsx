"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// Sample patient data
const patients = [
  {
    id: 1,
    name: "John Doe",
    age: 35,
    gender: "Male",
    status: "Active",
    target: "10",
    limit: "20",
    reviewer: "Assign reviewer",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    status: "Inactive",
    target: "5",
    limit: "15",
    reviewer: "Eddie Lake",
  },
]

export default function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = React.useState<typeof patients[0] | null>(null)

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-xl font-bold mb-4">Patients</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>
                <Badge variant={patient.status === "Active" ? "default" : "outline"}>
                  {patient.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedPatient(patient)}>
                      View Details
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{patient.name}</DrawerTitle>
                      <DrawerDescription>Patient Details</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 p-4">
                      <div className="flex flex-col gap-1">
                        <Label>Name</Label>
                        <Input value={patient.name} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Age</Label>
                        <Input value={patient.age} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Gender</Label>
                        <Input value={patient.gender} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Status</Label>
                        <Select defaultValue={patient.status}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Target</Label>
                        <Input value={patient.target} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Limit</Label>
                        <Input value={patient.limit} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Reviewer</Label>
                        <Input value={patient.reviewer} readOnly />
                      </div>
                    </div>
                    <DrawerFooter className="flex justify-end gap-2">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
