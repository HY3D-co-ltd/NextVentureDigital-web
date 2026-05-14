import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "solid" | "outline" | "ghost";
  color?: "navy" | "accent";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants = {
  solid: {
    navy: "bg-navy text-white hover:bg-navy-light",
    accent: "bg-accent text-white hover:bg-accent-600",
  },
  outline: {
    navy: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
    accent: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
  },
  ghost: {
    navy: "text-navy hover:bg-navy-50",
    accent: "text-accent hover:bg-accent-50",
  },
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({ href, variant = "solid", color = "navy", size = "md", children, className = "", type = "button", onClick }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300";
  const classes = `${baseClasses} ${variants[variant][color]} ${sizes[size]} ${className}`;
  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }
  return <button type={type} className={classes} onClick={onClick}>{children}</button>;
}
