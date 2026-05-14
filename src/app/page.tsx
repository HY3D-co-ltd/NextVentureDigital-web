import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import BusinessPreview from "@/components/home/BusinessPreview";
import SolutionHighlight from "@/components/home/SolutionHighlight";
import PartnerMarquee from "@/components/home/PartnerMarquee";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <BusinessPreview />
      <SolutionHighlight />
      <PartnerMarquee />
      <CTASection />
    </>
  );
}
