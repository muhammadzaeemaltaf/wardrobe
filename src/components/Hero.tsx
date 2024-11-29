"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const Hero = () => {
  const imageRef = useRef(null);

const tl = gsap.timeline()

  useGSAP(() => {
    if (imageRef.current) {
        tl.fromTo(imageRef.current, {
          opacity: 0,
          position: "absolute",
          width: "400%",
          scale:2,
          ease: "power3.inOut",
        },{
          opacity:1,
          position: "relative",
          scale: 1,
          duration: 1.5,
          width: "100%",
          ease: "power3.inOut",
        });
      }

    tl.from(".sideImage", {
      y: 100,
      opacity: 0,
      stagger: -0.15,
    });
    tl.from(".sideImage2", {
      y: -100,
      opacity: 0,
      stagger: 0.15,
    });

    
  }, [imageRef]);

  return (
    <section className="py-8">
      <div className="container flex flex-col md:flex-row gap-8 items-center">
        <div className="space-y-3 md:w-[55%] flex flex-col items-center md:items-start">
          <h1 className="text-3xl text-center md:text-start lg:text-6xl font-bold md:text-balance">
            Let&apos;s Enchance your <span>Wardrobe</span>{" "}
            with our latest collection.
          </h1>
          <p className="text-lg text-balance text-center md:text-start">We sell only the most exclusive and high quailty product for you. We are the best so come and shop with us.</p>
          <Link href={"/shop"} className="border rounded-full px-4 py-2">Shop Now</Link>
        </div>
        <div className="md:w-[45%] aspect-square  justify-end">
          <div className="grid grid-cols-5 rounded-full overflow-hidden relative aspect-square gap-2 w-full h-full">
            <div className="w-full overflow-hidden h-full sideImage">
              <Image
                src={"/images/hero-5.jpg"}
                alt="Hero image"
                height={1000}
                width={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full overflow-hidden h-full sideImage2">
              <Image
                src={"/images/hero-3.jpg"}
                alt="Hero image"
                height={1000}
                width={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-auto overflow-hidden h-full" ref={imageRef}>
              <Image
                src={"/images/hero-2.avif"}
                alt="Hero image"
                height={1000}
                width={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full overflow-hidden h-full sideImage2">
              <Image
                src={"/images/hero-4.jpg"}
                alt="Hero image"
                height={1000}
                width={1000}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full overflow-hidden h-full sideImage">
              <Image
                src={"/images/hero-1.avif"}
                alt="Hero image"
                height={1000}
                width={1000}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
