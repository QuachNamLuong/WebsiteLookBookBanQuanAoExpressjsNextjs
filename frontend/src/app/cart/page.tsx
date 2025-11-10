// app/cart/page.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CartDetailResponse, CartItem, getCartDetail } from "@/services/cart/get-cart-detail";
import { getMe } from "@/services/auth/me";

export default function CartPage() {
  const [cart, setCart] = useState<CartDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);

// Replace with real user ID from auth/session

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getMe();
        const data = await getCartDetail(res.user.userId);
        if (data) setCart(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeItem = (id: string) => {
    if (!cart) return;
    setCart({
      ...cart,
      cartItems: cart.cartItems.filter((i) => i.id !== id),
    });
  };

  const total = cart
    ? cart.cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )
    : 0;

  if (loading) return <p className="text-center mt-20">Loading cart...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Giỏ hàng</h1>

      {!cart || cart.cartItems.length === 0 ? (
        <p className="text-muted-foreground text-center mt-20">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.cartItems.map((item: CartItem) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product.productImage[0]?.productImageUrl || ""}
                      alt={item.product.productName}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{item.product.productName}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${(total + 5).toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4 bg-[#4f6742] hover:bg-[#4f6742]">
                  Thanh toán
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
