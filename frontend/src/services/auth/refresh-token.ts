import api from "@/lib/axios";
import { HttpStatusCode } from "axios";

export const refreshToken = async () => {
  try {
    const res = await api.post(`/auth/refresh-token`);
    if (res.status === HttpStatusCode.Ok) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
