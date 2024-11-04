"use client";

import {
  sendMessageSVG,
  shoppingBagBigSVG,
  shoppingBagSmallSVG,
} from "@/assets/SVGs";
import { useEffect, useLayoutEffect, useState } from "react";
import Link from "../../node_modules/next/link";
import { gabarito } from "./constants/font";

const suggestions = [
  "Are the any turtle neck sweater with stripe colour",
  "Are the any turtle neck sweater with stripe colour",
  "Are the any turtle neck sweater with stripe colour",
];

const products = [
  {
    image:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/80/650209/1.jpg",
    seller: "Amazon",
    title: "Blue turtle neck Tshirt",
    price: "$50.99",
    link: "",
  },
  {
    image:
      "https://static.thcdn.com/images/large/original//productimg/1600/1600/15083108-9755113374380820.jpg",
    seller: "Ebay",
    title: "White turtle neck Tshirt",
    price: "$25.99",
    link: "",
  },
  {
    image:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/80/650209/1.jpg",
    seller: "Amazon",
    title: "Blue turtle neck Tshirt",
    price: "$50.99",
    link: "",
  },
];

export default function Home() {
  const [innerWidth, setInnerWidth] = useState(0);
  const [messageSession, setMessageSession] = useState(false);
  // const [suggestions, setSuggestions] = useState<string[]>([]);

  useLayoutEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  // useEffect(() => {
  //   try {
  //     (async function () {
  //       const response = await fetch("/netlify/functions/suggestions?q=small");
  //       const data = await response.json();
  //       console.log(data);
  //     })();
  //   } catch (error) {}
  // });

  return (
    <div className="w-full flex flex-col justify-between h-[calc(100vh-100px)] lg:h-[calc(100vh-25px)]">
      {!messageSession && (
        <Welcome suggestions={suggestions} innerWidth={innerWidth} />
      )}
      {messageSession && (
        <section className="w-11/12 max-w-3xl mx-auto mt-8 overflow-y-auto px-4 mb-10 lg:mb-16 scroll-mobile">
          <OutGoingMessage message="I would like to get a turtle neck sweater" />
          <IncomingMessage message="Here are some turtle neck sweater you might like!" />
          <ProductList products={products} />
        </section>
      )}

      {/* Messaging Start*/}
      <section className="mx-auto w-11/12 max-w-xl ">
        <div className="flex  lg:w-[565px] bg-white border-gray-300 rounded-full mx-auto mt-0">
          <input
            type="text"
            className="w-full h-14 rounded-full outline-none pl-6"
            placeholder="What would you like to buy today?"
          />
          <button
            className="flex justify-center items-center mr-2"
            onClick={() => setMessageSession(true)}
          >
            {sendMessageSVG}
          </button>
        </div>
        <p className="text-[#2660f2] text-center text-sm lg:text-base mt-2 ">
          <Link href="/feedback">
            Do you have ideas on how we can make agora better, let us know.
          </Link>
        </p>
      </section>
      {/* Messaging End*/}
    </div>
  );
}

const Welcome = ({
  suggestions,
  innerWidth,
}: {
  suggestions: string[];
  innerWidth: number;
}) => (
  <div className="mt-28 lg:mt-32 mb-16 lg:mb-20">
    <div>
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
      {suggestions.map((suggestion, index) => (
        <Suggestion suggestion={suggestion} key={index} />
      ))}
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

const OutGoingMessage = ({ message }: { message: string }) => (
  <div className="flex justify-end w-full mt-3">
    <p className="bg-white border border-gray-300 w-fit max-w-60 lg:max-w-96 py-3 px-4 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm text-sm lg:text-base">
      {message}
    </p>
  </div>
);

const IncomingMessage = ({ message }: { message: string }) => (
  <div className="flex justify-start w-full mt-3">
    <p className="bg-white border border-gray-300 w-fit max-w-60 lg:max-w-96 py-3 px-4 rounded-tl-2xl rounded-tr-2xl rounded-bl-sm rounded-br-2xl text-sm lg:text-base">
      {message}
    </p>
  </div>
);

interface ProductListProps {
  products: {
    image: string;
    seller: string;
    title: string;
    price: string;
    link: string;
  }[];
}
const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="w-8/12 overflow-x-scroll mt-3 pb-3 scroll-mobile">
      <div className="flex gap-5 items-start">
        {products.map((product, index) => (
          <ProductItem {...product} key={index} />
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({
  image,
  seller,
  title,
  price,
  link,
}: {
  image: string;
  seller: string;
  title: string;
  price: string;
  link: string;
}) => (
  <div className="basis-48 shrink-0 bg-white p-3 rounded-xl border border-gray-300 drop-shadow-sm">
    <div className="relative h-28 rounded-3xl border border-gray-300 p-2">
      <img alt="product" src={image} className="w-full h-full object-cover" />
    </div>
    <p className="text-[10px] lg:text-xs bg-gray-50 border border-gray-400 w-fit px-3 py-1 rounded-full my-2">
      Seller: <span className="font-bold">{seller}</span>
    </p>
    <h3>{title}</h3>
    <h2 className="text-right text-xl font-semibold">{price}</h2>
    <Link
      href={link}
      target="_blank"
      className="block bg-[#434242] text-white py-1 mt-4 text-center rounded-md"
    >
      BUY
    </Link>
  </div>
);
