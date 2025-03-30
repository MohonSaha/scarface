


// "use client"

// import { useState, useEffect, useRef } from "react"
// import { format, addHours, startOfDay, isSameHour, isSameDay } from "date-fns"
// import { Clock, CheckCircle, XCircle, Moon, Sun, BarChart2, Zap, Quote } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { TaskReminder } from "@/components/task-reminder"
// import type { Task } from "@/types/task"
// import { cn } from "@/lib/utils"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { WorkFilter } from "@/components/work-filter"

// interface TasksListProps {
//   tasks: Task[]
//   onUpdateTaskStatus: (taskId: string, completed: boolean) => void
// }

// export function TasksList({ tasks, onUpdateTaskStatus }: TasksListProps) {
//   const [currentTime, setCurrentTime] = useState(new Date())
//   const [showReminder, setShowReminder] = useState(false)
//   const [currentTask, setCurrentTask] = useState<Task | null>(null)
//   const [visibleHours, setVisibleHours] = useState<number[]>([])
//   const [showStats, setShowStats] = useState(false)
//   const [showEnergy, setShowEnergy] = useState(false)
//   const [showQuote, setShowQuote] = useState(false)
//   const [energyLevel, setEnergyLevel] = useState<number | null>(null)
//   const [quote, setQuote] = useState({ text: "", author: "" })

//   // Create refs for each hour section
//   const hourRefs = useRef<(HTMLDivElement | null)[]>([])

//   // Initialize with current and future hours visible, but not past hours
//   useEffect(() => {
//     const now = new Date()
//     const currentHour = now.getHours()

//     // Show current hour and all future hours
//     const visibleHoursList = Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour >= currentHour)

//     setVisibleHours(visibleHoursList)
//   }, [])

//   // Update current time every minute and check for reminders
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date()
//       const currentHour = now.getHours()
//       setCurrentTime(now)

//       // Check if there's a task ending in the current hour
//       const currentHourTask = tasks.find(
//         (task) => isSameHour(task.endTime, now) && !task.completed && isSameDay(task.endTime, now),
//       )

//       if (currentHourTask) {
//         setCurrentTask(currentHourTask)
//         setShowReminder(true)

//         // Play alarm sound when reminder appears
//         playAlarmSound()

//         // Auto-close reminder after 5 minutes if no action
//         const taskHour = currentHourTask.endTime.getHours()
//         setTimeout(
//           () => {
//             setShowReminder(false)

//             // Hide the passed hour card if no status update was made
//             setVisibleHours((prev) => prev.filter((h) => h !== taskHour - 1))
//           },
//           5 * 60 * 1000,
//         ) // 5 minutes
//       }

//       // Hide passed hours (except the current one)
//       setVisibleHours((prev) => {
//         const newVisible = prev.filter((hour) => hour >= currentHour - 1)
//         return newVisible
//       })
//     }, 60000) // Update every minute

//     return () => clearInterval(interval)
//   }, [tasks, visibleHours])

//   // Load a motivational quote
//   useEffect(() => {
//     // Sample quotes - in a real app, you might fetch these from an API
//     const quotes = [
//       { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
//       { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
//       { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
//       { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
//       { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
//     ]

//     setQuote(quotes[Math.floor(Math.random() * quotes.length)])
//   }, [])

//   // Generate all 24 hours of the day
//   const hours = Array.from({ length: 24 }, (_, i) => {
//     const hour = addHours(startOfDay(new Date()), i)
//     return {
//       time: hour,
//       formattedTime: format(hour, "h:00 a"),
//       hourNumber: format(hour, "H"),
//       tasks: tasks.filter((task) => isSameHour(task.startTime, hour)),
//     }
//   })

//   // Check if the hour is current, past, or future
//   const getHourStatus = (hourTime: Date) => {
//     const now = new Date()
//     if (isSameHour(hourTime, now)) return "current"
//     if (hourTime < now) return "past"
//     return "future"
//   }

//   // Determine if it's day or night hour (for styling)
//   const isDayHour = (hourNum: number) => hourNum >= 6 && hourNum < 18

//   // Check if an hour has any completed tasks
//   const hasCompletedTasks = (hourNum: number) => {
//     return tasks.some((task) => task.startTime.getHours() === hourNum && task.completed)
//   }

