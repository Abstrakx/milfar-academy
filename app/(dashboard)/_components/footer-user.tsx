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
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
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
            <a href="#produk1" className="hover:text-gray-300">
              Kelas Holtikultura
            </a>
          </li>
          <li>
            <a href="#produk2" className="hover:text-gray-300">
              Kelas Tanaman Pangan
            </a>
          </li>
          <li>
            <a href="#produk3" className="hover:text-gray-300">
              Kelas Hidroponik
            </a>
          </li>
          <li>
            <a href="#produk4" className="hover:text-gray-300">
              Nutrisi Tanaman
            </a>
          </li>
          <li>
            <a href="#produk5" className="hover:text-gray-300">
              Media Tanam
            </a>
          </li>
        </ul>
      </div>

      {/* Sisi Kanan: Dukungan dan Menu */}
      <div className="text-center md:text-left space-y-6">
        <h3 className="text-xl font-semibold">Dukungan</h3>
        <ul className="space-y-3">
          <li>
            <a href="#bantuan" className="hover:text-gray-300">
              Kontak Kami
            </a>
          </li>
          <li>
            <a href="#kontak" className="hover:text-gray-300">
              FAQ
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default FooterUser