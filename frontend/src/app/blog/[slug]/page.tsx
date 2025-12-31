"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

import { PostStatus } from "@prisma/client";
import { JSONContent } from "@tiptap/core";

export interface PostDetail {
  id: number;
  title: string;
  slug: string;
  content: any; // JSON của TipTap
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

export async function getPostBySlug(
  slug: string
): Promise<PostDetail> {
  const res = await fetch(`/api/posts/get-by-slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post detail");
  }

  return res.json();
}


export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", params.slug],
    queryFn: async () => await getPostBySlug(params.slug),
    enabled: !!params.slug,
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        Đang tải bài viết...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-20 text-center text-red-500">
        Không tìm thấy bài viết
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-4">
        {data.title}
      </h1>

      {/* Meta */}
      <div className="text-sm text-muted-foreground mb-8">
        <span>{new Date(data.createdAt).toLocaleDateString()}</span>
        {" · "}
      </div>

      {/* Content */}
      <SimpleEditor
        content={parseTiptapContent(data.content)}
        editable={false}   // ✅ READ ONLY
      />
    </article>
  );
}

function parseTiptapContent(content?: string): JSONContent {
  try {
    const parsed = content ? JSON.parse(content) : null;
    if (parsed?.type === "doc") return parsed;
  } catch {}
  return { type: "doc", content: [] };
}
