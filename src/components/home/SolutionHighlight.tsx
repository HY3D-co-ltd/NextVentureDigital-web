"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Bot, BarChart3 } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import { solutionHighlights } from "@/data/solutions";

const iconMap = {
  Sparkles,
  Bot,
  BarChart3,
} as const;

type IconName = keyof typeof iconMap;

export default function SolutionHighlight() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = solutionHighlights[activeIndex];
  const Icon = iconMap[active.icon as IconName] ?? Sparkles;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-container mx-auto px-6">
        <ScrollReveal>
          <SectionTitle subtitle="Solutions" title="핵심 솔루션" />
        </ScrollReveal>

        {/* Tab buttons */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {solutionHighlights.map((sol, i) => (
              <button
                key={sol.id}
                onClick={() => setActiveIndex(i)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeIndex === i
                    ? "bg-navy text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {sol.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-3xl mx-auto bg-slate-50 rounded-2xl p-8 md:p-10 border border-gray-100"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                <Icon size={28} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-navy mb-1">{active.name}</h3>
                <p className="text-accent font-medium text-sm mb-4">{active.summary}</p>
                <p className="text-gray-600 text-base mb-6 leading-relaxed">{active.description}</p>
                <ul className="space-y-2">
                  {active.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-1 w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent block" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
