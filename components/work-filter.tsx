// "use client"

// import { useState } from "react"
// import { Filter, CheckCircle, XCircle, Clock } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { TasksModal } from "@/components/tasks-modal"
// import { RescheduleModal } from "@/components/reschedule-modal"
// import type { Task } from "@/types/task"

// interface WorkFilterProps {
//   tasks: Task[]
//   onUpdateTaskStatus: (taskId: string, completed: boolean) => void
//   onRescheduleTask: (taskId: string, newStartTime: Date, newEndTime: Date) => void
// }

// export function WorkFilter({ tasks, onUpdateTaskStatus, onRescheduleTask }: WorkFilterProps) {
//   const [showTasksModal, setShowTasksModal] = useState(false)
//   const [showRescheduleModal, setShowRescheduleModal] = useState(false)
//   const [selectedFilter, setSelectedFilter] = useState<"total" | "completed" | "failed">("total")
//   const [selectedTask, setSelectedTask] = useState<Task | null>(null)

//   // Get current date to filter tasks for today
//   const today = new Date()
//   const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
//   const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

//   // Filter tasks for today
//   const todaysTasks = tasks.filter((task) => task.startTime >= todayStart && task.startTime <= todayEnd)

//   // Filter tasks based on selected filter
//   const completedTasks = todaysTasks.filter((task) => task.completed)
//   const failedTasks = todaysTasks.filter((task) => !task.completed && task.endTime < new Date())
//   const pendingTasks = todaysTasks.filter((task) => !task.completed && task.endTime >= new Date())

//   // Get filtered tasks based on selected filter
//   const getFilteredTasks = () => {
//     switch (selectedFilter) {
//       case "completed":
//         return completedTasks
//       case "failed":
//         return failedTasks
//       case "total":
//       default:
//         return todaysTasks
//     }
//   }

//   const handleFilterSelect = (filter: "total" | "completed" | "failed") => {
//     setSelectedFilter(filter)
//     setShowTasksModal(true)
//   }

//   const handleTaskClick = (task: Task) => {
//     if (selectedFilter === "failed") {
//       setSelectedTask(task)
//       setShowRescheduleModal(true)
//     }
//   }

//   return (
//     <>
//       <div className="flex items-center gap-2 mb-6">
//         <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//           <Filter className="h-5 w-5 text-primary" />
//         </div>
//         <h2 className="text-lg font-medium">Filter Tasks</h2>
//         <div className="ml-auto flex gap-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 <Filter className="h-4 w-4" />
//                 Work Filter
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => handleFilterSelect("total")}>
//                 <Clock className="h-4 w-4 mr-2" />
//                 Total Work ({todaysTasks.length})
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => handleFilterSelect("completed")}>
//                 <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
//                 Completed Work ({completedTasks.length})
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => handleFilterSelect("failed")}>
//                 <XCircle className="h-4 w-4 mr-2 text-red-500" />
//                 Failed Work ({failedTasks.length})
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Tasks Modal */}
//       {showTasksModal && (
//         <TasksModal
//           tasks={getFilteredTasks()}
//           filterType={selectedFilter}
//           onClose={() => setShowTasksModal(false)}
//           onUpdateTaskStatus={onUpdateTaskStatus}
//           onTaskClick={handleTaskClick}
//         />
//       )}

//       {/* Reschedule Modal */}
//       {showRescheduleModal && selectedTask && (
//         <RescheduleModal
//           task={selectedTask}
//           onClose={() => setShowRescheduleModal(false)}
//           onReschedule={(startTime, endTime) => {
//             onRescheduleTask(selectedTask.id, startTime, endTime)
//             setShowRescheduleModal(false)
//           }}
//         />
//       )}
//     </>
//   )
// }



"use client"

import { useState } from "react"
import { Filter, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TasksModal } from "@/components/tasks-modal"
import { RescheduleModal } from "@/components/reschedule-modal"
import type { Task } from "@/types/task"

interface WorkFilterProps {
  tasks: Task[]
  onUpdateTaskStatus: (taskId: string, completed: boolean) => void
  onRescheduleTask: (taskId: string, newStartTime: Date, newEndTime: Date) => void
}

export function WorkFilter({ tasks, onUpdateTaskStatus, onRescheduleTask }: WorkFilterProps) {
  const [showTasksModal, setShowTasksModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<"total" | "completed" | "failed">("total")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  // Get current date to filter tasks for today
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

  // Filter tasks for today
  const todaysTasks = tasks.filter((task) => task.startTime >= todayStart && task.startTime <= todayEnd)

  // Filter tasks based on selected filter
  const completedTasks = todaysTasks.filter((task) => task.completed)
  const failedTasks = todaysTasks.filter((task) => !task.completed && task.endTime < new Date())
  const pendingTasks = todaysTasks.filter((task) => !task.completed && task.endTime >= new Date())

  // Get filtered tasks based on selected filter
  const getFilteredTasks = () => {
    switch (selectedFilter) {
      case "completed":
        return completedTasks
      case "failed":
        return failedTasks
      case "total":
      default:
        return todaysTasks
    }
  }

  const handleFilterSelect = (filter: "total" | "completed" | "failed") => {
    setSelectedFilter(filter)
    setShowTasksModal(true)
  }

  const handleTaskClick = (task: Task) => {
    if (selectedFilter === "failed") {
      setSelectedTask(task)
      setShowRescheduleModal(true)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Filter className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-medium">Filter Tasks</h2>

        {/* Mobile Buttons */}
        <div className="ml-auto flex gap-2 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterSelect("total")}
            className="flex items-center gap-1 h-9 px-2"
          >
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">{todaysTasks.length}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterSelect("completed")}
            className="flex items-center gap-1 h-9 px-2"
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium">{completedTasks.length}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterSelect("failed")}
            className="flex items-center gap-1 h-9 px-2"
          >
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-xs font-medium">{failedTasks.length}</span>
          </Button>
        </div>

        {/* Desktop Dropdown */}
        <div className="ml-auto hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Work Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleFilterSelect("total")}>
                <Clock className="h-4 w-4 mr-2" />
                Total Work ({todaysTasks.length})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelect("completed")}>
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Completed Work ({completedTasks.length})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelect("failed")}>
                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                Failed Work ({failedTasks.length})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tasks Modal */}
      {showTasksModal && (
        <TasksModal
          tasks={getFilteredTasks()}
          filterType={selectedFilter}
          onClose={() => setShowTasksModal(false)}
          onUpdateTaskStatus={onUpdateTaskStatus}
          onTaskClick={handleTaskClick}
        />
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedTask && (
        <RescheduleModal
          task={selectedTask}
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={(startTime, endTime) => {
            onRescheduleTask(selectedTask.id, startTime, endTime)
            setShowRescheduleModal(false)
          }}
        />
      )}
    </>
  )
}

