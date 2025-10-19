"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetUserByIdQuery, useUpdateUserMutation } from "@/app/store/features/users/userApi"
import { useUpdatePatientMutation } from "@/app/store/features/patient/patientApi"
import { ST } from "next/dist/shared/lib/utils"

interface UserDialogProps {
    userId: number
    trigger?: React.ReactNode
}

export function UserDialog({ userId, trigger }: UserDialogProps) {
    const [open, setOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [updateUser] = useUpdateUserMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const { data: user, isLoading } = useGetUserByIdQuery(userId)

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

    // Populate form once
    useEffect(() => {
        if (user && form.name === "") {
            setForm({
                name: user.name || "",
                payment: user.patient?.payment || "",
                phone: user.patient?.ph || "",
                addr: user.patient?.addr || "",
                age: user.patient?.age || "",
                gender: user.gender === "female" ? "F" : user.gender === "other" ? "other" : "M",
                status: user.status || "Active",
                email: user.email || "",
                username: user.username || "",
            })
        }
    }, [user])

    const handleSubmit = () => {
        console.log("Form Data:", form)
        // ---- update for user ---- //
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

        console.log("Updating User with ID:", userId, "with data:", updatedUserBody);
        updateUser({ id: userId, body: updatedUserBody })
            .unwrap()

        console.log("Updating Patient with User ID:", userId, "with data:", updatePatientBody);
        updatePatient({ id: Number(user?.patient?.id), body: updatePatientBody })
            .unwrap()

        setEditMode(false)
        setOpen(false)
    }

    if (isLoading) return <p className="font-mono">Loading...</p>

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger || <Button size="sm" className="font-mono">Show User Info</Button>}</DialogTrigger>

            <DialogContent className="max-w-md font-mono">
                <DialogHeader>
                    <DialogTitle>Edit User Info</DialogTitle>
                    <Button
                        size="sm"
                        variant="outline"
                        className="ml-auto mt-2"
                        onClick={() => setEditMode(!editMode)}
                    >
                        {editMode ? "Cancel Edit" : "Edit"}
                    </Button>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-4">
                    {/* Name */}
                    <label className="text-sm font-mono">Name</label>
                    <Input
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        disabled={!editMode}
                        className="rounded border"
                    />

                    {/* Phone */}
                    <label className="text-sm font-mono">Phone</label>
                    <Input
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        disabled={!editMode}
                        className="rounded border"
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            {/* Payment Method */}
                            <label className="text-sm font-mono">Payment Method</label>
                            <Select
                                value={form.payment}
                                onValueChange={(value) => setForm({ ...form, payment: value })}
                                disabled={!editMode}
                            >
                                <SelectTrigger className="rounded border">
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
                            <label className="text-sm font-mono">Address</label>
                            <Input
                                placeholder="Address"
                                value={form.addr}
                                onChange={(e) => setForm({ ...form, addr: e.target.value })}
                                disabled={!editMode}
                                className="rounded border"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Age */}
                        <div>
                            <label className="text-sm font-mono">Age</label>
                            <Input
                                placeholder="Age"
                                type="number"
                                value={form.age}
                                onChange={(e) => setForm({ ...form, age: String(e.target.value) })}
                                disabled={!editMode}
                                className="rounded border"
                            />

                        </div>
                        {/* Gender */}
                        <div>
                            <label className="text-sm font-mono">Gender</label>
                            <Select
                                value={form.gender}
                                onValueChange={(value) => setForm({ ...form, gender: value })}
                                disabled={!editMode}
                            >
                                <SelectTrigger className="rounded border">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Male</SelectItem>
                                    <SelectItem value="F">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {/* Payment Method */}
                        <div>
                            {/* Status */}
                            <label className="text-sm font-mono">Status</label>
                            <Select
                                value={form.status}
                                onValueChange={(value) => setForm({ ...form, status: value })}
                                disabled={!editMode}
                            >
                                <SelectTrigger className="rounded border">
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
                        <div>                    {/* Email */}
                            <label className="text-sm font-mono">Email</label>
                            <Input
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                disabled={!editMode}
                                className="rounded border"
                            /></div>
                        <div>
                            {/* Username */}
                            <label className="text-sm font-mono">Username</label>
                            <Input
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                disabled={!editMode}
                                className="rounded border"
                            />
                        </div>
                    </div>




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
