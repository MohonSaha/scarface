/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client"

// import { useState, useEffect } from "react"
// import { format } from "date-fns"
// import { Plus } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { TaskForm } from "@/components/task-form"
// import type { Task } from "@/types/task"
// import { TasksList } from "@/components/tasks-list"
// // import { Navbar } from "@/components/navbar"

// export default function HomePage() {
//   const [tasks, setTasks] = useState<Task[]>([])
//   const [currentTime, setCurrentTime] = useState(new Date())
//   const [showTaskForm, setShowTaskForm] = useState(false)

//   // Mock data for demonstration
//   useEffect(() => {
//     const mockTasks: Task[] = [
//       {
//         id: "1",
//         title: "Team Meeting",
//         startTime: new Date(new Date().setHours(8, 0, 0, 0)),
//         endTime: new Date(new Date().setHours(9, 0, 0, 0)),
//         completed: false,
//       },
//       {
//         id: "2",
//         title: "Project Planning",
//         startTime: new Date(new Date().setHours(9, 0, 0, 0)),
//         endTime: new Date(new Date().setHours(10, 0, 0, 0)),
//         completed: false,
//       },
//       {
//         id: "3",
//         title: "Client Call",
//         startTime: new Date(new Date().setHours(10, 0, 0, 0)),
//         endTime: new Date(new Date().setHours(11, 0, 0, 0)),
//         completed: false,
//       },
//       {
//         id: "4",
//         title: "Client Call",
//         startTime: new Date(new Date().setHours(14, 0, 0, 0)),
//         endTime: new Date(new Date().setHours(15, 0, 0, 0)),
//         completed: false,
//       },
//     ]
//     setTasks(mockTasks)
//   }, [])

//   // Update current time every minute
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date())
//     }, 60000) // Update every minute

//     return () => clearInterval(interval)
//   }, [])

//   const addTask = (task: Task) => {
//     setTasks([...tasks, task])
//     setShowTaskForm(false)
//   }

//   const updateTaskStatus = (taskId: string, completed: boolean) => {
//     setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed } : task)))
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* <Navbar /> */}
//       <div className="container mx-auto p-4 max-w-6xl flex-1">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//           <div>
//             <h1 className="text-3xl font-bold">My Daily Planner</h1>
//             <p className="text-muted-foreground">{format(currentTime, "EEEE, MMMM d, yyyy")}</p>
//           </div>
//           <Button onClick={() => setShowTaskForm(true)} className="flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Add New Task
//           </Button>
//         </div>

//         <div className="mt-8">
//           <TasksList tasks={tasks} onUpdateTaskStatus={updateTaskStatus} />
//         </div>

//         {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} onAddTask={addTask} />}
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskForm } from "@/components/task-form"
import { TasksList } from "@/components/tasks-list"
import type { Task } from "@/types/task"
// import { Navbar } from "@/components/navbar"
import { CategoryButton } from "@/components/category-button"
import { GoalButton } from "@/components/goal-button"


export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [weeklyGoals, setWeeklyGoals] = useState<any[]>([])
  const [monthlyGoals, setMonthlyGoals] = useState<any[]>([])
  const [triMonthlyGoals, setTriMonthlyGoals] = useState<any[]>([])

    // Load goals from localStorage
    useEffect(() => {
      const loadGoals = () => {
        const weekly = localStorage.getItem("weeklyGoals")
        const monthly = localStorage.getItem("monthlyGoals")
        const triMonthly = localStorage.getItem("trimonthlyGoals")
  
        setWeeklyGoals(weekly ? JSON.parse(weekly) : [])
        setMonthlyGoals(monthly ? JSON.parse(monthly) : [])
        setTriMonthlyGoals(triMonthly ? JSON.parse(triMonthly) : [])
      }
  
      loadGoals()
  
      // Set up an interval to refresh goals every minute
      const interval = setInterval(loadGoals, 60000)
      return () => clearInterval(interval)
    }, [])

  // Mock data for demonstration - spread across different hours
  useEffect(() => {
    // Get current date
    const today = new Date()

    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Morning Workout",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 0),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0),
        completed: true,
      },
      {
        id: "2",
        title: "Team Meeting",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
        completed: false,
      },
      {
        id: "3",
        title: "Project Planning",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
        completed: false,
      },
      {
        id: "4",
        title: "Lunch Break",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
        completed: true,
      },
      {
        id: "5",
        title: "Client Call",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
        completed: false,
      },
      {
        id: "7",
        title: "Evening Gym",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0),
        completed: false,
      },
      {
        id: "8",
        title: "Dinner",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21, 0),
        completed: false,
      },
      {
        id: "9",
        title: "Reading",
        startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22, 0),
        endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 0),
        completed: false,
      },
    ]
    setTasks(mockTasks)
  }, [])

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
    setShowTaskForm(false)
  }

  const handleUpdateTaskStatus = async (taskId: string, completed: boolean) => {
    try {
      // In a real app, you would call the API
      // await updateTaskStatus(taskId, completed)

      // Update local state
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed } : task)))
    } catch (error) {
      console.error("Failed to update task status:", error)
    }
  }

  const handleRescheduleTask = async (taskId: string, startTime: Date, endTime: Date) => {
    try {
      // In a real app, you would call the API
      // await rescheduleTask(taskId, startTime, endTime)

      // Update local state
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, startTime, endTime, completed: false } : task)))
    } catch (error) {
      console.error("Failed to reschedule task:", error)
    }
  }

    // Count incomplete goals
    const getIncompleteGoalCount = (goals: any[]) => {
      if (!goals.length) return 0
      return goals.filter((goal) => !goal.completed).length
    }
  

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="container mx-auto p-4 max-w-6xl flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Daily Planner</h1>
            <p className="text-muted-foreground">{format(currentTime, "EEEE, MMMM d, yyyy")}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <GoalButton type="weekly" count={getIncompleteGoalCount(weeklyGoals)} />
            <GoalButton type="monthly" count={getIncompleteGoalCount(monthlyGoals)} />
            <GoalButton type="trimonthly" count={getIncompleteGoalCount(triMonthlyGoals)} />
            <CategoryButton />
            <Button onClick={() => setShowTaskForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden md:block">Add New Task</span>
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <TasksList tasks={tasks} onUpdateTaskStatus={handleUpdateTaskStatus} />
        </div>

        {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} onAddTask={addTask} />}
      </div>
    </div>
  )
}


