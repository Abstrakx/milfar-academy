import Image from "next/image"; // Pastikan ini diimpor
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Star, Users, Tag } from "lucide-react";

// Data untuk kelas
const kelasData = [
    {
        id: 1,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 125,
        price: "Rp 150.000",
    },
    {
        id: 2,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 130,
        price: "Rp 155.000",
    },
    {
        id: 3,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 140,
        price: "Rp 160.000",
    },
    {
        id: 4,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 150,
        price: "Rp 165.000",
    },
    {
        id: 5,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 160,
        price: "Rp 170.000",
    },
    {
        id: 6,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 170,
        price: "Rp 175.000",
    },
    {
        id: 7,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 180,
        price: "Rp 180.000",
    },
    {
        id: 8,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 190,
        price: "Rp 185.000",
    },
    {
        id: 9,
        imageSrc: "/kelas-cabai.png",
        title: "Kelas Cabai Skala Rumahan",
        rating: 5.0,
        participants: 200,
        price: "Rp 190.000",
    },
];

export default function Kelas() {
    return (
        <main className="container mx-auto p-4">
            {/* Hero Section */}
            <section className="mt-16">
                {/* Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center">
                    {kelasData.map((kelas) => (
                        <Card key={kelas.id} className="shadow-lg max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                            {/* Header Card */}
                            <CardHeader className="flex flex-col items-center p-2">
                                <Image
                                    src={kelas.imageSrc}
                                    alt={kelas.title}
                                    width={200}
                                    height={200}
                                    className="rounded-lg"
                                />
                                <CardTitle className="text-center mt-2 text-sm sm:text-base font-semibold">
                                    {kelas.title}
                                </CardTitle>
                            </CardHeader>
                            {/* Konten Card */}
                            <CardContent className="text-center p-2">
                                <div className="flex flex-col space-y-1 text-gray-600">
                                    {/* Rating */}
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        <span className="text-sm">{kelas.rating}</span>
                                    </div>
                                    {/* Jumlah Peserta */}
                                    <div className="flex items-center space-x-1">
                                        <Users className="w-4 h-4" />
                                        <span className="text-sm">{kelas.participants}</span>
                                    </div>
                                    {/* Harga */}
                                    <div className="flex items-center space-x-1">
                                        <Tag className="w-4 h-4" />
                                        <span className="text-sm">{kelas.price}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    );
}