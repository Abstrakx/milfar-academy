import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId }: { userId: string | null } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!purchase) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const deletedPurchase = await db.purchase.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deletedPurchase);
  } catch (error) {
    console.log("PURCHASE_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
