import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request
) {
  try {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id, name } = await req.json();


    const user = await db.profile.findUnique({
      where: { userId: id },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const updatedUser = await db.profile.update({
      where: { userId: id },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error("CERTIFICATE_PROFILE_UPDATE_ERROR: ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
