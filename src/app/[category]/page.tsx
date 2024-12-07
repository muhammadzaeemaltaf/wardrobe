"use client";

import React, { useEffect, useState } from "react";
import {
  Categories,
  Products,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  addToCart,
  CartProduct,
} from "../../../libs";
import Image from "next/image";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { IoCartOutline, IoHeartOutline, IoHeart } from "react-icons/io5";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Page = ({ params: { category } }: { params: { category: string } }) => {
  console.log(category);
  const decodedCategory = decodeURIComponent(category);
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      const data = await Categories(decodedCategory);
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, [decodedCategory]);

  useEffect(() => {
    const wishlistData = getWishlist();
    setWishlist(wishlistData);
  }, []);

  const handleWishlistToggle = (productId: number) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      addToWishlist(productId);
      setWishlist([...wishlist, productId]);
    }
  };

  const handleAddToCart = (product: Products) => {
    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      rate: product.rating.rate,
      color: "black",
      size: "M",
      itemCount: 1,
    };
    addToCart(cartProduct);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const start = indexOfFirstProduct + 1;
  const end =
    indexOfLastProduct > products.length ? products.length : indexOfLastProduct;

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

  return (
    <section className="py-8">
      <div className="container">
        <div className="">
          <h2 className="text-xl uppercase md:text-2xl lg:text-3xl font-semibold pb-5">
            Showing {start}-{end} of {products.length} results of{" "}
            {decodedCategory}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="product-card border grid grid-rows-[70%_auto] rounded-xl overflow-hidden relative animate-pulse"
                  >
                    <div className="flex justify-between items-start w-full absolute right-0 px-2 top-2">
                      <div className="bg-gray-200 rounded-full h-10 w-10"></div>
                      <div className="bg-gray-200 rounded-full h-14 w-14"></div>
                    </div>
                    <div className="bg-gray-300 h-64 w-full"></div>
                    <div className="flex justify-center items-center flex-col gap-3 px-2 py-1 border-t">
                      <div className="w-full space-y-2 mt-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="flex gap-1 justify-center">
                          <div className="h-4 bg-gray-300 rounded w-4"></div>
                          <div className="h-4 bg-gray-300 rounded w-4"></div>
                          <div className="h-4 bg-gray-300 rounded w-4"></div>
                          <div className="h-4 bg-gray-300 rounded w-4"></div>
                          <div className="h-4 bg-gray-300 rounded w-4"></div>
                        </div>
                      </div>
                      <div className="w-full text-end flex justify-end">
                        <div className="bg-gray-300 h-10 w-10 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))
              : currentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card border grid grid-rows-[70%_auto] rounded-xl overflow-hidden relative group"
                  >
                    <Link
                      href={`/shop/${product.id}`}
                      className="absolute inset-0"
                    />
                    <div className="flex justify-between items-start w-full absolute right-0 px-2 top-2">
                      <span
                        onClick={() => handleWishlistToggle(product.id)}
                        className="text-xs font-semibold rounded-full h-10 w-10 flex justify-center items-center group"
                      >
                        {wishlist.includes(product.id) ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <IoHeart className="text-lg transition-all ease-in duration-150 group-active:animate-ping" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove from wishlist</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <IoHeartOutline className="text-lg transition-all ease-in duration-150 group-active:animate-ping" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add to To wishlist</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </span>
                      <p className="text-xs font-semibold bg-gray-50 rounded-full h-14 w-14 flex justify-center items-center">
                        ${product.price}
                      </p>
                    </div>
                    <div className="overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        height={1000}
                        width={1000}
                        className="w-full h-full aspect-square object-contain hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex justify-center items-center flex-col gap-3 px-2 py-1 border-t">
                      <div>
                        <h3 className="text-sm font-bold text-center line-clamp-1">
                          {product.title}
                        </h3>
                        <div className="flex gap-1 justify-center">
                          {renderStars(product.rating.rate)}
                        </div>
                      </div>
                      <div className="w-full text-end">
                        <span className="bg-black text-white px-4 pb-1 pt-2 rounded-full w-fit relative"
                        onClick={() => handleAddToCart(product)}
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                {" "}
                                <IoCartOutline />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add to cart</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {products.length > productsPerPage && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 mx-1 bg-gray-300 rounded-full disabled:opacity-50"
              >
                <MdNavigateBefore />
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 mx-1 rounded-full ${
                    currentPage === index + 1 ? "bg-black text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-1 mx-1 bg-gray-300 rounded-full disabled:opacity-50"
              >
                <MdOutlineNavigateNext />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
