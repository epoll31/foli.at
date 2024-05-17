import { cn } from "@/utils/cn";
import GlowContainer from "../GlowContainer";

export default function Button({
  children,
  className,
  glowColor = "#60a5fa",
  glowClassName,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  glowColor?: string;
  glowClassName?: string;
}) {
  return (
    <button className={cn(className)} {...props}>
      <GlowContainer
        padding="2px"
        className={cn(
          glowClassName,
          "rounded-[0.6rem]  bg-zinc-700/60 backdrop-blur-sm"
        )}
        glowColor={glowColor}
      >
        <div className="rounded-[calc(0.6rem-1px)] px-3 py-1  focus-visible:outline-none border-2 border-transparent focus-visible:border-blue-300/50 bg-zinc-800/50 text-white/60 z-20">
          {children}
        </div>
      </GlowContainer>
    </button>
  );
}
