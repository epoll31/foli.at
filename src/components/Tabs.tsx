"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TabProps extends TabInfo {
  setSelected: (text: string) => void;
}

function Tab({ label, href, setSelected }: TabProps) {
  const pathname = usePathname();

  const selected = useMemo(() => {
    return pathname === href;
  }, [pathname, href]);

  return (
    <button
      onClick={() => {
        setSelected(label);
      }}
      className={`${
        selected ? "text-white" : "text-gray-500 hover:text-gray-900"
      } relative rounded-md px-2 py-1 text-sm font-medium transition-colors`}
    >
      <span className="relative z-10">{label}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-md bg-red-500"
        ></motion.span>
      )}
    </button>
  );
}

export interface TabInfo {
  label: string;
  href: string;
}

export default function Tabs({ tabs }: { tabs: TabInfo[] }) {
  const router = useRouter();

  const handleChange = (text: string) => {
    router.push(tabs.find((tab) => tab.label === text)?.href ?? "/");
  };

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {tabs.map((tab) => (
        <Tab setSelected={handleChange} key={tab.label} {...tab} />
      ))}
    </div>
  );
}
