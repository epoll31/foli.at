import React from "react";

function FoliDotAt() {
  return (
    <div className=" bg-clip-text backdrop-blur-sm bg-white/10 p-2 ">
      <p
        className=" transition-all text-transparent font-playfair-display pointer-events-none select-none"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.2)",
          fontSize: "min(30vw, 375px)",
        }}
      >
        foli.at
      </p>
    </div>
  );
}

export default async function Home() {
  return (
    <div className="">
      <FoliDotAt />
    </div>
  );
}
