import { db } from "@/lib/db";
import CourseCard from "@/components/course-card";

interface KelasCardProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function KelasCard({ searchParams }: KelasCardProps) {
  const categoryId = searchParams?.category as string | undefined;
  const title = searchParams?.title as string | undefined;

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      ...(categoryId ? { category: { id: categoryId } } : {}),
      ...(title
        ? { title: { contains: title, mode: "insensitive" } }
        : {}),
    },
    include: {
      purchases: true,
      category: true,
      reviews: true,
    },
  });

  if (courses.length === 0) {
    return (
      <div className="p-16 text-center text-lg font-bold text-gray-700">
        Materi akan segera hadir! Coba cek kategori lainnya.
      </div>
    );
  }

  return (
    <div>
      <CourseCard courses={courses} />
    </div>
  );
}
