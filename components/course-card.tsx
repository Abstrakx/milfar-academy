import Image from "next/image";
import Link from "next/link";
import { BookOpen, Star, Users } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  category: string;
  price: number;
  purchasesLength: number;
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  category,
  price,
  purchasesLength,
}: CourseCardProps) => {
  return (
    <Link href={`/course/${id}`}>
    <div className="group bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
      <div className="relative">
        <div className="relative w-full aspect-video">
          <Image
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
            alt={title}
            src={imageUrl || "/api/placeholder/400/300"}
          />
        </div>
        <span className="absolute top-2 right-2 bg-sky-500 text-white px-2 py-1 rounded-full text-xs">
          {category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold group-hover:text-sky-600 transition-colors line-clamp-2 mb-2">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
          <div className="flex items-center gap-1">
            <IconBadge size="sm" icon={BookOpen} />
            <span>{chaptersLength} {chaptersLength === 1 ? "Bab" : "Bab"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{purchasesLength} peserta</span> 
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">4.5</span>
          </div>
          <p className="text-lg font-bold text-sky-600 dark:text-sky-400">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </div>
  </Link>
  );
}