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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import LoadingPills from "@/components/ui/loading"

export default function AppointmentPage() {
  const { data: appointmentsData, isLoading } = useGetAppointmentsQuery()
  const { data: doctorsData } = useGetDoctorsQuery()

  const [filters, setFilters] = React.useState({
    patientName: "",
    doctorName: "",
    doctorType: "",
    status: "",
    departmentId: "",
    date: "",
  })

  // Department mapping
  const departmentMap = React.useMemo(() => {
    const map: Record<number, string> = {}
    doctorsData?.forEach((doc) => {
      if (doc.department) map[doc.department.id] = doc.department.name
    })
    return map
  }, [doctorsData])

  // Table data with filters
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

    if (filters.patientName)
      data = data.filter(d => d.patientName.toLowerCase().includes(filters.patientName.toLowerCase()))
    if (filters.doctorName)
      data = data.filter(d => d.doctorName.toLowerCase().includes(filters.doctorName.toLowerCase()))
    if (filters.doctorType)
      data = data.filter(d => d.doctorType.toLowerCase() === filters.doctorType.toLowerCase())
    if (filters.status)
      data = data.filter(d => d.status.toLowerCase() === filters.status.toLowerCase())
    if (filters.departmentId)
      data = data.filter(
        d => String(Object.keys(departmentMap).find(key => departmentMap[Number(key)] === d.doctorDepartment)) === filters.departmentId
      )
    if (filters.date) {
      const selectedDate = new Date(filters.date).toDateString()
      data = data.filter(d => new Date(d.date).toDateString() === selectedDate)
    }

    return data
  }, [appointmentsData, filters, departmentMap])

  // Table state
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected() ? true : undefined}
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected() ? true : undefined}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      accessorKey: "patientName",
      header: "Patient",
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" size="sm" className="text-left font-mono">
              {row.original.patientName}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-lg p-4 bg-gray-50 font-mono">
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            <div className="mt-2 text-sm font-mono grid grid-cols-2 gap-y-1 gap-x-4">
              <div className="font-semibold">Patient:</div>
              <div>{row.original.patientName}</div>

              <div className="font-semibold">Doctor:</div>
              <div>{row.original.doctorName}</div>

              <div className="font-semibold">Department:</div>
              <div>{row.original.doctorDepartment}</div>

              <div className="font-semibold">Doctor Type:</div>
              <div>{row.original.doctorType}</div>

              <div className="font-semibold">Date:</div>
              <div>{row.original.date}</div>

              <div className="font-semibold">Status:</div>
              <div>{row.original.status}</div>

              <div className="font-semibold">Notes:</div>
              <div>{row.original.notes || "-"}</div>
            </div>
            <div className="mt-4 flex justify-end">
              <DialogClose asChild>
                <Button size="sm" variant="outline">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

      ),
    },
    { accessorKey: "doctorName", header: "Doctor" },
    { accessorKey: "doctorDepartment", header: "Department" },
    { accessorKey: "doctorType", header: "Doctor Type" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "status", header: "Status" },
    {
      accessorKey: "notes", header: "Notes", cell: ({ row }) => (
        <span className="font-mono text-xs">{row.original.notes || "-"}</span>
      )
    },
  ]

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: row => row.id.toString(),
  })

  if (isLoading) return <LoadingPills message="Loading Appointments..." />

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col w-full border-dashed border p-4 rounded gap-5 shadow-none bg-white font-mono">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
          <Input
            placeholder="Filter by patient"
            value={filters.patientName}
            onChange={e => setFilters({ ...filters, patientName: e.target.value })}
            className="shadow-none rounded-sm font-mono"
          />
          <Input
            type="date"
            value={filters.date}
            onChange={e => setFilters({ ...filters, date: e.target.value })}
            className="shadow-none rounded-sm font-mono"
          />
          <Select
            value={filters.status || "all"}
            onValueChange={v => setFilters({ ...filters, status: v === "all" ? "" : v })}
          >
            <SelectTrigger className="shadow-none rounded-sm font-mono">
              <SelectValue placeholder="Status" />
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
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
          <Input
            placeholder="Filter by doctor"
            value={filters.doctorName}
            onChange={e => setFilters({ ...filters, doctorName: e.target.value })}
            className="shadow-none rounded-sm font-mono"
          />
          <Select
            value={filters.doctorType || "all"}
            onValueChange={v => setFilters({ ...filters, doctorType: v === "all" ? "" : v })}
          >
            <SelectTrigger className="shadow-none rounded-sm font-mono">
              <SelectValue placeholder="Doctor Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Dr's Type</SelectItem>
              <SelectItem value="generalist">Generalist</SelectItem>
              <SelectItem value="specialist">Specialist</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.departmentId || "all"}
            onValueChange={v => setFilters({ ...filters, departmentId: v === "all" ? "" : v })}
          >
            <SelectTrigger className="shadow-none rounded-sm font-mono">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Department</SelectItem>
              {Object.entries(departmentMap).map(([id, name]) => (
                <SelectItem key={id} value={id}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="font-mono text-slate-600">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="text-xs text-slate-600 font-mono">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4 font-mono">
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
