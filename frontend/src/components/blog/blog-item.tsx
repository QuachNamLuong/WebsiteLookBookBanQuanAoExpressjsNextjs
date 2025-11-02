"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
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
  return (
    <div className="flex flex-col bg-[#d9d9d9]">
      <Image src="/stars/stars-1.jpg" width={300} height={600} alt="image"/>
      <div className="flex flex-col">
        <h1>Tieu đề</h1>
        <p>
          doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu doan van nhieu chu
        </p>
        <Separator className="border-2"/>
        <Link href="/">Xem thêm</Link>
      </div>
    </div>
  );
}
