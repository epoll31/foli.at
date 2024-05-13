"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link } from "@/lib/types";
import LinkedIn from "@/components/icons/linkedin";
import Github from "@/components/icons/github";
import Twitter from "@/components/icons/twitter";
import BriefcaseFilled from "@/components/icons/briefcase-filled";
import LinkIcon from "@/components/icons/link";

export default function Links({ links }: { links: Link[] }) {
  const orderedLinks = useMemo(() => {
    return links.sort((a, b) => {
      if (a.type === "linkedin") return -1;
      if (b.type === "linkedin") return 1;

      if (a.type === "github") return -1;
      if (b.type === "github") return 1;

      if (a.type === "twitter") return -1;
      if (b.type === "twitter") return 1;

      if (a.type === "portfolio") return -1;
      if (b.type === "portfolio") return 1;

      return 0;
    });
  }, [links]);

  return (
    <div className="flex flex-row gap-2">
      {orderedLinks.map((link, i) => (
        <motion.a
          // href={link.href}
          key={i}
          initial={{
            scale: 1,
            color: "#737373",
            rotate: "0deg",
          }}
          whileHover={{
            scale: 1.15,
            color: "#38bdf8",
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
          {link.type === "linkedin" ? (
            <LinkedIn className="w-6 h-6" />
          ) : link.type === "github" ? (
            <Github className="w-6 h-6 " />
          ) : link.type === "twitter" ? (
            <Twitter className="w-6 h-6" />
          ) : link.type === "portfolio" ? (
            <BriefcaseFilled className="w-6 h-6" />
          ) : (
            <LinkIcon className="w-6 h-6" />
          )}
        </motion.a>
      ))}
    </div>
  );
}
