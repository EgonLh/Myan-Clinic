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

  const filteredPatients = patients.filter(
    (p) =>
      p.user.name.toLowerCase().includes(search.toLowerCase()) ||
      p.user.username.toLowerCase().includes(search.toLowerCase()) ||
      p.user.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 lg:p-6 font-mono">
      <h1 className="text-2xl font-bold mb-6">Patients</h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <Input
          placeholder="Search patients by name, username, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md rounded-sm border border-gray-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-sm border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200 font-mono">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Name</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Username</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Email</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Phone</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Address</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Age</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Gender</th>
              <th className="text-left px-4 py-2 font-semibold text-gray-700">Condition</th>
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
                <td className="px-4 py-3">{patient.age}</td>
                <td className="px-4 py-3">{patient.user.gender}</td>
                <td className="px-4 py-3">{patient.condition}</td>
                
                <td className="px-4 py-3">
                  <Sheet
                    open={selectedPatient === patient.id}
                    onOpenChange={(open) => setSelectedPatient(open ? patient.id : null)}
                  >
                    <SheetTrigger asChild>
                      <Button size="sm" variant="outline" className="rounded-sm">Edit</Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-full md:w-96 lg:w-[40vw] overflow-auto font-mono rounded-sm">
                      <SheetHeader>
                        <SheetTitle className="text-lg font-bold">{patient.user.name}</SheetTitle>
                        <SheetDescription className="text-sm text-gray-500">Update patient details</SheetDescription>
                      </SheetHeader>

                      {selected && (
                        <div className="p-4 flex flex-col gap-4 border border-gray-300 rounded-sm">
                          <Formik
                            initialValues={{
                              ph: selected.ph,
                              addr: selected.addr,
                              age: selected.age,
                              condition: selected.condition,
                              status: selected.user.status || "Active",
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                              try {
                                await updatePatient({
                                  id: selected.id,
                                  body: {
                                    ph: values.ph,
                                    addr: values.addr,
                                    age:Number(values.age),
                                    condition: values.condition,
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
                            {({ values, handleChange, setFieldValue, isSubmitting }) => (
                              <Form className="flex flex-col gap-4">

                                {/* Phone */}
                                <div className="flex flex-col gap-1">
                                  <Label>Phone</Label>
                                  <Input name="ph" value={values.ph} onChange={handleChange} className="rounded-sm border border-gray-300" />
                                </div>

                                {/* Address */}
                                <div className="flex flex-col gap-1">
                                  <Label>Address</Label>
                                  <Input name="addr" value={values.addr} onChange={handleChange} className="rounded-sm border border-gray-300" />
                                </div>

                                {/* Age */}
                                <div className="flex flex-col gap-1">
                                  <Label>Age</Label>
                                  <Input name="age" type="number" value={values.age} onChange={handleChange} className="rounded-sm border border-gray-300" />
                                </div>

                                {/* Condition */}
                                <div className="flex flex-col gap-1">
                                  <Label>Condition</Label>
                                  <Input name="condition" value={values.condition} onChange={handleChange} className="rounded-sm border border-gray-300" />
                                </div>

                               

                                {/* Footer Buttons */}
                                <div className="flex justify-between pt-4 gap-2">
                                  <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-sm">Update</Button>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    className="flex-1 rounded-sm"
                                    onClick={async () => {
                                      try {
                                        await deletePatient(selected.id)
                                        setSelectedPatient(null)
                                      } catch (err) {
                                        console.error(err)
                                      }
                                    }}
                                  >
                                    Delete
                                  </Button>
                                  <SheetClose asChild>
                                    <Button variant="outline" className="flex-1 rounded-sm">Close</Button>
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
