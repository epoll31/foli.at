import { cn } from "@/utils/cn";

export default function Card({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white/80 rounded-xl p-4 shadow-lg backdrop-blur-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
