"use client";

import {
  sendMessageSVG,
  shoppingBagBigSVG,
  shoppingBagSmallSVG,
} from "@/assets/SVGs";

import {
  Dispatch,
  KeyboardEvent,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Link from "../../node_modules/next/link";
import { gabarito } from "./constants/font";

const products = [
  {
    image:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/80/650209/1.jpg",
    seller: "Amazon",
    title: "Blue turtle neck Tshirt",
    price: "$50.99",
    link: "#",
  },
  {
    image:
      "https://static.thcdn.com/images/large/original//productimg/1600/1600/15083108-9755113374380820.jpg",
    seller: "Ebay",
    title: "White turtle neck Tshirt",
    price: "$25.99",
    link: "#",
  },
  {
    image:
      "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/80/650209/1.jpg",
    seller: "Amazon",
    title: "Blue turtle neck Tshirt",
    price: "$50.99",
    link: "#",
  },
];

type ChatValue = {
  [index: string]: string | ProductListProps[];
};

export default function Home() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [messageSession, setMessageSession] = useState(false);
  const [outgoingMessage, setOutgoingMessage] = useState("");
  const [chats, setChats] = useState<Array<ChatValue>>([]);
  const [isReady, setIsReady] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [switchCoversational, setSwitchConversational] = useState(0);
  const outGoingMessageRef = useRef<HTMLButtonElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      (async function () {
        const response = await fetch("/.netlify/functions/suggestions");
        const data = await response.json();
        const extractSuggestion = JSON.parse(data.body).suggestions;
        setSuggestions(extractSuggestion);
      })();
    } catch (error) {
      console.log("error encountered");
    }
  }, []);

  useLayoutEffect(() => {
    const session = sessionStorage.getItem("session");
    if (session) {
      setMessageSession(true);
      setChats(JSON.parse(session));
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    // Network request Logic

    if (messageSent && switchCoversational <= 0) {
      setChats((chats) => {
        const updatedChats = [
          ...chats,
          {
            incomingMessage:
              "Thats an excellent choice for this time of the year",
          },
          { incomingMessage: "Here are the products that..." },
          { products: products as ProductListProps[] },
        ];

        sessionStorage.setItem("session", JSON.stringify(updatedChats));

        return updatedChats;
      });
      setSwitchConversational((prevState) => prevState + 1);
    }

    if (messageSent && switchCoversational > 0) {
      setChats((chats) => {
        const updatedChats = [
          ...chats,
          {
            incomingMessage:
              "Now this will be more conversational, lets get you what you really want",
          },
          {
            incomingMessage:
              "Ask me anything that make the buying decision your best buying decision!",
          },
        ];

        sessionStorage.setItem("session", JSON.stringify(updatedChats));

        return updatedChats;
      });
      setSwitchConversational((prevState) => prevState + 1);
    }

    if (switchCoversational > 2) setSwitchConversational(0);

    setMessageSent(false);
  }, [messageSent]);

  const outGoingMessageHandler = () => {
    setChats((chats) => {
      const updatedChats = [...chats, { outgoingMessage }];

      sessionStorage.setItem("session", JSON.stringify(updatedChats));

      return updatedChats;
    });

    setMessageSession(true);
    setOutgoingMessage("");
    setMessageSent(true);
  };

  const enterKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      outGoingMessageRef.current?.click();
    }
  };

  return (
    isReady && (
      <div className="w-full flex flex-col justify-between h-[calc(100vh-100px)] lg:h-[calc(100vh-25px)]">
        {!messageSession && (
          <Welcome
            suggestions={suggestions}
            setChats={setChats}
            setMessageSession={setMessageSession}
            setMessageSent={setMessageSent}
          />
        )}
        {messageSession && (
          <section className="w-11/12 max-w-3xl mx-auto mt-8 overflow-y-auto px-4 mb-10 lg:mb-16 scroll-mobile">
            {chats.map((chat, index) => {
              if (chat.incomingMessage)
                return (
                  <IncomingMessage
                    key={index}
                    message={chat.incomingMessage as string}
                  />
                );
              if (chat.outgoingMessage)
                return (
                  <OutGoingMessage
                    key={index}
                    message={chat.outgoingMessage as string}
                  />
                );

              if (chat.products)
                return (
                  <ProductList
                    key={index}
                    products={chat.products as ProductListProps[]}
                  />
                );
            })}
            <div ref={chatEndRef} />
          </section>
        )}

        {/* Messaging Start*/}
        <section className="mx-auto w-11/12 max-w-xl ">
          <div className="flex  lg:w-[565px] bg-white border-gray-300 rounded-full mx-auto mt-0">
            <input
              type="text"
              className="w-full h-14 rounded-full outline-none pl-6"
              placeholder="What would you like to buy today?"
              value={outgoingMessage}
              onChange={(e) => setOutgoingMessage(e.target.value)}
              onKeyDown={enterKeyHandler}
            />
            <button
              className="flex justify-center items-center mr-2"
              onClick={outGoingMessageHandler}
              ref={outGoingMessageRef}
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
    )
  );
}

