import React from "react";
import { FaChevronRight } from "react-icons/fa";

export default function GetStarted() {
  return (
    <div className="mx-auto w-full flex flex-col items-center justify-center mt-4 ">
      <p className="text-center text-white">
        Ready to watch Netflix? Enter your email to create or restart your
        membership.
      </p>
      <form
        action=""
        className="flex gap-4 mt-4 w-[900px] items-center justify-center"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          className="bg-gray-900/70 px-6 py-4 w-[60%]   border-[.5px] border-white rounded-md"
        />
        <button
          type="submit"
          className="py-3 px-3 rounded-md bg-red-600  text-2xl text-white flex items-center justify-center gap-6"
        >
          Get Started
          <FaChevronRight />
        </button>
      </form>
    </div>
  );
}
