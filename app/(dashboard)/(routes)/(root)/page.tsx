import { db } from "@/lib/db";
import CourseCard from "./_components/course-card";
import Hero from "./_components/hero";
import HeroContent from "./_components/hero-content";
import HeroCard from "./_components/hero-card";
import ArticleCard from "./_components/article-card";
import { currentUser } from "@clerk/nextjs/server";
import { AuthModal } from "@/components/modals/auth-modal";

export default async function Home({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }) {

  const user = await currentUser();

  if (user) {
    try {
      const existingProfile = await db.profile.findFirst({
        where: { userId: user.id },
      });

      if (!existingProfile) {
        await db.profile.create({
          data: {
            userId: user.id,
            name: user.fullName || "Anonymous User",
            email: user.emailAddresses[0]?.emailAddress || "No Email",
            imageUrl: user.imageUrl || "",
            role: "MEMBER",
          },
        });
      }
    } catch (error) {
      console.error("CREATE_PROFILE:", error);
    }
  }

  const courses = await db.course.findMany({
    where: { isPublished: true },
    include: {
      purchases: true,
      category: true,
      reviews: true,
    },
    take: 6,
  });

  const articles = await db.article.findMany({
    where: { isPublished: true },
    take: 6,
  });

  return (
    <div>
      <AuthModal error={searchParams.error} />
      
      <Hero />
      <HeroCard />
      <div className="container mx-auto p-4">
        <CourseCard courses={courses} />
        <HeroContent />
      </div>
      <ArticleCard articles={articles} />
    </div>
  );
}
