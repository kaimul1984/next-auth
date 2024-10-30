import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default async function Home() {
  const session = await auth()
  return (
   <section className="w-full mic-h-screen ">
   <div className="m-auto max-w-[1320px] h-screen mx-8 flex flex-col items-center justify-center">
    <h1>This is home page</h1>
    <br />
    {session?.user?.image &&
    
    <Image src={session?.user?.image} alt='pic' width={300} height={300}/>
    }
    <div className="w-20">

    {JSON.stringify(session)}
    </div>
   </div>
   </section>
  )
}
