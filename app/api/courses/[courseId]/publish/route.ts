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

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
            },
            include: {
                chapters: true,
            }
        })

        if (!course) {
            return new NextResponse("Not found", { status: 404 });
        }

        const hasPublishedChapter = course.chapters.some(
            (chapter) => chapter.isPublished
        );

        if (
            !course.title ||
            !course.description ||
            !course.imageUrl ||
            !course.price ||
            !hasPublishedChapter
          ) {
            return new NextResponse("Missing required fields", { status: 400 });
          }

        const publishedCourse = await db.course.update({
            where: {
              id: params.courseId,
            },
            data: {
              isPublished: true,
            },
        });

        return NextResponse.json(publishedCourse);

    } catch (error) {
        console.log("COURSE_ID_PUBLISH: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}