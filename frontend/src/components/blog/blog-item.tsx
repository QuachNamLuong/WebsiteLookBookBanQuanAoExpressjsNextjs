"use client";

import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";

interface BlogItemProps {
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  href: string;
}

export function BlogItem({ title, excerpt, image, alt, href }: BlogItemProps) {

  const truncateWords = (text: string, maxWords: number) => {
    if (!text) return text;
    const words = text.trim().split(/\s+/);
    return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "…" : text;
  };

  return (
    <article className="max-w-[320px] bg-[#f0f0f0] rounded-[3px] overflow-hidden shadow-sm mx-auto">
      <div className="relative w-full h-[360px] overflow-hidden bg-gray-200">
        <Image
          src={image}
          alt={alt}
          width={320}
          height={360}
          className="object-cover w-full h-full"
          priority={false}
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm md:text-base font-semibold leading-tight mb-2 text-[#222]">
          {title}
        </h3>

        <p
          className="text-sm text-[#333] text-justify"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden',
          }}
        >
          {truncateWords(excerpt, 30)}
        </p>

        <Separator className="border-t-2 my-4 border-[#989898] w-full" />

        <div className="flex items-center justify-between">
          <Link
            href={href}
            aria-label={`Read more about ${title}`}
            className="text-xs uppercase tracking-wider text-[#6b6b6b]"
          >
            Readmore
          </Link>

          {/* optional placeholder for date or author - keep layout consistent with screenshot */}
          <span className="text-xs text-[#9b9b9b] hidden">&nbsp;</span>
        </div>
      </div>
    </article>
  );
}
