// "use client"

// import { useState } from "react"
// import { format } from "date-fns"
// import { MoreHorizontal, Edit, Trash2, Tag } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { useToast } from "@/components/ui/toast-context"
// import type { LifeLesson } from "@/types/life-lesson"
// import { deleteLifeLesson } from "@/components/life-lesson-service"
// import { CreateLifeLessonModal } from "./create-life-lesson-modal"

// interface LifeLessonCardProps {
//   lesson: LifeLesson
//   onUpdate: () => void
// }

// export function LifeLessonCard({ lesson, onUpdate }: LifeLessonCardProps) {
//   const { success, error: showError } = useToast()
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   const handleDelete = async () => {
//     try {
//       setIsDeleting(true)
//       await deleteLifeLesson(lesson.id)
//       success("Life lesson deleted successfully")
//       onUpdate()
//     } catch (err) {
//       console.error("Error deleting life lesson:", err)
//       showError("Failed to delete life lesson")
//     } finally {
//       setIsDeleting(false)
//       setShowDeleteDialog(false)
//     }
//   }

//   return (
//     <>
//       <Card className="mb-4">
//         <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
//           <div>
//             <h3 className="text-xl font-semibold">{lesson.title}</h3>
//             <p className="text-sm text-muted-foreground">{format(lesson.createdAt, "MMMM d, yyyy 'at' h:mm a")}</p>
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <MoreHorizontal className="h-4 w-4" />
//                 <span className="sr-only">More options</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem onClick={() => setShowEditModal(true)}>
//                 <Edit className="h-4 w-4 mr-2" />
//                 Edit
//               </DropdownMenuItem>
//               <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600 focus:text-red-600">
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </CardHeader>
//         <CardContent>
//           <p className="whitespace-pre-line">{lesson.description}</p>
//         </CardContent>
//         {lesson.category && (
//           <CardFooter className="pt-0">
//             <div className="flex items-center gap-1 text-sm text-muted-foreground">
//               <Tag className="h-3 w-3" />
//               <span>{lesson.category.name}</span>
//             </div>
//           </CardFooter>
//         )}
//       </Card>

//       {/* Delete Confirmation Dialog */}
//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete your life lesson.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
//               {isDeleting ? "Deleting..." : "Delete"}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       {/* Edit Modal */}
//       {showEditModal && (
//         <CreateLifeLessonModal editLesson={lesson} onClose={() => setShowEditModal(false)} onSuccess={onUpdate} />
//       )}
//     </>
//   )
// }


"use client"

import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { MoreHorizontal, Edit, Trash2, Tag } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/toast-context"
import type { LifeLesson } from "@/types/life-lesson"
import { deleteLifeLesson } from "@/components/life-lesson-service"
import { CreateLifeLessonModal } from "@/components/create-life-lesson-modal"

interface LifeLessonCardProps {
  lesson: LifeLesson
  onUpdate: () => void
}

export function LifeLessonCard({ lesson, onUpdate }: LifeLessonCardProps) {
  const { success, error: showError } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await deleteLifeLesson(lesson.id)
      success("Life lesson deleted successfully")
      onUpdate()
    } catch (err) {
      console.error("Error deleting life lesson:", err)
      showError("Failed to delete life lesson")
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div>
            <h3 className="text-xl font-semibold">{lesson.title}</h3>
            <p className="text-sm text-muted-foreground">{format(lesson.createdAt, "MMMM d, yyyy 'at' h:mm a")}</p>
          </div>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-muted"
              aria-label="Open menu"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-50"
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowEditModal(true)
                      setShowDropdown(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteDialog(true)
                      setShowDropdown(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{lesson.description}</p>
        </CardContent>
        {lesson.category && (
          <CardFooter className="pt-0">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Tag className="h-3 w-3" />
              <span>{lesson.category.name}</span>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your life lesson.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Modal */}
      {showEditModal && (
        <CreateLifeLessonModal editLesson={lesson} onClose={() => setShowEditModal(false)} onSuccess={onUpdate} />
      )}
    </>
  )
}


