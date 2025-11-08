import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { getMe } from "../auth/me";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addProductToCart = async (productId: string) => {
  try {
    const meRes = await getMe();
    if (!meRes) return false;
    const userId = meRes.user.userId;
    const res = await api.post(`${API_URL}/cart`, {
      userId,
      productId,
    });

    if (res.status === HttpStatusCode.Ok) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};