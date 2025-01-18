"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiSignOutThin } from "react-icons/pi";

type SessionProps = {
  session: Session | null;
};

export default function HomeNav({ session }: SessionProps) {
  const pathname = usePathname();
  //console.log(session);
  return (
    <nav
      className={`${
        pathname === "/browse" ? "bg-transparent" : "bg-[#141414]"
      } w-full h-[80px] flex items-center justify-between px-6 lg:px-14 relative z-50`}
    >
      <div className="flex items-center gap-6">
        <Link href="/browse">
          <Image
            src="/netflix_logo.svg"
            alt="netflix logo"
            width={100}
            height={80}
            className="w-[80px] h-[40px]"
          />
        </Link>
        <ul className="hidden lg:flex items-center gap-6">
          <li>
            <Link className="text-white text-sm " href="/browse">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-white text-sm " href="/browse/tv-shows">
              TV Shows
            </Link>
          </li>
          <li>
            <Link className="text-white text-sm " href="/browse/movies">
              Movies
            </Link>
          </li>
          <li>
            <Link className="text-white text-sm " href="/browse/latest">
              New & Popular
            </Link>
          </li>
          <li>
            <Link className="text-white text-sm " href="/browse/my-list">
              My List
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6 text-white">
        <BiSearch />
        <span>Kids</span>
        <div className="flex gap-1 items-center relative group cursor-pointer   py-4">
          <Image src="/avatar.png" alt="avatar" width={30} height={30} />
          <IoMdArrowDropdown
            size={30}
            className="group-hover:rotate-180 transition-transform"
          />
          <div className="absolute top-14 right-0 w-full min-w-[150px]  bg-slate-900/90 hidden opacity-0 group-hover:block group-hover:opacity-100 ">
            {session && (
              <>
                <div className="flex gap-2 items-center p-4 mb-4 w-full">
                  {session.user?.image ? (
                    <Image
                      src={session.user?.image}
                      alt="user image"
                      width={30}
                      height={30}
                      className="rounded-md"
                    />
                  ) : (
                    <Image
                      src="/avatar.png"
                      alt="user image"
                      width={30}
                      height={30}
                      className="rounded-md"
                    />
                  )}
                  <p className="text-sm  w-max">{session.user?.name}</p>
                </div>
                <div className="flex items-center gap-2 py-2 px-4 border-t-2 border-gray-800">
                  <PiSignOutThin />
                  <button onClick={() => signOut()}>Sign out</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
