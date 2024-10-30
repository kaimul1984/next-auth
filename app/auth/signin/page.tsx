import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"
import PasswordInput from "@/components/Password";
import Image from "next/image";
import { BsDashLg } from "react-icons/bs";
import { revalidatePath } from "next/cache";
 
export default async function SignInPage(props: {
  searchParams: Promise<{error?: string; callbackUrl: string | undefined }>
}) {
  const searchParams = await props.searchParams;
  const { error } = searchParams;
  return (
    (<div className="flex flex-col gap-2 items-center justify-center h-screen">
      <div className="bg-blue-500 p-8 w-[400px] rounded-md">
      <div className="flex items-center justify-center gap-4 border-2 border-blue-400 p-2 mb-8 bg-white rounded-md">
            <Image src='/logo.jpg' alt="logo" width={80} height={80} />
            <span className="text-3xl text-slate-900 font-bold">WSVTA</span>
          </div>
      <form
      className="flex flex-col   "
        action={async (formData: FormData) => {
          "use server"
          const email = formData.get('email')
          const password = formData.get('password')
          try {
            await signIn("credentials", {email, password, redirectTo:"/"})
          revalidatePath('/', 'layout')
           
          } catch (error) {
            if (error instanceof AuthError) {
                // Redirect to sign-in with encoded error
                const errorUrl = `/auth/signin?error=${encodeURIComponent("InvalidCredentials")}`;
                return redirect(errorUrl);
            }
            throw error
          }
        }}
      >
        {error && (
          <div className="text-red-400 mb-4">
            {error === "InvalidCredentials" ? "Incorrect email or password." : "An unexpected error occurred."}
          </div>
        )}
        <label htmlFor="email" className="flex flex-col text-white">
          Email
          <input type="email" name="email" id="email" placeholder="Enter email" required className="border-2 p-1 outline-none rounded-sm mt-2"/>
        </label>
       
          {/* <input type="password" name="password" id="password" minLength={8} required className="border-2 p-1"/> */}
          <PasswordInput name="password"/>
     
        <input type="submit" value="Sign In" className="p-2 bg-white mt-6 rounded-md" />
      </form>
    <div className="flex gap-4 items-center w-full justify-center my-4">
    <BsDashLg />
    <span>Or</span>
    <BsDashLg />
    </div>
      <div className="mt-6">
      {Object.values(providerMap).map((provider) => (
        <form
        className="bg-slate-100 p-2 rounded-md w-full "
        key={provider.id}
          action={async () => {
            "use server"
            try {
              await signIn("google")
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                const errorUrl = `/auth/signin?error=${encodeURIComponent("InvalidCredentials")}`;
                return redirect(errorUrl);
              }
 
            
              throw error
            }
          }}
        >
          <button type="submit" className="w-full rounded-md flex items-center justify-center gap-4 ">
            <Image src='/google.png' alt='google logo' width={30} height={30}/>
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
      </div>
      </div>
    </div>)
  );
}