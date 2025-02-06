import { db } from "@/lib/db";;
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: { articleId: string; } }
) {
    try {
        const { userId }: { userId: string | null } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const article = await db.article.findUnique({
            where: {
                id: params.articleId,
                userId: userId,
            },
        })
      
        if (!article) {
            return new NextResponse("Not found", { status: 404 });
        }
      
        const unpublishedArticle = await db.article.update({
            where: {
              id: params.articleId,
              userId,
            },
            data: {
              isPublished: false,
            },
        });
      
        return NextResponse.json(unpublishedArticle);

    } catch (error) {
        console.log("ARTICLE_ID_UNPUBLISH: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}