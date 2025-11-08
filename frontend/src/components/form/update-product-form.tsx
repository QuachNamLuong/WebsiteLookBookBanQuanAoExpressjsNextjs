"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { getProductDetail } from "@/lib/services/product/get-product-detail";
import { updateProduct } from "@/lib/services/product/update-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface ImageUpload {
  file?: File;
  productImageUrl?: string;
  objectName?: string;
  isDeleted: boolean;
}

interface UpdateProductFormProps {
  productId: string;
}

export default function UpdateProductForm({ productId }: UpdateProductFormProps) {
  const queryClient = useQueryClient();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [images, setImages] = useState<ImageUpload[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [nameMean, setNameMean] = useState("");
  const [material, setMaterial] = useState("");
  const [style, setStyle] = useState("");
  const [color, setColor] = useState("");
  const [usage, setUsage] = useState("");
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const [selectedSizes, setSelectedSizes] = useState<{ id: number, size: string }[]>([]);

  const toggleSize = (size: string) => {
    if (selectedSizes.some((s) => s.size == size)) {
      setSelectedSizes(selectedSizes.filter((s) => s.size !== size));
    } else {
      setSelectedSizes([...selectedSizes, { id: 0, size }]);
    }
  };

  // ✅ Mutation for updating product
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: any) => await updateProduct(payload),
    onSuccess: async () => {
      toast.success("Cập nhật sản phẩm thành công!");
      // invalidate product table cache
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Không thể cập nhật sản phẩm!");
    },
  });

  // ✅ Fetch product detail when opening form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingData(true);
        const productDetail = await getProductDetail(productId);
        if (!productDetail) {
          toast.error("Không thể tải thông tin sản phẩm!");
          return;
        }

        setProductName(productDetail.productName || "");
        setPrice(productDetail.price || 0);
        setQuantity(productDetail.quantity || 0);
        setNameMean(productDetail.nameMeaning);
        setMaterial(productDetail.material);
        setStyle(productDetail.style);
        setColor(productDetail.color);
        setUsage(productDetail.usage);
        setSelectedSizes(productDetail.productSizes);

        const productImages: ImageUpload[] =
          productDetail.productImage?.map((img: any) => ({
            productImageUrl: img.productImageUrl,
            objectName: img.objectName,
            isDeleted: false,
          })) || [];

        setImages([...productImages, { isDeleted: false }]);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải sản phẩm!");
      } finally {
        setLoadingData(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageChange = (index: number, file?: File) => {
    if (!file) return;
    const newImages = [...images];
    newImages[index] = { file, isDeleted: false };

    if (index === images.length - 1) newImages.push({ isDeleted: false });
    setImages(newImages);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      const target = updated[index];

      // 🧩 If it's a new image (not uploaded yet), remove it completely
      if (target.file && !target.productImageUrl) {
        updated.splice(index, 1);
      } else {
        // 🧩 If it's an existing image, just toggle isDeleted
        updated[index] = { ...target, isDeleted: !target.isDeleted };
      }

      // 🧩 Ensure there's always an empty slot at the end
      if (updated.length === 0 || updated[updated.length - 1].file || updated[updated.length - 1].productImageUrl) {
        updated.push({ isDeleted: false });
      }

      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const existingImages = images.filter(
      (img) => img.productImageUrl && !img.isDeleted
    );


    const newImages = images.filter((img) => img.file && !img.isDeleted);


    const deletedImages = images
      .filter((img) => img.isDeleted && img.objectName)
      .map((img) => img.objectName);

    const payload = {
      productId,
      productName,
      price,
      quantity,
      existingImages,
      newImages,
      deletedImages,
      sizes: selectedSizes.map(({id, size}) => size),
      nameMean,
      material,
      style,
      color,
      usage
    };

    await mutateAsync(payload);
  };

  if (loadingData) {
    return <p className="text-sm text-gray-500">Đang tải dữ liệu sản phẩm...</p>;
  }

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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="border p-2 w-full rounded"
              placeholder="Nhập tên sản phẩm"
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
                    checked={selectedSizes.some((s) => s.size == size)}
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
                  style={img.isDeleted ? { display: "none" } : undefined}
                >
                  {(img.file || img.productImageUrl) ? (
                    <>
                      <img
                        src={
                          img.file
                            ? URL.createObjectURL(img.file)
                            : img.productImageUrl!
                        }
                        alt={`Preview ${index}`}
                        className={`w-full h-full object-cover ${img.isDeleted ? "opacity-30" : ""
                          }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(index)}
                        className={`absolute top-1 right-1 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs z-50 ${img.isDeleted
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-500 hover:bg-red-600"
                          }`}
                      >
                        {img.isDeleted ? "↺" : "x"}
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 cursor-pointer text-xl font-bold">
                      +
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) =>
                      handleImageChange(index, e.target.files?.[0])
                    }
                  />
                </div>
              ))}
            </div>
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Đang cập nhật..." : "Cập nhật sản phẩm"}
      </Button>
    </form>
  );
}
