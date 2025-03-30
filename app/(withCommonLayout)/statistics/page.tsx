// "use client"

// import { useState, useEffect } from "react"
// import { format } from "date-fns"
// import { Statistics } from "@/components/statistics"
// import type { Task } from "@/types/task"

// export default function StatisticsPage() {
//   const [tasks, setTasks] = useState<Task[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   // Generate mock data for demonstration
//   useEffect(() => {
//     // This would normally be a fetch call to your API
//     // For now, we'll use the same mock data generation as in the history page

//     const generateMockTasks = () => {
//       const mockTasks: Task[] = []
//       const today = new Date()

//       // Generate tasks for the past 60 days to cover previous and current months/weeks
//       for (let i = 0; i < 60; i++) {
//         const taskDate = new Date(today)
//         taskDate.setDate(today.getDate() - i)

//         const tasksPerDay = Math.floor(Math.random() * 5) + 1 // 1-5 tasks per day

//         for (let j = 0; j < tasksPerDay; j++) {
//           // Random hour between 8 AM and 8 PM
//           const hour = Math.floor(Math.random() * 12) + 8

//           const startTime = new Date(taskDate)
//           startTime.setHours(hour, 0, 0, 0)

//           const endTime = new Date(startTime)
//           endTime.setHours(hour + 1 + Math.floor(Math.random() * 2)) // 1-2 hour duration

//           // Random completion status with 70% chance of completion
//           const completed = Math.random() < 0.7

//           mockTasks.push({
//             id: `mock-${i}-${j}`,
//             title: getRandomTaskTitle(),
//             startTime,
//             endTime,
//             completed,
//           })
//         }
//       }

//       setTasks(mockTasks)
//       setIsLoading(false)
//     }

//     generateMockTasks()
//   }, [])

//   // Random task titles for mock data
//   const getRandomTaskTitle = () => {
//     const taskTitles = [
//       "Team Meeting",
//       "Project Planning",
//       "Client Call",
//       "Code Review",
//       "Documentation",
//       "Research",
//       "Email Management",
//       "Workout Session",
//       "Learning Session",
//       "Presentation Prep",
//       "Bug Fixing",
//       "Design Review",
//       "Lunch Break",
//       "Weekly Report",
//       "Brainstorming",
//     ]

//     return taskTitles[Math.floor(Math.random() * taskTitles.length)]
//   }

//   return (
//     <div className="container mx-auto p-4 max-w-6xl">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Statistics</h1>
//           <p className="text-muted-foreground">Track your productivity trends over time</p>
//         </div>
//         <div className="text-sm text-muted-foreground">Last updated: {format(new Date(), "MMMM d, yyyy h:mm a")}</div>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <p>Loading statistics...</p>
//         </div>
//       ) : (
//         <Statistics tasks={tasks} />
//       )}
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Statistics } from "@/components/statistics"
import type { Task } from "@/types/task"

export default function StatisticsPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Generate mock data for demonstration
  useEffect(() => {
    // This would normally be a fetch call to your API
    // For now, we'll use the same mock data generation as in the history page

    const generateMockTasks = () => {
      const mockTasks: Task[] = []
      const today = new Date()

      // Generate tasks for the past 60 days to cover previous and current months/weeks
      for (let i = 0; i < 60; i++) {
        const taskDate = new Date(today)
        taskDate.setDate(today.getDate() - i)

        const tasksPerDay = Math.floor(Math.random() * 5) + 1 // 1-5 tasks per day

        for (let j = 0; j < tasksPerDay; j++) {
          // Random hour between 8 AM and 8 PM
          const hour = Math.floor(Math.random() * 12) + 8

          const startTime = new Date(taskDate)
          startTime.setHours(hour, 0, 0, 0)

          const endTime = new Date(startTime)
          endTime.setHours(hour + 1 + Math.floor(Math.random() * 2)) // 1-2 hour duration

          // Random completion status with 70% chance of completion
          const completed = Math.random() < 0.7

          mockTasks.push({
            id: `mock-${i}-${j}`,
            title: getRandomTaskTitle(),
            startTime,
            endTime,
            completed,
          })
        }
      }

      setTasks(mockTasks)
      setIsLoading(false)
    }

    generateMockTasks()
  }, [])

  // Random task titles for mock data
  const getRandomTaskTitle = () => {
    const taskTitles = [
      "Team Meeting",
      "Project Planning",
      "Client Call",
      "Code Review",
      "Documentation",
      "Research",
      "Email Management",
      "Workout Session",
      "Learning Session",
      "Presentation Prep",
      "Bug Fixing",
      "Design Review",
      "Lunch Break",
      "Weekly Report",
      "Brainstorming",
    ]

    return taskTitles[Math.floor(Math.random() * taskTitles.length)]
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Statistics</h1>
          <p className="text-muted-foreground">Track your productivity trends over time</p>
        </div>
        <div className="text-sm text-muted-foreground">Last updated: {format(new Date(), "MMMM d, yyyy h:mm a")}</div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading statistics...</p>
        </div>
      ) : (
        <Statistics tasks={tasks} />
      )}
    </div>
  )
}


