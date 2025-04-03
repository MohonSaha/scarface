

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { X, Plus, Calendar, Eye, Check } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { format } from "date-fns"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"

// interface CategoryModalProps {
//   onClose: () => void
// }

// // Define the category type
// interface Category {
//   id: string
//   name: string
//   color: string
// }

// // Define the daily categories type
// interface DailyCategories {
//   date: string
//   categories: Category[]
// }

// // Predefined categories
// const predefinedCategories: Category[] = [
//   { id: "1", name: "Workout", color: "bg-red-500" },
//   { id: "2", name: "Coding", color: "bg-blue-500" },
//   { id: "3", name: "Sleeping", color: "bg-purple-500" },
//   { id: "4", name: "Learning", color: "bg-green-500" },
//   { id: "5", name: "Practice", color: "bg-yellow-500" },
//   { id: "6", name: "English", color: "bg-pink-500" },
//   { id: "7", name: "Book", color: "bg-indigo-500" },
//   { id: "8", name: "Social Media", color: "bg-orange-500" },
//   { id: "9", name: "Temple", color: "bg-teal-500" },
// ]

// export function CategoryModal({ onClose }: CategoryModalProps) {
//   const [mode, setMode] = useState<"view" | "add">("view")
//   const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
//   const [selectedCategory, setSelectedCategory] = useState<string>("")
//   const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
//   const [savedCategories, setSavedCategories] = useState<DailyCategories[]>([])

//   // Load saved categories from localStorage on mount
//   useEffect(() => {
//     const saved = localStorage.getItem("dailyCategories")
//     if (saved) {
//       setSavedCategories(JSON.parse(saved))
//     }
//   }, [])

//   // Get categories for the selected date
//   const getCategoriesForDate = (dateStr: string) => {
//     const found = savedCategories.find((item) => item.date === dateStr)
//     return found ? found.categories : []
//   }

//   // Initialize selected categories when date changes in view mode
//   useEffect(() => {
//     if (mode === "view") {
//       setSelectedCategories(getCategoriesForDate(date))
//     }
//   }, [date, mode, savedCategories])

//   const handleAddCategory = () => {
//     if (!selectedCategory) return

//     const category = predefinedCategories.find((c) => c.id === selectedCategory)
//     if (!category) return

//     // Check if category is already selected
//     if (selectedCategories.some((c) => c.id === category.id)) return

//     setSelectedCategories([...selectedCategories, category])
//     setSelectedCategory("")
//   }

//   const handleRemoveCategory = (id: string) => {
//     setSelectedCategories(selectedCategories.filter((c) => c.id !== id))
//   }

//   const handleSaveCategories = () => {
//     // Create a new daily categories object
//     const newDailyCategories: DailyCategories = {
//       date,
//       categories: selectedCategories,
//     }

//     // Update or add to saved categories
//     const updatedSavedCategories = [...savedCategories]
//     const existingIndex = updatedSavedCategories.findIndex((item) => item.date === date)

//     if (existingIndex >= 0) {
//       updatedSavedCategories[existingIndex] = newDailyCategories
//     } else {
//       updatedSavedCategories.push(newDailyCategories)
//     }

//     // Save to state and localStorage
//     setSavedCategories(updatedSavedCategories)
//     localStorage.setItem("dailyCategories", JSON.stringify(updatedSavedCategories))

//     // Switch to view mode
//     setMode("view")
//   }

//   // Handle click outside to prevent propagation
//   const handleCardClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//   }

//   // Prevent category removal click from propagating to parent
//   const handleRemoveClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation()
//     e.preventDefault()
//     handleRemoveCategory(id)
//   }

//   return (
//     <div
//       className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
//       onClick={onClose}
//     >
//       <Card className="w-full max-w-md max-h-[90vh] overflow-auto relative" onClick={handleCardClick}>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sticky top-0 bg-background z-10">
//           <CardTitle className="text-xl">{mode === "view" ? "Daily Categories" : "Add Categories"}</CardTitle>
//           <div className="flex items-center gap-2">
//             {mode === "view" ? (
//               <Button variant="outline" size="icon" onClick={() => setMode("add")} className="h-8 w-8">
//                 <Plus className="h-4 w-4" />
//               </Button>
//             ) : (
//               <Button variant="outline" size="icon" onClick={() => setMode("view")} className="h-8 w-8">
//                 <Eye className="h-4 w-4" />
//               </Button>
//             )}
//             <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>

