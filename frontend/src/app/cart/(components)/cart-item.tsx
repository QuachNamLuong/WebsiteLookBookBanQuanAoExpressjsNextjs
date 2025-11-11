"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { removeProductInCart, RemoveProductInCartEnum } from "@/services/cart/remove-product-in-cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type CartItemProps = {
    cartId: string,
    productId: string,
    productName: string,
    productImageUrl: string,
    productPrice: number,
    productQuantity: number,
    onRemoveProduct: (cartId:string, productId: string) => Promise<void>,
    onQuantityChange: (productId: string, newQuantity: number) => void;
}

export default function CartItem({cartId, productId, productName, productImageUrl, productPrice, productQuantity, onRemoveProduct, onQuantityChange}: CartItemProps) {
    const route = useRouter();
    
    const [quantity, setQuantity] = useState(productQuantity);

    const handleIncreaseProductQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(productId, newQuantity);
    };

    const handleDecreaseProductQuantity = () => {
        if (quantity === 1) return;
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onQuantityChange(productId, newQuantity);
    };


    
    return(
        <Card key={productId} className="overflow-hidden">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={productImageUrl}
                      alt={productName}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex flex-col gap-1">
                      <Link href={`/product/${productId}`}><h3 className="font-medium">{productName}</h3></Link>
                      <p className="text-sm text-muted-foreground">
                        {productPrice} VND
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm">Số lượng:</p>
                        <Button 
                          className="h-6 w-6 rounded-sm text-sm"
                          onClick={handleDecreaseProductQuantity}
                        ><Minus /></Button>
                        <Input
                          className="w-fit h-6 text-center text-sm"
                          type="number"
                          value={quantity}
                          readOnly
                        />
                        <Button className="h-6 w-6 rounded-sm text-sm" onClick={handleIncreaseProductQuantity}><Plus /></Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={async () => {
                        try {
                        await onRemoveProduct(cartId, productId);
                        toast.success("Sản phẩm đã được xóa khỏi giỏ hàng.");
                        } catch (error) {
                        toast.error("Không thể xóa sản phẩm. Vui lòng thử lại.");
                        }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
    );
}