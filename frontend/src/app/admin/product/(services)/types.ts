// --- Type Definitions (Should ideally be imported from (services)/types.ts) ---
export type Product = {
  productId: string;
  productName: string;
  quantity: number;
  price?: number;
  nameMeaning: string;
  material: string;
  style: string;
  color: string;
  usage: string;
};

export interface PaginatedResponse<T> {
  data: T[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
}
// -------------------------------------------------------------