"use client"

import * as React from "react"
import { Doctor, UpdateDoctorRequest } from "@/types/doctor.type"
import { useDeleteDoctorMutation, useUpdateDoctorMutation } from "@/app/store/features/doctor/doctorApi"
import { useUpdateUserMutation } from "@/app/store/features/users/userApi"
import { useGetDepartmentsQuery } from "@/app/store/features/department/departmentApi"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Formik, Form, Field } from "formik"

interface DoctorDrawerFormProps {
  doctor: Doctor,
  callback: () => void
}

export const DoctorDrawerForm: React.FC<DoctorDrawerFormProps> = ({ doctor, callback }) => {
  const [updateDoctor] = useUpdateDoctorMutation()
  const [deleteDoctor] = useDeleteDoctorMutation()
  const [updateUser] = useUpdateUserMutation()
  const [isEditing, setIsEditing] = React.useState(false)
  const { data: departments } = useGetDepartmentsQuery()

  const handleUpdate = async (values: UpdateDoctorRequest) => {
    try {
      await updateDoctor({ id: doctor.id, body: values })
      setIsEditing(false)
      callback()
    } catch (err) {
      console.error("Failed to update doctor:", err)
    }
  }

  return (
    <div className="p-4 flex flex-col gap-6 font-sans">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">{doctor.user.name}</h2>
        <p className="text-sm text-gray-500">
          Detailed information about the doctor. Click "Edit" to update fields.
        </p>
      </div>

      {/* Edit Toggle */}
      <Button
        variant={isEditing ? "secondary" : "outline"}
        size="sm"
        className="mb-4"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Cancel" : "Edit"}
      </Button>

      {/* Form */}
      <Formik
        initialValues={{
          ph: doctor.ph,
          license: doctor.license,
          type: doctor.type,
          departmentId: doctor.department.id
        }}
        onSubmit={(values) => handleUpdate(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-4">

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <Label>Phone</Label>
              <Field
                name="ph"
                as={Input}
                readOnly={!isEditing}
                className={`rounded-md ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
            </div>

            {/* License */}
            <div className="flex flex-col gap-1">
              <Label>License</Label>
              <Field
                name="license"
                as={Input}
                readOnly={!isEditing}
                className={`rounded-md ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-1">
              <Label>Type</Label>
              {isEditing ? (
                <Select
                  value={values.type}
                  onValueChange={(val) => setFieldValue("type", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Generalist">Generalist</SelectItem>
                    <SelectItem value="Specialist">Specialist</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={values.type}
                  readOnly
                  className="rounded-md bg-gray-100 cursor-not-allowed"
                />
              )}
            </div>

            {/* Department */}
            <div className="flex flex-col gap-1">
              <Label>Department</Label>
              {isEditing ? (
                <Select
                  value={values.departmentId?.toString() || ""}
                  onValueChange={(val) => setFieldValue("departmentId", Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments?.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  value={doctor.department.name}
                  readOnly
                  className="rounded-md bg-gray-100 cursor-not-allowed"
                />
              )}
            </div>

            {/* Created / Updated */}
            <div className="flex flex-col gap-1">
              <Label>Created At</Label>
              <Input
                value={new Date(doctor.user.createdAt).toLocaleString()}
                readOnly
                className="rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Updated At</Label>
              <Input
                value={new Date(doctor.user.updatedAt).toLocaleString()}
                readOnly
                className="rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Update & Delete Buttons */}
            <div className="flex justify-between mt-4 gap-2">
              {isEditing && (
                <Button type="submit" className="flex-1">Update</Button>
              )}
              <Button
                type="button"
                variant="destructive"
                className="flex-1"
                onClick={async () => {
                  if (!confirm("Are you sure you want to delete this doctor?")) return
                  try {
                    await updateUser({ id: doctor.user.id, body: { role: "Patient" } })
                    await deleteDoctor(doctor.id)
                    callback()
                  } catch (err) {
                    console.error("Failed to delete doctor", err)
                  }
                }}
              >
                Delete
              </Button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  )
}
