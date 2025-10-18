"use client";
// ------ Departments Page of Root ----- //
// - Review [x]
import * as React from "react";
import {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "@/app/store/features/department/departmentApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { Formik, Form } from "formik";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import LoadingPills from "@/components/ui/loading";

export default function DepartmentPage() {
  // -------------------- API Queries & Mutations --------------------
  const { data: departments = [], isLoading, isError } = useGetDepartmentsQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  // -------------------- Component State --------------------
  const [search, setSearch] = React.useState(""); // Search filter
  const [selectedDepartment, setSelectedDepartment] = React.useState<number | null>(null); // For edit drawer
  const [openCreate, setOpenCreate] = React.useState(false); // Create drawer toggle

  // -------------------- Filter Departments --------------------
  const filteredDepartments = departments.filter(dep =>
    dep.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 lg:p-6 space-y-6 font-mono">

      {/* -------------------- Header + Search + Create -------------------- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold underline">Departments</h1>

        <div className="flex md:w-fit w-full flex-col md:flex-row gap-2 items-start md:items-center">
          <Input
            placeholder="Search Department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-sm border shadow-none border-gray-300"
          />
          <Button onClick={() => setOpenCreate(true)} className="rounded-sm">Add Department</Button>
        </div>
      </div>

      {/* -------------------- Department Cards (Responsive) -------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDepartments.map(dep => (
          <div key={dep.id} className="p-4 border hover:border-dashed rounded-sm  bg-white shadow-none">
            <h3 className="font-bold text-lg text-slate-700">{dep.name}</h3>
            <p className="text-sm text-gray-500 underline">{dep.description}</p>
            {dep.remark && <p className="text-xs text-gray-400 italic">Remark: {dep.remark}</p>}

            <Separator className="my-2" />

            {/* List doctors under department */}
            <div className="space-y-1 ">
              <h4 className="text-sm font-semibold">Doctors:</h4>
              {dep.doctors && dep.doctors.length ? (
                dep.doctors.map(doc => (
                  <div key={doc.id} className="flex text-slate-500 hover:text-slate-900 justify-between items-center text-sm">
                    <span>{doc.type}</span>
                    <span>{doc.license}</span>
                    <Badge variant={doc.isActive ? "default" : "outline"}>
                      {doc.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">No doctors assigned</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* -------------------- Department Table -------------------- */}
      {isLoading ? (
        <div><LoadingPills message="Departments are Loading...."/></div>
      ) : isError ? (
        <p className="text-red-500">Error fetching departments</p>
      ) : (
        <div className="border rounded-sm overflow-auto">
          <Table className="rounded bg-slate-100/[0.1] border border-dotted font-mono">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.length ? (
                filteredDepartments.map(dep => (
                  <TableRow key={dep.id} className="hover:bg-gray-50">
                    <TableCell>{dep.id}</TableCell>
                    <TableCell>{dep.name}</TableCell>
                    <TableCell>{dep.description}</TableCell>
                    <TableCell className="flex gap-2">

                      {/* -------------------- Edit Department Drawer -------------------- */}
                      <Sheet
                        open={selectedDepartment === dep.id}
                        onOpenChange={(open) => setSelectedDepartment(open ? dep.id : null)}
                      >
                        <SheetTrigger asChild>
                          <Button size="sm" variant="outline" className="rounded-sm">Edit</Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-full md:w-96 lg:w-[40vw] overflow-auto rounded-sm font-mono">
                          <SheetHeader>
                            <SheetTitle className="text-lg font-bold">{dep.name}</SheetTitle>
                            <SheetDescription className="text-sm text-gray-500">
                              Department Details 
                            </SheetDescription>
                          </SheetHeader>

                          <div className="p-4 space-y-4 border-dotted border rounded-sm">
                            <Formik
                              initialValues={{
                                name: dep.name ?? "",
                                description: dep.description ?? "",
                                remark: dep.remark ?? ""
                              }}
                              onSubmit={async (values, { setSubmitting }) => {
                                try {
                                  await updateDepartment({ id: dep.id, body: values });
                                  setSubmitting(false);
                                  setSelectedDepartment(null);
                                } catch (err) {
                                  console.error(err);
                                  setSubmitting(false);
                                }
                              }}
                            >
                              {({ values, handleChange, isSubmitting }) => (
                                <Form className="flex flex-col gap-4">

                                  <div className="flex flex-col gap-1">
                                    <Label>Name</Label>
                                    <Input name="name" className={"shadow-none"} value={values.name || ""} onChange={handleChange} className="rounded-sm border border-gray-300" />
                                  </div>

                                  <div className="flex flex-col gap-1">
                                    <Label>Description</Label>
                                    <Input name="description" className={"shadow-none"} value={values.description || ""} onChange={handleChange} className="rounded-sm border border-gray-300" />
                                  </div>

                                  <div className="flex flex-col gap-1">
                                    <Label>Remark</Label>
                                    <Input name="remark" className={"shadow-none"} value={values.remark || ""} onChange={handleChange} className="rounded-sm border border-gray-300" />
                                  </div>

                                  {/* -------------------- Edit Actions -------------------- */}
                                  <div className="flex justify-between gap-2 pt-4">
                                    <Button variant="outline" disabled={isSubmitting}  size={"sm"} className="flex-1 rounded-sm">Update</Button>
                                    <Button
                                      variant="outline"
                                      size={"sm"}
                                      className="flex-1 rounded-sm"
                                      onClick={async () => {
                                        await deleteDepartment(dep.id);
                                        setSelectedDepartment(null);
                                      }}
                                    >
                                      Delete
                                    </Button>
                                    <SheetClose asChild>
                                      <Button variant="outline"  size={"sm"} className="flex-1 rounded-sm">Close</Button>
                                    </SheetClose>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        </SheetContent>
                      </Sheet>

                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">No departments found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* -------------------- Create Department Drawer -------------------- */}
      <Sheet open={openCreate} onOpenChange={setOpenCreate}>
        <SheetContent side="right" className="w-full md:w-96 lg:w-[40vw] overflow-auto rounded-sm font-mono">
          <SheetHeader>
            <SheetTitle>Create Department</SheetTitle>
            <SheetDescription>Add a new department</SheetDescription>
          </SheetHeader>

          <div className="p-4 border-dotted border rounded-sm space-y-4">
            <Formik
              initialValues={{ name: "", description: "", remark: "" }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  await createDepartment(values);
                  setSubmitting(false);
                  resetForm();
                  setOpenCreate(false);
                } catch (err) {
                  console.error(err);
                  setSubmitting(false);
                }
              }}
            >
              {({ values, handleChange, isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Label>Name</Label>
                    <Input name="name" className={"shadow-none"} value={values.name || ""} onChange={handleChange} className="rounded-sm border border-gray-300" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Description</Label>
                    <Input name="description" className={"shadow-none"} value={values.description || ""} onChange={handleChange} className="rounded-sm border border-gray-300" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label>Remark</Label>
                    <Input name="remark" className={"shadow-none"} value={values.remark || ""} onChange={handleChange} className="rounded-sm border border-gray-300" />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="submit" disabled={isSubmitting} className="rounded-sm">Create</Button>
                    <SheetClose asChild>
                      <Button variant="outline" className="rounded-sm">Close</Button>
                    </SheetClose>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
