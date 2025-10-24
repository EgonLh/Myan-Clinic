"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/app/store/features/auth/authSlice"
import { useRegisterMutation } from "@/app/store/features/auth/authApi"
import { redirect } from "next/navigation"


interface RegisterFormValues {
  name: string
  username: string
  email: string
  password: string
  role: "Root" | "Doctor" | "Patient"
}

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [register, { isLoading, error }] = useRegisterMutation();
  const initialValues: RegisterFormValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    role: "Patient" // Default role
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name too short").required("Required"),
    username: Yup.string().min(4, "Username too short").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password too short").required("Required"),
    role: Yup.string().oneOf(["Root", "Doctor", "Patient"]).required("Required"),
  })

  const handleSubmit = async (values: RegisterFormValues) => {
    console.log("Registration attempt:", values)
    try{
      const result = await register(values).unwrap();
      dispatch(setCredentials({ user: result.user, token: result?.accessToken }));
      console.log("Registration successful:", result);
      
      redirect('/login');
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="border bg-neutral-800 text-white flex max-w-5xl justify-center items-center rounded-3xl">
          <div className="grid flex justify-center p-3 grid-cols-1 min-w-[400px] md:min-w-[500px] lg:grid-cols-2 gap-2 items-center">

            {/* Left Side - Telemedicine Marketing */}
            <div className="lg:block  relative hidden overflow-hidden rounded-3xl bg-white p-12 h-full text-black">
              {/* Blurred green spots */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-300 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="mb-12">
                  <h1 className="text-2xl font-bold leading-tight mb-4">
                    Join <span className="text-green-700">MyanClinic</span>
                    <br />
                    <span className="text-emerald-600">Your Health, Anywhere.</span>
                  </h1>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 font-mono">Virtual Care</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Consult doctors online anytime, without the waiting room.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 font-mono">Secure Records</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Your medical data is encrypted, private, and always accessible.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 font-mono">E-Prescriptions</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      Get prescriptions instantly and manage your medicines with ease.
                    </p>
                  </div>
                </div>

                <div className="mt-16">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm hover:underline font-semibold">MyanClinic</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="flex items-center justify-center">
              <Card className="w-full max-w-md border-0 shadow-2xl bg-neutral-800 text-white shadow-none">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold text-slate-100">Create an account</CardTitle>
                  <CardDescription className="text-slate-300 text-xs font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-green-500 hover:text-green-600 font-medium">
                      Sign in
                    </Link>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-300">Name</Label>
                          <Field
                            as={Input}
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="h-10 border-neutral-600 focus:bg-neutral-700 shadow-none focus:outline-none"
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-sm font-medium text-gray-300">Username</Label>
                          <Field
                            as={Input}
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            className="h-10 border-neutral-600 focus:bg-neutral-700 shadow-none focus:outline-none"
                          />
                          <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-300">Email</Label>
                          <Field
                            as={Input}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-10 border-neutral-600 focus:bg-neutral-700 shadow-none focus:outline-none"
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password" className="text-sm font-medium text-gray-300">Password</Label>
                          <Field
                            as={Input}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="h-10 border-neutral-600 focus:bg-neutral-700 shadow-none focus:outline-none"
                          />
                          <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                        </div>

                        {/* Hidden role field */}
                        <Field type="hidden" name="role" />

                        <div className="text-xs text-gray-400 leading-relaxed">
                          By signing up you agree to our{" "}
                          <Link href="/terms-and-conditions" className="text-green-500 hover:text-green-600">Terms of Use</Link>{" "}
                          and{" "}
                          <Link href="/privacy-policy" className="text-green-500 hover:text-green-600">Privacy Policy</Link>.
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200"
                        >
                          Sign Up
                        </Button>
                      </Form>
                    )}
                  </Formik>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-neutral-800 px-2 text-gray-500 font-mono">Patient-Centric Healthcare Services</span>
                    </div>
                  </div>

                 
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

