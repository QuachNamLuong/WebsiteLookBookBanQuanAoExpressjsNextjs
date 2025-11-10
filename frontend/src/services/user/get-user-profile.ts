import api from "@/lib/axios";
import { HttpStatusCode } from "axios";

export type GetUserProfileResponse = {
  userId: string,
  username: string,
  email: string,
  role: string,
}

export const getUserProfile = async (userId: string) => {
  try {
    const res = await api.get<GetUserProfileResponse>(`/user/get-user-profile/${userId}`);
    if (res.status == HttpStatusCode.Ok) {
      return res.data;
    }
  } catch (error) {

  }
};
