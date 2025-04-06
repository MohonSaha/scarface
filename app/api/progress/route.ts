import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// GET progress for a specific date
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const date = url.searchParams.get("date")

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
    }

    // First, check if we have a saved progress record for this date
    const savedProgress = await prisma.dailyProgress.findUnique({
      where: { date },
    })

    if (savedProgress) {
      return NextResponse.json(savedProgress)
    }

    // If no saved progress, calculate it from tasks
    const progress = await calculateProgressForDate(date)
    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 })
  }
}

// POST to save/update progress for a date
export async function POST(request: NextRequest) {
  try {
    const { date } = await request.json()

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 })
    }

    // Calculate current progress
    const { totalScore, gainedScore } = await calculateProgressForDate(date)

    // Save or update the progress
    const progress = await prisma.dailyProgress.upsert({
      where: { date },
      update: {
        totalScore,
        gainedScore,
        updatedAt: new Date(),
      },
      create: {
        date,
        totalScore,
        gainedScore,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error("Error saving progress:", error)
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 })
  }
}

// Helper function to calculate progress for a date
async function calculateProgressForDate(date: string) {
  // Get all tasks for the date
  const tasks = await prisma.dailyTask.findMany({
    where: { date },
    include: {
      category: true,
    },
  })

  // Calculate total possible score from all tasks
  let totalScore = 0
  for (const task of tasks) {
    if (task.category) {
      totalScore += task.category.score
    }
  }

  // Calculate gained score from completed tasks
  let gainedScore = 0
  for (const task of tasks) {
    if (task.status === "completed" && task.category) {
      gainedScore += task.category.score
    }
  }

  return { totalScore, gainedScore }
}

