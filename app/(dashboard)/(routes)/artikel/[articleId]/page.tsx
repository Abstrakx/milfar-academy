import { CalendarDays, Clock } from "lucide-react";
import Image from "next/image";
import PreviewArticle from "./_components/preview-article"; 
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArticleVideoPlayer } from "./_components/video-player-article";
import { getYoutubeVideoId } from "@/lib/youtube";

const ArticlePage = async ({ 
  params
}:{ params: {articleId: string} }) => {

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
      userId: article.userId,
    }
  });

  const videoId = article.videoUrl ? getYoutubeVideoId(article.videoUrl) : null;

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4 sm:px-6 md:px-8">
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

      {/* Featured Image or Video */}
      {article.videoUrl ? (
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <ArticleVideoPlayer 
            playbackId={videoId}
          />
        </div>
      ) : article.imageUrl ? (
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

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