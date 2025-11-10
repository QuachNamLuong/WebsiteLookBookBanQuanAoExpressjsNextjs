"use client";

import { startTransition, useEffect, useState } from "react";
import ProductItem from "./product-item";
import { ProductPagination } from "./product-pagination";
import { toast } from "sonner";
import { getPaginateProduct, Product } from "@/services/product/get-paginate-product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true);
      const data = await getPaginateProduct(page, perPage);
      toast.info(JSON.stringify(data))
      if (data) {
        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Không thể tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  return (
    <section className="py-16 px-6 md:px-12">
      <h2 className="text-center text-xl font-semibold mb-10">SẢN PHẨM</h2>

      {loading ? (
        <div className="text-center text-gray-500">Đang tải sản phẩm...</div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center text-gray-500">Không có sản phẩm nào.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6">
              {products.map((p) => (
                <div key={p.productId} className="flex justify-center">
                  <ProductItem product={p} />
                </div>
              ))}
            </div>
          )}

          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => startTransition(() => setCurrentPage(page))}
          />
        </>
      )}
    </section>
  );
}
