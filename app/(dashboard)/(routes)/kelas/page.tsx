import Image from "next/image";
import KelasCard from "./_components/class-card";
import { SearchInput } from "@/components/search-input";
import KategoriKelas from "./_components/category-class";

export default function Kelas({
    searchParams,
  }: {
    searchParams?: {
      title?: string;
      categoryId?: string;
    };
  }) {
    return (
        <>
            <main className="kelas-bg mx-auto p-6 min-h-screen flex flex-col items-center">
                {/* Swiper Slider */}

                {/* Command Input */}
                <SearchInput />

                {/* Kategori Kelas */}
                <KategoriKelas />

                {/* Class Cards */}
                <div className="w-full max-w-5xl mx-auto mobile-raise">
                    <KelasCard searchParams={searchParams || {}} />
                </div>
            </main>

            <div className="max-w-5xl mx-auto px-4 mb-20">
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
}