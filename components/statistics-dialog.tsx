"use client"

import { useState, useEffect } from "react"
import { X, BarChart3, PieChart, CheckCircle, XCircle, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchDailyStatistics } from "@/components/task-service"
import { useToast } from "@/components/ui/toast-context"
import { cn } from "@/lib/utils"

interface StatisticsDialogProps {
  date: string
  onClose: () => void
}

interface Statistics {
  date: string
  totalTasks: number
  completedTasks: number
  completionRate: number
  statusStats: Array<{
    status: string
    count: number
  }>
  categoryStats: Array<{
    categoryId: string | null
    categoryName: string
    categoryColor: string | null
    count: number
  }>
}

export function StatisticsDialog({ date, onClose }: StatisticsDialogProps) {
  const { error: showError } = useToast()
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setIsLoading(true)
        const data = await fetchDailyStatistics(date)
        setStatistics(data)
      } catch (err) {
        console.error("Failed to load statistics:", err)
        showError("Failed to load statistics")
      } finally {
        setIsLoading(false)
      }
    }

    loadStatistics()
  }, [date, showError])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "in_progress":
        return <Play className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      case "in_progress":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <BarChart3 className="h-5 w-5 text-primary" />
            Daily Statistics
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : statistics ? (
            <>
              {/* Summary Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Total Tasks</p>
                      <p className="text-3xl font-bold">{statistics.totalTasks}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Completed Tasks</p>
                      <p className="text-3xl font-bold text-green-600">{statistics.completedTasks}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="text-3xl font-bold">{statistics.completionRate}%</p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 mt-2">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${statistics.completionRate}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Status Breakdown */}
              <div>
                <h3 className="text-lg font-medium mb-4">Status Breakdown</h3>
                <div className="space-y-3">
                  {statistics.statusStats.map((stat) => (
                    <div key={stat.status} className="flex items-center">
                      <div className="w-1/4 flex items-center gap-2">
                        {getStatusIcon(stat.status)}
                        <span className="capitalize">{stat.status.replace("_", " ")}</span>
                      </div>
                      <div className="w-3/4 flex items-center gap-3">
                        <div className="flex-1 bg-muted rounded-full h-2.5">
                          <div
                            className={cn("h-2.5 rounded-full", getStatusColor(stat.status))}
                            style={{
                              width:
                                statistics.totalTasks > 0 ? `${(stat.count / statistics.totalTasks) * 100}%` : "0%",
                            }}
                          ></div>
                        </div>
                        <span className="text-sm w-10 text-right">{stat.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown */}
              {statistics.categoryStats.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Category Breakdown</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {statistics.categoryStats.map((stat) => (
                      <div key={stat.categoryId || "uncategorized"} className="flex items-center p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className={cn("h-4 w-4 rounded-full", stat.categoryColor || "bg-gray-500")}></div>
                          <span>{stat.categoryName}</span>
                        </div>
                        <div className="ml-auto font-medium">{stat.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visual Chart */}
              <div className="flex justify-center">
                <div className="relative h-40 w-40">
                  <PieChart className="h-full w-full text-muted-foreground" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{statistics.completionRate}%</span>
                    <span className="text-xs text-muted-foreground">Completion</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <p className="text-muted-foreground mb-4">No statistics available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

