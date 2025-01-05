import { addMovieToList } from "@/libs/actions/addMovie.actions";

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
    // try {
    //   await addMovieToList(movie.id, movie.title, movie.poster_path);
    //   toast.success("Movie has added in my List successfully");
    // } catch (error: any) {
    //   if (error.message.includes("Movie is already in your list")) {
    //     toast.custom("This movie is already in your my-list");
    //   } else {
    //     toast.error("Something went wrong. Please try again.");
    //   }
    // }
    const response = await addMovieToList(
      movie.id,
      movie.title,
      movie.poster_path
    );

    if (!response.success) {
      toast.error(response.message); // ⚠️ Show a warning if the movie is already in the list
      return;
    }

    toast.success(response.message); // ✅ Show success message when added successfully
  };

  return (
    <div className="w-full">
      <div className=" w-full flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="size-12 rounded-full bg-neutral-300 flex items-center justify-center">
            <FaPlay size={25} color="#000" />
          </div>
          <button
            onClick={() => handleAddtoList(movie)}
            title="Add to My list"
            className="size-12 rounded-full bg-gray-800 flex items-center justify-center"
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
        <span className="text-white border-2 p-1 text-[12px]">MA 15+</span>
        <span className="text-white border-2 p-1 text-[12px]">HD</span>
      </div>
      <ul className="flex items-center gap-4 text-white px-4 ">
        <li className="text-sm">Action</li>
        <li className="text-sm mx-4">Suspense</li>
        <li className="text-sm">Mystery</li>
      </ul>
    </div>
  );
}
