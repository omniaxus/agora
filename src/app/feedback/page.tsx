import React from "react";

export default function FeedBack() {
  return (
    <div className="h-[calc(100vh-100px)] lg:h-screen grid place-items-center">
      <div className="w-9/12 max-w-md h-fit flex flex-col">
        <h2 className="text-center mb-6 text-lg lg:text-2xl font-medium">
          User Feed Back
        </h2>
        <input
          type="text"
          placeholder="Enter email address"
          className="py-2 px-4 mb-4 border border-gray-400 rounded-md"
        />
        <textarea
          className="py-2 px-4 mb-4 border border-gray-400 rounded-md h-44"
          placeholder="We know Agora isn't perfect yet, but with your help, we can make it even better. Please share your thoughts on what would enhance your experience!"
        />
        <button className="block bg-[#434242] text-white py-1 mt-4 text-center rounded-md">
          Send
        </button>
      </div>
    </div>
  );
}
