"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FormEvent, use, useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { PostCategoryCombobox } from "./_lib/components/post-category-combobox";
import { updatePost } from "./_lib/api/fetch-update-post";
import { fetchPostDetail } from "./_lib/api/fetch-post-detail";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function parseTiptapContent(content?: string): JSONContent {
  try {
    const parsed = content ? JSON.parse(content) : null;
    if (parsed?.type === "doc") return parsed;
  } catch {}
  return { type: "doc", content: [] };
}

type PostUpdatePageProps = {
  params: Promise<{ postId: number }>;
};

export default function PostUpdatePage({ params }: PostUpdatePageProps) {
  const { postId } = use(params);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });
  const [postCategoryId, setPostCategoryId] = useState(-1);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/post-images/${postId}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }
  };

  const handleDeletePost = async () => {
    const res = await fetch(`/api/posts/${postId}`, {method: "DELETE" });
    if (res.ok) {
      toast.success("Xóa bài viết thành công!");
      router.push("/admin/post");
      return;
    }

    toast.error("Xóa bài viết thất bại!");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updatePost(postId, {
      post: {
        title,
        postSlug,
        content: JSON.stringify(content),
        postCategoryId,
      },
    });
    toast.success("Cập nhật bài viết thành công");
  };

  useEffect(() => {
    fetchPostDetail(postId).then((post) => {
      if (!post) return toast.error("Không thể tải bài viết");
      setTitle(post.title);
      setPostSlug(post.slug);
      setPostCategoryId(post.categoryId);
      setContent(parseTiptapContent(post.content));
      if (post.images[0]) {
        setThumbnailUrl(post.images[0].url);
        setThumbnailPreview(post.images[0].url);
      }
    });
  }, [postId]);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Cập nhật bài viết</h1>
          <div className="flex gap-2">
            <Button onClick={handleDeletePost}>Xóa bài viết</Button>
            <Button onClick={handleSubmit}>Lưu thay đổi</Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin bài viết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Tiêu đề</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Đường dẫn</Label>
                  <Input
                    value={postSlug}
                    onChange={(e) => setPostSlug(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Danh mục</Label>
                  <PostCategoryCombobox
                    postCategoryId={postCategoryId}
                    onChange={setPostCategoryId}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ảnh đại diện</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Preview */}
                <label className="group relative block aspect-[16/9] w-full overflow-hidden rounded-lg border border-dashed cursor-pointer hover:bg-muted transition">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                      Chọn ảnh đại diện
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm">
                    Thay đổi ảnh
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </label>

                <p className="text-xs text-muted-foreground">
                  PNG, JPG – tối đa 2MB
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Editor */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Nội dung bài viết</CardTitle>
              </CardHeader>
              <CardContent className="min-h-[600px]">
                <SimpleEditor
                  content={content}
                  onChange={setContent}
                  editable
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
