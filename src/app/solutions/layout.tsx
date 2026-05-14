import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "보유기술·솔루션 | 넥스벤처디지털(주)",
  description: "넥스벤처디지털(주)의 AI 솔루션, ESG 플랫폼, 블록체인, 영상분석 등 보유 기술과 솔루션을 소개합니다.",
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
