
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

//         {/* Mobile Buttons */}
//         <div className="ml-auto flex gap-2 md:hidden">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleFilterSelect("total")}
//             className="flex items-center gap-1 h-9 px-2"
//           >
//             <Clock className="h-4 w-4 text-primary" />
//             <span className="text-xs font-medium">{todaysTasks.length}</span>
//           </Button>

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleFilterSelect("completed")}
//             className="flex items-center gap-1 h-9 px-2"
//           >
//             <CheckCircle className="h-4 w-4 text-green-500" />
//             <span className="text-xs font-medium">{completedTasks.length}</span>
//           </Button>

//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => handleFilterSelect("failed")}
//             className="flex items-center gap-1 h-9 px-2"
//           >
//             <XCircle className="h-4 w-4 text-red-500" />
//             <span className="text-xs font-medium">{failedTasks.length}</span>
//           </Button>
//         </div>

//         {/* Desktop Dropdown */}
//         <div className="ml-auto hidden md:block">
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

import type React from "react"

import { useState, useEffect } from "react"
import { Filter, CheckCircle, XCircle, Clock, BarChart3, Calendar, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TasksModal } from "@/components/tasks-modal"
import { RescheduleModal } from "@/components/reschedule-modal"
import { StatisticsDialog } from "@/components/statistics-dialog"
import { Input } from "@/components/ui/input"
import type { DailyTask, TaskStatus } from "@/types/task"
import { fetchDailyTasks, updateDailyTask } from "@/components/task-service"

interface WorkFilterProps {
  date: string
  onDateChange: (date: string) => void
}

export function WorkFilter({ date, onDateChange }: WorkFilterProps) {
  const [showTasksModal, setShowTasksModal] = useState(false)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [showStatisticsDialog, setShowStatisticsDialog] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<TaskStatus | "total">("total")
  const [selectedTask, setSelectedTask] = useState<DailyTask | null>(null)
  const [tasks, setTasks] = useState<DailyTask[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch tasks for the selected date
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        const data = await fetchDailyTasks(date)
        setTasks(data)
      } catch (err) {
        console.error("Error fetching tasks:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [date])

  // Filter tasks based on selected filter
  const getFilteredTasks = () => {
    switch (selectedFilter) {
      case "completed":
        return tasks.filter((task) => task.status === "completed")
      case "failed":
        return tasks.filter((task) => task.status === "failed")
      case "in_progress":
        return tasks.filter((task) => task.status === "in_progress")
      case "scheduled":
        return tasks.filter((task) => task.status === "scheduled")
      case "total":
      default:
        return tasks
    }
  }

  const handleFilterSelect = (filter: TaskStatus | "total") => {
    setSelectedFilter(filter)
    setShowTasksModal(true)
  }

  const handleTaskClick = (task: DailyTask) => {
    if (selectedFilter === "failed") {
      setSelectedTask(task)
      setShowRescheduleModal(true)
    }
  }

  const handleRescheduleTask = async (taskId: string, startTime: Date, endTime: Date) => {
    try {
      await updateDailyTask(taskId, {
        startTime,
        endTime,
        status: "scheduled",
      })

      // Refresh tasks
      const updatedTasks = await fetchDailyTasks(date)
      setTasks(updatedTasks)

      setShowRescheduleModal(false)
    } catch (err) {
      console.error("Error rescheduling task:", err)
    }
  }

  // Count tasks by status
  const completedCount = tasks.filter((task) => task.status === "completed").length
  const failedCount = tasks.filter((task) => task.status === "failed").length
  const inProgressCount = tasks.filter((task) => task.status === "in_progress").length
  const scheduledCount = tasks.filter((task) => task.status === "scheduled").length

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Filter className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-medium">Task Dashboard</h2>
        </div>

        <div className="flex items-center gap-2">
          <Label htmlFor="date-input">Date:</Label>
          <Input
            id="date-input"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-auto"
          />
        </div>

        {/* Mobile Buttons */}
        <div className="flex flex-wrap gap-2 md:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterSelect("total")}
            className="flex items-center gap-1 h-9 px-2"
          >
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">{tasks.length}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterSelect("completed")}
            className="flex items-center gap-1 h-9 px-2"
          >
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium">{completedCount}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterSelect("in_progress")}
            className="flex items-center gap-1 h-9 px-2"
          >
            <Play className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-medium">{inProgressCount}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterSelect("failed")}
            className="flex items-center gap-1 h-9 px-2"
          >
            <XCircle className="h-4 w-4 text-red-500" />
            <span className="text-xs font-medium">{failedCount}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStatisticsDialog(true)}
            className="flex items-center gap-1 h-9 px-2"
          >
            <BarChart3 className="h-4 w-4 text-purple-500" />
            <span className="text-xs font-medium">Stats</span>
          </Button>
        </div>

        {/* Desktop Dropdown */}
        <div className="ml-auto hidden md:flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Task Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleFilterSelect("total")}>
                <Clock className="h-4 w-4 mr-2" />
                All Tasks ({tasks.length})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelect("scheduled")}>
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                Scheduled ({scheduledCount})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelect("in_progress")}>
                <Play className="h-4 w-4 mr-2 text-blue-500" />
                In Progress ({inProgressCount})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelect("completed")}>
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Completed ({completedCount})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterSelect("failed")}>
                <XCircle className="h-4 w-4 mr-2 text-red-500" />
                Failed ({failedCount})
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={() => setShowStatisticsDialog(true)} className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistics
          </Button>
        </div>
      </div>

      {/* Tasks Modal */}
      {showTasksModal && (
        <TasksModal
          tasks={getFilteredTasks()}
          filterType={selectedFilter}
          onClose={() => setShowTasksModal(false)}
          onTaskClick={handleTaskClick}
        />
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedTask && (
        <RescheduleModal
          task={{
            id: selectedTask.id,
            title: selectedTask.title,
            startTime: selectedTask.startTime,
            endTime: selectedTask.endTime,
            completed: selectedTask.status === "completed",
          }}
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={(startTime, endTime) => {
            handleRescheduleTask(selectedTask.id, startTime, endTime)
          }}
        />
      )}

      {/* Statistics Dialog */}
      {showStatisticsDialog && <StatisticsDialog date={date} onClose={() => setShowStatisticsDialog(false)} />}
    </>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  )
}

