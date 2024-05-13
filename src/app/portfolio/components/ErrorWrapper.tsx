import { AnimatePresence, motion } from "framer-motion";

export default function ErrorWrapper({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            className="text-center text-red-400 text-sm"
            variants={{
              hidden: { opacity: 0, height: 0 },
              visible: { opacity: 1, height: "auto" },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
