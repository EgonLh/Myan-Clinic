"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useCreatePatientMutation } from "@/app/store/features/patient/patientApi"
import { useRouter } from "next/navigation"
import { useUpdateUserMutation } from "@/app/store/features/users/userApi"
import { useCreateStorageMutation } from "@/app/store/features/storage/storageApi"

// ✅ Validation schema
const PatientSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone is required"),
  address: Yup.string().required("Address is required"),
  age: Yup.number().min(0).max(120).required("Age is required"),
  payment: Yup.string().required("Payment type is required"),
  rating: Yup.number().min(1).max(5).notRequired(),
})

export default function PatientSetupForm({ id }: { id: number }) {
  const [createPatient] = useCreatePatientMutation()
  const [updateUser] = useUpdateUserMutation()
  const [createStorage] = useCreateStorageMutation();
  const router = useRouter()

  const handleSubmit = async (values: any) => {
    console.log("✅ Submitted:", values)

    const patient = {
      uid: Number(id),
      ph: values.phone,
      age: values.age,
      addr: values.address,
      payment: values.payment,
      condition :"-"
    }
    const ratingbody = {rating: values.rating | 0}
    try {
    
      const result = await createPatient(patient).unwrap();
      console.log("The Result :",result);
      await createStorage({patientId:Number(result.id)});
      await updateUser({id:id,body:ratingbody})
      router.push("/login")
    } catch (error) {
      console.error("❌ Failed to create patient:", error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl font-mono p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Complete Patient Setup</h2>

        <Formik
          initialValues={{
            phone: "",
            address: "",
            age: "",
            payment: "",
            rating: "",
          }}
          validationSchema={PatientSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
           

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="mb-1">Phone</Label>
                <Field  as={Input} name="phone" className="shadow-none"  placeholder="09xxxxxxxxx" />
                <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="mb-1">Address</Label>
                <Field  as={Input} className="shadow-none" name="address" placeholder="Enter address" />
                <ErrorMessage name="address" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="mb-1">Age</Label>
                <Field  as={Input} className="shadow-none" name="age" type="number" placeholder="Age" />
                <ErrorMessage name="age" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Payment */}
              <div>
                <Label htmlFor="payment" className="mb-1">Payment Method</Label>
                <Field 
                  as="select"
                  name="payment"
                  className="border shadow-none border-gray-300 rounded-md w-full p-2"
                >
                  <option value="">Select payment type</option>
                  <option value="Paypal"> PayPal</option>
                  <option value="Visa"> Visa Card</option>
                  <option value="Bank"> Bank Transfer</option>
                  <option value="Cash"> Cash Payment</option>
                </Field>
                <ErrorMessage name="payment" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Rating (optional) */}
              <div>
                <Label htmlFor="rating" className="mb-1">Rating (optional, 1–5)</Label>
                <Field 
                  as="select"
                  name="rating"
                  className="border shadow-none border-gray-300 rounded-md w-full p-2"
                >
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="rating" component="p" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Saving..." : "Save Patient"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
