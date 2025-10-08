"use client";

import { Sidebar } from "@/components/doctors/siderbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Building2, Users, UserCheck, Activity } from "lucide-react";
import { useGetDepartmentsQuery } from "@/app/store/features/department/departmentApi";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function DepartmentsPage() {
  const { data: departments = [], isLoading, isError } = useGetDepartmentsQuery();
  const [search, setSearch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<any | null>(null);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading departments...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Failed to load departments.</p>
      </div>
    );

  // Filter departments by search
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  // Stats
  const totalStaff = departments.reduce((sum, dept) => sum + (dept.doctors?.length || 0), 0);
  const activeDoctors = departments.reduce(
    (sum, dept) => sum + (dept.doctors?.filter((doc) => doc.isActive).length || 0),
    0
  );
  const inactiveDoctors = totalStaff - activeDoctors;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background  flex justify-center">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[80rem] p-4 sm:p-6 md:p-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Departments</h1>
            <p className="text-muted-foreground font-mono text-xs">
              Manage hospital departments and staff
            </p>
          </div>
          
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="rounded-sm hover:bg-slate-400/[0.1] shadow-none border transition-all">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{departments.length}</div>
              <p className="text-xs text-muted-foreground">Departments in system</p>
            </CardContent>
          </Card>

          <Card className="rounded-sm hover:bg-slate-400/[0.1] shadow-none border transition-all">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStaff}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>

          <Card className="rounded-sm hover:bg-slate-400/[0.1] shadow-none border transition-all">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeDoctors}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card className="rounded-sm hover:bg-slate-400/[0.1] shadow-none border transition-all">
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">Inactive Doctors</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inactiveDoctors}</div>
              <p className="text-xs text-muted-foreground">Currently inactive</p>
            </CardContent>
          </Card>
        </div>

        {/* Search + Table */}
        <Card className="mb-6 shadow-none rounded-sm">
          <CardHeader>
            <CardTitle>Department Directory</CardTitle>
            <CardDescription>View and manage all hospital departments</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search departments..."
                  className="pl-10 w-full shadow-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Departments Table */}
            <div className="overflow-x-auto rounded-md border">
              <Table className="min-w-[700px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Remark</TableHead>
                    <TableHead>Active</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.length > 0 ? (
                    filteredDepartments.map((dept) => {
                      const activeDocs = dept.doctors.length || 0;
                      const desp = dept?.description || "N/A";
                      return (
                        <TableRow key={dept.id}>
                          <TableCell className="font-medium">{dept.name}</TableCell>
                          <TableCell>{dept.remark}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="px-2 rounded-sm">{activeDocs}</Badge>
                          </TableCell>
                          <TableCell className="">
                            <p className="px-2 bg-slate-300/[0.4] text-xs font-mono rounded border truncate font-semibold text-muted-foreground max-w-[100px]">
                              {desp}
                            </p>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedDepartment(dept)}>
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        No departments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Department Details Modal */}
      <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Department Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected department.
            </DialogDescription>
          </DialogHeader>

          {selectedDepartment && (
            <div className="space-y-3 text-sm font-mono mt-2">
              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold">Name:</span>
                <span>{selectedDepartment.name}</span>
              </div>

              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold">Remark:</span>
                <span>{selectedDepartment.remark || "N/A"}</span>
              </div>

              <div className="flex justify-between border-b pb-1">
                <span className="font-semibold">Description:</span>
                <span>{selectedDepartment.description || "N/A"}</span>
              </div>

              <div className="border-t pt-2">
                <h3 className="font-semibold text-xs mb-1">Doctors</h3>
                {selectedDepartment.doctors.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {selectedDepartment.doctors.map((doc: any) => (
                      <li key={doc.id} className="text-xs">
                        {doc.type} - {doc.isActive ? "Active" : "Inactive"} (License: {doc.license})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">No doctors assigned.</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setSelectedDepartment(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
