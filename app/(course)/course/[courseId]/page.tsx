import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  if (!course) {
    console.error("Course not found.");
    return redirect("/");
  }

  return redirect(`/course/${course.id}/chapter/${course.chapters[0].id}`);
}
 
export default CourseIdPage;