import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { getMe } from "../auth/me";
import { refreshToken } from "../auth/refresh-token";

export enum RemoveProductInCartEnum {
  NOT_AUTHORIZED,
  OK,
  FETCH_FAIL,
}

export const removeProductInCart = async (
  productId: string
): Promise<RemoveProductInCartEnum | undefined> => {
  const res = await fetch(`/api/carts/${productId}`, { method: "DELETE" });
  if (res.ok) {
    return res.json();
  }
  return;
};
