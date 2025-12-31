"use client";

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

import { useQuery } from "@tanstack/react-query";

interface CartResponse {
  cartCount: number
}

export async function fetchCart() {
  const res = await fetch("/api/carts", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  return (await res.json()) as CartResponse;
}


interface CartButtonProps {
  onClick?: () => void;
}

export const CartButton = ({ onClick }: CartButtonProps) => {
  const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 1000 * 30, // 30s
  });

  const count = cart?.cartCount??0;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="relative"
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>

      {count > 0 && (
        <Badge
          className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-red-500 text-white"
        >
          {count}
        </Badge>
      )}
    </div>
  );
};
