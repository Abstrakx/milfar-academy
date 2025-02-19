import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

type CouponUpdateData = {
  name?: string;
  discountPercentage?: number;
  isActive?: boolean;
  courseId?: string;
};

export async function POST(req: Request) {
  try {
    const { userId }: { userId: string | null } = await auth();
    const { name, discountPercentage, isActive, courseId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const coupon = await db.coupon.create({
      data: {
        name,
        discountPercentage,
        isActive,
        courseId,
      },
    });

    return NextResponse.json(coupon);

  } catch (error) {
    console.log("CUPON_CREATE: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId }: { userId: string | null } = await auth();
    const { id, updateData }: { id: string; updateData: CouponUpdateData } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const coupon = await db.coupon.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(coupon);

  } catch (error) {
    console.log("CUPON_EDIT: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId }: { userId: string | null } = await auth();
    const { id } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const coupon = await db.coupon.delete({
      where: { id },
    });

    return NextResponse.json(coupon);

  } catch (error) {
    console.log("CUPON_DELETE: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
