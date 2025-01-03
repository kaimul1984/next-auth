// "use server";

// import { redirect } from "next/navigation";
// import { prisma } from "../prisma";
// import argon2 from "argon2";

// export default async function registerUser(formData: FormData) {
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   console.log("email", email);
//   console.log("name", name);
//   console.log("pass", password);

//   if (!name || !email || !password) {
//     throw new Error("All fields are required.");
//   }
//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });
//   if (existingUser) {
//     throw new Error("Email is already registered.");
//   }
//   // Hash the password
//   const hashedPassword = await argon2.hash(password);

//   const PROFILE_PICS = [
//     "/avatar2.png",
//     "/avatar3.png",
//     "/avatar4.png",
//     "/avatar5.png",
//     "/avatar6.png",
//     "/avatar7.png",
//   ];
//   const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

//   try {
//     // Save user to DB
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//         image,
//         emailVerified: new Date(),
//       },
//     });
//     console.log("User registered successfully:", user);
//     console.log("Redirecting to sign-in page...");
//     redirect(
//       `/auth/signin?message=${encodeURIComponent(
//         "Registration successful. Please sign in."
//       )}`
//     );
//     return
//     //return JSON.parse(JSON.stringify(user));
//   } catch (error) {
//     if ((error as any).code === "P2002") {
//       throw new Error("Email is already registered.");
//     }
//     throw new Error("Failed to register user.");
//   }
// }
"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import argon2 from "argon2";

export default async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    throw new Error("All fields are required.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const hashedPassword = await argon2.hash(password);

  const PROFILE_PICS = [
    "/avatar2.png",
    "/avatar3.png",
    "/avatar4.png",
    "/avatar5.png",
    "/avatar6.png",
    "/avatar7.png",
  ];
  const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

  try {
    // Save user to DB
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image,
        emailVerified: new Date(),
      },
    });

    console.log("Redirecting to sign-in page...");
    redirect(
      `/auth/signin?message=${encodeURIComponent(
        "Registration successful. Please sign in."
      )}`
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Email is already registered.");
    }
    console.error("Unexpected error:", error);

    // Re-throw NEXT_REDIRECT exceptions to allow proper handling
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    throw new Error("An unexpected error occurred during registration.");
  }
}
