import Image from "next/image";
import React from "react";
const Hero = () => {
  return (
    <section className="md:mt-40 w-full mt-32">
      <div className="px-5 md:px-10 flex flex-col md:flex-row items-center">
        {/* title */}
        <div className="flex flex-col justify-center flex-1 mb-6 md:mb-0">
          <p className="uppercase text-gray-400 text-center md:text-left">The Future Is Now</p>
          <h1 className="uppercase text-[55px] leading-tight sm:text-7xl font-bold text-center md:text-left text-gray-800 max-w-xl">
            Start Building Your <span className="text-orange-400">Smart Home</span>
          </h1>
          <div className="flex justify-start mt-10 mx-auto md:mx-0">
            <input type="text" className="py-4 px-4 w-80 focus:ring-inset focus:border focus:border-orange-400 focus:ring-1 focus:ring-orange-400" placeholder="Subscribe and get $30 discount" />
            <button className="bg-gray-700 py-4 px-8 text-white hover:bg-orange-400 transition">Subscribe</button>
          </div>
        </div>
        {/* image */}
        <div className="flex flex-col items-center">
          <div className="relative md:mt-0 mt-8">
            <div className="absolute z-20 md:-top-8 -top-6 md:right-5 right-8 bg-orange-400 md:py-8 md:px-8 py-7 px-7 text-base rounded-full text-white uppercase">
              Learn
              <br /> More
            </div>
            <Image width={380} height={380} layout="intrinsic" objectFit="cover" src="/appleHomePod.png" alt="homePod" />
          </div>
          <div>
            <h2 className="text-3xl font-medium text-gray-800">Apple Homepod</h2>
            <p className="text-gray-300 text-base max-w-[200px] mt-3">The Foundation for any smart home</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
