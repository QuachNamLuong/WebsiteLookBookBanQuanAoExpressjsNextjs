"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative w-full">
      {/* --- Background Image --- */}
      <div className="relative w-full h-[600px]">
        <Image
          src="/images/hero-banner.jpg" // 👉 put your image here (public/images/hero-banner.jpg)
          alt="VieCharm Hero Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* --- Overlay text and button --- */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black/20">
        <h1 className="text-3xl font-semibold tracking-wide mb-4 uppercase">
          New Arrival
        </h1>
        <Link
          href="/collections/new-arrival"
          className="bg-[#7b8f6d] hover:bg-[#6b7f5f] text-white px-6 py-2 text-sm font-medium transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
