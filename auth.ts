import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Google from "next-auth/providers/google"
import type { Provider } from "next-auth/providers"


interface CustomUser {
  id: string;
  email: string;
  isAdmin: boolean;
  image: any
}

const allowedUsers = [
  {
    id: '1',
    email: 'user1@gmail.com',
    password: 'wsvta1234', // Plain text password (for demonstration only)
    isAdmin: true,
    image:'/k.png'
  },
  {
    id: '2',
    email: 'user2@gmail.com',
    password: 'wsvta2345', // Plain text password (for demonstration only)
    isAdmin: true,
   image:'/k.png'
  },
];
  

const providers: Provider[] = [
  Credentials({

    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },

  async authorize(credentials){
    
    const email = credentials?.email;
      const password = credentials?.password ;
      
    
      const user = allowedUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        return { id: user.id, name: user.email, email: user.email, image: user.image, isAdmin: user.isAdmin };
      }

      throw new Error("Invalid credentials");
    },
}),
Google
]

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
    
//     Credentials({

//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },

//     async authorize(credentials){
      
//       const email = credentials?.email;
//         const password = credentials?.password ;
        
      
//         const user = allowedUsers.find(
//           (user) => user.email === email && user.password === password
//         );

//         if (user) {
//           return { id: user.id, name: user.email, email: user.email, image: user.image, isAdmin: user.isAdmin };
//         }

//         throw new Error("Invalid credentials");
//       },
//   }),
//   Google,
 
// ] ,
// callbacks: {
//   async session({ session, token }) {
//     if (token) {
//       (session.user as unknown as CustomUser).isAdmin = token.isAdmin as boolean;
//       (session.user as unknown as CustomUser).image = token.image as any;
//     }
//     return session;
//   },
//   async jwt({ token, user }) {
//     if (user) {
//       token.isAdmin = (user as unknown as CustomUser).isAdmin ?? false; // Ensure isAdmin is always set
//       token.image = (user as unknown as CustomUser).image; // Ensure isAdmin is always set
//     }
//     return token;
//   },
// },

// pages: {
//   signIn: "/auth/signin"
// }
// })

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        (session.user as unknown as CustomUser).isAdmin = token.isAdmin as boolean;
        (session.user as unknown as CustomUser).image = token.image as any;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = (user as unknown as CustomUser).isAdmin ?? false; // Ensure isAdmin is always set
        token.image = (user as unknown as CustomUser).image; // Ensure isAdmin is always set
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
})

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 

// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import Credentials from "next-auth/providers/credentials"
// import type { Provider } from "next-auth/providers"
 
// const providers: Provider[] = [
//   Credentials({
//     credentials: { password: { label: "Password", type: "password" } },
//     authorize(c) {
//       if (c.password !== "password") return null
//       return {
//         id: "test",
//         name: "Test User",
//         email: "test@example.com",
//       }
//     },
//   }),
//   GitHub,
// ]
 
// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === "function") {
//       const providerData = provider()
//       return { id: providerData.id, name: providerData.name }
//     } else {
//       return { id: provider.id, name: provider.name }
//     }
//   })
//   .filter((provider) => provider.id !== "credentials")
 
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers,
//   pages: {
//     signIn: "/auth/signin",
//   },
// })