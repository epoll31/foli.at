import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";
import React from "react";

const Input = React.forwardRef(
  (
    {
      className,
      glowColor = "#ffffff33",
      ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
      glowColor?: string;
    },
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <GlowContainer
        padding="2px"
        glowColor={glowColor}
        className=" bg-zinc-700/60 backdrop-blur-sm"
      >
        <input
          className={cn(
            className,
            "px-4 py-1 rounded-full border-2 border-transparent focus-visible:outline-none focus-visible:border-blue-300/50 bg-zinc-800/50 text-white/60 z-20"
          )}
          ref={ref}
          {...props}
        />
      </GlowContainer>
    );
  }
);

Input.displayName = "Input";
export default Input;
