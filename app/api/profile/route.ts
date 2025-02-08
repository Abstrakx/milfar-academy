import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId }: { userId: string | null } = await auth();
    const { fullName, email, imageUrl }: { fullName: string; email: string; imageUrl: string } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let userProfile = await db.profile.findFirst({
      where: { userId },
    });

    if (!userProfile) {
      userProfile = await db.profile.create({
        data: {
          userId: userId,
          name: fullName || "Anonymous User",  
          email: email || "No Email",  
          imageUrl: imageUrl || "No Image",
          role: "MEMBER",  
        },
      });
    }

    return NextResponse.json(userProfile);

  } catch (error) {
    console.error("PROFILE:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