//   // Check if an hour has any incomplete tasks that are in the past
//   const hasMissedTasks = (hourNum: number) => {
//     const now = new Date()
//     return tasks.some((task) => task.startTime.getHours() === hourNum && !task.completed && task.endTime < now)
//   }

//   // Get completion status for an hour
//   const getHourCompletionStatus = (hourTasks: Task[]) => {
//     if (hourTasks.length === 0) return "empty"
//     if (hourTasks.every((task) => task.completed)) return "completed"
//     if (hourTasks.some((task) => task.completed)) return "partial"

//     const now = new Date()
//     if (hourTasks.some((task) => task.endTime < now)) return "missed"

//     return "incomplete"
//   }

//   // Scroll to a specific hour
//   const scrollToHour = (index: number) => {
//     // Make sure the hour is visible
//     setVisibleHours((prev) => {
//       if (!prev.includes(index)) {
//         return [...prev, index]
//       }
//       return prev
//     })

//     // Scroll to the hour
//     setTimeout(() => {
//       if (hourRefs.current[index]) {
//         hourRefs.current[index]?.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         })
//       }
//     }, 100) // Small delay to ensure the DOM has updated
//   }

//   // Initialize hourRefs array
//   useEffect(() => {
//     hourRefs.current = hourRefs.current.slice(0, hours.length)
//   }, [hours.length])

//   // Calculate statistics
//   const calculateStats = () => {
//     const totalTasks = tasks.length
//     const completedTasks = tasks.filter((task) => task.completed).length
//     const missedTasks = tasks.filter((task) => !task.completed && task.endTime < currentTime).length
//     const upcomingTasks = tasks.filter((task) => !task.completed && task.endTime >= currentTime).length

//     const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

//     return {
//       totalTasks,
//       completedTasks,
//       missedTasks,
//       upcomingTasks,
//       completionRate,
//     }
//   }

//   // Set energy level
//   const handleSetEnergy = (level: number) => {
//     setEnergyLevel(level)
//     setShowEnergy(false)
//   }

//   // Add this function to play an alarm sound
//   const playAlarmSound = () => {
//     try {
//       const audio = new Audio("/alarm-sound.mp3")
//       audio.play()
//     } catch (error) {
//       console.error("Failed to play alarm sound:", error)
//     }
//   }

//   const stats = calculateStats()

//     // Handle rescheduling a task
//     const handleRescheduleTask = (taskId: string, newStartTime: Date, newEndTime: Date) => {
//       // In a real app, you would call an API to update the task
//       // For now, we'll just update the task in our local state
//       const updatedTasks = tasks.map((task) => {
//         if (task.id === taskId) {
//           return {
//             ...task,
//             startTime: newStartTime,
//             endTime: newEndTime,
//             completed: false,
//           }
//         }
//         return task
//       })
  
//       // This would typically be handled by a parent component
//       // For demo purposes, we're just logging it
//       console.log("Task rescheduled:", { taskId, newStartTime, newEndTime })
//     }

//   return (
//     <div className="space-y-8">
//        {/* Add the WorkFilter component */}
//        <WorkFilter tasks={tasks} onUpdateTaskStatus={onUpdateTaskStatus} onRescheduleTask={handleRescheduleTask} />
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//         <div className="flex items-center gap-2">
//           <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
//             <Clock className="h-5 w-5 text-primary" />
//           </div>
//           <h2 className="text-2xl font-bold">24-Hour Timeline</h2>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <Button variant="outline" size="sm" onClick={() => setShowStats(true)} className="flex items-center gap-1">
//             <BarChart2 className="h-4 w-4" />
//             <span className="hidden sm:inline">Statistics</span>
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setShowEnergy(true)}
//             className={cn(
//               "flex items-center gap-1",
//               energyLevel === 1 && "border-red-300 text-red-500",
//               energyLevel === 2 && "border-orange-300 text-orange-500",
//               energyLevel === 3 && "border-yellow-300 text-yellow-500",
//               energyLevel === 4 && "border-green-300 text-green-500",
//               energyLevel === 5 && "border-emerald-300 text-emerald-500",
//             )}
//           >
//             <Zap className="h-4 w-4" />
//             <span className="hidden sm:inline">Energy</span>
//             {energyLevel && <span className="text-xs">{energyLevel}/5</span>}
//           </Button>
//           <Button variant="outline" size="sm" onClick={() => setShowQuote(true)} className="flex items-center gap-1">
//             <Quote className="h-4 w-4" />
//             <span className="hidden sm:inline">Quote</span>
//           </Button>
//         </div>
//       </div>

