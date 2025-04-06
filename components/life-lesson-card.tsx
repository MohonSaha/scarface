

// "use client"

// import { useState, useRef, useEffect } from "react"
// import { format } from "date-fns"
// import { MoreHorizontal, Edit, Trash2, Tag } from "lucide-react"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
// import { CreateLifeLessonModal } from "@/components/create-life-lesson-modal"

// interface LifeLessonCardProps {
//   lesson: LifeLesson
//   onUpdate: () => void
// }

// export function LifeLessonCard({ lesson, onUpdate }: LifeLessonCardProps) {
//   const { success, error: showError } = useToast()
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [showDropdown, setShowDropdown] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const buttonRef = useRef<HTMLButtonElement>(null)

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

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         buttonRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         !buttonRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   return (
//     <>
//       <Card className="mb-4">
//         <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
//           <div>
//             <h3 className="md:text-lg text-md font-semibold">{lesson.title}</h3>
//             <p className="text-sm text-muted-foreground">{format(lesson.createdAt, "MMMM d, yyyy 'at' h:mm a")}</p>
//           </div>
//           <div className="relative">
//             <button
//               ref={buttonRef}
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-muted"
//               aria-label="Open menu"
//             >
//               <MoreHorizontal className="h-4 w-4" />
//             </button>

//             {showDropdown && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-50"
//               >
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       setShowEditModal(true)
//                       setShowDropdown(false)
//                     }}
//                     className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
//                   >
//                     <Edit className="h-4 w-4 mr-2" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowDeleteDialog(true)
//                       setShowDropdown(false)
//                     }}
//                     className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
//                   >
//                     <Trash2 className="h-4 w-4 mr-2" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
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


// "use client"

// import { useState, useRef, useEffect } from "react"
// import { format } from "date-fns"
// import { MoreHorizontal, Edit, Trash2, Tag } from "lucide-react"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
// import { CreateLifeLessonModal } from "@/components/create-life-lesson-modal"

// interface LifeLessonCardProps {
//   lesson: LifeLesson
//   onUpdate: () => void
// }

// export function LifeLessonCard({ lesson, onUpdate }: LifeLessonCardProps) {
//   const { success, error: showError } = useToast()
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [showDropdown, setShowDropdown] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const buttonRef = useRef<HTMLButtonElement>(null)
//   const [showFullDescription, setShowFullDescription] = useState(false)

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

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         buttonRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         !buttonRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   return (
//     <>
//       <Card className="mb-4">
//         <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
//           <div>
//             <h3 className="text-xl font-semibold">{lesson.title}</h3>
//             <p className="text-sm text-muted-foreground">{format(lesson.createdAt, "MMMM d, yyyy 'at' h:mm a")}</p>
//           </div>
//           <div className="relative">
//             <button
//               ref={buttonRef}
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="h-8 w-8 p-0 flex items-center justify-center rounded-md hover:bg-muted"
//               aria-label="Open menu"
//             >
//               <MoreHorizontal className="h-4 w-4" />
//             </button>

//             {showDropdown && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white border border-gray-200 z-50"
//               >
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       setShowEditModal(true)
//                       setShowDropdown(false)
//                     }}
//                     className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
//                   >
//                     <Edit className="h-4 w-4 mr-2" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowDeleteDialog(true)
//                       setShowDropdown(false)
//                     }}
//                     className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
//                   >
//                     <Trash2 className="h-4 w-4 mr-2" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="relative">
//             <div
//               className={`whitespace-pre-line overflow-hidden transition-all duration-300 ${
//                 showFullDescription ? "max-h-none" : "max-h-24"
//               }`}
//             >
//               <p>{lesson.description}</p>
//             </div>

//             {!showFullDescription && lesson.description.length > 150 && (
//               <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
//             )}

//             {lesson.description.length > 150 && (
//               <button
//                 onClick={() => setShowFullDescription(!showFullDescription)}
//                 className="mt-2 text-sm text-primary hover:text-primary/80 font-medium"
//               >
//                 {showFullDescription ? "Show less" : "Read more"}
//               </button>
//             )}
//           </div>
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



// "use client"

// import { useState, useRef, useEffect } from "react"
// import { format } from "date-fns"
// import { MoreHorizontal, Edit, Trash2, Tag, ChevronDown, ChevronUp } from "lucide-react"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
// import { CreateLifeLessonModal } from "@/components/create-life-lesson-modal"
// import { cn } from "@/lib/utils"

// interface LifeLessonCardProps {
//   lesson: LifeLesson
//   onUpdate: () => void
// }

// export function LifeLessonCard({ lesson, onUpdate }: LifeLessonCardProps) {
//   const { success, error: showError } = useToast()
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)
//   const [showDropdown, setShowDropdown] = useState(false)
//   const [expanded, setExpanded] = useState(false)
//   const [shouldShowExpandButton, setShouldShowExpandButton] = useState(false)
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const buttonRef = useRef<HTMLButtonElement>(null)
//   const contentRef = useRef<HTMLDivElement>(null)

//   // Check if content is long enough to need expansion
//   useEffect(() => {
//     if (contentRef.current) {
//       const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight
//       setShouldShowExpandButton(isOverflowing)
//     }
//   }, [lesson.description])

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

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         buttonRef.current &&
//         !dropdownRef.current.contains(event.target as Node) &&
//         !buttonRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   return (
//     <>
//       <Card className="mb-6 overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
//         <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
//           <div>
//             <h3 className="text-xl font-semibold">{lesson.title}</h3>
//             <p className="text-sm text-muted-foreground">{format(lesson.createdAt, "MMMM d, yyyy 'at' h:mm a")}</p>
//           </div>
//           <div className="relative">
//             <button
//               ref={buttonRef}
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="h-8 w-8 p-0 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               aria-label="Open menu"
//             >
//               <MoreHorizontal className="h-4 w-4" />
//             </button>

//             {showDropdown && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute right-0 mt-1 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 z-50 overflow-hidden"
//               >
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       setShowEditModal(true)
//                       setShowDropdown(false)
//                     }}
//                     className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     <Edit className="h-4 w-4 mr-2" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       setShowDeleteDialog(true)
//                       setShowDropdown(false)
//                     }}
//                     className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                   >
//                     <Trash2 className="h-4 w-4 mr-2" />
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </CardHeader>
//         <CardContent className="px-6 pt-4 pb-2">
//           <div className="relative">
//             <div
//               ref={contentRef}
//               className={cn(
//                 "prose prose-sm dark:prose-invert max-w-none",
//                 !expanded && "max-h-[120px] overflow-hidden",
//               )}
//             >
//               <p className="whitespace-pre-line">{lesson.description}</p>
//             </div>

//             {!expanded && shouldShowExpandButton && (
//               <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
//             )}

//             {shouldShowExpandButton && (
//               <button
//                 onClick={() => setExpanded(!expanded)}
//                 className="mt-2 w-full flex items-center justify-center gap-1 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
//               >
//                 {expanded ? (
//                   <>
//                     <ChevronUp className="h-4 w-4" />
//                     <span>Show less</span>
//                   </>
//                 ) : (
//                   <>
//                     <ChevronDown className="h-4 w-4" />
//                     <span>Read more</span>
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </CardContent>
//         {lesson.category && (
//           <CardFooter className="pt-0 pb-4 px-6">
//             <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300">
//               <Tag className="h-3 w-3" />
//               <span>{lesson.category.name}</span>
//             </div>
//           </CardFooter>
//         )}
//       </Card>

//       {/* Delete Confirmation Dialog */}
//       <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
//         <AlertDialogContent className="rounded-lg border-0 shadow-xl">
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete your life lesson.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel disabled={isDeleting} className="rounded-lg">
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDelete}
//               disabled={isDeleting}
//               className="bg-red-600 hover:bg-red-700 rounded-lg"
//             >
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
import { MoreHorizontal, Edit, Trash2, Tag, ArrowDownCircle, ArrowUpCircle, Clock } from "lucide-react"
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
import { cn } from "@/lib/utils"

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
  const [expanded, setExpanded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  const [needsExpansion, setNeedsExpansion] = useState(false)

  // Check if content is long enough to need expansion
  useEffect(() => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight
      setContentHeight(fullHeight)
      setNeedsExpansion(fullHeight > 100) // 100px is our collapsed height
    }
  }, [lesson.description])

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

  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <Card className="mb-3 overflow-hidden border-none bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 shadow-none hover:shadow-sm transition-all duration-300">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 border-b border-blue-100 dark:border-blue-900">
          <div className="flex items-center gap-3">
            {/* <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
              {lesson.title.charAt(0).toUpperCase()}
            </div> */}
            <div>
              <h3 className="md:text-lg text-md font-bold text-blue-800 dark:text-blue-300">{lesson.title}</h3>
              <div className="flex items-center text-xs text-blue-600 dark:text-blue-400 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {format(lesson.createdAt, "MMMM d, yyyy 'at' h:mm a")}
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-8 w-8 p-0 flex items-center justify-center rounded-full bg-white dark:bg-blue-900 shadow-sm hover:shadow transition-all"
              aria-label="Open menu"
            >
              <MoreHorizontal className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </button>

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white dark:bg-gray-800 border-none z-50 overflow-hidden"
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowEditModal(true)
                      setShowDropdown(false)
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-left hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                    Edit Lesson
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteDialog(true)
                      setShowDropdown(false)
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Lesson
                  </button>
                </div>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="relative">
            <div
              ref={contentRef}
              className="text-blue-900 dark:text-blue-100 leading-relaxed"
              style={{
                maxHeight: expanded ? `${contentHeight}px` : "100px",
                overflow: "hidden",
                transition: "max-height 0.5s ease-in-out",
              }}
            >
              <p className="whitespace-pre-line">{lesson.description}</p>
            </div>

            {!expanded && needsExpansion && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50 to-transparent dark:from-blue-950 dark:to-transparent" />
            )}
          </div>

          {needsExpansion && (
            <button
              onClick={toggleExpanded}
              className={cn(
                "mt-4 flex items-center gap-2 px-4 py-2 rounded-full",
                "bg-blue-600 hover:bg-blue-700 text-white",
                "transition-all duration-300 transform",
                expanded ? "translate-y-0" : "translate-y-0",
              )}
            >
              {expanded ? (
                <>
                  <ArrowUpCircle className="h-4 w-4" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ArrowDownCircle className="h-4 w-4" />
                  <span>Read More</span>
                </>
              )}
            </button>
          )}
        </CardContent>

        {lesson.category && (
          <CardFooter className="pt-0 pb-4 px-6 flex justify-between items-center">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-200 dark:bg-blue-800 text-xs font-medium text-blue-800 dark:text-blue-200">
              <Tag className="h-3 w-3" />
              <span>{lesson.category.name}</span>
            </div>

            <div className="text-xs text-blue-600 dark:text-blue-400">Lesson #{lesson.id.substring(0, 6)}</div>
          </CardFooter>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="rounded-xl border-none shadow-2xl bg-white dark:bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-blue-800 dark:text-blue-300">
              Delete this lesson?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-blue-600 dark:text-blue-400">
              This action cannot be undone. This will permanently delete your life lesson.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="rounded-full border-blue-200 text-blue-800 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete Lesson"}
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


