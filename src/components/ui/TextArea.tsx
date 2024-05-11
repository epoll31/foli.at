import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";

export default function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <GlowContainer padding="2px" className="rounded-[0.5rem]">
      <textarea
        className={cn(
          className,
          "px-4 py-1 rounded-[calc(0.5rem-2px)] outline-blue-300 focus-visible:outline-2 border-none bg-white/80 z-20 min-h-10 max-h-96 align-top"
        )}
        {...props}
      />
    </GlowContainer>
  );
}
