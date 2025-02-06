import Logo from "@/components/logo";
import SidebarRoutes from "./sidebar-routes"
import NavbarRoutes from "@/components/navbar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
        <div className="p-6">
            <Logo 
              w={200} 
              h={200} 
            />
        </div>
        <div className="flex flex-col w-full">
            <SidebarRoutes />
        </div>
        <div className="block md:hidden mt-auto p-4">
          <hr className="border-t border-gray-300 mb-4" />
          <NavbarRoutes />
        </div>
    </div>
  )
}

export default Sidebar