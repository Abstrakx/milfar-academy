// app/articles/page.tsx
import { db } from "@/lib/db"; 
import ArticleCard from "./_components/article-card";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  searchParams: {
    page?: string;
  };
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  // Determine current page from query params (default is 1)
  const page = parseInt(searchParams?.page ?? "1", 10) || 1;
  const limit = 9;
  const skip = (page - 1) * limit;

  // Fetch published articles with pagination
  const articles = await db.article.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });

  // Count the total number of published articles for pagination
  const totalArticles = await db.article.count({
    where: { isPublished: true },
  });
  const totalPages = Math.ceil(totalArticles / limit);

  return (
    <>
      <main className="bg-gray-50 py-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            Artikel Terkini
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center space-x-4">
            {page > 1 && (
              <Link
                href={`/articles?page=${page - 1}`}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/articles?page=${page + 1}`}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Next
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Optional Hero / CTA Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-lg text-center md:text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Solusi Lengkap untuk Pertanian Masa Kini
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Kombinasi sempurna antara inovasi dan tradisi, memastikan Anda
              selangkah lebih maju dalam pertanian modern.
            </p>
            <button className="px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700">
              Pelajari Lebih Lanjut
            </button>
          </div>
          <div className="flex justify-center md:justify-start mt-4 md:mt-0">
            <Image
              src="/hero-3.png"
              alt="Hero Image"
              width={600}
              height={600}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}
