// "use client"

// import { useState, useEffect } from "react"
// import {
//   format,
//   subWeeks,
//   subMonths,
//   startOfWeek,
//   endOfWeek,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameDay,
//   isWithinInterval,
// } from "date-fns"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
// import type { Task } from "@/types/task"

// interface StatisticsProps {
//   tasks: Task[]
// }

// export function Statistics({ tasks }: StatisticsProps) {
//   const [view, setView] = useState<"weekly" | "monthly">("weekly")
//   const [currentPeriodTasks, setCurrentPeriodTasks] = useState<Task[]>([])
//   const [previousPeriodTasks, setPreviousPeriodTasks] = useState<Task[]>([])
//   const [currentPeriodDates, setCurrentPeriodDates] = useState<Date[]>([])
//   const [previousPeriodDates, setPreviousPeriodDates] = useState<Date[]>([])

//   useEffect(() => {
//     const today = new Date()
//     let currentInterval: { start: Date; end: Date }
//     let previousInterval: { start: Date; end: Date }

//     if (view === "weekly") {
//       // Current week
//       currentInterval = {
//         start: startOfWeek(today, { weekStartsOn: 1 }),
//         end: endOfWeek(today, { weekStartsOn: 1 }),
//       }

//       // Previous week
//       previousInterval = {
//         start: startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
//         end: endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
//       }
//     } else {
//       // Current month
//       currentInterval = {
//         start: startOfMonth(today),
//         end: endOfMonth(today),
//       }

//       // Previous month
//       previousInterval = {
//         start: startOfMonth(subMonths(today, 1)),
//         end: endOfMonth(subMonths(today, 1)),
//       }
//     }

//     // Get all days in the intervals
//     const currentDays = eachDayOfInterval(currentInterval)
//     const previousDays = eachDayOfInterval(previousInterval)

//     setCurrentPeriodDates(currentDays)
//     setPreviousPeriodDates(previousDays)

//     // Filter tasks for current and previous periods
//     const currentTasks = tasks.filter((task) => isWithinInterval(new Date(task.startTime), currentInterval))

//     const previousTasks = tasks.filter((task) => isWithinInterval(new Date(task.startTime), previousInterval))

//     setCurrentPeriodTasks(currentTasks)
//     setPreviousPeriodTasks(previousTasks)
//   }, [tasks, view])

//   // Calculate statistics
//   const calculateStats = (tasksList: Task[]) => {
//     const totalTasks = tasksList.length
//     const completedTasks = tasksList.filter((task) => task.completed).length
//     const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

//     return {
//       totalTasks,
//       completedTasks,
//       incompleteTasks: totalTasks - completedTasks,
//       completionRate,
//     }
//   }

//   const currentStats = calculateStats(currentPeriodTasks)
//   const previousStats = calculateStats(previousPeriodTasks)

//   // Calculate daily task counts for charts
//   const getDailyTaskCounts = (tasksList: Task[], dates: Date[]) => {
//     return dates.map((date) => {
//       const dayTasks = tasksList.filter((task) => isSameDay(new Date(task.startTime), date))
//       return {
//         date,
//         total: dayTasks.length,
//         completed: dayTasks.filter((task) => task.completed).length,
//       }
//     })
//   }

//   const currentDailyStats = getDailyTaskCounts(currentPeriodTasks, currentPeriodDates)
//   const previousDailyStats = getDailyTaskCounts(previousPeriodTasks, previousPeriodDates)

//   // Calculate percentage changes
//   const calculateChange = (current: number, previous: number) => {
//     if (previous === 0) return current > 0 ? 100 : 0
//     return Math.round(((current - previous) / previous) * 100)
//   }

//   const totalTasksChange = calculateChange(currentStats.totalTasks, previousStats.totalTasks)
//   const completionRateChange = calculateChange(currentStats.completionRate, previousStats.completionRate)

//   // Find max value for chart scaling
//   const maxTasks = Math.max(
//     ...currentDailyStats.map((day) => day.total),
//     ...previousDailyStats.map((day) => day.total),
//     3, // Minimum height for empty charts
//   )

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <CardTitle className="text-xl flex items-center gap-2">
//             <Activity className="h-5 w-5 text-primary" />
//             Productivity Statistics
//           </CardTitle>

