// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { X, Plus, Calendar, CheckCircle, XCircle, Clock, Target, BarChart3 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { format, addDays, addMonths } from "date-fns"
// import { cn } from "@/lib/utils"
// import { RescheduleGoalModal } from "@/components/reschedule-goal-modal"

// interface GoalModalProps {
//   type: "weekly" | "monthly" | "trimonthly"
//   onClose: () => void
// }

// // Define the goal type
// interface Goal {
//   id: string
//   title: string
//   deadline: Date
//   completed: boolean
//   createdAt: Date
// }

// export function GoalModal({ type, onClose }: GoalModalProps) {
//   const [goals, setGoals] = useState<Goal[]>([])
//   const [newGoalTitle, setNewGoalTitle] = useState("")
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
//   const [showRescheduleModal, setShowRescheduleModal] = useState(false)

//   // Load goals from localStorage on mount
//   useEffect(() => {
//     const saved = localStorage.getItem(`${type}Goals`)
//     if (saved) {
//       const parsedGoals = JSON.parse(saved).map((goal: any) => ({
//         ...goal,
//         deadline: new Date(goal.deadline),
//         createdAt: new Date(goal.createdAt),
//       }))
//       setGoals(parsedGoals)
//     }
//   }, [type])

//   // Save goals to localStorage when they change
//   useEffect(() => {
//     localStorage.setItem(`${type}Goals`, JSON.stringify(goals))
//   }, [goals, type])

//   const getModalTitle = () => {
//     switch (type) {
//       case "weekly":
//         return "Weekly Goals"
//       case "monthly":
//         return "Monthly Goals"
//       case "trimonthly":
//         return "Tri-Monthly Goals"
//     }
//   }

//   const getModalIcon = () => {
//     switch (type) {
//       case "weekly":
//         return <Target className="h-5 w-5 text-blue-500" />
//       case "monthly":
//         return <Calendar className="h-5 w-5 text-purple-500" />
//       case "trimonthly":
//         return <BarChart3 className="h-5 w-5 text-amber-500" />
//     }
//   }

//   const getDefaultDeadline = () => {
//     const now = new Date()
//     switch (type) {
//       case "weekly":
//         return addDays(now, 7)
//       case "monthly":
//         return addMonths(now, 1)
//       case "trimonthly":
//         return addMonths(now, 3)
//     }
//   }

//   const handleAddGoal = () => {
//     if (!newGoalTitle.trim()) return

//     const newGoal: Goal = {
//       id: Date.now().toString(),
//       title: newGoalTitle,
//       deadline: getDefaultDeadline(),
//       completed: false,
//       createdAt: new Date(),
//     }

//     setGoals([...goals, newGoal])
//     setNewGoalTitle("")
//     setShowAddForm(false)
//   }

//   const handleMarkComplete = (id: string) => {
//     setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: true } : goal)))
//   }

//   const handleRescheduleGoal = (id: string, newDeadline: Date) => {
//     setGoals(goals.map((goal) => (goal.id === id ? { ...goal, deadline: newDeadline } : goal)))
//     setShowRescheduleModal(false)
//   }

//   const openRescheduleModal = (goal: Goal) => {
//     setSelectedGoal(goal)
//     setShowRescheduleModal(true)
//   }

//   // Check if a goal is failed (past deadline and not completed)
//   const isGoalFailed = (goal: Goal) => {
//     return !goal.completed && new Date() > goal.deadline
//   }

//   // Handle click outside to prevent propagation
//   const handleCardClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//   }

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
//         onClick={onClose}
//       >
//         <Card className="w-full max-w-md max-h-[90vh] overflow-auto" onClick={handleCardClick}>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sticky top-0 bg-background z-10">
//             <div className="flex items-center gap-2">
//               {getModalIcon()}
//               <CardTitle className="text-xl">{getModalTitle()}</CardTitle>
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="icon" onClick={() => setShowAddForm(!showAddForm)} className="h-8 w-8">
//                 <Plus className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </CardHeader>

//           <CardContent className="space-y-4 pt-4">
//             {showAddForm && (
//               <div className="space-y-4 p-4 border rounded-md bg-muted/10">
//                 <h3 className="font-medium">Add New Goal</h3>
//                 <div className="space-y-2">
//                   <Label htmlFor="goal-title">Goal Title</Label>
//                   <Input
//                     id="goal-title"
//                     value={newGoalTitle}
//                     onChange={(e) => setNewGoalTitle(e.target.value)}
//                     placeholder="Enter your goal"
//                     className="w-full"
//                   />
//                 </div>
//                 <div className="flex justify-end gap-2">
//                   <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
//                     Cancel
//                   </Button>
//                   <Button size="sm" onClick={handleAddGoal} disabled={!newGoalTitle.trim()}>
//                     Add Goal
//                   </Button>
//                 </div>
//               </div>
//             )}

