"use client"

import * as React from "react"
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation,  } from "@/app/store/features/users/userApi"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetTrigger } from "@/components/ui/sheet"
import { useCreateDoctorMutation } from "@/app/store/features/doctor/doctorApi"

// Roles & Permissions
const roles = ["Patient", "Doctor", "Head Doctor", "Admin", "Root"]
const allPermissions = ["View Patients", "Prescribe Medication", "Manage Staff", "Access Reports"]

export default function UserPermissionsPage() {
  const { data: users, isLoading, isError } = useGetUsersQuery()
  const [createDoctor] = useCreateDoctorMutation()
  const [updateUser] = useUpdateUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const [roleFilter, setRoleFilter] = React.useState<string>("All")
  const [statusFilter, setStatusFilter] = React.useState<string>("All")
  const [search, setSearch] = React.useState("")
  const [openSheet, setOpenSheet] = React.useState(false)

  const [form, setForm] = React.useState({
    name: "",
    username: "",
    email: "",
    specialization: "",
  })

  const [selectedUser, setSelectedUser] = React.useState<any | null>(null)

  if (isLoading) return <div>Loading users...</div>
  if (isError || !users) return <div>Failed to load users</div>

  // Filtering logic
  const filteredUsers = users.filter((u: any) => {
    const matchesRole = roleFilter === "All" || u.role === roleFilter
    const matchesStatus = statusFilter === "All" || u.status === statusFilter
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
    return matchesRole && matchesStatus && matchesSearch
  })

  const handleAddDoctor = async () => {
    try {
      await createDoctor(form).unwrap()
      setOpenSheet(false)
      setForm({ name: "", username: "", email: "", specialization: "" })
    } catch (err) {
      console.error("Failed to add doctor:", err)
    }
  }

  const handleUpdateUser = async () => {
    if (!selectedUser) return
    try {
      await updateUser({
        id: selectedUser.id,
        body: selectedUser,
      }).unwrap()
      setSelectedUser(null)
    } catch (err) {
      console.error("Failed to update user:", err)
    }
  }

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      await deleteUser(id).unwrap()
    } catch (err) {
      console.error("Failed to delete user:", err)
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Users & Doctor Permissions</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Add Doctor Button */}
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetTrigger asChild>
              <Button>Add Doctor</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full md:w-96 lg:w-[40vw]">
              <SheetHeader>
                <SheetTitle>Add Doctor</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <div>
                  <Label>Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label>Username</Label>
                  <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label>Specialization</Label>
                  <Input value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} />
                </div>
              </div>
              <SheetFooter>
                <Button onClick={handleAddDoctor}>Save</Button>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user: any) => (
          <Card key={user.id} className="bg-background shadow-sm">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {user.name}
                <Badge variant={user.status === "Active" ? "default" : "outline"}>
                  {user.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Email: {user.email}</p>
              <p className="text-sm text-muted-foreground">Role: {user.role}</p>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              {/* Update */}
              <Sheet open={selectedUser?.id === user.id} onOpenChange={(open) => setSelectedUser(open ? user : null)}>
                <SheetTrigger asChild>
                  <Button size="sm" variant="outline">Edit</Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full md:w-96">
                  <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>
                  </SheetHeader>
                  {selectedUser && (
                    <div className="flex flex-col gap-4 py-4">
                      <div>
                        <Label>Name</Label>
                        <Input value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
                      </div>
                      <div>
                        <Label>Username</Label>
                        <Input value={selectedUser.username} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Select value={selectedUser.status} onValueChange={(val) => setSelectedUser({ ...selectedUser, status: val })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <SheetFooter>
                        <Button onClick={handleUpdateUser}>Update</Button>
                        <SheetClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </SheetClose>
                      </SheetFooter>
                    </div>
                  )}
                </SheetContent>
              </Sheet>

              {/* Delete */}
              <Button size="sm" variant="destructive" onClick={() => handleDeleteUser(user.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
