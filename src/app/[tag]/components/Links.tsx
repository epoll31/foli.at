"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link as LinkType } from "@/lib/types";
import LinkedIn from "@/components/icons/linkedin";
import Github from "@/components/icons/github";
import Twitter from "@/components/icons/twitter";
import BriefcaseFilled from "@/components/icons/briefcase-filled";
import LinkIcon from "@/components/icons/link";
import Link from "next/link";

export default function Links({ links }: { links: LinkType[] }) {
  const orderedLinks = useMemo(() => {
    return links.sort((a, b) => {
      if (a.type === "LINKEDIN") return -1;
      if (b.type === "LINKEDIN") return 1;

      if (a.type === "GITHUB") return -1;
      if (b.type === "GITHUB") return 1;

      if (a.type === "TWITTER") return -1;
      if (b.type === "TWITTER") return 1;

      if (a.type === "PORTFOLIO") return -1;
      if (b.type === "PORTFOLIO") return 1;

      return 0;
    });
  }, [links]);

  return (
    <div className="flex flex-row gap-3">
      {orderedLinks.map((link, i) => (
        <Link key={i} href={link.href} passHref legacyBehavior>
          <motion.a
            initial={{
              scale: 1,
              color: "var(--theme-text-primary)",
              rotate: "0deg",
            }}
            whileHover={{
              scale: 1.15,
              color: "var(--theme-accent-1)",
              rotate: ["0deg", "2deg", "0deg", "-2deg", "0deg"],
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 300,
              rotate: {
                repeat: Infinity,
                duration: 0.5,
                type: "keyframes",
              },
              color: {
                type: "tween",
              },
            }}
          >
            {link.type === "LINKEDIN" ? (
              <LinkedIn className="w-6 h-6" />
            ) : link.type === "GITHUB" ? (
              <Github className="w-6 h-6 " />
            ) : link.type === "TWITTER" ? (
              <Twitter className="w-6 h-6" />
            ) : link.type === "PORTFOLIO" ? (
              <BriefcaseFilled className="w-6 h-6" />
            ) : (
              <LinkIcon className="w-6 h-6" />
            )}
          </motion.a>
        </Link>
      ))}
    </div>
  );
}
