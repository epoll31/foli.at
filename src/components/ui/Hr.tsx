import { cn } from "@/utils/cn";

export default function Hr({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "w-full h-px bg-gradient-to-r from-transparent via-theme-blue to-transparent",
        className
      )}
    />
  );
}
