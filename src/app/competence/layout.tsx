import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "핵심경쟁력 | 넥스벤처디지털(주)",
  description: "넥스벤처디지털(주)의 AI·데이터 융합 역량, 산학연 네트워크, 피지컬 AI 전문성을 소개합니다.",
};

export default function CompetenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
