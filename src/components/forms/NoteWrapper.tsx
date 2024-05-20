import { AnimatePresence, motion } from "framer-motion";

export default function NoteWrapper({
  note,
  children,
}: {
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {children}
      <AnimatePresence>
        {note && (
          <motion.p
            className="text-center text-theme-text-primary text-sm"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: "auto" },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {note}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
