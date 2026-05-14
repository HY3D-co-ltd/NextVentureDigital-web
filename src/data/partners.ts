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
  { name: "(사)한국벤처혁신학회", role: "벤처혁신정책 수립 및 학술 네트워크 구축", category: "academic" },
  { name: "벤처혁신연구소", role: "학술 연구 수행 및 기술 개발 협력", category: "academic" },
  { name: "화성민간연구개발협의회", role: "민간기업 활성화 및 지역 산업 발전 기여", category: "academic" },
  { name: "천안과학산업진흥원", role: "산업진흥 사업 협력 및 공공 인프라 구축", category: "public" },
  { name: "한국ESG경영인증원", role: "ESG 경영 인증 및 평가 시스템 개발", category: "public" },
  { name: "중소벤처기업인증원", role: "중소벤처기업 인증 및 성장 지원", category: "public" },
  { name: "(주)지성이엔지", role: "우수 조달 제품 및 영상 분석 솔루션", category: "business" },
  { name: "세종경영원(주)", role: "기업 경영 연구 및 컨설팅", category: "business" },
  { name: "법무법인 정진 / 염앤장 법무사", role: "법률 자문 및 기업 법무 지원", category: "business" },
  { name: "(주)인라스", role: "IT 컨설팅 및 디지털 전환 지원", category: "business" },
  { name: "(주)타이거컴퍼니", role: "클라우드 서비스 및 데이터센터 솔루션", category: "business" },
  { name: "특허법인 리더스", role: "특허 출원·등록 및 지식재산권 보호", category: "business" },
];
