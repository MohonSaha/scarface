import { Task } from "../types/task"


// Fetch all tasks
export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks")

  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }

  const data = await response.json()

  // Convert string dates to Date objects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((task: any) => ({
    ...task,
    id: task._id,
    startTime: new Date(task.startTime),
    endTime: new Date(task.endTime),
  }))
}

// Create a new task
export async function createTask(task: Omit<Task, "id">): Promise<Task> {
  const response = await fetch("/api/tasks", {
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
    id: data._id,
    startTime: new Date(data.startTime),
    endTime: new Date(data.endTime),
  }
}

// Update a task
export async function updateTask(task: Task): Promise<void> {
  const response = await fetch(`/api/tasks/${task.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...task,
      _id: task.id,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to update task")
  }
}

// Delete a task
export async function deleteTask(taskId: string): Promise<void> {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete task")
  }
}

// Update task status (completed or not)
export async function updateTaskStatus(taskId: string, completed: boolean): Promise<void> {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  })

  if (!response.ok) {
    throw new Error("Failed to update task status")
  }
}

