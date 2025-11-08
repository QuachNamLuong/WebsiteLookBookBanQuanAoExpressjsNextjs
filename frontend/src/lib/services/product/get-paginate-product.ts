import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Product = {
  productId: string;
  productName: string;
  price: string;
  quantity: number;
  material: string;
  color: string;
  nameMeaning: string;
  style: string;
  usage: string;
  productImage: {
    productImageId: string;
    productImageUrl: string;
    productImageName: string;
    objectName: string;
    productId: string;
  }[];
};

interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
}

interface PaginatedResponse {
  data: Product[];
  pagination: Pagination;
}

export const getPaginateProduct = async (page = 1, limit = 10) => {
  if (page < 0 || limit < 10 || limit > 100) {
    toast.error("Số trang hoặc số lượng hàng của bảng không hợp lệ");
    return null;
  }

  try {
    const res = await api.get<PaginatedResponse>(`${API_URL}/product`, {
      params: { page, limit },
    });

    if (res.status === HttpStatusCode.Ok || res.status === HttpStatusCode.NotModified) {
      return res.data;
    }

    toast.error("Không thể tải danh sách sản phẩm");
    return null;
  } catch (error) {
    console.error(error);
    toast.error("Lỗi khi kết nối với máy chủ");
    return null;
  }
};
