import { db } from "@/lib/db";;
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import { LayoutDashboard, ArrowLeft, Eye, TvMinimalPlay } from 'lucide-react'
import { IconBadge } from "@/components/icon-badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterAccessForm from "./_components/chapter-access-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterVideoForm from "./_components/chapter-video-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";

const ChapterIdPage = async ({
    params
} : {
    params: {
        courseId: string,
        chapterId: string
    }
}) => {

    const { userId }: { userId: string | null } = await auth()

    if (!userId) {
      return redirect("/?error=unauthorized")
    }
  
    const admin_required = await db.profile.findFirst({
      where: {
        userId,
        role: "ADMIN",
      },
    })
  
    if (!admin_required) {
      redirect("/?error=admin_required")
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId,
        },
        include: {
            videoData: true,
        },
    });

    if (!chapter) {
        return redirect("/");
    };

    const requiredFields = [
        chapter.title,
        chapter.description,
        chapter.videoUrl
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    const progress = (completedFields / totalFields) * 100;
    const isComplete = requiredFields.every(Boolean);
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="border-b bg-white mt-1">
          <div className="px-4 sm:px-6 lg:px-8 py-3">
            <Link href={`/admin/course/${params.courseId}`} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Pengaturan Kursus
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Banner Publish */}
          {!chapter.isPublished && (
            <Banner 
              variant="warning"
              label="This chapter is unpublished. It will not be visible in the course"
            />
          )}

          {/* Progress Section */}
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Pengaturan Chapter</h1>
                <p className="text-sm text-gray-500">
                  Lengkapi semua kolom yang wajib diisi ({completedFields}/{totalFields})
                </p>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
            <Progress value={progress} className="mt-4" />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-x-2 space-y-0 pb-2">
                  <IconBadge icon={LayoutDashboard} />
                  <CardTitle>Detail Chapter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ChapterTitleForm
                    initialData={chapter}
                    chapterId={chapter.id}
                    courseId={params.courseId}
                  />
                </CardContent>
                <CardContent className="space-y-6">
                  <ChapterDescriptionForm
                    initialData={chapter}
                    chapterId={chapter.id}
                    courseId={params.courseId}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-x-2 space-y-0 pb-2">
                  <IconBadge icon={Eye} />
                  <CardTitle>Akses Chapter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ChapterAccessForm 
                    initialData={chapter}
                    chapterId={chapter.id}
                    courseId={params.courseId}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-x-2 space-y-0 pb-2">
                  <IconBadge icon={TvMinimalPlay} />
                  <CardTitle>Bab Kursus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ChapterVideoForm 
                    initialData={chapter}
                    chapterId={chapter.id}
                    courseId={params.courseId}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChapterIdPage