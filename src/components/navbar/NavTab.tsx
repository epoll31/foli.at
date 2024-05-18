"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import getPortfolio from "@/utils/actions/getPortfolio";
import { useTag } from "@/utils/hooks/useTag";

export interface Tab {
  name: string;
  href?: string;
  action?: "logout" | "tag";
  icon: React.ReactNode;
}

function Outer({
  children,
  tab,
  tag,
}: {
  children: React.ReactNode;
  tab: Tab;
  tag?: string;
}) {
  const handleClick = () => {
    if (tab.action === "logout") {
      signOut({
        callbackUrl: "/",
      });
    }
  };
  const className = "first:rounded-l-full last:rounded-r-full overflow-hidden";

  if (tab.href || tab.action === "tag") {
    const href = (tab.action === "tag" ? `/${tag}` : tab.href) as string;
    return (
      <Link onClick={handleClick} href={href} className={className} replace>
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

export default function NavTab({ tab, email }: { tab: Tab; email?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const tag = useTag(email); // i think that this is very inefficient

  if (tab.action === "tag" && !tag) {
    return null;
  }

  return (
    <Outer tab={tab} tag={tag}>
      <motion.div
        className="relative flex flex-row justify-center items-center px-4 h-10 first:pl-6 last:pr-6 bg-theme-bg-faded text-theme-text-primary"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => {
          setIsHovered(true);
          setTimeout(() => setIsHovered(false), 1000);
        }}
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
