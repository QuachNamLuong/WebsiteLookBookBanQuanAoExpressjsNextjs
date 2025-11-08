import api from "@/lib/axios";
import { HttpStatusCode } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteProduct = async (productId: string) => {
  const res = await api.delete(`${API_URL}/product/${productId}`);
  if (res.status == HttpStatusCode.Ok) {
    return true;
  }
  return false;
};
