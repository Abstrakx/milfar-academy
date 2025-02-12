"use client";

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isAdminPage = pathname?.startsWith("/admin");
  const isStudentPage = pathname?.startsWith("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto mr-2">
        {isAdminPage || isStudentPage ? (
            <Link href="/">
                <Button 
                    className="mr-3 font-medium font-sans" 
                    size="sm"
                >
                    <LogOut 
                        className="h-4 w-4" 
                    />
                    Exit
                </Button>
            </Link>
        ) : (
            <Link 
                href="/admin/course"
            >
                <Button 
                    className={cn("font-medium font-sans text-white bg-black hover:bg-gray-800 hover:text-white mr-3")} 
                    size="sm" 
                    variant="outline"
                >
                    <LockKeyhole /> Admin Mode
                </Button>
            </Link>
        )}
            <SignedOut>
              <SignInButton mode='modal' />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
    </div>
  )
}

export default NavbarRoutes