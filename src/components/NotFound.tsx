import { useMemo } from "react";
import MegaText from "./MegaText";

export default function NotFound({ tag }: { tag?: string }) {
  const message = useMemo(() => {
    return tag ? `Portfolio Not Found` : "Page Not Found";
  }, [tag]);

  return (
    <div>
      <div className="fixed left-0 top-0 w-full h-full flex  flex-col items-center justify-center">
        <MegaText>404</MegaText>
        <h2 className="font-semibold font-barlow text-[min(5vw,100px)] leading-none transition-light-dark">
          {message}
        </h2>
      </div>
    </div>
  );
}
