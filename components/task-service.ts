/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Task } from "../types/task"


// // Fetch all tasks
// export async function fetchTasks(): Promise<Task[]> {
//   const response = await fetch("/api/tasks")

//   if (!response.ok) {
//     throw new Error("Failed to fetch tasks")
//   }

//   const data = await response.json()

//   // Convert string dates to Date objects
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return data.map((task: any) => ({
//     ...task,
//     id: task._id,
//     startTime: new Date(task.startTime),
//     endTime: new Date(task.endTime),
//   }))
// }

// // Create a new task
// export async function createTask(task: Omit<Task, "id">): Promise<Task> {
//   const response = await fetch("/api/tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(task),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to create task")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     id: data._id,
//     startTime: new Date(data.startTime),
//     endTime: new Date(data.endTime),
//   }
// }

// // Update a task
// export async function updateTask(task: Task): Promise<void> {
//   const response = await fetch(`/api/tasks/${task.id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       ...task,
//       _id: task.id,
//     }),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to update task")
//   }
// }

// // Delete a task
// export async function deleteTask(taskId: string): Promise<void> {
//   const response = await fetch(`/api/tasks/${taskId}`, {
//     method: "DELETE",
//   })

//   if (!response.ok) {
//     throw new Error("Failed to delete task")
//   }
// }

// // Update task status (completed or not)
// export async function updateTaskStatus(taskId: string, completed: boolean): Promise<void> {
//   const response = await fetch(`/api/tasks/${taskId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ completed }),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to update task status")
//   }
// }


// import type { Task, DailyTask, TaskStatus } from "@/types/task"
// import { Task, DailyTask, TaskStatus } from "@/app/types/types"
// import { format } from "date-fns"

// // Fetch all tasks
// export async function fetchTasks(): Promise<Task[]> {
//   const response = await fetch("/api/tasks")

//   if (!response.ok) {
//     throw new Error("Failed to fetch tasks")
//   }

//   const data = await response.json()

//   // Convert string dates to Date objects
//   return data.map((task: any) => ({
//     ...task,
//     startTime: new Date(task.startTime),
//     endTime: new Date(task.endTime),
//   }))
// }

// // Fetch all daily tasks with optional filters
// export async function fetchDailyTasks(date?: string, status?: TaskStatus, categoryId?: string): Promise<DailyTask[]> {
//   let url = "/api/daily-tasks"
//   const params = new URLSearchParams()

//   if (date) params.append("date", date)
//   if (status) params.append("status", status)
//   if (categoryId) params.append("categoryId", categoryId)

//   if (params.toString()) {
//     url += `?${params.toString()}`
//   }

//   const response = await fetch(url)

//   if (!response.ok) {
//     throw new Error("Failed to fetch tasks")
//   }

//   const data = await response.json()

//   // Convert string dates to Date objects
//   return data.map((task: any) => ({
//     ...task,
//     startTime: new Date(task.startTime),
//     endTime: new Date(task.endTime),
//     createdAt: new Date(task.createdAt),
//     updatedAt: new Date(task.updatedAt),
//   }))
// }

// // Create a new daily task
// export async function createDailyTask(task: Omit<DailyTask, "id" | "createdAt" | "updatedAt">): Promise<DailyTask> {
//   const response = await fetch("/api/daily-tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(task),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to create task")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     startTime: new Date(data.startTime),
//     endTime: new Date(data.endTime),
//     createdAt: new Date(data.createdAt),
//     updatedAt: new Date(data.updatedAt),
//   }
// }

// // Update a daily task
// export async function updateDailyTask(
//   id: string,
//   updates: Partial<Omit<DailyTask, "id" | "createdAt" | "updatedAt">>,
// ): Promise<DailyTask> {
//   const response = await fetch(`/api/daily-tasks/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updates),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to update task")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     startTime: new Date(data.startTime),
//     endTime: new Date(data.endTime),
//     createdAt: new Date(data.createdAt),
//     updatedAt: new Date(data.updatedAt),
//   }
// }

// // Delete a daily task
// export async function deleteDailyTask(id: string): Promise<void> {
//   const response = await fetch(`/api/daily-tasks/${id}`, {
//     method: "DELETE",
//   })

//   if (!response.ok) {
//     throw new Error("Failed to delete task")
//   }
// }

// // Update multiple tasks' status
// export async function updateTasksStatus(taskIds: string[], status: TaskStatus): Promise<void> {
//   const response = await fetch(`/api/daily-tasks`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ taskIds, status }),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to update tasks status")
//   }
// }

// // Get daily statistics
// export async function fetchDailyStatistics(date: string) {
//   const response = await fetch(`/api/daily-tasks?date=${date}`, {
//     method: "PATCH",
//   })

//   if (!response.ok) {
//     throw new Error("Failed to fetch statistics")
//   }

//   return await response.json()
// }

// // Convert legacy Task to DailyTask format
// export function convertToNewTaskFormat(task: Task): Omit<DailyTask, "id" | "createdAt" | "updatedAt"> {
//   return {
//     title: task.title,
//     date: format(task.startTime, "yyyy-MM-dd"),
//     startTime: task.startTime,
//     endTime: task.endTime,
//     status: task.completed ? "completed" : "scheduled",
//     categoryId: task.categoryId,
//     notes: "",
//   }
// }

// // Convert DailyTask to legacy Task format (for backward compatibility)
// export function convertToLegacyTaskFormat(task: DailyTask): Task {
//   return {
//     id: task.id,
//     title: task.title,
//     startTime: task.startTime,
//     endTime: task.endTime,
//     completed: task.status === "completed",
//     categoryId: task.categoryId,
//     categoryName: task.category?.name,
//     categoryColor: task.category?.color,
//     status: task.status,
//     notes: task.notes,
//   }
// }





// // import type { Task, DailyTask, TaskStatus } from "@/types/task"
// import { Task, DailyTask, TaskStatus} from "@/app/types/types"
// import { format } from "date-fns"

// // Fetch all tasks
// export async function fetchTasks(): Promise<Task[]> {
//   const response = await fetch("/api/tasks")

//   if (!response.ok) {
//     throw new Error("Failed to fetch tasks")
//   }

//   const data = await response.json()

//   // Convert string dates to Date objects
//   return data.map((task: any) => ({
//     ...task,
//     startTime: new Date(task.startTime),
//     endTime: new Date(task.endTime),
//   }))
// }

// // Fetch all daily tasks with optional filters
// export async function fetchDailyTasks(date?: string, status?: TaskStatus, categoryId?: string): Promise<DailyTask[]> {
//   let url = "/api/daily-tasks"
//   const params = new URLSearchParams()

//   if (date) params.append("date", date)
//   if (status) params.append("status", status)
//   if (categoryId) params.append("categoryId", categoryId)

//   if (params.toString()) {
//     url += `?${params.toString()}`
//   }

//   const response = await fetch(url)

//   if (!response.ok) {
//     throw new Error("Failed to fetch tasks")
//   }

//   const data = await response.json()

//   // Convert string dates to Date objects and ensure status is of type TaskStatus
//   return data.map((task: any) => ({
//     ...task,
//     startTime: new Date(task.startTime),
//     endTime: new Date(task.endTime),
//     createdAt: new Date(task.createdAt),
//     updatedAt: new Date(task.updatedAt),
//     status: task.status as TaskStatus, // Explicitly cast to TaskStatus
//     categoryId: task.categoryId || undefined, // Convert null to undefined
//     notes: task.notes || undefined, // Convert null to undefined
//   }))
// }

// // Create a new daily task
// export async function createDailyTask(task: Omit<DailyTask, "id" | "createdAt" | "updatedAt">): Promise<DailyTask> {
//   const response = await fetch("/api/daily-tasks", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(task),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to create task")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     startTime: new Date(data.startTime),
//     endTime: new Date(data.endTime),
//     createdAt: new Date(data.createdAt),
//     updatedAt: new Date(data.updatedAt),
//   }
// }

// // Update a daily task
// export async function updateDailyTask(
//   id: string,
//   updates: Partial<Omit<DailyTask, "id" | "createdAt" | "updatedAt">>,
// ): Promise<DailyTask> {
//   const response = await fetch(`/api/daily-tasks/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updates),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to update task")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     startTime: new Date(data.startTime),
//     endTime: new Date(data.endTime),
//     createdAt: new Date(data.createdAt),
//     updatedAt: new Date(data.updatedAt),
//   }
// }

// // Delete a daily task
// export async function deleteDailyTask(id: string): Promise<void> {
//   const response = await fetch(`/api/daily-tasks/${id}`, {
//     method: "DELETE",
//   })

//   if (!response.ok) {
//     throw new Error("Failed to delete task")
//   }
// }

// // Update multiple tasks' status
// export async function updateTasksStatus(taskIds: string[], status: TaskStatus): Promise<void> {
//   const response = await fetch(`/api/daily-tasks`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ taskIds, status }),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to update tasks status")
//   }
// }

// // Get daily statistics
// export async function fetchDailyStatistics(date: string) {
//   const response = await fetch(`/api/daily-tasks?date=${date}`, {
//     method: "PATCH",
//   })

//   if (!response.ok) {
//     throw new Error("Failed to fetch statistics")
//   }

//   return await response.json()
// }

// // Convert legacy Task to DailyTask format
// export function convertToNewTaskFormat(task: Task): Omit<DailyTask, "id" | "createdAt" | "updatedAt"> {
//   return {
//     title: task.title,
//     date: format(task.startTime, "yyyy-MM-dd"),
//     startTime: task.startTime,
//     endTime: task.endTime,
//     status: task.completed ? "completed" : "scheduled",
//     categoryId: task.categoryId,
//     notes: "",
//   }
// }

// // Convert DailyTask to legacy Task format (for backward compatibility)
// export function convertToLegacyTaskFormat(task: DailyTask): Task {
//   return {
//     id: task.id,
//     title: task.title,
//     startTime: task.startTime,
//     endTime: task.endTime,
//     completed: task.status === "completed",
//     categoryId: task.categoryId,
//     categoryName: task.category?.name,
//     categoryColor: task.category?.color,
//     status: task.status,
//     notes: task.notes,
//   }
// }


// import type { Task, DailyTask, TaskStatus } from "@/types/task"
import { DailyTask, Task, TaskStatus } from "@/app/types/types"
import { format } from "date-fns"

// Fetch all tasks
export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks")

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  const data = await response.json()

  // Convert string dates to Date objects
  return data.map((task: any) => ({
    ...task,
    startTime: new Date(task.startTime),
    endTime: new Date(task.endTime),
  }))
}

// Fetch all daily tasks with optional filters
export async function fetchDailyTasks(date?: string, status?: TaskStatus, categoryId?: string): Promise<DailyTask[]> {
  let url = "/api/daily-tasks"
  const params = new URLSearchParams()

  if (date) params.append("date", date)
  if (status) params.append("status", status)
  if (categoryId) params.append("categoryId", categoryId)

  if (params.toString()) {
    url += `?${params.toString()}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  const data = await response.json()

  // Convert string dates to Date objects and ensure status is of type TaskStatus
  return data.map((task: any) => ({
    ...task,
    startTime: new Date(task.startTime),
    endTime: new Date(task.endTime),
    createdAt: new Date(task.createdAt),
    updatedAt: new Date(task.updatedAt),
    status: task.status as TaskStatus, // Explicitly cast to TaskStatus
    categoryId: task.categoryId || undefined, // Convert null to undefined
    notes: task.notes || undefined, // Convert null to undefined
  }))
}

// Create a new daily task
export async function createDailyTask(task: Omit<DailyTask, "id" | "createdAt" | "updatedAt">): Promise<DailyTask> {
  const response = await fetch("/api/daily-tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })

  if (!response.ok) {
    throw new Error("Failed to create task")
  }

  const data = await response.json()

  return {
    ...data,
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}

// Update a daily task
export async function updateDailyTask(
  id: string,
  updates: Partial<Omit<DailyTask, "id" | "createdAt" | "updatedAt">>,
): Promise<DailyTask> {
  const response = await fetch(`/api/daily-tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    throw new Error("Failed to update task")
  }

  const data = await response.json()

  // After updating a task, update the progress
  try {
    await updateProgress()
  } catch (error) {
    console.error("Failed to update progress after task update:", error)
  }

  return {
    ...data,
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}

// Delete a daily task
export async function deleteDailyTask(id: string): Promise<void> {
  const response = await fetch(`/api/daily-tasks/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete task")
  }

  // After deleting a task, update the progress
  try {
    await updateProgress()
  } catch (error) {
    console.error("Failed to update progress after task deletion:", error)
  }
}

// Update multiple tasks' status
export async function updateTasksStatus(taskIds: string[], status: TaskStatus): Promise<void> {
  const response = await fetch(`/api/daily-tasks`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskIds, status }),
  })

  if (!response.ok) {
    throw new Error("Failed to update tasks status")
  }

  // After updating tasks, update the progress
  try {
    await updateProgress()
  } catch (error) {
    console.error("Failed to update progress after tasks update:", error)
  }
}

// Get daily statistics
export async function fetchDailyStatistics(date: string) {
  const response = await fetch(`/api/daily-tasks?date=${date}`, {
    method: "PATCH",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch statistics")
  }

  return await response.json()
}

// Update progress after task changes
export async function updateProgress(): Promise<void> {
  const date = format(new Date(), "yyyy-MM-dd")

  try {
    await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    })
  } catch (error) {
    console.error("Failed to update progress:", error)
  }
}

// Convert legacy Task to DailyTask format
export function convertToNewTaskFormat(task: Task): Omit<DailyTask, "id" | "createdAt" | "updatedAt"> {
  return {
    title: task.title,
    date: format(task.startTime, "yyyy-MM-dd"),
    startTime: task.startTime,
    endTime: task.endTime,
    status: task.completed ? "completed" : "scheduled",
    categoryId: task.categoryId,
    notes: "",
  }
}

// Convert DailyTask to legacy Task format (for backward compatibility)
export function convertToLegacyTaskFormat(task: DailyTask): Task {
  return {
    id: task.id,
    title: task.title,
    startTime: task.startTime,
    endTime: task.endTime,
    completed: task.status === "completed",
    categoryId: task.categoryId,
    categoryName: task.category?.name,
    categoryColor: task.category?.color,
    status: task.status,
    notes: task.notes,
  }
}


