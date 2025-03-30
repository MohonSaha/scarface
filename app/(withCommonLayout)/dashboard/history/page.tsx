"use client"

import { useState, useEffect } from "react"
import { format, subDays, eachDayOfInterval, isSameDay, startOfDay, endOfDay } from "date-fns"
import { Calendar, BarChart, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { DateRange } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task } from "@/types/task"
import { cn } from "@/lib/utils"

export default function HistoryPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [date, setDate] = useState<Date>(new Date())
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState<"day" | "range">("day")
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "incomplete">("all")

  // Generate mock data for the  = useState<"all" | "completed" | "incomplete">("all")

  // Generate mock data for the past 30 days
  useEffect(() => {
    const generateMockTasks = () => {
      const mockTasks: Task[] = []
      const today = new Date()

      // Generate tasks for the past 30 days
      for (let i = 0; i < 30; i++) {
        const taskDate = subDays(today, i)
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

  // Filter tasks based on selected date or date range
  const getFilteredTasks = () => {
    if (view === "day") {
      return tasks.filter((task) => isSameDay(new Date(task.startTime), date))
    } else if (dateRange?.from && dateRange?.to) {
      return tasks.filter((task) => {
        const taskDate = new Date(task.startTime)
        return taskDate >= startOfDay(dateRange.from) && taskDate <= endOfDay(dateRange.to || dateRange.from)
      })
    }
    return []
  }

  // Apply status filter
  const getStatusFilteredTasks = (tasksList: Task[]) => {
    if (filterStatus === "completed") {
      return tasksList.filter((task) => task.completed)
    } else if (filterStatus === "incomplete") {
      return tasksList.filter((task) => !task.completed)
    }
    return tasksList
  }

  const filteredTasks = getStatusFilteredTasks(getFilteredTasks())

  // Calculate statistics
  const calculateStats = (tasksList: Task[]) => {
    const totalTasks = tasksList.length
    const completedTasks = tasksList.filter((task) => task.completed).length
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    // Calculate average tasks per day for range view
    let avgTasksPerDay = 0
    if (view === "range" && dateRange?.from && dateRange?.to) {
      const days = eachDayOfInterval({
        start: dateRange.from,
        end: dateRange.to || dateRange.from,
      })
      avgTasksPerDay = totalTasks / days.length
    }

    return {
      totalTasks,
      completedTasks,
      incompleteTasks: totalTasks - completedTasks,
      completionRate,
      avgTasksPerDay: Math.round(avgTasksPerDay * 10) / 10, // Round to 1 decimal place
    }
  }

  const stats = calculateStats(filteredTasks)

  // Handle date range selection
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Task History</h1>

      <Tabs defaultValue="day" className="mb-6" onValueChange={(value) => setView(value as "day" | "range")}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="day">Single Day</TabsTrigger>
            <TabsTrigger value="range">Date Range</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="h-10 w-10">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="day" className="mt-0">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Selected Date</p>
                      <p className="font-medium">{format(date, "MMMM d, yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tasks</p>
                      <p className="font-medium">{stats.totalTasks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="font-medium">{stats.completedTasks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${stats.completionRate}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">{stats.completionRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Tasks for {format(date, "MMMM d, yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <p>Loading tasks...</p>
                  </div>
                ) : filteredTasks.length > 0 ? (
                  <div className="space-y-4">
                    {filteredTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(task.startTime), "h:mm a")} - {format(new Date(task.endTime), "h:mm a")}
                          </p>
                        </div>
                        <div>
                          {task.completed ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              Completed
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                              Not Completed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <p className="text-muted-foreground mb-4">No tasks found for this date</p>
                    <Button asChild>
                      <a href="/dashboard">Add Tasks</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="range" className="mt-0">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date Range</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground",
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {dateRange?.from ? (
                            dateRange.to ? (
                              <>
                                {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(dateRange.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date range</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          initialFocus
                          mode="range"
                          defaultMonth={dateRange?.from}
                          selected={dateRange}
                          onSelect={handleDateRangeSelect}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                    <div className="text-sm">
                      <p className="font-medium">Quick Select</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setDateRange({
                            from: subDays(new Date(), 7),
                            to: new Date(),
                          })
                        }
                      >
                        Week
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setDateRange({
                            from: subDays(new Date(), 30),
                            to: new Date(),
                          })
                        }
                      >
                        Month
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Range Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Date Range</p>
                      <p className="font-medium">
                        {dateRange?.from && dateRange?.to ? (
                          <>
                            {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                          </>
                        ) : dateRange?.from ? (
                          format(dateRange.from, "MMMM d, yyyy")
                        ) : (
                          "No date selected"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tasks</p>
                      <p className="font-medium">{stats.totalTasks}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="font-medium text-green-600">{stats.completedTasks}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Incomplete</p>
                        <p className="font-medium text-red-600">{stats.incompleteTasks}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg. Tasks Per Day</p>
                      <p className="font-medium">{stats.avgTasksPerDay}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                        <div
                          className="bg-primary h-2.5 rounded-full"
                          style={{ width: `${stats.completionRate}%` }}
                        ></div>
                      </div>
                      <p className="text-sm mt-1">{stats.completionRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Task History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <p>Loading tasks...</p>
                  </div>
                ) : filteredTasks.length > 0 ? (
                  <div className="space-y-6">
                    {/* Group tasks by date */}
                    {Array.from(
                      filteredTasks.reduce((groups, task) => {
                        const date = format(new Date(task.startTime), "yyyy-MM-dd")
                        if (!groups.has(date)) {
                          groups.set(date, [])
                        }
                        groups.get(date)!.push(task)
                        return groups
                      }, new Map<string, Task[]>()),
                    ).map(([dateStr, dateTasks]) => (
                      <div key={dateStr}>
                        <h3 className="font-medium text-sm bg-muted/30 p-2 rounded-md mb-2">
                          {format(new Date(dateStr), "EEEE, MMMM d, yyyy")}
                        </h3>
                        <div className="space-y-2 pl-2">
                          {dateTasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border">
                              <div>
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {format(new Date(task.startTime), "h:mm a")} -{" "}
                                  {format(new Date(task.endTime), "h:mm a")}
                                </p>
                              </div>
                              <div>
                                {task.completed ? (
                                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                    Completed
                                  </span>
                                ) : (
                                  <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                                    Not Completed
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <p className="text-muted-foreground mb-4">No tasks found for this date range</p>
                    <Button asChild>
                      <a href="/dashboard">Add Tasks</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

