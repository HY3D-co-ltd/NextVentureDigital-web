import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "회사소개 | 넥스벤처디지털(주)",
  description: "넥스벤처디지털(주)의 회사 개요, 비전, 미션, 핵심가치를 소개합니다.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
