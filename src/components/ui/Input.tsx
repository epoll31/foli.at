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
    //TODO: fix color of date picker icon thing
    return (
      <GlowContainer
        padding="2px"
        glowColor={glowColor}
        className="backdrop-blur-sm"
      >
        <input
          className={cn(
            className,
            "px-4 py-1 rounded-full outline-2 outline-transparent outline-offset-1 focus-visible:outline-theme-blue bg-theme-black-light z-20"
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
