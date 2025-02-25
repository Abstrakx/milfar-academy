import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { CircleDollarSign, File, LayoutDashboard, ListCheck, ArrowLeft, MessageCircle } from 'lucide-react'
import { IconBadge } from "@/components/icon-badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

import TitleForm from "./_components/title-form"
import DescriptionForm from "./_components/description-form"
import ImageForm from "./_components/image-form"
import PriceForm from "./_components/price-form"
import AttachmentForm from "./_components/attachment-form"
import ChaptersForm from "./_components/chapter-form"
import Banner from "@/components/banner"
import Actions from "./_components/actions"
import CategoryForm from "./_components/category-form"
import DiscountForm from "./_components/discount-form"
import CouponManagement from "./_components/cupon-form"
import WhatsappGroupForm from "./_components/whatsapp-form"

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
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

  const course = await db.course.findUnique({
    where: { 
      id: params.courseId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  
  const coupons = await db.coupon.findMany({
    where: {
      courseId: params.courseId,
    },
  });

  if (!course) {
    return redirect("/admin/course")
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
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
            <Link href="/admin/course" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Kursus
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Banner Publish */}
          {!course.isPublished && (
            <Banner
              variant="warning"
              label="Kursus ini belum dipublikasikan dan tidak akan terlihat di daftar kursus."
            />
          )}

          {/* Progress Section */}
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Pengaturan Kursus</h1>
                <p className="text-sm text-gray-500">
                  Lengkapi semua kolom yang wajib diisi ({completedFields}/{totalFields})
                </p>
              </div>
              <Actions
                disabled={!isComplete}
                courseId={params.courseId}
                isPublished={course.isPublished}
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
                  <CardTitle>Detail Kursus</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <TitleForm
                    initialData={course}
                    courseId={course.id}
                  />
                  <DescriptionForm
                    initialData={course}
                    courseId={course.id}
                  />
                  <ImageForm 
                    initialData={course}
                    courseId={course.id}
                  />
                  <CategoryForm
                    initialData={course}
                    courseId={course.id}
                    options={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-x-2 space-y-0 pb-2">
                  <IconBadge icon={File} />
                  <CardTitle>Sumber Daya & Lampiran</CardTitle>
                </CardHeader>
                <CardContent>
                  <AttachmentForm
                    initialData={course}
                    courseId={course.id}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-x-2 space-y-0 pb-2">
                  <IconBadge icon={ListCheck} />
                  <CardTitle>Bab Kursus</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChaptersForm
                    initialData={course}
                    courseId={course.id}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-x-2 space-y-0 pb-2">
                  <IconBadge icon={CircleDollarSign} />
                  <CardTitle>Harga Kursus</CardTitle>
                </CardHeader>
                <CardContent>
                  <PriceForm
                    initialData={course}
                    courseId={course.id}
                  />
                  <DiscountForm 
                    initialData={course}
                    courseId={course.id}                 
                  />
                  <CouponManagement
                    initialData={coupons}
                    courseId={course.id}
                  />
                  <WhatsappGroupForm 
                    initialData={course}
                    courseId={course.id}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-x-2 space-y-0 pb-2">
                  <IconBadge icon={MessageCircle} />
                  <CardTitle>Grup Diskusi Kursus</CardTitle>
                </CardHeader>
                <CardContent>
                  <WhatsappGroupForm 
                    initialData={course}
                    courseId={course.id}
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

export default CourseIdPage
