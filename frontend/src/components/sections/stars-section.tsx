"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export default function StarsSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Mock data
  const mockStars = [
    { id: 1, title: "Elegant Dress", image: "/images/star1.jpg" },
    { id: 2, title: "Classic Outfit", image: "/images/star2.jpg" },
    { id: 3, title: "Modern Style", image: "/images/star3.jpg" },
    { id: 4, title: "Traditional Look", image: "/images/star4.jpg" },
    { id: 5, title: "Chic Fashion", image: "/images/star2.jpg" },
  ];

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => api.off("select", handleSelect);
  }, [api]);

  return (
    <div className="mx-auto max-w-5xl">
      <Carousel
        plugins={[Autoplay({ delay: 2500, stopOnInteraction: false })]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="flex gap-x-4">
          {mockStars.map((star) => (
            <CarouselItem key={star.id} className="basis-1/3">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
                    <Image
                      src={star.image}
                      alt={star.title}
                      width={400}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="mt-2 text-lg font-semibold text-center">
                    {star.title}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn("h-3.5 w-3.5 rounded-full border-2", {
              "border-primary": current === index,
            })}
          />
        ))}
      </div>
    </div>
  );
}
