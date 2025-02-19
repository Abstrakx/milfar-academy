"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, Users, Tag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { Course, Purchase } from "@prisma/client";

interface CourseCardProps {
  courses: (Course & { 
    purchases: Purchase[]
    category: { name: string } | null 
    reviews: { rating: number }[]
  })[];
}

const calculateAverageRating = (reviews: { rating: number }[]) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.length).toFixed(1);
};

const CourseCard = ({ courses }: CourseCardProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mt-16">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Kelas Unggulan</h1>
          <div className="flex items-center space-x-2">
            <button onClick={scrollPrev} className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full hover:bg-gray-100 transition">
              ←
            </button>
            <button onClick={scrollNext} className="w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full hover:bg-gray-100 transition">
              →
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex space-x-4">
            {courses.map((course) => (
              <Link href={`/overview/${course.id}`} key={course.id} className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.33%]">
                <Card className="shadow-lg mx-auto relative">
                  <CardHeader className="flex flex-col items-center relative">
                    <Image
                      src={course.imageUrl || "/placeholder.svg"}
                      alt={course.title}
                      width={350}
                      height={350}
                      className="rounded-lg"
                    />
                    <CardTitle className="text-center mt-4 text-lg font-bold">{course.title}</CardTitle>
                    <span className="absolute top-2 right-2 bg-sky-500 text-white px-2 py-1 rounded-full text-xs">
                      {course.category?.name || 'No Category'}
                    </span>
                  </CardHeader>
                  <CardContent className="text-center text-gray-600">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span>
                          {calculateAverageRating(course.reviews)}
                          <span className="text-xs text-gray-500 ml-1">
                            ({course.reviews.length} review{course.reviews.length !== 1 && 's'})
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
                                <span className="line-through text-red-500">{formatPrice(course.price)}</span>
                                <span className="ml-2">{formatPrice(course.discountPrice)}</span>
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
