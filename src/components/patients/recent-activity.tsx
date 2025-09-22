"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, FileText, Calendar, Pill, Heart } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "medication",
    title: "Medication taken",
    description: "Lisinopril 10mg",
    time: "2 hours ago",
    icon: Pill,
    status: "completed",
  },
  {
    id: 2,
    type: "appointment",
    title: "Appointment scheduled",
    description: "Dr. Smith - Cardiology",
    time: "1 day ago",
    icon: Calendar,
    status: "scheduled",
  },
  {
    id: 3,
    type: "vitals",
    title: "Vitals recorded",
    description: "Blood pressure: 120/80",
    time: "2 days ago",
    icon: Heart,
    status: "normal",
  },
  {
    id: 4,
    type: "report",
    title: "Lab results available",
    description: "Blood work - All normal",
    time: "3 days ago",
    icon: FileText,
    status: "available",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
