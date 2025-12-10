// app/admin/products/(services)/delete-product.ts

import api from "@/lib/axios"; // Uses the default exported API instance
import axios from "axios"; // Needed for axios.isAxiosError check

/**
 * Gửi yêu cầu DELETE đến API để xóa một sản phẩm.
 * @param productId ID của sản phẩm cần xóa.
 * @returns Promise<void> Trả về một Promise trống nếu xóa thành công.
 */
export async function deleteProduct(productId: string): Promise<void> {
  // Sử dụng URL tương đối nếu baseURL đã được cấu hình trong /lib/axios.ts
  const API_URL = `/products/${productId}`;

  try {
    // Gọi DELETE bằng instance 'api' tùy chỉnh
    await api.delete(API_URL);
    
    // Nếu thành công (200, 204), function kết thúc mà không trả về gì.

  } catch (error) {
    // Xử lý lỗi Axios và ném lỗi tùy chỉnh để TanStack Query bắt được
    if (axios.isAxiosError(error)) {
      console.error(`API Error deleting product ${productId}:`, error.message);
      
      if (error.response?.status === 404) {
        throw new Error(`Không tìm thấy sản phẩm có ID: ${productId}.`);
      }
    } else {
      console.error("Unknown error occurred during product deletion:", error);
    }
    
    // Ném lỗi chung để kích hoạt onError trong useMutation
    throw new Error("Lỗi khi xóa sản phẩm. Vui lòng thử lại.");
  }
}