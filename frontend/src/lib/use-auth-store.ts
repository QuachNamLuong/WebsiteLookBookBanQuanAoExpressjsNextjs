// lib/useAuthStore.ts
import { isLogin } from "@/utils/auth";
import { create } from "zustand";

interface AuthState {
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  checkLogin: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  setLoggedIn: (value) => set({ loggedIn: value }),
  checkLogin: async () => {
    const result = await isLogin();
    set({ loggedIn: !!result });
  },
}));
