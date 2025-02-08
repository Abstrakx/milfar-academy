import { db } from "@/lib/db";
import { CourseCard } from "@/components/course-card";
import { Leaf, Sprout, Droplet } from "lucide-react";

const SearchPage = async () => {
  const courses = await db.course.findMany({
    where: {
      isPublished: true,
    },
    include: {
      category: true,
      purchases: true,
      chapters: {
        where: {
          isPublished: true,
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">
              Kembangkan Pertanianmu dengan Teknologi Modern
            </h1>
            <p className="text-xl text-green-100 mb-6">
              Kursus agrikultur yang dirancang untuk meningkatkan produktivitas
              dan kualitas hasil tani.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-green-600 px-6 py-2 rounded-full font-medium hover:bg-green-50 transition-colors">
                Mulai Belajar
              </button>
              <button className="border border-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Leaf className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Inovasi Pertanian Modern</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Pelajari teknologi terbaru di dunia agrikultur.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Sprout className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Instruktur Ahli Agronomi</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Belajar langsung dari pakar pertanian berpengalaman.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Droplet className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-lg">Materi Berbasis Praktik</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fokus pada solusi nyata untuk tantangan di lapangan.
              </p>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <h2 className="text-2xl font-bold mb-6">Kursus Pertanian Tersedia</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                imageUrl={course.imageUrl || "/api/placeholder/400/300"}
                chaptersLength={course.chapters.length}
                price={course.price || 0}
                category={course.category?.name || 'Tidak ada kategori'}
                purchasesLength={course.purchases.length}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <Sprout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Belum ada kursus pertanian tersedia saat ini.
                </p>
                <p className="text-gray-400 dark:text-gray-500">
                  Silakan cek kembali dalam beberapa waktu.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
