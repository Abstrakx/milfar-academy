import { Button } from "@/components/ui/button"
import { CircleFadingPlus } from "lucide-react";
import Link from "next/link"

const CoursePage = () => {
  return (
    <div className="p-6">
      <Link href="/admin/create">
        <Button 
          className="font-sans"
        >
          <CircleFadingPlus />
          Buat Pelatihan
        </Button>
      </Link>
    </div>
  )
}

export default CoursePage