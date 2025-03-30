export interface Task {
  id: string
  title: string
  startTime: Date
  endTime: Date
  completed: boolean
  categoryId?: string
  categoryName?: string
  categoryColor?: string
  status?: string
  notes?: string
}

export type TaskStatus = "scheduled" | "in_progress" | "completed" | "failed"

export interface DailyTask {
  id: string
  title: string
  date: string
  startTime: Date
  endTime: Date
  status: TaskStatus
  categoryId?: string
  category?: {
    id: string
    name: string
    color?: string
  }
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  color: string
  score?: number
}

