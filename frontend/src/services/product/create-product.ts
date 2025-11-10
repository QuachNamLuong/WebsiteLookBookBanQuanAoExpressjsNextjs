import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CreateProductResponse {
  productId: string
}

export const createProduct = async (
  productName: string,
  price: number,
  quantity: number,
  sizes: string[],
  nameMean: string,
  material: string,
  style: string,
  color: string,
  usage: string,
  images?: File[],
) => {
  try {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price.toString());
    formData.append("quantity", quantity.toString());
    formData.append("nameMean", nameMean);
    formData.append("material", material);
    formData.append("style", style);
    formData.append("color", color);
    formData.append("usage", usage);

    // Append mảng sizes
    sizes.forEach((size) => {
      formData.append("sizes", size);
    });
    
    if (images && images.length > 0) {
      images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const res = await api.post<CreateProductResponse>(`${API_URL}/product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status == HttpStatusCode.Created) {
      return { productId: res.data.productId };
    }
    throw new Error();
  } catch (error) {
    toast.error("Không thể tạo sản phẩm");
    throw new Error();
  }
}