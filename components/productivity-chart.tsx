"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DailyData {
  date: Date
  total: number
  completed: number
}

interface ProductivityChartProps {
  title?: string
  currentPeriodData: DailyData[]
  previousPeriodData?: DailyData[]
  showComparison?: boolean
  periodLabel?: string
  height?: number
  className?: string
}

export function ProductivityChart({
  title = "Productivity Chart",
  currentPeriodData,
  previousPeriodData = [],
  showComparison = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  periodLabel = "Period",
  height = 250,
  className,
}: ProductivityChartProps) {
  const [hoveredDay, setHoveredDay] = useState<DailyData | null>(null)
  const [hoveredPrevDay, setHoveredPrevDay] = useState<DailyData | null>(null)

  // Find max value for chart scaling
  const allValues = [
    ...currentPeriodData.map((day) => day.total),
    ...(showComparison ? previousPeriodData.map((day) => day.total) : []),
  ]

  const maxValue = Math.max(...allValues, 3) // Minimum of 3 for empty charts

  // Format date for display
  const formatDateLabel = (date: Date) => {
    // If we have 7 or fewer data points, show day names
    if (currentPeriodData.length <= 7) {
      return format(date, "EEE")
    }
    // If we have more than 7 but fewer than 15, show day numbers
    else if (currentPeriodData.length < 15) {
      return format(date, "d")
    }
    // For many data points, show day numbers only for every 3rd day
    else {
      const day = date.getDate()
      return day % 3 === 0 ? format(date, "d") : ""
    }
  }

  return (
    <Card className={cn("w-full overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <div className="relative" style={{ height: `${height}px` }}>
          {/* Y-axis labels */}
          <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-4">
            {[0, 1, 2, 3, 4].map((_, i) => (
              <div key={i} className="px-2">
                {Math.round(maxValue - i * (maxValue / 4))}
              </div>
            ))}
          </div>

          {/* Horizontal grid lines */}
          <div className="absolute top-0 left-8 right-0 h-full flex flex-col justify-between py-4">
            {[0, 1, 2, 3, 4].map((_, i) => (
              <div key={i} className="border-t border-dashed border-muted w-full h-0"></div>
            ))}
          </div>

          {/* Chart area */}
          <div className="absolute top-0 left-8 right-0 h-full pt-4 pb-8">
            {/* Current period data */}
            <div className="h-full flex items-end justify-between">
              {currentPeriodData.map((day, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col items-center justify-end h-full"
                  style={{ width: `${100 / currentPeriodData.length}%` }}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  {/* Tooltip */}
                  {hoveredDay === day && (
                    <div className="absolute bottom-full mb-2 z-10 bg-black/90 text-white text-xs rounded p-2 transform -translate-x-1/2 left-1/2 whitespace-nowrap">
                      <div className="font-medium">{format(day.date, "MMM d, yyyy")}</div>
                      <div className="flex justify-between gap-3">
                        <span>Total:</span>
                        <span>{day.total} tasks</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span>Completed:</span>
                        <span>
                          {day.completed} ({day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0}%)
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bar chart */}
                  <div className="relative w-full flex justify-center">
                    <div className="w-[60%] flex flex-col">
                      {/* Completed portion */}
                      <div
                        className="bg-green-500 rounded-t-sm w-full"
                        style={{
                          height: `${(day.completed / maxValue) * (height - 50)}px`,
                          minHeight: day.completed > 0 ? "4px" : "0",
                        }}
                      ></div>

                      {/* Incomplete portion */}
                      <div
                        className="bg-red-400 w-full"
                        style={{
                          height: `${((day.total - day.completed) / maxValue) * (height - 50)}px`,
                          minHeight: day.total - day.completed > 0 ? "4px" : "0",
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* X-axis label */}
                  <div className="absolute bottom-0 text-[10px] text-muted-foreground transform -translate-x-1/2 left-1/2 mt-1">
                    {formatDateLabel(day.date)}
                  </div>
                </div>
              ))}
            </div>

            {/* Previous period overlay (if comparison is enabled) */}
            {showComparison && previousPeriodData.length > 0 && (
              <div className="absolute top-4 left-0 right-0 h-[calc(100%-50px)] pointer-events-none">
                <div className="h-full flex items-end justify-between">
                  {previousPeriodData.map((day, i) => (
                    <div
                      key={i}
                      className="group relative flex flex-col items-center justify-end h-full pointer-events-auto"
                      style={{ width: `${100 / previousPeriodData.length}%` }}
                      onMouseEnter={() => setHoveredPrevDay(day)}
                      onMouseLeave={() => setHoveredPrevDay(null)}
                    >
                      {/* Tooltip */}
                      {hoveredPrevDay === day && (
                        <div className="absolute bottom-full mb-2 z-10 bg-black/90 text-white text-xs rounded p-2 transform -translate-x-1/2 left-1/2 whitespace-nowrap">
                          <div className="font-medium">{format(day.date, "MMM d, yyyy")} (Previous)</div>
                          <div className="flex justify-between gap-3">
                            <span>Total:</span>
                            <span>{day.total} tasks</span>
                          </div>
                          <div className="flex justify-between gap-3">
                            <span>Completed:</span>
                            <span>
                              {day.completed} ({day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0}%)
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Line chart for previous period */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center">
                        {/* Dot for completed */}
                        {day.completed > 0 && (
                          <div
                            className="absolute w-2 h-2 rounded-full bg-blue-500 border-2 border-white"
                            style={{
                              bottom: `${(day.completed / maxValue) * 100}%`,
                            }}
                          ></div>
                        )}

                        {/* Dot for total */}
                        {day.total > 0 && (
                          <div
                            className="absolute w-2 h-2 rounded-full bg-indigo-600 border-2 border-white"
                            style={{
                              bottom: `${(day.total / maxValue) * 100}%`,
                            }}
                          ></div>
                        )}

                        {/* Connecting line */}
                        {day.total > 0 && i < previousPeriodData.length - 1 && previousPeriodData[i + 1].total > 0 && (
                          <div
                            className="absolute h-px bg-indigo-600/50"
                            style={{
                              bottom: `${(day.total / maxValue) * 100}%`,
                              width: `${(100 / previousPeriodData.length) * 2}%`,
                              right: `-${100 / previousPeriodData.length}%`,
                              transform: `rotate(${
                                Math.atan2(
                                  (previousPeriodData[i + 1].total / maxValue - day.total / maxValue) * (height - 50),
                                  (100 / previousPeriodData.length) * 2,
                                ) *
                                (180 / Math.PI)
                              }deg)`,
                              transformOrigin: "right center",
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2 px-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-xs">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
            <span className="text-xs">Incomplete</span>
          </div>
          {showComparison && (
            <>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-600 border-2 border-white"></div>
                <span className="text-xs">Previous Total</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                <span className="text-xs">Previous Completed</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

