interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionTitle({ subtitle, title, description, align = "center", light = false }: SectionTitleProps) {
  const alignment = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`${alignment} mb-12`}>
      {subtitle && <span className="text-accent font-semibold text-sm tracking-wider uppercase mb-2 block">{subtitle}</span>}
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {description && <p className={`text-lg max-w-2xl ${align === "center" ? "mx-auto" : ""} ${light ? "text-gray-300" : "text-gray-600"}`}>{description}</p>}
    </div>
  );
}
