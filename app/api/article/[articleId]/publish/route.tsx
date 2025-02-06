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


        if (
            !article.title ||
            !article.content ||
            !article.imageUrl 
          ) {
            return new NextResponse("Missing required fields", { status: 400 });
          }

        const publishedArticle = await db.article.update({
            where: {
              id: params.articleId,
              userId,
            },
            data: {
              isPublished: true,
            },
        });

        return NextResponse.json(publishedArticle);

    } catch (error) {
        console.log("ARTICLE_ID_PUBLISH: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}