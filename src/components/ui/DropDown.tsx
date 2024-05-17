import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";
import React from "react";
import ChevronUp from "../icons/chevron-up";

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
        className="relative rounded-[0.5rem] w-full backdrop-blur-sm "
        glowColor={glowColor}
      >
        <select
          className={cn(
            "w-full px-2 py-1 rounded-[calc(0.5rem-2px)] outline-2 outline-transparent outline-offset-1 focus-visible:outline-theme-blue bg-theme-black-light z-20",
            className
          )}
          style={{
            appearance: "none",
          }}
          ref={ref}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronUp className="absolute w-5 h-5 text-theme-gray right-1 top-1/2 -translate-y-1/2 py-auto pointer-events-none -scale-y-100" />
      </GlowContainer>
    );
  }
);

DropDown.displayName = "DropDown";

export default DropDown;
