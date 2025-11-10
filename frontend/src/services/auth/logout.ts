import api from "@/lib/axios";
import { isLogin } from "@/utils/auth";
import { HttpStatusCode } from "axios";

export const logout = async () => {
  try {
    const res = await api.post(`/auth/logout`);
    if (res.status == HttpStatusCode.Ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
