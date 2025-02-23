import { CalendarDays, Clock } from "lucide-react";
import { auth } from "@clerk/nextjs/server"
import Image from "next/image";
import PreviewArticle from "./_components/preview-article"; 
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ArticlePage = async ({ 
  params
}:{ params: {articleId: string} }) => {
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

  const article = await db.article.findUnique({
    where: {
      id: params.articleId,
    },
  });

  if (!article) {
    return redirect("/");
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: userId,
    }
  });

  return (
    <div className="max-w-4xl mx-auto mt-20">
      {/* Article Header */}
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={article.createdAt.toISOString()}>
              {article.createdAt.toLocaleDateString()}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <time dateTime={article.updatedAt.toISOString()}>
              Updated {article.updatedAt.toLocaleDateString()}
            </time>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {article.imageUrl && (
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

    <div className="flex items-center gap-4 mt-8 bg-gray-300 p-6 rounded-lg">
      <Avatar>
        <AvatarImage src={profile?.imageUrl || '/default-avatar.png'} alt={profile?.name} />
        <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-bold text-gray-900">{profile?.name}</p>
        <p className="text-sm text-gray-600">{profile?.roleName}</p>
      </div>
    </div>

      <div className="mt-10 mb-20">
        {article.content && (
          <PreviewArticle content={article.content} />
        )}
      </div>
    </div>
  );
};

export default ArticlePage;