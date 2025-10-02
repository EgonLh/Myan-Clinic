"use client"

import * as React from "react"
import { useGetPatientsQuery, useUpdatePatientMutation, useDeletePatientMutation } from "@/app/store/features/patient/patientApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, SheetTrigger } from "@/components/ui/sheet"
import { Formik, Form } from "formik"
import { Badge } from "@/components/ui/badge"

export default function PatientsPage() {
  const { data: patients, isLoading, isError } = useGetPatientsQuery()
  const [updatePatient] = useUpdatePatientMutation()
  const [deletePatient] = useDeletePatientMutation()

  const [selectedPatient, setSelectedPatient] = React.useState<number | null>(null)
  const [search, setSearch] = React.useState("")

  if (isLoading) return <div>Loading patients...</div>
  if (isError || !patients) return <div>Failed to load patients</div>

  const selected = patients.find((p) => p.id === selectedPatient)

  // Filter patients by name, username, email
  const filteredPatients = patients.filter(
    (p) =>
      p.user.name.toLowerCase().includes(search.toLowerCase()) ||
      p.user.username.toLowerCase().includes(search.toLowerCase()) ||
      p.user.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 lg:p-6">
      <h1 className="text-2xl font-bold mb-6">Patients</h1>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <Input
          placeholder="Search patients by name, username, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Name</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Username</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Email</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Phone</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Address</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Status</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{patient.user.name}</td>
                <td className="px-4 py-3">{patient.user.username}</td>
                <td className="px-4 py-3">{patient.user.email}</td>
                <td className="px-4 py-3">{patient.ph}</td>
                <td className="px-4 py-3">{patient.addr}</td>
                <td className="px-4 py-3">
                  {patient.user.status === "Active" ? (
                    <Badge variant="secondary">Active</Badge>
                  ) : (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Sheet
                    open={selectedPatient === patient.id}
                    onOpenChange={(open) =>
                      setSelectedPatient(open ? patient.id : null)
                    }
                  >
                    <SheetTrigger asChild>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-full md:w-96 lg:w-[40vw] overflow-auto">
                      <SheetHeader>
                        <SheetTitle>Edit Patient</SheetTitle>
                        <SheetDescription>Update patient details</SheetDescription>
                      </SheetHeader>

                      {selected && (
                        <div className="p-4">
                          <Formik
                            initialValues={{
                              name: selected.user.name,
                              username: selected.user.username,
                              email: selected.user.email,
                              ph: selected.ph,
                              addr: selected.addr,
                              status: selected.user.status || "Active",
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                              try {
                                await updatePatient({
                                  id: selected.id,
                                  body: {
                                    name: values.name,
                                    username: values.username,
                                    email: values.email,
                                    ph: values.ph,
                                    addr: values.addr,
                                    status: values.status,
                                  },
                                })
                                setSubmitting(false)
                                setSelectedPatient(null)
                              } catch (err) {
                                console.error(err)
                                setSubmitting(false)
                              }
                            }}
                          >
                            {({ values, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
                              <Form className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                  <Label>Name</Label>
                                  <Input name="name" value={values.name} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Username</Label>
                                  <Input name="username" value={values.username} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Email</Label>
                                  <Input name="email" value={values.email} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Phone</Label>
                                  <Input name="ph" value={values.ph} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Address</Label>
                                  <Input name="addr" value={values.addr} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Label>Status</Label>
                                  <Select
                                    value={values.status}
                                    onValueChange={(val) => setFieldValue("status", val)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Active">Active</SelectItem>
                                      <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="flex justify-between pt-4">
                                  <Button type="submit" disabled={isSubmitting}>
                                    Update
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={async () => {
                                      try {
                                        await deletePatient(selected.id) // will handle user deletion in backend
                                        setSelectedPatient(null)
                                      } catch (err) {
                                        console.error(err)
                                      }
                                    }}
                                  >
                                    Delete
                                  </Button>
                                  <SheetClose asChild>
                                    <Button variant="outline">Close</Button>
                                  </SheetClose>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
