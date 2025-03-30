// "use client"

// import type React from "react"

// import { useState } from "react"
// import { X, Calendar, CheckCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { format } from "date-fns"

// interface Goal {
//   id: string
//   title: string
//   deadline: Date
//   completed: boolean
//   createdAt: Date
// }

// interface RescheduleGoalModalProps {
//   goal: Goal
//   onClose: () => void
//   onReschedule: (newDeadline: Date) => void
// }

// export function RescheduleGoalModal({ goal, onClose, onReschedule }: RescheduleGoalModalProps) {
//   const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
//   const [error, setError] = useState<string>("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!date) {
//       setError("Please select a date")
//       return
//     }

//     const newDeadline = new Date(date)

//     if (newDeadline <= new Date()) {
//       setError("Deadline must be in the future")
//       return
//     }

//     onReschedule(newDeadline)
//   }

//   // Handle click outside to prevent propagation
//   const handleCardClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//   }

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4"
//       onClick={onClose}
//     >
//       <Card className="w-full max-w-md" onClick={handleCardClick}>
//         <form onSubmit={handleSubmit}>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-lg">Reschedule Goal</CardTitle>
//             <Button type="button" variant="ghost" size="icon" onClick={onClose}>
//               <X className="h-4 w-4" />
//             </Button>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
//               <h3 className="font-medium mb-1">{goal.title}</h3>
//               <p className="text-sm text-muted-foreground">
//                 Original deadline: {format(goal.deadline, "MMMM d, yyyy")}
//               </p>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="date" className="text-base font-medium flex items-center gap-1">
//                 <Calendar className="h-4 w-4 text-primary" />
//                 New Deadline
//               </Label>
//               <Input
//                 id="date"
//                 type="date"
//                 value={date}
//                 onChange={(e) => {
//                   setDate(e.target.value)
//                   setError("")
//                 }}
//                 className="text-base py-6"
//               />
//             </div>

//             {error && (
//               <div className="text-red-500 text-sm flex items-center gap-1">
//                 <X className="h-4 w-4" />
//                 {error}
//               </div>
//             )}
//           </CardContent>

//           <CardFooter className="flex justify-between gap-3">
//             <Button type="button" variant="outline" onClick={onClose} className="w-full">
//               Cancel
//             </Button>
//             <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
//               <CheckCircle className="h-4 w-4 mr-2" />
//               Reschedule Goal
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
import { X, Calendar, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format, addDays, isAfter } from "date-fns"

interface Goal {
  id: string
  title: string
  startDate: Date
  endDate: Date
  completed: boolean
  createdAt: Date
}

interface RescheduleGoalModalProps {
  goal: Goal
  onClose: () => void
  onReschedule: (newStartDate: Date, newEndDate: Date) => void
}

export function RescheduleGoalModal({ goal, onClose, onReschedule }: RescheduleGoalModalProps) {
  const [startDate, setStartDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState<string>(format(addDays(new Date(), 7), "yyyy-MM-dd"))
  const [error, setError] = useState<string>("")

  // Calculate the original duration in days
  useEffect(() => {
    const start = new Date()
    const originalDuration = Math.ceil((goal.endDate.getTime() - goal.startDate.getTime()) / (1000 * 60 * 60 * 24))
    const end = addDays(start, originalDuration)

    setStartDate(format(start, "yyyy-MM-dd"))
    setEndDate(format(end, "yyyy-MM-dd"))
  }, [goal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate) {
      setError("Please select both start and end dates")
      return
    }

    const newStartDate = new Date(startDate)
    const newEndDate = new Date(endDate)

    if (isAfter(newStartDate, newEndDate)) {
      setError("End date must be after start date")
      return
    }

    if (newStartDate < new Date()) {
      setError("Start date must be in the future")
      return
    }

    onReschedule(newStartDate, newEndDate)
  }

  // Handle click outside to prevent propagation
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Update end date when start date changes to maintain similar duration
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value
    setStartDate(newStartDate)

    // Calculate the original duration in days
    const originalDuration = Math.ceil((goal.endDate.getTime() - goal.startDate.getTime()) / (1000 * 60 * 60 * 24))

    // Set new end date based on new start date + original duration
    const start = new Date(newStartDate)
    const end = addDays(start, originalDuration)

    setEndDate(format(end, "yyyy-MM-dd"))
    setError("")
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4"
      onClick={onClose}
    >
      <Card className="w-full max-w-md" onClick={handleCardClick}>
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Reschedule Goal</CardTitle>
            <Button type="button" variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
              <h3 className="font-medium mb-1">{goal.title}</h3>
              <p className="text-sm text-muted-foreground">
                Original period: {format(goal.startDate, "MMMM d, yyyy")} - {format(goal.endDate, "MMMM d, yyyy")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-base font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  New Start Date
                </Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-base font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  New End Date
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value)
                    setError("")
                  }}
                  className="text-base"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm flex items-center gap-1">
                <XCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Reschedule Goal
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

