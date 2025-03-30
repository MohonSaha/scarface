import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// DELETE a specific daily category
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await prisma.dailyCategory.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Daily category deleted successfully" })
  } catch (error) {
    console.error("Error deleting daily category:", error)
    return NextResponse.json({ error: "Failed to delete daily category" }, { status: 500 })
  }
}

