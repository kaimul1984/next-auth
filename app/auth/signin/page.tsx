import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import PasswordInput from "@/components/Password";
import Image from "next/image";
import { BsDashLg } from "react-icons/bs";
import { revalidatePath } from "next/cache";
import Footer from "@/components/Footer";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default async function SignInPage(props: {
  searchParams: Promise<{
    error?: string;
    message?: string;
    callbackUrl: string | undefined;
  }>;
}) {
  const searchParams = await props.searchParams;

  const { error } = searchParams;
  const { message } = searchParams;
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
      <div className="">
        {message && (
          <p className=" absolute top-14 left-1/2 -translate-x-1/2 z-50 text-white rounded-md bg-red-500 p-4 text-xl">
            {message}
          </p>
        )}
      </div>
      <div className="bg-black/70 p-12 min-w-[450px] rounded-md absolute top-[150px] -translate-x-1/2 left-1/2 z-50">
        <h2 className="text-2xl font-bold text-white mb-4">Sign In</h2>
        <form
          className="flex flex-col "
          action={async (formData: FormData) => {
            "use server";
            const email = formData.get("email");
            const password = formData.get("password");
            try {
              await signIn("credentials", {
                email,
                password,
                redirectTo: "/browse",
              });
              revalidatePath("/browse", "layout");
            } catch (error) {
              if (error instanceof AuthError) {
                // Redirect to sign-in with encoded error
                const errorUrl = `/auth/signin?error=${encodeURIComponent(
                  "InvalidCredentials"
                )}`;
                return redirect(errorUrl);
              }
              throw error;
            }
          }}
        >
          {error && (
            <div className="text-red-400 mb-4">
              {error === "InvalidCredentials"
                ? "Incorrect email or password."
                : "An unexpected error occurred."}
            </div>
          )}

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            required
            className="border-[.1px] border-gray-500 p-4 outline-none  mt-2 bg-black rounded-md"
          />

          {/* <input type="password" name="password" id="password" minLength={8} required className="border-2 p-1"/> */}
          <PasswordInput name="password" />

          <input
            type="submit"
            value="Sign In"
            className=" bg-red-600  p-2 rounded-md text-white  outline-none"
          />
          <span className="text-white my-2 text-center">OR</span>
          <button className="bg-gray-800 p-2 text-center text-white">
            Use Sign-In Code
          </button>
          <Link href="/" className="mt-4 text-center text-white">
            Forgot password?
          </Link>
          <div className="flex gap-2 items-center text-white mt-4">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="mt-4 flex gap-1 items-center">
            <span className="text-gray-400">New to Netflix?</span>
            <Link
              href="/auth/signup"
              className="text-white font-semibold hover:text-blue-700 hover:underline"
            >
              Sign up now.
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
            action={async () => {
              "use server";
              try {
                await signIn("google");
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  const errorUrl = `/auth/signin?error=${encodeURIComponent(
                    "InvalidCredentials"
                  )}`;
                  return redirect(errorUrl);
                }

                throw error;
              }
            }}
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
              <span>Sign in with Google</span>
            </button>
          </form>
        </div>
      </div>
      <div className=" bg-black/90 relative -mb-[200px] z-50 w-full">
        <Footer />
      </div>
    </div>
  );
}
