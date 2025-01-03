"use client";

import { CiFilter } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import {
  Data,
  Products,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getRecentlyViewedProducts,
  addToCart,
  CartProduct,
} from "../../../libs";
import Image from "next/image";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import {
  IoCartOutline,
  IoHeart,
  IoHeartOutline,
  IoClose,
} from "react-icons/io5";
import Link from "next/link";
import MultiRangeSlider from "@/components/MultiRangeSlider/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Page = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Data();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);

      const categories = Array.from(
        new Set(data.map((product) => product.category))
      );
      setCategories(categories);
    };
    fetchData();

    const recentlyViewedProducts = getRecentlyViewedProducts();
    setRecentlyViewed(recentlyViewedProducts);
  }, []);

  useEffect(() => {
    const wishlistData = getWishlist();
    setWishlist(wishlistData);
  }, []);

  useEffect(() => {
    const filterByPrice = () => {
      const filtered = products.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      setFilteredProducts(filtered);
    };

    filterByPrice();
  }, [products, priceRange]);

  const handlePriceChange = ([min, max]: [number, number]) => {
    setPriceRange([min, max]);
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
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const start = indexOfFirstProduct + 1;
  const end =
    indexOfLastProduct > filteredProducts.length
      ? filteredProducts.length
      : indexOfLastProduct;

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

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsSideMenuOpen(false);
    }
  };

  return (
    <section className="py-8 relative overflow-x-hidden">
      {isSideMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={handleOutsideClick}
        />
      )}
      <div className="container relative grid grid-cols-1 lg:grid-cols-[30%_auto] gap-4">
        <div
          className={`sideMenu p-4 !bg-white z-30 fixed min-h-screen  top-0 w-[80%] md:w-1/2 transition-all duration-300 lg:relative lg:top-auto lg:w-auto lg:left-auto ${
            isSideMenuOpen ? "left-0" : "-left-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 lg:hidden"
            onClick={() => setIsSideMenuOpen(false)}
          >
            <IoClose size={24} />
          </button>

          <div className="sticky top-4">
            {loading ? (
              <>
                <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                <div className="px-4 md:px-6 mt-4 mb-6">
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                </div>
                <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
                <div className="flex gap-2 my-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index} 
                      className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"
                    ></div>
                  ))}
                </div>
                <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse mt-4"></div>
                <div className="flex gap-2 flex-col mt-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index} 
                      className="h-20 bg-gray-300 rounded w-full animate-pulse"
                    ></div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
                <div className="flex items-center gap-2 px-4 md:px-6 mt-6">
                  <MultiRangeSlider
                    min={0}
                    max={1000}
                    onChange={({ min, max }) => handlePriceChange([min, max])}
                  />
                </div>
                <div className="mt-14">
                  <h3 className="text-lg font-semibold mb-4">Top Categories</h3>
                  <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                      <Link
                        href={`/${category}`}
                        key={category}
                        className="block text-center py-2 text-sm bg-black text-white hover:bg-black/70 transition-all duration-150 rounded-full px-4"
                      >
                        {category
                          .split(" ")
                          .map((word) => word[0].toUpperCase() + word.slice(1))
                          .join(" ")}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="mt-14">
                  <h3 className="text-lg font-semibold mb-4">
                    Recently Viewed
                  </h3>
                  <div className="flex flex-col gap-4">
                    {recentlyViewed.map((product) => (
                      <Link
                        href={`/shop/${product.id}`}
                        key={product.id}
                        className="grid grid-cols-[20%_auto] items-center gap-4 border-b pb-4"
                      >
                        <div className="w-full aspect-square rounded-xl overflow-hidden border">
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={1000}
                            height={1000}
                            className="object-contain w-full h-full"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium line-clamp-2">
                            {product.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="">
          <h2 className="text-xl uppercase md:text-2xl lg:text-3xl font-semibold pb-5">
            Showing {start}-{end} of {filteredProducts.length} results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array.from({ length: 9 }).map((_, index) => (
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
                    className="product-card border grid grid-rows-[70%_auto] rounded-xl overflow-hidden relative"
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
                        <span
                          className="bg-black text-white px-4 pb-1 pt-2 rounded-full w-fit relative"
                          onClick={() => handleAddToCart(product)}
                        >
                          <TooltipProvider>
                            <Tooltip >
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
        </div>
      </div>

      <button
        className="bg-black/90 w-fit aspect-square text-white fixed bottom-4 right-4 z-50 rounded-full p-3 lg:hidden"
        onClick={() => setIsSideMenuOpen(true)}
      >
        <CiFilter className="text-white text-xl" />
      </button>
    </section>
  );
};

export default Page;
