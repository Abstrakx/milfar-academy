"use client";

import { ClerkProvider, SignInButton, SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar"; 

const routes = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Kelas",
    href: "/kelas",
  },
  {
    name: "Artikel",
    href: "/artikel",
  },
];

const NavbarUser = () => {
  const [isOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={100}
            height={100}
            className="mr-2"    
          />
        </div>

        {/* Menu (Hidden on Mobile) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.href}
              className="text-gray-600 hover:text-gray-900"
            >
              {route.name}
            </Link>
          ))}
        </div>

        {/* Login Button (Hidden on Mobile) */}
        <div className="hidden md:flex items-center justify-center space-x-4">
            <SignedOut>
                <SignInButton mode="modal">
                <Button variant="default">Masuk</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <div className="flex items-center space-x-4">
                <UserButton />
                <SignOutButton>
                    <Button variant="destructive" className="flex items-center gap-2">
                    <span>Logout</span>
                    <ArrowRight className="w-4 h-4" />
                    </Button>
                </SignOutButton>
                </div>
            </SignedIn>
        </div>

        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;