//             <div className="space-y-2">
//               <h3 className="font-medium">Your Goals</h3>

//               {goals.length > 0 ? (
//                 <div className="space-y-3">
//                   {goals.map((goal, index) => (
//                     <div
//                       key={goal.id}
//                       className={cn(
//                         "p-3 rounded-lg border transition-all",
//                         goal.completed
//                           ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
//                           : isGoalFailed(goal)
//                             ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
//                             : "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
//                       )}
//                     >
//                       <div className="flex flex-col gap-2">
//                         <div className="flex items-start justify-between">
//                           <div className="flex items-center gap-2">
//                             <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-white/50 text-sm font-medium">
//                               {index + 1}
//                             </div>
//                             <div>
//                               <h4 className="font-medium">{goal.title}</h4>
//                               <p className="text-xs text-muted-foreground">
//                                 Deadline: {format(goal.deadline, "MMM d, yyyy")}
//                               </p>
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium">
//                             {goal.completed ? (
//                               <CheckCircle className="h-4 w-4 text-green-500" />
//                             ) : isGoalFailed(goal) ? (
//                               <XCircle className="h-4 w-4 text-red-500" />
//                             ) : (
//                               <Clock className="h-4 w-4 text-blue-500" />
//                             )}
//                             <span>{goal.completed ? "Completed" : isGoalFailed(goal) ? "Failed" : "In Progress"}</span>
//                           </div>
//                         </div>

