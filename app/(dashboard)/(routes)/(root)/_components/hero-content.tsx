"use client";

import Image from "next/image";
import TestimonialCarousel from "./testimonial";

const HeroContent = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 space-y-4 md:space-y-0 md:space-x-6">
          {/* Bagian Gambar */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/hero-2.png"
              alt="Hero Image"
              width={600}
              height={600}
              className="rounded-lg shadow-md"
            />
          </div>
          {/* Bagian Teks */}
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Kenapa Milfar Academy Pilihan Terbaik?
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Kami menawarkan pengalaman holistik yang menggabungkan edukasi,
              praktik lapangan, dan dukungan komunitas untuk mendorong sukses
              pertanian Anda.
            </p>
            <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Apa Kata Mereka?</h2>
          <p className="text-gray-600 mt-4">
            Simak testimoni dari para peserta yang telah bergabung dengan kami
            dan merasakan manfaatnya.
          </p>
        </div>
        {/* Testimonial Carousel */}
        <TestimonialCarousel />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 space-y-4 md:space-y-0 md:space-x-4">
          {/* Bagian Teks */}
          <div className="max-w-lg text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Solusi Lengkap untuk Pertanian Masa Kini
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Kombinasi sempurna antara inovasi dan tradisi, memastikan Anda
              selangkah lebih maju dalam pertanian modern.
            </p>
            <button className="px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700">
              Pelajari Lebih Lanjut
            </button>
          </div>

          {/* Bagian Gambar */}
          <div className="flex justify-center md:justify-start">
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
};

export default HeroContent;
