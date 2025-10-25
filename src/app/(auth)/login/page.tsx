"use client"

import type React from "react"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "@/app/store/features/auth/authApi"
import { setCredentials } from "@/app/store/features/auth/authSlice"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [login] = useLoginMutation()

  const initialValues = {
    email: "",
    password: "",
    acceptTerms: false,
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
  })
  const ForgotPasswordHandler = () => {
    toast.info("Please contact support to reset your password.", {
      description:
        "For security reasons, password resets are handled through our support team.",
    })
  }
  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const result = await login(values).unwrap()
      dispatch(
        setCredentials({ user: result.user, token: result.accessToken })
      )
      toast.success("Login Succeeded", {
        description: `You are logged in as ${result.user.role}`,
      })

      switch (result?.user?.role) {
        case "Root":
          router.push("/dashboard")
          break
        case "Doctor":
          router.push("/dashboard/doctor")
          break
        default:
          router.push("/dashboard/patient")
          break
      }
    } catch (err: any) {
      resetForm()
      toast.error("Login failed", {
        description:
          err?.data?.message || "Invalid email or password.",
      })
      resetForm()
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="border bg-neutral-800 text-white flex max-w-5xl justify-center items-center rounded-3xl">
          <div className="grid flex justify-center min-w-[400px] md:min-w-[500px] p-3 grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Marketing */}
            <div className="lg:block relative hidden overflow-hidden rounded-3xl bg-white p-12 text-black">
              <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-300 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="mb-12">
                  <h1 className="text-2xl font-bold leading-tight mb-4">
                    Welcome Back.
                    <br />
                    <span className="text-black-200">
                      Your Health, Anywhere.
                    </span>
                  </h1>
                </div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 font-mono">
                        Secure Access
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Your health data is encrypted and stored safely,
                        ensuring private and secure access anytime.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 font-mono">
                        Seamless Experience
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Pick up right where you left off. Your personalized
                        dashboard awaits with all your preferences saved.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 font-mono">
                        Digital Prescriptions
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        Receive e-prescriptions instantly and manage your
                        medicines with ease through our system.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-16">
                  <span className="text-sm hover:underline font-semibold">
                    MyanClinic
                  </span>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl"></div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center w-full justify-center">
              <Card className="w-full max-w-md border-0 shadow-2xl bg-neutral-800 text-white shadow-none">
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-2xl font-bold text-slate-100">
                    Welcome back.
                  </CardTitle>
                  <CardDescription className="text-slate-300 text-xs font-medium">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Sign up
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
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-300"
                          >
                            Email
                          </Label>
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="h-10 border-neutral-600 bg-neutral-700 bg-black shadow-none focus:outline-none w-full px-3 rounded"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-300"
                          >
                            Password
                          </Label>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="h-10 border-neutral-600 focus:bg-neutral-700 shadow-none focus:outline-none w-full px-3 rounded"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-xs"
                          />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <Button
                            type="button"
                            variant="link"
                            onClick={ForgotPasswordHandler}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            Forgot password?
                          </Button>
                        </div>

                        {/* ✅ Terms & Conditions Checkbox */}
                        <div className="flex items-center space-x-2">
                          <Field
                            type="checkbox"
                            id="acceptTerms"
                            name="acceptTerms"
                            className="h-4 w-4 accent-purple-600"
                          />
                          <Label
                            htmlFor="acceptTerms"
                            className="text-xs text-gray-400"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms-and-conditions"
                              className="text-purple-500 hover:underline"
                            >
                              Terms & Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy-policy"
                              className="text-purple-500 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                            .
                          </Label>
                        </div>
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className="text-red-500 text-xs"
                        />

                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-8 text-white bg-slate-300/[0.4] text-xs font-mono border-gray-800 font-medium rounded-lg transition-all duration-200"
                          >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>

                  {/* Separator (optional aesthetic) */}
                  <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-neutral-800 px-2 text-gray-500 font-mono">
                        Secure healthcare access
                      </span>
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
