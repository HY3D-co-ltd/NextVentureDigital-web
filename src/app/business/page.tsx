"use client";
import { Brain, Leaf, Link, Briefcase } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { businesses } from "@/data/business";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Leaf,
  Link,
  Briefcase,
};

const gradients = [
  "from-navy to-navy-light",
  "from-accent/80 to-accent",
  "from-navy-light to-navy",
  "from-accent to-accent/80",
];

export default function BusinessPage() {
  return (
    <main>
      <PageHero title="사업영역" breadcrumb="사업영역" />

      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="BUSINESS AREAS"
            title="4대 사업영역"
            description="AI·ESG·블록체인·컨설팅의 융합으로 기업 혁신을 이끕니다."
          />

          <div className="space-y-24 mt-16">
            {businesses.map((biz, index) => {
              const Icon = iconMap[biz.icon];
              const isEven = index % 2 === 1;
              const gradient = gradients[index % gradients.length];

              const textContent = (
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      {Icon && <Icon className="w-6 h-6 text-accent" />}
                    </div>
                    <span className="text-accent font-semibold text-sm tracking-wider uppercase">
                      0{index + 1}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-navy mb-4">{biz.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{biz.description}</p>
                  <ul className="space-y-3">
                    {biz.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-3 text-gray-700">
                        <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );

              const visualContent = (
                <div className={`rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center min-h-64 shadow-xl`}>
                  {Icon && <Icon className="w-28 h-28 text-white/30" strokeWidth={1} />}
                </div>
              );

              return (
                <ScrollReveal key={biz.id} direction={isEven ? "right" : "left"} delay={0.1}>
                  <div className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? "md:[direction:rtl]" : ""}`}>
                    <div className={isEven ? "md:[direction:ltr]" : ""}>{visualContent}</div>
                    <div className={isEven ? "md:[direction:ltr]" : ""}>{textContent}</div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
