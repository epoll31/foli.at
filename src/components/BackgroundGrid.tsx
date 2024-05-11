import { cn } from "@/utils/cn";

export default function BackgroundGrid({
  size = "35px",
  className,
}: {
  size?: string | number;
  className?: string;
}) {
  return (
    <div
      className={cn("-z-50 fixed w-full h-full top-0 left-0", className)}
      style={{
        backgroundImage: "url(/lines.svg)",
        backgroundRepeat: "repeat",
        backgroundSize: size,
      }}
    />
  );
}
