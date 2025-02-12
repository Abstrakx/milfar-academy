import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseVideoPlayer } from "./_components/course-video-player";
import { getChapter } from "@/actions/get-chapter";
import { getProgress } from "@/actions/get-progress";
import CourseProgress from "@/components/course-progress";
import PreviewCourse from "./_components/preview-course";
import { CourseProgressButton } from "./_components/course-progress-button";

const KelasPage = async ({ 
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId }: { userId: string | null } = await auth()
  
  if (!userId) {;
    return redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!purchase) {
    return redirect("/")
  }

  if (!chapter || !course) {
    return redirect("/")
  }

  // @ts-ignore
  const progressCount: number = await getProgress(userId, course.id);

  return (
    <div>
      {/* Hero section with Video */}
      <div className="overview-bg flex flex-col items-center justify-center mt-5 space-y-12 relative">
        <div className="flex flex-col items-center text-center max-w-lg mt-5">
          <h1 className="text-xl font-bold text-gray-900">
            {course.title}
          </h1>
        </div>
        <div className="w-full max-w-4xl px-4 pb-[15%] lg:pb-0">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            {chapter ? (
              <CourseVideoPlayer
                playbackId={chapter.videoUrl}
                courseId={course.id}
                chapterId={chapter.id}
                isLocked={false}
                completeOnEnd={false} 
                title={chapter.title}
              />
            ) : (
              <p className="p-4 text-center">No free chapter available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl sm:max-w-5xl mx-auto mb-5 -mt-14 sm:mt-4 rounded-lg p-6 bg-white shadow-lg border">
        <div className="flex items-center justify-between mb-3">
            <h4 className="text-xl font-semibold text-gray-900">
              Progres Belajar
            </h4>
            <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
            />
        </div>

        <CourseProgress variant="success" value={progressCount} />
      </div>


      {/* Chapters List */}
      <div className="materi-section py-6 sm:py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-left">
            Daftar Materi
          </h2>
          
          <ol className="space-y-4 list-decimal pl-4">
            {course.chapters.map((chapter) => {
                const isCompleted = chapter.userProgress && chapter.userProgress.length > 0;
                const isCurrent = chapter.id === params.chapterId;

                return (
                <Link 
                    href={`/course/${course.id}/chapter/${chapter.id}`} 
                    key={chapter.id}
                >
                    <li
                    className={`flex items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-3 border ${
                        isCurrent ? "border-blue-500 bg-blue-50" : ""
                    }`}
                    >
                    <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-lg text-gray-700">
                        {chapter.title}
                        </span>
                        {isCompleted && (
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {isCurrent && (
                        <span className="text-sm text-blue-600 font-semibold">• Dipilih</span>
                        )}
                    </div>
                    </li>
                </Link>
                );
            })}
          </ol>

        </div>
      </div>

      {/* About the Class */}
      <div className="py-3 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-left">
            Deskripsi
          </h2>
          <p className="text-gray-600 text-lg text-left pl-4">
            {chapter.description && (
                <PreviewCourse content={chapter.description} /> 
            )}
          </p>
        </div>
      </div>

      {/* Additional Options */}
      <div className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-start">
              <Link href={attachments[0].url} target="_blank">
                <Button className="w-auto">E-Book</Button>
              </Link>
              <Button className="w-auto">Sertifikat</Button>
              <Button className="w-auto">Group Konsultasi</Button>
          </div>
        )}
        </div>
      </div>

    </div>
  );
};

export default KelasPage;