import Image from "next/image";
import React from "react";

type Movie = {
  title: string;
  id: string;
  movieId: number;
  userId: string;
  posterPath: string;
  backdropPath: string | null;
  createdAt: Date;
};
type Movies = {
  movies: Movie[];
  title: string;
};

export default function MyList({ movies, title }: Movies) {
  return (
    <div className="w-full pl-14  relative z-50">
      <h2 className="text-white font-bold text-2xl absolute top-5">{title}</h2>
      <div className="flex space-x-2 overflow-x-scroll scrollbar-hide  py-16">
        {movies.map((movie) => (
          <div key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie?.title || "image"}
              width={1000}
              height={1000}
              className="w-[200px] max-h-[200px] object-fill  rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}