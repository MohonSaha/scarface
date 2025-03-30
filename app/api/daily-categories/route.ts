import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// GET all daily categories for a specific date
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const date = url.searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    // Get all daily categories for the specified date with their related category data
    const dailyCategories = await prisma.dailyCategory.findMany({
      where: { date },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    console.log(dailyCategories && dailyCategories.length > 0 ? "Daily categories fetched successfully" : "No daily categories found")

    // Transform the data to match the expected format
    const formattedCategories = dailyCategories.map((dc) => ({
      id: dc.category.id,
      name: dc.category.name,
      color: dc.category.color || "",
      dailyCategoryId: dc.id,
    }))

    return NextResponse.json(formattedCategories)
  } catch (error) {
    console.error("Error fetching daily categories:", error)
    return NextResponse.json({ error: "Failed to fetch daily categories" }, { status: 500 })
  }
}

// POST to save multiple daily categories for a date
export async function POST(request: NextRequest) {
  try {
    const { date, categoryIds } = await request.json()

    // Validate required fields
    if (!date || !categoryIds || !Array.isArray(categoryIds) || categoryIds.length === 0) {
      return NextResponse.json({ error: "Date and categoryIds array are required" }, { status: 400 })
    }

    // Delete existing categories for this date
    await prisma.dailyCategory.deleteMany({
      where: { date },
    })

    // Create new daily categories
    const dailyCategories = await Promise.all(
      categoryIds.map((categoryId) =>
        prisma.dailyCategory.create({
          data: {
            date,
            categoryId,
          },
          include: {
            category: true,
          },
        }),
      ),
    )

    // Transform the data to match the expected format
    const formattedCategories = dailyCategories.map((dc) => ({
      id: dc.category.id,
      name: dc.category.name,
      color: dc.category.color || "",
      dailyCategoryId: dc.id,
    }))

    return NextResponse.json(
      { message: "Daily categories saved successfully", categories: formattedCategories },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error saving daily categories:", error)
    return NextResponse.json({ error: "Failed to save daily categories" }, { status: 500 })
  }
}

