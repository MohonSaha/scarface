// "use client"

// import { useState, useEffect } from "react"
// import { format } from "date-fns"
// import { Plus } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { TaskForm } from "@/components/task-form"
// import { TasksList } from "@/components/tasks-list"
// import type { Task } from "@/types/task"

// export default function DashboardPage() {
//   const [tasks, setTasks] = useState<Task[]>([])
//   const [showTaskForm, setShowTaskForm] = useState(false)

//   // Mock data for demonstration - spread across different hours
//   useEffect(() => {
//     // Get current date
//     const today = new Date()

//     const mockTasks: Task[] = [
//       {
//         id: "1",
//         title: "Morning Workout",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0),
//         completed: true,
//       },
//       {
//         id: "2",
//         title: "Team Meeting",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
//         completed: false,
//       },
//       {
//         id: "3",
//         title: "Project Planning",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
//         completed: false,
//       },
//       {
//         id: "4",
//         title: "Lunch Break",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
//         completed: true,
//       },
//       {
//         id: "5",
//         title: "Client Call",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
//         completed: false,
//       },
//       {
//         id: "6",
//         title: "Development Work",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0),
//         completed: false,
//       },
//       {
//         id: "7",
//         title: "Evening Gym",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0),
//         completed: false,
//       },
//       {
//         id: "8",
//         title: "Dinner",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21, 0),
//         completed: false,
//       },
//       {
//         id: "9",
//         title: "Reading",
//         startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22, 0),
//         endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 0),
//         completed: false,
//       },
//     ]
//     setTasks(mockTasks)
//   }, [])

//   const addTask = (task: Task) => {
//     setTasks([...tasks, task])
//     setShowTaskForm(false)
//   }

//   const updateTaskStatus = (taskId: string, completed: boolean) => {
//     setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed } : task)))
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//           <p className="text-muted-foreground">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
//         </div>
//         <Button onClick={() => setShowTaskForm(true)} className="flex items-center gap-2">
//           <Plus className="h-4 w-4" />
//           Add New Task
//         </Button>
//       </div>

//       <div className="mt-8">
//         <TasksList tasks={tasks} onUpdateTaskStatus={updateTaskStatus} />
//       </div>

//       {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} onAddTask={addTask} />}
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskForm } from "@/components/task-form"
import { TasksList } from "@/components/tasks-list"
import type { Task } from "@/types/task"

export default function DashboardPage() {
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))

  const handleAddTask = (task: Task) => {
    setShowTaskForm(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">{format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}</p>
        </div>
        <Button onClick={() => setShowTaskForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Task
        </Button>
      </div>

      <div className="mt-8">
        <TasksList date={new Date(selectedDate)} />
      </div>

      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onAddTask={handleAddTask}
          initialDate={new Date(selectedDate)}
        />
      )}
    </div>
  )
}


