import api from "@/lib/axios";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetMeResponse {
  user: {
    userId: string;
  };
}

export const getMe = async () => {
  try {
    const res = await api.get<GetMeResponse>(`${API_URL}/auth/me`);
    if (res.status == HttpStatusCode.Ok) {
      console.log(JSON.stringify(res.data))
      return res.data;
    }
  } catch (error) {
    toast.error("Lấy chi tiết sản phẩm thất bại");
  }

};
