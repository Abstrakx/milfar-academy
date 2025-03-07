import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const KelasIdPage = async ({
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
    return redirect("/");
  }

  return redirect(`/kelas/${course.id}/chapter/${course.chapters[0].id}`);
}
 
export default KelasIdPage;