"use client";
import Image from "next/image";

import React, { useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
};
type Movies = {
  movies: Movie[];
  title: string;
};

export default function MovieSlider({ movies, title }: Movies) {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  return (
    <div
      className="w-full pl-14 relative cursor-pointer  py-2"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-white font-bold text-2xl mb-6">{title}</h2>

      <div
        className="flex space-x-2 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {movies.map((movie) => (
          <div
            key={movie?.id}
            className="flex items-center justify-center ma rounded-md bg-gray-500"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie?.title || "image"}
              width={500}
              height={500}
              className="min-w-[300px] h-[150px] object-fill  rounded-md"
            />
          </div>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-[60%] -translate-y-1/2 left-4 md:left-16 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-50
            "
            onClick={scrollLeft}
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            className="absolute top-[60%] -translate-y-1/2 right-5 md:right-16 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollRight}
          >
            <FaChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}
