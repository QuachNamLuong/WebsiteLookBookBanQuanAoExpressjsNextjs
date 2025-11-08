"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { useState } from "react";
import ProductGallery from "@/components/features/product/product-gallery";
import { useParams } from "next/navigation";
import ProductInfo from "@/components/features/product/product-info";

export default function ProductPage() {
  const [rating, setRating] = useState(0);
  const params = useParams();
  const productId = params.productId as string;
  return (
    <main className="max-w-6xl mx-auto py-10 px-4">
      {/* --- Product Info Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductGallery productId={productId} />

        <ProductInfo productId={productId} />
      </div>

      {/* --- Reviews --- */}
      <section className="mt-10">
        <Separator />
        <h2 className="mt-4 text-lg font-semibold">Đánh giá sản phẩm (0)</h2>
        <p className="text-sm text-gray-500 mb-2">
          Hãy là người đầu tiên nhận xét “Áo dài Gia An”
        </p>

        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 cursor-pointer ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <textarea
          placeholder="Nhận xét của bạn"
          className="w-full border rounded-md p-2 text-sm min-h-[100px]"
        />
        <Button className="mt-3 bg-green-800 hover:bg-green-700 text-white">
          Gửi đánh giá
        </Button>
      </section>

      {/* --- Related Products --- */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold mb-4">CÓ THỂ BẠN CŨNG THÍCH</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden hover:shadow-lg">
              <CardContent className="p-0">
                <Image
                  src={`/images/related${i}.jpg`}
                  alt={`Related ${i}`}
                  width={400}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}