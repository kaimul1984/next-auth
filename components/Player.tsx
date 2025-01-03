"use client";
import { useEffect, useRef } from "react";

const YouTubePlayer = ({ videoId }: { videoId: string }) => {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);

        // Wait for the YouTube API to load
        window.onYouTubeIframeAPIReady = () => {
          createPlayer();
        };
      } else {
        createPlayer(); // If already loaded
      }
    };

    const createPlayer = () => {
      if (playerRef.current) {
        new window.YT.Player(playerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
          },
        });
      }
    };

    loadYouTubeAPI();
  }, [videoId]);

  return <div ref={playerRef} style={{ width: "100%", height: "100%" }} />;
};

export default YouTubePlayer;
