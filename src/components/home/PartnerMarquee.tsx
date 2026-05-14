import { partners } from "@/data/partners";

export default function PartnerMarquee() {
  // Duplicate for seamless loop
  const doubled = [...partners, ...partners];

  return (
    <section className="bg-slate-50 py-14 overflow-hidden">
      <div className="max-w-container mx-auto px-6 mb-8 text-center">
        <span className="text-accent font-semibold text-sm tracking-wider uppercase">
          Trusted Partners
        </span>
      </div>

      <div className="relative">
        {/* Fade masks on edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="flex gap-4 animate-marquee" style={{ width: "max-content" }}>
          {doubled.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-navy whitespace-nowrap"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
