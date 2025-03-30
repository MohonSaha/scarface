// "use client"

// import { X, CheckCircle, XCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { format } from "date-fns"
// import type { Task } from "@/types/task"

// interface TaskReminderProps {
//   task: Task
//   onClose: () => void
//   onComplete: () => void
//   onIncomplete: () => void
// }

// export function TaskReminder({ task, onClose, onComplete, onIncomplete }: TaskReminderProps) {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-lg sm:text-xl">Task Reminder</CardTitle>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-4 w-4" />
//           </Button>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="text-center space-y-2">
//             <h3 className="text-lg sm:text-xl font-bold">{task.title}</h3>
//             <p className="text-muted-foreground text-sm">
//               {format(task.startTime, "h:mm a")} - {format(task.endTime, "h:mm a")}
//             </p>
//             <p className="mt-4 text-sm sm:text-base">Have you completed this task?</p>
//           </div>
//         </CardContent>
//         <CardFooter className="flex flex-col sm:flex-row justify-center gap-3">
//           <Button
//             variant="outline"
//             className="w-full sm:w-auto flex items-center gap-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
//             onClick={onIncomplete}
//           >
//             <XCircle className="h-4 w-4" />
//             Not Completed
//           </Button>
//           <Button
//             className="w-full sm:w-auto flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
//             onClick={onComplete}
//           >
//             <CheckCircle className="h-4 w-4" />
//             Completed
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }



"use client"

import { useEffect } from "react"
import { X, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import type { Task } from "@/types/task"

interface TaskReminderProps {
  task: Task
  onClose: () => void
  onComplete: () => void
  onIncomplete: () => void
}

export function TaskReminder({ task, onClose, onComplete, onIncomplete }: TaskReminderProps) {
  // Play alarm sound when reminder appears
  useEffect(() => {
    const audio = new Audio("/alarm-sound.mp3")
    audio.volume = 0.7 // Set volume to 70%

    const playSound = async () => {
      try {
        await audio.play()
      } catch (error) {
        console.error("Failed to play alarm sound:", error)
      }
    }

    playSound()

    // Vibrate the device if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200])
    }

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md animate-bounce-gentle">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg sm:text-xl">Task Reminder</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg sm:text-xl font-bold">{task.title}</h3>
            <p className="text-muted-foreground text-sm">
              {format(task.startTime, "h:mm a")} - {format(task.endTime, "h:mm a")}
            </p>
            <p className="mt-4 text-sm sm:text-base">Have you completed this task?</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={onIncomplete}
          >
            <XCircle className="h-4 w-4" />
            Not Completed
          </Button>
          <Button
            className="w-full sm:w-auto flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
            onClick={onComplete}
          >
            <CheckCircle className="h-4 w-4" />
            Completed
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

