// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { X, Tag, Save, Pencil } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useToast } from "@/components/ui/toast-context"
// import type { LifeLesson, LifeLessonCategory } from "@/types/life-lesson"
// import { fetchLifeLessonCategories, createLifeLesson, updateLifeLesson } from "@/components/life-lesson-service"

// interface CreateLifeLessonModalProps {
//   onClose: () => void
//   onSuccess: () => void
//   editLesson?: LifeLesson
// }

// export function CreateLifeLessonModal({ onClose, onSuccess, editLesson }: CreateLifeLessonModalProps) {
//   const { success, error: showError } = useToast()
//   const [title, setTitle] = useState("")
//   const [description, setDescription] = useState("")
//   const [categoryId, setCategoryId] = useState<string>("")
//   const [newCategory, setNewCategory] = useState("")
//   const [categoryTab, setCategoryTab] = useState<"select" | "create">("select")
//   const [categories, setCategories] = useState<LifeLessonCategory[]>([])
//   const [isLoading, setIsLoading] = useState(false)

//   // Load categories and set initial values if editing
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const data = await fetchLifeLessonCategories()
//         setCategories(data)
//       } catch (err) {
//         console.error("Error loading categories:", err)
//         showError("Failed to load categories")
//       }
//     }

//     loadCategories()

//     // If editing, set initial values
//     if (editLesson) {
//       setTitle(editLesson.title)
//       setDescription(editLesson.description)
//       if (editLesson.categoryId) {
//         setCategoryId(editLesson.categoryId)
//         setCategoryTab("select")
//       }
//     }
//   }, [editLesson, showError])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!title.trim()) {
//       showError("Title is required")
//       return
//     }

//     if (!description.trim()) {
//       showError("Description is required")
//       return
//     }

//     try {
//       setIsLoading(true)

//       const lessonData = {
//         title: title.trim(),
//         description: description.trim(),
//         categoryId: categoryTab === "select" ? categoryId : undefined,
//         categoryName: categoryTab === "create" ? newCategory.trim() : undefined,
//       }

//       if (editLesson) {
//         // Update existing lesson
//         await updateLifeLesson(editLesson.id, lessonData)
//         success("Life lesson updated successfully")
//       } else {
//         // Create new lesson
//         await createLifeLesson(lessonData)
//         success("Life lesson created successfully")
//       }

//       onSuccess()
//       onClose()
//     } catch (err) {
//       console.error("Error saving life lesson:", err)
//       showError("Failed to save life lesson")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-lg max-h-[90vh] overflow-auto">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-xl">{editLesson ? "Edit Life Lesson" : "Create Life Lesson"}</CardTitle>
//           <Button variant="ghost" size="icon" onClick={onClose}>
//             <X className="h-4 w-4" />
//           </Button>
//         </CardHeader>

//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4 pt-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Title</Label>
//               <Input
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter a title for your life lesson"
//                 className="w-full"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Share your life lesson..."
//                 className="min-h-[150px]"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Category</Label>
//               <Tabs value={categoryTab} onValueChange={(value) => setCategoryTab(value as "select" | "create")}>
//                 <TabsList className="grid w-full grid-cols-2">
//                   <TabsTrigger value="select">Select Existing</TabsTrigger>
//                   <TabsTrigger value="create">Create New</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="select" className="pt-2">
//                   <Select value={categoryId} onValueChange={setCategoryId}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select a category (optional)" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="none">No Category</SelectItem>
//                       {categories.map((category) => (
//                         <SelectItem key={category.id} value={category.id}>
//                           <div className="flex items-center gap-2">
//                             <Tag className="h-3 w-3" />
//                             {category.name}
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </TabsContent>
//                 <TabsContent value="create" className="pt-2">
//                   <div className="flex items-center gap-2">
//                     <Input
//                       value={newCategory}
//                       onChange={(e) => setNewCategory(e.target.value)}
//                       placeholder="Enter a new category name"
//                       className="flex-1"
//                     />
//                   </div>
//                 </TabsContent>
//               </Tabs>
//             </div>
//           </CardContent>

