import { db } from "@/lib/db";;
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function PUT (
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId }: { userId: string | null } = await auth()
        const { list } = await req.json(); 

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        for (const item of list) {
            await db.chapter.update({
                where: {
                    id: item.id,
                },
                data: {
                    position: item.position,
                }
            });
        }

        return new NextResponse("Success", { status: 200 });

    } catch (error) {
        console.log("REORDER: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}