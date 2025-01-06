import { auth } from "@/auth";

import { getMyListMovies } from "@/libs/actions/addMovie.actions";
import Image from "next/image";

import React from "react";

export default async function page() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("user not found");
  }
  const userId = session.user.id;
  const myListsMovies = await getMyListMovies(userId);

  return (
    <div className="w-screen min-h-screen  bg-[#141414]">
      <div className="w-[90%] max-w-[1320px] mx-auto ">
        <h2 className="text-2xl  text-white py-6 ">My Lists</h2>
        <div className="w-full flex flex-wrap gap-4  items-center  ">
          {myListsMovies.length > 0 &&
            myListsMovies.map((movie) => (
              <Image
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie?.title || "image"}
                width={1000}
                height={1000}
                className="w-[200px] h-[300px] object-fill  rounded-md"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
