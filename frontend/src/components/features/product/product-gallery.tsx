"use client";

import { getProductImage } from "@/services/product-image/get-product-image";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductGallery({
  productId,
}: {
  productId: string;
}) {
  const [imageHref, setImageHref] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);

        const data = await getProductImage(productId);
        // 👉 data.href là link ảnh duy nhất
        setImageHref(data?.href ?? null);
      } catch (err) {
        console.error("❌ Error loading product image:", err);
        setImageHref(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchImage();
  }, [productId]);

  // --- Loading ---
  if (loading) {
    return (
      <p className="text-gray-500 text-sm text-center py-6">
        Đang tải hình ảnh...
      </p>
    );
  }

  // --- No image ---
  if (!imageHref) {
    return (
      <p className="text-gray-400 text-sm text-center py-6">
        Không có hình ảnh sản phẩm.
      </p>
    );
  }

  // --- Render single image ---
  return (
    <div className="flex justify-center">
      <div className="rounded-[3px] overflow-hidden ">
        <Image
          src={imageHref}
          alt="Product image"
          width={380}
          height={610}
          className="object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/fallback-image.png";
          }}
        />
      </div>
    </div>
  );
}
