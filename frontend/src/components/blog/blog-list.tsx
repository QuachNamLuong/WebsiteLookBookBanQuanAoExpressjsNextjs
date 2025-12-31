"use client";

import { startTransition, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BlogItem } from "./blog-item";
import { BlogPagination } from "./blog-pagination";

const PER_PAGE = 9;

export async function getPosts(page: number, pageSize: number) {
  const res = await fetch(
    `/api/posts?page=${page}&limit=${pageSize}`
  );

  if (!res.ok) throw new Error("Failed to fetch posts");

  return res.json();
}


export default function BlogList() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs", currentPage],
    queryFn: async () => await getPosts(currentPage, PER_PAGE),
    placeholderData: keepPreviousData, // ✅ pagination mượt
  });

  if (isLoading) {
    return (
      <section className="py-16 px-6 md:px-12">
        <p className="text-center">Đang tải bài viết...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-6 md:px-12">
        <p className="text-center text-red-500">
          Không thể tải blog
        </p>
      </section>
    );
  }

  const blogs = data?.data ?? [];
  const totalPages = data?.meta.totalPages ?? 1;

  return (
    <section className="py-16 px-6 md:px-12">
      <h2 className="text-center text-xl font-semibold mb-10">BLOG</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-1 gap-y-10">
        {blogs.map((blog) => (
          <BlogItem
            key={blog.id}
            id={blog.id}
            title={blog.title}
            excerpt={blog.excerpt}
            image={blog.images[0]?.url}
            alt={blog.title}
            href={`/blog/${blog.slug}`}
          />
        ))}
      </div>

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          startTransition(() => setCurrentPage(page));
        }}
      />
    </section>
  );
}
