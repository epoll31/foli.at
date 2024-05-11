import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";

export interface Option {
  value: string;
  label: string;
}

export default function DropDown({
  className,
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
}) {
  return (
    <GlowContainer padding="2px" className="rounded-[0.5rem]">
      <select
        className={cn(
          className,
          "w-full px-4 py-1 rounded-[calc(0.5rem-2px)] outline-blue-300 focus-visible:outline-2 border-none bg-white/80 z-20"
        )}
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
