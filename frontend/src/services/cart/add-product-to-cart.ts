import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { getMe } from "../auth/me";
import { refreshToken } from "../auth/refresh-token";

export enum AddProductToCartEnum {
  NOT_AUTHORIZED,
  OK,
  FETCH_FAIL,
}

export const addProductToCart = async (
  productId: string
): Promise<AddProductToCartEnum> => {
  try {
    let meRes = await getMe();
    if (!meRes) {
      const refreshTokenRes = await refreshToken();
      if (!refreshTokenRes) return AddProductToCartEnum.NOT_AUTHORIZED;
      meRes = await getMe();
      if (!meRes) return AddProductToCartEnum.NOT_AUTHORIZED;
    }

    const userId = meRes.user.userId;
    const res = await api.post(`/cart`, {
      userId,
      productId,
    });

    if (res.status === HttpStatusCode.Ok) {
      return AddProductToCartEnum.OK;
    }

    return AddProductToCartEnum.FETCH_FAIL;
  } catch (error) {
    return AddProductToCartEnum.FETCH_FAIL;
  }
};
