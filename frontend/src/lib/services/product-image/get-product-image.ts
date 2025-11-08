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

export const getProductImage = async (productId: string): Promise<ProductResponse | null> => {
  try {
    const res = await api.get<ProductResponse>(`${API_URL}/product-image/${productId}`);

    if (res.status === HttpStatusCode.Ok) {
      return res.data;
    }

    toast.error("Không thể tải hình ảnh sản phẩm!");
    return null;
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    toast.error("Lỗi khi tải sản phẩm!");
    return null;
  }
};
