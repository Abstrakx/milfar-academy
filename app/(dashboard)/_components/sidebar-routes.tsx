"use client";

import { BarChart, Compass, Layout, List, Users, PenTool, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";
import SidebarItem from "./sidebar-item";

const StudentRoutes = [
    {
        icon: Layout,
        label: "Home",
        href: "/",
    },
    {
        icon: Compass,
        label: "Kelas",
        href: "/search",
    },
    {
        icon: Newspaper,
        label: "Artikel",
        href: "/artikel",
    }
]

const AdminRoutes = [
    {
        icon: List,
        label: "Course",
        href: "/admin/course",
    },
    {
        icon: PenTool,
        label: "Article",
        href: "/admin/article",
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/admin/analytics"
    },
    {
        icon: Users,
        label: "Manage Users",
        href: "/admin/users"
    }
]

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const routes = isAdminPage ? AdminRoutes : StudentRoutes;

  return (
    <div className="flex flex-col w-full">
        {routes.map((route, index) => (
            <SidebarItem 
                key={index}
                icon={route.icon}
                label={route.label}
                href={route.href}
            />
        ))}
    </div>
  )
}

export default SidebarRoutes