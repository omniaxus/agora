"use client";

import {
  sendMessageSVG,
  shoppingBagBigSVG,
  shoppingBagSmallSVG,
} from "@/assets/SVGs";
import { useLayoutEffect, useState } from "react";
import { gabarito } from "./constants/font";

const suggestions = [
  "Are the any turtle neck sweater with stripe colour",
  "Are the any turtle neck sweater with stripe colour",
  "Are the any turtle neck sweater with stripe colour",
];

export default function Home() {
  const [innerWidth, setInnerWidth] = useState(0);

  useLayoutEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  return (
    <div className="w-full grid place-items-center">
      <Welcome suggestions={suggestions} />

      {/* Messaging Start*/}
      <section className="mt-16 lg:mt-20 mx-auto w-11/12 max-w-xl ">
        <div className="flex  lg:w-[565px] bg-white border-gray-300 rounded-full mx-auto mt-0">
          <input
            type="text"
            className="w-full h-14 rounded-full outline-none pl-6"
            placeholder="What would you like to buy today?"
          />
          <div className="flex justify-center items-center mr-2">
            {sendMessageSVG}
          </div>
        </div>
        <p className="text-[#2660f2] text-center text-sm lg:text-base mt-2 ">
          Do you have ideas on how we can make agora better, let us know.
        </p>
      </section>
      {/* Messaging End*/}
    </div>
  );
}

const Welcome = ({ suggestions }: { suggestions: string[] }) => (
  <div>
    <div className="mt-28 lg:mt-32">
      <h2
        className={`${gabarito.className} text-4xl lg:text-6xl font-semibold text-center`}
      >
        Welcome to Agora
      </h2>
      <p className="text-sm lg:text-lg w-4/5 max-w-96 text-center mx-auto mt-4">
        Shopping just got better! I am here to get you the product you need.
      </p>
    </div>
    <div className="flex flex-wrap w-4/5 max-w-6xl justify-center mx-auto mt-12 lg:mt-16 gap-3 lg:gap-7">
      {suggestions.map((suggestion, index) =>
        index >= 2 && innerWidth < 768 ? (
          ""
        ) : (
          <Suggestion suggestion={suggestion} key={index} />
        )
      )}
    </div>
  </div>
);

const Suggestion = ({ suggestion }: { suggestion: string }) => {
  return (
    <div className="bg-white py-4 px-5 basis-36 h-32 lg:basis-44 lg:h-40 rounded-2xl border border-gray-300 drop-shadow-sm">
      <div className="hidden lg:block">{shoppingBagBigSVG}</div>
      <div className="lg:hidden">{shoppingBagSmallSVG}</div>
      <div className="mt-4">
        <p className="text-xs lg:text-base">{suggestion}</p>
      </div>
    </div>
  );
};