//           <CardFooter className="flex justify-end gap-2">
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? (
//                 <span className="flex items-center gap-1">
//                   <span className="animate-spin">⏳</span> Saving...
//                 </span>
//               ) : editLesson ? (
//                 <span className="flex items-center gap-1">
//                   <Pencil className="h-4 w-4" /> Update
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-1">
//                   <Save className="h-4 w-4" /> Post
//                 </span>
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   )
// }



"use client"


import type React from "react"

import { useState, useEffect } from "react"
import { X, Tag, Save, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/toast-context"
import type { LifeLesson, LifeLessonCategory } from "@/types/life-lesson"
import { fetchLifeLessonCategories, createLifeLesson, updateLifeLesson } from "@/components/life-lesson-service"

interface CreateLifeLessonModalProps {
  onClose: () => void
  onSuccess: () => void
  editLesson?: LifeLesson
}

export function CreateLifeLessonModal({ onClose, onSuccess, editLesson }: CreateLifeLessonModalProps) {
  const { success, error: showError } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [newCategory, setNewCategory] = useState("")
  const [categoryTab, setCategoryTab] = useState<"select" | "create">("select")
  const [categories, setCategories] = useState<LifeLessonCategory[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load categories and set initial values if editing
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchLifeLessonCategories()
        setCategories(data)
      } catch (err) {
        console.error("Error loading categories:", err)
        showError("Failed to load categories")
      }
    }

    loadCategories()

    // If editing, set initial values
    if (editLesson) {
      setTitle(editLesson.title)
      setDescription(editLesson.description)
      if (editLesson.categoryId) {
        setCategoryId(editLesson.categoryId)
        setCategoryTab("select")
      }
    }
  }, [editLesson, showError])

  // Fix the categoryId handling in the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      showError("Title is required")
      return
    }

    if (!description.trim()) {
      showError("Description is required")
      return
    }

    try {
      setIsLoading(true)

      // Fix the categoryId handling - convert empty string to undefined
      const lessonData = {
        title: title.trim(),
        description: description.trim(),
        categoryId: categoryTab === "select" && categoryId && categoryId !== "none" ? categoryId : undefined,
        categoryName: categoryTab === "create" && newCategory.trim() ? newCategory.trim() : undefined,
      }

      console.log("Submitting lesson data:", lessonData, "Edit mode:", !!editLesson)

      if (editLesson) {
        // Update existing lesson - make sure we're passing the ID
        await updateLifeLesson(editLesson.id, lessonData)
        success("Life lesson updated successfully")
      } else {
        // Create new lesson
        await createLifeLesson(lessonData)
        success("Life lesson created successfully")
      }

      onSuccess()
      onClose()
    } catch (err) {
      console.error("Error saving life lesson:", err)
      showError("Failed to save life lesson")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl">{editLesson ? "Edit Life Lesson" : "Create Life Lesson"}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your life lesson"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your life lesson..."
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Tabs value={categoryTab} onValueChange={(value) => setCategoryTab(value as "select" | "create")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="select">Select Existing</TabsTrigger>
                  <TabsTrigger value="create">Create New</TabsTrigger>
                </TabsList>
                <TabsContent value="select" className="pt-2">
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Category</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          <div className="flex items-center gap-2">
                            <Tag className="h-3 w-3" />
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TabsContent>
                <TabsContent value="create" className="pt-2">
                  <div className="flex items-center gap-2">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter a new category name"
                      className="flex-1"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-1">
                  <span className="animate-spin">⏳</span> Saving...
                </span>
              ) : editLesson ? (
                <span className="flex items-center gap-1">
                  <Pencil className="h-4 w-4" /> Update
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Save className="h-4 w-4" /> Post
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

