import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Product = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  material: string;
  color: string;
  nameMeaning: string;
  style: string;
  usage: string;
  productImage: {
    id: string;
    href: string;
    name: string;
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

export const getPaginateProduct = async (page = 1, limit = 10, slug?: string, category?: string) => {
  if (page < 0 || limit < 10 || limit > 100) {
    toast.error("Số trang hoặc số lượng hàng của bảng không hợp lệ");
    return null;
  }
  if (slug) {
    const res = await fetch(`/api/products/get-products?slug=${slug}`);
    if (res.ok) {
      toast.success("Lấy danh sách sản phẩm thành công!")
      return res.json();
    }
    toast.error("Lấy danh sách sản phẩm thất bại!")
    return;
  }

  if (slug) {
    const res = await fetch(`/api/products/get-products?category=${category}`);
    if (res.ok) {
      toast.success("Lấy danh sách sản phẩm thành công!")
      return res.json();
    }
    toast.error("Lấy danh sách sản phẩm thất bại!")
    return;
  }

  const res = await fetch(`/api/products/get-products?limit=${limit}&page=${page}`);
  if (res.ok) {
    toast.success("Lấy danh sách sản phẩm thành công!")
    return res.json();
  }
  toast.error("Lấy danh sách sản phẩm thất bại!")
};
