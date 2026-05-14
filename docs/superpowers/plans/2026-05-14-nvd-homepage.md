# NVD 회사 홈페이지 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 넥스벤처디지털(주)의 7페이지 회사 홈페이지를 Next.js 14 정적 사이트로 구축하고 GitHub Pages에 배포한다.

**Architecture:** Next.js 14 App Router를 `output: 'export'` 모드로 사용하여 정적 HTML을 생성한다. 모든 데이터는 `src/data/` 내 TypeScript 파일에 하드코딩하여 별도 CMS 없이 운영한다. Framer Motion으로 스크롤 트리거 애니메이션을 적용하고, Tailwind CSS로 반응형 디자인을 구현한다.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS 3, Framer Motion, Lucide React, Pretendard/Inter fonts

---

## File Structure

```
d:/Dev/NextVentureDigital-web/
├── .github/workflows/
│   └── deploy.yml                    # GitHub Pages 자동 배포
├── public/
│   └── images/
│       └── placeholder-office.svg    # 사무실 이미지 placeholder
├── src/
│   ├── app/
│   │   ├── layout.tsx                # 루트 레이아웃: 폰트, Header, Footer
│   │   ├── page.tsx                  # 메인 페이지: 6개 섹션 조합
│   │   ├── about/page.tsx            # 회사소개
│   │   ├── business/page.tsx         # 사업영역
│   │   ├── solutions/page.tsx        # 보유기술·솔루션
│   │   ├── competence/page.tsx       # 핵심경쟁력
│   │   ├── partners/page.tsx         # 협력기관
│   │   └── contact/page.tsx          # 문의
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx            # 고정 헤더 + 네비게이션
│   │   │   ├── Footer.tsx            # 네이비 배경 푸터
│   │   │   └── MobileMenu.tsx        # 모바일 풀스크린 메뉴
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # 히어로: 카피 + SVG 애니메이션
│   │   │   ├── StatsSection.tsx      # 4개 KPI 카운트업
│   │   │   ├── BusinessPreview.tsx   # 4대 사업 카드 그리드
│   │   │   ├── SolutionHighlight.tsx # 솔루션 탭 UI
│   │   │   ├── PartnerMarquee.tsx    # 협력기관 무한 스크롤
│   │   │   └── CTASection.tsx        # 네이비 배경 CTA
│   │   ├── ui/
│   │   │   ├── SectionTitle.tsx      # 섹션 제목 컴포넌트
│   │   │   ├── Card.tsx              # 범용 카드 컴포넌트
│   │   │   ├── Button.tsx            # 버튼 컴포넌트 (solid/outline)
│   │   │   └── AnimatedCounter.tsx   # 숫자 카운트업 애니메이션
│   │   └── common/
│   │       ├── PageHero.tsx          # 서브 페이지 히어로 배너
│   │       └── ScrollReveal.tsx      # 스크롤 트리거 fade-up 래퍼
│   ├── data/
│   │   ├── company.ts                # 회사 기본 정보
│   │   ├── business.ts               # 4대 사업영역 데이터
│   │   ├── solutions.ts              # 7개 솔루션 데이터
│   │   └── partners.ts               # 협력기관 데이터
│   └── styles/
│       └── globals.css               # Tailwind directives + 마퀴 애니메이션
├── next.config.js                    # 정적 빌드 설정
├── tailwind.config.ts                # 커스텀 컬러/폰트 설정
├── tsconfig.json                     # TypeScript 설정
└── package.json
```

---

## Task 1: 프로젝트 초기화 및 의존성 설치

**Files:**
- Create: `package.json`, `next.config.js`, `tailwind.config.ts`, `tsconfig.json`, `src/styles/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Next.js 프로젝트 생성**

```bash
cd d:/Dev/NextVentureDigital-web
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Expected: 프로젝트 파일들이 생성되고 의존성이 설치됨

- [ ] **Step 2: 추가 의존성 설치**

```bash
cd d:/Dev/NextVentureDigital-web
npm install framer-motion lucide-react
```

Expected: `framer-motion`, `lucide-react`가 `package.json`에 추가됨

- [ ] **Step 3: next.config.js 정적 빌드 설정**

`next.config.js` 전체 내용을 다음으로 교체:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

- [ ] **Step 4: tailwind.config.ts 커스텀 설정**

`tailwind.config.ts` 전체 내용을 다음으로 교체:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F1B3D",
          light: "#1E3A6E",
          50: "#E8EDF5",
          100: "#C5D0E6",
          200: "#9BAFD4",
          300: "#7190C2",
          400: "#4A71B0",
          500: "#1E3A6E",
          600: "#0F1B3D",
        },
        accent: {
          DEFAULT: "#10B981",
          light: "#34D399",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: globals.css 설정**

`src/styles/globals.css` 전체 내용을 다음으로 교체:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: "Pretendard", sans-serif;
    color: #0f172a;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

- [ ] **Step 6: 최소한의 layout.tsx와 page.tsx 작성**

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "넥스벤처디지털(주) | AI와 데이터로 기업의 미래를 설계합니다",
  description:
    "AI, ESG, 블록체인 기술을 융합한 혁신 플랫폼 기업 넥스벤처디지털",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-pretendard antialiased">{children}</body>
    </html>
  );
}
```

`src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-navy p-8">
        넥스벤처디지털(주)
      </h1>
      <p className="text-accent px-8">홈페이지 준비 중</p>
    </main>
  );
}
```

- [ ] **Step 7: 빌드 및 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: `out/` 디렉토리에 정적 파일이 생성됨. 에러 없음.

- [ ] **Step 8: 개발 서버 실행 테스트**

```bash
cd d:/Dev/NextVentureDigital-web
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 시 "넥스벤처디지털(주)" 텍스트가 네이비 색상으로, "홈페이지 준비 중"이 그린 색상으로 표시되어야 함.

