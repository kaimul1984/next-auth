// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { FaPlay } from "react-icons/fa";
// import { GoInfo } from "react-icons/go";

// type MovieProps = {
//   randomMovies: {
//     backdrop_path: string;
//     title: string;
//     overview: string;
//   };
// };

// export default function RandomMovie({ randomMovies }) {
//   const [currentMovieIndex, setCurrentMovieIndex] = useState<MovieProps>();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentMovieIndex(randomMovies);
//     }, 3000); // Change movie every 5 seconds

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [randomMovies]);
//   return (
//     <div className="absolute top-0 left-0 w-full h-[57vh] xl:h-[80vh] bg-slate-800">
//       <Image
//         src={`https://image.tmdb.org/t/p/original${currentMovieIndex?.backdrop_path}`}
//         alt="movie"
//         width={1000}
//         height={1000}
//         className="w-full h-full"
//       />
//       <div className="absolute top-1/2 left-12 z-50 w-[500px] -translate-y-1/2">
//         <h1 className="text-white font-bold text-5xl">
//           {currentMovieIndex?.title}
//         </h1>
//         <p className="text-white my-6">
//           {currentMovieIndex?.overview.slice(0, 198)}
//         </p>
//         <div className="flex gap-6">
//           <button className="px-6 py-2 bg-white text-black rounded-md flex gap-4 items-center font-bold">
//             <FaPlay size={25} />
//             Play
//           </button>
//           <button className="bg-gray-600 px-6 py-2 rounded-md flex items-center gap-4 font-bold text-white">
//             <GoInfo size={25} />
//             More Info
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import HomeNav from "@/components/HomeNav";

type Movie = {
  backdrop_path: string;
  title: string;
  overview: string;
};

type RandomMovieProps = {
  randomMovies: Movie[];
};

export default function RandomMovie({ randomMovies }: RandomMovieProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex(
        (prevIndex) => (prevIndex + 1) % randomMovies.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [randomMovies]);

  const currentMovie = randomMovies[currentMovieIndex];

  return (
    <div className="w-screen lg:h-[57vh] 2xl:h-[80vh]  relative">
      <div className="absolute top-[-80px] left-0 w-full  bg-gradient-to-b from-slate-800 to-bl after:absolute after:w-full after:h-full after:left-0 after:top-0 after:bg-gradient-to-b after:from-slate-950/30 after:from-80% after:to-black after:to-100%">
        {currentMovie && (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
              alt="movie"
              width={1000}
              height={1000}
              priority
              className="w-full h-full 2xl:h-[80vh] object-cover  "
            />
            <div className="absolute top-1/2 left-12 z-50 w-[500px] -translate-y-1/2">
              <h1 className="text-white font-bold text-5xl">
                {currentMovie.title}
              </h1>
              <p className="text-white my-6">
                {currentMovie.overview.slice(0, 198)}
              </p>
              <div className="flex gap-6">
                <button className="px-6 py-2 bg-white text-black rounded-md flex gap-4 items-center font-bold">
                  <FaPlay size={25} />
                  Play
                </button>
                <button className="bg-gray-600 px-6 py-2 rounded-md flex items-center gap-4 font-bold text-white">
                  <GoInfo size={25} />
                  More Info
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
