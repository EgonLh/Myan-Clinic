"use client"

import type React from "react"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "@/app/store/features/auth/authApi"
import { setCredentials } from "@/app/store/features/auth/authSlice"
import Link from "next/link"
import { Github } from "lucide-react"
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
    username: "",
    email: "",
    password: "",
  }

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, "Username must be at least 6 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  })

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const result = await login(values).unwrap()
      dispatch(
        setCredentials({ user: result.user, token: result.accessToken })
      )
      console.log("The Token ", result)
      toast.success("Login Succeed", {
        description: `You Are login in as `,
      })

      router.push('dashboard/patient')
    } catch (err: any) {
      console.log(err)
      toast.error("Login failed", {
        description:
          err?.data?.message || "Invalid username, email, or password.",
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
                            htmlFor="username"
                            className="text-sm font-medium text-gray-300"
                          >
                            Username
                          </Label>
                          <Field
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            className="h-10 border-neutral-600 focus:bg-neutral-700 shadow-none focus:outline-none w-full px-3 rounded"
                          />
                          <ErrorMessage
                            name="username"
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
                          <Link
                            href="/forgot-password"
                            className="text-purple-600 hover:text-purple-700"
                          >
                            Forgot password?
                          </Link>
                        </div>

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

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-neutral-800 px-2 text-gray-500 font-mono">
                        or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                    >
                      <Github className="w-5 h-5 mr-2" /> GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
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
