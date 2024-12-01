"use client";
import React, { useState, useEffect } from "react";
import {
  Products,
  getWishlist,
  SingleProduct,
  removeFromWishlist,
} from "../../../libs";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());

    const handleWishlistUpdate = () => {
      setWishlist(getWishlist());
    };
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  const handleWishlistToggle = (productId: number) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
      setWishlist(wishlist.filter((id) => id !== productId));
    }
  };

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const wishlistIds = getWishlist();
      const productsData = await Promise.all(
        wishlistIds.map((id) => SingleProduct(id))
      );
      setProducts(productsData);
      setLoading(false);
    };
    fetchWishlistProducts();
  }, [wishlist]);

  return (
    <section className="container">
      <div className="space-y-4">
        <h1 className="text-xl md:text-3xl font-bold">My Wishlist</h1>
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
                <div className="h-60 md:h-28 w-full rounded animate-pulse bg-gray-300" key={index}/>

          ))
        ) : products.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          products.map((product) => (
            <div
              className="flex flex-col md:flex-row gap-2 items-center border-b pb-2"
              key={product.id}
            >
              <div className="w-[80%] grid md:grid-cols-[auto_auto_20%] justify-items-center md:justify-items-start items-center gap-2 md:gap-4">
                <div className="rounded-xl overflow-hidden aspect-square h-[100px] relative">
                  <Link href={`/shop/${product.id}`} className="absolute inset-0" />
                  <Image
                    src={product.image}
                    alt={product.title}
                    height={1000}
                    width={1000}
                    className="h-full object-contain"
                  />
                </div>
                <div className="text-muted-foreground space-y-1 text-sm py-3 text-center md:text-start">
                  <Link
                    href={`/shop/${product.id}`}
                    className="text-xl font-bold text-black"
                  >
                    {product.title}
                  </Link>
                  <div className="line-clamp-2">{product.description}</div>
                  <p>
                    Category:{" "}
                    <strong>
                      {product.category
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </strong>
                  </p>
                  <RiDeleteBin6Line
                    className="w-5 h-5 cursor-pointer hidden md:block"
                    onClick={() => handleWishlistToggle(product.id)}
                  />
                </div>
                <div className="font-semibold text-xl text-gray-600">
                  $ {product.price}
                </div>
              </div>
              <div className="w-[80%] md:w-[20%] ">
                <div className="w-full flex justify-between md:justify-end items-center">
                  <button className="h-fit bg-black text-white px-6 pt-3 rounded-full w-fit relative">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoCartOutline />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to cart</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </button>
                  <RiDeleteBin6Line
                    className="w-5 h-5 cursor-pointer text-muted-foreground md:hidden"
                    onClick={() => handleWishlistToggle(product.id)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Page;
