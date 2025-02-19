"use client";

import { SignInButton, SignOutButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface Profile {
  id: string;
  userId: string;
  role: 'ADMIN' | 'USER'; 
}

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
  const { isSignedIn } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/profile', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isSignedIn]);

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

        {/* Right Section */}
        <div className="hidden md:flex items-center justify-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="default">Masuk</Button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div className="flex items-center space-x-4">
              {!loading && profile?.role === 'ADMIN' && (
            <Link 
              href="/admin/course"
            >
                <Button 
                    className={cn("font-medium font-sans text-white bg-black hover:bg-gray-800 hover:text-white mr-1")} 
                    variant="outline"
                >
                    <LockKeyhole /> Admin Mode
                </Button>
            </Link>
              )}
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