"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Separator } from "../ui/separator";

export default function StarsSection() {
  const items = [
    { id: 1, image: "/stars/stars-1.jpg", alt: "1 Áo dài đỏ" },
    { id: 2, image: "/stars/stars-2.png", alt: "2 Áo dài hồng nhạt" },
    { id: 3, image: "/stars/stars-3.png", alt: "3 Áo dài ren hồng" },
    { id: 4, image: "/stars/stars-1.jpg", alt: "4 Áo dài đỏ" },
    { id: 5, image: "/stars/stars-2.png", alt: "5 Áo dài hồng nhạt" },
    { id: 6, image: "/stars/stars-3.png", alt: "6 Áo dài ren hồng" },
    { id: 7, image: "/stars/stars-1.jpg", alt: "7 Áo dài đỏ" },
    { id: 8, image: "/stars/stars-2.png", alt: "8 Áo dài hồng nhạt" },
    { id: 9, image: "/stars/stars-3.png", alt: "9 Áo dài ren hồng" },
    { id: 10, image: "/stars/stars-1.jpg", alt: "10 Áo dài đỏ" },
    { id: 11, image: "/stars/stars-2.png", alt: "11 Áo dài hồng nhạt" },
    { id: 12, image: "/stars/stars-3.png", alt: "12 Áo dài ren hồng" },
  ];

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    // initialize current index
    setCurrent(api.selectedScrollSnap());

    // update on every selection change
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-2 px-6 md:px-12 text-center">
      <Separator className="max-w-[400px] mx-auto border-t-3 mb-5" />
      <h2 className="text-lg font-medium tracking-wide mb-6">STARS in VieCharm</h2>
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
          }),
        ]}
        className="max-w-5xl mx-auto"
      >
        <CarouselContent className="gap-4">
          {items.map((item) => (
            <CarouselItem key={item.id} className="basis-1/1 sm:basis-1/2 md:basis-1/3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md">
                <Image src={item.image} alt={item.alt} fill className="object-cover" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* dots */}
      <div className="flex justify-center mt-4 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              current === index ? "bg-[#6B7854]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
