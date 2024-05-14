import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";
import React from "react";

const TextArea = React.forwardRef(
  (
    {
      className,
      glowColor,
      ...props
    }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      glowColor?: string;
    },
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <GlowContainer
        padding="2px"
        className="rounded-[0.5rem]"
        glowColor={glowColor}
      >
        <textarea
          className={cn(
            className,
            "w-full px-4 py-1 rounded-[calc(0.5rem-2px)] outline-blue-300 focus-visible:outline-2 border-none bg-white/80 z-20 min-h-10 max-h-96 align-top"
          )}
          ref={ref}
          {...props}
        />
      </GlowContainer>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
