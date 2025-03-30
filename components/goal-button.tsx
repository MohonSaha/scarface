// "use client"

// import { useState } from "react"
// import { Target, Calendar, BarChart3 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { GoalModal } from "@/components/goal-modal"
// import { cn } from "@/lib/utils"

// interface GoalButtonProps {
//   type: "weekly" | "monthly" | "trimonthly"
//   count: number
// }

// export function GoalButton({ type, count }: GoalButtonProps) {
//   const [showModal, setShowModal] = useState(false)

//   const getIcon = () => {
//     switch (type) {
//       case "weekly":
//         return <Target className="h-4 w-4" />
//       case "monthly":
//         return <Calendar className="h-4 w-4" />
//       case "trimonthly":
//         return <BarChart3 className="h-4 w-4" />
//     }
//   }

//   const getLabel = () => {
//     switch (type) {
//       case "weekly":
//         return "Weekly Goal"
//       case "monthly":
//         return "Monthly Goal"
//       case "trimonthly":
//         return "Tri-Monthly Goal"
//     }
//   }

//   const getBadgeColor = () => {
//     switch (type) {
//       case "weekly":
//         return "bg-blue-500"
//       case "monthly":
//         return "bg-purple-500"
//       case "trimonthly":
//         return "bg-amber-500"
//     }
//   }

//   return (
//     <>
//       {/* Mobile Button (Icon + Count) */}
//       <Button
//         variant="default"
//         size="icon"
//         onClick={() => setShowModal(true)}
//         className={cn(
//           "relative md:hidden text-green-600 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-green-600 active:scale-80 transition-transform duration-150 ease-in-out cursor-pointer",
//         )}
//       >
//         {getIcon()}
//         {count > 0 && (
//           <span
//             className={cn(
//               "absolute -top-2 -right-2 h-5 w-5 rounded-full text-[10px] font-medium flex items-center justify-center text-white",
//               getBadgeColor(),
//             )}
//           >
//             {count}
//           </span>
//         )}
//       </Button>

//       {/* Desktop Button (Text + Icon + Count) */}
//       <Button
//         variant="default"
//         onClick={() => setShowModal(true)}
//         className={cn(
//           "hidden md:flex items-center gap-2 text-green-600 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-green-600 active:scale-80 transition-transform duration-150 ease-in-out cursor-pointer",
//         )}
//       >
//         {getIcon()}
//         <span>{getLabel()}</span>
//         {count > 0 && (
//           <span
//             className={cn(
//               "h-5 min-w-5 rounded-full text-[10px] font-medium flex items-center justify-center px-1 text-white",
//               getBadgeColor(),
//             )}
//           >
//             {count}
//           </span>
//         )}
//       </Button>

//       {showModal && <GoalModal type={type} onClose={() => setShowModal(false)} />}
//     </>
//   )
// }



"use client"

import { useState } from "react"
import { Target, Calendar, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GoalModal } from "@/components/goal-modal"
import { cn } from "@/lib/utils"

interface GoalButtonProps {
  type: "weekly" | "monthly" | "trimonthly"
  count: number
}

export function GoalButton({ type, count }: GoalButtonProps) {
  const [showModal, setShowModal] = useState(false)

  const getIcon = () => {
    switch (type) {
      case "weekly":
        return <Target className="h-4 w-4" />
      case "monthly":
        return <Calendar className="h-4 w-4" />
      case "trimonthly":
        return <BarChart3 className="h-4 w-4" />
    }
  }

  const getLabel = () => {
    switch (type) {
      case "weekly":
        return "Weekly Goal"
      case "monthly":
        return "Monthly Goal"
      case "trimonthly":
        return "Tri-Monthly Goal"
    }
  }

  const getBadgeColor = () => {
    switch (type) {
      case "weekly":
        return "bg-blue-500"
      case "monthly":
        return "bg-purple-500"
      case "trimonthly":
        return "bg-amber-500"
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowModal(true)}
        className="text-green-600 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-green-600 active:scale-80 transition-transform duration-150 ease-in-out cursor-pointer relative"
      >
        {getIcon()}
        <span className="hidden md:block ml-2">{getLabel()}</span>
        {count > 0 && (
          <span
            className={cn(
              "absolute -top-2 -right-2 h-5 w-5 rounded-full text-[10px] font-medium flex items-center justify-center text-white",
              getBadgeColor(),
            )}
          >
            {count}
          </span>
        )}
      </Button>

      {showModal && <GoalModal type={type} onClose={() => setShowModal(false)} />}
    </>
  )
}