//           <Tabs defaultValue="weekly" onValueChange={(value) => setView(value as "weekly" | "monthly")}>
//             <TabsList>
//               <TabsTrigger value="weekly">Weekly</TabsTrigger>
//               <TabsTrigger value="monthly">Monthly</TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-8">
//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Total Tasks</p>
//                     <p className="text-2xl font-bold">{currentStats.totalTasks}</p>
//                   </div>
//                   <div
//                     className={cn(
//                       "flex items-center text-xs rounded-full px-2 py-1",
//                       totalTasksChange > 0
//                         ? "bg-green-100 text-green-800"
//                         : totalTasksChange < 0
//                           ? "bg-red-100 text-red-800"
//                           : "bg-gray-100 text-gray-800",
//                     )}
//                   >
//                     {totalTasksChange > 0 ? (
//                       <ArrowUpRight className="h-3 w-3 mr-1" />
//                     ) : totalTasksChange < 0 ? (
//                       <ArrowDownRight className="h-3 w-3 mr-1" />
//                     ) : null}
//                     {totalTasksChange > 0 ? "+" : ""}
//                     {totalTasksChange}%
//                   </div>
//                 </div>
//                 <p className="text-xs text-muted-foreground mt-2">vs previous {view}</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Completed</p>
//                     <p className="text-2xl font-bold">{currentStats.completedTasks}</p>
//                   </div>
//                   <div className="text-green-600 text-sm">{currentStats.completionRate}%</div>
//                 </div>
//                 <div className="w-full bg-muted rounded-full h-1.5 mt-2">
//                   <div
//                     className="bg-green-500 h-1.5 rounded-full"
//                     style={{ width: `${currentStats.completionRate}%` }}
//                   ></div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Completion Rate</p>
//                     <p className="text-2xl font-bold">{currentStats.completionRate}%</p>
//                   </div>
//                   <div
//                     className={cn(
//                       "flex items-center text-xs rounded-full px-2 py-1",
//                       completionRateChange > 0
//                         ? "bg-green-100 text-green-800"
//                         : completionRateChange < 0
//                           ? "bg-red-100 text-red-800"
//                           : "bg-gray-100 text-gray-800",
//                     )}
//                   >
//                     {completionRateChange > 0 ? (
//                       <ArrowUpRight className="h-3 w-3 mr-1" />
//                     ) : completionRateChange < 0 ? (
//                       <ArrowDownRight className="h-3 w-3 mr-1" />
//                     ) : null}
//                     {completionRateChange > 0 ? "+" : ""}
//                     {completionRateChange}%
//                   </div>
//                 </div>
//                 <p className="text-xs text-muted-foreground mt-2">vs previous {view}</p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Incomplete</p>
//                     <p className="text-2xl font-bold">{currentStats.incompleteTasks}</p>
//                   </div>
//                   <div className="text-red-600 text-sm">
//                     {currentStats.totalTasks > 0
//                       ? Math.round((currentStats.incompleteTasks / currentStats.totalTasks) * 100)
//                       : 0}
//                     %
//                   </div>
//                 </div>
//                 <div className="w-full bg-muted rounded-full h-1.5 mt-2">
//                   <div
//                     className="bg-red-500 h-1.5 rounded-full"
//                     style={{
//                       width: `${
//                         currentStats.totalTasks > 0
//                           ? Math.round((currentStats.incompleteTasks / currentStats.totalTasks) * 100)
//                           : 0
//                       }%`,
//                     }}
//                   ></div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Chart */}
//           <Card>
//             <CardHeader className="pb-2">
//               <CardTitle className="text-base font-medium">
//                 {view === "weekly" ? "Weekly" : "Monthly"} Task Comparison
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[300px] w-full">
//                 <div className="flex h-full">
//                   {/* Chart Legend */}
//                   <div className="flex flex-col justify-end pr-2 pb-6">
//                     {[...Array(5)].map((_, i) => (
//                       <div key={i} className="text-xs text-muted-foreground h-12 flex items-center justify-end">
//                         {Math.round(maxTasks - i * (maxTasks / 4))}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Chart Bars */}
//                   <div className="flex-1 flex items-end">
//                     <div className="w-full flex flex-col">
//                       {/* Current Period */}
//                       <div className="flex-1 flex justify-between items-end border-t border-muted pt-2">
//                         {currentDailyStats.map((day, i) => (
//                           <div key={i} className="flex flex-col items-center group">
//                             <div className="relative flex flex-col items-center">
//                               {/* Tooltip */}
//                               <div className="absolute bottom-full mb-2 bg-black text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                                 {format(day.date, "MMM d")}: {day.total} tasks ({day.completed} completed)
//                               </div>