//       {/* Hour circles at the top - visible on all devices */}
//       <div className="flex justify-between md:px-4 px-2 py-2 md:bg-muted/30 bg-muted rounded-xl overflow-x-auto gap-1 scrollbar-hide">
//         {hours.map((hour, index) => {
//           const hourNum = Number.parseInt(hour.hourNumber)
//           const isDay = isDayHour(hourNum)
//           const hourStatus = getHourStatus(hour.time)
//           const completionStatus = getHourCompletionStatus(hour.tasks)

//           return (
//             <button
//               key={index}
//               onClick={() => scrollToHour(hourNum)}
//               className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
//               aria-label={`Scroll to ${hour.formattedTime}`}
//             >
//               <div
//                 className={cn(
//                   "h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 border border-green-200",
//                   // Completion status colors
//                   completionStatus === "completed" && "bg-green-500 text-white ring-2 ring-green-200 border-none",
//                   completionStatus === "partial" && "bg-yellow-400 text-white border-none",
//                   completionStatus === "missed" && "bg-red-400 text-white border-none",
//                   completionStatus === "empty" &&
//                     hourStatus === "current" &&
//                     "bg-primary text-primary-foreground ring-2 ring-primary/20 border-none ",
//                   completionStatus === "empty" && hourStatus === "past" && "bg-muted text-muted-foreground border-none",
//                   completionStatus === "empty" && hourStatus === "future" && "bg-background border border-red-200",
//                   // Visibility indicator
//                   !visibleHours.includes(hourNum) && "opacity-80",
//                 )}
//               >
//                 {hourNum}
//               </div>
//               <span className="text-[10px] text-muted-foreground">
//                 {isDay ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
//               </span>
//             </button>
//           )
//         })}
//       </div>

//       <div className="relative">
//         {/* Timeline line */}
//         <div className="absolute left-[19px] sm:left-[39px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10 z-0"></div>

//         <div className="space-y-6">
//           {hours.map((hour, index) => {
//             const hourNum = Number.parseInt(hour.hourNumber)
//             const isDay = isDayHour(hourNum)
//             const hourStatus = getHourStatus(hour.time)

//             // Skip rendering if this hour is not visible
//             if (!visibleHours.includes(hourNum)) {
//               return null
//             }

//             return (
//               <div
//                 key={index}
//                 ref={(el) => (hourRefs.current[index] = el)}
//                 className="relative z-10"
//                 id={`hour-${hourNum}`}
//               >
//                 <div className="flex items-start gap-2 sm:gap-4">
//                   {/* Time indicator */}
//                   <div
//                     className={cn(
//                       "flex-shrink-0 h-10 w-10 sm:h-20 sm:w-20 rounded-full flex flex-col items-center justify-center",
//                       hourStatus === "current"
//                         ? "bg-primary text-primary-foreground ring-2 sm:ring-4 ring-primary/20"
//                         : hourStatus === "past"
//                           ? "bg-muted text-muted-foreground"
//                           : "bg-background border border-border",
//                     )}
//                   >
//                     <span className="text-xs sm:text-sm font-medium">{format(hour.time, "h:mm")}</span>
//                     <span className="text-[10px] sm:text-xs">{format(hour.time, "a")}</span>
//                   </div>

//                   {/* Tasks for this hour */}
//                   <div className="flex-1 min-h-[5rem]">
//                     <Card
//                       className={cn(
//                         "overflow-hidden transition-all duration-200 hover:shadow-md",
//                         hourStatus === "current" && "border-primary/50 shadow-md",
//                       )}
//                     >
//                       <CardContent className="p-3 sm:p-4">
//                         {/* Hour header - only show "Current Hour" at the top */}
//                         <div className="flex items-center justify-between mb-2">
//                           <h3 className="font-medium text-sm sm:text-base flex items-center gap-1">
//                             {isDay ? (
//                               <Sun className="h-4 w-4 text-amber-500" />
//                             ) : (
//                               <Moon className="h-4 w-4 text-indigo-400" />
//                             )}
//                             {format(hour.time, "h:00 a")}
//                           </h3>
//                           {hourStatus === "current" && (
//                             <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
//                               Current Hour
//                             </span>
//                           )}
//                         </div>

