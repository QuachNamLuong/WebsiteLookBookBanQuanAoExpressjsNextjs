import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

export type ProductImage = {
  href: string;
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

export type CartItemData = {
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
  cartItems: CartItemData[];
  total: number
};

export const getCartDetail = async () => {
  try {
    const res = await api.get<CartDetailResponse>(`/carts/user-cart`);
    if (res.status === HttpStatusCode.Ok) {
      toast.info(JSON.stringify(res.data));
      return res.data;
    }
  } catch (error) {

  }
};