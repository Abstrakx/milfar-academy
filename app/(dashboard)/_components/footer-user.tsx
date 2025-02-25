"use client";
import Image from "next/image"
import Link from "next/link"

const FooterUser = () => {
  return (
  <div className="bg-[#386354] text-white py-12">
    <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-12">
      {/* Sisi Kiri: Logo dan Media Sosial */}
      <div className="flex flex-col items-center md:items-start space-y-6">
        <div>
          <Image
            src="/logo_white.png" 
            alt="Logo"
            width={227}
            height={91}
          />
        </div>
        <div className="flex space-x-6">
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image width={30} height={30} src="/instagram.png" alt="Instagram" />
          </Link>
          <Link href="https://www.facebook.com/share/1A4bMYeeMJ/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <Image width={19} height={30} src="/facebook.png" alt="Facebook" />
          </Link>
          <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <Image width={26} height={30} src="/tiktok.png" alt="TikTok" />
          </Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Image width={43} height={30} src="/youtube.png" alt="YouTube" />
          </Link>
        </div>
      </div>

      {/* Sisi Tengah: Produk dan Menu */}
      <div className="text-center md:text-left space-y-6">
        <h3 className="text-xl font-semibold">Produk</h3>
        <ul className="space-y-3">
          <li>
            <Link href="/kelas?category=81203115-f10c-41fd-91a5-2dbf98402fc8" className="hover:text-gray-300">
              Kelas Tanaman Pangan
            </Link>
          </li>
          <li>
            <Link href="/kelas?category=7648008b-0000-40d5-a5b9-54246d6c2b6c" className="hover:text-gray-300">
              Kelas Holtikultura
            </Link>
          </li>
          <li>
            <Link href="/kelas?category=a2f9532c-59e3-4ad1-93a8-997ea815c802" className="hover:text-gray-300">
              Kelas Hidroponik
            </Link>
          </li>
          <li>
            <Link href="/kelas?category=0933b5c2-cd40-495d-ac06-6788901c2d28" className="hover:text-gray-300">
              Micro Green
            </Link>
          </li>
        </ul>
      </div>

      {/* Sisi Kanan: Dukungan dan Menu */}
      <div className="text-center md:text-left space-y-6">
        <h3 className="text-xl font-semibold">Dukungan</h3>
        <ul className="space-y-3">
          <li>
            <Link href="#bantuan" className="hover:text-gray-300">
              Kontak Kami
            </Link>
          </li>
          <li>
            <Link href="#kontak" className="hover:text-gray-300">
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default FooterUser