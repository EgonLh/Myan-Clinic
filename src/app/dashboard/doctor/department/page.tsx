import { Sidebar } from "@/components/doctors/siderbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Building2, Users, UserCheck, Activity } from "lucide-react"

const departments = [
  {
    id: "1",
    name: "Cardiology",
    head: "Dr. Michael Chen",
    staff: 12,
    patients: 45,
    status: "active",
    location: "Building A, Floor 3",
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Emergency Medicine",
    head: "Dr. Sarah Johnson",
    staff: 18,
    patients: 78,
    status: "active",
    location: "Building B, Ground Floor",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    name: "Pediatrics",
    head: "Dr. Emily Rodriguez",
    staff: 8,
    patients: 32,
    status: "active",
    location: "Building C, Floor 2",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    name: "Orthopedics",
    head: "Dr. James Wilson",
    staff: 10,
    patients: 28,
    status: "maintenance",
    location: "Building A, Floor 2",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "5",
    name: "Neurology",
    head: "Dr. Lisa Thompson",
    staff: 6,
    patients: 19,
    status: "active",
    location: "Building B, Floor 4",
    phone: "+1 (555) 567-8901",
  },
  {
    id: "6",
    name: "Radiology",
    head: "Dr. Robert Kim",
    staff: 14,
    patients: 56,
    status: "active",
    location: "Building C, Basement",
    phone: "+1 (555) 678-9012",
  },
]

export default function DepartmentsPage() {
  const totalStaff = departments.reduce((sum, dept) => sum + dept.staff, 0)
  const totalPatients = departments.reduce((sum, dept) => sum + dept.patients, 0)
  const activeDepartments = departments.filter((dept) => dept.status === "active").length

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Departments</h1>
              <p className="text-muted-foreground">Manage hospital departments and staff</p>
            </div>
            <Button className="w-fit">
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Departments</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{departments.length}</div>
                <p className="text-xs text-muted-foreground">{activeDepartments} active</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStaff}</div>
                <p className="text-xs text-muted-foreground">Across all departments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPatients}</div>
                <p className="text-xs text-muted-foreground">Currently admitted</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Department Directory</CardTitle>
              <CardDescription>View and manage all hospital departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search departments..." className="pl-10" />
                </div>
              </div>

              {/* Departments Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Department Head</TableHead>
                      <TableHead>Staff Count</TableHead>
                      <TableHead>Patients</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departments.map((department) => (
                      <TableRow key={department.id}>
                        <TableCell className="font-medium">{department.name}</TableCell>
                        <TableCell>{department.head}</TableCell>
                        <TableCell>{department.staff}</TableCell>
                        <TableCell>{department.patients}</TableCell>
                        <TableCell>{department.location}</TableCell>
                        <TableCell>{department.phone}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              department.status === "active"
                                ? "default"
                                : department.status === "maintenance"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {department.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
