"use client"

import * as React from "react"
import { useGetAppointmentsQuery } from "@/app/store/features/appointment/appointmentApi"
import { useGetDoctorsQuery } from "@/app/store/features/doctor/doctorApi"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { z } from "zod"
import { toast } from "sonner"

import {
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
} from "@/app/store/features/appointment/appointmentApi"

export const appointmentSchema = z.object({
  id: z.number(),
  patientName: z.string(),
  doctorName: z.string(),
  doctorDepartment: z.string(),
  date: z.string(),
  status: z.string(),
  notes: z.string().nullable(),
})

const columns: ColumnDef<z.infer<typeof appointmentSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  { accessorKey: "patientName", header: "Patient" },
  { accessorKey: "doctorName", header: "Doctor" },
  { accessorKey: "doctorDepartment", header: "Department" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm">
            View
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Appointment Notes</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            {row.original.notes ? row.original.notes : "No notes available."}
          </div>
          <div className="mt-4 flex justify-end">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    ),
  },
]

export default function AppointmentTable() {
  const { data: appointmentsData, isLoading } = useGetAppointmentsQuery()
  const { data: doctorsData } = useGetDoctorsQuery()

  const [filters, setFilters] = React.useState({
    patientName: "",
    doctorName: "",
    status: "",
    departmentId: "",
  })

  const [updateAppointment] = useUpdateAppointmentMutation()
  const [deleteAppointment] = useDeleteAppointmentMutation()

  const departmentMap = React.useMemo(() => {
    const map: Record<number, string> = {};
    (doctorsData ?? []).forEach((doc) => {
      if (doc.department && typeof doc.department === "object") {
        map[doc.department.id] = doc.department.name;
      }
    });
    return map;
  }, [doctorsData])

  const tableData = React.useMemo(() => {
    let data = (appointmentsData ?? []).map((appt) => ({
      id: appt.id,
      patientName: appt.patient?.user?.name ?? "Unknown",
      doctorName: appt.doctor?.user?.name ?? "Unknown",
      doctorDepartment: appt.doctor?.departmentId ?? "Unknown",
      date: new Date(appt.date).toLocaleString(),
      status: appt.status,
      notes: appt.notes,
    }))

    if (filters.patientName)
      data = data.filter((d) => d.patientName.toLowerCase().includes(filters.patientName.toLowerCase()))
    if (filters.doctorName)
      data = data.filter((d) => d.doctorName.toLowerCase().includes(filters.doctorName.toLowerCase()))
    if (filters.status)
      data = data.filter((d) => d.status === filters.status)
    if (filters.departmentId)
      data = data.filter((d) => String(d.doctorDepartment) === filters.departmentId)

    return data
  }, [appointmentsData, filters, departmentMap])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const allColumns = React.useMemo(() => {
    return [
      ...columns,
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }: any) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={async () => {
                try {
                  await updateAppointment({ id: row.original.id, body: { status: "Done" } }).unwrap()
                  toast.success("Appointment updated to Done")
                } catch {
                  toast.error("Failed to update appointment")
                }
              }}
            >
              Done
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={async () => {
                if (!confirm("Are you sure you want to delete this appointment?")) return
                try {
                  await deleteAppointment(row.original.id).unwrap()
                  toast.success("Appointment deleted")
                } catch {
                  toast.error("Failed to delete appointment")
                }
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ]
  }, [updateAppointment, deleteAppointment])

  const table = useReactTable({
    data: tableData,
    columns: allColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id.toString(),
  })

  if (isLoading) return <div>Loading appointments...</div>

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium">Patient Name</label>
          <Input
            placeholder="Filter by patient"
            value={filters.patientName}
            onChange={(e) => setFilters({ ...filters, patientName: e.target.value })}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Doctor Name</label>
          <Input
            placeholder="Filter by doctor"
            value={filters.doctorName}
            onChange={(e) => setFilters({ ...filters, doctorName: e.target.value })}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Status</label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) =>
              setFilters({ ...filters, status: value === "all" ? "" : value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Not Started">Not Started</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Department</label>
          <Select
            value={filters.departmentId || "all"}
            onValueChange={(value) =>
              setFilters({ ...filters, departmentId: value === "all" ? "" : value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {Object.entries(departmentMap).map(([id, name]) => (
                <SelectItem key={id} value={id}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={allColumns.length} className="text-center py-4">
                  No appointments found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
