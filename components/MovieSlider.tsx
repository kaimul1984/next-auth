"use client";

import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import MovieInfo from "./MovieInfo";
import { useSession } from "next-auth/react";

type Movie = {
  id: number;
  poster_path: string;
  backdrop_path?: string;
  title: string;
  name: string;
  media_type: string;
};
type Movies = {
  movies: Movie[];
  title: string;
};

const apiKey = "2615b49551726ef16fee0962175bffe4";

export default function MovieSlider({ movies, title }: Movies) {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // const { data: session } = useSession();

  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
    console.log(sliderRef.current?.offsetWidth);
  };
  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   if (!hoveredMovie) {
  //     setTrailerUrl(null);
  //     return;
  //   }

  //   const fetchTrailer = async () => {
  //     const isMovie = hoveredMovie.media_type === "movie";
  //     const endPoint = isMovie
  //       ? `https://api.themoviedb.org/3/movie/${hoveredMovie.id}/videos?api_key=${apiKey}`
  //       : `https://api.themoviedb.org/3/tv/${hoveredMovie.id}/videos?api_key=${apiKey}`;

  //     try {
  //       const response = await fetch(endPoint);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch trailer");
  //       }

  //       const data = await response.json();
  //       const trailer = data.results.find(
  //         (video) => video.type === "Trailer" && video.site === "YouTube"
  //       );

  //       setTrailerUrl(
  //         trailer
  //           ? `https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&mute=1`
  //           : ""
  //       );
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchTrailer();
  // }, [hoveredMovie]);

  // const handlePosterHover = (movie: Movie) => {
  //   if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

  //   hoverTimeoutRef.current = setTimeout(() => {
  //     setHoveredMovie(movie); // ✅ This updates `hoveredMovie`
  //   }, 500); // Small delay before showing the trailer
  // };

  // const handlePosterLeave = () => {
  //   if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  //   setHoveredMovie(null);
  // };

  useEffect(() => {
    if (!hoveredMovie) {
      setTrailerUrl(null); // ✅ Clear trailer when hover is removed
      return;
    }

    const fetchTrailer = async () => {
      const isMovie = hoveredMovie.media_type === "movie";
      const endPoint = isMovie
        ? `https://api.themoviedb.org/3/movie/${hoveredMovie.id}/videos?api_key=${apiKey}`
        : `https://api.themoviedb.org/3/tv/${hoveredMovie.id}/videos?api_key=${apiKey}`;

      try {
        const response = await fetch(endPoint);
        if (!response.ok) {
          throw new Error("Failed to fetch trailer");
        }

        const data = await response.json();
        const trailer = data.results.find(
          (video: any) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerUrl(
            `https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&mute=1`
          );
        } else {
          setTrailerUrl(null); // ✅ Avoid unnecessary iframe creation
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrailer();

    return () => {
      if (iframeRef.current) {
        iframeRef.current.src = ""; // ✅ Cleanup iframe on unmount
      }
    };
  }, [hoveredMovie]);

  // const handlePosterHover = (movie: Movie) => {
  //   setHoveredMovie(movie);
  // };

  // const handlePosterLeave = () => {
  //   setHoveredMovie(null);
  // };

  const handlePosterHover = (movie: Movie) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMovie(movie); // ✅ This updates `hoveredMovie`
    }, 500); // Small delay before showing the trailer
  };

  const handlePosterLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredMovie(null);
  };
  return (
    <div
      className="w-full pl-6 lg:pl-14 relative cursor-pointer "
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-white font-bold text-md lg:text-2xl absolute top-[12px] lg:-top-1">
        {title}
      </h2>

      <div
        className="flex items-center h-full space-x-2 overflow-x-scroll scrollbar-hide py-12  "
        ref={sliderRef}
      >
        {movies.map((movie) => (
          <div
            key={movie?.id}
            onMouseEnter={() => handlePosterHover(movie)}
            onMouseLeave={handlePosterLeave}
            className="min-w-[180px] h-[180px] lg:min-w-[280px] xl:min-w-[300px] lg:h-[200px] xl:h-[250px] rounded-md   shadow-2xl "
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie?.title || "image"}
              width={1000}
              height={1000}
              className="w-full h-full object-fill  rounded-md"
            />

            <div
              className={`absolute -top-[50px] w-[450px] h-[410px] bg-slate-400 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out  ${
                hoveredMovie?.id === movie.id
                  ? "scale-100"
                  : "scale-0 opacity-0 pointer-events-none"
              } `}
            >
              {trailerUrl ? (
                <iframe
                  key={trailerUrl}
                  src={trailerUrl}
                  title="Movie Trailer"
                  width="450"
                  height="250"
                  className="rounded-t-lg z-50 bg-white p-1"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                    backgroundPosition: "cenetr",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              ) : (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title || movie.name}
                  width={400}
                  height={200}
                  className="rounded-t-lg"
                />
              )}
              <MovieInfo movie={movie} />
            </div>
          </div>
        ))}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-[50%] -translate-y-1/2 left-4 md:left-16 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-50
            "
            onClick={scrollLeft}
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            className="absolute top-[50%] -translate-y-1/2 right-5 md:right-16 flex items-center justify-center
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
