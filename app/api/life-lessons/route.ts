import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// GET all life lessons
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const categoryId = url.searchParams.get("categoryId")

    // Build the where clause based on provided filters
    const where: Record<string, unknown> = {}

    if (categoryId) {
      where.categoryId = categoryId
    }

    const lifeLessons = await prisma.lifeLesson.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc", // Newest first
      },
    })

    return NextResponse.json(lifeLessons)
  } catch (error) {
    console.error("Error fetching life lessons:", error)
    return NextResponse.json({ error: "Failed to fetch life lessons" }, { status: 500 })
  }
}

// POST to create a new life lesson
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    let categoryId = data.categoryId

    // If a new category name is provided, create or find the category
    if (data.categoryName && !data.categoryId) {
      const categoryName = data.categoryName.trim()

      if (categoryName) {
        // Try to find an existing category with the same name
        let category = await prisma.lifeLessonCategory.findUnique({
          where: { name: categoryName },
        })

        // If no category exists, create a new one
        if (!category) {
          category = await prisma.lifeLessonCategory.create({
            data: { name: categoryName },
          })
        }

        categoryId = category.id
      }
    }

    // Create the life lesson
    const lifeLesson = await prisma.lifeLesson.create({
      data: {
        title: data.title,
        description: data.description,
        categoryId: categoryId || null,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(lifeLesson, { status: 201 })
  } catch (error) {
    console.error("Error creating life lesson:", error)
    return NextResponse.json({ error: "Failed to create life lesson" }, { status: 500 })
  }
}

