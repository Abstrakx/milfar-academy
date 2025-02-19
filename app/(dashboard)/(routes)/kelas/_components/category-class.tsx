"use client";

import { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";
import Image from "next/image";

const categories = [
  { id: "81203115-f10c-41fd-91a5-2dbf98402fc8", label: "Tanaman Pangan", image: "/kelas/tanaman-pangan.png" },
  { id: "7648008b-0000-40d5-a5b9-54246d6c2b6c", label: "Holtikultura Sayur dan Buah", image: "/kelas/holtikultura-sayur-dan-buah.png" },
  { id: "a2f9532c-59e3-4ad1-93a8-997ea815c802", label: "Hidroponik", image: "/kelas/hidroponik.png" },
  { id: "0933b5c2-cd40-495d-ac06-6788901c2d28", label: "Mikro Green", image: "/kelas/hidroponik.png" },
];

export default function KategoriKelasWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KategoriKelas />
    </Suspense>
  );
}

function KategoriKelas() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (categoryId: string) => {
    const updatedUrl = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: currentCategory === categoryId ? null : categoryId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(updatedUrl);
  };

  return (
    <div className="max-w-5xl w-full mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryClick(cat.id)}
          className={`flex flex-col items-center space-y-2 cursor-pointer p-2 rounded-md border ${
            currentCategory === cat.id ? "border-sky-700 bg-sky-200/20 text-sky-800" : "border-slate-200 hover:border-sky-700"
          }`}
        >
          <Image src={cat.image} alt={cat.label} width={28} height={30} />
          <span className="text-sm font-medium">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
