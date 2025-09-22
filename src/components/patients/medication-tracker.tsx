"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Pill, Clock, CheckCircle2 } from "lucide-react"

const medications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    nextDose: "2 hours",
    adherence: 95,
    status: "due-soon",
    instructions: "Take with food",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    nextDose: "6 hours",
    adherence: 88,
    status: "scheduled",
    instructions: "Take with meals",
  },
  {
    id: 3,
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "Daily",
    nextDose: "Tomorrow",
    adherence: 92,
    status: "completed",
    instructions: "Take with breakfast",
  },
]

export function MedicationTracker() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5" />
            Medication Tracker
          </CardTitle>
          <CardDescription>Track your medications and maintain adherence</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medications.map((medication) => (
              <Card key={medication.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">
                          {medication.name} {medication.dosage}
                        </h3>
                        <Badge
                          variant={
                            medication.status === "due-soon"
                              ? "destructive"
                              : medication.status === "completed"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {medication.status === "due-soon"
                            ? "Due Soon"
                            : medication.status === "completed"
                              ? "Completed"
                              : "Scheduled"}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          {medication.frequency} • {medication.instructions}
                        </p>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Next dose in {medication.nextDose}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Adherence Rate</span>
                          <span className="font-medium">{medication.adherence}%</span>
                        </div>
                        <Progress value={medication.adherence} className="h-2" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {medication.status === "due-soon" && (
                        <Button size="sm">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Mark Taken
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6">
            <Button className="w-full md:w-auto">
              <Pill className="w-4 h-4 mr-2" />
              Add New Medication
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
