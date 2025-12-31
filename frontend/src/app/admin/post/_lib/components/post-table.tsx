"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { postTableColumns } from "./post-column";
import { usePost } from "../post.query";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function PostTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const queryClient = useQueryClient();

  const { data = { data: [], meta: null }, isLoading } = usePost(page, limit);

  /* ================= DELETE ================= */
  const handleDeletePost = useCallback(
    async (postId: number) => {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error("Xóa bài viết thất bại!");
        return;
      }

      toast.success("Xóa bài viết thành công!");

      queryClient.invalidateQueries({
        queryKey: ["posts", page, limit],
      });
    },
    [queryClient, page, limit],
  );

  /* ================= COLUMNS ================= */
  const columns = useMemo(
    () => postTableColumns(handleDeletePost),
    [handleDeletePost],
  );

  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;

  const totalPages = data.meta?.totalPages ?? 1;

  return (
    <div className="space-y-4">
      {/* ================= TABLE ================= */}
      <div className="rounded-xl border bg-background shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th
                    key={h.id}
                    className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground"
                  >
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  Không có dữ liệu
                </td>
              </tr>
            )}

            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`
                border-t
                transition-colors
                hover:bg-muted/40
                ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}
              `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div className="text-sm text-muted-foreground">
          Trang <span className="font-medium">{page}</span> /{" "}
          <span className="font-medium">{totalPages}</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            disabled={page === 1}
            onClick={() => setPage(1)}
          >
            «
          </Button>

          <Button
            variant="ghost"
            size="icon"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ‹
          </Button>

          <Button
            variant="ghost"
            size="icon"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            ›
          </Button>

          <Button
            variant="ghost"
            size="icon"
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
          >
            »
          </Button>

          {/* Page size */}
          <select
            className="
            ml-3 rounded-md border bg-background
            px-2 py-1 text-sm
            focus:outline-none focus:ring-2 focus:ring-ring
          "
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size} / trang
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
