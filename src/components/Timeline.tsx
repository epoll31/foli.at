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
        return curr ? "bg-theme-red" : "bg-theme-gray";
      }

      const next = items[index + 1]?.active;

      const from = curr ? "theme-red" : "theme-gray";
      const to =
        (curr && (next || index === items.length - 1)) || (!curr && next)
          ? "theme-red"
          : "theme-gray";

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
              "from-theme-gray to-theme-gray from-theme-red to-theme-red", // this is here to force TW to generate the classes
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
                ? "bg-theme-red border-theme-red"
                : "bg-theme-gray border-theme-gray",
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
