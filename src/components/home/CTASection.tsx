import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="bg-navy py-20 md:py-24">
      <div className="max-w-container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          디지털 혁신, 지금 시작하세요
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          NVD와 함께 AI·ESG·블록체인으로 비즈니스의 새로운 가능성을 열어보세요.
        </p>
        <Button href="/contact" color="accent" size="lg">
          문의하기
        </Button>
      </div>
    </section>
  );
}
