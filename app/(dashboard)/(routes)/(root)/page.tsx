import { db } from "@/lib/db";
import CourseCard from "./_components/course-card";
import Hero from "./_components/hero";
import HeroContent from "./_components/hero-content";
import HeroCard from "./_components/hero-card";
import ArticleCard from "./_components/article-card";

export default async function Home() {
  const courses = await db.course.findMany({
    where: { isPublished: true },
    include: {
      purchases: true,
      category: true,
    },
  });

  const articles = await db.article.findMany({
    where: { isPublished: true },
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