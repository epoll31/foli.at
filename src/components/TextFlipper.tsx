import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface Text {
  text: string;
  className?: string;
}

function Flipper({ text, className }: { text: Text; className?: string }) {
  const [prev, setPrev] = useState<Text>({
    text: "",
    className: "",
  });
  const [curr, setCurr] = useState(text);

  useEffect(() => {
    setPrev(curr);
    setCurr(text);
  }, [text]);

  return (
    <span className={cn(className, "relative")}>
      <motion.span
        initial={{
          rotateX: 90,
          y: -25,
          translateZ: "50px",
          opacity: 0,
        }}
        animate={{
          rotateX: 0,
          y: 0,
          translateZ: "0px",
          opacity: "100%",
        }}
        transition={{
          duration: 1,
        }}
        key={`curr-${curr.text}`}
        className={cn(
          `absolute left-0 bottom-0 h-full w-full inline-block`,
          curr.className
        )}
      >
        {curr.text}
      </motion.span>
      <motion.span
        initial={{
          rotateX: 0,
          y: 0,
          translateZ: "0px",
          opacity: "100%",
        }}
        animate={{
          rotateX: 90,
          y: 25,
          translateZ: "-50px",
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
        key={`prev-${prev.text}`}
        className={cn(
          `absolute left-0 bottom-0  h-full w-full inline-block`,
          prev.className
        )}
      >
        {prev.text}
      </motion.span>
    </span>
  );
}

export default function TextFlipper({
  texts,
  className,
}: {
  texts: Text[];
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handleNext = () => {
      setActive((prevActive) => (prevActive + 1) % texts.length);
    };

    const interval = setInterval(handleNext, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Flipper text={texts[active]} className={className} />;
}
