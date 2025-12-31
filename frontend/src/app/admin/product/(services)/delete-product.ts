// app/admin/products/(services)/delete-product.ts

import api from "@/lib/axios"; // Uses the default exported API instance
import axios from "axios"; // Needed for axios.isAxiosError check
import { toast } from "sonner";

/**
 * Gửi yêu cầu DELETE đến API để xóa một sản phẩm.
 * @param productId ID của sản phẩm cần xóa.
 * @returns Promise<void> Trả về một Promise trống nếu xóa thành công.
 */
export async function deleteProduct(productId: string): Promise<void> {
  const res = await fetch(`/api/products/${productId}`, {method: "DELETE"});

  if(!res.ok) {
    toast.error("Xóa sản phẩm thất bại!");
    return;
  }

  toast.success("Xóa sản phẩm thành công!");
   
} 