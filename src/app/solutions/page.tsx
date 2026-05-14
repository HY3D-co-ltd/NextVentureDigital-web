"use client";
import Image from "next/image";
import { Sparkles, Bot, BarChart3, Coins, Cloud, Thermometer, Eye, Car } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { solutions } from "@/data/solutions";

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Bot,
  BarChart3,
  Coins,
  Cloud,
  Thermometer,
  Eye,
  Car,
};

const gradientMap: Record<string, string> = {
  "tigris-ai": "from-navy via-navy-light to-accent/60",
  "nexai-agent": "from-navy-light via-navy to-accent/50",
  "nexesg": "from-accent/70 via-accent to-navy-light",
  "nexrwa": "from-navy to-navy-light via-accent/40",
  "nicloud": "from-navy-light to-navy via-accent/30",
};

export default function SolutionsPage() {
  return (
    <main>
      <PageHero title="보유기술·솔루션" breadcrumb="보유기술·솔루션" />

      {/* Solutions with real images (보유기술) */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="PROPRIETARY TECHNOLOGY"
            title="보유기술"
            description="실제 현장에 적용되는 검증된 AI 기술 솔루션입니다."
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {solutions
              .filter((s) => s.image !== null)
              .map((solution, index) => {
                const Icon = iconMap[solution.icon];
                return (
                  <ScrollReveal key={solution.id} direction="up" delay={index * 0.1}>
                    <Card className="h-full overflow-hidden !p-0">
                      <div className="relative w-full h-56 overflow-hidden">
                        <Image
                          src={solution.image as string}
                          alt={solution.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                            {Icon && <Icon className="w-5 h-5 text-accent" />}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-navy">{solution.name}</h3>
                            <p className="text-accent text-sm font-medium">{solution.summary}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{solution.description}</p>
                        <ul className="space-y-1.5">
                          {solution.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })}
          </div>
        </div>
      </section>

      {/* Solutions without real images (보유솔루션) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="PROPRIETARY SOLUTIONS"
            title="보유솔루션"
            description="기업 디지털 전환을 위한 AI·ESG·블록체인 통합 솔루션입니다."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {solutions
              .filter((s) => s.image === null)
              .map((solution, index) => {
                const Icon = iconMap[solution.icon];
                const gradient = gradientMap[solution.id] || "from-navy to-navy-light";
                return (
                  <ScrollReveal key={solution.id} direction="up" delay={index * 0.1}>
                    <Card className="h-full overflow-hidden !p-0">
                      <div className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        {Icon && <Icon className="w-16 h-16 text-white/40" strokeWidth={1} />}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-navy mb-1">{solution.name}</h3>
                        <p className="text-accent text-sm font-medium mb-3">{solution.summary}</p>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{solution.description}</p>
                        <ul className="space-y-1.5">
                          {solution.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  </ScrollReveal>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
}
