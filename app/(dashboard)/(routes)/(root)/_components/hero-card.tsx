"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const HeroCard = () => {
  return (
    <div className="lg:-mt-20 mt-5 container mx-auto z-10 relative">
    {/* Bagian Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center w-full">
      {/* Card 1 */}
      <Card className="shadow-md max-w-[220px] mx-auto p-1">
        <CardHeader>
          <Image
            src="/lp-card-1.png"
            alt="Card 1"
            width={50}
            height={50}
            className="mx-auto"
          />
          <CardTitle className="text-center mt-4 text-sm font-semibold">
            Tanaman yang Beragam
          </CardTitle>
          <CardDescription className="text-center text-gray-600 text-sm">
            Panduan budidaya skala rumah yang lengkap.
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Card 2 */}
      <Card className="shadow-md max-w-[220px] mx-auto p-1">
        <CardHeader>
          <Image
            src="/lp-card-2.png"
            alt="Card 2"
            width={50}
            height={50}
            className="mx-auto"
          />
          <CardTitle className="text-center mt-4 text-sm font-semibold">
            Panduan Mudah dan Aplikatif
          </CardTitle>
          <CardDescription className="text-center text-gray-600 text-sm">
            Mudah dipahami dan diaplikasikan oleh pemula.
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Card 3 */}
      <Card className="shadow-md max-w-[220px] mx-auto p-1">
        <CardHeader>
          <Image
            src="/lp-card-3.png"
            alt="Card 3"
            width={50}
            height={50}
            className="mx-auto"
          />
          <CardTitle className="text-center mt-4 text-sm font-semibold">
            Komunitas dan Jejaring Luas
          </CardTitle>
          <CardDescription className="text-center text-gray-600 text-sm">
            Memudahkan Anda membangun relasi baru.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  </div>
  )
}

export default HeroCard