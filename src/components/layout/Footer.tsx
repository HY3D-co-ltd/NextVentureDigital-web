import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { company, navLinks } from "@/data/company";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{company.nameEn}</h3>
            <p className="text-gray-400 text-sm mb-6">{company.nameShort} · {company.name}</p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-2">
                <MapPin size={16} className="text-accent mt-0.5 shrink-0" />
                <span>{company.address}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={16} className="text-accent shrink-0" />
                <span>{company.tel}</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={16} className="text-accent shrink-0" />
                <span>{company.email}</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Sitemap */}
          <div>
            <h3 className="text-lg font-bold mb-4">사이트맵</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">연락처</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Tel</span>
                <span>{company.tel}</span>
              </li>
              <li>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Fax</span>
                <span>{company.fax}</span>
              </li>
              <li>
                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Email</span>
                <a
                  href={`mailto:${company.email}`}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-navy-light">
        <div className="max-w-container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>© {currentYear} {company.name}. All rights reserved.</p>
          <p>사업자등록번호: {company.businessNumber} · 대표: {company.ceo}</p>
        </div>
      </div>
    </footer>
  );
}
