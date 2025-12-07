"use client";

import { UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// --- Shadcn UI Components ---
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// --- Type Definitions (Ensure these match your service definitions) ---

// 1. Define the Zod Schema for Validation
const formSchema = z.object({
    productName: z.string().min(2, { message: "Tên sản phẩm phải có ít nhất 2 ký tự." }),
    quantity: z.number().min(1, { message: "Số lượng phải lớn hơn 0." }),
    price: z.number(),
    nameMeaning: z.string().optional(),
    material: z.string().optional(),
    style: z.string().optional(),
    color: z.string().optional(),
    usage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// 2. Define Mutation Types
// Define the arguments the mutation function accepts
export interface CreateProductPayload {
    productName: string;
    quantity: number;
    price?: number;
    nameMeaning?: string;
    material?: string;
    style?: string;
    color?: string;
    usage?: string;
}

// Define the return type of the mutation function
export interface CreateProductResult {
    productId: string;
}

// The exact type definition for the mutation prop
export type CreateProductMutation = UseMutationResult<
    CreateProductResult,
    Error,
    CreateProductPayload,
    unknown
>;

// 3. Define Component Props
interface CreateProductFormProps {
    createMutation: CreateProductMutation;
}

// -------------------------------------------------------------------

export default function CreateProductForm({ createMutation }: CreateProductFormProps) {

    // 4. Initialize React Hook Form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
            quantity: 1,
            price: 100000,
            nameMeaning: "",
            material: "",
            style: "",
            color: "",
            usage: "",
        },
    });

    // 5. Submission Handler
    function onSubmit(values: FormValues) {
        // Cast FormValues to the required payload type (Zod ensures type safety)
        const payload: CreateProductPayload = {
            ...values
        };

        createMutation.mutate(payload, {
            onSuccess: (data) => {
                // Success toast is handled in ProductTable, but we can add form-specific action here
                toast.success(`Sản phẩm "${values.productName}" đã được tạo.`);
                form.reset(); // Clear the form after successful submission
                // NOTE: If you need to close the Dialog, you would manage its open state here
            },
            onError: () => {
                // Error toast is handled in ProductTable
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 float">

                {/* Name and Quantity (Required) */}
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên sản phẩm</FormLabel>
                                <FormControl>
                                    <Input placeholder="Áo dài lụa trắng" {...field} />
                                </FormControl>
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
                                    {/* Ensure type="number" is used and managed */}
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

                {/* Price (Required) */}
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

                {/* Optional Fields */}
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

                {/* Name Meaning (Textarea for larger optional text) */}
                <FormField
                    control={form.control}
                    name="nameMeaning"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ý nghĩa tên (Mô tả)</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Chiếc áo dài tượng trưng cho..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full mt-6"
                    disabled={createMutation.isPending}
                >
                    {createMutation.isPending ? 'Đang tạo...' : 'Tạo Sản Phẩm'}
                </Button>
            </form>
        </Form>
    );
}