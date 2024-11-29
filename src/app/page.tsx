"use client"

import { Data} from "../../libs"; 
import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import ProductSection from "@/components/ProductSection";
import Loading from "@/app/loading";
import DownloadBanner from "@/components/Download";
import CategoryProductsSection from "@/components/CategoryProductsSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Hero />
      <ProductSection dataFetcher={Data} heading="Featured Products" link="/shop"/>
      <CategoryProductsSection />
      <Newsletter />
      <DownloadBanner/>
    </>
  );
}
