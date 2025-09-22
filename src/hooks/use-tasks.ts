"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/types/task"

const STORAGE_KEY = "doctor-dashboard-tasks"

// Initial sample data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Patient Consultation",
    description: "Regular checkup and consultation",
    time: "09:00",
    date: "2024-01-15",
    type: "appointment",
    priority: "medium",
    status: "pending",
    patient: "John Smith",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Surgery Review",
    description: "Post-operative review and assessment",
    time: "14:00",
    date: "2024-01-15",
    type: "review",
    priority: "high",
    status: "pending",
    patient: "Emily Davis",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Team Meeting",
    description: "Weekly department meeting",
    time: "10:00",
    date: "2024-01-16",
    type: "meeting",
    priority: "low",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Emergency Surgery",
    description: "Urgent surgical procedure",
    time: "15:30",
    date: "2024-01-16",
    type: "surgery",
    priority: "high",
    status: "completed",
    patient: "Michael Brown",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Follow-up Appointment",
    description: "Follow-up consultation",
    time: "11:00",
    date: "2024-01-17",
    type: "appointment",
    priority: "medium",
    status: "pending",
    patient: "Sarah Wilson",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedTasks = JSON.parse(stored).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }))
        setTasks(parsedTasks)
      } else {
        // Initialize with sample data
        setTasks(initialTasks)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks))
      }
    } catch (error) {
      console.error("Error loading tasks:", error)
      setTasks(initialTasks)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    }
  }, [tasks, isLoading])

  const addTask = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setTasks((prev) => [...prev, newTask])
    return newTask
  }

  const updateTask = (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const getTasksByDate = (date: string) => {
    return tasks.filter((task) => task.date === date)
  }

  const getTaskStats = () => {
    const today = new Date().toISOString().split("T")[0]
    const todayTasks = tasks.filter((task) => task.date === today)

    return {
      total: tasks.length,
      today: todayTasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      completed: tasks.filter((task) => task.status === "completed").length,
      highPriority: tasks.filter((task) => task.priority === "high" && task.status !== "completed").length,
      todayCompleted: todayTasks.filter((task) => task.status === "completed").length,
    }
  }

  const exportTasksAsJSON = () => {
    const dataStr = JSON.stringify(tasks, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `doctor-tasks-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    getTasksByDate,
    getTaskStats,
    exportTasksAsJSON, // Added export function to return object
  }
}
