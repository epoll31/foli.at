import { cn } from "@/utils/cn";
import GlowContainer from "../navbar/GlowContainer";

export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <GlowContainer padding="2px">
      <input
        className={cn(
          className,
          "px-4 py-1 rounded-full outline-blue-300 focus-visible:outline-2 border-none bg-white/80 z-20"
        )}
        {...props}
      />
    </GlowContainer>
  );
}
