"use client";

import MobileSidebar from "./sidebar-mobile";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <div className="ml-auto">
        <MobileSidebar />
      </div>
    </div>
  )
}

export default Navbar