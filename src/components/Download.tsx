import Image from "next/image";
import React from "react";

const DownloadBanner = () => {
  return (
    <section className="relative p-4 !pb-0 lg:py-10 overflow-hidden lg:px-10  bg-black text-white">
      <div className="container !pb-0  font-medium">
        {/* Background Image */}
        <div className="absolute top-0 left-0 inset-0">
          <Image
            src={"/images/Bg-download.webp"}
            alt="background"
            height={1000}
            width={1000}
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2  relative">
          {/* Left Column */}
          <div className="flex flex-col gap-4 items-center lg:items-start justify-center px-4 lg:px-10">
            <h1 className="text-xl md:text-4xl lg:text-3xl font-bold">
              Looking for the Best Apps?
            </h1>
            <p className="text-sm md:text-lg text-center lg:text-start">
              When an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not.
            </p>
            <div className="mt-4">
              <button className="bg-white text-black px-4 py-2 rounded-md text-sm md:text-base">
                Download Now
              </button>
            </div>
            <div className="flex justify-center lg:justify-start flex-wrap gap-6">
            <Image 
              src={"/images/android.svg"}
              alt="Google Play Store"
              height={1000}
              width={1000}
              className="w-[35%] aspect-video"
              style={{ filter: 'drop-shadow(0 0 3px white)' }}
            />
            <Image 
              src={"/images/apple.svg"}
              alt="Apple Store"
              height={1000}
              width={1000}
              className="w-[35%] aspect-video"
              style={{ filter: 'drop-shadow(0 0 3px white)' }}
            />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex justify-center items-end">
            <Image
              src={"/images/Wardrobe.png"}
              alt="mockup"
              height={1000}
              width={1000}
              className="md:w-[70%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner;