"use client";

import { useState, useEffect } from "react";

const Newsletter = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <section className="my-4">
        <div className="container py-20 bg-black rounded-xl flex justify-center">
          <div className="max-w-2xl w-full">
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="relative mt-6">
              <div className="h-10 bg-gray-300 rounded w-full"></div>
              <div className="h-10 bg-gray-300 rounded w-1/4 absolute right-1.5 top-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-4 container !px-5">
      <div className="py-20 bg-black rounded-xl flex justify-center">
        <div className="max-w-2xl">
          <h1 className="text-white text-2xl md:text-5xl text-center font-semibold">
            GET EXCLUSIVE OFFER ON YOUR EMAIL
          </h1>
          <h2 className="text-white text-xl md:text-3xl text-center my-3">Subscribe to our newletter and stay updated</h2>
          <div className="relative mt-6">
            <input
              type="email"
              placeholder="Enter email*"
              className="border bg-transparent text-white w-full rounded-full p-4 outline-none"
            />
            <button className="bg-white text-black font-semibold rounded-full py-2 px-4 text-sm md:text-lg md:py-2.5 md:px-6 absolute right-1.5 top-1/2 -translate-y-1/2">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
