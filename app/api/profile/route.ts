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


export async function PATCH(
  req: Request
) {
  try {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, name, email, role, roleName } = await req.json();

    if (!name || !email) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await db.profile.findUnique({
      where: { id: id },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const updatedUser = await db.profile.update({
      where: { id: id },
      data: {
        name,
        email,
        role,    
        roleName,
      },
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error("USER_UPDATE_ERROR: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProfile = await db.profile.findFirst({
      where: { userId },
    });

    if (!userProfile) {
      return new NextResponse("Profile not found", { status: 404 });
    }

    return NextResponse.json(userProfile);

  } catch (error) {
    console.error("PROFILE_GET:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}