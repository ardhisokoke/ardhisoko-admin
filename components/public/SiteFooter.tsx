"use client";
import { useSiteStore } from "@/lib/store";
import Link from "next/link";

export function SiteFooter() {
  const { logo, contact, projects } = useSiteStore((s) => s.data);

  return (
    <footer className="bg-[#111] text-white">
      <div className="px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-0 h-0"
                style={{
                  borderLeft: "9px solid transparent",
                  borderRight: "9px solid transparent",
                  borderBottom: "16px solid #2E7D1F",
                }}
              />
              <div className="font-montserrat text-[1.3rem] font-black">
                <span className="text-white">{logo.part1}</span>
                <span className="text-[#F5921E]">{logo.part2}</span>
              </div>
            </div>
            <p className="text-white/50 text-[0.85rem] leading-relaxed max-w-xs mb-5">
              {logo.tagline}. Connecting Kenyan investors with premium land and property opportunities.
            </p>
            <div className="flex gap-3">
              {contact.facebook && (
                <a href={contact.facebook} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F5921E] flex items-center justify-center transition-colors text-sm">f</a>
              )}
              {contact.instagram && (
                <a href={contact.instagram} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F5921E] flex items-center justify-center transition-colors text-sm">ig</a>
              )}
              {contact.whatsapp && (
                <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors text-sm">wa</a>
              )}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-montserrat text-[0.7rem] font-extrabold tracking-[0.18em] uppercase text-white/30 mb-4">
              Our Projects
            </h4>
            <div className="flex flex-col gap-2">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="text-white/55 hover:text-[#F5921E] text-[0.85rem] transition-colors"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat text-[0.7rem] font-extrabold tracking-[0.18em] uppercase text-white/30 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-[0.85rem] text-white/55">
              <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                {contact.email}
              </a>
              {contact.address && <span>{contact.address}</span>}
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-2 bg-[#25D366] hover:bg-[#1ea852] text-white px-4 py-2 rounded font-montserrat text-[0.72rem] font-bold transition-colors w-fit"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[0.75rem] text-white/25">
          <span>© {new Date().getFullYear()} {logo.part1}{logo.part2}. All rights reserved.</span>
          <Link href="/admin" className="hover:text-white/50 transition-colors">
            Admin ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
