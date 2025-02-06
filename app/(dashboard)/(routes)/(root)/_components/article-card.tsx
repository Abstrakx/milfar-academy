"use client";

import Image from "next/image"

const ArticleCard = () => {
  return (
    <section className="py-16 bg-gray-50">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Kabar Milfar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/images/blog-1.jpg" 
            alt="Blog Post 1"
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Cara Menanam Tanaman Pangan di Rumah</h3>
            <p className="text-gray-600 text-sm mb-4">
              Pelajari cara mudah menanam berbagai jenis tanaman pangan di halaman rumah Anda dengan panduan langkah demi langkah.
            </p>
            <p className="text-green-600 hover:text-green-700 font-semibold">Baca Selengkapnya &rarr;</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/images/blog-2.jpg" 
            alt="Blog Post 2"
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Panduan Hidroponik untuk Pemula</h3>
            <p className="text-gray-600 text-sm mb-4">
              Jika Anda tertarik untuk memulai hidroponik, artikel ini memberikan panduan lengkap tentang cara memulai dengan mudah.
            </p>
            <p  className="text-green-600 hover:text-green-700 font-semibold">Baca Selengkapnya &rarr;</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src="/images/blog-3.jpg" 
            alt="Blog Post 3"
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tips Berkebun dengan Media Tanam Organik</h3>
            <p className="text-gray-600 text-sm mb-4">
              Temukan cara mudah dan ramah lingkungan untuk menanam dengan menggunakan media tanam organik yang dapat ditemukan di sekitar kita.
            </p>
            <p  className="text-green-600 hover:text-green-700 font-semibold">Baca Selengkapnya &rarr;</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default ArticleCard