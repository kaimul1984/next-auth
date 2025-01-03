import React from "react";
import { IoLanguage } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="w-full min-h-[200px] bg-black py-16 px-14">
      <div className="w-full max-w-[1320px] mx-auto text-white">
        <span className="text-white font-bold text-lg">
          Questions? Phone{" "}
          <a href="/" className="underline">
            1-800-404-982
          </a>
        </span>
        <div className="w-full flex items-center justify-between mt-8 mb-12">
          <div className="flex-1">
            <h3 className="mb-4">FAQ</h3>
            <ul className="flex flex-col gap-4">
              <a href="/" className="underline text-sm text-neutral-500">
                Investors relations
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                But Gift cards
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                Cookies preferences
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                Legal notices
              </a>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="mb-4">Help Centre</h3>
            <ul className="flex flex-col gap-4">
              <a href="/" className="underline text-sm text-neutral-500">
                Investors relations
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                But Gift cards
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                Cookies preferences
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                Legal notices
              </a>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="mb-4">Account</h3>
            <ul className="flex flex-col gap-4">
              <a href="/" className="underline text-sm text-neutral-500">
                Investors relations
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                But Gift cards
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                Cookies preferences
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                Legal notices
              </a>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="mb-4">Media Centre</h3>
            <ul className="flex flex-col gap-4">
              <a href="/" className="underline text-sm text-neutral-500">
                Investors relations
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                But Gift cards
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                Cookies preferences
              </a>
              <a href="/" className=" underline text-sm text-neutral-500">
                Legal notices
              </a>
            </ul>
          </div>
        </div>
        {/* dropdown */}
        <form className="mb-16 w-max">
          <div className="flex items-center bg-black border-4 border-white px-4 py-2 rounded-md">
            <IoLanguage className="text-white mr-2" size={20} />
            <select
              name="language"
              id="language"
              className="bg-black text-white border-none outline-none"
            >
              <option value="english">English</option>
            </select>
          </div>
        </form>
        <h4 className="text-md text-neutral-500   mb-12 ">Netflix Australia</h4>
      </div>
    </div>
  );
}
