'use client'

import Image from "next/image"
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { CartProduct, getCart, handleItemCount, removeFromCart } from "../../../libs"

export default function Page() {
    const [cartList, setCartList] = useState<CartProduct[]>([]);

    useEffect(() => {
        const cartlistData = getCart();
        setCartList(cartlistData);
      }, []);

      useEffect(() => {
        const handleCartUpdate = () => {
          setCartList(getCart());
        }
    
        window.addEventListener("cartUpdated", handleCartUpdate);
    
        return () => {
          window.removeEventListener("cartUpdated", handleCartUpdate);
        };
      }, []);

  return (
    <div className="p-4">
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          {cartList.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex gap-4 p-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={120}
                  className="object-cover rounded-md"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="font-medium">Rs {product.price}</p>
                  </div>
                  {/* <p className="text-sm text-muted-foreground">{product.stock} Left In Stock</p> */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleItemCount(product.id, -1)}
                      disabled={product.itemCount <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{product.itemCount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleItemCount(product.id, 1)}
                    //   disabled={product.itemCount >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-muted-foreground"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove Item
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Items</span>
                {/* <span>{totalItems}</span> */}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                {/* <span>Rs {subtotal}</span> */}
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>Rs 0</span>
              </div>
              <div className="text-sm text-muted-foreground">Free Delivery</div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                {/* <span>Rs {subtotal}</span> */}
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                PROCESS TO CHECKOUT
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

