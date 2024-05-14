"use client";

import { cn } from "@/utils/cn";
import { CSSProperties, use, useEffect, useRef, useState } from "react";

export default function GlowContainer({
  className,
  children,
  glowColor = "#fb3b53",
  padding = "1px",
}: {
  className?: string;
  children: React.ReactNode;
  glowColor?: string;
  padding?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({
    x: NaN,
    y: NaN,
  });
  const [relativeMousePosition, setRelativeMousePosition] = useState({
    x: "-100%",
    y: "-100%",
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const rect = ref.current?.getBoundingClientRect();

  useEffect(() => {
    if (!ref.current || !rect) return;
    const x = mousePosition.x - rect.left;
    const y = mousePosition.y - rect.top;
    setRelativeMousePosition({ x: `${x}px`, y: `${y}px` });
  }, [mousePosition, rect]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || !rect) return;
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      setRelativeMousePosition({ x: `${x}px`, y: `${y}px` });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [rect, mousePosition.x, mousePosition.y]);

  // useEffect(() => {
  //   const handleTouchStart = (e: TouchEvent) => {
  //     setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  //   };
  //   document.addEventListener("touchstart", handleTouchStart);
  //   return () => {
  //     document.removeEventListener("touchstart", handleTouchStart);
  //   };
  // }, []);
  // useEffect(() => {
  //   const handleTouchMove = (e: TouchEvent) => {
  //     setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  //   };
  //   document.addEventListener("touchmove", handleTouchMove);
  //   return () => {
  //     document.removeEventListener("touchmove", handleTouchMove);
  //   };
  // }, []);
  // useEffect(() => {
  //   const handleTouchEnd = () => {
  //     setMousePosition({ x: NaN, y: NaN });
  //   };
  //   document.addEventListener("touchend", handleTouchEnd);
  //   return () => {
  //     document.removeEventListener("touchend", handleTouchEnd);
  //   };
  // }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-neutral-300",
        className
      )}
      style={{ padding }}
      ref={ref}
    >
      <span
        className={`absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2  blur-lg pointer-events-none z-0`}
        style={
          {
            left: relativeMousePosition.x,
            top: relativeMousePosition.y,
            backgroundImage: `radial-gradient(${glowColor} 0%, transparent 50%)`,
          } as CSSProperties
        }
      ></span>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
