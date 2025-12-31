import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Post } from "../post.type";
import { useRouter } from "next/navigation";



export const postTableColumns = (
  onDelete: (postId: number) => void
): ColumnDef<Post>[] => [
  {
    accessorKey: "title",
    header: "Tiêu đề",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <Link
          href={`/admin/post/${post.id}`}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          {post.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Đường dẫn",
  },
  {
    header: "Danh mục",
    accessorFn: (row) => row.category.name,
  },
  {
    id: "actions",
    header: "Chức năng",
    enableSorting: false,
    enableColumnFilter: false,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button size="sm"><Link href={`/admin/post/${row.original.id}`}>Sửa bài viết</Link></Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(row.original.id)}
        >
          Xóa
        </Button>
      </div>
    ),
  },
];
