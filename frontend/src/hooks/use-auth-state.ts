import { useMe } from "./use-me";

export function useAuthState() {
  const { data: me, isLoading } = useMe();

  const isLoggedIn = me?.isAuthenticated === true;
  const isAdmin = isLoggedIn && me.roles?.includes("ADMIN");

  return {
    isLoggedIn,
    isAdmin,
    isLoading,
  };
}