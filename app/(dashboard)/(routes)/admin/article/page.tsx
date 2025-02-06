import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleFadingPlus, ImageIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ArticlePage = async () => {
  const { userId }: { userId: string | null } = await auth()

  if (!userId) {
    return redirect("/")
  }

  const articles = await db.article.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <Link href="/admin/article/create">
        <Button className="font-sans">
          <CircleFadingPlus />
          Buat Artikel
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
        {articles.map((article) => (
          <div key={article.id} className="bg-white border shadow-sm rounded-lg p-4">
            {article.imageUrl ? (
              <div className="relative aspect-video w-full rounded-md overflow-hidden">
                <Image
                  alt="Article Image"
                  src={article.imageUrl}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative aspect-video w-full bg-slate-200 rounded-md flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-slate-500" />
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-xl font-bold line-clamp-2">{article.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <Badge variant={article.isPublished ? "outline" : "secondary"}>
                  {article.isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
            </div>

            <Link href={`/admin/article/content/${article.id}`} className="mt-4 block">
              <Button className="w-full">Edit Artikel</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticlePage