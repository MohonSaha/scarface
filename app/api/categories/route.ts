import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

// POST to create multiple categories
export async function POST(request: NextRequest) {
  try {
    const { categories } = await request.json()

    // Validate required fields
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return NextResponse.json({ error: "categories must be a non-empty array" }, { status: 400 })
    }

    // Validate each category
    for (const category of categories) {
      if (!category.name || typeof category.score !== "number") {
        return NextResponse.json({ error: "Each category must have a name and score" }, { status: 400 })
      }
    }

    // Insert categories into database
    const createdCategories = await Promise.all(
      categories.map((category) =>
        prisma.category.create({
          data: {
            name: category.name,
            score: category.score,
            color: category.color || null,
          },
        }),
      ),
    )

    return NextResponse.json(
      { message: "Categories created successfully", categories: createdCategories },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating categories:", error)
    return NextResponse.json({ error: "Failed to create categories" }, { status: 500 })
  }
}

