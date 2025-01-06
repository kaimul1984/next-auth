import Image from "next/image";
import React from "react";

export default async function MoviePlayer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const url = `https://vidsrc.xyz/embed/movie/${id}`;
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {url ? (
        <iframe
          src={url}
          title="Movie Trailer"
          width="1000"
          height="1000"
          className="rounded-t-lg"
          allow="autoplay; encrypted-media; gyr"
          allowFullScreen
        ></iframe>
      ) : (
        <p>no url</p>
      )}
    </div>
  );
}
