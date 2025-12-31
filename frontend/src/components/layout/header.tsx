"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ShoppingBag, BookOpen, User } from "lucide-react";
import ShopIcon from "../icon/shop-icon";
import { StoryIcon } from "../icon/story-icon";
import { AccountIcon } from "../icon/account-icon";
import { CartButton } from "../features/cart/cart-button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logout } from "@/services/auth/logout";
import { isLogin } from "@/utils/auth";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/lib/use-auth-store";
import { Button } from "../ui/button";
// Assuming you have an axios instance or similar utility for API calls
import api from "@/lib/axios";
import { toast } from "sonner";
import { useIsAdmin } from "@/hooks/use-is-admin";
import { useAuthState } from "@/hooks/use-auth-state";
import { useLogout } from "@/hooks/auth/use-logout";

// 1. Define the structure for the category data
interface Category {
  id: number;
  name: string;
  slug: string;
}

type ProductCollection = {
  id: number;
  name: string;
  slug: string;
};

export default function Header() {
  const logout = useLogout();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

  // 2. State to hold the fetched categories
  const [productLinks, setProductLinks] = useState<Category[]>([]);

  const [productCollectionLinks, setProductCollectionLinks] = useState<
    ProductCollection[]
  >([]);
  const { isAdmin, isLoggedIn, isLoading } = useAuthState();

  const handleLogout = async () => {
    const isLogout = await logout();
    setLoggedIn(!isLogout);
  };

  // 4. Function to call the categories API
  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.get<{ data: Category[] }>(
        "/categories/get-categories",
      );

      const mappedLinks = response.data.map((category) => ({
        ...category,
        name: category.name,
        href: `/products/category/${category.slug}`,
      }));

      setProductLinks(mappedLinks);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Không thể tải danh mục sản phẩm.");
    }
  }, []);

  const fetchProductCollections = useCallback(async () => {
    const res = await fetch("/api/product-collections/get-all");
    if (!res.ok) {
      toast.error("Không thể tải Bộ sưu tập");
      return;
    }
    const data = await res.json();

    const mappedLinks = data.map((productCollection) => ({
      ...productCollection,
      name: productCollection.name,
      href: `/products/collections/${productCollection.slug}`,
    }));

    setProductCollectionLinks(mappedLinks);
  }, []);

  // 5. useEffect hook to fetch data on component mount
  useEffect(() => {
    fetchCategories();
    fetchProductCollections();
  }, [fetchCategories, fetchProductCollections]); // Empty dependency array means this runs once on mount

  return (
    <header className="bg-[#f6f7e6] border-b border-[#dfe3cc] sticky top-0 z-[999] h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/">
          <h1 className="text-[#4f6742] font-extrabold text-2xl">VIECHARM</h1>
        </Link>
        {/* ---------- Left Navigation ---------- */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex space-x-2">
            {/* --- SẢN PHẨM (Categories fetched from API) --- */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-[#7b8f6d] text-white px-10 py-3 rounded-none text-sm font-medium hover:bg-[#6b7f5f] transition-colors">
                SẢN PHẨM
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0 shadow-md rounded-md overflow-hidden">
                <ul className="flex flex-col bg-[#7b8f6d] text-white min-w-[220px]">
                  {/* --- Use the state variable productLinks --- */}
                  {productLinks.length > 0 ? (
                    productLinks.map((link) => (
                      <li key={link.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`${link.href}`}
                            className="block px-4 py-3 text-center hover:bg-[#6b7f5f] transition-colors"
                          >
                            {link.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))
                  ) : (
                    // Optional: Show a loading state or default item while fetching
                    <li className="p-4 text-center text-sm opacity-70">
                      Đang tải danh mục...
                    </li>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* --- BỘ SƯU TẬP (Collections) --- */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-[#7b8f6d] text-white px-10 py-3 rounded-none text-sm font-medium hover:bg-[#6b7f5f] transition-colors">
                BỘ SƯU TẬP
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0 shadow-md rounded-md overflow-hidden">
                <ul className="flex flex-col bg-[#7b8f6d] text-white min-w-[220px]">
                  {productCollectionLinks.length > 0 ? (
                    productCollectionLinks.map((link) => (
                      <li key={link.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="block px-4 py-3 text-center hover:bg-[#6b7f5f] transition-colors"
                          >
                            {link.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-center text-sm opacity-70">
                      Đang tải bộ sưu tập...
                    </li>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* ---------- Right Icons ---------- */}
        <div className="flex items-center gap-6 text-[#6b7f5f]">
          <Link href="/cart" aria-label="Giỏ hàng">
            <CartButton />
          </Link>
          <Link href="/shop" aria-label="Cửa hàng">
            <ShopIcon className="w-5 h-5 hover:opacity-80 transition" />
          </Link>
          <Link href="/blog" aria-label="Câu chuyện">
            <StoryIcon className="w-5 h-5 hover:opacity-80 transition" />
          </Link>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <AccountIcon className="w-5 h-5 hover:opacity-80 transition" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col gap-2">
                    {isLoggedIn ? (
                      <>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            className="px-2 py-1.5 rounded-md hover:bg-accent transition text-sm w-[100px]"
                          >
                            Trang Admin
                          </Link>
                        )}
                        <Link
                          href="/account"
                          className="px-2 py-1.5 rounded-md hover:bg-accent transition text-sm w-[100px]"
                        >
                          Tài khoản
                        </Link>
                        <Button className="" onClick={logout}>
                          Đăng xuất
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth?state=login"
                          className="px-2 py-1.5 rounded-md hover:bg-accent transition text-sm w-[100px]"
                        >
                          Đăng nhập
                        </Link>
                        <Link
                          href="/auth?state=register"
                          className="px-2 py-1.5 rounded-md hover:bg-accent transition text-sm w-[100px]"
                        >
                          Đăng ký
                        </Link>
                      </>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