- [ ] **Step 9: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git init
git add -A
git commit -m "chore: init Next.js 14 project with Tailwind, Framer Motion"
```

---

## Task 2: 데이터 레이어 구축

**Files:**
- Create: `src/data/company.ts`, `src/data/business.ts`, `src/data/solutions.ts`, `src/data/partners.ts`

- [ ] **Step 1: 회사 기본 정보 데이터**

`src/data/company.ts`:

```ts
export const company = {
  name: "넥스벤처디지털(주)",
  nameEn: "NextVentureDigital",
  nameShort: "NVD",
  ceo: "전인오",
  established: "2025년 12월 05일",
  businessNumber: "558-86-03801",
  address: "서울시 강남구 남부순환로 2738, 401-1호(도곡동, 상일빌딩)",
  tel: "02-2038-8338",
  fax: "02-521-6748",
  email: "nvd8858@gmail.com",
  tagline: "AI와 데이터로 기업의 미래를 설계합니다",
  subTagline: "AI · ESG · 블록체인 기술을 융합한 혁신 플랫폼 기업",
  vision: "글로벌 AI·디지털 혁신을 선도하는 기업 도약",
  mission: [
    "학술 연구와 산업 현장을 연결하는 가교 역할",
    "AI 기술과 데이터 분석을 통한 실질적 가치 제공",
    "기업의 디지털 전환을 지원하는 통합 솔루션 개발",
    "지속 가능한 성장을 위한 혁신적 비즈니스 모델 구축",
    "산학연 협력을 통한 새로운 시장 기회 창출",
  ],
  coreValues: [
    {
      title: "혁신",
      icon: "Lightbulb",
      description: "끊임없는 기술 및 비즈니스 모델 혁신",
      points: [
        "끊임없는 기술 혁신 추구",
        "비즈니스 모델의 지속적 개선",
        "시장 변화에 대한 능동적 대응",
        "차별화된 경쟁력 확보",
      ],
    },
    {
      title: "신뢰",
      icon: "Shield",
      description: "데이터 기반의 투명하고 윤리적인 경영",
      points: [
        "데이터 기반의 투명한 경영",
        "윤리적 의사결정 프로세스",
        "고객과의 신뢰 관계 구축",
        "책임감 있는 기업 운영",
      ],
    },
    {
      title: "연결",
      icon: "Network",
      description: "산학연을 잇는 강력한 협력 생태계 구축",
      points: [
        "산학연 협력 생태계 구축",
        "전문가 네트워크 활용",
        "파트너십을 통한 시너지 창출",
        "지속 가능한 협력 관계 유지",
      ],
    },
  ],
} as const;

export const stats = [
  { label: "사업영역", value: 4, suffix: "대", prefix: "" },
  { label: "AI 에이전트", value: 14, suffix: "종", prefix: "" },
  { label: "협력기관", value: 20, suffix: "+", prefix: "" },
  { label: "성장전략", value: 3, suffix: "개년", prefix: "" },
] as const;

export const navLinks = [
  { href: "/", label: "홈" },
  { href: "/about", label: "회사소개" },
  { href: "/business", label: "사업영역" },
  { href: "/solutions", label: "보유기술·솔루션" },
  { href: "/competence", label: "핵심경쟁력" },
  { href: "/partners", label: "협력기관" },
  { href: "/contact", label: "문의" },
] as const;
```

- [ ] **Step 2: 사업영역 데이터**

`src/data/business.ts`:

```ts
export const businesses = [
  {
    id: "ai",
    title: "AI 사업",
    icon: "Brain",
    description:
      "피지컬 AI 응용 기술 개발부터 AI 데이터센터 구축, 업무 자동화 솔루션, 반도체 AI 예측정비까지 AI 기반의 종합 솔루션을 제공합니다.",
    points: [
      "피지컬 AI 응용 기술 개발",
      "AI 데이터센터 구축 컨설팅",
      "AI 기반 업무 자동화 솔루션",
      "반도체 AI 예측정비 시스템",
    ],
  },
  {
    id: "esg",
    title: "ESG 사업",
    icon: "Leaf",
    description:
      "기업의 ESG 경영 지표를 디지털화하고, 자동평가 서비스와 체계적인 공시 대응을 지원하는 통합 ESG 관리 플랫폼을 구축합니다.",
    points: [
      "ESG 경영 지표 디지털화",
      "ESG 자동평가 서비스 개발",
      "체계적인 ESG 공시 대응 지원",
      "ESG 성과 관리 플랫폼 구축",
    ],
  },
  {
    id: "blockchain",
    title: "블록체인 사업",
    icon: "Link",
    description:
      "RWA(실물자산) 토큰화 서비스와 STO 인프라를 제공하며, 블록체인 기반 디지털 자산 관리 솔루션을 통해 새로운 투자 기회를 창출합니다.",
    points: [
      "RWA(실물자산) 토큰화 서비스",
      "STO(증권형 토큰) 인프라 제공",
      "블록체인 기반 자산 관리",
      "디지털 자산 발행 및 관리 지원",
    ],
  },
  {
    id: "consulting",
    title: "전문 컨설팅",
    icon: "Briefcase",
    description:
      "AX/DX 전환 전략 수립부터 기업 맞춤형 컨설팅, 법률·재무·노무 전문 자문, 산학연 협력 프로젝트까지 종합적인 컨설팅 서비스를 제공합니다.",
    points: [
      "AX/DX 전환 전략 수립",
      "기업 맞춤형 컨설팅 서비스",
      "법률, 재무, 노무 전문 자문",
      "산학연 협력 프로젝트 지원",
    ],
  },
] as const;
```

- [ ] **Step 3: 솔루션 데이터**

`src/data/solutions.ts`:

```ts
export const solutions = [
  {
    id: "tigris-ai",
    name: "티그리스 AI",
    icon: "Sparkles",
    summary: "지능형 업무 보조 AI 솔루션",
    description:
      "기업 맞춤형 자동화 기능을 제공하며, 실시간 데이터 분석 및 인사이트 도출로 업무 효율성을 극대화합니다.",
    features: [
      "기업 맞춤형 자동화 기능 제공",
      "실시간 데이터 분석 및 인사이트 도출",
      "업무 효율성 극대화 지원",
    ],
  },
  {
    id: "nexai-agent",
    name: "NexAI Agent 14",
    icon: "Bot",
    summary: "14가지 전문 AI 에이전트 통합 플랫폼",
    description:
      "다양한 업무 영역별 특화 에이전트를 통해 자동화된 업무 프로세스를 관리하고 기업 생산성을 향상시킵니다.",
    features: [
      "14가지 업무 영역별 특화 에이전트",
      "자동화된 업무 프로세스 관리",
      "기업 생산성 향상 솔루션",
    ],
  },
  {
    id: "nexesg",
    name: "NexESG Platform",
    icon: "BarChart3",
    summary: "체계적인 ESG 지표 관리 플랫폼",
    description:
      "ESG 성과를 자동 평가·분석하고 공시 대응 및 리포팅을 자동화하여 투명한 ESG 경영을 지원합니다.",
    features: [
      "ESG 성과 자동 평가 및 분석",
      "공시 대응 및 리포팅 자동화",
      "투명한 ESG 경영 지원",
    ],
  },
  {
    id: "nexrwa",
    name: "NexRWA Hub",
    icon: "Coins",
    summary: "실물자산 기반 토큰 증권 발행 플랫폼",
    description:
      "STO 인프라 제공 및 관리 서비스와 블록체인 기반 자산 토큰화 솔루션으로 새로운 자금 조달 기회를 창출합니다.",
    features: [
      "STO 인프라 제공 및 관리",
      "블록체인 기반 자산 토큰화",
      "새로운 자금 조달 및 투자 기회 창출",
    ],
  },
  {
    id: "nicloud",
    name: "NiCloud",
    icon: "Cloud",
    summary: "AI 데이터센터 구축 및 인프라 솔루션",
    description:
      "AI 및 빅데이터 처리 최적화 인프라를 설계·구축하고 에너지 효율적인 고성능 컴퓨팅 환경을 제공합니다.",
    features: [
      "AI·빅데이터 처리 최적화 인프라",
      "데이터센터 설계 및 구축 컨설팅",
      "에너지 효율적인 인프라 솔루션",
    ],
  },
  {
    id: "blackice",
    name: "블랙아이스 검출 시스템",
    icon: "Thermometer",
    summary: "도로 결빙 감지 및 경보 시스템",
    description:
      "듀얼열화상카메라로 노면 온도 데이터를 수집·분석하여 도로 결빙을 판단하고 실시간 경보를 제공합니다.",
    features: [
      "듀얼열화상카메라 노면 온도 분석",
      "결빙 판단 및 실시간 경보",
      "전광판·VMS 연동 경고 시스템",
    ],
  },
  {
    id: "jiseong-eye",
    name: "지성EYE",
    icon: "Eye",
    summary: "AI 영상분석 소프트웨어",
    description:
      "CCTV를 통해 움직임을 자동으로 감지하고 위험 징후를 알려주는 인파 감지 시스템입니다.",
    features: [
      "이상동기 범죄 예방 (노호모그래픽)",
      "군중난류 위험 감지 및 알람",
      "실시간 9채널 움직임 파악",
    ],
  },
] as const;

