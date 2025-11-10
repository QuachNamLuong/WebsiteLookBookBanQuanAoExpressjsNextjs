import api from "../lib/axios";
import { HttpStatusCode } from "axios";

export type IsLoginResponse = {
  user: {
    userId: string
  }
}

export async function isLogin() {
  try {
    const res = await api.get<IsLoginResponse>("/auth/me");
    if (res.status === HttpStatusCode.Ok) {
      return res.data.user.userId;
    }
  } catch (error) {
    return;
  }
}

export async function isAdmin() {
  try {
    if (!isLogin()) return false;

  } catch (error) {

  }
}