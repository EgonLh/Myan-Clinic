"use client";

import * as React from "react";
import { useGetDepartmentsQuery, useCreateDepartmentMutation, useUpdateDepartmentMutation, useDeleteDepartmentMutation } from "@/app/store/features/department/departmentApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { Formik, Form, Field } from "formik";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function DepartmentPage() {
    const { data: departments = [], isLoading, isError } = useGetDepartmentsQuery();
    const [createDepartment] = useCreateDepartmentMutation();
    const [updateDepartment] = useUpdateDepartmentMutation();
    const [deleteDepartment] = useDeleteDepartmentMutation();

    const [search, setSearch] = React.useState("");
    const [selectedDepartment, setSelectedDepartment] = React.useState<number | null>(null);
    const [openCreate, setOpenCreate] = React.useState(false);

    const filteredDepartments = departments.filter(dep =>
        dep.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 lg:p-6 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold">Departments</h1>

                <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                    <Input
                        placeholder="Search Department..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => setOpenCreate(true)}>Add Department</Button>
                </div>
            </div>

            <Separator />

            {isLoading ? (
                <p>Loading departments...</p>
            ) : isError ? (
                <p className="text-red-500">Error fetching departments</p>
            ) : (
                <Table>
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
                            filteredDepartments.map((dep) => (
                                <TableRow key={dep.id} className="hover:bg-gray-50">
                                    <TableCell>{dep.id}</TableCell>
                                    <TableCell>{dep.name}</TableCell>
                                    <TableCell>{dep.description}</TableCell>
                                    <TableCell className="flex gap-2">
                                        {/* Edit / View Details */}
                                        <Sheet
                                            open={selectedDepartment === dep.id}
                                            onOpenChange={(open) =>
                                                setSelectedDepartment(open ? dep.id : null)
                                            }
                                        >
                                            <SheetTrigger asChild>
                                                <Button size="sm" variant="outline">Edit</Button>
                                            </SheetTrigger>
                                            <SheetContent side="right" className="w-full md:w-96 lg:w-[40vw] overflow-auto">
                                                <SheetHeader>
                                                    <SheetTitle>Department Details</SheetTitle>
                                                    <SheetDescription>Edit department info & view doctors</SheetDescription>
                                                </SheetHeader>

                                                <div className="p-4 space-y-4">
                                                    {/* Department Edit Form */}
                                                    <Formik
                                                        initialValues={{ name: dep.name, description: dep.description }}
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
                                                        {({ values, handleChange, handleSubmit, isSubmitting }) => (
                                                            <Form className="flex flex-col gap-4">
                                                                <div className="flex flex-col gap-1">
                                                                    <Label>Name</Label>
                                                                    <Input name="name" value={values.name} onChange={handleChange} />
                                                                </div>
                                                                <div className="flex flex-col gap-1">
                                                                    <Label>Description</Label>
                                                                    <Input name="description" value={values.description} onChange={handleChange} />
                                                                </div>

                                                                <div className="flex justify-between gap-2 pt-4">
                                                                    <Button type="submit" disabled={isSubmitting}>Update</Button>
                                                                    <Button
                                                                        variant="destructive"
                                                                        onClick={async () => {
                                                                            await deleteDepartment(dep.id);
                                                                            setSelectedDepartment(null);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                    <SheetClose asChild>
                                                                        <Button variant="outline">Close</Button>
                                                                    </SheetClose>
                                                                </div>
                                                            </Form>
                                                        )}
                                                    </Formik>

                                                    <Separator />

                                                    {/* Doctor List */}
                                                    <div className="space-y-2">
                                                        <h3 className="text-lg font-semibold">Doctors in this Department</h3>
                                                        {dep.doctors && dep.doctors.length ? (
                                                            <div className="divide-y divide-gray-200">
                                                                {dep.doctors.map((doc) => (
                                                                    <div key={doc.id} className="py-2 flex justify-between items-center">
                                                                        <div>
                                                                            <p className="font-medium">{doc.user?.name ?? doc.id}</p>
                                                                            <p className="text-sm text-muted-foreground">{doc.type} | {doc.license}</p>
                                                                        </div>
                                                                        <Badge variant={doc.status === "Active" ? "default" : "outline"}>
                                                                            {doc.status ?? "Unknown"}
                                                                        </Badge>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground">No doctors assigned.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </SheetContent>

                                        </Sheet>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-4">
                                    No departments found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}

            {/* Create Department Drawer */}
            <Sheet open={openCreate} onOpenChange={setOpenCreate}>
                <SheetContent side="right" className="w-full md:w-96 lg:w-[40vw] overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Create Department</SheetTitle>
                        <SheetDescription>Add a new department</SheetDescription>
                    </SheetHeader>

                    <div className="p-4">
                        <Formik
                            initialValues={{ name: "", description: "" }}
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
                            {({ values, handleChange, handleSubmit, isSubmitting }) => (
                                <Form className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <Label>Name</Label>
                                        <Input name="name" value={values.name} onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label>Description</Label>
                                        <Input name="description" value={values.description} onChange={handleChange} />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button type="submit" disabled={isSubmitting}>Create</Button>
                                        <SheetClose asChild>
                                            <Button variant="outline">Close</Button>
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
