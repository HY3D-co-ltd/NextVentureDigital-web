"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { navLinks } from "@/data/company";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[60] bg-white flex flex-col"
        >
          {/* Close button */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
            <span className="font-bold text-navy text-lg">메뉴</span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-navy hover:bg-gray-100 transition-colors"
              aria-label="메뉴 닫기"
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-6">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="w-full max-w-xs"
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`block w-full text-center py-3 px-6 rounded-xl text-lg font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "bg-accent text-white"
                      : "text-navy hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.05 + 0.05, duration: 0.2 }}
              className="w-full max-w-xs mt-4"
            >
              <Button
                href="/contact"
                color="accent"
                size="lg"
                className="w-full"
                onClick={onClose}
              >
                문의하기
              </Button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
