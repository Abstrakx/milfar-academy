import { db } from "@/lib/db";;
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId }: { userId: string | null } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chapter = await db.chapter.findUnique({
            where: {
              id: params.chapterId,
              courseId: params.courseId,
            },
          });

        if (
            !chapter ||
            !chapter.title ||
            !chapter.description ||
            !chapter.videoUrl
          ) {
            return new NextResponse("Missing required fields", { status: 400 });
          }

        const publishedChapter = await db.chapter.update({
            where: {
              id: params.chapterId,
              courseId: params.courseId,
            },
            data: {
              isPublished: true,
            },
        });

        return NextResponse.json(publishedChapter);

    } catch (error) {
        console.log("CHAPTER_PUBLISH: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}