"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import { FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormEvent, useState } from "react";
import { createPost } from "./_lib/api/fetch-create-post";
import { PostCategoryCombobox } from "./_lib/components/post-category-combobox";
import { JSONContent } from "@tiptap/react";
export default function PostReviewPage() {
  const [title, setTitle] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });
  const [postCategoryId, setPostCategoryId] = useState(-1);

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  const payload = {
    post: {
      title,
      postSlug,
      content: JSON.stringify(content),
      postCategoryId,
    },
  };

  await createPost(payload);
};


  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1200px] space-y-6 w-full">
        <form className="space-y-4 p-2" onSubmit={handleSubmit}>
          <FieldSet>
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Label htmlFor="postSlug">Đường dẫn</Label>
            <Input
              id="postSlug"
              value={postSlug}
              onChange={(e) => {
                setPostSlug(e.target.value);
              }}
            />
            <Label htmlFor="postCategory">Danh mục</Label>
            <PostCategoryCombobox
              postCategoryId={postCategoryId}
              onChange={setPostCategoryId}
            />
          </FieldSet>

          <Button type="submit">Tạo bài viết</Button>
        </form>

        <div className="flex items-center justify-center h-screen">
          <SimpleEditor
            content={content}
            onChange={setContent}
            editable={true}
          />
        </div>
      </div>
    </div>
  );
}
