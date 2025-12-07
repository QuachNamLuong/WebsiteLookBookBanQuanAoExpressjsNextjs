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
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/use-auth-store";
import { Button } from "../ui/button";
// Assuming you have an axios instance or similar utility for API calls
import api from "@/lib/axios"; 
import { toast } from "sonner";


// 1. Define the structure for the category data
interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Header() {
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  
  // 2. State to hold the fetched categories
  const [productLinks, setProductLinks] = useState<Category[]>([]); 
  
  // 3. The hardcoded collection links remain
  const collectionLinks = [
    { name: "Thùy túc uyển tâm", href: "/collections/thuy-tuc-uyen-tam" },
    { name: "Sải cánh chi hoa", href: "/collections/sai-canh-chi-hoa" },
    { name: "Giai nhân", href: "/collections/giai-nhan" },
    { name: "Hạ dương", href: "/collections/ha-duong" },
    { name: "Diên dao", href: "/collections/dien-dao" },
  ];

  const handleLogout = async () => {
    const isLogout = await logout();
    setLoggedIn(!isLogout);
  };
  
  // 4. Function to call the categories API
  const fetchCategories = async () => {
    try {
      // API call to the /categories route
      const response = await api.get<{ data: Category[] }>("/categories/get-categories");
      
      // Map the fetched data to the desired link format (name and href)
      const mappedLinks = response.data.data.map(category => ({
        ...category, // Keep original category data
        name: category.name, // Use name for display
        href: `/products/${category.slug}`, // Use slug for the link path
      }));
      
      setProductLinks(mappedLinks);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Không thể tải danh mục sản phẩm.");
    }
  };

  // 5. useEffect hook to fetch data on component mount
  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <header className="bg-[#f6f7e6] border-b border-[#dfe3cc] sticky top-0 z-[999] h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/"><h1 className="text-[#4f6742] font-extrabold text-2xl">VIECHARM</h1></Link>
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
                            href={`${link.slug}`} 
                            className="block px-4 py-3 text-center hover:bg-[#6b7f5f] transition-colors"
                          >
                            {link.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))
                  ) : (
                    // Optional: Show a loading state or default item while fetching
                    <li className="p-4 text-center text-sm opacity-70">Đang tải danh mục...</li>
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
                  {collectionLinks.map((link) => (
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
                  ))}
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
                    {loggedIn ?
                      <>
                        <Link
                          href="/account"
                          className="px-2 py-1.5 rounded-md hover:bg-accent transition text-sm w-[100px]"
                        >
                          Tài khoản
                        </Link>
                        <Button
                          className=""
                          onClick={handleLogout}>
                          Đăng xuất
                        </Button>
                      </>
                      :
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
                    }
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