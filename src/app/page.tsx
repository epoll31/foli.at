import React from "react";

function FoliDotAt() {
  return (
    <div className=" bg-clip-text backdrop-blur-sm bg-theme-border-primary p-2 inline-flex">
      <h1
        className=" text-transparent font-playfair-display pointer-events-none select-none align-text-bottom"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.2)",
          fontSize: "min(30vw, 375px)",
          lineHeight: "1",
        }}
      >
        foli.at
      </h1>
    </div>
  );
}

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FoliDotAt />
    </div>
  );
}
