import { cn } from "@/utils/cn";

export default function BackgroundGrid({
  size = "35px",
  fade,
  className,
}: {
  size?: string | number;
  fade?: `${number}%`;
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
      }}
    >
      {fade && (
        <span
          className={`w-full h-full bg-gradient-radial from-white from-[${fade}] to-transparent`}
        />
      )}
    </div>
  );
}
