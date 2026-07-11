"use client";

import { motion } from "framer-motion";

/**
 * Soft page transition on route change — opacity-only (no transform) so it can't
 * create a containing block that affects the fixed header or trap clicks, and
 * stays cheap. Reduced-motion is handled by the global media query.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
