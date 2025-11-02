"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

export default function NewArrivalSection() {
  const products = [
    {
      id: 1,
      title: "ÁO DÀI TƠ TẰM LIÊN VŨ",
      price: "3.650.000 VNĐ",
      image: "/arrival/arrival-image-1.jpg",
    },
    {
      id: 2,
      title: "ÁO DÀI TƠ TẰM YÊN LINH",
      price: "3.650.000 VNĐ",
      image: "/arrival/arrival-image-2.jpg",
    },
    {
      id: 3,
      title: "ÁO DÀI REN LIỄU YÊN",
      price: "3.650.000 VNĐ",
      image: "/arrival/arrival-image-3.jpg",
    },
  ];

  return (
    <section className="text-center py-12">
      <Separator className="max-w-[400px] mx-auto border-t-3 mb-5" />
      <h2 className="text-lg tracking-wide font-medium">NEW ARRIVAL</h2>
      <Button className="mt-2 bg-[#6B7854] hover:bg-[#55613F] text-white text-sm">
        SHOP NOW
      </Button>
      <Separator className="max-w-[400px] mx-auto border-t-3 mt-5" />
      <div className="mt-10 flex flex-wrap justify-center gap-8">
        {products.map((product) => (
          <div key={product.id} className="w-[300px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-3 text-sm font-semibold">{product.title}</h3>
            <p className="text-xs text-gray-500 font-extrabold">{product.price}</p>
            <Button
              className="text-xs text-black font-light border-[#c5bfab] hover:bg-[#afa997] hover:border-[#afa997] bg-[#c5bfab] hover:text-white px-1 h-fit py-1 rounded-[3px]"
            >
              Xem chi tiết
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
