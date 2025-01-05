"use server";

const apiKey = "2615b49551726ef16fee0962175bffe4";
const BASE_URL = "https://api.themoviedb.org/3";

export async function getRandomMovie() {
  try {
    const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${apiKey}`);
    const data = await res.json();

    // const randomMovie =
    //   data.results[Math.floor(Math.random() * data.results.length)];
    return data.results;
  } catch (error) {
    console.error("Error fetching random movie:", error);
  }
}

// const trailerRes = await fetch(
//   `${BASE_URL}/movie/${randomMovie.id}/videos?api_key=${apiKey}`
// );
// const trailerData = await trailerRes.json();
// return trailerData;

// const getTrailer = async (movieId) => {
//     try {
//       const res = await fetch(
//         `${BASE_URL}/movie/${movieId}/videos?api_key=${apiKey}`
//       );
//       const data = await res.json();

//       const trailer = data.results.find(
//         (video) => video.type === "Trailer" && video.site === "YouTube"
//       );

//       return trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1` : null;
//     } catch (error) {
//       console.error("Error fetching trailer:", error);
//     }

//   }

export async function getTrendingMovie() {
  try {
    const res = await fetch(`${BASE_URL}/trending/all/day?api_key=${apiKey}`);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}
export async function getTrendingTVshows() {
  try {
    const res = await fetch(`${BASE_URL}/trending/tv/day?api_key=${apiKey}`);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}
export async function getTopRatedMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${apiKey}`);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}
export async function getPopularTvSeries() {
  try {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${apiKey}`);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}
