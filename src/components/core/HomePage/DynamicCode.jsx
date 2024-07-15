import React from "react";
import { TypeAnimation } from "react-type-animation";

const DynamicCode = () => {
  const renderIndex = () => {
    const indexList = [];
    for (let i = 1; i <= 11; i++)
      indexList.push(
        <p className=" tracking-tighter text-center text-richblack-400">{i}</p>
      );
    return indexList;
  };
  return (
    <div className="rounded-md w-[470px] h-[278px] mx-auto bg-gradient-to-br p-[2px] from-[#0E1A2D3D] to-[#111E3261]">
      <div className="rounded-md justify-between h-full bg-richblack-900 flex gap-2 -z-10 p-2 font-mono font-bold text-sm">
        <div className="w-[10%] h-[262px] px-1 flex flex-col gap-[2px]">
          {renderIndex()}
        </div>
        <div className="w-[90%] h-[258px]">
          <div className="font-mono font-bold text-sm flex flex-col gap-[2px] text-yellow-200">
            <TypeAnimation
              style={{
                whiteSpace: "pre-line",
                height: "195px",
                display: "block",
              }}
              sequence={[
                `<!DOCTYPE html>\n<html>\n<head><>Example</\ntitle><link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/>Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/>Two</\na><a href="thre/>Three</a>\n</nav>`, // actual line-break inside string literal also gets animated in new line, but ensure there are no leading spaces
                1000,
                "",
              ]}
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCode;
