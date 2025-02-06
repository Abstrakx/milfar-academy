import { db } from "@/lib/db";;
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: { articleId: string } }
) {
    try {
        const { userId }: { userId: string | null } = await auth()
        const { articleId }: { articleId: string } = params;
        const values = await req.json(); 

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const article = await db.article.update({
            where: {
                id: articleId,
            },
            data: {
                ...values,
            }
        })

        return NextResponse.json(article);

    } catch (error) {
        console.log("ARTICLE_ID: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { articleId: string } }
  ) {
    try {
      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
  
      const article = await db.article.findUnique({
        where: {
          id: params.articleId,
          userId: userId,
        },
      });
  
      if (!article) {
        return new NextResponse("Not Found", { status: 404 });
      }

      const deletedArticle = await db.article.delete({
        where: {
          id: params.articleId,
        },
      });
  
      return NextResponse.json(deletedArticle);
    } catch (error) {
      console.log("[ARTICLE_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }