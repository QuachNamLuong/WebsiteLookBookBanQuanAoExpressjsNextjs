import { toast } from "sonner";

type PostCategory = {
    id: number,
    name: string,
}

export async function fetchPostCategories(): Promise<PostCategory[] | undefined> {
    const res = await fetch("/api/post-categories");
    if (!res.ok) {
        toast.error("Không thể lấy Danh mục bài viết");
        return;
    }

    return res.json();
}