export const solutionHighlights = solutions.slice(0, 3);
```

- [ ] **Step 4: 협력기관 데이터**

`src/data/partners.ts`:

```ts
export type PartnerCategory = "academic" | "public" | "business";

export interface Partner {
  name: string;
  role: string;
  category: PartnerCategory;
}

export const partnerCategories = [
  { id: "academic" as const, label: "학술·연구" },
  { id: "public" as const, label: "공공·인증" },
  { id: "business" as const, label: "비즈니스·법률" },
] as const;

export const partners: Partner[] = [
  {
    name: "(사)한국벤처혁신학회",
    role: "벤처혁신정책 수립 및 학술 네트워크 구축",
    category: "academic",
  },
  {
    name: "벤처혁신연구소",
    role: "학술 연구 수행 및 기술 개발 협력",
    category: "academic",
  },
  {
    name: "화성민간연구개발협의회",
    role: "민간기업 활성화 및 지역 산업 발전 기여",
    category: "academic",
  },
  {
    name: "천안과학산업진흥원",
    role: "산업진흥 사업 협력 및 공공 인프라 구축",
    category: "public",
  },
  {
    name: "한국ESG경영인증원",
    role: "ESG 경영 인증 및 평가 시스템 개발",
    category: "public",
  },
  {
    name: "중소벤처기업인증원",
    role: "중소벤처기업 인증 및 성장 지원",
    category: "public",
  },
  {
    name: "(주)지성이엔지",
    role: "우수 조달 제품 및 영상 분석 솔루션",
    category: "business",
  },
  {
    name: "세종경영원(주)",
    role: "기업 경영 연구 및 컨설팅",
    category: "business",
  },
  {
    name: "법무법인 정진 / 염앤장 법무사",
    role: "법률 자문 및 기업 법무 지원",
    category: "business",
  },
  {
    name: "(주)인라스",
    role: "IT 컨설팅 및 디지털 전환 지원",
    category: "business",
  },
  {
    name: "(주)타이거컴퍼니",
    role: "클라우드 서비스 및 데이터센터 솔루션",
    category: "business",
  },
  {
    name: "특허법인 리더스",
    role: "특허 출원·등록 및 지식재산권 보호",
    category: "business",
  },
];
```

- [ ] **Step 5: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: 에러 없이 빌드 성공 (데이터 파일은 아직 import 안 됨, 타입 에러 없어야 함)

- [ ] **Step 6: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/data/
git commit -m "feat: add data layer with company, business, solutions, partners"
```

---

## Task 3: UI 기초 컴포넌트 (Button, SectionTitle, Card, ScrollReveal, PageHero)

**Files:**
- Create: `src/components/ui/Button.tsx`, `src/components/ui/SectionTitle.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/AnimatedCounter.tsx`, `src/components/common/ScrollReveal.tsx`, `src/components/common/PageHero.tsx`

