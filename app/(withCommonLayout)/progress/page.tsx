"use client"

import { useState, useEffect } from "react"
import { format, subDays } from "date-fns"
import { Calendar, BarChart, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/toast-context"

interface ProgressData {
  date: string
  totalScore: number
  gainedScore: number
  createdAt: string
  updatedAt: string
}

export default function ProgressPage() {
  const { error: showError } = useToast()
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [weeklyData, setWeeklyData] = useState<ProgressData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch progress for a specific date
  const fetchProgress = async (dateStr: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/progress?date=${dateStr}`)

      if (!response.ok) {
        throw new Error("Failed to fetch progress")
      }

      const data = await response.json()
      setProgressData(data)
    } catch (err) {
      console.error("Error fetching progress:", err)
      showError("Failed to load progress data")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch weekly progress data
  const fetchWeeklyData = async () => {
    try {
      const today = new Date(date)
      const promises = []

      // Fetch data for the last 7 days
      for (let i = 0; i < 7; i++) {
        const day = subDays(today, i)
        const dayStr = format(day, "yyyy-MM-dd")
        promises.push(
          fetch(`/api/progress?date=${dayStr}`)
            .then((res) => res.json())
            .catch(() => ({ date: dayStr, totalScore: 0, gainedScore: 0 })),
        )
      }

      const results = await Promise.all(promises)
      setWeeklyData(results.reverse()) // Reverse to show oldest to newest
    } catch (err) {
      console.error("Error fetching weekly data:", err)
      showError("Failed to load weekly progress data")
    }
  }

  // Change date handler
  const handleDateChange = (newDate: string) => {
    setDate(newDate)
  }

  // Navigate to previous day
  const goToPreviousDay = () => {
    const prevDay = subDays(new Date(date), 1)
    setDate(format(prevDay, "yyyy-MM-dd"))
  }

  // Navigate to next day
  const goToNextDay = () => {
    const nextDay = new Date(date)
    nextDay.setDate(nextDay.getDate() + 1)

    // Don't allow going beyond today
    if (nextDay <= new Date()) {
      setDate(format(nextDay, "yyyy-MM-dd"))
    }
  }

  // Fetch data when date changes
  useEffect(() => {
    fetchProgress(date)
  }, [date])

  // Fetch weekly data on mount and when date changes
  useEffect(() => {
    fetchWeeklyData()
  }, [date])

  // Calculate percentage
  const percentage = progressData
    ? Math.round((progressData.gainedScore / Math.max(progressData.totalScore, 1)) * 100)
    : 0

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Progress Tracking</h1>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={goToPreviousDay}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  max={format(new Date(), "yyyy-MM-dd")}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNextDay}
                  disabled={date === format(new Date(), "yyyy-MM-dd")}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="pt-4">
                <Label className="text-sm text-muted-foreground">Selected Date</Label>
                <p className="font-medium">{format(new Date(date), "MMMM d, yyyy")}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <>
                  <div>
                    <Label className="text-sm text-muted-foreground">Total Score</Label>
                    <p className="font-medium text-2xl">{progressData?.totalScore || 0}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Gained Score</Label>
                    <p className="font-medium text-2xl text-primary">{progressData?.gainedScore || 0}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Completion Rate</Label>
                    <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <p className="text-sm mt-1">{percentage}%</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] relative">
                {weeklyData.length > 0 ? (
                  <div className="flex h-full items-end gap-2">
                    {weeklyData.map((day, index) => {
                      const dayPercentage = Math.round((day.gainedScore / Math.max(day.totalScore, 1)) * 100)
                      return (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full flex justify-center">
                            <span className="text-xs font-medium">{dayPercentage}%</span>
                          </div>
                          <div className="relative w-full bg-muted/50 rounded-t-md" style={{ height: "240px" }}>
                            <div
                              className="absolute bottom-0 w-full bg-primary rounded-t-md transition-all duration-500"
                              style={{ height: `${(dayPercentage / 100) * 240}px` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground">{format(new Date(day.date), "EEE")}</span>
                          <span className="text-xs text-muted-foreground">{format(new Date(day.date), "dd")}</span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total Tasks</p>
                      <p className="text-3xl font-bold">
                        {progressData?.totalScore ? Math.round(progressData.totalScore / 10) : 0}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Estimated based on score</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Completed Tasks</p>
                      <p className="text-3xl font-bold text-green-600">
                        {progressData?.gainedScore ? Math.round(progressData.gainedScore / 10) : 0}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Estimated based on score</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="text-3xl font-bold">{percentage}%</p>
                      <p className="text-xs text-muted-foreground mt-1">Based on score ratio</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

