import React from "react";

import { logo, support } from "@/assets/SVGs";

const Navigation = () => {
  return (
    <div className="flex lg:flex-col justify-between h-fit p-5 lg:px-0 lg:py-7 lg:items-center border-b lg:border-r lg:h-screen">
      <div className="basis-full flex justify-center lg:basis-0 lg:block ml-12 lg:ml-0">
        {logo}
      </div>
      <div>{support}</div>
    </div>
  );
};

export default Navigation;