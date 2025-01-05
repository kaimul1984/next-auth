"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

type MovieProps = {
  id: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  name: string;
  title: string;
};

const MoviesWithGenres = ({ title }: { title: string }) => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState(null);
  let hoverTimeout: NodeJS.Timeout;

  const apiKey = "2615b49551726ef16fee0962175bffe4"; // Use your API key

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        // Fetch genres
        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/${title}/list?api_key=${apiKey}`
        );
        const genreData = await genreResponse.json();
        setGenres(genreData.genres);

        // Fetch all movies
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/discover/${title}?api_key=${apiKey}`
        );
        const movieData = await movieResponse.json();
        setMovies(movieData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGenresAndMovies();
  }, [apiKey]);

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/${title}?api_key=${apiKey}&with_genres=${genreId}`
      );
      const data = await response.json();
      setMovies(data.results);
      setSelectedGenre(genreId);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  const handlePosterHover = (movie) => {
    clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${title}/${movie.id}/videos?api_key=${apiKey}`
        );

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
    <div className="max-w-[1320px] mx-auto flex flex-col items-center justify-center p-8">
      <h1 className="text-white text-3xl mb-6 capitalize">{title}</h1>

      {/* Genre Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => {
            setSelectedGenre(null);
            fetchMoviesByGenre("");
          }}
          className={`px-4 py-2 rounded-md ${
            selectedGenre === null ? "bg-blue-600 text-white" : "bg-gray-400"
          }`}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => fetchMoviesByGenre(genre.id)}
            className={`px-4 py-2 rounded-md ${
              selectedGenre === genre.id
                ? "bg-blue-600 text-white"
                : "bg-gray-400"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movie List */}
      <div className="flex flex-wrap justify-center gap-4">
        {movies.map((movie: MovieProps) => (
          <div
            key={movie.id}
            onMouseEnter={() => handlePosterHover(movie)}
            onMouseLeave={handlePosterLeave}
            className="relative w-[250px] h-[300px] bg-slate-800"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || "image"}
              width={500}
              height={300}
              className="w-full h-full rounded-lg "
            />

            {/* Expanded Trailer Popup */}
            {hoveredMovie?.id === movie.id && (
              <div className="absolute top-[-50px] left-[-50px] w-[500px] h-[400px] bg-black rounded-lg shadow-lg z-50 transition-transform duration-300 ease-in-out">
                {trailerUrl ? (
                  <iframe
                    src={trailerUrl}
                    title="Movie Trailer"
                    width="500"
                    height="300"
                    className="rounded-t-lg z-50"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title || movie.name}
                    width={500}
                    height={300}
                    className="rounded-t-lg"
                  />
                )}
                <div className="p-2 text-white">
                  <h2 className="text-lg font-bold">
                    {movie.title || movie.name}
                  </h2>
                  <p className="text-sm">{movie.overview.slice(0, 80)}...</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesWithGenres;
