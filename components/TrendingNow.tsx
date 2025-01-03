"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Skeleton from "./Skeleton";

type MovieProps = {
  id: number;
  title: string;
  original_title: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: "movie";
  adult: boolean;
  original_language: string;
  genre_ids: string[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function TrendingNow() {
  const [selectedOption, setSelectedOption] = useState("movie");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "2615b49551726ef16fee0962175bffe4";

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchMovies = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/${selectedOption}/day?api_key=${apiKey}`
        );
        const data = await res.json();
        setMovies(data.results);
      };

      fetchMovies();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedOption]);

  const handleSelectedonChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <div className="w-full max-w-[1320px] my-16 ">
      <h2 className="font-bold text-2xl text-white">Trending now</h2>
      <div className="flex items-center bg-black border-4 border-white px-2 py-2 rounded-md w-max my-4">
        <select
          value={selectedOption}
          onChange={handleSelectedonChange}
          id="language"
          className="bg-black text-white border-none outline-none"
        >
          <option value="movie">Movies</option>
          <option value="tv">TV shows</option>
        </select>
      </div>
      <div className="w-full mt-6">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <Slider {...settings}>
              {movies.map((movie: MovieProps, index: number) => (
                <div key={movie.id} className="relative ml-7 group py-6">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${
                      selectedOption === "movie"
                        ? movie.original_title
                        : movie.original_name
                    }`}
                    //   onClick={() => handlePosterClick(movie.id)}
                    width={500}
                    height={500}
                    priority
                    className="w-[210px] h-[300px] rounded-lg transition-all duration-300 group-hover:scale-110 z-50"
                  />
                  <span className="text-8xl text-black font-bold absolute z-50 -left-6 bottom-8 drop-shadow-2xl text-stroke  ">
                    {index + 1}
                  </span>
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </div>
  );
}
