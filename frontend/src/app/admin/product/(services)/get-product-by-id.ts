import api from "@/lib/axios";
import axios from "axios";
import { Product } from "./types";


export async function getProductById(productId: string): Promise<Product> {
  const API_ROUTE = `http://localhost:3000/api/products/${productId}`;

  try {
    const res = await api.get<Product>(API_ROUTE);
    
    // Axios trả về dữ liệu trong thuộc tính 'data'
    return res.data; 

  } catch (error) {
    // Xử lý lỗi, ví dụ: nếu sản phẩm không tồn tại (404) hoặc lỗi server (500)
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.error(`Product with ID ${productId} not found.`);
      throw new Error("Không tìm thấy sản phẩm này.");
    }
    console.error("Failed to fetch product details:", error);
    throw new Error("Lỗi khi tải thông tin chi tiết sản phẩm.");
  }
}