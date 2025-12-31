import { toast } from "sonner";

type Post = {
    postSlug: string,
    content: string,
    title: string,
    postCategoryId: number
}

type updatePostBody = {
    post: Post
}

export async function updatePost(postId: number, payload: updatePostBody) {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        toast.error(`Không thể cập nhật bài viết`);
        return;
    }

    toast.success("Cập nhật bài viết thành công!");
}
