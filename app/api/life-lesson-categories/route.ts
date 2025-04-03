import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// GET all life lesson categories
export async function GET() {
  try {
    const categories = await prisma.lifeLessonCategory.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching life lesson categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

// POST to create a new life lesson category
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name) {
      return NextResponse.json({ error: "Category name is required" }, { status: 400 })
    }

    // Check if category already exists
    const existingCategory = await prisma.lifeLessonCategory.findUnique({
      where: { name: data.name },
    })

    if (existingCategory) {
      return NextResponse.json(existingCategory)
    }

    // Create the category
    const category = await prisma.lifeLessonCategory.create({
      data: {
        name: data.name,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating life lesson category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}

