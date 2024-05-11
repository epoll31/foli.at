"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useState } from "react";

const AccordionContext = createContext({
  open: false,
  toggle: () => {},
});
export function Accordion({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <div className={cn("flex flex-col", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { toggle } = useContext(AccordionContext);

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn("w-full text-left", className)}
    >
      {children}
    </button>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useContext(AccordionContext);

  return (
    <motion.div
      className={cn(className, "overflow-hidden")}
      variants={{
        open: {
          height: "auto",
          paddingTop: 16,
          paddingBottom: 16,
          opacity: 1,
        },
        closed: {
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          opacity: 0,
        },
      }}
      initial="closed"
      animate={open ? "open" : "closed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
