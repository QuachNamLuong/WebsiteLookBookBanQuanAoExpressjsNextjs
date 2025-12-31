"use client";

import Link from "next/link";
import { FileText, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-[1280px] px-6 py-6 space-y-8">

        {/* ===== Header ===== */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Trang quản trị
          </h1>
          <p className="text-muted-foreground mt-1">
            Quản lý nội dung website và dữ liệu hệ thống
          </p>
        </div>

        {/* ===== Main Sections ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ===== Posts ===== */}
          <Link
            href="/admin/post"
            className="group rounded-xl border bg-background p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-lg font-semibold group-hover:underline">
                  Quản lý bài viết
                </h2>
                <p className="text-sm text-muted-foreground">
                  Tạo, chỉnh sửa và xuất bản bài viết
                </p>
              </div>
            </div>
          </Link>

          {/* ===== Products ===== */}
          <Link
            href="/admin/product"
            className="group rounded-xl border bg-background p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-green-100 p-3 text-green-600">
                <Package className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-lg font-semibold group-hover:underline">
                  Quản lý sản phẩm
                </h2>
                <p className="text-sm text-muted-foreground">
                  Quản lý sản phẩm, tồn kho và giá bán
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
