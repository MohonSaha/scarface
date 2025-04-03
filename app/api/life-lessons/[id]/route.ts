
import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// GET a specific life lesson
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const lifeLesson = await prisma.lifeLesson.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    if (!lifeLesson) {
      return NextResponse.json({ error: "Life lesson not found" }, { status: 404 })
    }

    return NextResponse.json(lifeLesson)
  } catch (error) {
    console.error("Error fetching life lesson:", error)
    return NextResponse.json({ error: "Failed to fetch life lesson" }, { status: 500 })
  }
}

// PATCH to update a specific life lesson
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    console.log(`Updating life lesson ${id} with data:`, data)

    // Validate that at least one field is provided for update
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No update data provided" }, { status: 400 })
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

    // Prepare the data for update
    const updateData: { title?: string; description?: string; categoryId?: string | null } = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description

    // Handle categoryId properly - set to null if undefined
    updateData.categoryId = categoryId || null

    console.log("Final update data:", updateData)

    // Update the life lesson
    const updatedLifeLesson = await prisma.lifeLesson.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(updatedLifeLesson)
  } catch (error) {
    console.error("Error updating life lesson:", error)
    return NextResponse.json(
      {
        error: "Failed to update life lesson",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

// DELETE a specific life lesson
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await prisma.lifeLesson.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Life lesson deleted successfully" })
  } catch (error) {
    console.error("Error deleting life lesson:", error)
    return NextResponse.json({ error: "Failed to delete life lesson" }, { status: 500 })
  }
}

