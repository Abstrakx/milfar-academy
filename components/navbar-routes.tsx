"use client";

import { useEffect, useState } from "react";
import { useUser, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut, LockKeyhole, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Profile {
  id: string;
  userId: string;
  role: "ADMIN" | "USER";
}

const NavbarRoutes = () => {
  const pathname = usePathname();
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
        const response = await fetch("/api/profile", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch profile");
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

  const isAdminPage = pathname?.startsWith("/admin");
  const isStudentPage = pathname?.startsWith("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto mr-10">
      {isAdminPage || isStudentPage ? (
        <Link href="/">
          <Button className="mr-3 font-medium font-sans" size="sm">
            <LogOut className="h-4 w-4" />
            Exit
          </Button>
        </Link>
      ) : (
        !loading &&
        profile?.role === "ADMIN" && (
          <Link href="/admin/course">
            <Button
              className={cn(
                "font-medium font-sans text-white bg-black hover:bg-gray-800 hover:text-white mr-3"
              )}
              size="sm"
              variant="outline"
            >
              <LockKeyhole /> Admin Mode
            </Button>
          </Link>
        )
      )}

      {isSignedIn ? (
        <>
          {/* Logout Button on Mobile */}
          <div className="lg:hidden">
            <SignOutButton>
              <Button variant="destructive" size="sm" className="flex items-center gap-2">
                <span>Logout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </SignOutButton>
          </div>

          {/* User Button on Desktop */}
          <div className="hidden lg:block">
            <UserButton />
          </div>
        </>
      ) : (
        <SignInButton mode="modal">
          <Button size="sm">Masuk</Button>
        </SignInButton>
      )}
    </div>
  );
};

export default NavbarRoutes;
