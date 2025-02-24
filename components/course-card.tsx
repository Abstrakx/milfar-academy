"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, Users, Tag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Course, Purchase } from "@prisma/client";

interface CourseCardProps {
  courses: (Course & { 
    purchases: Purchase[];
    category: { name: string } | null;
    reviews: { rating: number }[];
  })[];
}

const calculateAverageRating = (reviews: { rating: number }[]) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1);
};

const CourseContent = ({ course }: { course: CourseCardProps['courses'][0] }) => (
  <Card className="h-[400px] shadow-lg mx-auto">
    <CardHeader className="p-0">
      <div className="relative w-full pt-[56.25%]">
        <Image
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover rounded-t-lg"
        />
        <span className="absolute top-2 right-2 bg-sky-500 text-white px-2 py-1 rounded-full text-xs">
          {course.category?.name || "No Category"}
        </span>
      </div>
      <div className="p-4">
        <CardTitle className="text-lg font-bold line-clamp-2">
          {course.title}
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent className="text-gray-600">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-1">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span>
            {calculateAverageRating(course.reviews)}
            <span className="text-xs text-gray-500 ml-1">
              ({course.reviews.length} review
              {course.reviews.length !== 1 && "s"})
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-5 h-5" />
          <span>{course.purchases.length} peserta</span>
        </div>
        <div className="flex items-center space-x-1">
          <Tag className="w-5 h-5" />
          {course.price ? (
            <span>
              {course.discountPrice && course.discountPrice < course.price ? (
                <>
                  <span className="line-through text-red-500">
                    {formatPrice(course.price)}
                  </span>
                  <span className="ml-2">
                    {formatPrice(course.discountPrice)}
                  </span>
                </>
              ) : (
                formatPrice(course.price)
              )}
            </span>
          ) : (
            <span>Gratis</span>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const CourseCard = ({ courses }: CourseCardProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mt-16">
        {/* Mobile Carousel */}
        <div className="block lg:hidden">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Kelas Unggulan</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={scrollPrev}
                className="w-9 h-9 flex items-center justify-center border-2 border-gray-300 rounded-full hover:bg-gray-100 transition"
              >
                ←
              </button>
              <button
                onClick={scrollNext}
                className="w-9 h-9 flex items-center justify-center border-2 border-gray-300 rounded-full hover:bg-gray-100 transition"
              >
                →
              </button>
            </div>
          </div>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {courses.map((course) => (
                <div key={course.id} className="min-w-[100%] px-2">
                  <Link href={`/overview/${course.id}`}>
                    <CourseContent course={course} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Kelas Unggulan
          </h1>
          <div className="grid grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link key={course.id} href={`/overview/${course.id}`}>
                <CourseContent course={course} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;