//                         {!goal.completed && (
//                           <div className="flex justify-end gap-2 mt-1">
//                             {isGoalFailed(goal) ? (
//                               <Button
//                                 size="sm"
//                                 variant="outline"
//                                 onClick={() => openRescheduleModal(goal)}
//                                 className="text-xs h-8"
//                               >
//                                 Reschedule
//                               </Button>
//                             ) : null}
//                             <Button
//                               size="sm"
//                               onClick={() => handleMarkComplete(goal.id)}
//                               className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
//                             >
//                               Mark Complete
//                             </Button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-40 text-center">
//                   <p className="text-muted-foreground mb-4">No goals found</p>
//                   <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
//                     <Plus className="h-4 w-4 mr-2" />
//                     Add Your First Goal
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {showRescheduleModal && selectedGoal && (
//         <RescheduleGoalModal
//           goal={selectedGoal}
//           onClose={() => setShowRescheduleModal(false)}
//           onReschedule={(newDeadline) => handleRescheduleGoal(selectedGoal.id, newDeadline)}
//         />
//       )}
//     </>
//   )
// }



"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus, Calendar, CheckCircle, XCircle, Clock, Target, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, addDays, addMonths, isAfter } from "date-fns"
import { cn } from "@/lib/utils"
import { RescheduleGoalModal } from "@/components/reschedule-goal-modal"

interface GoalModalProps {
  type: "weekly" | "monthly" | "trimonthly"
  onClose: () => void
}

// Define the goal type
interface Goal {
  id: string
  title: string
  startDate: Date
  endDate: Date
  completed: boolean
  createdAt: Date
}

export function GoalModal({ type, onClose }: GoalModalProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoalTitle, setNewGoalTitle] = useState("")
  const [startDate, setStartDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState<string>("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [error, setError] = useState<string>("")

  // Set default end date based on goal type when component mounts or type changes
  useEffect(() => {
    const start = new Date(startDate)
    let end: Date

    switch (type) {
      case "weekly":
        end = addDays(start, 7)
        break
      case "monthly":
        end = addMonths(start, 1)
        break
      case "trimonthly":
        end = addMonths(start, 3)
        break
    }

    setEndDate(format(end, "yyyy-MM-dd"))
  }, [type, startDate])

  // Load goals from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`${type}Goals`)
    if (saved) {
      const parsedGoals = JSON.parse(saved).map((goal: any) => ({
        ...goal,
        startDate: new Date(goal.startDate),
        endDate: new Date(goal.endDate),
        createdAt: new Date(goal.createdAt),
      }))
      setGoals(parsedGoals)
    }
  }, [type])

  // Save goals to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`${type}Goals`, JSON.stringify(goals))
  }, [goals, type])

  const getModalTitle = () => {
    switch (type) {
      case "weekly":
        return "Weekly Goals"
      case "monthly":
        return "Monthly Goals"
      case "trimonthly":
        return "Tri-Monthly Goals"
    }
  }

  const getModalIcon = () => {
    switch (type) {
      case "weekly":
        return <Target className="h-5 w-5 text-blue-500" />
      case "monthly":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "trimonthly":
        return <BarChart3 className="h-5 w-5 text-amber-500" />
    }
  }

  const validateDateRange = () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates")
      return false
    }

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (isAfter(start, end)) {
      setError("End date must be after start date")
      return false
    }

    return true
  }

  const handleAddGoal = () => {
    if (!newGoalTitle.trim()) {
      setError("Please enter a goal title")
      return
    }

    if (!validateDateRange()) {
      return
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalTitle,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      completed: false,
      createdAt: new Date(),
    }

    setGoals([...goals, newGoal])
    setNewGoalTitle("")
    setError("")
    setShowAddForm(false)
  }

  const handleMarkComplete = (id: string) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, completed: true } : goal)))
  }

  const handleRescheduleGoal = (id: string, newStartDate: Date, newEndDate: Date) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, startDate: newStartDate, endDate: newEndDate } : goal)))
    setShowRescheduleModal(false)
  }

  const openRescheduleModal = (goal: Goal) => {
    setSelectedGoal(goal)
    setShowRescheduleModal(true)
  }

  // Check if a goal is failed (past end date and not completed)
  const isGoalFailed = (goal: Goal) => {
    return !goal.completed && new Date() > goal.endDate
  }

  // Handle click outside to prevent propagation
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Update start date and recalculate end date
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value
    setStartDate(newStartDate)

    // Recalculate end date based on goal type
    const start = new Date(newStartDate)
    let end: Date

    switch (type) {
      case "weekly":
        end = addDays(start, 7)
        break
      case "monthly":
        end = addMonths(start, 1)
        break
      case "trimonthly":
        end = addMonths(start, 3)
        break
    }

    setEndDate(format(end, "yyyy-MM-dd"))
    setError("")
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        onClick={onClose}
      >
        <Card className="w-full max-w-md max-h-[90vh] overflow-auto" onClick={handleCardClick}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sticky top-0 bg-background z-10">
            <div className="flex items-center gap-2">
              {getModalIcon()}
              <CardTitle className="text-xl">{getModalTitle()}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setShowAddForm(!showAddForm)} className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            {showAddForm && (
              <div className="space-y-4 p-4 border rounded-md bg-muted/10">
                <h3 className="font-medium">Add New Goal</h3>
                <div className="space-y-2">
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input
                    id="goal-title"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="Enter your goal"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      Start Date
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      End Date
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value)
                        setError("")
                      }}
                      className="w-full"
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm flex items-center gap-1">
                    <XCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAddForm(false)
                      setError("")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleAddGoal}>
                    Add Goal
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h3 className="font-medium">Your Goals</h3>

              {goals.length > 0 ? (
                <div className="space-y-3">
                  {goals.map((goal, index) => (
                    <div
                      key={goal.id}
                      className={cn(
                        "p-3 rounded-lg border transition-all",
                        goal.completed
                          ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                          : isGoalFailed(goal)
                            ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                            : "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
                      )}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-white/50 text-sm font-medium">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium">{goal.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {format(goal.startDate, "MMM d, yyyy")} - {format(goal.endDate, "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium">
                            {goal.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : isGoalFailed(goal) ? (
                              <XCircle className="h-4 w-4 text-red-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-blue-500" />
                            )}
                            <span>{goal.completed ? "Completed" : isGoalFailed(goal) ? "Failed" : "In Progress"}</span>
                          </div>
                        </div>

                        {!goal.completed && (
                          <div className="flex justify-end gap-2 mt-1">
                            {isGoalFailed(goal) ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openRescheduleModal(goal)}
                                className="text-xs h-8"
                              >
                                Reschedule
                              </Button>
                            ) : null}
                            <Button
                              size="sm"
                              onClick={() => handleMarkComplete(goal.id)}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                            >
                              Mark Complete
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <p className="text-muted-foreground mb-4">No goals found</p>
                  <Button variant="outline" size="sm" onClick={() => setShowAddForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Goal
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {showRescheduleModal && selectedGoal && (
        <RescheduleGoalModal
          goal={selectedGoal}
          onClose={() => setShowRescheduleModal(false)}
          onReschedule={(newStartDate, newEndDate) => handleRescheduleGoal(selectedGoal.id, newStartDate, newEndDate)}
        />
      )}
    </>
  )
}

