import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "사업영역 | 넥스벤처디지털(주)",
  description: "넥스벤처디지털(주)의 AI, ESG, 블록체인, 전문 컨설팅 사업 영역을 소개합니다.",
};

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
