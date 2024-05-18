"use client";
import { cn } from "@/utils/cn";
import { useMemo } from "react";

export default function Timeline({
  items,
}: {
  items: {
    node: React.ReactNode;
    active: boolean;
  }[];
}) {
  const gradients = useMemo(() => {
    return items.map((_, index) => {
      const curr = items[index]?.active;

      if (index === items.length - 1) {
        return curr ? "bg-theme-accent-3" : "bg-theme-accent-dull";
      }

      const next = items[index + 1]?.active;

      const from = curr ? "theme-accent-3" : "theme-accent-dull";
      const to =
        (curr && (next || index === items.length - 1)) || (!curr && next)
          ? "theme-accent-3"
          : "theme-accent-dull";

      return `bg-gradient-to-b from-${from} to-${to} from-70% to-90%`;
    });
  }, [items]);

  return (
    <div className="flex flex-col w-full">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative px-4 [&:not(:last-child)]:pb-8 group/timeline-item"
        >
          <span
            className={cn(
              `absolute top-0 left-0 w-1 h-full`,
              "from-theme-accent-dull to-theme-accent-dull", // this is here to force TW to generate the classes
              "from-theme-accent-3 to-theme-accent-3", // this is here to force TW to generate the classes
              gradients[index],
              index === 0 ? ` rounded-t-full` : "",
              index === items.length - 1 ? `rounded-b-full` : "",
              `-translate-x-1/2`
            )}
          />
          <span
            className={cn(
              `absolute top-0 left-0 w-4 h-4 rounded-full border`,
              item.active
                ? "bg-theme-accent-3 border-theme-accent-3"
                : "bg-theme-accent-dull border-theme-accent-dull",
              "-translate-x-1/2 translate-y-1/2",
              "group-hover/timeline-item:scale-110 transition-transform"
            )}
          />
          <div className="group-hover/timeline-item:scale-105 origin-left transition-transform">
            {item.node}
          </div>
        </div>
      ))}
    </div>
  );
}
