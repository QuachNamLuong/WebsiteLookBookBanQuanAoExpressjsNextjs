import api from "@/lib/axios";
import { HttpStatusCode } from "axios";

export type ProductImage = {
  productImageUrl: string;
};

export type Product = {
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  material: string;
  color: string;
  nameMeaning: string;
  style: string;
  usage: string;
  productImage: ProductImage[];
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  cartId: string;
  product: Product;
};

export type CartDetailResponse = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  userId: string;
  cartItems: CartItem[];
};

export const getCartDetail = async (userId: string) => {
  try {
    const res = await api.get<CartDetailResponse>(`/cart/${userId}`);
    if (res.status === HttpStatusCode.Ok) {
      return res.data;
    }
  } catch (error) {

  }
};