- [ ] **Step 1: Button 컴포넌트**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/components/ui"
```

`src/components/ui/Button.tsx`:

```tsx
import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "solid" | "outline" | "ghost";
  color?: "navy" | "accent";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants = {
  solid: {
    navy: "bg-navy text-white hover:bg-navy-light",
    accent: "bg-accent text-white hover:bg-accent-600",
  },
  outline: {
    navy: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
    accent:
      "border-2 border-accent text-accent hover:bg-accent hover:text-white",
  },
  ghost: {
    navy: "text-navy hover:bg-navy-50",
    accent: "text-accent hover:bg-accent-50",
  },
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  href,
  variant = "solid",
  color = "navy",
  size = "md",
  children,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300";
  const classes = `${baseClasses} ${variants[variant][color]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: SectionTitle 컴포넌트**

`src/components/ui/SectionTitle.tsx`:

```tsx
interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
}: SectionTitleProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`${alignment} mb-12`}>
      {subtitle && (
        <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
          {subtitle}
        </span>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""} ${light ? "text-gray-300" : "text-gray-600"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Card 컴포넌트**

`src/components/ui/Card.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl border border-gray-100 p-6 shadow-sm ${className}`}
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow: "0 10px 40px rgba(15, 27, 61, 0.1)",
              borderColor: "#10B981",
            }
          : undefined
      }
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: AnimatedCounter 컴포넌트**

`src/components/ui/AnimatedCounter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 5: ScrollReveal 컴포넌트**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/components/common"
```

`src/components/common/ScrollReveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 30 : 0,
    x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: PageHero 컴포넌트**

`src/components/common/PageHero.tsx`:

```tsx
interface PageHeroProps {
  title: string;
  breadcrumb: string;
}

