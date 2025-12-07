
import api  from "@/lib/axios"; 
import axios from "axios"; // Keep standard axios import for type checking (isAxiosError)
import { PaginatedResponse, Product } from "./types";

export async function getPaginateProduct(
  page: number,
  limit: number,
  filters: { search?: string } // Added filters object for completeness
): Promise<PaginatedResponse<Product>> {
  try {
    const res = await api.get<PaginatedResponse<Product>>( // Use 'api' instance
      "/products/get-products", 
      {
        params: { 
          page, 
          limit,
          search: filters.search,
        },
      }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) { // Use standard axios for type check
        console.error("API Error fetching products:", error.message);
    }
    throw new Error("Failed to fetch paginated products from API.");
  }
}