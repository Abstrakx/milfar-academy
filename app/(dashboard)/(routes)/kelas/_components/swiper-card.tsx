'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";

const SwiperCard = () => {
  return (
    <div>
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="w-full max-w-5xl mb-8"
        >
            <SwiperSlide>
                <Image src="/banner/banner1.jpg" alt="Banner 1" width={1200} height={300} className="rounded-lg object-cover w-full h-auto" />
            </SwiperSlide>
            <SwiperSlide>
                <Image src="/banner/banner2.jpg" alt="Banner 2" width={1200} height={300} className="rounded-lg object-cover w-full h-auto" />
            </SwiperSlide>
            <SwiperSlide>
                <Image src="/banner/banner3.jpg" alt="Banner 3" width={1200} height={300} className="rounded-lg object-cover w-full h-auto" />
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default SwiperCard