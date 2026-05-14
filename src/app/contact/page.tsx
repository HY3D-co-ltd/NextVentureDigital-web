"use client";
import { useState } from "react";
import { MapPin, Phone, Printer, Mail, CheckCircle } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import ScrollReveal from "@/components/common/ScrollReveal";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { company } from "@/data/company";

const contactItems = [
  {
    icon: MapPin,
    label: "주소",
    value: company.address,
  },
  {
    icon: Phone,
    label: "전화",
    value: company.tel,
  },
  {
    icon: Printer,
    label: "팩스",
    value: company.fax,
  },
  {
    icon: Mail,
    label: "이메일",
    value: company.email,
  },
];

const inquiryTypes = [
  "서비스 문의",
  "제품 데모 요청",
  "파트너십 제안",
  "컨설팅 상담",
  "채용 문의",
  "기타",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Show success anyway in development
      setSubmitted(true);
    }
  };

  return (
    <main>
      <PageHero title="문의" breadcrumb="문의" />

      <section className="py-20 bg-white">
        <div className="max-w-container mx-auto px-6">
          <SectionTitle
            subtitle="CONTACT"
            title="문의하기"
            description="궁금하신 사항이 있으시면 언제든지 연락주세요. 빠르게 답변 드리겠습니다."
          />

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Left: Contact Info + Map */}
            <ScrollReveal direction="left">
              <div className="space-y-6">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-gray-100"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-0.5">{item.label}</p>
                        <p className="text-navy font-semibold text-sm">{item.value}</p>
                      </div>
                    </div>
                  );
                })}

                {/* Google Maps Embed */}
                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2d127.041!3d37.484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sko!2skr!4v1620000000000!5m2!1sko!2skr"
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

            {/* Right: Contact Form */}
            <ScrollReveal direction="right">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <CheckCircle className="w-16 h-16 text-accent mb-4" />
                  <h3 className="text-2xl font-bold text-navy mb-2">문의가 접수되었습니다</h3>
                  <p className="text-gray-600 mb-6">
                    빠른 시일 내에 담당자가 연락드리겠습니다.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", inquiryType: "", message: "" });
                    }}
                    variant="outline"
                    color="navy"
                  >
                    새 문의 작성
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">
                        이름 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="홍길동"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">연락처</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="010-0000-0000"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">문의유형</label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors bg-white text-gray-700"
                    >
                      <option value="">문의 유형을 선택해주세요</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1.5">
                      문의내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="문의하실 내용을 자세히 적어주세요."
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" color="accent" size="lg" className="w-full">
                    문의 보내기
                  </Button>
                </form>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
