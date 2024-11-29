"use client";

import React, { useEffect, useState } from "react";
import {
  addToWishlist,
  Categories,
  Products,
  removeFromWishlist,
  SingleProduct,
} from "../../../../libs";
import Image from "next/image";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { IoCartOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import ProductSection from "@/components/ProductSection";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SkeletonLoader = () => (
  <section className="py-8">
    <div className="container">
      <div className="grid lg:grid-cols-[40%_auto] gap-4 mb-4 border-b pb-6">
        <div className="rounded-lg overflow-hidden relative bg-gray-300 h-full"></div>

        <div className="flex flex-col gap-6 p-6">
          <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          <div className="flex gap-1 justify-start">
            <div className="h-6 bg-gray-300 rounded w-6"></div>
            <div className="h-6 bg-gray-300 rounded w-6"></div>
            <div className="h-6 bg-gray-300 rounded w-6"></div>
            <div className="h-6 bg-gray-300 rounded w-6"></div>
            <div className="h-6 bg-gray-300 rounded w-6"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>

          <div className="flex gap-2">
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          </div>

          <div className="h-6 bg-gray-300 rounded w-1/12"></div>
          <div className="flex gap-2 -mt-4">
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-1/12"></div>
          <div className="flex gap-2 -mt-4">
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
            <div className="h-8 bg-gray-300 rounded w-1/12"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded w-1/12"></div>
          <div className="flex gap-2">
            <div className="h-10 bg-gray-300 rounded w-1/6"></div>
            <div className="h-10 bg-gray-300 rounded w-1/6"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-[32%]"></div>
        </div>
      </div>
      <div className="flex flex-col items-center  gap-4">
        <div className="h-8 bg-gray-300 rounded w-1/6"></div>
        <div className="flex flex-col gap-2 w-full items-center mb-4">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="product-card border grid grid-rows-[80%_auto] rounded-xl overflow-hidden relative animate-pulse"
          >
            <div className="bg-gray-300 h-64 w-full"></div>
            <div className="flex justify-between gap-5 px-5 py-3">
              <div className="flex-1 space-y-2 mt-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-300 rounded mt-2 w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Page = ({ params: { id } }: { params: { id: number } }) => {
  const [product, setProduct] = useState<Products | null>(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<number[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data: Products = await SingleProduct(id);
      setProduct(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar key={`full-${index}`} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-yellow-500" />
        ))}
      </>
    );
  };

  const getStockStatus = (count: number) => {
    if (count < 20) {
      return <span className="text-red-700 font-bold">Out Of stock</span>;
    } else if (count >= 20 && count <= 100) {
      return <span className="text-yellow-700 font-bold">Limited stock</span>;
    } else if (count >= 100 && count <= 200) {
      return <span className="text-green-700 font-bold">In stock</span>;
    } else {
      return <span className="text-green-900 font-bold">High stock</span>;
    }
  };

  const handleWishlistToggle = (productId: number) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      addToWishlist(productId);
      setWishlist([...wishlist, productId]);
    }
  };

  return (
    <section className="py-8">
      <div className="container">
        <div className="grid lg:grid-cols-[40%_auto] gap-4 mb-4 border-b pb-6">
          <div className="rounded-lg overflow-hidden relative bg-black">
            <Image
              src={product.image}
              alt="product image"
              width={1000}
              height={1000}
              className="object-cover h-full w-full opacity-70 "
            />
            <div className="absolute top-2 right-2 font-bold text-lg w-fit bg-gray-200 rounded-md px-4 py-2">
              {product.category}
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <h1 className="font-semibold leading-tight text-4xl">
              {product.title}
            </h1>
            <div className="flex gap-1 justify-start">
              {renderStars(product.rating.rate)}
            </div>
            <p className="text-xl tracking-tighter">{product.description}</p>
            <div className="flex items-center gap-4">
              <p className="font-bold text-lg">$ {product.price}</p>
              <p className="text-md">
                {getStockStatus(product.rating.count)} ({product.rating.count}{" "}
                pieces remaining)
              </p>
            </div>
            <div>
              <form className="grid gap-4 md:gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="color" className="text-base">
                    Color
                  </Label>
                  <RadioGroup
                    id="color"
                    defaultValue="black"
                    className="flex items-center gap-2"
                  >
                    <Label
                      htmlFor="color-black"
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    >
                      <RadioGroupItem id="color-black" value="black" />
                      Black
                    </Label>
                    <Label
                      htmlFor="color-white"
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    >
                      <RadioGroupItem id="color-white" value="white" />
                      White
                    </Label>
                    <Label
                      htmlFor="color-blue"
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    >
                      <RadioGroupItem id="color-blue" value="blue" />
                      Blue
                    </Label>
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="size" className="text-base">
                    Size
                  </Label>
                  <RadioGroup
                    id="size"
                    defaultValue="m"
                    className="flex items-center gap-2"
                  >
                    <Label
                      htmlFor="size-xs"
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    >
                      <RadioGroupItem id="size-xs" value="xs" />
                      XS
                    </Label>
                    <Label
                      htmlFor="size-s"
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    >
                      <RadioGroupItem id="size-s" value="s" />S
                    </Label>
                    <Label
                      htmlFor="size-m"
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    >
                      <RadioGroupItem id="size-m" value="m" />M
                    </Label>
                    <Label
                      htmlFor="size-l"
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    >
                      <RadioGroupItem id="size-l" value="l" />L
                    </Label>
                    <Label
                      htmlFor="size-xl"
                      className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    >
                      <RadioGroupItem id="size-xl" value="xl" />
                      XL
                    </Label>
                  </RadioGroup>
                </div>
                <div className="flex items-end gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="quantity" className="text-base">
                      Quantity
                    </Label>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <button className="bg-black flex items-center gap-2 text-white px-6 py-2 rounded-lg relative">
                    <IoCartOutline className="text-lg" /> Add to cart
                  </button>
                </div>
              </form>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleWishlistToggle(product.id)}
                className="rounded-lg px-16 py-2 border border-black flex gap-2 justify-center items-center transition-all duration-150 hover:text-white hover:bg-black group"
              >
                {wishlist.includes(product.id) ? (
                  <IoHeart className="text-lg transition-all ease-in duration-150 group-active:animate-ping" />
                ) : (
                  <IoHeartOutline className="text-lg transition-all ease-in duration-150 group-active:animate-ping" />
                )}
                Add to wishlist
              </button>
            </div>
          </div>
        </div>

        <ProductSection
          dataFetcher={() => Categories(product.category)}
          heading="Related Products"
          link={`/${product.category}`}
          excludeId={product.id}
        />
      </div>
    </section>
  );
};

export default Page;
