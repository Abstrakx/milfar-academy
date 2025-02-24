"use client";

import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useState } from "react";
import { Star, MessageSquareQuote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialOverview {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    text: string;
    courseTitle: string;
}
  
interface TestimonialOverviewProps {
    testimonials: TestimonialOverview[];
}

const EmptyState = () => (
  <Card className="p-8 flex flex-col items-center justify-center text-center space-y-4">
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
      <MessageSquareQuote className="w-8 h-8 text-primary" />
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-gray-800">Belum Ada Review</h3>
      <p className="text-gray-600 max-w-md">
        Jadilah yang pertama memberikan review dan bantu peserta lain mendapatkan wawasan berharga dari pengalaman Anda! ✨
      </p>
    </div>
    <div className="flex items-center space-x-1 text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-6 h-6" />
      ))}
    </div>
  </Card>
);

const TestimonialOverview = ({ testimonials }: TestimonialOverviewProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [WheelGesturesPlugin()]
  );
  
  const [_selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="px-4 md:px-16 py-8">
        <EmptyState />
      </div>
    );
  }

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
              className="pl-2 basis-full md:basis-1 lg:basis-1/3"
            >
              <Card className="p-4 md:p-6 h-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex flex-row items-start">
                  <Avatar className="w-14 h-14 mr-4">
                    <AvatarImage
                      src={testimonial.avatar || "/default-avatar.png"}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-row justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {testimonial.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                        <div className="text-primary font-bold mr-1">
                          {testimonial.rating}.0
                        </div>
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
                    <blockquote className="text-gray-600 mt-4 relative pl-4 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:rounded-full">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex absolute left-4 -translate-y-1/2 top-1/2 bg-background hover:bg-gray-50" />
        <CarouselNext className="hidden md:flex absolute right-4 -translate-y-1/2 top-1/2 bg-background hover:bg-gray-50" />
      </Carousel>
    </div>
  );
};

export default TestimonialOverview;