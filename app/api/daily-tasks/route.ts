import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// GET all daily tasks with optional filtering
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const date = url.searchParams.get("date")
    const status = url.searchParams.get("status")
    const categoryId = url.searchParams.get("categoryId")

    // Build the where clause based on provided filters
    const where: Record<string, string | null> = {}

    if (date) {
      where.date = date
    }

    if (status) {
      where.status = status
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    const tasks = await prisma.dailyTask.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        startTime: "asc",
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching daily tasks:", error)
    return NextResponse.json({ error: "Failed to fetch daily tasks" }, { status: 500 })
  }
}

// POST to create a new daily task
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.date || !data.startTime || !data.endTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create the task
    const task = await prisma.dailyTask.create({
      data: {
        title: data.title,
        date: data.date,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        status: data.status || "scheduled",
        categoryId: data.categoryId || null,
        notes: data.notes || null,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error("Error creating daily task:", error)
    return NextResponse.json({ error: "Failed to create daily task" }, { status: 500 })
  }
}

// PUT to update multiple tasks' status
export async function PUT(request: NextRequest) {
  try {
    const { taskIds, status } = await request.json()

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0 || !status) {
      return NextResponse.json({ error: "Task IDs array and status are required" }, { status: 400 })
    }

    // Update all tasks with the provided IDs
    const result = await prisma.dailyTask.updateMany({
      where: {
        id: {
          in: taskIds,
        },
      },
      data: {
        status,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Updated ${result.count} tasks to status: ${status}`,
    })
  } catch (error) {
    console.error("Error updating daily tasks:", error)
    return NextResponse.json({ error: "Failed to update daily tasks" }, { status: 500 })
  }
}

// GET statistics for a specific date
export async function PATCH(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const date = url.searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    // Get counts by status
    const statusCounts = await prisma.dailyTask.groupBy({
      by: ["status"],
      where: {
        date,
      },
      _count: {
        status: true,
      },
    })

    // Get counts by category
    const categoryCounts = await prisma.dailyTask.groupBy({
      by: ["categoryId"],
      where: {
        date,
      },
      _count: {
        categoryId: true,
      },
    })

    // Get category details for the counts
    const categoryDetails = await prisma.category.findMany({
      where: {
        id: {
          in: categoryCounts.map((c) => c.categoryId).filter((id) => id !== null) as string[],
        },
      },
    })

    // Format the category statistics
    const categoryStats = categoryCounts.map((count) => {
      const category = categoryDetails.find((c) => c.id === count.categoryId)
      return {
        categoryId: count.categoryId,
        categoryName: category?.name || "Uncategorized",
        categoryColor: category?.color || null,
        count: count._count.categoryId,
      }
    })

    // Format the status statistics
    const statusStats = statusCounts.map((count) => ({
      status: count.status,
      count: count._count.status,
    }))

    // Get total tasks for the day
    const totalTasks = await prisma.dailyTask.count({
      where: {
        date,
      },
    })

    // Calculate completion rate
    const completedTasks = statusStats.find((s) => s.status === "completed")?.count || 0
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return NextResponse.json({
      date,
      totalTasks,
      completedTasks,
      completionRate,
      statusStats,
      categoryStats,
    })
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}

