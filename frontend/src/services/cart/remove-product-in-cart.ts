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
): Promise<RemoveProductInCartEnum> => {
  try {
    let meRes = await getMe();
    if (!meRes) {
      const refreshTokenRes = await refreshToken();
      if (!refreshTokenRes) return RemoveProductInCartEnum.NOT_AUTHORIZED;
      meRes = await getMe();
      if (!meRes) return RemoveProductInCartEnum.NOT_AUTHORIZED;
    }

    const userId = meRes.user.userId;
    const res = await api.delete(`/cart/${userId}/${productId}`);

    if (res.status === HttpStatusCode.Ok) {
      return RemoveProductInCartEnum.OK;
    }

    return RemoveProductInCartEnum.FETCH_FAIL;
  } catch (error) {
    return RemoveProductInCartEnum.FETCH_FAIL;
  }
};
