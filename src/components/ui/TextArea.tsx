import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";
import React from "react";

const TextArea = React.forwardRef(
  (
    {
      className,
      glowColor = "#ffffff33",
      ...props
    }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
      glowColor?: string;
    },
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    return (
      <GlowContainer
        padding="2px"
        className="rounded-[0.5rem] bg-zinc-700/60 backdrop-blur-sm"
        glowColor={glowColor}
      >
        <textarea
          className={cn(
            className,
            "w-full px-2 py-1 rounded-[calc(0.5rem-2px)] focus-visible:outline-none border-2 border-transparent focus-visible:border-blue-300/50 bg-zinc-800/50 text-white/60 z-20 min-h-10 max-h-96 align-top"
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
