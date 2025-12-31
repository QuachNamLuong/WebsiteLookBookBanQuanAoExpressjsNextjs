"use client";

import {
  UseMutationResult,
  useQuery,
  useMutation,
  dataTagErrorSymbol,
} from "@tanstack/react-query";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
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
import type { Product } from "../../(services)/types";
import { ArrowDown, ArrowUp, X, Plus, UploadCloud } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { ProductCategoryCombobox } from "../product-category-combobox";

// -------------------------------------------------------------------
// 1. SCHEMA & TYPES
// -------------------------------------------------------------------

const imageSchema = z.object({
  id: z.string().optional(),
  href: z.string().url().or(z.literal("")).optional(), // URL cuối cùng sau khi upload
  order: z.number().int().min(0),
  file: z.any().optional(), // File object (tạm thời)
  previewUrl: z.string().optional(), // URL tạm thời cho preview
});

const formSchema = z.object({
  // Đặt lại các trường cốt lõi là bắt buộc (min(1))
  code: z.string().min(1, "Mã không được để trống"),
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  stock: z.number().min(0, "Số lượng không hợp lệ"),
  price: z.number().min(1, "Giá phải lớn hơn 0"),
  nameMean: z.string().optional(),
  material: z.string().optional(),
  style: z.string().optional(),
  color: z.string().optional(),
  usage: z.string().optional(),
  images: z.array(imageSchema).optional(),
  productCategoryId: z.number(),
});

type FormValues = z.infer<typeof formSchema>;

export interface UpdateProductPayload extends Partial<Product> {
  productId: string;
}

export type UpdateProductMutation = UseMutationResult<
  any,
  Error,
  UpdateProductPayload,
  unknown
>;

interface UpdateProductFormProps {
  productId: string;
  updateMutation: UpdateProductMutation;
}

// -------------------------------------------------------------------
// 2. API STUBS (GIẢ LẬP TƯƠNG TÁC TỨC THÌ)
// -------------------------------------------------------------------

async function uploadImageApi(
  file: File,
  productId: string,
): Promise<{ url: string; imageId: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/product-images/${productId}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  const data = await res.json();

  return { imageId: data.id, url: data.url };
}

async function deleteImageApi(imageId: string) {
  console.log(`[API CALL] Deleting image ID: ${imageId}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
}
async function changeImageOrderApi(
  productId: string,
  imageId: string,
  newOrder: number,
) {
  console.log(`[API CALL] Changing order of image ${imageId} to ${newOrder}`);
  await new Promise((resolve) => setTimeout(resolve, 500));
}

// -------------------------------------------------------------------
// 3. COMPONENT CON: ImageUploadControl
// -------------------------------------------------------------------

interface ImageUploadControlProps {
  currentFile?: File;
  currentUrl?: string;
  onChange: (file?: File, previewUrl?: string) => void;
  isUploading?: boolean; // Thêm props này để disabled UI khi đang upload
}

const ImageUploadControl: React.FC<ImageUploadControlProps> = ({
  currentFile,
  currentUrl,
  onChange,
  isUploading = false,
}) => {
  const inputId = `file-upload-${Math.random().toString(36).substring(2, 9)}`;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onChange(file, previewUrl);
    }
    event.target.value = ""; // Reset input để cho phép chọn lại file tương tự
  };

  // Xử lý khi người dùng nhấn nút Hủy/Xóa file
  const handleRemoveFile = () => {
    onChange(undefined, undefined);
  };

  return (
    <div className="relative w-full">
      <input
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />
      <label
        htmlFor={inputId}
        className={`flex items-center justify-center p-2 rounded-md transition-colors text-sm cursor-pointer ${
          isUploading
            ? "bg-gray-200 text-gray-500"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
      >
        <UploadCloud className="h-4 w-4 mr-2" />
        {isUploading
          ? "Đang tải..."
          : currentUrl || currentFile
            ? "Thay thế Ảnh"
            : "Chọn Ảnh Upload"}
      </label>
      {(currentUrl || currentFile) && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleRemoveFile}
          className="mt-1 w-full text-red-500 hover:text-red-600"
          disabled={isUploading}
        >
          Hủy chọn / Xóa khỏi form
        </Button>
      )}
    </div>
  );
};

// -------------------------------------------------------------------
// 4. COMPONENT CHÍNH: UpdateProductForm
// -------------------------------------------------------------------

