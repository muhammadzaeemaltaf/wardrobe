"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  CartProduct,
  getCart,
  handleItemColor,
  handleItemCount,
  handleItemSize,
  removeFromCart,
} from "../../../libs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [cartList, setCartList] = useState<CartProduct[]>([]);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("m");
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    const cartlistData = getCart();
    setCartList(cartlistData);
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartList(getCart());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const calculateTotals = () => {
      const totalItems = cartList.reduce(
        (acc, product) => acc + product.itemCount,
        0
      );
      const subtotal = cartList.reduce(
        (acc, product) => acc + product.price * product.itemCount,
        0
      ).toFixed(2);
      setTotalItems(totalItems);
      setSubtotal(parseInt(subtotal));
    };

    calculateTotals();
  }, [cartList]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            <div className="w-full rounded-xl animate-pulse bg-gray-300 h-44"></div>
            <div className="w-full rounded-xl animate-pulse bg-gray-300 h-44"></div>
          </div>
          <div className="w-full rounded-xl animate-pulse bg-gray-300 h-96"></div>
        </div>
        ;
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          {cartList.map((product) => (
            <Card key={product.id}>
              <CardContent className="flex flex-col lg:flex-row items-center gap-4 p-4">
                <div className="w-[120px]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={100}
                    height={120}
                    className="object-cover rounded-md w-full"
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-center lg:justify-start">
                      <h3 className="font-medium">{product.title}</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-2 justify-items-center lg:justify-items-start">
                        <Label htmlFor="color" className="text-xs">
                          Color
                        </Label>
                        <RadioGroup
                          value={product.color}
                          className="flex items-center gap-2"
                          onValueChange={(value) => {
                            setSelectedColor(value);
                            product.color = value;
                            handleItemColor(product.id, value);
                          }}
                        >
                          <Label className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800">
                            <RadioGroupItem value="black" color="black" />
                            Black
                          </Label>
                          <Label className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800">
                            <RadioGroupItem value="white" color="white" />
                            White
                          </Label>
                          <Label className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800">
                            <RadioGroupItem value="blue" color="blue" />
                            Blue
                          </Label>
                        </RadioGroup>
                      </div>
                      <div className="flex flex-col flex-wrap items-center lg:items-start gap-2">
                        <Label htmlFor="size" className="text-xs">
                          Size
                        </Label>
                        <RadioGroup
                          value={product.size}
                          className="flex items-center gap-2"
                          onValueChange={(value) => {
                            setSelectedSize(value);
                            product.size = value;
                            handleItemSize(product.id, value);
                          }}
                        >
                          <Label className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800">
                            <RadioGroupItem value="xs" />
                            XS
                          </Label>
                          <Label className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800">
                            <RadioGroupItem value="s" />S
                          </Label>
                          <Label className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800">
                            <RadioGroupItem value="m" />M
                          </Label>
                          <Label className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800">
                            <RadioGroupItem value="l" />L
                          </Label>
                          <Label className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800">
                            <RadioGroupItem value="xl" />
                            XL
                          </Label>
                        </RadioGroup>
                      </div>
                    </div>
                    {/* <p className="text-sm text-muted-foreground">{product.itemCount} Left In Stock</p> */}
                  </div>
                  <div>
                    <div className="flex flex-col items-center lg:items-end gap-4">
                      <p className="font-medium">$ {product.price}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleItemCount(product.id, -1)}
                          disabled={product.itemCount <= 1}
                        >
                          <Minus className="h-2 w-2" />
                        </Button>
                        <span className="w-8 text-center">
                          {product.itemCount}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleItemCount(product.id, 1)}
                          //   disabled={product.itemCount >= product.stock}
                        >
                          <Plus className="h-2 w-2" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove Item
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="relative">
          <Card className="h-fit sticky top-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>$ 0</span>
                </div>
                <div className="text-sm text-muted-foreground">Free Delivery</div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>$ {subtotal}</span>
                </div>
                <Button className="w-full bg-red-500 hover:bg-red-600">
                  PROCESS TO CHECKOUT
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
