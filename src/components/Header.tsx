"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  IoCartOutline,
  IoCloseSharp,
  IoHeartOutline,
  IoSearchOutline,
} from "react-icons/io5";
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
import {
  CartProduct,
  Data,
  getCart,
  getWishlist,
  handleItemCount,
  Products,
  removeFromCart,
} from "../../libs/index";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { Button } from "./ui/button";
import { CiCircleRemove } from "react-icons/ci";
import { usePathname } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [cartList, setCartList] = useState<CartProduct[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname().includes("cart");

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
    setWishlistCount(getWishlist().length);
    setCartCount(getCart().length);
  }, []);

  useEffect(() => {
    const cartlistData = getCart();
    setCartList(cartlistData);
  }, []);

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

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(getCart().length);
      setCartList(getCart());
      setCartOpen(true);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  useEffect(() => {
    const handleProductAdded = () => {
      setCartOpen(true);
    };

    window.addEventListener("productAddedToCart", handleProductAdded);

    return () => {
      window.removeEventListener("productAddedToCart", handleProductAdded);
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
              <Link
                href={"/"}
                className="link"
                onClick={() => {
                  setDropdownOpen(false);
                  setCartOpen(false);
                  handleMenu();
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/shop"}
                className="link"
                onClick={() => {
                  setDropdownOpen(false);
                  setCartOpen(false);
                  handleMenu();
                }}
              >
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
                            setCartOpen(false);
                            handleMenu();
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
              <Link
                href={"/about"}
                className="link"
                onClick={() => {
                  setDropdownOpen(false);
                  setCartOpen(false);
                  handleMenu();
                }}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className="link"
                onClick={() => {
                  setDropdownOpen(false);
                  setCartOpen(false);
                  handleMenu();
                }}
              >
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
            <Link href={"/wishlist"}>
              <IoHeartOutline className="cursor-pointer" />
              <span className="text-xs absolute -top-1 -right-1 pointer-events-none flex justify-center items-center w-4 h-4 rounded-full p-2 bg-black/70 text-white">
                {wishlistCount}
              </span>
            </Link>
          </div>
          <div className="relative">
            <IoCartOutline onClick={handleCart} className="cursor-pointer" />
            <span className="text-xs absolute -top-1 -right-1 pointer-events-none flex justify-center items-center w-4 h-4 rounded-full p-2 bg-black/70 text-white">
              {cartCount}
            </span>
          </div>
          <div className="lg:hidden">
            <RiMenu4Fill onClick={handleMenu} className="cursor-pointer" />
          </div>
        </div>
      </nav>
      <div
        className={`cart z-10 fixed top-0 right-0 h-screen w-[90%] md:w-[50%] lg:w-[30%] bg-white shadow-lg transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out ${
          pathname ? "!hidden" : ""
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold relative">
            Cart
            <span className="text-xs absolute top-1 -right-5  pointer-events-none flex justify-center items-center w-4 h-4 rounded-full p-2 bg-black/70 text-white">
              {cartCount}
            </span>
          </h2>
          <IoCloseSharp
            className="text-2xl cursor-pointer"
            onClick={handleCart}
          />
        </div>
        <div className="p-4 overflow-auto h-[74%] cartList pb-8">
          {cartList.length > 0 ? (
            cartList.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 items-center mb-4 pb-4 border-b"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={50}
                  height={50}
                  className="rounded-md aspect-square h-[50px] w-[50px] object-contain border"
                />
                <div className="flex justify-between flex-1 gap-2">
                  <div className="space-y-2 flex-1">
                    <p className="text-xs">{product.title}</p>
                    <div className="flex justify-between">
                      <div className="flex items-center border rounded-full overflow-hidden w-fit">
                        <Button
                          className="!p-1 !h-6 !w-6 aspect-square rounded-none"
                          onClick={() => handleItemCount(product.id, -1)}
                        >
                          -
                        </Button>
                        <span className="!p-1 !h-6 !w-6 aspect-square border flex items-center justify-center">
                          {product.itemCount}
                        </span>
                        <Button
                          className="!p-1 !h-6 !w-6 aspect-square rounded-none"
                          onClick={() => handleItemCount(product.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                      <p className="text-end whitespace-nowrap">
                        $ {(product.price * product.itemCount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <p
                      className="font-semibold cursor-pointer"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <CiCircleRemove className="h-6 w-6 text-red-700" />
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {cartList.length > 0 && (
          <div className="px-4 py-2 border-t-2 space-y-4">
            <div className="flex justify-between gap-3">
              <p className="flex-1 text-lg font-semibold">Total</p>
              <p className="flex-1 text-center font-semibold">
                {cartList
                  .map((item) => item.itemCount)
                  .reduce((acc, item) => acc + item, 0)}{" "}
                items
              </p>
              <p className="flex-1 text-lg text-end font-semibold">
                $
                {cartList
                  .reduce((acc, item) => acc + item.price * item.itemCount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Button className="w-full border" variant="outline">
                  <Link href={"/cart"}>View Cart</Link>
                </Button>
              </div>
              <div className="flex-1">
                <Button className="w-full">Checkout</Button>
              </div>
            </div>
          </div>
        )}
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
