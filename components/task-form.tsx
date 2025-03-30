


// "use client"

// import type React from "react"

// import { useState } from "react"
// import { v4 as uuidv4 } from "uuid"
// import { X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import type { Task } from "@/types/task"

// interface TaskFormProps {
//   onClose: () => void
//   onAddTask: (task: Task) => void
// }

// export function TaskForm({ onClose, onAddTask }: TaskFormProps) {
//   const [title, setTitle] = useState("")
//   const [startTime, setStartTime] = useState("")
//   const [endTime, setEndTime] = useState("")
//   const [error, setError] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!title || !startTime || !endTime) {
//       setError("Please fill in all fields")
//       return
//     }

//     const today = new Date()
//     const startDate = new Date(today.toDateString() + " " + startTime)
//     const endDate = new Date(today.toDateString() + " " + endTime)

//     if (endDate <= startDate) {
//       setError("End time must be after start time")
//       return
//     }

//     const newTask: Task = {
//       id: uuidv4(),
//       title,
//       startTime: startDate,
//       endTime: endDate,
//       completed: false,
//     }

//     onAddTask(newTask)
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-lg sm:text-xl">Add New Task</CardTitle>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-4 w-4" />
//           </Button>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Task Title</Label>
//               <Input
//                 id="title"
//                 placeholder="Enter task title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="start-time">Start Time</Label>
//                 <Input id="start-time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="end-time">End Time</Label>
//                 <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
//               </div>
//             </div>
//             {error && <p className="text-sm text-red-500">{error}</p>}
//           </CardContent>
//           <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 mt-2">
//             <Button variant="outline" type="button" onClick={onClose} className="w-full sm:w-auto">
//               Cancel
//             </Button>
//             <Button type="submit" className="w-full sm:w-auto">
//               Add Task
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   )
// }





"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { X, Clock, Calendar, CheckCircle, AlertCircle, Plus, Trash2, Edit2, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import type { Task, DailyTask, Category } from "@/types/task"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { createDailyTask } from "@/components/task-service"
import { useToast } from "@/components/ui/toast-context"
import { Task, DailyTask, Category } from "@/app/types/types"

interface TaskFormProps {
  onClose: () => void
  onAddTask: (task: Task) => void
  initialDate?: Date
}

export function TaskForm({ onClose, onAddTask, initialDate = new Date() }: TaskFormProps) {
  const { success, error: showError } = useToast()
  const [title, setTitle] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [date, setDate] = useState(format(initialDate, "yyyy-MM-dd"))
  const [categoryId, setCategoryId] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showStartClock, setShowStartClock] = useState(false)
  const [showEndClock, setShowEndClock] = useState(false)
  const [activeClockType, setActiveClockType] = useState<"hour" | "minute">("hour")
  const [tempHour, setTempHour] = useState(0)
  const [tempMinute, setTempMinute] = useState(0)
  const [tempAmPm, setTempAmPm] = useState<"AM" | "PM">("AM")
  const [editingTime, setEditingTime] = useState<"start" | "end">("start")
  const [plannedTasks, setPlannedTasks] = useState<DailyTask[]>([])
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Set default times based on current time
  useEffect(() => {
    const now = new Date()
    const roundedHour = new Date(now.setMinutes(0, 0, 0))
    const nextHour = new Date(roundedHour)
    nextHour.setHours(nextHour.getHours() + 1)

    setStartTime(formatTimeForInput(roundedHour))
    setEndTime(formatTimeForInput(nextHour))
  }, [])

  // Fetch categories for the selected date
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/daily-categories?date=${date}`)
        if (response.ok) {
          const data = await response.json()
          setCategories(data)
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }

    fetchCategories()
  }, [date])

  const formatTimeForInput = (date: Date) => {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
  }

  const formatTimeForDisplay = (timeString: string) => {
    if (!timeString) return ""
    const [hours, minutes] = timeString.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes, 0, 0)
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
  }

  const resetForm = () => {
    setTitle("")
    setNotes("")
    setError("")
    setSubmitted(false)
    setEditingTaskIndex(null)

    // Set default times for the next task
    const lastTask = plannedTasks[plannedTasks.length - 1]
    if (lastTask) {
      // Set start time to the end time of the last task
      const endTimeOfLastTask = format(lastTask.endTime, "HH:mm")
      setStartTime(endTimeOfLastTask)

      // Set end time to one hour after the start time
      const endDate = new Date(lastTask.endTime)
      endDate.setHours(endDate.getHours() + 1)
      setEndTime(format(endDate, "HH:mm"))
    }

    setCurrentStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (plannedTasks.length === 0) {
        if (!addCurrentTaskToPlanned()) {
          setIsLoading(false)
          return
        }
      }

      // Submit all planned tasks to the API
      for (const task of plannedTasks) {
        await createDailyTask({
          title: task.title,
          date: task.date,
          startTime: task.startTime,
          endTime: task.endTime,
          status: "scheduled",
          categoryId: task.categoryId,
          notes: task.notes || "",
        })
      }

      success(`Successfully created ${plannedTasks.length} task(s)`)
      onClose()
    } catch (err) {
      console.error("Error creating tasks:", err)
      showError("Failed to create tasks")
    } finally {
      setIsLoading(false)
    }
  }

  const validateCurrentTask = () => {
    setSubmitted(true)

    if (!title) {
      setError("Please enter a task title")
      return false
    }

    if (!startTime || !endTime) {
      setError("Please set both start and end times")
      return false
    }

    const startDate = new Date(`${date}T${startTime}`)
    const endDate = new Date(`${date}T${endTime}`)

    if (endDate <= startDate) {
      setError("End time must be after start time")
      return false
    }

    return true
  }

  const addCurrentTaskToPlanned = () => {
    if (!validateCurrentTask()) {
      return false
    }

    const startDate = new Date(`${date}T${startTime}`)
    const endDate = new Date(`${date}T${endTime}`)

    const newTask: DailyTask = {
      id: uuidv4(),
      title,
      date,
      startTime: startDate,
      endTime: endDate,
      status: "scheduled",
      categoryId: categoryId || undefined,
      category: categoryId ? categories.find((c) => c.id === categoryId) : undefined,
      notes: notes || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (editingTaskIndex !== null) {
      // Update existing task
      const updatedTasks = [...plannedTasks]
      updatedTasks[editingTaskIndex] = newTask
      setPlannedTasks(updatedTasks)
    } else {
      // Add new task
      setPlannedTasks([...plannedTasks, newTask])
    }

    setError("")
    return true
  }

  const addAnotherTask = () => {
    if (addCurrentTaskToPlanned()) {
      resetForm()
    }
  }

  const editTask = (index: number) => {
    const task = plannedTasks[index]
    setTitle(task.title)
    setDate(task.date)
    setStartTime(format(task.startTime, "HH:mm"))
    setEndTime(format(task.endTime, "HH:mm"))
    setCategoryId(task.categoryId || "")
    setNotes(task.notes || "")
    setEditingTaskIndex(index)
    setCurrentStep(1)
  }

  const deleteTask = (index: number) => {
    const updatedTasks = plannedTasks.filter((_, i) => i !== index)
    setPlannedTasks(updatedTasks)
  }

  const nextStep = () => {
    if (!title) {
      setError("Please enter a task title")
      setSubmitted(true)
      return
    }
    setError("")
    setCurrentStep(2)
  }

  const prevStep = () => {
    setCurrentStep(1)
  }

  const goToReviewStep = () => {
    if (addCurrentTaskToPlanned()) {
      setCurrentStep(3)
    }
  }

  const openClock = (type: "start" | "end") => {
    setEditingTime(type)
    const timeString = type === "start" ? startTime : endTime
    const [hours, minutes] = timeString.split(":").map(Number)

    let hour12 = hours % 12
    if (hour12 === 0) hour12 = 12

    setTempHour(hour12)
    setTempMinute(minutes)
    setTempAmPm(hours >= 12 ? "PM" : "AM")
    setActiveClockType("hour")

    if (type === "start") {
      setShowStartClock(true)
      setShowEndClock(false)
    } else {
      setShowEndClock(true)
      setShowStartClock(false)
    }
  }

  const closeClock = () => {
    setShowStartClock(false)
    setShowEndClock(false)
  }

  const applySelectedTime = () => {
    // Convert from 12-hour to 24-hour format
    let hours24 = tempHour
    if (tempAmPm === "PM" && tempHour < 12) hours24 += 12
    if (tempAmPm === "AM" && tempHour === 12) hours24 = 0

    const timeString = `${String(hours24).padStart(2, "0")}:${String(tempMinute).padStart(2, "0")}`

    if (editingTime === "start") {
      setStartTime(timeString)
    } else {
      setEndTime(timeString)
    }

    closeClock()
  }

  const handleClockClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clockRect = e.currentTarget.getBoundingClientRect()
    const clockCenterX = clockRect.width / 2
    const clockCenterY = clockRect.height / 2

    const x = e.clientX - clockRect.left - clockCenterX
    const y = e.clientY - clockRect.top - clockCenterY

    // Calculate angle in radians, then convert to degrees
    let angle = Math.atan2(y, x) * (180 / Math.PI)
    // Adjust angle to start from 12 o'clock position and go clockwise
    angle = (angle + 90) % 360
    if (angle < 0) angle += 360

    if (activeClockType === "hour") {
      // Convert angle to hour (12 hours around the clock)
      let hour = Math.round(angle / 30) % 12
      if (hour === 0) hour = 12
      setTempHour(hour)
    } else {
      // Convert angle to minute (60 minutes around the clock)
      const minute = Math.round(angle / 6) % 60
      setTempMinute(minute)
    }
  }

  const toggleAmPm = () => {
    setTempAmPm(tempAmPm === "AM" ? "PM" : "AM")
  }

  const renderClockFace = () => {
    const clockNumbers =
      activeClockType === "hour"
        ? [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

    const activeValue = activeClockType === "hour" ? tempHour : tempMinute

    // Calculate angle for the hand
    let handAngle = 0
    if (activeClockType === "hour") {
      handAngle = (tempHour % 12) * 30 - 90
    } else {
      handAngle = tempMinute * 6 - 90
    }

    return (
      <div className="relative w-64 h-64 mx-auto my-4">
        {/* Clock face */}
        <div className="absolute inset-0 rounded-full bg-muted/30 border border-border" onClick={handleClockClick}>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>

          {/* Clock hand */}
          <div
            className="absolute top-1/2 left-1/2 origin-center h-[45%] w-1 bg-primary rounded-full"
            style={{ transform: `translate(-50%, 0) rotate(${handAngle}deg)` }}
          ></div>

          {/* Clock numbers */}
          {clockNumbers.map((num, index) => {
            const angle = index * 30 * (Math.PI / 180)
            const x = Math.sin(angle) * 100 + 50
            const y = -Math.cos(angle) * 100 + 50

            const isActive =
              (activeClockType === "hour" && num === activeValue) ||
              (activeClockType === "minute" && num === activeValue)

            return (
              <div
                key={num}
                className={cn(
                  "absolute w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted/50 cursor-pointer",
                )}
                style={{
                  left: `calc(${x}% - 16px)`,
                  top: `calc(${y}% - 16px)`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  if (activeClockType === "hour") {
                    setTempHour(num)
                  } else {
                    setTempMinute(num)
                  }
                }}
              >
                {num}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const getStepTitle = () => {
    if (currentStep === 1) return "Create New Task"
    if (currentStep === 3) return "Review Your Plan"
    if (showStartClock || showEndClock) return "Select Time"
    return "Set Task Time"
  }

  const getStepDescription = () => {
    if (currentStep === 1) return "What do you need to accomplish?"
    if (currentStep === 3) return "Review your planned tasks for the day"
    if (showStartClock) return "Set start time for your task"
    if (showEndClock) return "Set end time for your task"
    return "When do you want to work on this?"
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md overflow-hidden border-none shadow-2xl">
        <div className="bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <h2 className="text-xl font-bold mb-1">{getStepTitle()}</h2>
          <p className="text-sm text-primary-foreground/80">{getStepDescription()}</p>

          {/* Step indicator */}
          <div className="flex items-center mt-4 gap-2">
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                currentStep === 1 ? "bg-white scale-125" : "bg-white/50",
              )}
            />
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                currentStep === 2 ? "bg-white scale-125" : "bg-white/50",
              )}
            />
            <div
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                currentStep === 3 ? "bg-white scale-125" : "bg-white/50",
              )}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <CardContent className="p-6">
            {currentStep === 1 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Task Title
                  </Label>
                  <div className="relative">
                    <Input
                      id="title"
                      placeholder="Enter task title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value)
                        if (submitted && e.target.value) setError("")
                      }}
                      className={cn(
                        "pl-10 py-6 text-base",
                        submitted && !title ? "border-red-500 focus-visible:ring-red-500" : "",
                      )}
                    />
                    <CheckCircle
                      className={cn(
                        "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-opacity",
                        title ? "text-green-500 opacity-100" : "opacity-0",
                      )}
                    />
                  </div>
                  {submitted && !title && (
                    <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>Task title is required</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-base font-medium flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="text-base py-6"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-medium flex items-center gap-1">
                    <Tag className="h-4 w-4 text-primary" />
                    Category
                  </Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger className="text-base py-6">
                      <SelectValue placeholder="Select a category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Category</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {plannedTasks.length > 0 && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Tasks planned so far: {plannedTasks.length}</h3>
                    <div className="text-sm text-muted-foreground">Continue adding tasks to plan your entire day</div>
                  </div>
                )}
              </div>
            ) : currentStep === 3 ? (
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Your Day Plan</h3>
                <div className="max-h-[300px] overflow-y-auto pr-2">
                  {plannedTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-lg border mb-2 bg-muted/10 hover:bg-muted/20"
                    >
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {format(task.startTime, "h:mm a")} - {format(task.endTime, "h:mm a")}
                        </p>
                        {task.category && (
                          <div className="flex items-center gap-1 mt-1">
                            <div className={`h-2 w-2 rounded-full ${task.category.color}`}></div>
                            <span className="text-xs">{task.category.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => editTask(index)}
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(index)}
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setCurrentStep(1)
                  }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Task
                </Button>
              </div>
            ) : showStartClock || showEndClock ? (
              <div className="space-y-4">
                {/* Clock view */}
                <div className="flex justify-center gap-4 mb-2">
                  <Button
                    type="button"
                    variant={activeClockType === "hour" ? "default" : "outline"}
                    onClick={() => setActiveClockType("hour")}
                    className="w-24"
                  >
                    Hours
                  </Button>
                  <Button
                    type="button"
                    variant={activeClockType === "minute" ? "default" : "outline"}
                    onClick={() => setActiveClockType("minute")}
                    className="w-24"
                  >
                    Minutes
                  </Button>
                </div>

                <div className="flex justify-center items-center gap-2 text-3xl font-bold">
                  <span className={activeClockType === "hour" ? "text-primary" : ""}>
                    {String(tempHour).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className={activeClockType === "minute" ? "text-primary" : ""}>
                    {String(tempMinute).padStart(2, "0")}
                  </span>
                  <Button type="button" variant="outline" onClick={toggleAmPm} className="ml-2">
                    {tempAmPm}
                  </Button>
                </div>

                {renderClockFace()}

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={closeClock}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={applySelectedTime}>
                    Apply
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-base font-medium flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      Start Time
                    </Label>
                    <div className="relative">
                      <Input
                        id="start-time"
                        type="time"
                        value={startTime}
                        onChange={(e) => {
                          setStartTime(e.target.value)
                          if (submitted && e.target.value) setError("")
                        }}
                        className={cn(
                          "text-base py-6",
                          submitted && !startTime ? "border-red-500 focus-visible:ring-red-500" : "",
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => openClock("start")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-2"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTimeForDisplay(startTime)}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-base font-medium flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      End Time
                    </Label>
                    <div className="relative">
                      <Input
                        id="end-time"
                        type="time"
                        value={endTime}
                        onChange={(e) => {
                          setEndTime(e.target.value)
                          if (submitted && e.target.value) setError("")
                        }}
                        className={cn(
                          "text-base py-6",
                          submitted && !endTime ? "border-red-500 focus-visible:ring-red-500" : "",
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => openClock("end")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-2"
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        {formatTimeForDisplay(endTime)}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-base font-medium">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes here"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {error && currentStep === 2 && !showStartClock && !showEndClock && (
              <div className="flex items-center gap-1 text-red-500 text-sm mt-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>

          {!showStartClock && !showEndClock && (
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 p-6 pt-0">
              {currentStep === 1 ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="w-full sm:w-auto order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button type="button" onClick={nextStep} className="w-full sm:w-auto order-1 sm:order-2">
                    Continue
                  </Button>
                </>
              ) : currentStep === 2 ? (
                <>
                  <Button type="button" variant="outline" onClick={prevStep} className="w-full sm:w-auto">
                    Back
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addAnotherTask}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Another
                    </Button>
                    <Button type="button" onClick={goToReviewStep} className="bg-primary hover:bg-primary/90">
                      Review
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="w-full sm:w-auto"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                    disabled={plannedTasks.length === 0 || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Saving...
                      </>
                    ) : (
                      "Save All Tasks"
                    )}
                  </Button>
                </>
              )}
            </CardFooter>
          )}
        </form>
      </Card>
    </div>
  )
}

