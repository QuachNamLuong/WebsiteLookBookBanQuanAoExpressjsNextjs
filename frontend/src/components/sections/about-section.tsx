"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="w-full bg-[#788a68] py-16 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-center">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-sm aspect-[3/4]">
            <Image
              src="/about/about-us.jpg"
              alt="About VieCharm"
              fill
              className="object-cover rounded"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left px-6 mt-8 md:mt-0">
          <h2 className="text-xl font-semibold text-[#E6E8D3] mb-4">VỀ CHÚNG TÔI</h2>
          <p className="text-sm text-[#E6E8D3]/90 leading-relaxed mb-4">
            VieCharm ra đời từ tình yêu bất tận với tà áo dài – biểu tượng cho vẻ đẹp và tâm hồn người phụ nữ Việt Nam. 
            Tên gọi "VieCharm" chính là lời cam kết của chúng tôi: gói trọn “Nét Duyên Việt” (Vie + Charm) trong từng thiết kế.
          </p>
          <Link href="/about">
          <Button className="bg-[#F2F3DC] text-[#000000] text-sm px-5 py-2 rounded hover:bg-[#D8DAC1]">Xem thêm</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
