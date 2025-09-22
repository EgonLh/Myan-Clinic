"use client"

import { Sidebar } from "@/components/doctors/siderbar"
import { Calendar } from "@/components/doctors/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, AlertTriangle, CheckCircle, Plus, Download } from "lucide-react"
import { useTasks } from "@/hooks/use-tasks"
import { useState } from "react"
import { TaskForm } from "@/components/doctors/task-form"

export default function TasksPage() {
  const { getTaskStats, exportTasksAsJSON } = useTasks() // Added exportTasksAsJSON function
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const stats = getTaskStats()

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <Sidebar />

        <main className="flex-1 md:ml-64">
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Tasks & Schedule</h1>
                <p className="text-muted-foreground">Manage your daily tasks and appointments</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={exportTasksAsJSON}>
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
                <Button className="w-fit" onClick={() => setIsTaskFormOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Task
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.today}</div>
                  <p className="text-xs text-muted-foreground">{stats.todayCompleted} completed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pending}</div>
                  <p className="text-xs text-muted-foreground">Awaiting completion</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{stats.highPriority}</div>
                  <p className="text-xs text-muted-foreground">Urgent attention needed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
                  <p className="text-xs text-muted-foreground">Total completed tasks</p>
                </CardContent>
              </Card>
            </div>

            {/* Calendar Component */}
            <Calendar />
          </div>
        </main>
      </div>

      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => setIsTaskFormOpen(false)}
        onSubmit={() => {}} // This will be handled by the useTasks hook in the form
      />
    </>
  )
}
