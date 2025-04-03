"use client"

import { useState, useEffect } from "react"
import { Edit, Plus, Tag, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast-context"
import { CreateLifeLessonModal } from "@/components/create-life-lesson-modal"
import { LifeLessonCard } from "@/components/life-lesson-card"
import type { LifeLesson, LifeLessonCategory } from "@/types/life-lesson"
import { fetchLifeLessons, fetchLifeLessonCategories } from "@/components/life-lesson-service"

export default function LifeLessonsPage() {
  const { error: showError } = useToast()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [lessons, setLessons] = useState<LifeLesson[]>([])
  const [categories, setCategories] = useState<LifeLessonCategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  // Load life lessons and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [lessonsData, categoriesData] = await Promise.all([
          fetchLifeLessons(selectedCategoryId || undefined),
          fetchLifeLessonCategories(),
        ])
        setLessons(lessonsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error("Error loading data:", err)
        showError("Failed to load life lessons")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [selectedCategoryId, showError])

  const handleRefresh = async () => {
    try {
      setIsLoading(true)
      const lessonsData = await fetchLifeLessons(selectedCategoryId || undefined)
      setLessons(lessonsData)
    } catch (err) {
      console.error("Error refreshing lessons:", err)
      showError("Failed to refresh life lessons")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Life Lessons</h1>

      {/* Post creation card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div
            className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setShowCreateModal(true)}
          >
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Edit className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground">Share a life lesson...</p>
          </div>
        </CardContent>
      </Card>

      {/* Filter section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filter by category:</span>
        </div>
        <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
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
      </div>

      {/* Life lessons list */}
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : lessons.length > 0 ? (
          lessons.map((lesson) => <LifeLessonCard key={lesson.id} lesson={lesson} onUpdate={handleRefresh} />)
        ) : (
          <div className="text-center p-10 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground mb-4">No life lessons found</p>
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Life Lesson
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && <CreateLifeLessonModal onClose={() => setShowCreateModal(false)} onSuccess={handleRefresh} />}
    </div>
  )
}

