"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2, Clock, CheckCircle } from "lucide-react"
import { TaskForm } from "./task-form"
import { useTasks } from "@/hooks/use-tasks"
import type { Task } from "@/types/task"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
  dateString: string
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function Calendar() {
  const { tasks, addTask, updateTask, deleteTask, getTasksByDate } = useTasks()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const today = new Date().toISOString().split("T")[0]

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const calendarDays: CalendarDay[] = []

  // Previous month days
  const prevMonth = new Date(year, month - 1, 0)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = prevMonth.getDate() - i
    const prevMonthYear = month === 0 ? year - 1 : year
    const prevMonthIndex = month === 0 ? 11 : month - 1
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      dateString: `${prevMonthYear}-${String(prevMonthIndex + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`,
    })
  }

  // Current month days
  for (let date = 1; date <= daysInMonth; date++) {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
    const isToday = dateString === today

    calendarDays.push({
      date,
      isCurrentMonth: true,
      isToday,
      dateString,
    })
  }

  // Next month days
  const remainingDays = 42 - calendarDays.length
  const nextMonthYear = month === 11 ? year + 1 : year
  const nextMonthIndex = month === 11 ? 0 : month + 1
  for (let date = 1; date <= remainingDays; date++) {
    calendarDays.push({
      date,
      isCurrentMonth: false,
      isToday: false,
      dateString: `${nextMonthYear}-${String(nextMonthIndex + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`,
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getTaskTypeColor = (type: Task["type"]) => {
    switch (type) {
      case "appointment":
        return "bg-blue-500"
      case "surgery":
        return "bg-red-500"
      case "meeting":
        return "bg-green-500"
      case "review":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "border-red-500"
      case "medium":
        return "border-yellow-500"
      case "low":
        return "border-green-500"
      default:
        return "border-gray-500"
    }
  }

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const selectedTasks = selectedDate ? getTasksByDate(selectedDate) : []

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    addTask(taskData)
  }

  const handleUpdateTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
      setEditingTask(null)
    }
  }

  const handleDeleteTask = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete)
      setTaskToDelete(null)
    }
  }

  const openTaskForm = (date?: string) => {
    setSelectedDate(date || selectedDate)
    setIsTaskFormOpen(true)
  }

  const openEditForm = (task: Task) => {
    setEditingTask(task)
    setIsTaskFormOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {months[month]} {year}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekdays.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const dayTasks = getTasksByDate(day.dateString)
                  const isSelected = selectedDate === day.dateString

                  return (
                    <div
                      key={index}
                      className={cn(
                        "min-h-[80px] p-1 border rounded-lg cursor-pointer transition-colors relative",
                        day.isCurrentMonth ? "bg-card hover:bg-accent" : "bg-muted/50 text-muted-foreground",
                        day.isToday && "bg-primary/10 border-primary",
                        isSelected && "bg-accent border-accent-foreground",
                      )}
                      onClick={() => setSelectedDate(day.dateString)}
                      onDoubleClick={() => openTaskForm(day.dateString)}
                    >
                      <div className="text-sm font-medium mb-1">{day.date}</div>
                      <div className="space-y-1">
                        {dayTasks.slice(0, 2).map((task) => (
                          <div
                            key={task.id}
                            className={cn(
                              "text-xs p-1 rounded text-white truncate flex items-center gap-1",
                              getTaskTypeColor(task.type),
                              task.status === "completed" && "opacity-60 line-through",
                            )}
                          >
                            {getStatusIcon(task.status)}
                            <span>
                              {task.time} {task.title}
                            </span>
                          </div>
                        ))}
                        {dayTasks.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{dayTasks.length - 2} more</div>
                        )}
                      </div>
                      {day.isCurrentMonth && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            openTaskForm(day.dateString)
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Details Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{selectedDate ? `Tasks for ${selectedDate}` : "Select a date"}</CardTitle>
                <Button size="sm" onClick={() => openTaskForm()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedTasks.length > 0 ? (
                <div className="space-y-3">
                  {selectedTasks
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "p-3 rounded-lg border-l-4 bg-card",
                          getPriorityColor(task.priority),
                          task.status === "completed" && "opacity-60",
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className={cn("font-medium", task.status === "completed" && "line-through")}>
                              {task.title}
                            </h4>
                            {getStatusIcon(task.status)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {task.priority}
                            </Badge>
                            <Button size="sm" variant="ghost" onClick={() => openEditForm(task)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setTaskToDelete(task.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Time: {task.time}</p>
                          <p>Type: {task.type}</p>
                          <p>Status: {task.status}</p>
                          {task.patient && <p>Patient: {task.patient}</p>}
                          {task.description && <p>Description: {task.description}</p>}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    {selectedDate ? "No tasks scheduled for this date" : "Select a date to view tasks"}
                  </p>
                  {selectedDate && (
                    <Button onClick={() => openTaskForm()}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Task
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Task Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Task Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm">Appointments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm">Surgery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Meetings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-sm">Reviews</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Task Form Dialog */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => {
          setIsTaskFormOpen(false)
          setEditingTask(null)
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialTask={editingTask || undefined}
        selectedDate={selectedDate || undefined}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!taskToDelete} onOpenChange={() => setTaskToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
