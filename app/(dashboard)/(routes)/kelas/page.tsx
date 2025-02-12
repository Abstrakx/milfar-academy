import {
    Command,
    CommandInput,
} from "@/components/ui/command";
import Image from "next/image";
import Kelas from "./_components/class-card";

const KelasPage = () => {
  return (
    <main className="container mx-auto p-6 min-h-screen flex flex-col items-center">
    <Command>
        <CommandInput placeholder="Cari kelas disini..." />
    </Command>
    <div className="max-w-4xl w-full mt-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <Image src="/icon/tanaman-pangan.png" alt="Tanaman Pangan" width={24} height={24} />
            <span>Tanaman Pangan</span>
        </div>
        <div className="flex items-center space-x-2">
            <Image src="/icon/holtikultura-sayur-dan-buah.png" alt="Holtikultura Sayur dan Buah" width={24} height={24} />
            <span>Holtikultura Sayur dan Buah</span>
        </div>
        <div className="flex items-center space-x-2">
            <Image src="/icon/hidroponik.png" alt="Hidroponik" width={24} height={24} />
            <span>Hidroponik</span>
        </div>
    </div>

    <Kelas />

    <section className="flex flex-col md:flex-row items-center justify-between mt-16 space-y-4 md:space-y-0 md:space-x-4">
        {/* Bagian Teks */}
        <div className="max-w-lg text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Solusi Lengkap untuk Pertanian Masa Kini
            </h1>
            <p className="text-gray-600 text-lg mb-4">
                Kombinasi sempurna antara inovasi dan tradisi, memastikan Anda selangkah lebih maju dalam pertanian modern.
            </p>
            <button className="px-5 py-2.5 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700">
                Pelajari Lebih Lanjut
            </button>
        </div>

        {/* Bagian Gambar */}
        <div className="flex justify-center md:justify-start">
            <Image
                src="/images/hero-3.png" // Ganti dengan gambar yang sesuai
                alt="Hero Image"
                width={600}
                height={600}
                className="rounded-lg shadow-md"
            />
        </div>
    </section>
</main>
  )
}

export default KelasPage