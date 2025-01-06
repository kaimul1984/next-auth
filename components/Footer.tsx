import Link from "next/link";
import React from "react";
import { IoLanguage } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="w-full min-h-[200px] bg-[#141414]  px-14 py-12">
      <div className="w-full max-w-[1320px] mx-auto text-white">
        <span className="text-white font-bold text-lg">
          Questions? Phone{" "}
          <Link href="/" className="underline">
            1-800-404-982
          </Link>
        </span>
        <div className="w-full flex items-center justify-between mt-8 mb-12">
          <div className="flex-1">
            <h3 className="mb-4">FAQ</h3>
            <ul className="flex flex-col gap-2">
              <Link href="/" className="underline text-sm text-neutral-500">
                Investors relations
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                But Gift cards
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                Cookies preferences
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                Legal notices
              </Link>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="mb-4">Help Centre</h3>
            <ul className="flex flex-col gap-2">
              <Link href="/" className="underline text-sm text-neutral-500">
                Investors relations
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                But Gift cards
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                Cookies preferences
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                Legal notices
              </Link>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="mb-4">Account</h3>
            <ul className="flex flex-col gap-2">
              <Link href="/" className="underline text-sm text-neutral-500">
                Investors relations
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                But Gift cards
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                Cookies preferences
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                Legal notices
              </Link>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="mb-4">Media Centre</h3>
            <ul className="flex flex-col gap-2">
              <Link href="/" className="underline text-sm text-neutral-500">
                Investors relations
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                But Gift cards
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                Cookies preferences
              </Link>
              <Link href="/" className=" underline text-sm text-neutral-500">
                Legal notices
              </Link>
            </ul>
          </div>
        </div>
        {/* dropdown */}
        <form className="mb-10 w-max">
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
        <h4 className="text-md text-neutral-500 ">Netflix Australia</h4>
      </div>
    </div>
  );
}
