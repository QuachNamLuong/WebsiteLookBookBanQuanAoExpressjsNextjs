import { useMe } from "./use-me";

export function useIsAdmin() {
  const { data, isLoading } = useMe();

  return {
    isAdmin: data?.roles?.includes("ADMIN") ?? false,
    isLoading,
  };
}
