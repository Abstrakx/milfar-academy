"use client";  

import React from "react";
import PurchaseModal from "@/components/modals/purchase-modal";
import { CheckCircle, Lock } from "lucide-react";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

const whatsappNumber = "6283134083929"; 

const ClientPurchase = ({ profile, course, chapters, purchase, title, price }: { profile: any, course: any, chapters: any[], purchase: any, title: string, price: number }) => {
  const handlePurchase = () => {
    const message = encodeURIComponent(`Halo, saya ${profile.name} ingin membeli kursus ${course.title} dengan id ${profile.id}.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  const handleContactAdmin = () => {
    const message = encodeURIComponent(`Halo, saya ${profile.name} ingin bertanya mengenai kursus ${course.title}.`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <ol className="space-y-4 list-decimal pl-6">
      {chapters.map((chapter) => {
        const isCompleted = chapter.userProgress && chapter.userProgress.length > 0;

        return (
          <li
            key={chapter.id}
            className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4 mb-3"
          >
            {/* ✅ If Purchased, Link to the Chapter */}
            {purchase ? (
              <Link href={`/kelas/${course.id}/chapter/${chapter.id}`} className="flex items-center gap-2">
                <span className="text-sm sm:text-lg text-gray-700">{chapter.title}</span>
                {isCompleted && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />}
              </Link>
            ) : (
              // ❌ If Not Purchased, Show Purchase Modal
              <PurchaseModal
                courseTitle={title}
                coursePrice={formatPrice(price)}
                onBuyNow={handlePurchase}
                onContactAdmin={handleContactAdmin}
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-sm sm:text-lg text-gray-700">{chapter.title}</span>
                  {isCompleted && <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />}
                </div>
              </PurchaseModal>
            )}

            {!chapter.isFree && !purchase && <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />}
          </li>
        );
      })}
    </ol>
  );
};

export default ClientPurchase;
