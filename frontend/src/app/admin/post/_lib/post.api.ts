import { GetPostsResponse, QueryParams } from "./post.type";

export async function fetchPosts(query: QueryParams): Promise<GetPostsResponse> {
    const res = await fetch(`/api/posts?page=${query.page}&limit=${query.limit}`, { method: "GET" });
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}