"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PiSignOutThin } from "react-icons/pi";

export default function Navbar() {
  // const session = await auth()
  const { data: session } = useSession();

  const pathname = usePathname();

  const SignInPage = () => {
    if (pathname.startsWith("/auth/signin")) return null;
    if (pathname.startsWith("/auth/signup")) return null;
    return (
      <li>
        <Link
          href="/auth/signin"
          className="bg-red-500 py-2 px-4 rounded-md font-bold"
        >
          Sign in
        </Link>
      </li>
    );
  };

  return (
    <nav className="w-full  bg-gradient-to-b from-black text-white z-50 relative">
      <div className="max-w-[1320px] mx-auto  py-6 flex items-center justify-between px-8">
        <Link href="/">
          <Image
            src="/netflix_logo.svg"
            alt="netflix logo"
            width={150}
            height={150}
            className="w-150px] h-[80px]"
          />
        </Link>
        <ul className="flex items-center gap-2">
          {session ? (
            <>
              <div className="flex gap-2 items-center w-full ">
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
              <div className=" w-[150px] flex items-center gap-2 bg-red-700 px-4 py-2 rounded-md">
                <PiSignOutThin />
                <button onClick={() => signOut()} className="w-max rounded-md">
                  Sign out
                </button>
              </div>
            </>
          ) : (
            // <li>
            //   <Link
            //     href="/auth/signin"
            //     className="bg-red-500 py-2 px-4 rounded-md font-bold"
            //   >
            //     Sign in
            //   </Link>
            // </li>
            <SignInPage />
          )}
        </ul>
      </div>
    </nav>
  );
}
