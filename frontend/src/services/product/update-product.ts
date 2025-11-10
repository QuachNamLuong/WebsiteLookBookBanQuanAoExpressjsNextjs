import api from "@/lib/axios";
import { HttpStatusCode } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ImageUpload {
  file?: File;
  productImageUrl?: string;
  objectName?: string;
  isDeleted: boolean;
}

export interface UpdateProductPayload {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  existingImages?: ImageUpload[];
  sizes: string[];
  nameMean: string;
  material: string;
  style: string;
  color: string;
  usage: string;
  newImages?: ImageUpload[];
  deletedImages?: string[];
}

export const updateProduct = async (payload: UpdateProductPayload) => {
  const formData = new FormData();

  formData.append("productName", payload.productName);
  formData.append("price", payload.price.toString());
  formData.append("quantity", payload.quantity.toString());
  formData.append("nameMean", payload.nameMean);
  formData.append("material", payload.material);
  formData.append("style", payload.style);
  formData.append("color", payload.color);
  formData.append("usage", payload.usage);

  payload.sizes.forEach((size) => {
    formData.append("sizes", size);
  });

  // 🖼️ Add new images to upload
  payload.newImages?.forEach((img) => {
    if (img.file) {
      formData.append("images", img.file, img.file.name);
    }
  });

  payload.deletedImages?.forEach((objectName) => {
    formData.append("deletedImages", objectName);
  });

  const res = await api.put(`${API_URL}/product/${payload.productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (res.status === HttpStatusCode.Ok) {
    return true;
  }

  return false;
};