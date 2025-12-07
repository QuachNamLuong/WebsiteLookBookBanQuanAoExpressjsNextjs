"use client";

import { UseMutationResult, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getProductById } from "../../(services)/get-product-by-id";


interface Product {
  productId: string;
  productName: string;
  quantity: number;
  price?: number;
  nameMeaning?: string;
  material?: string;
  style?: string;
  color?: string;
  usage?: string;
}

// 1. Define the Zod Schema for Validation (same as create, but used for updating)
const formSchema = z.object({
  productName: z.string().min(2, { message: "Tên sản phẩm phải có ít nhất 2 ký tự." }),
  quantity: z.number().min(1, { message: "Số lượng phải lớn hơn 0." }),
  price: z.number().min(1000, { message: "Giá phải lớn hơn 1,000 VND." }),
  nameMeaning: z.string().optional(),
  material: z.string().optional(),
  style: z.string().optional(),
  color: z.string().optional(),
  usage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Define the payload for updating a product (must include productId)
export interface UpdateProductPayload extends Partial<Product> {
  productId: string; // Required for identifying the record to update
}

// Define the structure of the mutation prop
export type UpdateProductMutation = UseMutationResult<
  any, // Success return type (can be Product or a confirmation message)
  Error,
  UpdateProductPayload, // Payload type
  unknown
>;

// 2. Define Component Props
interface UpdateProductFormProps {
  productId: string; // The ID of the product to fetch and update
  updateMutation: UpdateProductMutation;
}

// -------------------------------------------------------------------

export default function UpdateProductForm({ productId, updateMutation }: UpdateProductFormProps) {
  
  // 3. Fetch Existing Product Data
  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", productId], // Unique key for caching single product
    queryFn: () => getProductById(productId),
    enabled: !!productId, // Only run the query if productId is available
  });

  // 4. Initialize React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    // Reset form values whenever the product data changes/loads
    values: product ? {
      productName: product.productName,
      quantity: product.quantity,
      price: product.price ?? 0, // Handle optional price
      nameMeaning: product.nameMeaning ?? "",
      material: product.material ?? "",
      style: product.style ?? "",
      color: product.color ?? "",
      usage: product.usage ?? "",
    } : undefined, // Undefined means it will use default values until data loads
  });

  // 5. Submission Handler
  function onSubmit(values: FormValues) {
    const payload: UpdateProductPayload = {
        productId: productId,
        ...values,
    };
    
    updateMutation.mutate(payload, {
        onSuccess: () => {
             // Success toast is handled in ProductTable. Reset is often not needed
             // for update forms if the modal closes automatically or the data refetches.
        },
    });
  }

  // 6. Loading/Error States
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Lỗi: Không thể tải dữ liệu sản phẩm này.</p>;
  }


  // 7. Component Render
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* NOTE: Hidden ID Field (for debugging/reference, though not strictly necessary) */}
        <p className="text-xs text-muted-foreground">ID: {productId}</p>

        {/* Name and Quantity */}
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tên sản phẩm</FormLabel>
                        <FormControl><Input placeholder="Áo dài lụa trắng" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Số lượng</FormLabel>
                        <FormControl>
                            <Input 
                                type="number" 
                                placeholder="10" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        {/* Price */}
        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Giá (VND)</FormLabel>
                    <FormControl>
                        <Input 
                            type="number" 
                            placeholder="500000" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        
        {/* Optional Fields (Material & Color) */}
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Chất liệu</FormLabel>
                        <FormControl><Input placeholder="Lụa tơ tằm" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Màu sắc</FormLabel>
                        <FormControl><Input placeholder="Trắng ngà" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        {/* Optional Fields (Style & Usage) */}
        <div className="grid grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phong cách</FormLabel>
                        <FormControl><Input placeholder="Cổ điển" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="usage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sử dụng</FormLabel>
                        <FormControl><Input placeholder="Dự tiệc/Cưới" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        {/* Name Meaning (Textarea) */}
        <FormField
            control={form.control}
            name="nameMeaning"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Ý nghĩa tên (Mô tả)</FormLabel>
                    <FormControl><Textarea placeholder="Chiếc áo dài tượng trưng cho..." {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        
        <Button 
            type="submit" 
            className="w-full mt-6"
            disabled={updateMutation.isPending || isLoading}
        >
            {updateMutation.isPending ? 'Đang cập nhật...' : 'Cập nhật Sản Phẩm'}
        </Button>
      </form>
    </Form>
  );
}