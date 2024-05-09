"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function NavTab({
  tab,
}: {
  tab: {
    name: string;
    href: string;
    icon: React.ReactNode;
  };
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex flex-row justify-center items-center px-4 h-10 first:pl-6 last:pr-6 overflow-hidden bg-white/50 first:rounded-l-full last:rounded-r-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={{
        open: { gap: "1rem" },
        closed: { gap: "0rem" },
      }}
      initial="closed"
      animate={isHovered ? "open" : "closed"}
    >
      {tab.icon}
      <AnimatePresence>
        <motion.p
          variants={{
            open: { width: "auto", opacity: 1 },
            closed: { width: 0, opacity: 0 },
          }}
          initial="closed"
          animate={isHovered ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {tab.name}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