//                               {/* Completed Bar */}
//                               <div
//                                 className="w-5 sm:w-8 bg-green-500 rounded-t"
//                                 style={{
//                                   height: `${(day.completed / maxTasks) * 200}px`,
//                                   minHeight: day.completed > 0 ? "4px" : "0",
//                                 }}
//                               ></div>

//                               {/* Incomplete Bar */}
//                               <div
//                                 className="w-5 sm:w-8 bg-red-400"
//                                 style={{
//                                   height: `${((day.total - day.completed) / maxTasks) * 200}px`,
//                                   minHeight: day.total - day.completed > 0 ? "4px" : "0",
//                                 }}
//                               ></div>
//                             </div>

//                             {/* X-axis Label */}
//                             <div className="text-[10px] mt-1 text-muted-foreground">
//                               {format(day.date, view === "weekly" ? "EEE" : "d")}
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Period Label */}
//                       <div className="text-xs font-medium text-center mt-4 mb-6">
//                         Current {view === "weekly" ? "Week" : "Month"}
//                       </div>

//                       {/* Previous Period */}
//                       <div className="flex-1 flex justify-between items-end border-t border-muted pt-2">
//                         {previousDailyStats.map((day, i) => (
//                           <div key={i} className="flex flex-col items-center group">
//                             <div className="relative flex flex-col items-center">
//                               {/* Tooltip */}
//                               <div className="absolute bottom-full mb-2 bg-black text-white text-xs rounded p-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
//                                 {format(day.date, "MMM d")}: {day.total} tasks ({day.completed} completed)
//                               </div>

//                               {/* Completed Bar */}
//                               <div
//                                 className="w-5 sm:w-8 bg-green-500/50 rounded-t"
//                                 style={{
//                                   height: `${(day.completed / maxTasks) * 200}px`,
//                                   minHeight: day.completed > 0 ? "4px" : "0",
//                                 }}
//                               ></div>

//                               {/* Incomplete Bar */}
//                               <div
//                                 className="w-5 sm:w-8 bg-red-400/50"
//                                 style={{
//                                   height: `${((day.total - day.completed) / maxTasks) * 200}px`,
//                                   minHeight: day.total - day.completed > 0 ? "4px" : "0",
//                                 }}
//                               ></div>
//                             </div>

//                             {/* X-axis Label */}
//                             <div className="text-[10px] mt-1 text-muted-foreground">
//                               {format(day.date, view === "weekly" ? "EEE" : "d")}
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* Period Label */}
//                       <div className="text-xs font-medium text-center mt-4">
//                         Previous {view === "weekly" ? "Week" : "Month"}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Legend */}
//               <div className="flex justify-center gap-6 mt-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
//                   <span className="text-xs">Completed</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
//                   <span className="text-xs">Incomplete</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-green-500/50 rounded-sm"></div>
//                   <span className="text-xs">Previous Period</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// // Helper function for className conditionals
// function cn(...classes: (string | boolean | undefined)[]) {
//   return classes.filter(Boolean).join(" ")
// }



"use client"

import { useState, useEffect } from "react"
import {
  subWeeks,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
} from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import type { Task } from "@/types/task"
import { ProductivityChart } from "@/components/productivity-chart"
import { cn } from "@/lib/utils"

interface StatisticsProps {
  tasks: Task[]
}

