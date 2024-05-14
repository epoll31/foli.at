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
  const [opacity, setOpacity] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [relativeMousePosition, setRelativeMousePosition] = useState({
    x: "-100%",
    y: "-100%",
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x: e.clientX, y: e.clientY });
    setRelativeMousePosition({ x: `${x}px`, y: `${y}px` });
    setOpacity(1);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setMousePosition({ x: touch.clientX, y: touch.clientY });
    setRelativeMousePosition({ x: `${x}px`, y: `${y}px` });
    setOpacity(1);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    setMousePosition({ x: touch.clientX, y: touch.clientY });
    setRelativeMousePosition({ x: `${x}px`, y: `${y}px` });
  };

  const handleEnd = () => {
    setTimeout(() => {
      setOpacity(0);
    }, 100);
  };
  const handleScroll = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = parseFloat(relativeMousePosition.x) - rect.left;
    const y = parseFloat(relativeMousePosition.y) - rect.top;
    setRelativeMousePosition({ x: `${x}px`, y: `${y}px` });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleEnd);
    document.addEventListener("touchcancel", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
      document.removeEventListener("touchcancel", handleEnd);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = mousePosition.x - rect.left;
      const y = mousePosition.y - rect.top;
      setRelativeMousePosition({ x: `${x}px`, y: `${y}px` });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mousePosition]);

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
        className={`absolute h-44 w-44 -translate-x-1/2 -translate-y-1/2 blur-lg pointer-events-none z-0 transition-opacity`}
        style={
          {
            opacity: opacity,
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
