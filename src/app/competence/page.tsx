"use client";
import { BarChart3, Award, Monitor, Database, BookOpen, Users, Handshake, Search, Cpu, Cog, Server, Wrench } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";

const competenceSections = [
  {
    id: "ai-data",
    subtitle: "COMPETENCE 01",
    title: "AI·데이터 융합 및 ESG 전문역량",
    description: "AI 기술과 데이터 분석, ESG 경영을 결합한 통합 솔루션으로 기업의 지속 가능한 성장을 지원합니다.",
    bg: "bg-white",
    cards: [
      {
        icon: BarChart3,
        title: "데이터 분석 역량",
        description: "빅데이터 분석과 머신러닝 기반의 인사이트 도출로 데이터 기반 의사결정을 지원합니다.",
      },
      {
        icon: Award,
        title: "ESG 인증 전문성",
        description: "ESG 경영 지표 디지털화 및 자동평가 서비스로 체계적인 ESG 공시 대응을 지원합니다.",
      },
      {
        icon: Monitor,
        title: "AI 솔루션 개발",
        description: "기업 맞춤형 AI 솔루션 개발로 업무 자동화 및 생산성 향상을 실현합니다.",
      },
      {
        icon: Database,
        title: "데이터 인프라 구축",
        description: "안정적이고 확장 가능한 데이터 인프라 설계 및 구축으로 디지털 전환을 지원합니다.",
      },
    ],
  },
  {
    id: "network",
    subtitle: "COMPETENCE 02",
    title: "산학연 전문가 네트워크",
    description: "학계, 공공기관, 기업을 연결하는 강력한 전문가 네트워크를 통해 혁신적 솔루션을 개발합니다.",
    bg: "bg-slate-50",
    cards: [
      {
        icon: BookOpen,
        title: "학술 연구 협력",
        description: "국내외 유수 대학 및 연구기관과의 협력을 통해 최신 기술 연구 성과를 비즈니스에 적용합니다.",
      },
      {
        icon: Users,
        title: "전문가 자문단",
        description: "AI, ESG, 블록체인, 법률, 재무 등 각 분야 전문가로 구성된 자문단이 최적의 솔루션을 제시합니다.",
      },
      {
        icon: Handshake,
        title: "산업계 파트너십",
        description: "다양한 산업 분야의 기업들과의 전략적 파트너십으로 실질적인 비즈니스 가치를 창출합니다.",
      },
      {
        icon: Search,
        title: "R&D 역량",
        description: "지속적인 연구개발 투자로 혁신적인 기술 솔루션을 개발하고 특허를 통해 지식재산권을 보호합니다.",
      },
    ],
  },
  {
    id: "physical-ai",
    subtitle: "COMPETENCE 03",
    title: "피지컬 AI 및 데이터센터 전문성",
    description: "물리적 환경과 AI 기술을 결합한 피지컬 AI와 고성능 데이터센터 인프라 구축 전문성을 보유합니다.",
    bg: "bg-white",
    cards: [
      {
        icon: Cpu,
        title: "피지컬 AI 기술",
        description: "로봇, 센서, 영상 분석 등 물리적 환경과 AI를 결합한 피지컬 AI 응용 기술을 개발합니다.",
      },
      {
        icon: Cog,
        title: "시스템 통합",
        description: "다양한 하드웨어 및 소프트웨어 시스템을 통합하여 최적화된 운영 환경을 구현합니다.",
      },
      {
        icon: Server,
        title: "데이터센터 구축",
        description: "AI 및 빅데이터 처리에 최적화된 데이터센터를 설계하고 에너지 효율적인 인프라를 구축합니다.",
      },
      {
        icon: Wrench,
        title: "운영 및 유지보수",
        description: "구축된 시스템의 안정적 운영을 위한 24/7 모니터링 및 전문 유지보수 서비스를 제공합니다.",
      },
    ],
  },
];

export default function CompetencePage() {
  return (
    <main>
      <PageHero title="핵심경쟁력" breadcrumb="핵심경쟁력" />

      {competenceSections.map((section, sIdx) => (
        <section key={section.id} className={`py-20 ${section.bg}`}>
          <div className="max-w-container mx-auto px-6">
            <ScrollReveal direction="up">
              <SectionTitle
                subtitle={section.subtitle}
                title={section.title}
                description={section.description}
              />
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {section.cards.map((card, cIdx) => {
                const Icon = card.icon;
                return (
                  <ScrollReveal key={card.title} direction="up" delay={cIdx * 0.1}>
                    <Card className="h-full text-center">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="text-base font-bold text-navy mb-2">{card.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                    </Card>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