export default function PageHero({ title, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-navy text-white py-20 md:py-24">
      <div className="max-w-container mx-auto px-6">
        <p className="text-accent text-sm font-medium mb-2">
          홈 &gt; {breadcrumb}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: 에러 없이 빌드 성공

- [ ] **Step 8: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/components/
git commit -m "feat: add UI base components (Button, Card, SectionTitle, ScrollReveal, PageHero, AnimatedCounter)"
```

---

## Task 4: Header + Footer + MobileMenu 레이아웃

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/MobileMenu.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Header 컴포넌트**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/components/layout"
```

`src/components/layout/Header.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/company";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-bold text-navy">
              NVD
            </span>
            <span className="hidden sm:inline text-sm text-gray-500">
              넥스벤처디지털
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-accent"
                    : "text-gray-700 hover:text-navy hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="solid" color="accent" size="sm" className="ml-2">
              문의하기
            </Button>
          </nav>

          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="메뉴 열기"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
```

- [ ] **Step 2: MobileMenu 컴포넌트**

`src/components/layout/MobileMenu.tsx`:

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/data/company";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-white lg:hidden"
        >
          <nav className="flex flex-col items-center justify-center h-full gap-6 pt-20">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`text-xl font-medium transition-colors ${
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-accent"
                    : "text-navy"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="/contact"
              variant="solid"
              color="accent"
              size="lg"
              className="mt-4"
            >
              문의하기
            </Button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Footer 컴포넌트**

`src/components/layout/Footer.tsx`:

```tsx
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { company, navLinks } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4">
              {company.nameShort}
              <span className="text-accent">.</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">{company.tagline}</p>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {company.address}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                {company.tel}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                {company.email}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">사이트맵</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">문의</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Tel: {company.tel}</li>
              <li>FAX: {company.fax}</li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {company.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: layout.tsx에 Header/Footer 통합**

`src/app/layout.tsx` 전체를 다음으로 교체:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "넥스벤처디지털(주) | AI와 데이터로 기업의 미래를 설계합니다",
  description:
    "AI, ESG, 블록체인 기술을 융합한 혁신 플랫폼 기업 넥스벤처디지털",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="font-pretendard antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: 빌드 및 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: 에러 없이 빌드. 개발 서버에서 Header(sticky, 로고, 네비), Footer(네이비 배경) 확인.

- [ ] **Step 6: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/components/layout/ src/app/layout.tsx
git commit -m "feat: add Header, Footer, MobileMenu layout components"
```

---

## Task 5: 메인 페이지 — 히어로 + 수치 섹션

**Files:**
- Create: `src/components/home/HeroSection.tsx`, `src/components/home/StatsSection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: HeroSection 컴포넌트**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/components/home"
```

`src/components/home/HeroSection.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #10B981 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #0F1B3D 0%, transparent 70%)",
          }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent/20"
            style={{
              top: `${20 + i * 12}%`,
              right: `${10 + i * 8}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-container mx-auto px-6 py-32 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block text-accent font-semibold text-sm tracking-wider uppercase mb-4"
          >
            AI · ESG · Blockchain
          </motion.span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6">
            {company.tagline}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            {company.subTagline}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/business" variant="solid" color="navy" size="lg">
              사업영역 보기
            </Button>
            <Button
              href="/contact"
              variant="outline"
              color="accent"
              size="lg"
            >
              문의하기
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={28} className="text-gray-400" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: StatsSection 컴포넌트**

`src/components/home/StatsSection.tsx`:

```tsx
"use client";

import ScrollReveal from "@/components/common/ScrollReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { stats } from "@/data/company";

export default function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-navy mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: page.tsx에 통합**

`src/app/page.tsx` 전체를 다음으로 교체:

```tsx
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
    </>
  );
}
```

- [ ] **Step 4: 빌드 및 시각 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: 빌드 성공. 개발 서버에서 히어로(풀스크린, 카피, CTA, 플로팅 도트), 수치 섹션(카운트업) 확인.

- [ ] **Step 5: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/components/home/HeroSection.tsx src/components/home/StatsSection.tsx src/app/page.tsx
git commit -m "feat: add Hero and Stats sections to main page"
```

---

## Task 6: 메인 페이지 — 사업영역 프리뷰 + 솔루션 하이라이트

**Files:**
- Create: `src/components/home/BusinessPreview.tsx`, `src/components/home/SolutionHighlight.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: BusinessPreview 컴포넌트**

`src/components/home/BusinessPreview.tsx`:

```tsx
"use client";

import Link from "next/link";
import { Brain, Leaf, Link as LinkIcon, Briefcase } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import { businesses } from "@/data/business";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={32} className="text-accent" />,
  Leaf: <Leaf size={32} className="text-accent" />,
  Link: <LinkIcon size={32} className="text-accent" />,
  Briefcase: <Briefcase size={32} className="text-accent" />,
};

export default function BusinessPreview() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-container mx-auto px-6">
        <SectionTitle
          subtitle="Business Areas"
          title="4대 핵심 사업영역"
          description="AI, ESG, 블록체인 기술을 융합한 종합 혁신 플랫폼"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {businesses.map((biz, index) => (
            <ScrollReveal key={biz.id} delay={index * 0.1}>
              <Card className="h-full">
                <div className="mb-4">{iconMap[biz.icon]}</div>
                <h3 className="text-lg font-bold text-navy mb-2">
                  {biz.title}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  {biz.points.slice(0, 3).map((point) => (
                    <li key={point} className="flex items-start gap-1.5">
                      <span className="text-accent mt-1.5 text-[8px]">●</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/business"
                  className="text-accent text-sm font-medium hover:underline"
                >
                  자세히 보기 →
                </Link>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: SolutionHighlight 컴포넌트**

`src/components/home/SolutionHighlight.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bot, BarChart3 } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import ScrollReveal from "@/components/common/ScrollReveal";
import { solutionHighlights } from "@/data/solutions";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={28} />,
  Bot: <Bot size={28} />,
  BarChart3: <BarChart3 size={28} />,
};

export default function SolutionHighlight() {
  const [activeTab, setActiveTab] = useState(0);
  const active = solutionHighlights[activeTab];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-container mx-auto px-6">
        <SectionTitle
          subtitle="Solutions"
          title="핵심 솔루션"
          description="구독형 AI 플랫폼으로 기업의 디지털 혁신을 지원합니다"
        />
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {solutionHighlights.map((sol, index) => (
              <button
                key={sol.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === index
                    ? "bg-navy text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {iconMap[sol.icon]}
                {sol.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 rounded-2xl p-8 md:p-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  {iconMap[active.icon]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy">{active.name}</h3>
                  <p className="text-sm text-gray-500">{active.summary}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">{active.description}</p>
              <ul className="space-y-2">
                {active.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: page.tsx에 추가**

`src/app/page.tsx` 전체를 다음으로 교체:

```tsx
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import BusinessPreview from "@/components/home/BusinessPreview";
import SolutionHighlight from "@/components/home/SolutionHighlight";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <BusinessPreview />
      <SolutionHighlight />
    </>
  );
}
```

- [ ] **Step 4: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: 에러 없이 빌드 성공.

- [ ] **Step 5: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/components/home/BusinessPreview.tsx src/components/home/SolutionHighlight.tsx src/app/page.tsx
git commit -m "feat: add BusinessPreview and SolutionHighlight to main page"
```

---

## Task 7: 메인 페이지 — 파트너 마퀴 + CTA 섹션

**Files:**
- Create: `src/components/home/PartnerMarquee.tsx`, `src/components/home/CTASection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: PartnerMarquee 컴포넌트**

`src/components/home/PartnerMarquee.tsx`:

```tsx
import { partners } from "@/data/partners";

export default function PartnerMarquee() {
  const displayPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-container mx-auto px-6 mb-8">
        <p className="text-center text-sm text-gray-500 font-medium tracking-wider uppercase">
          Trusted Partners
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {displayPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="inline-flex items-center justify-center mx-8 px-6 py-3 bg-gray-50 rounded-lg text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors min-w-[200px]"
            >
              <span className="text-sm font-medium truncate">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: CTASection 컴포넌트**

`src/components/home/CTASection.tsx`:

```tsx
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="bg-navy py-20">
      <div className="max-w-container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          디지털 혁신, 지금 시작하세요
        </h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          AI, ESG, 블록체인 기술 융합으로 기업의 미래를 함께 설계합니다
        </p>
        <Button href="/contact" variant="solid" color="accent" size="lg">
          문의하기
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: page.tsx 최종 완성**

`src/app/page.tsx` 전체를 다음으로 교체:

```tsx
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import BusinessPreview from "@/components/home/BusinessPreview";
import SolutionHighlight from "@/components/home/SolutionHighlight";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <BusinessPreview />
      <SolutionHighlight />
      <PartnerMarquee />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 4: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: 에러 없이 빌드 성공.

- [ ] **Step 5: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/components/home/PartnerMarquee.tsx src/components/home/CTASection.tsx src/app/page.tsx
git commit -m "feat: complete main page with PartnerMarquee and CTA"
```

---

## Task 8: 회사소개 페이지 (/about)

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: about 페이지 작성**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/app/about"
```

`src/app/about/page.tsx`:

```tsx
"use client";

import {
  Lightbulb,
  Shield,
  Network,
  Building2,
  Calendar,
  User,
  MapPin,
  Hash,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { company } from "@/data/company";

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb size={28} className="text-accent" />,
  Shield: <Shield size={28} className="text-accent" />,
  Network: <Network size={28} className="text-accent" />,
};

const companyInfo = [
  { icon: <Calendar size={18} />, label: "설립일", value: company.established },
  { icon: <User size={18} />, label: "대표이사", value: company.ceo },
  { icon: <MapPin size={18} />, label: "소재지", value: company.address },
  {
    icon: <Hash size={18} />,
    label: "사업자등록번호",
    value: company.businessNumber,
  },
  {
    icon: <Building2 size={18} />,
    label: "핵심 사업",
    value: "AI, ESG, 블록체인, 전문 컨설팅",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="회사소개" breadcrumb="회사소개" />

      {/* 회사 개요 */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="Company Overview"
            title="넥스벤처디지털(주)"
            description="AI, ESG, 블록체인 기술을 융합한 혁신 플랫폼 기업"
          />
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                {companyInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-50"
                  >
                    <div className="text-accent mt-0.5">{info.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        {info.label}
                      </p>
                      <p className="text-sm text-navy font-medium">
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-navy/5 to-accent/5 rounded-2xl h-72 md:h-80 flex items-center justify-center">
                <div className="text-center">
                  <Building2 size={48} className="text-navy/20 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">사무실 이미지</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 비전/미션 */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <div>
                <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
                  Vision
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                  비전
                </h3>
                <blockquote className="text-xl md:text-2xl font-semibold text-navy border-l-4 border-accent pl-6 py-2">
                  {company.vision}
                </blockquote>
                <p className="text-gray-600 mt-4">
                  AI와 데이터 기반 혁신 기술로 글로벌 시장에 진출하고, 디지털
                  전환 시대의 선도적 플랫폼 기업으로 성장하여 지속 가능한
                  비즈니스 모델을 통해 기업 가치를 극대화합니다.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div>
                <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">
                  Mission
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                  미션
                </h3>
                <ul className="space-y-3">
                  {company.mission.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="Core Values"
            title="핵심 가치"
            description="혁신, 신뢰, 연결 — 넥스벤처디지털의 근본 가치"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {company.coreValues.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.2}>
                <Card className="text-center h-full" hover={false}>
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    {iconMap[value.icon]}
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {value.description}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    {value.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="text-accent mt-1.5 text-[8px]">
                          ●
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: `out/about/index.html` 생성됨. 에러 없음.

- [ ] **Step 3: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/app/about/
git commit -m "feat: add About page with company overview, vision, mission, core values"
```

---

## Task 9: 사업영역 페이지 (/business)

**Files:**
- Create: `src/app/business/page.tsx`

- [ ] **Step 1: business 페이지 작성**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/app/business"
```

`src/app/business/page.tsx`:

```tsx
"use client";

import { Brain, Leaf, Link as LinkIcon, Briefcase } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import { businesses } from "@/data/business";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain size={48} className="text-accent" />,
  Leaf: <Leaf size={48} className="text-accent" />,
  Link: <LinkIcon size={48} className="text-accent" />,
  Briefcase: <Briefcase size={48} className="text-accent" />,
};

export default function BusinessPage() {
  return (
    <>
      <PageHero title="사업영역" breadcrumb="사업영역" />

      <section className="py-20">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="Business Areas"
            title="4대 핵심 사업영역"
            description="AI, ESG, 블록체인, 컨설팅이 유기적으로 연결된 통합 플랫폼"
          />

          <div className="space-y-24">
            {businesses.map((biz, index) => {
              const isEven = index % 2 === 1;
              return (
                <ScrollReveal
                  key={biz.id}
                  direction={isEven ? "right" : "left"}
                >
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                      isEven ? "md:direction-rtl" : ""
                    }`}
                  >
                    <div className={isEven ? "md:order-2" : ""}>
                      <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                        {iconMap[biz.icon]}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                        {biz.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{biz.description}</p>
                      <ul className="space-y-3">
                        {biz.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-3 text-gray-700"
                          >
                            <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`bg-gradient-to-br from-navy/5 to-accent/5 rounded-2xl h-64 md:h-80 flex items-center justify-center ${
                        isEven ? "md:order-1" : ""
                      }`}
                    >
                      <div className="text-center">
                        {iconMap[biz.icon]}
                        <p className="text-gray-400 text-sm mt-3">
                          {biz.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: `out/business/index.html` 생성됨.

- [ ] **Step 3: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/app/business/
git commit -m "feat: add Business page with 4 business areas alternating layout"
```

---

## Task 10: 보유기술·솔루션 페이지 (/solutions)

**Files:**
- Create: `src/app/solutions/page.tsx`

- [ ] **Step 1: solutions 페이지 작성**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/app/solutions"
```

`src/app/solutions/page.tsx`:

```tsx
"use client";

import {
  Sparkles,
  Bot,
  BarChart3,
  Coins,
  Cloud,
  Thermometer,
  Eye,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { solutions } from "@/data/solutions";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={32} className="text-accent" />,
  Bot: <Bot size={32} className="text-accent" />,
  BarChart3: <BarChart3 size={32} className="text-accent" />,
  Coins: <Coins size={32} className="text-accent" />,
  Cloud: <Cloud size={32} className="text-accent" />,
  Thermometer: <Thermometer size={32} className="text-accent" />,
  Eye: <Eye size={32} className="text-accent" />,
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero title="보유기술·솔루션" breadcrumb="보유기술·솔루션" />

      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="Products & Solutions"
            title="보유기술 및 솔루션"
            description="AI 기반 혁신 플랫폼부터 안전 솔루션까지"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol, index) => (
              <ScrollReveal key={sol.id} delay={index * 0.1}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      {iconMap[sol.icon]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-navy mb-1">
                        {sol.name}
                      </h3>
                      <p className="text-sm text-accent font-medium mb-3">
                        {sol.summary}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        {sol.description}
                      </p>
                      <ul className="space-y-1.5">
                        {sol.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: `out/solutions/index.html` 생성됨.

- [ ] **Step 3: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/app/solutions/
git commit -m "feat: add Solutions page with 7 product cards"
```

---

## Task 11: 핵심경쟁력 페이지 (/competence)

**Files:**
- Create: `src/app/competence/page.tsx`

- [ ] **Step 1: competence 페이지 작성**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/app/competence"
```

`src/app/competence/page.tsx`:

```tsx
"use client";

import {
  Database,
  Award,
  Monitor,
  Users,
  BookOpen,
  Wrench,
  Cpu,
  Server,
  Cog,
  BarChart3,
  Handshake,
  Search,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";

const competencies = [
  {
    subtitle: "AI & ESG",
    title: "AI·데이터 융합 및 ESG 전문역량",
    description:
      "AI와 데이터 기술을 ESG 경영과 융합하여 독보적인 전문역량을 보유하고 있으며, 기업의 지속가능한 성장을 지원합니다.",
    items: [
      {
        icon: <BarChart3 size={24} />,
        title: "AI 기반 ESG 분석",
        desc: "AI 기반 ESG 지표 분석 기술과 데이터 중심 경영 지원",
      },
      {
        icon: <Award size={24} />,
        title: "한국ESG경영인증원 협력",
        desc: "ESG 전문 기관과의 인증 및 평가 시스템 공동 개발",
      },
      {
        icon: <Monitor size={24} />,
        title: "ESG 평가 플랫폼",
        desc: "독보적인 ESG 평가 플랫폼 및 AI 자동화 진단 시스템 구축",
      },
      {
        icon: <Database size={24} />,
        title: "실시간 모니터링",
        desc: "실시간 ESG 데이터 모니터링 및 기업 맞춤형 솔루션",
      },
    ],
  },
  {
    subtitle: "Network",
    title: "산학연 전문가 네트워크",
    description:
      "학술, 법률, 특허, 산업 전문가 그룹을 구축하여 다양한 분야의 전문성을 융합하고 강력한 협력 생태계를 형성합니다.",
    items: [
      {
        icon: <BookOpen size={24} />,
        title: "한국벤처혁신학회 연계",
        desc: "벤처혁신정책 수립 및 학술 연구 지원 협력",
      },
      {
        icon: <Users size={24} />,
        title: "전문가 그룹 구축",
        desc: "학술·법률·특허·산업 분야별 전문가 네트워크",
      },
      {
        icon: <Handshake size={24} />,
        title: "시너지 창출",
        desc: "파트너십을 통한 시너지 및 산학연 연결",
      },
      {
        icon: <Search size={24} />,
        title: "전문적 문제해결",
        desc: "복잡한 문제에 대한 신속하고 전문적인 대응",
      },
    ],
  },
  {
    subtitle: "Physical AI",
    title: "피지컬 AI 및 데이터센터 전문성",
    description:
      "피지컬 AI와 데이터센터 구축 분야의 전문성을 바탕으로 신규 융합 시장을 선점하고 차별화된 경쟁력을 확보합니다.",
    items: [
      {
        icon: <Cpu size={24} />,
        title: "피지컬 AI 기술",
        desc: "실제 물리 환경에서 작동하는 AI 및 로봇공학 융합",
      },
      {
        icon: <Cog size={24} />,
        title: "반도체 AI 예측정비",
        desc: "AI 기반 반도체 공정 최적화 및 예측 솔루션",
      },
      {
        icon: <Server size={24} />,
        title: "데이터센터 구축",
        desc: "데이터센터 설계·구축 전문 컨설팅 및 운영 최적화",
      },
      {
        icon: <Wrench size={24} />,
        title: "융합 시장 선점",
        desc: "AI 인프라 설계·구현 및 신규 융합 시장 진출",
      },
    ],
  },
];

export default function CompetencePage() {
  return (
    <>
      <PageHero title="핵심경쟁력" breadcrumb="핵심경쟁력" />

      {competencies.map((comp, sectionIndex) => (
        <section
          key={comp.title}
          className={`py-20 ${sectionIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="max-w-container mx-auto px-6">
            <SectionTitle
              subtitle={comp.subtitle}
              title={comp.title}
              description={comp.description}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {comp.items.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.1}>
                  <div className="text-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm h-full">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-navy mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
```

- [ ] **Step 2: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: `out/competence/index.html` 생성됨.

- [ ] **Step 3: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/app/competence/
git commit -m "feat: add Competence page with 3 sections and icon grids"
```

---

## Task 12: 협력기관 페이지 (/partners)

**Files:**
- Create: `src/app/partners/page.tsx`

- [ ] **Step 1: partners 페이지 작성**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/app/partners"
```

`src/app/partners/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Building2 } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import { partners, partnerCategories, type PartnerCategory } from "@/data/partners";

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState<PartnerCategory | "all">(
    "all"
  );

  const filtered =
    activeCategory === "all"
      ? partners
      : partners.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHero title="협력기관" breadcrumb="협력기관" />

      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="Partners"
            title="협력기관"
            description="학술·공공·비즈니스 분야의 전문 파트너와 함께합니다"
          />

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-navy text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              전체
            </button>
            {partnerCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-navy text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((partner, index) => (
              <ScrollReveal key={partner.name} delay={index * 0.05}>
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                      <Building2 size={24} className="text-navy/40" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm mb-1">
                        {partner.name}
                      </h3>
                      <p className="text-sm text-gray-500">{partner.role}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: `out/partners/index.html` 생성됨.

- [ ] **Step 3: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/app/partners/
git commit -m "feat: add Partners page with category filter tabs"
```

---

## Task 13: 문의 페이지 (/contact)

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: contact 페이지 작성**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/src/app/contact"
```

`src/app/contact/page.tsx`:

```tsx
"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, Printer } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";

const contactInfo = [
  {
    icon: <MapPin size={20} />,
    label: "주소",
    value: company.address,
  },
  {
    icon: <Phone size={20} />,
    label: "전화",
    value: company.tel,
  },
  {
    icon: <Printer size={20} />,
    label: "팩스",
    value: company.fax,
  },
  {
    icon: <Mail size={20} />,
    label: "이메일",
    value: company.email,
    href: `mailto:${company.email}`,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
      form.reset();
    } catch {
      alert("전송에 실패했습니다. 이메일로 직접 문의해주세요.");
    }
  };

  return (
    <>
      <PageHero title="문의" breadcrumb="문의" />

      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="Contact Us"
            title="문의하기"
            description="궁금한 사항이 있으시면 언제든 연락주세요"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 연락처 정보 */}
            <ScrollReveal direction="left">
              <div>
                <h3 className="text-xl font-bold text-navy mb-6">연락처</h3>
                <div className="space-y-4 mb-8">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
                    >
                      <div className="text-accent mt-0.5">{info.icon}</div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium mb-0.5">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-sm text-navy font-medium hover:text-accent transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-navy font-medium">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Google Maps */}
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d127.043!3d37.483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI4JzU5LjkiTiAxMjfCsDAyJzM0LjgiRQ!5e0!3m2!1sko!2skr!4v1"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="넥스벤처디지털 위치"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* 문의 폼 */}
            <ScrollReveal direction="right">
              <div>
                <h3 className="text-xl font-bold text-navy mb-6">문의 양식</h3>

                {submitted ? (
                  <div className="bg-accent/10 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <Mail size={28} className="text-accent" />
                    </div>
                    <h4 className="text-lg font-bold text-navy mb-2">
                      문의가 접수되었습니다
                    </h4>
                    <p className="text-gray-600 text-sm">
                      빠른 시일 내에 답변드리겠습니다.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-accent text-sm font-medium hover:underline"
                    >
                      새 문의 작성
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                        placeholder="홍길동"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        연락처
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
                        placeholder="010-0000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        문의 유형
                      </label>
                      <select
                        name="inquiry_type"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition bg-white"
                      >
                        <option value="general">일반 문의</option>
                        <option value="ai">AI 솔루션</option>
                        <option value="esg">ESG 컨설팅</option>
                        <option value="blockchain">블록체인 사업</option>
                        <option value="consulting">전문 컨설팅</option>
                        <option value="partnership">협력 제안</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        문의 내용 <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition resize-none"
                        placeholder="문의 내용을 입력해주세요"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="solid"
                      color="accent"
                      size="lg"
                      className="w-full"
                    >
                      문의 보내기
                    </Button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: `out/contact/index.html` 생성됨.

- [ ] **Step 3: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/app/contact/
git commit -m "feat: add Contact page with info cards, map, and inquiry form"
```

---

## Task 14: SEO 메타데이터 및 각 페이지 metadata export

**Files:**
- Modify: `src/app/about/page.tsx`, `src/app/business/page.tsx`, `src/app/solutions/page.tsx`, `src/app/competence/page.tsx`, `src/app/partners/page.tsx`, `src/app/contact/page.tsx`

- [ ] **Step 1: 각 서브 페이지에 metadata 추가**

각 페이지가 `"use client"` 지시문을 사용하므로, metadata를 별도 layout 파일로 분리한다. 각 서브 폴더에 `layout.tsx`를 생성한다.

`src/app/about/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개 | 넥스벤처디지털(주)",
  description:
    "넥스벤처디지털의 비전, 미션, 핵심가치를 소개합니다. AI, ESG, 블록체인 기술 융합 혁신 플랫폼 기업.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

`src/app/business/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사업영역 | 넥스벤처디지털(주)",
  description:
    "AI 사업, ESG 사업, 블록체인 사업, 전문 컨설팅 — 넥스벤처디지털의 4대 핵심 사업영역.",
};

export default function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

`src/app/solutions/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "보유기술·솔루션 | 넥스벤처디지털(주)",
  description:
    "티그리스 AI, NexAI Agent 14, NexESG Platform 등 혁신 솔루션을 소개합니다.",
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

`src/app/competence/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "핵심경쟁력 | 넥스벤처디지털(주)",
  description:
    "AI·데이터 융합 ESG 전문역량, 산학연 네트워크, 피지컬 AI 및 데이터센터 전문성.",
};

export default function CompetenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

`src/app/partners/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "협력기관 | 넥스벤처디지털(주)",
  description:
    "한국벤처혁신학회, 한국ESG경영인증원 등 학술·공공·비즈니스 파트너 소개.",
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

`src/app/contact/layout.tsx`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의 | 넥스벤처디지털(주)",
  description:
    "넥스벤처디지털에 문의하세요. 서울시 강남구 남부순환로 2738, 02-2038-8338.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Step 2: 빌드 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: 모든 페이지 빌드 성공. 각 HTML에 해당 title/description 메타태그 포함.

- [ ] **Step 3: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add src/app/*/layout.tsx
git commit -m "feat: add SEO metadata layouts for all sub-pages"
```

---

## Task 15: GitHub Pages 배포 워크플로우

**Files:**
- Create: `.github/workflows/deploy.yml`, `.gitignore` 확인

- [ ] **Step 1: GitHub Actions 워크플로우 생성**

```bash
mkdir -p "d:/Dev/NextVentureDigital-web/.github/workflows"
```

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: .gitignore 확인**

`.gitignore`에 다음이 포함되어 있는지 확인하고, 없으면 추가:

```
node_modules/
.next/
out/
```

- [ ] **Step 3: 빌드 최종 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run build
```

Expected: `out/` 디렉토리에 모든 페이지의 정적 HTML 파일이 생성됨:
- `out/index.html`
- `out/about/index.html`
- `out/business/index.html`
- `out/solutions/index.html`
- `out/competence/index.html`
- `out/partners/index.html`
- `out/contact/index.html`

- [ ] **Step 4: 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add .github/workflows/deploy.yml .gitignore
git commit -m "ci: add GitHub Pages deployment workflow"
```

---

## Task 16: 최종 빌드 검증 및 개발 서버 확인

- [ ] **Step 1: 클린 빌드**

```bash
cd d:/Dev/NextVentureDigital-web
rm -rf .next out node_modules/.cache
npm run build
```

Expected: 경고나 에러 없이 모든 7개 페이지 빌드 성공.

- [ ] **Step 2: 개발 서버에서 전체 페이지 확인**

```bash
cd d:/Dev/NextVentureDigital-web
npm run dev
```

다음 URL을 모두 확인:
- `http://localhost:3000` — 메인 (히어로, 수치, 사업, 솔루션, 파트너 마퀴, CTA)
- `http://localhost:3000/about` — 회사소개 (개요, 비전/미션, 핵심가치)
- `http://localhost:3000/business` — 사업영역 (4개 섹션 교차 레이아웃)
- `http://localhost:3000/solutions` — 솔루션 (7개 제품 카드)
- `http://localhost:3000/competence` — 핵심경쟁력 (3개 섹션 아이콘 그리드)
- `http://localhost:3000/partners` — 협력기관 (카테고리 필터 탭)
- `http://localhost:3000/contact` — 문의 (연락처, 지도, 폼)

확인 사항:
- 네비게이션 링크 동작, 활성 상태 표시
- 모바일 햄버거 메뉴 동작
- 스크롤 애니메이션 (fade-up, slide-in)
- 카운트업 애니메이션
- 솔루션 탭 전환
- 반응형 레이아웃 (모바일/태블릿/데스크탑)

- [ ] **Step 3: 최종 커밋**

```bash
cd d:/Dev/NextVentureDigital-web
git add -A
git commit -m "chore: final build verification pass"
```
