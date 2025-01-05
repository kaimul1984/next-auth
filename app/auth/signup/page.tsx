import PasswordInput from "@/components/Password";
import Image from "next/image";
import { BsDashLg } from "react-icons/bs";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import registerUser from "@/libs/actions/signup.actions";

export default async function SignUpPage(props: {
  searchParams: Promise<{
    error?: string;
    email?: string;
    callbackUrl: string | undefined;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { email } = searchParams;

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen relative">
      <Navbar />
      <div className="w-screen h-screen ">
        <Image
          src="/login_background.jpg"
          alt="login page image"
          width={2000}
          height={1000}
          priority
          className="absolute w-full h-full top-0 left-0 object-cover brightness-[.3]"
        />
      </div>
      <div className="bg-black/70 p-12 min-w-[450px] rounded-md absolute top-[150px] -translate-x-1/2 left-1/2 z-50">
        <h2 className="text-2xl font-bold text-white mb-4">Register</h2>
        <form className="flex flex-col " action={registerUser}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter User name"
            required
            className="border-[.1px] border-gray-500 p-4 outline-none text-white  mt-2 bg-black rounded-md"
          />
          <input
            type="email"
            name="email"
            defaultValue={email || ""}
            id="email"
            placeholder="Enter email"
            required
            className="border-[.1px] border-gray-500 p-4 outline-none text-white  mt-2 bg-black rounded-md"
          />

          {/* <input type="password" name="password" id="password" minLength={8} required className="border-2 p-1"/> */}
          <PasswordInput name="password" />

          <input
            type="submit"
            value="Sign Up"
            className=" bg-red-600  p-2 rounded-md text-white  outline-none"
          />

          <div className="mt-4 flex gap-1 items-center">
            <span className="text-gray-400">Already have an account?</span>
            <Link
              href="/auth/signin"
              className="text-white font-semibold hover:text-blue-700 hover:underline"
            >
              Sign In now.
            </Link>
          </div>
        </form>
        <div className="flex gap-4 items-center w-full justify-center my-4">
          <BsDashLg color="#ddd" />
          <span className="text-gray-400">Or</span>
          <BsDashLg color="#ddd" />
        </div>
        <div className="mt-6">
          <form
            className="bg-slate-50 p-2 rounded-md w-full "

            // action={async () => {
            //   "use server";
            //   try {
            //     await sign("google");
            //   } catch (error) {
            //     // Signin can fail for a number of reasons, such as the user
            //     // not existing, or the user not having the correct role.
            //     // In some cases, you may want to redirect to a custom error
            //     if (error instanceof AuthError) {
            //       const errorUrl = `/auth/signin?error=${encodeURIComponent(
            //         "InvalidCredentials"
            //       )}`;
            //       return redirect(errorUrl);
            //     }

            //     throw error;
            //   }
            // }}
          >
            <button
              type="submit"
              className="w-full rounded-md flex items-center justify-center gap-4 "
            >
              <Image
                src="/google.png"
                alt="google logo"
                width={30}
                height={30}
              />
              <span>Sign up with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
