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

export default function Header() {
  const productLinks = [
    { name: "Áo dài", href: "/products/ao-dai" },
    { name: "Phụ kiện", href: "/products/phu-kien" },
  ];

  const collectionLinks = [
    { name: "Thùy túc uyển tâm", href: "/collections/thuy-tuc-uyen-tam" },
    { name: "Sải cánh chi hoa", href: "/collections/sai-canh-chi-hoa" },
    { name: "Giai nhân", href: "/collections/giai-nhan" },
    { name: "Hạ dương", href: "/collections/ha-duong" },
    { name: "Diên dao", href: "/collections/dien-dao" },
  ];

  return (
    <header className="bg-[#f6f7e6] border-b border-[#dfe3cc]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* ---------- Left Navigation ---------- */}
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex space-x-2">
            {/* --- SẢN PHẨM --- */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-[#7b8f6d] text-white px-10 py-3 rounded-none text-sm font-medium hover:bg-[#6b7f5f] transition-colors">
                SẢN PHẨM
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0 shadow-md rounded-md overflow-hidden">
                <ul className="flex flex-col bg-[#7b8f6d] text-white min-w-[220px]">
                  {productLinks.map((link) => (
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

            {/* --- BỘ SƯU TẬP --- */}
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
          <Link href="/cart" aria-label="Cart">
            <ShoppingBag className="w-5 h-5 hover:opacity-80 transition" />
          </Link>
          <Link href="/guides" aria-label="Guide">
            <BookOpen className="w-5 h-5 hover:opacity-80 transition" />
          </Link>
          <Link href="/account" aria-label="Account">
            <User className="w-5 h-5 hover:opacity-80 transition" />
          </Link>
        </div>
      </div>
    </header>
  );
}
