"use client";

import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maulana Al Iqbal Widodo",
    title: "Penggemar Pertanian Modern",
    text: "Pelatihan ini mengubah pandangan saya tentang bertani! Sekarang saya bisa mengembangkan kebun sayuran di rumah dengan hasil yang luar biasa.",
    avatar: "/person/iqbal.png",
    rating: 5,
  },
  {
    name: "Alif Rahmat Yudha Putra",
    title: "Pecinta Alam dan Pertanian",
    text: "Sebagai seorang hobiis, saya tidak pernah menyangka bisa mendalami ilmu pertanian dengan cara yang menyenangkan. Kursus ini membuka banyak peluang baru bagi saya!",
    avatar: "/person/alif.jpg",
    rating: 4.5,
  },
  {
    name: "Muhammad Dzaki Hanifa",
    title: "Petani Hobi yang Terinspirasi",
    text: "Saya sangat menikmati setiap materi yang diberikan. Pelatihan ini cocok untuk siapa saja yang ingin menambah pengetahuan seputar pertanian dengan cara yang praktis dan menyenangkan.",
    avatar: "/person/dzaki.png",
    rating: 5,
  },
];

const TestimonialCarousel = () => {
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

  return (
    <div className="relative px-4 md:px-16">
      <Carousel
        orientation="horizontal"
        plugins={[Autoplay({ delay: 1000 })]}
        className="w-full overflow-hidden"
        ref={emblaRef}
      >
        <CarouselContent className="-ml-2">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="pl-2 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <Card className="p-4 md:p-6 h-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                {/* Use a column layout on mobile and a row layout on larger screens */}
                <div className="flex flex-col md:flex-row items-start">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary mb-4 md:mb-0 md:mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {testimonial.title}
                        </p>
                      </div>
                      <div className="flex items-center mt-2 md:mt-0">
                        <span className="text-primary font-bold mr-1">
                          {testimonial.rating}.0
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-gray-600 mt-4 relative pl-4 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:rounded-full">
                      "{testimonial.text}"
                    </blockquote>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows for larger screens */}
        <CarouselPrevious className="hidden md:flex absolute left-4 -translate-y-1/2 top-1/2 bg-background hover:bg-gray-50" />
        <CarouselNext className="hidden md:flex absolute right-4 -translate-y-1/2 top-1/2 bg-background hover:bg-gray-50" />
      </Carousel>
    </div>
  );
};

export default TestimonialCarousel;
