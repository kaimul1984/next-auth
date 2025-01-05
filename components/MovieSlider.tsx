"use client";

import Image from "next/image";

import React, { useRef, useState } from "react";
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
};
type Movies = {
  movies: Movie[];
  title: string;
};

const apiKey = "2615b49551726ef16fee0962175bffe4";

export default function MovieSlider({ movies, title }: Movies) {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState(null);

  // const { data: session } = useSession();

  let hoverTimeout: NodeJS.Timeout;
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

  const handlePosterHover = (movie) => {
    clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(async () => {
      const isMovie = movie.media_type === "movie";
      const endPoint = isMovie
        ? `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
        : `https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${apiKey}`;
      try {
        const response = await fetch(endPoint);

        if (!response.ok) {
          throw new Error("Failed to fetch trailer");
        }

        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        setTrailerUrl(
          trailer
            ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`
            : ""
        );
        setHoveredMovie(movie);
      } catch (err) {
        console.error(err);
      }
    }, 500); // Small delay before showing the trailer
  };

  const handlePosterLeave = () => {
    clearTimeout(hoverTimeout);
    setHoveredMovie(null);
    setTrailerUrl("");
  };
  return (
    <div
      className="w-full pl-14 relative cursor-pointer "
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-white font-bold text-2xl absolute top-5">{title}</h2>

      <div
        className="flex space-x-2 overflow-x-scroll scrollbar-hide  py-16"
        ref={sliderRef}
      >
        {movies.map((movie) => (
          <div
            key={movie?.id}
            onMouseEnter={() => handlePosterHover(movie)}
            onMouseLeave={handlePosterLeave}
            className="rounded-md  shadow-2xl relative group"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie?.title || "image"}
              width={1000}
              height={1000}
              className="min-w-[250px] h-[300px] object-fill  rounded-md"
            />
            {/* <h3 className="text-white font-bold">
              {movie.title || movie.name}
            </h3> */}
            {hoveredMovie?.id === movie.id && (
              <div className="w-[400px] h-[420px] bg-slate-900 absolute top-[-50px] left-[-50px] overflow-visible z-50">
                {trailerUrl ? (
                  <iframe
                    src={trailerUrl}
                    title="Movie Trailer"
                    width="400"
                    height="250"
                    className="rounded-t-lg"
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
            )}
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

// export default function Expertise({ item, index }: ItemProps) {
//   //const IconComponent = item.icon;
//   return (
//     <div className={styles.outer}>
//       <div className={styles.expertise}>
//         <div className={styles.cardsIcons}>
//           {icons[index % icons.length].icon}
//         </div>
//         <h1>{item.title}</h1>
//         <p>{item.info}</p>
//         <div className={styles.overlay}>
//           <h2>{item.title}</h2>
//           <p>{item.info1}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
