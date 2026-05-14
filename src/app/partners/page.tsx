"use client";
import { useState } from "react";
import { Building2 } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { partners, partnerCategories, type PartnerCategory } from "@/data/partners";

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | PartnerCategory>("all");

  const filteredPartners =
    activeCategory === "all" ? partners : partners.filter((p) => p.category === activeCategory);

  return (
    <main>
      <PageHero title="협력기관" breadcrumb="협력기관" />

      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="PARTNERS"
            title="협력기관"
            description="넥스벤처디지털과 함께하는 학술·공공·비즈니스 분야의 협력기관입니다."
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === "all"
                  ? "bg-navy text-white shadow-md"
                  : "bg-slate-100 text-gray-600 hover:bg-slate-200"
              }`}
            >
              전체
            </button>
            {partnerCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-navy text-white shadow-md"
                    : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Partner Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, index) => (
              <ScrollReveal key={partner.name} direction="up" delay={(index % 3) * 0.08}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-navy/40" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm leading-tight mb-1">{partner.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{partner.role}</p>
                      <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                        {partnerCategories.find((c) => c.id === partner.category)?.label}
                      </span>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
