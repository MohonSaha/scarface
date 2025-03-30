// "use client"

// import React, { createContext, useContext, useState, useCallback } from "react"
// import { Toast, type ToastProps } from "@/components/ui/toast"
// import { createPortal } from "react-dom"

// type ToastType = "default" | "success" | "error" | "warning" | "info"
// type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"

// interface ToastOptions {
//   title?: string
//   duration?: number
//   position?: ToastPosition
// }

// interface ToastContextType {
//   toast: (message: string, options?: ToastOptions) => void
//   success: (message: string, options?: ToastOptions) => void
//   error: (message: string, options?: ToastOptions) => void
//   warning: (message: string, options?: ToastOptions) => void
//   info: (message: string, options?: ToastOptions) => void
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined)

// interface ToastItem extends Omit<ToastProps, "onClose"> {
//   id: string
//   type: ToastType
// }

// export function ToastProvider({ children }: { children: React.ReactNode }) {
//   const [toasts, setToasts] = useState<ToastItem[]>([])
//   const [isMounted, setIsMounted] = useState(false)

//   React.useEffect(() => {
//     setIsMounted(true)
//     return () => setIsMounted(false)
//   }, [])

//   const removeToast = useCallback((id: string) => {
//     setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
//   }, [])

//   const addToast = useCallback((message: string, type: ToastType = "default", options?: ToastOptions) => {
//     const id = Math.random().toString(36).substring(2, 9)
//     setToasts((prevToasts) => [
//       ...prevToasts,
//       {
//         id,
//         message,
//         title: options?.title,
//         duration: options?.duration,
//         position: options?.position || "top-right",
//         type,
//       },
//     ])
//   }, [])

//   const contextValue = {
//     toast: (message: string, options?: ToastOptions) => addToast(message, "default", options),
//     success: (message: string, options?: ToastOptions) => addToast(message, "success", options),
//     error: (message: string, options?: ToastOptions) => addToast(message, "error", options),
//     warning: (message: string, options?: ToastOptions) => addToast(message, "warning", options),
//     info: (message: string, options?: ToastOptions) => addToast(message, "info", options),
//   }

//   return (
//     <ToastContext.Provider value={contextValue}>
//       {children}
//       {isMounted &&
//         createPortal(
//           <div className="toast-container">
//             {toasts.map((toast) => (
//               <Toast
//                 key={toast.id}
//                 id={toast.id}
//                 title={toast.title}
//                 message={toast.message}
//                 variant={toast.type}
//                 position={toast.position}
//                 duration={toast.duration}
//                 onClose={removeToast}
//               />
//             ))}
//           </div>,
//           document.body,
//         )}
//     </ToastContext.Provider>
//   )
// }

// export function useToast() {
//   const context = useContext(ToastContext)
//   if (context === undefined) {
//     throw new Error("useToast must be used within a ToastProvider")
//   }
//   return context
// }



"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { Toast, type ToastProps } from "@/components/ui/toast"
import { createPortal } from "react-dom"

type ToastType = "default" | "success" | "error" | "warning" | "info"
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"

interface ToastOptions {
  title?: string
  duration?: number
  position?: ToastPosition
}

interface ToastContextType {
  toast: (message: string, options?: ToastOptions) => void
  success: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  warning: (message: string, options?: ToastOptions) => void
  info: (message: string, options?: ToastOptions) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastItem extends Omit<ToastProps, "onClose"> {
  id: string
  type: ToastType
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((message: string, type: ToastType = "default", options?: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prevToasts) => [
      ...prevToasts,
      {
        id,
        message,
        title: options?.title,
        duration: options?.duration,
        position: options?.position || "bottom-right",
        type,
      },
    ])
  }, [])

  const contextValue = {
    toast: (message: string, options?: ToastOptions) => addToast(message, "default", options),
    success: (message: string, options?: ToastOptions) => addToast(message, "success", options),
    error: (message: string, options?: ToastOptions) => addToast(message, "error", options),
    warning: (message: string, options?: ToastOptions) => addToast(message, "warning", options),
    info: (message: string, options?: ToastOptions) => addToast(message, "info", options),
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {isMounted &&
        createPortal(
          <div className="toast-container fixed inset-0 pointer-events-none flex flex-col items-end justify-end p-4 z-[9999]">
            <div className="flex flex-col gap-2 pointer-events-auto">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  id={toast.id}
                  title={toast.title}
                  message={toast.message}
                  variant={toast.type}
                  position={toast.position}
                  duration={toast.duration}
                  onClose={removeToast}
                />
              ))}
            </div>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

