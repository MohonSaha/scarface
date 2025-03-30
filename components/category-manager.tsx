

"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Save, Edit, Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/toast-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Define the category type
interface Category {
  id: string
  name: string
  score: number
  color?: string
}

export function CategoryManager() {
  const { success, error, info } = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategories, setNewCategories] = useState<Category[]>([])
  const [categoryName, setCategoryName] = useState("")
  const [categoryScore, setCategoryScore] = useState<number>(0)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load categories from API on mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/categories")

      if (!response.ok) {
        throw new Error("Failed to fetch categories")
      }

      const data = await response.json()
      setCategories(data)
    } catch (err) {
      console.error("Error fetching categories:", err)
      error("Failed to load categories")
    } finally {
      setIsLoading(false)
    }
  }

  // Generate a random color for new categories
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-lime-500",
      "bg-emerald-500",
      "bg-violet-500",
      "bg-fuchsia-500",
      "bg-rose-500",
      "bg-amber-500",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      error("Category name is required")
      return
    }

    if (categoryScore < 0) {
      error("Score must be a positive number")
      return
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryName.trim(),
      score: categoryScore,
      color: getRandomColor(),
    }

    setNewCategories([...newCategories, newCategory])
    setCategoryName("")
    setCategoryScore(0)
  }

  const handleRemoveNewCategory = (id: string) => {
    setNewCategories(newCategories.filter((cat) => cat.id !== id))
  }

  const handleSaveCategories = async () => {
    if (newCategories.length === 0) {
      info("No new categories to save")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories: newCategories }),
      })

      if (!response.ok) {
        throw new Error("Failed to save categories")
      }

      await fetchCategories() // Refresh the list
      setNewCategories([])
      setIsDialogOpen(false)

      success(`${newCategories.length} categories saved successfully`)
    } catch (err) {
      console.error("Error saving categories:", err)
      error("Failed to save categories")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setCategoryName(category.name)
    setCategoryScore(category.score)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return

    if (!categoryName.trim()) {
      error("Category name is required")
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: categoryName.trim(),
          score: categoryScore,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update category")
      }

      await fetchCategories() // Refresh the list

      // Reset form
      setEditingCategory(null)
      setCategoryName("")
      setCategoryScore(0)
      setIsEditing(false)
      setIsDialogOpen(false)

      success("Category updated successfully")
    } catch (err) {
      console.error("Error updating category:", err)
      error("Failed to update category")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingCategory(null)
    setCategoryName("")
    setCategoryScore(0)
    setIsEditing(false)
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete category")
      }

      await fetchCategories() // Refresh the list

      success("Category deleted successfully")
    } catch (err) {
      console.error("Error deleting category:", err)
      error("Failed to delete category")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      // Reset form when dialog closes
      if (!isEditing) {
        setNewCategories([])
      }
      handleCancelEdit()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsEditing(false)
                setCategoryName("")
                setCategoryScore(0)
                setNewCategories([])
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Categories
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Category" : "Add New Categories"}</DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update the category details below."
                  : "Add multiple categories and save them all at once."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-score">Category Score</Label>
                  <Input
                    id="category-score"
                    type="number"
                    min="0"
                    value={categoryScore}
                    onChange={(e) => setCategoryScore(Number.parseInt(e.target.value) || 0)}
                    placeholder="Enter score"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancelEdit} disabled={isLoading}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateCategory} disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4 mr-2" />
                      )}
                      Update Category
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleAddCategory} disabled={isLoading}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add to List
                  </Button>
                )}
              </div>

              {/* Newly added categories (not yet saved) */}
              {!isEditing && newCategories.length > 0 && (
                <div className="space-y-2 mt-4">
                  <h3 className="text-sm font-medium">New Categories</h3>
                  <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-muted/20">
                    {newCategories.map((category) => (
                      <Badge
                        key={category.id}
                        className={cn("px-3 py-1 text-white flex items-center gap-2", category.color)}
                      >
                        {category.name} ({category.score})
                        <button onClick={() => handleRemoveNewCategory(category.id)} className="hover:text-white/80">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Button onClick={handleSaveCategories} className="w-full mt-2" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save All New Categories
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Existing categories */}
      {isLoading && categories.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : categories.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="flex items-center gap-2">
                    <div className={cn("h-3 w-3 rounded-full", category.color)}></div>
                    {category.name}
                  </TableCell>
                  <TableCell>{category.score}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCategory(category)}
                        className="h-8 w-8"
                        disabled={isLoading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-40 text-center">
          <p className="text-muted-foreground mb-4">No categories found</p>
          <p className="text-sm text-muted-foreground">Add your first category using the button above</p>
        </div>
      )}
    </div>
  )
}



