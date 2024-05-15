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
        className={cn(glowClassName, "rounded-[0.6rem]")}
        glowColor={glowColor}
      >
        <div className="bg-white/50 rounded-[calc(0.6rem-1px)] px-3 py-1">
          {children}
        </div>
      </GlowContainer>
    </button>
  );
}
