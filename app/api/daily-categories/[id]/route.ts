// import prisma from "@/utils/connect"
// import { type NextRequest, NextResponse } from "next/server"

// // DELETE a specific category
// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url)
//     const id = searchParams.get("id")

//     if (!id) {
//       return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
//     }

//     // Delete the category
//     await prisma.category.delete({
//       where: { id },
//     })

//     return NextResponse.json({ message: "Category deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting category:", error)
//     return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
//   }
// }



import prisma from "@/utils/connect"
import { type NextRequest, NextResponse } from "next/server"

// DELETE a specific daily category
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    console.log(`Attempting to delete daily category with ID: ${id}`)

    if (!id) {
      return NextResponse.json({ error: "Daily category ID is required" }, { status: 400 })
    }

    // Delete the daily category
    await prisma.dailyCategory.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Daily category deleted successfully" })
  } catch (error) {
    console.error("Error deleting daily category:", error)
    return NextResponse.json(
      {
        error: "Failed to delete daily category",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

