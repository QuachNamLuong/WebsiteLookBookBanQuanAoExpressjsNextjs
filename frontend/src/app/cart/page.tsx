// app/cart/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CartDetailResponse, CartItemData, getCartDetail } from "@/services/cart/get-cart-detail";
import { getMe } from "@/services/auth/me";
import { removeProductInCart, RemoveProductInCartEnum } from "@/services/cart/remove-product-in-cart";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import CartItem from "./(components)/cart-item";
import { changeProductQuntityInCart, ChangeProductQuntityInCartEnum } from "@/services/cart/change-product-quatity-in-cart";


export default function CartPage() {
  const [cart, setCart] = useState<CartDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
  if (!cart) return;
  const res = await changeProductQuntityInCart(productId, newQuantity);
  if (res === ChangeProductQuntityInCartEnum.OK) {
    setCart({
        ...cart,
        cartItems: cart.cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      });
  }
  
};

    const handleRemoveProduct = async (cartId: string, productId: string) => {
        const res = await removeProductInCart(productId);
        if (res === RemoveProductInCartEnum.NOT_AUTHORIZED) {
            toast.info("Phien dang nhap cua ban da het");
            route.push("/auth");
            return;
        }

        if (res === RemoveProductInCartEnum.FETCH_FAIL) {
            toast.error("");
            return;
        }

        if (res === RemoveProductInCartEnum.OK) {
          await removeItem(cartId, productId);
          toast.info("Da xoa san pham khoi gio hang");
        }
        
    }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getMe();
        if (!res) {
          toast.error("")
          return;
        }
        const data = await getCartDetail(res.user.userId);
        if (data) setCart(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeItem = async (id: string, productId: string) => {
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
          Giỏ hàng trống
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.cartItems.map((item: CartItemData) => 
            <CartItem
              key={item.id}
              cartId={item.id}
              onRemoveProduct={() => handleRemoveProduct(item.id, item.productId)}
              productId={item.productId}
              productImageUrl={item.product.productImage[0].productImageUrl}
              productName={item.product.productName}
              productPrice={item.product.price}
              productQuantity={item.quantity}
              onQuantityChange={(productId, newQuantity) =>
                handleQuantityChange(productId, newQuantity)
              }
            />)}
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
                <Button className="w-full mt-4 bg-[#4f6742] hover:bg-[#4f6742]"
                >
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
