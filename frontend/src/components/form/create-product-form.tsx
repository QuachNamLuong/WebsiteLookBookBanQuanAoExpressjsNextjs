"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { createProduct } from "@/lib/services/product/create-product";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function CreateProductForm() {
  const queryClient = useQueryClient();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [images, setImages] = useState<(File | undefined)[]>([undefined]);
  const [nameMean, setNameMean] = useState("");
  const [material, setMaterial] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [usage, setUsage] = useState("");
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // ✅ Mutation for creating product
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: {
      productName: string;
      price: number;
      quantity: number;
      images?: File[];
      sizes: string[];
      nameMean: string;
      material: string;
      style: string;
      color: string;
      usage: string
    }) => await createProduct(
      payload.productName,
      payload.price,
      payload.quantity,
      payload.sizes,
      payload.nameMean,
      payload.material,
      payload.style,
      payload.color,
      payload.usage,
      payload.images
    ),
    onSuccess: async () => {
      toast.success("Tạo sản phẩm thành công!");
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      resetForm();
    },
    onError: () => {
      toast.error("Không thể tạo sản phẩm!");
    },
  });

  const handleImageChange = (index: number, file?: File) => {
    if (!file) return;
    const newImages = [...images];
    newImages[index] = file;

    // Add new empty slot if it's the last image
    if (index === images.length - 1) {
      newImages.push(undefined);
    }

    setImages(newImages);
  };

  // ✅ Handle delete image
  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Reset form after submit
  const resetForm = () => {
    setProductName("");
    setPrice(0);
    setQuantity(0);
    setImages([undefined]);
  };

  // ✅ Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validImages = images.filter(Boolean) as File[];
    const payload = { productName, price, quantity, images: validImages, sizes: selectedSizes, usage, nameMean, color, material, style };
    await mutateAsync(payload);
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  useEffect(() => {
    setImages([undefined]);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 overflow-y-auto max-h-[400px] pr-2 flex flex-col"
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel>Tên sản phẩm</FieldLabel>
            <input
              type="text"
              placeholder="Nhập tên sản phẩm"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </Field>

          <Field>
            <FieldLabel>Giá</FieldLabel>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="border p-2 w-full rounded"
            />
          </Field>

          <Field>
            <FieldLabel>Số lượng</FieldLabel>
            <input
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="border p-2 w-full rounded"
            />
          </Field>

          <Field>
            <FieldLabel>Ý nghĩa tên</FieldLabel>
            <input
              type="text"
              placeholder="Nhập ý nghĩa tên"
              value={nameMean}
              onChange={(e) => setNameMean(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </Field>

          <Field>
            <FieldLabel>Chất liệu</FieldLabel>
            <input
              type="text"
              placeholder="Nhập chất liệu"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </Field>

          <Field>
            <FieldLabel>Kiểu dáng</FieldLabel>
            <input
              type="text"
              placeholder="Nhập kiểu dáng"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </Field>

          <Field>
            <FieldLabel>Màu sắc</FieldLabel>
            <input
              type="text"
              placeholder="Nhập màu sắc"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </Field>

          <Field>
            <FieldLabel>Ứng dụng</FieldLabel>
            <input
              type="text"
              placeholder="Nhập ứng dụng"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </Field>

          <Field>
            <FieldLabel>Kích thước</FieldLabel>
            <div className="flex flex-row gap-4">
              {sizes.map((size) => (
                <div key={size} className="flex items-center gap-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={selectedSizes.includes(size)}
                    onCheckedChange={() => toggleSize(size)}
                  />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </Field>

          <Field>
            <FieldLabel>Ảnh sản phẩm</FieldLabel>
            <div className="flex gap-2 flex-wrap">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded overflow-hidden"
                >
                  {img ? (
                    <>
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 z-50"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 cursor-pointer">
                      +
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleImageChange(index, e.target.files?.[0])}
                  />
                </div>
              ))}
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Đang tạo..." : "Tạo sản phẩm"}
      </Button>
    </form>
  );
}
