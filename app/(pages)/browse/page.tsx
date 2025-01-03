import { auth } from "@/auth";
import HomeNav from "@/components/HomeNav";
import MovieSlider from "@/components/MovieSlider";
import Player from "@/components/Player";
import RandomMovie from "@/components/RandomMovie";
import {
  getRandomMovie,
  getTrendingMovie,
  getTrendingTVshows,
} from "@/libs/actions/trailer.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Home - Netflix",
  description: "Watch Movie",
};
export default async function Browse() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  const randomMovies = await getRandomMovie();
  const trendingMovies = await getTrendingMovie();
  const trendingTVshows = await getTrendingTVshows();
  //console.log(trendingMovies);

  return (
    <div className="bg-black h-auto w-screen">
      <HomeNav session={session} />
      <RandomMovie randomMovies={randomMovies} />

      <div className=" w-full h-full pt-10 flex flex-col gap-10  relative">
        <MovieSlider movies={trendingMovies} title="Trending Movie" />
        <MovieSlider movies={trendingTVshows} title="TV Dramas" />
      </div>
    </div>
  );
}

// <video
// src="https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/dash/TearsOfSteelVideo.mp4"
// autoPlay
// muted
// loop
// controls
// style={{ width: "100%", height: "100%", objectFit: "cover" }}
// ></video>
