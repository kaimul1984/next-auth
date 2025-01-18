import { auth } from "@/auth";
//import HomeNav from "@/components/HomeNav";
import MovieSlider from "@/components/MovieSlider";
import MyList from "@/components/MyList";

import RandomMovie from "@/components/RandomMovie";
import { getMyListMovies } from "@/libs/actions/addMovie.actions";
import {
  getPopularTvSeries,
  getRandomMovie,
  getTopRatedMovies,
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
  // console.log(session);
  if (!session?.user?.id) {
    redirect("/");
  }
  const userId = session.user.id;
  const randomMovies = await getRandomMovie();
  const trendingMovies = await getTrendingMovie();
  const trendingTVshows = await getTrendingTVshows();
  const toopRatedMovies = await getTopRatedMovies();
  const popularTvSeries = await getPopularTvSeries();
  const myListMovies = await getMyListMovies(userId);
  //console.log(trendingMovies);

  return (
    <div className="bg-[#141414] min-h-screen w-screen">
      <RandomMovie randomMovies={randomMovies} />

      <div className="-mt-[200px]">
        <MyList movies={myListMovies} title="My Lists" />
      </div>

      <div className="bg-[#141414] w-full h-full  flex flex-col  relative ">
        <MovieSlider movies={trendingMovies} title="Trending Now" />
        <MovieSlider movies={trendingTVshows} title="TV Dramas" />
        <MovieSlider movies={toopRatedMovies} title="Top Movies" />
        <MovieSlider movies={popularTvSeries} title="Popular TV series" />
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
