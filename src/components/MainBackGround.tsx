import React from "react";

const MainBackGround = () => {
  return (
    <div className="absolute top-0 w-full h-screen -z-10">
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute w-[1477px] h-[1477px] bg-[#cf6dfc] rounded-full blur-[100px] opacity-20 left-48"></div>
        <div className="absolute w-[907px] h-[907px] bg-[#c1bfff] rounded-full blur-[100px] opacity-20 left-20 -top-[700px]"></div>
        <div className="absolute w-[907px] h-[907px] bg-[#fdfbd4] rounded-full blur-[100px] opacity-20 -left-[700px]"></div>
        <div className="absolute w-[907px] h-[907px] bg-[#BDB96A] rounded-full blur-[100px] opacity-20 left-48 top-64"></div>
      </div>
    </div>
  );
};

export default MainBackGround;
