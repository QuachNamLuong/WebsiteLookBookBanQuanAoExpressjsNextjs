"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
import { 
  useQuery, 
  useMutation, 
  useQueryClient, 
  UseMutationResult, 
  keepPreviousData 
} from "@tanstack/react-query";

// --- UI Components & Utilities ---
import { Button } from "@/components/ui/button";
// ✅ CHANGED: Switched from Popover to Dialog components
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"; 
import DataTable from "./data-table";

// --- Services & Forms ---
import { deleteProduct } from "../../(services)/delete-product";
import { getPaginateProduct } from "../../(services)/get-paginate-product";
import { createProduct } from "../../(services)/create-product";
import { updateProduct } from "../../(services)/update-product";

// NOTE: Assuming your form types are now imported from a single source or defined robustly in the form files.
import CreateProductForm, { CreateProductMutation, CreateProductPayload } from "../(form)/create-product-form";
import UpdateProductForm, { UpdateProductMutation, UpdateProductPayload } from "../(form)/update-product-form"; 
// Note: Assuming UpdateProductPayload is exported from update-product-form.ts
import { Product, PaginatedResponse } from "../../(services)/types";

export default function ProductTable() {
  const queryClient = useQueryClient();
  
  // 1. STATE for Pagination and Filtering
  const [pageIndex, setPageIndex] = useState(0); 
  const [pageSize, setPageSize] = useState(10);
  const [globalFilter, setGlobalFilter] = useState('');

  const invalidateProductQueries = () => {
    // Invalidate queries including the current page state to trigger a refetch
    // NOTE: Invalidate queries with fewer arguments for broader cache invalidation
    queryClient.invalidateQueries({ queryKey: ["products"] }); 
  };

  // 2. Data Fetching (R - Read)
  const { data, isLoading, isError, isFetching } = useQuery<PaginatedResponse<Product>>({
    queryKey: ["products", pageIndex + 1, pageSize, globalFilter], 
    queryFn: async () => 
      await getPaginateProduct(pageIndex + 1, pageSize, { search: globalFilter }),
    placeholderData: keepPreviousData,
  });

  const products: Product[] = data?.data ?? [];

  // 3. Mutations (CUD - Create, Update, Delete)
  
  // Create Mutation (Signature looks correct)
  const createMutation: CreateProductMutation = useMutation<
    { productId: string }, 
    Error,
    CreateProductPayload, 
    unknown
  >({
    mutationFn: createProduct, 
    onSuccess: () => {
      invalidateProductQueries();
      toast.success("✅ Đã thêm sản phẩm mới!");
    },
    onError: () => toast.error("❌ Không thể thêm sản phẩm!"),
  });

  // ✅ FIX: Update Mutation - Explicitly defined generics to match UpdateProductMutation
  const updateMutation: UpdateProductMutation = useMutation<
    any, // TData (Success Return)
    Error, // TError
    UpdateProductPayload, // TVariables (Payload)
    unknown // TContext
  >({
    mutationFn: updateProduct, 
    onSuccess: () => {
      invalidateProductQueries();
      toast.success("📝 Đã cập nhật sản phẩm!");
    },
    onError: () => toast.error("❌ Không thể cập nhật sản phẩm!"),
  });

  // Delete Mutation (Signature looks correct as it only takes productId: string)
  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => await deleteProduct(productId),
    onSuccess: () => {
      invalidateProductQueries();
      toast.success("🗑️ Đã xóa sản phẩm!");
    },
    onError: () => toast.error("❌ Không thể xóa sản phẩm!"),
  });

  // 4. Column Definitions
  const columns: ColumnDef<Product>[] = [
    // ... Data Columns ...
    { accessorKey: "code", header: "Mã" },
    { accessorKey: "name", header: "Tên sản phẩm", enableGlobalFilter: true },
    { accessorKey: "price", header: "Giá" },
    { accessorKey: "stock", header: "Số lượng" }, 
    { accessorKey: "nameMean", header: "Ý nghĩa tên" }, 
    { accessorKey: "material", header: "Chất liệu" },
    { accessorKey: "color", header: "Màu sắc" },
    { accessorKey: "style", header: "Phong cách" },
    { accessorKey: "usage", header: "Sử dụng" },
    
    // --- Action Column ---
    {
      id: "actions",
      header: "Chức năng",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex gap-2">
            {/* ✅ CHANGED: Update Dialog instead of Popover */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">Sửa</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4/5">
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa sản phẩm: {product.name}</DialogTitle>
                </DialogHeader>
                <UpdateProductForm productId={product.id} updateMutation={updateMutation} />
              </DialogContent>
            </Dialog>

            {/* Delete Button */}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate(product.id)}
              disabled={deleteMutation.isPending}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  // 5. Conditional Rendering
  if (isLoading && !data) return <p>Đang tải sản phẩm...</p>;
  if (isError) return <p className="text-red-500">❌ Lỗi: Không thể tải sản phẩm!</p>;

  // 6. Component Render
  return (
    <div className="space-y-4">
      {/* Search Input (Global Filter) */}
      <div className="flex justify-between items-center">
        {/* Pass the search state down to the DataTable wrapper */}
        <input
          placeholder="Tìm kiếm sản phẩm..."
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          className="p-2 border rounded-md w-64"
        />

        {/* ✅ CHANGED: Create Product Dialog instead of Popover */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ Thêm sản phẩm</Button>
          </DialogTrigger>
          <DialogContent className="w-[500px]">
             <DialogHeader>
                <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            <CreateProductForm createMutation={createMutation} />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* The main DataTable component */}
      <DataTable 
        columns={columns} 
        data={products} 
        
        // --- Pagination & Metadata Props ---
        pageIndex={pageIndex} 
        pageSize={pageSize}
        pageCount={data?.totalPages ?? 0}
        totalRecords={data?.totalRecords ?? 0}
        
        // --- Handlers ---
        onPaginationChange={({ pageIndex, pageSize }) => {
          setPageIndex(pageIndex); 
          setPageSize(pageSize);
        }}
        
        // --- Status Indicators ---
        isLoading={isFetching} 
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
}