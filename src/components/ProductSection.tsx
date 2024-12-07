"use client";

import React, { useEffect, useState } from "react";
import { addToCart, CartProduct, Products } from "../../libs"; // Adjust the import path as necessary
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface ProductSectionProps {
  dataFetcher: () => Promise<Products[]>;
  heading: string;
  link: string;
  excludeId?: number;
}


const ProductSection: React.FC<ProductSectionProps> = ({
  dataFetcher,
  heading,
  link,
  excludeId,
}) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dataFetcher();
      const filteredData = excludeId
        ? data.filter((product) => product.id !== excludeId)
        : data;
      setProducts(filteredData);
      setLoading(false);
    };
    fetchData();
  }, [dataFetcher, excludeId]);

  const displayProducts = products.slice(0, 4);

  const gridClassName = `grid gap-6 ${
    !loading &&  displayProducts.length < 4 
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center lg:w-[80%] mx-auto'
      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }`;


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
  return (
    <section className="py-8">
      <div className="container space-y-6">
        <h2 className="font-bold text-3xl text-center">{heading}</h2>
        <p className="text-lg text-balance text-center lg:w-10/12 mx-auto">
          This is a section of some simple filler text, also known as
          placeholder text. It shares some characteristics of a real written
          text but is random or otherwise generated.
        </p>
        <div className="text-end">
          <Link href={link}>View all</Link>
        </div>
        <div className={gridClassName}>
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
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
              ))
            : displayProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card border grid grid-rows-[80%_auto] place-content-center rounded-xl overflow-hidden relative group"
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

                      <button className="bg-white text-black px-4 py-2 rounded-full relative"
                      onClick={() => handleAddToCart(product)}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              Add to cart
                            </TooltipTrigger>
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

export default ProductSection;
