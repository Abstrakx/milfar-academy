"use client";

import Image from "next/image";

const Hero = () => {
  return (
    <div className="overview-bg flex flex-col items-center justify-between mt-5 space-y-12 relative">
            {/* Bagian Hero */}
            <div className="container mx-auto mt-3 flex flex-col md:flex-row items-center justify-between w-full">
                {/* Teks di Kiri */}
                <div className="max-w-lg text-center md:text-left p-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Belajar Bertani, Ciptakan Ketahanan Pangan. Ubah Hobi Menjadi Penghasilan.
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                    Dapatkan kesempatan untuk memulai gaya hidup yang sehat dengan memproduksi sendiri hasil pertanian. Nikmati kepuasan menanam, memanen, dan mendapatkan keuntungan dari lahan rumahmu.
                    </p>
                </div>
                {/* Gambar di Kanan */}
                <div className="mt-8 md:mt-0 md:ml-10">
                    <Image
                    src="/hero.png"
                    alt="Hero Image"
                    width={500}
                    height={500}
                    />
                </div>
            </div>
    </div>
  )
}

export default Hero