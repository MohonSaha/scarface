"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import type { Task } from "@/types/task"

interface RescheduleModalProps {
  task: Task
  onClose: () => void
  onReschedule: (startTime: Date, endTime: Date) => void
}

export function RescheduleModal({ task, onClose, onReschedule }: RescheduleModalProps) {
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [startTime, setStartTime] = useState<string>(format(new Date(), "HH:mm"))
  const [endTime, setEndTime] = useState<string>(format(new Date(new Date().getTime() + 60 * 60 * 1000), "HH:mm"))
  const [error, setError] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !startTime || !endTime) {
      setError("Please fill in all fields")
      return
    }

    const startDate = new Date(`${date}T${startTime}`)
    const endDate = new Date(`${date}T${endTime}`)

    if (endDate <= startDate) {
      setError("End time must be after start time")
      return
    }

    onReschedule(startDate, endDate)
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 min-h-full backdrop-blur-sm flex items-center justify-center z-50 mb-0 p-2 sm:p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Reschedule Failed Task</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
              <h3 className="font-medium mb-1">{task.title}</h3>
              <p className="text-sm text-muted-foreground">
                Original time: {format(task.startTime, "h:mm a")} - {format(task.endTime, "h:mm a")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-base font-medium flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary" />
                New Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="text-base py-6"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time" className="text-base font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" />
                  Start Time
                </Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="text-base py-6"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time" className="text-base font-medium flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" />
                  End Time
                </Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="text-base py-6"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm flex items-center gap-1">
                <X className="h-4 w-4" />
                {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between gap-3 md:flex-col flex-col mt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Reschedule Task
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

