import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import toast from "react-hot-toast";
import Link from "next/link";
import { CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavbarUser from "@/app/(dashboard)/_components/navbar-user";
import FooterUser from "@/app/(dashboard)/_components/footer-user";
import { OverviewVideoPlayer } from "./_components/overview-video-player";

interface OverviewPageProps {
  params: {
    courseId: string; 
  };
}

const OverviewPage = async ({ params }: OverviewPageProps) => {
  const { userId }: { userId: string | null } = await auth()
  
  if (!userId) {;
    return redirect("/");
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
        orderBy: {
          position: "asc",
        },
        include: {
          userProgress: {
            where: { userId },
          },
        },
      },
    },
  });

  if (!course) {
    toast.error("Course not found.");
    return redirect("/");
  }

  const freeChapter = course.chapters.find((chapter) => chapter.isFree);

  return (
    <div>
      <NavbarUser />
      {/* Hero section with Video */}
      <div className="overview-bg flex flex-col items-center justify-center mt-5 space-y-12 relative">
        <div className="flex flex-col items-center text-center max-w-lg mt-5">
          <h1 className="text-xl font-bold text-gray-900">
            {course.title}
          </h1>
        </div>
        <div className="w-full max-w-4xl px-4 pb-[15%] lg:pb-0">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            {freeChapter ? (
              <OverviewVideoPlayer
                playbackId={freeChapter.videoUrl}
                courseId={course.id}
                chapterId={freeChapter.id}
                isLocked={false}
                completeOnEnd={false} 
                title={freeChapter.title}
              />
            ) : (
              <p className="p-4 text-center">No free chapter available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="materi-section py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 sm:mb-8 text-left">
            Daftar Materi Pembelajaran
          </h2>
          <ol className="space-y-4 list-decimal pl-6">
            {course.chapters.map((chapter) => {
              const isCompleted =
                chapter.userProgress && chapter.userProgress.length > 0;

              const listItem = (
                <li
                  key={chapter.id}
                  className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-lg text-gray-700">
                      {chapter.title}
                    </span>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    )}
                  </div>
                  {!chapter.isFree && (
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  )}
                </li>
              );

              return chapter.isFree ? (
                <Link
                  href={`/course/${course.id}/chapter/${chapter.id}`}
                  key={chapter.id}
                >
                  {listItem}
                </Link>
              ) : (
                <div key={chapter.id}>{listItem}</div>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Additional Options */}
      <div className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-start">
            <Button className="w-auto">E-Book</Button>
            <Button className="w-auto">Sertifikat</Button>
            <Button className="w-auto">Group Konsultasi</Button>
          </div>
        </div>
      </div>

      {/* About the Class */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-left">
            Tentang Kelas
          </h2>
          <p className="text-gray-600 text-lg text-left">
            {course.description}
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-left">
          Testimoni dan Review
        </h2>
      </div>

      {/* Footer */}
      <FooterUser />
    </div>
  );
};

export default OverviewPage;