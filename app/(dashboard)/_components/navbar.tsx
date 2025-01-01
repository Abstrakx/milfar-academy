"use client";

import MobileSidebar from "./sidebar-mobile";
import NavbarRoutes from "@/components/navbar-routes";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="ml-auto">
        <MobileSidebar />
      </div>

      <div className="hidden md:block">
        <NavbarRoutes />
      </div>
    </div>
  )
}

export default Navbar