// "use client"

// import { X, CheckCircle, XCircle, Clock } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { format } from "date-fns"
// import type { Task } from "@/types/task"
// import { cn } from "@/lib/utils"

// interface TasksModalProps {
//   tasks: Task[]
//   filterType: "total" | "completed" | "failed"
//   onClose: () => void
//   onUpdateTaskStatus: (taskId: string, completed: boolean) => void
//   onTaskClick: (task: Task) => void
// }

// export function TasksModal({ tasks, filterType, onClose, onUpdateTaskStatus, onTaskClick }: TasksModalProps) {
//   const getModalTitle = () => {
//     switch (filterType) {
//       case "completed":
//         return "Completed Tasks"
//       case "failed":
//         return "Failed Tasks"
//       case "total":
//       default:
//         return "All Tasks"
//     }
//   }

//   const getTaskStatusIcon = (task: Task) => {
//     if (task.completed) {
//       return <CheckCircle className="h-5 w-5 text-green-500" />
//     } else if (task.endTime < new Date()) {
//       return <XCircle className="h-5 w-5 text-red-500" />
//     } else {
//       return <Clock className="h-5 w-5 text-blue-500" />
//     }
//   }

//   const getTaskStatusText = (task: Task) => {
//     if (task.completed) {
//       return "Completed"
//     } else if (task.endTime < new Date()) {
//       return "Failed"
//     } else {
//       return "Pending"
//     }
//   }

//   const getTaskStatusClass = (task: Task) => {
//     if (task.completed) {
//       return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
//     } else if (task.endTime < new Date()) {
//       return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
//     } else {
//       return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 mb-0">
//       <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-xl">{getModalTitle()}</CardTitle>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-4 w-4" />
//           </Button>
//         </CardHeader>
//         <CardContent className="flex-1 overflow-y-auto">
//           {tasks.length > 0 ? (
//             <div className="space-y-4">
//               {tasks.map((task, index) => (
//                 <div
//                   key={task.id}
//                   className={cn(
//                     "p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer",
//                     getTaskStatusClass(task),
//                   )}
//                   onClick={() => onTaskClick(task)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-white/50 text-sm font-medium">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="font-medium">{task.title}</h3>
//                       <p className="text-sm text-muted-foreground">
//                         {format(task.startTime, "h:mm a")} - {format(task.endTime, "h:mm a")}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium">
//                         {getTaskStatusIcon(task)}
//                         <span>{getTaskStatusText(task)}</span>
//                       </div>

//                       {!task.completed && task.endTime >= new Date() && (
//                         <Button
//                           size="sm"
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             onUpdateTaskStatus(task.id, true)
//                           }}
//                           className="bg-green-600 hover:bg-green-700 text-white"
//                         >
//                           Mark Complete
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center h-40 text-center">
//               <p className="text-muted-foreground mb-4">No tasks found</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   )
// }





"use client"

import { X, CheckCircle, XCircle, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
// import type { DailyTask, TaskStatus } from "@/types/types"
import { cn } from "@/lib/utils"
import { updateDailyTask } from "@/components/task-service"
import { useToast } from "@/components/ui/toast-context"
import { DailyTask, TaskStatus } from "@/app/types/types"

interface TasksModalProps {
  tasks: DailyTask[]
  filterType: TaskStatus | "total"
  onClose: () => void
  onTaskClick: (task: DailyTask) => void
}

export function TasksModal({ tasks, filterType, onClose, onTaskClick }: TasksModalProps) {
  const { success, error: showError } = useToast()

  const getModalTitle = () => {
    switch (filterType) {
      case "completed":
        return "Completed Tasks"
      case "failed":
        return "Failed Tasks"
      case "in_progress":
        return "In Progress Tasks"
      case "scheduled":
        return "Scheduled Tasks"
      case "total":
      default:
        return "All Tasks"
    }
  }

  const getTaskStatusIcon = (task: DailyTask) => {
    switch (task.status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "in_progress":
        return <Play className="h-5 w-5 text-blue-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getTaskStatusClass = (task: DailyTask) => {
    switch (task.status) {
      case "completed":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      case "failed":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
      case "in_progress":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
      default:
        return "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800"
    }
  }

  const handleUpdateStatus = async (taskId: string, status: TaskStatus) => {
    try {
      await updateDailyTask(taskId, { status })
      success(`Task marked as ${status}`)

      // Update the task in the list
      const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status } : task))

      // This is a bit of a hack since we can't update the parent's state directly
      // In a real app, you'd use a state management solution or context
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (err) {
      console.error("Error updating task status:", err)
      showError("Failed to update task status")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] sm:max-h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">{getModalTitle()}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 sm:h-10 sm:w-10">
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className={cn(
                    "p-3 sm:p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer",
                    getTaskStatusClass(task),
                  )}
                  onClick={() => onTaskClick(task)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/50 text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base truncate">{task.title}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {format(task.startTime, "h:mm a")} - {format(task.endTime, "h:mm a")}
                          </p>
                          {task.category && (
                            <div className="flex items-center gap-1">
                              <div className={`h-2 w-2 rounded-full ${task.category.color}`}></div>
                              <span className="text-xs">{task.category.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 mt-2 sm:mt-0 ml-10 sm:ml-0">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium">
                        {getTaskStatusIcon(task)}
                        <span className="hidden xs:inline capitalize">{task.status.replace("_", " ")}</span>
                      </div>

                      <div className="flex gap-1">
                        {task.status !== "completed" && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleUpdateStatus(task.id, "completed")
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs h-8 px-2 sm:px-3"
                          >
                            Complete
                          </Button>
                        )}

                        {task.status !== "in_progress" && task.status !== "completed" && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleUpdateStatus(task.id, "in_progress")
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 px-2 sm:px-3"
                          >
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-muted-foreground mb-4">No tasks found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


