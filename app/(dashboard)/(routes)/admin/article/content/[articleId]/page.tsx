import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { LayoutDashboard, ArrowLeft, FolderArchive } from 'lucide-react'
import { IconBadge } from "@/components/icon-badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Banner from "@/components/banner"

import ArticleActions from "./_components/actions_article"
import ArticleTitleForm from "./_components/title-form_article"
import ArticleImageForm from "./_components/image-form_article"
import ArticleContentForm from "./_components/content-form_article"
import ArticleDescriptionForm from "./_components/description-form_article"

const ArticleIdPage = async ({
  params
}: {
  params: { articleId: string }
}) => { 
  const { userId }: { userId: string | null } = await auth()

  if (!userId) {
    return redirect("/")
  }

  const article = await db.article.findUnique({
    where: { 
      id: params.articleId,
      userId
    }
  });

  if (!article) {
    return redirect("/")
  }

  const requiredFields = [
    article.title,
    article.content,
    article.description,
    article.imageUrl,
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
            <Link href="/admin/article" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Artikel
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Banner Publish */}
          {!article.isPublished && (
            <Banner
              variant="warning"
              label="Artikel ini belum dipublikasikan dan tidak akan terlihat di daftar artikel."
            />
          )}

          {/* Progress Section */}
          <div className="bg-white rounded-xl p-6 border shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">Pengaturan Artikel</h1>
                <p className="text-sm text-gray-500">
                  Lengkapi semua kolom yang wajib diisi ({completedFields}/{totalFields})
                </p>
              </div>
              <ArticleActions
                disabled={!isComplete}
                articleId={params.articleId}
                isPublished={article.isPublished}
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
                  <CardTitle>Detail Artikel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ArticleTitleForm
                    initialData={article}
                    articleId={article.id}
                  />
                  <ArticleImageForm
                    initialData={article}
                    articleId={article.id}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-x-2 space-y-0 pb-2">
                  <IconBadge icon={FolderArchive} />
                  <CardTitle>Konten Artikel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ArticleDescriptionForm 
                    initialData={article}
                    articleId={article.id}
                  />
                  <ArticleContentForm 
                    initialData={article}
                    articleId={article.id}
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

export default ArticleIdPage
