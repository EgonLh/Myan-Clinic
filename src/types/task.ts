export interface Task {
  id: string
  title: string
  description?: string
  time: string
  date: string
  type: "appointment" | "surgery" | "meeting" | "review"
  priority: "low" | "medium" | "high"
  status: "pending" | "in-progress" | "completed" | "cancelled"
  patient?: string
  createdAt: Date
  updatedAt: Date
}
