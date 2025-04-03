// import type { LifeLesson, LifeLessonCategory, CreateLifeLessonDto, UpdateLifeLessonDto } from "@/types/life-lesson"

// // Fetch all life lessons
// export async function fetchLifeLessons(categoryId?: string): Promise<LifeLesson[]> {
//   let url = "/api/life-lessons"

//   if (categoryId) {
//     url += `?categoryId=${categoryId}`
//   }

//   const response = await fetch(url)

//   if (!response.ok) {
//     throw new Error("Failed to fetch life lessons")
//   }

//   const data = await response.json()

//   // Convert string dates to Date objects
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return data.map((lesson: any) => ({
//     ...lesson,
//     createdAt: new Date(lesson.createdAt),
//     updatedAt: new Date(lesson.updatedAt),
//     category: lesson.category
//       ? {
//           ...lesson.category,
//           createdAt: new Date(lesson.category.createdAt),
//           updatedAt: new Date(lesson.category.updatedAt),
//         }
//       : undefined,
//   }))
// }

// // Fetch a specific life lesson
// export async function fetchLifeLesson(id: string): Promise<LifeLesson> {
//   const response = await fetch(`/api/life-lessons/${id}`)

//   if (!response.ok) {
//     throw new Error("Failed to fetch life lesson")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     createdAt: new Date(data.createdAt),
//     updatedAt: new Date(data.updatedAt),
//     category: data.category
//       ? {
//           ...data.category,
//           createdAt: new Date(data.category.createdAt),
//           updatedAt: new Date(data.category.updatedAt),
//         }
//       : undefined,
//   }
// }

// // Create a new life lesson
// export async function createLifeLesson(lesson: CreateLifeLessonDto): Promise<LifeLesson> {
//   const response = await fetch("/api/life-lessons", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(lesson),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to create life lesson")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     createdAt: new Date(data.createdAt),
//     updatedAt: new Date(data.updatedAt),
//     category: data.category
//       ? {
//           ...data.category,
//           createdAt: new Date(data.category.createdAt),
//           updatedAt: new Date(data.category.updatedAt),
//         }
//       : undefined,
//   }
// }

// // Update a life lesson
// export async function updateLifeLesson(id: string, updates: UpdateLifeLessonDto): Promise<LifeLesson> {
//   const response = await fetch(`/api/life-lessons/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(updates),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to update life lesson")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     createdAt: new Date(data.createdAt),
//     updatedAt: new Date(data.updatedAt),
//     category: data.category
//       ? {
//           ...data.category,
//           createdAt: new Date(data.category.createdAt),
//           updatedAt: new Date(data.category.updatedAt),
//         }
//       : undefined,
//   }
// }

// // Delete a life lesson
// export async function deleteLifeLesson(id: string): Promise<void> {
//   const response = await fetch(`/api/life-lessons/${id}`, {
//     method: "DELETE",
//   })

//   if (!response.ok) {
//     throw new Error("Failed to delete life lesson")
//   }
// }

// // Fetch all life lesson categories
// export async function fetchLifeLessonCategories(): Promise<LifeLessonCategory[]> {
//   const response = await fetch("/api/life-lesson-categories")

//   if (!response.ok) {
//     throw new Error("Failed to fetch categories")
//   }

//   const data = await response.json()

//   // Convert string dates to Date objects
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   return data.map((category: any) => ({
//     ...category,
//     createdAt: new Date(category.createdAt),
//     updatedAt: new Date(category.updatedAt),
//   }))
// }

// // Create a new life lesson category
// export async function createLifeLessonCategory(name: string): Promise<LifeLessonCategory> {
//   const response = await fetch("/api/life-lesson-categories", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name }),
//   })

//   if (!response.ok) {
//     throw new Error("Failed to create category")
//   }

//   const data = await response.json()

//   return {
//     ...data,
//     createdAt: new Date(data.createdAt),
//     updatedAt: new Date(data.updatedAt),
//   }
// }



import type { LifeLesson, LifeLessonCategory, CreateLifeLessonDto, UpdateLifeLessonDto } from "@/types/life-lesson"

// Fetch all life lessons
export async function fetchLifeLessons(categoryId?: string): Promise<LifeLesson[]> {
  let url = "/api/life-lessons"

  if (categoryId) {
    url += `?categoryId=${categoryId}`
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch life lessons")
  }

  const data = await response.json()

  // Convert string dates to Date objects
  return data.map((lesson: any) => ({
    ...lesson,
    createdAt: new Date(lesson.createdAt),
    updatedAt: new Date(lesson.updatedAt),
    category: lesson.category
      ? {
          ...lesson.category,
          createdAt: new Date(lesson.category.createdAt),
          updatedAt: new Date(lesson.category.updatedAt),
        }
      : undefined,
  }))
}

// Fetch a specific life lesson
export async function fetchLifeLesson(id: string): Promise<LifeLesson> {
  const response = await fetch(`/api/life-lessons/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch life lesson")
  }

  const data = await response.json()

  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    category: data.category
      ? {
          ...data.category,
          createdAt: new Date(data.category.createdAt),
          updatedAt: new Date(data.category.updatedAt),
        }
      : undefined,
  }
}

// Create a new life lesson
export async function createLifeLesson(lesson: CreateLifeLessonDto): Promise<LifeLesson> {
  const response = await fetch("/api/life-lessons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lesson),
  })

  if (!response.ok) {
    throw new Error("Failed to create life lesson")
  }

  const data = await response.json()

  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    category: data.category
      ? {
          ...data.category,
          createdAt: new Date(data.category.createdAt),
          updatedAt: new Date(data.category.updatedAt),
        }
      : undefined,
  }
}

// Update a life lesson
export async function updateLifeLesson(id: string, updates: UpdateLifeLessonDto): Promise<LifeLesson> {
  console.log(`Updating life lesson with ID: ${id}`, updates)

  const response = await fetch(`/api/life-lessons/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    console.error("Update failed with status:", response.status, errorData)
    throw new Error(`Failed to update life lesson: ${response.statusText}`)
  }

  const data = await response.json()

  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    category: data.category
      ? {
          ...data.category,
          createdAt: new Date(data.category.createdAt),
          updatedAt: new Date(data.category.updatedAt),
        }
      : undefined,
  }
}

// Delete a life lesson
export async function deleteLifeLesson(id: string): Promise<void> {
  const response = await fetch(`/api/life-lessons/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete life lesson")
  }
}

// Fetch all life lesson categories
export async function fetchLifeLessonCategories(): Promise<LifeLessonCategory[]> {
  const response = await fetch("/api/life-lesson-categories")

  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }

  const data = await response.json()

  // Convert string dates to Date objects
  return data.map((category: any) => ({
    ...category,
    createdAt: new Date(category.createdAt),
    updatedAt: new Date(category.updatedAt),
  }))
}

// Create a new life lesson category
export async function createLifeLessonCategory(name: string): Promise<LifeLessonCategory> {
  const response = await fetch("/api/life-lesson-categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })

  if (!response.ok) {
    throw new Error("Failed to create category")
  }

  const data = await response.json()

  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  }
}

