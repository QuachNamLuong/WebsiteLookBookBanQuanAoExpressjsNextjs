"use client";

import { startTransition, useState } from "react";
import { BlogItem } from "./blog-item";
import { BlogPagination } from "./blog-pagination";

export default function BlogList() {
  const blogs = [
    {
      id: 1,
      title: "Câu Chuyện BST 'Dẫn Dắt': Nốt Vẽ Đa Sắc Từ Miền Ký Ức",
      excerpt: "Một bộ sưu tập lấy cảm hứng từ miền ký ức và những gam màu đa sắc.Đây là đoạn mô tả ngắn gọn cho bài viết demo số Đây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo số",
      image: "/blog/blog-1.jpg",
      alt: "BST Dẫn Dắt",
      href: "/blog/bst-dan-dat",
    },
    {
      id: 2,
      title: "Hương vị mùa thu Hà Nội – những món ăn chiều thực khách",
      excerpt: "Khám phá ẩm thực mùa thu Hà Nội với những món ăn đặc trưng.Đây là đoạn mô tả ngắn gọn cho bài viết demo số Đây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo số",
      image: "/blog/blog-2.jpg",
      alt: "Ẩm thực mùa thu Hà Nội",
      href: "/blog/thu-ha-noi",
    },
    {
      id: 3,
      title: "NÓN LỤA – HƠI THỞ DI SẢN VÀ THỜI TRANG GẶP GỠ",
      excerpt: "Khi di sản và thời trang giao thoa trong chiếc nón lụa truyền thống.Đây là đoạn mô tả ngắn gọn cho bài viết demo số Đây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo số",
      image: "/blog/blog-3.jpg",
      alt: "Nón lụa",
      href: "/blog/non-lua",
    },
    {
      id: 4,
      title: "Top địa điểm chụp ảnh áo dài đẹp ở Hà Nội",
      excerpt: "Danh sách những địa điểm lý tưởng để chụp ảnh áo dài.Đây là đoạn mô tả ngắn gọn cho bài viết demo số Đây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo số",
      image: "/blog/blog-4.jpg",
      alt: "Địa điểm chụp áo dài",
      href: "/blog/dia-diem-ao-dai",
    },
    {
      id: 5,
      title: "CGV và phụ kiện phối đồ mùa hè của VieCharm",
      excerpt: "Phụ kiện mùa hè giúp tôn vinh nét duyên Việt.Đây là đoạn mô tả ngắn gọn cho bài viết demo số Đây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo số",
      image: "/blog/blog-5.jpg",
      alt: "Phụ kiện mùa hè",
      href: "/blog/phu-kien-mua-he",
    },
    {
      id: 6,
      title: "Cách bảo quản áo dài lâu to và bền",
      excerpt: "Mẹo nhỏ để giữ áo dài luôn bền đẹp theo thời gian.Đây là đoạn mô tả ngắn gọn cho bài viết demo số Đây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo số",
      image: "/blog/blog-6.jpg",
      alt: "Bảo quản áo dài",
      href: "/blog/bao-quan-ao-dai",
    },
    ...Array.from({ length: 29 }, (_, i) => {
        const id = i + 7;
        return {
        id,
        title: `Bài viết demo số ${id}`,
        excerpt: `Đây là đoạn mô tả ngắn gọn cho bài viết demo số Đây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo sốĐây là đoạn mô tả ngắn gọn cho bài viết demo số${id}.`,
        image: `/blog/blog-${(id % 6) + 1}.jpg`, // reuse 6 sample images
        alt: `Blog demo ${id}`,
        href: `/blog/demo-${id}`,
        };
    }),
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 9; // show 3 blogs per page
  const totalPages = Math.ceil(blogs.length / perPage);

  const start = (currentPage - 1) * perPage;
  const currentBlogs = blogs.slice(start, start + perPage);

  return (
    <section className="py-16 px-6 md:px-12">
      <h2 className="text-center text-xl font-semibold mb-10">BLOG</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-1 gap-y-10">
        {currentBlogs.map((blog, index) => (
          <BlogItem key={blog.id} {...blog} image="/stars/stars-1.jpg"/>
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
