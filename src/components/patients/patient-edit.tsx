"use client"
// ----- Patient Edit Component ----- //
// - Review [x]
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/app/store/features/users/userApi"
import { useUpdatePatientMutation } from "@/app/store/features/patient/patientApi"

// ----- Component Props ----- //
interface UserDialogProps {
  userId: number
  trigger?: React.ReactNode
}

// ----- User Dialog Component ----- //
export function UserDialog({ userId, trigger }: UserDialogProps) {
  // ----- STATE ----- //
  const [open, setOpen] = useState(false)             // Dialog open state
  const [editMode, setEditMode] = useState(false)     // Toggle edit mode
  const [form, setForm] = useState({
    name: "",
    phone: "",
    addr: "",
    age: "",
    payment: "",
    gender: "M",
    status: "Active",
    email: "",
    username: "",
  })

  // ----- RTK API Hooks ----- //
  const [updateUser] = useUpdateUserMutation()
  const [updatePatient] = useUpdatePatientMutation()
  const { data: user, isLoading } = useGetUserByIdQuery(userId)

  // ----- Populate form once when user data loads ----- //
  useEffect(() => {
    if (user && form.name === "") {
      setForm({
        name: user.name || "",
        phone: user.patient?.ph || "",
        addr: user.patient?.addr || "",
        age: user.patient?.age || "",
        payment: user.patient?.payment || "",
        gender:
          user.gender === "female"
            ? "F"
            : user.gender === "other"
            ? "other"
            : "M",
        status: user.status || "Active",
        email: user.email || "",
        username: user.username || "",
      })
    }
  }, [user])

  // ----- Handle Form Submission ----- //
  const handleSubmit = async () => {
    const updatedUserBody = {
      name: form.name,
      email: form.email,
      username: form.username,
      status: form.status,
      gender: form.gender,
    }

    const updatePatientBody = {
      ph: form.phone,
      addr: form.addr,
      age: Number(form.age),
      payment: form.payment,
    }

    try {
      await updateUser({ id: userId, body: updatedUserBody }).unwrap()
      await updatePatient({ id: Number(user?.patient?.id), body: updatePatientBody }).unwrap()
      setEditMode(false)
      setOpen(false)
    } catch (err) {
      console.error("Failed to update user/patient:", err)
    }
  }

  if (isLoading) return <p className="font-mono">Loading...</p>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="font-mono">
            Show User Info
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-md font-mono">
        <DialogHeader className="py-0">
          <DialogTitle className="hover:underline hover:decoration-wavy transition-all duration-700 underline-offset-6">
            User Information
          </DialogTitle>
        </DialogHeader>

        {/* ----- FORM FIELDS ----- */}
        <div className="flex border-t-3 border-dashed pt-3 flex-col gap-3">
          {/* Name */}
          <label className="text-sm font-mono text-slate-500">Name</label>
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            disabled={!editMode}
            className="rounded border shadow-none"
          />

          {/* Phone */}
          <label className="text-sm font-mono text-slate-500">Phone</label>
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={!editMode}
            className="rounded border shadow-none"
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Payment Method */}
            <div>
              <label className="text-sm font-mono text-slate-500">Payment Method</label>
              <Select
                value={form.payment}
                onValueChange={(value) => setForm({ ...form, payment: value })}
                disabled={!editMode}
              >
                <SelectTrigger className="rounded w-full border shadow-none">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-mono text-slate-500">Address</label>
              <Input
                placeholder="Address"
                value={form.addr}
                onChange={(e) => setForm({ ...form, addr: e.target.value })}
                disabled={!editMode}
                className="rounded border w-full shadow-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Age */}
            <div>
              <label className="text-sm font-mono text-slate-500">Age</label>
              <Input
                placeholder="Age"
                type="number"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: String(e.target.value) })}
                disabled={!editMode}
                className="rounded border w-full shadow-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-mono text-slate-500">Gender</label>
              <Select
                value={form.gender}
                onValueChange={(value) => setForm({ ...form, gender: value })}
                disabled={!editMode}
              >
                <SelectTrigger className="rounded w-full border shadow-none">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-mono text-slate-500">Status</label>
              <Select
                value={form.status}
                onValueChange={(value) => setForm({ ...form, status: value })}
                disabled={!editMode}
              >
                <SelectTrigger className="rounded w-full border shadow-none">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="text-sm font-mono text-slate-500">Email</label>
              <Input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={!editMode}
                className="rounded border w-full shadow-none"
              />
            </div>

            {/* Username */}
            <div>
              <label className="text-sm font-mono text-slate-500">Username</label>
              <Input
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                disabled={!editMode}
                className="rounded w-full border shadow-none"
              />
            </div>
          </div>

          <hr className="my-2 border-0 border-t-2 border-dashed" />

          {/* Edit / Save Buttons */}
          <Button
            size="sm"
            variant="outline"
            className="ml-auto mt-2"
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? "Cancel Edit" : "Edit"}
          </Button>
          {editMode && (
            <Button size="sm" onClick={handleSubmit} className="mt-2 font-mono">
              Save
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
