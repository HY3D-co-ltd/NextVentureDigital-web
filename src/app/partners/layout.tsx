import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "협력기관 | 넥스벤처디지털(주)",
  description: "넥스벤처디지털(주)의 학술·연구, 공공·인증, 비즈니스·법률 분야 협력기관을 소개합니다.",
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
