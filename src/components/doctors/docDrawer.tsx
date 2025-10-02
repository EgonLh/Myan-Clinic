"use client"

import * as React from "react"
import { Doctor, UpdateDoctorRequest } from "@/types/doctor.type"
import { useUpdateDoctorMutation } from "@/app/store/features/doctor/doctorApi"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Formik, Form, Field } from "formik"
import { cp } from "fs"

interface DoctorDrawerFormProps {
  doctor: Doctor
}

export const DoctorDrawerForm: React.FC<DoctorDrawerFormProps> = ({ doctor }) => {
  const [updateDoctor] = useUpdateDoctorMutation()
  const [isEditing, setIsEditing] = React.useState(false)

  const handleUpdate = async (values: UpdateDoctorRequest) => {
    try {
      await updateDoctor({ id: doctor.id, body: values })
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update doctor:", error)
    }
  }

  console.log("Doc ",doctor)
  return (
    <div className="p-4">
      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-bold">{doctor.user.name}</h2>
        <p className="text-sm text-gray-500">Detailed information about the doctor. You can update information by clicking the "Edit" button.</p>
      </div>

      {/* Edit Button */}
      <div className="mb-4">
        <Button
          variant={isEditing ? "secondary" : "outline"}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {/* Formik Form */}
      <Formik
        initialValues={{
          ph: doctor.ph,
          license: doctor.license,
          type: doctor.type,
        }}
        onSubmit={(values) => handleUpdate(values)}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            {/* Phone */}
            <div className="flex flex-col gap-1">
              <Label>Phone</Label>
              <Field name="ph" as={Input} readOnly={!isEditing} />
            </div>

            {/* License */}
            <div className="flex flex-col gap-1">
              <Label>License</Label>
              <Field name="license" as={Input} readOnly={!isEditing} />
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
                <Input value={values.type} readOnly />
              )}
            </div>

            {/* Department */}
            <div className="flex flex-col gap-1">
              <Label>Department</Label>
              <Input value={doctor.department.name} readOnly />
            </div>

            {/* Created / Updated */}
            <div className="flex flex-col gap-1">
              <Label>Created At</Label>
              <Input value={new Date(doctor.user.createdAt).toLocaleString()} readOnly />
            </div>
            <div className="flex flex-col gap-1">
              <Label>Updated At</Label>
              <Input value={new Date(doctor.user.updatedAt).toLocaleString()} readOnly />
            </div>

            {/* Update Button */}
            {isEditing && (
              <div className="mt-4 flex justify-end">
                <Button type="submit">Update</Button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}
