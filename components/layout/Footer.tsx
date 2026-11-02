import Link from "next/link";
import Image from "next/image";
import { site, footerLinks } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="max-w-content mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt="ORDO Logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain brightness-110 shrink-0"
              />
              <p className="font-display text-lg text-paper font-medium">
                {site.name}
                <span className="text-gold">.</span>
              </p>
            </div>
            <p className="text-mute text-xs mt-1.5">{site.tagline}</p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-paper/70 hover:text-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs text-mute">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{site.location}</span>
            <span className="text-line hidden sm:inline">|</span>
            <span>
              Operations:{" "}
              <a
                href={`tel:${site.operationsPhone.replace(/\s/g, "")}`}
                className="hover:text-gold transition-colors text-paper/85"
              >
                {site.operationsPhone}
              </a>
            </span>
            <span className="text-line hidden sm:inline">|</span>
            <span>
              Customer Service:{" "}
              <a
                href={`tel:${site.customerServicePhone.replace(/\s/g, "")}`}
                className="hover:text-gold transition-colors text-paper/85"
              >
                {site.customerServicePhone}
              </a>
            </span>
            <span className="text-line hidden sm:inline">|</span>
            <a
              href={`mailto:${site.email}`}
              className="hover:text-gold transition-colors text-paper/85"
            >
              {site.email}
            </a>
            <span className="text-line hidden sm:inline">|</span>
            <a
              href={`https://${site.website}`}
              className="hover:text-gold transition-colors text-paper/85"
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.website}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
