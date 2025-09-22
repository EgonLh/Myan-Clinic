"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Sample doctor data with permissions
const doctors = [
  {
    id: 1,
    name: "Dr. Alice Smith",
    specialization: "Cardiology",
    status: "Active",
    role: "Doctor",
    permissions: ["View Patients", "Prescribe Medication"],
  },
  {
    id: 2,
    name: "Dr. Bob Jones",
    specialization: "Neurology",
    status: "Inactive",
    role: "Doctor",
    permissions: ["View Patients"],
  },
  {
    id: 3,
    name: "Dr. Carol Lee",
    specialization: "Pediatrics",
    status: "Active",
    role: "Head Doctor",
    permissions: ["View Patients", "Prescribe Medication", "Manage Staff"],
  },
]

export default function DoctorPermissionsPage() {
  const [doctorData, setDoctorData] = React.useState(doctors)

  const roles = ["Doctor", "Head Doctor", "Admin"]

  const allPermissions = ["View Patients", "Prescribe Medication", "Manage Staff", "Access Reports"]

  const handleRoleChange = (id: number, newRole: string) => {
    setDoctorData((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, role: newRole } : doc))
    )
  }

  const handlePermissionToggle = (id: number, permission: string) => {
    setDoctorData((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const hasPermission = doc.permissions.includes(permission)
          return {
            ...doc,
            permissions: hasPermission
              ? doc.permissions.filter((p) => p !== permission)
              : [...doc.permissions, permission],
          }
        }
        return doc
      })
    )
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Doctor Permissions & Roles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorData.map((doctor) => (
          <Card key={doctor.id} className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {doctor.name}
                <Badge variant={doctor.status === "Active" ? "default" : "outline"}>
                  {doctor.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Specialization:</p>
                <p>{doctor.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role:</p>
                <Select
                  defaultValue={doctor.role}
                  onValueChange={(val) => handleRoleChange(doctor.id, val)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Permissions:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {allPermissions.map((perm) => {
                    const active = doctor.permissions.includes(perm)
                    return (
                      <Button
                        key={perm}
                        size="sm"
                        variant={active ? "default" : "outline"}
                        onClick={() => handlePermissionToggle(doctor.id, perm)}
                      >
                        {perm}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => alert(`Saved settings for ${doctor.name}`)}
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
