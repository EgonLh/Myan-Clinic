"use client";

import * as React from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/app/store/features/users/userApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export default function UserPermissionsPage() {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [roleFilter, setRoleFilter] = React.useState("All");
  const [statusFilter, setStatusFilter] = React.useState("All");
  const [search, setSearch] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div className="text-red-500">Failed to load users</div>;

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      await updateUser({ id: selectedUser.id, body: selectedUser }).unwrap();
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 font-mono">
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Users & Doctor Permissions</h1>
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60 rounded-sm border border-gray-300"
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40 rounded-sm">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="Patient">Patient</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Root">Root</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 rounded-sm">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            className="border border-dotted rounded-sm bg-white shadow-none font-mono"
          >
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold">{user.name}</CardTitle>
              <Badge
                variant={
                  user.status?.toLowerCase() === "active" ? "default" : "outline"
                }
              >
                {user.status}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-1 text-sm">
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Gender: {user.gender}</p>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              {/* View Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-sm font-mono"
                  >
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md font-mono border border-dotted rounded-sm ">
                  <DialogHeader className="border-b-2 border-dashed p-1">
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                      View Detail of User Data
                    </DialogDescription>
                  </DialogHeader>
                  <div className="text-sm mt-3 space-y-1  ">
                    {[
                      ["ID", user.id],
                      ["Name", user.name],
                      ["Username", user.username],
                      ["Email", user.email],
                      ["Role", user.role],
                      ["Status", user.status],
                      ["Gender", user.gender],
                      ["Rating", user.rating],
                      ["Created", new Date(user.createdAt).toLocaleString()],
                      ["Updated", new Date(user.updatedAt).toLocaleString()],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-1">
                        <span className="text-gray-600">{label}:</span>
                        <span className="font-medium text-right">{String(value)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <DialogClose asChild>
                      <Button variant="outline" className="rounded-sm">
                        Close
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Edit (Sheet) */}
              <Sheet
                open={selectedUser?.id === user.id}
                onOpenChange={(open) => setSelectedUser(open ? user : null)}
              >
                <SheetTrigger asChild>
                  <Button size="sm" className="rounded-sm">
                    Edit
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full md:w-96 lg:w-[40vw] rounded-sm font-mono"
                >
                  <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>
                  </SheetHeader>

                  {selectedUser && (
                    <div className="flex flex-col gap-3 p-4 border border-dotted rounded-sm">
                      <div className="flex flex-col gap-1">
                        <Label>Name</Label>
                        <Input
                          value={selectedUser.name || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Username</Label>
                        <Input
                          value={selectedUser.username || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Email</Label>
                        <Input
                          value={selectedUser.email || ""}
                          onChange={(e) =>
                            setSelectedUser({
                              ...selectedUser,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Role</Label>
                        <Select
                          value={selectedUser.role || ""}
                          onValueChange={(val) =>
                            setSelectedUser({
                              ...selectedUser,
                              role: val,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Patient">Patient</SelectItem>
                            <SelectItem value="Doctor">Doctor</SelectItem>
                            <SelectItem value="Root">Root</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Label>Status</Label>
                        <Select
                          value={selectedUser.status || ""}
                          onValueChange={(val) =>
                            setSelectedUser({
                              ...selectedUser,
                              status: val,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-between pt-4 gap-2">
                        <Button
                          onClick={handleUpdateUser}
                          className="flex-1 rounded-sm"
                        >
                          Update
                        </Button>
                        <SheetClose asChild>
                          <Button variant="outline" className="flex-1 rounded-sm">
                            Close
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>

              {/* Delete */}
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteUser(user.id)}
                className="rounded-sm"
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
