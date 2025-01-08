import { db } from "@/lib/db";;
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

export async function PATCH (
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const { userId }: { userId: string | null } = await auth()
        const { courseId }: { courseId: string } = params;
        const values = await req.json(); 

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.update({
            where: {
                id: courseId,
            },
            data: {
                ...values,
            }
        })

        return NextResponse.json(course);

    } catch (error) {
        console.log("COURSE_ID: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string } }
  ) {
    try {
      const { userId } = await auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const ownCourse = await db.course.findUnique({
        where: {
          id: params.courseId,
          userId,
        },
      });
  
      if (!ownCourse) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const course = await db.course.findUnique({
        where: {
          id: params.courseId,
          userId: userId,
        },
        include: {
            chapters: true,
        },
      });
  
      if (!course) {
        return new NextResponse("Not Found", { status: 404 });
      }

      const deletedCourse = await db.course.delete({
        where: {
          id: params.courseId,
        },
      });
  
      return NextResponse.json(deletedCourse);
    } catch (error) {
      console.log("[COURSE_ID_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }