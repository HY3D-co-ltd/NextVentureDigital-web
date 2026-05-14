"use client";

import Link from "next/link";
import { Brain, Leaf, Link as LinkIcon, Briefcase } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import { businesses } from "@/data/business";

const iconMap = {
  Brain,
  Leaf,
  Link: LinkIcon,
  Briefcase,
} as const;

type IconName = keyof typeof iconMap;

export default function BusinessPreview() {
  return (
    <section className="bg-slate-50 py-20 md:py-24">
      <div className="max-w-container mx-auto px-6">
        <ScrollReveal>
          <SectionTitle subtitle="Business Areas" title="4대 핵심 사업영역" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((biz, i) => {
            const Icon = iconMap[biz.icon as IconName] ?? Brain;
            return (
              <ScrollReveal key={biz.id} delay={i * 0.1}>
                <Card className="h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-3">{biz.title}</h3>
                  <ul className="flex-1 space-y-1 mb-5">
                    {biz.points.slice(0, 3).map((point) => (
                      <li key={point} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-accent mt-0.5">·</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/business"
                    className="text-sm font-semibold text-accent hover:text-accent-600 transition-colors"
                  >
                    자세히 보기 →
                  </Link>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
