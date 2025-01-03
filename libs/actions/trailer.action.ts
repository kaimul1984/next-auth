"use server";

const apiKey = "2615b49551726ef16fee0962175bffe4";

export async function getRandomMovie() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
    );
    const data = await res.json();

    // const randomMovie =
    //   data.results[Math.floor(Math.random() * data.results.length)];
    return data.results;
  } catch (error) {
    console.error("Error fetching random movie:", error);
  }
}

// const trailerRes = await fetch(
//   `https://api.themoviedb.org/3/movie/${randomMovie.id}/videos?api_key=${apiKey}`
// );
// const trailerData = await trailerRes.json();
// return trailerData;

// const getTrailer = async (movieId) => {
//     try {
//       const res = await fetch(
//         `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
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
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}
export async function getTrendingTVshows() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}
