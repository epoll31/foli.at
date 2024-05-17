"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";

const AccordionContext = createContext({
  open: false,
  toggle: () => {},
});
export function Accordion({
  children,
  open: forceOpen = false,
  className,
  onOpenChange,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(forceOpen);
  const toggle = () => {
    const newOpen = !open;
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    setOpen(forceOpen);
  }, [forceOpen]);

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
          opacity: 1,
        },
        closed: {
          height: 0,
          opacity: 0,
        },
      }}
      initial="closed"
      animate={open ? "open" : "closed"}
      transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
    >
      {children}
    </motion.div>
  );
}
