import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문의 | 넥스벤처디지털(주)",
  description: "넥스벤처디지털(주)에 문의하세요. 주소, 전화, 이메일 및 문의 양식을 제공합니다.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
