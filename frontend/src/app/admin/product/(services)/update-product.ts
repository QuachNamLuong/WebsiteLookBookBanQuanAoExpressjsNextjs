// app/admin/products/(services)/update-product.ts

import api from "@/lib/axios"; // Uses the default exported API instance
import axios from "axios"; // Needed for axios.isAxiosError check

// --- Type Definitions ---
// The payload is typically a partial update, but must include the ID.
export interface UpdateProductPayload {
    productId?: string; // The ID is required to identify the resource
    productName?: string;
    quantity?: number;
    price?: number;
    nameMeaning?: string;
    material?: string;
    style?: string;
    color?: string;
    usage?: string;
    // ... all updateable fields should be optional here
}
// ------------------------

/**
 * Gửi yêu cầu PUT/PATCH đến API để cập nhật thông tin sản phẩm.
 * * @param payload Dữ liệu sản phẩm cần cập nhật (bao gồm productId).
 * @returns Promise<void> Trả về một Promise trống nếu cập nhật thành công.
 */
export async function updateProduct(payload: UpdateProductPayload): Promise<void> {
  const productId = payload.productId;
  
  // Tạo một bản sao của payload và loại bỏ productId khỏi body 
  // vì ID thường được truyền qua URL.
  const updateData = { ...payload }; 
  delete updateData.productId; 

  const API_URL = `/api/products/${productId}`;

  try {
    // Sử dụng api.put (hoặc api.patch, tùy thuộc vào yêu cầu API backend của bạn)
    await api.put(API_URL, updateData); 
    
    // Nếu thành công (200), function kết thúc.

  } catch (error) {
    // Xử lý lỗi Axios
    if (axios.isAxiosError(error)) {
      console.error(`API Error updating product ${productId}:`, error.message);
      
      if (error.response?.status === 404) {
        throw new Error(`Không tìm thấy sản phẩm có ID: ${productId} để cập nhật.`);
      }
      if (error.response?.status === 400) {
        throw new Error("Dữ liệu cập nhật không hợp lệ.");
      }
    } else {
      console.error("Unknown error occurred during product update:", error);
    }
    
    // Ném lỗi chung để kích hoạt onError trong useMutation
    throw new Error("Lỗi khi cập nhật sản phẩm. Vui lòng thử lại.");
  }
}