export function Statistics({ tasks }: StatisticsProps) {
  const [view, setView] = useState<"weekly" | "monthly">("weekly")
  const [currentPeriodTasks, setCurrentPeriodTasks] = useState<Task[]>([])
  const [previousPeriodTasks, setPreviousPeriodTasks] = useState<Task[]>([])
  const [currentPeriodDates, setCurrentPeriodDates] = useState<Date[]>([])
  const [previousPeriodDates, setPreviousPeriodDates] = useState<Date[]>([])

  useEffect(() => {
    const today = new Date()
    let currentInterval: { start: Date; end: Date }
    let previousInterval: { start: Date; end: Date }

    if (view === "weekly") {
      // Current week
      currentInterval = {
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 }),
      }

      // Previous week
      previousInterval = {
        start: startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
        end: endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 }),
      }
    } else {
      // Current month
      currentInterval = {
        start: startOfMonth(today),
        end: endOfMonth(today),
      }

      // Previous month
      previousInterval = {
        start: startOfMonth(subMonths(today, 1)),
        end: endOfMonth(subMonths(today, 1)),
      }
    }

    // Get all days in the intervals
    const currentDays = eachDayOfInterval(currentInterval)
    const previousDays = eachDayOfInterval(previousInterval)

    setCurrentPeriodDates(currentDays)
    setPreviousPeriodDates(previousDays)

    // Filter tasks for current and previous periods
    const currentTasks = tasks.filter((task) => isWithinInterval(new Date(task.startTime), currentInterval))

    const previousTasks = tasks.filter((task) => isWithinInterval(new Date(task.startTime), previousInterval))

    setCurrentPeriodTasks(currentTasks)
    setPreviousPeriodTasks(previousTasks)
  }, [tasks, view])

  // Calculate statistics
  const calculateStats = (tasksList: Task[]) => {
    const totalTasks = tasksList.length
    const completedTasks = tasksList.filter((task) => task.completed).length
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return {
      totalTasks,
      completedTasks,
      incompleteTasks: totalTasks - completedTasks,
      completionRate,
    }
  }

  const currentStats = calculateStats(currentPeriodTasks)
  const previousStats = calculateStats(previousPeriodTasks)

  // Calculate daily task counts for charts
  const getDailyTaskCounts = (tasksList: Task[], dates: Date[]) => {
    return dates.map((date) => {
      const dayTasks = tasksList.filter((task) => isSameDay(new Date(task.startTime), date))
      return {
        date,
        total: dayTasks.length,
        completed: dayTasks.filter((task) => task.completed).length,
      }
    })
  }

  const currentDailyStats = getDailyTaskCounts(currentPeriodTasks, currentPeriodDates)
  const previousDailyStats = getDailyTaskCounts(previousPeriodTasks, previousPeriodDates)

  // Calculate percentage changes
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  const totalTasksChange = calculateChange(currentStats.totalTasks, previousStats.totalTasks)
  const completionRateChange = calculateChange(currentStats.completionRate, previousStats.completionRate)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Productivity Statistics
          </CardTitle>

          <Tabs defaultValue="weekly" onValueChange={(value) => setView(value as "weekly" | "monthly")}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">{currentStats.totalTasks}</p>
                  </div>
                  <div
                    className={cn(
                      "flex items-center text-xs rounded-full px-2 py-1",
                      totalTasksChange > 0
                        ? "bg-green-100 text-green-800"
                        : totalTasksChange < 0
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {totalTasksChange > 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : totalTasksChange < 0 ? (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    ) : null}
                    {totalTasksChange > 0 ? "+" : ""}
                    {totalTasksChange}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">vs previous {view}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{currentStats.completedTasks}</p>
                  </div>
                  <div className="text-green-600 text-sm">{currentStats.completionRate}%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: `${currentStats.completionRate}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                    <p className="text-2xl font-bold">{currentStats.completionRate}%</p>
                  </div>
                  <div
                    className={cn(
                      "flex items-center text-xs rounded-full px-2 py-1",
                      completionRateChange > 0
                        ? "bg-green-100 text-green-800"
                        : completionRateChange < 0
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800",
                    )}
                  >
                    {completionRateChange > 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : completionRateChange < 0 ? (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    ) : null}
                    {completionRateChange > 0 ? "+" : ""}
                    {completionRateChange}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">vs previous {view}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Incomplete</p>
                    <p className="text-2xl font-bold">{currentStats.incompleteTasks}</p>
                  </div>
                  <div className="text-red-600 text-sm">
                    {currentStats.totalTasks > 0
                      ? Math.round((currentStats.incompleteTasks / currentStats.totalTasks) * 100)
                      : 0}
                    %
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                  <div
                    className="bg-red-500 h-1.5 rounded-full"
                    style={{
                      width: `${
                        currentStats.totalTasks > 0
                          ? Math.round((currentStats.incompleteTasks / currentStats.totalTasks) * 100)
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <ProductivityChart
            title={`${view === "weekly" ? "Weekly" : "Monthly"} Task Comparison`}
            currentPeriodData={currentDailyStats}
            previousPeriodData={previousDailyStats}
            periodLabel={view === "weekly" ? "Week" : "Month"}
            height={300}
          />
        </div>
      </CardContent>
    </Card>
  )
}

