import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";
import React from "react";

export interface Option {
  value: string;
  label: string;
}

const DropDown = React.forwardRef(
  (
    {
      className,
      options,
      glowColor,
      ...props
    }: React.SelectHTMLAttributes<HTMLSelectElement> & {
      options: Option[];
      glowColor?: string;
    },
    ref: React.Ref<HTMLSelectElement>
  ) => {
    return (
      <GlowContainer
        padding="2px"
        className="rounded-[0.5rem] w-full"
        glowColor={glowColor}
      >
        <select
          className={cn(
            "w-full px-4 py-1 rounded-[calc(0.5rem-2px)] outline-blue-300 focus-visible:outline-2 border-none bg-white/80 z-20",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </GlowContainer>
    );
  }
);

DropDown.displayName = "DropDown";

export default DropDown;
