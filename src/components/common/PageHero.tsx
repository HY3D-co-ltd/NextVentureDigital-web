interface PageHeroProps {
  title: string;
  breadcrumb: string;
}

export default function PageHero({ title, breadcrumb }: PageHeroProps) {
  return (
    <section className="bg-navy text-white py-20 md:py-24">
      <div className="max-w-container mx-auto px-6">
        <p className="text-accent text-sm font-medium mb-2">홈 &gt; {breadcrumb}</p>
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      </div>
    </section>
  );
}
