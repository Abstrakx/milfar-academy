import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId }: { userId: string | null } = await auth()
    const { rating, comment } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const purchase = await db.purchase.findFirst({
      where: {
        userId: userId,
        courseId: params.courseId,
      }
    });

    if (!purchase) {
      return new NextResponse("Purchase required", { status: 403 });
    }

    const existingReview = await db.review.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId
        }
      }
    });

    if (existingReview) {
      return new NextResponse("Already reviewed", { status: 400 });
    }

    const review = await db.review.create({
      data: {
        userId,
        courseId: params.courseId,
        rating,
        comment
      }
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("COURSE_REVIEW", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}