//         <CardContent className="space-y-4 pt-4 z-20 relative">
//           <div className="space-y-2">
//             <Label htmlFor="date" className="text-base font-medium flex items-center gap-1">
//               <Calendar className="h-4 w-4 text-primary" />
//               Date
//             </Label>
//             <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="text-base" />
//           </div>

//           {mode === "add" && (
//             <div className="space-y-2">
//               <Label htmlFor="category" className="text-base font-medium">
//                 Select Category
//               </Label>
//               <div className="flex gap-2">
//                 <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                   <SelectTrigger className="flex-1">
//                     <SelectValue placeholder="Select a category" />
//                   </SelectTrigger>
//                   <SelectContent className="z-[9999]">
//                     {predefinedCategories.map((category) => (
//                       <SelectItem key={category.id} value={category.id}>
//                         <div className="flex items-center gap-2">
//                           <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
//                           {category.name}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <Button type="button" onClick={handleAddCategory} disabled={!selectedCategory} className="shrink-0">
//                   Add
//                 </Button>
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label className="text-base font-medium">
//               {mode === "view" ? "Categories for this day" : "Selected Categories"}
//             </Label>
//             <div className="min-h-[100px] p-3 border rounded-md bg-muted/20 relative z-20">
//               {selectedCategories.length > 0 ? (
//                 <div className="flex flex-wrap gap-2">
//                   {selectedCategories.map((category) => (
//                     <Badge key={category.id} className={cn("px-3 py-1 text-white relative z-30", category.color)}>
//                       {category.name}
//                       {mode === "add" && (
//                         <button
//                           onClick={(e) => handleRemoveClick(e, category.id)}
//                           className="ml-2 hover:text-white/80 relative z-40"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       )}
//                     </Badge>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-muted-foreground">
//                   No categories selected for this day
//                 </div>
//               )}
//             </div>
//           </div>
//         </CardContent>

//         {mode === "add" && (
//           <CardFooter className="relative z-20">
//             <Button onClick={handleSaveCategories} className="w-full" disabled={selectedCategories.length === 0}>
//               <Check className="h-4 w-4 mr-2" />
//               Save Categories
//             </Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   )
// }



// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { X, Plus, Calendar, Eye, Check, Trash2, Loader2, AlertCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { format } from "date-fns"
// import { Badge } from "@/components/ui/badge"
// import { cn } from "@/lib/utils"
// import { useToast } from "@/components/ui/toast-context"

// interface CategoryModalProps {
//   onClose: () => void
// }

// // Define the category type
// interface Category {
//   id: string
//   name: string
//   color: string
//   dailyCategoryId?: string
// }

// export function CategoryModal({ onClose }: CategoryModalProps) {
//   const { success, error: showError } = useToast()
//   const [mode, setMode] = useState<"view" | "add">("view")
//   const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
//   const [selectedCategory, setSelectedCategory] = useState<string>("")
//   const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
//   const [availableCategories, setAvailableCategories] = useState<Category[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   // Fetch all available categories from the database
//   const fetchAvailableCategories = async () => {
//     try {
//       setIsLoading(true)
//       const response = await fetch("/api/categories")

//       if (!response.ok) {
//         throw new Error("Failed to fetch categories")
//       }

//       const data = await response.json()

