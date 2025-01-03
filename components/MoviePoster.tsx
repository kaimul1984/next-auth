// "use client";

// import Image from "next/image";
// import React, { useState } from "react";

// const MoviePoster = ({ movie }) => {
//   const [trailerUrl, setTrailerUrl] = useState("");
//   const [error, setError] = useState("");

//   const handlePosterClick = async () => {
//     try {
//       const apiKey = "2615b49551726ef16fee0962175bffe4"; // Use your API key
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch trailer");
//       }

//       const data = await response.json();
//       const trailer = data.results.find(
//         (video) => video.type === "Trailer" && video.site === "YouTube"
//       );

//       if (trailer) {
//         setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
//         setError("");
//       } else {
//         setError("Trailer not available.");
//       }
//     } catch (err) {
//       setError("Failed to load trailer. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <Image
//         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//         alt={movie.title}
//         onClick={handlePosterClick}
//         style={{ cursor: "pointer" }}
//         width={200}
//         height={200}
//       />
//       {/* Modal to play trailer */}
//   {trailerUrl && (
//     <div
//       style={{
//         position: "fixed",
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)",
//         zIndex: 1000,
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         padding: "1rem",
//       }}
//     >
//       <iframe
//         width="560"
//         height="315"
//         src={trailerUrl}
//         title="YouTube video player"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//       <button onClick={() => setTrailerUrl("")} className="text-white">
//         Close
//       </button>
//     </div>
//   )}
//   {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default MoviePoster;
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const MoviesWithGenres = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [error, setError] = useState("");

  const apiKey = "2615b49551726ef16fee0962175bffe4"; // Use your API key

  // Fetch genres and all movies on initial load
  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        // Fetch genres
        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        const genreData = await genreResponse.json();
        setGenres(genreData.genres);

        // Fetch all movies
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
        );
        const movieData = await movieResponse.json();
        setMovies(movieData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGenresAndMovies();
  }, [apiKey]);

  // Fetch movies by genre
  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
      );
      const data = await response.json();
      setMovies(data.results);
      setSelectedGenre(genreId);
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  const handlePosterClick = async (movieId) => {
    try {
      const apiKey = "2615b49551726ef16fee0962175bffe4"; // Use your API key
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trailer");
      }

      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        setError("");
      } else {
        setError("Trailer not available.");
      }
    } catch (err) {
      setError("Failed to load trailer. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen felx flex-col items-center justify-center p-8">
      <h1>Movies</h1>

      {/* Genre Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <button
          onClick={() => {
            // Fetch all movies when "All" is clicked
            setSelectedGenre(null);
            fetchMoviesByGenre(""); // Fetch without genre filter
          }}
          style={{
            backgroundColor: selectedGenre === null ? "blue" : "gray",
            color: "white",
            padding: "0.5rem 1rem",
          }}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => fetchMoviesByGenre(genre.id)}
            style={{
              backgroundColor: selectedGenre === genre.id ? "blue" : "gray",
              color: "white",
              padding: "0.5rem 1rem",
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Movie List */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: "150px", textAlign: "center" }}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onClick={() => handlePosterClick(movie.id)}
              width={200}
              height={200}
              priority
              style={{ width: "100%", borderRadius: "8px", background: "teal" }}
            />
            <p>{movie.title}</p>
          </div>
        ))}
        {trailerUrl && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              padding: "2rem",
            }}
          >
            <iframe
              width="560"
              height="315"
              src={trailerUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setTrailerUrl("")}
              className="text-white absolute right-0 top-0 "
            >
              Close
            </button>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default MoviesWithGenres;
