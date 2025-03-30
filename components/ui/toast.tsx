// "use client"

// import { X } from "lucide-react"
// import { cva, type VariantProps } from "class-variance-authority"
// import { cn } from "@/lib/utils"
// import { useEffect, useState } from "react"

// const toastVariants = cva(
//   "fixed flex items-center justify-between p-4 rounded-lg shadow-lg border transition-all duration-300 transform z-100",
//   {
//     variants: {
//       variant: {
//         default: "bg-white text-gray-900 border-gray-200",
//         success: "bg-green-50 text-green-900 border-green-200",
//         error: "bg-red-50 text-red-900 border-red-200",
//         warning: "bg-amber-50 text-amber-900 border-amber-200",
//         info: "bg-blue-50 text-blue-900 border-blue-200",
//       },
//       position: {
//         "top-right": "top-4 right-4",
//         "top-left": "top-4 left-4",
//         "bottom-right": "bottom-4 right-4",
//         "bottom-left": "bottom-4 left-4",
//         "top-center": "top-4 left-1/2 -translate-x-1/2",
//         "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       position: "top-right",
//     },
//   },
// )

// export interface ToastProps extends VariantProps<typeof toastVariants> {
//   id: string
//   title?: string
//   message: string
//   duration?: number
//   onClose: (id: string) => void
// }

// export function Toast({ id, title, message, variant, position, duration = 5000, onClose }: ToastProps) {
//   const [isVisible, setIsVisible] = useState(true)
//   const [isMounted, setIsMounted] = useState(false)

//   useEffect(() => {
//     setIsMounted(true)

//     const timer = setTimeout(() => {
//       setIsVisible(false)
//     }, duration)

//     return () => clearTimeout(timer)
//   }, [duration])

//   useEffect(() => {
//     if (isMounted && !isVisible) {
//       const timer = setTimeout(() => {
//         onClose(id)
//       }, 300) // Wait for exit animation to complete

//       return () => clearTimeout(timer)
//     }
//   }, [isVisible, onClose, id, isMounted])

//   return (
//     <div
//       className={cn(
//         toastVariants({ variant, position }),
//         "z-50 min-w-[300px] max-w-[400px]",
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
//       )}
//       role="alert"
//     >
//       <div className="flex-1 mr-2">
//         {title && <h4 className="font-medium mb-1">{title}</h4>}
//         <p className="text-sm">{message}</p>
//       </div>
//       <button
//         onClick={() => setIsVisible(false)}
//         className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
//         aria-label="Close"
//       >
//         <X className="h-4 w-4" />
//       </button>
//     </div>
//   )
// }



"use client"

import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Update the toastVariants cva to increase z-index and change default position
const toastVariants = cva(
  "fixed flex items-center justify-between p-4 rounded-lg shadow-lg border transition-all duration-300 transform z-[9999]",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900 border-gray-200",
        success: "bg-green-50 text-green-900 border-green-200",
        error: "bg-red-50 text-red-900 border-red-200",
        warning: "bg-amber-50 text-amber-900 border-amber-200",
        info: "bg-blue-50 text-blue-900 border-blue-200",
      },
      position: {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom-right",
    },
  },
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  id: string
  title?: string
  message: string
  duration?: number
  onClose: (id: string) => void
}

// Update the Toast component to ensure it has the right z-index
export function Toast({ id, title, message, variant, position, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    if (isMounted && !isVisible) {
      const timer = setTimeout(() => {
        onClose(id)
      }, 300) // Wait for exit animation to complete

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose, id, isMounted])

  return (
    <div
      className={cn(
        toastVariants({ variant, position }),
        "min-w-[300px] max-w-[400px]",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
      )}
      role="alert"
    >
      <div className="flex-1 mr-2">
        {title && <h4 className="font-medium mb-1">{title}</h4>}
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

