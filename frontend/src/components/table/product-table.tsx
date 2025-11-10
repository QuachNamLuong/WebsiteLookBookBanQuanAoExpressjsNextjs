"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CreateProductForm from "../form/create-product-form";
import UpdateProductForm from "../form/update-product-form";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import { deleteProduct } from "@/services/product/delete-product";
import { getPaginateProduct } from "@/services/product/get-paginate-product";
import { createProduct } from "@/services/product/create-product";
import { updateProduct } from "@/services/product/update-product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Product = {
  productId: string;
  productName: string;
  quantity: number;
  price?: number;
};

export default function ProductTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getPaginateProduct(1, 10),
  });

  const products: Product[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => await deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Đã xóa sản phẩm!");
    },
    onError: () => toast.error("Không thể xóa sản phẩm!"),
  });

  const columns: ColumnDef<Product>[] = [
    { accessorKey: "productId", header: "ID" },
    { accessorKey: "productName", header: "Tên sản phẩm" },
    { accessorKey: "price", header: "Giá" },
    { accessorKey: "quantity", header: "Số lượng" },
    {
      accessorKey: "functions",
      header: "Chức năng",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex gap-2">
            {/* Update */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Sửa</Button>
              </PopoverTrigger>
              <PopoverContent>
                <UpdateProductForm productId={product.productId} />
              </PopoverContent>
            </Popover>

            {/* Delete */}
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate(product.productId)}
              disabled={deleteMutation.isPending}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  // =============================
  // UI
  // =============================
  if (isLoading) return <p>Đang tải sản phẩm...</p>;
  if (isError) return <p className="text-red-500">Không thể tải sản phẩm!</p>;

  return (
    <div className="space-y-4">
      {/* Create Product */}
      <Popover>
        <PopoverTrigger asChild>
          <Button>Thêm sản phẩm</Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px]">
          <CreateProductForm />
        </PopoverContent>
      </Popover>

      <DataTable columns={columns} data={products} />
    </div>
  );
}