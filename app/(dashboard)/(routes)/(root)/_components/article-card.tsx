"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Article } from "@prisma/client";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Autoplay from "embla-carousel-autoplay";

interface ArticleCardProps {
  articles: Article[];
}

const ArticleCard = ({ articles }: ArticleCardProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [WheelGesturesPlugin()]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Kabar Milfar</h2>
        <div className="relative flex justify-center sm:justify-start w-full">
          <Carousel
            orientation="horizontal"
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full overflow-hidden"
            ref={emblaRef}
          >
            <CarouselContent className="flex gap-4 justify-center sm:justify-start">
              {articles.map((article) => (
                <CarouselItem
                  key={article.id}
                  className="flex-none w-[90%] sm:w-[48%] md:w-[32%] lg:w-[30%] p-4"
                >
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <Link href={`/articles/${article.id}`}>
                      <Image
                        src={article.imageUrl || "/placeholder.svg"}
                        alt={article.title}
                        width={500}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {article.description && truncateText(article.description, 100)}
                        </p>
                        <p className="text-green-600 hover:text-green-700 font-semibold cursor-pointer">
                          Baca Selengkapnya &rarr;
                        </p>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="hidden md:flex absolute left-4 -translate-y-1/2 top-1/2 bg-background hover:bg-gray-50" />
            <CarouselNext className="hidden md:flex absolute right-4 -translate-y-1/2 top-1/2 bg-background hover:bg-gray-50" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ArticleCard;
