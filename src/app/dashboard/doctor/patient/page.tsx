import { Sidebar } from "@/components/doctors/siderbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Users, UserPlus, Heart, AlertTriangle } from "lucide-react"

const patients = [
  {
    id: "1",
    name: "John Smith",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    condition: "Hypertension",
    status: "stable",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-20",
    room: "A-201",
  },
  {
    id: "2",
    name: "Emily Davis",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 234-5678",
    email: "emily.davis@email.com",
    condition: "Diabetes Type 2",
    status: "monitoring",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-18",
    room: "B-105",
  },
  {
    id: "3",
    name: "Michael Brown",
    age: 67,
    gender: "Male",
    phone: "+1 (555) 345-6789",
    email: "michael.brown@email.com",
    condition: "Heart Disease",
    status: "critical",
    lastVisit: "2024-01-14",
    nextAppointment: "2024-01-16",
    room: "ICU-3",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 456-7890",
    email: "sarah.wilson@email.com",
    condition: "Pregnancy",
    status: "stable",
    lastVisit: "2024-01-13",
    nextAppointment: "2024-01-27",
    room: "C-302",
  },
  {
    id: "5",
    name: "Robert Johnson",
    age: 55,
    gender: "Male",
    phone: "+1 (555) 567-8901",
    email: "robert.johnson@email.com",
    condition: "Arthritis",
    status: "stable",
    lastVisit: "2024-01-11",
    nextAppointment: "2024-01-25",
    room: "A-150",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    age: 41,
    gender: "Female",
    phone: "+1 (555) 678-9012",
    email: "lisa.anderson@email.com",
    condition: "Migraine",
    status: "recovering",
    lastVisit: "2024-01-09",
    nextAppointment: "2024-01-22",
    room: "B-220",
  },
]

export default function PatientsPage() {
  const totalPatients = patients.length
  const criticalPatients = patients.filter((p) => p.status === "critical").length
  const stablePatients = patients.filter((p) => p.status === "stable").length
  const monitoringPatients = patients.filter((p) => p.status === "monitoring").length

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Patients</h1>
              <p className="text-muted-foreground">Manage patient records and information</p>
            </div>
            <Button className="w-fit">
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPatients}</div>
                <p className="text-xs text-muted-foreground">Active records</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{criticalPatients}</div>
                <p className="text-xs text-muted-foreground">Require immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stable</CardTitle>
                <Heart className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">{stablePatients}</div>
                <p className="text-xs text-muted-foreground">Good condition</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monitoring</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{monitoringPatients}</div>
                <p className="text-xs text-muted-foreground">Under observation</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>View and manage all patient information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search patients..." className="pl-10" />
                </div>
              </div>

              {/* Patients Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Visit</TableHead>
                      <TableHead>Next Appointment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.name}</TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>{patient.room}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              patient.status === "stable"
                                ? "default"
                                : patient.status === "critical"
                                  ? "destructive"
                                  : patient.status === "monitoring"
                                    ? "secondary"
                                    : "outline"
                            }
                          >
                            {patient.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{patient.nextAppointment}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
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
