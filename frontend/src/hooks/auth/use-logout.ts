import { useQueryClient } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const pathname = usePathname();

    const logout = async () => {
        await api.post("/auth/logout");

        queryClient.removeQueries({ queryKey: ["me"] });

        if (
            pathname.startsWith("/account") ||
            pathname.startsWith("/admin")
        ) {
            router.push("/");
            return;
        }

        router.refresh();
        toast.info("Đã đăng xuất");
    };

    return logout;
}
