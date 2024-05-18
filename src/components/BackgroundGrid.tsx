"use client";

import { cn } from "@/utils/cn";
import useTheme from "@/utils/hooks/useTheme";
import { useMemo } from "react";

export default function BackgroundGrid({
  size = "35px",
  fade,
  fadeFrom = "0%",
  fadeTo = "100%",
  className,
}: {
  size?: string | number;
  fadeFrom?: `${number}%`;
  fadeTo?: `${number}%`;
  fade?: boolean;
  className?: string;
}) {
  //theme-text-primary as hex
  const theme = useTheme();
  // const svgDataUrl = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' stroke='${"red"}'><path d='M 100 0 L 100 200'/><path d='M 0 100 L 200 100'/></svg>`;
  const svgDataUrl = useMemo(() => {
    const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' stroke='${
      theme === "light" ? "#000000" : "#ffffff"
    }'>
      <path d='M 100 0 L 100 200'/>
      <path d='M 0 100 L 200 100'/>
    </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, [theme]);

  return (
    <div
      className={cn(
        "-z-50 fixed flex w-full h-full top-0 left-0 overflow-hidden pointer-events-none ",
        className
      )}
      style={{
        color: "red",
        backgroundImage: `url("${svgDataUrl}")`,
        backgroundRepeat: "repeat",
        backgroundSize: size,
        maskImage: fade
          ? `radial-gradient(circle at 50% 50%, transparent ${fadeFrom}, black ${fadeTo})`
          : "",
      }}
    ></div>
  );
}
