import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import { FaChevronRight } from "react-icons/fa";
import GetStarted from "./GetStarted";

export default function Hero() {
  return (
    <div className="w-[95%] max-w-[1920px] h-[900px]  clip-custom  px-1 pb-1 bg-gradient-to-b from-red-800 to-pink-600 rounded-t-[100px] rounded-b-[150px] ">
      <div className="w-full h-full relative">
        <Navbar />

        <Image
          src="/login_background.jpg"
          alt="login page image"
          width={2000}
          height={1000}
          priority
          className="absolute w-full h-full top-0 left-0 object-cover brightness-50 clip-custom shadow-2xl shadow-red-950 "
        />
        <div className="w-[900px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-center text-[64px] font-extrabold text-white  ">
            Unlimited movies, TV shows and more
          </h1>
          <h3 className="text-center text-white text-xl font-bold my-6">
            Starts at $7.99. Cancel at any time.
          </h3>

          <GetStarted />
        </div>
      </div>
    </div>
  );
}
