"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@/services/product/get-paginate-product";


export default function ProductItem({ product }: { product: Product }) {
  const router = useRouter();

  const handleView = useCallback(() => {
    const target = `/product/${product.productId}`;
    router.push(target);
  }, [product, router]);

  const formattedPrice = `${product.price} VND`

  return (
    <div className="w-[300px] flex flex-col items-center">
      <div className="overflow-hidden rounded">
        <Image src={product.productImage[0].productImageUrl} alt={product.productName} height={600} width={370} />
      </div>

      <h3 className="mt-3 text-sm font-semibold line-clamp-2 text-center">{product.productName}</h3>
      <p className="text-xs text-gray-500 font-extrabold mb-3 text-center">{formattedPrice}</p>

      <Button
        onClick={handleView}
        className="text-xs text-black font-light border-[#c5bfab] hover:bg-[#afa997] hover:border-[#afa997] bg-[#c5bfab] hover:text-white px-1 h-fit py-1 rounded-[3px]"
      >
        Xem chi tiết
      </Button>
    </div>
  );
}