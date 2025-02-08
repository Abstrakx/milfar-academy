import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId }: { userId: string | null } = await auth()
    
    const profile = await db.profile.findUnique({
      where: { id: userId || "" },
    });

    if (profile && profile.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId: buyerId, courseId } = await req.json();
    if (!buyerId || !courseId) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    const transaction = await db.purchase.create({
      data: {
        userId: buyerId,
        courseId,
      },
      include: { course: true }
    });

    return NextResponse.json(transaction);

  } catch (error) {
    console.error("PURCHASES", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}