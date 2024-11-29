"use client";

import React, { useEffect, useState } from "react";
import { Data, Products } from "../../libs";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const CategoryProductsSection = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("men's clothing");

  useEffect(() => {
    const fetchData = async () => {
      const data = await Data();
      setProducts(data);
      setLoading(false);
      const uniqueCategories = Array.from(
        new Set(data.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <section className="py-8">
      <div className="container space-y-6">
        <h2 className="font-bold text-3xl text-center">Products Categories</h2>
        <p className="text-lg text-balance text-center lg:w-10/12 mx-auto">
          This is a section of some simple filler text, also known as
          placeholder text. It shares some characteristics of a real written
          text but is random or otherwise generated.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 justify-items-center w-fit mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full w-fit whitespace-nowrap text-xs sm:text-sm ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="text-end">
          <Link href={`/${selectedCategory}`}>View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="product-card border grid grid-rows-[75%_auto] rounded-xl overflow-hidden relative animate-pulse"
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
              ))
            : filteredProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="product-card border grid grid-rows-[80%_auto] rounded-xl overflow-hidden relative group"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      height={1000}
                      width={1000}
                      className="w-full h-full aspect-square object-contain hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        className="absolute inset-0"
                        href={`/shop/${product.id}`}
                      />

                      <button className="bg-white text-black px-4 py-2 rounded-full relative">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger> Add to cart</TooltipTrigger>
                            <TooltipContent>
                              <p>Add to cart</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 px-5 py-3">
                    <div>
                      <h3 className="text-lg font-bold line-clamp-1">
                        {product.title}
                      </h3>
                      <h3 className="text-sm">{product.category}</h3>
                    </div>
                    <p className="text-lg font-semibold">${product.price}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryProductsSection;
