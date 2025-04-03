export interface LifeLessonCategory {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
  }
  
  export interface LifeLesson {
    id: string
    title: string
    description: string
    categoryId?: string
    category?: LifeLessonCategory
    createdAt: Date
    updatedAt: Date
  }
  
  export interface CreateLifeLessonDto {
    title: string
    description: string
    categoryId?: string
    categoryName?: string // For creating a new category
  }
  
  export interface UpdateLifeLessonDto {
    title?: string
    description?: string
    categoryId?: string
    categoryName?: string // For creating a new category
  }
  
  