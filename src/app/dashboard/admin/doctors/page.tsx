"use client"
import { doctors } from "./doctors"
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

export default function DoctorsPage() {
  const [selectedDoctor, setSelectedDoctor] = React.useState<typeof doctors[0] | null>(null)

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-xl font-bold mb-4">Doctors</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell>{doctor.name}</TableCell>
              <TableCell>{doctor.specialization}</TableCell>
              <TableCell>
                <Badge variant={doctor.status === "Active" ? "default" : "outline"}>
                  {doctor.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => setSelectedDoctor(doctor)}>
                      View Details
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{doctor.name}</DrawerTitle>
                      <DrawerDescription>
                        Doctor Details
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 p-4">
                      <div className="flex flex-col gap-1">
                        <Label>Name</Label>
                        <Input value={doctor.name} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Specialization</Label>
                        <Input value={doctor.specialization} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Status</Label>
                        <Select defaultValue={doctor.status}>
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
                        <Input value={doctor.target} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Limit</Label>
                        <Input value={doctor.limit} readOnly />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Reviewer</Label>
                        <Input value={doctor.reviewer} readOnly />
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
