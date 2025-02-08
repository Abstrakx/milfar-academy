import { db } from "@/lib/db";
import CourseCard from "./_components/course-card";
import Hero from "./_components/hero";
import HeroContent from "./_components/hero-content";
import HeroCard from "./_components/hero-card";
import ArticleCard from "./_components/article-card";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    try {
      let userProfile = await db.profile.findFirst({
        where: { userId: user.id },
      });

      if (!userProfile) {
        userProfile = await db.profile.create({
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
    },
    take: 6,
  });

  const articles = await db.article.findMany({
    where: { isPublished: true },
    take: 6,
  })

  return (
    <div>
      <Hero />
      <HeroCard />
      <div className="container mx-auto p-4">
        <CourseCard courses={courses} />
        <HeroContent />
      </div>
      <ArticleCard articles={articles}/>
    </div>
  );
}