//                         {hour.tasks.length > 0 ? (
//                           <div className="space-y-2">
//                             {hour.tasks.map((task) => {
//                               const isCompleted = task.completed
//                               const isPast = task.endTime < currentTime
//                               const isMissed = !isCompleted && isPast

//                               return (
//                                 <div
//                                   key={task.id}
//                                   className={cn(
//                                     "p-2 sm:p-3 rounded-lg flex items-center justify-between gap-2",
//                                     isCompleted
//                                       ? "bg-green-50 dark:bg-green-900/20"
//                                       : isMissed
//                                         ? "bg-red-50 dark:bg-red-900/20"
//                                         : hourStatus === "current"
//                                           ? "bg-blue-50 dark:bg-blue-900/20"
//                                           : "bg-muted/50",
//                                   )}
//                                 >
//                                   <div className="flex items-center gap-2 flex-1 min-w-0">
//                                     <div
//                                       className={cn(
//                                         "h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center flex-shrink-0",
//                                         isCompleted
//                                           ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
//                                           : isMissed
//                                             ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
//                                             : hourStatus === "current"
//                                               ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
//                                               : "bg-muted text-muted-foreground",
//                                       )}
//                                     >
//                                       {isCompleted ? (
//                                         <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
//                                       ) : isMissed ? (
//                                         <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
//                                       ) : (
//                                         <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
//                                       )}
//                                     </div>
//                                     <div className="truncate">
//                                       <h4 className="font-medium text-sm sm:text-base truncate">{task.title}</h4>
//                                       <p className="text-[10px] sm:text-xs text-muted-foreground">
//                                         {format(task.startTime, "h:mm a")} - {format(task.endTime, "h:mm a")}
//                                       </p>
//                                     </div>
//                                   </div>

//                                   <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
//                                     {isCompleted ? (
//                                       <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400">
//                                         Completed
//                                       </span>
//                                     ) : isMissed ? (
//                                       <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400">
//                                         Missed
//                                       </span>
//                                     ) : hourStatus === "current" ? (
//                                       <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400">
//                                         In Progress
//                                       </span>
//                                     ) : (
//                                       <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-muted text-muted-foreground">
//                                         Upcoming
//                                       </span>
//                                     )}

//                                     <div className="flex">
//                                       <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => onUpdateTaskStatus(task.id, true)}
//                                         className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
//                                       >
//                                         <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
//                                       </Button>
//                                       <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         onClick={() => onUpdateTaskStatus(task.id, false)}
//                                         className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
//                                       >
//                                         <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )
//                             })}
//                           </div>
//                         ) : (
//                           <div className="p-2 text-center">
//                             <p className="text-xs sm:text-sm text-muted-foreground">No tasks scheduled</p>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* Task Reminder */}
//       {showReminder && currentTask && (
//         <TaskReminder
//           task={currentTask}
//           onClose={() => {
//             setShowReminder(false)
//             // Hide the hour card if closing without updating status
//             const taskHour = currentTask.endTime.getHours()
//             if (taskHour < currentTime.getHours()) {
//               setVisibleHours((prev) => prev.filter((h) => h !== taskHour))
//             }
//           }}
//           onComplete={() => {
//             onUpdateTaskStatus(currentTask.id, true)
//             setShowReminder(false)
//           }}
//           onIncomplete={() => {
//             onUpdateTaskStatus(currentTask.id, false)
//             setShowReminder(false)
//           }}
//         />
//       )}

