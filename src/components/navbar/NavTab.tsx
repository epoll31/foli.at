"use client";

import logout from "@/utils/supabase/actions/logout";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export interface Tab {
  name: string;
  href?: string;
  action?: "logout";
  icon: React.ReactNode;
}

function Outer({ children, tab }: { children: React.ReactNode; tab: Tab }) {
  const handleClick = () => {
    if (tab.action === "logout") {
      logout();
    }
  };
  const className = "first:rounded-l-full last:rounded-r-full overflow-hidden";

  if (tab.href) {
    return (
      <Link onClick={handleClick} href={tab.href} className={className} replace>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

export default function NavTab({ tab }: { tab: Tab }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Outer tab={tab}>
      <motion.div
        className="relative flex flex-row justify-center items-center px-4 h-10 first:pl-6 last:pr-6  bg-white/50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variants={{
          open: {
            gap: "0.5rem",
          },
          closed: {
            gap: "0rem",
          },
        }}
        initial="closed"
        animate={isHovered ? "open" : "closed"}
      >
        {tab.icon}
        <AnimatePresence>
          <motion.p
            className="text-nowrap"
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
    </Outer>
  );
}
