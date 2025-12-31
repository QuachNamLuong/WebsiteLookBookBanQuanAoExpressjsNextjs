import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./post.api";

export function usePost(page: number, limit: number) {
    return useQuery({
        queryKey: ["posts", page, limit],
        queryFn: () => fetchPosts({page, limit}),
    })
}