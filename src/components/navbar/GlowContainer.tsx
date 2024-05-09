"use client";

import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

export default function GlowContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({
    x: "-100%",
    y: "-100%",
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: `${x}px`, y: `${y}px` });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-white/50",
        className
      )}
      ref={ref}
    >
      <span
        className={`absolute z-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(#fb3b53_0%,transparent_50%)] blur-lg`}
        style={
          {
            left: mousePosition.x,
            top: mousePosition.y,
          } as any
        }
      ></span>
      <div className="relative z-10 m-[1px] rounded-full bg-white/50 backdrop-blur-sm ">
        {children}
      </div>
    </div>
  );
}
