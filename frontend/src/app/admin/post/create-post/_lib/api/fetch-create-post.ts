import { toast } from "sonner";

type Post = {
    postSlug: string,
    content: string,
    title: string,
    postCategoryId: number
}

type createPostBody = {
    post: Post
}

export async function createPost(payload: createPostBody) {
    const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        toast.error(`Không thể tạo bài viết`);
        return;
    }

    toast.success("Tạo bài viết thành công!");
}
