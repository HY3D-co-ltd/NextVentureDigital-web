"use client";
import Image from "next/image";
import { Calendar, User, MapPin, Hash, Building2, Lightbulb, Shield, Network } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { company } from "@/data/company";

const infoItems = [
  { icon: Calendar, label: "설립일", value: company.established },
  { icon: User, label: "대표이사", value: company.ceo },
  { icon: MapPin, label: "소재지", value: company.address },
  { icon: Hash, label: "사업자등록번호", value: company.businessNumber },
  { icon: Building2, label: "핵심사업", value: "AI · ESG · 블록체인 · 전문 컨설팅" },
];

const coreValueIcons: Record<string, React.ElementType> = {
  Lightbulb,
  Shield,
  Network,
};

export default function AboutPage() {
  return (
    <main>
      <PageHero title="회사소개" breadcrumb="회사소개" />

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="ABOUT NVD"
            title="회사 개요"
            description="AI와 데이터로 기업의 미래를 설계하는 혁신 기업 넥스벤처디지털(주)입니다."
          />
          <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
            <ScrollReveal direction="left">
              <div className="space-y-4">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-gray-100"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-0.5">{item.label}</p>
                        <p className="text-navy font-semibold text-sm leading-relaxed">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/NextVentureDigital-web/images/office-building.png"
                  alt="넥스벤처디지털 사무실"
                  width={600}
                  height={400}
                  unoptimized
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle subtitle="VISION & MISSION" title="비전 및 미션" />
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <ScrollReveal direction="left">
              <div className="h-full">
                <h3 className="text-xl font-bold text-navy mb-6">비전</h3>
                <blockquote className="border-l-4 border-accent pl-6 py-4 bg-white rounded-r-xl shadow-sm">
                  <p className="text-2xl font-bold text-navy leading-relaxed">
                    {company.vision}
                  </p>
                  <footer className="mt-4 text-accent font-semibold text-sm">— {company.name}</footer>
                </blockquote>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div>
                <h3 className="text-xl font-bold text-navy mb-6">미션</h3>
                <ul className="space-y-3">
                  {company.mission.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle subtitle="CORE VALUES" title="핵심가치" description="넥스벤처디지털이 추구하는 세 가지 핵심가치입니다." />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {company.coreValues.map((value, index) => {
              const Icon = coreValueIcons[value.icon];
              return (
                <ScrollReveal key={value.title} direction="up" delay={index * 0.15}>
                  <Card className="h-full">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      {Icon && <Icon className="w-7 h-7 text-accent" />}
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">{value.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{value.description}</p>
                    <ul className="space-y-2">
                      {value.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
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
