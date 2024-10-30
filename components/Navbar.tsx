"use client"

import Link from 'next/link'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'

export default  function Navbar() {
  // const session = await auth()
  const {data: session} = useSession()

  return (
    <nav className='w-full  bg-blue-600 text-white '>
        <div className='max-w-[1320px] mx-auto  py-4 flex items-center justify-between px-8'>

       <Link href='/'>Auth.js</Link>
       <ul className='flex items-center gap-8'>
        {session ? 
        <>
        <li className='flex gap-4 items-center'>
           <p>{session.user?.email}</p>
     <button onClick={()=> signOut()}>Sign out</button>
        </li>
        </>
        :
        <li><Link href='/auth/signin'>Sign in</Link></li>
      
      }
       </ul>
        </div>
    </nav>
  )
}
