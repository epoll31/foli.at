import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";
import React from "react";

const Input = React.forwardRef(
  (
    { className, ...props }: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <GlowContainer padding="2px">
        <input
          className={cn(
            className,
            "px-4 py-1 rounded-full outline-blue-300 focus-visible:outline-2 border-none bg-white/80 z-20"
          )}
          ref={ref}
          {...props}
        />
      </GlowContainer>
    );
  }
);

export default Input;
