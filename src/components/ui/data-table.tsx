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
import { z } from "zod"
import { toast } from "sonner"
import LoadingPills from "./loading"

export const appointmentSchema = z.object({
  id: z.number(),
  patientName: z.string(),
  doctorName: z.string(),
  doctorDepartment: z.string(),
  doctorType: z.string(),
  date: z.string(),
  status: z.string(),
  notes: z.string().nullable(),
})

const columns: ColumnDef<z.infer<typeof appointmentSchema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
  { accessorKey: "doctorType", header: "Doctor Type" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => (
      <Button
        variant="link"
        size="sm"
        onClick={() => toast.success((`Info : ${row?.original?.notes ?? "-"}`))}
      >
        View
      </Button>
    ),
  },
]

export function AppointmentTable() {
  const { data: appointmentsData, isLoading } = useGetAppointmentsQuery()
  const { data: doctorsData } = useGetDoctorsQuery()

  const [filters, setFilters] = React.useState({
    patientName: "",
    doctorName: "",
    status: "",
    departmentId: "",
    doctorType: "",
    date: "",
  })

  // Department mapping (id → name)
  const departmentMap = React.useMemo(() => {
    const map: Record<number, string> = {}
    doctorsData?.forEach((doc) => {
      if (doc.department) map[doc.department.id] = doc.department.name
    })
    return map
  }, [doctorsData])

  // Filtered and mapped appointment data
  const tableData = React.useMemo(() => {
    let data = (appointmentsData ?? []).map((appt) => ({
      id: appt.id,
      patientName: appt.patient?.user?.name ?? "Unknown",
      doctorName: appt.doctor?.user?.name ?? "Unknown",
      doctorDepartment: departmentMap[appt.doctor?.departmentId] ?? "Unknown",
      doctorType: appt.doctor?.type ?? "Unknown",
      date: new Date(appt.date).toLocaleString(),
      status: appt.status,
      notes: appt.notes,
    }))

    // Apply filters
    if (filters.patientName)
      data = data.filter((d) =>
        d.patientName.toLowerCase().includes(filters.patientName.toLowerCase())
      )

    if (filters.doctorName)
      data = data.filter((d) =>
        d.doctorName.toLowerCase().includes(filters.doctorName.toLowerCase())
      )

    if (filters.doctorType)
      data = data.filter(
        (d) => d.doctorType.toLowerCase() === filters.doctorType.toLowerCase()
      )

    if (filters.status)
      data = data.filter((d) => d.status.toLowerCase() === filters.status.toLowerCase())

    if (filters.departmentId)
      data = data.filter(
        (d) =>
          String(Object.keys(departmentMap).find(key => departmentMap[Number(key)] === d.doctorDepartment)) ===
          filters.departmentId
      )

    if (filters.date) {
      const selectedDate = new Date(filters.date).toDateString()
      data = data.filter(
        (d) => new Date(d.date).toDateString() === selectedDate
      )
    }

    return data
  }, [appointmentsData, filters, departmentMap])

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: tableData,
    columns,
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

  if (isLoading) return <LoadingPills message="Loading Appointments..." />

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col w-full border-dashed border p-4 rounded gap-5 shadow-none bg-white">

        {/* --- Appointment Section --- */}
        <div className="flex flex-col gap-4 ">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Input
                className="shadow-none rounded-sm font-mono"
                placeholder="Filter by patient"
                value={filters.patientName}
                onChange={(e) => setFilters({ ...filters, patientName: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <Input
              className="shadow-none rounded-sm font-mono"
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </div>

            <div className="flex flex-col items-start md:items-end  w-full">
              <Select
                value={filters.status || "all"}
                onValueChange={(value) =>
                  setFilters({ ...filters, status: value === "all" ? "" : value })
                }
              >
                <SelectTrigger className="shadow-none font-mono">
                  <SelectValue placeholder="Filter by status"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Status</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {/* --- Doctor Section --- */}
        <div className="flex flex-col gap-4 ">
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Input
              className="shadow-none rounded-sm font-mono"
                placeholder="Filter by doctor"
                value={filters.doctorName}
                onChange={(e) => setFilters({ ...filters, doctorName: e.target.value })}
              />
            </div>

            <div className="flex w-full items-center md:justify-end justify-center ">
              <div className="flex flex-col me-3">
                <Select
                  
                  value={filters.doctorType || "all"}
                  onValueChange={(value) =>
                    setFilters({ ...filters, doctorType: value === "all" ? "" : value })
                  }
                >
                  <SelectTrigger className="shadow-none font-mono">
                    <SelectValue placeholder="Filter by doctor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Dr's Type</SelectItem>
                    <SelectItem value="generalist">Generalist</SelectItem>
                    <SelectItem value="specialist">Specialist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Select
                  value={filters.departmentId || "all"}
                  onValueChange={(value) =>
                    setFilters({ ...filters, departmentId: value === "all" ? "" : value })
                  }
                >
                  <SelectTrigger className="shadow-none font-mono">
                    <SelectValue  placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Dr's Department</SelectItem>
                    {Object.entries(departmentMap).map(([id, name]) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>


          </div>
        </div>

      </div>




      {/* Table */}
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-mono text-slate-600">
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
                    <TableCell key={cell.id} className="my-2  text-xs text-slate-600 hover:text-slate-800 hover:font-semibold font-mono">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">
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
