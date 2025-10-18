"use client"
//  ----- Patient Page ----- //
// - Review [x]
import * as React from "react"
import { useGetPatientsQuery, useUpdatePatientMutation, useDeletePatientMutation } from "@/app/store/features/patient/patientApi"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, SheetTrigger } from "@/components/ui/sheet"
import { Formik, Form } from "formik"

export default function PatientsPage() {
  // -------------------- Queries & Mutations --------------------
  const { data: patients, isLoading, isError } = useGetPatientsQuery()
  const [updatePatient] = useUpdatePatientMutation()
  const [deletePatient] = useDeletePatientMutation()

  // -------------------- Component State --------------------
  const [selectedPatient, setSelectedPatient] = React.useState<number | null>(null)
  const [search, setSearch] = React.useState("")

  // -------------------- Loading & Error Handling --------------------
  if (isLoading) return <div>Loading patients...</div>
  if (isError || !patients) return <div>Failed to load patients</div>

  // -------------------- Selected Patient --------------------
  const selected = patients.find((p) => p.id === selectedPatient)

  // -------------------- Filter Patients by Search --------------------
  const filteredPatients = patients.filter(
    (p) =>
      p.user.name.toLowerCase().includes(search.toLowerCase()) ||
      p.user.username.toLowerCase().includes(search.toLowerCase()) ||
      p.user.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 lg:p-6 font-mono">
      {/* -------------------- Page Title -------------------- */}
      <h1 className="text-2xl font-bold mb-6">Patients</h1>

      {/* -------------------- Search Input -------------------- */}
      <div className="flex justify-center mb-6">
        <Input
          placeholder="Search patients by name, username, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md shadow-none rounded-sm border border-gray-300"
        />
      </div>

      {/* -------------------- Patients Table -------------------- */}
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
              <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">{patient.user.name}</td>
                <td className="px-4 py-3">{patient.user.username}</td>
                <td className="px-4 py-3">{patient.user.email}</td>
                <td className="px-4 py-3">{patient.ph}</td>
                <td className="px-4 py-3">{patient.addr}</td>
                <td className="px-4 py-3">{patient.age}</td>
                <td className="px-4 py-3">{patient.user.gender}</td>
                <td className="px-4 py-3">{patient.condition}</td>

                {/* -------------------- Actions: Edit Patient -------------------- */}
                <td className="px-4 py-3">
                  <Sheet
                    open={selectedPatient === patient.id}
                    onOpenChange={(open) => setSelectedPatient(open ? patient.id : null)}
                  >
                    <SheetTrigger asChild>
                      <Button size="sm" variant="outline" className="rounded-sm">Edit</Button>
                    </SheetTrigger>

                    {/* -------------------- Patient Edit Drawer -------------------- */}
                    <SheetContent
                      side="right"
                      className="w-full md:w-96 lg:w-[40vw] overflow-auto font-mono rounded-sm"
                    >
                      <SheetHeader>
                        <SheetTitle className="text-lg font-bold">{patient.user.name}</SheetTitle>
                        <SheetDescription className="text-sm text-gray-500">
                          Update patient details
                        </SheetDescription>
                      </SheetHeader>

                      {/* Only show form if patient is selected */}
                      {selected && (
                        <div className="p-4 flex flex-col gap-4 border-t-2 border-dashed ">
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
                                // Update patient API call
                                await updatePatient({
                                  id: selected.id,
                                  body: {
                                    ph: values.ph,
                                    addr: values.addr,
                                    age: Number(values.age),
                                    condition: values.condition,
                                  },
                                })
                                setSubmitting(false)
                                setSelectedPatient(null) // Close drawer
                              } catch (err) {
                                console.error(err)
                                setSubmitting(false)
                              }
                            }}
                          >
                            {({ values, handleChange, isSubmitting }) => (
                              <Form className="flex flex-col gap-4">

                                {/* Phone Input */}
                                <div className="flex flex-col gap-1">
                                  <Label>Phone</Label>
                                  <Input
                                    name="ph"
                                    value={values.ph}
                                    onChange={handleChange}
                                    className="rounded-sm border border-gray-300"
                                  />
                                </div>

                                {/* Address Input */}
                                <div className="flex flex-col gap-1">
                                  <Label>Address</Label>
                                  <Input
                                    name="addr"
                                    value={values.addr}
                                    onChange={handleChange}
                                    className="rounded-sm border border-gray-300"
                                  />
                                </div>

                                {/* Age Input */}
                                <div className="flex flex-col gap-1">
                                  <Label>Age</Label>
                                  <Input
                                    name="age"
                                    type="number"
                                    value={values.age}
                                    onChange={handleChange}
                                    className="rounded-sm border border-gray-300"
                                  />
                                </div>

                                {/* Condition Input */}
                                <div className="flex flex-col gap-1">
                                  <Label>Condition</Label>
                                  <Input
                                    name="condition"
                                    value={values.condition}
                                    onChange={handleChange}
                                    className="rounded-sm border border-gray-300"
                                  />
                                </div>

                                {/* -------------------- Footer Actions -------------------- */}
                                <div className="flex flex-col sm:flex-row justify-between pt-4 gap-2">
                                  <Button type="submit" variant="ghost" size={"sm"} disabled={isSubmitting} className="border text-xs flex-1 rounded-sm">
                                    Update
                                  </Button>
                                  <Button
                                    type="button"
                                    size={"sm"}
                                    variant="ghost"
                                    className="flex-1 border rounded-sm text-xs"
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
                                    <Button variant="ghost" size={"sm"} className="flex-1 border text-xs rounded-sm">Close</Button>
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
