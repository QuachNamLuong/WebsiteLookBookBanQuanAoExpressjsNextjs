"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ProductTable from "./(components)/(table)/product-table";

// Create a client instance outside the component to avoid re-creation on every render
// You might also put this in a separate Provider component for global use.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Set a short stale time to re-fetch product lists quickly when user interacts
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

export default function ProductsPage() {
  return (
    // Wrap the entire application or the specific section that uses TanStack Query
    <QueryClientProvider client={queryClient}>
      <div className="p-6 md:p-8">
        {/* Header Section */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Quản Lý Sản Phẩm
          </h1>
          <p className="text-muted-foreground">
            Xem, thêm, sửa, và xóa thông tin sản phẩm.
          </p>
        </header>

        {/* Main Content (The Table Component) */}
        <ProductTable />
      </div>
    </QueryClientProvider>
  );
}