//       // Transform the data to match our Category interface
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const categories: Category[] = data.map((cat: any) => ({
//         id: cat.id,
//         name: cat.name,
//         color: cat.color || `bg-${getRandomColor()}-500`,
//       }))

//       setAvailableCategories(categories)
//     } catch (err) {
//       console.error("Error fetching categories:", err)
//       setError("Failed to load categories")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Fetch daily categories for the selected date
//   const fetchDailyCategories = async (dateStr: string) => {
//     try {
//       setIsLoading(true)
//       setError(null)

//       // Add a fallback mechanism to handle API errors
//       try {
//         const response = await fetch(`/api/daily-categories?date=${dateStr}`)

//         console.log(response)

//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({}))
//           console.error("API error response:", errorData)
//           throw new Error(`Failed to fetch daily categories: ${response.status} ${response.statusText}`)
//         }

//         const data = await response.json()
//         setSelectedCategories(data)
//       } catch (fetchError) {
//         console.error("Error fetching daily categories:", fetchError)

//         // Fallback to empty array if API fails
//         setSelectedCategories([])
//         setError(`Error loading categories: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`)
//       }
//     } catch (err) {
//       console.error("Error in fetchDailyCategories:", err)
//       setError("Failed to load daily categories")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Load available categories on mount
//   useEffect(() => {
//     fetchAvailableCategories()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   // Fetch daily categories when date changes
//   useEffect(() => {
//     fetchDailyCategories(date)
//   }, [date])

//   // Get random color for categories without a color
//   const getRandomColor = () => {
//     const colors = [
//       "red",
//       "blue",
//       "green",
//       "yellow",
//       "purple",
//       "pink",
//       "indigo",
//       "orange",
//       "teal",
//       "cyan",
//       "lime",
//       "emerald",
//       "violet",
//       "fuchsia",
//       "rose",
//       "amber",
//     ]
//     return colors[Math.floor(Math.random() * colors.length)]
//   }

//   const handleAddCategory = () => {
//     if (!selectedCategory) return

//     const category = availableCategories.find((c) => c.id === selectedCategory)
//     if (!category) return

//     // Check if category is already selected
//     if (selectedCategories.some((c) => c.id === category.id)) return

//     setSelectedCategories([...selectedCategories, category])
//     setSelectedCategory("")
//   }

//   const handleRemoveCategory = (id: string) => {
//     setSelectedCategories(selectedCategories.filter((c) => c.id !== id))
//   }

//   const handleSaveCategories = async () => {
//     if (selectedCategories.length === 0) {
//       showError("Please select at least one category")
//       return
//     }

//     try {
//       setIsLoading(true)
//       setError(null)

//       const response = await fetch("/api/daily-categories", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           date,
//           categoryIds: selectedCategories.map((c) => c.id),
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to save daily categories")
//       }

//       const data = await response.json()
//       setSelectedCategories(data.categories)
//       success("Categories saved successfully")

//       // Switch to view mode
//       setMode("view")
//     } catch (err) {
//       console.error("Error saving daily categories:", err)
//       setError("Failed to save categories")
//       showError("Failed to save categories")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDeleteDailyCategory = async (dailyCategoryId: string) => {
//     if (!dailyCategoryId) return

//     try {
//       setIsLoading(true)

//       const response = await fetch(`/api/daily-categories/${dailyCategoryId}`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error("Failed to delete daily category")
//       }

//       // Remove from local state
//       setSelectedCategories(selectedCategories.filter((c) => c.dailyCategoryId !== dailyCategoryId))
//       success("Category removed successfully")
//     } catch (err) {
//       console.error("Error deleting daily category:", err)
//       showError("Failed to remove category")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // Handle click outside to prevent propagation
//   const handleCardClick = (e: React.MouseEvent) => {
//     e.stopPropagation()
//   }

//   // Prevent category removal click from propagating to parent
//   const handleRemoveClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation()
//     e.preventDefault()
//     handleRemoveCategory(id)
//   }

//   // Get filtered available categories (exclude already selected ones)
//   const getFilteredCategories = () => {
//     return availableCategories.filter((category) => !selectedCategories.some((selected) => selected.id === category.id))
//   }

//   return (
//     <div
//       className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
//       onClick={onClose}
//     >
//       <Card className="w-full max-w-md max-h-[90vh] overflow-auto relative" onClick={handleCardClick}>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sticky top-0 bg-background z-10">
//           <CardTitle className="text-xl">{mode === "view" ? "Daily Categories" : "Add Categories"}</CardTitle>
//           <div className="flex items-center gap-2">
//             {mode === "view" ? (
//               <Button variant="outline" size="icon" onClick={() => setMode("add")} className="h-8 w-8">
//                 <Plus className="h-4 w-4" />
//               </Button>
//             ) : (
//               <Button variant="outline" size="icon" onClick={() => setMode("view")} className="h-8 w-8">
//                 <Eye className="h-4 w-4" />
//               </Button>
//             )}
//             <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>

//         <CardContent className="space-y-4 pt-4 z-20 relative">
//           <div className="space-y-2">
//             <Label htmlFor="date" className="text-base font-medium flex items-center gap-1">
//               <Calendar className="h-4 w-4 text-primary" />
//               Date
//             </Label>
//             <Input
//               id="date"
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="text-base"
//               disabled={isLoading}
//             />
//           </div>

//           {error && (
//             <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-center gap-2 text-sm">
//               <AlertCircle className="h-4 w-4" />
//               {error}
//             </div>
//           )}

//           {mode === "add" && (
//             <div className="space-y-2">
//               <Label htmlFor="category" className="text-base font-medium">
//                 Select Category
//               </Label>
//               <div className="flex gap-2">
//                 <Select
//                   value={selectedCategory}
//                   onValueChange={setSelectedCategory}
//                   disabled={isLoading || getFilteredCategories().length === 0}
//                 >
//                   <SelectTrigger className="flex-1">
//                     <SelectValue
//                       placeholder={
//                         getFilteredCategories().length === 0 ? "No more categories available" : "Select a category"
//                       }
//                     />
//                   </SelectTrigger>
//                   <SelectContent className="z-[9999]">
//                     {getFilteredCategories().map((category) => (
//                       <SelectItem key={category.id} value={category.id}>
//                         <div className="flex items-center gap-2">
//                           <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
//                           {category.name}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <Button
//                   type="button"
//                   onClick={handleAddCategory}
//                   disabled={!selectedCategory || isLoading}
//                   className="shrink-0"
//                 >
//                   Add
//                 </Button>
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label className="text-base font-medium">
//               {mode === "view" ? "Categories for this day" : "Selected Categories"}
//             </Label>
//             <div className="min-h-[100px] p-3 border rounded-md bg-muted/20 relative z-20">
//               {isLoading ? (
//                 <div className="flex items-center justify-center h-full">
//                   <Loader2 className="h-6 w-6 animate-spin text-primary" />
//                 </div>
//               ) : selectedCategories.length > 0 ? (
//                 <div className="flex flex-wrap gap-2">
//                   {selectedCategories.map((category) => (
//                     <Badge key={category.id} className={cn("px-3 py-1 text-white relative z-30", category.color)}>
//                       {category.name} 
//                       {mode === "add" ? (
//                         <button
//                           onClick={(e) => handleRemoveClick(e, category.id)}
//                           className="ml-2 hover:text-white/80 relative z-40"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() =>
//                             category.dailyCategoryId && handleDeleteDailyCategory(category.dailyCategoryId)
//                           }
//                           className="ml-2 hover:text-white/80 relative z-40"
//                           disabled={isLoading}
//                         >
//                           <Trash2 className="h-3 w-3" />
//                         </button>
//                       )}
//                     </Badge>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center h-full text-muted-foreground">
//                   No categories selected for this day
//                 </div>
//               )}
//             </div>
//           </div>
//         </CardContent>

//         {mode === "add" && (
//           <CardFooter className="relative z-20">
//             <Button
//               onClick={handleSaveCategories}
//               className="w-full"
//               disabled={selectedCategories.length === 0 || isLoading}
//             >
//               {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
//               Save Categories
//             </Button>
//           </CardFooter>
//         )}
//       </Card>
//     </div>
//   )
// }



"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus, Calendar, Eye, Check, Trash2, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/toast-context"

interface CategoryModalProps {
  onClose: () => void
}

// Define the category type
interface Category {
  id: string
  name: string
  color: string
  dailyCategoryId?: string
}

export function CategoryModal({ onClose }: CategoryModalProps) {
  const { success, error: showError } = useToast()
  const [mode, setMode] = useState<"view" | "add">("view")
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"))
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [availableCategories, setAvailableCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all available categories from the database
  const fetchAvailableCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/categories")

      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }

      const data = await response.json()

      // Transform the data to match our Category interface
      const categories: Category[] = data.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        color: cat.color || `bg-${getRandomColor()}-500`,
      }))

      setAvailableCategories(categories)
    } catch (err) {
      console.error("Error fetching categories:", err)
      setError("Failed to load categories")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch daily categories for the selected date
  const fetchDailyCategories = async (dateStr: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Add a fallback mechanism to handle API errors
      try {
        const response = await fetch(`/api/daily-categories?date=${dateStr}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error("API error response:", errorData)
          throw new Error(`Failed to fetch daily categories: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setSelectedCategories(data)
      } catch (fetchError) {
        console.error("Error fetching daily categories:", fetchError)

        // Fallback to empty array if API fails
        setSelectedCategories([])
        setError(`Error loading categories: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`)
      }
    } catch (err) {
      console.error("Error in fetchDailyCategories:", err)
      setError("Failed to load daily categories")
    } finally {
      setIsLoading(false)
    }
  }

  // Load available categories on mount
  useEffect(() => {
    fetchAvailableCategories()
  }, [])

  // Fetch daily categories when date changes
  useEffect(() => {
    fetchDailyCategories(date)
  }, [date])

  // Get random color for categories without a color
  const getRandomColor = () => {
    const colors = [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "pink",
      "indigo",
      "orange",
      "teal",
      "cyan",
      "lime",
      "emerald",
      "violet",
      "fuchsia",
      "rose",
      "amber",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleAddCategory = () => {
    if (!selectedCategory) return

    const category = availableCategories.find((c) => c.id === selectedCategory)
    if (!category) return

    // Check if category is already selected
    if (selectedCategories.some((c) => c.id === category.id)) return

    setSelectedCategories([...selectedCategories, category])
    setSelectedCategory("")
  }

  const handleRemoveCategory = (id: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c.id !== id))
  }

  const handleSaveCategories = async () => {
    if (selectedCategories.length === 0) {
      showError("Please select at least one category")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("/api/daily-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          categoryIds: selectedCategories.map((c) => c.id),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to save daily categories")
      }

      const data = await response.json()
      setSelectedCategories(data.categories)
      success("Categories saved successfully")

      // Switch to view mode
      setMode("view")
    } catch (err) {
      console.error("Error saving daily categories:", err)
      setError("Failed to save categories")
      showError("Failed to save categories")
    } finally {
      setIsLoading(false)
    }
  }

  // Find the handleDeleteDailyCategory function and update it to ensure the ID is properly passed
  const handleDeleteDailyCategory = async (dailyCategoryId: string) => {
    if (!dailyCategoryId) return

    try {
      setIsLoading(true)

      // Make sure we're using the correct URL format with the ID in the path
      const response = await fetch(`/api/daily-categories/${dailyCategoryId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("Delete failed with status:", response.status, errorData)
        throw new Error(`Failed to delete daily category: ${response.statusText}`)
      }

      // Remove from local state
      setSelectedCategories(selectedCategories.filter((c) => c.dailyCategoryId !== dailyCategoryId))
      success("Category removed successfully")
    } catch (err) {
      console.error("Error deleting daily category:", err)
      showError("Failed to remove category")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle click outside to prevent propagation
  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // Prevent category removal click from propagating to parent
  const handleRemoveClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    e.preventDefault()
    handleRemoveCategory(id)
  }

  // Get filtered available categories (exclude already selected ones)
  const getFilteredCategories = () => {
    return availableCategories.filter((category) => !selectedCategories.some((selected) => selected.id === category.id))
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <Card className="w-full max-w-md max-h-[90vh] overflow-auto relative" onClick={handleCardClick}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sticky top-0 bg-background z-10">
          <CardTitle className="text-xl">{mode === "view" ? "Daily Categories" : "Add Categories"}</CardTitle>
          <div className="flex items-center gap-2">
            {mode === "view" ? (
              <Button variant="outline" size="icon" onClick={() => setMode("add")} className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            ) : (
              <Button variant="outline" size="icon" onClick={() => setMode("view")} className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4 z-20 relative">
          <div className="space-y-2">
            <Label htmlFor="date" className="text-base font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="text-base"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {mode === "add" && (
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-medium">
                Select Category
              </Label>
              <div className="flex gap-2">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  disabled={isLoading || getFilteredCategories().length === 0}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue
                      placeholder={
                        getFilteredCategories().length === 0 ? "No more categories available" : "Select a category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="z-[9999]">
                    {getFilteredCategories().map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${category.color}`}></div>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={!selectedCategory || isLoading}
                  className="shrink-0"
                >
                  Add
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-base font-medium">
              {mode === "view" ? "Categories for this day" : "Selected Categories"}
            </Label>
            <div className="min-h-[100px] p-3 border rounded-md bg-muted/20 relative z-20">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : selectedCategories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <Badge key={category.id} className={cn("px-3 py-1 text-white relative z-30", category.color)}>
                      {category.name}
                      {mode === "add" ? (
                        <button
                          onClick={(e) => handleRemoveClick(e, category.id)}
                          className="ml-2 hover:text-white/80 relative z-40"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            category.dailyCategoryId && handleDeleteDailyCategory(category.dailyCategoryId)
                          }
                          className="ml-2 hover:text-white/80 relative z-40"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No categories selected for this day
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {mode === "add" && (
          <CardFooter className="relative z-20">
            <Button
              onClick={handleSaveCategories}
              className="w-full"
              disabled={selectedCategories.length === 0 || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
              Save Categories
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

