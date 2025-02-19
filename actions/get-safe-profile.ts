import { db } from "@/lib/db";
import { SafeProfile } from "@/types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function getSafeProfile() {
  try {

    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const currentProfile = await db.profile.findUnique({
        where: {
          userId,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          imageUrl: true,
          email: true,
          role: true,
          roleName: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      
      if (!currentProfile) {
        return null;
      }
      
      const safeProfile: SafeProfile = {
        ...currentProfile,
        createdAt: currentProfile.createdAt.toISOString(),
        updatedAt: currentProfile.updatedAt.toISOString(),
      };

    return safeProfile;
  } catch (error: any) {
    return null;
  }
}
