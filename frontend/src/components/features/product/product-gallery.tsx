"use client";

import { getProductImage } from "@/services/product-image/get-product-image";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductGallery({ productId }: { productId: string }) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getProductImage(productId);
        if (data?.productImages?.length) {
          const validImages = data.productImages
            .map((img) => img.productImageUrl)
            .filter(Boolean);
          setImages(validImages);
        } else {
          setImages([]);
        }
      } catch (err) {
        console.error("❌ Error loading product images:", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchImages();
  }, [productId]);

  if (loading)
    return <p className="text-gray-500 text-sm text-center py-6">Đang tải hình ảnh...</p>;

  if (images.length === 0)
    return <p className="text-gray-400 text-sm text-center py-6">Không có hình ảnh sản phẩm.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-center">
      {images.map((img, i) => (
        <div
          key={i}
          className="rounded-[3px] overflow-hidden bg-gray-100"

        >
          <Image
            src={img}
            alt={`Gallery ${i}`}
            width={380}
            height={610}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/fallback-image.png";
            }}
          />
        </div>
      ))}
    </div>
  );
}
