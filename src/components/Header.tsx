"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { IoCartOutline, IoCloseSharp, IoHeartOutline, IoSearchOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiMenu4Fill } from "react-icons/ri";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Data, getWishlist, Products } from "../../libs/index";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [wishlistCount, setWishlistCount] = useState(getWishlist().length);

  const dropdownRef = useRef(null);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".menu") && !target.closest(".cart")) {
      setMenuOpen(false);
      setCartOpen(false);
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = async () => {
    setOpen(true);
    const productData = await Data();
    setProducts(productData);
  };

  const fetchCategories = async () => {
    const productData = await Data();
    const uniqueCategories = Array.from(
      new Set(productData.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  };

  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value);

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase()) ||
        product.category.includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleWishlistUpdate = () => {
      setWishlistCount(getWishlist().length);
    };

    window.addEventListener("wishlistUpdated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
    };
  }, []);

  return (
    <header className="border-b">
      <nav className="container flex justify-between items-center relative">
        <div>
          <Link href={"#"} className="text-4xl font-bold">
            Logo
          </Link>
        </div>
        <div
          className={`menu z-10 bg-white/50 backdrop-blur-md fixed lg:relative h-screen lg:h-auto shadow-lg lg:shadow-none top-0 ${
            menuOpen ? "right-0" : "-right-full"
          } lg:right-auto w-full md:w-[60%]  flex items-center justify-center transition-all duration-200 ease-linear`}
        >
          <div className="text-end text-2xl absolute top-6 right-8 lg:hidden">
            <IoCloseSharp className="border rounded-md" onClick={handleMenu} />
          </div>
          <ul className="flex flex-col lg:flex-row items-center gap-4">
            <li>
              <Link href={"/"} className="link">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/shop"} className="link">
                Shop
              </Link>
            </li>
            <li className="relative">
              <p
                className="link cursor-pointer flex items-center gap-2"
                onClick={toggleDropdown}
              >
                Category
                <FaAngleDown
                  className={`${
                    dropdownOpen ? "rotate-180" : "rotate-0"
                  } transition-all duration-100`}
                />
              </p>
              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full z-50 left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md overflow-hidden"
                >
                  <ul className="flex flex-col">
                    {categories.map((category, index) => (
                      <li key={index} className="px-4 py-2 hover:bg-gray-200">
                        <Link
                          className="link"
                          href={`/${category}`}
                          onClick={() => {
                            toggleDropdown();
                          }}
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
              )}
            </li>
            <li>
              <Link href={"/about"} className="link">
                About
              </Link>
            </li>
            <li>
              <Link href={"/contact"} className="link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex text-2xl gap-4">
          <div>
            <IoSearchOutline
              className="cursor-pointer"
              onClick={handleSearchClick}
            />
          </div>
          <div>
            <MdOutlineAccountCircle className="cursor-pointer" />
          </div>
          <div className="relative">
            <IoHeartOutline className="cursor-pointer" />
            <span className="text-xs absolute -top-1 -right-1 pointer-events-none flex justify-center items-center w-4 h-4 rounded-full p-2 bg-black/70 text-white">
              {wishlistCount}
            </span>
          </div>
          <div>
            <IoCartOutline onClick={handleCart} className="cursor-pointer" />
          </div>
          <div className="lg:hidden">
            <RiMenu4Fill onClick={handleMenu} className="cursor-pointer" />
          </div>
        </div>
      </nav>
      <div
        className={`cart z-10 fixed top-0 right-0 h-screen w-[80%] md:w-[40%] bg-white shadow-lg transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Cart</h2>
          <IoCloseSharp
            className="text-2xl cursor-pointer"
            onClick={handleCart}
          />
        </div>
        <div className="p-4">
          <p>Your cart is empty.</p>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a product name or search..."
          value={searchQuery}
          onValueChange={(value) => {
            handleSearchInputChange(value);
          }}
        />
        <CommandList>
          <CommandGroup heading="Products">
            {filteredProducts.map((product) => (
              <CommandItem key={product.id}>
                <div className="flex gap-3 items-center justify-between w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={50}
                    height={50}
                    className="rounded-md aspect-square h-[50px] w-[50px] object-contain"
                  />
                  <p className="w-[70%] line-clamp-1">{product.title}</p>
                  <p className="whitespace-nowrap">$ {product.rating.rate}</p>
                </div>
              </CommandItem>
            ))}
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;
