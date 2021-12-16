import React from "react";
import tokenImg from "./images/gm2.jpeg";

const soon = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <div className="max-w-2xl">
        <img src={tokenImg} />
      </div>
      <div className="text-gray-900 text-2xl font-mono my-4">Coming soon</div>
    </div>
  );
};

export default soon;
