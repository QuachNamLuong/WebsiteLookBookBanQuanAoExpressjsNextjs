import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { refreshToken } from "./refresh-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetMeResponse {
  user: {
    userId: string;
  };
}

export const getMe = async () => {
  try {
    const res = await api.get<GetMeResponse>(`/auth/me`);
    if (res.status === HttpStatusCode.Ok) {
      return res.data;
    }

    if (res.status === HttpStatusCode.Unauthorized) {
      const isRefeshSuccess = await refreshToken();
      if (isRefeshSuccess) {
        const res = await api.get<GetMeResponse>(`/auth/me`);
        if (res.status === HttpStatusCode.Ok) {
          return res.data;
        }
      }
    }
  } catch (error) {
    toast.error("Lấy chi tiết sản phẩm thất bại");
  }

};
