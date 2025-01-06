"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const items = [
  {
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more on thousands of internet-connected devices.You can watch as much as you want, whenever you want – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!.",
  },
  {
    question: "How much does Netflix cost?",
    answer:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop or streaming device, all for one fixed monthly fee. Plans range from $7.99 to $25.99 per month. No extra costs, no contracts.",
  },
  {
    question: "Where can i watch Netflix?",
    answer:
      "Watch anywhere, at any time. Sign in with your Netflix account to watch content instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles",
  },
  {
    question: "How do i cancel?",
    answer:
      "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account at any time..",
  },
  {
    question: "What can i watch on Netflix?",
    answer:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix Originals and more. Watch as much as you want, at any time that you want.",
  },
  {
    question: "Is Netflix good for kids?",
    answer:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see..",
  },
];

export default function FAQ() {
  const [selected, setSelected] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    const open = selected === index ? null : index;
    setSelected(open);
  };

  return (
    <div className="w-[90%] max-w-[1320px] my-12">
      <h2 className="text-3xl text-white font-bold mb-6">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col ">
        {items.map((item, index) => (
          <div className="w-full" key={item.question}>
            <div
              onClick={() => toggleItem(index)}
              className="bg-[#2c2b2b] hover:bg-slate-900 transition-all duration-100 px-4 py-6 flex items-center justify-between rounded-sm"
            >
              <h3 className="text-3xl text-white">{item.question}</h3>
              <FaPlus
                size={35}
                color="#fff"
                className={`${
                  selected === index ? "rotate-45" : ""
                } transition-transform`}
              />
            </div>
            <p
              className={`${
                selected === index ? "h-32 opacity-1 " : "h-0 opacity-0 p-0"
              } text-white text-xl bg-[#151515] mt-[2px] p-4  transition-[height] duration-300`}
            >
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
