"use client";

import { useState } from "react";

const publicDomainMovies = [
  {
    title: "Night of the Living Dead",
    url: "https://archive.org/download/NightOfTheLivingDead_435/NightOfTheLivingDead_512kb.mp4",
  },
];

const FreeMovies = () => {
  const [selectedMovie, setSelectedMovie] = useState(publicDomainMovies[0]);

  return (
    <div>
      <h1>{selectedMovie.title}</h1>
      <video controls width="800">
        <source src={selectedMovie.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default FreeMovies;
