import { auth } from "@clerk/nextjs/server";;
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { getProgress } from "@/actions/get-progress";

import { CourseSidebar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";
import getSafeProfile from "@/actions/get-safe-profile";
import toast from "react-hot-toast";

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId }: { userId: string | null } = await auth()

  if (!userId) {
    console.error("You need to be logged in to access this page.");
    return toast.error("You need to be logged in to access this page.");
  }

  const safeProfile = await getSafeProfile();
  
  if (!safeProfile) {
    console.error("Safe profile error.");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            }
          }
        },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  if (!course) {
    toast.error("Course not found.");
    return redirect("/");
  }

  // @ts-ignore
  const progressCount: number = await getProgress(userId, course.id);

  return (

    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>

  )
}

export default CourseLayout