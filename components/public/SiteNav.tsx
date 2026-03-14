"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSiteStore } from "@/lib/store";

export function SiteNav() {
  const logo = useSiteStore((s) => s.data.logo);
  const contact = useSiteStore((s) => s.data.contact);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#1A1A1A] text-white/60 text-[0.72rem] px-6 md:px-16 py-2 flex justify-between items-center">
        <div className="flex gap-4">
          <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
            📞 {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors hidden sm:block">
            ✉️ {contact.email}
          </a>
        </div>
        <span className="font-montserrat text-[0.65rem] font-bold tracking-widest uppercase text-white/30">
          {logo.tagline}
        </span>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : "border-b border-[#E0E0E0]"
        }`}
      >
        <div className="px-6 md:px-16 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div
              className="w-0 h-0 flex-shrink-0"
              style={{
                borderLeft: "9px solid transparent",
                borderRight: "9px solid transparent",
                borderBottom: "16px solid #2E7D1F",
              }}
            />
            <div>
              <div className="font-montserrat text-[1.15rem] font-black leading-none">
                <span className="text-[#1A1A1A]">{logo.part1}</span>
                <span className="text-[#F5921E]">{logo.part2}</span>
              </div>
              <div className="text-[0.52rem] text-[#999] tracking-[0.14em] uppercase mt-0.5">
                {logo.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: "Our Projects", id: "projects" },
              { label: "Malindi", id: "malindi" },
              { label: "Konza", id: "konza" },
              { label: "Kamakis", id: "kamakis" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-4 py-2 font-montserrat text-[0.78rem] font-600 text-[#444] hover:text-[#F5921E] transition-colors rounded"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("enquiry")}
              className="ml-3 px-5 py-2 bg-[#F5921E] hover:bg-[#D97A10] text-white font-montserrat text-[0.78rem] font-bold rounded transition-colors"
            >
              Enquire Now
            </button>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="ml-2 px-4 py-2 bg-[#25D366] hover:bg-[#1ea852] text-white font-montserrat text-[0.78rem] font-bold rounded transition-colors"
            >
              💬 WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1A1A1A] transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#E0E0E0] bg-white px-6 py-4 flex flex-col gap-2">
            {["projects", "malindi", "konza", "kamakis"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left py-2 font-montserrat text-[0.85rem] font-semibold text-[#444] capitalize border-b border-[#F5F5F5]"
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <button
              onClick={() => scrollTo("enquiry")}
              className="mt-2 py-3 bg-[#F5921E] text-white font-montserrat text-[0.85rem] font-bold rounded"
            >
              Enquire Now
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
