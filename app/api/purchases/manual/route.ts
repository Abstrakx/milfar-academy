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

    const { 
      userId: buyerId, 
      courseId,
      couponId,
      transactionPrice  
    } = await req.json();

    if (!buyerId || !courseId || typeof transactionPrice !== 'number') {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    if (couponId) {
      const coupon = await db.coupon.findUnique({
        where: { id: couponId },
        include: { course: true }
      });

      if (!coupon || !coupon.isActive) {
        return new NextResponse("Invalid or inactive coupon", { status: 400 });
      }

      if (coupon.courseId && coupon.courseId !== courseId) {
        return new NextResponse("Coupon not valid for this course", { status: 400 });
      }
    }

    const transaction = await db.purchase.create({
      data: {
        userId: buyerId,
        courseId,
        transactionPrice,
        transactionStatus: "MANUAL",
        couponId: couponId || undefined,
      },
      include: { 
        course: true,
        coupon: true
      }
    });

    return NextResponse.json(transaction);

  } catch (error) {
    console.error("PURCHASES", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}