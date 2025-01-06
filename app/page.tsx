// "use client";
// import { auth } from "@/auth";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import { use, useEffect, useState } from "react";

// export default function Home() {
//   const [movies, setMovies] = useState([]);
//   const getMovies = async () => {
//     try {
//       const res = await fetch(
//         "https://api.themoviedb.org/3/discover/movie?api_key=2615b49551726ef16fee0962175bffe4"
//       );
//       const data = await res.json();
//       //console.log(data.results);
//       setMovies(data.results);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getMovies();
//   }, []);

//   //const session = await auth();
//   return (
//     <section className="w-full mic-h-screen flex flex-wrap gap-4 items-center justify-center p-8 ">
//       {Array.isArray(movies) &&
//         movies.map((movie) => (
//           <div key={movie.id}>
//             <Image
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt="image"
//               width={200}
//               height={200}
//             />
//             <li>{movie.original_title}</li>
//           </div>
//         ))}
//     </section>
//   );
// }

import FAQ from "@/components/FAQ";

import GetStarted from "@/components/GetStarted";
import Hero from "@/components/Hero";
import LearnMore from "@/components/LearnMore";

import ReasonToJoin from "@/components/ReasonToJoin";
import TrendingNow from "@/components/TrendingNow";

export default async function Home() {
  return (
    <section className="w-full min-h-screen bg-[#141414] flex flex-col items-center">
      {/* {Array.isArray(movies.results) &&
        movies.results.map((movie) => (
          <MoviePoster key={movie.id} movie={movie} />
        ))}
      <FreeMovies /> */}
      {/* <MoviesWithGenres /> */}
      <Hero />
      <LearnMore />
      <TrendingNow />
      <ReasonToJoin />
      <FAQ />
      <GetStarted />
    </section>
  );
}
