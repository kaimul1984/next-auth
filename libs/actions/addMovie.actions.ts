"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";

export async function addMovieToList(
  id: number,
  title: string,
  posterPath: string
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, message: "User is not authenticated" };
  }

  const userId = session.user.id;

  // ✅ Check if the movie already exists
  const existingMovie = await prisma.movie.findFirst({
    where: {
      userId: userId,
      movieId: id, // Ensure we're checking by movieId
    },
  });

  if (existingMovie) {
    return { success: false, message: "Movie is already in your list" };
  }

  // ✅ Add the movie if it does not exist
  await prisma.movie.create({
    data: {
      userId,
      movieId: id, // Store the movie ID to prevent duplicates
      title,
      posterPath,
    },
  });

  return {
    success: true,
    message: "Movie has been added to your list successfully",
  };

  //   if (!session?.user?.id) {
  //     throw new Error("unauthorizied to add movie");
  //   }
  //   const userId = session.user.id;

  //   const existingMovie = await prisma.movie.findFirst({
  //     where: {
  //       userId: userId,
  //       movieId: id,
  //     },
  //   });

  //   if (existingMovie) {
  //     throw new Error("Movie is already in your list");
  //   }

  //   try {
  //     const movie = await prisma.movie.create({
  //       data: {
  //         userId,
  //         movieId: id,
  //         title,
  //         posterPath,
  //       },
  //     });
  //     return JSON.parse(JSON.stringify(movie));
  //   } catch (error) {
  //     console.log(error);
  //   }
}

export async function getMyListMovies(userId: string) {
  if (!userId) throw new Error("User ID is required");

  return await prisma.movie.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}
