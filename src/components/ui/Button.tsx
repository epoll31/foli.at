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
    <GlowContainer
      padding="0px"
      className={cn(glowClassName, "rounded-[0.6rem] backdrop-blur-sm ")}
      glowColor={glowColor}
    >
      <button
        className={cn(
          "focus-visible:outline-none border-2 border-transparent focus-visible:border-theme-focus rounded-[calc(0.6rem+0px)]",
          className
        )}
        {...props}
      >
        <div className="rounded-[calc(0.6rem-1px)] px-3 py-1 bg-theme-bg-primary z-20">
          {children}
        </div>
      </button>
    </GlowContainer>
  );
}
