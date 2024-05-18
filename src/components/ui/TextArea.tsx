import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";
import React from "react";
import GridDots from "../icons/grid-dots";

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
        className="relative rounded-[0.5rem] backdrop-blur-sm"
        glowColor={glowColor}
      >
        <textarea
          className={cn(
            className,
            " w-full px-2 py-1 rounded-[calc(0.5rem-2px)] outline-2 outline-transparent outline-offset-1 focus-visible:outline-theme-focus bg-theme-bg-tertiary z-20 min-h-10 max-h-96 align-top [&::-webkit-resizer]:hidden"
          )}
          style={{
            scrollbarColor: "var(--theme-accent-dull) transparent",
          }}
          ref={ref}
          {...props}
        ></textarea>
        <GridDots className="absolute w-4 h-4 text-theme-accent-dull right-0.5 bottom-0.5 pointer-events-none" />
      </GlowContainer>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
