"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/use-auth-store";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const checkLogin = useAuthStore((state) => state.checkLogin);

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return <>{children}</>;
}
