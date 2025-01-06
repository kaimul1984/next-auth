import { addMovieToList } from "@/libs/actions/addMovie.actions";
import Link from "next/link";

import React from "react";
import toast from "react-hot-toast";
import { AiOutlineLike } from "react-icons/ai";
import { FaPlay, FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

type Movie = {
  id: number;
  poster_path: string;
  backdrop_path?: string;
  title: string;
  name: string;
};
type MovieProps = {
  movie: Movie;
};

export default function MovieInfo({ movie }: MovieProps) {
  const handleAddtoList = async (movie: Movie) => {
    const response = await addMovieToList(
      movie.id,
      movie.title,
      movie.name,
      movie.poster_path
    );

    if (!response.success) {
      toast.error(response.message); // ⚠️ Show a warning if the movie is already in the list
      return;
    }

    toast.success(response.message); // ✅ Show success message when added successfully
  };

  return (
    <div className="w-full absolute z-50">
      <div className=" w-full flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Link
            href={`/browse/watch/${movie.id}`}
            title="Play Now"
            className="size-12 cursor-pointer rounded-full bg-neutral-400 flex items-center justify-center"
          >
            <FaPlay size={25} color="#fff" />
          </Link>
          <button
            onClick={() => handleAddtoList(movie)}
            title="Add to My list"
            className="size-12 cursor-pointer rounded-full bg-gray-800 flex items-center justify-center"
          >
            <FaPlus size={25} color="#fff" />
          </button>
          <div className="size-12 rounded-full bg-gray-800 flex items-center justify-center">
            <AiOutlineLike size={25} color="#fff" />
          </div>
        </div>
        <div className="size-12 rounded-full bg-gray-800 flex items-center justify-center">
          <IoIosArrowDown size={25} color="#fff" />
        </div>
      </div>
      <div className="flex gap-4 items-center px-4 py-4">
        <span className="text-black border-2 border-black p-1 text-[11px]">
          MA 15+
        </span>
        <span className="text-black border-2 p-1 border-black text-[11px]">
          HD
        </span>
      </div>
      <ul className="flex items-center gap-4 text-black px-4 pl-6">
        <li className="text-sm list-disc">Action</li>
        <li className="text-sm mx-4 list-disc">Suspense</li>
        <li className="text-sm list-disc">Mystery</li>
      </ul>
    </div>
  );
}
