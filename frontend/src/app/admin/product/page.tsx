"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ProductTable from "@/components/table/product-table";

interface Product {
  productId: string;
  productName: string;
  quantity: number;
  price?: number;
}

interface PaginatedResponse {
  data: Product[];
  nextCursor: string | null;
  hasNextPage: boolean;
}

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!hasNextPage || loading) return;
    setLoading(true);

    try {
      const res = await axios.get<PaginatedResponse>(
        "http://localhost:3000/api/product",
        {
          params: { limit: 6, cursor },
        }
      );

      const { data, nextCursor, hasNextPage } = res.data;
      toast.info(data.toString())
      // Append new products to existing list
      setProducts((prev) => [...prev, ...data]);
      setCursor(nextCursor);
      setHasNextPage(hasNextPage);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load first page on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <ProductTable />
    </div>
  );
}
