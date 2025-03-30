// "use client"

// import { useState } from "react"
// import { Sailboat } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { CategoryModal } from "@/components/category-modal"

// export function CategoryButton() {
//   const [showModal, setShowModal] = useState(false)

//   return (
//     <>
//       <Button variant="outline" onClick={() => setShowModal(true)}  className=" text-green-600 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-green-600 active:scale-80 transition-transform duration-150 ease-in-out cursor-pointer">
//       <Sailboat className="h-4 w-4" /> 
//         <span className=" hidden md:block">Daily Categories</span>
//       </Button>
    

//       {showModal && <CategoryModal onClose={() => setShowModal(false)} />}
//     </>
//   )
// }


"use client"

import { useState } from "react"
import { Sailboat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryModal } from "@/components/category-modal"

export function CategoryButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowModal(true)}
        className="text-green-600 bg-gray-300 hover:bg-gray-400 focus:ring-2 focus:ring-green-600 active:scale-80 transition-transform duration-150 ease-in-out cursor-pointer"
      >
        <Sailboat className="h-4 w-4" />
        <span className="hidden md:block">Daily Categories</span>
      </Button>

      {showModal && <CategoryModal onClose={() => setShowModal(false)} />}
    </>
  )
}

