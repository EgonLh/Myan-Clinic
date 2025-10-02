"use client"

import * as React from "react"
import { useGetDoctorsQuery } from "@/app/store/features/doctor/doctorApi"
import { DoctorDrawerForm } from "@/components/doctors/docDrawer"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function DoctorsPage() {
  const { data: doctors, isLoading, isError } = useGetDoctorsQuery()
  const [selectedDoctor, setSelectedDoctor] = React.useState<number | null>(null)
  const [searchText, setSearchText] = React.useState("")
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>("All")

  if (isLoading) return <div>Loading doctors...</div>
  if (isError || !doctors) return <div>Failed to load doctors</div>

  // Get unique departments
  const departments = Array.from(
    new Set(doctors.map((doc) => doc.department.name))
  )

  // Filtered doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesName = doc.user.name.toLowerCase().includes(searchText.toLowerCase())
    const matchesDept =
      selectedDepartment === "All" || doc.department.name === selectedDepartment
    return matchesName && matchesDept
  })

  const selected = doctors.find((d) => d.id === selectedDoctor)

  return (
    <div className="flex relative">
      {/* Main content */}
      <div className="flex-1 p-4 lg:p-6">
        <h1 className="text-2xl font-bold mb-6">Doctors</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex flex-col w-full md:w-1/2">
            <Label>Search by Name</Label>
            <Input
              placeholder="Enter doctor name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <Label>Filter by Department</Label>
            <Select
              value={selectedDepartment}
              onValueChange={(val) => setSelectedDepartment(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-left text-gray-700 font-semibold px-4 py-2">
                  Name
                </TableHead>
                <TableHead className="text-left text-gray-700 font-semibold px-4 py-2">
                  Type
                </TableHead>
                <TableHead className="text-left text-gray-700 font-semibold px-4 py-2">
                  Phone
                </TableHead>
                <TableHead className="text-left text-gray-700 font-semibold px-4 py-2">
                  Department
                </TableHead>
                <TableHead className="text-left text-gray-700 font-semibold px-4 py-2">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-200 bg-white">
              {filteredDoctors.map((doctor) => (
                <TableRow
                  key={doctor.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-4 py-3 text-gray-800 font-medium">
                    {doctor.user.name}
                  </TableCell>

                  {/* Type as Badge */}
                  <TableCell className="px-4 py-3">
                    {doctor.type === "Generalist" ? (
                      <Badge variant="secondary">Generalist</Badge>
                    ) : (
                      <Badge variant="destructive">Specialist</Badge>
                    )}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-gray-600">{doctor.ph}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-600">{doctor.department.name}</TableCell>

                  <TableCell className="px-4 py-3">
                    <Sheet
                      open={selectedDoctor === doctor.id}
                      onOpenChange={(open) =>
                        setSelectedDoctor(open ? doctor.id : null)
                      }
                    >
                      <SheetTrigger asChild>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </SheetTrigger>

                      <SheetContent
                        side="right"
                        className="w-full md:w-96 lg:w-[40vw] overflow-auto"
                      >
                        <SheetHeader>
                          <SheetTitle>{doctor.user.name}</SheetTitle>
                          <SheetDescription>Doctor Details</SheetDescription>
                        </SheetHeader>
                        <div className="p-4">
                          <DoctorDrawerForm doctor={doctor} />
                        </div>
                        <SheetFooter className="flex justify-end gap-2">
                          <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
  