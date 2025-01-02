"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Data } from "../../libs/index";
import Image from "next/image";
// import Image from 'next/image';

const Footer = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const products = await Data();
      const uniqueCategories = Array.from(
        new Set(products.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-gray-100 text-gray-800 py-10 px-4">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="grid lg:grid-rows-[40%_auto]">
          <div className="relative">
            <Image
              src={"/images/Wardrobee.svg"}
              alt="Wardrobee"
              width={1000}
              height={1000}
              className="w-24 object-cover"
            />
            <Link href="/" className="absolute inset-0 w-[200px]" />
          </div>
          <div>
            <p>gmail@gmail.com</p>
            <p>(000) 0000-00000</p>
            <div className="flex gap-4 mt-4">
              <FaFacebook className="text-xl cursor-pointer hover:text-blue-600" />
              <FaGithub className="text-xl cursor-pointer hover:text-gray-700" />
              <FaTwitter className="text-xl cursor-pointer hover:text-blue-400" />
              <FaLinkedin className="text-xl cursor-pointer hover:text-blue-800" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Information</h3>
          <p>3554 Zindabahar, Haha, NIKE 10632, Monte Cristo</p>
          <p>Support@polymath.com</p>
          <p>+008-176985656</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <Link
                  className="mb-2 link w-fit"
                  href={`/category/${category.toLowerCase()}`}
                >
                  {category
                    .split(" ")
                    .map(
                      (char) =>
                        char.charAt(0).toUpperCase() +
                        char.slice(1).toLocaleLowerCase()
                    )
                    .join(" ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help Center Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Help Center</h3>
          <ul>
            <li>
              <Link className="mb-2 link w-fit" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="mb-2 link w-fit" href="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className="mb-2 link w-fit" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="mb-2 link w-fit" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
        <p>&copy; 2023 Wardrobe. All rights reserved.</p>
        <p className="mt-2">Terms of Use | Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