//       {/* Statistics Dialog */}
//       <Dialog open={showStats} onOpenChange={setShowStats}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Your Productivity Stats</DialogTitle>
//             <DialogDescription>Track your progress and productivity for today</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-muted/30 p-4 rounded-lg text-center">
//                 <p className="text-sm text-muted-foreground">Completion Rate</p>
//                 <p className="text-3xl font-bold text-primary">{stats.completionRate}%</p>
//               </div>
//               <div className="bg-muted/30 p-4 rounded-lg text-center">
//                 <p className="text-sm text-muted-foreground">Total Tasks</p>
//                 <p className="text-3xl font-bold">{stats.totalTasks}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-3">
//               <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
//                 <p className="text-xs text-green-800 dark:text-green-400">Completed</p>
//                 <p className="text-xl font-bold text-green-600">{stats.completedTasks}</p>
//               </div>
//               <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
//                 <p className="text-xs text-red-800 dark:text-red-400">Missed</p>
//                 <p className="text-xl font-bold text-red-600">{stats.missedTasks}</p>
//               </div>
//               <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
//                 <p className="text-xs text-blue-800 dark:text-blue-400">Upcoming</p>
//                 <p className="text-xl font-bold text-blue-600">{stats.upcomingTasks}</p>
//               </div>
//             </div>

//             {/* Progress bar */}
//             <div className="space-y-2">
//               <div className="flex justify-between text-xs">
//                 <span>Progress</span>
//                 <span>
//                   {stats.completedTasks}/{stats.totalTasks} tasks
//                 </span>
//               </div>
//               <div className="w-full bg-muted rounded-full h-2.5">
//                 <div className="bg-primary h-2.5 rounded-full" style={{ width: `${stats.completionRate}%` }}></div>
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Energy Level Dialog */}
//       <Dialog open={showEnergy} onOpenChange={setShowEnergy}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>How's Your Energy Level?</DialogTitle>
//             <DialogDescription>Track your energy throughout the day to optimize your productivity</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="flex justify-between">
//               <Button
//                 variant="outline"
//                 className="flex-1 border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
//                 onClick={() => handleSetEnergy(1)}
//               >
//                 1
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 border-orange-300 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
//                 onClick={() => handleSetEnergy(2)}
//               >
//                 2
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 border-yellow-300 text-yellow-500 hover:bg-yellow-50 hover:text-yellow-600"
//                 onClick={() => handleSetEnergy(3)}
//               >
//                 3
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 border-green-300 text-green-500 hover:bg-green-50 hover:text-green-600"
//                 onClick={() => handleSetEnergy(4)}
//               >
//                 4
//               </Button>
//               <Button
//                 variant="outline"
//                 className="flex-1 border-emerald-300 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600"
//                 onClick={() => handleSetEnergy(5)}
//               >
//                 5
//               </Button>
//             </div>
//             <div className="flex justify-between text-xs text-muted-foreground px-1">
//               <span>Very Low</span>
//               <span>Low</span>
//               <span>Medium</span>
//               <span>High</span>
//               <span>Very High</span>
//             </div>
//             <div className="bg-muted/30 p-4 rounded-lg text-sm">
//               <p>Tips based on your energy level:</p>
//               <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
//                 <li>Low energy (1-2): Focus on simple, administrative tasks</li>
//                 <li>Medium energy (3): Handle routine work and meetings</li>
//                 <li>High energy (4-5): Tackle creative and challenging tasks</li>
//               </ul>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Motivational Quote Dialog */}
//       <Dialog open={showQuote} onOpenChange={setShowQuote}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Daily Inspiration</DialogTitle>
//           </DialogHeader>
//           <div className="py-6 px-2 text-center space-y-4">
//             <p className="text-xl italic">"{quote.text}"</p>
//             <p className="text-sm text-muted-foreground">— {quote.author}</p>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }



"use client"

import { useState, useEffect, useRef } from "react"
import { format, addHours, startOfDay, isSameHour, isSameDay } from "date-fns"
import { Clock, CheckCircle, XCircle, ArrowRight, Moon, Sun, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TaskReminder } from "@/components/task-reminder"
import { WorkFilter } from "@/components/work-filter"
import { cn } from "@/lib/utils"
import { fetchDailyTasks, updateDailyTask } from "@/components/task-service"
import { useToast } from "@/components/ui/toast-context"
import { Task, DailyTask  } from "@/app/types/types"

interface TasksListProps {
  tasks?: Task[]
  onUpdateTaskStatus?: (taskId: string, completed: boolean) => void
  date?: Date
}

