"use client";

import { UserButton } from '@clerk/nextjs';
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut, LockKeyhole, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");
  const isStudentPage = pathname?.startsWith("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto mr-10">
      {isAdminPage || isStudentPage ? (
        <Link href="/">
          <Button 
            className="mr-3 font-medium font-sans" 
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/admin/course">
          <Button 
            className={cn("font-medium font-sans text-white bg-black hover:bg-gray-800 hover:text-white mr-3")} 
            size="sm" 
            variant="outline"
          >
            <LockKeyhole /> Admin Mode
          </Button>
        </Link>
      )}

      {/* Logout Button on Mobile */}
      <div className="lg:hidden">
        <SignOutButton>
          <Button variant="destructive" size="sm" className="flex items-center gap-2">
            <span>Logout</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </SignOutButton>
      </div>

      {/* UserButton on Desktop */}
      <div className="hidden lg:block">
        <UserButton />
      </div>
    </div>
  );
};

export default NavbarRoutes;
