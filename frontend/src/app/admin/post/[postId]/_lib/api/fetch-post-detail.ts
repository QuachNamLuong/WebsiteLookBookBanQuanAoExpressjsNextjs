import { toast } from "sonner";

export type Post = {
    id: number,
    title: string,
    content: string,
    postCategory: string,
    slug: string,
    categoryId: number,
    images: {
        url: string
    }[]
}

export async function fetchPostDetail(postId: number): Promise<Post | undefined> {
    const res = await fetch(`/api/posts/${postId}`);
    if (!res.ok) {
        toast.error("Khong the tai bai viet");
        return;
    }

    return res.json()
}