export default function UpdateProductForm({
  productId,
  updateMutation,
}: UpdateProductFormProps) {
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "", // string
      name: "", // string
      stock: 0, // number
      price: 0, // number
      nameMean: "", // string
      material: "", // string
      style: "", // string
      color: "", // string
      usage: "", // string
      images: [], // array
    },
    values: product
      ? {
          code: product.code,
          name: product.name,
          stock: product.stock,
          price: Number(product.price ?? 1),
          nameMean: product.nameMean ?? "",
          material: product.material ?? "",
          style: product.style ?? "",
          color: product.color ?? "",
          usage: product.usage ?? "",
          productCategoryId: product.productCategoryId ?? -1,
          // ✅ KHỞI TẠO MẢNG IMAGES TỪ DỮ LIỆU FETCH
          images:
            product.productImages
              ?.map((img) => ({
                ...img,
                order: img.order || 0,
                previewUrl: img.url, // URL từ DB dùng làm preview ban đầu
                file: undefined,
              }))
              .sort((a, b) => a.order - b.order) || [],
        }
      : undefined,
  });

  const { fields, append, remove, move, update } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const watchedImages = useWatch({
    control: form.control,
    name: "images",
    defaultValue: [],
  }) as FormValues["images"];

  // Kiểm tra xem có slot nào đã chọn file nhưng chưa upload (không có url)
  const hasUnuploadedSlot = watchedImages?.some(
    (item) => !item?.href && !!item?.file,
  );

  // --- LOGIC TƯƠNG TÁC TỨC THÌ (Dùng useMutation) ---
  const uploadImageMutation = useMutation({
    mutationFn: ({ file, productId }: { file: File; productId: string }) =>
      uploadImageApi(file, productId),
  });

  // Hàm xử lý upload file được chọn ngay lập tức
  const handleUploadFile = async (
    file: File,
    index: number,
    currentImageId?: string,
  ) => {
    setIsUploading(true);
    toast.loading(`Đang tải ảnh ${file.name} lên...`, { id: "upload" + index });

    try {
      if (currentImageId) await deleteImageApi(currentImageId);

      const { url, imageId } = await uploadImageMutation.mutateAsync({
        file,
        productId,
      });

      update(index, {
        ...watchedImages[index]!,
        url: url,
        id: imageId,
        file: undefined,
        previewUrl: url,
      });

      toast.success(`Tải ảnh ${file.name} lên thành công.`, {
        id: "upload" + index,
      });
    } catch (error: any) {
      toast.error(`Lỗi tải ảnh lên: ${error.message}`, {
        id: "upload" + index,
      });
      update(index, {
        ...watchedImages[index]!,
        file: undefined,
        previewUrl: watchedImages[index]?.url,
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Hàm xử lý XÓA ảnh (gọi API xóa và xóa khỏi form)
  const handleRemoveImage = (index: number, imageId?: string) => {
    remove(index);
    if (imageId) {
      toast.promise(deleteImageApi(imageId), {
        loading: "Đang xóa ảnh...",
        success: "Xóa ảnh thành công.",
        error: (err) => `Lỗi xóa ảnh: ${err.message}`,
      });
    }
  };

  // Hàm xử lý DI CHUYỂN ảnh (gọi API thay đổi thứ tự và di chuyển trong form)
  const handleMoveImage = (from: number, to: number, imageId?: string) => {
    move(from, to);
    if (imageId) {
      toast.promise(changeImageOrderApi(productId, imageId, to), {
        loading: "Đang cập nhật thứ tự...",
        success: "Cập nhật thứ tự thành công.",
        error: (err) => `Lỗi cập nhật thứ tự: ${err.message}`,
      });
    }
  };

  // 5. Submission Handler (Chỉ update metadata)
  function onSubmit(values: FormValues) {
    if (hasUnuploadedSlot || isUploading) {
      toast.error(
        "Vui lòng đợi upload hoàn tất hoặc xóa các ô ảnh chưa upload.",
      );
      return;
    }

    const payload: UpdateProductPayload = {
      productId: productId,
      name: values.name,
      stock: values.stock,
      price: values.price,
      nameMean: values.nameMean,
      material: values.material,
      style: values.style,
      color: values.color,
      usage: values.usage,
      productCategoryId: values.productCategoryId,
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Cập nhật sản phẩm thành công.");
        refetch();
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
    return (
      <p className="text-red-500">Lỗi: Không thể tải dữ liệu sản phẩm này.</p>
    );
  }

  // 7. Component Render
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-xs text-muted-foreground">ID: {productId}</p>

        {/* --- Metadata Fields --- */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã</FormLabel>
                <div className="flex h-10 w-full rounded-md border border-input bg-gray-100 px-3 py-2 text-sm text-gray-700">
                  {field.value}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="productCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Danh mục sản phẩm</FormLabel>
                <FormControl>
                  <ProductCategoryCombobox
                    onChange={(value) => {
                      field.onChange(value);
                      field.onBlur(); 
                    }}
                    postCategoryId={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
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
            name="stock"
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
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? parseInt(value) : 0);
                    }}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chất liệu</FormLabel>
                <FormControl>
                  <Input placeholder="Lụa tơ tằm" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="Trắng ngà" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="Cổ điển" {...field} />
                </FormControl>
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
                <FormControl>
                  <Input placeholder="Dự tiệc/Cưới" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="nameMean"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ý nghĩa tên (Mô tả)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Chiếc áo dài tượng trưng cho..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 7. KHU VỰC QUẢN LÝ DANH SÁCH ẢNH */}
        {/* ------------------------------------------------- */}
        <section className="space-y-3 border p-4 rounded-md">
          <h3 className="text-lg font-semibold">Quản lý Hình ảnh</h3>

          <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
            {fields.map((field, index) => {
              const currentImage = watchedImages?.[index];
              const isCurrentUploading = isUploading && currentImage?.file;

              const previewUrl = currentImage?.previewUrl;

              return (
                <div
                  key={field.id}
                  className="flex items-start space-x-2 border p-2 rounded-md"
                >
                  {/* Image Thumbnail */}
                  <div className="w-16 h-16 flex-shrink-0">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={`Ảnh ${index + 1}`}
                        className={`w-full h-[100px] object-full rounded ${isCurrentUploading ? "opacity-50" : ""}`}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                        Ảnh {index + 1}
                      </div>
                    )}
                  </div>

                  {/* Upload Control */}
                  <div className="flex-grow">
                    <ImageUploadControl
                      currentFile={currentImage?.file}
                      currentUrl={currentImage?.url}
                      isUploading={isCurrentUploading}
                      onChange={(file, previewUrl) => {
                        // Xử lý logic File/URL
                        if (file) {
                          // B1: Cập nhật file và preview tạm thời
                          update(index, {
                            ...currentImage!,
                            file: file,
                            previewUrl: previewUrl,
                            url: currentImage?.url || undefined, // Giữ URL cũ nếu có
                          });
                          // B2: Gọi hàm upload ngay lập tức
                          handleUploadFile(file, index, currentImage?.id);
                        } else {
                          // Xóa file (nhấn Hủy hoặc Xóa file đã chọn)
                          if (currentImage?.id) {
                            handleRemoveImage(index, currentImage.id);
                          } else {
                            remove(index); // Xóa khỏi form state nếu chưa có ID
                          }
                        }
                      }}
                    />
                  </div>

                  {/* Order and Remove Buttons */}
                  <div className="flex flex-col space-y-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={
                        index === 0 || isUploading || !currentImage?.url
                      }
                      onClick={() =>
                        handleMoveImage(index, index - 1, currentImage?.id)
                      }
                      title="Chuyển lên"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={
                        index === fields.length - 1 ||
                        isUploading ||
                        !currentImage?.url
                      }
                      onClick={() =>
                        handleMoveImage(index, index + 1, currentImage?.id)
                      }
                      title="Chuyển xuống"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveImage(index, currentImage?.id)}
                      disabled={isUploading}
                      title="Xóa ảnh"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nút Thêm Ảnh Mới */}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isUploading || hasUnuploadedSlot}
            onClick={() =>
              append({
                url: "",
                order: watchedImages ? watchedImages.length : 0,
              })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm Ảnh Mới
          </Button>
        </section>

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={
            updateMutation.isPending ||
            isLoading ||
            isUploading ||
            hasUnuploadedSlot
          }
        >
          {updateMutation.isPending ? "Đang cập nhật..." : "Cập nhật Sản Phẩm"}
        </Button>
      </form>
    </Form>
  );
}
