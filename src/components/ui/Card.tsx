"use client";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl border border-gray-100 p-6 shadow-sm ${className}`}
      whileHover={hover ? { scale: 1.02, boxShadow: "0 10px 40px rgba(15, 27, 61, 0.1)", borderColor: "#10B981" } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