const Welcome = ({
  suggestions,
  setChats,
  setMessageSession,
  setMessageSent,
}: {
  suggestions: string[];
  setChats: Dispatch<SetStateAction<ChatValue[]>>;
  setMessageSession: Dispatch<SetStateAction<boolean>>;
  setMessageSent: Dispatch<SetStateAction<boolean>>;
}) => {
  const suggestionClickHandler = (suggestion: string) => {
    setChats((chats) => {
      const updatedChats = [...chats, { outgoingMessage: suggestion }];

      sessionStorage.setItem("session", JSON.stringify(updatedChats));

      return updatedChats;
    });
    setMessageSession(true);
    setMessageSent(true);
  };

  return (
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
      {/* Show suggestions load when page is loading*/}
      {suggestions.length <= 0 ? (
        <div className="mt-20 lg:mt-24">
          <p className="text-center lg:text-lg">
            Loading Suggestions... &#128173; &#128173;
          </p>
        </div>
      ) : (
        <div>
          {/* Sugggestions Large Screen*/}
          <div className="hidden lg:flex flex-wrap w-4/5 max-w-6xl justify-center mx-auto mt-12 lg:mt-16 gap-3 lg:gap-7">
            {suggestions.map((suggestion, index) => (
              <Suggestion
                suggestion={suggestion}
                key={index}
                onClick={suggestionClickHandler}
              />
            ))}
          </div>
          {/* Sugggestions Small Screen*/}
          <div className="flex flex-wrap w-4/5 max-w-6xl justify-center mx-auto mt-12 lg:mt-16 gap-3 lg:gap-7 lg:hidden">
            {suggestions.map(
              (suggestion, index) =>
                index < 2 && (
                  <Suggestion
                    suggestion={suggestion}
                    key={index}
                    onClick={suggestionClickHandler}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Suggestion = ({
  suggestion,
  onClick,
}: {
  suggestion: string;
  onClick: (suggestion: string) => void;
}) => {
  return (
    <div
      onClick={() => onClick(suggestion)}
      className="cursor-pointer bg-white py-4 px-5 basis-36 h-32 lg:basis-44 lg:h-40 rounded-2xl border border-gray-300 drop-shadow-sm"
    >
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
  image: string;
  seller: string;
  title: string;
  price: string;
  link: string;
}

const ProductList = ({ products }: { products: Array<ProductListProps> }) => {
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
    <p className="text-[10px] lg:text-xs bg-gray-50 border border-gray-400 w-fit px-2 py-0.5 rounded-full my-2">
      Seller: <span className="font-bold">{seller}</span>
    </p>
    <h3>{title}</h3>
    <h2 className="text-right text-xl font-semibold">{price}</h2>
    <Link
      href={link}
      target="_blank"
      className="block bg-[#434242] text-white py-0.5 mt-4 text-center rounded-md text-sm"
    >
      BUY
    </Link>
  </div>
);
