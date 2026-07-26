import { ReactNode } from "react";
import { motion } from "framer-motion";

interface OnboardingLayoutProps {
  children: ReactNode;
}

export default function OnboardingLayout({
  children,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-5xl rounded-3xl border border-violet-100 bg-white p-10 shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}