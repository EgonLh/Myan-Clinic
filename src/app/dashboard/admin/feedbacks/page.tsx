"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { useGetUsersQuery } from "@/app/store/features/users/userApi"

export default function FeedbackListPage() {
  const [search, setSearch] = React.useState("")
  const [minRating, setMinRating] = React.useState<number | "">("")
  const [roleFilter, setRoleFilter] = React.useState<"-" | "Patient" | "Doctor">("")

  const { data: usersData, isLoading } = useGetUsersQuery()

  const filteredData = React.useMemo(() => {
    if (!usersData) return []

    return usersData.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase())
      const matchesRating = minRating === "" || user.rating >= minRating
      const matchesRole = roleFilter === "-" || user.role === roleFilter
      return matchesSearch && matchesRating && matchesRole
    })
  }, [usersData, search, minRating, roleFilter])

  if (isLoading) return <div>Loading users...</div>

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Feedback / Ratings</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="search">Search by Name</Label>
          <Input
            id="search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="minRating">Minimum Rating</Label>
          <Input
            id="minRating"
            type="number"
            min={0}
            max={5}
            placeholder="Filter by rating..."
            value={minRating}
            onChange={(e) => setMinRating(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        <div className="flex-1">
          <Label htmlFor="roleFilter">Role</Label>
          <Select
            value={roleFilter || ""}
            onValueChange={(value) => setRoleFilter(value === "" ? "-" : (value as "Patient" | "Doctor"))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-">All</SelectItem>
              <SelectItem value="Patient">Patient</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Badge variant={user.rating >= 4 ? "default" : "outline"}>
                    {user.rating} ⭐
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">View</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogDescription>
                          Detailed info about {user.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-2 mt-4">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <p><strong>Status:</strong> {user.status}</p>
                        <p><strong>Rating:</strong> {user.rating} ⭐</p>
                        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                        <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <DialogClose asChild>
                          <Button variant="outline">Close</Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
