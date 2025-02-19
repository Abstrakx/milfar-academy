import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCourseReviews } from "@/actions/get-review";
import { OverviewVideoPlayer } from "./_components/overview-video-player";
import ClientPurchase from "./_components/purchase-handler";
import TestimonialOverview from "./_components/testimonial-carousel";

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

  const purchase = await db.purchase.findUnique({
    where: {
        userId_courseId: { 
            userId,
            courseId: params.courseId,
        },
      }
  });

  const reviews = await getCourseReviews(params.courseId);

  if (!course) {
    return redirect("/");
  }

  const freeChapter = course.chapters.find((chapter) => chapter.isFree);

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
            {freeChapter ? (
              <OverviewVideoPlayer
                playbackId={freeChapter.videoUrl}
                isLocked={false}
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

          <ClientPurchase course={course} chapters={course.chapters} purchase={purchase} title={course.title} price={course.price || 0} />
        </div>
      </div>

      {/* About the Class */}
      <div className="py-12 bg-white">
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
      <div className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 text-left">
            Testimoni dan Review
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 mb-10">
            <TestimonialOverview testimonials={reviews} />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;