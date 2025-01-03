"use client";

import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
            height={80}
          />
        </Link>
        <ul className="flex items-center gap-8">
          {session ? (
            <>
              <li className="flex gap-4 items-center">
                <p>{session.user?.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
              </li>
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
