"use client";

import { Button } from "@/components/ui/button";
import PostTable from "./_lib/components/post-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export default function AdminHomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onCreateNewPostClick = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/posts", { method: "POST" });

      if (!res.ok) {
        toast.error("Không thể tạo bài viết");
        return;
      }

      const data = await res.json();
      router.push(`/admin/post/${data.postId}`);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tạo bài viết");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-[1280px] px-6 py-6 space-y-6">
        {/* ===== Header ===== */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Quản lý bài viết
            </h1>
            <p className="text-sm text-muted-foreground">
              Tạo, chỉnh sửa và quản lý nội dung bài viết
            </p>
          </div>

          <Button
            onClick={onCreateNewPostClick}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {loading ? "Đang tạo..." : "Thêm bài viết"}
          </Button>
        </div>

        {/* ===== Content ===== */}
        <div className="rounded-xl border bg-background shadow-sm p-4">
          <PostTable />
        </div>
      </div>
    </div>
  );
}
