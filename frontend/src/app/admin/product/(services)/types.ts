// --- Type Definitions (Should ideally be imported from (services)/types.ts) ---

export type ProductImage = {
  id: string;      // ID của ảnh trên hệ thống lưu trữ/DB
  url: string;     // URL cuối cùng để truy cập ảnh
  order: number;   // Thứ tự hiển thị của ảnh
};
export type Product = {
  id: string;
  code: string;
  name: string;
  stock: number;
  price?: number;
  nameMean: string;
  material: string;
  style: string;
  color: string;
  usage: string;
  images: ProductImage[]
};

export interface PaginatedResponse<T> {
  data: T[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}
// -------------------------------------------------------------