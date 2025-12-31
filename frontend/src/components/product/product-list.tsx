"use client";

import { startTransition, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductItem from "./product-item";
import { ProductPagination } from "./product-pagination";
import { toast } from "sonner";
import {
  getPaginateProduct,
  Product,
} from "@/services/product/get-paginate-product";

type ProductListProps = {
  category?: string;
  slug?: string;
};

const PER_PAGE = 10;

export default function ProductList({ category, slug }: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", category, currentPage],
    queryFn: () => getPaginateProduct(currentPage, PER_PAGE, slug),
    placeholderData: keepPreviousData,
  });

  if (isError) {
    toast.error("Không thể tải sản phẩm");
  }

  const products: Product[] = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  return (
    <section className="py-16 px-6 md:px-12">
      {slug ? <h2 className="text-center text-xl font-semibold mb-10">{`BỘ SƯU TẬP`}</h2> : <h2 className="text-center text-xl font-semibold mb-10">SẢN PHẨM</h2>}

      {isLoading ? (
        <div className="text-center text-gray-500">Đang tải sản phẩm...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">Không có sản phẩm nào.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6">
            {products.map((p) => (
              <div key={p.id} className="flex justify-center">
                <ProductItem product={p} />
              </div>
            ))}
          </div>
          {slug === undefined ? (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) =>
                startTransition(() => setCurrentPage(page))
              }
            />
          ) : (
            <></>
          )}
        </>
      )}
    </section>
  );
}
