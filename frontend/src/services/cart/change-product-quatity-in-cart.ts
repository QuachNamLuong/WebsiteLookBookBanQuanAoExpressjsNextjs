import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { getMe } from "../auth/me";
import { refreshToken } from "../auth/refresh-token";

export enum ChangeProductQuntityInCartEnum {
  NOT_AUTHORIZED,
  OK,
  FETCH_FAIL,
}

export const changeProductQuntityInCart = async (
  productId: string, quantity: number
): Promise<ChangeProductQuntityInCartEnum> => {
  try {
    let meRes = await getMe();
    if (!meRes) {
      const refreshTokenRes = await refreshToken();
      if (!refreshTokenRes) return ChangeProductQuntityInCartEnum.NOT_AUTHORIZED;
      meRes = await getMe();
      if (!meRes) return ChangeProductQuntityInCartEnum.NOT_AUTHORIZED;
    }

    const userId = meRes.user.userId;
    const res = await api.put(`/cart/change-product-quantity`, {userId, productId, quantity});

    if (res.status === HttpStatusCode.Ok) {
      return ChangeProductQuntityInCartEnum.OK;
    }

    return ChangeProductQuntityInCartEnum.FETCH_FAIL;
  } catch (error) {
    return ChangeProductQuntityInCartEnum.FETCH_FAIL;
  }
};
