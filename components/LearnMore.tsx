import Image from "next/image";
import React from "react";

export default function LearnMore() {
  return (
    <div className="w-[95%] max-w-[1320px] flex items-center gap-6 mt-12">
      <Image
        src="/popcorn.jpg"
        alt=""
        width={100}
        height={100}
        className="w-[100px] h-[80px] rounded-3xl"
      />
      <div className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-indigo-950  to-blue-950 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            The Netflix you love for just $7.99.
          </h2>
          <p className="text-white">
            Get our most affordable, ad-supported plan.
          </p>
        </div>
        <button className="px-2 py-1 bg-gray-600 rounded-sm text-white font-bold">
          Learn more
        </button>
      </div>
    </div>
  );
}
