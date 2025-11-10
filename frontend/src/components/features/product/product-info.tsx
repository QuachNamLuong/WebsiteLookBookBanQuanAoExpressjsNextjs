"use client";

import { Button } from "@/components/ui/button"
import { addProductToCart } from "@/services/cart/add-product-to-cart";
import { getProductInfo } from "@/services/product/get-product-info";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductInfo({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [nameMeaning, setNameMeaning] = useState("");
  const [material, setMaterial] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [usage, setUsage] = useState("");
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState<string[]>([]);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await getProductInfo(productId);
        if (!data) throw new Error();
        setProductName(data.productName);
        setNameMeaning(data.nameMeaning);
        setMaterial(data.material);
        setStyle(data.style);
        setColor(data.color);
        setUsage(data.usage);
        setPrice(data.price);
        setSizes(data.productSizes.map((ps) => ps.size));
      } catch (err) {
        toast.error("Error loading product images:");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) fetchImages();
  }, [productId]);

  if (isLoading) return <p>Đang tải</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{productName}</h1>

      <div className="space-y-3 text-sm">
        <div className="flex">
          <span className="w-24 font-medium">Ý nghĩa tên:</span>
          <span>
            {nameMeaning}
          </span>
        </div>
        <div className="flex">
          <span className="w-24 font-medium">Chất liệu:</span>
          <span>
            {material}
          </span>
        </div>
        <div className="flex">
          <span className="w-24 font-medium">Kiểu dáng:</span>
          <span>{style}</span>
        </div>
        <div className="flex">
          <span className="w-24 font-medium">Màu sắc:</span>
          <span>{color}</span>
        </div>
        <div className="flex">
          <span className="w-24 font-medium">Ứng dụng:</span>
          <span>
            {usage}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p className="text-lg font-semibold">{price} VND</p>
        <p className="text-sm font-medium">SIZE</p>
        <div className="flex gap-2">
          {sizes.map((s) => (
            <Button
              key={s}
              variant="outline"
              className="rounded-full w-10 h-10"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <Button className="mt-6 w-full bg-green-800 hover:bg-green-700 text-white"
        onClick={async () => await addProductToCart(productId)}>
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
}