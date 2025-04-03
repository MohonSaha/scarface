import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// GET a specific daily task
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    const task = await prisma.dailyTask.findUnique({
      where: { id },
      include: {
        category: true,
      },
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error fetching daily task:", error)
    return NextResponse.json({ error: "Failed to fetch daily task" }, { status: 500 })
  }
}

// PATCH to update a specific daily task
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const data = await request.json()

    // Validate that at least one field is provided for update
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "No update data provided" }, { status: 400 })
    }

    // Prepare the data for update
    const updateData: Partial<{
      title: string;
      date: string;
      startTime: Date;
      endTime: Date;
      status: string;
      categoryId: string | null;
      notes: string;
    }> = {}

    if (data.title !== undefined) updateData.title = data.title
    if (data.date !== undefined) updateData.date = data.date
    if (data.startTime !== undefined) updateData.startTime = new Date(data.startTime)
    if (data.endTime !== undefined) updateData.endTime = new Date(data.endTime)
    if (data.status !== undefined) updateData.status = data.status
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId || null
    if (data.notes !== undefined) updateData.notes = data.notes

    // Update the task
    const updatedTask = await prisma.dailyTask.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(updatedTask)
  } catch (error) {
    console.error("Error updating daily task:", error)
    return NextResponse.json({ error: "Failed to update daily task" }, { status: 500 })
  }
}

// DELETE a specific daily task
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await prisma.dailyTask.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Error deleting daily task:", error)
    return NextResponse.json({ error: "Failed to delete daily task" }, { status: 500 })
  }
}

