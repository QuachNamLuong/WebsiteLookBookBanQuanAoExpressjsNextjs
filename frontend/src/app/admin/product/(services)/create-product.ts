// app/admin/products/(services)/create-product.ts

import api from "@/lib/axios"; // Uses the default exported API instance
import axios from "axios"; // Needed for axios.isAxiosError check

// --- Type Definitions ---
// These types should match what is defined in your CreateProductForm
export interface CreateProductPayload {
    name: string;
    quantity: number;
    price?: number;
    nameMeaning?: string;
    material?: string;
    style?: string;
    color?: string;
    usage?: string;
    // ... add any other fields needed for creation
}

// The API is assumed to return the ID of the newly created product
export interface CreateProductResult {
    productId: string;
}

// ------------------------


export async function createProduct(payload: CreateProductPayload): Promise<CreateProductResult> {
  // Sử dụng URL tương đối nếu baseURL đã được cấu hình trong /lib/axios.ts
  const API_URL = `/products`;

  try {
    // Gọi POST bằng instance 'api' tùy chỉnh
    const res = await api.post<CreateProductResult>(API_URL, payload);
    
    // Trả về dữ liệu (chủ yếu là productId) từ response body
    return res.data; 

  } catch (error) {
    // Xử lý lỗi Axios và ném lỗi tùy chỉnh để TanStack Query bắt được
    if (axios.isAxiosError(error)) {
      console.error("API Error creating product:", error.message);
      
      // Xử lý các lỗi cụ thể như validation errors (e.g., status 400)
      if (error.response?.status === 400) {
        throw new Error("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường.");
      }
    } else {
      console.error("Unknown error occurred during product creation:", error);
    }
    
    // Ném lỗi chung để kích hoạt onError trong useMutation
    throw new Error("Lỗi khi tạo sản phẩm. Vui lòng thử lại.");
  }
}