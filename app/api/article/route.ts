import { db } from "@/lib/db";;
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function POST (
    req: Request,
) {
    try {
        const { userId }: { userId: string | null } = await auth()
        const { title } = await req.json(); 

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const article = await db.article.create({
            data: {
                userId,
                title,
            }
        })

        return NextResponse.json(article);

    } catch (error) {
        console.log("ARTICLE: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}