import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"
import Logo from "./logo"

const MobileSidebar = () => {
  return (
    <div className="flex items-center justify-between p-4 w-full">
      <span className="absolute left-4">
        <Logo />
      </span>

      <Sheet>
        <SheetTrigger 
          className="md:hidden hover:opacity-75 transition"
        >
          <Menu />
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="p-0 
          bg-white"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileSidebar