import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ProductImage {
  productImageId: string;
  productImageUrl: string;
  productImageName: string;
  objectName: string;
  productId: string;
}

export interface ProductResponse {
  productImages: ProductImage[];
}

export const getProductImage = async (productId: string): Promise<ProductResponse | undefined> => {
  const res = await fetch(`/api/product-images/${productId}`);

  if (!res.ok) {
    toast.error("Tải hình ảnh thất bại");
    return;
  }
  toast.success("Tải hình ảnh thành công");

  return res.json();
};
