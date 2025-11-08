import { cookies } from "next/headers";
import api from "../lib/axios";
import { HttpStatusCode } from "axios";

export async function isLogin() {
  try {
    const res = await api.get("/auth/me");
    if (res.status === HttpStatusCode.Ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export async function isAdmin() {
  try {
    if (!isLogin()) return false;

  } catch (error) {
    
  }
}