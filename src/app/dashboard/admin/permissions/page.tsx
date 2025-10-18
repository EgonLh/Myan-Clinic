"use client";
//  ----- Role and Permissions Managment Dashboard ---- //
// - Review [x]
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
import { BookDashed } from "lucide-react";

export default function UserPermissionsPage() {
  // -------------------- API Queries & Mutations --------------------
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // -------------------- Component State --------------------
  const [roleFilter, setRoleFilter] = React.useState("All"); // Role filter
  const [statusFilter, setStatusFilter] = React.useState("All"); // Status filter
  const [search, setSearch] = React.useState(""); // Search by name/username/email
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null); // Currently edited user

  // -------------------- Loading / Error States --------------------
  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div className="text-red-500">Failed to load users</div>;

  // -------------------- Filter Users --------------------
  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  // -------------------- Handlers --------------------
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
      {/* -------------------- Header + Filters -------------------- */}
      <div className="flex flex-col lg:flex-row  justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Users & Doctor Permissions</h1>

        <div className="flex md:w-fit w-full flex-col lg:flex-row gap-2 items-start md:items-center">
          {/* Search Input */}
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60 shadow-none rounded-sm md:w-fit w-full border border-gray-300"
          />

          <div className="flex w-full md:w-fit justify-center items-center ">
            {/* Role Filter */}
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40 me-1 rounded-sm">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="Patient">Patient</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Root">Root</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
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
      </div>

      {/* -------------------- User Grid -------------------- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <Card
            key={user.id}
            className="border border-dotted rounded-sm bg-white shadow-none font-mono"
          >
            {/* -------------------- Card Header -------------------- */}
            <CardHeader className="flex justify-between my-0 items-center">
              <CardTitle className="text-lg font-bold">{user.name}</CardTitle>
              <Badge
                variant={user.status?.toLowerCase() === "active" ? "default" : "outline"}
              >
                {user.status}
              </Badge>
            </CardHeader>

            {/* -------------------- Card Content -------------------- */}
            <CardContent className="my-0 text-sm">
              <div className="border-2 border-dotted hover:bg-slate-100/[0.5] rounded p-4 space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Username:</span>
                  <span className="text-gray-800">{user.username}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Email:</span>
                  <span className="text-gray-800">{user.email}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Role:</span>
                  <span className="text-gray-800">{user.role}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Gender:</span>
                  <span className="text-gray-800">{user.gender}</span>
                </div>
              </div>


            </CardContent>

            {/* -------------------- Card Footer: Actions -------------------- */}
            <CardFooter className="flex justify-end gap-2">
              {/* -------------------- View Dialog -------------------- */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="ghost" className="rounded-sm font-mono">
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md font-mono border border-dotted rounded-sm">
                  <DialogHeader className="border-b-2 border-dashed p-1">
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>View detail of user data</DialogDescription>
                  </DialogHeader>

                  <div className="text-sm mt-3 space-y-1">
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

              {/* -------------------- Edit User Sheet -------------------- */}
              <Sheet
                open={selectedUser?.id === user.id}
                onOpenChange={(open) => setSelectedUser(open ? user : null)}
              >
                <SheetTrigger asChild>
                  <Button size="sm" className="rounded-sm" variant={"ghost"}>
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
                      {/* Name */}
                      <div className="flex flex-col gap-1">
                        <Label>Name</Label>
                        <Input
                          value={selectedUser.name || ""}
                          onChange={(e) =>
                            setSelectedUser({ ...selectedUser, name: e.target.value })
                          }
                        />
                      </div>

                      {/* Username */}
                      <div className="flex flex-col gap-1">
                        <Label>Username</Label>
                        <Input
                          value={selectedUser.username || ""}
                          onChange={(e) =>
                            setSelectedUser({ ...selectedUser, username: e.target.value })
                          }
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <Label>Email</Label>
                        <Input
                          value={selectedUser.email || ""}
                          onChange={(e) =>
                            setSelectedUser({ ...selectedUser, email: e.target.value })
                          }
                        />
                      </div>

                      {/* Role */}
                      <div className="flex flex-col gap-1">
                        <Label>Role</Label>
                        <Select
                          value={selectedUser.role || ""}
                          onValueChange={(val) =>
                            setSelectedUser({ ...selectedUser, role: val })
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

                      {/* Status */}
                      <div className="flex flex-col gap-1">
                        <Label>Status</Label>
                        <Select
                          value={selectedUser.status || ""}
                          onValueChange={(val) =>
                            setSelectedUser({ ...selectedUser, status: val })
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

                      {/* Action Buttons */}
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

              {/* -------------------- Delete User -------------------- */}
              <Button
                size="sm"
                variant="ghost"
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
