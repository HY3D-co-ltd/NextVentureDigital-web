export const BASE_PATH = "/NextVentureDigital-web";

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
      points: ["끊임없는 기술 혁신 추구", "비즈니스 모델의 지속적 개선", "시장 변화에 대한 능동적 대응", "차별화된 경쟁력 확보"],
    },
    {
      title: "신뢰",
      icon: "Shield",
      description: "데이터 기반의 투명하고 윤리적인 경영",
      points: ["데이터 기반의 투명한 경영", "윤리적 의사결정 프로세스", "고객과의 신뢰 관계 구축", "책임감 있는 기업 운영"],
    },
    {
      title: "연결",
      icon: "Network",
      description: "산학연을 잇는 강력한 협력 생태계 구축",
      points: ["산학연 협력 생태계 구축", "전문가 네트워크 활용", "파트너십을 통한 시너지 창출", "지속 가능한 협력 관계 유지"],
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
