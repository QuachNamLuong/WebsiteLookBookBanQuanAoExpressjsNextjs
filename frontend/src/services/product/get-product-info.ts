import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProductDetailResponse {
  productId: string;
  productName: string;
  material: string
  color: string
  price: number;
  nameMeaning: string;
  style: string;
  usage: string;
  productSizes: {
    id: number;
    size: string;
  }[]
}

export const getProductInfo = async (productId: string) => {
  try {
    const res = await api.get<ProductDetailResponse>(`${API_URL}/product/${productId}`);
    if (res.status == HttpStatusCode.Ok) {
      return res.data;
    }
  } catch (error) {
    toast.error("Lấy chi tiết sản phẩm thất bại");
  }

};
