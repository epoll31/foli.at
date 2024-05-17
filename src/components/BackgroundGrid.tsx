import { cn } from "@/utils/cn";

export default function BackgroundGrid({
  size = "35px",
  fade,
  fadeFrom = "0%",
  fadeTo = "100%",
  className,
}: {
  size?: string | number;
  fadeFrom?: `${number}%`;
  fadeTo?: `${number}%`;
  fade?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "-z-50 fixed flex w-full h-full top-0 left-0 overflow-hidden pointer-events-none ",
        className
      )}
      style={{
        backgroundImage: "url(/lines.svg)",
        backgroundRepeat: "repeat",
        backgroundSize: size,
        maskImage: fade
          ? `radial-gradient(circle at 50% 50%, transparent ${fadeFrom}, black ${fadeTo})`
          : "",
      }}
    ></div>
  );
}
