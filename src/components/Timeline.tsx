import { cn } from "@/utils/cn";

export default function Timeline({
  items,
}: {
  items: {
    node: React.ReactNode;
    active: boolean;
  }[];
}) {
  const getActive = (index: number) => {
    return items[index]?.active;
  };

  function getGradient(index: number) {
    const curr = getActive(index);
    const next = getActive(index + 1);

    const from = curr ? "theme-red" : "theme-gray";
    const via = curr ? "theme-red" : "theme-gray";
    const to =
      (curr && (next || index === items.length - 1)) || (!curr && next)
        ? "theme-red"
        : "theme-gray";

    return `bg-gradient-to-b from-${from} via-${via} to-${to} from-70% to-90%`;
  }

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
              getGradient(index),
              index === 0 ? ` rounded-t-full` : "",
              index === items.length - 1 ? `rounded-b-full` : "",
              `-translate-x-1/2`
            )}
          />
          <span
            className={cn(
              `absolute top-0 left-0 w-4 h-4 rounded-full border`,
              getActive(index)
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