export function TasksList({ tasks: legacyTasks, onUpdateTaskStatus, date = new Date() }: TasksListProps) {
  const { success, error: showError } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showReminder, setShowReminder] = useState(false)
  const [currentTask, setCurrentTask] = useState<DailyTask | null>(null)
  const [tasks, setTasks] = useState<DailyTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(format(date, "yyyy-MM-dd"))

  // Create refs for each hour section
  const hourRefs = useRef<(HTMLDivElement | null)[]>([])

  // Fetch tasks from the API
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true)
        const data = await fetchDailyTasks(selectedDate)
        setTasks(data)
      } catch (err) {
        console.error("Failed to load tasks:", err)
        showError("Failed to load tasks")
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [selectedDate, showError])

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      // Check if there's a task ending in the current hour
      const currentHourTask = tasks.find(
        (task) =>
          isSameHour(task.endTime, now) &&
          task.status !== "completed" &&
          task.status !== "failed" &&
          isSameDay(task.endTime, now),
      )

      if (currentHourTask) {
        setCurrentTask(currentHourTask)
        setShowReminder(true)
      }
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [tasks])

  // Generate all 24 hours of the day
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = addHours(startOfDay(new Date(selectedDate)), i)
    return {
      time: hour,
      formattedTime: format(hour, "h:00 a"),
      hourNumber: format(hour, "H"),
      tasks: tasks.filter((task) => isSameHour(task.startTime, hour)),
    }
  })

  // Check if the hour is current, past, or future
  const getHourStatus = (hourTime: Date) => {
    const now = new Date()
    if (isSameHour(hourTime, now)) return "current"
    if (hourTime < now) return "past"
    return "future"
  }

  // Determine if it's day or night hour (for styling)
  const isDayHour = (hourNum: number) => hourNum >= 6 && hourNum < 18

  // Scroll to a specific hour
  const scrollToHour = (index: number) => {
    if (hourRefs.current[index]) {
      hourRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Initialize hourRefs array
  useEffect(() => {
    hourRefs.current = hourRefs.current.slice(0, hours.length)
  }, [hours.length])

  // Handle updating task status
  const handleUpdateTaskStatus = async (
    taskId: string,
    status: "scheduled" | "in_progress" | "completed" | "failed",
  ) => {
    try {
      await updateDailyTask(taskId, { status })

      // Update local state
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)))

      success(`Task marked as ${status}`)
    } catch (err) {
      console.error("Failed to update task status:", err)
      showError("Failed to update task status")
    }
  }

  // Get task status icon
  const getTaskStatusIcon = (task: DailyTask) => {
    switch (task.status) {
      case "completed":
        return <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
      case "failed":
        return <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
      case "in_progress":
        return <Play className="h-3 w-3 sm:h-4 sm:w-4" />
      default:
        return <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
    }
  }

  // Get task status color class
  const getTaskStatusClass = (task: DailyTask, hourStatus: string) => {
    switch (task.status) {
      case "completed":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      case "failed":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
      case "in_progress":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
      default:
        return hourStatus === "current"
          ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
          : hourStatus === "past"
            ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800"
            : "bg-background"
    }
  }

  return (
    <div className="space-y-8">
      {/* Add the WorkFilter component */}
      <WorkFilter date={selectedDate} onDateChange={setSelectedDate} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">24-Hour Timeline</h2>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-full text-sm font-medium self-start sm:self-auto">
          {format(new Date(selectedDate), "EEEE, MMMM d")}
        </div>
      </div>

      {/* Hour circles at the top - visible on all devices */}
      <div className="flex justify-between px-4 py-2 bg-muted/30 rounded-xl overflow-x-auto gap-1">
        {hours.map((hour, index) => {
          const hourNum = Number.parseInt(hour.hourNumber)
          const isDay = isDayHour(hourNum)
          const hourStatus = getHourStatus(hour.time)

          return (
            <button
              key={index}
              onClick={() => scrollToHour(index)}
              className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label={`Scroll to ${hour.formattedTime}`}
            >
              <div
                className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center text-xs font-medium",
                  hourStatus === "current"
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/20"
                    : hourStatus === "past"
                      ? "bg-muted text-muted-foreground"
                      : "bg-background border border-border",
                )}
              >
                {hourNum}
              </div>
              <span className="text-[10px] text-muted-foreground">
                {isDay ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative">
        {/* Timeline line - using the styling from your reference code */}
        <div className="absolute left-[19px] sm:left-[39px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10 z-0"></div>

        <div className="space-y-6">
          {hours.map((hour, index) => {
            const hourNum = Number.parseInt(hour.hourNumber)
            const isDay = isDayHour(hourNum)
            const hourStatus = getHourStatus(hour.time)

            return (
              <div
                key={index}
                ref={(el) => (hourRefs.current[index] = el)}
                className="relative z-10"
                id={`hour-${hourNum}`}
              >
                <div className="flex items-start gap-2 sm:gap-4">
                  {/* Time indicator - using the styling from your reference code */}
                  <div
                    className={cn(
                      "flex-shrink-0 h-10 w-10 sm:h-20 sm:w-20 rounded-full flex flex-col items-center justify-center",
                      hourStatus === "current"
                        ? "bg-primary text-primary-foreground ring-2 sm:ring-4 ring-primary/20"
                        : hourStatus === "past"
                          ? "bg-muted text-muted-foreground"
                          : "bg-background border border-border",
                    )}
                  >
                    <span className="text-xs sm:text-sm font-medium">{format(hour.time, "h:mm")}</span>
                    <span className="text-[10px] sm:text-xs">{format(hour.time, "a")}</span>
                  </div>

                  {/* Tasks for this hour */}
                  <div className="flex-1 min-h-[5rem]">
                    {hour.tasks.length > 0 ? (
                      <div className="space-y-2 w-full">
                        {hour.tasks.map((task) => (
                          <Card
                            key={task.id}
                            className={cn(
                              "overflow-hidden transition-all duration-200 hover:shadow-md",
                              getTaskStatusClass(task, hourStatus),
                            )}
                          >
                            <CardContent className="p-0">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 gap-2 sm:gap-0">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <div
                                    className={cn(
                                      "h-6 w-6 sm:h-8 sm:w-8 rounded-full flex items-center justify-center flex-shrink-0",
                                      task.status === "completed"
                                        ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400"
                                        : task.status === "failed"
                                          ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                                          : task.status === "in_progress"
                                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                                            : hourStatus === "current"
                                              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                                              : hourStatus === "past"
                                                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
                                                : "bg-muted text-muted-foreground",
                                    )}
                                  >
                                    {getTaskStatusIcon(task)}
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-sm sm:text-base">{task.title}</h3>
                                    <div className="flex items-center gap-2">
                                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                                        {format(task.startTime, "h:mm a")} - {format(task.endTime, "h:mm a")}
                                      </p>
                                      {task.category && (
                                        <div className="flex items-center gap-1">
                                          <div className={`h-2 w-2 rounded-full ${task.category.color}`}></div>
                                          <span className="text-[10px] sm:text-xs">{task.category.name}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-2 mt-1 sm:mt-0">
                                  <span
                                    className={cn(
                                      "text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full",
                                      task.status === "completed"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
                                        : task.status === "failed"
                                          ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400"
                                          : task.status === "in_progress"
                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400"
                                            : "bg-muted text-muted-foreground",
                                    )}
                                  >
                                    {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace("_", " ")}
                                  </span>

                                  <div className="flex">
                                    {task.status !== "completed" && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleUpdateTaskStatus(task.id, "completed")}
                                        className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                                      >
                                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                      </Button>
                                    )}
                                    {task.status !== "in_progress" &&
                                      task.status !== "completed" &&
                                      task.status !== "failed" && (
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleUpdateTaskStatus(task.id, "in_progress")}
                                          className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        >
                                          <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                                        </Button>
                                      )}
                                    {task.status !== "failed" && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleUpdateTaskStatus(task.id, "failed")}
                                        className="h-6 w-6 sm:h-8 sm:w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                      >
                                        <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center">
                        <Card className="w-full border-dashed bg-muted/30">
                          <CardContent className="p-2 sm:p-4 text-center">
                            <p className="text-xs sm:text-sm text-muted-foreground">No tasks scheduled</p>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showReminder && currentTask && (
        <TaskReminder
          task={{
            id: currentTask.id,
            title: currentTask.title,
            startTime: currentTask.startTime,
            endTime: currentTask.endTime,
            completed: currentTask.status === "completed",
          }}
          onClose={() => setShowReminder(false)}
          onComplete={() => handleUpdateTaskStatus(currentTask.id, "completed")}
          onIncomplete={() => handleUpdateTaskStatus(currentTask.id, "failed")}
        />
      )}
    </div>
  )
}

