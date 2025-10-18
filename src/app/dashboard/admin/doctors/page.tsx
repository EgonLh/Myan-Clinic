"use client"

// ----- Doctor Dashboard for Managing Them ----- //
// - Review [x]
import * as React from "react"
import { useGetDoctorsQuery, useCreateDoctorMutation } from "@/app/store/features/doctor/doctorApi"
import { useGetUsersQuery, useUpdateUserMutation } from "@/app/store/features/users/userApi"
import { useGetDepartmentsQuery } from "@/app/store/features/department/departmentApi"
import { DoctorDrawerForm } from "@/components/doctors/docDrawer"

import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
  SheetFooter, SheetClose, SheetTrigger
} from "@/components/ui/sheet"
import LoadingPills from "@/components/ui/loading"

export default function DoctorsPage() {
  // -------------------- Queries & Mutations --------------------
  const { data: doctors, isLoading, isError } = useGetDoctorsQuery()
  const { data: users } = useGetUsersQuery()
  const { data: departments } = useGetDepartmentsQuery()
  const [createDoctor] = useCreateDoctorMutation()
  const [updateUser] = useUpdateUserMutation()

  // -------------------- Component States --------------------
  const [selectedDoctor, setSelectedDoctor] = React.useState<number | null>(null)
  const [searchText, setSearchText] = React.useState("")
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>("All")
  const [addSheetOpen, setAddSheetOpen] = React.useState(false)
  const [newDoctorUserId, setNewDoctorUserId] = React.useState<number | null>(null)
  const [newDoctorType, setNewDoctorType] = React.useState<"Generalist" | "Specialist">("Generalist")
  const [newDoctorPhone, setNewDoctorPhone] = React.useState("")
  const [newDoctorLicense, setNewDoctorLicense] = React.useState("")
  const [newDoctorDepartmentId, setNewDoctorDepartmentId] = React.useState<number | null>(null)
  const [newDoctorIsActive, setNewDoctorIsActive] = React.useState(true)

  // -------------------- Loading & Error --------------------
  if (isLoading) return <div><LoadingPills message="Loading Doctors..."/></div>
  if (isError || !doctors) return <div>Failed to load doctors</div>

  // -------------------- Filtered Doctors --------------------
  const filteredDoctors = doctors.filter((doc) => {
    const matchesName = doc.user.name.toLowerCase().includes(searchText.toLowerCase())
    const matchesDept = selectedDepartment === "All" || doc.department.name === selectedDepartment
    return matchesName && matchesDept
  })

  // -------------------- Add Doctor Handler --------------------
  const handleAddDoctor = async () => {
    if (!newDoctorUserId || !newDoctorDepartmentId) return alert("Please fill all required fields")

    try {
      await updateUser({ id: newDoctorUserId, body: { role: "Doctor" } })
      await createDoctor({
        uid: Number(newDoctorUserId),
        type: newDoctorType,
        ph: newDoctorPhone,
        license: newDoctorLicense,
        departmentId: newDoctorDepartmentId,
        isActive: newDoctorIsActive,
      })

      // Reset form
      setAddSheetOpen(false)
      setNewDoctorUserId(null)
      setNewDoctorType("Generalist")
      setNewDoctorPhone("")
      setNewDoctorLicense("")
      setNewDoctorDepartmentId(null)
      setNewDoctorIsActive(true)
    } catch (err) {
      console.error("Failed to create doctor", err)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6 font-mono">
      {/* -------------------- Main Content -------------------- */}
      <div className="flex-1">

        {/* -------------------- Header -------------------- */}
        <div className="flex flex-col md:flex-row justify-between items-between md:items-center mb-6 gap-3">
          <h1 className="text-2xl font-bold">Managing Doctors</h1>

          {/* Add Doctor Sheet Trigger */}
          <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen}>
            <SheetTrigger asChild>
              <Button className="font-mono">Add Doctor</Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-96 lg:w-[40vw] overflow-auto">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold font-mono underline">Add New Doctor</SheetTitle>
                <SheetDescription className="text-sm text-gray-500">Fill all required fields</SheetDescription>
              </SheetHeader>

              {/* -------------------- Form Fields -------------------- */}
              <div className="p-4 flex font-mono flex-col gap-4">
                {/* User */}
                <div className="flex flex-col gap-1">
                  <Label className="mb-1">Select User</Label>
                  <Select 
                    value={newDoctorUserId?.toString() || ""}
                    onValueChange={(val) => setNewDoctorUserId(Number(val))}
                  >
                    <SelectTrigger className="rounded-md shadow-none w-full border border-gray-300">
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users?.filter(u => u.role === "Patient").map(u => (
                        <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-1">
                  <Label className="mb-1">Type</Label>
                  <Select
                    value={newDoctorType}
                    onValueChange={(val) => setNewDoctorType(val as "Generalist" | "Specialist")}
                  >
                    <SelectTrigger className=" w-full shadow-none rounded-md border border-gray-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Generalist">Generalist</SelectItem>
                      <SelectItem value="Specialist">Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone & License */}
                <div className="flex flex-col gap-1 md:flex-row md:gap-4">
                  <div className="flex-1">
                    <Label className="mb-1">Phone</Label>
                    <Input
                      placeholder="Enter phone"
                      value={newDoctorPhone}
                      onChange={(e) => setNewDoctorPhone(e.target.value)}
                      className="rounded-md shadow-none border border-gray-300"
                    />
                  </div>
                  <div className="flex-1">
                    <Label className="mb-1">License</Label>
                    <Input
                      placeholder="Enter license"
                      value={newDoctorLicense}
                      onChange={(e) => setNewDoctorLicense(e.target.value)}
                      className="rounded-md shadow-none border border-gray-300"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="flex flex-col gap-1">
                  <Label>Department</Label>
                  <Select
                    value={newDoctorDepartmentId?.toString() || ""}
                    onValueChange={(val) => setNewDoctorDepartmentId(Number(val))}
                  >
                    <SelectTrigger className="rounded-md border border-gray-300">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments?.map(dept => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>{dept.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Active */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={newDoctorIsActive}
                    onCheckedChange={(checked) => setNewDoctorIsActive(!!checked)}
                  />
                  <Label>Active</Label>
                </div>
              </div>

              {/* -------------------- Footer -------------------- */}
              <SheetFooter className="flex justify-end gap-2 mt-4">
                <SheetClose asChild>
                  <Button variant="outline" onClick={handleAddDoctor}>Create</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* -------------------- Filters -------------------- */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <div className="flex-1 w-full">
            <Label className="mb-2">Search by Name</Label>
            <Input
              placeholder="Enter doctor name"
              value={searchText}
              className="rounded-sm shadow-none md:w-4/5"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <Label className="mb-2">Filter by Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="rounded-sm shadow-none">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {departments?.map(dept => <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* -------------------- Doctors Table -------------------- */}
        <div className="overflow-x-auto rounded-lg border-dotted border border-gray-300">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>{doctor.user.name}</TableCell>
                  <TableCell>
                    {doctor.type === "Generalist"
                      ? <Badge variant="secondary">Generalist</Badge>
                      : <Badge variant="destructive">Specialist</Badge>}
                  </TableCell>
                  <TableCell>{doctor.ph}</TableCell>
                  <TableCell>{doctor.department.name}</TableCell>
                  <TableCell>
                    {/* Doctor Details Drawer */}
                    <Sheet
                      open={selectedDoctor === doctor.id}
                      onOpenChange={(open) => setSelectedDoctor(open ? doctor.id : null)}
                    >
                      <SheetTrigger asChild>
                        <Button size="sm" variant="outline">View Details</Button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:w-96 lg:w-[40vw] overflow-auto">
                        <SheetHeader>
                          <SheetTitle>{doctor.user.name}</SheetTitle>
                          <SheetDescription className="border-b-dotted border-b mb-4 pb-2">
                            Doctor Receipt Details
                          </SheetDescription>
                        </SheetHeader>
                        <div className="p-4">
                          <DoctorDrawerForm doctor={doctor} callback={() => setSelectedDoctor(null)} />
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
