"use client";

import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full max-w-[1440px] h-[700px] mx-auto">
      <Image
        src="/banner/banner-image.jpg"
        alt="VieCharm Hero Banner"
        fill
        priority
        className="object-cover object-center"
      />
    </section>
  );
}
