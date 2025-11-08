// app/cart/page.tsx
"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import { useState } from "react"

const dummyCartItems = [
  {
    id: "1",
    name: "Vintage Denim Jacket",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80",
    quantity: 1,
  },
  {
    id: "2",
    name: "Classic White Sneakers",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1606813902916-123d8683f9d9?w=400&q=80",
    quantity: 2,
  },
  {
    id: "3",
    name: "Beige Canvas Tote Bag",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1592878897401-2a99a7b9b6e9?w=400&q=80",
    quantity: 1,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(dummyCartItems)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Giỏ hàng</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-center mt-20">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)}
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
                <Button className="w-full mt-4 bg-[#4f6742] hover:bg-[#4f6742]">Thanh toán</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
