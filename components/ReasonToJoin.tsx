import React from "react";
import join1 from "@/public/join-1.png";
import join2 from "@/public/join-2.png";
import join3 from "@/public/join-3.png";
import join4 from "@/public/join-4.png";
import Image from "next/image";

const items = [
  {
    title: "Enjoy on your TV",
    info: "Watch titles on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.",
    icon: join1,
  },
  {
    title: "Download your shows to watch them offline",
    info: "Save your favourites easily and always have something to watch.",
    icon: join2,
  },
  {
    title: "Watch Netflix everywhere",
    info: "Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.",
    icon: join3,
  },
  {
    title: "Create profiles for kids",
    info: "Send kids on adventures with their favourite characters in a space made just for them — free with your membership..",
    icon: join4,
  },
];

export default function ReasonToJoin() {
  return (
    <div className="w-[95%] max-w-[1320px] mb-12">
      <h2 className="text-white text-3xl font-bold mb-6">
        More reasons to join
      </h2>
      <div className="w-full flex flex-wrap gap-4 items-center justify-between">
        {items.map((item) => (
          <div
            key={item.title}
            className="xl:w-[24%] lg:w-[49%] max-w-[310px] lg:max-w-[49%] xl:h-[350px] lg:h-[220px] bg-gradient-to-b from-[#14081b] from-60%  to-[#27064b] rounded-lg px-4 py-8 relative"
          >
            <h3 className="text-white lg:text-[1.6vw] xl:text-[1vw] font-bold">
              {item.title}
            </h3>
            <p className="text-gray-500 mt-8 lg:mt-4">{item.info}</p>
            <Image
              src={item.icon}
              alt="icon"
              width={80}
              height={80}
              className="absolute right-4 bottom-4 shadow-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
