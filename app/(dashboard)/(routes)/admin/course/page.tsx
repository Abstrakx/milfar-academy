import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleFadingPlus, ImageIcon, BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { IconBadge } from "@/components/icon-badge";
import Link from "next/link";
import Image from "next/image";

const CoursePage = async () => {
  const { userId }: { userId: string | null } = await auth()

  if (!userId) {
    return redirect("/")
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    include: {
      chapters: true,
    },
  });

  return (
    <div className="p-6">
      {/* Button to create a new course */}
      <Link href="/admin/create">
        <Button 
          className="font-sans"
        >
          <CircleFadingPlus />
          Buat Pelatihan
        </Button>
      </Link>

      {/* Courses list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border shadow-sm rounded-lg p-4"
            >
              {/* Course Image */}
              {!course.imageUrl ? (
                <div className="relative aspect-video w-full bg-slate-200 rounded-md flex items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-slate-500" />
                </div>
              ) : (
                <div className="relative aspect-video w-full rounded-md overflow-hidden">
                  <Image
                    alt="Course Image"
                    src={course.imageUrl}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Course Details */}
              <div className="h-16 mt-3 mb-2">
                <h3 className="text-2xl font-bold font-sans line-clamp-2 hover:line-clamp-none transition-all duration-200">
                  {course.title}
                </h3>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  variant={course.isPublished ? "outline" : "secondary"}
                  className="text-xs"
                >
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
                <span className="text-sm font-medium text-slate-700">
                  {course.price !== null ? formatPrice(course.price) : "Belum Diatur"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                <IconBadge icon={BookOpen} size="sm" /> 
                <span>{course.chapters.length} Chapters</span>
              </div>

              {/* Edit Button */}
              <Link href={`/admin/course/${course.id}`}>
                <Button className="w-full font-sans">Edit Course</Button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No courses found. Create one above!</p>
        )}
      </div>      
    </div>
  )
}

export default CoursePage